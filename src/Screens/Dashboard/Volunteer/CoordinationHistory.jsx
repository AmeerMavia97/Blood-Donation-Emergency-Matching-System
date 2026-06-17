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

const CoordinationHistory = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Coordination History" description="Completed assistance records.">
    <DataPanel title="Completed assistance">
      <RequestRow group="O-" title="Civil Hospital" meta="Donor reached hospital • Completed today" status="Completed" tone="green" />
      <RequestRow group="A+" title="Jinnah Hospital" meta="Attendant guided • Completed yesterday" status="Completed" tone="green" />
    </DataPanel>
  </DashboardLayout>
)

export default CoordinationHistory
