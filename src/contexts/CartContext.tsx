
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  restaurantName: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + deliveryFee + tax;
  
  const addItem = (item: MenuItem, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });
    
    toast({
      description: `Added ${quantity} ${item.name} to your cart.`,
    });
  };
  
  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    toast({
      description: `Item removed from your cart.`,
    });
  };
  
  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        tax,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
