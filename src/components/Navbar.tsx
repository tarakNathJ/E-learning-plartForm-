import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Book, Home, Info, MessageSquare } from "lucide-react";
import { useUser } from '@/contexts/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
              <span className="font-serif text-xl font-semibold text-gray-900">Smart Skill Learning</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link flex items-center space-x-1">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link to="/about" className="nav-link flex items-center space-x-1">
              <Info size={16} />
              <span>About</span>
            </Link>
            <Link to="/courses" className="nav-link flex items-center space-x-1">
              <Book size={16} />
              <span>Courses</span>
            </Link>
            <Link to="/ai-assistant" className="nav-link flex items-center space-x-1">
              <MessageSquare size={16} />
              <span>Smart Guide</span>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User size={16} />
                    <span>My Profile</span>
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User size={16} />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Home size={18} />
                <span>Home</span>
              </div>
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Info size={18} />
                <span>About</span>
              </div>
            </Link>
            <Link 
              to="/courses" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Book size={18} />
                <span>Courses</span>
              </div>
            </Link>
            <Link 
              to="/ai-assistant" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare size={18} />
                <span>Smart Guide</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span>My Profile</span>
                  </div>
                </Link>
                <div className="px-3 py-2">
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <User size={18} />
                    <span>Sign In</span>
                  </div>
                </Link>
                <div className="px-3 py-2">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm">Sign Up Free</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
