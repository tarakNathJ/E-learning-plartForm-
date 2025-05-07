import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Calendar, Check, Globe, MessageSquare, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">About Lumina Learn Nexus</h1>
              <p className="text-xl mb-8">
                We're on a mission to transform online education through innovation, accessibility, and personalization.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Lumina Learn Nexus was founded with a simple yet powerful vision: to create an educational platform that adapts to each learner's unique needs and goals.
                </p>
                <p className="text-gray-700 mb-4">
                  We recognized the challenges of traditional online learning - engagement, personalization, and practical application - and set out to build a solution that addresses these pain points.
                </p>
                <p className="text-gray-700 mb-4">
                  By combining expert-led content with cutting-edge AI technology, we've created a learning environment that truly puts the student at the center. Our platform continuously evolves, learning from each interaction to provide more tailored and effective educational experiences.
                </p>
                <p className="text-gray-700">
                  Today, Lumina Learn Nexus serves thousands of learners worldwide, helping them unlock their potential and achieve their personal and professional goals.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're guided by a set of core principles that inform everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-lumina-50 w-16 h-16 rounded-full flex items-center justify-center text-lumina-600 mb-6 mx-auto">
                  <Target size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 text-center">Our Mission</h3>
                <p className="text-gray-600 text-center">
                  To democratize education by providing accessible, personalized, and engaging learning experiences that empower individuals to achieve their full potential.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-lumina-50 w-16 h-16 rounded-full flex items-center justify-center text-lumina-600 mb-6 mx-auto">
                  <Globe size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 text-center">Our Vision</h3>
                <p className="text-gray-600 text-center">
                  A world where quality education is available to everyone, regardless of their background, location, or circumstances.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="bg-lumina-50 w-16 h-16 rounded-full flex items-center justify-center text-lumina-600 mb-6 mx-auto">
                  <Award size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4 text-center">Our Promise</h3>
                <p className="text-gray-600 text-center">
                  To continuously innovate and improve our platform, ensuring it remains at the cutting edge of educational technology and methodology.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-6 text-center">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex">
                  <div className="mr-4 text-lumina-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Excellence</h4>
                    <p className="text-gray-600 text-sm">
                      We strive for excellence in everything we create and deliver.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 text-lumina-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Innovation</h4>
                    <p className="text-gray-600 text-sm">
                      We embrace new ideas and technologies to continuously improve.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 text-lumina-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Inclusivity</h4>
                    <p className="text-gray-600 text-sm">
                      We design for diverse learning needs and backgrounds.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 text-lumina-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Impact</h4>
                    <p className="text-gray-600 text-sm">
                      We measure our success by the positive change we create.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team brings together expertise in education, technology, and design.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. James Wilson",
                  title: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Former professor with 15+ years in EdTech"
                },
                {
                  name: "Sarah Johnson",
                  title: "Chief Learning Officer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Education specialist with focus on adult learning"
                },
                {
                  name: "Michael Chen",
                  title: "CTO",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "AI researcher and full-stack developer"
                },
                {
                  name: "Emily Rodriguez",
                  title: "Head of Content",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
                  bio: "Former curriculum designer for top universities"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-lumina-600 font-medium mb-2">{member.title}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-lumina-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The numbers speak for themselves. Here's what we've accomplished so far.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Users size={32} />, value: "45,000+", label: "Active Learners" },
                { icon: <BookOpen size={32} />, value: "250+", label: "Courses Created" },
                { icon: <Globe size={32} />, value: "130+", label: "Countries Reached" },
                { icon: <MessageSquare size={32} />, value: "1M+", label: "AI Interactions" }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-sm text-center">
                  <div className="text-lumina-600 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="font-serif text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A look at how Lumina Learn Nexus has evolved over the years.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line with animation */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
                <div className="h-full w-1 bg-lumina-100 relative">
                  <div className="absolute inset-0 bg-primary animate-height-grow origin-top" style={{ transformOrigin: 'top' }} />
                </div>
              </div>

              {/* Timeline events */}
              <div className="relative">
                {[
                  {
                    year: 2018,
                    title: "Foundation",
                    description: "Lumina Learn Nexus is founded with a vision to revolutionize online education.",
                    icon: <Calendar className="w-6 h-6" />
                  },
                  {
                    year: 2019,
                    title: "First Courses",
                    description: "Launch of our initial course catalog focusing on technology and business skills.",
                    icon: <BookOpen className="w-6 h-6" />
                  },
                  {
                    year: 2020,
                    title: "AI Integration",
                    description: "Introduction of our AI learning assistant, a groundbreaking feature in EdTech.",
                    icon: <MessageSquare className="w-6 h-6" />
                  },
                  {
                    year: 2021,
                    title: "Global Expansion",
                    description: "Expanding our reach to over 100 countries and adding multilingual support.",
                    icon: <Globe className="w-6 h-6" />
                  },
                  {
                    year: 2023,
                    title: "Today",
                    description: "Continuing to innovate and expand our platform to serve learners worldwide.",
                    icon: <Award className="w-6 h-6" />
                  }
                ].map((event, index) => (
                  <div 
                    key={index} 
                    className={`mb-12 flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} opacity-0 transform translate-y-4`}
                    style={{
                      animation: `fade-in-up 0.6s ease-out ${index * 0.2}s forwards`
                    }}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                      <div className={`${index % 2 === 0 ? "float-right" : "float-left"}`}>
                        <span className="bg-primary text-white py-1 px-3 rounded-full text-sm inline-block mb-2">
                          {event.year}
                        </span>
                        <h3 className="font-serif text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200">
                        {event.icon}
                      </div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join Our Learning Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be part of our growing community of learners and start your journey to mastery today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-lumina-800 hover:bg-gray-100">
                  Explore Courses
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
