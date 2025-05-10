
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/components/MenuItem';
import { getRestaurantById, getMenuItemsByRestaurantId } from '@/services/mockData';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get restaurant details
  const restaurant = getRestaurantById(id || "");
  
  // Get menu items for this restaurant
  const menuItems = id ? getMenuItemsByRestaurantId(id) : [];
  
  // Create menu categories from items
  const menuCategories = menuItems.reduce((acc, item) => {
    const category = item.name.includes("Pizza") ? "Pizza" : 
                     item.name.includes("Burger") ? "Burgers" :
                     item.name.includes("Sushi") || item.name.includes("Roll") ? "Sushi" :
                     item.name.includes("Taco") ? "Tacos" :
                     item.name.includes("Chicken") ? "Chicken" :
                     "Sides & Drinks";
    
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, [] as string[]);
  
  // Filter items by selected category
  const filteredItems = selectedCategory
    ? menuItems.filter(item => {
        const category = item.name.includes("Pizza") ? "Pizza" : 
                         item.name.includes("Burger") ? "Burgers" :
                         item.name.includes("Sushi") || item.name.includes("Roll") ? "Sushi" :
                         item.name.includes("Taco") ? "Tacos" :
                         item.name.includes("Chicken") ? "Chicken" :
                         "Sides & Drinks";
        return category === selectedCategory;
      })
    : menuItems;
  
  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Restaurant not found</h1>
        <Button onClick={() => navigate("/restaurants")}>
          Browse Other Restaurants
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Restaurant Cover Image */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        <img 
          src={restaurant.coverImageUrl || restaurant.imageUrl} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <span>•</span>
            <span>{restaurant.cuisine}</span>
          </div>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-y-4">
          <div className="w-full md:w-1/3 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-food-primary" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-food-primary" />
            <span>{restaurant.address}</span>
          </div>
          <div className="w-full md:w-1/3 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-food-primary" />
            <span>{restaurant.phone}</span>
          </div>
        </div>
        
        {/* Menu Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              All
            </Button>
            {menuCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
              restaurantId={item.restaurantId}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
