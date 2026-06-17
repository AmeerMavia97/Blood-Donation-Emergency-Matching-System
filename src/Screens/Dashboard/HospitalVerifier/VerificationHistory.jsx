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

const VerificationHistory = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Verification History" description="See who verified each request, date/time and notes.">
    <DataPanel title="History log">
      <RequestRow group="O-" title="Civil Hospital" meta="Verified by Dr. Ahmed • Today 11:30 AM" status="Approved" tone="green" />
      <RequestRow group="A+" title="Jinnah Hospital" meta="Rejected by Admin • Yesterday 06:10 PM" status="Rejected" tone="red" />
    </DataPanel>
  </DashboardLayout>
)

export default VerificationHistory
