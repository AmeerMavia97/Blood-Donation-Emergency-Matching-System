import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { getMyPatientRequests } from "@/services/authApi"
import { useQuery } from "@tanstack/react-query"
import { Activity, ArrowRight, CheckCircle2, Clock, FileText, PlusCircle, ShieldCheck } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { patientTabs, requestStatusLabel, roleName, statusTone } from "./patientTabs"

const PatientAttendantOverview = () => {
  const navigate = useNavigate()
  const { data: requests = [], isLoading } = useQuery({ queryKey: ["my-patient-requests"], queryFn: getMyPatientRequests })

  const active = requests.filter((r) => !["fulfilled", "expired", "rejected"].includes(r.status)).length
  const verified = requests.filter((r) => ["verified", "matched", "fulfilled"].includes(r.status)).length
  const fulfilled = requests.filter((r) => r.status === "fulfilled").length
  const latest = requests.slice(0, 5)

  const cards = [
    { label: "Total Requests", value: requests.length, icon: FileText, desc: "All emergency cases" },
    { label: "Active Requests", value: active, icon: Activity, desc: "Currently in progress" },
    { label: "Verified Requests", value: verified, icon: ShieldCheck, desc: "Ready for sharing" },
    { label: "Fulfilled Requests", value: fulfilled, icon: CheckCircle2, desc: "Blood received" },
  ]

  const action = (
    <button onClick={() => navigate("/blood-request")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 font-head text-sm font-black text-white shadow-lg shadow-[#dc2626]/20 transition hover:bg-[#b91c1c]">
      <PlusCircle size={17} /> Create Request
    </button>
  )

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Patient Dashboard" description="Track active blood requests, verification, donor matches, offers and fulfillment." action={action}>
      <div className="space-y-6">

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className="group rounded-[1.7rem] border border-black/10 bg-white p-5 shadow-[0_16px_55px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#dc2626]/10 text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white"><Icon size={21} /></span>
                  <span className="font-head text-4xl font-black text-[#151515]">{isLoading ? "..." : card.value}</span>
                </div>
                <p className="font-head text-lg font-black text-[#151515]">{card.label}</p>
                <p className="mt-1 text-sm font-semibold text-[#666]">{card.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.04)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-head text-2xl font-black text-[#151515]">Recent requests</h3>
                <p className="mt-1 text-sm font-semibold text-[#666]">Latest request status updates.</p>
              </div>
              <Clock className="text-[#dc2626]" />
            </div>
            <div className="space-y-3">
              {latest.map((r) => (
                <Link key={r.id} to={`/attendant/requests/${r.id}`} className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[#fafafa] p-4 transition hover:border-[#dc2626]/40 sm:flex-row sm:items-center">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#dc2626] font-head text-xl font-black text-white">{r.required_blood_group}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-head text-lg font-black text-[#151515]">{r.hospital_name || "Hospital pending"}</h4>
                    <p className="mt-1 text-sm font-semibold text-[#666]">{r.units_required} unit(s) needed, {r.city || "city not added"}</p>
                  </div>
                  <span className={`w-fit font-para rounded-full px-3 py-1 text-xs font-black uppercase ${statusTone(r.status)}`}>{requestStatusLabel(r.status)}</span>
                </Link>
              ))}
              {!latest.length && !isLoading && <p className="rounded-2xl bg-[#f7f7f7] p-5 text-sm font-semibold text-[#666]">No request created yet.</p>}
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.04)]">
            <h3 className="font-head text-2xl font-black text-[#151515]">Active request status</h3>
            <div className="mt-6 space-y-5">
              {["Request Created", "Verification", "Donor Matching", "Contacted", "Fulfilled"].map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`flex size-9 items-center justify-center rounded-full ${index <= 1 ? "bg-[#dc2626] text-white" : "bg-black/5 text-[#777]"}`}>{index + 1}</span>
                    {index !== 4 && <span className="mt-2 h-8 w-px bg-black/10" />}
                  </div>
                  <div>
                    <h4 className="font-head text-lg font-black text-[#151515]">{item}</h4>
                    <p className="text-sm font-semibold text-[#666]">{index <= 1 ? "In progress" : "Waiting"}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PatientAttendantOverview
