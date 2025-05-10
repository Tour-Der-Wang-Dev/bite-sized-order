
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder } from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';

export default function CartPage() {
  const { items, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        name: item.restaurantName,
        items: []
      };
    }
    acc[item.restaurantId].items.push(item);
    return acc;
  }, {} as Record<string, { name: string, items: typeof items }>);
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to place an order",
        variant: "destructive"
      });
      navigate('/login', { state: { returnUrl: '/cart' } });
      return;
    }
    
    if (!address) {
      toast({
        title: "Address Required",
        description: "Please provide a delivery address",
        variant: "destructive"
      });
      return;
    }
    
    // For now, we only allow ordering from one restaurant at a time
    if (Object.keys(itemsByRestaurant).length > 1) {
      toast({
        title: "Multiple Restaurants",
        description: "Please place separate orders for different restaurants",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const restaurantId = Object.keys(itemsByRestaurant)[0];
      const restaurantName = itemsByRestaurant[restaurantId].name;
      
      // Create order (mock API call)
      if (user) {
        const orderItems = items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }));
        
        const order = createOrder(
          user.id,
          restaurantId,
          restaurantName,
          orderItems,
          total,
          address
        );
        
        // Clear cart after successful order
        clearCart();
        
        // Redirect to order confirmation page
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/orders/${order.id}`);
        }, 1500);
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "There was a problem creating your order. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8 text-gray-600">Add items to your cart to get started</p>
        <Button onClick={() => navigate("/restaurants")}>
          Browse Restaurants
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {Object.entries(itemsByRestaurant).map(([restaurantId, { name, items: restaurantItems }]) => (
            <div key={restaurantId} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{name}</h2>
              <div className="space-y-4">
                {restaurantItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </div>
          ))}
          
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="flex items-center text-xl font-semibold mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              Delivery Address
            </h2>
            <div className="space-y-4">
              <Textarea 
                placeholder="Enter your full address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
              
              <Input 
                placeholder="Add delivery instructions (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
