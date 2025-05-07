
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    content: "Lumina Learn Nexus transformed my learning experience completely. The courses are well-structured, and the AI assistant made it so much easier to grasp complex concepts. I've recommended it to all my colleagues!",
    name: "Emily Chen",
    title: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    content: "The interactive learning approach combined with personalized AI feedback helped me acquire new skills in half the time it would have taken through traditional methods. The course content is practical and immediately applicable.",
    name: "Michael Johnson",
    title: "Product Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    content: "As someone who struggled with online learning before, Lumina Learn Nexus kept me engaged throughout my course. The combination of expert instruction and AI guidance made all the difference. I've gained confidence in my new skills!",
    name: "Sarah Williams",
    title: "Marketing Specialist",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Lumina Learn Nexus has transformed learning experiences for our community.
          </p>
        </div>
        
        <div className="relative">
          <div className="bg-lumina-50 rounded-xl p-8 md:p-12">
            <div className="absolute -top-6 left-12 text-lumina-500">
              <Quote size={64} className="fill-current opacity-20" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto md:mx-0">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{testimonials[activeIndex].content}"
                </p>
                <h4 className="font-serif font-bold text-xl">{testimonials[activeIndex].name}</h4>
                <p className="text-gray-500">{testimonials[activeIndex].title}</p>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end mt-8 space-x-4">
              <button 
                onClick={handlePrevious}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:border-lumina-500 hover:text-lumina-500 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 hover:border-lumina-500 hover:text-lumina-500 transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === activeIndex ? "bg-lumina-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
