import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '../api/doctorApi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'doctors'
  
  // Data States
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search States
  const [userSearch, setUserSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');

  // Modals States
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Active Entity for Edit/Delete
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // { type: 'user' | 'doctor', id: number, name: string }

  // Form States - User
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'PATIENT'
  });

  // Form States - Doctor
  const [doctorForm, setDoctorForm] = useState({
    fullName: '',
    email: '',
    specialization: '',
    hospital: '',
    experience: '',
    stage: 'MO',
    phone: '',
    availability: 'Available'
  });

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersData, doctorsData] = await Promise.all([
        getAllUsers(),
        getAllDoctors()
      ]);
      setUsers(usersData);
      setDoctors(doctorsData);
    } catch (err) {
      showError('Failed to load dashboard data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // User Actions
  const handleOpenUserModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setUserForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '', // Keep empty unless updating (backend requires password on user updates if mapped, but let's check)
        phone: user.phone,
        address: user.address,
        role: user.role
      });
    } else {
      setSelectedUser(null);
      setUserForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'PATIENT'
      });
    }
    setShowUserModal(true);
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Prepare request payload (omit password if empty)
        const payload = { ...userForm };
        if (!payload.password) {
          delete payload.password;
        }
        await updateUser(selectedUser.id, payload);
        showSuccess(`User '${userForm.firstName}' updated successfully.`);
      } else {
        if (!userForm.password) {
          showError('Password is required for new users.');
          return;
        }
        await createUser(userForm);
        showSuccess(`User '${userForm.firstName}' created successfully.`);
      }
      setShowUserModal(false);
      fetchData();
    } catch (err) {
      showError(err || 'Failed to save user.');
    }
  };

  const handleOpenDeleteUser = (user) => {
    setConfirmAction({
      type: 'user',
      id: user.id,
      name: `${user.firstName} ${user.lastName}`
    });
    setShowConfirmModal(true);
  };

  // Doctor Actions
  const handleOpenDoctorModal = (doctor = null) => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setDoctorForm({
        fullName: doctor.fullName,
        email: doctor.email || '',
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        experience: doctor.experience,
        stage: doctor.stage || 'MO',
        phone: doctor.phone || '',
        availability: doctor.availability || 'Available'
      });
    } else {
      setSelectedDoctor(null);
      setDoctorForm({
        fullName: '',
        email: '',
        specialization: '',
        hospital: '',
        experience: '',
        stage: 'MO',
        phone: '',
        availability: 'Available'
      });
    }
    setShowDoctorModal(true);
  };

  const handleDoctorFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...doctorForm,
      experience: parseInt(doctorForm.experience) || 0
    };
    try {
      if (selectedDoctor) {
        await updateDoctor(selectedDoctor.id, payload);
        showSuccess(`Doctor '${doctorForm.fullName}' updated successfully.`);
      } else {
        await createDoctor(payload);
        showSuccess(`Doctor '${doctorForm.fullName}' added successfully.`);
      }
      setShowDoctorModal(false);
      fetchData();
    } catch (err) {
      showError('Failed to save doctor details.');
      console.error(err);
    }
  };

  const handleOpenDeleteDoctor = (doctor) => {
    setConfirmAction({
      type: 'doctor',
      id: doctor.id,
      name: doctor.fullName
    });
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === 'user') {
        await deleteUser(confirmAction.id);
        showSuccess(`User '${confirmAction.name}' deleted successfully.`);
      } else {
        await deleteDoctor(confirmAction.id);
        showSuccess(`Doctor '${confirmAction.name}' deleted successfully.`);
      }
      setShowConfirmModal(false);
      setConfirmAction(null);
      fetchData();
    } catch (err) {
      showError(`Failed to delete the ${confirmAction.type}.`);
      console.error(err);
    }
  };

  // Filtered lists
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = userSearch.toLowerCase();
    return fullName.includes(query) || user.email.toLowerCase().includes(query) || user.role.toLowerCase().includes(query);
  });

  const filteredDoctors = doctors.filter(doc => {
    const query = doctorSearch.toLowerCase();
    return doc.fullName.toLowerCase().includes(query) || 
           doc.specialization.toLowerCase().includes(query) || 
           doc.hospital.toLowerCase().includes(query);
  });

  // Role pill styles
  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'DOCTOR':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  // Stage pill styles
  const getStageBadge = (stage) => {
    switch (stage) {
      case 'CONSULTANT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'REGISTRAR':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'MO':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'INTERN':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              System <span className="text-primary">Administration</span>
            </h1>
            <p className="mt-2 text-slate-500 font-light text-sm sm:text-base">
              Manage platform user registrations, update doctor registry tables, and configure system access parameters.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (activeTab === 'users') {
                  handleOpenUserModal();
                } else {
                  handleOpenDoctorModal();
                }
              }}
              className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add {activeTab === 'users' ? 'User' : 'Doctor'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Users</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : users.length}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Doctors</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{isLoading ? '...' : doctors.length}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Patients Registered</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {isLoading ? '...' : users.filter(u => u.role === 'PATIENT').length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Administrators</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {isLoading ? '...' : users.filter(u => u.role === 'ADMIN').length}
              </h3>
            </div>
          </div>
        </div>

        {/* Tab Controls and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 space-y-4 sm:space-y-0">
            <div className="flex space-x-2 bg-slate-50 p-1.5 rounded-xl self-start">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'users' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Users List
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'doctors' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Doctors Directory
              </button>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              {activeTab === 'users' ? (
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="w-full bg-slate-50 text-sm border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              ) : (
                <input
                  type="text"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  placeholder="Search doctors by name or hospital..."
                  className="w-full bg-slate-50 text-sm border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              )}
            </div>
          </div>

          {/* Skeletons or Lists */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 w-full bg-slate-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : activeTab === 'users' ? (
            /* Users Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-4 font-semibold">User ID</th>
                    <th className="py-4 px-4 font-semibold">Name</th>
                    <th className="py-4 px-4 font-semibold">Email</th>
                    <th className="py-4 px-4 font-semibold">Phone</th>
                    <th className="py-4 px-4 font-semibold">Address</th>
                    <th className="py-4 px-4 font-semibold">Role</th>
                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-10 text-center text-slate-400 font-light">
                        No registered users found matching the search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-150">
                        <td className="py-4 px-4 font-semibold text-slate-900">#{user.id}</td>
                        <td className="py-4 px-4 font-medium text-slate-900">{user.firstName} {user.lastName}</td>
                        <td className="py-4 px-4">{user.email}</td>
                        <td className="py-4 px-4 text-xs font-mono">{user.phone}</td>
                        <td className="py-4 px-4 max-w-[180px] truncate">{user.address}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenUserModal(user)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-all cursor-pointer inline-flex"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenDeleteUser(user)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-all cursor-pointer inline-flex"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Doctors Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-4 font-semibold">Doctor ID</th>
                    <th className="py-4 px-4 font-semibold">Name</th>
                    <th className="py-4 px-4 font-semibold">Specialization</th>
                    <th className="py-4 px-4 font-semibold">Career Stage</th>
                    <th className="py-4 px-4 font-semibold">Experience</th>
                    <th className="py-4 px-4 font-semibold">Hospital</th>
                    <th className="py-4 px-4 font-semibold">Phone</th>
                    <th className="py-4 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filteredDoctors.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-10 text-center text-slate-400 font-light">
                        No doctors found matching the search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredDoctors.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50/50 transition-all duration-150">
                        <td className="py-4 px-4 font-semibold text-slate-900">#{doc.id}</td>
                        <td className="py-4 px-4 font-semibold text-slate-900">{doc.fullName}</td>
                        <td className="py-4 px-4 font-medium text-primary">{doc.specialization}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStageBadge(doc.stage)}`}>
                            {doc.stage}
                          </span>
                        </td>
                        <td className="py-4 px-4">{doc.experience} Years</td>
                        <td className="py-4 px-4 max-w-[150px] truncate">{doc.hospital}</td>
                        <td className="py-4 px-4 text-xs font-mono">{doc.phone || 'N/A'}</td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenDoctorModal(doc)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-all cursor-pointer inline-flex"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleOpenDeleteDoctor(doc)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-all cursor-pointer inline-flex"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Add/Edit Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-xl font-bold text-slate-900">
              {selectedUser ? 'Edit User Attributes' : 'Create New System User'}
            </h3>
            <form onSubmit={handleUserFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">First Name</label>
                  <input
                    type="text"
                    required
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Last Name</label>
                  <input
                    type="text"
                    required
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Password {selectedUser && '(leave blank to keep unchanged)'}
                </label>
                <input
                  type="password"
                  required={!selectedUser}
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">System Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-slate-700 transition-all focus:bg-white focus:border-primary cursor-pointer"
                  >
                    <option value="PATIENT">PATIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Address</label>
                <input
                  type="text"
                  required
                  value={userForm.address}
                  onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
                  className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm cursor-pointer shadow-md"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctor Add/Edit Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <h3 className="text-xl font-bold text-slate-900">
              {selectedDoctor ? 'Edit Doctor Record' : 'Register Doctor in Directory'}
            </h3>
            <form onSubmit={handleDoctorFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={doctorForm.fullName}
                  onChange={(e) => setDoctorForm({ ...doctorForm, fullName: e.target.value })}
                  placeholder="Dr. Name Surname"
                  className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Specialization</label>
                  <input
                    type="text"
                    required
                    value={doctorForm.specialization}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                    placeholder="Cardiologist"
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Hospital</label>
                  <input
                    type="text"
                    required
                    value={doctorForm.hospital}
                    onChange={(e) => setDoctorForm({ ...doctorForm, hospital: e.target.value })}
                    placeholder="General Hospital"
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    value={doctorForm.experience}
                    onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                    placeholder="10"
                    min="0"
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Career Stage</label>
                  <select
                    value={doctorForm.stage}
                    onChange={(e) => setDoctorForm({ ...doctorForm, stage: e.target.value })}
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-slate-700 transition-all focus:bg-white focus:border-primary cursor-pointer"
                  >
                    <option value="INTERN">INTERN</option>
                    <option value="MO">MEDICAL OFFICER (MO)</option>
                    <option value="REGISTRAR">REGISTRAR</option>
                    <option value="CONSULTANT">CONSULTANT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={doctorForm.phone}
                    onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                    placeholder="+94-77-xxxxxxx"
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={doctorForm.email}
                    onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                    placeholder="doctor@example.com"
                    className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">Availability Description</label>
                <input
                  type="text"
                  required
                  value={doctorForm.availability}
                  onChange={(e) => setDoctorForm({ ...doctorForm, availability: e.target.value })}
                  placeholder="Mon, Wed 9AM - 1PM"
                  className="w-full bg-slate-50 text-sm border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-black transition-all focus:bg-white focus:border-primary"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDoctorModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm cursor-pointer shadow-md"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-[scaleIn_0.15s_ease-out]">
            <div className="flex items-center space-x-3 text-red-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
            </div>
            <p className="text-sm text-slate-500 font-light">
              Are you sure you want to delete the {confirmAction?.type} <span className="font-semibold text-slate-800">"{confirmAction?.name}"</span>? 
              This action is destructive and cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmAction(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm cursor-pointer shadow-md"
              >
                Delete Permanent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
