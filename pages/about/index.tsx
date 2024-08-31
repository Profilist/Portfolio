import Head from "next/head";
import Header from "../Header";
import Experience from "../Experience";
import Contact from "../Contact";
import styles from "../../styles/About.module.css";
import Image from "next/image";

export default function about() {
  return (
    <>
      <Head>
        <title>Larris&apos;s Portfolio</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" type="image/svg"></link>
      </Head>
      <main>
        <Header currentPage="About" />
        <div className={styles.headerContainer}>
          <h1>About Me</h1>
          <p>Email: larris.xie@uwaterloo.ca</p>
          <a href="/resume.pdf" download className={styles.button}>
            <p>CV</p>
            <Image src="/downloadfile.svg" alt="" width={24} height={24} />
          </a>
        </div>
        <div className={styles.description}>
          <p>
            I’m a <span>Software Developer</span> from Toronto with a strong foundation in
            Computer Science, currently studying at the <span>University of Waterloo. </span> 
            I’m actively seeking out new challenges and opportunities in the
            software industry.
          </p>
        </div>
        <div className={styles.techstack}>
          <h1>My Tech Stack</h1>
        </div>
        <Experience />
        <Contact />
      </main>
    </>
  );
}
