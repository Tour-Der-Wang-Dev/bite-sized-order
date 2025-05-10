
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
}: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart();
  
  const incrementQuantity = () => updateItemQuantity(id, quantity + 1);
  const decrementQuantity = () => updateItemQuantity(id, quantity - 1);
  
  return (
    <div className="flex items-center py-4 border-b">
      {imageUrl && (
        <div className="w-16 h-16 mr-4">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div className="flex-grow">
        <h4 className="font-medium text-base">{name}</h4>
        <div className="text-sm text-gray-600">${price.toFixed(2)}</div>
      </div>
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
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-gray-400 hover:text-red-500"
          onClick={() => removeItem(id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
