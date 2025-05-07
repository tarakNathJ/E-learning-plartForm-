
import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Clock, Calendar, ChevronLeft, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const StudentAssignmentsPage = () => {
  const { assignId, submit } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [selectedTab, setSelectedTab] = useState<string>(assignId ? "details" : "pending");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Mock assignment data
  const mockAssignments = [
    {
      id: "assign1",
      title: "Neural Network Implementation",
      course: "Advanced Machine Learning",
      dueDate: "May 5, 2025",
      status: "pending",
      description: "Implement a basic neural network using PyTorch and train it on the MNIST dataset. Your submission should include the code, a brief report explaining your approach, and the results achieved.",
      instructions: "1. Use PyTorch for implementation\n2. Train on MNIST dataset\n3. Achieve at least 95% accuracy\n4. Submit code and report",
      submissionFormat: "ZIP file containing Python notebooks and PDF report"
    },
    {
      id: "assign2",
      title: "Data Visualization Project",
      course: "Data Visualization with Python",
      dueDate: "May 10, 2025",
      status: "pending",
      description: "Create an interactive dashboard using Plotly to visualize the provided dataset. The dashboard should include at least 3 different types of visualizations and allow for filtering the data.",
      instructions: "1. Use Plotly for visualization\n2. Create at least 3 different charts\n3. Implement interactive filtering\n4. Deploy dashboard online",
      submissionFormat: "GitHub repository link and PDF report"
    },
    {
      id: "assign3",
      title: "Regression Analysis",
      course: "Advanced Machine Learning",
      dueDate: "April 28, 2025",
      status: "submitted",
      submittedDate: "April 27, 2025",
      description: "Perform regression analysis on the housing dataset and evaluate different models. Compare at least 3 different approaches and analyze their strengths and weaknesses.",
      instructions: "1. Use the Boston Housing dataset\n2. Implement Linear Regression, Random Forest, and one other model\n3. Evaluate using RMSE and R² metrics\n4. Discuss the results",
      submissionFormat: "Jupyter notebook and 2-page report"
    }
  ];

  const currentAssignment = assignId ? mockAssignments.find(a => a.id === assignId) : null;
  
  // Check authentication
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access assignments");
    }
  }, [isAuthenticated, navigate]);

  // If a specific assignment was requested but not found
  React.useEffect(() => {
    if (assignId && !mockAssignments.some(a => a.id === assignId)) {
      toast.error("Assignment not found");
      navigate('/student/assignments');
    }
  }, [assignId, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please select a file to submit");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission process
    setTimeout(() => {
      toast.success(`Assignment "${currentAssignment?.title}" submitted successfully`);
      setIsSubmitting(false);
      navigate('/student/assignments');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            {assignId ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/student/assignments')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl md:text-3xl font-bold text-pastel-purple-700">
                  {currentAssignment?.title}
                </h1>
              </div>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Assignments</h1>
            )}
          </div>
          
          {assignId && currentAssignment ? (
            submit ? (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Submit Assignment: {currentAssignment.title}
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p className="font-medium">{currentAssignment.course}</p>
                  
                  <div className="mt-4 flex items-center gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                      <div className="flex items-center text-red-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{currentAssignment.dueDate}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Submission Format</h3>
                      <p>{currentAssignment.submissionFormat}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Upload Your Submission</h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-green-500 transition-colors" onClick={handleFileUploadClick}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    
                    {selectedFile ? (
                      <div>
                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="font-medium text-green-600">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button 
                          variant="ghost" 
                          className="mt-2 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                        >
                          Choose another file
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="font-medium">Click to upload file</p>
                        <p className="text-sm text-gray-500">
                          or drag and drop here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/student/assignments/${assignId}`)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!selectedFile || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Assignment'
                    )}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{currentAssignment.course}</p>
                    <h2 className="text-xl font-semibold">{currentAssignment.title}</h2>
                    
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">Due: {currentAssignment.dueDate}</span>
                      </div>
                      
                      {currentAssignment.status === "submitted" && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">Submitted: {(currentAssignment as any).submittedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    {currentAssignment.status === "pending" ? (
                      <Button 
                        onClick={() => navigate(`/student/assignments/${assignId}/submit`)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Submit Assignment
                      </Button>
                    ) : (
                      <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">Submitted</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Assignment Description</h3>
                    <p className="text-gray-700">{currentAssignment.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Submission Instructions</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {currentAssignment.instructions.split('\n').map((instruction, i) => (
                        <p key={i} className="text-sm mb-1">{instruction}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Submission Format</h3>
                    <p className="text-sm">{currentAssignment.submissionFormat}</p>
                  </div>
                </div>
                
                {currentAssignment.status === "pending" && (
                  <div className="mt-8 flex justify-end">
                    <Button 
                      onClick={() => navigate(`/student/assignments/${assignId}/submit`)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Assignment
                    </Button>
                  </div>
                )}
              </Card>
            )
          ) : (
            <div>
              <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="submitted">Submitted</TabsTrigger>
                  <TabsTrigger value="all">All Assignments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending">
                  {mockAssignments.filter(a => a.status === "pending").length > 0 ? (
                    <div className="space-y-4">
                      {mockAssignments
                        .filter(a => a.status === "pending")
                        .map((assignment) => (
                        <Card key={assignment.id} className="hover:shadow-md transition-all">
                          <div className="p-4 flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-gray-600">{assignment.course}</p>
                              
                              <div className="mt-2 flex items-center gap-2">
                                <Clock className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-500">Due: {assignment.dueDate}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                              >
                                View Details
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => navigate(`/student/assignments/${assignment.id}/submit`)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <CheckCircle className="mx-auto h-12 w-12 text-green-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Pending Assignments</h3>
                      <p className="mt-2 text-gray-500">
                        You're all caught up! Check back later for new assignments.
                      </p>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="submitted">
                  {mockAssignments.filter(a => a.status === "submitted").length > 0 ? (
                    <div className="space-y-4">
                      {mockAssignments
                        .filter(a => a.status === "submitted")
                        .map((assignment) => (
                        <Card key={assignment.id} className="p-4 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{assignment.title}</h3>
                              <p className="text-sm text-gray-600">{assignment.course}</p>
                              
                              <div className="mt-2 flex items-center gap-3">
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Submitted: {(assignment as any).submittedDate}</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                            >
                              View Submission
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Submitted Assignments</h3>
                      <p className="mt-2 text-gray-500">
                        You haven't submitted any assignments yet.
                      </p>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="space-y-4">
                    {mockAssignments.map((assignment) => (
                      <Card key={assignment.id} className="p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-gray-600">{assignment.course}</p>
                            
                            <div className="mt-2 flex items-center gap-3">
                              {assignment.status === "pending" ? (
                                <div className="flex items-center text-red-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Due: {assignment.dueDate}</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Submitted: {(assignment as any).submittedDate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/student/assignments/${assignment.id}`)}
                            >
                              View Details
                            </Button>
                            
                            {assignment.status === "pending" && (
                              <Button 
                                size="sm"
                                onClick={() => navigate(`/student/assignments/${assignment.id}/submit`)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Submit
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentAssignmentsPage;
