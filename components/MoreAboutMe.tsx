'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type CarouselItem = {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: React.ReactNode;
};

const carouselItems: CarouselItem[] = [
  { 
    id: 1, 
    image: '/about/osu.png', 
    alt: 'osu!mania', 
    title: 'I play osu!mania', 
    description: (
      <>former #1 Canadian <Link href="https://osu.ppy.sh/users/15314355" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">osu!mania player</Link></>
    )
  },
  { 
    id: 2, 
    image: '/about/devpost.svg', 
    alt: 'devpost', 
    title: 'Check out my hackathons', 
    description: (
      <>I&apos;ve done 20+ <Link href="http://devpost.com/larris-xie" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">hackathons</Link>!</>
    ) 
  },
  { id: 3, image: '/about/hawaii.png', alt: 'hawaii', title: 'Hawaii', description: 'Beautiful beaches and stunning landscapes' },
  { id: 4, image: '/about/huangshan.jpg', alt: 'huangshan', title: 'Huangshan', description: 'Exploring the mystical Yellow Mountains' },
  { id: 5, image: '/about/wuzhen.jpg', alt: 'wuzhen', title: 'Wuzhen', description: 'Ancient water town with rich history' },
  { id: 6, image: '/about/nanjing.jpg', alt: 'nanjing', title: 'Nanjing', description: 'Historical city with modern charm' },
  { id: 7, image: '/about/shanghai.jpg', alt: 'shanghai', title: 'Shanghai', description: 'The Pearl of the Orient' },
  { id: 8, image: '/about/xian.jpg', alt: 'xian', title: 'Xian', description: 'Home of the Terracotta Warriors' },
];

const CONFIG = {
  animate: true,
  masklower: 0.9,
  maskupper: 1.8,
  perspective: 320,
  items: carouselItems.length,
  gap: 0.1,
  rotatex: 0,
  rotatez: 0,
  buff: 2,
};

export default function MoreAboutMe() {
  const [activeItem, setActiveItem] = useState<typeof carouselItems[0] | null>(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.animate = CONFIG.animate.toString();
    document.documentElement.style.setProperty('--gap-efficient', CONFIG.gap.toString());
    document.documentElement.style.setProperty('--rotate-x', CONFIG.rotatex.toString());
    document.documentElement.style.setProperty('--rotate-z', CONFIG.rotatez.toString());
    document.documentElement.style.setProperty('--mask-lower', CONFIG.masklower.toString());
    document.documentElement.style.setProperty('--mask-upper', CONFIG.maskupper.toString());
    document.documentElement.style.setProperty('--scroll-ratio', CONFIG.buff.toString());
    document.documentElement.style.setProperty('--perspective', CONFIG.perspective.toString());
  }, []);

  const handleClick = (item: typeof carouselItems[0]) => {
    if (activeItem?.id === item.id) {
      setActiveItem(null);
      setIsAnimationPaused(false);
    } else {
      setActiveItem(item);
      setIsAnimationPaused(true);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    // Check if the click is outside the carousel items and details
    const target = e.target as HTMLElement;
    if (!target.closest('.carousel-item') && !target.closest('.details-overlay')) {
      setActiveItem(null);
      setIsAnimationPaused(false);
    }
  };

  return (
    <div className="relative w-full" onClick={handleOutsideClick}>
      <h2 className="text-3xl md:text-4xl text-center font-medium">More about me!</h2>
      <div className="mx-auto relative">
        <div className={`container ${isAnimationPaused ? 'paused' : ''}`} style={{ '--total': CONFIG.items * 2 } as React.CSSProperties}>
          <div className="carousel-container">
            <ul className="carousel">
              {Array.from({ length: CONFIG.items * 2}).map((_, i) => {
                const item = carouselItems[i % carouselItems.length];
                return (
                  <li
                    key={`${item.id}-${i}`}
                    className="carousel-item cursor-pointer"
                    style={{ '--index': i } as React.CSSProperties}
                    onClick={() => handleClick(item)}
                  >
                    <img src={item.image} alt={item.alt} />
                  </li>
                );
              })}
            </ul>
          </div>
          <ul className="controller">
            {Array.from({ length: CONFIG.items }).map((_, i) => (
              <li key={i}></li>
            ))}
          </ul>
        </div>
        
        {/* Hover Content */}
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            className="details-overlay absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg"
          >
            <motion.div
              className="w-32 h-32 rounded-xl overflow-hidden mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h3 className="font-instrument text-2xl text-center mb-2">{activeItem.title}</h3>
            <p className="text-sm text-center text-gray-700">{activeItem.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}