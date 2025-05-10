
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RestaurantCard } from '@/components/RestaurantCard';
import { restaurants } from '@/services/mockData';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter for popular restaurants (for demo, just show top rated)
  const popularRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);
  
  // Prepare cuisine categories
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-food-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Food delivery made easy</h1>
            <p className="text-lg mb-8">Order from your favorite restaurants and track your delivery in real-time.</p>
            
            <div className="relative max-w-lg mx-auto">
              <Input 
                type="search" 
                placeholder="Search for food or restaurant..." 
                className="w-full pl-10 pr-4 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Link to="/restaurants">
                <Button className="absolute right-1 top-1 rounded-full">Search</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Restaurants Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Restaurants</h2>
            <Link to="/restaurants" className="text-food-primary hover:underline flex items-center">
              See all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                imageUrl={restaurant.imageUrl}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                deliveryFee={restaurant.deliveryFee}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Cuisine Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Browse by Cuisine</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cuisines.map((cuisine, index) => (
              <Link to={`/restaurants?cuisine=${cuisine}`} key={index}>
                <Card className="hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-medium">{cuisine}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-food-light text-food-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Browse</h3>
              <p className="text-gray-600">Search for restaurants or browse by cuisine</p>
            </div>
            <div className="text-center">
              <div className="bg-food-light text-food-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Order</h3>
              <p className="text-gray-600">Select your food and place your order</p>
            </div>
            <div className="text-center">
              <div className="bg-food-light text-food-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enjoy</h3>
              <p className="text-gray-600">Track your order and enjoy your food</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
