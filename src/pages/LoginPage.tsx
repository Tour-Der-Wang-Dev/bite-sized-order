
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface LocationState {
  returnUrl?: string;
}

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const returnUrl = state?.returnUrl || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({
      email: '',
      password: '',
      form: '',
    });
    
    try {
      // Validate form input
      loginSchema.parse({ email, password });
      
      // Login
      await login(email, password);
      
      // Navigate to return URL or home
      navigate(returnUrl);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0] || '',
          password: fieldErrors.password?.[0] || '',
          form: '',
        });
      } else {
        setErrors({
          email: '',
          password: '',
          form: 'Failed to login. Please check your credentials.',
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In to FoodHub</h1>
          
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t">
          <p className="text-center text-sm text-gray-600">
            For demo purposes, you can use any email/password
          </p>
        </div>
      </div>
    </div>
  );
}
