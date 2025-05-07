
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding hero-gradient text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-shadow-sm">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 text-white">
              Join thousands of students already learning on Lumina Learn Nexus. 
              Start with free courses or unlock premium content with a subscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-teal-800 hover:bg-gray-100 w-full sm:w-auto font-semibold">
                  Browse Courses
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white bg-teal-800/30 hover:bg-white hover:text-teal-800 w-full sm:w-auto text-shadow-sm font-semibold transition-all"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-lumina-300/10 rounded-full blur-3xl"></div>
            <div className="relative text-center">
              <div className="bg-white/10 p-8 backdrop-blur-sm rounded-lg border border-white/20 inline-block">
                <div className="mb-6 text-6xl font-bold">
                  <span className="text-white/80">7</span>
                  <span className="text-white">Days</span>
                </div>
                <p className="text-xl mb-6">Free Premium Trial</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
                    <span>Full access to all courses</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
                    <span>Unlimited AI assistant usage</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
                    <span>Downloadable resources</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-white mr-2"></div>
                    <span>Community access</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full bg-white text-teal-800 hover:bg-gray-100 font-semibold">
                    Start Free Trial
                  </Button>
                </Link>
                <p className="text-xs mt-4 text-white/70">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
