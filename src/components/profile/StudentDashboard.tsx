import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, BarChart3, ArrowRight, Download, Share, FileText, MessageSquare, Video, FileArchive } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/contexts/UserContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessageBubble from "@/components/messaging/MessageBubble";
import FileUploader from "@/components/messaging/FileUploader";

interface StudentDashboardProps {
  user: User;
}

// Mock data for the student dashboard
const mockMessages = [
  {
    id: "msg1",
    sender: "Dr. Alex Johnson",
    content: "Hello everyone! I've uploaded the materials for tomorrow's lecture. Please review them before class.",
    timestamp: "9:30 AM",
    type: "text"
  },
  {
    id: "msg2",
    sender: "Dr. Alex Johnson",
    content: "Also, remember to complete the assignment due this Friday.",
    timestamp: "9:32 AM",
    type: "text"
  },
  {
    id: "file1",
    sender: "Dr. Alex Johnson",
    content: "",
    fileName: "Lecture_Notes_Week5.pdf",
    fileUrl: "#",
    timestamp: "9:33 AM",
    type: "file"
  },
  {
    id: "msg3",
    sender: "Prof. Sarah Miller",
    content: "Hi class, we'll be discussing visualization techniques in our next session. Be prepared with questions!",
    timestamp: "Yesterday",
    type: "text"
  }
];

const mockLiveSessions = [
  {
    id: "live1",
    title: "Neural Networks Deep Dive",
    instructor: "Dr. Alex Johnson",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    course: "Advanced Machine Learning",
    status: "upcoming"
  },
  {
    id: "live2",
    title: "Interactive Dashboard Workshop",
    instructor: "Prof. Sarah Miller",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    course: "Data Visualization with Python",
    status: "upcoming"
  },
  {
    id: "live3",
    title: "Q&A Session: Mid-term Review",
    instructor: "Dr. Alex Johnson",
    date: "May 5, 2025",
    time: "3:00 PM - 4:30 PM",
    course: "Advanced Machine Learning",
    status: "scheduled"
  }
];

const mockAssignments = [
  {
    id: "assign1",
    title: "Neural Network Implementation",
    course: "Advanced Machine Learning",
    dueDate: "May 5, 2025",
    status: "pending",
    description: "Implement a basic neural network using PyTorch and train it on the MNIST dataset."
  },
  {
    id: "assign2",
    title: "Data Visualization Project",
    course: "Data Visualization with Python",
    dueDate: "May 10, 2025",
    status: "pending",
    description: "Create an interactive dashboard using Plotly to visualize the provided dataset."
  },
  {
    id: "assign3",
    title: "Regression Analysis",
    course: "Advanced Machine Learning",
    dueDate: "April 28, 2025",
    status: "submitted",
    submittedDate: "April 27, 2025",
    description: "Perform regression analysis on the housing dataset and evaluate different models."
  }
];

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Mock student data
  const currentCourses = [
    {
      id: "course1",
      title: "Advanced Machine Learning",
      instructor: "Dr. Alex Johnson",
      lessonsCount: 24,
      progress: 65,
      nextLesson: "Neural Networks Architecture",
    },
    {
      id: "course2",
      title: "Data Visualization with Python",
      instructor: "Prof. Sarah Miller",
      lessonsCount: 18,
      progress: 30,
      nextLesson: "Interactive Dashboards with Plotly",
    },
  ];

  const certificates = [
    {
      id: "cert1",
      title: "Introduction to Web Development",
      issueDate: "March 15, 2023",
      credentialId: "WD-2023-78945",
      pdfUrl: "#",
    },
    {
      id: "cert2",
      title: "UX Design Fundamentals",
      issueDate: "December 10, 2022",
      credentialId: "UX-2022-45612",
      pdfUrl: "#",
    },
  ];

  const recommendedCourses = [
    {
      id: "rec1",
      title: "Advanced Python Programming",
      instructor: "Dr. Michael Chen",
      category: "Programming",
      description: "Master advanced Python concepts including decorators, generators, and metaprogramming.",
    },
    {
      id: "rec2",
      title: "AI Ethics and Governance",
      instructor: "Prof. Elena Rodriguez",
      category: "Artificial Intelligence",
      description: "Explore the ethical implications of AI systems and governance frameworks.",
    },
  ];

  // Course actions
  const continueCourse = (courseId: string) => {
    const course = currentCourses.find(c => c.id === courseId);
    if (course) {
      toast.success(`Continuing ${course.title} - Loading ${course.nextLesson}...`);
      setSelectedCourse(courseId);
      // Navigate to course page
      navigate(`/courses/${courseId}/learn`);
    }
  };

  const viewCertificate = (certId: string) => {
    // Navigate to certificate page
    navigate(`/certificates/${certId}`);
  };
  
  const downloadCertificate = (format: string, certId: string) => {
    const cert = certificates.find(c => c.id === certId);
    if (cert) {
      toast.success(`Downloading ${cert.title} certificate as ${format}`);
      // In a real app, this would trigger an actual file download
    }
  };
  
  const shareCertificate = (certId: string) => {
    const cert = certificates.find(c => c.id === certId);
    if (cert) {
      // Copy verification link to clipboard
      navigator.clipboard.writeText(`https://luminalearn.com/verify/${cert.credentialId}`);
      toast.success("Certificate verification link copied to clipboard!");
    }
  };

  const enrollCourse = (courseId: string) => {
    const course = recommendedCourses.find(c => c.id === courseId);
    if (course) {
      toast.success(`Enrolled in ${course.title}! You can now access the course materials.`);
      // In a real app, this would update the database
    }
  };

  // Chat functions
  const requestToSendMessage = () => {
    if (messageInput.trim()) {
      toast.success("Your message request has been sent to the administrator");
      setMessageInput("");
    }
  };

  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    // Simulate file upload
    setTimeout(() => {
      toast.success(`Your file "${file.name}" request has been sent to the administrator`);
      setIsUploading(false);
    }, 1500);
  };

  // Live sessions functions
  const joinLiveSession = (sessionId: string) => {
    const session = mockLiveSessions.find(s => s.id === sessionId);
    if (session) {
      toast.success(`Joining live session: ${session.title}`);
      navigate(`/student/live-sessions/${sessionId}`);
    }
  };

  // Assignment functions
  const viewAssignment = (assignId: string) => {
    navigate(`/student/assignments/${assignId}`);
  };

  const submitAssignment = (assignId: string) => {
    navigate(`/student/assignments/${assignId}/submit`);
  };

  return (
    <div className="space-y-8">
      {/* Tabs for different sections */}
      <Tabs 
        defaultValue="overview" 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="live-sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview section */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-semibold">{user.joinDate}</p>
              </div>
              <div className="bg-secondary p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Courses Enrolled</p>
                <p className="font-semibold">{user.coursesEnrolled}</p>
              </div>
              <div className="bg-secondary p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="font-semibold">{user.coursesCompleted}</p>
              </div>
              <div className="bg-secondary p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="font-semibold">{2}</p>
              </div>
            </div>
          </Card>

          {/* Current courses section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div key={course.id} className={`p-4 border rounded-md transition-all ${selectedCourse === course.id ? 'border-teal-500 bg-teal-50' : 'hover:border-teal-400'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.instructor} • {course.lessonsCount} lessons</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="text-teal-600 font-medium">{course.progress}%</div>
                    </div>
                  </div>
                  <Progress 
                    value={course.progress} 
                    className="h-2 mt-2" 
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Next:</span> {course.nextLesson}
                    </div>
                    <Button 
                      variant="default" 
                      onClick={() => continueCourse(course.id)} 
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Continue Learning
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" onClick={() => navigate("/courses")}>
                Browse All Courses
              </Button>
            </div>
          </Card>
          
          {/* Certificates section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Certificates</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/certificates")}
                className="text-teal-600 hover:text-teal-700"
              >
                <Award className="mr-2 h-4 w-4" />
                View All Certificates
              </Button>
            </div>
            
            {certificates.length > 0 ? (
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-md bg-accent/50 hover:shadow-md transition-all">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{cert.title}</h3>
                        <p className="text-sm text-gray-600">Issued: {cert.issueDate}</p>
                        <p className="text-xs text-gray-500 mt-1">Credential ID: {cert.credentialId}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-teal-600"
                          onClick={() => viewCertificate(cert.id)}
                        >
                          <FileText size={16} className="mr-1" />
                          View Certificate
                        </Button>
                        
                        <div className="flex gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Download size={16} className="mr-1" />
                                Download
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => downloadCertificate('pdf', cert.id)}>
                                PDF Format
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => downloadCertificate('jpg', cert.id)}>
                                JPG Format
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => shareCertificate(cert.id)}
                          >
                            <Share size={16} className="mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-muted rounded-md">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">You haven't earned any certificates yet.</p>
                <p className="text-gray-500 text-sm">Complete courses to earn certificates.</p>
              </div>
            )}
          </Card>
          
          {/* Recommendations section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="border rounded-md p-4 hover:border-teal-400 card-hover">
                  <p className="text-xs text-teal-600 font-medium mb-1">{course.category}</p>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                  <p className="text-sm text-gray-500 mt-2 mb-4">{course.description}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={() => enrollCourse(course.id)}
                    >
                      Enroll Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Messages Tab Content */}
        <TabsContent value="messages">
          <Card className="p-0 overflow-hidden">
            <div className="bg-green-500 p-4 text-white">
              <h2 className="text-lg font-medium">Class Messages</h2>
              <p className="text-sm">Stay updated with your course announcements</p>
            </div>
            
            <div className="h-[400px] flex flex-col">
              {/* Messages container with WhatsApp-like pattern background */}
              <div 
                className="flex-grow p-4 overflow-y-auto space-y-4"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e5e5e5' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundColor: "#ECE5DD"
                }}
              >
                {mockMessages.map(message => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    isAdmin={false}
                  />
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t bg-white flex items-center gap-2">
                <FileUploader onFileSelected={handleFileSelected} isUploading={isUploading} />
                
                <input
                  type="text"
                  placeholder="Type a message request..."
                  className="flex-grow rounded-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && requestToSendMessage()}
                />
                
                <Button
                  onClick={requestToSendMessage}
                  variant="default"
                  size="icon"
                  className="rounded-full bg-green-500 hover:bg-green-600"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Only administrators can send messages to the chat.</p>
            <p>You can request to send a message or file, and an administrator will post it for you.</p>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/student/messages")}
            >
              View All Class Messages
            </Button>
          </div>
        </TabsContent>

        {/* Live Sessions Tab Content */}
        <TabsContent value="live-sessions">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Live Sessions</h2>
            
            <div className="space-y-4">
              {mockLiveSessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{session.title}</h3>
                      <p className="text-sm text-gray-600">
                        {session.course} • {session.instructor}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Video className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {session.date} at {session.time}
                        </span>
                      </div>
                    </div>
                    <div>
                      {session.status === "upcoming" ? (
                        <Button 
                          onClick={() => joinLiveSession(session.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Join Now
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            toast.success(`Reminder set for "${session.title}"`);
                          }}
                        >
                          Set Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {mockLiveSessions.length === 0 && (
              <div className="text-center py-12">
                <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Live Sessions Scheduled</h3>
                <p className="mt-2 text-gray-500">
                  Check back later for upcoming live sessions from your instructors.
                </p>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate("/student/live-sessions")}
              >
                View All Live Sessions
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Assignments Tab Content */}
        <TabsContent value="assignments">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Assignments</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-green-700 mb-3">Pending Assignments</h3>
                <div className="space-y-4">
                  {mockAssignments
                    .filter(a => a.status === "pending")
                    .map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4 hover:border-green-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.course}</p>
                          <p className="text-xs mt-1 text-red-500">
                            Due: {assignment.dueDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewAssignment(assignment.id)}
                          >
                            View Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => submitAssignment(assignment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2 border-t pt-2">
                        {assignment.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-blue-700 mb-3">Submitted Assignments</h3>
                <div className="space-y-4">
                  {mockAssignments
                    .filter(a => a.status === "submitted")
                    .map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.course}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                            <p className="text-xs text-blue-500">
                              Submitted on: {(assignment as any).submittedDate}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewAssignment(assignment.id)}
                          >
                            View Submission
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2 border-t pt-2">
                        {assignment.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate("/student/assignments")}
              >
                View All Assignments
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
