import { useEffect, useState } from "react"
import { History, LayoutDashboard, UserRound, Droplet } from "lucide-react"

import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { DataPanel, RequestRow } from "@/Screens/Dashboard/_shared/DashboardUI"

import { supabase } from "@/Configuration/Supabase/supabaseClient"
import { useAuthUser } from "@/Components/hooks/useAuthUser"

const tabs = [
  { label: "Overview", path: "/donor", icon: LayoutDashboard, end: true },
  { label: "My Donor Profile", path: "/donor/profile", icon: UserRound },
  { label: "Blood Requests", path: "/donor/requests", icon: Droplet },
  { label: "Donation History", path: "/donor/history", icon: History },
]

export default function DonationHistory() {
  const { data } = useAuthUser()
  const user = data?.user

  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!user?.id) return

    const fetchHistory = async () => {
      const { data: donor } = await supabase
        .from("donors")
        .select("id")
        .eq("profile_id", user.id)
        .single()

      if (!donor?.id) return

      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("donor_id", donor.id)
        .order("donation_date", { ascending: false })

      if (!error) {
        setHistory(data || [])
      }
    }

    fetchHistory()
  }, [user])

  return (
    <DashboardLayout
      roleName="Donor Dashboard"
      tabs={tabs}
      title="Donation History"
      description="View previous donations by hospital and date."
    >
      <DataPanel title="Previous donations">

        {history.length === 0 ? (
          <p className="text-gray-500">No donations found</p>
        ) : (
          history.map((item) => (
            <RequestRow
              key={item.id}
              group={item.blood_group}
              title={item.hospital_name}
              meta={`Donated on ${new Date(item.donation_date).toLocaleDateString()}`}
              status="Completed"
              tone="green"
              button={"false"}
            />
          ))
        )}

      </DataPanel>
    </DashboardLayout>
  )
}