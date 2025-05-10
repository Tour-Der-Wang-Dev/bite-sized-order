
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  restaurantName: string;
}

export function MenuItem({
  id,
  name,
  description,
  price,
  imageUrl,
  restaurantId,
  restaurantName,
}: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleAddToCart = () => {
    addItem({ 
      id, 
      name, 
      description, 
      price, 
      imageUrl,
      restaurantId,
      restaurantName
    }, quantity);
    
    setQuantity(1);
  };
  
  return (
    <div className="food-card flex flex-col md:flex-row">
      {imageUrl && (
        <div className="w-full md:w-1/3 h-40">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold">${price.toFixed(2)}</span>
          
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={decrementQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-3">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button onClick={handleAddToCart} className="ml-4">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
