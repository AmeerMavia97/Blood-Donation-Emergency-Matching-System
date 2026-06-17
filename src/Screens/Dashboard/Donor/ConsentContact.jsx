import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/donor", icon: LayoutDashboard, end: true },
  { label: "My Donor Profile", path: "/donor/profile", icon: UserRound, end: false },
  { label: "Blood Requests", path: "/donor/requests", icon: Droplet, end: false },
  { label: "Consent & Contact", path: "/donor/consent", icon: ShieldCheck, end: false },
  { label: "Donation History", path: "/donor/history", icon: History, end: false },
]
const roleName = "Donor Dashboard"

const ConsentContact = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Consent & Contact" description="Control consent checkbox and contact sharing status before details are shared.">
    <div className="space-y-6">
      <HeroNotice title="Privacy-first contact sharing" desc="Your phone number is never shared until you accept a verified request and approve consent." />
      <DataPanel title="Consent status">
        <label className="flex items-start gap-3 rounded-2xl bg-[#f7f7f7] p-4 text-sm font-semibold text-[#555]">
          <input type="checkbox" className="mt-1 size-4 accent-[#dc2626]" />
          I agree to share my contact details only for accepted verified emergency requests.
        </label>
        <div className="mt-5"><StatusBadge tone="amber">Contact sharing pending</StatusBadge></div>
      </DataPanel>
    </div>
  </DashboardLayout>
)

export default ConsentContact
