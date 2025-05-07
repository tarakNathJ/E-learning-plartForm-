
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Filter, 
  Search, 
  Star, 
  Users, 
  X,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";
import { Link } from "react-router-dom";

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
    price: 79.99,
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
    price: 89.99,
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
    price: 69.99,
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
    price: 99.99,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 5,
    title: "UX/UI Design Principles",
    description: "Master the fundamentals of user experience and interface design.",
    category: "Design",
    rating: 4.9,
    students: 1758,
    instructor: "Jennifer Lee",
    duration: "8 weeks",
    level: "Beginner",
    price: 75.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: true,
  },
  {
    id: 6,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native.",
    category: "Programming",
    rating: 4.7,
    students: 1432,
    instructor: "David Johnson",
    duration: "10 weeks",
    level: "Intermediate",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: false,
  },
  {
    id: 7,
    title: "Project Management Professional",
    description: "Learn the skills needed to become a certified project manager.",
    category: "Business",
    rating: 4.8,
    students: 2211,
    instructor: "Michael Scott",
    duration: "12 weeks",
    level: "Advanced",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: true,
  },
  {
    id: 8,
    title: "Data Analysis with Python",
    description: "Harness the power of Python for data analysis and visualization.",
    category: "Data Science",
    rating: 4.9,
    students: 1867,
    instructor: "Dr. Samantha Wells",
    duration: "8 weeks",
    level: "Intermediate",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    isPopular: false,
  },
];

const categories = ["All", "Data Science", "Programming", "Marketing", "Finance", "Design", "Business"];
const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

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
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Users size={14} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
          </div>
          <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lumina-800">${course.price}</span>
          <Button size="sm" className="bg-lumina-600 hover:bg-lumina-700">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 120]);
  const [sortBy, setSortBy] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter and sort logic
  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || course.category === categoryFilter;
    const matchesLevel = levelFilter.length === 0 || levelFilter.includes(course.level);
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  }).sort((a, b) => {
    switch(sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return Math.random() - 0.5; // Simulating newest for the example
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setLevelFilter([]);
    setPriceRange([0, 120]);
    setSortBy("popular");
  };

  const toggleLevel = (level) => {
    setLevelFilter(
      levelFilter.includes(level)
        ? levelFilter.filter(l => l !== level)
        : [...levelFilter, level]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="hero-gradient text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold mb-4">Explore Our Courses</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Discover a wide range of courses taught by industry experts to help you advance your career.
              </p>
            </div>
          </div>
        </section>

        {/* Search and filters */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-80"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lumina-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                
                <Button 
                  variant="outline"
                  className="lg:hidden flex-1"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                
                <Button 
                  variant="ghost"
                  className="text-gray-500 hover:text-lumina-600"
                  onClick={clearFilters}
                >
                  <X size={16} className="mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-sm h-fit">
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filters
                  </h3>
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            checked={categoryFilter === category}
                            onChange={() => setCategoryFilter(category)}
                            className="mr-2 text-lumina-600 focus:ring-lumina-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Level</h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center">
                          <Checkbox
                            id={`level-${level}`}
                            checked={levelFilter.includes(level)}
                            onCheckedChange={() => toggleLevel(level)}
                            className="mr-2 text-lumina-600 focus:ring-lumina-500 data-[state=checked]:bg-lumina-600"
                          />
                          <label htmlFor={`level-${level}`} className="text-gray-700">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-3">Price</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={120}
                        step={5}
                        onValueChange={(value) => setPriceRange(value)}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Filters - Mobile */}
              {isFilterOpen && (
                <div className="lg:hidden bg-white p-6 rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg flex items-center">
                      <Filter size={18} className="mr-2" />
                      Filters
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-500"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Sort by</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lumina-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            checked={categoryFilter === category}
                            onChange={() => setCategoryFilter(category)}
                            className="mr-2 text-lumina-600 focus:ring-lumina-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Level</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center">
                          <Checkbox
                            id={`mobile-level-${level}`}
                            checked={levelFilter.includes(level)}
                            onCheckedChange={() => toggleLevel(level)}
                            className="mr-2 text-lumina-600 focus:ring-lumina-500 data-[state=checked]:bg-lumina-600"
                          />
                          <label htmlFor={`mobile-level-${level}`} className="text-gray-700">
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-3">Price</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={120}
                        step={5}
                        onValueChange={(value) => setPriceRange(value)}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-lumina-600 hover:bg-lumina-700"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        clearFilters();
                        setIsFilterOpen(false);
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}

              {/* Courses grid */}
              <div className="flex-1">
                <div className="mb-6 flex justify-between items-center">
                  <div className="text-gray-600">
                    Showing <span className="font-medium">{filteredCourses.length}</span> courses
                  </div>
                  <div className="hidden lg:flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`${sortBy === 'popular' ? 'bg-gray-100' : ''}`}
                      onClick={() => setSortBy('popular')}
                    >
                      <Users size={16} className="mr-1" />
                      Popular
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`${sortBy === 'rating' ? 'bg-gray-100' : ''}`}
                      onClick={() => setSortBy('rating')}
                    >
                      <Star size={16} className="mr-1" />
                      Rating
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={`${sortBy.includes('price') ? 'bg-gray-100' : ''}`}
                      onClick={() => setSortBy(sortBy === 'price-low' ? 'price-high' : 'price-low')}
                    >
                      <div className="flex items-center">
                        <span className="mr-1">Price</span>
                        <ArrowUpDown size={14} />
                      </div>
                    </Button>
                  </div>
                </div>

                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                      <Link to={`/courses/${course.id}`} key={course.id}>
                        <CourseCard course={course} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                    <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="font-serif text-xl font-medium mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search term.</p>
                    <Button onClick={clearFilters} className="bg-lumina-600 hover:bg-lumina-700">
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
