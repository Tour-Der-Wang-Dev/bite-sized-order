
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  
  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-food-primary">FoodHub</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-food-primary transition">Home</Link>
            <Link to="/restaurants" className="text-gray-700 hover:text-food-primary transition">Restaurants</Link>
            <Link to="/orders" className="text-gray-700 hover:text-food-primary transition">My Orders</Link>
            
            {/* Auth/User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative" size="icon">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" className="relative" size="icon">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-food-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4">
              <Button variant="ghost" className="relative" size="icon">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-food-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} size="icon">
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/restaurants" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link 
                to="/orders" 
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-food-primary rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
