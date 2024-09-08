import React from "react";
import styles from "../../styles/Resume.module.css";

const index = () => {
  return (
    <div className={styles.wrapper}>
      <object
        data="/resume.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
      </object>
    </div>
  );
};

export default index;
