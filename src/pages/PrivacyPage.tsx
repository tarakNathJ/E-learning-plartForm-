
import React from "react";
import { Link } from "react-router-dom";
import { Shield, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PrivacyPage: React.FC = () => {
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
            <Shield className="h-8 w-8 text-lumina-600 mr-3" />
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Privacy Policy
            </h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: April 29, 2025
            </p>

            <p className="text-gray-700 mb-4">
              At Lumina Learn Nexus, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us when registering for an account, creating or modifying your profile, or interacting with features of the Service. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Contact information (name, email address)</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>User preferences</li>
              <li>Content you submit or post to the Service</li>
              <li>Course progress and assessment data</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages and information</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and activities</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              3. Sharing of Information
            </h2>
            <p className="text-gray-700 mb-4">
              We may share the information we collect in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>With vendors, consultants, and service providers who need access to such information to perform services for us</li>
              <li>In response to a legal request if we believe disclosure is required by law</li>
              <li>To protect the rights, property, and safety of our users and the public</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 mb-4">
              We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic transmission is ever fully secure or error-free.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              5. Analytics and Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              We may use cookies, web beacons, and similar technologies to collect information about your interactions with our Service. This helps us improve and customize our services. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              6. Your Choices
            </h2>
            <p className="text-gray-700 mb-4">
              You may update, correct, or delete your account information at any time by logging into your account. If you wish to delete your account completely, please contact us.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              7. Changes to this Privacy Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-4">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to, and maintained on, computers located outside your state, province, country, or other governmental jurisdiction where privacy laws may not be as protective as those in your jurisdiction.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@luminalearn.com.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link to="/terms" className="text-lumina-600 hover:text-lumina-800 flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Terms of Service
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

export default PrivacyPage;
