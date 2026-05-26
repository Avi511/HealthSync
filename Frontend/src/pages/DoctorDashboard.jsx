import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getDoctorByEmail, updateDoctor } from '../api/doctorApi';
import { getAppointmentsByDoctor, updateAppointmentStatus } from '../api/appoinmentApi';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    specialization: '',
    hospital: '',
    experience: '',
    stage: '',
    availability: '',
    phone: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchDoctorData();
  }, [user]);

  const fetchDoctorData = async () => {
    if (!user?.email) return;
    try {
      setIsLoading(true);
      // Fetch doctor by email
      const docData = await getDoctorByEmail(user.email);
      setDoctor(docData);

      // Setup edit form
      setEditForm({
        fullName: docData.fullName || '',
        specialization: docData.specialization || '',
        hospital: docData.hospital || '',
        experience: docData.experience || '',
        stage: docData.stage || '',
        availability: docData.availability || '',
        phone: docData.phone || '',
        email: docData.email || '',
        password: docData.password || ''
      });

      // Fetch appointments
      const appts = await getAppointmentsByDoctor(docData.id);
      setAppointments(appts || []);
    } catch (error) {
      console.error("Failed to fetch doctor data", error);
      showError("Could not load your profile details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDoc = await updateDoctor(doctor.id, editForm);
      setDoctor(updatedDoc);
      setShowEditModal(false);
      showSuccess("Profile updated successfully!");
    } catch (error) {
      showError("Failed to update profile.");
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, { status: newStatus });
      showSuccess(`Appointment marked as ${newStatus}`);
      fetchDoctorData(); // Refresh list
    } catch (error) {
      showError("Failed to update appointment status.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-br from-primary-light/30 via-white to-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2 tracking-tight">
              Welcome, <span className="text-primary">{doctor?.fullName || user?.firstName}</span>!
            </h1>
            <p className="text-gray-500 font-light mb-6 text-sm sm:text-base">
              Manage your profile and view your upcoming appointments.
            </p>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-black mb-4">Professional Info</h2>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600"><span className="font-semibold text-black">Specialization:</span> {doctor?.specialization}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Hospital:</span> {doctor?.hospital}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Experience:</span> {doctor?.experience} Years</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Stage:</span> {doctor?.stage}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-black mb-4">Contact Info</h2>
            <div className="space-y-3 text-sm">
              <p className="text-gray-600"><span className="font-semibold text-black">Email:</span> {doctor?.email}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Phone:</span> {doctor?.phone}</p>
              <p className="text-gray-600"><span className="font-semibold text-black">Availability:</span> {doctor?.availability}</p>
            </div>
          </div>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-extrabold text-primary mb-2">{appointments.length}</h2>
            <p className="text-gray-600 font-medium">Total Appointments</p>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-6">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 font-light">You have no appointments at the moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-black">
                      {appt.patientName || "Unknown"}
                      <div className="text-xs text-gray-400 font-normal">{appt.patientEmail}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <div>{new Date(appt.appointmentDate).toLocaleDateString()}</div>
                      <div className="font-semibold">{appt.timeSlot}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {appt.reason || "-"}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${appt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        appt.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                        {appt.status || "SCHEDULED"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleStatusChange(appt.id, 'COMPLETED')}
                        className="text-xs font-semibold text-green-600 hover:text-green-800 transition-colors"
                        disabled={appt.status === 'COMPLETED' || appt.status === 'CANCELLED'}
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(appt.id, 'CANCELLED')}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                        disabled={appt.status === 'COMPLETED' || appt.status === 'CANCELLED'}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 pt-10 sm:pt-16 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-[scaleIn_0.15s_ease-out] my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={editForm.fullName} onChange={e => setEditForm({ ...editForm, fullName: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required disabled />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Specialization</label>
                  <input type="text" value={editForm.specialization} onChange={e => setEditForm({ ...editForm, specialization: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Hospital</label>
                  <input type="text" value={editForm.hospital} onChange={e => setEditForm({ ...editForm, hospital: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Experience (Years)</label>
                  <input type="number" value={editForm.experience} onChange={e => setEditForm({ ...editForm, experience: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Stage</label>
                  <input type="text" value={editForm.stage} onChange={e => setEditForm({ ...editForm, stage: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Availability</label>
                  <input type="text" value={editForm.availability} onChange={e => setEditForm({ ...editForm, availability: e.target.value })} className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-3 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary" required />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
