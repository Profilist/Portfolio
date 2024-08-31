import Head from "next/head";
import Header from "../Header";

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
        <Header currentPage="About"/>
      </main>
    </>
  );
}
