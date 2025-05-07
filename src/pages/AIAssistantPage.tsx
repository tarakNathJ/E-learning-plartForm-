import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, RefreshCw, ThumbsUp, ThumbsDown, User, Paperclip, Mic, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";

// Sample suggested questions
const suggestedQuestions = [
  "What courses would you recommend for a beginner in web development?",
  "Can you explain the key differences between machine learning and deep learning?",
  "How do I prepare for the data science certification exam?",
  "What are the essential skills needed for a career in UX design?",
  "How can I improve my public speaking skills?",
];

// Placeholder for sample AI responses
const getAIResponse = (message: string) => {
  // This would be replaced with actual API call in production
  const responses = [
    "Based on your interests, I'd recommend starting with our 'Introduction to Web Development' course. It covers HTML, CSS, JavaScript fundamentals and has hands-on projects to build your portfolio. Would you like me to share more details about this course?",
    "Great question! Machine learning is a subset of AI that uses statistical methods to enable machines to learn from data, while deep learning uses neural networks with many layers (hence 'deep'). Deep learning is actually a subset of machine learning that performs more complex tasks with less human intervention. Would you like me to explain specific applications?",
    "To prepare for the data science certification, I recommend these steps: 1) Review our course materials on statistical analysis and data visualization, 2) Practice with the sample datasets provided in Module 4, 3) Take the practice exams in the certification prep section. Our 'Data Science Certification Bootcamp' would also be helpful. Shall I enroll you in a practice session?",
    "For a successful UX design career, focus on: 1) User research skills, 2) Wireframing and prototyping, 3) Visual design fundamentals, 4) Usability testing knowledge, and 5) Collaboration skills. Our 'UX Design Professional Path' covers all these areas comprehensively. Would you like specific course recommendations?",
    "To improve public speaking, consider practicing these techniques: 1) Record yourself speaking and review, 2) Practice in front of friends, 3) Focus on body language and voice modulation. Our 'Effective Communication' course has an excellent module on public speaking with virtual reality practice sessions. Would you like to explore this course?"
  ];
  
  // Simulate delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * responses.length);
      resolve(responses[randomIndex]);
    }, 1500);
  });
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Smart Guide, your AI learning assistant. How can I help with your educational journey today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use our loading screen hook with forceFullscreen set to true
  useLoadingScreen(isLoading, "Smart Guide is thinking...", true, true);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Get AI response (would be replaced with actual API call)
      const response = await getAIResponse(inputMessage);
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Sorry, I'm having trouble connecting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <Card className="p-5">
                <div className="mb-6">
                  <div className="bg-lumina-50 w-12 h-12 rounded-full flex items-center justify-center text-lumina-600 mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h2 className="font-serif text-xl font-bold mb-2">Smart Guide</h2>
                  <p className="text-gray-600 text-sm">
                    Your AI learning assistant powered by advanced language models to help you with any questions about our courses and learning paths.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <h3 className="font-medium mb-3">Capabilities</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lumina-600 rounded-full mr-2"></div>
                      Course recommendations
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lumina-600 rounded-full mr-2"></div>
                      Learning path guidance
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lumina-600 rounded-full mr-2"></div>
                      Content explanations
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lumina-600 rounded-full mr-2"></div>
                      Study techniques
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-lumina-600 rounded-full mr-2"></div>
                      Career advice
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <h3 className="font-medium mb-3">Limitations</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      May not have access to latest courses
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      Cannot access personal account details
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      Limited to educational topics
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            {/* Chat window */}
            <div className="lg:col-span-9">
              <Card className="flex flex-col h-[calc(100vh-12rem)]">
                {/* Chat header */}
                <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-lumina-50 w-10 h-10 rounded-full flex items-center justify-center text-lumina-600 mr-3">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h2 className="font-medium">Smart Guide</h2>
                      <div className="flex items-center text-sm text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                        Online
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setMessages([{
                      id: '1',
                      content: "Hello! I'm Smart Guide, your AI learning assistant. How can I help with your educational journey today?",
                      sender: 'ai',
                      timestamp: new Date()
                    }])}
                    className="text-gray-500 hover:text-lumina-600"
                  >
                    <RefreshCw size={14} className="mr-1" />
                    New Chat
                  </Button>
                </div>
                
                {/* Messages area */}
                <ScrollArea className="flex-grow p-4" ref={scrollRef}>
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`mb-6 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-2'}`}>
                        <div className="flex items-center mb-1">
                          <Avatar className={`h-8 w-8 mr-2 ${message.sender === 'user' ? 'order-2 ml-2' : 'order-1'}`}>
                            {message.sender === 'user' ? (
                              <User className="text-gray-600" />
                            ) : (
                              <div className="bg-gradient-to-r from-lumina-500 to-lumina-700 w-full h-full flex items-center justify-center text-white">
                                S
                              </div>
                            )}
                          </Avatar>
                          <span className={`text-sm text-gray-500 ${message.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                            {message.sender === 'user' ? 'You' : 'Smart Guide'} • {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div 
                          className={`p-4 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-lumina-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {message.sender === 'ai' && (
                          <div className="flex items-center mt-2">
                            <button 
                              className="text-gray-400 hover:text-lumina-600 p-1"
                              aria-label="Thumbs up"
                            >
                              <ThumbsUp size={14} />
                            </button>
                            <button 
                              className="text-gray-400 hover:text-red-500 p-1"
                              aria-label="Thumbs down"
                            >
                              <ThumbsDown size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-center mb-6">
                      <Avatar className="h-8 w-8 mr-2">
                        <div className="bg-gradient-to-r from-lumina-500 to-lumina-700 w-full h-full flex items-center justify-center text-white">
                          S
                        </div>
                      </Avatar>
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-lumina-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-lumina-600 rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-lumina-600 rounded-full animate-pulse delay-300"></div>
                          <span className="ml-2 text-sm text-gray-500">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
                
                {/* Suggested questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleSuggestedQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Input area */}
                <div className="border-t border-gray-200 p-4">
                  <div className="relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your question here..."
                      className="pr-20 pl-4 py-6"
                      disabled={isLoading}
                    />
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3 space-x-1">
                      <button 
                        className="text-gray-400 hover:text-lumina-600 p-1"
                        aria-label="Attach file"
                      >
                        <Paperclip size={18} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-lumina-600 p-1"
                        aria-label="Voice input"
                      >
                        <Mic size={18} />
                      </button>
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-lumina-600 hover:bg-lumina-700 mr-1"
                        aria-label="Send message"
                      >
                        <Send size={16} />
                      </Button>
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-lumina-600 hover:bg-lumina-700"
                        aria-label="Send with Enter key"
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock size={12} className="mr-1" />
                    Responses are generated instantly for demo purposes. Actual response times may vary.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistantPage;
