
import React from "react";
import { User } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Upload, Users, BarChart2, Video, Settings, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Mock data for admin dashboard
  const stats = [
    { label: "Total Courses", value: 24, icon: <BookOpen className="w-4 h-4" /> },
    { label: "Active Students", value: 2845, icon: <Users className="w-4 h-4" /> },
    { label: "Live Sessions", value: 3, icon: <Video className="w-4 h-4" /> },
    { label: "Course Completion", value: 76, icon: <BarChart2 className="w-4 h-4" /> },
  ];

  const recentCourses = [
    { 
      id: 1, 
      title: "Advanced React Development",
      students: 342,
      progress: 100,
    },
    { 
      id: 2, 
      title: "Full-Stack JavaScript Masterclass",
      students: 285,
      progress: 80,
    },
    { 
      id: 3, 
      title: "UI/UX Design Principles",
      students: 512,
      progress: 65,
    },
  ];

  // Navigate to specific admin pages
  const handleCreateCourse = () => {
    navigate("/admin/courses/create");
  };

  const handleLiveSession = () => {
    navigate("/admin/live-session");
  };
  
  const handleBatchMessaging = () => {
    navigate("/admin/messaging");
  };

  const handleAnalytics = () => {
    navigate("/admin/analytics");
  };
  
  // Navigate to platform settings pages
  const handleUserManagement = () => {
    navigate("/admin/user-management");
  };
  
  const handlePaymentSettings = () => {
    navigate("/admin/payment-settings");
  };
  
  const handleEmailTemplates = () => {
    navigate("/admin/email-templates");
  };
  
  const handleAdvancedSettings = () => {
    navigate("/admin/advanced-settings");
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/admin/analytics?course=${courseId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage your courses and students</CardDescription>
            </div>
            <Badge variant="outline" className="bg-pastel-purple-100 text-pastel-purple-700">
              Administrator
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-pastel-pink-50 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center bg-white w-10 h-10 rounded-full mx-auto mb-3 shadow-sm text-pastel-purple-500">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-pastel-purple-600">{stat.value}</div>
                <div className="text-sm text-pastel-purple-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                onClick={handleCreateCourse}
                className="bg-pastel-purple-300 hover:bg-pastel-purple-400 text-white h-auto py-4 flex flex-col items-center"
              >
                <Upload className="mb-2 h-5 w-5" />
                <span>Create Course</span>
              </Button>
              <Button 
                onClick={handleLiveSession}
                className="bg-pastel-blue-200 hover:bg-pastel-blue-300 text-pastel-blue-900 h-auto py-4 flex flex-col items-center"
              >
                <Video className="mb-2 h-5 w-5" />
                <span>Live Session</span>
              </Button>
              <Button 
                onClick={handleBatchMessaging}
                className="bg-pastel-green-200 hover:bg-pastel-green-300 text-pastel-green-900 h-auto py-4 flex flex-col items-center"
              >
                <MessageSquare className="mb-2 h-5 w-5" />
                <span>Batch Messages</span>
              </Button>
              <Button 
                onClick={handleAnalytics}
                className="bg-pastel-peach-200 hover:bg-pastel-peach-300 text-pastel-peach-900 h-auto py-4 flex flex-col items-center"
              >
                <BarChart2 className="mb-2 h-5 w-5" />
                <span>Analytics</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
          <CardDescription>Overview of your most recent courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="border rounded-lg p-4 hover:bg-pastel-purple-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{course.title}</h4>
                  <Badge variant="outline" className="bg-pastel-blue-50 text-pastel-blue-700">
                    {course.students} students
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCreateCourse}>Create New Course</Button>
          <Button variant="outline" onClick={handleAnalytics}>View All Courses</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Manage platform-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-pastel-purple-400" />
                <span>User Management</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUserManagement}
              >
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-pastel-purple-400" />
                <span>Payment Settings</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePaymentSettings}
              >
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-pastel-purple-400" />
                <span>Email Templates</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEmailTemplates}
              >
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleAdvancedSettings}
          >
            Advanced Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
