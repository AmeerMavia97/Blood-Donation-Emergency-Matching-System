import { useEffect, useState } from "react"
import { History, LayoutDashboard, UserRound, Droplet } from "lucide-react"

import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import {
  DataPanel,
  Field,
  SelectField,
} from "@/Screens/Dashboard/_shared/DashboardUI"

import { supabase } from "@/Configuration/Supabase/supabaseClient"
import { useAuthUser } from "@/Components/hooks/useAuthUser"

const tabs = [
  { label: "Overview", path: "/donor", icon: LayoutDashboard, end: true },
  { label: "My Donor Profile", path: "/donor/profile", icon: UserRound },
  { label: "Blood Requests", path: "/donor/requests", icon: Droplet },
  { label: "Donation History", path: "/donor/history", icon: History },
]

export default function DonorProfile() {
  const { data } = useAuthUser()
  const user = data?.user

  const [loading, setLoading] = useState(true)
  const [donorId, setDonorId] = useState(null)
  const [lastDonationDate, setLastDonationDate] = useState("")

  const [profile, setProfile] = useState({
    blood_group: "",
    location: "",
    phone: "",
    availability: "Available",
    consent_phone: false,
  })

  // ---------------- FETCH ----------------
  const fetchProfile = async (userId) => {
    if (!userId) return

    try {
      setLoading(true)

      const { data: donor, error } = await supabase
        .from("donors")
        .select("*")
        .eq("profile_id", userId)
        .maybeSingle()

      if (error) {
        console.log(error)
        return
      }

      if (donor) {
        setDonorId(donor.id)

        setProfile({
          blood_group: donor.blood_group ?? "",
          location: donor.location ?? "",
          phone: donor.phone ?? "",
          availability: donor.availability ?? "Available",
          consent_phone: donor.consent_phone ?? false,
        })

        fetchLastDonation(donor.id)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ---------------- LAST DONATION ----------------
  const fetchLastDonation = async (donorId) => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("donation_date")
        .eq("donor_id", donorId)
        .order("donation_date", { ascending: false })
        .limit(1)

      if (!error && data?.length > 0) {
        setLastDonationDate(data[0].donation_date)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // ---------------- UPDATE (BLOOD GROUP LOCKED) ----------------
  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      if (!user?.id || !donorId) return

      const { error: donorError } = await supabase
        .from("donors")
        .update({
          location: profile.location,
          phone: profile.phone,
          availability: profile.availability,
          consent_phone: profile.consent_phone,
        }) // ❗ blood_group REMOVED
        .eq("profile_id", user.id)

      if (donorError) {
        alert(donorError.message)
        return
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          phone: profile.phone,
        })
        .eq("id", user.id)

      if (profileError) {
        alert(profileError.message)
        return
      }

      alert("Profile updated successfully ✔")
    } catch (err) {
      alert("Update failed")
      console.log(err)
    }
  }

  // ---------------- EFFECT ----------------
  useEffect(() => {
    if (user?.id) fetchProfile(user.id)
  }, [user?.id])

  // ---------------- LOADING ----------------
  if (loading) {
    return <div>Loading profile...</div>
  }

  return (
    <DashboardLayout roleName="Donor Dashboard" tabs={tabs}>
      <DataPanel title="Donor Profile">

        <form onSubmit={handleUpdate} className="space-y-4">

          {/* BLOOD GROUP (READ ONLY) */}
          <Field
            label="Blood group"
            value={profile.blood_group}
            disabled
          />

          <Field
            label="Location"
            value={profile.location}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
          />

          <Field
            label="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />

          <SelectField
            label="Availability"
            value={profile.availability}
            options={["Available", "Unavailable", "Emergency only"]}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                availability: e.target.value,
              }))
            }
          />

          <div className="flex items-center gap-2 mt-5 ml-4">
            <input
              type="checkbox"
              checked={profile.consent_phone}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  consent_phone: e.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <label className="text-sm">
              Consent to share phone number
            </label>
          </div>

          <Field
            label="Last Donation Date"
            value={
              lastDonationDate
                ? new Date(lastDonationDate).toLocaleDateString()
                : "No donation yet"
            }
            disabled
          />

          <button
            type="submit"
            className="px-4 py-3 mt-2 bg-red-600 text-white rounded-xl"
          >
            Update Profile
          </button>

        </form>
      </DataPanel>
    </DashboardLayout>
  )
}