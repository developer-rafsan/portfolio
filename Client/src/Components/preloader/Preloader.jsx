import React, { useEffect } from "react";
import styles from "./preloader.module.css";
import { preloader } from "../../Animation/animation";

export const Preloader = ({ text }) => {
  useEffect(() => {
    preloader();
  }, []);

  return (
    <section id="preloader" className={styles.preloader}>
      <img src="/assets/favicons.webp" alt="preloader" />
      <div>
        <h1 className="preloaderText">Rafsan</h1>
        <h1 className="preloaderText">-</h1>
        {text === "home" && (
          <>
            <h1 className="preloaderText">Web</h1>
            <h1 className="preloaderText">Developer</h1>
          </>
        )}
        {text === "about" && (
          <>
            <h1 className="preloaderText">About</h1>
            <h1 className="preloaderText">Me</h1>
          </>
        )}
        {text === "project" && (
          <>
            <h1 className="preloaderText">View</h1>
            <h1 className="preloaderText">Project</h1>
          </>
        )}
        {text === "youtube" && (
          <>
            <h1 className="preloaderText">Youtube</h1>
            <h1 className="preloaderText">video</h1>
          </>
        )}
      </div>
    </section>
  );
};
