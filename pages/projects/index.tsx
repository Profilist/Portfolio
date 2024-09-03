import Head from "next/head";
import ProjectCard from "../ProjectCard";
import Header from "../Header";
import styles from "../../styles/Projects.module.css";

export default function projectPage() {
  return (
    <>
      <Head>
        <title>Larris&apos;s Portfolio</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" type="image/svg"></link>
      </Head>
      <main>
        <Header currentPage="Projects" />
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <h1 className={styles.title}>Projects</h1>
          </div>
          <div className={styles.projectsContainer}>
            <ProjectCard
              projectName="The Fastest Root"
              projectDescription="A web app that calculates the cheapest and fastest grocery shopping route."
              projectGithub="https://github.com/Profilist/The-Fastest-Root"
              projectImage=""
            />
            <ProjectCard
              projectName="NutriScan"
              projectDescription="An iOS app designed to provide nutrition facts from a photo."
              projectGithub="https://github.com/yanziguoo/NutriScan"
              projectImage=""
            />
            <ProjectCard
              projectName="Saving Christmas"
              projectDescription="A 2D Christmas-themed platformer game created using Unity."
              projectGithub="https://github.com/Profilist/Saving-Christmas"
              projectImage=""
            />
            <ProjectCard
              projectName="ML Research Paper"
              projectDescription="A research paper about a ML approach to detect financial fraud. Mentored by professor Maria Konte."
              projectGithub="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history"
              projectImage=""
            />
            <ProjectCard
              projectName="Harmony Haven"
              projectDescription="A web app that transforms any song into a gamified karoake experience."
              projectGithub="https://github.com/vincentjsun/HarmonyHaven"
              projectImage=""
            />
            <ProjectCard
              projectName="Cameron the Conserving Caretaker"
              projectDescription="A web app to visualize home energy usage compared to sustainable levels."
              projectGithub="https://github.com/Profilist/Cameron-the-Conserving-Caretaker"
              projectImage=""
            />
            <ProjectCard
              projectName="Twist Twist Revolution"
              projectDescription="A computer vision based rhythm game."
              projectGithub="https://github.com/Profilist/Twist-Twist-Revolution"
              projectImage=""
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website implemented with ChatGPT."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectImage=""
            />
            <ProjectCard
              projectName="NatureReads"
              projectDescription="An R package for data processing and visualization of the naturecounts dataset, managed by the non-profit Birds Canada."
              projectGithub="https://github.com/Profilist/NatureReads"
              projectImage=""
            />
            <ProjectCard
              projectName="Session"
              projectDescription="A Flutter app that tracks study habits and rewards them with points."
              projectGithub="https://github.com/Profilist/Session"
              projectImage=""
            />
            <ProjectCard
              projectName="Frood"
              projectDescription="A MERN stack web app that allows users to effortlessly figure out what’s for dinner."
              projectGithub="https://github.com/Profilist/frood"
              projectImage=""
            />
            <ProjectCard
              projectName="Boggle"
              projectDescription="A Java implementation of the Boggle game with a GUI."
              projectGithub="https://github.com/melon64/ICS4UBoggle"
              projectImage=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
