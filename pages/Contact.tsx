import React, {useRef, useEffect} from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
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
        <h1 className={styles.header}>Contact</h1>
      </div>
      <div className={styles.contactContainer} ref={containerRef}>
        <div className={styles.contactItem}>
          <a href="mailto:larris.xie@uwaterloo.ca">Email: larris.xie@uwaterloo.ca</a>
        </div>
        <div className={styles.contactItem}>
          <a href="https://www.linkedin.com/in/larrisxie">LinkedIn</a>
        </div>
        <div className={styles.contactItem}>
          <a href="https://github.com/Profilist">GitHub</a>
        </div>
        <div className={styles.contactItem}>
          <a href="https://devpost.com/larris-xie">Devpost</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
