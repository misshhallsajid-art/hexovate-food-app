import { useState, useEffect } from 'react';

export default function ReviewSection({ foodId }) {
  const storageKey = `reviews_${foodId}`;
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      // Default sample review taake page khali na lage
      setReviews([
        { id: 1, name: 'Zainab Ali', rating: 5, comment: 'Fresh ingredients and amazing taste!', date: 'Recently' }
      ]);
    }
  }, [foodId]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setName('');
    setComment('');
    setRating(5);
  };

  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="mt-12 pt-8 border-t border-line">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-ink">Customer Reviews</h2>
        <div className="bg-soft px-3 py-1.5 rounded-lg border border-line text-sm font-bold text-ink">
          ⭐ {avgRating} / 5 ({reviews.length} reviews)
        </div>
      </div>

      {/* Add Review Form */}
      <form onSubmit={handleAddReview} className="bg-surface p-5 rounded-xl border border-line shadow-soft mb-8 space-y-4">
        <h3 className="font-bold text-ink text-sm">Leave a Review</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-body">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-xl transition ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <textarea
          rows="2"
          placeholder="Share your feedback about this dish..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full p-2.5 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="bg-accent text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
        >
          Post Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl bg-soft border border-line">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-ink">{rev.name}</span>
              <span className="text-xs text-muted">{rev.date}</span>
            </div>
            <div className="text-yellow-500 text-sm mb-1">
              {'★'.repeat(rev.rating)}
              <span className="text-gray-300">{'★'.repeat(5 - rev.rating)}</span>
            </div>
            <p className="text-sm text-body">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}