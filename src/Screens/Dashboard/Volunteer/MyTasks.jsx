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

const MyTasks = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="My Tasks" description="Track assigned, contacted, on way and completed tasks.">
    <DataPanel title="Assigned tasks">
      <RequestRow group="O-" title="Call donor confirmation" meta="Status: Contacted" status="Contacted" tone="green" />
      <RequestRow group="B+" title="Coordinate hospital desk" meta="Status: On way" status="On way" tone="amber" />
    </DataPanel>
  </DashboardLayout>
)

export default MyTasks
