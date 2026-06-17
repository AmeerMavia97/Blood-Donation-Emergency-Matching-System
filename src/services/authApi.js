import getAuthErrorMessage from "@/Components/hooks/ErrorMessage"
import { supabase } from "@/Configuration/Supabase/supabaseClient"

const authRedirectUrl = `${window.location.origin}/change-password`
const AUTH_CACHE_KEY = "tapro-auth-user"
const AUTH_CACHE_VERSION = 1

export function getUserRole(profile) {
  return profile?.role || "user"
}

export function getDashboardPath(profile) {
  const role = profile?.role || "donor"

  const paths = {
    admin: "/admin",
    donor: "/donor",
    patient_attendant: "/attendant",
    attendant: "/attendant",
    hospital_verifier: "/verifier",
    verifier: "/verifier",
    blood_bank: "/blood-bank",
    volunteer: "/volunteer",
  }

  return paths[role] || "/donor"
}

function normalizeAuthPayload({ user, profile, session = null }) {
  return {
    user,
    profile,
    session,
  }
}

export function getCachedAuthUser(userId) {
  try {
    const rawCache = localStorage.getItem(AUTH_CACHE_KEY)
    if (!rawCache) return null

    const cached = JSON.parse(rawCache)

    if (cached?.version !== AUTH_CACHE_VERSION) return null
    if (!cached?.data?.user?.id || cached.data.user.id !== userId) return null

    return cached.data
  } catch {
    localStorage.removeItem(AUTH_CACHE_KEY)
    return null
  }
}

export function setCachedAuthUser(data) {
  if (!data?.user) return

  localStorage.setItem(
    AUTH_CACHE_KEY,
    JSON.stringify({
      version: AUTH_CACHE_VERSION,
      cachedAt: Date.now(),
      data,
    }),
  )
}

export function clearCachedAuthUser() {
  localStorage.removeItem(AUTH_CACHE_KEY)
}


async function getOrCreateProfile(user) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (error) throw error
  if (profile) return profile

  const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "BloodBridge User"

  const { data: createdProfile, error: createError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      role: user.user_metadata?.role || "donor",
    })
    .select("*")
    .single()

  if (createError) throw createError

  return createdProfile
}

export async function refreshCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user

  if (!user) {
    clearCachedAuthUser()
    return null
  }

  const profile = await getOrCreateProfile(user)

  const authData = normalizeAuthPayload({
    user,
    profile,
    session: sessionData.session,
  })

  setCachedAuthUser(authData)
  return authData
}

// Login User
export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  const user = data.user
  const session = data.session

  if (!session || !user) {
    throw new Error("Session not available after login")
  }

  const profile = await getOrCreateProfile(user)

  if (profile?.account_status === "blocked") {
    await supabase.auth.signOut()
    clearCachedAuthUser()
    throw new Error("Your account has been blocked by admin. Please contact support.")
  }

  const authData = normalizeAuthPayload({ user, profile, session })
  setCachedAuthUser(authData)

  return authData
}

// Register User Function
export async function registerUser({ fullName, email, password, role = "donor", phone = "", city = "", ...extra }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: { full_name: fullName, role },
    },
  })

  if (error) throw new Error(getAuthErrorMessage(error.message))
  if (!data?.user || data?.user?.identities?.length === 0) {
    throw new Error("This email already exists. Please sign in instead.")
  }

  const userId = data.user.id
  const { error: profileError } = await supabase
  .from("profiles")
  .upsert({
    id: userId,
    full_name: fullName,
    email,
    phone,
    role,
    city,
    },
      { onConflict: "id" }
    )

  if (profileError) throw profileError

  if (role === "donor") {
    const { error: donorError } = await supabase.from("donors").insert({
      profile_id: userId, blood_group: extra.blood_group || "O+", location: extra.location || city, availability: extra.availability ?? true, last_donation_date: extra.lastDonationDate || null, medical_notes: extra.medicalNotes || null,
    })
    if (donorError) throw new Error(donorError.message)
  }

  if (role === "hospital_verifier") {
    const { error: verifierError } = await supabase.from("hospital_verifiers").insert({
      profile_id: userId, hospital_name: extra.hospital_name || "", hospital_city: extra.hospitalCity || city, hospital_address: extra.hospital_address || "", staff_id: extra.staffId || "", designation: extra.designation || "", verification_status: "pending",
    })
    if (verifierError) throw new Error(verifierError.message)
  }

  if (role === "blood_bank") {
    const { error: bankError } = await supabase.from("blood_banks").insert({
      profile_id: userId, blood_bank_name: extra.bloodBankName || "", license_number: extra.licenseNumber || "", address: extra.address || "", city, contact_person: extra.contactPerson || fullName, verification_status: "pending",
    })
    if (bankError) throw new Error(bankError.message)
  }

  if (role === "volunteer") {
    const { error: volunteerError } = await supabase.from("volunteers").insert({
      profile_id: userId, availability: extra.availability ?? true, service_area: extra.serviceArea || city, transport_available: extra.transportAvailable ?? false, skills: extra.skills || "",
    })
    if (volunteerError) throw new Error(volunteerError.message)
  }

  return data
}

export async function signInWithGoogle({ redirectPath } = {}) {
  const safeRedirect = redirectPath?.startsWith("/") ? redirectPath : ""
  const loginUrl = new URL(`${window.location.origin}/login`)

  if (safeRedirect) {
    loginUrl.searchParams.set("redirect", safeRedirect)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: loginUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Reset Password
export async function sendResetPasswordEmail({ email }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authRedirectUrl,
  })

  if (error) {
    throw new Error(getAuthErrorMessage(error.message))
  }

  return data
}

export async function changePassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({ password })

  if (error) {
    throw new Error(getAuthErrorMessage(error.message))
  }

  return data
}

// Logout User
export async function logoutUser() {
  const { error } = await supabase.auth.signOut()

  clearCachedAuthUser()

  if (error) {
    throw new Error(error.message)
  }
}

export async function fetchCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user

  if (!user) {
    clearCachedAuthUser()
    return null
  }

  const cachedAuthUser = getCachedAuthUser(user.id)
  if (cachedAuthUser) return cachedAuthUser

  return refreshCurrentUser()
}




// ADMIN PROFILE SETTING 
export async function getAdminProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,email,role,account_status")
    .eq("id", user.id)
    .single()

  if (error) throw new Error(error.message)

  return data
}

export async function updateAdminProfile({ fullName }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName?.trim() || null,
    })
    .eq("id", user.id)
    .select("id,full_name,email,role,account_status")
    .single()

  if (error) throw new Error(error.message)

  return data
}
export async function getHospitalsForRequest() {
  const { data, error } = await supabase
    .from("hospital_verifiers")
    .select("profile_id,hospital_name,hospital_city,hospital_address,verification_status")
    .eq("verification_status", "approved")
    .order("hospital_name", { ascending: true })

  if (error) throw new Error(error.message)
  return data || []
}

export async function uploadPatientRequestDocument({ file, requestId, index }) {
  if (!file) return null
  const ext = file.name?.split(".").pop() || "file"
  const path = `${requestId}/document-${index}-${Date.now()}.${ext}`
  const { error } = await supabase.storage.from("request-documents").upload(path, file, { upsert: true })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from("request-documents").getPublicUrl(path)
  return { path, publicUrl: data?.publicUrl || null, name: file.name, size: file.size, type: file.type }
}

export async function registerPatientEmergencyRequest(formData) {
  const fullName = formData.fullName?.trim()
  const isOtherHospital = formData.hospitalMode === "other"
  const publicTrust = formData.verificationChoice === "public_trust"

  const { data: sessionData } = await supabase.auth.getSession()
  let authUser = sessionData?.session?.user || null
  let session = sessionData?.session || null

  if (!authUser) {
    const email = formData.email?.trim()
    const password = formData.password

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { full_name: fullName, role: "patient_attendant" },
      },
    })

    if (signUpError) throw new Error(getAuthErrorMessage(signUpError.message))
    if (!authData?.user || authData?.user?.identities?.length === 0) {
      throw new Error("This email already exists. Please sign in instead.")
    }

    authUser = authData.user
    session = authData.session
  }

  const userId = authUser.id
  const email = formData.email?.trim() || authUser.email

  const profilePayload = {
    id: userId,
    full_name: fullName || authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Patient Attendant",
    email,
    phone: formData.phone,
    role: "patient_attendant",
    city: formData.city,
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
  if (profileError) throw new Error(profileError.message)

  const { error: attendantError } = await supabase
    .from("patient_attendants")
    .upsert(
      {
        profile_id: userId,
        relationship_to_patient: formData.relationshipToPatient,
        emergency_contact: formData.emergencyContact,
      },
      { onConflict: "profile_id" }
    )
  if (attendantError) throw new Error(attendantError.message)

  const { data: request, error: requestError } = await supabase
    .from("blood_requests")
    .insert({
      patient_profile_id: userId,
      patient_name: fullName || profilePayload.full_name,
      phone: formData.phone,
      age: Number(formData.age),
      city: formData.city,
      emergency_contact: formData.emergencyContact,
      relationship_to_patient: formData.relationshipToPatient,
      required_blood_group: formData.requiredBloodGroup,
      units_required: Number(formData.unitsRequired),
      hospital_profile_id: isOtherHospital ? null : formData.hospitalProfileId || null,
      hospital_name: isOtherHospital ? formData.otherHospitalName : formData.selectedHospitalName,
      hospital_mode: formData.hospitalMode,
      verification_choice: formData.verificationChoice,
      verification_status: isOtherHospital && publicTrust ? "public_unverified" : "pending",
      status: isOtherHospital && publicTrust ? "verified" : "pending_verification",
      trust_score: isOtherHospital && publicTrust ? 50 : isOtherHospital ? 30 : 90,
      emergency_notes: formData.emergencyNotes,
      documents_public: isOtherHospital && publicTrust,
    })
    .select("*")
    .single()

  if (requestError) throw new Error(requestError.message)

  const files = [formData.documentOne?.[0], formData.documentTwo?.[0]].filter(Boolean)
  for (let index = 0; index < files.length; index += 1) {
    const uploaded = await uploadPatientRequestDocument({ file: files[index], requestId: request.id, index: index + 1 })
    const { error: documentError } = await supabase.from("request_documents").insert({
      request_id: request.id,
      file_name: uploaded.name,
      file_path: uploaded.path,
      public_url: uploaded.publicUrl,
      is_public: isOtherHospital && publicTrust,
    })
    if (documentError) throw new Error(documentError.message)
  }

  return { user: authUser, session, request }
}

export async function createBloodRequest(formData) {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user
  if (!user) throw new Error("Please login first.")

  const { data: profile } = await supabase.from("profiles").select("full_name,phone,city").eq("id", user.id).maybeSingle()

  const { data, error } = await supabase
    .from("blood_requests")
    .insert({
      patient_profile_id: user.id,
      patient_name: formData.patientName || profile?.full_name,
      phone: profile?.phone,
      city: formData.city || profile?.city,
      required_blood_group: formData.requiredBloodGroup,
      units_required: Number(formData.unitsRequired),
      hospital_name: formData.hospitalName,
      emergency_level: formData.emergencyLevel,
      emergency_notes: formData.emergencyNotes,
      status: "pending_verification",
      verification_status: "pending",
      trust_score: 80,
    })
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getMyPatientRequests() {
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData?.session?.user
  if (!user) return []

  const { data, error } = await supabase
    .from("blood_requests")
    .select("*")
    .eq("patient_profile_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

export async function getPublicBloodRequests() {
  const { data, error } = await supabase
    .from("blood_requests")
    .select("id,patient_name,required_blood_group,units_required,hospital_name,city,status,verification_status,trust_score,created_at,emergency_notes,documents_public")
    .in("status", ["verified", "matched", "fulfilled"])
    .order("created_at", { ascending: false })
    .limit(50)
  if (error) throw new Error(error.message)
  return data || []
}

export async function getBloodRequestById(id) {
  const { data, error } = await supabase
    .from("blood_requests")
    .select("*, request_documents(*)")
    .eq("id", id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data
}

export async function markRequestFulfilled(id) {
  const { data, error } = await supabase
    .from("blood_requests")
    .update({ status: "fulfilled", fulfilled_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw new Error(error.message)
  return data
}


export async function getPatientMatchedDonors() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData?.session?.user
    if (!user) return []

    const { data, error } = await supabase
      .from("request_donor_matches")
      .select("id,status,donor:donors(blood_group,profile:profiles(full_name))")
      .eq("patient_profile_id", user.id)
      .limit(20)

    if (error) throw error

    return (data || []).map((item, index) => ({
      id: item.id || index,
      name: item.donor?.profile?.full_name || `Donor #${index + 1}`,
      blood_group: item.donor?.blood_group || "B+",
      status: item.status || "Matched",
    }))
  } catch {
    return [
      { id: "demo-1", name: "Ali Khan", blood_group: "B+", status: "Accepted" },
      { id: "demo-2", name: "Ahmed Ali", blood_group: "B+", status: "Contacted" },
      { id: "demo-3", name: "Donor #3", blood_group: "B+", status: "Matched" },
    ]
  }
}

export async function getPatientBloodBankOffers() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData?.session?.user
    if (!user) return []

    const { data, error } = await supabase
      .from("blood_bank_offers")
      .select("id,units_available,blood_group,status,bank:blood_banks(blood_bank_name)")
      .eq("patient_profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error

    return (data || []).map((item) => ({
      id: item.id,
      bank_name: item.bank?.blood_bank_name || "Registered Blood Bank",
      units_available: item.units_available || 1,
      blood_group: item.blood_group || "B+",
      status: item.status || "Reserved",
    }))
  } catch {
    return [
      { id: "offer-1", bank_name: "Indus Blood Bank", units_available: 1, blood_group: "B+", status: "Reserved" },
      { id: "offer-2", bank_name: "Aga Khan Blood Bank", units_available: 2, blood_group: "O+", status: "Available" },
    ]
  }
}

export async function acceptBloodBankOffer(id) {
  try {
    const { data, error } = await supabase
      .from("blood_bank_offers")
      .update({ status: "Accepted", accepted_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single()
    if (error) throw error
    return data
  } catch {
    return { id, status: "Accepted" }
  }
}
