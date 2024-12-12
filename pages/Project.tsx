import React from "react";
import styles from "../styles/Projects.module.css";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

const Project = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Projects</h1>
        <Link href="/projects">
          <button className={styles.button}>View All</button>
        </Link>
      </div>
      <div className={styles.projectsContainer}>
        <ProjectCard
          projectName="The Fastest Root"
          projectDescription="A web app that calculates the cheapest and fastest grocery shopping route."
          projectGithub="https://github.com/Profilist/The-Fastest-Root"
          projectStack="React Nextjs TS Nodejs Express Google"
          projectLink="https://devpost.com/software/the-fastest-root"
        />
        <ProjectCard
          projectName="Saving Christmas"
          projectDescription="A 2D Christmas-themed platformer game created using Unity."
          projectGithub="https://github.com/Profilist/Saving-Christmas"
          projectStack="Csharp Unity"
          projectLink="https://decypherx.itch.io/saving-christmas"
        />
        <ProjectCard
          projectName="Square Up"
          projectDescription="A web app for communities to create mosaics by uploading individual photo pieces."
          projectGithub="https://github.com/Precisshley/SquareUp"
          projectStack="React Vite JS Flask AWS"
          projectLink="https://square-up-pearl.vercel.app/home"
        />
        <ProjectCard
          projectName="ML Research Paper"
          projectDescription="A research paper about a ML approach to detect financial fraud. Mentored by professor Maria Konte."
          projectGithub="https://github.com/Profilist/Financial-Fraud-Detection"
          projectStack="Python"
          projectLink="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history"
        />
      </div>
    </div>
  );
};

export default Project;
