import { useAuthUser } from "@/Components/hooks/useAuthUser"
import { getDashboardPath } from "@/services/authApi"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children, roles = [] }) => {
  const location = useLocation()
  const { data, isLoading } = useAuthUser()
  const user = data?.user
  const profile = data?.profile
console.log("ProtectedRoute", {
  isLoading,
  user,
  profile,
  pathname: location.pathname,
})
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4] font-head text-xl font-black text-[#151515]">Loading...</div>
  }
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  if (roles.length && !roles.includes(profile?.role)) return <Navigate to={getDashboardPath(profile)} replace />
  return children
}

export default ProtectedRoute
