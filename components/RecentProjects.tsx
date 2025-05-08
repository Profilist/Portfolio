"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Project, projects } from "@/lib/projects";

export default function RecentProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div style={{ width: '100%' }}>
      <section className="mt-20 flex flex-col">
        <p className="text-xl md:text-2xl mb-10">Checkout what I&apos;ve built recently!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 relative">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeProject ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-sm z-[15]"
            style={{ pointerEvents: activeProject ? 'auto' : 'none' }}
          />
          {/* Project Cards */}
          {projects.map((proj) => (
            <div
              key={proj.name}
              className="group relative"
              onMouseEnter={() => setActiveProject(proj)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {activeProject?.name === proj.name ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="absolute z-20 -top-64 left-1/2 -translate-x-1/2 w-[240px] flex flex-col items-center justify-center p-4 rounded-2xl"
                >
                  <div className="w-64 h-64 relative">
                    {proj.video ? (
                      <div className="relative w-full h-full top-12 left-2">
                        <Image
                          src="/projects/monitor.svg"
                          alt="Monitor"
                          width={80}
                          height={80}
                          className="w-full h-full"
                          priority
                        />
                        <div className="absolute top-[68px] left-[32px] overflow-hidden rounded-xs bg-black">
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-[178px] h-[98px] object-cover"
                          >
                            <source src={proj.video} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    ) : (
                      proj.previewImages?.map((preview) => (
                        <Image 
                          key={preview.src}
                          src={preview.src} 
                          alt={preview.alt} 
                          width={80} 
                          height={80} 
                          className="w-48 h-auto absolute"
                          style={preview.position}
                        />
                      ))
                    )}
                  </div>
                  <motion.div 
                    className="w-20 h-20 flex items-center justify-center relative"
                    initial={{ scale: 1.75 }} 
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Image 
                      src={proj.image} 
                      alt={proj.alt} 
                      width={80} 
                      height={80} 
                      className="object-contain w-20 h-20" 
                    />
                  </motion.div>
                  <h3 className="font-instrument text-4xl text-center mb-2">{proj.name}</h3>
                  <p className="text-sm text-center mb-4">{proj.description}</p>
                  <Link 
                    href={proj.href}
                    className="px-4 py-1 bg-[#E5E5E5] mx-auto text-center text-sm rounded-full hover:bg-[#d1d1d1] transition-colors"
                  >
                    View {proj.name}
                  </Link>
                </motion.div>
              ) : null}
              <motion.div 
                animate={{ opacity: activeProject?.name === proj.name ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white flex items-center justify-center relative"
                  animate={{ 
                    scale: activeProject?.name === proj.name ? 0.57 : 1 // 16/28 ≈ 0.57 (ratio of small to large icon)
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Image 
                    src={proj.image} 
                    alt={proj.alt} 
                    width={80} 
                    height={80} 
                    className="object-contain w-24 h-24 md:w-28 md:h-28" 
                  />
                </motion.div>
                <span className="mt-3 px-4 py-1 bg-[#E5E5E5] text-base rounded-full font-medium">
                  {proj.name}
                </span>
              </motion.div>
            </div>
          ))}
          {/* See More Card */}
          <div className="flex flex-col items-center">
            <Link href="/projects" aria-label="See more projects">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="m10 14 11-11" />
                </svg>
              </div>
            </Link>
            <span className="mt-3 px-4 py-1 bg-[#E5E5E5] text-base rounded-full tracking-tight font-medium" style={{ letterSpacing: '-0.02em' }}>see more</span>
          </div>
        </div>
      </section>
    </div>
  );
}
