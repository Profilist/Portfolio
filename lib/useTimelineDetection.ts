import { useEffect, useState } from 'react';

/**
 * Custom hook to detect when the user is scrolling through the timeline section.
 * Returns true when the timeline section is in the viewport (should hide navigation).
 */
export function useTimelineDetection() {
  const [isInTimeline, setIsInTimeline] = useState(false);

  useEffect(() => {
    const timelineSection = document.querySelector('[data-timeline-section]');
    const moreAboutSection = document.querySelector('[data-more-about-section]');

    if (!timelineSection) {
      setIsInTimeline(false);
      return;
    }

    let timelineActive = false;
    let moreAboutActive = false;

    const updateVisibility = () => {
      setIsInTimeline(timelineActive && !moreAboutActive);
    };

    const createObservers = () => {
      const windowHeight = window.innerHeight;
      const timelineObserver = new IntersectionObserver(
        ([entry]) => {
          timelineActive = entry.isIntersecting;
          updateVisibility();
        },
        {
          rootMargin: `${-(windowHeight * 0.5)}px 0px 0px 0px`,
          threshold: 0,
        }
      );

      const moreAboutObserver = new IntersectionObserver(
        ([entry]) => {
          moreAboutActive = entry.isIntersecting;
          updateVisibility();
        },
        {
          rootMargin: `${-(windowHeight * 0.8)}px 0px 0px 0px`,
          threshold: 0,
        }
      );

      timelineObserver.observe(timelineSection);

      if (moreAboutSection) {
        moreAboutObserver.observe(moreAboutSection);
      }

      return () => {
        timelineObserver.disconnect();
        moreAboutObserver.disconnect();
      };
    };

    let cleanup = createObservers();
    const handleResize = () => {
      cleanup();
      cleanup = createObservers();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isInTimeline;
}
