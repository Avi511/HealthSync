const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: `HealthSync ("we", "our", or "us") is dedicated to protecting your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our doctor appointment and healthcare management system. By accessing our platform, you consent to the practices described in this policy.`
  },
  {
    id: 'data-collection',
    title: '2. Information We Collect',
    content: `We collect several types of information from and about users of our platform:
    
    • Personal Identification: Name, email address, phone number, mailing address, date of birth, and biological sex.
    • Protected Health Information (PHI): Symptoms, medical history, current medications, primary care physician notes, consultation summaries, and details about your booked appointments.
    • Payment Details: We use secure third-party payment processors to collect and process billing details. Your credit card information is encrypted using industry-standard protocols.
    • Technical & Usage Data: IP address, browser type, operating system, and usage patterns recorded through secure system logs.`
  },
  {
    id: 'data-usage',
    title: '3. How We Use Your Data',
    content: `We process your data strictly to deliver premium healthcare coordination:
    
    • Appointment Scheduling: To match patients with relevant medical specialists and update real-time doctor calendars.
    • Telehealth Consultations: To provision secure, HIPAA-compliant video and audio channels for virtual appointments.
    • Reminders & Notifications: To send instant appointment confirmations, reschedule notices, and prescription alerts via SMS or email.
    • Continuous Improvement: To analyze platform performance and troubleshoot technical issues, maintaining high availability.`
  },
  {
    id: 'hipaa-security',
    title: '4. HIPAA & Security Compliance',
    content: `We implement state-of-the-art security measures to safeguard Protected Health Information (PHI) in compliance with the Health Insurance Portability and Accountability Act (HIPAA):
    
    • Encryption: All data is encrypted at rest using AES-256 and in transit using SSL/TLS protocols.
    • Access Control: Strict multi-factor authentication (MFA) and role-based permissions ensure only authorized doctors and patients can access patient charts.
    • Audits & Monitoring: We conduct continuous vulnerability scanning and regular independent security audits to identify and mitigate potential risks.`
  },
  {
    id: 'data-sharing',
    title: '5. Sharing & Disclosure',
    content: `We do not sell, rent, or trade your personal or health data to third-party marketing companies. We only share information under the following strict scenarios:
    
    • With Your Chosen Doctor: Your profile and health history are shared with the medical specialist you explicitly schedule an appointment with.
    • Service Providers: Secure HIPAA-compliant technical partners (such as database hostings, video channels, and billing gateways) that adhere to our privacy standards.
    • Legal Obligations: If required by law, court order, or governmental authorities to comply with safety regulations.`
  },
  {
    id: 'user-rights',
    title: '6. Your Rights & Choices',
    content: `You maintain complete ownership of your health records. You have the right to:
    
    • Access & Export: View and download a comprehensive copy of your medical charts, appointment logs, and invoice history from your dashboard.
    • Request Corrections: Update or correct inaccurate personal details or billing details.
    • Data Deletion: Request the permanent deletion of your account (subject to medical record retention laws which may require certain records to be kept for a minimum legal period).`
  }
];

export default function PrivacyDoc() {
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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
            Please read this policy to understand our absolute commitment to securing your medical data and personal privacy.
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
