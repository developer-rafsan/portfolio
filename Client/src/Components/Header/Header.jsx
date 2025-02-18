import React, { useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { closeNavigation, openNavigation } from "../../Animation/animation";

export const Header = ({ activeNav, setActiveNav }) => {
  useEffect(() => {
    if (activeNav) {
      openNavigation();
    } else {
      closeNavigation();
    }
  }, [activeNav]);

  return (
    <header>
      <div className={styles.headerContent}>
        {/* logo */}
        <Link className={styles.logo} to="/">
          <img src="/assets/logo.svg" alt="logo" />
        </Link>

        {/* nav icons */}
        <div
          onClick={() => setActiveNav(!activeNav)}
          className={!activeNav ? styles.menuNav : styles.menuClose}
        ></div>
      </div>
    </header>
  );
};
