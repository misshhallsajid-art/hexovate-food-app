import { create } from 'zustand';

// New key (v2) so old, broken cart data from the previous version is ignored.
const STORAGE_KEY = 'hexovate_cart_v2';

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // storage blocked/full: the cart still works in memory
  }
}

export const useCartStore = create((set) => ({
  cart: loadCart(),

  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.some((c) => c.cartItemId === item.cartItemId);
      const cart = exists
        ? state.cart.map((c) =>
            c.cartItemId === item.cartItemId
              ? { ...c, quantity: c.quantity + (item.quantity || 1) }
              : c
          )
        : [...state.cart, { ...item, quantity: item.quantity || 1 }];
      saveCart(cart);
      return { cart };
    }),

  increaseQuantity: (cartItemId) =>
    set((state) => {
      const cart = state.cart.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(cart);
      return { cart };
    }),

  decreaseQuantity: (cartItemId) =>
    set((state) => {
      const cart = state.cart
        .map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      saveCart(cart);
      return { cart };
    }),

  removeFromCart: (cartItemId) =>
    set((state) => {
      const cart = state.cart.filter((i) => i.cartItemId !== cartItemId);
      saveCart(cart);
      return { cart };
    }),

  clearCart: () =>
    set(() => {
      saveCart([]);
      return { cart: [] };
    }),
}));
