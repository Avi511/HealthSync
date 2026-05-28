import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getAllDoctors } from '../api/doctorApi';
import { createAppointment, getAppointmentsByDoctor } from '../api/appoinmentApi';

export default function BookAppoinment() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId');

  // API State
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Appointments for the selected doctor
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { label: '08:00 AM', value: '08:00' },
    { label: '08:30 AM', value: '08:30' },
    { label: '09:00 AM', value: '09:00' },
    { label: '09:30 AM', value: '09:30' },
    { label: '10:00 AM', value: '10:00' },
    { label: '10:30 AM', value: '10:30' },
    { label: '11:00 AM', value: '11:00' },
    { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' },
    { label: '12:30 PM', value: '12:30' },
    { label: '01:00 PM', value: '13:00' },
    { label: '01:30 PM', value: '13:30' },
    { label: '02:00 PM', value: '14:00' },
    { label: '02:30 PM', value: '14:30' },
    { label: '03:00 PM', value: '15:00' },
    { label: '03:30 PM', value: '15:30' },
    { label: '04:00 PM', value: '16:00' },
    { label: '04:30 PM', value: '16:30' },
    { label: '05:00 PM', value: '17:00' },
    { label: '05:30 PM', value: '17:30' },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      fetchDoctorAppointments(selectedDoctorId);
    } else {
      setAppointments([]);
    }
  }, [selectedDoctorId]);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const data = await getAllDoctors();
      const doctorsList = data || [];
      setDoctors(doctorsList);

      // Pre-select doctor if doctorId is in URL
      if (doctorIdParam && doctorsList.length > 0) {
        const matches = doctorsList.some((d) => d.id.toString() === doctorIdParam);
        if (matches) {
          setSelectedDoctorId(doctorIdParam);
        }
      }
    } catch (err) {
      console.error('Error loading doctors:', err);
      showError('Failed to load doctors list. Please check your connection.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const fetchDoctorAppointments = async (docId) => {
    try {
      setLoadingAppointments(true);
      const data = await getAppointmentsByDoctor(docId);
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching doctor appointments:', err);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const selectedDoctor = doctors.find((d) => d.id.toString() === selectedDoctorId);

  // Filter all doctor appointments (excluding cancelled and completed ones)
  const activeAppointments = appointments
    .filter((appt) => appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED')
    .sort((a, b) => {
      if (a.appointmentDate === b.appointmentDate) {
        return a.appointmentTime.localeCompare(b.appointmentTime);
      }
      return a.appointmentDate.localeCompare(b.appointmentDate);
    });

  const isSlotBooked = (slotValue) => {
    return activeAppointments.some((appt) => {
      const apptTime = appt.appointmentTime.slice(0, 5); // get HH:mm
      return appt.appointmentDate === appointmentDate && apptTime === slotValue;
    });
  };

  // Parse availability helper (e.g. "Mon-Wed, 9AM-3PM" or "Available Mon-Fri 9AM-5PM")
  const parseAvailability = (availabilityStr) => {
    if (!availabilityStr || availabilityStr.toLowerCase().includes('call for')) {
      return { hasAvailability: false };
    }

    try {
      // Find days and times regardless of comma
      const dayRangeMatch = availabilityStr.match(/([a-zA-Z]{3,})\s*-\s*([a-zA-Z]{3,})/);
      const timeRangeMatch = availabilityStr.match(/(\d+)(AM|PM)\s*-\s*(\d+)(AM|PM)/i);

      if (!dayRangeMatch || !timeRangeMatch) {
        return { hasAvailability: false };
      }

      const dayMap = {
        'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6
      };

      let startDay = null;
      let endDay = null;
      const startName = dayRangeMatch[1].toUpperCase().slice(0, 3);
      const endName = dayRangeMatch[2].toUpperCase().slice(0, 3);
      if (dayMap[startName] !== undefined && dayMap[endName] !== undefined) {
        startDay = dayMap[startName];
        endDay = dayMap[endName];
      }

      let startHour = null;
      let endHour = null;
      const startVal = parseInt(timeRangeMatch[1], 10);
      const startAmpm = timeRangeMatch[2].toUpperCase();
      const endVal = parseInt(timeRangeMatch[3], 10);
      const endAmpm = timeRangeMatch[4].toUpperCase();

      startHour = startVal;
      if (startAmpm === 'PM' && startVal !== 12) startHour += 12;
      if (startAmpm === 'AM' && startVal === 12) startHour = 0;

      endHour = endVal;
      if (endAmpm === 'PM' && endVal !== 12) endHour += 12;
      if (endAmpm === 'AM' && endVal === 12) endHour = 0;

      return {
        hasAvailability: startDay !== null && startHour !== null,
        startDay,
        endDay,
        startHour,
        endHour,
        dayRangeStr: dayRangeMatch[0],
        timeRangeStr: timeRangeMatch[0]
      };
    } catch (e) {
      console.error('Error parsing availability:', e);
      return { hasAvailability: false };
    }
  };

  // Check if chosen date is within day range
  const checkDayAvailability = (dateStr, parsedSched) => {
    if (!dateStr || !parsedSched || !parsedSched.hasAvailability) return { isValid: true };

    try {
      const dateParts = dateStr.split('-');
      if (dateParts.length < 3) return { isValid: true };
      
      const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      const dayOfWeek = dateObj.getDay();

      const { startDay, endDay } = parsedSched;
      let isValid = false;

      if (startDay <= endDay) {
        isValid = dayOfWeek >= startDay && dayOfWeek <= endDay;
      } else {
        isValid = dayOfWeek >= startDay || dayOfWeek <= endDay;
      }

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return {
        isValid,
        dayOfWeek,
        dayName: dayNames[dayOfWeek]
      };
    } catch (e) {
      console.error('Error checking day availability:', e);
      return { isValid: true };
    }
  };

  const parsedSchedule = selectedDoctor ? parseAvailability(selectedDoctor.availability) : null;
  const dateValidation = selectedDoctor && appointmentDate ? checkDayAvailability(appointmentDate, parsedSchedule) : { isValid: true };

  // Filter slots to match doctor hours
  const getAvailableSlots = () => {
    if (!selectedDoctor || !parsedSchedule || !parsedSchedule.hasAvailability) {
      return timeSlots;
    }

    return timeSlots.filter((slot) => {
      const [h, m] = slot.value.split(':').map(Number);
      const decimalVal = h + m / 60;
      return decimalVal >= parsedSchedule.startHour && decimalVal < parsedSchedule.endHour;
    });
  };

  const activeTimeSlots = getAvailableSlots();

  const getInitials = (name) => {
    if (!name) return 'DR';
    return name
      .split(' ')
      .filter((n) => n !== 'Dr.')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getStageBadgeStyles = (stageVal) => {
    const val = (stageVal || '').toUpperCase();
    switch (val) {
      case 'CONSULTANT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'REGISTRAR':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'MO':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'INTERN':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const formatStage = (stageVal) => {
    const val = stageVal || '';
    if (val === 'MO') return 'Medical Officer (MO)';
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctorId) {
      showError('Please select a doctor.');
      return;
    }
    if (!appointmentDate) {
      showError('Please select an appointment date.');
      return;
    }
    if (!dateValidation.isValid) {
      showError(`Dr. ${selectedDoctor.fullName} is not available on ${dateValidation.dayName}s.`);
      return;
    }
    if (!appointmentTime) {
      showError('Please choose a preferred time slot.');
      return;
    }
    if (isSlotBooked(appointmentTime)) {
      showError('This time slot has already been reserved. Please pick another.');
      return;
    }
    if (!reason.trim()) {
      showError('Please provide a reason for your visit.');
      return;
    }

    try {
      setSubmitting(true);
      const appointmentPayload = {
        patientId: user.id,
        doctorId: selectedDoctor.id,
        patientName: `${user.firstName} ${user.lastName}`,
        doctorName: selectedDoctor.fullName,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        reason: reason.trim(),
      };

      await createAppointment(appointmentPayload);
      showSuccess(`Successfully scheduled appointment with ${selectedDoctor.fullName}!`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      showError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 px-4 shadow-sm mb-12 mt-[-50px] rounded-2xl">
          <div className="max-w-7xl mx-auto text-center md:text-left">
            <h1 className="text-5xl md:text-4xl font-bold tracking-tight">
              Book an Appointment
            </h1>
            <p className="mt-2 text-primary-light text-base md:text-lg max-w-2xl">
              Schedule a consultation with our experienced, board-certified medical professionals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Booking Form Card */}
          <div className="lg:col-span-2 order-2 lg:order-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Request Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Doctor Selection */}
              <div>
                <label htmlFor="doctor-select" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Select Healthcare Professional <span className="text-red-500">*</span>
                </label>
                {loadingDoctors ? (
                  <div className="h-11 bg-gray-100 animate-pulse rounded-xl"></div>
                ) : (
                  <select
                    id="doctor-select"
                    value={selectedDoctorId}
                    onChange={(e) => {
                      setSelectedDoctorId(e.target.value);
                      setAppointmentTime('');
                    }}
                    className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm font-medium transition duration-200 outline-none text-black cursor-pointer"
                    required
                  >
                    <option value="">-- Choose a Doctor --</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id.toString()}>
                        {doc.fullName} ({doc.specialization}) - {doc.hospital}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label htmlFor="date-select" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Choose Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="date-select"
                  type="date"
                  min={todayStr}
                  value={appointmentDate}
                  onChange={(e) => {
                    setAppointmentDate(e.target.value);
                    setAppointmentTime('');
                  }}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm font-medium transition duration-200 outline-none text-black cursor-pointer"
                  required
                />
              </div>

              {/* Date Day Warning Alert */}
              {!dateValidation.isValid && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-start space-x-2.5 animate-fadeIn">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span className="font-bold">Schedule Day Warning: </span>
                    Dr. {selectedDoctor?.fullName} is typically not available on <span className="font-semibold">{dateValidation.dayName}s</span>.
                    <div className="mt-1 text-xs text-amber-700">
                      Weekly Availability: <span className="font-bold">{parsedSchedule?.dayRangeStr}</span> ({parsedSchedule?.timeRangeStr}). Please choose another date.
                    </div>
                  </div>
                </div>
              )}

              {/* Time Slots Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Select Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  {selectedDoctor && parsedSchedule?.hasAvailability && (
                    <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-md">
                      Available: {parsedSchedule.timeRangeStr}
                    </span>
                  )}
                </div>

                {activeTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeTimeSlots.map((slot) => {
                      const isSelected = appointmentTime === slot.value;
                      const isBooked = isSlotBooked(slot.value);
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setAppointmentTime(slot.value)}
                          className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all duration-200 text-center ${
                            isBooked
                              ? 'bg-red-50 text-red-400 border-red-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-primary text-white border-primary shadow-sm scale-[1.03] cursor-default'
                              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700 hover:text-gray-900 cursor-pointer hover:shadow-sm'
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-sm text-gray-500 font-medium">
                    No time slots are available for the selected doctor or scheduling.
                  </div>
                )}
              </div>

              {/* Patient Details (Read Only Confirmation) */}
              <div className="bg-gray-50/60 rounded-xl p-5 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Patient Profile Confirmation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Full Name</span>
                    <span className="font-semibold text-gray-800">{user?.firstName} {user?.lastName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Email Address</span>
                    <span className="font-semibold text-gray-800">{user?.email}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Contact Number</span>
                    <span className="font-semibold text-gray-800">{user?.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 font-medium">Registered Address</span>
                    <span className="font-semibold text-gray-800 truncate block" title={user?.address}>{user?.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Reason for Booking */}
              <div>
                <label htmlFor="booking-reason" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Reason for Consultation / Medical Concerns <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="booking-reason"
                  rows="4"
                  placeholder="Please briefly describe your symptoms, reason for request, or medical history relevant to this consultation..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm font-medium transition duration-200 outline-none text-black"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !dateValidation.isValid}
                className={`w-full py-4 px-6 rounded-xl text-sm font-bold tracking-wide text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer ${
                  submitting || !dateValidation.isValid ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Securing Appointment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Book Appointment</span>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Doctor Detail Sidecard Column */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
            {selectedDoctor ? (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                  <div className="h-2 bg-gradient-to-r from-primary to-primary-accent"></div>
                  <div className="p-6">
                    
                    {/* Doctor Card Avatar / Details */}
                    <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-accent to-primary text-white font-bold text-2xl flex items-center justify-center shadow-inner relative mb-4">
                        {getInitials(selectedDoctor.fullName)}
                        <span className="absolute -bottom-1 -right-1 bg-white text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-100">
                          #{selectedDoctor.id}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-primary transition-colors duration-200">
                        {selectedDoctor.fullName}
                      </h3>
                      <p className="text-sm font-semibold text-primary/95 mt-1">
                        {selectedDoctor.specialization}
                      </p>
                      {selectedDoctor.stage && (
                        <span className={`inline-block mt-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border ${getStageBadgeStyles(selectedDoctor.stage)}`}>
                          {formatStage(selectedDoctor.stage)}
                        </span>
                      )}
                    </div>

                    {/* Metadata fields */}
                    <div className="space-y-4 pt-6 text-sm text-gray-600">
                      
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-gray-400 stroke-current flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div>
                          <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hospital Affiliation</span>
                          <span className="font-medium text-gray-800">{selectedDoctor.hospital}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-gray-400 stroke-current flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Weekly Availability</span>
                          <span className="inline-block mt-0.5 text-xs font-semibold text-primary bg-primary-light/50 px-2 py-0.5 rounded-md">
                            {selectedDoctor.availability || 'Call for Availability'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-gray-400 stroke-current flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                          <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Professional Experience</span>
                          <span className="font-medium text-gray-800">{selectedDoctor.experience} Years Active Practice</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-gray-400 stroke-current flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
                          <span className="text-gray-800 font-medium select-all break-all">{selectedDoctor.email}</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* All Appointments Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-4.5 h-4.5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    All Appointments
                  </h3>

                  {loadingAppointments ? (
                    <div className="space-y-2.5 animate-pulse">
                      <div className="h-9 bg-gray-50 rounded-xl"></div>
                      <div className="h-9 bg-gray-50 rounded-xl"></div>
                    </div>
                  ) : activeAppointments.length === 0 ? (
                    <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl flex items-start space-x-2">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold block">No Appointments</span>
                        <span className="text-[11px] text-emerald-600">This doctor currently has no booked appointments.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Reserved Appointments ({activeAppointments.length})</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        {activeAppointments.map((appt) => {
                          const formatTime24 = appt.appointmentTime.slice(0, 5);
                          const slotObj = timeSlots.find((s) => s.value === formatTime24);
                          const timeLabel = slotObj ? slotObj.label : appt.appointmentTime;
                          return (
                            <div
                              key={appt.id}
                              className="flex flex-col px-3.5 py-2.5 bg-green-50/40 border border-green-100 rounded-xl text-xs"
                            >
                              <div className="flex items-center justify-between font-semibold text-green-700">
                                <div className="flex items-center space-x-2">
                                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{appt.appointmentDate} at {timeLabel}</span>
                                </div>
                                <span className="text-[9px] uppercase font-extrabold tracking-wide text-green-700 bg-green-100/70 px-2 py-0.5 rounded-md">Reserved</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-150 p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">No Doctor Selected</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Please choose a doctor from the form dropdown to view their credentials, experience, and availability schedule.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
