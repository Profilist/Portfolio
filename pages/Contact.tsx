import React from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Contact</h1>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactItem}>
          <a href="mailto:larris.xie@uwaterloo.ca">Email: larris.xie@uwaterloo.ca</a>
        </div>
        <div className={styles.contactItem}>
          <a href="https://www.linkedin.com/in/larrisxie">LinkedIn</a>
        </div>
        <div className={styles.contactItem}>
          <a href="https://github.com/Profilist">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
