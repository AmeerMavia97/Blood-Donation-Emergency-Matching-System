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

const VerifiedRequests = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Verified Requests" description="Track approved cases and fulfillment progress.">
    <DataPanel title="Approved cases">
      <RequestRow group="O-" title="Civil Hospital" meta="2 units • Donors matched" status="Matched" tone="green" />
      <RequestRow group="A+" title="Jinnah Hospital" meta="1 unit • Waiting donor confirmation" status="Verified" tone="red" />
    </DataPanel>
  </DashboardLayout>
)

export default VerifiedRequests
