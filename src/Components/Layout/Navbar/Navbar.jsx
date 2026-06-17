import { Link, NavLink } from "react-router-dom"
import { getDashboardPath } from "@/services/authApi"
import { ArrowRight, LayoutDashboard, Siren } from "lucide-react"
import { useAuthUser } from "@/Components/hooks/useAuthUser"

const Navbar = () => {
  const { data = {} } = useAuthUser()
  const user = data?.user
  const profile = data?.profile
  const isAuthenticated = !!user
  const userEmail = user?.email ?? ""
  const avatarLabel = userEmail ? userEmail.charAt(0).toUpperCase() : "U"
  const dashboardPath = getDashboardPath(profile)

  return (
    <header className="absolute left-0 top-6 z-50 w-full">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-20 items-center justify-between rounded-[2rem] px-5 md:px-2">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center"><img src={'/BloodLogo.png'} alt="BloodBridge" /></span>
            <div className="hidden sm:block leading-none"><h4 className="font-head text-xl font-black uppercase tracking-tight text-[#151515]">BloodBridge</h4><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#dc2626]">Donate Blood</p></div>
          </NavLink>
          <div className="hidden items-center gap-7 md:flex">
            <NavItem to="/">Home</NavItem><NavItem to="/requests">Requests</NavItem><NavItem to="/blood-request">Request Blood</NavItem><NavItem to="/donor">Give Blood</NavItem>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/blood-request"><button className="hidden items-center gap-2 rounded-full bg-[#dc2626] px-5 py-3 text-sm font-semibold font-head text-white shadow-lg shadow-[#dc2626]/25 transition hover:bg-[#b91c1c] sm:inline-flex"><Siren size={16} />Blood Request</button></Link>
            {isAuthenticated ? (<><Link to={dashboardPath} className="inline-flex items-center gap-2 rounded-full bg-[#151515] p-3 text-sm font-semibold text-white font-head shadow-lg shadow-black/20 transition hover:bg-[#dc2626] sm:px-5 sm:py-3"><LayoutDashboard className="size-4" /><span className="hidden sm:inline">Dashboard</span></Link><span className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#151515] ring-1 ring-black/10" title={userEmail}>{avatarLabel}</span></>) : (<><Link to="/login"><button className="hidden rounded-full border border-black/10 bg-white/70 px-6 py-2.5 text-sm font-bold text-[#151515] shadow-sm backdrop-blur-xl transition hover:bg-white sm:inline-flex font-head">Login</button></Link><Link to="/register"><button className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-sm font-semibold font-head text-white shadow-lg shadow-black/15 transition hover:bg-[#dc2626]">Sign Up<ArrowRight size={16} /></button></Link></>)}
          </div>
        </div>
      </div>
    </header>
  )
}
const NavItem = ({ to, children }) => <NavLink to={to} className={({ isActive }) => `relative font-head text-[13px] font-black uppercase tracking-wide transition ${isActive ? "text-[#dc2626]" : "text-[#252525] hover:text-[#dc2626]"}`}>{children}</NavLink>
export default Navbar
