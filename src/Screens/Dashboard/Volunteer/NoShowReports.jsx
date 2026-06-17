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

const NoShowReports = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="No Show Reports" description="Mark donor no-show and add notes.">
    <DataPanel title="Report donor no-show">
      <FormShell>
        <Field label="Donor name / ID" placeholder="Donor #1024" />
        <Field label="Hospital" placeholder="Civil Hospital" />
        <Field label="Notes" placeholder="Reason or contact attempt details" />
      </FormShell>
      <div className="mt-6"><ActionButton>Submit report</ActionButton></div>
    </DataPanel>
  </DashboardLayout>
)

export default NoShowReports
