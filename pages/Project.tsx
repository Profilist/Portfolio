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
        />
        <ProjectCard
          projectName="Saving Christmas"
          projectDescription="A 2D Christmas-themed platformer game created using Unity."
          projectGithub="https://github.com/Profilist/Saving-Christmas"
          projectStack="Csharp Unity"
        />
        <ProjectCard
          projectName="NutriScan"
          projectDescription="An iOS app designed to provide nutrition facts from a photo."
          projectGithub="https://github.com/yanziguoo/NutriScan"
          projectStack="Swift Python Firebase Google"
        />
        <ProjectCard
          projectName="ML Research Paper"
          projectDescription="A research paper about a ML approach to detect financial fraud. Mentored by professor Maria Konte."
          projectGithub="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history"
          projectStack="Python"
        />
      </div>
    </div>
  );
};

export default Project;
