import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-br from-primary-light/30 via-white to-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2 tracking-tight">
          Welcome back, <span className="text-primary">{user?.firstName} {user?.lastName}</span>!
        </h1>
        <p className="text-gray-500 font-light mb-6 text-sm sm:text-base">
          Manage your appointments, health history, and profile details below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-black mb-3">Profile Information</h2>
            <div className="space-y-2 text-sm text-black">
              <p className="text-gray-600"><span className="font-semibold text-black">Email:</span> {user?.email}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Phone:</span> {user?.phone}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Address:</span> {user?.address}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-black mb-3">Quick Actions</h2>
              <p className="text-gray-500 text-sm font-light mb-4">Book a new appointment or consult with our top doctors.</p>
            </div>
            <div className="flex space-x-3">
              <a href="/book-appointment" className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition-colors duration-200">
                Book Appointment
              </a>
              <a href="/doctors" className="py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                Find Doctors
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
