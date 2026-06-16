import { AlertCircle, CheckCircle2, HeartHandshake, MapPinned, ShieldCheck, UserCheck } from 'lucide-react'

const steps = [
  { title: 'Create Request', desc: 'Patient attendant submits blood group, hospital and required units.', icon: AlertCircle },
  { title: 'Verify', desc: 'Hospital or admin verifies the request before donor contact.', icon: ShieldCheck },
  { title: 'Match Donors', desc: 'Blood group, distance, availability and cooldown are checked.', icon: MapPinned },
  { title: 'Fulfill', desc: 'Coordinator tracks accepted, donated, fulfilled or expired status.', icon: HeartHandshake },
]

const benefits = [
  { title: 'Verified requests', desc: 'Every emergency is approved before donor alerts are sent.', icon: CheckCircle2 },
  { title: 'Privacy first', desc: 'Donor contact details stay hidden until consent is provided.', icon: UserCheck },
  { title: 'Eligibility logic', desc: 'Last donation date and availability reduce unsafe matching.', icon: ShieldCheck },
]

const Features = () => {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 lg:px-12 bg-[#E6E6E6]">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-head text-sm font-bold uppercase tracking-[0.24em] text-red-600">How it works</p>
          <h2 className="mt-3 font-head text-4xl font-black uppercase text-neutral-950 md:text-5xl">Emergency flow</h2>
        </div>
        <p className="max-w-xl font-para text-neutral-600">A complete end-to-end workflow for donor registration, request verification, consent and fulfillment tracking.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="group rounded-[1.7rem] border border-white/70 bg-white/65 p-6 shadow-xl shadow-neutral-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/10">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-head text-5xl font-black text-neutral-200">0{index + 1}</span>
                <span className="flex size-13 items-center justify-center rounded-full bg-red-600 text-white transition group-hover:scale-110"><Icon size={22}/></span>
              </div>
              <h3 className="font-head text-2xl font-black uppercase text-neutral-950">{item.title}</h3>
              <p className="mt-3 font-para text-sm leading-6 text-neutral-600">{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {benefits.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-[1.7rem] border border-neutral-900/10 bg-neutral-950 p-6 text-white shadow-2xl shadow-neutral-950/20">
              <Icon className="text-red-500" size={28}/>
              <h3 className="mt-5 font-head text-2xl font-black uppercase">{item.title}</h3>
              <p className="mt-3 font-para text-sm leading-6 text-neutral-300">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Features
