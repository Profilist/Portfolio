import { useEffect, useState } from 'react';

/**
 * Custom hook to detect when the user is scrolling through the timeline section.
 * Returns true when the timeline section is in the viewport (should hide navigation).
 */
export function useTimelineDetection() {
  const [isInTimeline, setIsInTimeline] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the timeline section and more about section
      const timelineSection = document.querySelector('[data-timeline-section]');
      const moreAboutSection = document.querySelector('[data-more-about-section]');
      
      if (!timelineSection) {
        setIsInTimeline(false);
        return;
      }

      const timelineRect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if "More About Me" section is visible
      let moreAboutVisible = false;
      if (moreAboutSection) {
        const moreAboutRect = moreAboutSection.getBoundingClientRect();
        moreAboutVisible = moreAboutRect.top < windowHeight * 0.8; // When it's 80% into viewport
      }
      
      // Hide nav when:
      // 1. The timeline section is actively being scrolled through (top above middle of viewport)
      // 2. AND the "More About Me" section is not yet visible
      const isActive = timelineRect.top < windowHeight * 0.5 && !moreAboutVisible;
      
      setIsInTimeline(isActive);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isInTimeline;
}
