import Head from "next/head";
import Header from "../Header";
import Experience from "../Experience";
import Contact from "../Contact";
import styles from "../../styles/About.module.css";
import Image from "next/image";
import Conveyor from "./Conveyor";

export default function about() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; 
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <span>University of Waterloo. </span>I love exploring new technologies, which has led me to take part
            in <span>15+ hackathons</span> and work on projects that tackle real-world
            challenges. 
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
