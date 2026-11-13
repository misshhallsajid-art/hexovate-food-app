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

  // GSAP animation: only when the user has NOT asked for reduced motion.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const inHero = gsap.utils.selector(heroRef);
      gsap.from(inHero('[data-hero-item]'), {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
      });
    });
    return () => mm.revert();
  }, []);

  // Lets the "About" nav link (/#about) scroll to its section.
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
      {/* Hero: short text on the left, real 3D plate on a tinted stage on the right */}
      <section ref={heroRef}>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-14 md:pt-14 md:pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              data-hero-item
              className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-[0.16em] uppercase text-accent mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              {active.cuisine} &middot; Chef&apos;s pick
            </p>

            <h1 data-hero-item className="text-6xl md:text-8xl font-black leading-[0.95] text-ink tracking-tight mb-5">
              {first}
              <br />
              <span className="text-accent">{rest.join(' ') || 'special'}.</span>
            </h1>

            <p data-hero-item className="text-body text-lg max-w-sm mb-6">{active.description}</p>

            <p data-hero-item className="mb-7 flex items-baseline gap-3">
              <span className="text-5xl font-black text-ink">${active.basePrice.toFixed(2)}</span>
              <span className="text-muted text-sm">Regular</span>
            </p>

            <div data-hero-item className="flex flex-wrap gap-3 mb-9">
              <Link
                to={`/customize/${active.id}`}
                className="bg-accent text-white px-8 py-4 rounded-full font-extrabold shadow-glow hover:opacity-90 transition"
              >
                Customize and order
              </Link>
              <Link
                to="/menu"
                className="bg-surface border border-line text-ink px-8 py-4 rounded-full font-bold hover:shadow-soft transition"
              >
                View full menu
              </Link>
            </div>

            <div data-hero-item className="flex items-center gap-4" role="group" aria-label="Pick a dish">
              <span className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-muted">Pick a dish</span>
              <div className="flex gap-3">
                {dishes.map((dish) => (
                  <button
                    key={dish.id}
                    type="button"
                    aria-label={dish.name}
                    aria-pressed={dish.id === activeId}
                    onClick={() => setActiveId(dish.id)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-[3px] transition ${
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

          {/* 3D stage */}
          <div data-hero-item className="relative mx-auto w-full max-w-[28rem]">
            <div
              className="relative h-[26rem] md:h-[30rem] rounded-[2rem] overflow-hidden transition-colors duration-500"
              style={{ backgroundColor: active.tint }}
            >
              {/* soft floor shadow */}
              <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 bottom-14 w-3/5 h-5 rounded-[50%] bg-black/10 blur-md" />
              {/* the real 3D model (falls back to the photo if 3D is not available) */}
              <div className="absolute inset-0 pb-8">
                <ProductViewer3D key={active.id} bare image={active.image} name={active.name} glbUrl={active.glbUrl} />
              </div>
              {/* dashed orbit */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[90%] h-[42%] rounded-[50%] border-2 border-dashed border-accent/60 pointer-events-none"
              />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-white text-ink text-xs font-bold px-4 py-2 rounded-full shadow-soft pointer-events-none">
                Drag to rotate
              </span>
            </div>

            {/* floating ingredient chips */}
            {[active.heroChips[0], active.heroChips[2]].map((chip, i) => (
              <span
                key={chip.label}
                className={`float-chip ${i ? 'delay' : ''} absolute ${i ? '-right-3 top-10' : '-left-4 top-[38%]'} bg-white rounded-2xl shadow-soft px-3.5 py-2 flex items-center gap-2 text-sm font-bold text-ink`}
              >
                <span className="w-7 h-7 rounded-full bg-soft flex items-center justify-center text-base" aria-hidden="true">
                  {chip.emoji}
                </span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        {/* category strip */}
        <div className="bg-soft border-y border-line">
          <ul className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-extrabold tracking-[0.2em] uppercase text-body">
            {['Burgers', 'Pasta', 'Sushi', 'Bowls', 'Indian'].map((c, i) => (
              <li key={c} className="flex items-center gap-8">
                {c}
                {i < 4 && <span aria-hidden="true" className="hidden sm:inline text-accent">&middot;</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works: three small icon steps */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <ol className="grid sm:grid-cols-3 gap-5">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-surface border border-line rounded-3xl p-6 shadow-soft flex items-center gap-4">
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

      {/* All dishes side by side, same as the menu page */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-ink">Popular right now</h2>
          <Link to="/menu" className="text-sm font-bold text-accent underline underline-offset-4 hover:opacity-80">
            See the full menu
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {dishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* About: one short line */}
      <section id="about" className="scroll-mt-24 bg-soft border-t border-line">
        <p className="max-w-6xl mx-auto px-6 py-8 text-sm text-body text-center">
          HEXOVATE Food is a student demo built with React, Three.js and Tailwind CSS. Orders are not real.
        </p>
      </section>
    </div>
  );
}