import ProjectCard from './ProjectCard'

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
      type: 'image',
      url: '/projects/pmo1.png'
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
      url: '/projects/onthedot.mov'
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
  }
]

export default function Projects() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 font-handwriting text-6xl text-center">Projects</h1>
      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            links={project.links}
            techStack={project.techStack}
            demo={project.demo}
          />
        ))}
      </div>
      <p className="mt-6 text-left font-geist text-lg tracking-[-0.06em]">
        Check out all my projects{' '}
        <a href="https://github.com/Profilist" className="underline hover:opacity-70">
          here
        </a>
        .
      </p>
    </main>
  )
}