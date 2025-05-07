import { ArrowRight, Award, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-pastel-purple-500 to-pastel-blue-400 text-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white text-shadow hover:scale-[1.02] transition-transform">
              Illuminate Your <span className="text-teal-200 animate-pulse-soft">Learning Journey</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 text-shadow-sm animate-fade-in [animation-delay:200ms]">
              Discover a new way of learning with our interactive courses and AI-powered guidance. Join thousands of learners expanding their horizons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:400ms]">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100 hover:scale-105 transition-all w-full sm:w-auto font-semibold">
                  Explore Courses
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-teal-800/30 hover:bg-white hover:text-teal-800 hover:scale-105 transition-all w-full sm:w-auto text-shadow-sm font-semibold"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in [animation-delay:600ms]">
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 hover:bg-white/20 transition-colors">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h4 className="font-medium text-gray-100">100+ Courses</h4>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 hover:bg-white/20 transition-colors">
                  <Users className="text-white" size={24} />
                </div>
                <h4 className="font-medium text-gray-100">10k+ Students</h4>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="bg-white/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 hover:bg-white/20 transition-colors">
                  <Award className="text-white" size={24} />
                </div>
                <h4 className="font-medium text-gray-100">Expert Instructors</h4>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute w-full h-full bg-teal-300/10 rounded-full blur-3xl animate-pulse-soft"></div>
            <div className="relative z-10 bg-white/10 p-8 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in [animation-delay:800ms]">
              <div className="animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning" 
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              
              <div className="absolute -right-4 -bottom-4 bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
                <div className="text-blue-800 font-semibold">AI-Powered Learning</div>
                <div className="text-sm text-gray-500">Personalized guidance</div>
              </div>
              <div className="absolute -left-4 -top-4 bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow hover:scale-105">
                <div className="text-blue-800 font-semibold">Interactive Sessions</div>
                <div className="text-sm text-gray-500">Learn by doing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-gray-600 font-medium mb-6">Trusted by leading companies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-10 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-10 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-10 object-contain" />
            </div>
            <div className="flex justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-10 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
