import React from "react";
import styles from "../styles/Header.module.css";

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="/">
        <img src="/logoDark.svg" alt="Logo" width={180} height={37} />
      </a>

      <div className={styles.navContainer}>
        <p className={currentPage === "Home" ? styles.active : ""}>Home</p>
        <p className={currentPage === "Projects" ? styles.active : ""}>
          Projects
        </p>
        <p className={currentPage === "About" ? styles.active : ""}>About</p>
      </div>

      <div className={styles.logos}>
        <a href="https://github.com/Profilist">
          <img src="/github.svg" alt="GitHub Logo" width={48} height={48} />
        </a>
        <a href="https://linkedin.com/in/larrisxie">
          <img src="/linkedin.svg" alt="LinkedIn Logo" width={48} height={48} />
        </a>
      </div>
    </div>
  );
};

export default Header;
