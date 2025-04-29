import ProjectCard from './ProjectCard'

const projects = [
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
    ]
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
    ]
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