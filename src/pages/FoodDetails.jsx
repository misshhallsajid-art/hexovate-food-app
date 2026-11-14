import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Sparkles } from 'lucide-react';
import dishes from '../data/dishes';
import ReviewSection from '../components/ReviewSection';
import { getUnitPrice } from '../utils/cart';

export default function FoodDetails() {
  const { id } = useParams();
  const dish = dishes.find((d) => String(d.id) === String(id));
  const [selectedSize, setSelectedSize] = useState(null);

  if (!dish) {
    return (
      <div className="max-w-2xl mx-auto my-16 text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-soft">
        <h2 className="text-2xl font-black text-[#111111] mb-2">Dish not found</h2>
        <p className="text-gray-500 mb-5 text-sm">
          We could not find the dish you were looking for. It may have been removed from the menu.
        </p>
        <Link to="/menu" className="text-[#FF8A2B] font-bold hover:underline">
          &larr; Back to Menu
        </Link>
      </div>
    );
  }

  const sizeLabel = selectedSize ?? dish.sizeOptions[0].label;
  const price = getUnitPrice(dish, sizeLabel, []);

  const facts = [
    { label: 'Ready in', value: dish.prepTime },
    { label: 'Serves', value: dish.serves },
    { label: 'Tastes', value: dish.taste },
    { label: 'Category', value: `${dish.category} · ${dish.cuisine}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF8A2B] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>

        {/* Main Dish Showcase (Clean Split Layout — Zero Square Box Padding) */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Sleek Full-Bleed Food Visual */}
          <div className="md:col-span-6 relative rounded-3xl overflow-hidden shadow-lg bg-[#FFF5EC]">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full aspect-[4/3] object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#111111] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full">
              {dish.cuisine}
            </span>
          </div>

          {/* Right: Details & Portion Selector */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-[#111111] leading-[1.08]">
                {dish.name}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                {dish.description}
              </p>

              {/* Ingredients Pills */}
              <div className="mt-6">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2.5">
                  Fresh Ingredients
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {dish.ingredients.map((item) => (
                    <li
                      key={item}
                      className="bg-[#FFF5EC] text-[#111111] text-xs font-bold px-3.5 py-1.5 rounded-full"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Portion Selector */}
              <fieldset className="mt-6">
                <legend className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2.5">
                  Choose Portion
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {dish.sizeOptions.map((size) => (
                    <button
                      key={size.label}
                      type="button"
                      aria-pressed={sizeLabel === size.label}
                      onClick={() => setSelectedSize(size.label)}
                      className={`px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition ${
                        sizeLabel === size.label
                          ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF8A2B]'
                      }`}
                    >
                      {size.label}
                      {size.priceDelta !== 0 && (
                        <span className="ml-1 opacity-80">(+${size.priceDelta.toFixed(2)})</span>
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Price & Customize CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Total Price</p>
                <p className="font-display text-3xl sm:text-4xl font-black text-[#111111]">
                  <span aria-live="polite">${price.toFixed(2)}</span>
                </p>
              </div>

              <Link
                to={`/customize/${dish.id}?size=${encodeURIComponent(sizeLabel)}`}
                className="bg-[#FF8A2B] text-white text-sm sm:text-base font-extrabold px-8 py-4 rounded-xl shadow-glow hover:opacity-95 transition text-center"
              >
                Customize &amp; Add to Cart &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Info & Quick Facts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <section className="md:col-span-2 bg-gray-50/70 rounded-3xl border border-gray-100 p-6 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#111111] mb-3">
              About this dish
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              {dish.longDescription}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Customize your {dish.name} with fresh toppings and extras like{' '}
              {dish.addOns.map((a) => a.label.toLowerCase()).join(', ')} on the next step.
            </p>
          </section>

          <section className="bg-[#FFF5EC] rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-black text-[#111111] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF8A2B]" /> Good to know
            </h2>
            <dl className="space-y-3.5 text-sm">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between border-b border-orange-200/50 pb-2 last:border-0">
                  <dt className="font-bold text-gray-500">{f.label}</dt>
                  <dd className="text-[#111111] font-extrabold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Customer Reviews */}
        <div className="mt-10">
          <ReviewSection foodId={dish.id} />
        </div>
      </div>
    </div>
  );
}