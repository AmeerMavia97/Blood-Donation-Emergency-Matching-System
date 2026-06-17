import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/blood-bank", icon: LayoutDashboard, end: true },
  { label: "Blood Stock", path: "/blood-bank/stock", icon: Droplet, end: false },
  { label: "Update Stock", path: "/blood-bank/update-stock", icon: RefreshCw, end: false },
  { label: "Emergency Requests", path: "/blood-bank/requests", icon: Siren, end: false },
  { label: "Reserved / Offered Units", path: "/blood-bank/reserved", icon: PackageCheck, end: false },
]
const roleName = "Blood Bank"

const BloodStock = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Blood Stock" description="Monitor available units across all blood groups.">
    <div className="space-y-6">
      <HeroNotice title="Low stock alert: O-" desc="O negative stock is below emergency threshold. Consider urgent donor outreach." />
      <DataPanel title="Available units"><BloodStockGrid values={[{ group: "A+", units: 52 }, { group: "A-", units: 14 }, { group: "B+", units: 44 }, { group: "B-", units: 8 }, { group: "AB+", units: 19 }, { group: "AB-", units: 5 }, { group: "O+", units: 63 }, { group: "O-", units: 3 }]} /></DataPanel>
    </div>
  </DashboardLayout>
)

export default BloodStock
