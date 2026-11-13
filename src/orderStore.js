// LocalStorage se orders load karne ka function
export const getOrders = () => {
  const orders = localStorage.getItem('demo_orders');
  return orders ? JSON.parse(orders) : [];
};

// Naya order add karne ka function (User Side)
export const placeOrder = (orderData) => {
  const currentOrders = getOrders();
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: orderData.customerName || 'Test Customer',
    phone: orderData.phone || '0300-1234567',
    items: orderData.items || ['Zinger Burger', 'Fries'],
    total: orderData.total || 1200,
    status: 'Pending',
    time: new Date().toLocaleTimeString()
  };

  const updatedOrders = [newOrder, ...currentOrders];
  localStorage.setItem('demo_orders', JSON.stringify(updatedOrders));
  
  // Real-time update trigger
  window.dispatchEvent(new Event('orderUpdated'));
  return newOrder;
};