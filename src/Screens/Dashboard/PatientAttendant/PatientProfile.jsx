import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { useAuthUser } from "@/Components/hooks/useAuthUser"
import { Mail, MapPin, Phone, UserRound } from "lucide-react"
import { patientTabs, roleName } from "./patientTabs"

const PatientProfile = () => {
  const { data } = useAuthUser()
  const profile = data?.profile || {}
  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Profile" description="Your patient attendant account information.">
      <div className="rounded-[2rem] border border-black/10 bg-white p-6"><div className="mb-6 flex items-center gap-4"><span className="flex size-16 items-center justify-center rounded-full bg-[#dc2626] text-white"><UserRound size={28} /></span><div><h3 className="font-head text-3xl font-black text-[#151515]">{profile.full_name || "Patient Attendant"}</h3><p className="text-sm font-semibold text-[#555]">Role: Patient Attendant</p></div></div><div className="grid gap-4 md:grid-cols-3"><Info icon={Mail} label="Email" value={profile.email} /><Info icon={Phone} label="Phone" value={profile.phone} /><Info icon={MapPin} label="City" value={profile.city} /></div></div>
    </DashboardLayout>
  )
}
const Info = ({ icon: Icon, label, value }) => <div className="rounded-2xl bg-[#f7f7f7] p-5"><p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#dc2626]"><Icon size={15} />{label}</p><p className="font-head text-xl font-black text-[#151515]">{value || "Not added"}</p></div>
export default PatientProfile
