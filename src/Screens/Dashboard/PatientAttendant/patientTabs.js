import { Building2, HeartHandshake, LayoutDashboard, Share2, UserRound, UsersRound, FileText } from "lucide-react"

export const patientTabs = [
  { label: "Overview", path: "/attendant", icon: LayoutDashboard, end: true },
  { label: "My Requests", path: "/attendant/my-requests", icon: FileText, end: false },
  { label: "Matched Donors", path: "/attendant/matched-donors", icon: UsersRound, end: false },
  { label: "Blood Bank Offers", path: "/attendant/blood-bank-offers", icon: Building2, end: false },
  { label: "Share Request", path: "/attendant/share-request", icon: Share2, end: false },
  { label: "Profile", path: "/attendant/profile", icon: UserRound, end: false },
]

export const roleName = "Patient Attendant"

export const requestStatusLabel = (status) => ({
  pending_verification: "Pending Verification",
  verified: "Verified",
  matched: "Matched",
  fulfilled: "Fulfilled",
  expired: "Expired",
  rejected: "Rejected",
  public_unverified: "Public Proof",
}[status] || status?.replaceAll("_", " ") || "Pending")

export const statusTone = (status) => ({
  pending_verification: "bg-amber-500/10 text-amber-700",
  verified: "bg-emerald-500/10 text-emerald-700",
  matched: "bg-blue-500/10 text-blue-700",
  fulfilled: "bg-[#151515] text-white",
  expired: "bg-black/5 text-[#555]",
  rejected: "bg-[#dc2626]/10 text-[#dc2626]",
  public_unverified: "bg-orange-500/10 text-orange-700",
}[status] || "bg-black/5 text-[#555]")
