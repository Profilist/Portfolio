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
          projectName="Autonomous Vision Systems for Self-Driving Cars"
          projectDescription="An analysis of object detection pipelines for self-driving cars."
          projectGithub="https://github.com/Profilist/Autonomous-Driving"
          projectStack="Python Tensorflow"
          projectLink="https://github.com/Profilist/Autonomous-Driving"
        />
        <ProjectCard
          projectName="Off The Hook"
          projectDescription="A phishing ARG educating users on the dangers of phishing attacks through the perspective of a hacker."
          projectGithub="https://github.com/Profilist/off-the-hook"
          projectStack="React Vite JS Flask Mongodb"
          projectLink="https://dorahacks.io/buidl/21599"
        />
        <ProjectCard
          projectName="ML Research Paper"
          projectDescription="A research paper on using ML to detect financial fraud, mentored by professor Maria Konte."
          projectGithub="https://github.com/Profilist/Financial-Fraud-Detection"
          projectStack="Python"
          projectLink="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history"
        />
        <ProjectCard
          projectName="Saving Christmas"
          projectDescription="A 2D Christmas-themed platformer game created using Unity."
          projectGithub="https://github.com/Profilist/Saving-Christmas"
          projectStack="Csharp Unity"
          projectLink="https://decypherx.itch.io/saving-christmas"
        />
      </div>
    </div>
  );
};

export default Project;
