'use client';

import { useState, useEffect } from 'react';
import { LogoLoading } from '@/components/ui/logo-loading';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has seen loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');

    if (hasSeenLoading) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoading', 'true');
    setShowContent(true);
  };

  return (
    <>
      {isLoading && <LogoLoading onComplete={handleLoadingComplete} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s' }}>
        {children}
      </div>
    </>
  );
}
