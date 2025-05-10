
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getOrdersByUserId, Order } from '@/services/mockData';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/orders' } });
      return;
    }
    
    // Get user orders
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
    }
  }, [user, isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Redirecting to login
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-teal-100 text-teal-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No orders yet</h1>
        <p className="mb-8 text-gray-600">You haven't placed any orders yet</p>
        <Button onClick={() => navigate("/restaurants")}>
          Browse Restaurants
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {orders.map((order) => (
          <Link
            to={`/orders/${order.id}`}
            key={order.id}
            className="block border-b last:border-0 p-6 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-1">
                  <span className="font-semibold mr-2">{order.restaurantName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.currentStatus.status)}`}>
                    {order.currentStatus.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="text-sm">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • 
                  <span className="font-medium"> ${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
