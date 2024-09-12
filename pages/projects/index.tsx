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
        <link rel="icon" href="/logo.png" type="image/png"></link>
      </Head>
      <main>
        <Header currentPage="Projects" />
        <div className={styles.wrapper}>
          <div className={styles.headerContainerColumn}>
            <h1 className={styles.title}>Projects</h1>
            <p>Check out my recent work!</p>
          </div>
          <div className={styles.projectsContainer}>
            <ProjectCard
              projectName="The Fastest Root"
              projectDescription="A web app that calculates the cheapest and fastest grocery shopping route."
              projectGithub="https://github.com/Profilist/The-Fastest-Root"
              projectStack="React Nextjs TS Nodejs Express Google"
              projectLink="https://devpost.com/software/the-fastest-root"
            />
            <ProjectCard
              projectName="Saving Christmas"
              projectDescription="A 2D Christmas-themed platformer game created using Unity."
              projectGithub="https://github.com/Profilist/Saving-Christmas"
              projectStack="Csharp Unity"
              projectLink="https://decypherx.itch.io/saving-christmas"
            />
            <ProjectCard
              projectName="NutriScan"
              projectDescription="An iOS app designed to provide nutrition facts from a photo."
              projectGithub="https://github.com/yanziguoo/NutriScan"
              projectStack="Swift Python Firebase Google"
              projectLink="https://devpost.com/software/nutriscan-d06z4p"
            />
            <ProjectCard
              projectName="ML Research Paper"
              projectDescription="A research paper about a ML approach to detect financial fraud. Mentored by professor Maria Konte."
              projectGithub="https://github.com/Profilist/Financial-Fraud-Detection"
              projectStack="Python"
              projectLink="https://jhss.scholasticahq.com/article/85172-a-machine-learning-approach-to-detect-fraudulent-customers-based-on-their-financial-transaction-history"
            />
            <ProjectCard
              projectName="Harmony Haven"
              projectDescription="A web app that transforms any song into a gamified karaoke experience."
              projectGithub="https://github.com/vincentjsun/HarmonyHaven"
              projectStack="React Nodejs Express Mongodb Google"
              projectLink="https://devpost.com/software/harmony-haven"
            />
            <ProjectCard
              projectName="Cameron the Conserving Caretaker"
              projectDescription="A web app to visualize home energy usage compared to sustainable levels."
              projectGithub="https://github.com/Profilist/Cameron-the-Conserving-Caretaker"
              projectStack="React Nextjs JS"
              projectLink="https://cameron-the-conserving-caretaker.vercel.app"
            />
            <ProjectCard
              projectName="Twist Twist Revolution"
              projectDescription="A computer vision based rhythm game made with OpenCV and Pygame."
              projectGithub="https://github.com/Profilist/Twist-Twist-Revolution"
              projectStack="Python OpenCV"
              projectLink="https://devpost.com/software/pygame-72wruz"
            />
            <ProjectCard
              projectName="Year of the Habit"
              projectDescription="A New Year's resolution website implemented with ChatGPT."
              projectGithub="https://github.com/Profilist/Year-of-the-Habit"
              projectStack="React Nextjs OpenAI"
              projectLink="https://year-of-the-habit.vercel.app"
            />
            <ProjectCard
              projectName="NatureReads"
              projectDescription="An R package for data visualization of the naturecounts dataset, managed by Birds Canada."
              projectGithub="https://github.com/Profilist/NatureReads"
              projectStack="R"
              projectLink="https://devpost.com/software/naturereads"
            />
            <ProjectCard
              projectName="Session"
              projectDescription="A Flutter app that tracks study habits and rewards them with points."
              projectGithub="https://github.com/Profilist/Session"
              projectStack="Flutter Firebase Google"
              projectLink="https://devpost.com/software/session-53z2ie"
            />
            <ProjectCard
              projectName="Frood"
              projectDescription="A MERN stack web app that allows users to effortlessly figure out what’s for dinner."
              projectGithub="https://github.com/Profilist/frood"
              projectStack="React Redux Nodejs Express Mongodb"
              projectLink="https://devpost.com/software/frood-wknszx"
            />
            <ProjectCard
              projectName="Boggle"
              projectDescription="A Java implementation of the Boggle game with an interactive GUI."
              projectGithub="https://github.com/melon64/ICS4UBoggle"
              projectStack="Java"
              projectLink="https://github.com/melon64/ICS4UBoggle"
            />
          </div>
        </div>
      </main>
    </>
  );
}
