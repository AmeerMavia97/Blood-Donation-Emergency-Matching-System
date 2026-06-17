import { useEffect, useMemo } from "react"
import {
  LayoutDashboard,
  UserRound,
  Droplet,
  History,
} from "lucide-react"

import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { DataPanel, StatGrid, RequestRow } from "@/Screens/Dashboard/_shared/DashboardUI"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/Configuration/Supabase/supabaseClient"
import { useAuthUser } from "@/Components/hooks/useAuthUser"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const tabs = [
  { label: "Overview", path: "/donor", icon: LayoutDashboard, end: true },
  { label: "My Donor Profile", path: "/donor/profile", icon: UserRound },
  { label: "Blood Requests", path: "/donor/requests", icon: Droplet },
  { label: "Donation History", path: "/donor/history", icon: History },
]

const isEligible = (date) => {
  if (!date) return true
  const diff = (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)
  return diff >= 90
}

export default function DonorOverview() {
  const { data } = useAuthUser()
  const user = data?.user

  const { data: donor } = useQuery({
    queryKey: ["donor", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("donors")
        .select("*")
        .eq("profile_id", user.id)
        .single()
      return data
    },
    enabled: !!user?.id,
  })

  const { data: requests = [] } = useQuery({
    queryKey: ["donor-requests", donor?.blood_group],
    queryFn: async () => {
      const { data } = await supabase
        .from("blood_requests")
        .select("*")
        .eq("required_blood_group", donor?.blood_group)
        .in("status", ["verified", "matched"])
        .order("created_at", { ascending: false })
      return data || []
    },
    enabled: !!donor?.blood_group,
  })

  const { data: donations = [] } = useQuery({
    queryKey: ["donor-donations", donor?.id],
    queryFn: async () => {
      if (!donor?.id) return []
      const { data } = await supabase
        .from("donations")
        .select("*")
        .eq("donor_id", donor.id)
        .order("donation_date", { ascending: true })
      return data || []
    },
    enabled: !!donor?.id,
  })

  const stats = [
    {
      value: isEligible(donor?.last_donation_date) ? "Eligible" : "Cooling",
      label: "Eligibility status",
    },
    {
      value: donor?.availability ? "Available" : "Unavailable",
      label: "Availability status",
    },
    {
      value: donations?.length || 0,
      label: "Total donations",
    },
    {
      value: requests?.length || 0,
      label: "Incoming requests",
    },
  ]

  // Chart data
  const chartData = useMemo(() => {
    const labels = donations.map((d) => new Date(d.donation_date).toLocaleDateString())
    const dataSet = donations.map((d, i) => i + 1)
    return {
      labels,
      datasets: [
        {
          label: "Donations Over Time",
          data: dataSet,
          borderColor: "#dc2626",
          backgroundColor: "rgba(220,38,38,0.2)",
          tension: 0.3,
        },
      ],
    }
  }, [donations])

  return (
    <DashboardLayout
      roleName="Donor Dashboard"
      tabs={tabs}
      title="Donor Overview"
      description="Live emergency donor system"
    >
      {/* Stats */}
      <StatGrid stats={stats} />

      <div className="mt-6 grid xl:grid-cols-2 gap-6">
        {/* Active Requests */}
        <DataPanel title="Active Emergency Workflow">
          {requests.length === 0 ? (
            <p className="text-gray-500">No matching requests</p>
          ) : (
            requests.map((r) => (
              <RequestRow
                key={r.id}
                group={r.required_blood_group}
                title={r.hospital_name}
                meta={`${r.units_required} units • ${r.city}`}
                status={r.status}
                tone={r.status === "verified" ? "red" : "green"}
              />
            ))
          )}
        </DataPanel>

        {/* Donation Chart */}
        <DataPanel title="Donation History (Graph)">
          {donations.length === 0 ? (
            <p className="text-gray-500">No donations yet</p>
          ) : (
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          )}
        </DataPanel>
      </div>
    </DashboardLayout>
  )
}