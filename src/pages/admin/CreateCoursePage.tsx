
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, Save, ArrowLeft, FileText, Video, CheckCircle2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState("basic");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated or not an admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access this page");
      return;
    }
    
    if (user?.accountType!== "admin") {
      navigate('/profile');
      toast.error("You don't have permission to access this page");
    }
  }, [isAuthenticated, user, navigate]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate course creation
    setTimeout(() => {
      toast.success("Course created successfully!");
      setIsSubmitting(false);
      navigate("/profile");
    }, 1500);
  };

  const categoryOptions = [
    "Programming",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Development",
    "Mobile Development",
    "DevOps",
    "Business",
    "Design",
    "Marketing",
    "Other"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow section-padding">
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
            <h1 className="text-3xl font-bold">Create New Course</h1>
          </div>
          
          <Card className="p-6">
            <Tabs 
              defaultValue="basic" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-8 grid grid-cols-4 w-full">
                <TabsTrigger value="basic" className="text-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="content" className="text-center">
                  <Video className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="pricing" className="text-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="publish" className="text-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Publish
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input 
                        id="title"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g., Advanced Machine Learning"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Course Description</Label>
                      <Textarea 
                        id="description"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Describe your course in detail..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                        required
                      >
                        <option value="">Select a category</option>
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <div className="flex items-center gap-4">
                        <Input 
                          id="coverImage"
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageChange}
                          className="flex-1"
                        />
                        {coverImagePreview && (
                          <div className="w-24 h-24 border rounded-md overflow-hidden">
                            <img 
                              src={coverImagePreview} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => setActiveTab("content")}
                    >
                      Next: Content
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-300 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">Upload Course Content</h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop your video files, presentations, or documents here
                    </p>
                    <Button variant="outline" className="mx-auto">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </Button>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-3 font-medium">
                      Course Structure
                    </div>
                    <div className="p-4">
                      <div className="text-center text-gray-500 py-8">
                        <p>No modules added yet</p>
                        <p className="text-sm">Create your first module to get started</p>
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Module
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("basic")}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setActiveTab("pricing")}
                    >
                      Next: Pricing
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Course Price ($)</Label>
                      <Input 
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g., 49.99"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <input 
                        type="checkbox" 
                        id="freeCourse" 
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={() => setPrice(price === "0" ? "" : "0")}
                        checked={price === "0"}
                      />
                      <Label htmlFor="freeCourse" className="text-sm font-normal">
                        Make this course free
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("content")}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setActiveTab("publish")}
                    >
                      Next: Publish
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="publish" className="space-y-6">
                  <div className="bg-teal-50 p-6 rounded-md border border-teal-200">
                    <h3 className="text-lg font-medium text-teal-800 mb-2">Ready to Publish</h3>
                    <p className="text-teal-700">
                      Your course is ready to be published. Review the details once more and click Publish when you're ready.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Title:</span>
                      <span>{courseTitle || "Not set"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Category:</span>
                      <span>{courseCategory || "Not set"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Price:</span>
                      <span>{price ? `$${price}` : "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Content Modules:</span>
                      <span>0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("pricing")}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Publishing..." : "Publish Course"}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCoursePage;
