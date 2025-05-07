
import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

/**
 * A hook to show a loading screen during async operations
 * 
 * @param isLoading Boolean to control when loading is shown
 * @param message Optional message to display
 * @param autoProgress Optional boolean to enable automatic progress simulation
 * @param forceFullscreen Optional boolean to force fullscreen mode regardless of progress
 */
export const useLoadingScreen = (
  isLoading: boolean, 
  message?: string,
  autoProgress?: boolean,
  forceFullscreen?: boolean
) => {
  const { showLoading, hideLoading, setProgress } = useLoading();
  
  useEffect(() => {
    if (isLoading) {
      showLoading(message);
      
      // Simulate progress if autoProgress is enabled
      if (autoProgress) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress > 95) {
            progress = 95;
            clearInterval(interval);
          }
          setProgress(progress);
        }, 500);
        
        return () => clearInterval(interval);
      }
      
      // If forceFullscreen is true, we still want to show progress
      if (forceFullscreen) {
        setProgress(10); // Just enough to trigger progress display
      }
    } else {
      hideLoading();
    }
  }, [isLoading, message, autoProgress, forceFullscreen, showLoading, hideLoading, setProgress]);
  
  return { setProgress };
};
