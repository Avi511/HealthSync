import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointmentsByPatient } from '../api/appoinmentApi';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { showError } = useToast();

  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (user?.id) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      setLoadingAppts(true);
      const data = await getAppointmentsByPatient(user.id);
      // Sort by date/time
      const sortedData = (data || []).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
      setAppointments(sortedData);
    } catch (err) {
      console.error(err);
      showError("Failed to fetch appointments.");
    } finally {
      setLoadingAppts(false);
    }
  };

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
      <div className="bg-gradient-to-br from-primary-light/30 via-white to-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
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

      {/* Appointments List */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-6">Your Appointments</h2>
        {loadingAppts ? (
          <div className="h-24 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500 font-light">You have no appointments at the moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor Name</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-black">
                      {appt.doctorName || "Unknown"}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div>{new Date(appt.appointmentDate).toLocaleDateString()}</div>
                      <div className="font-semibold">{appt.timeSlot || appt.appointmentTime}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {appt.reason || "-"}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        appt.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {appt.status || "SCHEDULED"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
