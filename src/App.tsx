
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { NavBar } from "@/components/NavBar";
import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/restaurants" element={<RestaurantsPage />} />
                  <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/orders/:id" element={<OrderDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <footer className="bg-gray-50 py-8 border-t mt-auto">
                <div className="container mx-auto px-4">
                  <div className="text-center">
                    <p className="text-gray-600">
                      &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
