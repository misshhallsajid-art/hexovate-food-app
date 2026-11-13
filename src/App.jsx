import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Customization from './pages/Customization';
import ComboBuilder from './pages/ComboBuilder'; // New Combo Builder import
import AdminPanel from './AdminPanel';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-paper text-ink">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/combo" element={<ComboBuilder />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/customize/:id" element={<Customization />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}