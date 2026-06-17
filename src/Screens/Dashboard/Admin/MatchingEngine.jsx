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

const MatchingEngine = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Matching Engine" description="View eligible donors, match score and consent status.">
    <DataPanel title="Eligible donor matches">
      <RequestRow group="O-" title="Ali Khan" meta="Match score 96% • 4.2 km • Consent accepted" status="High score" tone="green" />
      <RequestRow group="O-" title="Bilal Shah" meta="Match score 82% • 7.8 km • Consent pending" status="Pending" tone="amber" />
    </DataPanel>
  </DashboardLayout>
)

export default MatchingEngine
