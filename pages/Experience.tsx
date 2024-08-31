import React from "react";
import styles from "../styles/Experience.module.css";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Experience</h1>
      </div>
      <div className={styles.experienceContainer}>
        <ExperienceCard date="Aug 2022 - Feb 2023" role="Student Researcher @ Lumiere Education" />
        {/* <ExperienceCard date="Aug 2022 - Feb 2023" role="Student Researcher @ Lumiere Education" /> */}
      </div>
    </div>
  );
};

export default Experience;
