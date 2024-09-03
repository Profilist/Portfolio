import React, {useRef, useEffect} from "react";
import styles from "../styles/Experience.module.css";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Experience</h1>
      </div>
      <div className={styles.experienceContainer} ref={containerRef}>
        <ExperienceCard date="Sep 2022 - Jun 2024" role="Web Committee Lead @ Bayview Secondary School Music Council" />
        <ExperienceCard date="Sep 2023 - Nov 2023" role="Virtual Software Engineer @ J.P. Morgan Virtual Program" />
        <ExperienceCard date="Aug 2022 - Feb 2023" role="Student Researcher @ Lumiere Education" />
      </div>
    </div>
  );
};

export default Experience;
