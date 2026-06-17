import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/verifier", icon: LayoutDashboard, end: true },
  { label: "Pending Requests", path: "/verifier/pending", icon: Clock, end: false },
  { label: "Verified Requests", path: "/verifier/verified", icon: ShieldCheck, end: false },
  { label: "Duplicate/Fake Alerts", path: "/verifier/alerts", icon: TriangleAlert, end: false },
  { label: "Verification History", path: "/verifier/history", icon: History, end: false },
]
const roleName = "Hospital Verifier"

const FakeAlerts = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Duplicate/Fake Alerts" description="Review similar request warnings and fake request reports.">
    <DataPanel title="Alert center">
      <RequestRow group="B+" title="Liaquat National" meta="Similar patient name and hospital detected" status="Duplicate" tone="red" />
      <RequestRow group="A-" title="Unknown Hospital" meta="Reported by volunteer coordinator" status="Fake report" tone="amber" />
    </DataPanel>
  </DashboardLayout>
)

export default FakeAlerts
