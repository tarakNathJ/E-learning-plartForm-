
import React, { createContext, useState, useContext, ReactNode } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setProgress: (progress: number) => void;
  setMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [progress, setProgress] = useState(0);

  const showLoading = (newMessage?: string) => {
    if (newMessage) setMessage(newMessage);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setProgress(0);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading) setProgress(0);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        showLoading,
        hideLoading,
        setProgress,
        setMessage
      }}
    >
      {children}
      {isLoading && (
        <LoadingScreen 
          message={message} 
          showProgress={true}
          progress={progress > 0 ? progress : 10}
        />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
