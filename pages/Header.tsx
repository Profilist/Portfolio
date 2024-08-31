import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src="/logoDark.svg" alt="Logo" width={180} height={37} />
      </Link>

      <div className={styles.navContainer}>
        <Link href="/" className={currentPage === "Home" ? styles.active : styles.link}>Home</Link>
        <Link href="/projects" className={currentPage === "Projects" ? styles.active : styles.link}>
          Projects
        </Link>
        <Link href="/about" className={currentPage === "About" ? styles.active : styles.link}>About</Link>
      </div>

      <div className={styles.logos}>
        <a href="https://github.com/Profilist">
          <Image src="/github.svg" alt="GitHub Logo" width={48} height={48} />
        </a>
        <a href="https://linkedin.com/in/larrisxie">
          <Image src="/linkedin.svg" alt="LinkedIn Logo" width={48} height={48} />
        </a>
      </div>
    </div>
  );
};

export default Header;
