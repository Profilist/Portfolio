import Head from "next/head";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "./Header";
import Introduction from "./Introduction";
import Project from "./Project";
import Experience from "./Experience";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Larris&apos;s Portfolio</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" type="image/png"></link>
      </Head>
      <main>
        <Header currentPage="Home"/>
        <Introduction/>
        <Project/>
        <Experience/>
        <Contact/>
      </main>
    </>
  );
}
