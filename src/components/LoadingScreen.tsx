
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: "full" | "content";
  className?: string;
}

const LoadingScreen = ({
  message = "Loading content...",
  showProgress = false,
  progress = 0,
  variant = "full",
  className,
}: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center",
        variant === "full" && "fixed inset-0 bg-background/95 backdrop-blur-sm z-50",
        variant === "content" && "h-full min-h-[300px]",
        className
      )}
      style={{ pointerEvents: "all" }}
    >
      <div className="max-w-md w-full px-4">
        {/* Logo skeleton */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl animate-pulse">
              S
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderCircle className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-8 w-3/4 max-w-xs rounded-md" />
        </div>

        {/* Content skeletons */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border p-3">
              <Skeleton className="h-3 w-3/4 mb-2 rounded-md" />
              <Skeleton className="h-8 w-full rounded-md mb-1" />
              <Skeleton className="h-3 w-2/3 rounded-md" />
            </div>
          ))}
        </div>

        {/* Progress */}
        {showProgress && (
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% complete</span>
              <span>{message}</span>
            </div>
          </div>
        )}

        {!showProgress && (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
              <LoaderCircle className="animate-spin h-3 w-3" />
              <span>{message}</span>
            </div>
            
            <div className="flex gap-1.5 mt-3">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full bg-primary animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0.7 + (i * 0.1)
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
