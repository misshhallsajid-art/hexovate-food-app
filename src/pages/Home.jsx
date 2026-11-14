import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Utensils, SlidersHorizontal, ShoppingBag, Flame, Clock, Star, Sparkles } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import dishes from '../data/dishes';

const steps = [
  { icon: Utensils, title: 'Explore Menu', text: 'Handcrafted gourmet meals' },
  { icon: SlidersHorizontal, title: 'Customize It', text: 'Choose portion & toppings' },
  { icon: ShoppingBag, title: 'Fast Delivery', text: 'Track live from kitchen' },
];

const categories = [
  { name: 'Burgers', emoji: '🍔', tag: 'Best Seller' },
  { name: 'Pasta', emoji: '🍝', tag: 'Creamy' },
  { name: 'Sushi', emoji: '🍣', tag: 'Fresh' },
  { name: 'Bowls', emoji: '🥗', tag: 'Healthy' },
  { name: 'Indian', emoji: '🍛', tag: 'Spicy' },
];

export default function Home() {
  const { hash } = useLocation();
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const inHero = gsap.utils.selector(heroRef);
      gsap.from(inHero('[data-hero-item]'), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
  }, [hash]);

  return (
    <div className="overflow-x-hidden">
      {/* 1. Full-Bleed Restaurant Hero Banner (Zero Square Boxes!) */}
      <section ref={heroRef} className="relative bg-neutral-950 text-white overflow-hidden">
        {/* Background Atmospheric Food Image */}
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=85"
          alt="Flame grilled gourmet burger"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50 scale-105"
        />
        {/* Smooth Dark Gradient Overlay so text pops clearly on mobile & desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-black/40 md:bg-gradient-to-r md:from-neutral-950 md:via-neutral-950/80 md:to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 md:py-32">
          <div className="max-w-2xl text-center md:text-left">
            <div
              data-hero-item
              className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest uppercase mb-5 backdrop-blur-sm"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Hexovate Kitchen &middot; Flame-Grilled Fresh</span>
            </div>

            <h1
              data-hero-item
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black leading-[1.03] tracking-tight mb-5"
            >
              Bold Flavors.{' '}
              <span className="text-accent block sm:inline">Crafted Hot.</span>
            </h1>

            <p
              data-hero-item
              className="text-gray-200 text-base sm:text-lg max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
            >
              Bite into juicy handcrafted burgers, sizzling bowls, and custom platters made fresh to order and delivered straight to your doorstep in 25 minutes.
            </p>

            {/* Primary CTA Buttons */}
            <div data-hero-item className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 mb-10">
              <Link
                to="/menu"
                className="bg-accent text-white px-5 sm:px-8 py-4 rounded-full text-sm sm:text-base font-extrabold shadow-glow hover:opacity-90 transition text-center"
              >
                Explore Menu &rarr;
              </Link>
              <Link
                to="/combo"
                className="bg-white/10 backdrop-blur-md border border-white/25 text-white px-5 sm:px-8 py-4 rounded-full text-sm sm:text-base font-bold hover:bg-white hover:text-ink transition text-center"
              >
                🍱 Build Combo
              </Link>
            </div>

            {/* Sleek Trust Indicators */}
            <div
              data-hero-item
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs sm:text-sm font-bold text-gray-300 pt-4 border-t border-white/15"
            >
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                4.9 Customer Rating
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                25-Min Express Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                15% Off Combos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Browse by Category Strip */}
      <section className="bg-soft border-b border-line py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-black text-ink">What are you craving?</h2>
            <Link to="/menu" className="text-xs sm:text-sm font-bold text-accent hover:underline">
              All Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/menu"
                className="bg-surface border border-line rounded-2xl p-4 flex items-center gap-3 hover:border-accent hover:shadow-soft transition group"
              >
                <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <div>
                  <p className="font-extrabold text-sm text-ink">{cat.name}</p>
                  <p className="text-[11px] text-muted font-medium">{cat.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Right Now (Menu Grid) */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-accent">
              Most Ordered
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-ink mt-1">Popular right now</h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-bold text-accent underline underline-offset-4 hover:opacity-80"
          >
            See the full menu
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {dishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* 4. Combo Deal Promo Banner */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-14">
        <div className="bg-ink text-white rounded-3xl p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="text-center md:text-left space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Save 15% Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              🍱 Build Your Own Meal Platter
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              Pair any signature main dish with crispy fries or garlic bread and a chilled drink — get an instant 15% combo discount.
            </p>
          </div>
          <Link
            to="/combo"
            className="bg-accent text-white font-extrabold px-7 py-4 rounded-full hover:opacity-90 transition whitespace-nowrap shadow-md"
          >
            Create My Combo &rarr;
          </Link>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16">
        <ol className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="bg-surface border border-line rounded-2xl p-5 sm:p-6 shadow-soft flex items-center gap-4"
            >
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-muted">0{i + 1}</p>
                <h3 className="text-base sm:text-lg font-extrabold text-ink leading-tight">{title}</h3>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer Strip */}
      <section id="about" className="scroll-mt-24 bg-soft border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-body">
          <p className="font-bold text-ink">🍔 HEXOVATE Food</p>
          <p className="text-center">
            Crafted with React &amp; Tailwind CSS. Fresh flavors, fast delivery.
          </p>
          <div className="flex items-center gap-4 font-semibold text-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-accent" /> 25m Delivery
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}