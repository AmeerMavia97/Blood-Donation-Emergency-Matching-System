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

const ReservedUnits = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Reserved / Offered Units" description="Track reserved stock and delivered units.">
    <DataPanel title="Reserved stock">
      <RequestRow group="O-" title="Civil Hospital" meta="2 units reserved • delivery pending" status="Reserved" tone="amber" />
      <RequestRow group="B+" title="Liaquat National" meta="3 units delivered today" status="Delivered" tone="green" />
    </DataPanel>
  </DashboardLayout>
)

export default ReservedUnits
