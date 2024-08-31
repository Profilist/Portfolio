import React from "react";
import styles from "../styles/Projects.module.css";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Projects</h1>
        <button className={styles.button}>View All</button>
      </div>
      <div className={styles.projectsContainer}>
        <ProjectCard
          projectName="The Fastest Root"
          projectDescription="A web app that calculates the cheapest and fastest grocery shopping route."
          projectGithub="https://github.com/Profilist/The-Fastest-Root"
          projectImage=""
        />
        <ProjectCard
          projectName="Saving Christmas"
          projectDescription="A 2D Christmas-themed platformer game created using Unity."
          projectGithub="https://github.com/Profilist/Saving-Christmas"
          projectImage=""
        />
        <ProjectCard
          projectName="NutriScan"
          projectDescription="An iOS app designed to provide nutrition facts from a photo."
          projectGithub="https://github.com/yanziguoo/NutriScan"
          projectImage=""
        />
        <ProjectCard
          projectName="Year of the Habit"
          projectDescription="A New Year's resolution website."
          projectGithub="https://github.com/Profilist/Year-of-the-Habit"
          projectImage=""
        />
      </div>
    </div>
  );
};

export default Projects;
