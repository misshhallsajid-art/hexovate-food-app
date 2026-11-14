import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { DELIVERY_FEE } from '../utils/cart';
import { placeOrder } from '../orderStore';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'e.g. Ayesha Khan', autoComplete: 'name' },
  { name: 'phone', label: 'Phone number', type: 'tel', placeholder: 'e.g. +92 300 1234567', autoComplete: 'tel' },
  { name: 'address', label: 'Delivery address', type: 'textarea', placeholder: 'House #, Street, Area, City', autoComplete: 'street-address' },
];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^\+?[0-9\s-]{10,15}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number (10-15 digits).';
  }
  if (values.address.trim().length < 10) errors.address = 'Please enter your full delivery address.';
  return errors;
}

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [values, setValues] = useState({ name: '', phone: '', address: '', notes: '' });
  const [touched, setTouched] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;
  const errors = validate(values);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 text-center p-8 bg-surface rounded-xl border border-line shadow-soft">
        <h1 className="text-2xl font-bold text-ink mb-2">Your cart is empty</h1>
        <p className="text-muted text-sm leading-relaxed mb-4">Add at least one dish to your cart before you check out.</p>
        <Link to="/menu" className="text-accent font-semibold hover:underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, address: true });
    if (Object.keys(errors).length > 0) return;

    const orderItems = cart.map(item => `${item.name} x${item.quantity}`);

    try {
      placeOrder({
        customerName: values.name,
        phone: values.phone,
        address: values.address,
        notes: values.notes.trim(),
        items: orderItems,
        total: total
      });
    } catch (err) {
      console.log('Order save skipped', err);
    }

    const orderRef = `HEX-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    navigate('/confirmation', { state: { orderRef, total } });
  };

  const inputClass = (field) =>
    `w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent ${
      touched[field] && errors[field] ? 'border-red-500' : 'border-line'
    }`;

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
      <h1 className="text-3xl sm:text-4xl font-black text-ink mb-2">Checkout</h1>
      <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
        Enter your contact details and delivery address below.
      </p>

      <div className="bg-soft rounded-xl p-5 mb-6 text-sm space-y-1">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Delivery fee</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-base text-ink border-t border-accent/30 pt-2 mt-2">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="bg-surface p-5 sm:p-6 rounded-xl border border-line shadow-soft space-y-5">
        {FIELDS.map((f) => {
          const showError = touched[f.name] && errors[f.name];
          const common = {
            id: f.name,
            name: f.name,
            value: values[f.name],
            placeholder: f.placeholder,
            autoComplete: f.autoComplete,
            'aria-invalid': showError ? 'true' : 'false',
            'aria-describedby': showError ? `${f.name}-error` : undefined,
            onChange: (e) => setValues({ ...values, [f.name]: e.target.value }),
            onBlur: () => setTouched({ ...touched, [f.name]: true }),
            className: inputClass(f.name),
          };
          return (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-semibold mb-1 text-body">
                {f.label}
              </label>
              {f.type === 'textarea' ? <textarea rows="3" {...common} /> : <input type={f.type} {...common} />}
              {showError && (
                <p id={`${f.name}-error`} role="alert" className="fade-slide text-red-600 text-sm mt-1">
                  {errors[f.name]}
                </p>
              )}
            </div>
          );
        })}

        {/* Optional Order / Cooking Instructions */}
        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-1 text-body">
            📝 Cooking / Delivery Instructions (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="2"
            placeholder="e.g. Extra spicy, no onions, ring the doorbell..."
            value={values.notes}
            onChange={(e) => setValues({ ...values, notes: e.target.value })}
            className="w-full p-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl font-extrabold shadow-sm hover:opacity-90 transition">
          Place Order &rarr;
        </button>
      </form>
    </div>
  );
}