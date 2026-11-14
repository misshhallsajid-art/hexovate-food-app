import React, { useState, useEffect } from 'react';
import { getOrders } from './orderStore';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchData = () => {
    setOrders(getOrders());
    const savedBookings = JSON.parse(localStorage.getItem('table_bookings') || '[]');
    setBookings(savedBookings);
  };

  useEffect(() => {
    fetchData();
    const handleUpdate = () => fetchData();

    window.addEventListener('orderUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('orderUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('demo_orders', JSON.stringify(updated));
    window.dispatchEvent(new Event('orderUpdated'));
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 sm:py-10 font-sans space-y-12">
      {/* 1. Live Food Orders Section */}
      <section>
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 pb-4 border-b border-line">
          <h1 className="text-2xl sm:text-3xl font-black text-ink">👑 Admin Panel (Live Orders)</h1>
          <span className="bg-accent text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
            Total Orders: {orders.length}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-soft rounded-xl border border-line">
            <p className="text-muted font-medium">No incoming orders at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-xl border border-line bg-surface shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-ink text-lg">{order.id}</span>
                    <span className="text-xs text-muted">({order.time})</span>
                  </div>
                  <p className="text-sm font-semibold text-body">
                    👤 {order.customerName} | 📞 {order.phone}
                  </p>
                  <p className="text-sm text-muted">
                    📍 {order.address || 'Address not provided'}
                  </p>

                  {/* Customer Cooking / Delivery Notes */}
                  {order.notes && (
                    <p className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg inline-block">
                      📝 Note: {order.notes}
                    </p>
                  )}

                  <p className="text-sm font-medium text-ink pt-1">
                    🛒 {Array.isArray(order.items) ? order.items.join(', ') : order.items}
                  </p>
                  <p className="text-base font-bold text-accent">
                    Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-line">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-md ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    Status: {order.status}
                  </span>

                  <div className="flex flex-wrap md:justify-end gap-2 mt-1">
                    <button
                      onClick={() => updateStatus(order.id, 'Preparing')}
                      className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Accept &amp; Prepare
                    </button>
                    <button
                      onClick={() => updateStatus(order.id, 'Out for Delivery')}
                      className="px-3 py-1.5 text-xs font-bold bg-orange-500 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Out for Delivery
                    </button>
                    <button
                      onClick={() => updateStatus(order.id, 'Delivered')}
                      className="px-3 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Delivered
                    </button>
                    <button
                      onClick={() => updateStatus(order.id, 'Rejected')}
                      className="px-3 py-1.5 text-xs font-bold bg-red-600 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Dine-In Table Reservations Section */}
      <section>
        <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-line">
          <h2 className="text-xl sm:text-2xl font-black text-ink">🍽️ Table Reservations</h2>
          <span className="bg-soft text-ink border border-line text-xs font-bold px-3 py-1 rounded-full">
            Bookings: {bookings.length}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8 bg-soft rounded-xl border border-line">
            <p className="text-muted text-sm">No dine-in table reservations yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-line bg-surface shadow-soft space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-ink">{b.id}</span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
                <p className="text-sm font-bold text-body">
                  👤 {b.name} &middot; 📞 {b.phone}
                </p>
                <p className="text-xs font-semibold text-accent">
                  👥 {b.guests} &bull; 📅 {b.date} at {b.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}