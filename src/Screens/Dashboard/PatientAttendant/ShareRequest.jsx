import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { getMyPatientRequests, markRequestFulfilled } from "@/services/authApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckCircle2, Copy, ExternalLink, PlusCircle, Share2 } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { patientTabs, requestStatusLabel, roleName, statusTone } from "./patientTabs"

const ShareRequest = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: requests = [], isLoading, error } = useQuery({ queryKey: ["my-patient-requests"], queryFn: getMyPatientRequests })
  const verifiedRequests = requests.filter((r) => ["verified", "matched", "fulfilled"].includes(r.status))
  const [selectedId, setSelectedId] = useState("")
  const selected = useMemo(() => verifiedRequests.find((r) => r.id === selectedId) || verifiedRequests[0], [selectedId, verifiedRequests])
  const shareLink = selected ? `${window.location.origin}/requests/${selected.id}` : ""
  const mutation = useMutation({ mutationFn: markRequestFulfilled, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-patient-requests"] }) })
  const action = <button onClick={() => navigate("/blood-request")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 font-head text-sm font-black text-white hover:bg-[#b91c1c]"><PlusCircle size={17} />Create Request</button>

  const copy = async () => { if (shareLink) await navigator.clipboard.writeText(shareLink) }

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Share Request" description="Share verified blood requests and close fulfilled cases." action={action}>
      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.04)]">
        <div className="mb-6 flex items-center gap-3"><Share2 className="text-[#dc2626]" /><div><h3 className="font-head text-2xl font-black text-[#151515]">Verified share link</h3><p className="text-sm font-semibold text-[#666]">Share link appears after request verification.</p></div></div>
        {isLoading && <p className="text-sm font-semibold text-[#555]">Loading...</p>}
        {error && <p className="text-sm font-bold text-[#dc2626]">{error.message}</p>}
        {!verifiedRequests.length && !isLoading && <p className="rounded-2xl bg-[#f7f7f7] p-5 text-sm font-semibold text-[#555]">No verified request available for sharing yet.</p>}
        {selected && <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[1.7rem] bg-[#151515] p-5 text-white"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#ffb4b4]">Selected request</p><h4 className="mt-3 font-head text-3xl font-black">{selected.required_blood_group} blood needed</h4><p className="mt-2 text-sm text-white/60">{selected.hospital_name || "Hospital pending"}, {selected.units_required} unit(s)</p><span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${statusTone(selected.status)}`}>{requestStatusLabel(selected.status)}</span></div>
          <div>
            <label className="mb-2 block text-sm font-bold text-[#151515]">Select verified request</label>
            <select value={selected?.id || ""} onChange={(e) => setSelectedId(e.target.value)} className="h-12.5 w-full rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold outline-none focus:border-[#dc2626]">{verifiedRequests.map((r) => <option key={r.id} value={r.id}>#{r.id.slice(0, 8)} - {r.required_blood_group} - {r.hospital_name}</option>)}</select>
            <div className="mt-5 rounded-2xl bg-[#f7f7f7] p-4"><p className="text-xs font-black uppercase tracking-wide text-[#dc2626]">Share Link</p><p className="mt-2 break-all text-sm font-semibold text-[#555]">{shareLink}</p></div>
            <div className="mt-5 flex flex-wrap gap-3"><a href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#dc2626] px-5 py-3 text-xs font-black text-white">WhatsApp</a><button onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-xs font-black text-white"><Copy size={14} />Copy Link</button><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#f4f4f4] px-5 py-3 text-xs font-black text-[#151515]"><Share2 size={14} />Facebook</a><Link to={`/requests/${selected.id}`} className="inline-flex items-center gap-2 rounded-full bg-[#f4f4f4] px-5 py-3 text-xs font-black text-[#151515]"><ExternalLink size={14} />Open</Link></div>
            <button onClick={() => mutation.mutate(selected.id)} disabled={mutation.isPending || selected.status === "fulfilled"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#151515] px-5 py-3 font-head text-xs font-black uppercase tracking-wide text-white hover:bg-[#dc2626] disabled:opacity-60"><CheckCircle2 size={16} />{selected.status === "fulfilled" ? "Marked as fulfilled" : "Mark as Fulfilled"}</button>
          </div>
        </div>}
      </section>
    </DashboardLayout>
  )
}
export default ShareRequest
