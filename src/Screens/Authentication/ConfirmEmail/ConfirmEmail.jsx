import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"
import { ArrowRight, Droplet, MailCheck } from "lucide-react"
import React from "react"
import { Link, useSearchParams } from "react-router-dom"

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")

  return (


    <AuthLayout title={'Confirm your email'} des={`We sent a verification link{email ? " to" : ""}{" "}
          {email && <span className="font-bold text-[#151515]">{email}</span>}. Please verify your email to continue profile setup.`}>

      <Link
        to="/login"
        className="mt-8 font-para inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#151515]  text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#dc2626]"
      >
        Back to login
        <ArrowRight size={18} />
      </Link>

      <p className="mt-5 text-xs font-para font-medium text-[#777]">
        After confirmation, login and complete your BloodBridge profile.
      </p>
    </AuthLayout>

  )
}

export default ConfirmEmail
