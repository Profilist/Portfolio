export interface ProjectPreviewImage {
  src: string;
  alt: string;
  position?: {
    top?: string;
    left?: string;
  };
}

export interface ProjectTech {
  name: string;
  icon: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  devpost?: string;
}

export interface ProjectDemo {
  type: "video" | "image";
  url: string;
  ratioClass?: string;
}

export interface ProjectRecord {
  title: string;
  description: string;
  links: ProjectLinks;
  techStack: ProjectTech[];
  demo: ProjectDemo;
  image: string;
  alt: string;
  href: string;
  previewImages?: ProjectPreviewImage[];
  featureOnHome?: boolean;
}

export interface Project {
  name: string;
  image: string;
  alt: string;
  description: string;
  href: string;
  video?: string;
  previewImages?: ProjectPreviewImage[];
}

export const projectCatalog: ProjectRecord[] = [
  {
    title: "Pokestrator",
    description: "A self-improving agent that builds its own tools to solve limitations",
    links: {
      github: "https://github.com/Profilist/pokestrator",
      demo: "https://github.com/Profilist/pokestrator",
    },
    techStack: [
      { name: "Python", icon: "/tech/python.svg" },
      { name: "Claude", icon: "/tech/claude.svg" },
      { name: "TypeScript", icon: "/tech/typescript.svg" },
      { name: "React Native", icon: "/tech/react.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/pokestrator_demo.mp4",
    },
    image: "/projects/pokestrator_demo.png",
    alt: "pokestrator",
    href: "https://github.com/Profilist/pokestrator",
    featureOnHome: true,
  },
  {
    title: "Tides",
    description: "An agentic design platform integrated directly with user data",
    links: {
      github: "https://github.com/Profilist/tides",
      demo: "https://github.com/Profilist/tides",
    },
    techStack: [
      { name: "Express", icon: "/tech/express.svg" },
      { name: "Bun", icon: "/tech/bun.svg" },
      { name: "Supabase", icon: "/tech/supabase.svg" },
      { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
      { name: "React", icon: "/tech/react.svg" },
      { name: "TypeScript", icon: "/tech/typescript.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/tides.mp4",
    },
    image: "/projects/tides.png",
    alt: "tides",
    href: "https://github.com/Profilist/tides",
    featureOnHome: true,
  },
  {
    title: "pmo",
    description: "A minimal Pomodoro timer desktop app",
    links: {
      github: "https://github.com/Profilist/pmo",
      demo: "https://github.com/Profilist/pmo/releases",
    },
    techStack: [
      { name: "Go", icon: "/tech/golang.svg" },
      { name: "React", icon: "/tech/react.svg" },
      { name: "TypeScript", icon: "/tech/typescript.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/pmo.mp4",
    },
    image: "/projects/pmo.png",
    alt: "pmo",
    href: "https://github.com/Profilist/pmo",
    previewImages: [
      {
        src: "/projects/pmo2.png",
        alt: "pmo",
        position: { top: "-0px", left: "-8px" },
      },
      {
        src: "/projects/pmo1.png",
        alt: "pmo",
        position: { top: "112px", left: "104px" },
      },
    ],
    featureOnHome: false,
  },
  {
    title: "On The Dot",
    description: "A web-based trivia game with 20,000+ plays",
    links: {
      github: "https://github.com/Profilist/on-the-dot",
      demo: "https://www.playonthedot.com",
    },
    techStack: [
      { name: "React", icon: "/tech/react.svg" },
      { name: "TypeScript", icon: "/tech/typescript.svg" },
      { name: "Supabase", icon: "/tech/supabase.svg" },
      { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
      { name: "Python", icon: "/tech/python.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/onthedot.mp4",
    },
    image: "/projects/onthedot.svg",
    alt: "on the dot",
    href: "https://www.playonthedot.com",
    featureOnHome: true,
  },
  {
    title: "Off The Hook",
    description: "A phishing ARG that lets you become the hacker",
    links: {
      github: "https://github.com/Profilist/off-the-hook",
      demo: "https://github.com/Profilist/off-the-hook",
    },
    techStack: [
      { name: "React", icon: "/tech/react.svg" },
      { name: "JavaScript", icon: "/tech/javascript.svg" },
      { name: "Flask", icon: "/tech/flask.svg" },
      { name: "MongoDB", icon: "/tech/mongodb.svg" },
      { name: "Python", icon: "/tech/python.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/offthehook.mp4",
    },
    image: "/projects/offthehook.svg",
    alt: "off the hook",
    href: "https://github.com/Profilist/off-the-hook",
    previewImages: [],
    featureOnHome: false,
  },
  {
    title: "LifeOS",
    description: "A multi-modal MCP layer for real life.",
    links: {
      github: "https://github.com/owenguoo/LifeOS",
      demo: "https://life-os-iota.vercel.app",
    },
    techStack: [
      { name: "Python", icon: "/tech/python.svg" },
      { name: "Redis", icon: "/tech/redis.svg" },
      { name: "Qdrant", icon: "/tech/qdrant.svg" },
      { name: "Supabase", icon: "/tech/supabase.svg" },
      { name: "Docker", icon: "/tech/docker.svg" },
      { name: "AWS", icon: "/tech/aws.svg" },
      { name: "Next.js", icon: "/tech/nextjs.svg" },
      { name: "React", icon: "/tech/react.svg" },
      { name: "TypeScript", icon: "/tech/typescript.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/lifeos.mp4",
    },
    image: "/projects/monitor.svg",
    alt: "LifeOS",
    href: "https://github.com/owenguoo/LifeOS",
  },
  {
    title: "Saving Christmas",
    description: "A 2D Christmas platformer game developed using Unity and C#",
    links: {
      github: "https://github.com/Profilist/Saving-Christmas",
      demo: "https://decypherx.itch.io/saving-christmas",
    },
    techStack: [
      { name: "Unity", icon: "/tech/unity.svg" },
      { name: "C#", icon: "/tech/csharp.svg" },
    ],
    demo: {
      type: "image",
      url: "/projects/savingchristmas.png",
    },
    image: "/projects/savingchristmas.png",
    alt: "saving christmas",
    href: "https://decypherx.itch.io/saving-christmas",
  },
  {
    title: "Autonomous Vision Systems for Self-Driving Cars",
    description: "An analysis of object detection pipelines for self-driving cars",
    links: {
      github: "https://github.com/Profilist/Autonomous-Driving",
      demo: "https://github.com/Profilist/Autonomous-Driving/blob/main/Object%20Detection%20in%20Autonomous%20Cars.ipynb",
    },
    techStack: [
      { name: "Python", icon: "/tech/python.svg" },
      { name: "TensorFlow", icon: "/tech/tensorflow.svg" },
    ],
    demo: {
      type: "video",
      url: "/projects/yolo.mp4",
    },
    image: "/projects/onthedot.svg",
    alt: "autonomous vision systems",
    href: "https://github.com/Profilist/Autonomous-Driving",
  },
  {
    title: "ML Research Paper",
    description: "A research paper on ML approach to detect fraudulent customers",
    links: {
      github: "https://github.com/Profilist/Financial-Fraud-Detection",
      demo: "https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history",
    },
    techStack: [
      { name: "Python", icon: "/tech/python.svg" },
    ],
    demo: {
      type: "image",
      url: "/projects/JHSS.avif",
    },
    image: "/projects/JHSS.avif",
    alt: "research paper",
    href: "https://github.com/Profilist/Financial-Fraud-Detection",
  },
];

export const projects: Project[] = projectCatalog
  .filter((project) => project.featureOnHome)
  .map((project) => ({
    name: project.title.toLowerCase(),
    image: project.image,
    alt: project.alt,
    description: project.description,
    href: project.href,
    video: project.demo.type === "video" && !(project.previewImages && project.previewImages.length > 0)
      ? project.demo.url
      : undefined,
    previewImages: project.previewImages,
  }));
