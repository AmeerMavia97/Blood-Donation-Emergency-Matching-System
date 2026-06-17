import { useState } from "react"
import DashboardHeader from "@/Components/ScreensLayout/DashboardLayouts/Header"
import DashboardMobileDrawer from "@/Components/ScreensLayout/DashboardLayouts/MobileDrawer"
import DashboardSidebar from "@/Components/ScreensLayout/DashboardLayouts/Sidebar"

const DashboardLayout = ({ roleName, title, description, tabs = [], children, action }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#151515]">
      <div className="relative flex min-h-screen gap-5 p-4 sm:p-6">
        <DashboardSidebar roleName={roleName} tabs={tabs} />
        <DashboardMobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} roleName={roleName} tabs={tabs} />

        <section className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_90px_rgba(0,0,0,0.08)]">
            <DashboardHeader title={title} description={description} action={action} onMenuClick={() => setDrawerOpen(true)} />
            <div className="px-5 py-6 sm:px-7 lg:px-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardLayout
