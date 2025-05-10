
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById, Order } from '@/services/mockData';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: `/orders/${id}` } });
      return;
    }
    
    if (id) {
      const foundOrder = getOrderById(id);
      
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [id, isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null; // Redirecting to login
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        <Button onClick={() => navigate("/orders")}>
          View All Orders
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  // Get list of possible statuses in order
  const statuses = [
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered'
  ];
  
  // Find current status index
  const currentStatusIndex = statuses.indexOf(order.currentStatus.status);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 pl-0"
        onClick={() => navigate("/orders")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
                <div className="text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-food-primary text-white text-sm font-medium">
                {order.currentStatus.status.replace('_', ' ')}
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="mb-8 relative">
              <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200"></div>
              <div className="relative flex justify-between">
                {statuses.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const statusTime = order.statusHistory.find(s => s.status === status)?.timestamp;
                  
                  return (
                    <div key={status} className="flex flex-col items-center relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                        isCompleted ? 'bg-food-primary' : 'bg-gray-200'
                      }`}>
                        {isCompleted && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <div className="text-xs mt-2 capitalize">
                        {status.replace('_', ' ')}
                      </div>
                      {statusTime && (
                        <div className="text-xs text-gray-500">
                          {new Date(statusTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Restaurant Info */}
            <div className="border-t pt-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">{order.restaurantName}</h2>
              <Button variant="outline" asChild>
                <Link to={`/restaurants/${order.restaurantId}`}>View Restaurant</Link>
              </Button>
            </div>
            
            {/* Delivery Address */}
            <div className="border-t pt-4 mb-6">
              <h2 className="flex items-center text-lg font-semibold mb-3">
                <MapPin className="h-5 w-5 mr-2 text-food-primary" />
                Delivery Address
              </h2>
              <p className="text-gray-700">{order.deliveryAddress}</p>
            </div>
            
            {/* Order Items */}
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-3">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {item.quantity} x {item.name}
                      </div>
                    </div>
                    <div className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${(order.totalPrice * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(order.totalPrice * 0.1 - 2.99).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            {order.currentStatus.status !== 'delivered' && (
              <div className="rounded-lg bg-gray-50 p-4 border">
                <h3 className="font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Delivery Status
                </h3>
                <p className="text-sm mt-2">
                  {order.currentStatus.status === 'preparing' 
                    ? "Your order is being prepared by the restaurant." 
                    : order.currentStatus.status === 'out_for_delivery'
                    ? "Your order is on the way!"
                    : "Your order has been received."}
                </p>
              </div>
            )}
            
            {order.currentStatus.status === 'delivered' && (
              <Button className="w-full" variant="outline" onClick={() => navigate(`/restaurants/${order.restaurantId}`)}>
                Order Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
