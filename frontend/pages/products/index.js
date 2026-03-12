import { useEffect, useState } from 'react';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(({ data }) => setProducts(data)).catch(() => {});
  }, []);

  return (
    <div className="container-main">
      <h1 className="text-3xl font-bold mb-4">All Cakes</h1>
      <div className="grid md:grid-cols-3 gap-4">{products.map((p) => <ProductCard key={p._id} product={p} />)}</div>
    </div>
  );
}
