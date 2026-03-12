import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [msg, setMsg] = useState('');

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orders', {
        customerName,
        phoneNumber,
        items: cart.map((i) => ({ productId: i._id, quantity: i.quantity }))
      });
      clearCart();
      setMsg('Order placed successfully');
      router.push('/orders');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Order failed. Please login first.');
    }
  };

  return (
    <form onSubmit={placeOrder} className="container-main max-w-md bg-white p-6 rounded-xl shadow space-y-3">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {msg && <p>{msg}</p>}
      <input required className="w-full border rounded p-2" placeholder="Customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      <input required className="w-full border rounded p-2" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button className="w-full bg-pink-600 text-white py-2 rounded">Place Order</button>
    </form>
  );
}
