import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/Configuration/Supabase/supabaseClient"
import {
  LockKeyhole,
  PhoneOff,
  PlusCircle,
  UserRound,
  UsersRound,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { patientTabs, roleName } from "./patientTabs"

const MatchedDonors = () => {
  const navigate = useNavigate()

  // ---------------- PATIENT REQUEST STATS ----------------
  const { data: requests = [] } = useQuery({
    queryKey: ["patient-requests"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blood_requests")
        .select("*")

      return data || []
    },
  })

  // ---------------- DONORS ----------------
  const { data: donors = [], isLoading, error } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const { data } = await supabase
        .from("donors")
        .select("*")
        .eq("availability", true)

      return data || []
    },
  })

  // ---------------- STATS FROM REQUESTS (NEW API) ----------------
  const matched = donors.length

  const contacted = requests.filter(
    (r) => r.status === "Contacted"
  ).length

  const fulfilled = requests.filter(
    (r) => r.status === "Fulfilled"
  ).length

  const action = (
    <button
      onClick={() => navigate("/blood-request")}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 font-head text-sm font-black text-white hover:bg-[#b91c1c]"
    >
      <PlusCircle size={17} />
      Create Request
    </button>
  )

  return (
    <DashboardLayout
      roleName={roleName}
      tabs={patientTabs}
      title="Matched Donors"
      description="Patient can see matched donors and request stats"
      action={action}
    >
      <div className="space-y-6">

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat value={matched} label="Donors Matched" />
          <Stat value={contacted} label="Donor Contacted" />
          <Stat value={fulfilled} label="Donor Fulfilled" />
        </div>

        {/* DONOR LIST */}
        <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.04)]">

          <div className="mb-5 flex items-center gap-3">
            <UsersRound className="text-[#dc2626]" />
            <h3 className="font-head text-2xl font-black text-[#151515]">
              Matched donor list
            </h3>
          </div>

          {isLoading && (
            <p className="text-sm font-semibold text-[#555]">Loading...</p>
          )}

          {error && (
            <p className="text-sm font-bold text-[#dc2626]">
              {error.message}
            </p>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="rounded-[1.6rem] border border-black/10 bg-[#fafafa] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-[#dc2626] text-white">
                    <UserRound size={23} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-head text-xl font-black text-[#151515]">
                      {donor.full_name || donor.name}
                    </h4>

                    <p className="mt-1 text-sm font-semibold text-[#555]">
                      Blood Group:{" "}
                      <b className="text-[#dc2626]">
                        {donor.blood_group}
                      </b>
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#555]">
                      City: {donor.location}
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white p-3 text-sm font-bold text-[#555] ring-1 ring-black/10">
                  {donor.consent_phone ? (
                    <span>📞 {donor.phone}</span>
                  ) : (
                    <>
                      <PhoneOff size={16} className="text-[#dc2626]" />
                      Phone hidden until donor consent
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!donors.length && !isLoading && (
            <p className="rounded-2xl bg-[#f7f7f7] p-5 text-sm font-semibold text-[#555]">
              No donors matched yet.
            </p>
          )}
        </section>

        {/* PRIVACY */}
        <div className="rounded-[2rem] bg-[#151515] p-6 text-white">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dc2626]">
              <LockKeyhole size={22} />
            </span>

            <div>
              <h4 className="font-head text-2xl font-black">
                Privacy protected
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Donor contact details are shown only after consent.
                Request stats are calculated from live blood request data.
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}

const Stat = ({ value, label }) => (
  <div className="rounded-[1.7rem] border border-black/10 bg-white p-5 shadow-[0_16px_55px_rgba(0,0,0,0.04)]">
    <h3 className="font-head text-4xl font-black text-[#dc2626]">
      {value}
    </h3>
    <p className="mt-2 text-sm font-bold text-[#555]">{label}</p>
  </div>
)

export default MatchedDonors