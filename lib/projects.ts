export interface Project {
  name: string;
  image: string;
  alt: string;
  description: string;
  href: string;
  video?: string;
  previewImages?: {
    src: string;
    alt: string;
    position?: {
      top?: string;
      left?: string;
    };
  }[];
}

export const projects: Project[] = [
  {
    name: "pmo",
    image: "/projects/pmo.png",
    alt: "pmo",
    description: "A minimal Pomodoro timer desktop app",
    href: "https://github.com/Profilist/pmo",
    previewImages: [
      { 
        src: "/projects/pmo2.png", 
        alt: "pmo",
        position: { top: "-0px", left: "-8px" }
      },
      { 
        src: "/projects/pmo1.png", 
        alt: "pmo",
        position: { top: "112px", left: "104px" }
      }
    ]
  },
  {
    name: "on the dot",
    image: "/projects/onthedot.svg",
    alt: "on the dot",
    href: "https://www.playonthedot.com/",
    description: "A web-based trivia game with 2000+ plays",
    video: "/projects/onthedot.mp4",
  },
  {
    name: "off the hook",
    image: "/projects/offthehook.svg",
    alt: "off the hook",
    href: "https://github.com/Profilist/off-the-hook",
    description: "A phishing ARG that lets you become the hacker",
    video: "/projects/offthehook.mov",
    previewImages: []
  }
];
