import InputField from "@/Components/ui/input"
import { ArrowRight, LockKeyhole, Mail, UserRound, UsersRound, Eye } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "@/services/authApi"
import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: "donor",
      phone: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password")
  const role = watch("role")

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data

      await registerUser(payload)

      navigate(
        `/confirm-email?email=${encodeURIComponent(data.email)}&role=${data.role}`
      )
    } catch (error) {
      setError("root", {
        message: error?.message || "Unable to create account. Please try again.",
      })
    }
  }

  return (
    <AuthLayout
      title="Create account"
      des="Join BloodBridge and continue to your role-based profile setup."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField
          label="Full name"
          {...register("fullName", { required: "Full name is required" })}
          error={errors.fullName}
        />

        <div className="grid gap-4 md:grid-cols-2">

          <InputField
            label="Email"
            icon={Mail}
            {...register("email", { required: "Email is required" })}
            error={errors.email}
          />

          <InputField
            label="Phone"
            {...register("phone", { required: "Phone is required" })}
            error={errors.phone}
          />

          <InputField
            label="City"
            {...register("city", { required: "City is required" })}
            error={errors.city}
          />

          <div>
            <label className="mb-2 block text-sm font-bold">Role</label>
            <select
              className="h-14 w-full rounded-2xl border px-4"
              {...register("role")}
            >
              <option value="donor">Donor</option>
              <option value="hospital_verifier">Hospital Verifier</option>
              <option value="blood_bank">Blood Bank</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
        </div>

        {/* DONOR */}
        {role === "donor" && (
          <div className="grid gap-4 md:grid-cols-2">

            {/* Blood Group Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-bold text-[#151515]">
                Blood Group
              </label>

              <select
                className="h-14 w-full rounded-2xl border px-4 text-sm"
                {...register("blood_group", {
                  required: "Blood group is required",
                })}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <InputField label="Location" {...register("location")} />

            <InputField
              label="Last Donation Date"
              type="date"
              {...register("last_donation_date")}
            />
          </div>
        )}

        {/* HOSPITAL */}
        {role === "hospital_verifier" && (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="Hospital Name" {...register("hospital_name")} />
            <InputField label="Hospital City" {...register("hospital_city")} />
            <InputField label="Hospital Address" {...register("hospital_address")} />
            <InputField label="Staff ID" {...register("staff_id")} />
            <InputField label="Designation" {...register("designation")} />
          </div>
        )}

        {/* BLOOD BANK */}
        {role === "blood_bank" && (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="Blood Bank Name" {...register("blood_bank_name")} />
            <InputField label="License Number" {...register("license_number")} />
            <InputField label="Address" {...register("address")} />
            <InputField label="Contact Person" {...register("contact_person")} />
          </div>
        )}

        {/* VOLUNTEER */}
        {role === "volunteer" && (
          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="Service Area" {...register("service_area")} />
            <InputField label="Skills" {...register("skills")} />
          </div>
        )}

        <InputField
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password}
          icon={LockKeyhole}
          rightIcon={Eye}
        />

        <InputField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            validate: (v) => v === password || "Passwords do not match",
          })}
          error={errors.confirmPassword}
          icon={LockKeyhole}
          rightIcon={Eye}
        />

        {errors.root && (
          <p className="bg-red-100 text-red-600 p-3 rounded-xl">
            {errors.root.message}
          </p>
        )}

      

         <button type="submit" disabled={isSubmitting} className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#151515] font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#dc2626] disabled:opacity-70">
                 {isSubmitting ? "Creating..." : "Create account"}
          <ArrowRight />
                </button>
      </form>

      <p className="mt-7 text-center font-para text-sm font-medium text-[#555]">Already have an account? <Link to="/login">Login</Link></p>
    </AuthLayout>
  )
}

export default Register