import { Link } from 'react-router-dom';

export default function Footer() {
  const handleScrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100 text-gray-600 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary-light text-primary overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg className="w-6 h-6 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-6 2 12 2-9 2 3h6" />
                </svg>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-black">
                Health<span className="text-primary">Sync</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Synchronizing doctor availability, patient needs, and instant scheduling into a seamless, high-quality medical support network.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-black uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Find Doctors</Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Book Appointment</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-black uppercase tracking-wider">Learn More</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  to="/#about" 
                  onClick={() => handleScrollToSection('about')} 
                  className="text-gray-500 hover:text-primary transition-colors duration-200 font-light"
                >
                  About HealthSync
                </Link>
              </li>
              <li>
                <Link 
                  to="/#contact" 
                  onClick={() => handleScrollToSection('contact')} 
                  className="text-gray-500 hover:text-primary transition-colors duration-200 font-light"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/medical-faq" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Medical FAQ</Link>
              </li>
              <li>
                <Link to="/help-desk" className="text-gray-500 hover:text-primary transition-colors duration-200 font-light">Help Desk Support</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-black uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Subscribe to get health tips, checkup notifications, and platform announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white text-xs border border-gray-200 px-4 py-2.5 rounded-full outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-black w-full"
              />
              <button className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors duration-200">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200/80 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400 font-light">
          <div>
            &copy; {new Date().getFullYear()} HealthSync. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-150">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-150">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors duration-150">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
