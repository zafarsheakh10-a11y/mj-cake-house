import Link from 'next/link';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL || 'http://localhost:5000';
  const priceToShow = product.discountPrice || product.price;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1 p-4">
      {product.images?.[0] && (
        <img src={`${assetURL}${product.images[0]}`} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      )}
      <h3 className="font-semibold mt-3">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <p className="mt-2 font-bold text-primaryPink">₹{priceToShow}</p>
      <div className="flex gap-2 mt-3">
        <button onClick={() => addToCart(product)} className="px-3 py-2 bg-pink-500 text-white rounded-lg">Add to Cart</button>
        <Link href={`/products/${product._id}`} className="px-3 py-2 border rounded-lg">View</Link>
      </div>
      <a
        href={`https://wa.me/7309083780?text=${encodeURIComponent(`Hi MJ CAKE HOUSE, I want to order ${product.name} for ₹${priceToShow}`)}`}
        target="_blank"
        rel="noreferrer"
        className="text-green-600 text-sm mt-2 inline-block"
      >
        Order on WhatsApp
      </a>
    </div>
  );
};

export default ProductCard;
