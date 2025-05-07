
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, Search, UserCheck, UserX } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const UserManagementPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access this page");
      return;
    }

    if (user?.role !== "administrator") {
      navigate('/profile');
      toast.error("You don't have permission to access this page");
    }
  }, [isAuthenticated, user, navigate]);

  // Mock data for user listing
  const mockUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "student", status: "active" },
    { id: 2, name: "Michael Chen", email: "m.chen@example.com", role: "student", status: "active" },
    { id: 3, name: "Emily Rodriguez", email: "e.rodriguez@example.com", role: "student", status: "inactive" },
    { id: 4, name: "David Kim", email: "d.kim@example.com", role: "instructor", status: "active" },
    { id: 5, name: "Jennifer Smith", email: "j.smith@example.com", role: "administrator", status: "active" },
  ];

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">User Management</h1>
              <p className="text-pastel-purple-500">Manage all users on the platform</p>
            </div>
            <Button 
              onClick={() => navigate("/profile")}
              className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
            >
              Back to Dashboard
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Users Overview</CardTitle>
              <CardDescription>View and manage all user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-auto flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-pastel-purple-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8 border-pastel-purple-200 focus-visible:ring-pastel-purple-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="w-full md:w-auto bg-pastel-purple-300 hover:bg-pastel-purple-400">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-pastel-purple-100 text-left">
                      <th className="py-3 px-4 text-pastel-purple-700">Name</th>
                      <th className="py-3 px-4 text-pastel-purple-700">Email</th>
                      <th className="py-3 px-4 text-pastel-purple-700">Role</th>
                      <th className="py-3 px-4 text-pastel-purple-700">Status</th>
                      <th className="py-3 px-4 text-pastel-purple-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-pastel-purple-100 hover:bg-pastel-purple-50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4 capitalize">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'administrator' 
                              ? 'bg-pastel-purple-100 text-pastel-purple-700' 
                              : user.role === 'instructor' 
                                ? 'bg-pastel-blue-100 text-pastel-blue-700' 
                                : 'bg-pastel-pink-100 text-pastel-pink-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                            >
                              Edit
                            </Button>
                            {user.status === 'active' ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-200 text-red-700 hover:bg-red-50"
                              >
                                Deactivate
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-green-200 text-green-700 hover:bg-green-50"
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Actions</CardTitle>
              <CardDescription>Perform actions on multiple users at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate Selected
                </Button>
                <Button variant="outline" className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50">
                  <UserX className="mr-2 h-4 w-4" />
                  Deactivate Selected
                </Button>
                <Button variant="outline" className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50">
                  <Users className="mr-2 h-4 w-4" />
                  Change Role
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-pastel-purple-500">Selected users: 0</p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagementPage;
