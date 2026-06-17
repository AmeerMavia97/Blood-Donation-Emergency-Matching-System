import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import { getBloodRequestById, getMyPatientRequests, markRequestFulfilled } from "@/services/authApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckCircle2, Copy, Droplet, HeartHandshake, Hospital, Link as LinkIcon, PhoneOff } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import { patientTabs, roleName } from "./patientTabs"

const timelineSteps = ["Request Created", "Verified", "Accepted / Fulfilled"]

const RequestDetails = () => {
  const [params] = useSearchParams()
  const queryClient = useQueryClient()
  const requestIdParam = params.get("id")

  const { data: myRequests = [] } = useQuery({ queryKey: ["my-patient-requests"], queryFn: getMyPatientRequests })
  const fallbackId = myRequests?.[0]?.id
  const requestId = requestIdParam || fallbackId

  const { data, isLoading } = useQuery({
    queryKey: ["blood-request", requestId],
    queryFn: () => getBloodRequestById(requestId),
    enabled: !!requestId
  })

  const shareLink = data ? `${window.location.origin}/requests/${data.id}` : ""

  const fulfillMutation = useMutation({
    mutationFn: () => markRequestFulfilled(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blood-request", data.id] })
      queryClient.invalidateQueries({ queryKey: ["my-patient-requests"] })
    }
  })

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Request Details" description="View request verification, matched donors, blood bank offers, and share link.">
      {!requestId && (
        <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center">
          <p className="font-head text-2xl font-black text-[#151515]">No request selected</p>
          <Link to="/attendant/create-request" className="mt-4 inline-flex rounded-full bg-[#dc2626] px-5 py-3 text-sm font-black text-white">Create Request</Link>
        </div>
      )}

      {isLoading && <p className="font-bold text-[#555]">Loading...</p>}

      {data && (
        <div className="space-y-6">
          {/* Main Info Panel */}
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-black/10 bg-white p-6">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="font-head text-xs font-black uppercase tracking-[0.25em] text-[#dc2626]">Basic information</p>
                  <h3 className="mt-2 font-head text-3xl font-black text-[#151515]">{data.patient_name}</h3>
                </div>
                <span className="flex size-16 items-center justify-center rounded-2xl bg-[#dc2626] font-head text-2xl font-black text-white">{data.required_blood_group}</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="Blood Group" value={data.required_blood_group} icon={Droplet} />
                <Info label="Units" value={`${data.units_required} Units`} icon={Droplet} />
                <Info label="Hospital" value={data.hospital_name || "Pending"} icon={Hospital} />
                <Info label="Verification Status" value={data.verification_status || "Pending"} icon={HeartHandshake} />
              </div>

              {data.emergency_notes && (
                <div className="mt-5 rounded-2xl bg-[#f7f7f7] p-4">
                  <p className="font-head text-lg font-black text-[#151515]">Emergency notes</p>
                  <p className="mt-2 text-sm leading-6 text-[#555]">{data.emergency_notes}</p>
                </div>
              )}
            </div>

            {/* Timeline Panel */}
            <div className="rounded-[2rem] bg-[#151515] p-6 text-white">
              <h3 className="font-head text-2xl font-black">Status timeline</h3>
              <div className="mt-6 space-y-4">
                {timelineSteps.map((step, index) => {
                  const completed =
                    index === 0 || // Request Created always complete
                    index === 1 || // Verified always complete
                    (index === 2 && ["accepted", "fulfilled"].includes(data.status))

                  return (
                    <div key={step} className="flex gap-3">
                      <span className={`mt-1 flex size-7 items-center justify-center rounded-full ${completed ? "bg-[#dc2626]" : "bg-white/10"}`}>
                        {completed ? <CheckCircle2 size={15} /> : index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-white">{step}</p>
                        <p className="text-xs text-white/45">
                          {index === 0
                            ? "Completed"
                            : index === 1
                              ? "Verified"
                              : ["accepted", "fulfilled"].includes(data.status)
                                ? "Accepted"
                                : "Pending"}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Matched Donors + Blood Bank Offers + Share Link */}
          <div className="grid gap-6 xl:grid-cols-3">
            <Panel title="Matched Donors">
              {["accepted", "fulfilled"].includes(data.status) && data.donors?.length > 0 ? (
                data.donors.map(donor => <Donor key={donor.id} {...donor} />)
              ) : (
                <p className="mt-4 text-xs font-semibold text-[#555]">No donors accepted yet.</p>
              )}
            </Panel>

            <Panel title="Blood Bank Offers">
              {["accepted", "fulfilled"].includes(data.status) && data.blood_banks?.length > 0 ? (
                data.blood_banks.map(bank => (
                  <div key={bank.id} className="rounded-2xl bg-[#f7f7f7] p-4">
                    <p className="font-head text-lg font-black text-[#151515]">{bank.name}</p>
                    <p className="mt-1 text-sm font-semibold text-[#555]">{bank.available_units} Unit(s) Available</p>
                    <p className="mt-2 text-xs font-black text-[#dc2626]">Status: {bank.status}</p>
                    <button className="mt-4 rounded-full bg-[#151515] px-4 py-2 text-xs font-black text-white hover:bg-[#dc2626]">Accept Offer</button>
                  </div>
                ))
              ) : (
                <p className="mt-2 text-xs font-semibold text-[#555]">No blood bank offers yet.</p>
              )}
            </Panel>

            <Panel title="Share Request">
              <p className="break-all rounded-2xl bg-[#f7f7f7] p-4 text-xs font-semibold text-[#555]">{shareLink}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(shareLink)}
                  className="rounded-full bg-[#151515] px-4 py-2 text-xs font-black text-white">
                  <Copy size={13} className="mr-1 inline" />
                  Copy
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#dc2626] px-4 py-2 text-xs font-black text-white"
                >
                  WhatsApp
                </a>
                <Link
                  to={`/requests/${data.id}`}
                  className="rounded-full bg-[#f7f7f7] px-4 py-2 text-xs font-black text-[#151515]" >
                  <LinkIcon size={13} className="mr-1 inline" />
                  Public page
                </Link>
              </div>
            </Panel>
          </div>

          {/* Fulfill Request Button */}
          <div>
            <button
              onClick={() => fulfillMutation.mutate()}
              disabled={fulfillMutation.isPending || data.status === "fulfilled"}
              className="mt-4 w-full rounded-full bg-[#151515] px-4 py-3 text-xs font-black text-white hover:bg-[#dc2626] disabled:opacity-60"
            >
              {data.status === "fulfilled" ? "Marked fulfilled" : "Mark as Fulfilled"}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

const Info = ({ label, value, icon: Icon }) => (
  <div className="rounded-2xl bg-[#f7f7f7] p-4">
    <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#dc2626]">
      <Icon size={14} />
      {label}
    </p>
    <p className="font-head text-xl font-black capitalize text-[#151515]">{value || "Pending"}</p>
  </div>
)

const Panel = ({ title, children }) => (
  <div className="rounded-[2rem] border border-black/10 bg-white p-6">
    <h3 className="mb-4 font-head text-2xl font-black text-[#151515]">{title}</h3>
    {children}
  </div>
)

const Donor = ({ name, group }) => (
  <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[#f7f7f7] p-4">
    <span className="flex size-10 items-center justify-center rounded-full bg-[#dc2626] text-xs font-black text-white">{group}</span>
    <div>
      <p className="font-head text-lg font-black text-[#151515]">{name}</p>
    </div>
  </div>
)

export default RequestDetails