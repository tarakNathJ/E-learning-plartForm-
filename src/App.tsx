
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";

// Import our pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import AuthPage from "./pages/AuthPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import LoadingDemo from "./pages/LoadingDemo";

// Import student pages
import CertificatesPage from "./pages/student/CertificatesPage";
import CourseLearningPage from "./pages/student/CourseLearningPage";
import CertificateVerificationPage from "./pages/student/CertificateVerificationPage";
import StudentMessagesPage from "./pages/student/StudentMessagesPage"; // Add this line
import StudentLiveSessionsPage from "./pages/student/StudentLiveSessionsPage"; // Add this line
import StudentAssignmentsPage from "./pages/student/StudentAssignmentsPage"; // Add this line

// Import admin pages
import CreateCoursePage from "./pages/admin/CreateCoursePage";
import LiveSessionPage from "./pages/admin/LiveSessionPage";
import BatchMessagingPage from "./pages/admin/BatchMessagingPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import PaymentSettingsPage from "./pages/admin/PaymentSettingsPage";
import EmailTemplatesPage from "./pages/admin/EmailTemplatesPage";
import AdminAssignmentsPage from "./pages/admin/AdminAssignmentsPage"; // Add this line

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LoadingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/register" element={<AuthPage />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/loading-demo" element={<LoadingDemo />} /> 
                  
                  {/* Student routes */}
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="/certificates/:certId" element={<CertificatesPage />} />
                  <Route path="/courses/:courseId/learn" element={<CourseLearningPage />} />
                  <Route path="/courses/:courseId/lessons/:lessonId" element={<CourseLearningPage />} />
                  <Route path="/verify" element={<CertificateVerificationPage />} />
                  <Route path="/verify/:certId" element={<CertificateVerificationPage />} />
                  <Route path="/student/messages" element={<StudentMessagesPage />} />
                  <Route path="/student/live-sessions" element={<StudentLiveSessionsPage />} />
                  <Route path="/student/live-sessions/:sessionId" element={<StudentLiveSessionsPage />} />
                  <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
                  <Route path="/student/assignments/:assignId" element={<StudentAssignmentsPage />} />
                  <Route path="/student/assignments/:assignId/submit" element={<StudentAssignmentsPage />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/courses/create" element={<CreateCoursePage />} />
                  <Route path="/admin/live-session" element={<LiveSessionPage />} />
                  <Route path="/admin/messaging" element={<BatchMessagingPage />} />
                  <Route path="/admin/analytics" element={<AnalyticsPage />} />
                  <Route path="/admin/user-management" element={<UserManagementPage />} />
                  <Route path="/admin/payment-settings" element={<PaymentSettingsPage />} />
                  <Route path="/admin/email-templates" element={<EmailTemplatesPage />} />
                  <Route path="/admin/assignments" element={<AdminAssignmentsPage />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="/settings" element={<AccountSettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LoadingProvider>
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
