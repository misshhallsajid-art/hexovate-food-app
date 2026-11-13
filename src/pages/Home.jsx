import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Utensils, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import ProductViewer3D from '../components/ProductViewer3D';
import dishes from '../data/dishes';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Utensils, title: 'Pick a dish', text: 'See it in 3D' },
  { icon: SlidersHorizontal, title: 'Make it yours', text: 'Portion and extras' },
  { icon: ShoppingBag, title: 'Check out', text: 'Done in a minute' },
];

export default function Home() {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(dishes.find((d) => d.name === 'Classic burger')?.id || dishes[0].id);
  const active = dishes.find((d) => d.id === activeId) || dishes[0];
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const inHero = gsap.utils.selector(heroRef);
      gsap.from(inHero('[data-hero-item]'), {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
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

  const [first, ...rest] = active.name.split(' ');

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-6 pb-12 md:pt-14 md:pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Column on Desktop, Second on Mobile */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p
              data-hero-item
              className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-3.5 py-1 text-[10px] sm:text-[11px] font-extrabold tracking-[0.16em] uppercase text-accent mb-3 sm:mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              {active.cuisine} &middot; Chef&apos;s pick
            </p>

            <h1 data-hero-item className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.98] text-ink tracking-tight mb-3 sm:mb-5">
              {first}{' '}
              <span className="text-accent md:block">{rest.join(' ') || 'special'}.</span>
            </h1>

            <p data-hero-item className="text-body text-sm sm:text-lg max-w-sm mx-auto md:mx-0 mb-4 sm:mb-6">
              {active.description}
            </p>

            <p data-hero-item className="mb-5 sm:mb-7 flex items-baseline justify-center md:justify-start gap-2.5">
              <span className="text-3xl sm:text-5xl font-black text-ink">${active.basePrice.toFixed(2)}</span>
              <span className="text-muted text-xs sm:text-sm font-semibold">Regular</span>
            </p>

            {/* Action Buttons (Side-by-side on mobile) */}
            <div data-hero-item className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mb-7 sm:mb-9">
              <Link
                to={`/customize/${active.id}`}
                className="bg-accent text-white px-4 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-base font-extrabold shadow-glow hover:opacity-90 transition text-center"
              >
                Customize &amp; order
              </Link>
              <Link
                to="/menu"
                className="bg-surface border border-line text-ink px-4 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-base font-bold hover:shadow-soft transition text-center"
              >
                View full menu
              </Link>
            </div>

            {/* Dish Switcher */}
            <div data-hero-item className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3" role="group" aria-label="Pick a dish">
              <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-muted whitespace-nowrap">
                Pick a dish
              </span>
              <div className="flex gap-2.5 sm:gap-3">
                {dishes.map((dish) => (
                  <button
                    key={dish.id}
                    type="button"
                    aria-label={dish.name}
                    aria-pressed={dish.id === activeId}
                    onClick={() => setActiveId(dish.id)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-[3px] transition ${
                      dish.id === activeId
                        ? 'border-accent scale-110 shadow-glow'
                        : 'border-white shadow-soft hover:scale-105'
                    }`}
                  >
                    <img src={dish.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Stage: Shows FIRST on mobile so mentor sees the 3D Burger immediately! */}
          <div data-hero-item className="order-1 md:order-2 relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem]">
            <div
              className="relative h-[18rem] sm:h-[26rem] md:h-[30rem] rounded-[2rem] overflow-hidden transition-colors duration-500 shadow-soft"
              style={{ backgroundColor: active.tint }}
            >
              {/* soft floor shadow */}
              <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 bottom-12 sm:bottom-14 w-3/5 h-5 rounded-[50%] bg-black/10 blur-md" />
              {/* real 3D model */}
              <div className="absolute inset-0 pb-8">
                <ProductViewer3D key={active.id} bare image={active.image} name={active.name} glbUrl={active.glbUrl} />
              </div>
              {/* dashed orbit */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[88%] h-[42%] rounded-[50%] border-2 border-dashed border-accent/60 pointer-events-none"
              />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-5 bg-white text-ink text-[11px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-soft pointer-events-none whitespace-nowrap">
                👆 Drag to rotate 3D
              </span>
            </div>

            {/* floating ingredient chips (cleanly positioned on mobile & desktop) */}
            {[active.heroChips[0], active.heroChips[2]].map((chip, i) => (
              <span
                key={chip.label}
                className={`float-chip ${i ? 'delay' : ''} absolute ${
                  i ? '-right-2 sm:-right-3 top-6 sm:top-10' : '-left-2 sm:-left-4 top-[36%]'
                } bg-white rounded-2xl shadow-soft px-2.5 sm:px-3.5 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-ink`}
              >
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-soft flex items-center justify-center text-sm sm:text-base" aria-hidden="true">
                  {chip.emoji}
                </span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* category strip */}
        <div className="bg-soft border-y border-line">
          <ul className="max-w-6xl mx-auto px-6 py-4 sm:py-5 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-body">
            {['Burgers', 'Pasta', 'Sushi', 'Bowls', 'Indian'].map((c, i) => (
              <li key={c} className="flex items-center gap-6 sm:gap-8">
                {c}
                {i < 4 && <span aria-hidden="true" className="hidden sm:inline text-accent">&middot;</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works: three small icon steps */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <ol className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-surface border border-line rounded-3xl p-5 sm:p-6 shadow-soft flex items-center gap-4">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-soft text-accent flex items-center justify-center">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-muted">Step {i + 1}</p>
                <h2 className="text-lg font-extrabold text-ink leading-tight">{title}</h2>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* All dishes side by side */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-ink">Popular right now</h2>
          <Link to="/menu" className="text-sm font-bold text-accent underline underline-offset-4 hover:opacity-80">
            See the full menu
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {dishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-soft border-t border-line">
        <p className="max-w-6xl mx-auto px-6 py-8 text-sm text-body text-center">
          HEXOVATE Food is a student demo built with React, Three.js and Tailwind CSS. Orders are not real.
        </p>
      </section>
    </div>
  );
}