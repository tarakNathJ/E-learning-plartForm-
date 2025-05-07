
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { CreditCard, DollarSign, BadgePercent, CreditCardIcon, Receipt, ClipboardList } from "lucide-react";

const PaymentSettingsPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.error("Please log in to access this page");
      return;
    }

    if (user?.role !== "administrator") {
      navigate('/profile');
      toast.error("You don't have permission to access this page");
    }
  }, [isAuthenticated, user, navigate]);

  // Mock payment gateway data
  const paymentGateways = [
    { id: "stripe", name: "Stripe", enabled: true, fee: "2.9% + $0.30" },
    { id: "paypal", name: "PayPal", enabled: false, fee: "3.49% + $0.49" },
    { id: "razorpay", name: "Razorpay", enabled: false, fee: "2.0% + ₹2" },
  ];

  const handleToggleGateway = (id: string) => {
    toast.success(`${id} payment gateway status updated`);
  };

  const handleSaveSettings = () => {
    toast.success("Payment settings saved successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50">
      <Navbar />
      <main className="flex-grow section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pastel-purple-700">Payment Settings</h1>
              <p className="text-pastel-purple-500">Configure payment options and gateways</p>
            </div>
            <Button 
              onClick={() => navigate("/profile")}
              className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure how payments work on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start bg-pastel-purple-100 text-pastel-purple-700 hover:bg-pastel-purple-200"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Gateways
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-pastel-purple-700 hover:bg-pastel-purple-100"
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Currency Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-pastel-purple-700 hover:bg-pastel-purple-100"
                    >
                      <BadgePercent className="mr-2 h-4 w-4" />
                      Tax Configuration
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-pastel-purple-700 hover:bg-pastel-purple-100"
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      Invoice Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-pastel-purple-700 hover:bg-pastel-purple-100"
                    >
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Payout Schedule
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateways</CardTitle>
                  <CardDescription>Configure payment processor integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {paymentGateways.map((gateway) => (
                    <div key={gateway.id} className="border border-pastel-purple-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pastel-purple-100 rounded-full flex items-center justify-center">
                            <CreditCardIcon className="h-5 w-5 text-pastel-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-pastel-purple-700">{gateway.name}</h3>
                            <p className="text-sm text-pastel-purple-500">Fee: {gateway.fee}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={gateway.enabled} 
                          onCheckedChange={() => handleToggleGateway(gateway.id)}
                        />
                      </div>
                      
                      {gateway.enabled && (
                        <div className="space-y-4 border-t border-pastel-purple-100 pt-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block text-pastel-purple-700">
                                API Key
                              </label>
                              <Input 
                                type="password" 
                                value="•••••••••••••••••••••••••" 
                                className="border-pastel-purple-200 focus-visible:ring-pastel-purple-300"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block text-pastel-purple-700">
                                Secret Key
                              </label>
                              <Input 
                                type="password" 
                                value="•••••••••••••••••••••••••" 
                                className="border-pastel-purple-200 focus-visible:ring-pastel-purple-300"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block text-pastel-purple-700">
                                Webhook URL
                              </label>
                              <Input 
                                value="https://example.com/webhooks/stripe" 
                                readOnly
                                className="border-pastel-purple-200 focus-visible:ring-pastel-purple-300 bg-pastel-purple-50"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              variant="outline" 
                              className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                            >
                              Test Connection
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>General Payment Settings</CardTitle>
                  <CardDescription>Configure default payment behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-pastel-purple-700">Enable Test Mode</h3>
                        <p className="text-sm text-pastel-purple-500">Process test payments without charging real money</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <Separator className="my-4 bg-pastel-purple-100" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-pastel-purple-700">Allow Guest Checkout</h3>
                        <p className="text-sm text-pastel-purple-500">Allow payments without user registration</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    
                    <Separator className="my-4 bg-pastel-purple-100" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-pastel-purple-700">Send Payment Receipts</h3>
                        <p className="text-sm text-pastel-purple-500">Email receipt to users after successful payment</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    className="border-pastel-purple-200 text-pastel-purple-700 hover:bg-pastel-purple-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-pastel-purple-300 hover:bg-pastel-purple-400"
                    onClick={handleSaveSettings}
                  >
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettingsPage;
