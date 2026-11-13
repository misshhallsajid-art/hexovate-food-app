import { Link } from 'react-router-dom';

export default function FoodCard({ dish }) {
  return (
    <div className="group flex flex-col bg-surface border border-line rounded-xl overflow-hidden shadow-soft transition duration-200 hover:-translate-y-1 hover:border-accent/40 motion-reduce:hover:translate-y-0">
      <Link to={`/food/${dish.id}`} aria-label={`View ${dish.name}`} className="flex-grow">
        <div className="relative overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {dish.badge && (
            <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {dish.badge}
            </span>
          )}
        </div>
        <div className="px-5 pt-4">
          <p className="text-sm font-medium text-accent">{dish.cuisine}</p>
          <h3 className="font-display text-xl font-extrabold text-ink mt-1">{dish.name}</h3>
          <p className="text-sm text-muted leading-relaxed mt-2 line-clamp-2">{dish.description}</p>
          <p className="text-xs text-muted mt-3">Ready in {dish.prepTime}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between px-5 pb-5 pt-4">
        <span className="text-lg font-extrabold text-ink">${dish.basePrice.toFixed(2)}</span>
        <Link
          to={`/customize/${dish.id}`}
          aria-label={`Customize and add ${dish.name}`}
          className="bg-accent text-white text-sm font-extrabold px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition"
        >
          Add +
        </Link>
      </div>
    </div>
  );
}