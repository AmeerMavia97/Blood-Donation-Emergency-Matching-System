import { Activity, Bell, CheckCircle2, Clock, Droplet, FileText, GitBranch, HeartPulse, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, ToggleRight, TriangleAlert, UserCog, UserRound, Users, UserX, XCircle } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/blood-bank", icon: LayoutDashboard, end: true },
  { label: "Blood Stock", path: "/blood-bank/stock", icon: Droplet, end: false },
  { label: "Update Stock", path: "/blood-bank/update-stock", icon: RefreshCw, end: false },
  { label: "Emergency Requests", path: "/blood-bank/requests", icon: Siren, end: false },
  { label: "Reserved / Offered Units", path: "/blood-bank/reserved", icon: PackageCheck, end: false },
]
const stats = [
  { value: "426", label: "Total units", icon: Droplet },
  { value: "05", label: "Low stock alerts", icon: TriangleAlert },
  { value: "34", label: "Offered units", icon: PackageCheck },
  { value: "11", label: "Reserved units", icon: Clock },
]

const roleName = "Blood Bank"
const BloodBankOverview = () => {
  return (
    <DashboardLayout roleName={roleName} tabs={tabs} title="Blood Bank Overview" description="Manage blood stock, low inventory alerts, matching emergency requests and offered units.">
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
          <HeroNotice title="Role focused workspace" desc="This dashboard is structured around the exact tabs and actions required for blood bank. Data is sample UI for now and ready to connect with backend APIs." />
        </div>
      </div>
    </DashboardLayout>
  )
}
export default BloodBankOverview
