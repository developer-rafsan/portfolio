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

export const Header = ({ themeActive, setThemeActive }) => {
  const [headerActive, setheaderActive] = useState(false);
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

  useEffect(() => {
    const navHiddenEffect = window.addEventListener("click", (e) => {
      if (screen.width < 900 && e.target.id !== "headerMeneIcons")
        return setActiveNav(false);
    });

    let hidenHeaderTime;
    const scrollEffect = window.addEventListener("scroll", () => {
      setheaderActive(true);

      hidenHeaderTime = setTimeout(() => {
        setheaderActive(false);
      }, 2000);
    });

    return () => {
      window.removeEventListener("scroll", scrollEffect);
      window.removeEventListener("click", navHiddenEffect);
      clearTimeout(hidenHeaderTime)
    };
  }, []);

  return (
    <header className={headerActive ? styles.hidden : ""}>
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

        {/* button lite mood and dark mood */}
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
