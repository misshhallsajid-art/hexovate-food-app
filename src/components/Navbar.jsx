import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag, Shield } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import TableReservationModal from './TableReservationModal';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo - Hexovate Food */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: '"Outfit", sans-serif' }}
            className="flex items-center gap-2 text-lg sm:text-2xl font-black tracking-tight text-[#111111]"
          >
            <span className="w-8 h-8 rounded-full bg-[#FF8A2B] text-white flex items-center justify-center text-base shadow-sm shrink-0">
              🍔
            </span>
            <span className="truncate">
              Hexovate <span className="text-[#FF8A2B]">Food</span>
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-gray-800">
            <Link to="/" className="hover:text-[#FF8A2B] transition">
              Home
            </Link>
            <Link to="/menu" className="hover:text-[#FF8A2B] transition">
              Menu
            </Link>
            <Link to="/combo" className="hover:text-[#FF8A2B] transition">
              Combos
            </Link>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="hover:text-[#FF8A2B] transition"
            >
              Book Table
            </button>
          </nav>

          {/* Right Controls: Cart + Admin Panel + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Cart Button */}
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="relative p-2.5 rounded-full bg-[#FFF5EC] text-[#111111] hover:bg-[#FF8A2B] hover:text-white transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Admin Panel Button */}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-xs sm:text-sm font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl hover:bg-[#FF8A2B] transition shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-[#FF8A2B]" />
              <span>Admin</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-[#111111] hover:bg-gray-100 md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-6 py-5 space-y-3 shadow-xl">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-bold text-[#111111] hover:text-[#FF8A2B]"
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-bold text-[#111111] hover:text-[#FF8A2B]"
            >
              Menu
            </Link>
            <Link
              to="/combo"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-bold text-[#FF8A2B]"
            >
              Build Combo (15% Off)
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setBookingOpen(true);
              }}
              className="block w-full text-left py-2 text-base font-bold text-[#111111] hover:text-[#FF8A2B]"
            >
              Book a Table
            </button>
            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#111111] text-white font-bold py-3 rounded-xl hover:bg-[#FF8A2B] transition"
              >
                <Shield className="w-4 h-4 text-[#FF8A2B]" />
                <span>Open Admin Panel</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <TableReservationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}