import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // <-- Import here
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetails from './pages/FoodDetails';
import Customization from './pages/Customization';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import ComboBuilder from './pages/ComboBuilder';
import AdminPanel from './AdminPanel';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <-- Place right inside Router */}
      <div className="min-h-screen flex flex-col bg-white text-[#111111]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/customize/:id" element={<Customization />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/combo" element={<ComboBuilder />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}