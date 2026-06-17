import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/volunteer", icon: LayoutDashboard, end: true },
  { label: "Nearby Requests", path: "/volunteer/nearby-requests", icon: MapPin, end: false },
  { label: "My Tasks", path: "/volunteer/tasks", icon: ListTodo, end: false },
  { label: "No Show Reports", path: "/volunteer/no-show", icon: UserX, end: false },
  { label: "Coordination History", path: "/volunteer/history", icon: History, end: false },
]
const roleName = "Volunteer Dashboard"

const NearbyRequests = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Nearby Requests" description="Verified requests needing coordination help.">
    <DataPanel title="Nearby verified requests">
      <RequestRow group="O-" title="Civil Hospital" meta="2 units • 3 donors contacted" status="Need help" tone="red" />
      <RequestRow group="AB+" title="Aga Khan Hospital" meta="1 unit • donor on way" status="Coordinate" tone="amber" />
    </DataPanel>
  </DashboardLayout>
)

export default NearbyRequests
