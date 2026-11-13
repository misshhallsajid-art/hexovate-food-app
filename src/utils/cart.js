// Shared helpers for price and cart-item identity.
export const DELIVERY_FEE = 2.99; // demo fee

// unit price = base price + size difference + selected add-ons (rounded to cents)
export function getUnitPrice(dish, sizeLabel, addOnIds = []) {
  const size = dish.sizeOptions.find((s) => s.label === sizeLabel);
  const sizeDelta = size ? size.priceDelta : 0;
  const addOnTotal = dish.addOns
    .filter((a) => addOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return Math.round((dish.basePrice + sizeDelta + addOnTotal) * 100) / 100;
}

// Same dish + same size + same add-ons => same id (quantity goes up).
// Anything different => a separate cart line.
export function buildCartItemId(dishId, sizeLabel, addOnIds = []) {
  return [dishId, sizeLabel, [...addOnIds].sort().join('+')].join('|');
}
