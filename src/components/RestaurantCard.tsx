
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
}

export function RestaurantCard({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
}: RestaurantCardProps) {
  return (
    <Link to={`/restaurants/${id}`}>
      <div className="food-card h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className="badge badge-primary flex items-center">
              <Star className="h-3 w-3 mr-1" /> {rating}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{cuisine}</p>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>{deliveryTime}</span>
            </div>
            <span className="text-sm">{deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
