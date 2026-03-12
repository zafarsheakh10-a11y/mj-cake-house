import { useEffect, useMemo, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data)).catch(() => {});
  }, []);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);
  const featured = products.slice(0, 6);

  return (
    <div className="container-main space-y-12">
      <section className="bg-gradient-to-r from-pink-100 to-white p-10 rounded-2xl text-center">
        <h1 className="text-4xl font-bold text-pink-600">Delicious Cakes, Freshly Baked</h1>
        <p className="mt-3">Welcome to MJ CAKE HOUSE - your celebration partner.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Cakes</h2>
        <div className="grid md:grid-cols-3 gap-4">{featured.map((p) => <ProductCard key={p._id} product={p} />)}</div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex gap-3 flex-wrap">{categories.map((c) => <span key={c} className="bg-white px-4 py-2 rounded-full shadow">{c}</span>)}</div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {products.flatMap((p) => p.reviews || []).slice(0, 4).map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm">⭐ {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold">About MJ Cake House</h2>
        <p className="mt-2">We specialize in custom cakes, designer pastries, and joyful moments baked with love.</p>
      </section>

      <section className="bg-pink-100 rounded-xl p-6">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p>Phone: 7007994127</p>
      </section>
    </div>
  );
}
