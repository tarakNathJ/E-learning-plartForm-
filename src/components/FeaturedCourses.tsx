
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample course data
const courseData = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    description: "Learn the basics of machine learning algorithms and applications.",
    category: "Data Science",
    rating: 4.8,
    students: 1234,
    instructor: "Dr. Lisa Johnson",
    duration: "8 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description: "A complete guide to building modern web applications.",
    category: "Programming",
    rating: 4.9,
    students: 2546,
    instructor: "Mark Wilson",
    duration: "12 weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Master digital marketing strategies for business growth.",
    category: "Marketing",
    rating: 4.7,
    students: 1879,
    instructor: "Sarah Parker",
    duration: "6 weeks",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1460925895917-afddc27a96fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: false,
  },
  {
    id: 4,
    title: "Financial Analysis & Planning",
    description: "Understand financial analysis techniques for better business decisions.",
    category: "Finance",
    rating: 4.6,
    students: 1122,
    instructor: "Dr. Robert Chen",
    duration: "10 weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
  },
];

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-lumina-600">{course.category}</Badge>
          {course.isPopular && (
            <Badge className="bg-amber-500">Popular</Badge>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center">
          <Clock size={12} className="mr-1" />
          {course.duration}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">{course.level}</span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{course.rating}</span>
          </div>
        </div>
        <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-lumina-600 transition-colors">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users size={14} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
          </div>
          <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedCourses = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Data Science', 'Programming', 'Marketing', 'Finance'];
  
  const filteredCourses = filter === 'All' 
    ? courseData.filter(course => course.isFeatured)
    : courseData.filter(course => course.category === filter && course.isFeatured);

  return (
    <section className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses chosen by thousands of satisfied students.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-lumina-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/courses">
            <Button variant="outline" className="border-lumina-600 text-lumina-600 hover:bg-lumina-50">
              View All Courses
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
