
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import MessageBubble from "@/components/messaging/MessageBubble";
import FileUploader from "@/components/messaging/FileUploader";

const StudentMessagesPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [messageInput, setMessageInput] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedBatch, setSelectedBatch] = useState<string>("Advanced Machine Learning");

  // Mock message data
  const mockBatches = [
    { id: "batch1", name: "Advanced Machine Learning", instructor: "Dr. Alex Johnson" },
    { id: "batch2", name: "Data Visualization with Python", instructor: "Prof. Sarah Miller" }
  ];

  const mockMessages = [
    {
      id: "msg1",
      sender: "Dr. Alex Johnson",
      content: "Hello everyone! I've uploaded the materials for tomorrow's lecture. Please review them before class.",
      timestamp: "9:30 AM",
      type: "text" as const
    },
    {
      id: "msg2",
      sender: "Dr. Alex Johnson",
      content: "Also, remember to complete the assignment due this Friday.",
      timestamp: "9:32 AM",
      type: "text" as const
    },
    {
      id: "file1",
      sender: "Dr. Alex Johnson",
      content: "",
      fileName: "Lecture_Notes_Week5.pdf",
      fileUrl: "#",
      timestamp: "9:33 AM",
      type: "file" as const
    }
  ];

  // Check authentication
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access messages");
    }
  }, [isAuthenticated, navigate]);

  // Function to handle file selection
  const handleFileSelected = (file: File) => {
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      toast.success(`Your file "${file.name}" request has been sent to the administrator`);
      setIsUploading(false);
    }, 1500);
  };

  // Function to request sending a message
  const requestToSendMessage = () => {
    if (messageInput.trim()) {
      toast.success("Your message request has been sent to the administrator");
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Class Messages</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Batch list sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Your Courses</h2>
                <div className="space-y-2">
                  {mockBatches.map((batch) => (
                    <div 
                      key={batch.id} 
                      className={`p-3 rounded-md cursor-pointer transition-all ${
                        selectedBatch === batch.name 
                          ? 'bg-green-100 border-l-4 border-green-500' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedBatch(batch.name)}
                    >
                      <h3 className="font-medium">{batch.name}</h3>
                      <p className="text-xs text-gray-600">{batch.instructor}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Chat section */}
            <div className="lg:col-span-3">
              <Card className="p-0 overflow-hidden">
                {/* Chat header */}
                <div className="bg-green-500 p-4 text-white">
                  <h2 className="text-lg font-medium">{selectedBatch}</h2>
                  <p className="text-sm">Course announcements and communications</p>
                </div>
                
                {/* Messages container */}
                <div className="h-[500px] flex flex-col">
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
                    <FileUploader 
                      onFileSelected={handleFileSelected} 
                      isUploading={isUploading} 
                    />
                    
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
              
              <div className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> As a student, you can request to send messages to the class chat. 
                  Your requests will be reviewed by course administrators before being posted to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentMessagesPage;
