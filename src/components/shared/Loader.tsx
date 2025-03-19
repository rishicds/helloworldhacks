import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const GifLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const gifRef = useRef(null);
  
  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkDevice();
    
    // Listen for resize events
    window.addEventListener('resize', checkDevice);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Handle GIF load and end events
  useEffect(() => {
    const gifElement = gifRef.current;
    
    if (gifElement) {
      // Function to handle when the GIF has played through
      const handleGifEnd = () => {
        // In a real implementation, you'd need to detect when the GIF has completed
        // Since GIFs don't have a natural "ended" event, we're simulating this
        // You might need to know the exact duration of your GIF for this to work properly
        setIsLoading(false);
      };
      
      // For this demo, we'll simulate a GIF duration of 3 seconds
      const gifDuration = 2000;
      const timer = setTimeout(handleGifEnd, gifDuration);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // GIF sources based on device type
  const gifSource = isMobile 
    ? "/loadermobile.gif" // Mobile GIF placeholder (in real usage, replace with actual GIF URL)
    : "/loader.gif"; // Desktop GIF placeholder (in real usage, replace with actual GIF URL)
  
  if (!isLoading) {
    return null; // Loader disappears when GIF is complete
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent rounded-lg w-full h-full flex items-center justify-center">
        {/* GIF only, no text or other elements */}
        <Image 
          ref={gifRef}
          src={gifSource}
          alt="Loading"
          className="w-full h-full object-cover"
          width={isMobile ? 200 : 400}
          height={isMobile ? 200 : 400}
        />
      </div>
    </div>
  );
};

export default GifLoader;