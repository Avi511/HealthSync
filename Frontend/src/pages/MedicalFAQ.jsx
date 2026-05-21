import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'general', name: 'General' },
  { id: 'scheduling', name: 'Appointments' },
  { id: 'billing', name: 'Insurance & Billing' },
  { id: 'security', name: 'Security & Privacy' }
];

const faqs = [
  {
    category: 'general',
    question: 'What is HealthSync?',
    answer: 'HealthSync is a modern healthcare coordination platform that connects patients with board-certified physicians. It synchronizes calendar availabilities, schedules appointments, and handles digital consultation pipelines securely.'
  },
  {
    category: 'general',
    question: 'Are all registered doctors verified?',
    answer: 'Yes. Every medical specialist on HealthSync goes through a rigorous validation process. We verify their active credentials, board certifications, work experience, and medical licenses with state boards before they can consult on the platform.'
  },
  {
    category: 'general',
    question: 'Can I choose my own specialist?',
    answer: 'Absolutely. You can search for doctors by specialty, reviews, ratings, and language, and view their full profiles, scheduling history, and medical background to select the professional who best suits your requirements.'
  },
  {
    category: 'scheduling',
    question: 'How do I book an appointment?',
    answer: 'Go to the "Book Appointment" page, select your doctor, choose an available date and time slot from their interactive calendar, fill in your consultation reason, and click "Confirm". You will receive an immediate email confirmation and calendar invite.'
  },
  {
    category: 'scheduling',
    question: 'Can I cancel or reschedule my consultation?',
    answer: 'Yes, you can reschedule or cancel appointments directly from your Patient Dashboard up to 24 hours before the scheduled time. Cancellations made inside the 24-hour window may be subject to a late fee depending on the doctor\'s clinic policy.'
  },
  {
    category: 'scheduling',
    question: 'How do virtual consults work?',
    answer: 'For telehealth video appointments, log in to your Dashboard 10 minutes prior to your slot. Click the "Join Virtual Meeting" button on your appointment card to enter our HIPAA-compliant video room.'
  },
  {
    category: 'billing',
    question: 'Does HealthSync accept my insurance?',
    answer: 'We integrate with over 50 major health insurance providers. When booking or registering, you can input your insurance card details. Our system automatically processes pre-authorizations and tells you your copay amount.'
  },
  {
    category: 'billing',
    question: 'How do I pay for consults?',
    answer: 'We accept all major credit cards, debit cards, HSA/FSA cards, and digital wallets (Apple Pay, Google Pay). All transaction data is processed using end-to-end encrypted payment networks.'
  },
  {
    category: 'billing',
    question: 'Can I get a detailed invoice for insurance reimbursement?',
    answer: 'Yes. Immediately after a consult, a digital superbill (itemized receipt with medical diagnostic codes) is generated and stored in your Dashboard under the Billing tab. You can download this PDF at any time.'
  },
  {
    category: 'security',
    question: 'Is my medical history secure on HealthSync?',
    answer: 'Security is our highest priority. HealthSync utilizes AES-256 bank-grade encryption at rest and SSL/TLS protocols in transit. We are fully compliant with HIPAA (Health Insurance Portability and Accountability Act) and GDPR.'
  },
  {
    category: 'security',
    question: 'Who has access to my health records?',
    answer: 'Only you and the medical specialists you explicitly authorize or book consultations with can view your health records, notes, and prescriptions. We never share or sell patient medical histories to third parties.'
  },
  {
    category: 'security',
    question: 'How does real-time calendar syncing work?',
    answer: 'When you book an appointment, HealthSync synchronizes it with your chosen calendar application (Google Calendar, Outlook, Apple Calendar) and updates the doctor\'s clinic portal immediately, preventing double-bookings.'
  }
];

export default function MedicalFAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-white pt-24 pb-20 overflow-hidden font-sans">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3.5 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Medical & Platform <span className="text-primary">FAQ</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Find answers to common questions about consulting, scheduling, insurance pre-auth, and platform encryption.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-sm text-black border border-gray-200 focus:border-primary rounded-full px-6 py-4 pl-14 outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 border-b border-gray-100 pb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-102'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-black border border-transparent'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-primary/40 bg-primary-light/10 shadow-md shadow-primary/5'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer group"
                  >
                    <span className={`text-base font-bold transition-colors duration-200 ${
                      isOpen ? 'text-primary' : 'text-black group-hover:text-primary'
                    }`}>
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                        isOpen
                          ? 'bg-primary text-white rotate-180'
                          : 'bg-gray-50 text-gray-400 group-hover:bg-primary-light group-hover:text-primary'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100/50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-gray-50/50 border border-gray-100 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-black">No questions found</h4>
              <p className="text-xs text-gray-500 font-light max-w-xs mx-auto">
                Try refining your search terms or selecting another category filter.
              </p>
            </div>
          )}
        </div>

        {/* CTA Bottom Section */}
        <div className="mt-16 text-center bg-gray-50/60 border border-gray-100 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-black">Still have unanswered questions?</h3>
            <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
              Our patient-care specialists and tech team are online to resolve your issues.
            </p>
          </div>
          <Link
            to="/help-desk"
            className="inline-flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-200 px-8 py-3.5 rounded-full shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
          >
            <span>Visit Help Desk</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
