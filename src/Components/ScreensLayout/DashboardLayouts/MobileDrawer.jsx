import { Droplet, X } from "lucide-react"
import { NavLink } from "react-router-dom"

const DashboardMobileDrawer = ({ open, onClose, roleName = "Dashboard", tabs = [] }) => {
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} />
      <aside className={`fixed left-0 top-0 z-50 h-dvh w-[310px] max-w-[86vw] bg-white p-4 shadow-2xl transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col rounded-[2rem] border border-black/10 bg-white p-4">
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#dc2626] text-white"><Droplet className="size-5" /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#dc2626]">BloodBridge</p>
                <h1 className="font-head text-lg font-black text-[#151515]">{roleName}</h1>
              </div>
            </div>
            <button aria-label="Close menu" className="flex size-10 items-center justify-center rounded-2xl bg-[#f4f4f4] text-[#151515]" onClick={onClose} type="button"><X className="size-5" /></button>
          </div>

          <nav className="mt-6 space-y-1.5">
            {tabs.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? "bg-[#151515] text-white" : "text-[#666] hover:bg-[#f4f4f4]"}`
                  }
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default DashboardMobileDrawer
