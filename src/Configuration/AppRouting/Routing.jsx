import Login from '@/Screens/Authentication/Login/Login'
import Register from '@/Screens/Authentication/Register/Register'
import ResetPassword from '@/Screens/Authentication/ResetPassword/ResetPassword'
import ConfirmEmail from '@/Screens/Authentication/ConfirmEmail/ConfirmEmail'
import Home from '@/Screens/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/Components/Routes/ProtectedRoute'
import PatientRequest from '@/Screens/PatientRequest/PatientRequest'
import PatientRequestSuccess from '@/Screens/PatientRequest/PatientRequestSuccess'
import RequestsPage from '@/Screens/PublicRequests/RequestsPage'
import RequestDetailPage from '@/Screens/PublicRequests/RequestDetailPage'

import DonorOverview from '@/Screens/Dashboard/Donor/DonorOverview'
import DonorProfile from '@/Screens/Dashboard/Donor/DonorProfile'
import BloodRequests from '@/Screens/Dashboard/Donor/BloodRequests'
import ConsentContact from '@/Screens/Dashboard/Donor/ConsentContact'
import DonationHistory from '@/Screens/Dashboard/Donor/DonationHistory'

import PatientAttendantOverview from '@/Screens/Dashboard/PatientAttendant/PatientAttendantOverview'
import CreateRequest from '@/Screens/Dashboard/PatientAttendant/CreateRequest'
import MyRequests from '@/Screens/Dashboard/PatientAttendant/MyRequests'
import PatientProfile from '@/Screens/Dashboard/PatientAttendant/PatientProfile'
import MatchedDonors from '@/Screens/Dashboard/PatientAttendant/MatchedDonors'
import BloodBankOffers from '@/Screens/Dashboard/PatientAttendant/BloodBankOffers'
import ShareRequest from '@/Screens/Dashboard/PatientAttendant/ShareRequest'
import RequestView from '@/Screens/Dashboard/PatientAttendant/RequestView'

import HospitalVerifierOverview from '@/Screens/Dashboard/HospitalVerifier/HospitalVerifierOverview'
import PendingRequests from '@/Screens/Dashboard/HospitalVerifier/PendingRequests'
import VerifiedRequests from '@/Screens/Dashboard/HospitalVerifier/VerifiedRequests'
import FakeAlerts from '@/Screens/Dashboard/HospitalVerifier/FakeAlerts'
import VerificationHistory from '@/Screens/Dashboard/HospitalVerifier/VerificationHistory'

import BloodBankOverview from '@/Screens/Dashboard/BloodBank/BloodBankOverview'
import BloodStock from '@/Screens/Dashboard/BloodBank/BloodStock'
import UpdateStock from '@/Screens/Dashboard/BloodBank/UpdateStock'
import EmergencyRequests from '@/Screens/Dashboard/BloodBank/EmergencyRequests'
import ReservedUnits from '@/Screens/Dashboard/BloodBank/ReservedUnits'

import VolunteerOverview from '@/Screens/Dashboard/Volunteer/VolunteerOverview'
import NearbyRequests from '@/Screens/Dashboard/Volunteer/NearbyRequests'
import MyTasks from '@/Screens/Dashboard/Volunteer/MyTasks'
import NoShowReports from '@/Screens/Dashboard/Volunteer/NoShowReports'
import CoordinationHistory from '@/Screens/Dashboard/Volunteer/CoordinationHistory'

import AdminOverview from '@/Screens/Dashboard/Admin/AdminOverview'
import AllRequests from '@/Screens/Dashboard/Admin/AllRequests'
import Donors from '@/Screens/Dashboard/Admin/Donors'
import MatchingEngine from '@/Screens/Dashboard/Admin/MatchingEngine'
import UsersRoles from '@/Screens/Dashboard/Admin/UsersRoles'
import BloodBanks from '@/Screens/Dashboard/Admin/BloodBanks'
import VolunteerTasks from '@/Screens/Dashboard/Admin/VolunteerTasks'
import Alerts from '@/Screens/Dashboard/Admin/Alerts'
import AuditLogs from '@/Screens/Dashboard/Admin/AuditLogs'

const Protect = ({ children, roles }) => <ProtectedRoute roles={roles}>{children}</ProtectedRoute>

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/blood-request" element={<PatientRequest />} />
        <Route path="/request-success" element={<PatientRequestSuccess />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/:id" element={<RequestDetailPage />} />

        <Route path="/donor" element={<Protect roles={["donor"]}><DonorOverview /></Protect>} />
        <Route path="/donor/profile" element={<Protect roles={["donor"]}><DonorProfile /></Protect>} />
        <Route path="/donor/requests" element={<Protect roles={["donor"]}><BloodRequests /></Protect>} />
        <Route path="/donor/consent" element={<Protect roles={["donor"]}><ConsentContact /></Protect>} />
        <Route path="/donor/history" element={<Protect roles={["donor"]}><DonationHistory /></Protect>} />

        <Route path="/attendant" element={<Protect roles={["patient_attendant", "attendant"]}><PatientAttendantOverview /></Protect>} />
        <Route path="/attendant/create-request" element={<Protect roles={["patient_attendant", "attendant"]}><CreateRequest /></Protect>} />
        <Route path="/attendant/my-requests" element={<Protect roles={["patient_attendant", "attendant"]}><MyRequests /></Protect>} />
        <Route path="/attendant/requests/:id" element={<Protect roles={["patient_attendant", "attendant"]}><RequestView /></Protect>} />
        <Route path="/attendant/matched-donors" element={<Protect roles={["patient_attendant", "attendant"]}><MatchedDonors /></Protect>} />
        <Route path="/attendant/blood-bank-offers" element={<Protect roles={["patient_attendant", "attendant"]}><BloodBankOffers /></Protect>} />
        <Route path="/attendant/share-request" element={<Protect roles={["patient_attendant", "attendant"]}><ShareRequest /></Protect>} />
        <Route path="/attendant/profile" element={<Protect roles={["patient_attendant", "attendant"]}><PatientProfile /></Protect>} />

        <Route path="/verifier" element={<Protect roles={["hospital_verifier", "verifier"]}><HospitalVerifierOverview /></Protect>} />
        <Route path="/verifier/pending" element={<Protect roles={["hospital_verifier", "verifier"]}><PendingRequests /></Protect>} />
        <Route path="/verifier/verified" element={<Protect roles={["hospital_verifier", "verifier"]}><VerifiedRequests /></Protect>} />
        <Route path="/verifier/alerts" element={<Protect roles={["hospital_verifier", "verifier"]}><FakeAlerts /></Protect>} />
        <Route path="/verifier/history" element={<Protect roles={["hospital_verifier", "verifier"]}><VerificationHistory /></Protect>} />

        <Route path="/blood-bank" element={<Protect roles={["blood_bank"]}><BloodBankOverview /></Protect>} />
        <Route path="/blood-bank/stock" element={<Protect roles={["blood_bank"]}><BloodStock /></Protect>} />
        <Route path="/blood-bank/update-stock" element={<Protect roles={["blood_bank"]}><UpdateStock /></Protect>} />
        <Route path="/blood-bank/requests" element={<Protect roles={["blood_bank"]}><EmergencyRequests /></Protect>} />
        <Route path="/blood-bank/reserved" element={<Protect roles={["blood_bank"]}><ReservedUnits /></Protect>} />

        <Route path="/volunteer" element={<Protect roles={["volunteer"]}><VolunteerOverview /></Protect>} />
        <Route path="/volunteer/nearby-requests" element={<Protect roles={["volunteer"]}><NearbyRequests /></Protect>} />
        <Route path="/volunteer/tasks" element={<Protect roles={["volunteer"]}><MyTasks /></Protect>} />
        <Route path="/volunteer/no-show" element={<Protect roles={["volunteer"]}><NoShowReports /></Protect>} />
        <Route path="/volunteer/history" element={<Protect roles={["volunteer"]}><CoordinationHistory /></Protect>} />

        <Route path="/admin" element={<Protect roles={["admin"]}><AdminOverview /></Protect>} />
        <Route path="/admin/requests" element={<Protect roles={["admin"]}><AllRequests /></Protect>} />
        <Route path="/admin/donors" element={<Protect roles={["admin"]}><Donors /></Protect>} />
        <Route path="/admin/matching-engine" element={<Protect roles={["admin"]}><MatchingEngine /></Protect>} />
        <Route path="/admin/users-roles" element={<Protect roles={["admin"]}><UsersRoles /></Protect>} />
        <Route path="/admin/blood-banks" element={<Protect roles={["admin"]}><BloodBanks /></Protect>} />
        <Route path="/admin/volunteer-tasks" element={<Protect roles={["admin"]}><VolunteerTasks /></Protect>} />
        <Route path="/admin/alerts" element={<Protect roles={["admin"]}><Alerts /></Protect>} />
        <Route path="/admin/audit-logs" element={<Protect roles={["admin"]}><AuditLogs /></Protect>} />
      </Routes>
    </BrowserRouter>
  )
}
export default Routing
