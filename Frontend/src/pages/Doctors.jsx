import React, { useState, useEffect } from 'react';
import { getAllDoctors } from '../api/doctorApi';
import DoctorCard from '../components/DoctorCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchName, setSearchName] = useState('');
  const [filterId, setFilterId] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterMinExperience, setFilterMinExperience] = useState(0);
  const [filterHospital, setFilterHospital] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Dynamic Options derived from data
  const [specializations, setSpecializations] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllDoctors();
      setDoctors(data || []);

      // Extract unique specializations and hospitals for the filter dropdowns
      if (data && data.length > 0) {
        const uniqueSpecs = [...new Set(data.map((d) => d.specialization))].filter(Boolean);
        const uniqueHospitals = [...new Set(data.map((d) => d.hospital))].filter(Boolean);
        setSpecializations(uniqueSpecs);
        setHospitals(uniqueHospitals);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Could not connect to the doctor service. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchName('');
    setFilterId('');
    setFilterSpecialization('');
    setFilterStage('');
    setFilterMinExperience(0);
    setFilterHospital('');
  };

  // Filter Logic
  const filteredDoctors = doctors.filter((doctor) => {
    // 1. Filter by Name (Search Bar)
    if (searchName && !doctor.fullName?.toLowerCase().includes(searchName.toLowerCase())) {
      return false;
    }
    // 2. Filter by Doctor ID
    if (filterId && doctor.id?.toString() !== filterId.trim()) {
      return false;
    }
    // 3. Filter by Specialization
    if (filterSpecialization && doctor.specialization !== filterSpecialization) {
      return false;
    }
    // 4. Filter by Stage
    if (filterStage && doctor.stage?.toUpperCase() !== filterStage.toUpperCase()) {
      return false;
    }
    // 5. Filter by Experience Years (greater than or equal)
    if (filterMinExperience > 0 && (doctor.experience || 0) < filterMinExperience) {
      return false;
    }
    // 6. Filter by Hospital
    if (filterHospital && doctor.hospital !== filterHospital) {
      return false;
    }
    return true;
  });

  const displayedDoctors = filteredDoctors.slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 px-4 shadow-sm mb-12 mt-[-50px] rounded-2xl">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <h1 className="text-5xl md:text-4xl font-bold tracking-tight">
              Find Our Medical Doctors
            </h1>
            <p className="mt-2 text-primary-light text-base md:text-lg max-w-2xl">
              Search and filter through experienced, board-certified healthcare professionals at HealthSync.
            </p>
          </div>
        </div>

        {/* Search & Filter Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Name Search Bar (Primary Search tool) */}
            <div className="col-span-1 md:col-span-6 relative">
              <label htmlFor="name-search" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Search Doctor Name
              </label>
              <div className="relative">
                <input
                  id="name-search"
                  type="text"
                  placeholder="Enter doctor's name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm font-medium transition duration-200 outline-none text-black"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Doctor ID Filter */}
            <div className="col-span-1 md:col-span-3">
              <label htmlFor="id-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Doctor ID
              </label>
              <input
                id="id-filter"
                type="text"
                placeholder="e.g. 1"
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm font-medium transition duration-200 outline-none text-black"
              />
            </div>

            {/* Toggle advanced filters and reset */}
            <div className="col-span-1 md:col-span-3 flex space-x-2 w-full">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`flex-1 inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-semibold transition duration-200 cursor-pointer ${showAdvanced
                  ? 'bg-primary-light text-primary border-primary/30'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                  }`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </button>
              {(searchName || filterId || filterSpecialization || filterStage || filterMinExperience > 0 || filterHospital) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold border border-red-100 hover:border-red-200 transition duration-200 cursor-pointer"
                  title="Clear all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters Expandable Section */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden mt-6 pt-6 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Specialization Filter */}
                  <div>
                    <label htmlFor="specialization-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Specialization
                    </label>
                    <select
                      id="specialization-filter"
                      value={filterSpecialization}
                      onChange={(e) => setFilterSpecialization(e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary rounded-xl text-sm font-medium transition duration-200 outline-none text-black cursor-pointer"
                    >
                      <option value="">All Specializations</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Stage Filter */}
                  <div>
                    <label htmlFor="stage-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Career Stage
                    </label>
                    <select
                      id="stage-filter"
                      value={filterStage}
                      onChange={(e) => setFilterStage(e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary rounded-xl text-sm font-medium transition duration-200 outline-none text-black cursor-pointer"
                    >
                      <option value="">All Stages</option>
                      <option value="INTERN">Intern</option>
                      <option value="MO">Medical Officer (MO)</option>
                      <option value="REGISTRAR">Registrar</option>
                      <option value="CONSULTANT">Consultant</option>
                    </select>
                  </div>

                  {/* Hospital Filter */}
                  <div>
                    <label htmlFor="hospital-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Hospital
                    </label>
                    <select
                      id="hospital-filter"
                      value={filterHospital}
                      onChange={(e) => setFilterHospital(e.target.value)}
                      className="w-full px-3 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary rounded-xl text-sm font-medium transition duration-200 outline-none text-black cursor-pointer"
                    >
                      <option value="">All Hospitals</option>
                      {hospitals.map((hosp) => (
                        <option key={hosp} value={hosp}>{hosp}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Years Filter */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="experience-filter" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Min Experience
                      </label>
                      <span className="text-xs font-bold text-primary">
                        {filterMinExperience}+ Years
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 pt-2">
                      <input
                        id="experience-filter"
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={filterMinExperience}
                        onChange={(e) => setFilterMinExperience(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Info Bar */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-gray-500">
            Showing <span className="font-bold text-gray-900">{displayedDoctors.length}</span> of{' '}
            <span className="font-bold text-gray-900">{filteredDoctors.length}</span> matching doctors (total: {doctors.length})
          </p>
        </div>

        {/* Dynamic States Grid */}
        {loading ? (
          /* Skeleton Loader Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 animate-pulse">
                <div className="flex space-x-4 items-center">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                  <div className="flex-grow space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-gray-100 rounded"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl pt-4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State Card */
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-red-950 mb-2">Connection Problem</h3>
            <p className="text-red-700 text-sm mb-6">{error}</p>
            <button
              onClick={fetchDoctors}
              className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredDoctors.length === 0 ? (
          /* Empty Search State */
          <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-primary-light text-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Doctors</h3>
            <p className="text-gray-500 text-sm mb-6">
              We couldn't find any healthcare professionals matching your active search filters. Try widening your criteria or search by another name.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Results Grid */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
