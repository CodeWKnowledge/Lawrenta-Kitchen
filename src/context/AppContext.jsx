import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('savoria_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('savoria_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState({
    restaurantName: 'Lawrenta Kitchen',
    deliveryFee: 2.50,
    testMode: true
  });

  useEffect(() => {
    localStorage.setItem('savoria_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('savoria_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart Actions
  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.variant === item.variant && JSON.stringify(i.addons) === JSON.stringify(item.addons)
      );
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, delta) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  // Order Actions
  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Product Actions (Admin)
  const addProduct = (product) => setProducts((prev) => [...prev, { ...product, id: `p${Date.now()}` }]);
  const updateProduct = (id, updatedProduct) => 
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updatedProduct } : p));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        orders,
        cart,
        settings,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        setCategories,
        setSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
