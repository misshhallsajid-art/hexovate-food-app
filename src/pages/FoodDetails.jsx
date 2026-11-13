import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import dishes from '../data/dishes';
import ProductViewer3D from '../components/ProductViewer3D';
import ReviewSection from '../components/ReviewSection'; // Added ReviewSection import
import { getUnitPrice } from '../utils/cart';

export default function FoodDetails() {
  const { id } = useParams();
  const dish = dishes.find((d) => String(d.id) === String(id));
  const [selectedSize, setSelectedSize] = useState(null);

  if (!dish) {
    return (
      <div className="max-w-2xl mx-auto my-16 text-center p-8 bg-surface rounded-xl border border-line shadow-soft">
        <h2 className="text-2xl font-bold text-ink mb-2">Dish not found</h2>
        <p className="text-muted mb-5">
          We could not find the dish you were looking for. It may have been removed from the menu, or the link may be incorrect.
        </p>
        <Link to="/menu" className="text-accent font-semibold hover:underline">
          &larr; Back to Menu
        </Link>
      </div>
    );
  }

  // First portion (Regular) is selected until the visitor picks another one
  const sizeLabel = selectedSize ?? dish.sizeOptions[0].label;
  const price = getUnitPrice(dish, sizeLabel, []);

  const facts = [
    { label: 'Ready in', value: dish.prepTime },
    { label: 'Serves', value: dish.serves },
    { label: 'Tastes', value: dish.taste },
    { label: 'Category', value: `${dish.category} · ${dish.cuisine}` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link to="/menu" className="text-accent font-semibold hover:underline mb-6 inline-block">
        &larr; Back to Menu
      </Link>

      <div className="bg-surface rounded-xl border border-line shadow-soft overflow-hidden grid md:grid-cols-2">
        <ProductViewer3D image={dish.image} name={dish.name} glbUrl={dish.glbUrl} />

        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <span className="text-sm font-medium text-accent">{dish.cuisine}</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-ink mt-2 mb-4 leading-[1.05]">{dish.name}</h1>
            <p className="text-body leading-relaxed mb-6">{dish.description}</p>

            <h2 className="text-sm font-bold text-ink mb-2">Ingredients</h2>
            <ul className="flex flex-wrap gap-2 mb-6">
              {dish.ingredients.map((item) => (
                <li key={item} className="bg-soft text-ink text-sm font-medium px-3 py-1 rounded-lg">{item}</li>
              ))}
            </ul>

            <fieldset className="mb-6">
              <legend className="text-sm font-bold text-ink mb-2">Portion</legend>
              <div className="flex flex-wrap gap-2">
                {dish.sizeOptions.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    aria-pressed={sizeLabel === size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition ${
                      sizeLabel === size.label
                        ? 'bg-accent text-white border-accent shadow-sm'
                        : 'bg-surface text-body border-line hover:bg-soft'
                    }`}
                  >
                    {size.label}
                    {size.priceDelta !== 0 && <span className="ml-1 opacity-80">(+${size.priceDelta.toFixed(2)})</span>}
                  </button>
                ))}
              </div>
            </fieldset>

            <p className="font-display text-4xl font-extrabold text-ink">
              <span aria-live="polite">${price.toFixed(2)}</span>
              <span className="font-sans text-sm font-normal text-muted"> / {sizeLabel.toLowerCase()} portion</span>
            </p>
          </div>

          <Link
            to={`/customize/${dish.id}?size=${encodeURIComponent(sizeLabel)}`}
            className="mt-8 text-center bg-accent text-white py-4 rounded-lg font-extrabold shadow-sm hover:opacity-90 transition block"
          >
            Customize &amp; add to cart
          </Link>
        </div>
      </div>

      {/* Detailed information */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <section className="md:col-span-2 bg-surface rounded-xl border border-line shadow-soft p-8">
          <h2 className="font-display text-2xl font-extrabold text-ink mb-3">About this dish</h2>
          <p className="text-body leading-relaxed mb-4">{dish.longDescription}</p>
          <p className="text-body leading-relaxed">
            You can choose a Regular or Large portion, and add extras such as{' '}
            {dish.addOns.map((a) => a.label.toLowerCase()).join(', ')} on the next step. The price
            updates as you choose, so you always see the final amount before adding the dish to your cart.
          </p>
        </section>

        <section className="bg-surface rounded-xl border border-line shadow-soft p-8">
          <h2 className="font-display text-2xl font-extrabold text-ink mb-4">Good to know</h2>
          <dl className="space-y-4 text-sm">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm font-semibold text-muted">{f.label}</dt>
                <dd className="text-ink font-medium mt-0.5">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Customer Reviews & Star Ratings Section */}
      <ReviewSection foodId={dish.id} />
    </div>
  );
}