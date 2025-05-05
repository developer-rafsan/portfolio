import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Header } from "./Components/Header/Header";
import { Navigation } from "./Components/Navigation/Navigation";

// Lazy load pages
const Home = React.lazy(() => import("./Pages/Home/Home"));
const About = React.lazy(() => import("./Pages/About/About"));
const Project = React.lazy(() => import("./Pages/Project/Project"));
const Youtube = React.lazy(() => import("./Pages/YoutubeVideo/Youtube"));
const ErrorPage = React.lazy(() => import("./Components/404/ErrorPage"));

// Theme imports
import { liteModeTheme } from "./THEME/lite.mode";
import { darkModeTheme } from "./THEME/dark.mode";

function App() {
  // Theme state
  const [themeActive, setThemeActive] = useState(() => localStorage.getItem("THEME") || "DARK");
  const [activeNav, setActiveNav] = useState(false);

  // Cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Memoize theme effect to avoid unnecessary re-renders
  useEffect(() => {
    if (themeActive === "LITE") {
      liteModeTheme();
    } else {
      darkModeTheme();
    }
  }, [themeActive]);

  // Cursor move handler
  const mouseMoveHandler = useCallback((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mouseMoveHandler]);

  // Memoize cursor style for performance
  const animationCursor = useMemo(() => ({
    backgroundColor: "#FFF",
    mixBlendMode: "difference",
    transform: `translateX(${cursorPosition.x - 25}px) translateY(${cursorPosition.y - 25}px)`,
  }), [cursorPosition]);

  // Memoize routes for optimization
  const routes = useMemo(() => (
    <Routes>
      <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
      <Route path="/project" element={<Suspense fallback={<div>Loading...</div>}><Project /></Suspense>} />
      <Route path="/youtube-video" element={<Suspense fallback={<div>Loading...</div>}><Youtube /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>} />
    </Routes>
  ), []);

  return (
    <BrowserRouter>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <Navigation setActiveNav={setActiveNav} />
      <div className="cursorFast" style={animationCursor} />
      <div className="cursorSecend" style={animationCursor} />
      {routes}
    </BrowserRouter>
  );
}

export default App;
