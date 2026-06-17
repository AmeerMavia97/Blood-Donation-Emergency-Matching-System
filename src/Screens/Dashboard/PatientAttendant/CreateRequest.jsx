import DashboardLayout from "@/Components/ScreensLayout/DashboardLayouts/Layout"
import InputField from "@/Components/ui/input"
import { createBloodRequest } from "@/services/authApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowRight, Droplet, FileUp, Hospital, MapPin, Siren, UserRound } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { patientTabs, roleName } from "./patientTabs"

const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const Select = ({ label, error, children, ...props }) => <div><label className="mb-2 block text-sm font-bold text-[#151515]">{label}</label><select className={`h-12.5 w-full rounded-lg border bg-white px-4 text-sm font-semibold outline-none focus:border-[#dc2626] ${error ? "border-[#dc2626]" : "border-black/10"}`} {...props}>{children}</select>{error && <p className="mt-2 text-xs font-bold text-[#dc2626]">{error.message}</p>}</div>
const Textarea = ({ label, error, ...props }) => <div className="md:col-span-2"><label className="mb-2 block text-sm font-bold text-[#151515]">{label}</label><textarea className={`min-h-28 w-full rounded-lg border bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#dc2626] ${error ? "border-[#dc2626]" : "border-black/10"}`} {...props} />{error && <p className="mt-2 text-xs font-bold text-[#dc2626]">{error.message}</p>}</div>

const CreateRequest = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { patientName: "", requiredBloodGroup: "", unitsRequired: "1", hospitalName: "", city: "", emergencyLevel: "urgent", emergencyNotes: "" } })
  const mutation = useMutation({ mutationFn: createBloodRequest, onSuccess: (data) => { queryClient.invalidateQueries({ queryKey: ["my-patient-requests"] }); navigate(`/attendant/requests/${data.id}`) }, onError: (err) => setError("root", { message: err.message }) })

  return (
    <DashboardLayout roleName={roleName} tabs={patientTabs} title="Create Blood Request" description="Submit a new emergency request from your dashboard.">
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
        <div className="mb-6 flex items-center gap-4"><span className="flex size-14 items-center justify-center rounded-2xl bg-[#dc2626] text-white"><Siren size={24} /></span><div><h3 className="font-head text-2xl font-black text-[#151515]">Emergency blood request</h3><p className="text-sm font-semibold text-[#555]">Fill required information for verification and matching.</p></div></div>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField label="Patient Name" placeholder="Ahmed Khan" icon={UserRound} error={errors.patientName} {...register("patientName", { required: "Patient name is required" })} />
          <Select label="Blood Group Required" error={errors.requiredBloodGroup} {...register("requiredBloodGroup", { required: "Blood group is required" })}><option value="">Select group</option>{groups.map(g => <option key={g} value={g}>{g}</option>)}</Select>
          <InputField label="Units Required" type="number" min="1" placeholder="2" icon={Droplet} error={errors.unitsRequired} {...register("unitsRequired", { required: "Units required", min: { value: 1, message: "At least 1 unit" } })} />
          <InputField label="Hospital Name" placeholder="JPMC" icon={Hospital} error={errors.hospitalName} {...register("hospitalName", { required: "Hospital name is required" })} />
          <InputField label="City" placeholder="Karachi" icon={MapPin} error={errors.city} {...register("city", { required: "City is required" })} />
          <Select label="Emergency Level" error={errors.emergencyLevel} {...register("emergencyLevel", { required: true })}><option value="urgent">Urgent</option><option value="critical">Critical</option><option value="scheduled">Scheduled</option></Select>
          <Textarea label="Emergency Notes" placeholder="Patient condition, ward, timing and instructions" error={errors.emergencyNotes} {...register("emergencyNotes")} />
          <div className="md:col-span-2 rounded-2xl border border-dashed border-black/15 bg-[#f7f7f7] p-5 text-center"><FileUp className="mx-auto mb-2 size-7 text-[#dc2626]" /><p className="font-head text-lg font-black text-[#151515]">Upload Prescription / Blood Requirement Slip</p><p className="mt-1 text-xs font-semibold text-[#555]">Optional UI placeholder, file upload can be connected when needed.</p></div>
        </div>
        {errors.root && <p className="mt-5 rounded-2xl bg-[#dc2626]/10 px-4 py-3 text-sm font-bold text-[#dc2626]">{errors.root.message}</p>}
        <button disabled={mutation.isPending} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#151515] px-6 font-head text-sm font-black text-white hover:bg-[#dc2626] disabled:opacity-70">{mutation.isPending ? "Creating..." : "Create Emergency Request"}<ArrowRight size={16} /></button>
      </form>
    </DashboardLayout>
  )
}
export default CreateRequest
