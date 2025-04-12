import React from "react";
import styles from "../styles/Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Larris Xie</h1>
      <h2 className={styles.subtitle}>Software Engineer</h2>
      <p className={styles.description}>
        Computer Science Major at the University of Waterloo.
      </p>
    </div>
  );
};

export default Introduction;
