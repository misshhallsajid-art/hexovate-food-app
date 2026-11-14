import { useState } from 'react';
import { Search } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { dishes } from '../data/dishes';

const categoryNotes = {
  All: 'Every dish on our menu, made fresh after you order.',
  Bowls: 'Hearty bowls with rice, grains or greens, from creamy Indian curry to a light salmon salad.',
  Pasta: 'Fresh pasta cooked to order in rich, simple sauces.',
  Sushi: 'Hand-rolled sushi made with fresh fish and crisp vegetables.',
  Burgers: 'Juicy flame-grilled burgers on soft toasted brioche buns.',
};

export default function Menu() {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allDishes = Array.isArray(dishes) ? dishes : [];
  const categories = ['All', ...new Set(allDishes.map((d) => d.category))];

  const filteredDishes = allDishes.filter((d) => {
    const matchesCat = category === 'All' || d.category === category;
    const matchesSearch =
      !searchQuery.trim() ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF8A2B]">
              Hexovate Kitchen
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-[#111111] mt-1 leading-[1.08]">
              What are you hungry for?
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
              Freshly prepared to order — pick your favorite dish and customize it your way.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full bg-gray-50 border border-gray-200 text-[#111111] placeholder-gray-400 text-sm pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:bg-white focus:border-[#FF8A2B] transition"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div
          className="flex gap-2.5 overflow-x-auto py-5 no-scrollbar"
          role="group"
          aria-label="Filter dishes by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition ${
                category === cat
                  ? 'bg-[#FF8A2B] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? 'All Dishes' : cat}
            </button>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mb-6" aria-live="polite">
          {categoryNotes[category] || categoryNotes.All}
        </p>

        {/* Sleek Rectangular Dish Grid (Zero Square Boxes) */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-600 font-bold">No dishes matched your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategory('All');
              }}
              className="mt-2 text-xs font-extrabold text-[#FF8A2B] underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <FoodCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}