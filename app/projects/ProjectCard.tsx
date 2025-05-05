"use client";

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  links: {
    github?: string
    demo?: string
    devpost?: string
  }
  techStack: Array<{
    name: string
    icon: string
  }>
  demo: {
    type: 'video' | 'image'
    url: string
    ratioClass?: string
  }
}

export default function ProjectCard({ title, description, links, techStack, demo }: ProjectCardProps) {
  const ratio = demo.ratioClass ?? 'aspect-video'
  
  return (
    <motion.div 
      className="group relative rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-instrument text-3xl md:text-4xl">{title}</h3>
        <div className="flex gap-2">
          {links.github && (
            <motion.a 
              href={links.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black"
              whileHover={{ scale: 1.1, opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </motion.a>
          )}
          {links.demo && (
            <motion.a 
              href={links.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black"
              whileHover={{ scale: 1.1, opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="m10 14 11-11" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
      <p className="mt-2 font-geist text-sm tracking-[-0.06em] text-neutral-600">{description}</p>
      <div className="mt-4 flex gap-2">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={32}
              height={32}
              className="h-6 w-auto"
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-6 overflow-hidden rounded-lg bg-neutral-50"
      >
        {demo.type === 'video' ? (
          <video
            src={demo.url}
            autoPlay
            loop
            muted
            playsInline
            className={`${ratio} w-full object-cover`}
          />
        ) : (
          <Image
            src={demo.url}
            alt={`${title} demo`}
            width={800}
            height={450}
            className={`${ratio} w-full object-cover`}
          />
        )}
      </motion.div>
    </motion.div>
  )
}