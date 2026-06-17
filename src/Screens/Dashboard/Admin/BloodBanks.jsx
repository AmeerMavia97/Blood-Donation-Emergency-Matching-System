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

const BloodBanks = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Blood Banks" description="View stock overview and low stock alerts.">
    <div className="space-y-6">
      <HeroNotice title="5 low stock alerts" desc="O-, AB- and B- groups need urgent stock update from connected blood banks." />
      <DataPanel title="Stock overview"><BloodStockGrid values={[{ group: "A+", units: 52 }, { group: "A-", units: 14 }, { group: "B+", units: 44 }, { group: "B-", units: 8 }, { group: "AB+", units: 19 }, { group: "AB-", units: 5 }, { group: "O+", units: 63 }, { group: "O-", units: 3 }]} /></DataPanel>
    </div>
  </DashboardLayout>
)

export default BloodBanks
