import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) return prev.map((i) => (i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQty = (_id, quantity) => setCart((prev) => prev.map((i) => (i._id === _id ? { ...i, quantity: Number(quantity) } : i)));
  const removeItem = (_id) => setCart((prev) => prev.filter((i) => i._id !== _id));
  const clearCart = () => setCart([]);

  return <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
