"use client";

import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'
import { projectCatalog } from '@/lib/projects'

const projects = projectCatalog

export default function Projects() {
  return (
    <motion.main 
      className="mx-auto max-w-2xl px-6 py-12"
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: { staggerChildren: 0.15 }
        }
      }}
    >
      <motion.h1 
        className="mb-8 font-handwriting text-6xl text-center"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        Projects
      </motion.h1>
      <motion.div 
        className="grid gap-6"
        variants={{
          initial: {},
          animate: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              links={project.links}
              techStack={project.techStack}
              demo={project.demo}
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.p 
        className="mt-6 text-left font-geist text-xl md:text-2xl tracking-[-0.06em] mb-24"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
        }}
      >
        Check out all my projects{' '}
        <a href="https://github.com/Profilist" className="underline hover:opacity-70">
          here
        </a>
        .
      </motion.p>
    </motion.main>
  )
}
