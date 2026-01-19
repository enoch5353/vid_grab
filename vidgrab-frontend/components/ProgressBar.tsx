'use client';

import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Listen for custom events from the main page
  useEffect(() => {
    const handleLoadStart = () => {
      setIsLoading(true);
      setProgress(10);
    };

    const handleLoadEnd = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
    };

    const handleProgress = (e: Event) => {
      const event = e as CustomEvent;
      setProgress(event.detail);
    };

    window.addEventListener('vidgrab:loadstart', handleLoadStart);
    window.addEventListener('vidgrab:loadend', handleLoadEnd);
    window.addEventListener('vidgrab:progress', handleProgress);

    return () => {
      window.removeEventListener('vidgrab:loadstart', handleLoadStart);
      window.removeEventListener('vidgrab:loadend', handleLoadEnd);
      window.removeEventListener('vidgrab:progress', handleProgress);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: `${progress}%` }}
    />
  );
}
