import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { Navigation } from "./Components/Navigation/Navigation";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const About = React.lazy(() => import("./Pages/About/About"));
const Project = React.lazy(() => import("./Pages/Project/Project"));
const Youtube = React.lazy(() => import("./Pages/YoutubeVideo/Youtube"));
const ErrorPage = React.lazy(() => import("./Components/404/ErrorPage"));

// theme function inport
import { liteModeTheme } from "./THEME/lite.mode";
import { darkModeTheme } from "./THEME/dark.mode";

function App() {
  // theme active state
  const [themeActive, setThemeActive] = useState(
    localStorage.getItem("THEME") || "DARK"
  );

  const [activeNav, setActiveNav] = useState(false);

  // cursor state
  const [cursorPosetion, setCursorPosetion] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // theme acrive condition
    themeActive === "LITE" ? liteModeTheme() : darkModeTheme();

    // cursor animation function
    const mouseMoveFun = (e) => {
      setCursorPosetion({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMoveFun);

    return () => {
      window.removeEventListener("mousemove", mouseMoveFun);
    };
  }, []);

  // cursor animation style
  const animationCursor = {
    backgroundColor: "#FFF",
    mixBlendMode: "difference",
    transform: `translateX(${cursorPosetion.x - 25}px) translateY(${
      cursorPosetion.y - 25
    }px)`,
  };

  return (
    <BrowserRouter>
      <Header activeNav={activeNav} setActiveNav={setActiveNav} />
      <Navigation setActiveNav={setActiveNav} />
      {/* cursor animation */}
      <div className="cursorFast" style={animationCursor} />
      <div className="cursorSecend" style={animationCursor} />
      <Routes>
        <Route path="/" element={<Suspense><Home /></Suspense>} />
        <Route path="/about" element={<Suspense><About /></Suspense>} />
        <Route path="/project" element={<Suspense><Project /></Suspense>} />
        <Route path="/youtube-video" element={<Suspense><Youtube /></Suspense>} />
        <Route path="*" element={<Suspense><ErrorPage /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
