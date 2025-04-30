import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Larris's Resume",
  description: "Larris Xie's Resume"
};

const ResumePage = () => {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src="/resume.pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </main>
  );
};

export default ResumePage;
