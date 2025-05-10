
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, reset values
      setName(user?.name || '');
      setEmail(user?.email || '');
    }
    setIsEditing(!isEditing);
  };
  
  const handleUpdate = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was a problem updating your profile."
      });
    }
  };
  
  if (!isAuthenticated || !user) {
    navigate('/login', { state: { returnUrl: '/profile' } });
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <Button 
                variant={isEditing ? "outline" : "default"}
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <Button 
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="mt-4"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/orders')}
            >
              View Order History
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/change-password')}
            >
              Change Password
            </Button>
            
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
