import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dishes from '../data/dishes';
import { useCartStore } from '../store/useCartStore';

const SIDES = [
  { id: 'side-1', name: 'Crispy Masala Fries', price: 3.50, icon: '🍟' },
  { id: 'side-2', name: 'Cheesy Garlic Bread', price: 4.00, icon: '🥖' },
  { id: 'side-3', name: 'Creamy Coleslaw', price: 2.50, icon: '🥗' },
  { id: 'side-4', name: 'Loaded Nachos', price: 4.50, icon: '🌮' },
];

const DRINKS = [
  { id: 'drink-1', name: 'Fresh Mint Margarita', price: 3.00, icon: '🍹' },
  { id: 'drink-2', name: 'Chilled Cola', price: 2.00, icon: '🥤' },
  { id: 'drink-3', name: 'Peach Iced Tea', price: 2.80, icon: '🧋' },
  { id: 'drink-4', name: 'Sparkling Lemon Water', price: 2.20, icon: '🍋' },
];

export default function ComboBuilder() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const [step, setStep] = useState(1);
  const [selectedMain, setSelectedMain] = useState(dishes[0] || null);
  const [selectedSide, setSelectedSide] = useState(SIDES[0]);
  const [selectedDrink, setSelectedDrink] = useState(DRINKS[0]);

  // Price calculations with 15% Combo Discount
  const mainPrice = selectedMain ? Number(selectedMain.price || 10) : 0;
  const rawTotal = mainPrice + selectedSide.price + selectedDrink.price;
  const discount = rawTotal * 0.15;
  const finalComboPrice = rawTotal - discount;

  const handleAddComboToCart = () => {
    if (!selectedMain) return;

    const comboItem = {
      id: `combo-${Date.now()}`,
      name: `🍱 Custom Combo: ${selectedMain.name}`,
      size: 'Combo Meal',
      addOns: [`Side: ${selectedSide.name}`, `Drink: ${selectedDrink.name}`],
      unitPrice: Number(finalComboPrice.toFixed(2)),
      quantity: 1,
      image: selectedMain.image,
    };

    // Support both addToCart or direct store update if method name differs
    if (typeof addToCart === 'function') {
      addToCart(comboItem);
    } else {
      useCartStore.setState((state) => ({
        cart: [...state.cart, comboItem],
      }));
    }

    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <span className="bg-accent/15 text-accent text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Save 15% Automatically
        </span>
        <h1 className="text-4xl font-black text-ink mt-2">🍱 Build Your Own Platter</h1>
        <p className="text-muted mt-1">
          Pick a main dish, pair it with a crispy side, and choose a refreshing drink to unlock an instant combo discount.
        </p>
      </div>

      {/* Stepper Tabs */}
      <div className="flex gap-3 mb-8 border-b border-line pb-4 overflow-x-auto">
        {[
          { num: 1, label: '1. Choose Main Dish' },
          { num: 2, label: '2. Pick a Side' },
          { num: 3, label: '3. Select Drink' },
        ].map((tab) => (
          <button
            key={tab.num}
            onClick={() => setStep(tab.num)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              step === tab.num
                ? 'bg-accent text-white shadow-sm'
                : 'bg-soft text-body hover:bg-line/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Selection Area */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {dishes.map((dish) => {
                const isSelected = selectedMain?.id === dish.id;
                return (
                  <div
                    key={dish.id}
                    onClick={() => setSelectedMain(dish)}
                    className={`cursor-pointer p-4 rounded-xl border transition flex items-center gap-4 ${
                      isSelected
                        ? 'border-accent bg-accent/5 ring-2 ring-accent/30'
                        : 'border-line bg-surface hover:bg-soft'
                    }`}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-16 h-16 rounded-lg object-cover bg-soft"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-ink text-base">{dish.name}</h3>
                      <p className="text-xs text-muted line-clamp-1">{dish.cuisine}</p>
                      <p className="text-sm font-extrabold text-accent mt-1">
                        ${Number(dish.price || 10).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {SIDES.map((side) => {
                const isSelected = selectedSide.id === side.id;
                return (
                  <div
                    key={side.id}
                    onClick={() => setSelectedSide(side)}
                    className={`cursor-pointer p-5 rounded-xl border transition flex items-center gap-4 ${
                      isSelected
                        ? 'border-accent bg-accent/5 ring-2 ring-accent/30'
                        : 'border-line bg-surface hover:bg-soft'
                    }`}
                  >
                    <span className="text-4xl">{side.icon}</span>
                    <div>
                      <h3 className="font-bold text-ink">{side.name}</h3>
                      <p className="text-sm font-extrabold text-accent mt-0.5">
                        +${side.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {DRINKS.map((drink) => {
                const isSelected = selectedDrink.id === drink.id;
                return (
                  <div
                    key={drink.id}
                    onClick={() => setSelectedDrink(drink)}
                    className={`cursor-pointer p-5 rounded-xl border transition flex items-center gap-4 ${
                      isSelected
                        ? 'border-accent bg-accent/5 ring-2 ring-accent/30'
                        : 'border-line bg-surface hover:bg-soft'
                    }`}
                  >
                    <span className="text-4xl">{drink.icon}</span>
                    <div>
                      <h3 className="font-bold text-ink">{drink.name}</h3>
                      <p className="text-sm font-extrabold text-accent mt-0.5">
                        +${drink.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Next / Prev Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-lg border border-line text-sm font-bold text-body hover:bg-soft"
              >
                &larr; Previous Step
              </button>
            ) : (
              <div />
            )}

            {step < 3 && (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-lg bg-ink text-white text-sm font-bold hover:opacity-90"
              >
                Next Step &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live Visual Meal Tray */}
        <div className="bg-surface p-6 rounded-2xl border border-line shadow-soft sticky top-24">
          <h2 className="text-xl font-black text-ink mb-4 border-b border-line pb-3">
            🍽️ Your Live Meal Tray
          </h2>

          <div className="space-y-4 mb-6">
            {/* Slot 1: Main */}
            <div className="flex items-center justify-between bg-soft p-3 rounded-xl">
              <div className="flex items-center gap-3">
                {selectedMain?.image && (
                  <img
                    src={selectedMain.image}
                    alt=""
                    className="w-10 h-10 rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="text-xs text-muted font-semibold">Main Dish</p>
                  <p className="text-sm font-bold text-ink">{selectedMain?.name}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-ink">${mainPrice.toFixed(2)}</span>
            </div>

            {/* Slot 2: Side */}
            <div className="flex items-center justify-between bg-soft p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedSide.icon}</span>
                <div>
                  <p className="text-xs text-muted font-semibold">Side Item</p>
                  <p className="text-sm font-bold text-ink">{selectedSide.name}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-ink">${selectedSide.price.toFixed(2)}</span>
            </div>

            {/* Slot 3: Drink */}
            <div className="flex items-center justify-between bg-soft p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedDrink.icon}</span>
                <div>
                  <p className="text-xs text-muted font-semibold">Drink</p>
                  <p className="text-sm font-bold text-ink">{selectedDrink.name}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-ink">${selectedDrink.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-line pt-4 space-y-1.5 text-sm mb-6">
            <div className="flex justify-between text-muted">
              <span>Regular Total</span>
              <span className="line-through">${rawTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 font-bold">
              <span>Combo Savings (15%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-ink pt-2 border-t border-line">
              <span>Combo Price</span>
              <span className="text-accent">${finalComboPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleAddComboToCart}
            className="w-full bg-accent text-white py-3.5 rounded-xl font-extrabold shadow-sm hover:opacity-90 transition"
          >
            Add Combo to Cart
          </button>
        </div>
      </div>
    </div>
  );
}