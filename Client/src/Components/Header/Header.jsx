import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { GoMoon } from "react-icons/go";
import { GoSun } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

// theme lite mode and dark mode
import { darkModeTheme } from "../../THEME/dark.mode.js";
import { liteModeTheme } from "../../THEME/lite.mode.js";

// gsap animation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Header = ({ themeActive, setThemeActive }) => {
  // theme change function
  const themeChange = () => {
    if (themeActive === "DARK") {
      // liteModeTheme();
      // return setThemeActive("LITE");
      // temporary
      darkModeTheme();
      return setThemeActive("DARK");
    }
    if (themeActive === "LITE") {
      darkModeTheme();
      return setThemeActive("DARK");
    }
  };

  // lite mode and dark mode icons animation
  const themeStyleIcons = {
    transform: "rotate(0deg)",
  };

  const [activeNav, setActiveNav] = useState(screen.width < 900 ? false : true);

  // gsap animainon
  let timelineAnimation = new gsap.timeline();

  useGSAP(() => {
    timelineAnimation.from(["#headerAnimation", "#headerMeneIcons"], {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    });
  });

  // only for phone version
  const menuClose = () => {
    if (screen.width < 900) {
      window.addEventListener("click", (e) => {
        if (e.target.id !== "headerMeneIcons") setActiveNav(false);
      });
    }
  };

  useEffect(() => {
    menuClose();
  }, []);

  return (
    <header>
      <div className={styles.headerContent} id="wrap">
        {/* logo */}
        <div id="headerAnimation" className={styles.logo}>
          <img src="/assets/logo.svg" alt="logo" />
        </div>

        {/* menu bar */}
        {activeNav && (
          <ul className={styles.menuHeader}>
            <IoClose
              className={styles.closeIcons}
              onClick={() => setActiveNav(false)}
            />
            <Link id="headerAnimation" to="/">
              Home
            </Link>
            <Link id="headerAnimation" to="/project">
              Project
            </Link>
            <Link id="headerAnimation" to="/youtube-video">
              Watch Video
            </Link>
          </ul>
        )}

        {/* menu icons */}
        <HiMenu
          id="headerMeneIcons"
          onClick={() => setActiveNav(true)}
          className={styles.menuIcons}
        />

        {/* button */}
        <button
          id="headerAnimation"
          onClick={themeChange}
          className={styles.moonIcons}
        >
          <div style={themeActive === "LITE" ? themeStyleIcons : {}}>
            <GoMoon />
            <GoSun />
          </div>
        </button>
      </div>
    </header>
  );
};
