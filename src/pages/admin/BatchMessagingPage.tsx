import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  SendHorizonal,
  Mic,
  FileAudio,
  Settings,
  Info,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { toast } from "sonner";
import MessageBubble from "@/components/messaging/MessageBubble";
import FileUploader from "@/components/messaging/FileUploader";
import AudioRecorder from "@/components/messaging/AudioRecorder";
import BatchSelector from "@/components/messaging/BatchSelector";
import BatchManagementDialog from "@/components/messaging/BatchManagementDialog";

// Types for messages
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "audio";
  fileUrl?: string;
  fileName?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Mock data for courses and batches (same structure as in LiveSessionPage)
const courses = [
  { id: "cs101", name: "Computer Science 101" },
  { id: "math201", name: "Advanced Mathematics" },
  { id: "phys150", name: "Physics Fundamentals" },
  { id: "bio220", name: "Biology & Life Sciences" },
];

const batches: Record<string, { id: string; name: string; course: string }[]> = {
  "cs101": [
    { id: "cs101-a1", name: "A1", course: "cs101" },
    { id: "cs101-a2", name: "A2", course: "cs101" },
    { id: "cs101-b1", name: "B1", course: "cs101" },
    { id: "cs101-c1", name: "C1", course: "cs101" },
  ],
  "math201": [
    { id: "math201-m1", name: "M1", course: "math201" },
    { id: "math201-m2", name: "M2", course: "math201" },
    { id: "math201-m3", name: "M3", course: "math201" },
  ],
  "phys150": [
    { id: "phys150-p1", name: "P1", course: "phys150" },
    { id: "phys150-p2", name: "P2", course: "phys150" },
  ],
  "bio220": [
    { id: "bio220-b1", name: "B1", course: "bio220" },
    { id: "bio220-b2", name: "B2", course: "bio220" },
    { id: "bio220-b3", name: "B3", course: "bio220" },
    { id: "bio220-b4", name: "B4", course: "bio220" },
  ],
};

// Mock chat histories for batches
const mockChatHistory: Record<string, Message[]> = {
  "cs101-a1": [
    {
      id: "1",
      sender: "Admin",
      content: "Welcome to Computer Science 101 - A1 batch chat!",
      timestamp: "2025-05-01 09:00",
      type: "text"
    },
    {
      id: "2",
      sender: "Admin",
      content: "Today we'll be discussing data structures.",
      timestamp: "2025-05-01 09:05",
      type: "text"
    },
    {
      id: "3",
      sender: "Admin",
      content: "",
      timestamp: "2025-05-01 09:10",
      type: "file",
      fileUrl: "#",
      fileName: "DataStructures_Lesson1.pdf"
    }
  ],
  "math201-m2": [
    {
      id: "1",
      sender: "Admin",
      content: "Welcome to Advanced Mathematics - M2 batch chat!",
      timestamp: "2025-05-01 10:00",
      type: "text"
    },
    {
      id: "2",
      sender: "Admin",
      content: "",
      timestamp: "2025-05-01 10:15",
      type: "audio",
      fileUrl: "#",
      fileName: "Lecture_Recording_May1.mp3"
    }
  ]
};

// Mock students data
const mockStudents: Record<string, Student[]> = {
  "cs101-a1": [
    { id: "s1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "s2", name: "Bob Smith", email: "bob@example.com" },
    { id: "s3", name: "Charlie Davis", email: "charlie@example.com" },
    { id: "s4", name: "Diana Miller", email: "diana@example.com" },
    { id: "s5", name: "Edward Wilson", email: "edward@example.com" },
    { id: "s6", name: "Fiona Garcia", email: "fiona@example.com" },
    { id: "s7", name: "George Brown", email: "george@example.com" },
    { id: "s8", name: "Helen Martinez", email: "helen@example.com" },
  ],
  "cs101-a2": [
    { id: "s9", name: "Ian Robinson", email: "ian@example.com" },
    { id: "s10", name: "Julia Thompson", email: "julia@example.com" },
    { id: "s11", name: "Kevin Lee", email: "kevin@example.com" },
    { id: "s12", name: "Laura Walker", email: "laura@example.com" },
    { id: "s13", name: "Mike Anderson", email: "mike@example.com" },
    { id: "s14", name: "Natalie White", email: "natalie@example.com" },
    { id: "s15", name: "Oliver Thomas", email: "oliver@example.com" },
  ],
  "math201-m2": [
    { id: "s16", name: "Penny Clark", email: "penny@example.com" },
    { id: "s17", name: "Quinn Moore", email: "quinn@example.com" },
    { id: "s18", name: "Ryan Young", email: "ryan@example.com" },
    { id: "s19", name: "Sarah Hall", email: "sarah@example.com" },
    { id: "s20", name: "Tyler Allen", email: "tyler@example.com" },
    { id: "s21", name: "Uma Patel", email: "uma@example.com" },
  ]
};

// Initialize default student lists for all batches
Object.keys(batches).forEach(courseId => {
  batches[courseId].forEach(batch => {
    if (!mockStudents[batch.id]) {
      // Generate random students for batches without defined students
      mockStudents[batch.id] = Array.from({ length: 5 + Math.floor(Math.random() * 10) }, (_, i) => ({
        id: `${batch.id}-s${i}`,
        name: `Student ${i+1}`,
        email: `student${i+1}@example.com`
      }));
    }
  });
});

const BatchMessagingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // States for course and batch selection
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  
  // States for messaging
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // State for batch management
  const [managingBatchId, setManagingBatchId] = useState<string | null>(null);
  const [isManagementDialogOpen, setIsManagementDialogOpen] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useLoadingScreen(isLoading, "Loading chat history...", true);

  // Redirect if not authenticated or not admin
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history when batch changes
  useEffect(() => {
    if (selectedBatch) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setMessages(mockChatHistory[selectedBatch] || []);
        setStudents(mockStudents[selectedBatch] || []);
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedBatch]);

  // Handle course selection
  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedBatch("");
    setMessages([]);
  };

  // Handle batch selection
  const handleBatchChange = (batchId: string) => {
    setSelectedBatch(batchId);
  };

  // Handle batch management dialog
  const handleOpenManagement = (batchId: string) => {
    setManagingBatchId(batchId);
    setIsManagementDialogOpen(true);
  };

  // Handle click on the batch header
  const handleBatchHeaderClick = () => {
    if (selectedBatch) {
      handleOpenManagement(selectedBatch);
    }
  };

  // Batch management functions
  const handleBatchNameChange = (batchId: string, newName: string) => {
    // In a real app, this would update the batch name in the database
    // For now, we'll just update our local state
    const updatedBatches = { ...batches };
    const courseId = Object.keys(updatedBatches).find(courseId => 
      updatedBatches[courseId].some(batch => batch.id === batchId)
    );
    
    if (courseId) {
      const batchIndex = updatedBatches[courseId].findIndex(batch => batch.id === batchId);
      if (batchIndex !== -1) {
        updatedBatches[courseId][batchIndex].name = newName;
        // This is just to simulate an API update - in a real app you'd make an API call here
      }
    }
  };

  const handleStudentRemove = (batchId: string, studentId: string) => {
    // In a real app, this would update the database
    // For now, we'll just update our local state
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
    
    // Update mock data for later use
    mockStudents[batchId] = updatedStudents;
  };

  const handleStudentAdd = (batchId: string, studentEmail: string) => {
    // In a real app, this would send an invitation and update the database
    // For now, we'll just update our local state
    const newStudent: Student = {
      id: `new-${Date.now()}`,
      name: studentEmail.split('@')[0], // Use part before @ as name
      email: studentEmail
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    
    // Update mock data for later use
    mockStudents[batchId] = updatedStudents;
  };

  // Send text message
  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedBatch) return;
    
    const now = new Date();
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newMessage: Message = {
      id: `text-${Date.now()}`,
      sender: user?.name || "Admin",
      content: currentMessage,
      timestamp,
      type: "text"
    };
    
    setMessages([...messages, newMessage]);
    setCurrentMessage("");
    
    // In a real app, you would save this message to your backend
    toast.success("Message sent");
  };

  // Handle file upload
  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newMessage: Message = {
        id: `file-${Date.now()}`,
        sender: user?.name || "Admin",
        content: "",
        timestamp,
        type: "file",
        fileUrl: "#", // In a real app, this would be the URL from your file storage
        fileName: file.name
      };
      
      setMessages([...messages, newMessage]);
      setIsUploading(false);
      toast.success(`File uploaded`);
    }, 2000);
  };

  // Handle audio recording
  const handleAudioRecording = (audioBlob: Blob) => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newMessage: Message = {
        id: `audio-${Date.now()}`,
        sender: user?.name || "Admin",
        content: "",
        timestamp,
        type: "audio",
        fileUrl: URL.createObjectURL(audioBlob),
        fileName: `Voice message`
      };
      
      setMessages([...messages, newMessage]);
      setIsUploading(false);
      toast.success("Voice message sent");
    }, 1000);
  };

  // Toggle audio recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Get batch name
  const getBatchInfo = () => {
    if (!selectedCourse || !selectedBatch) return null;
    
    const course = courses.find(c => c.id === selectedCourse);
    const batch = batches[selectedCourse]?.find(b => b.id === selectedBatch);
    
    if (!course || !batch) return null;
    
    return {
      courseName: course.name,
      batchName: batch.name
    };
  };

  const batchInfo = getBatchInfo();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-180px)]">
            {/* Sidebar for batch selection */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:col-span-1 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">Batch Chats</h2>
              </div>

              <BatchSelector
                courses={courses}
                batches={batches}
                selectedCourse={selectedCourse}
                selectedBatch={selectedBatch}
                onCourseChange={handleCourseChange}
                onBatchChange={handleBatchChange}
                onBatchManage={handleOpenManagement}
              />
            </div>
            
            {/* Chat area */}
            <div className="bg-gray-50 md:col-span-3 rounded-lg shadow-sm flex flex-col h-full overflow-hidden border border-gray-200">
              {selectedBatch ? (
                <>
                  {/* Chat header - Now clickable */}
                  <div 
                    className="bg-green-600 text-white p-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-green-700 transition-colors"
                    onClick={handleBatchHeaderClick}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-sm">
                          {batchInfo?.courseName}
                        </h2>
                        <div className="text-xs flex items-center space-x-1 text-green-100">
                          <span>Batch {batchInfo?.batchName}</span>
                          <span>•</span>
                          <span>{students.length} students</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-200 hover:text-white hover:bg-green-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenManagement(selectedBatch);
                      }}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                  
                  {/* Background pattern for chat - WhatsApp style */}
                  <div 
                    className="flex-grow overflow-y-auto p-4 space-y-4"
                    style={{
                      backgroundImage: `linear-gradient(rgba(229, 242, 223, 0.07), rgba(229, 242, 223, 0.07)), 
                                      url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' fill='%23e0e0e0' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")`
                    }}
                  >
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <MessageBubble 
                          key={msg.id} 
                          message={msg} 
                          isAdmin={msg.sender === "Admin" || msg.sender === user?.name}
                        />
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <div className="text-center bg-white bg-opacity-70 p-6 rounded-lg shadow-sm">
                          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-3">
                            <MessageSquare className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">No messages yet</h3>
                          <p className="text-sm">Send your first message to this batch</p>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Audio recorder overlay */}
                  {isRecording && (
                    <div className="p-4 bg-red-50 border-t border-red-200">
                      <AudioRecorder 
                        onSave={handleAudioRecording}
                        onCancel={() => setIsRecording(false)}
                      />
                    </div>
                  )}
                  
                  {/* Message input area */}
                  <div className="bg-white p-3 border-t flex items-end space-x-2">
                    <div className="flex items-center space-x-1">
                      <FileUploader onFileSelected={handleFileUpload} isUploading={isUploading} />
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={isRecording ? "text-red-500" : "text-gray-600 hover:text-green-600 hover:bg-gray-100"}
                        onClick={toggleRecording}
                        disabled={isUploading}
                      >
                        {isRecording ? <FileAudio className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                    </div>
                    
                    <div className="flex-grow relative">
                      <Textarea
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="resize-none py-2 pr-12 min-h-[40px] max-h-[120px] rounded-full bg-gray-50 focus-visible:ring-green-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={isRecording || isUploading}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isRecording || isUploading}
                        className="absolute right-2 bottom-1 h-8 w-8 p-0 rounded-full bg-green-600 hover:bg-green-700"
                      >
                        <SendHorizonal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center p-6">
                    <div className="bg-green-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Select a batch to start chatting</h3>
                    <p className="text-gray-500 max-w-md">
                      Choose a course and batch from the sidebar to send messages, files, and voice recordings to your students.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Batch Management Dialog */}
      {isManagementDialogOpen && managingBatchId && selectedCourse && (
        <BatchManagementDialog
          open={isManagementDialogOpen}
          onClose={() => setIsManagementDialogOpen(false)}
          courseName={(courses.find(c => c.id === selectedCourse)?.name || "")}
          batchName={(batches[selectedCourse]?.find(b => b.id === managingBatchId)?.name || "")}
          batchId={managingBatchId}
          students={students}
          onBatchNameChange={handleBatchNameChange}
          onStudentRemove={handleStudentRemove}
          onStudentAdd={handleStudentAdd}
        />
      )}
    </div>
  );
};

export default BatchMessagingPage;
