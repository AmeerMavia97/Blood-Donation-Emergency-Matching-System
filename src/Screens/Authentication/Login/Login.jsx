import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"
import InputField from "@/Components/ui/input"
import { getDashboardPath, loginUser } from "@/services/authApi"
import { ArrowRight, LockKeyhole, Mail } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { AUTH_USER_QUERY_KEY } from "@/Components/hooks/useAuthUser"


const LoginPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get("redirect")
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: "", password: "", remember: false },
  })

  const onSubmit = async (data) => {
    try {
      const authData = await loginUser(data)

      queryClient.setQueryData(
        AUTH_USER_QUERY_KEY,
        authData
      )

      navigate(
        redirect || getDashboardPath(authData.profile),
        { replace: true }
      )
    } catch (error) {
      setError("root", {
        message: error?.message || "Unable to sign in.",
      })
    }
  }

  return (
    <AuthLayout title={'Welcome back'} des={"Sign in to access your BloodBridge dashboard."}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField label="Email address" type="email" placeholder="you@example.com" icon={Mail} error={errors.email} autoComplete="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
        <InputField label="Password" type="password" placeholder="Enter password" icon={LockKeyhole} error={errors.password} {...register("password", { required: "Password is required" })} />
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 font-semibold text-[#555]"><input type="checkbox" className="size-4 accent-[#dc2626]" {...register("remember")} />Remember me</label>
          <Link to="/reset-password" className="font-semibold font-para text-[#dc2626]">Forgot password?</Link>
        </div>
        {errors.root && <p className="rounded-2xl bg-[#dc2626]/10 px-4 py-3 text-sm font-bold text-[#dc2626]">{errors.root.message}</p>}
        <button type="submit" disabled={isSubmitting} className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#151515] font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#dc2626] disabled:opacity-70">
          {isSubmitting ? "Signing in..." : "Sign in"}<ArrowRight size={18} />
        </button>
      </form>
      <p className="mt-7 text-center font-para text-sm font-medium text-[#555]">New to BloodBridge? <Link to="/register" className="font-para text-[#151515] hover:text-[#dc2626]">Create account</Link></p>
    </AuthLayout>
  )
}
export default LoginPage
