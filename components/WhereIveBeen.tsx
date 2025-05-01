"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { pushpinAnimation, timelineAccent } from "../lib/animations";

const timeline = [
  { company: "Shopify", role: "Software Engineer", dates: "May 2025 - Aug 2025", logo: "/experience/shopify.svg", accent: "#FFF8B8" },
  { company: "UWaterloo", role: "Research Assistant", dates: "Jan 2025 - Apr 2025", logo: "/experience/uwaterloo.svg", accent: "#EEEEEE" },
  { company: "Jobeyze", role: "Software Engineer", dates: "Dec 2024 - Mar 2025", logo: "/experience/jobeyze.svg", accent: "#EEEEEE" },
  { company: "Lumiere", role: "ML Researcher", dates: "Aug 2022 - Feb 2023", logo: "/experience/lumiere.svg", accent: "#EEEEEE" },
];

export default function WhereIveBeen() {
  const notes = [
    [
      <>currently working at <span className="font-medium">Shopify</span> this Summer!</>,
      <>on the Retail Team <span role="img" aria-label="shopping bags">🛍️</span></>
    ],
    [
      <>researched security and privacy in ML</>,
      <>built a federated learning protocol in PyTorch for distributed time-series data</>
    ],
    [
      <>developed the landing pages from scratch for <a href="https://www.jobeyze.ca/" className="underline underline-offset-4">Jobeyze</a></>,
      <>made automated web scrapers to extract 1200+ jobs daily</>
    ],
    [
      <>trained a machine learning model for financial fraud detection</>,
      <>published a <a href="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history" className="underline underline-offset-4">research paper</a></>
    ],
  ];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const prevScrollYRef = useRef(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // fixed segment height for consistent scroll across devices
  const segmentH = 600; // px per segment
  const [containerHeight, setContainerHeight] = useState(0);

  // Set container height on mount and window resize
  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight + segmentH * (timeline.length + 0.3));
    };
    
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    
    return () => window.removeEventListener('resize', updateContainerHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const newScrollY = Math.max(-rect.top, 0);
      setIsScrollingDown(newScrollY > prevScrollYRef.current);
      prevScrollYRef.current = newScrollY;
      setScrollY(newScrollY);
      // compute current index based on fixed segment height
      const currIdx = Math.min(Math.floor(newScrollY / segmentH), timeline.length - 1);
      setCurrent(currIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div ref={sectionRef} style={{ height: `${containerHeight}px` }} className="relative w-full hidden md:block">
        <div className="sticky top-16 flex flex-col w-full" style={{ height: `${segmentH}px` }}>
          {/* Sticky header */}
          <div className="flex items-center justify-between w-full mb-10">
            <h2 className="text-2xl md:text-3xl font-medium">Where I’ve been</h2>
            <span className="text-lg md:text-xl">view my <Link href="/resume" className="text-lg md:text-xl hover:opacity-70 transition" aria-label="View my resume">
              <span className="font-medium underline underline-offset-4">resume</span>
            </Link></span>
          </div>
          <div className="flex flex-col md:flex-row md:items-start w-full h-full">
            <div className="flex-1 min-w-[260px] max-w-[350px] h-full px-4">
              <div className="relative h-auto">
                <div className="flex flex-col justify-center h-full">
                  {timeline.map((item, idx) => {
                    return (
                      <div key={item.company} className="flex items-start relative z-10">
                        <div className={`w-20 flex flex-col items-center relative z-10 ${idx < timeline.length - 1 ? '-mb-6' : ''}`}>
                          <motion.div
                            className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                            variants={timelineAccent}
                            animate={current === idx ? "active" : "inactive"}
                            style={{ borderColor: current === idx ? '#FFF8B8' : '#EEEEEE', background: item.accent }}
                          >
                            <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} aria-hidden="true" />
                          </motion.div>
                          {/* Timeline segment below icon, except last item */}
                          {idx < timeline.length - 1 && (
                            <div className="relative flex flex-col items-center h-20">
                              {/* Base line */}
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-[#EEEEEE] rounded-full" aria-hidden="true" />
                              {/* Fill line */}
                              <div 
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-[#FFF8B8] rounded-full origin-top transition-transform duration-200 ease-out"
                                style={{ 
                                  transform: `scaleY(${idx < current ? 1 : idx === current ? Math.min(1, ((scrollY - idx * segmentH) / segmentH)) : 0})`
                                }}
                                aria-hidden="true" 
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pl-4">
                          <div className="font-bold text-2xl leading-tight">{item.company}</div>
                          <div className="text-base font-normal">{item.role}</div>
                          <div className="text-sm text-black/60 mt-1">{item.dates}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="relative flex-1 flex justify-center md:justify-start">
              <div className="relative rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.10)] min-h-[320px] max-w-[480px] w-full px-8 py-8" style={{ background: '#FFF8B8' }}>
                <AnimatePresence initial={false}>
                  {notes.map((_, idx) => idx <= current && (
                    <motion.div
                      key={idx}
                      className="absolute inset-0 rounded-lg"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%', opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      style={{ background: '#FFF8B8' }}
                    >
                      <div className="absolute right-0 bottom-0 w-16 h-16 z-10 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 64 64"><polygon points="0,64 64,0 64,64" fill="#FFFECF"/></svg>
                      </div>
                      <ul className="list-disc px-12 mt-12 text-xl leading-relaxed space-y-2">
                        {notes[idx].map((line, i) => <li key={i}>{line}</li>)}
                      </ul>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <motion.div
                  key={current}
                  className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ width: 36, height: 36 }}
                  variants={pushpinAnimation}
                  initial="enter"
                  animate={isScrollingDown ? "pin" : "enter"}
                >
                  <Image src="/pushpin.svg" alt="pushpin" width={36} height={36} aria-hidden="true" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile static layout for small screens */}
      <div className="md:hidden space-y-6 px-4 py-8">
        {timeline.map((item, idx) => (
          <div key={item.company} className="mb-8">
            <div className="flex items-center space-x-4">
              <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} aria-hidden="true" />
              <div className="flex-1">
                <div className="font-bold text-2xl leading-tight">{item.company}</div>
                <div className="text-base font-normal">{item.role}</div>
                <div className="text-sm text-black/60">{item.dates}</div>
              </div>
            </div>
            <div className="mt-4 rounded-lg shadow-[0_12px_16px_rgba(0,0,0,0.10)] px-6 py-6 relative" style={{ background: '#FFF8B8' }}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <Image src="/pushpin.svg" alt="pushpin" width={36} height={36} aria-hidden="true" />
              </div>
              <ul className="list-disc px-6 text-xl leading-relaxed space-y-2 mt-4">
                {notes[idx].map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
