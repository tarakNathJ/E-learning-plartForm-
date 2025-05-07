
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Download, Share, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";

const certificates = [
  {
    id: "cert1",
    title: "Introduction to Web Development",
    issueDate: "March 15, 2023",
    credentialId: "WD-2023-78945",
    pdfUrl: "#",
    thumbnailUrl: "/lovable-uploads/89f71449-43e9-4322-8dc7-19749e25cfa1.png",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    instructor: "Dr. Alex Johnson",
    hours: 24,
    verificationUrl: "https://luminalearn.com/verify/WD-2023-78945",
  },
  {
    id: "cert2",
    title: "UX Design Fundamentals",
    issueDate: "December 10, 2022",
    credentialId: "UX-2022-45612",
    pdfUrl: "#",
    thumbnailUrl: "/lovable-uploads/89f71449-43e9-4322-8dc7-19749e25cfa1.png",
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    instructor: "Prof. Sarah Miller",
    hours: 18,
    verificationUrl: "https://luminalearn.com/verify/UX-2022-45612",
  },
];

const CertificatesPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleViewCertificate = (cert: typeof certificates[0]) => {
    setSelectedCert(cert);
    setShowCertificate(true);
  };

  const handleDownload = (format: string, cert: typeof certificates[0]) => {
    toast.success(`Downloading ${cert.title} certificate as ${format}`);
    // In a real app, this would trigger an actual file download
  };

  const handleShare = (cert: typeof certificates[0]) => {
    // In a real app, this would open a share dialog with the certificate verification URL
    navigator.clipboard.writeText(cert.verificationUrl);
    toast.success("Certificate verification link copied to clipboard!");
  };

  const handleVerificationLink = (cert: typeof certificates[0]) => {
    window.open(cert.verificationUrl, "_blank");
    toast.success("Opening certificate verification page");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-pastel-purple-700" />
              <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">My Certificates</h1>
            </div>
            <Button 
              variant="outline" 
              className="border-pastel-purple-200 hover:bg-pastel-purple-50 text-pastel-purple-700"
              onClick={() => navigate("/profile")}
            >
              Back to Profile
            </Button>
          </div>
          
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="p-6 bg-white/80 hover:shadow-md transition-all border-pastel-pink-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-pastel-purple-700">{cert.title}</h2>
                      <p className="text-sm text-gray-600">Issued: {cert.issueDate}</p>
                      <p className="text-xs text-gray-500 mt-1">Credential ID: {cert.credentialId}</p>
                    </div>
                    <Award className="h-10 w-10 text-pastel-purple-400" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 my-4">
                    {cert.skills.map(skill => (
                      <span key={skill} className="bg-pastel-purple-100 text-pastel-purple-700 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="default" 
                      className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
                      onClick={() => handleViewCertificate(cert)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                    
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleDownload('pdf', cert)}>
                            PDF Format
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload('jpg', cert)}>
                            JPG Format
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => handleShare(cert)}
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Award className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">No Certificates Yet</h2>
              <p className="text-gray-500 mb-6">Complete your courses to earn certificates</p>
              <Button 
                className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </Button>
            </Card>
          )}
        </div>
      </main>
      
      {/* Certificate preview dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate of Completion</DialogTitle>
            <DialogDescription>
              {selectedCert?.credentialId} • Issued on {selectedCert?.issueDate}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-white p-6 rounded-lg border shadow-inner">
            <div className="border-8 border-double border-pastel-purple-200 p-8 text-center">
              <div className="flex justify-center mb-6">
                <Award className="h-16 w-16 text-pastel-purple-600" />
              </div>
              <h1 className="font-serif text-3xl mb-2 text-pastel-purple-800">Certificate of Completion</h1>
              <p className="text-lg mb-10">This certifies that</p>
              <p className="text-2xl font-semibold mb-10 font-serif">{user?.name}</p>
              <p className="text-lg mb-4">has successfully completed</p>
              <p className="text-2xl font-bold mb-2 font-serif">{selectedCert?.title}</p>
              <p className="mb-10">with {selectedCert?.hours} hours of coursework</p>
              <p className="text-sm text-gray-600 mb-1">Instructor: {selectedCert?.instructor}</p>
              <p className="text-sm text-gray-600">Credential ID: {selectedCert?.credentialId}</p>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => handleVerificationLink(selectedCert!)}
            >
              Verify Certificate
            </Button>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleDownload('pdf', selectedCert!)}>
                    PDF Format
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('jpg', selectedCert!)}>
                    JPG Format
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="outline" 
                onClick={() => handleShare(selectedCert!)}
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default CertificatesPage;
