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
  Cplusplus: "/cplusplus.png",
  Css: "/css.png",
  Express: "/express.png",
  Firebase: "/firebase.png",
  Flutter: "/flutter.png",
  Html: "/html.png",
  Java: "/java.png",
  JS: "/javascript.png",
  Mongodb: "/mongodb.png",
  Nextjs: "/nextjs.png",
  Nodejs: "/nodejs.png",
  Python: "/python.png",
  R: "/r.png",
  React: "/react.png",
  Sqlite: "/sqlite.png",
  TS: "/typescript.png",
  Unity: "/unity.png",
  Vercel: "/vercel.png",
  Swift: "/swift.png",
  Google: "/google-cloud.png",
  OpenCV: "/opencv.png",
  Csharp: "/csharp.png",
  Vite: "/vite.png",
  Flask: "/flask.png",
  AWS: "/aws.png",
  Tensorflow: "/tensorflow.png",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  projectDescription,
  projectStack = "",
  projectGithub,
  projectLink,
}) => {
  const stackArray = projectStack.split(" ").filter((tech) => logoMap[tech]);

  const handleCardClick = () => {
    if (projectLink) {
      window.open(projectLink, "_blank");
    }
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
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
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
