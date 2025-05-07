
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Award, CheckCircle, XCircle, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock certificate database - in a real app, this would come from an API
const certificatesDatabase = [
  {
    id: "WD-2023-78945",
    title: "Introduction to Web Development",
    recipientName: "Jane Smith",
    issueDate: "March 15, 2023",
    expiryDate: "None (Lifetime)",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    instructor: "Dr. Alex Johnson",
    hours: 24,
  },
  {
    id: "UX-2022-45612",
    title: "UX Design Fundamentals",
    recipientName: "Jane Smith",
    issueDate: "December 10, 2022",
    expiryDate: "None (Lifetime)",
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    instructor: "Prof. Sarah Miller",
    hours: 18,
  },
];

const CertificateVerificationPage = () => {
  const navigate = useNavigate();
  const { certId } = useParams();
  const [searchQuery, setSearchQuery] = useState(certId || "");
  const [certificate, setCertificate] = useState<typeof certificatesDatabase[0] | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (certId) {
      verifyCertificate(certId);
    }
  }, [certId]);

  const verifyCertificate = (id: string) => {
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const foundCert = certificatesDatabase.find(cert => cert.id === id);
      setCertificate(foundCert || null);
      setIsVerified(!!foundCert);
      setIsSearching(false);
    }, 1000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      verifyCertificate(searchQuery);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Award className="h-16 w-16 text-pastel-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700 mb-3">Certificate Verification</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Verify the authenticity of certificates issued by Lumina Learn. Enter the certificate ID to verify its validity.
            </p>
          </div>

          <Card className="p-8 mb-10">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Enter Certificate ID (e.g., WD-2023-78945)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-pastel-purple-200 focus-visible:ring-pastel-purple-400"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-pastel-purple-500 hover:bg-pastel-purple-600"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Verify"}
                {!isSearching && <Search className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            {isVerified === null && !isSearching ? (
              <div className="mt-8 text-center py-16">
                <Search className="h-12 w-12 text-pastel-purple-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter a certificate ID to verify its authenticity</p>
              </div>
            ) : isSearching ? (
              <div className="mt-8 text-center py-16">
                <div className="h-12 w-12 rounded-full border-4 border-pastel-purple-300 border-t-pastel-purple-600 animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Verifying certificate...</p>
              </div>
            ) : isVerified ? (
              <div className="mt-8">
                <div className="flex items-center justify-center mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-green-700">Valid Certificate</h2>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{certificate?.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Recipient</p>
                      <p className="font-medium">{certificate?.recipientName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-medium">{certificate?.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium">{certificate?.issueDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Expiry</p>
                      <p className="font-medium">{certificate?.expiryDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Instructor</p>
                      <p className="font-medium">{certificate?.instructor}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Course Hours</p>
                      <p className="font-medium">{certificate?.hours} hours</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills Certified</p>
                    <div className="flex flex-wrap gap-2">
                      {certificate?.skills.map(skill => (
                        <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flex items-center justify-center mb-6">
                  <XCircle className="h-12 w-12 text-red-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-red-700">Invalid Certificate</h2>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-gray-800 mb-2">
                    No certificate found with ID: <span className="font-medium">{searchQuery}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Please check the certificate ID and try again, or contact support if you believe this is an error.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </Card>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pastel-purple-700 mb-4">About Our Certificates</h2>
            <p className="text-gray-600 mb-6">
              All Lumina Learn certificates contain a unique identifier that can be used to verify their authenticity.
              Employers and institutions can use this service to validate credentials presented by our graduates.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate("/about")}
              className="border-pastel-purple-200"
            >
              Learn More About Our Programs
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificateVerificationPage;
