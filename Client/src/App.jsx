import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./Components/Header/Header";
import { Navigation } from "./Components/Navigation/Navigation";
import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Project } from "./Pages/Project/Project";
import { Youtube } from "./Pages/YoutubeVideo/Youtube";
import { ErrorPage } from "./Components/404/ErrorPage";

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
      <div className="cursorFast" style={animationCursor} />
      <div className="cursorSecend" style={animationCursor} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/youtube-video" element={<Youtube />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
