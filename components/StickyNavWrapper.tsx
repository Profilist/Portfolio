'use client';

import { useTimelineDetection } from '@/lib/useTimelineDetection';
import StickyNav from './StickyNav';

const StickyNavWrapper = () => {
  const isInTimeline = useTimelineDetection();
  
  // Hide the nav when in timeline section
  return <StickyNav isVisible={!isInTimeline} />;
};

export default StickyNavWrapper;
