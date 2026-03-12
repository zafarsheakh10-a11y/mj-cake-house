import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then(({ data }) => setOrders(data)).catch(() => {});
  }, []);

  return (
    <div className="container-main">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg p-4 shadow">
            <p className="font-semibold">{order.orderId} - {order.orderStatus}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
