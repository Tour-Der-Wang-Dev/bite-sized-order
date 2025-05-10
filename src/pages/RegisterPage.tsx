
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface LocationState {
  returnUrl?: string;
}

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const returnUrl = state?.returnUrl || '/';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
    });
    
    try {
      // Validate form input
      registerSchema.parse({ name, email, password, confirmPassword });
      
      // Register user
      await register(name, email, password);
      
      // Navigate to return URL or home
      navigate(returnUrl);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0] || '',
          email: fieldErrors.email?.[0] || '',
          password: fieldErrors.password?.[0] || '',
          confirmPassword: fieldErrors.confirmPassword?.[0] || '',
          form: '',
        });
      } else {
        setErrors({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          form: 'Failed to register. Please try again.',
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
          
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Button variant="link" className="p-0" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t">
          <p className="text-center text-sm text-gray-600">
            By signing up, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
