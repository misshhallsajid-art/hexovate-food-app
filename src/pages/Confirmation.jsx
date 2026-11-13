import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOrders } from '../orderStore';

const STEPS = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

export default function Confirmation() {
  const { state } = useLocation();
  const [liveOrder, setLiveOrder] = useState(null);

  useEffect(() => {
    const syncLatestOrder = () => {
      const orders = getOrders();
      if (orders.length > 0) {
        setLiveOrder(orders[0]); // Sab se latest order track karein
      }
    };

    syncLatestOrder();
    window.addEventListener('orderUpdated', syncLatestOrder);
    window.addEventListener('storage', syncLatestOrder);
    return () => {
      window.removeEventListener('orderUpdated', syncLatestOrder);
      window.removeEventListener('storage', syncLatestOrder);
    };
  }, []);

  const currentStatus = liveOrder?.status || 'Pending';
  const currentStepIndex = STEPS.indexOf(currentStatus);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-surface p-8 rounded-2xl border border-line shadow-soft text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          ✓
        </div>
        <h1 className="text-3xl font-black text-ink mb-2">Order Confirmed!</h1>
        <p className="text-muted text-sm mb-6">
          Reference ID: <span className="font-bold text-ink">{state?.orderRef || liveOrder?.id || 'HEX-DEMO'}</span>
          {state?.total && ` • Total: $${state.total.toFixed(2)}`}
        </p>

        {/* Live Status Tracker Box */}
        <div className="bg-soft p-6 rounded-xl border border-line text-left mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-ink text-base">Live Order Tracking</h2>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-accent text-white">
              {currentStatus}
            </span>
          </div>

          {currentStatus === 'Rejected' ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-semibold">
              ❌ Sorry, your order was declined by the restaurant.
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isCompleted ? 'bg-accent text-white' : 'bg-line text-muted'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm font-semibold ${isCompleted ? 'text-ink' : 'text-muted'}`}>
                      {step === 'Pending' ? 'Order Placed (Waiting for restaurant)' : step}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Link
          to="/menu"
          className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Order More Food
        </Link>
      </div>
    </div>
  );
}