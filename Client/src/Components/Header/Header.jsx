import React, { useEffect, useCallback } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { closeNavigation, openNavigation } from "../../Animation/animation";

export const Header = React.memo(({ activeNav, setActiveNav }) => {
  useEffect(() => {
    if (activeNav) {
      openNavigation();
    } else {
      closeNavigation();
    }
  }, [activeNav]);

  // Memoize the nav toggle handler for performance
  const handleNavToggle = useCallback(() => {
    setActiveNav((prev) => !prev);
  }, [setActiveNav]);

  return (
    <header>
      <div className={styles.headerContent}>
        {/* logo */}
        <Link className={styles.logo} to="/" tabIndex={0} aria-label="Home">
          <img src="/assets/logo.svg" alt="logo" loading="lazy" />
        </Link>

        {/* nav icons */}
        <div
          onClick={handleNavToggle}
          className={activeNav ? styles.menuClose : styles.menuNav}
          role="button"
          tabIndex={0}
          aria-label={activeNav ? "Close navigation" : "Open navigation"}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") handleNavToggle();
          }}
        ></div>
      </div>
    </header>
  );
});
