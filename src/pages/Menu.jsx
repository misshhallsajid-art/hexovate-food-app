import { useState } from 'react';
import FoodCard from '../components/FoodCard';
import { dishes } from '../data/dishes';

const categoryNotes = {
  All: 'Every dish on our menu, made fresh after you order.',
  Bowls: 'Hearty bowls with rice, grains or greens, from creamy Indian curry to a light salmon salad.',
  Pasta: 'Fresh pasta cooked to order in rich, simple sauces.',
  Sushi: 'Hand-rolled sushi made with fresh fish and crisp vegetables.',
  Burgers: 'Juicy grilled burgers on soft toasted buns.',
};

export default function Menu() {
  const [category, setCategory] = useState('All');

  const allDishes = Array.isArray(dishes) ? dishes : [];
  const categories = ['All', ...new Set(allDishes.map((d) => d.category))];

  const filteredDishes =
    category === 'All' ? allDishes : allDishes.filter((d) => d.category === category);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl md:text-6xl font-extrabold text-ink mb-3 leading-[1.05]">
        What are you hungry for?
      </h1>
      <p className="text-body text-lg max-w-xl mb-8">Pick one, spin it in 3D, make it yours.</p>

      {/* Category chips */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-3" role="group" aria-label="Filter dishes by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
              category === cat
                ? 'bg-accent text-white shadow-sm'
                : 'bg-surface text-body border border-line hover:bg-soft'
            }`}
          >
            {cat === 'All' ? 'All dishes' : cat}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted mb-8" aria-live="polite">
        {categoryNotes[category] || categoryNotes.All}
      </p>

      {/* Food cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredDishes.map((dish) => (
          <FoodCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}