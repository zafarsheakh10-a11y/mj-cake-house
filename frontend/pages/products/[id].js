import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function ProductDetails() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:5000';

  const fetchProduct = async () => {
    if (!router.query.id) return;
    const { data } = await api.get(`/products/${router.query.id}`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [router.query.id]);

  const submitReview = async (e) => {
    e.preventDefault();
    await api.post(`/products/${product._id}/reviews`, { comment, rating });
    setComment('');
    setRating(5);
    fetchProduct();
  };

  if (!product) return <div className="container-main">Loading...</div>;

  const priceToShow = product.discountPrice || product.price;

  return (
    <div className="container-main grid md:grid-cols-2 gap-8">
      <div>
        {product.images?.[0] && <img src={`${assetURL}${product.images[0]}`} alt={product.name} className="rounded-xl" />}
        {product.video && <video controls className="mt-4 w-full rounded-xl" src={`${assetURL}${product.video}`} />}
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-pink-600 font-bold text-xl mt-2">₹{priceToShow}</p>
        <p className="mt-3">{product.description}</p>
        <button onClick={() => addToCart(product)} className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg">Add to Cart</button>
        <a href={`https://wa.me/7309083780?text=${encodeURIComponent(`I want ${product.name} for ₹${priceToShow}`)}`} className="block mt-3 text-green-600">WhatsApp Order</a>

        <h2 className="text-xl font-semibold mt-8">Reviews</h2>
        <div className="space-y-3 mt-3">
          {(product.reviews || []).map((r) => (
            <div key={r._id} className="bg-white p-3 rounded shadow">
              <p className="font-semibold">{r.name} - ⭐ {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>

        {user && (
          <form onSubmit={submitReview} className="mt-4 space-y-2">
            <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border rounded p-2" placeholder="Write review" />
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded p-2" />
            <button className="bg-pink-500 text-white px-4 py-2 rounded">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
}
