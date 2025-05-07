
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-lumina-500 to-lumina-700 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold mr-2">S</div>
              <span className="font-serif text-xl font-semibold text-gray-900">Smart Skill Learning</span>
            </div>
            <p className="text-gray-600 mb-4">
              Illuminating your path to knowledge through innovative learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-lumina-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lumina-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lumina-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lumina-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-lumina-600">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-lumina-600">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-lumina-600">Courses</Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-gray-600 hover:text-lumina-600">Lumina Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-lumina-600">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-lumina-600">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-lumina-600">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-lumina-600">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">
              Join our newsletter to get updates on new courses and features.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="input-primary flex-1 text-sm"
              />
              <button
                type="submit"
                className="ml-2 bg-lumina-600 hover:bg-lumina-700 text-white rounded-md px-4"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="flex justify-center items-center">
            <span>© {currentYear} Smart Skill Learning. Made with</span> 
            <Heart size={14} className="mx-1 text-lumina-600" fill="currentColor" /> 
            <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
