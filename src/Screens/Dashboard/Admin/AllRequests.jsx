import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "All Requests", path: "/admin/requests", icon: FileText, end: false },
  { label: "Donors", path: "/admin/donors", icon: Users, end: false },
  { label: "Matching Engine", path: "/admin/matching-engine", icon: GitBranch, end: false },
  { label: "Users & Roles", path: "/admin/users-roles", icon: UserCog, end: false },
  { label: "Blood Banks", path: "/admin/blood-banks", icon: Droplet, end: false },
  { label: "Volunteer Tasks", path: "/admin/volunteer-tasks", icon: ListTodo, end: false },
  { label: "Alerts", path: "/admin/alerts", icon: TriangleAlert, end: false },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: History, end: false },
]
const roleName = "Admin Dashboard"

const AllRequests = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="All Requests" description="Manage pending, verified, matched, fulfilled and expired requests.">
    <DataPanel title="Request management">
      <RequestRow group="O-" title="Civil Hospital" meta="Pending verification • 2 units" status="Pending" tone="amber" />
      <RequestRow group="AB+" title="Aga Khan Hospital" meta="Verified • 1 unit" status="Verified" tone="red" />
      <RequestRow group="B+" title="Liaquat National" meta="Fulfilled • 3 units" status="Fulfilled" tone="green" />
    </DataPanel>
  </DashboardLayout>
)

export default AllRequests
