import React, { useRef } from "react";
import styles from "./home.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";

// gsap animation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
gsap.registerPlugin(useGSAP);

export const Home = () => {
  // gsap animainon
  let timelineAnimation = new gsap.timeline();

  // useref
  const homeRaf = useRef();

  useGSAP(
    () => {
      timelineAnimation.from("#animation", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 1,
        },
      });
    },
    { scope: homeRaf }
  );

  return (
    <section ref={homeRaf} id={styles.homePage}>
      <div id="wrap" className={styles.homeSection}>
        <div className={styles.content}>
          <h4 id="animation">mern stack web application</h4>
          <h1 id="animation">develop</h1>
        </div>
        <div className={styles.buttonSection}>
          <h6 id="animation"> &copy; MERN Stack Animation Website || 2024</h6>

          <button id="animation">
            <Link id="headerAnimation" to="/youtube-video">
              watch our video <IoArrowForward />
            </Link>
          </button>

          <div id="animation" className={styles.iconsGroup}>
            <a
              target="_Blank"
              href="https://www.linkedin.com/in/jahid-islam-rafsan-72515a30a/"
            >
              <IoLogoLinkedin />
            </a>
            <a
              target="_Blank"
              href="https://www.facebook.com/developer.rafsan/"
            >
              <FaFacebook />
            </a>
            <a
              target="_Blank"
              href="https://www.linkedin.com/in/jahid-islam-rafsan-72515a30a/"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
