import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="container-main max-w-md bg-white p-6 rounded-xl shadow space-y-3">
      <h1 className="text-2xl font-bold">Register</h1>
      {error && <p className="text-red-600">{error}</p>}
      {['name', 'email', 'phone', 'password'].map((field) => (
        <input key={field} type={field === 'password' ? 'password' : 'text'} className="w-full border rounded p-2" placeholder={field} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
      ))}
      <button className="w-full bg-pink-600 text-white py-2 rounded">Register</button>
    </form>
  );
}
