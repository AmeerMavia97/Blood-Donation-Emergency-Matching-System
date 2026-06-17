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

const AuditLogs = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Audit Logs" description="Track status changes, verification history and contact sharing logs.">
    <DataPanel title="Audit trail">
      <RequestRow group="O-" title="Contact shared" meta="Donor consent accepted • Today 12:05 PM" status="Logged" tone="green" />
      <RequestRow group="AB+" title="Verification updated" meta="Approved by Hospital Verifier • Today 10:40 AM" status="Logged" tone="green" />
    </DataPanel>
  </DashboardLayout>
)

export default AuditLogs
