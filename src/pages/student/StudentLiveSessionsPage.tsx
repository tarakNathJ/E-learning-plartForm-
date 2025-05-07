
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Users, Calendar, Clock, MessageSquare } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentLiveSessionsPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [selectedTab, setSelectedTab] = useState<string>(sessionId ? "active" : "upcoming");
  const [chatMessage, setChatMessage] = useState<string>("");

  // Mock live session data
  const mockLiveSessions = [
    {
      id: "live1",
      title: "Neural Networks Deep Dive",
      instructor: "Dr. Alex Johnson",
      date: "Today",
      time: "2:00 PM - 3:30 PM",
      course: "Advanced Machine Learning",
      status: "active",
      participants: 24,
      description: "In this session, we'll explore advanced neural network architectures and their applications in modern AI systems."
    },
    {
      id: "live2",
      title: "Interactive Dashboard Workshop",
      instructor: "Prof. Sarah Miller",
      date: "Tomorrow",
      time: "10:00 AM - 12:00 PM",
      course: "Data Visualization with Python",
      status: "upcoming",
      participants: 18,
      description: "Learn how to create interactive dashboards using Plotly and deploy them as web applications."
    },
    {
      id: "live3",
      title: "Q&A Session: Mid-term Review",
      instructor: "Dr. Alex Johnson",
      date: "May 5, 2025",
      time: "3:00 PM - 4:30 PM",
      course: "Advanced Machine Learning",
      status: "scheduled",
      participants: 30,
      description: "Open Q&A session to address questions about topics covered in the mid-term exam."
    }
  ];

  // Mock chat messages for live session
  const mockChatMessages = [
    { id: "cm1", sender: "Dr. Alex Johnson", content: "Welcome everyone to our Neural Networks session!", time: "2:01 PM" },
    { id: "cm2", sender: "Sarah Wilson", content: "Thanks for organizing this session, Dr. Johnson!", time: "2:02 PM" },
    { id: "cm3", sender: "Michael Chen", content: "Quick question: Will we be covering LSTMs today?", time: "2:03 PM" },
    { id: "cm4", sender: "Dr. Alex Johnson", content: "Yes, Michael! We'll cover LSTM and GRU architectures in the second half.", time: "2:04 PM" }
  ];

  const activeSession = sessionId 
    ? mockLiveSessions.find(session => session.id === sessionId) 
    : mockLiveSessions.find(session => session.status === "active");
    
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access live sessions");
    }
  }, [isAuthenticated, navigate]);

  // If a specific session was requested but not found
  useEffect(() => {
    if (sessionId && !mockLiveSessions.some(s => s.id === sessionId)) {
      toast.error("Live session not found");
      navigate('/student/live-sessions');
    }
  }, [sessionId, navigate]);

  const joinSession = (session: any) => {
    toast.success(`Joining "${session.title}" live session`);
    navigate(`/student/live-sessions/${session.id}`);
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      toast.success("Message sent to the live session chat");
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Live Sessions</h1>
          </div>
          
          {activeSession && sessionId ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video area */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="bg-black aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="mx-auto h-16 w-16 mb-4" />
                      <h2 className="text-xl font-semibold mb-2">{activeSession.title}</h2>
                      <p className="text-gray-300">{activeSession.instructor}</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700">
                        Join Video Stream
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{activeSession.title}</h2>
                    <p className="text-gray-500">{activeSession.course} • {activeSession.instructor}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-green-600 mr-2" />
                        <span>{activeSession.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-green-600 mr-2" />
                        <span>{activeSession.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-green-600 mr-2" />
                        <span>{activeSession.participants} participants</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm">{activeSession.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Chat area */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="bg-green-500 p-3 text-white">
                    <h2 className="font-medium">Live Session Chat</h2>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto p-3 max-h-[400px]" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e5e5e5' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundColor: "#ECE5DD"
                    }}
                  >
                    {mockChatMessages.map((message) => (
                      <div key={message.id} className={`mb-3 ${message.sender === user?.name ? 'text-right' : ''}`}>
                        <div className={`inline-block rounded-lg p-2 max-w-[85%] ${
                          message.sender === user?.name
                            ? 'bg-green-100 rounded-tr-none text-left'
                            : 'bg-white shadow-sm rounded-tl-none'
                        }`}>
                          {message.sender !== user?.name && (
                            <p className="text-xs font-medium text-green-700">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-[10px] text-gray-500 text-right">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t bg-white">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow rounded-l-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                      />
                      <Button
                        onClick={sendChatMessage}
                        className="rounded-r-full bg-green-500 hover:bg-green-600"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div>
              <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="active">Active Now</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Sessions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  {mockLiveSessions.filter(s => s.status === "active").length > 0 ? (
                    <div className="space-y-6">
                      {mockLiveSessions
                        .filter(s => s.status === "active")
                        .map((session) => (
                        <Card key={session.id} className="p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <div className="flex items-center">
                                <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></span>
                                <span className="text-sm font-medium text-red-500">LIVE NOW</span>
                              </div>
                              <h3 className="text-xl font-semibold mt-1">{session.title}</h3>
                              <p className="text-gray-600">{session.course} • {session.instructor}</p>
                              
                              <div className="mt-2 flex items-center gap-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{session.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{session.participants} attending</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              onClick={() => joinSession(session)}
                              className="bg-red-500 hover:bg-red-600"
                              size="lg"
                            >
                              Join Now
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Live Sessions Currently</h3>
                      <p className="mt-2 text-gray-500">
                        Check the upcoming tab to see scheduled sessions.
                      </p>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <div className="space-y-4">
                    {mockLiveSessions
                      .filter(s => s.status === "upcoming" || s.status === "scheduled")
                      .map((session) => (
                      <Card key={session.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <p className="text-sm text-gray-600">{session.course} • {session.instructor}</p>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{session.date}</span>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{session.time}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            {session.status === "upcoming" ? (
                              <Button 
                                onClick={() => joinSession(session)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Join Session
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  toast.success(`Reminder set for "${session.title}"`);
                                }}
                              >
                                Set Reminder
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          {session.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="past">
                  <Card className="p-8 text-center">
                    <Video className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Past Sessions</h3>
                    <p className="mt-2 text-gray-500">
                      Recordings of past sessions will be available here.
                    </p>
                  </Card>
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

export default StudentLiveSessionsPage;
