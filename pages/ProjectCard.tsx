import React from 'react';
import styles from '../styles/ProjectCard.module.css';
import Image from 'next/image';

interface ProjectCardProps {
    projectName: string;
    projectDescription: string;
    projectImage: string;
    projectGithub: string;
    projectLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectName, projectDescription, projectImage, projectGithub, projectLink }) => {
  return (
    <div className={styles.cardContainer}>
        <div className={styles.name}>{projectName}</div>
        <div className={styles.description}>{projectDescription}</div>
        <a href={projectGithub}>
          <Image src="/github.svg" alt="GitHub Logo" width={48} height={48} />
        </a>
    </div>
  )
}

export default ProjectCard;