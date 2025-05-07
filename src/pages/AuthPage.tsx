
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Github, Mail, ArrowRight, Info, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login ,signUp } = useUser();
  const isRegisterRoute = location.pathname === "/register";
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form submission handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Log in the user
    const loginSuccess = login(loginEmail, loginPassword);
    
    // Redirect to profile page on success
    if (loginSuccess) {
      setTimeout(() => {
        navigate("/profile");
      }, 10);
    }
  };

  const handleRegister =async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }
    
    // Register and log in the user as student
    const signUpSuccess = await signUp(registerName ,registerEmail, registerPassword);
    
    // Redirect to profile page on success
    if (signUpSuccess) {
      toast.success("Account created successfully | plece login..");
    }
  };

  // Admin login hint
  const showAdminHint = () => {
    toast.info("Admin Email: admin@luminalearn.com, Password: admin123", {
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-lumina-500 to-lumina-700 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-2">L</div>
        <span className="font-serif text-2xl font-semibold text-gray-900">Lumina Learn Nexus</span>
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        <Tabs defaultValue={isRegisterRoute ? "register" : "login"} className="w-full">
          <div className="bg-lumina-50 px-6 py-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login" className="data-[state=active]:bg-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-white">Register</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="px-6 py-8">
            <TabsContent value="login">
              <div className="text-center mb-6">
                <h1 className="font-serif text-2xl font-bold mb-2">Welcome back</h1>
                <p className="text-gray-600">
                  Sign in to continue your learning journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Github size={18} />
                  <span>GitHub</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2">
                  <Mail size={18} />
                  <span>Google</span>
                </Button>
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-gray-500">or continue with</span>
                </div>
              </div>
              
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-lumina-600 hover:text-lumina-800">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(!!checked)}
                        className="data-[state=checked]:bg-lumina-600 data-[state=checked]:border-lumina-600"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    {/* <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={showAdminHint}
                      className="flex items-center"
                    >
                      <Info size={14} className="mr-1" />
                      <span className="text-xs">Admin?</span>
                    </Button> */}
                  </div>
                  
                  {/* Login button - Fixed styling to ensure visibility */}
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-2"
                  >
                    <LogIn className="mr-2" size={16} />
                    <span>Login to your account</span>
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="text-center mb-6">
                <h1 className="font-serif text-2xl font-bold mb-2">Create an account</h1>
                <p className="text-gray-600">
                  Join our community of learners today
                </p>
              </div>
              
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="agree-terms" 
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                      className="data-[state=checked]:bg-lumina-600 data-[state=checked]:border-lumina-600"
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <Link to="/terms" className="text-lumina-600 hover:text-lumina-800">Terms</Link> and <Link to="/privacy" className="text-lumina-600 hover:text-lumina-800">Privacy Policy</Link>
                    </label>
                  </div>
                  
                  {/* Register button - Fixed styling to ensure visibility */}
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Create account
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Lumina Learn Nexus. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthPage;
