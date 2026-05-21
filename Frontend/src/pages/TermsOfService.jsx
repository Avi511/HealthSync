const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to Terms',
    content: `By accessing or using the HealthSync platform, you agree to be bound by these Terms of Service and all applicable federal and state healthcare regulations. If you do not agree with any part of these terms, you are prohibited from utilizing our service. We reserve the right to modify these terms at any time without prior notice.`
  },
  {
    id: 'eligibility',
    title: '2. Accounts & Eligibility',
    content: `To register a user profile and book appointments on HealthSync, you must meet the following requirements:
    
    • Age: You must be at least 18 years of age. Minors may receive consultations only if accompanied or explicitly authorized by a legal parent or guardian.
    • Accuracy: You must provide completely accurate, current, and truthful information during profile setup, including official medical IDs or insurance credentials.
    • Security: You are solely responsible for protecting your account passwords and multi-factor credentials. Any activity conducted under your account is your responsibility.`
  },
  {
    id: 'telehealth',
    title: '3. Medical Disclaimers & Emergency Advice',
    content: `HealthSync is a coordination and scheduling facilitator, not a medical provider:
    
    • Facilitator Role: The professional consulting services provided by board-certified specialists are entirely the responsibility of the individual doctors.
    • No Emergency Use: HEALTHSYNC IS NOT INTENDED FOR LIFE-THREATENING EMERGENCIES. If you are experiencing a medical emergency (e.g., severe chest pains, heavy bleeding, difficulty breathing), please call your local emergency services (e.g., 911) immediately.
    • Advice Accuracy: Virtual telehealth consultations may have limitations compared to physical consults. Specialists may recommend that you visit a physical clinic for diagnostics.`
  },
  {
    id: 'bookings',
    title: '4. Booking, Cancellations & Fees',
    content: `When booking appointments through the platform, you agree to the following clinic policies:
    
    • Slot Reservations: A booking is considered confirmed once you receive an official confirmation notification or email receipt.
    • Cancellation Window: You can reschedule or cancel any confirmed slot up to 24 hours prior to the start time without penalty.
    • Late Cancellation Fees: Cancellations or rescheduling requests submitted within the 24-hour cutoff period may incur a processing fee determined by the specific consulting doctor's terms.
    • No-Shows: Failure to enter the HIPAA video room within 15 minutes of the scheduled time is treated as a no-show and may result in the forfeiture of the booking fee.`
  },
  {
    id: 'payments',
    title: '5. Billing & Insurance Integrations',
    content: `Payment processing on HealthSync is structured to provide transparent financial routing:
    
    • Authorization: By inputting insurance information, you authorize us to coordinate with your provider to verify copays and coverage structures.
    • Copay Settlements: Any diagnostic copays or self-pay consultation fees are charged immediately at booking confirmation or after completion.
    • Superbills: Digital invoices containing official diagnostic codes (superbills) are automatically uploaded to your Patient Dashboard to assist with reimbursement filings.`
  },
  {
    id: 'liability',
    title: '6. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, HealthSync, its staff, and technical partners will not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the platform, doctor consultations, or scheduling delays. We do not guarantee that the platform will operate completely error-free or that servers are immune to downtime.`
  }
];

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-white pt-24 pb-20 overflow-hidden font-sans">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3.5 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Legal Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Please read these terms carefully before scheduling appointments or participating in telehealth consultations.
          </p>
          <p className="text-xs text-gray-400 font-light">
            Last updated: May 2026
          </p>
        </div>

        {/* Document Content */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="border-b border-gray-100 pb-10 last:border-b-0"
            >
              <h2 className="text-xl font-bold text-black mb-4 tracking-tight">
                {section.title}
              </h2>
              <div className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line space-y-4">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
