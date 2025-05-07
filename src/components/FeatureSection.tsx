
import { 
  BookOpen, 
  MessageSquare, 
  Award, 
  Smartphone, 
  Video, 
  FileText, 
  BarChart, 
  RefreshCw 
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world expertise and experience."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "AI Learning Assistant",
    description: "Get instant help and feedback with our advanced AI-powered learning companion."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Verified Certificates",
    description: "Earn recognized certifications that validate your newly gained skills."
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Learn Anywhere",
    description: "Access courses on any device with our responsive, mobile-friendly platform."
  },
  {
    icon: <Video className="h-6 w-6" />,
    title: "Interactive Content",
    description: "Engage with videos, quizzes, and hands-on exercises that reinforce learning."
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Comprehensive Resources",
    description: "Access downloadable materials, guides, and cheat sheets for each course."
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Progress Tracking",
    description: "Monitor your advancement with detailed analytics and performance insights."
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Lifetime Access",
    description: "Enjoy unlimited access to course content with free updates and improvements."
  }
];

const FeatureSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose Lumina Learn Nexus</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers an innovative approach to online learning with features designed to maximize your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="bg-lumina-50 w-12 h-12 rounded-lg flex items-center justify-center text-lumina-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
