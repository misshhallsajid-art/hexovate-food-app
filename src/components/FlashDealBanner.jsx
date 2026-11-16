import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Timer } from 'lucide-react';

export default function FlashDealBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] text-white py-3 px-4 sm:px-8 border-b border-[#FF8A2B]/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left: Deal Text */}
        <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-[#FF8A2B] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <Flame className="w-3 h-3 fill-white" /> Flash Deal
          </span>
          <p className="text-xs sm:text-sm font-bold tracking-tight">
            Get <span className="text-[#FF8A2B]">20% OFF</span> on all Burgers & Combos!
          </p>
        </div>

        {/* Right: Timer & Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold text-white">
            <Timer className="w-3.5 h-3.5 text-[#FF8A2B]" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <Link
            to="/menu"
            className="bg-[#FF8A2B] text-white text-xs font-extrabold px-4 py-1.5 rounded-xl hover:opacity-95 transition whitespace-nowrap"
          >
            Claim Now
          </Link>
        </div>

      </div>
    </div>
  );
}