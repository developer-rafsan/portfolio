import React from "react";
import styles from "./about.module.css";
import { SKILL_DATA } from "./Skill.Data.jsx";

export const About = () => {  
  return (
    <section id="about" className={styles.about}>
      <h2 id="anima">skill</h2>
      <div id='wrap'>
      <div className={styles.skillSection}>
          {
            SKILL_DATA?.map((item,index)=><div key={index} className={styles.item}>
            <img src={item.icon} alt={item.text} />
            <h3>{item.text}</h3>
            <h1>{item.persent}%</h1>
          </div>)
          }
        </div>
      </div>        
    </section>
  );
};
