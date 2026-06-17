import { Activity, CheckCircle2, Clock, Droplet, FileText, GitBranch, History, LayoutDashboard, ListTodo, MapPin, PackageCheck, PlusCircle, RefreshCw, ShieldCheck, Siren, TriangleAlert, UserCog, UserRound, Users, UserX } from "lucide-react"
import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { ActionButton, BloodStockGrid, DataPanel, Field, FormShell, HeroNotice, RequestRow, SectionTitle, SelectField, StatGrid, StatusBadge, Timeline } from "@/Screens/Dashboard/_shared/DashboardUI"
const tabs = [
  { label: "Overview", path: "/blood-bank", icon: LayoutDashboard, end: true },
  { label: "Blood Stock", path: "/blood-bank/stock", icon: Droplet, end: false },
  { label: "Update Stock", path: "/blood-bank/update-stock", icon: RefreshCw, end: false },
  { label: "Emergency Requests", path: "/blood-bank/requests", icon: Siren, end: false },
  { label: "Reserved / Offered Units", path: "/blood-bank/reserved", icon: PackageCheck, end: false },
]
const roleName = "Blood Bank"

const UpdateStock = () => (
  <DashboardLayout roleName={roleName} tabs={tabs} title="Update Stock" description="Add or remove blood units by group.">
    <DataPanel title="Stock adjustment">
      <FormShell>
        <SelectField label="Blood group" options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
        <SelectField label="Action" options={["Add units", "Remove units"]} />
        <Field label="Units" type="number" placeholder="5" />
        <Field label="Notes" placeholder="Batch ID, expiry, source" />
      </FormShell>
      <div className="mt-6"><ActionButton>Update stock</ActionButton></div>
    </DataPanel>
  </DashboardLayout>
)

export default UpdateStock
