import Head from "next/head";
import ProjectCard from "../ProjectCard";
import Header from "../Header";
import styles from "../../styles/Projects.module.css";

export default function Home() {
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
              projectName="Saving Christmas"
              projectDescription="A 2D Christmas-themed platformer game created using Unity."
              projectGithub="https://github.com/Profilist/Saving-Christmas"
              projectImage=""
            />
            <ProjectCard
              projectName="NutriScan"
              projectDescription="An iOS app designed to provide nutrition facts from a photo."
              projectGithub="https://github.com/yanziguoo/NutriScan"
              projectImage=""
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectImage=""
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectImage=""
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectImage=""
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectImage=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
