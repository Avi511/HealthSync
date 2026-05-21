import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { showInfo } = useToast();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about', sectionId: 'about' },
    { name: 'Contact', path: '/#contact', sectionId: 'contact' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleNavLinkClick = (e, link) => {
    if (link.sectionId) {
      if (window.location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  const isLinkActive = (link, isActive) => {
    if (link.sectionId) {
      return window.location.hash === `#${link.sectionId}`;
    }
    if (link.path === '/') {
      return isActive && !window.location.hash;
    }
    return isActive;
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary-light text-primary overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 stroke-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-6 2 12 2-9 2 3h6" />
                </svg>
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl lg:text-2xl font-bold tracking-tight text-black whitespace-nowrap">
                Health<span className="text-primary">Sync</span>
              </span>
            </Link>
          </div>

          <div className="hidden min-[920px]:flex items-center min-[920px]:space-x-3 lg:space-x-5 xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavLinkClick(e, link)}
                className={({ isActive }) => {
                  const active = isLinkActive(link, isActive);
                  return `min-[920px]:text-xs lg:text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-primary relative py-2 ${active ? 'text-primary' : 'text-gray-600'
                    }`;
                }}
              >
                {({ isActive }) => {
                  const active = isLinkActive(link, isActive);
                  return (
                    <>
                      {link.name}
                      {active && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-[pulse_1.5s_infinite]" />
                      )}
                    </>
                  );
                }}
              </NavLink>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="hidden min-[920px]:flex items-center min-[920px]:space-x-3 lg:space-x-4">
              <span className="min-[920px]:text-xs lg:text-sm font-medium text-gray-700 whitespace-nowrap">
                Hi, <span className="font-semibold text-primary">{user?.firstName || 'User'}</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  showInfo('Logged out successfully.');
                }}
                className="min-[920px]:text-xs lg:text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 min-[920px]:px-4 min-[920px]:py-2 lg:px-6 lg:py-2.5 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden min-[920px]:flex items-center min-[920px]:space-x-2 lg:space-x-4">
              <Link to="/login" className="min-[920px]:text-xs lg:text-sm font-semibold text-black hover:text-primary transition-colors duration-200 min-[920px]:px-2.5 min-[920px]:py-1.5 lg:px-4 lg:py-2 whitespace-nowrap">
                Sign In
              </Link>
              <Link to="/register" className="min-[920px]:text-xs lg:text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-200 min-[920px]:px-4 min-[920px]:py-2 lg:px-6 lg:py-2.5 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap">
                Get Started
              </Link>
            </div>
          )}

          <div className="min-[920px]:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary-light focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="min-[920px]:hidden bg-white border-b border-gray-100 shadow-xl transition-all duration-300">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavLinkClick(e, link)}
                className={({ isActive }) => {
                  const active = isLinkActive(link, isActive);
                  return `block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${active ? 'bg-primary-light text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`;
                }}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-100 px-4 flex flex-col space-y-2.5">
              {isAuthenticated ? (
                <>
                  <div className="text-center text-sm font-medium text-gray-700 py-1">
                    Hi, <span className="font-semibold text-primary">{user?.firstName || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      showInfo('Logged out successfully.');
                      setIsOpen(false);
                    }}
                    className="w-full text-center text-base font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 py-3 rounded-full shadow-sm cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-base font-semibold text-black hover:text-primary transition-colors duration-200 py-3 rounded-full border border-gray-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-base font-semibold text-white bg-primary hover:bg-primary-dark transition-colors duration-200 py-3 rounded-full shadow-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
