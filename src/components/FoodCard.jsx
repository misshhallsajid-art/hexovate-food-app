import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Plus, Check } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function FoodCard({ dish }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!dish) return null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultSize = dish.sizeOptions?.[0]?.label || 'Regular';
    addItem({
      id: `${dish.id}-${defaultSize}`,
      dishId: dish.id,
      name: dish.name,
      image: dish.image,
      size: defaultSize,
      addOns: [],
      unitPrice: dish.basePrice,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link
      to={`/food/${dish.id}`}
      className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition group flex flex-col justify-between"
    >
      <div>
        {/* Sleek Wide Aspect Ratio (Replaces bulky square box) */}
        <div className="relative aspect-[16/10] bg-[#FFF5EC] overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 right-3 bg-[#111111] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-[#FF8A2B] fill-[#FF8A2B]" /> 4.9
          </span>
        </div>

        {/* Dish Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-extrabold text-[#FF8A2B] uppercase tracking-wider">
              {dish.cuisine}
            </span>
            <span className="flex items-center gap-1 text-gray-500 font-semibold">
              <Clock className="w-3 h-3" /> {dish.prepTime || '25 min'}
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#111111] group-hover:text-[#FF8A2B] transition line-clamp-1">
            {dish.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
            {dish.description}
          </p>
        </div>
      </div>

      {/* Price & Quick Add Footer */}
      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <span className="font-display text-lg sm:text-xl font-black text-[#111111]">
          ${dish.basePrice.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={handleQuickAdd}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-[#FF8A2B] text-white hover:opacity-90'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> Add
            </>
          )}
        </button>
      </div>
    </Link>
  );
}