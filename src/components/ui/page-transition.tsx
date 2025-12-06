'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Start loading animation
    setIsLoading(true);

    // Delay to show loading screen
    const loadingTimer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 800); // 800ms loading screen

    return () => clearTimeout(loadingTimer);
  }, [pathname, children]);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-void transition-opacity duration-500 ${
          isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center">
          {/* Animated Logo/Loading Indicator */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Outer spinning ring */}
              <div className="h-24 w-24 rounded-full border-4 border-steel animate-spin border-t-plasma"></div>

              {/* Inner pulsing circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-plasma/20 animate-pulse"></div>
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-plasma"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="font-display text-display-sm font-bold text-text-primary animate-pulse">
              Loading...
            </p>
            <p className="text-body-sm text-text-tertiary font-mono">
              {pathname === '/' && 'Portfolio'}
              {pathname === '/mission-control' && 'Mission Control'}
              {pathname === '/game' && 'Recruiter Game'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-64 mx-auto">
            <div className="h-1 bg-steel rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-plasma to-thrust animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
}
