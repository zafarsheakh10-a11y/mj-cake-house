import '../styles/globals.css';
import Link from 'next/link';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider, useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container-main py-4 flex justify-between">
        <Link href="/" className="font-bold text-primaryPink text-xl">MJ CAKE HOUSE</Link>
        <div className="flex gap-4 items-center">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</Link>
          {user ? (
            <>
              <Link href="/orders">My Orders</Link>
              {user.role === 'admin' && <Link href="/admin/dashboard">Admin</Link>}
              <button onClick={logout} className="text-pink-600">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="py-6">
          <Component {...pageProps} />
        </main>
      </CartProvider>
    </AuthProvider>
  );
}
