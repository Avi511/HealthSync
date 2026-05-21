import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/Route';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-primary/20 selection:text-primary flex flex-col">
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
