import React from "react";
import styles from "../styles/ProjectCard.module.css";
import Image from "next/image";

interface ProjectCardProps {
  projectName: string;
  projectDescription: string;
  projectStack: string;
  projectGithub: string;
  projectLink?: string;
}

const logoMap: { [key: string]: string } = {
  Cplusplus: "/cplusplus.svg",
  Css: "/css.svg",
  Express: "/express.svg",
  Firebase: "/firebase.svg",
  Flutter: "/flutter.svg",
  Html: "/html.svg",
  Java: "/java.svg",
  JS: "/javascript.svg",
  Mongodb: "/mongodb.svg",
  Nextjs: "/nextjs.svg",
  Nodejs: "/nodejs.svg",
  Python: "/python.svg",
  R: "/r.svg",
  React: "/react.svg",
  Sqlite: "/sqlite.svg",
  TS: "/typescript.svg",
  Unity: "/unity.svg",
  Vercel: "/vercel.svg",
  Swift: "/swift.svg",
  Google: "/google-cloud.svg",
  OpenCV: "/opencv.svg",
  Csharp: "/csharp.svg",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectDescription,
  projectStack = "",
  projectGithub,
  projectLink,
}) => {
  const stackArray = projectStack.split(" ").filter((tech) => logoMap[tech]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.name}>{projectName}</div>
      <div className={styles.description}>{projectDescription}</div>
      <div className={styles.stack}>
        {stackArray.map((tech, index) => (
          <Image
            className={styles.logo}
            key={index}
            src={logoMap[tech]}
            alt={`${tech} Logo`}
            width={32}
            height={32}
          />
        ))}
      </div>
      <div className={styles.links}>
        <a href={projectGithub}>
          <Image src="/github.svg" alt="GitHub Logo" width={48} height={48} />
        </a>
        {projectLink && (
        <a href={projectLink}>
          <Image src="/arrow.svg" alt="View" width={36} height={36} />
        </a>)
        }
      </div>
    </div>
  );
};

export default ProjectCard;
