"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { stickyNoteFlip, timelineAccent } from "../lib/animations";

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
      <>did research for Security and Privacy in Machine Learning at <span className="font-medium">UWaterloo</span></>,
      <>built a vertical federated learning protocol in PyTorch on distributed credit card sequences</>
    ],
    [
      <>software engineer at <span className="font-medium">Jobeyze</span></>,
      <>built job search tools <span role="img" aria-label="briefcase">💼</span></>
    ],
    [
      <>ML researcher at <span className="font-medium">Lumiere</span></>,
      <>worked on NLP <span role="img" aria-label="brain">🧠</span></>
    ],
  ];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [segmentFills, setSegmentFills] = useState<number[]>(() => Array(timeline.length - 1).fill(0));

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = window.innerHeight * (timeline.length - 1);
      const scrollY = Math.max(-rect.top, 0);
      const perItem = total / (timeline.length - 1);
      // Compute the current segment
      const currIdx = Math.floor(scrollY / window.innerHeight);
      setCurrent(currIdx);
      // Compute fill for each segment
      const fills = Array(timeline.length - 1).fill(0).map((_, idx) => {
        if (idx < Math.floor(scrollY / perItem)) return 100;
        if (idx === Math.floor(scrollY / perItem)) {
          return Math.min(100, ((scrollY - idx * perItem) / perItem) * 100);
        }
        return 0;
      });
      setSegmentFills(fills);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div ref={sectionRef} style={{ height: `${(timeline.length + 0.5) * 100}vh` }} className="relative w-full">
        <div className="sticky top-16 h-screen flex flex-col w-full">
          {/* Sticky header */}
          <div className="flex items-center justify-between w-full mb-10">
            <h2 className="text-3xl font-medium">Where I’ve been</h2>
            <Link href="/resume" className="text-xl hover:opacity-70 transition" aria-label="View my resume">
              view my <span className="font-medium underline underline-offset-4">resume</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-start w-full h-full">
            <div className="flex-1 min-w-[260px] max-w-[350px] h-full px-4">
              <div className="relative h-auto">
                <div className="flex flex-col justify-center h-full">
                  {timeline.map((item, idx) => {
                    const segmentFill = segmentFills[idx] || 0;
                    return (
                      <div key={item.company} className="flex items-center relative z-10">
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
                              {/* Animated progress fill */}
                              <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-[#FFF8B8] rounded-full z-10"
                                aria-hidden="true"
                                style={{ height: `${segmentFill}%` }}
                                initial={{ height: 0 }}
                                animate={{ height: `${segmentFill}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pl-6">
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
            <div className="flex-1 flex justify-center md:justify-start">
              <motion.div
                className="relative rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.10)] min-h-[320px] max-w-[480px] w-full px-8 py-10 flex flex-col"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.10)', background: timeline[current].accent }}
                variants={stickyNoteFlip}
                key={current}
                initial="exit"
                animate="enter"
                exit="exit"
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Pin at top center */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" style={{ width: 36, height: 36 }}>
                  <Image src="/pushpin.svg" alt="pushpin" width={36} height={36} aria-hidden="true" />
                </div>
                {/* Triangle at bottom right */}
                <div className="absolute right-0 bottom-0 w-16 h-16 z-10 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 64 64"><polygon points="0,64 64,0 64,64" fill="#FFFECF"/></svg>
                </div>
                <ul className="list-disc pl-6 mt-8 text-xl leading-relaxed space-y-2">
                  {notes[current].map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
