"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    name: "pmo",
    image: "/projects/pmo.png",
    alt: "pmo",
    href: "https://github.com/Profilist/pmo",
    description: "A minimal Pomodoro timer desktop app"
  },
  {
    name: "on the dot",
    image: "/projects/onthedot.svg",
    alt: "on the dot",
    href: "https://www.playonthedot.com/",
    description: "A web-based trivia game with 2000+ plays"
  },
  {
    name: "off the hook",
    image: "/projects/offthehook.svg",
    alt: "off the hook",
    href: "https://github.com/Profilist/off-the-hook",
    description: "A phishing ARG that lets you become the hacker"
  },
];

export default function RecentProjects() {
  const [activeProject, setActiveProject] = useState<{
    name: string;
    image: string;
    alt: string;
    description: string;
    href: string;
  } | null>(null);

  return (
    <div style={{ width: '100%' }}>
      <section className="mt-20 flex flex-col">
        <p className="text-xl md:text-2xl mb-10">Checkout what I've built recently!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {/* Project Cards */}
          {projects.map((proj) => (
            <div
              key={proj.name}
              className="group relative"
              onMouseEnter={() => setActiveProject(proj)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {activeProject?.name === proj.name ? (
                <div className="absolute z-10 -top-8 left-1/2 -translate-x-1/2 w-[240px] flex flex-col items-center justify-center animate-spring-up bg-white p-4 rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center relative">
                    <Image 
                      src="/projects/pmo1.png" 
                      alt="pmo" 
                      width={64} 
                      height={64} 
                      className="object-contain w-16 h-16" 
                    />
                    <Image 
                      src="/projects/pmo2.png" 
                      alt="pmo" 
                      width={64} 
                      height={64} 
                      className="object-contain w-16 h-16" 
                    />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center relative">
                    <Image 
                      src={proj.image} 
                      alt={proj.alt} 
                      width={64} 
                      height={64} 
                      className="object-contain w-16 h-16" 
                    />
                  </div>
                  <h3 className="font-instrument text-4xl text-center mb-2">{proj.name}</h3>
                  <p className="text-sm text-center mb-4">{proj.description}</p>
                  <Link 
                    href={proj.href}
                    className="px-4 py-1 bg-[#E5E5E5] mx-auto text-center text-sm rounded-full hover:bg-[#d1d1d1] transition-colors"
                  >
                    View {proj.name}
                  </Link>
                </div>
              ) : null}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white flex items-center justify-center relative">
                  <Image 
                    src={proj.image} 
                    alt={proj.alt} 
                    width={64} 
                    height={64} 
                    className="object-contain w-24 h-24 md:w-28 md:h-28" 
                  />
                </div>
                <span className="mt-3 px-4 py-1 bg-[#E5E5E5] text-base rounded-full font-medium">
                  {proj.name}
                </span>
              </div>
            </div>
          ))}
          {/* See More Card */}
          <div className="flex flex-col items-center">
            <Link href="#" aria-label="See more projects">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M21 21H3V3"/></svg>
              </div>
            </Link>
            <span className="mt-3 px-4 py-1 bg-[#E5E5E5] text-base rounded-full tracking-tight font-medium" style={{ letterSpacing: '-0.02em' }}>see more</span>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .animate-spring-up {
          animation: spring-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes spring-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          60% {
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
