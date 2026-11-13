import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { DELIVERY_FEE } from '../utils/cart';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  if (cart.length === 0) {
    return (
      <div className="fade-slide text-center py-20 bg-surface rounded-xl my-8 border border-line shadow-soft max-w-xl mx-auto">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-ink">Your Cart is Empty</h2>
        <p className="text-muted text-sm leading-relaxed mt-2 mb-6 max-w-sm mx-auto">You have not added anything yet. Browse the menu, pick a dish you like, customize it, and it will show up here with its price and portion.</p>
        <Link to="/menu" className="bg-accent text-white px-7 py-3 rounded-lg text-sm font-extrabold shadow-sm hover:opacity-90">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-black text-ink mb-2">Your order summary</h1>
        <p className="text-muted max-w-xl leading-relaxed">Check your dishes, change the quantity if you need to, and remove anything you do not want. When everything looks right, continue to checkout.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ul className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <li
              key={item.cartItemId}
              className="fade-slide bg-surface rounded-xl p-4 border border-line flex items-center justify-between gap-3 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h2 className="font-bold text-ink text-base">{item.name}</h2>
                  <p className="text-xs text-muted">
                    Portion: {item.size || 'Regular'}
                    {item.addOns?.length > 0 && ` • Add-ons: ${item.addOns.join(', ')}`}
                  </p>
                  <span className="text-sm font-extrabold text-accent mt-1 block">
                    <span key={item.quantity} className="qty-pop">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-line rounded-lg bg-soft">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.cartItemId)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="p-2 hover:bg-soft rounded transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                  </button>
                  <span key={item.quantity} className="qty-pop px-3 font-bold text-sm" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.cartItemId)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="p-2 hover:bg-soft rounded transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.cartItemId)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="bg-surface p-6 rounded-lg border border-line shadow-soft h-fit space-y-4">
          <h2 className="font-bold text-lg text-ink border-b border-line pb-3">Order total</h2>
          <div className="space-y-2 text-sm text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee (demo)</span>
              <span className="font-semibold text-ink">${DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 font-bold text-base text-ink">
              <span>Total</span>
              <span key={total.toFixed(2)} className="qty-pop text-accent">${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full bg-accent text-white py-3.5 rounded-lg font-extrabold shadow-sm hover:opacity-90 transition-all mt-4 text-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}