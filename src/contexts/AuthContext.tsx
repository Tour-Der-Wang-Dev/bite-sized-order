
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant' | 'driver' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('foodDeliveryUser');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login
      setTimeout(() => {
        const mockUser = {
          id: '123456',
          name: email.split('@')[0],
          email,
          role: 'customer' as const
        };
        
        localStorage.setItem('foodDeliveryUser', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful registration
      setTimeout(() => {
        const mockUser = {
          id: '123456',
          name,
          email,
          role: 'customer' as const
        };
        
        localStorage.setItem('foodDeliveryUser', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoading(false);
        
        toast({
          title: "Registration successful",
          description: `Welcome to Food Delivery, ${name}!`,
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again with different information.",
      });
    }
  };
  
  const logout = () => {
    localStorage.removeItem('foodDeliveryUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
