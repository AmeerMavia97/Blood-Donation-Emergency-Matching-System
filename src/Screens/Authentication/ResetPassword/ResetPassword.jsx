import InputField from "@/Components/ui/input"
import { ArrowRight, Droplet, Mail } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { sendResetPasswordEmail } from "@/services/authApi"
import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      await sendResetPasswordEmail({ email: data.email })
    } catch (error) {
      setError("root", {
        message: error?.message || "Unable to send reset email. Please try again.",
      })
    }
  }

  return (

     <AuthLayout title={'Reset password'} des={`Enter your email and we will send you a password reset link.`}>

 {isSubmitSuccessful ? (
          <div className="rounded-2xl bg-[#dc2626]/10 p-5 text-center">
            <h3 className="font-head text-2xl font-black text-[#151515]">
              Check your email
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#555]">
              We sent a password reset link to your email address.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.root && (
              <p className="rounded-2xl bg-[#dc2626]/10 px-4 py-3 text-sm font-bold text-[#dc2626]">
                {errors.root.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#151515] font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#dc2626] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        <p className="mt-7 text-center font-para text-sm font-medium text-[#555]">
          Remember password?{" "}
          <Link to="/login" className="font-black text-[#151515] hover:text-[#dc2626]">
            Back to login
          </Link>
        </p>
            </AuthLayout>

  )
}

export default ResetPassword
