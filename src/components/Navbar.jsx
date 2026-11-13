import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-line bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-black tracking-tight text-ink flex items-center gap-2">
          <span className="text-accent text-2xl">🍔</span> Hexovate Food
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-body">
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link to="/menu" className="hover:text-accent transition">
            Menu
          </Link>
          <Link to="/combo" className="text-accent font-bold hover:opacity-80 transition">
            🍱 Build Combo
          </Link>

          {/* Cart Link with Badge */}
          <Link to="/cart" className="relative hover:text-accent transition flex items-center">
            Cart
            {totalItems > 0 && (
              <span className="ml-1.5 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Admin Panel Button */}
          <Link
            to="/admin"
            className="bg-accent text-white text-xs font-extrabold px-3 py-2 rounded-lg hover:opacity-90 transition shadow-sm"
          >
            👑 Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  );
}