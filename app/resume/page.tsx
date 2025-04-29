import React from "react";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>Larris&apos;s Resume</title>
        <meta name="description" content="Larris Xie's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" type="image/png"></link>
      </Head>
      <main style={{ width: "100vw", height: "100vh" }}>
        <iframe
          src="/resume.pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </main>
    </>
  );
};

export default index;
