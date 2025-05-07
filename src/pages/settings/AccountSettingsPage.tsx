
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Settings, Lock, KeyRound } from "lucide-react";


const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const { user ,ChangeInformation } = useUser();
  // change information
  const [name ,setName] = useState<string>('');
  const [email ,setEmail] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return null;
    }
    console.log("helloo");
    return () => {
      
    };
  }, []);

  const handleSaveProfile =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello");
    
    const changeInfo =  await ChangeInformation(name ,email);

    if(changeInfo){
      toast.success("Profile settings saved successfully");
    }else{
      toast.error("try again later");
    }
    
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success("Password updated successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Settings className="h-8 w-8 text-pastel-purple-600" />
            <h1 className="text-3xl font-bold text-pastel-purple-700">Account Settings</h1>
          </div>

          {/* Profile Settings */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-pastel-purple-700">Profile Information</h2>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={user.name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className="border-pastel-purple-200 focus-visible:ring-pastel-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    defaultValue={user.email}
                    className="border-pastel-purple-200 focus-visible:ring-pastel-purple-400"
                  />
                </div>
              </div>
              <Button 
                type="submit"
                className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
              >
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Password Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-pastel-purple-600" />
              <h2 className="text-xl font-semibold text-pastel-purple-700">Password</h2>
            </div>
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password"
                    className="border-pastel-purple-200 focus-visible:ring-pastel-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    className="border-pastel-purple-200 focus-visible:ring-pastel-purple-400"
                  />
                </div>
              </div>
              <Button 
                type="submit"
                className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
              >
                Update Password
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettingsPage;
