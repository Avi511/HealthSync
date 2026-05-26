import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GoogleLogin } from '@react-oauth/google';
import { googleLoginUser, verifyOtp, resendOtp } from '../api/authApi';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const { login, isAuthenticated, user, setAuthenticatedUser } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const hasShownToast = useRef(false);

  const successMessage = location.state?.successMessage;

  useEffect(() => {
    if (isAuthenticated && user) {
      let redirectPath = '/';
      if (user.role === 'ADMIN') redirectPath = '/admin-dashboard';
      if (user.role === 'DOCTOR') redirectPath = '/doctor-dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (successMessage && !hasShownToast.current) {
      hasShownToast.current = true;
      showSuccess(successMessage);
      // Clear location state to avoid showing toast repeatedly on reload
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [successMessage, showSuccess, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      showError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const [userData] = await Promise.all([
        login(email, password),
        new Promise(resolve => setTimeout(resolve, 4500))
      ]);
      setIsLoading(false);
      showSuccess(`Welcome back, ${userData?.firstName || 'User'}! Successfully signed in.`);
      let redirectPath = '/';
      if (userData?.role === 'ADMIN') redirectPath = '/admin-dashboard';
      if (userData?.role === 'DOCTOR') redirectPath = '/doctor-dashboard';
      navigate(redirectPath);
    } catch (err) {
      setIsLoading(false);
      if (typeof err === 'string' && err.includes('not verified')) {
        setUnverifiedEmail(email);
        setShowOtpModal(true);
        showSuccess('Please check your email for the verification code.');
      } else {
        setError(err);
        showError(err || 'Failed to sign in.');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const [userData] = await Promise.all([
        googleLoginUser(credentialResponse.credential),
        new Promise(resolve => setTimeout(resolve, 4500))
      ]);
      setIsLoading(false);
      setAuthenticatedUser(userData);
      showSuccess(`Welcome, ${userData?.firstName || 'User'}! Successfully signed in via Google.`);
      let redirectPath = '/';
      if (userData?.role === 'ADMIN') redirectPath = '/admin-dashboard';
      if (userData?.role === 'DOCTOR') redirectPath = '/doctor-dashboard';
      navigate(redirectPath);
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || err.message || err;
      if (typeof errMsg === 'string' && errMsg.includes('not verified')) {
        try {
          const decoded = jwtDecode(credentialResponse.credential);
          setUnverifiedEmail(decoded.email);
          setShowOtpModal(true);
          showSuccess('Account created! Please verify your email with the OTP sent.');
        } catch (e) {
          showError('Could not decode Google token email.');
        }
      } else {
        setError(errMsg);
        showError(errMsg || 'Google login failed.');
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      showError('Please enter a valid 6-digit OTP.');
      return;
    }
    setIsVerifying(true);
    try {
      const [userData] = await Promise.all([
        verifyOtp(unverifiedEmail, otpCode),
        new Promise(resolve => setTimeout(resolve, 4500))
      ]);
      setIsVerifying(false);
      setShowOtpModal(false);
      setAuthenticatedUser(userData);
      showSuccess(`Email verified successfully! Welcome back, ${userData?.firstName || 'User'}!`);
      let redirectPath = '/';
      if (userData?.role === 'ADMIN') redirectPath = '/admin-dashboard';
      if (userData?.role === 'DOCTOR') redirectPath = '/doctor-dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setIsVerifying(false);
      showError(err.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(unverifiedEmail);
      showSuccess('A new OTP has been sent to your email.');
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Left Side: Lottie Animation (desktop only, hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-light/50 via-primary-light/20 to-white flex-col justify-center items-center p-12 relative">
        {/* Background Decorative Blur Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-lg relative z-10 text-center">
          <DotLottieReact
            src="https://lottie.host/f7d930ea-d886-443c-9071-1f7ef0bd3842/Onq378No2G.lottie"
            loop
            autoplay
            className="w-full h-auto max-h-[400px]"
          />
          <h2 className="text-3xl font-extrabold text-black tracking-tight mt-8">
            Your Health, <span className="text-primary">Perfected</span>
          </h2>
          <p className="text-gray-500 mt-4 leading-relaxed font-light text-base max-w-sm mx-auto">
            Access secure telemedicine consultations, manage prescription logs, and message your personal physician anytime.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start pt-6 lg:pt-12 pb-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              Sign In to <span className="text-primary">HealthSync</span>
            </h1>
            <p className="text-gray-500 font-light text-sm sm:text-base">
              Welcome back! Please enter your credentials to log in.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {successMessage && !error && (
              <div className="bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white text-sm border border-gray-200 pl-11 pr-4 py-3.5 rounded-2xl outline-none text-black transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white text-sm border border-gray-200 pl-11 pr-12 py-3.5 rounded-2xl outline-none text-black transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 accent-primary border-gray-300 rounded focus:ring-primary/20 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-500 font-light cursor-pointer select-none">
                Remember my login credentials
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl text-sm font-semibold tracking-wide text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer ${isLoading ? 'opacity-80 pointer-events-none' : ''
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            <div className="relative flex items-center justify-center mt-6">
              <span className="absolute bg-white px-2 text-xs text-gray-500">Or continue with</span>
              <div className="w-full border-t border-gray-200"></div>
            </div>

            <div className="flex justify-center mt-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  showError('Google Sign-In was unsuccessful.');
                }}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
                locale="en"
                text="continue_with"
                width="1500px"
              />
            </div>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500 font-light">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal Overlay */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative mt-6 sm:mt-12 mb-8">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-light/20 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Verify Email</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We've sent a 6-digit verification code to <br /><span className="font-semibold text-gray-800">{unverifiedEmail}</span>.
              </p>

              <div className="pt-4 space-y-4">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="------"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full text-center text-3xl tracking-[0.5em] font-mono font-bold bg-gray-50 border border-gray-200 py-4 rounded-xl outline-none text-black transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || otpCode.length !== 6}
                  className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wide text-white bg-primary hover:bg-primary-dark transition-all duration-200 shadow-sm ${isVerifying || otpCode.length !== 6 ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </button>

                <p className="text-xs text-gray-500 font-medium">
                  Didn't receive it?{' '}
                  <button onClick={handleResendOtp} className="text-primary hover:underline font-semibold">
                    Resend Code
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
