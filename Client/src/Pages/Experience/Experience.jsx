import React from "react";
import styles from "./experience.module.css";

export const Experience = () => {
  return (
    <section id={styles.experience}>
      <div id="wrap">
        <h2>Experience</h2>
        <div style={{ "--years": "'2020 to 2022'" }} className={styles.content}>
          <div className={styles.line}></div>
          <span>
            <h3>Front-end Web Developer</h3>
            <h4>
              I write code in HTML, CSS, Twillain CSS, JavaScript, React.js and Bootstrap for websites according to the requirements
            </h4>
            <ul>
              <li>Web Application Development</li>
              <li>JavaScript & MERN Stack Website Development</li>
              <li>WordPress Plugins & Themes Customizet</li>
              <li>Website customize and bug fixes</li>
              <li>Landing page and design</li>
              <li>PHD to HTML or Figma to HTML</li>
            </ul>
          </span>
        </div>
        <div style={{ "--years": "'2020 to 2022'" }} className={styles.content}>
          <div className={styles.line}></div>
          <span>
            <h3>Back-end Web Developer</h3>
            <h4>
              I write code in node.js, expres.js, mongoDB, Git, Firebase,
              Cloudinary and for websites according to the requirements
            </h4>
            <ul>
              <li>E-commerce Application Development</li>
              <li>Servide Web Application Development</li>
              <li>Login and Admin Functionality setup</li>
              <li>Website customize and bug fixes</li>
              <li>Optimize and Speed up Web Application</li>
              <li>Custom Shop, Cart, Checkout & Thank You Page</li>
            </ul>
          </span>
        </div>
      </div>
    </section>
  );
};
