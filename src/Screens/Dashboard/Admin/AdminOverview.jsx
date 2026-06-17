import { Activity, Bell, CheckCircle2, Clock, Droplet, FileText, GitBranch, HeartPulse, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, ToggleRight, TriangleAlert, UserCog, UserRound, Users, UserX, XCircle } from "lucide-react"
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
const stats = [
  { value: "128", label: "Total requests", icon: FileText },
  { value: "18", label: "Pending verification", icon: Clock },
  { value: "2.3K", label: "Available donors", icon: Users },
  { value: "91", label: "Fulfilled requests", icon: CheckCircle2 },
]

const roleName = "Admin Dashboard"
const AdminOverview = () => {
  return (
    <DashboardLayout roleName={roleName} tabs={tabs} title="Admin Overview" description="Control full BloodBridge operations: requests, donors, matching engine, users, blood banks, volunteers, alerts and audit logs.">
      <div className="space-y-6">
        <StatGrid stats={stats} />
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <DataPanel title="Active emergency workflow" action="Export">
            <div className="space-y-1">
              <RequestRow group="O-" title="Civil Hospital" meta="2 units needed • Emergency verified" status="Matched" tone="green" />
              <RequestRow group="AB+" title="Aga Khan Hospital" meta="1 unit needed • Awaiting response" status="Pending" tone="amber" />
              <RequestRow group="B+" title="Liaquat National" meta="3 units needed • Coordinator assigned" status="Verified" tone="red" />
            </div>
          </DataPanel>
          <HeroNotice title="Role focused workspace" desc="This dashboard is structured around the exact tabs and actions required for admin dashboard. Data is sample UI for now and ready to connect with backend APIs." />
        </div>
      </div>
    </DashboardLayout>
  )
}
export default AdminOverview
