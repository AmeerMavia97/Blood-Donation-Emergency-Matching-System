import Footer from "@/Components/Layout/Footer/Footer"
import Navbar from "@/Components/Layout/Navbar/Navbar"
import { getPublicBloodRequests } from "@/services/authApi"
import { useQuery } from "@tanstack/react-query"
import { Clock, Droplet, Hospital, MapPin, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

const statusLabel = (status) => ({ verified: "Verified", matched: "Matched", fulfilled: "Fulfilled", public_unverified: "Public proof" }[status] || status?.replaceAll("_", " ") || "Pending")

const RequestsPage = () => {
  const { data = [], isLoading, error } = useQuery({ queryKey: ["public-blood-requests"], queryFn: getPublicBloodRequests })

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-40 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 font-head text-sm font-black uppercase tracking-[0.25em] text-[#dc2626]">Verified requests</p>
          <h1 className="font-head text-5xl font-black text-[#151515]">Blood request board</h1>
          <p className="mt-4 text-[#555]">Only approved, matched or public proof requests appear here for donors and volunteers.</p>
        </div>
        {isLoading && <p className="font-bold text-[#555]">Loading requests...</p>}
        {error && <p className="rounded-2xl bg-[#dc2626]/10 p-4 text-sm font-bold text-[#dc2626]">{error.message}</p>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <Link key={item.id} to={`/requests/${item.id}`} className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.1)]">
              <div className="mb-5 flex items-center justify-between"><span className="flex size-16 items-center justify-center rounded-2xl bg-[#dc2626] font-head text-2xl font-black text-white">{item.required_blood_group}</span><span className="rounded-full bg-[#151515] px-3 py-1 text-xs font-black capitalize text-white">{statusLabel(item.status)}</span></div>
              <h3 className="font-head text-2xl font-black text-[#151515]">{item.hospital_name || "Hospital pending"}</h3>
              <div className="mt-4 space-y-2 text-sm font-semibold text-[#555]"><p className="flex items-center gap-2"><Droplet size={15} className="text-[#dc2626]" />{item.units_required} Units needed</p><p className="flex items-center gap-2"><MapPin size={15} className="text-[#dc2626]" />{item.city || "City not added"}</p><p className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#dc2626]" />Trust score {item.trust_score || 50}%</p></div>
            </Link>
          ))}
        </div>
        {!isLoading && data.length === 0 && <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center"><Hospital className="mx-auto mb-4 size-10 text-[#dc2626]" /><p className="font-head text-2xl font-black text-[#151515]">No public requests yet</p><p className="mt-2 text-[#555]">Approved requests will appear here.</p></div>}
      </section>
      <Footer />
    </main>
  )
}
export default RequestsPage
