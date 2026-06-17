import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { getMyPatientRequests } from "@/services/authApi"
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { patientTabs, requestStatusLabel, roleName, statusTone } from "./patientTabs"
import { Eye, Plus, Search , PlusCircle } from "lucide-react"

const filters = [
  { label: "All Requests", value: "all" },
  { label: "Pending Verification", value: "pending_verification" },
  { label: "Verified", value: "verified" },
  { label: "Matched", value: "matched" },
  { label: "Fulfilled", value: "fulfilled" },
  { label: "Expired", value: "expired" },
  { label: "Rejected", value: "rejected" },
]

const statusStyles = {
  pending_verification: "bg-yellow-100 text-yellow-700",
  verified: "bg-blue-100 text-blue-700",
  matched: "bg-purple-100 text-purple-700",
  fulfilled: "bg-green-100 text-green-700",
  expired: "bg-gray-100 text-gray-700",
  rejected: "bg-red-100 text-red-700",
}

const formatStatus = (status = "") =>
  status.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())


const MyRequests = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-patient-requests"],
    queryFn: getMyPatientRequests,
  })

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()

    return requests.filter((r) => {
      const matchesStatus = filter === "all" || r.status === filter

      const searchableText = [
        r.id,
        r.required_blood_group,
        r.hospital_name,
        r.city,
        r.status,
        r.verification_status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      return matchesStatus && searchableText.includes(q)
    })
  }, [filter, search, requests])

  const action = <button onClick={() => navigate("/blood-request")} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 font-head text-sm font-black text-white hover:bg-[#b91c1c]"><PlusCircle size={17} />Create Request</button>

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="My Requests" description="All blood requests with status filters and detail view." action={action}>
      <div className="space-y-6">
     

        <div className="grid gap-3 md:grid-cols-[220px_1fr]">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold text-[#151515] outline-none focus:border-[#dc2626]"
          >
            {filters.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#dc2626]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by request ID, blood group, hospital, city or status..."
              className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-12 pr-4 text-sm font-semibold text-[#151515] outline-none placeholder:text-[#999] focus:border-[#dc2626]"
            />
          </div>
        </div>

        {isLoading && (
          <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 text-sm font-bold text-[#555]">
            Loading requests...
          </div>
        )}

        {error && (
          <div className="rounded-[1.5rem] bg-[#dc2626]/10 p-5 text-sm font-bold text-[#dc2626]">
            {error.message}
          </div>
        )}

        {!isLoading && !error && (
          <div className="overflow-hidden rounded-[1.6rem] border border-black/10 bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_1fr_0.7fr_1.5fr_1fr_0.7fr] gap-4 border-b border-black/10 bg-[#f7f7f7] px-5 py-4 text-xs font-black uppercase tracking-wide text-[#555] md:grid">
              <div>ID</div>
              <div>Blood Group</div>
              <div>Units</div>
              <div>Hospital</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            <div className="divide-y divide-black/10">
              {visible.map((r) => (
                <div
                  key={r.id}
                  className="grid gap-4 px-5 py-4 text-sm md:grid-cols-[1fr_1fr_0.7fr_1.5fr_1fr_0.7fr] md:items-center"
                >
                  <div>
                    <p className="md:hidden text-xs font-black uppercase text-[#777]">
                      ID
                    </p>
                    <p className="font-black text-[#151515]">
                      #{r.id?.slice(0, 8)}
                    </p>
                  </div>

                  <div>
                    <p className="md:hidden text-xs font-black uppercase text-[#777]">
                      Blood Group
                    </p>
                    <span className="inline-flex rounded-full bg-[#dc2626]/10 px-3 py-1 font-head text-lg font-black text-[#dc2626]">
                      {r.required_blood_group}
                    </span>
                  </div>

                  <div>
                    <p className="md:hidden text-xs font-black uppercase text-[#777]">
                      Units
                    </p>
                    <p className="font-bold text-[#333]">{r.units_required}</p>
                  </div>

                  <div>
                    <p className="md:hidden text-xs font-black uppercase text-[#777]">
                      Hospital
                    </p>
                    <p className="font-bold text-[#333]">
                      {r.hospital_name || "Pending"}
                    </p>
                  </div>

                  <div>
                    <p className="md:hidden text-xs font-black uppercase text-[#777]">
                      Status
                    </p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${statusStyles[r.status] || "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {formatStatus(r.status)}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/attendant/requests/${r.id}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#151515] px-4 text-xs font-black text-white transition hover:bg-[#dc2626]"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {visible.length === 0 && (
              <div className="p-10 text-center">
                <h3 className="font-head text-2xl font-black text-[#151515]">
                  No requests found
                </h3>
                <p className="mt-2 text-sm font-medium text-[#666]">
                  Try changing your filter or create a new blood request.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
export default MyRequests
