import { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/Route';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          <DotLottieReact
            src="https://lottie.host/32036954-c36f-45b3-bdee-3c33a3f74f12/qDXRsm36Lj.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-primary/20 selection:text-primary flex flex-col fade-in">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
