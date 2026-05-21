import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const systemStatuses = [
  { name: 'Core Appointment Engine', status: 'Operational' },
  { name: 'Telehealth Video Nodes', status: 'Operational' },
  { name: 'Patient Record Storage (HIPAA Sec)', status: 'Operational' },
  { name: 'Insurance & Billing API Gateway', status: 'Operational' }
];

const troubleshootDocs = [
  { title: 'Troubleshooting telehealth video browser permissions', category: 'Tech Support' },
  { title: 'How to update or change your registered email address', category: 'Account' },
  { title: 'Refund rules & copay charge explanations', category: 'Billing' },
  { title: 'Integrating your calendars (Google, Apple, Outlook)', category: 'General' }
];

export default function HelpDesk() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'booking',
    priority: 'medium',
    subject: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.description) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketId(`HSK-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      category: 'booking',
      priority: 'medium',
      subject: '',
      description: ''
    });
    setTicketId(null);
  };

  return (
    <div className="relative min-h-screen bg-white pt-24 pb-20 overflow-hidden font-sans">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3.5 py-1.5 rounded-full"
          >
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Support Center
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight"
          >
            HealthSync <span className="text-primary">Help Desk</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed"
          >
            Submit an official support ticket, inspect our live system infrastructure status, or check quick troubleshoot guides.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Status and Guides */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            {/* Live System Status Block */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-black">System Status</h3>
                  <p className="text-xs text-gray-400 font-light">Real-time health of clinical services</p>
                </div>
                <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-green-600 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Fully Operational</span>
                </div>
              </div>

              <div className="space-y-4">
                {systemStatuses.map((sys) => (
                  <div key={sys.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-light">{sys.name}</span>
                    <span className="flex items-center space-x-1.5 font-semibold text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="text-xs uppercase tracking-wide">{sys.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Troubleshoot Docs */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-black">Troubleshooting Guides</h3>
                <p className="text-xs text-gray-400 font-light">Instant answers for common tech questions</p>
              </div>

              <div className="space-y-4">
                {troubleshootDocs.map((doc) => (
                  <a
                    href="#"
                    key={doc.title}
                    className="group block p-4 bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm rounded-2xl transition-all duration-200"
                  >
                    <span className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {doc.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors duration-200">
                        {doc.title}
                      </span>
                      <svg className="w-4 h-4 text-gray-400 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Ticket Form / Success Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 relative min-h-[500px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {ticketId ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                    <svg className="w-10 h-10 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-black">Support Ticket Submitted!</h2>
                    <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
                      Your ticket has been officially registered with our patient-care network. A technical representative will reach out to you within 2 to 4 hours.
                    </p>
                  </div>

                  <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl text-xs text-gray-500">
                    <span className="font-semibold text-black">Ticket ID:</span>
                    <span className="font-mono text-primary font-bold">{ticketId}</span>
                  </div>

                  <div>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 mt-6 focus:outline-none cursor-pointer"
                    >
                      Raise another request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-black font-sans">Submit a Support Ticket</h2>
                    <p className="text-xs text-gray-400 font-light">Fill out details about your platform issues</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Issue Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 cursor-pointer"
                      >
                        <option value="booking">Appointment Booking</option>
                        <option value="billing">Insurance & Billing</option>
                        <option value="video">Telehealth Video Call</option>
                        <option value="account">Account & Settings</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Priority Level
                      </label>
                      <select
                        name="priority"
                        id="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 cursor-pointer"
                      >
                        <option value="low">Low (Standard response)</option>
                        <option value="medium">Medium (Within 4 hours)</option>
                        <option value="high">High (Urgent consult issue)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief summary of the problem"
                      className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="4"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide step-by-step details of what went wrong..."
                      className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 resize-none font-light"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-200 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Ticket...</span>
                      </>
                    ) : (
                      <span>Submit Ticket</span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
