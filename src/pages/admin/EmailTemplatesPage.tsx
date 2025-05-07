
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Mail, MailPlus, AlignLeft, Image, Code, Eye, Save } from "lucide-react";

const EmailTemplatesPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [activeTemplate, setActiveTemplate] = useState("welcome");
  const [showPreview, setShowPreview] = useState(false);

  // Redirect if not admin
  React.useEffect(() => {
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

  // Mock templates data
  const templates = [
    { id: "welcome", name: "Welcome Email", description: "Sent when a user creates an account" },
    { id: "course_enrollment", name: "Course Enrollment", description: "Sent when a user enrolls in a course" },
    { id: "password_reset", name: "Password Reset", description: "Sent when a user requests a password reset" },
    { id: "certificate", name: "Certificate", description: "Sent when a user completes a course" }
  ];

  // Mock template content
  const templateContents = {
    welcome: {
      subject: "Welcome to LuminaLearn! 🎉",
      content: `<p>Hello {{name}},</p>
<p>Welcome to LuminaLearn! We're excited to have you join our learning platform.</p>
<p>Here are some quick links to get you started:</p>
<ul>
  <li><a href="{{dashboard_url}}">Your Dashboard</a></li>
  <li><a href="{{courses_url}}">Browse Courses</a></li>
  <li><a href="{{profile_url}}">Complete Your Profile</a></li>
</ul>
<p>If you have any questions, please don't hesitate to reach out to our support team.</p>
<p>Happy learning!</p>
<p>The LuminaLearn Team</p>`
    },
    course_enrollment: {
      subject: "You're enrolled in {{course_name}}! 📚",
      content: `<p>Hello {{name}},</p>
<p>You have successfully enrolled in <strong>{{course_name}}</strong>!</p>
<p>Your course begins on {{start_date}}. You can access all course materials from your dashboard.</p>
<p>We hope you enjoy the learning journey!</p>
<p>Best regards,</p>
<p>The LuminaLearn Team</p>`
    },
    password_reset: {
      subject: "Password Reset Request 🔐",
      content: `<p>Hello,</p>
<p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
<p>To reset your password, please click on the link below:</p>
<p><a href="{{reset_url}}">Reset Your Password</a></p>
<p>The link will expire in 24 hours.</p>
<p>Best regards,</p>
<p>The LuminaLearn Team</p>`
    },
    certificate: {
      subject: "Congratulations on Your Certificate! 🎓",
      content: `<p>Hello {{name}},</p>
<p>Congratulations on completing <strong>{{course_name}}</strong>!</p>
<p>Your certificate is attached to this email. You can also view and download it from your profile.</p>
<p>We hope you enjoyed the course and learned valuable skills.</p>
<p>Keep learning and growing!</p>
<p>Best regards,</p>
<p>The LuminaLearn Team</p>`
    }
  };

  const handleSaveTemplate = () => {
    toast.success("Email template saved successfully");
    setShowPreview(false);
  };

  const currentTemplate = templateContents[activeTemplate as keyof typeof templateContents];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Email Templates</h1>
              <p className="text-pastel-purple-500">Customize email notifications for your users</p>
            </div>
            <Button 
              onClick={() => navigate("/profile")}
              className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Select a template to edit</CardDescription>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {templates.map((template) => (
                      <Button 
                        key={template.id}
                        variant="ghost" 
                        className={`w-full justify-start ${
                          activeTemplate === template.id 
                            ? "bg-pastel-purple-100 text-pastel-purple-700 hover:bg-pastel-purple-200" 
                            : "text-pastel-purple-700 hover:bg-pastel-purple-100"
                        }`}
                        onClick={() => setActiveTemplate(template.id)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {template.name}
                      </Button>
                    ))}
                    <Separator className="my-2 bg-pastel-purple-100" />
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                    >
                      <MailPlus className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {templates.find(t => t.id === activeTemplate)?.name || "Template Editor"}
                      </CardTitle>
                      <CardDescription>
                        {templates.find(t => t.id === activeTemplate)?.description || "Edit your email template"}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                        onClick={() => setShowPreview(!showPreview)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {showPreview ? "Edit Template" : "Preview"}
                      </Button>
                      <Button 
                        className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
                        onClick={handleSaveTemplate}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Template
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {showPreview ? (
                    <div className="border rounded-md p-6 bg-white">
                      <div className="border-b pb-4 mb-4">
                        <h3 className="font-medium text-pastel-purple-700">Subject: {currentTemplate.subject}</h3>
                      </div>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentTemplate.content }} />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-pastel-purple-700">
                          Email Subject
                        </label>
                        <Input 
                          value={currentTemplate.subject} 
                          className="border-pastel-purple-200 focus-visible:ring-pastel-purple-300"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block text-pastel-purple-700">
                          Email Content
                        </label>
                        <Tabs defaultValue="editor">
                          <TabsList className="bg-pastel-purple-50 border border-pastel-purple-100">
                            <TabsTrigger value="editor" className="data-[state=active]:bg-white">
                              <AlignLeft className="mr-2 h-4 w-4" />
                              Editor
                            </TabsTrigger>
                            <TabsTrigger value="code" className="data-[state=active]:bg-white">
                              <Code className="mr-2 h-4 w-4" />
                              HTML
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="editor" className="mt-4">
                            <div className="border rounded-md p-2 bg-white">
                              <div className="flex bg-pastel-purple-50 border-b border-pastel-purple-100 p-2 gap-2 mb-2">
                                <Button variant="ghost" size="sm" className="text-pastel-purple-700">B</Button>
                                <Button variant="ghost" size="sm" className="text-pastel-purple-700 italic">I</Button>
                                <Button variant="ghost" size="sm" className="text-pastel-purple-700 underline">U</Button>
                                <Separator orientation="vertical" className="mx-1 h-6 bg-pastel-purple-200" />
                                <Button variant="ghost" size="sm">
                                  <Image className="h-4 w-4 text-pastel-purple-700" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-pastel-purple-700">Link</Button>
                              </div>
                              <Textarea 
                                value={currentTemplate.content.replace(/<\/?[^>]+(>|$)/g, "")}
                                rows={12}
                                className="border-0 focus-visible:ring-0 resize-none"
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="code" className="mt-4">
                            <Textarea 
                              value={currentTemplate.content}
                              rows={12}
                              className="font-mono text-sm border-pastel-purple-200 bg-pastel-purple-50"
                            />
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2 block text-pastel-purple-700">
                          Available Variables
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {["{{name}}", "{{email}}", "{{course_name}}", "{{start_date}}", "{{reset_url}}", "{{dashboard_url}}", "{{courses_url}}", "{{profile_url}}"].map((variable) => (
                            <div key={variable} className="px-3 py-1 bg-pastel-purple-50 text-pastel-purple-700 rounded-md text-sm border border-pastel-purple-200">
                              {variable}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                  >
                    Send Test Email
                  </Button>
                  <Button 
                    className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
                    onClick={handleSaveTemplate}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmailTemplatesPage;
