import Head from "next/head";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// import styles from "../styles/Home.module.css";
import Header from "./Header";
import Introduction from "./Introduction";
import Projects from "./Projects";
import Experience from "./Experience";

export default function Home() {
  return (
    <>
      <Head>
        <title>Larris's Portfolio</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" type="image/svg"></link>
      </Head>
      <main>
        <Header currentPage="Home"/>
        <Introduction/>
        <Projects/>
        {/* <Experience/> */}
      </main>
    </>
  );
}
