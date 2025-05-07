
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLoading } from '@/contexts/LoadingContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingScreen from '@/components/LoadingScreen';

const LoadingDemo = () => {
  const { showLoading, hideLoading, setProgress } = useLoading();
  const [activeTab, setActiveTab] = useState('fullscreen');
  
  // Function to simulate loading with progress
  const simulateLoadingWithProgress = () => {
    showLoading('Loading with progress...');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress >= 100) {
        progress = 100;
        setProgress(progress);
        clearInterval(interval);
        
        setTimeout(() => {
          hideLoading();
        }, 500);
      } else {
        setProgress(progress);
      }
    }, 300);
  };
  
  // Function to simulate simple loading
  const simulateSimpleLoading = () => {
    showLoading('Please wait...');
    
    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-semibold mb-8">Loading Screen Demo</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fullscreen">Fullscreen Loading</TabsTrigger>
            <TabsTrigger value="inline">Inline Loading</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fullscreen" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fullscreen Loading Overlay</CardTitle>
                <CardDescription>
                  Display a fullscreen loading overlay for major application transitions or initial load states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={simulateSimpleLoading}
                    className="w-full"
                  >
                    Show Simple Loading
                  </Button>
                  
                  <Button 
                    onClick={simulateLoadingWithProgress}
                    className="w-full"
                    variant="outline"
                  >
                    Show Loading with Progress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inline Content Loading</CardTitle>
                <CardDescription>
                  Display loading states within components or content areas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <LoadingScreen 
                    variant="content" 
                    message="Loading content..." 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  This demonstrates the loading component in a contained area.
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>To use the loading screen in your components:</p>
              
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {`// Import the hook
import { useLoading } from '@/contexts/LoadingContext';

// In your component
const { showLoading, hideLoading, setProgress } = useLoading();

// Show loading
showLoading('Custom loading message');

// Update progress (0-100)
setProgress(45);

// Hide loading
hideLoading();`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoadingDemo;
