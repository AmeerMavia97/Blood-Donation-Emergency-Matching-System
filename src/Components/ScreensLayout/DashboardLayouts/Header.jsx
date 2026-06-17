import Logout from "@/Components/Layout/Logout/Logout"
import { Menu, Search } from "lucide-react"

const DashboardHeader = ({ title = "Dashboard", description = "Manage emergency blood donation workflow.", onMenuClick, action }) => {
  return (
    <header className="border-b border-black/10 px-5 pb-5 pt-6 sm:px-7 lg:px-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <button
            aria-label="Open menu"
            className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#151515] text-white transition hover:bg-[#dc2626] lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            <Menu className="size-5" />
          </button>

          <div>

            <h1 className=" font-head text-3xl font-black text-[#151515] md:text-3xl">{title}</h1>
            {description && <p className="mt-1 max-w-2xl text-[13px] leading-6 text-[#666]">{description}</p>}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center xl:w-auto">
          {action}

          <Logout />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
