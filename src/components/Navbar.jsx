import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import TableReservationModal from './TableReservationModal';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="border-b border-line bg-surface/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-lg sm:text-xl font-black tracking-tight text-ink flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-accent text-2xl">🍔</span>
            <span>Hexovate Food</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-body">
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link to="/menu" className="hover:text-accent transition">
              Menu
            </Link>
            <Link to="/combo" className="text-accent font-bold hover:opacity-80 transition">
              🍱 Build Combo
            </Link>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="hover:text-accent transition font-semibold"
            >
              🍽️ Book Table
            </button>

            <Link to="/cart" className="relative hover:text-accent transition flex items-center">
              Cart
              {totalItems > 0 && (
                <span className="ml-1.5 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/admin"
              className="bg-accent text-white text-xs font-extrabold px-3.5 py-2 rounded-lg hover:opacity-90 transition shadow-sm"
            >
              👑 Admin Panel
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="relative p-2 rounded-xl bg-soft text-ink"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border border-line text-ink hover:bg-soft"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-surface border-b border-line px-6 py-5 space-y-3 shadow-lg">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-bold text-ink hover:text-accent"
            >
              🏠 Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-bold text-ink hover:text-accent"
            >
              📋 Full Menu
            </Link>
            <Link
              to="/combo"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-extrabold text-accent"
            >
              🍱 Build Your Combo (15% Off)
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setBookingOpen(true);
              }}
              className="block w-full text-left py-2 text-base font-bold text-ink hover:text-accent"
            >
              🍽️ Book a Table (Dine-In)
            </button>
            <div className="pt-2 border-t border-line">
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-accent text-white font-extrabold py-3 rounded-xl shadow-sm"
              >
                👑 Open Admin Panel
              </Link>
            </div>
          </div>
        )}
      </header>

      <TableReservationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}