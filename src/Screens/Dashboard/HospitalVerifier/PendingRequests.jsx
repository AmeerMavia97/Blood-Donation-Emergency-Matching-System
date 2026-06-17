import { useEffect, useState } from "react"
import { Clock, LayoutDashboard, ShieldCheck, History, TriangleAlert } from "lucide-react"

import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import {
  DataPanel,
  RequestRow,
} from "@/Screens/Dashboard/_shared/DashboardUI"

import { supabase } from "@/Configuration/Supabase/supabaseClient"
import { useAuthUser } from "@/Components/hooks/useAuthUser"

const tabs = [
  { label: "Overview", path: "/verifier", icon: LayoutDashboard, end: true },
  { label: "Pending Requests", path: "/verifier/pending", icon: Clock },
  { label: "Verified Requests", path: "/verifier/verified", icon: ShieldCheck },
  { label: "Alerts", path: "/verifier/alerts", icon: TriangleAlert },
  { label: "History", path: "/verifier/history", icon: History },
]

const roleName = "Hospital Verifier"

const PendingRequests = () => {
  const { data } = useAuthUser()
  const user = data?.user

  const [hospital, setHospital] = useState(null)
  const [requests, setRequests] = useState([])

  // ---------------- GET HOSPITAL INFO ----------------
  const getHospital = async () => {
    const { data: hospitalData, error } = await supabase
      .from("hospital_verifiers")
      .select("hospital_name")
      .eq("profile_id", user.id)
      .single()

    if (error) {
      console.log("Hospital fetch error:", error)
      return null
    }

    setHospital(hospitalData)
    return hospitalData
  }

  // ---------------- GET PENDING REQUESTS ----------------
  const getRequests = async (hospitalName) => {
    const { data, error } = await supabase
      .from("blood_requests")
      .select("*")
      .eq("hospital_name", hospitalName)
      .eq("status", "pending_verification")
      .order("created_at", { ascending: true })

    if (error) {
      console.log("Blood request fetch error:", error)
      return
    }

    setRequests(data || [])
  }

  // ---------------- VERIFY REQUEST ----------------
  const verifyRequest = async (id) => {
    const { error } = await supabase
      .from("blood_requests")
      .update({ status: "verified" })
      .eq("id", id)

    if (error) {
      alert("Failed to verify request")
      return
    }

    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  // ---------------- INIT ----------------
  useEffect(() => {
    if (!user?.id) return

    const init = async () => {
      const hosp = await getHospital()
      if (hosp?.hospital_name) {
        getRequests(hosp.hospital_name)
      }
    }

    init()
  }, [user?.id])

  return (
    <DashboardLayout
      roleName={roleName}
      tabs={tabs}
      title="Pending Requests"
      description="Review and verify blood requests for your hospital."
    >
      <DataPanel title="Requests waiting for verification">
        {requests.length === 0 ? (
          <p className="text-sm text-gray-500">
            No pending requests for your hospital
          </p>
        ) : (
          requests.map((r) => (
            <RequestRow
              key={r.id}
              group={r.required_blood_group}
              title={r.patient_name}
              meta={`${r.units_required} units • ${
                r.emergency_notes ? "Attendant submitted notes" : "No notes"
              }`}
              status="Pending verification"
              tone="amber"
              cta={
                <button
                  onClick={() => verifyRequest(r.id)}
                  className=" text-black rounded-full text-sm font-bold"
                >
                  Verify
                </button>
              }
            />
          ))
        )}
      </DataPanel>
    </DashboardLayout>
  )
}

export default PendingRequests