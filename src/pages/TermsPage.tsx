
import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-lumina-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-lumina-500 to-lumina-700 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-2">
                L
              </div>
              <span className="font-serif text-2xl font-semibold text-gray-900">
                Lumina Learn Nexus
              </span>
            </Link>
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
              <Link to="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center mb-8">
            <FileText className="h-8 w-8 text-lumina-600 mr-3" />
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Terms of Service
            </h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: April 29, 2025
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing or using Lumina Learn Nexus ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-4">
              Lumina Learn Nexus provides an online educational platform with various features including but not limited to online courses, learning materials, assessments, and community interaction features. The Service may be updated, modified, or enhanced over time.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the Service, you must register for an account. You are responsible for maintaining the security of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              4. User Content
            </h2>
            <p className="text-gray-700 mb-4">
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You retain any rights to your user content. By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content (excluding user-provided content), features, and functionality are and will remain the exclusive property of Lumina Learn Nexus and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              6. Subscription and Payments
            </h2>
            <p className="text-gray-700 mb-4">
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring basis. Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a subscription.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              7. Termination
            </h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              In no event shall Lumina Learn Nexus, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms, please contact us at support@luminalearn.com.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link to="/privacy" className="text-lumina-600 hover:text-lumina-800 flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Privacy Policy
              </Link>
              <Button onClick={() => window.history.back()}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
