import { Activity, Bell, CheckCircle2, Clock, Droplet, FileText, GitBranch, HeartPulse, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, ToggleRight, TriangleAlert, UserCog, UserRound, Users, UserX, XCircle } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/volunteer", icon: LayoutDashboard, end: true },
  { label: "Nearby Requests", path: "/volunteer/nearby-requests", icon: MapPin, end: false },
  { label: "My Tasks", path: "/volunteer/tasks", icon: ListTodo, end: false },
  { label: "No Show Reports", path: "/volunteer/no-show", icon: UserX, end: false },
  { label: "Coordination History", path: "/volunteer/history", icon: History, end: false },
]
const stats = [
  { value: "06", label: "Assigned tasks", icon: ListTodo },
  { value: "21", label: "Completed tasks", icon: CheckCircle2 },
  { value: "03", label: "Pending coordination", icon: Clock },
  { value: "02", label: "No-show reports", icon: UserX },
]

const roleName = "Volunteer Dashboard"
const VolunteerOverview = () => {
  return (
    <DashboardLayout roleName={roleName} tabs={tabs} title="Volunteer Overview" description="Coordinate nearby verified requests, track assigned tasks, donor followups and no-show reports.">
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
          <HeroNotice title="Role focused workspace" desc="This dashboard is structured around the exact tabs and actions required for volunteer dashboard. Data is sample UI for now and ready to connect with backend APIs." />
        </div>
      </div>
    </DashboardLayout>
  )
}
export default VolunteerOverview
