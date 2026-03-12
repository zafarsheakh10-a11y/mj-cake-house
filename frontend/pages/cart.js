import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty, removeItem } = useCart();
  const total = cart.reduce((sum, i) => sum + (i.discountPrice || i.price) * i.quantity, 0);

  return (
    <div className="container-main">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.discountPrice || item.price}</p>
            </div>
            <input type="number" min="1" className="border w-20 p-1" value={item.quantity} onChange={(e) => updateQty(item._id, e.target.value)} />
            <button onClick={() => removeItem(item._id)} className="text-red-600">Remove</button>
          </div>
        ))}
      </div>
      <p className="text-xl font-bold mt-4">Total: ₹{total}</p>
      <Link href="/checkout" className="inline-block mt-3 bg-pink-600 text-white px-4 py-2 rounded">Checkout</Link>
    </div>
  );
}
