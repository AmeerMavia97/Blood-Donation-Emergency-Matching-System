import { Droplet } from "lucide-react"
import { NavLink } from "react-router-dom"

const DashboardSidebar = ({ roleName = "Dashboard", tabs = [] }) => {
  return (
    <aside className="hidden w-[270px] shrink-0 lg:block">
      <div className="sticky top-6 flex h-[calc(100vh-48px)] flex-col rounded-[2rem]  p-3">
      
        <NavLink to="/" className="flex items-center gap-3 px-2 mt-4 mb-5">
          <span className="flex size-9 items-center justify-center"><img src={'/BloodLogo.png'} alt="BloodBridge" /></span>
          <div className="hidden sm:block leading-none"><h4 className="font-head text-xl font-black uppercase tracking-tight text-[#151515]">BloodBridge</h4><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">{roleName}</p></div>
        </NavLink>

        <p className="mb-3 font-head mt-7 px-3 text-xs font-black uppercase tracking-[0.18em] text-[#999]">Main tabs</p>
        <nav className="space-y-1.5">
          {tabs.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 font-head rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive
                    ? "bg-[#151515] text-white shadow-lg shadow-black/15"
                    : "text-[#666] hover:bg-[#f4f4f4] hover:text-[#dc2626]"
                  }`
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
  )
}

export default DashboardSidebar
