
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, BookOpen, History, LogOut, Award, Upload, Video, BarChart2, MessageSquare, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import StudentDashboard from "@/components/profile/StudentDashboard";
import AdminDashboard from "@/components/profile/AdminDashboard";
import { toast } from "sonner";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access your profile");
    }
  }, [isAuthenticated, navigate]);


  const handleLogout = async () => {
    const logoutHandler = await logout();
    if(logoutHandler){

      setTimeout(() => {
        navigate("/login");
      }, 10);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);

    switch (tabId) {
      case "dashboard":
        break;
      case "courses":
        navigate("/courses");
        return;
      case "settings":
        navigate("/settings");
        return;
      case "upload":
        navigate("/admin/courses/create");
        return;
      case "live":
        navigate("/admin/live-session");
        return;
      case "analytics":
        navigate("/admin/analytics");
        return;
      case "history":
        toast.info("Learning history will be available soon");
        break;
      case "certificates":
        navigate("/certificates");
        break;
      case "messages":
        navigate("/student/messages");
        return;
      case "live-sessions":
        navigate("/student/live-sessions");
        return;
      case "assignments":
        navigate("/student/assignments");
        return;
      case "admin-assignments":
        navigate("/admin/assignments");
        return;
      case "admin-messages":
        navigate("/admin/messaging");
        return;
      default:
        break;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center section-padding">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Loading profile...</h2>
            <p className="text-gray-500 mb-4">Please wait while we load your profile information.</p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getSidebarItems = () => {
    const commonItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <User className="mr-2 h-4 w-4" />,
      },
      {
        id: "courses",
        label: "My Courses",
        icon: <BookOpen className="mr-2 h-4 w-4" />,
      },
      {
        id: "settings",
        label: "Account Settings",
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
    ];

    const studentItems = [
      {
        id: "messages",
        label: "Messages",
        icon: <MessageSquare className="mr-2 h-4 w-4" />,
      },
      {
        id: "live-sessions",
        label: "Live Sessions",
        icon: <Video className="mr-2 h-4 w-4" />,
      },
      {
        id: "assignments",
        label: "Assignments",
        icon: <FileText className="mr-2 h-4 w-4" />,
      },
      {
        id: "history",
        label: "Learning History",
        icon: <History className="mr-2 h-4 w-4" />,
      },
      {
        id: "certificates",
        label: "Certificates",
        icon: <Award className="mr-2 h-4 w-4" />,
      },
    ];

    const adminItems = [
      {
        id: "admin-messages",
        label: "Batch Messaging",
        icon: <MessageSquare className="mr-2 h-4 w-4" />,
      },
      {
        id: "admin-assignments",
        label: "Manage Assignments",
        icon: <FileText className="mr-2 h-4 w-4" />,
      },
      {
        id: "upload",
        label: "Upload Courses",
        icon: <Upload className="mr-2 h-4 w-4" />,
      },
      {
        id: "live",
        label: "Live Classes",
        icon: <Video className="mr-2 h-4 w-4" />,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart2 className="mr-2 h-4 w-4" />,
      },
    ];

    return [...commonItems, ...(user.accountType === "student" ? studentItems : adminItems)];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">My Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 border border-pastel-purple-100 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-pastel-pink-100 flex items-center justify-center mb-4">
                    {user.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={64} className="text-pastel-purple-400" />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-pastel-purple-700">{user.name}</h2>
                  <p className="text-pastel-purple-500">{user.email}</p>
                  <p className="bg-pastel-purple-100 text-pastel-purple-700 px-3 py-1 rounded-full text-sm mt-2 capitalize">
                    {user.accountType}
                  </p>

                  <Separator className="my-6 bg-pastel-purple-100" />

                  <div className="w-full space-y-2">
                    {getSidebarItems().map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "outline"}
                        className={`w-full justify-start ${activeTab === item.id ? "bg-pastel-purple-300 hover:bg-pastel-purple-400 text-white" : "border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                          }`}
                        onClick={() => handleTabChange(item.id)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    ))}

                    <Separator className="my-2 bg-pastel-purple-100" />

                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {user.accountType === "student" ? (
                <StudentDashboard user={user} />
              ) : (
                <AdminDashboard user={user} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
