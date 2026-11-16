import { Link, useLocation } from 'react-router-dom';

export default function Confirmation() {
  const { state } = useLocation();
  // The reference is created once in Checkout, so it does not change on re-render.
  const orderRef = state?.orderRef || 'HEX-DEMO';
  const total = state?.total;
  const items = state?.items || [];

  return (
    <div className="success-enter max-w-md mx-auto my-16 p-8 bg-surface rounded-[2rem] border border-line shadow-soft text-center">
      <div className="w-16 h-16 bg-soft text-accent rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold" aria-hidden="true">
        &#10003;
      </div>
      <h1 className="text-2xl font-bold text-ink mb-2">Order placed (demo)</h1>
      <p className="text-muted text-sm mb-4">
        This is a demo only. No real order was placed and no payment was taken.
      </p>

      <div className="bg-soft p-4 rounded-2xl text-left text-sm mb-6 space-y-2">
        <p className="text-muted">Order reference: <span className="font-bold text-ink">#{orderRef}</span></p>

        {items.length > 0 && (
          <ul className="border-t border-accent/30 pt-2 space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex justify-between gap-3 text-ink">
                <span>
                  {item.quantity} x {item.name} ({item.size || 'Regular'})
                  {item.addOns?.length > 0 && (
                    <span className="block text-xs text-muted">{item.addOns.join(', ')}</span>
                  )}
                </span>
                <span className="font-semibold">${item.lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        {typeof total === 'number' && (
          <p className="text-muted border-t border-accent/30 pt-2">
            Demo total (incl. delivery): <span className="font-bold text-ink">${total.toFixed(2)}</span>
          </p>
        )}
      </div>

      <Link to="/" className="block bg-accent text-white py-3.5 rounded-full font-extrabold shadow-glow hover:opacity-90 transition">
        Back to Home
      </Link>
    </div>
  );
}