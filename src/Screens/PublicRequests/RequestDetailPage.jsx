import Footer from "@/Components/Layout/Footer/Footer"
import Navbar from "@/Components/Layout/Navbar/Navbar"
import { getBloodRequestById } from "@/services/authApi"
import { useQuery } from "@tanstack/react-query"
import { Calendar, CheckCircle2, Copy, Droplet, FileText, Hospital, MapPin, ShieldCheck } from "lucide-react"
import { Link, useParams } from "react-router-dom"

const RequestDetailPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useQuery({ queryKey: ["blood-request", id], queryFn: () => getBloodRequestById(id), enabled: !!id })
  const publicDocs = data?.request_documents?.filter((doc) => doc.is_public) || []
  const shareLink = `${window.location.origin}/requests/${id}`

  return (
    <main className="min-h-screen bg-[#f4f4f4]"><Navbar />
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-40 lg:px-8">
        {isLoading && <p className="font-bold text-[#555]">Loading request...</p>}
        {error && <p className="rounded-2xl bg-[#dc2626]/10 p-4 text-sm font-bold text-[#dc2626]">{error.message}</p>}
        {data && <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_25px_80px_rgba(0,0,0,0.07)]">
            <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="font-head text-sm font-black uppercase tracking-[0.25em] text-[#dc2626]">Emergency request</p><h1 className="mt-3 font-head text-4xl font-black text-[#151515]">{data.required_blood_group} blood needed</h1></div><span className="flex size-20 items-center justify-center rounded-3xl bg-[#dc2626] font-head text-3xl font-black text-white">{data.required_blood_group}</span></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2"><Info icon={Hospital} label="Hospital" value={data.hospital_name || "Pending"} /><Info icon={Droplet} label="Units" value={`${data.units_required} Units`} /><Info icon={MapPin} label="City" value={data.city || "Not added"} /><Info icon={ShieldCheck} label="Trust score" value={`${data.trust_score || 50}%`} /><Info icon={Calendar} label="Status" value={data.status?.replaceAll("_", " ")} /><Info icon={CheckCircle2} label="Verification" value={data.verification_status?.replaceAll("_", " ")} /></div>
            <div className="mt-8 border-t border-black/10 pt-6"><h3 className="font-head text-2xl font-black text-[#151515]">Emergency notes</h3><p className="mt-3 leading-relaxed text-[#555]">{data.emergency_notes || "No extra notes added."}</p></div>
            {publicDocs.length > 0 && <div className="mt-8 border-t border-black/10 pt-6"><h3 className="font-head text-2xl font-black text-[#151515]">Public proof documents</h3><p className="mt-2 text-sm font-semibold text-[#555]">These documents are visible because attendant selected direct public request. Trust score is limited to 50% until admin verification.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{publicDocs.map((doc) => <a key={doc.id} href={doc.public_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#f7f7f7] p-4 text-sm font-bold text-[#151515] hover:text-[#dc2626]"><FileText size={18} />{doc.file_name}</a>)}</div></div>}
          </div>
          <aside className="space-y-5"><div className="rounded-[2rem] bg-[#151515] p-6 text-white"><h3 className="font-head text-2xl font-black">Share request</h3><p className="mt-2 break-all text-sm text-white/60">{shareLink}</p><button onClick={() => navigator.clipboard.writeText(shareLink)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#151515] hover:text-[#dc2626]"><Copy size={15} />Copy link</button></div><Link to="/blood-request" className="block rounded-[2rem] border border-black/10 bg-white p-6 text-center font-head text-lg font-black text-[#151515] hover:text-[#dc2626]">Create another request</Link></aside>
        </div>}
      </section><Footer /></main>
  )
}
const Info = ({ icon: Icon, label, value }) => <div className="rounded-2xl bg-[#f7f7f7] p-4"><p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#dc2626]"><Icon size={15} />{label}</p><p className="font-head text-xl font-black capitalize text-[#151515]">{value}</p></div>
export default RequestDetailPage
