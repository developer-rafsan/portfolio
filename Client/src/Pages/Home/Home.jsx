import React, { useRef } from "react";
import styles from "./home.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

// gsap animation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
    { scope: homeRaf.current }
  );

  return (
    <section ref={homeRaf} id={styles.homePage}>
      <div id="wrap" className={styles.homeSection}>
        <div className={styles.content}>
          <h4 id="animation"><span>WordPress</span> or <span>mern stack</span>  web application</h4>
          <h1 id="animation">develop</h1>
        </div>
        <div className={styles.buttonSection}>
          <h6 id="animation"> &copy; MERN Stack Animation Website || 2024</h6>
          <button id="animation">
            <Link id="headerAnimation" to="/youtube-video">
              watch our video <IoArrowForward />
            </Link>
          </button>

          <div className={styles.iconsGroup}>
            <a
              id="animation"
              target="_Blank"
              href="https://www.linkedin.com/in/jahid-islam-rafsan-72515a30a"
            >
              <IoLogoLinkedin />
            </a>
            <a
              id="animation"
              target="_Blank"
              href="https://www.facebook.com/developer.rafsan"
            >
              <FaFacebook />
            </a>
            <a
              id="animation"
              target="_Blank"
              href="https://www.youtube.com/@jahidislamrafsan"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
