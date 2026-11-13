import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="bg-surface border-t border-line mt-20 text-sm text-body">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display font-extrabold text-2xl tracking-tight text-ink mb-3">
            Hexovate<span className="text-accent">.</span>
          </p>
          <p className="max-w-md leading-relaxed text-muted">
            A student demo of a food ordering app. No real orders, no payments.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-ink mb-4">Explore</h2>
          <ul className="space-y-2.5 text-muted">
            <li><Link to="/" className="hover:text-ink">Home</Link></li>
            <li><Link to="/menu" className="hover:text-ink">Full menu</Link></li>
            <li><Link to="/cart" className="hover:text-ink">Your cart</Link></li>
            <li><Link to="/checkout" className="hover:text-ink">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-ink mb-4">About the project</h2>
          <ul className="space-y-2.5 text-muted">
            <li>Built with React, Vite and Tailwind CSS</li>
            <li>3D plates with Three.js</li>
            <li>Scroll animation with GSAP</li>
            <li>
              <a
                href="https://github.com/misshhallsajid-art/hexovate-food-app"
                className="hover:text-ink underline underline-offset-4"
              >
                Source code on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="max-w-6xl mx-auto px-6 py-5 text-xs text-muted">
          &copy; Hexovate Food. Student demo project.
        </p>
      </div>
    </footer>
  );
}