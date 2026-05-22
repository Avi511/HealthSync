import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  const { id, fullName, email, specialization, hospital, experience, stage, phone, availability } = doctor;

  // Initials for avatar
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

  // Styled badges based on career stage
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

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
      {/* Card Header Background */}
      <div className="h-2 bg-gradient-to-r from-primary to-primary-accent"></div>

      <div className="p-6 flex-grow flex flex-col">
        {/* Doctor Identity Section */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-accent to-primary text-white font-semibold text-lg flex items-center justify-center shadow-inner relative flex-shrink-0">
            {getInitials(fullName)}
            <span className="absolute -bottom-1 -right-1 bg-white text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-gray-100">
              #{id}
            </span>
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors duration-200 truncate" title={fullName}>
              {fullName}
            </h3>
            <p className="text-sm font-semibold text-primary/95 truncate">
              {specialization}
            </p>
          </div>
        </div>

        {/* Badges Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stage && (
            <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border ${getStageBadgeStyles(stage)}`}>
              {formatStage(stage)}
            </span>
          )}
          <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200/60 px-2.5 py-1 rounded-full whitespace-nowrap">
            {experience} Yrs Exp
          </span>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="space-y-2.5 my-3 text-sm text-gray-600 flex-grow">
          {/* Hospital */}
          <div className="flex items-center space-x-2.5">
            <svg className="w-4 h-4 text-gray-400 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate" title={hospital}>{hospital}</span>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2.5">
            <svg className="w-4 h-4 text-gray-400 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[13px] font-medium text-gray-700 bg-primary-light/45 px-2 py-0.5 rounded-md truncate" title={availability}>
              {availability || 'Call for Availability'}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-2.5">
            <svg className="w-4 h-4 text-gray-400 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-500 font-mono text-[13px]">{phone || 'N/A'}</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2.5">
            <svg className="w-4 h-4 text-gray-400 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate text-gray-500 text-[13px] select-all">{email}</span>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/book-appointment?doctorId=${id}`}
          className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 transform active:scale-[0.98] group-hover:scale-[1.01]"
        >
          Book Appointment
          <svg className="w-4 h-4 ml-2 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
