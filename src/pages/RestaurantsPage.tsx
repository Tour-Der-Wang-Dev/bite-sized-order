
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RestaurantCard } from '@/components/RestaurantCard';
import { restaurants } from '@/services/mockData';

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCuisine = searchParams.get('cuisine') || '';
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [sortBy, setSortBy] = useState("rating");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  
  // Get unique cuisines for filter
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  
  // Filter and sort restaurants
  useEffect(() => {
    let filtered = [...restaurants];
    
    // Apply cuisine filter
    if (selectedCuisine) {
      filtered = filtered.filter(r => r.cuisine === selectedCuisine);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      filtered.sort((a, b) => {
        const getMinutes = (time: string) => {
          const match = time.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getMinutes(a.deliveryTime) - getMinutes(b.deliveryTime);
      });
    }
    
    setFilteredRestaurants(filtered);
    
    // Update URL params
    if (selectedCuisine) {
      setSearchParams({ cuisine: selectedCuisine });
    } else {
      setSearchParams({});
    }
  }, [selectedCuisine, searchQuery, sortBy, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic is already handled by the useEffect
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input 
                type="search" 
                placeholder="Search for restaurants..." 
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex gap-3">
              <div className="w-full md:w-48">
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cuisines</SelectItem>
                    {cuisines.map((cuisine, index) => (
                      <SelectItem key={index} value={cuisine}>{cuisine}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Results */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No restaurants found</h2>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
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
      )}
    </div>
  );
}
