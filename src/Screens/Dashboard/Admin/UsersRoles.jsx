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

const UsersRoles = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Users & Roles" description="Manage patient attendants, donors, verifiers, blood banks and volunteers.">
    <DataPanel title="Role overview">
      <RequestRow group="PA" title="Patient attendants" meta="214 active users" status="Active" tone="green" />
      <RequestRow group="DN" title="Donors" meta="2,340 registered donors" status="Active" tone="green" />
      <RequestRow group="HV" title="Hospital verifiers" meta="46 verifier accounts" status="Review" tone="amber" />
      <RequestRow group="BB" title="Blood banks" meta="18 stock managers" status="Active" tone="green" />
    </DataPanel>
  </DashboardLayout>
)

export default UsersRoles
