import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dishes from '../data/dishes';

gsap.registerPlugin(ScrollTrigger);

// GSAP ScrollTrigger showcase: the section is pinned while the visitor scrolls,
// and the plates crossfade one at a time (only one plate is dominant).
// With "reduce motion" on, nothing is pinned and the first dish is simply shown.
export default function FeaturedShowcase() {
  const sectionRef = useRef(null);
  const plateRefs = useRef([]);
  const textRefs = useRef([]);
  const [active, setActive] = useState(0);
  const count = dishes.length;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const plates = plateRefs.current;
      const texts = textRefs.current;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top+=80', // just under the sticky navbar
          end: () => `+=${window.innerHeight * (count - 1)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.round(self.progress * (count - 1))),
        },
      });

      // One step per dish: current plate fades out while the next one fades in
      for (let i = 0; i < count - 1; i += 1) {
        tl.to(plates[i], { autoAlpha: 0, scale: 0.94, duration: 1 }, i)
          .fromTo(plates[i + 1], { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 1 }, i)
          .to(texts[i], { autoAlpha: 0, y: -24, duration: 0.6 }, i)
          .fromTo(texts[i + 1], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6 }, i + 0.4);
      }
    });

    return () => mm.revert();
  }, [count]);

  return (
    <section
      ref={sectionRef}
      aria-label="Featured dishes"
      className="h-[calc(100vh-5rem)] flex items-center"
    >
      <div className="w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Text layers */}
        <div className="relative h-96 md:h-[28rem] order-2 md:order-1">
          {dishes.map((dish, i) => (
            <div
              key={dish.id}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className={`absolute inset-0 ${i === 0 ? '' : 'opacity-0 invisible'}`}
            >
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-ink mb-3">{dish.name}</h2>
              <p className="text-body leading-relaxed mb-4 max-w-md">{dish.description.split('. ')[0].replace(/\.$/, '')}.</p>
              <p className="text-2xl font-bold text-accent mb-6">${dish.basePrice.toFixed(2)}</p>
              <Link
                to={`/food/${dish.id}`}
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                View dish
              </Link>
            </div>
          ))}
        </div>

        {/* Plate layers */}
        <div className="order-1 md:order-2">
          <div className="relative h-72 md:h-[26rem] rounded-xl bg-surface shadow-soft overflow-hidden">
            {dishes.map((dish, i) => (
              <div
                key={dish.id}
                ref={(el) => {
                  plateRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={`absolute inset-0 p-4 ${i === 0 ? '' : 'opacity-0 invisible'}`}
              >
                <img src={dish.image} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
            {dishes.map((dish, i) => (
              <span
                key={dish.id}
                className={`h-2 rounded-lg transition-all duration-300 ${
                  i === active ? 'w-6 bg-accent' : 'w-2 bg-accent/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}