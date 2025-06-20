import React, { useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import {
  FaRegCirclePlay,
  FaRegCirclePause,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa6";
import { IoArrowForward } from "react-icons/io5";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import PORTFOLIODATA from "./PORTFOLIODATA";
import { Preloader } from "../../Components/preloader/Preloader";

// Social links data for DRY principle
const SOCIAL_LINKS = [
  {
    href: "https://github.com/developer-rafsan",
    icon: <FaGithub />,
    label: "github",
    desc: "/developer-rafsan",
  },
  {
    href: "https://www.linkedin.com/in/jahid-islam-rafsan/",
    icon: <FaLinkedin />,
    label: "linkedin",
    desc: "/jahid-islam-rafsan",
  },
  {
    href: "https://www.youtube.com/@jahidislamrafsan",
    icon: <FaYoutube />,
    label: "Youtube",
    desc: "/jahidislamrafsan",
  },
  {
    href: "https://www.facebook.com/developer.rafsan.page",
    icon: <FaFacebook />,
    label: "facebook page",
    desc: "/developer.rafsan",
  },
];

// Skills list for DRY
const SKILLS = ["wordpress", "mern stack", "Node.js"];

export default function Home() {
  // Use a ref to track which video is playing for better control
  const videoRefs = useRef({});

  // Play/pause handler for videos
  const handleVideoPlayPause = useCallback((id) => {
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      // Pause all other videos
      Object.values(videoRefs.current).forEach((v) => {
        if (v && !v.paused) v.pause();
      });
      video.play();
    } else {
      video.pause();
    }
  }, []);

  // Memoize portfolio items for performance
  const portfolioItems = useMemo(
    () =>
      PORTFOLIODATA?.map((item) => (
        <div key={item.id}>
          <div className={styles.item}>
            {/* image card */}
            {item.type === "image" && (
              <a href={item?.imaURL} target="_blank" rel="noopener noreferrer">
                <img src={item?.imaURL} alt="portfolio" loading="lazy" />
              </a>
            )}
          </div>
        </div>
      )),
    [handleVideoPlayPause]
  );

  // Memoize social links
  const socialLinks = useMemo(
    () =>
      SOCIAL_LINKS.map(({ href, icon, label, desc }) => (
        <div className={styles.item} key={label}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            className={styles.content}
          >
            {icon}
            <div>
              <h5>{label}</h5>
              <p>{desc}</p>
            </div>
          </a>
        </div>
      )),
    []
  );

  return (
    <section id={styles.homePage}>
      {/* preloader section */}
      <Preloader text="home" />
      <div id="wrap" className={styles.homeSection}>
        {/* hero section */}
        <ul>
          {SKILLS.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h4>WordPress expert MERN stack web application developer</h4>
        <div className={styles.linkGroup}>
          <Link to="/project">Project</Link>
          <span>-</span>
          <Link to="/about">about me</Link>
        </div>

        {/* portfolio section */}
        <div className={styles.Portfolio}>
          <h1>
            my <br /> Portfolio -
          </h1>
          <div className={styles.itemGroup}>{portfolioItems}</div>

          {/* find me section */}
          <h1>
            find <br /> me -
          </h1>
          <div className={styles.findSection}>{socialLinks}</div>
        </div>

        {/* collaborate section */}
        <div className={styles.collaborate}>
          <p>Need a developer?</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fiverr.com/rafsan954"
          >
            Let's Collaborate <FaArrowRight />
          </a>
        </div>

        {/* footer section */}
        <footer>
          <h1>Say Hello</h1>
          <div className={styles.content}>
            {/* logo */}
            <Link className={styles.logo} to="/" tabIndex={0} aria-label="Home">
              <img src="/assets/logo.svg" alt="logo" loading="lazy" />
            </Link>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/01966445521"
              >
                +880 1966445521
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:developer.rafsanx@gmail.com"
              >
                developer.rafsan@gmail.com
              </a>
            </div>
            <div>
              <Link to="/about">About</Link>
              <Link to="/project">Get into Touch</Link>
            </div>
          </div>
          <p>&copy; Jahid Islam Rafsan || 2024</p>
        </footer>
      </div>
    </section>
  );
}
