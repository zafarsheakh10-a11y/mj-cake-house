import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="container-main max-w-md bg-white p-6 rounded-xl shadow space-y-3">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input className="w-full border rounded p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="w-full border rounded p-2" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full bg-pink-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
