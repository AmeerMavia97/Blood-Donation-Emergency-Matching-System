import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { acceptBloodBankOffer, getPatientBloodBankOffers } from "@/services/authApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Building2, CheckCircle2, Droplet, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { patientTabs, roleName } from "./patientTabs"

const BloodBankOffers = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data = [], isLoading, error } = useQuery({ queryKey: ["patient-blood-bank-offers"], queryFn: getPatientBloodBankOffers })
  const mutation = useMutation({ mutationFn: acceptBloodBankOffer, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patient-blood-bank-offers"] }) })
  const action = <button onClick={() => navigate("/blood-request")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 font-head text-sm font-black text-white hover:bg-[#b91c1c]"><PlusCircle size={17} />Create Request</button>

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Blood Bank Offers" description="Review available blood units offered by registered blood banks." action={action}>
      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.04)]">
        <div className="mb-6 flex items-center gap-3"><Building2 className="text-[#dc2626]" /><div><h3 className="font-head text-2xl font-black text-[#151515]">Available offers</h3><p className="text-sm font-semibold text-[#666]">Patient attendant can accept a reserved or available offer.</p></div></div>
        {isLoading && <p className="text-sm font-semibold text-[#555]">Loading...</p>}
        {error && <p className="text-sm font-bold text-[#dc2626]">{error.message}</p>}
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((offer) => <div key={offer.id} className="rounded-[1.7rem] border border-black/10 bg-[#fafafa] p-5"><div className="mb-5 flex items-start justify-between gap-4"><span className="flex size-14 items-center justify-center rounded-2xl bg-[#dc2626] text-white"><Droplet size={24} /></span><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black uppercase text-emerald-700">{offer.status}</span></div><h4 className="font-head text-2xl font-black text-[#151515]">{offer.bank_name}</h4><p className="mt-2 text-sm font-semibold text-[#555]"><b>{offer.units_available}</b> Unit Available</p><p className="mt-1 text-sm font-semibold text-[#555]">Blood Group: <b className="text-[#dc2626]">{offer.blood_group}</b></p><button onClick={() => mutation.mutate(offer.id)} disabled={mutation.isPending || offer.status === "Accepted"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#151515] px-4 py-3 text-xs font-black text-white hover:bg-[#dc2626] disabled:opacity-60"><CheckCircle2 size={15} />{offer.status === "Accepted" ? "Accepted" : "Accept Offer"}</button></div>)}
        </div>
        {!data.length && !isLoading && <p className="rounded-2xl bg-[#f7f7f7] p-5 text-sm font-semibold text-[#555]">No blood bank offers yet.</p>}
      </section>
    </DashboardLayout>
  )
}
export default BloodBankOffers
