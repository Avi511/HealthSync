import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <section className="relative lg:h-screen flex items-center bg-white overflow-hidden pt-24 pb-12 lg:py-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/6 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            <motion.div 
              className="hidden min-[1031px]:flex min-[1031px]:col-span-6 justify-center items-center relative order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-[280px] sm:w-[360px] md:w-[420px] lg:w-full aspect-square flex items-center justify-center p-3 sm:p-4 transform -translate-y-8 sm:-translate-y-12 lg:-translate-y-16 lg:translate-x-6 xl:-translate-y-20 xl:translate-x-10 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full filter blur-2xl -z-10 transform scale-90 sm:scale-100"></div>

                <DotLottieReact
                  src="https://lottie.host/5f5a14b3-b15d-4e14-bd4f-e5953600052a/730PyppwXx.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain scale-[1.2] sm:scale-[1.25] md:scale-[1.3] lg:scale-[1.3] xl:scale-[1.35] transition-transform duration-500 ease-out hover:scale-[1.4]"
                />
              </div>
            </motion.div>

            <motion.div 
              className="col-span-12 min-[1031px]:col-span-6 space-y-6 sm:space-y-8 flex flex-col justify-center items-center min-[1031px]:items-start text-center min-[1031px]:text-left order-2 lg:order-1"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              <motion.div 
                className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3.5 py-1.5 rounded-full w-fit"
                variants={fadeInUp}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                  Seamless Healthcare Solutions
                </span>
              </motion.div>

              <div className="space-y-4 w-full">
                <motion.h1 
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black leading-[1.15] tracking-tight"
                  variants={fadeInUp}
                >
                  Your Health, <br className="hidden sm:inline" />
                  <span className="text-primary relative inline-block">
                    Synced.
                    <span className="absolute bottom-1 left-0 w-full h-1.5 bg-primary/20 rounded-full"></span>
                  </span>
                  {" "}Anytime.
                </motion.h1>
                <motion.p 
                  className="text-sm sm:text-lg text-gray-600 max-w-xl font-light leading-relaxed mx-auto min-[1031px]:mx-0"
                  variants={fadeInUp}
                >
                  HealthSync unites patient care, doctor consultation, and real time medical scheduling. Find certified professionals and manage your health timeline all in one modern space.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center min-[1031px]:justify-start gap-4 w-full sm:w-auto"
                variants={fadeInUp}
              >
                <MotionLink
                  to="/book-appointment"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-200 px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-center"
                >
                  <span>Book Appointment</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MotionLink>
                <MotionLink
                  to="/doctors"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center text-sm font-semibold text-black hover:text-white bg-transparent hover:bg-black border-2 border-black/10 hover:border-black transition-all duration-200 px-8 py-3.5 rounded-full text-center"
                >
                  Find Doctors
                </MotionLink>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 relative lg:min-h-screen flex items-center py-20 lg:py-24 bg-gray-50/50 border-t border-gray-100/50">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
              About HealthSync
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="lg:col-span-7 space-y-6 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInLeft}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col sm:flex-row gap-5 p-6 sm:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black group-hover:text-primary transition-colors duration-200">
                    Smart Calendar Integration
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Instantly view real-time physician availability and book appointments that synchronize with your personal calendar without any telephone back-and-forth.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInLeft}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col sm:flex-row gap-5 p-6 sm:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black group-hover:text-primary transition-colors duration-200">
                    Verified Healthcare Specialists
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Consult with board-certified professionals. Every doctor registered on HealthSync undergoes a rigorous validation process to ensure your security and standard of care.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInLeft}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col sm:flex-row gap-5 p-6 sm:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-black group-hover:text-primary transition-colors duration-200">
                    Patient-First Dashboard
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Easily manage appointments, medical notes, doctor communications, and billing. Enjoy secure access to your complete healthcare journey in one organized portal.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 space-y-8 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div className="space-y-4" variants={fadeInRight}>
                <h3 className="text-2xl font-bold text-black">
                  Our Mission & Vision
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  HealthSync was founded to strip the complexity out of healthcare coordination. We believe scheduling a consultation, checking medical history, and finding highly recommended specialists should be instantaneous and worry-free.
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  By blending robust web architecture with user-friendly dashboards, we empower patients to take absolute ownership of their physical health timelines.
                </p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80"
                variants={fadeInRight}
              >
                <div className="text-center sm:text-left group cursor-default">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                    10k+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wider uppercase block mt-1">
                    Patients Served
                  </span>
                </div>
                <div className="text-center sm:text-left group cursor-default">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                    500+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wider uppercase block mt-1">
                    Specialists
                  </span>
                </div>
                <div className="text-center sm:text-left group cursor-default">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                    99.8%
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wider uppercase block mt-1">
                    Satisfaction
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 relative lg:min-h-screen flex items-center py-20 lg:py-24 bg-white border-t border-gray-100/50">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
              We Are Always Here to Assist You
            </h2>
            <p className="text-gray-500 font-light text-base sm:text-lg">
              Have questions about registration, scheduling details, or enterprise care setups? Reach out and our support team will follow up within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInLeft}
                whileHover={{ x: 6 }}
                className="flex gap-4 p-6 bg-gray-50/50 border border-gray-100 rounded-3xl hover:border-primary/20 transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-black">Email Us</h4>
                  <p className="text-sm text-gray-600">support@healthsync.com</p>
                  <p className="text-xs text-gray-400 font-light">Expect replies within 24 hours.</p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInLeft}
                whileHover={{ x: 6 }}
                className="flex gap-4 p-6 bg-gray-50/50 border border-gray-100 rounded-3xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.73.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-black">Call Support</h4>
                  <p className="text-sm text-gray-600">+1 (555) 019-2834</p>
                  <p className="text-xs text-gray-400 font-light">Toll-free, Mon-Fri 8:00 AM - 6:00 PM PST</p>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInLeft}
                whileHover={{ x: 6 }}
                className="flex gap-4 p-6 bg-gray-50/50 border border-gray-100 rounded-3xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-black">Headquarters</h4>
                  <p className="text-sm text-gray-600">123 Medical Center Way, Suite 400</p>
                  <p className="text-xs text-gray-400 font-light">San Francisco, CA 94107</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/50 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              {submitted ? (
                <div className="text-center py-12 space-y-6 animate-[fadeIn_0.5s_ease-out]">
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    <svg className="w-8 h-8 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black">Message Sent Successfully!</h3>
                    <p className="text-sm text-gray-500 font-light max-w-md mx-auto">
                      Thank you for contacting HealthSync. We have received your query and a support representative will contact you shortly.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleResetForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 mt-4 focus:outline-none cursor-pointer"
                  >
                    Send another message
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-black">Send us a Message</h3>

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

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your message here..."
                      className="w-full bg-gray-50/50 focus:bg-white text-sm text-black border border-gray-200 rounded-2xl px-5 py-3.5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 resize-none"
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
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
