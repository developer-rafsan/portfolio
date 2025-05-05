import React, { useEffect, useMemo } from "react";
import styles from "./preloader.module.css";
import { preloader } from "../../Animation/animation";

// Map text prop to preloader lines for optimization and scalability
const PRELOADER_TEXTS = {
  home: ["Web", "Developer"],
  about: ["About", "Me"],
  project: ["View", "Project"],
  youtube: ["Youtube", "video"],
};

export const Preloader = React.memo(({ text }) => {
  useEffect(() => {
    preloader();
  }, []);

  // Memoize the lines to render based on the text prop
  const lines = useMemo(() => PRELOADER_TEXTS[text] || [], [text]);

  return (
    <section id="preloader" className={styles.preloader}>
      <img src="/assets/favicons.webp" alt="preloader" loading="lazy" />
      <div>
        <h1 className="preloaderText">Rafsan</h1>
        <h1 className="preloaderText">-</h1>
        {lines.map((line, idx) => (
          <h1 className="preloaderText" key={idx}>
            {line}
          </h1>
        ))}
      </div>
    </section>
  );
});
