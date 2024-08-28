import React from "react";
import styles from "./about.module.css";
import { SKILL_DATA } from "./Skill.Data.jsx";

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div
        style={{
          "--height": "100px",
          "--width": "100px",
          "--quntity": 12,
        }}
        className={styles.skillPage}
      >
        <h2 id="anima">my skills</h2>
        <div className={styles.skilAnimation}>
          {SKILL_DATA?.map((item) => (
            <div
              key={item.id}
              style={{ "--position": item.id }}
              className={styles.item}
            >
              {item.svg}
              <h4>{item.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
