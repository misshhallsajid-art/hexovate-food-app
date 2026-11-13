import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import dishes from '../data/dishes';
import { useCartStore } from '../store/useCartStore';
import { getUnitPrice, buildCartItemId } from '../utils/cart';

export default function Customization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const dish = dishes.find((d) => String(d.id) === String(id));

  // The Details page can pass the chosen portion, e.g. /customize/1?size=Large
  const requestedSize = searchParams.get('size');
  const [sizeLabel, setSizeLabel] = useState(
    dish && dish.sizeOptions.some((s) => s.label === requestedSize)
      ? requestedSize
      : dish?.sizeOptions[0].label
  );
  const [addOnIds, setAddOnIds] = useState([]);

  if (!dish) {
    return (
      <div className="max-w-2xl mx-auto my-16 text-center p-8 bg-surface rounded-xl border border-line shadow-sm">
        <h2 className="text-2xl font-bold text-ink mb-2">Dish not found</h2>
        <Link to="/menu" className="text-accent font-semibold hover:underline">
          &larr; Back to Menu
        </Link>
      </div>
    );
  }

  // Live price: recalculated on every render, no page refresh needed.
  const unitPrice = getUnitPrice(dish, sizeLabel, addOnIds);

  const toggleAddOn = (addOnId) =>
    setAddOnIds((prev) =>
      prev.includes(addOnId) ? prev.filter((x) => x !== addOnId) : [...prev, addOnId]
    );

  const handleAddToCart = () => {
    addToCart({
      cartItemId: buildCartItemId(dish.id, sizeLabel, addOnIds),
      dishId: dish.id,
      name: dish.name,
      image: dish.image,
      size: sizeLabel,
      addOns: dish.addOns.filter((a) => addOnIds.includes(a.id)).map((a) => a.label),
      unitPrice,
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 md:p-8 bg-surface rounded-xl shadow-soft border border-line">
      <Link to={`/food/${dish.id}`} className="text-accent font-semibold hover:underline text-sm">
        &larr; Back to {dish.name}
      </Link>

      <div className="flex items-center gap-4 mt-4 mb-6">
        <img src={dish.image} alt={dish.name} className="w-20 h-20 object-cover rounded-lg" />
        <div>
          <h1 className="text-2xl font-black text-ink">{dish.name}</h1>
          <p className="text-muted text-sm leading-relaxed">Choose your portion size and any extras you would like. The price at the bottom updates as you choose.</p>
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className="block text-sm font-bold text-ink mb-1">Portion size</legend>
        <p className="text-sm text-muted mb-3">Regular is a comfortable single serving. Large adds about 50 percent more food and is great for sharing.</p>
        <div className="flex flex-wrap gap-3">
          {dish.sizeOptions.map((size) => (
            <button
              key={size.label}
              type="button"
              aria-pressed={sizeLabel === size.label}
              onClick={() => setSizeLabel(size.label)}
              className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition ${
                sizeLabel === size.label
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'bg-surface text-body border-line hover:bg-soft'
              }`}
            >
              {size.label}
              {size.priceDelta !== 0 && (
                <span className="ml-1 opacity-80">
                  ({size.priceDelta > 0 ? '+' : '-'}${Math.abs(size.priceDelta).toFixed(2)})
                </span>
              )}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="block text-sm font-bold text-ink mb-1">Add-ons</legend>
        <p className="text-sm text-muted mb-3">Optional extras. Tick as many as you like.</p>
        <div className="space-y-2">
          {dish.addOns.map((addOn) => (
            <label
              key={addOn.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-line cursor-pointer hover:bg-soft"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={addOnIds.includes(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="w-5 h-5 accent-accent rounded"
                />
                <span className="text-sm font-medium text-body">{addOn.label}</span>
              </span>
              <span className="text-sm font-semibold text-ink">+${addOn.price.toFixed(2)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full bg-accent text-white py-4 rounded-lg font-extrabold shadow-sm hover:opacity-90 transition"
      >
        Add to Cart &mdash; <span aria-live="polite">${unitPrice.toFixed(2)}</span>
      </button>
    </div>
  );
}