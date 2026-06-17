import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"
import InputField from "@/Components/ui/input"
import { getHospitalsForRequest, registerPatientEmergencyRequest } from "@/services/authApi"
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, HeartHandshake, Hospital, LockKeyhole, Mail, MapPin, Phone, Search, ShieldCheck, Upload, UserRound, X } from "lucide-react"
import React, { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const StepBadge = ({ active, done, label, number }) => (
  <div className="flex items-center gap-3"><span className={`flex size-9 items-center justify-center rounded-full text-sm font-black ${done || active ? "bg-[#dc2626] text-white" : "bg-black/5 text-[#555]"}`}>{done ? <CheckCircle2 size={18} /> : number}</span><span className={`hidden text-xs font-black uppercase tracking-wide sm:block ${active ? "text-[#dc2626]" : "text-[#555]"}`}>{label}</span></div>
)

const SelectField = ({ label, icon: Icon, error, children, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-bold text-[#151515] font-para">{label}</label>
    <div className="relative">{Icon && <Icon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#dc2626]" />}<select className={`h-12.5 w-full rounded-lg border bg-white px-4 text-sm font-medium text-[#151515] outline-none transition focus:border-[#dc2626] ${Icon ? "pl-12" : ""} ${error ? "border-[#dc2626]" : "border-black/10"}`} {...props}>{children}</select></div>
    {error && <p className="mt-2 text-xs font-bold text-[#dc2626]">{error.message}</p>}
  </div>
)

const TextareaField = ({ label, error, ...props }) => (
  <div className="md:col-span-2"><label className="mb-2 block text-sm font-bold text-[#151515] font-para">{label}</label><textarea className={`min-h-28 w-full rounded-lg border bg-white px-4 py-3 text-sm font-medium text-[#151515] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#dc2626] ${error ? "border-[#dc2626]" : "border-black/10"}`} {...props} />{error && <p className="mt-2 text-xs font-bold text-[#dc2626]">{error.message}</p>}</div>
)

const FileBox = ({ label, hint, file, registerProps, error }) => (
  <div>
    <label className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-5 text-center transition ${file ? "border-green-500 bg-green-50" : "border-[#dc2626]/35 bg-[#dc2626]/5 hover:bg-[#dc2626]/10"}`}>
      {file ? <FileCheck2 className="mb-3 size-7 text-green-600" /> : <Upload className="mb-3 size-7 text-[#dc2626]" />}
      <span className="font-head text-base font-black text-[#151515]">{file ? "Uploaded" : label}</span>
      <span className="mt-1 text-xs font-semibold text-[#555]">{file?.name || hint}</span>
      <input type="file" accept="image/*,.pdf" className="hidden" {...registerProps} />
    </label>
    {error && <p className="mt-2 text-xs font-bold text-[#dc2626]">{error.message}</p>}
  </div>
)

const PatientRequest = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [hospitalSearch, setHospitalSearch] = useState("")
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const { data: hospitals = [] } = useQuery({ queryKey: ["request-hospitals"], queryFn: getHospitalsForRequest, staleTime: 1000 * 60 * 5 })

  const cachedAuth = (() => {
    try { return JSON.parse(localStorage.getItem("tapro-auth-user") || "null") } catch { return null }
  })()
  const isLoggedIn = !!cachedAuth?.data?.user?.id
  const shouldSkipAuthStep = isLoggedIn

  const { register, handleSubmit, watch, setValue, trigger, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { fullName: "", phone: "", age: "", city: "", relationshipToPatient: "", emergencyContact: "", requiredBloodGroup: "", unitsRequired: "1", emergencyNotes: "", hospitalMode: "registered", hospitalProfileId: "", selectedHospitalName: "", otherHospitalName: "", verificationChoice: "admin_private", email: "", password: "", confirmPassword: "" },
  })

  const hospitalMode = watch("hospitalMode")
  const password = watch("password")
  const docOne = watch("documentOne")?.[0]
  const docTwo = watch("documentTwo")?.[0]

  const filteredHospitals = useMemo(() => {
    const q = hospitalSearch.toLowerCase().trim()
    if (!q) return []
    return hospitals.filter((h) => `${h.hospital_name} ${h.hospital_city}`.toLowerCase().includes(q)).slice(0, 7)
  }, [hospitals, hospitalSearch])

  const selectHospital = (hospital) => {
    setHospitalSearch(`${hospital.hospital_name}${hospital.hospital_city ? `, ${hospital.hospital_city}` : ""}`)
    setValue("hospitalProfileId", hospital.profile_id, { shouldValidate: true })
    setValue("selectedHospitalName", hospital.hospital_name, { shouldValidate: true })
    setValue("hospitalMode", "registered", { shouldValidate: true })
    setSuggestionsOpen(false)
  }

  const chooseOther = () => {
    setValue("hospitalMode", "other", { shouldValidate: true })
    setValue("hospitalProfileId", "")
    setValue("selectedHospitalName", "")
    setValue("otherHospitalName", hospitalSearch)
    setSuggestionsOpen(false)
  }

  const goNext = async () => {
    const fields =
      step === 1
        ? ["fullName", "phone", "age", "city", "relationshipToPatient", "emergencyContact"]
        : ["requiredBloodGroup", "unitsRequired", "hospitalMode"]

    if (step === 2) {
      if (hospitalMode === "registered") fields.push("hospitalProfileId")
      if (hospitalMode === "other") {
        fields.push("otherHospitalName", "documentOne", "documentTwo", "verificationChoice")
      }
    }

    const ok = await trigger(fields)
    if (!ok) return

    // ✅ CORE LOGIC (ONLY CHANGE)
    if (step === 2) {
      if (shouldSkipAuthStep) {
        handleSubmit(onSubmit)()   // direct submit
        return
      }
      setStep(3)
      return
    }

    setStep((prev) => prev + 1)
  }

  const onSubmit = async (data) => {
    try {
      const payload = isLoggedIn
        ? data
        : data // login wali info included already

      const result = await registerPatientEmergencyRequest(payload)

      navigate(`/request-success?email=${encodeURIComponent(data.email || result?.user?.email || "")}&request=${result?.request?.id || ""}`)
    } catch (error) {
      setError("root", { message: error?.message || "Unable to create blood request." })
    }
  }

  return (
    <AuthLayout title="Request blood" des={shouldSkipAuthStep ? "Create an emergency blood request in two simple steps." : "Create an emergency blood request and account in three simple steps."} wide>
      <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#f7f7f7] px-4 py-3">


        <StepBadge number="1" label="Basic info" active={step === 1} done={step > 1} />
        <span className="h-px flex-1 bg-black/10 mx-3" />
        <StepBadge number="2" label="Request" active={step === 2} done={false} />

        {!shouldSkipAuthStep && (
          <>
            <span className="h-px flex-1 bg-black/10 mx-3" />
            <StepBadge number="3" label="Account" active={step === 3} done={false} />
          </>
        )}

      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {step === 1 && <div className="grid gap-4 md:grid-cols-2">

          <InputField label="Patient / attendant name" placeholder="Full name" icon={UserRound} error={errors.fullName} {...register("fullName", { required: "Name is required" })} />

          <InputField label="Phone" placeholder="03xx xxxxxxx" icon={Phone} error={errors.phone} {...register("phone", { required: "Phone is required" })} />

          <InputField label="Patient age" type="number" min="1" max="130" maxLength={3} placeholder="Age" icon={UserRound} error={errors.age} onInput={(e) => { e.currentTarget.value = e.currentTarget.value.slice(0, 3) }} {...register("age", { required: "Age is required", min: { value: 1, message: "Enter valid age" }, max: { value: 130, message: "Maximum age is 130" } })} />

          <InputField label="City" placeholder="Enter city" icon={MapPin} error={errors.city} {...register("city", { required: "City is required" })} />

          <InputField label="Relation with patient" placeholder="Brother, father, friend" icon={HeartHandshake} error={errors.relationshipToPatient} {...register("relationshipToPatient", { required: "Relation is required" })} />

          <InputField label="Emergency contact" placeholder="Backup contact number" icon={Phone} error={errors.emergencyContact} {...register("emergencyContact", { required: "Emergency contact is required" })} />
        </div>
        }
        {step === 2 && <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">

            <SelectField label="Required blood group" icon={HeartHandshake} error={errors.requiredBloodGroup} {...register("requiredBloodGroup", { required: "Blood group is required" })}>
              <option value="">Select blood group</option>
              {bloodGroups.map((g) =>
                <option key={g} value={g}>{g}</option>
              )}

            </SelectField>
            <InputField label="Units required" type="number" min="1" placeholder="2" icon={HeartHandshake} error={errors.unitsRequired} {...register("unitsRequired", { required: "Units are required", min: { value: 1, message: "At least 1 unit" } })} />

            <TextareaField label="Emergency notes" placeholder="Patient condition, ward, timing, extra instructions..." error={errors.emergencyNotes} {...register("emergencyNotes")} />

          </div>
          <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-4">

            <h3 className="mb-4 font-head text-xl font-black text-[#151515]">Find hospital</h3>
            <div className="relative"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#dc2626]" />

              <input value={hospitalSearch} onFocus={() => setSuggestionsOpen(true)} onChange={(e) => { setHospitalSearch(e.target.value); setValue("hospitalProfileId", ""); setValue("selectedHospitalName", ""); setSuggestionsOpen(true) }} placeholder="Search registered hospital by name or city" className="h-12.5 w-full rounded-lg border border-black/10 bg-white pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#dc2626]" />
              {suggestionsOpen && hospitalSearch && <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-black/10 bg-white p-2 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
                {filteredHospitals.length ?
                  filteredHospitals.map((h) => <button key={h.profile_id} type="button" onClick={() => selectHospital(h)} className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left hover:bg-[#f7f7f7]"><Hospital className="mt-0.5 size-5 text-[#dc2626]" /><span><b className="block text-sm text-[#151515]">{h.hospital_name}</b><small className="text-[#555]">{h.hospital_city || "Registered hospital"}</small></span></button>) :

                  <div className="p-3 text-sm font-semibold text-[#555]">No registered hospital found.
                  </div>}

                <button type="button" onClick={chooseOther} className="mt-1 flex w-full items-center gap-3 rounded-xl border border-[#dc2626]/20 bg-[#dc2626]/5 px-3 py-3 text-left text-sm font-bold text-[#dc2626]"><X size={17} />Hospital not listed, choose Other</button>
              </div>}
            </div>
            <input type="hidden" {...register("hospitalProfileId", { required: hospitalMode === "registered" ? "Please select a registered hospital or choose Other" : false })} />
            {errors.hospitalProfileId && <p className="mt-2 text-xs font-bold text-[#dc2626]">{errors.hospitalProfileId.message}</p>}
            {hospitalMode === "other" && <div className="mt-5 space-y-4"><InputField label="Other hospital name" placeholder="Enter hospital name" icon={Hospital} error={errors.otherHospitalName} {...register("otherHospitalName", { required: "Hospital name is required" })} />
              <div className="grid gap-4 md:grid-cols-2"><FileBox label="Upload blood requirement slip" hint="Doctor prescription / blood requirement slip" file={docOne} error={errors.documentOne} registerProps={register("documentOne", { validate: (files) => files?.length > 0 || "Blood requirement slip is required" })} /><FileBox label="Upload patient hospital document" hint="Admission slip / hospital card / case paper" file={docTwo} error={errors.documentTwo} registerProps={register("documentTwo", { validate: (files) => files?.length > 0 || "Patient hospital document is required" })} /></div>
              <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-black/10"><p className="font-head text-base font-black text-[#151515]">Verification option</p><label className="flex cursor-pointer gap-3 rounded-xl border border-black/10 p-3 text-sm font-semibold text-[#555]"><input type="radio" value="admin_private" className="mt-1 accent-[#dc2626]" {...register("verificationChoice", { required: true })} /><span><b className="text-[#151515]">Admin verify privately.</b> Documents will not be public.</span></label><label className="flex cursor-pointer gap-3 rounded-xl border border-black/10 p-3 text-sm font-semibold text-[#555]"><input type="radio" value="public_trust" className="mt-1 accent-[#dc2626]" {...register("verificationChoice", { required: true })} /><span><b className="text-[#151515]">Post direct request.</b> Documents can be visible on request page and trust score will show 50%.</span></label></div>
            </div>}
          </div>
        </div>}
        {step === 3 && !shouldSkipAuthStep && <div className="grid gap-4 md:grid-cols-2">

          <InputField label="Email address" type="email" placeholder="you@example.com" icon={Mail} autoComplete="email" error={errors.email} {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter valid email" } })} />

          <InputField label="Password" type="password" placeholder="Create password" icon={LockKeyhole} autoComplete="new-password" error={errors.password} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })} /><div className="md:col-span-2">

            <InputField label="Confirm password" type="password" placeholder="Confirm password" icon={LockKeyhole} autoComplete="new-password" error={errors.confirmPassword} {...register("confirmPassword", { required: "Confirm password is required", validate: (v) => v === password || "Passwords do not match" })} />

          </div>
        </div>}
        {errors.root &&
          <p className="rounded-2xl bg-[#dc2626]/10 px-4 py-3 text-sm font-bold text-[#dc2626]">{errors.root.message}</p>
        }
        <div className="flex items-center justify-between gap-3 pt-2">

          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((p) => p - 1)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 font-head text-sm font-black text-[#151515] hover:bg-[#f7f7f7]"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 font-head text-sm font-black text-[#151515] hover:bg-[#f7f7f7]"
            >
              Cancel
            </Link>
          )}

          {/* ✅ NEXT / CREATE BUTTON LOGIC FIXED */}
          {step === 2 && shouldSkipAuthStep ? (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#dc2626] px-6 font-head text-sm font-black text-white hover:bg-[#b91c1c]"
            >
              Create request <ShieldCheck size={16} />
            </button>
          ) : step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#dc2626] px-6 font-head text-sm font-black text-white hover:bg-[#b91c1c]"
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#151515] px-6 font-head text-sm font-black text-white hover:bg-[#dc2626] disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Create request"} <ShieldCheck size={16} />
            </button>
          )}

          {/* {step > 1 ?
            <button type="button" onClick={() => setStep((p) => p - 1)} className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 font-head text-sm font-black text-[#151515] hover:bg-[#f7f7f7]"><ArrowLeft size={16} /> Back</button>
            : <Link to="/" className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white px-5 font-head text-sm font-black text-[#151515] hover:bg-[#f7f7f7]">Cancel</Link>
          }
          {step < 3 ?
            <button type="button" onClick={goNext} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#dc2626] px-6 font-head text-sm font-black text-white hover:bg-[#b91c1c]">Next <ArrowRight size={16} /></button>
            : <button type="submit" disabled={isSubmitting} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#151515] px-6 font-head text-sm font-black text-white hover:bg-[#dc2626] disabled:opacity-70">{isSubmitting ? "Submitting..." : "Create request"} <ShieldCheck size={16} />
            </button>
          } */}
        </div>
      </form>
    </AuthLayout>
  )
}
export default PatientRequest
