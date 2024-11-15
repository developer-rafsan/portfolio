import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import locomotiveScroll from "locomotive-scroll";

import { Header } from "./Components/Header/Header";
import { Home } from "./Pages/Home/Home";
import { About } from "./Pages/About/About";
import { Experience } from "./Pages/Experience/Experience";
import { Portfolio } from "./Pages/Portfolio/Portfolio";
import { Project } from "./Pages/Project/Project";
import { SinglePage } from "./Components/SinglePage/SinglePage";
import { Youtube } from "./Pages/YoutubeVideo/Youtube";
import { Footer } from "./Components/Footer/Footer";
import { ErrorPage } from "./Components/404/ErrorPage";
import LocomotiveScroll from "locomotive-scroll";

// theme function inport
import { liteModeTheme } from "./THEME/lite.mode";
import { darkModeTheme } from "./THEME/dark.mode";

// gsap animation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function App() {
  // theme active state
  const [themeActive, setThemeActive] = useState(
    localStorage.getItem("THEME") || "DARK"
  );

  useEffect(() => {
    // theme acrive condition
    themeActive === "LITE" ? liteModeTheme() : darkModeTheme();

    const scroll = new LocomotiveScroll();
  }, []);

  // mouse cursore animation with gsap functionality
  useGSAP(() => {
    // move cursore function defind
    function cursoreMoveFunction(e) {
      gsap.to("#customCursor", {
        x: e.x - 10,
        y: e.y - 10,
      });
    }
    // move cursore function call
    window.addEventListener("mousemove",cursoreMoveFunction);
  });

  return (
    <BrowserRouter>
      {/*  custom cursor */}
      <div id="customCursor"></div>
      <Header themeActive={themeActive} setThemeActive={setThemeActive} />
      <Routes>
        {/* home route */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Portfolio />
              <Experience />
              <Footer />
            </>
          }
        />
        {/* project route */}
        <Route path="/project" element={<Project />} />
        {/* single page project route */}
        <Route path="/project/:id" element={<SinglePage />} />
        {/* youtube video route */}
        <Route path="/youtube-video" element={<Youtube />} />
        {/* error page route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
