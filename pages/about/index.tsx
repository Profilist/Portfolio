import Head from "next/head";
import Header from "../Header";
import Experience from "../Experience";
import Contact from "../Contact";
import styles from "../../styles/About.module.css";
import Image from "next/image";
import Conveyor from "./Conveyor";

export default function about() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/getResume");
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      } else {
        document.body.removeChild(link); 
      }

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Larris&apos;s Portfolio</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" type="image/png"></link>
      </Head>
      <main>
        <Header currentPage="About" />
        <div className={styles.headerContainer}>
          <h1>About Me</h1>
          <p>Email: larris.xie@uwaterloo.ca</p>
          <button onClick={handleDownload} className={styles.button}>
            <p>CV</p>
            <Image src="/downloadfile.svg" alt="" width={24} height={24} />
          </button>
        </div>
        <div className={styles.description}>
          <p>
            I&apos;m a <span>Software Developer</span> from Toronto, currently
            studying Computer Science at the{" "}
            <span>University of Waterloo. </span>
            I love participating in hackathons and working on projects that I&apos;m passionate about!
          </p>
        </div>
        <div className={styles.techstack}>
          <div className={styles.techstackHeader}>
            <h1>My Tech Stack</h1>
          </div>
          <Conveyor />
        </div>
        <Experience />
        <Contact />
      </main>
    </>
  );
}
