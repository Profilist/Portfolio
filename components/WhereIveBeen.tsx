import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/OptimizedImage";
import Link from "@/components/Link";
import { pushpinAnimation, timelineAccent } from "../lib/animations";

type Experience = {
  id: string;
  company: string;
  role: string;
  dates: string;
  logo: string;
  accent: string;
  notes: ReactNode[];
  postcard: {
    imageSrc: string;
    imageAlt: string;
    objectPosition: string;
    href: string;
    caption: string;
  };
};

const experiences: Experience[] = [
  {
    id: "conway",
    company: "Conway",
    role: "Software Engineer",
    dates: "Apr 2026 - Aug 2026",
    logo: "/experience/conway.svg",
    accent: "#EEEEEE",
    notes: [
      <>launched a <span className="font-medium">durable agent runtime</span> for fraud response on autoscaling K8s Jobs</>,
      <>built a <span className="font-medium">live SQL rules engine</span> in Snowflake across 17M events/day</>,
    ],
    postcard: {
      imageSrc: "/experience/conway-landing.png",
      imageAlt: "Conway homepage preview",
      objectPosition: "center",
      href: "https://www.conway.ai/",
      caption: "check out Conway 👀",
    },
  },
  {
    id: "kp-fellows",
    company: "Kleiner Perkins",
    role: "Engineering Fellow",
    dates: "Jan 2026 - Present",
    logo: "/experience/kp.svg",
    accent: "#EEEEEE",
    notes: [<>meeting cool people :)</>],
    postcard: {
      imageSrc: "/experience/kp-fellows-landing.png",
      imageAlt: "Kleiner Perkins Fellows page preview",
      objectPosition: "center",
      href: "https://www.kleinerperkins.com/fellows/",
      caption: "join KP Fellows!",
    },
  },
  {
    id: "pphh-vfl",
    company: "UWaterloo",
    role: "Research Assistant",
    dates: "Jan 2025 - Apr 2026",
    logo: "/experience/uwaterloo.svg",
    accent: "#EEEEEE",
    notes: [
      <>co-first-authored <a href="https://arxiv.org/abs/2605.08343v1" className="font-medium underline underline-offset-4">PPHH-VFL</a>, a private inference architecture for distributed VFL</>,
      <>accelerated private transformer inference by <span className="font-medium">44.4×</span> via hybrid MPC</>,
    ],
    postcard: {
      imageSrc: "/experience/pphh-vfl-paper.png",
      imageAlt: "First page of the PPHH-VFL research paper",
      objectPosition: "top center",
      href: "https://arxiv.org/abs/2605.08343v1",
      caption: "read our paper!",
    },
  },
  {
    id: "shopify-pos",
    company: "Shopify",
    role: "Software Engineer",
    dates: "May 2025 - Aug 2025",
    logo: "/experience/shopify.svg",
    accent: "#EEEEEE",
    notes: [
      <>designed <span className="font-medium">data models and GraphQL APIs</span> in Rails, supporting 2M+ active retailers</>,
      <>built POS features in React Native and TypeScript</>,
    ],
    postcard: {
      imageSrc: "/experience/shopify-pos-landing.png",
      imageAlt: "Shopify POS page preview",
      objectPosition: "center",
      href: "https://www.shopify.com/pos",
      caption: "take a look at Shopify POS!",
    },
  },
  {
    id: "mlh-production-engineering",
    company: "Meta x MLH",
    role: "Production Engineer",
    dates: "May 2025 - Aug 2025",
    logo: "/experience/mlh.svg",
    accent: "#FFF8B8",
    notes: [
      <>worked with engineers from Meta to manage <span className="font-medium">Linux infrastructure</span> on CentOS with kernel-level debugging, Docker, NGINX, CI/CD, and Grafana</>,
    ],
    postcard: {
      imageSrc: "/experience/mlh-production-engineering-landing.png",
      imageAlt: "MLH Production Engineering Fellowship page preview",
      objectPosition: "center",
      href: "https://fellowship.mlh.com/programs/production-engineering-sre",
      caption: "learn about the MLH Fellowship!",
    },
  },
];

type ExperiencePostcardProps = {
  experience: Experience;
  layout: "desktop" | "mobile";
  direction?: number;
  reduceMotion: boolean;
};

function ExperiencePostcard({ experience, layout, direction = 1, reduceMotion }: ExperiencePostcardProps) {
  const isMobile = layout === "mobile";
  const initial = isMobile
    ? false
    : reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: direction > 0 ? 20 : -20, y: -8, rotate: -5 };
  const animate = reduceMotion
    ? { opacity: 1, transition: { duration: 0.15 } }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: -2,
        transition: { duration: 0.32, delay: isMobile ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] as const },
      };
  const exit = reduceMotion
    ? { opacity: 0, transition: { duration: 0.12 } }
    : {
        opacity: 0,
        x: direction > 0 ? -16 : 16,
        y: 10,
        rotate: -4,
        transition: { duration: 0.18 },
      };

  const interaction = reduceMotion
    ? undefined
    : {
        rotate: 2,
        scale: 1.01,
        boxShadow: "0 16px 32px rgba(33, 33, 33, .3)",
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      className="w-full"
    >
      <motion.a
        href={experience.postcard.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${experience.postcard.caption.replace(" ↗", "")} (opens in a new tab)`}
        data-testid={`experience-postcard-${layout}-${experience.id}`}
        data-experience-id={experience.id}
        data-reduced-motion={reduceMotion ? "true" : "false"}
        whileHover={interaction}
        whileFocus={interaction}
        className="group block w-full rounded-[3px] border border-black/10 bg-[#fbfaf6] p-2.5 pb-0 shadow-[0_10px_24px_rgba(33,33,33,.22)] outline-none focus-visible:ring-4 focus-visible:ring-[#f4c83f]/70"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6df] ring-1 ring-black/5">
          <Image
            src={experience.postcard.imageSrc}
            alt={experience.postcard.imageAlt}
            fill
            sizes="(min-width: 768px) 390px, 92vw"
            className="object-cover"
            style={{
              objectPosition: experience.postcard.objectPosition,
              filter: "sepia(.08) saturate(.76) contrast(.92) brightness(1.04)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,238,.04)_35%,rgba(37,31,25,.14)_140%)] mix-blend-multiply"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,247,228,.18),transparent_48%,rgba(58,67,75,.06))]"
          />
        </div>
        <div className="flex h-14 items-center justify-center px-2 pt-1">
          <span className="whitespace-nowrap font-handwriting text-[clamp(1rem,1.5vw,1.25rem)] leading-none text-black/80">
            {experience.postcard.caption}
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reduceMotion;
}

export default function WhereIveBeen() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const prevScrollYRef = useRef(0);
  const [shouldBounce, setShouldBounce] = useState(false);
  const prevCurrentRef = useRef(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = usePrefersReducedMotion();
  const currentExperience = experiences[current] ?? experiences[0];
  
  // fixed segment height for consistent scroll across devices
  const segmentH = 700; // px per segment
  const [containerHeight, setContainerHeight] = useState(0);

  // Set container height on mount and window resize
  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight + segmentH * (experiences.length - 1));
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
      prevScrollYRef.current = newScrollY;
      setScrollY(newScrollY);
      // compute current index based on fixed segment height
      const currIdx = Math.min(Math.floor(newScrollY / segmentH), experiences.length - 1);
      if (currIdx !== prevCurrentRef.current) {
        setDirection(currIdx > prevCurrentRef.current ? 1 : -1);
        setCurrent(currIdx);
        prevCurrentRef.current = currIdx; // keep ref in sync immediately
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (direction === 1) {
      setShouldBounce(true);
    }
  }, [current, direction]);

  useEffect(() => {
    if (!shouldBounce) return;
    const timer = setTimeout(() => setShouldBounce(false), 600);
    return () => clearTimeout(timer);
  }, [shouldBounce]);
  
  return (
    <div className="w-full" data-timeline-section>
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
            <div className="flex-1 min-w-[260px] max-w-[350px] h-full px-0">
              <div className="relative h-auto">
                <div className="flex flex-col justify-center h-full">
                  {experiences.map((item, idx) => {
                    return (
                      <div key={item.id} className="flex items-start relative z-10">
                        <div className={`w-20 flex flex-col items-center relative z-10 ${idx < experiences.length - 1 ? '-mb-6' : ''}`}>
                          <motion.div
                            className="w-16 h-16 rounded-none flex items-center justify-center border-4"
                            variants={timelineAccent}
                            animate={current === idx ? "active" : "inactive"}
                            style={{ borderColor: current === idx ? '#FFF8B8' : '#EEEEEE', background: item.accent }}
                          >
                            <Image src={item.logo} alt={`${item.company} logo`} width={48} height={48} aria-hidden="true" />
                          </motion.div>
                          {/* Timeline segment below icon, except last item */}
                          {idx < experiences.length - 1 && (
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
            <div className="relative flex-1">
              <div className="relative w-full max-w-[480px] pb-1" data-testid="experience-stage-desktop">
                {/* Sticky note */}
                <div
                  className="relative z-10 min-h-[320px] w-full rotate-2 rounded-lg px-8 py-8 shadow-[5px_5px_10px_-2px_rgba(33,33,33,.3)]"
                  style={{ background: '#FFF8B8' }}
                  data-testid="experience-note-desktop"
                  data-experience-id={currentExperience.id}
                >
                  <AnimatePresence initial={false}>
                    {experiences.map((experience, idx) => idx <= current && (
                      <motion.div
                        key={`notes-${experience.id}`}
                        className="absolute inset-0 rounded-sm"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%', opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        style={{ background: '#FFF8B8' }}
                      >
                        <ul className="mt-12 list-disc space-y-2 pl-12 pr-8 text-lg leading-relaxed md:text-xl">
                          {experience.notes.map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.div
                    key={current}
                    className="pin absolute left-1/2 top-4 z-20 -translate-x-1/2 -translate-y-1/2"
                    variants={pushpinAnimation}
                    initial="enter"
                    animate={shouldBounce ? "pin" : "enter"}
                    aria-hidden="true"
                  />
                </div>

                <div className="relative z-0 mx-auto mt-3 w-[84%] max-w-[390px]">
                  <AnimatePresence initial={false} mode="wait">
                    <ExperiencePostcard
                      key={currentExperience.id}
                      experience={currentExperience}
                      layout="desktop"
                      direction={direction}
                      reduceMotion={reduceMotion}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile static layout for small screens */}
      <div className="md:hidden flex items-center justify-between w-full px-4">
        <h2 className="text-2xl font-medium">Where I’ve been</h2>
        <span className="text-lg">my <Link href="/resume" className="text-lg hover:opacity-70 transition" aria-label="View my resume">
          <span className="font-medium underline underline-offset-4">resume</span>
        </Link></span>
      </div>
      <div className="md:hidden space-y-6 px-4 py-8">
        {experiences.map((item) => (
          <div key={item.id} className="mb-12" data-experience-mobile={item.id}>
            <div className="flex items-center space-x-4">
              <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} aria-hidden="true" />
              <div className="flex-1">
                <div className="font-bold text-xl leading-tight">{item.company}</div>
                <div className="text-base font-normal">{item.role}</div>
                <div className="text-sm text-black/60">{item.dates}</div>
              </div>
            </div>
            <div className="relative mx-auto mt-6 w-[288px] max-w-full min-[680px]:flex min-[680px]:w-full min-[680px]:max-w-[544px] min-[680px]:items-start min-[680px]:gap-4">
              <div
                className="relative z-10 h-[250px] w-full rounded-lg shadow-[5px_5px_10px_-2px_rgba(33,33,33,.3)] min-[680px]:w-[288px] min-[680px]:shrink-0"
                style={{ background: '#FFF8B8' }}
                data-testid={`experience-note-mobile-${item.id}`}
              >
                <div className="absolute inset-0 rounded-sm">
                  <ul className="mt-12 list-disc space-y-2 pl-12 pr-8 text-[clamp(0.875rem,3.7vw,1rem)] leading-relaxed">
                    {item.notes.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
                <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="pin" aria-hidden="true" />
                </div>
              </div>
              <div className="relative z-0 mx-auto mt-3 w-[92%] min-[680px]:mx-0 min-[680px]:mt-0 min-[680px]:min-w-0 min-[680px]:flex-1">
                <ExperiencePostcard
                  experience={item}
                  layout="mobile"
                  reduceMotion={reduceMotion}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
