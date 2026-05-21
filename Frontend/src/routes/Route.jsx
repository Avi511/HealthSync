import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import BookAppoinment from '../pages/BookAppoinment';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MedicalFAQ from '../pages/MedicalFAQ';
import HelpDesk from '../pages/HelpDesk';
import PrivacyDoc from '../pages/PrivacyDoc';
import TermsOfService from '../pages/TermsOfService';
import CookieConfig from '../pages/CookieConfig';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/book-appointment" element={<BookAppoinment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/medical-faq" element={<MedicalFAQ />} />
      <Route path="/help-desk" element={<HelpDesk />} />
      <Route path="/privacy" element={<PrivacyDoc />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookieConfig />} />
    </Routes>
  );
}

