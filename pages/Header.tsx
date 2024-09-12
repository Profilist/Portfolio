import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src="/logo.png" alt="Logo" width={48} height={48} />
      </Link>

      <div className={styles.navContainer}>
        <Link
          href="/"
          className={currentPage === "Home" ? styles.active : styles.link}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={currentPage === "Projects" ? styles.active : styles.link}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={currentPage === "About" ? styles.active : styles.link}
        >
          About
        </Link>
      </div>

      <div className={styles.menuContainer}>
        <button className={styles.menuButton} onClick={handleMenuClick}>
          <Image src="/menu.svg" alt="Menu" width={48} height={48} />
        </button>

        <div
          className={`${styles.dropdownMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
        </div>
      </div>

      <div className={styles.logos}>
        <a href="https://github.com/Profilist">
          <Image src="/github.svg" alt="GitHub Logo" width={48} height={48} />
        </a>
        <a href="https://linkedin.com/in/larrisxie">
          <Image
            src="/linkedin.svg"
            alt="LinkedIn Logo"
            width={48}
            height={48}
          />
        </a>
        <Link href="/resume">
          <Image
            src="/cv.svg"
            alt="Resume"
            width={48}
            height={35}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
