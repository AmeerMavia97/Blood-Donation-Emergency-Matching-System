import AuthLayout from "@/Components/ScreensLayout/Auth/AuthLayout"
import { CheckCircle2, Copy, ExternalLink, LogIn } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"

const PatientRequestSuccess = () => {
  const [params] = useSearchParams()
  const requestId = params.get("request")
  const email = params.get("email")
  const requestPath = requestId ? `/requests/${requestId}` : "/requests"
  const fullLink = `${window.location.origin}${requestPath}`

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(fullLink) } catch { return null }
  }

  return (
    <AuthLayout title="Request created" des="Your account and emergency request were created successfully. Please confirm your email before login.">
      <div className="space-y-5 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#dc2626]/10 text-[#dc2626]"><CheckCircle2 size={34} /></div>
        {email && <p className="rounded-2xl bg-[#f7f7f7] px-4 py-3 text-sm font-semibold text-[#555]">Confirmation email sent to <b className="text-[#151515]">{email}</b></p>}
        <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-4 text-left">
          <p className="font-head text-lg font-black text-[#151515]">Public request link</p>
          <p className="mt-2 break-all text-sm font-semibold text-[#555]">{fullLink}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#151515] ring-1 ring-black/10 hover:text-[#dc2626]"><Copy size={14} />Copy link</button>
            <Link to={requestPath} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#151515] ring-1 ring-black/10 hover:text-[#dc2626]"><ExternalLink size={14} />Open request</Link>
          </div>
        </div>
        <Link to="/login" className="inline-flex h-13 w-full items-center justify-center gap-3 rounded-2xl bg-[#151515] font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#dc2626]"><LogIn size={17} />Login to dashboard</Link>
      </div>
    </AuthLayout>
  )
}
export default PatientRequestSuccess
