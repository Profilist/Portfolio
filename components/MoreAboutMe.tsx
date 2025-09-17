"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    image: '/about/osu.jpg', 
    alt: 'osu!mania', 
    title: 'osu!mania', 
    description: (
      <>former #1 Canadian <Link href="https://osu.ppy.sh/users/15314355" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">osu!mania player</Link></>
    )
  },
  { 
    id: 2, 
    image: '/about/devpost.svg', 
    alt: 'devpost', 
    title: 'I like hackathons!', 
    description: (
      <>I&apos;ve done 20+ <Link href="http://devpost.com/larris-xie" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">hackathons</Link></>
    ) 
  },
  { id: 3, image: '/about/rabbit.png', alt: 'rabbit', title: 'My pet rabbit 🐇', description: 'His name is Tutu!' },
  { id: 4, image: '/about/teddy.jpg', alt: 'teddy', title: 'Teddy', description: 'The best dog :3' },
  { id: 5, image: '/about/wordhunt.jpg', alt: 'wordhunt', title: 'I play a lot of Word Hunt...', description: 'My highscore is 49100' },
  { id: 6, image: '/about/piano.jpg', alt: 'piano', title: '🎹', description: <>I&apos;ve been playing the piano for 15 years</> },
  { id: 7, image: '/about/huangshan.jpg', alt: 'huangshan', title: 'Huangshan', description: 'One of my favourite places' },
  { id: 8, image: '/about/frisbee.png', alt: 'frisbee', title: '🏀 + 🥏 + 🏓', description: 'I like playing basketball, ultimate frisbee, and ping pong!' },
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
    <div className="relative w-full" data-more-about-section onClick={handleOutsideClick}>
      <h2 className="text-3xl md:text-4xl text-center font-medium">More about me!</h2>
      <div className="mx-auto relative">
        <div className={`container ${isAnimationPaused ? 'paused' : ''}`} 
          style={{ 
            '--total': CONFIG.items * 2,
            '--duration': `${CONFIG.items * 3}s`, 
          } as React.CSSProperties}>
          <div className="carousel-container">
            <ul
              className="carousel"
              style={{
                animationName: "carousel",
                animationDuration: `${CONFIG.items * 3}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: isAnimationPaused ? "paused" : "running",
              }}
            >
              {Array.from({ length: CONFIG.items * 2}).map((_, i) => {
                const item = carouselItems[i % carouselItems.length];
                return (
                  <li
                    key={`${item.id}-${i}`}
                    className="carousel-item cursor-pointer"
                    style={{ '--index': i } as React.CSSProperties}
                    onClick={() => handleClick(item)}
                  >
                    <Image src={item.image} alt={item.alt} width={200} height={200} priority={i < carouselItems.length}/>
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
        <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h3 className="font-instrument text-2xl text-center mb-2">{activeItem.title}</h3>
            <p className="text-sm text-center text-gray-700">{activeItem.description}</p>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}