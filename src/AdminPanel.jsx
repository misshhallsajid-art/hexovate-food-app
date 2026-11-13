import React, { useState, useEffect } from 'react';
import { getOrders } from './orderStore';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    fetchOrders();
    const handleOrderUpdate = () => fetchOrders();

    window.addEventListener('orderUpdated', handleOrderUpdate);
    window.addEventListener('storage', handleOrderUpdate); // Multi-tab sync
    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate);
      window.removeEventListener('storage', handleOrderUpdate);
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
    <div className="max-w-4xl mx-auto px-6 py-10 font-sans">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-line">
        <h1 className="text-3xl font-black text-ink">👑 Admin Panel (Live Orders)</h1>
        <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
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
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-ink text-lg">{order.id}</span>
                  <span className="text-xs text-muted">({order.time})</span>
                </div>
                <p className="text-sm font-semibold text-body mt-1">
                  👤 {order.customerName} | 📞 {order.phone}
                </p>
                <p className="text-sm text-muted mt-1">
                  📍 {order.address || 'Address not provided'}
                </p>
                <p className="text-sm font-medium text-ink mt-2">
                  🛒 {Array.isArray(order.items) ? order.items.join(', ') : order.items}
                </p>
                <p className="text-base font-bold text-accent mt-1">
                  Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 w-full md:w-auto">
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

                <div className="flex flex-wrap justify-end gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(order.id, 'Preparing')}
                    className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:opacity-90 transition"
                  >
                    Accept & Prepare
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
    </div>
  );
}