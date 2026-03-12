import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('admin@mjcakehouse.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, true);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="container-main max-w-md bg-white p-6 rounded-xl shadow space-y-3">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input className="w-full border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full border rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full bg-pink-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
