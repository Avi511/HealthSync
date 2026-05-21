import { useState } from 'react';

const initialCookies = [
  {
    id: 'necessary',
    title: 'Strictly Necessary Cookies',
    description: 'These cookies are essential for the system to function correctly. They enable secure patient and doctor authentication, session management, CSRF defense, and form submissions. They cannot be turned off.',
    required: true,
    enabled: true
  },
  {
    id: 'analytics',
    title: 'Performance & Analytics Cookies',
    description: 'These cookies allow us to monitor server loads, analyze page visitor flows, and understand which features perform best. We use this anonymous data to optimize consultation room latency and platform load times.',
    required: false,
    enabled: true
  },
  {
    id: 'functional',
    title: 'Functional Preference Cookies',
    description: 'These cookies enable enhanced personalization, such as remembering your local timezone for doctor calendar schedules, your preferred language, and custom layout settings on your dashboard.',
    required: false,
    enabled: false
  },
  {
    id: 'marketing',
    title: 'Targeting & Marketing Cookies',
    description: 'These cookies are used to assess the efficacy of our informational healthcare campaigns on search engines and partner sites. We never track your personal medical symptoms for advertising.',
    required: false,
    enabled: false
  }
];

export default function CookieConfig() {
  const [cookiePreferences, setCookiePreferences] = useState(initialCookies);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = (id) => {
    setCookiePreferences((prev) =>
      prev.map((cookie) =>
        cookie.id === id && !cookie.required
          ? { ...cookie, enabled: !cookie.enabled }
          : cookie
      )
    );
  };

  const handleSave = () => {
    const savedPreferences = cookiePreferences.reduce((acc, curr) => {
      acc[curr.id] = curr.enabled;
      return acc;
    }, {});
    
    localStorage.setItem('healthsync_cookies', JSON.stringify(savedPreferences));
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleAcceptAll = () => {
    setCookiePreferences((prev) =>
      prev.map((cookie) => ({ ...cookie, enabled: true }))
    );
    
    const allAccepted = cookiePreferences.reduce((acc, curr) => {
      acc[curr.id] = true;
      return acc;
    }, {});
    localStorage.setItem('healthsync_cookies', JSON.stringify(allAccepted));

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-white pt-24 pb-20 overflow-hidden font-sans">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3.5 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Privacy Preference
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Cookie <span className="text-primary">Settings</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto font-light leading-relaxed">
            We respect your privacy. Adjust your cookie preference preferences to balance performance tracking and personal tracking.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gray-50/70 border border-gray-100 rounded-3xl p-6 mb-8 flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-black">What are cookies?</h4>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Cookies are small text files stored on your browser to keep you logged in, remember scheduling configurations, and verify page speeds. Strictly necessary cookies are mandatory, but others are optional.
            </p>
          </div>
        </div>

        {/* Cookie List */}
        <div className="space-y-4 mb-10">
          {cookiePreferences.map((cookie) => (
            <div
              key={cookie.id}
              className={`p-6 border rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 ${
                cookie.required
                  ? 'border-gray-100 bg-gray-50/30'
                  : cookie.enabled
                  ? 'border-primary/20 bg-primary-light/5'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center space-x-2.5">
                  <h3 className="text-base font-bold text-black">{cookie.title}</h3>
                  {cookie.required && (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {cookie.description}
                </p>
              </div>

              {/* Standard CSS transition toggle */}
              <button
                onClick={() => handleToggle(cookie.id)}
                disabled={cookie.required}
                className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-colors duration-200 focus:outline-none ${
                  cookie.required
                    ? 'bg-primary/50 cursor-not-allowed'
                    : cookie.enabled
                    ? 'bg-primary'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all duration-200 ${
                    cookie.enabled ? 'left-[25px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-gray-100 pt-8">
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-8 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm rounded-full transition-all duration-200 cursor-pointer text-center"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-10 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-full shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-pointer text-center"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center space-x-3 z-50 max-w-sm w-[90%]"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-white">Settings Saved</p>
            <p className="text-[10px] text-gray-400 font-light mt-0.5">
              Your cookie preferences have been successfully updated on HealthSync.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
