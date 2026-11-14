import { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';

export default function TableReservationModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00 PM');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    const existing = JSON.parse(localStorage.getItem('table_bookings') || '[]');
    const newBooking = {
      id: `TBL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      guests,
      date,
      time,
    };
    localStorage.setItem('table_bookings', JSON.stringify([newBooking, ...existing]));
    setBooked(true);
  };

  const resetAndClose = () => {
    setBooked(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-line p-6 sm:p-8 shadow-2xl relative animate-in fade-in duration-200 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-soft text-ink hover:bg-line transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {booked ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-black text-ink">Table Reserved!</h2>
            <p className="text-sm text-body">
              We look forward to hosting <span className="font-bold text-ink">{name}</span> ({guests}) on{' '}
              <span className="font-bold text-ink">{date}</span> at{' '}
              <span className="font-bold text-accent">{time}</span>.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="w-full bg-accent text-white font-extrabold py-3.5 rounded-xl mt-2 hover:opacity-90 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-accent">
              Dine-In Experience
            </span>
            <h2 className="text-2xl font-black text-ink mt-1 mb-1">🍽️ Book a Table</h2>
            <p className="text-xs sm:text-sm text-muted mb-5">
              Reserve your spot at Hexovate Kitchen in seconds.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1 text-xs font-bold text-ink mb-1">
                    <Users className="w-3.5 h-3.5 text-accent" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full p-3 rounded-xl border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ Family Table</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs font-bold text-ink mb-1">
                    <Calendar className="w-3.5 h-3.5 text-accent" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-line bg-paper text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-bold text-ink mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" /> Preferred Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['01:30 PM', '05:00 PM', '07:30 PM', '08:00 PM', '09:30 PM', '11:00 PM'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 rounded-lg text-xs font-bold border transition ${
                        time === slot
                          ? 'bg-accent text-white border-accent'
                          : 'bg-soft text-ink border-line hover:border-accent'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white font-extrabold py-3.5 rounded-xl shadow-sm hover:opacity-90 transition mt-2"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}