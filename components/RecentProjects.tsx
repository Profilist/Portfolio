"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectOverlay } from "./ProjectOverlay";

const projects = [
  {
    name: "pmo",
    image: "/pmo.png",
    alt: "pmo logo",
    href: "#",
  },
  {
    name: "on the dot",
    image: "/onthedot.svg",
    alt: "on the dot logo",
    href: "#",
  },
  {
    name: "off the hook",
    image: "/offthehook.svg",
    alt: "off the hook logo",
    href: "#",
  },
];

export default function RecentProjects() {
  const [activeProject, setActiveProject] = useState<{
    name: string;
    image: string;
    alt: string;
  } | null>(null);

  return (
    <div
      onMouseLeave={() => setActiveProject(null)}
      onMouseEnter={() => {}}
      style={{ width: '100%' }}
    >
      <section className="mt-20 flex flex-col">
        <p className="text-xl md:text-2xl mb-10">Checkout what I’ve built recently!</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {/* Project Cards */}
          {projects.map((proj) => (
            <div
              key={proj.name}
              className="flex flex-col items-center cursor-pointer group relative"
              onMouseEnter={() => setActiveProject(proj)}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white flex items-center justify-center">
                <Image src={proj.image} alt={proj.alt} width={64} height={64} className="object-contain w-24 h-24 md:w-28 md:h-28" />
              </div>
              <span className="mt-3 px-4 py-1 bg-[#E5E5E5] text-base rounded-full tracking-tight font-medium" style={{ letterSpacing: '-0.02em' }}>{proj.name}</span>
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
      {/* Global Overlay */}
      <ProjectOverlay
        open={!!activeProject}
        project={activeProject}
      />
    </div>
  );
}

