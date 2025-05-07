
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search, Filter, Calendar, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AdminAssignmentsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [selectedTab, setSelectedTab] = useState<string>("active");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState<string>("");
  const [newAssignmentCourse, setNewAssignmentCourse] = useState<string>("");
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState<string>("");
  const [newAssignmentDescription, setNewAssignmentDescription] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");

  // Mock data
  const mockBatches = [
    { id: "batch1", name: "Advanced ML Batch 2025" },
    { id: "batch2", name: "Data Visualization Spring 2025" },
    { id: "batch3", name: "Web Development Cohort 4" }
  ];
  
  const mockCourses = [
    { id: "course1", name: "Advanced Machine Learning" },
    { id: "course2", name: "Data Visualization with Python" },
    { id: "course3", name: "Web Development Bootcamp" }
  ];

  const mockAssignments = [
    {
      id: "assign1",
      title: "Neural Network Implementation",
      course: "Advanced Machine Learning",
      batch: "Advanced ML Batch 2025",
      dueDate: "May 5, 2025",
      status: "active",
      totalStudents: 24,
      submissionsReceived: 5
    },
    {
      id: "assign2",
      title: "Data Visualization Project",
      course: "Data Visualization with Python",
      batch: "Data Visualization Spring 2025",
      dueDate: "May 10, 2025",
      status: "active",
      totalStudents: 18,
      submissionsReceived: 2
    },
    {
      id: "assign3",
      title: "Regression Analysis",
      course: "Advanced Machine Learning",
      batch: "Advanced ML Batch 2025",
      dueDate: "April 28, 2025",
      status: "completed",
      totalStudents: 24,
      submissionsReceived: 23
    }
  ];

  // Check authentication
  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== "administrator") {
      navigate('/login');
      toast.error("You don't have permission to access this page");
    }
  }, [isAuthenticated, navigate, user]);

  const createNewAssignment = () => {
    if (!newAssignmentTitle || !newAssignmentCourse || !newAssignmentDueDate || !selectedBatch) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Assignment "${newAssignmentTitle}" created and assigned to ${selectedBatch}`);
    setIsCreateDialogOpen(false);
    
    // Reset form fields
    setNewAssignmentTitle("");
    setNewAssignmentCourse("");
    setNewAssignmentDueDate("");
    setNewAssignmentDescription("");
    setSelectedBatch("");
  };

  const viewAssignmentSubmissions = (assignId: string) => {
    const assignment = mockAssignments.find(a => a.id === assignId);
    if (assignment) {
      navigate(`/admin/assignments/${assignId}/submissions`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Manage Assignments</h1>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
          
          <Card className="mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="Search assignments..." 
                  className="pl-9" 
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {mockBatches.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
          
          <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="active">Active Assignments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {mockAssignments.filter(a => a.status === "active").length > 0 ? (
                <div className="space-y-4">
                  {mockAssignments
                    .filter(a => a.status === "active")
                    .map((assignment) => (
                    <Card key={assignment.id} className="p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{assignment.title}</h3>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                              Active
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{assignment.course} • {assignment.batch}</p>
                          
                          <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center text-red-500 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                            
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{assignment.submissionsReceived}</span>
                              <span className="text-gray-500"> / {assignment.totalStudents} submitted</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/assignments/${assignment.id}`)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => viewAssignmentSubmissions(assignment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No Active Assignments</h3>
                  <p className="mt-2 text-gray-500">
                    Create a new assignment to get started.
                  </p>
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Create Assignment
                  </Button>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {mockAssignments.filter(a => a.status === "completed").length > 0 ? (
                <div className="space-y-4">
                  {mockAssignments
                    .filter(a => a.status === "completed")
                    .map((assignment) => (
                    <Card key={assignment.id} className="p-4 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{assignment.title}</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                              Completed
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{assignment.course} • {assignment.batch}</p>
                          
                          <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Due: {assignment.dueDate}</span>
                            </div>
                            
                            <div className="text-sm">
                              <span className="font-medium text-green-600">{assignment.submissionsReceived}</span>
                              <span className="text-gray-500"> / {assignment.totalStudents} submitted</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast.success(`Downloaded all submissions for "${assignment.title}"`);
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download All
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => viewAssignmentSubmissions(assignment.id)}
                          >
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No Completed Assignments</h3>
                  <p className="mt-2 text-gray-500">
                    Completed assignments will appear here.
                  </p>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="drafts">
              <Card className="p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Draft Assignments</h3>
                <p className="mt-2 text-gray-500">
                  Saved assignment drafts will appear here.
                </p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Create Assignment
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Create Assignment Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Assignment Title</label>
                  <Input
                    id="title"
                    value={newAssignmentTitle}
                    onChange={(e) => setNewAssignmentTitle(e.target.value)}
                    placeholder="Enter assignment title"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Course</label>
                    <Select value={newAssignmentCourse} onValueChange={setNewAssignmentCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Input
                      type="date"
                      value={newAssignmentDueDate}
                      onChange={(e) => setNewAssignmentDueDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign to Batch</label>
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBatches.map(batch => (
                        <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Assignment Description</label>
                  <Textarea
                    id="description"
                    value={newAssignmentDescription}
                    onChange={(e) => setNewAssignmentDescription(e.target.value)}
                    placeholder="Provide assignment details and instructions..."
                    rows={5}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewAssignment} className="bg-green-600 hover:bg-green-700">
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAssignmentsPage;
