import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Check, Play, List, ArrowLeft, ArrowRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

// Mock course data - in a real app, this would come from an API
const coursesData = {
  "course1": {
    id: "course1",
    title: "Advanced Machine Learning",
    instructor: "Dr. Alex Johnson",
    description: "Master advanced machine learning concepts including neural networks, deep learning, and more.",
    lessonsCount: 24,
    progress: 65,
    currentLesson: 15,
    totalDuration: "24 hours",
    nextLesson: "Neural Networks Architecture",
    modules: [
      {
        id: "module1",
        title: "Introduction to Advanced ML",
        lessons: [
          { id: "lesson1", title: "Course Overview", duration: "10 min", completed: true, type: "video" },
          { id: "lesson2", title: "Review of ML Basics", duration: "25 min", completed: true, type: "video" },
          { id: "lesson3", title: "Advanced ML Landscape", duration: "20 min", completed: true, type: "video" },
          { id: "lesson4", title: "Module Assessment", duration: "15 min", completed: true, type: "quiz" },
        ]
      },
      {
        id: "module2",
        title: "Supervised Learning Advanced Techniques",
        lessons: [
          { id: "lesson5", title: "Support Vector Machines", duration: "30 min", completed: true, type: "video" },
          { id: "lesson6", title: "Random Forests", duration: "35 min", completed: true, type: "video" },
          { id: "lesson7", title: "Gradient Boosting", duration: "40 min", completed: true, type: "video" },
          { id: "lesson8", title: "Hands-on Exercise", duration: "60 min", completed: true, type: "exercise" },
          { id: "lesson9", title: "Module Assessment", duration: "20 min", completed: true, type: "quiz" },
        ]
      },
      {
        id: "module3",
        title: "Neural Networks Fundamentals",
        lessons: [
          { id: "lesson10", title: "Introduction to Neural Networks", duration: "25 min", completed: true, type: "video" },
          { id: "lesson11", title: "Activation Functions", duration: "30 min", completed: true, type: "video" },
          { id: "lesson12", title: "Forward Propagation", duration: "35 min", completed: true, type: "video" },
          { id: "lesson13", title: "Backpropagation", duration: "40 min", completed: true, type: "video" },
          { id: "lesson14", title: "Gradient Descent Optimization", duration: "30 min", completed: true, type: "video" },
          { id: "lesson15", title: "Hands-on Exercise", duration: "60 min", completed: true, type: "exercise" },
        ]
      },
      {
        id: "module4",
        title: "Neural Networks Architecture",
        lessons: [
          { id: "lesson16", title: "Neural Networks Architecture", duration: "45 min", completed: false, type: "video", current: true },
          { id: "lesson17", title: "CNN Introduction", duration: "30 min", completed: false, type: "video" },
          { id: "lesson18", title: "RNN and LSTM", duration: "40 min", completed: false, type: "video" },
          { id: "lesson19", title: "Transformers", duration: "50 min", completed: false, type: "video" },
          { id: "lesson20", title: "Hands-on Exercise", duration: "60 min", completed: false, type: "exercise" },
          { id: "lesson21", title: "Module Assessment", duration: "25 min", completed: false, type: "quiz" },
        ]
      },
      {
        id: "module5",
        title: "Advanced Deep Learning",
        lessons: [
          { id: "lesson22", title: "Transfer Learning", duration: "35 min", completed: false, type: "video" },
          { id: "lesson23", title: "GANs", duration: "45 min", completed: false, type: "video" },
          { id: "lesson24", title: "Final Project", duration: "120 min", completed: false, type: "project" },
        ]
      }
    ]
  },
  "course2": {
    id: "course2",
    title: "Data Visualization with Python",
    instructor: "Prof. Sarah Miller",
    description: "Learn to create powerful data visualizations using Python libraries like Matplotlib, Seaborn, and Plotly.",
    lessonsCount: 18,
    progress: 30,
    currentLesson: 6,
    totalDuration: "18 hours",
    nextLesson: "Interactive Dashboards with Plotly",
    modules: [
      {
        id: "module1",
        title: "Introduction to Data Visualization",
        lessons: [
          { id: "lesson1", title: "Course Overview", duration: "10 min", completed: true, type: "video" },
          { id: "lesson2", title: "Principles of Data Visualization", duration: "25 min", completed: true, type: "video" },
          { id: "lesson3", title: "Python for Data Visualization", duration: "30 min", completed: true, type: "video" },
          { id: "lesson4", title: "Module Assessment", duration: "15 min", completed: true, type: "quiz" },
        ]
      },
      {
        id: "module2",
        title: "Matplotlib Fundamentals",
        lessons: [
          { id: "lesson5", title: "Introduction to Matplotlib", duration: "25 min", completed: true, type: "video" },
          { id: "lesson6", title: "Interactive Dashboards with Plotly", duration: "45 min", completed: true, type: "video", current: true },
          { id: "lesson7", title: "Creating Advanced Charts", duration: "35 min", completed: false, type: "video" },
          { id: "lesson8", title: "Hands-on Exercise", duration: "50 min", completed: false, type: "exercise" },
          { id: "lesson9", title: "Module Assessment", duration: "20 min", completed: false, type: "quiz" },
        ]
      },
      // More modules would be here...
    ]
  }
};

const CourseLearningPage = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { user } = useUser();
  const [course, setCourse] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would fetch course data from an API
    if (courseId && coursesData[courseId as keyof typeof coursesData]) {
      const courseData = coursesData[courseId as keyof typeof coursesData];
      setCourse(courseData);
      
      // Find the current or specified lesson
      let foundLesson = null;
      
      if (lessonId) {
        // If a specific lesson ID is provided, find that lesson
        for (const module of courseData.modules) {
          const lesson = module.lessons.find(l => l.id === lessonId);
          if (lesson) {
            foundLesson = { ...lesson, moduleTitle: module.title };
            break;
          }
        }
      } else {
        // Otherwise find the current lesson based on course progress
        for (const module of courseData.modules) {
          const lesson = module.lessons.find(l => l.current === true);
          if (lesson) {
            foundLesson = { ...lesson, moduleTitle: module.title };
            break;
          }
        }
      }
      
      setCurrentLesson(foundLesson);
      setIsLoading(false);
    } else {
      // Handle invalid course ID
      toast.error("Course not found");
      navigate("/courses");
    }
  }, [courseId, lessonId, navigate, user]);

  const markLessonComplete = () => {
    toast.success("Lesson marked as complete!");
    // In a real app, this would update the database
    // Here we just show a toast notification
  };

  const navigateToLesson = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
    // In a real app, this would fetch the new lesson from the API
  };

  const findNextLesson = () => {
    if (!currentLesson || !course) return null;
    
    let foundCurrent = false;
    let nextLesson = null;
    
    for (const module of course.modules) {
      for (let i = 0; i < module.lessons.length; i++) {
        if (foundCurrent && !nextLesson) {
          nextLesson = module.lessons[i];
          break;
        }
        if (module.lessons[i].id === currentLesson.id) {
          foundCurrent = true;
        }
      }
      if (nextLesson) break;
    }
    
    return nextLesson;
  };

  const findPrevLesson = () => {
    if (!currentLesson || !course) return null;
    
    let prevLesson = null;
    
    for (const module of course.modules) {
      for (let i = 0; i < module.lessons.length; i++) {
        if (module.lessons[i].id === currentLesson.id && i > 0) {
          prevLesson = module.lessons[i - 1];
          break;
        } else if (module.lessons[i].id === currentLesson.id) {
          // Current lesson is the first in its module
          // Check if there's a previous module with lessons
          const moduleIndex = course.modules.findIndex((m: any) => m.id === module.id);
          if (moduleIndex > 0) {
            const prevModule = course.modules[moduleIndex - 1];
            if (prevModule.lessons.length > 0) {
              prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
            }
          }
          break;
        }
      }
      if (prevLesson) break;
    }
    
    return prevLesson;
  };

  const nextLesson = findNextLesson();
  const prevLesson = findPrevLesson();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
        <Navbar />
        <main className="flex-grow section-padding flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-pastel-purple-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-semibold text-pastel-purple-700">Loading course content...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      
      <div className="bg-white shadow-sm border-b border-pastel-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-pastel-purple-700"
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          
          <Progress value={course?.progress} className="w-32 h-2" />
          
          <Button 
            variant="ghost" 
            className="text-pastel-purple-700"
            onClick={() => {
              const sidebarEl = document.getElementById("course-sidebar");
              if (sidebarEl) sidebarEl.classList.toggle("hidden");
            }}
          >
            <List className="h-4 w-4 mr-2" />
            Lessons
          </Button>
        </div>
      </div>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-4">
        {/* Course sidebar */}
        <div id="course-sidebar" className="hidden lg:block lg:col-span-1 border-r border-pastel-purple-100 bg-white overflow-y-auto h-[calc(100vh-116px)] sticky top-[60px]">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-pastel-purple-700 mb-1">{course?.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{course?.instructor}</p>
            <div className="flex items-center gap-2 mb-4">
              <Progress value={course?.progress} className="h-2 flex-grow" />
              <span className="text-sm font-medium text-pastel-purple-700">{course?.progress}%</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-2">
            <Accordion type="multiple" defaultValue={course?.modules.map((m: any) => m.id)}>
              {course?.modules.map((module: any) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger className="px-2">
                    <span className="text-sm font-medium">{module.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {module.lessons.map((lesson: any) => (
                        <li 
                          key={lesson.id}
                          className={`flex items-center p-2 rounded-md text-sm ${
                            currentLesson?.id === lesson.id 
                              ? "bg-pastel-purple-100 text-pastel-purple-700" 
                              : "hover:bg-pastel-purple-50"
                          } cursor-pointer`}
                          onClick={() => navigateToLesson(lesson.id)}
                        >
                          {lesson.completed ? (
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                          ) : lesson.type === 'video' ? (
                            <Play className="h-4 w-4 mr-2" />
                          ) : lesson.type === 'quiz' ? (
                            <FileText className="h-4 w-4 mr-2" />
                          ) : (
                            <BookOpen className="h-4 w-4 mr-2" />
                          )}
                          <div className="flex-grow">
                            <span>{lesson.title}</span>
                            <span className="text-xs text-gray-500 block">{lesson.duration}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Lesson content */}
        <div className="col-span-1 lg:col-span-3 p-6">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-pastel-purple-700 mb-2">{currentLesson.title}</h1>
                <p className="text-gray-600">
                  From module: <span className="text-pastel-purple-600">{currentLesson.moduleTitle}</span>
                </p>
              </div>
              
              <Card className="mb-8 aspect-video flex items-center justify-center bg-gray-900 text-white">
                {currentLesson.type === 'video' ? (
                  <div className="text-center">
                    <Play className="h-16 w-16 mb-4" />
                    <p className="text-lg">Video content would play here</p>
                    <p className="text-sm text-gray-300">Duration: {currentLesson.duration}</p>
                  </div>
                ) : currentLesson.type === 'quiz' ? (
                  <div className="text-center">
                    <FileText className="h-16 w-16 mb-4" />
                    <p className="text-lg">Quiz content would display here</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 mb-4" />
                    <p className="text-lg">{currentLesson.type.charAt(0).toUpperCase() + currentLesson.type.slice(1)} content would display here</p>
                    <p className="text-sm text-gray-300">Duration: {currentLesson.duration}</p>
                  </div>
                )}
              </Card>
              
              <div className="space-y-6">
                <div className="bg-pastel-purple-50 p-6 rounded-lg border border-pastel-purple-100">
                  <h2 className="text-xl font-semibold text-pastel-purple-700 mb-4">Lesson Resources</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-pastel-purple-600 hover:text-pastel-purple-700">
                      <FileText className="h-4 w-4 mr-2" />
                      <a href="#" className="underline">Lesson slides (PDF)</a>
                    </li>
                    <li className="flex items-center text-pastel-purple-600 hover:text-pastel-purple-700">
                      <FileText className="h-4 w-4 mr-2" />
                      <a href="#" className="underline">Example code (ZIP)</a>
                    </li>
                    <li className="flex items-center text-pastel-purple-600 hover:text-pastel-purple-700">
                      <FileText className="h-4 w-4 mr-2" />
                      <a href="#" className="underline">Further reading</a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h2 className="text-xl font-semibold text-pastel-purple-700 mb-4">Lesson Notes</h2>
                  <p className="text-gray-700 mb-4">
                    This is where detailed lesson notes would appear. The content would include explanations, 
                    code examples, diagrams, and other learning materials relevant to the specific lesson.
                  </p>
                  <p className="text-gray-700">
                    In a real implementation, this would be rich content pulled from a database or CMS system,
                    and could include interactive elements, embedded videos, and more.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => prevLesson && navigateToLesson(prevLesson.id)}
                  disabled={!prevLesson}
                  className="border-pastel-purple-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                
                <Button
                  variant="default"
                  onClick={markLessonComplete}
                  className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
                >
                  {currentLesson.completed ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
                
                <Button
                  variant={nextLesson ? "default" : "outline"}
                  onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className={nextLesson ? "bg-pastel-purple-500 hover:bg-pastel-purple-600" : "border-pastel-purple-200"}
                >
                  Next Lesson
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-pastel-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-pastel-purple-700 mb-2">Lesson not found</h2>
              <p className="text-gray-600 mb-6">The requested lesson could not be found</p>
              <Button 
                onClick={() => navigate(`/courses/${courseId}`)} 
                className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
              >
                Back to Course
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseLearningPage;
