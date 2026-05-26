import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import BookAppoinment from '../pages/BookAppoinment';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import DoctorDashboard from '../pages/DoctorDashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MedicalFAQ from '../pages/MedicalFAQ';
import HelpDesk from '../pages/HelpDesk';
import PrivacyDoc from '../pages/PrivacyDoc';
import TermsOfService from '../pages/TermsOfService';
import CookieConfig from '../pages/CookieConfig';

export default function AppRoutes() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getHomeRedirect = () => {
    if (user?.role === 'ADMIN') return '/admin-dashboard';
    if (user?.role === 'DOCTOR') return '/doctor-dashboard';
    return '/';
  };

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'DOCTOR') ? <Navigate to={getHomeRedirect()} replace /> : <Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={getHomeRedirect()} replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to={getHomeRedirect()} replace /> : <Register />} />

      {/* Pages accessible to both guest and authenticated users */}
      <Route path="/doctors" element={<Doctors />} />

      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated 
            ? (user?.role === 'ADMIN' || user?.role === 'DOCTOR' ? <Navigate to={getHomeRedirect()} replace /> : <Dashboard />) 
            : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          isAuthenticated 
            ? (user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" replace />) 
            : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/doctor-dashboard" 
        element={
          isAuthenticated 
            ? (user?.role === 'DOCTOR' ? <DoctorDashboard /> : <Navigate to="/" replace />) 
            : <Navigate to="/login" replace />
        } 
      />
      <Route path="/book-appointment" element={isAuthenticated ? <BookAppoinment /> : <Navigate to="/login" replace />} />

      {/* Static Info Pages */}
      <Route path="/medical-faq" element={<MedicalFAQ />} />
      <Route path="/help-desk" element={<HelpDesk />} />
      <Route path="/privacy" element={<PrivacyDoc />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookieConfig />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={getHomeRedirect()} replace />} />
    </Routes>
  );
}

