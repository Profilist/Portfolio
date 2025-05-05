"use client";

import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

interface Project {
  title: string
  description: string
  links: {
    github: string
    demo: string
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

const projects: Project[] = [
  {
    title: 'pmo',
    description: 'A minimal Pomodoro timer desktop app.',
    links: {
      github: 'https://github.com/Profilist/pmo',
      demo: 'https://github.com/Profilist/pmo/releases'
    },
    techStack: [
      { name: 'Go', icon: '/tech/golang.svg' },
      { name: 'React', icon: '/tech/react.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.svg' }
    ],
    demo: {
      type: 'video',
      url: '/projects/pmo.mov'
    }
  },
  {
    title: 'On The Dot',
    description: 'A web-based trivia game. 2000+ plays.',
    links: {
      github: 'https://github.com/Profilist/on-the-dot',
      demo: 'https://www.playonthedot.com'
    },
    techStack: [
      { name: 'React', icon: '/tech/react.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.svg' },
      { name: 'Supabase', icon: '/tech/supabase.svg' },
      { name: 'PostgreSQL', icon: '/tech/postgresql.svg'},
      { name: 'Python', icon: '/tech/python.svg'}
    ],
    demo: {
      type: 'video',
      url: '/projects/onthedot.mp4'
    }
  },
  {
    title: 'Off The Hook',
    description: 'A phishing ARG (alternate reality game) that lets users become the hacker.',
    links: {
      github: 'https://github.com/Profilist/off-the-hook',
      demo: 'https://github.com/Profilist/off-the-hook'
    },
    techStack: [
      { name: 'React', icon: '/tech/react.svg' },
      { name: 'JavaScript', icon: '/tech/javascript.svg' },
      { name: 'Flask', icon: '/tech/flask.svg' },
      { name: 'MongoDB', icon: '/tech/mongodb.svg'},
      { name: 'Python', icon: '/tech/python.svg'}
    ],
    demo: {
      type: 'video',
      url: '/projects/offthehook.mov'
    }
  },
  {
    title: 'Saving Christmas',
    description: 'A 2D Christmas platformer game developed using Unity and C#.',
    links: {
      github: 'https://github.com/Profilist/Saving-Christmas',
      demo: 'https://decypherx.itch.io/saving-christmas'
    },
    techStack: [
      { name: 'Unity', icon: '/tech/unity.svg' },
      { name: 'C#', icon: '/tech/csharp.svg' }
    ],
    demo: {
      type: 'image',
      url: '/projects/savingchristmas.png'
    }
  },
  {
    title: 'Autonomous Vision Systems for Self-Driving Cars',
    description: 'An analysis of object detection pipelines for self-driving cars.',
    links: {
      github: 'https://github.com/Profilist/Autonomous-Driving',
      demo: 'https://github.com/Profilist/Autonomous-Driving/blob/main/Object%20Detection%20in%20Autonomous%20Cars.ipynb'
    },
    techStack: [
      { name: 'Python', icon: '/tech/python.svg' },
      { name: 'TensorFlow', icon: '/tech/tensorflow.svg' }
    ],
    demo: {
      type: 'video',
      url: '/projects/yolo.mp4'
    }
  },
  {
    title: 'ML Research Paper',
    description: 'A research paper on a ML approach to detect financial fraud. Published in JHSS.',
    links: {
      github: 'https://github.com/Profilist/Financial-Fraud-Detection',
      demo: 'https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history'
    },
    techStack: [
      { name: 'Python', icon: '/tech/python.svg' }
    ],
    demo: {
      type: 'image',
      url: '/projects/JHSS.avif'
    }
  },
  {
    title: 'The <div>eloper Experience',
    description: 'Are you a real developer if you can\'t center a div?',
    links: {
      github: 'https://github.com/Profilist/TheDiveloperExperience',
      demo: 'https://the-diveloper-experience.vercel.app/'
    },
    techStack: [
      { name: 'Next.js', icon: '/tech/nextjs.svg' },
      { name: 'React', icon: '/tech/react.svg' },
      { name: 'TypeScript', icon: '/tech/typescript.svg' },
      { name: 'Convex', icon: '/tech/convex.svg' },
      { name: 'Clerk', icon: '/tech/clerk.svg' },
    ],
    demo: {
      type: 'video',
      url: '/projects/thediveloperexperience.mov'
    }
  },
  {
    title: 'NutriScan',
    description: 'An iOS nutrition tracking app using computer vision.',
    links: {
      github: 'https://github.com/yanziguoo/NutriScan',
      demo: 'https://devpost.com/software/nutriscan-d06z4p'
    },
    techStack: [
      { name: 'Swift', icon: '/tech/swift.svg' },
      { name: 'Python', icon: '/tech/python.svg' },
      { name: 'Firebase', icon: '/tech/firebase.svg' }
    ],
    demo: {
      type: 'video',
      url: '/projects/nutriscan.mov',
      ratioClass: 'aspect-[9/16]'
    }
  },
  {
    title: 'Square Up',
    description: 'A digital collaborative mosaic builder.',
    links: {
      github: 'https://github.com/Precisshley/SquareUp',
      demo: 'https://square-up-pearl.vercel.app/home'
    },
    techStack: [
      { name: 'Next.js', icon: '/tech/nextjs.svg' },
      { name: 'React', icon: '/tech/react.svg' },
      { name: 'JavaScript', icon: '/tech/javascript.svg' },
      { name: 'AWS', icon: '/tech/aws.svg' },
      { name: 'Python', icon: '/tech/python.svg' }
    ],
    demo: {
      type: 'image',
      url: '/projects/squareup.jpg'
    }
  },
]

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