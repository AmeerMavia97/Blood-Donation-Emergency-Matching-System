import { useEffect, useState } from "react"
import { Droplet, LayoutDashboard, UserRound, History } from "lucide-react"

import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { DataPanel, StatusBadge } from "@/Screens/Dashboard/_shared/DashboardUI"

import { supabase } from "@/Configuration/Supabase/supabaseClient"
import { useAuthUser } from "@/Components/hooks/useAuthUser"

const tabs = [
  { label: "Overview", path: "/donor", icon: LayoutDashboard, end: true },
  { label: "My Donor Profile", path: "/donor/profile", icon: UserRound },
  { label: "Blood Requests", path: "/donor/requests", icon: Droplet },
  { label: "Donation History", path: "/donor/history", icon: History },
]

export default function BloodRequests() {
  const { data } = useAuthUser()
  const user = data?.user

  const [donor, setDonor] = useState(null)
  const [requests, setRequests] = useState([])

  // ---------------- INIT ----------------
  useEffect(() => {
    if (!user?.id) return

    const init = async () => {
      const { data: donorData } = await supabase
        .from("donors")
        .select("*")
        .eq("profile_id", user.id)
        .single()

      setDonor(donorData)

      if (donorData?.blood_group) {
        const { data: reqs, error } = await supabase
          .from("blood_requests")
          .select("*")
          .eq("required_blood_group", donorData.blood_group)
          .in("status", ["verified", "matched"])

        if (!error) setRequests(reqs || [])
      }
    }

    init()
  }, [user])

  // ---------------- ACCEPT ----------------
  const acceptRequest = async (req) => {
    if (!donor || !req) return

    const { error } = await supabase
      .from("blood_requests")
      .update({ status: "matched" })
      .eq("id", req.id)

    if (error) return alert(error.message)

    // update UI
    setRequests((prev) =>
      prev.map((r) =>
        r.id === req.id ? { ...r, status: "matched" } : r
      )
    )
  }

  // ---------------- FULFILL ----------------
  const fulfillRequest = async (req) => {
    if (!donor || !req) return

    // 1. update request status
    const { error: updateError } = await supabase
      .from("blood_requests")
      .update({ status: "fulfilled" })
      .eq("id", req.id)

    if (updateError) {
      console.log(updateError)
      return alert(updateError.message)
    }

    // 2. INSERT into donations table (THIS WAS MISSING)
    const { error: insertError } = await supabase
      .from("donations")
      .insert({
        donor_id: donor.id,
        hospital_name: req.hospital_name,
        blood_group: req.required_blood_group,
        donation_date: new Date(),
      })

    if (insertError) {
      console.log(insertError)
      return alert(insertError.message)
    }

    // 3. remove from UI
    setRequests((prev) =>
      prev.filter((r) => r.id !== req.id)
    )

    alert("Donation Completed & Saved")
  }

  return (
    <DashboardLayout
      roleName="Donor Dashboard"
      tabs={tabs}
      title="Blood Requests"
      description="Verified and matched requests"
    >
      <DataPanel title="Incoming Requests">
        {requests.length === 0 ? (
          <p className="text-gray-500">No matching requests</p>
        ) : (
          requests.map((r) => (
            <RequestRow
              key={r.id}
              group={r.required_blood_group}
              title={r.hospital_name}
              meta={`${r.units_required} units needed • ${r.city}`}
              status={r.status}
              onAccept={() => acceptRequest(r)}
              onFulfill={() => fulfillRequest(r)}
            />
          ))
        )}
      </DataPanel>
    </DashboardLayout>
  )
}

// ---------------- REQUEST ROW ----------------
const RequestRow = ({ group, title, meta, status, onAccept, onFulfill }) => {
  const getTone = () => {
    if (status === "verified") return "red"
    if (status === "matched") return "amber"
    if (status === "fulfilled") return "green"
    return "gray"
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-black/10 p-4">
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="shrink-0 rounded-full bg-red-600 p-3 text-md font-bold text-white">
          {group}
        </span>
        <div className="min-w-0">
          <h4 className="font-head text-lg font-black text-[#151515] truncate">
            {title}
          </h4>
          <p className="mt-1 text-sm text-[#666] truncate">{meta}</p>
        </div>
      </div>

      {/* STATUS */}
      <StatusBadge tone={getTone()}>{status}</StatusBadge>

      {/* ACTIONS */}
      <div className="flex gap-2 shrink-0">
        {status === "verified" && (
          <button
            onClick={onAccept}
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 transition"
          >
            Accept
          </button>
        )}

        {status === "matched" && (
          <button
            onClick={onFulfill}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
          >
            Fulfilled
          </button>
        )}
      </div>
    </div>
  )
}