import { Routes, Route, Navigate } from "react-router-dom";

// Role Selector (Landing Page)
import RoleSelector from "@/features/RoleSelector";

// Pilgrim Features
import Preferences from "@/features/pilgrim/preferences/PreferencesPage";
import FindGuide from "@/features/pilgrim/find-guide/FindGuidePage";
import MatchGuide from "@/features/pilgrim/match-guide/MatchGuidePage";
import Tracking from "@/features/pilgrim/tracking/TrackingPage";
import Booking from "@/features/pilgrim/booking/BookingPage";
import Cancellation from "@/features/pilgrim/cancellation/CancellationPage";
import BookingCare from "@/features/pilgrim/booking-care/BookingCarePage";
import RefundPolicy from "@/features/pilgrim/refund-policy/RefundPolicyPage";

// Partner Features
import Dashboard from "@/features/partner/dashboard/DashboardPage";
import DriverPortal from "@/features/partner/driver-portal/DriverPortalPage";
import JobManagement from "@/features/partner/job-management/JobManagementPage";

function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Routes>
        {/* Landing / Role Selection */}
        <Route path="/" element={<RoleSelector />} />

        {/* Pilgrim Routes */}
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/find-guide" element={<FindGuide />} />
        <Route path="/match-guide" element={<MatchGuide />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/booking-care" element={<BookingCare />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Partner/Guide Routes */}
        <Route path="/partner/dashboard" element={<Dashboard />} />
        <Route path="/partner/driver" element={<DriverPortal />} />
        <Route path="/partner/jobs" element={<JobManagement />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
