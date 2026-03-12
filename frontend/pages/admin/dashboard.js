import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const initialProduct = {
  name: '', price: '', discountPrice: '', description: '', category: '', tags: '', stockQuantity: '', availabilityStatus: 'in-stock', images: [], video: '', customerReviews: ''
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialProduct);
  const [editId, setEditId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  const loadData = async () => {
    const [pRes, oRes] = await Promise.all([api.get('/products'), api.get('/orders')]);
    setProducts(pRes.data);
    setOrders(oRes.data);
  };

  useEffect(() => {
    if (user?.role === 'admin') loadData();
  }, [user]);

  const uploadAssets = async () => {
    let imageUrls = form.images || [];
    let videoUrl = form.video || '';

    if (imageFiles.length) {
      const fd = new FormData();
      imageFiles.forEach((f) => fd.append('images', f));
      const { data } = await api.post('/uploads/images', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      imageUrls = data.urls;
    }

    if (videoFile) {
      const fd = new FormData();
      fd.append('video', videoFile);
      const { data } = await api.post('/uploads/video', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      videoUrl = data.url;
    }

    return { imageUrls, videoUrl };
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const { imageUrls, videoUrl } = await uploadAssets();
    const payload = {
      name: form.name,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      description: form.description,
      category: form.category,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      stockQuantity: Number(form.stockQuantity),
      availabilityStatus: form.availabilityStatus,
      images: imageUrls,
      video: videoUrl,
      reviews: form.customerReviews ? [{ name: 'Admin Added', comment: form.customerReviews, rating: 5 }] : []
    };

    if (editId) await api.put(`/products/${editId}`, payload);
    else await api.post('/products', payload);

    setForm(initialProduct);
    setEditId('');
    setImageFiles([]);
    setVideoFile(null);
    loadData();
  };

  const onEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...product,
      tags: (product.tags || []).join(','),
      stockQuantity: product.stockQuantity,
      customerReviews: ''
    });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadData();
  };

  const updateStatus = async (id, orderStatus) => {
    await api.patch(`/orders/${id}/status`, { orderStatus });
    loadData();
  };

  const changePassword = async (e) => {
    e.preventDefault();
    await api.post('/auth/change-password', passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '' });
    alert('Password changed successfully');
  };

  if (!user || user.role !== 'admin') return <div className="container-main">Admin access only.</div>;

  return (
    <div className="container-main space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold mb-3">{editId ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={saveProduct} className="grid md:grid-cols-2 gap-3">
          {['name', 'price', 'discountPrice', 'category', 'stockQuantity'].map((field) => (
            <input key={field} required={field !== 'discountPrice'} value={form[field] ?? ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} placeholder={field} className="border rounded p-2" />
          ))}
          <select value={form.availabilityStatus} onChange={(e) => setForm({ ...form, availabilityStatus: e.target.value })} className="border rounded p-2">
            <option value="in-stock">in-stock</option>
            <option value="out-of-stock">out-of-stock</option>
          </select>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="tags comma separated" className="border rounded p-2" />
          <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="description" className="border rounded p-2 md:col-span-2" />
          <textarea value={form.customerReviews} onChange={(e) => setForm({ ...form, customerReviews: e.target.value })} placeholder="optional customer review (admin entry)" className="border rounded p-2 md:col-span-2" />
          <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} className="border rounded p-2" />
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="border rounded p-2" />
          <button className="bg-pink-600 text-white rounded p-2 md:col-span-2">{editId ? 'Update' : 'Create'} Product</button>
        </form>
      </section>

      <section className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className="border rounded p-3 flex justify-between items-center">
              <span>{p.name} - ₹{p.discountPrice || p.price}</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 bg-yellow-100 rounded" onClick={() => onEdit(p)}>Edit</button>
                <button className="px-2 py-1 bg-red-100 rounded" onClick={() => deleteProduct(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold mb-3">Orders</h2>
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="border rounded p-3">
              <p className="font-semibold">{o.orderId} - {o.customerName} ({o.phoneNumber})</p>
              <p>Total: ₹{o.totalAmount}</p>
              <select value={o.orderStatus} onChange={(e) => updateStatus(o._id, e.target.value)} className="border rounded p-1 mt-2">
                {['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-5 shadow max-w-md">
        <h2 className="text-xl font-semibold mb-3">Change Admin Password</h2>
        <form onSubmit={changePassword} className="space-y-2">
          <input type="password" className="w-full border rounded p-2" placeholder="Current password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
          <input type="password" className="w-full border rounded p-2" placeholder="New password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
          <button className="w-full bg-pink-600 text-white py-2 rounded">Change Password</button>
        </form>
      </section>
    </div>
  );
}
