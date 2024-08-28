import React, { useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { GoMoon } from "react-icons/go";
import { GoSun } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import { darkModeTheme } from "../../THEME/dark.mode.js";
import { liteModeTheme } from "../../THEME/lite.mode.js";
import { useGSAP } from "@gsap/react";

export const Header = ({ themeActive, setThemeActive, timeline }) => {
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

  const themeStyleIcons = {
    transform: "rotate(0deg)",
  };

  const [activeNav, setActiveNav] = useState(screen.width < 900 ? false : true);

  useGSAP(() => {
    timeline.from("#headerAnimation", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    });
  });

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
          id="headerAnimation"
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
