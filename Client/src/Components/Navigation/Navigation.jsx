import React, { useMemo, useCallback } from 'react';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'home', dataText: 'home' },
  { to: '/about', label: 'about', dataText: 'about' },
  { to: '/project', label: 'portfolio', dataText: 'portfolio' },
  { to: '/youtube-video', label: 'youtube video', dataText: 'youtube video' },
];

export const Navigation = React.memo(({ setActiveNav }) => {
  // Memoize the click handler for performance
  const handleNavClick = useCallback(() => setActiveNav(false), [setActiveNav]);

  // Memoize nav links for performance
  const navLinks = useMemo(
    () =>
      NAV_LINKS.map(({ to, label, dataText }) => (
        <NavLink
          key={to}
          onClick={handleNavClick}
          className="nav-link"
          style={{ "--dataText": `'${dataText}'` }}
          to={to}
        >
          {label}
        </NavLink>
      )),
    [handleNavClick]
  );

  return (
    <nav id="navigation" className={styles.navigation}>
      <div id="navigationbg1"></div>
      <div id="navigationbg2">{navLinks}</div>
    </nav>
  );
});
