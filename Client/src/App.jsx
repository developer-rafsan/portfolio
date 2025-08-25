import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Header } from "./Components/Header/Header";
import { Navigation } from "./Components/Navigation/Navigation";
import Spinner from "./Spinner";

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
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);


  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
      <Route path="/" element={<Suspense fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}><Home /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}><About /></Suspense>} />
      <Route path="/project" element={<Suspense fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}><Project /></Suspense>} />
      <Route path="/youtube-video" element={<Suspense fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}><Youtube /></Suspense>} />
      <Route path="*" element={<Suspense fallback={<Spinner size={30} color="red-500" bg="bg-gray-100" />}><ErrorPage /></Suspense>} />
    </Routes>
  ), []);

  return (
    <BrowserRouter>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <Navigation setActiveNav={setActiveNav} />
      {/* Only show custom cursors on desktop */}
      {isDesktop && (
        <>
          <div className="cursorFast" style={animationCursor} />
          <div className="cursorSecend" style={animationCursor} />
        </>
      )}
      {routes}
    </BrowserRouter>
  );
}

export default App;
