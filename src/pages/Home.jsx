import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import dishes from '../data/dishes';
import FoodCard from '../components/FoodCard';

export default function Home() {
  const { hash } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const cart = useCartStore((state) => state.cart);

  const salmonDish =
    dishes.find((d) => d.name.toLowerCase().includes('salmon') || d.name.toLowerCase().includes('bowl')) ||
    dishes[0];
  
  const otherDishes = dishes.filter((d) => d.id !== salmonDish.id);
  const sideDishes = otherDishes.slice(0, 4);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  const categories = ['All', ...new Set(dishes.map((d) => d.category))];
  const visibleDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen pb-24 font-sans overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-10 md:py-16 grid md:grid-cols-12 items-center gap-8 lg:gap-12">
        
        {/* Right Side Preview Cluster (Appears ON TOP on Mobile via order-1, on Right on Desktop via md:order-2) */}
        <div className="md:col-span-6 order-1 md:order-2 relative flex justify-center items-center py-4">
          {/* Perfect Circle Orange Backdrop */}
          <div className="absolute aspect-square w-[250px] sm:w-[340px] lg:w-[400px] bg-[#FF9B42] rounded-full -z-0 opacity-90 m-auto inset-0" />

          {/* Circular Dish Showcase Cluster */}
          <div className="relative z-10 w-[250px] h-[250px] sm:w-[330px] sm:h-[330px] lg:w-[380px] lg:h-[380px] shrink-0 flex items-center justify-center aspect-square">
            
            {/* Center Main Dish (Salmon Bowl) */}
            <Link
              to={`/food/${salmonDish.id}`}
              className="absolute w-28 h-28 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300 z-20 bg-white aspect-square shrink-0"
            >
              <img
                src={salmonDish.image}
                alt={salmonDish.name}
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Side Dish 1 (Top) */}
            {sideDishes[0] && (
              <Link
                to={`/food/${sideDishes[0].id}`}
                className="absolute top-1 right-3 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 z-30 bg-white aspect-square shrink-0"
              >
                <img
                  src={sideDishes[0].image}
                  alt={sideDishes[0].name}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

            {/* Side Dish 2 (Right) */}
            {sideDishes[1] && (
              <Link
                to={`/food/${sideDishes[1].id}`}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 lg:w-26 lg:h-26 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 z-30 bg-white aspect-square shrink-0"
              >
                <img
                  src={sideDishes[1].image}
                  alt={sideDishes[1].name}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

            {/* Side Dish 3 (Bottom) */}
            {sideDishes[2] && (
              <Link
                to={`/food/${sideDishes[2].id}`}
                className="absolute bottom-1 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 z-30 bg-white aspect-square shrink-0"
              >
                <img
                  src={sideDishes[2].image}
                  alt={sideDishes[2].name}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

            {/* Side Dish 4 (Left) */}
            {sideDishes[3] && (
              <Link
                to={`/food/${sideDishes[3].id}`}
                className="absolute left-0 top-1/3 w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 z-30 bg-white aspect-square shrink-0"
              >
                <img
                  src={sideDishes[3].image}
                  alt={sideDishes[3].name}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}

          </div>
        </div>

        {/* Left Side Text Content (Appears BELOW preview on Mobile via order-2, on Left on Desktop via md:order-1) */}
        <div className="md:col-span-6 order-2 md:order-1 space-y-4 sm:space-y-5 text-left z-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/60 px-3.5 py-1.5 rounded-full shadow-sm">
            <div className="flex items-center text-amber-500 text-xs gap-0.5">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="text-xs font-bold text-[#111111]">4.5 (5k+ Reviews)</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.2rem] font-black text-[#111111] leading-[1.1] tracking-tight">
            Discover Our Delectable
            <br />
            <span className="text-[#FF8A2B]">Delights Menu</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
            Experience freshly crafted gourmet burgers, bowls, and pastas prepared with premium ingredients and delivered piping hot to your doorstep.
          </p>

          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-block bg-[#FF8A2B] text-white text-base font-extrabold px-8 py-3.5 rounded-2xl shadow-glow hover:opacity-95 transition"
            >
              Order now
            </Link>
          </div>
        </div>

      </section>

      {/* OUR FOOD MENU SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl font-black text-[#111111] mb-2">
              Our Food Menu
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-md">
              Explore our handcrafted selection made fresh daily with premium ingredients.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-2 no-scrollbar" role="group" aria-label="Filter dishes">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#FF8A2B] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-[#111111] hover:border-[#FF8A2B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {visibleDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
    </div>
  );
}