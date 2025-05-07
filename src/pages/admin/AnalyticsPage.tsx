
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BarChart, 
  TrendingUp, 
  Users, 
  Percent, 
  Calendar, 
  Star,
  Download
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  // Redirect to login if not authenticated or not an admin
  useEffect(() => {
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

  // Mock data for charts
  const enrollmentData = [
    { name: 'Jan', count: 65 },
    { name: 'Feb', count: 78 },
    { name: 'Mar', count: 90 },
    { name: 'Apr', count: 110 },
    { name: 'May', count: 142 },
    { name: 'Jun', count: 160 },
    { name: 'Jul', count: 185 },
    { name: 'Aug', count: 201 },
    { name: 'Sep', count: 240 },
    { name: 'Oct', count: 278 },
    { name: 'Nov', count: 304 },
    { name: 'Dec', count: 348 },
  ];

  const coursePopularityData = [
    { name: 'Advanced Machine Learning', students: 428 },
    { name: 'Deep Learning Fundamentals', students: 325 },
    { name: 'Natural Language Processing', students: 287 },
    { name: 'Computer Vision', students: 210 },
    { name: 'Reinforcement Learning', students: 180 },
  ];

  const completionRateData = [
    { name: 'Completed', value: 68 },
    { name: 'In Progress', value: 24 },
    { name: 'Not Started', value: 8 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4200 },
    { name: 'Feb', revenue: 5100 },
    { name: 'Mar', revenue: 4800 },
    { name: 'Apr', revenue: 5600 },
    { name: 'May', revenue: 6800 },
    { name: 'Jun', revenue: 7200 },
    { name: 'Jul', revenue: 8500 },
    { name: 'Aug', revenue: 9200 },
    { name: 'Sep', revenue: 10500 },
    { name: 'Oct', revenue: 11800 },
    { name: 'Nov', revenue: 12500 },
    { name: 'Dec', revenue: 14200 },
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  // Monthly overview metrics
  const overviewMetrics = {
    totalStudents: 1840,
    newStudents: 128,
    totalRevenue: "$14,200",
    completionRate: "68%",
    averageRating: 4.7
  };

  // Handle export data
  const exportData = (format: string) => {
    toast.success(`Exporting analytics data as ${format.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportData('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
          
          {/* Monthly overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4 flex flex-col items-center">
              <Users className="h-5 w-5 text-teal-600 mb-2" />
              <span className="text-sm text-gray-500">Total Students</span>
              <span className="text-2xl font-bold">{overviewMetrics.totalStudents}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <TrendingUp className="h-5 w-5 text-teal-600 mb-2" />
              <span className="text-sm text-gray-500">New Students</span>
              <span className="text-2xl font-bold">+{overviewMetrics.newStudents}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <BarChart className="h-5 w-5 text-teal-600 mb-2" />
              <span className="text-sm text-gray-500">Monthly Revenue</span>
              <span className="text-2xl font-bold">{overviewMetrics.totalRevenue}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <Percent className="h-5 w-5 text-teal-600 mb-2" />
              <span className="text-sm text-gray-500">Completion Rate</span>
              <span className="text-2xl font-bold">{overviewMetrics.completionRate}</span>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <Star className="h-5 w-5 text-teal-600 mb-2" fill="currentColor" />
              <span className="text-sm text-gray-500">Average Rating</span>
              <span className="text-2xl font-bold">{overviewMetrics.averageRating}</span>
            </Card>
          </div>
          
          {/* Charts */}
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="mb-6 grid grid-cols-4 w-full">
              <TabsTrigger value="students" className="text-center">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="courses" className="text-center">
                <Calendar className="h-4 w-4 mr-2" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="completion" className="text-center">
                <Percent className="h-4 w-4 mr-2" />
                Completion
              </TabsTrigger>
              <TabsTrigger value="revenue" className="text-center">
                <BarChart className="h-4 w-4 mr-2" />
                Revenue
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Student Enrollments</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={enrollmentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Students Enrolled" 
                        stroke="#0088FE" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Student Demographics</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Demographic data visualization would be shown here</p>
                  </div>
                </Card>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Student Engagement</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Engagement metrics visualization would be shown here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Course Popularity</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart
                      data={coursePopularityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="students" 
                        name="Enrolled Students" 
                        fill="#0088FE" 
                      />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Course Ratings</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Course ratings visualization would be shown here</p>
                  </div>
                </Card>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Course Content Analysis</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Content analysis visualization would be shown here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="completion" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Course Completion Rates</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionRateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {completionRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Completion By Course</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Course-specific completion data would be shown here</p>
                  </div>
                </Card>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Student Progress</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Student progress visualization would be shown here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Revenue']} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue ($)" 
                        stroke="#0088FE" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Revenue By Course</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Course-specific revenue data would be shown here</p>
                  </div>
                </Card>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Sales Conversion</h2>
                  <div className="text-center text-gray-500 py-10">
                    <p>Conversion rate visualization would be shown here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
