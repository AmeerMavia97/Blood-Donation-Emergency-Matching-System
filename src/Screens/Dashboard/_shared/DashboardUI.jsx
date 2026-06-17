import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Droplet,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"

/* ---------------- STAT GRID ---------------- */
export const StatGrid = ({ stats = [] }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => {
      const Icon = stat.icon || TrendingUp
      return (
        <div
          key={stat.label}
          className="rounded-[1.5rem] border border-black/10 bg-[#f7f7f7] p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-white text-[#dc2626] ring-1 ring-black/5">
              <Icon className="size-5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#888]">
              {stat.tag || "Live"}
            </span>
          </div>

          <h3 className="mt-5 font-head text-3xl font-black text-[#151515]">
            {stat.value}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#666]">
            {stat.label}
          </p>
        </div>
      )
    })}
  </div>
)

/* ---------------- SECTION TITLE ---------------- */
export const SectionTitle = ({ eyebrow, title, desc }) => (
  <div className="mb-6">
    {eyebrow && (
      <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#dc2626]">
        {eyebrow}
      </p>
    )}
    <h2 className="font-head text-2xl font-black text-[#151515] md:text-3xl">
      {title}
    </h2>
    {desc && (
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#666]">
        {desc}
      </p>
    )}
  </div>
)

/* ---------------- HERO NOTICE ---------------- */
export const HeroNotice = ({ title, desc, icon: Icon = ShieldCheck }) => (
  <div className="relative overflow-hidden rounded-[1.8rem] bg-[#151515] p-6 text-white">
    <div className="absolute -right-12 -top-12 size-40 rounded-full bg-[#dc2626]/25 blur-2xl" />

    <div className="relative flex items-start gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dc2626] text-white">
        <Icon size={24} />
      </span>

      <div>
        <h3 className="font-head text-2xl font-black">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/65">{desc}</p>
      </div>
    </div>
  </div>
)

/* ---------------- BLOOD STOCK GRID ---------------- */
export const BloodStockGrid = ({ values = [] }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    {values.map((item) => (
      <div
        key={item.group}
        className="rounded-[1.4rem] border border-black/10 bg-[#f7f7f7] p-4 text-center"
      >
        <Droplet className="mx-auto mb-2 size-7 text-[#dc2626]" />
        <h4 className="font-head text-2xl font-black text-[#151515]">
          {item.group}
        </h4>
        <p className="mt-1 text-sm font-bold text-[#666]">
          {item.units} units
        </p>
      </div>
    ))}
  </div>
)

/* ---------------- ACTION BUTTON ---------------- */
export const ActionButton = ({ children }) => (
  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 font-head text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#b91c1c]">
    {children}
    <ArrowRight size={16} />
  </button>
)

/* ---------------- SELECT FIELD ---------------- */
export const SelectField = ({ label, options = [], value, onChange }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-[#151515]">
      {label}
    </span>

    <select value={value}
      onChange={onChange} className="h-13 w-full rounded-2xl border border-black/10 bg-[#f7f7f7] px-4 text-sm font-semibold outline-none transition focus:border-[#dc2626] focus:ring-4 focus:ring-[#dc2626]/10">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
)


/* ---------------- FIELD ---------------- */
export const Field = ({ label, type = "text", value, onChange, disabled, placeholder }) => (

  <label className="block">
    <span className="mb-2 block text-sm font-bold text-[#151515]">
      {label}
    </span>

    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="h-13 w-full rounded-2xl border border-black/10 bg-[#f7f7f7] px-4 text-sm font-semibold outline-none transition focus:border-[#dc2626] focus:ring-4 focus:ring-[#dc2626]/10"
    />
  </label>
)

/* ---------------- FORM SHELL ---------------- */
export const FormShell = ({ children }) => (
  <div className="grid gap-5 md:grid-cols-2">{children}</div>
)

/* ---------------- STATUS BADGE ---------------- */
export const StatusBadge = ({ children, tone = "gray" }) => {
  const tones = {
    red: "font-head bg-[#dc2626]/10 text-[#dc2626]",
    green: "font-head bg-emerald-500/10 text-emerald-700",
    amber: "font-head bg-amber-500/10 text-amber-700",
    gray: "font-head bg-black/5 text-[#666]",
    dark: "font-head bg-[#151515] text-white",
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${tones[tone] || tones.gray
        }`}
    >
      {children}
    </span>
  )
}

/* ---------------- DATA PANEL ---------------- */
export const DataPanel = ({ title, children, action }) => (
  <section className="rounded-[1.6rem] border border-black/10 bg-white p-5 shadow-[0_14px_50px_rgba(0,0,0,0.04)]">
    <div className="mb-5 flex items-center justify-between gap-4">
      <h3 className="font-head text-xl font-black text-[#151515]">
        {title}
      </h3>

      {action && (
        <button className="rounded-full bg-[#151515] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#dc2626]">
          {action}
        </button>
      )}
    </div>

    {children}
  </section>
)

/* ---------------- REQUEST ROW ---------------- */
export const RequestRow = ({
  group,
  title,
  meta,
  status,
  tone = "amber",
  cta = "View",
  button = "true" ,
}) => (
  <div className="flex flex-col gap-4 border-b border-black/10 py-4 last:border-b-0 sm:flex-row sm:items-center">
    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#dc2626] font-head text-xl font-black text-white">
      {group}
    </div>

    <div className="min-w-0 flex-1">
      <h4 className="font-head text-lg font-black text-[#151515]">
        {title}
      </h4>
      <p className="mt-1 text-sm text-[#666]">{meta}</p>
    </div>

    <StatusBadge tone={tone}>{status}</StatusBadge>

    {
      button !== "false" && <button className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[#151515] transition hover:border-[#dc2626] hover:text-[#dc2626]">
        {cta} <ArrowRight size={14} />
      </button>
    }

  </div>
)

/* ---------------- TIMELINE ---------------- */
export const Timeline = ({ items = [] }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={item.title} className="flex gap-4">
        <div className="flex flex-col items-center">
          <span
            className={`flex size-9 items-center justify-center rounded-full ${index === 0
                ? "bg-[#dc2626] text-white"
                : "bg-[#151515] text-white"
              }`}
          >
            {index === 0 ? (
              <Clock size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
          </span>

          {index !== items.length - 1 && (
            <span className="mt-2 h-10 w-px bg-black/10" />
          )}
        </div>

        <div>
          <h4 className="font-head text-lg font-black text-[#151515]">
            {item.title}
          </h4>
          <p className="mt-1 text-sm text-[#666]">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
)
