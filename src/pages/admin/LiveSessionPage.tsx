
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  ScreenShare, 
  MessageSquare, 
  Users, 
  SendHorizonal 
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { toast } from "sonner";

// Define batch and course types
interface Batch {
  id: string;
  name: string;
  course: string;
}

const LiveSessionPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [sessionTitle, setSessionTitle] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState<{user: string, message: string, time: string}[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Batch selection states
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [accessMode, setAccessMode] = useState<"all" | "specific">("all");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Use loading screen hook
  useLoadingScreen(isLoading, "Setting up your live session...", true, true);

  // Mock data
  const [viewers, setViewers] = useState<string[]>([]);
  
  // Mock courses and batches data
  const courses = [
    { id: "cs101", name: "Computer Science 101" },
    { id: "math201", name: "Advanced Mathematics" },
    { id: "phys150", name: "Physics Fundamentals" },
    { id: "bio220", name: "Biology & Life Sciences" },
  ];
  
  const batches: Record<string, Batch[]> = {
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

  // Simulate getting camera access when component mounts
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(error => {
          console.error("Error accessing camera and microphone:", error);
          toast.error("Could not access camera and microphone");
        });
    }
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle course selection
  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedBatches([]);
  };

  // Handle batch selection
  const handleBatchChange = (batchId: string) => {
    setSelectedBatches(prev => {
      if (prev.includes(batchId)) {
        return prev.filter(id => id !== batchId);
      } else {
        return [...prev, batchId];
      }
    });
  };

  // Handle access mode change
  const handleAccessModeChange = (mode: "all" | "specific") => {
    setAccessMode(mode);
    if (mode === "all") {
      setSelectedBatches([]);
    }
  };

  // Start live session
  const startLiveSession = () => {
    if (!sessionTitle) {
      toast.error("Please enter a session title");
      return;
    }

    if (accessMode === "specific" && selectedBatches.length === 0) {
      toast.error("Please select at least one batch");
      return;
    }

    // Show loading indicator
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLive(true);
      setIsLoading(false);
      
      // Display confirmation about which batches can access
      if (accessMode === "all") {
        toast.success("Live session started for all students!");
      } else {
        const selectedCourseObj = courses.find(c => c.id === selectedCourse);
        const batchNames = selectedBatches.map(bId => {
          const batch = Object.values(batches).flat().find(b => b.id === bId);
          return batch?.name || '';
        }).join(", ");
        
        toast.success(`Live session started for ${selectedCourseObj?.name} - Batch${selectedBatches.length > 1 ? 'es' : ''}: ${batchNames}`);
      }
      
      // Simulate viewers joining based on selected batches
      simulateViewersJoining();
    }, 2000);
  };

  // End live session
  const endLiveSession = () => {
    setIsLive(false);
    setViewers([]);
    toast.info("Live session ended");
    setSelectedBatches([]);
    setAccessMode("all");
  };

  // Toggle microphone
  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn);
    toast(isMicOn ? "Microphone muted" : "Microphone unmuted");
  };

  // Toggle camera
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast(isCameraOn ? "Camera turned off" : "Camera turned on");
  };

  // Toggle screen sharing
  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    toast(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");
  };

  // Send chat message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChatMessages([
      ...chatMessages,
      { user: user?.name || "Instructor", message: newMessage, time }
    ]);
    
    setNewMessage("");
  };

  // Handle chat input submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Simulate viewers joining (for demo purposes)
  const simulateViewersJoining = () => {
    const studentNames = [
      "Sarah Johnson", 
      "Michael Lee", 
      "Emma Rodriguez", 
      "David Kim", 
      "Olivia Chen",
      "James Wilson",
      "Sophia Martinez",
      "Daniel Taylor",
      "Ava Brown",
      "Ethan Davis"
    ];
    
    // Filter students based on batch selection
    let availableStudents = [...studentNames];
    if (accessMode === "specific" && selectedBatches.length > 0) {
      // Simulate that each batch has specific students
      // For demo, we'll just limit the number of students based on batches selected
      availableStudents = studentNames.slice(0, 2 + selectedBatches.length * 2);
    }
    
    // Add viewers gradually
    let count = 0;
    const interval = setInterval(() => {
      if (count < availableStudents.length) {
        setViewers(prev => [...prev, availableStudents[count]]);
        
        // Add chat messages from students
        if (count % 2 === 0) {
          const now = new Date();
          const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
          const messages = [
            "Hi professor, excited for today's session!",
            "Can you explain the last concept again?",
            "This is really helpful, thank you!",
            "When will the next assignment be due?",
            "Could you share the slides after the session?"
          ];
          
          setChatMessages(prev => [
            ...prev, 
            { 
              user: availableStudents[count], 
              message: messages[Math.floor(Math.random() * messages.length)], 
              time 
            }
          ]);
        }
        
        count++;
      } else {
        clearInterval(interval);
      }
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding bg-gray-50">
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
            <h1 className="text-3xl font-bold">Live Session</h1>
          </div>
          
          {!isLive ? (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Start a New Live Session</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sessionTitle">Session Title</Label>
                  <Input 
                    id="sessionTitle"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                    placeholder="e.g., Q&A Session: Deep Learning Applications"
                    className="mt-1"
                    required
                  />
                </div>
                
                {/* Course & Batch Selection */}
                <div className="space-y-4 bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h3 className="font-medium text-blue-800">Session Access Control</h3>
                  
                  <RadioGroup 
                    value={accessMode} 
                    onValueChange={(value) => handleAccessModeChange(value as "all" | "specific")}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">Available to all students</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="specific" />
                      <Label htmlFor="specific">Available to specific batches only</Label>
                    </div>
                  </RadioGroup>
                  
                  {accessMode === "specific" && (
                    <div className="space-y-4 pl-6 pt-2">
                      <div>
                        <Label htmlFor="course">Select Course</Label>
                        <Select 
                          value={selectedCourse} 
                          onValueChange={handleCourseChange}
                        >
                          <SelectTrigger id="course" className="w-full mt-1">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {selectedCourse && (
                        <div>
                          <Label className="block mb-2">Select Batches</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {batches[selectedCourse].map(batch => (
                              <div key={batch.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={batch.id} 
                                  checked={selectedBatches.includes(batch.id)}
                                  onCheckedChange={() => handleBatchChange(batch.id)}
                                />
                                <Label htmlFor={batch.id}>Batch {batch.name}</Label>
                              </div>
                            ))}
                          </div>
                          {selectedBatches.length === 0 && accessMode === "specific" && (
                            <p className="text-sm text-amber-600 mt-2">Please select at least one batch.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="bg-teal-50 p-4 rounded-md border border-teal-200">
                  <h3 className="font-medium text-teal-800 mb-2 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-teal-600" />
                    Camera Preview
                  </h3>
                  <div className="aspect-video bg-black rounded-md overflow-hidden">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    ></video>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={startLiveSession}
                    className="bg-blue-600 hover:bg-blue-700 py-6 px-8"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Start Live Session
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main stream area */}
              <div className="md:col-span-2 space-y-4">
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="font-semibold text-lg flex items-center">
                        {sessionTitle}
                        <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                          LIVE
                        </span>
                      </h2>
                      {accessMode === "specific" && (
                        <p className="text-xs text-gray-500">
                          {courses.find(c => c.id === selectedCourse)?.name} - 
                          Batch{selectedBatches.length > 1 ? 'es' : ''}: {
                            selectedBatches.map(bId => {
                              const batch = Object.values(batches).flat().find(b => b.id === bId);
                              return batch?.name || '';
                            }).join(", ")
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{viewers.length} viewers</span>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-black rounded-md overflow-hidden mb-4">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted={!isMicOn} 
                      playsInline
                      className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
                    ></video>
                    
                    {!isCameraOn && (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <CameraOff className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant={isMicOn ? "default" : "outline"}
                      onClick={toggleMicrophone}
                      className={isMicOn ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={isCameraOn ? "default" : "outline"}
                      onClick={toggleCamera}
                      className={isCameraOn ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      {isCameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant={isScreenSharing ? "default" : "outline"}
                      onClick={toggleScreenSharing}
                      className={isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      <ScreenShare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={endLiveSession}
                    >
                      End Stream
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Viewers ({viewers.length})</h3>
                  <div className="max-h-40 overflow-y-auto">
                    {viewers.length > 0 ? (
                      <ul className="space-y-1">
                        {viewers.map((viewer, index) => (
                          <li key={index} className="text-sm flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{viewer}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No viewers yet</p>
                    )}
                  </div>
                </Card>
              </div>
              
              {/* Chat area */}
              <div className="md:col-span-1">
                <Card className="h-full flex flex-col">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Live Chat
                    </h3>
                  </div>
                  
                  <div 
                    ref={chatContainerRef}
                    className="flex-grow p-4 overflow-y-auto max-h-[500px]"
                  >
                    {chatMessages.length > 0 ? (
                      <div className="space-y-4">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className="flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">
                                {msg.user === user?.name ? "You" : msg.user}
                              </span>
                              <span className="text-xs text-gray-500">{msg.time}</span>
                            </div>
                            <p className="text-sm bg-gray-100 p-2 rounded-md">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <p>No messages yet</p>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <form 
                    onSubmit={handleChatSubmit}
                    className="p-4 flex items-center space-x-2"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow"
                    />
                    <Button 
                      type="submit"
                      size="icon"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <SendHorizonal className="h-4 w-4" />
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveSessionPage;
