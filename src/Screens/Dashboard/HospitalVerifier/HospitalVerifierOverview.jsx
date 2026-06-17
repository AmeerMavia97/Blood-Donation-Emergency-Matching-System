import { Activity, Bell, CheckCircle2, Clock, Droplet, FileText, GitBranch, HeartPulse, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, ToggleRight, TriangleAlert, UserCog, UserRound, Users, UserX, XCircle } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/verifier", icon: LayoutDashboard, end: true },
  { label: "Pending Requests", path: "/verifier/pending", icon: Clock, end: false },
  { label: "Verified Requests", path: "/verifier/verified", icon: ShieldCheck, end: false },
  { label: "Duplicate/Fake Alerts", path: "/verifier/alerts", icon: TriangleAlert, end: false },
  { label: "Verification History", path: "/verifier/history", icon: History, end: false },
]
const stats = [
  { value: "12", label: "Pending verifications", icon: Clock },
  { value: "46", label: "Approved requests", icon: CheckCircle2 },
  { value: "03", label: "Rejected requests", icon: XCircle },
  { value: "04", label: "Fake alerts", icon: TriangleAlert },
]

const roleName = "Hospital Verifier"
const HospitalVerifierOverview = () => {
  return (
    <DashboardLayout roleName={roleName} tabs={tabs} title="Verifier Overview" description="Review pending emergency cases, approve valid requests, reject fake cases and track verification history.">
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
          <HeroNotice title="Role focused workspace" desc="This dashboard is structured around the exact tabs and actions required for hospital verifier. Data is sample UI for now and ready to connect with backend APIs." />
        </div>
      </div>
    </DashboardLayout>
  )
}
export default HospitalVerifierOverview
