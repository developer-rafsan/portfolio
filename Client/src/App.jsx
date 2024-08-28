import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

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

// theme call
import { liteModeTheme } from "./THEME/lite.mode";
import { darkModeTheme } from "./THEME/dark.mode";

// gsap animation
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function App() {
  // preloader option start
  const [activePreloader, srtPreloader] = useState(true);
  const preloading = document.querySelector("#preloading");
  if (preloading) {
    setTimeout(() => {
      preloading.style.display = "none";
      srtPreloader(false);
    }, 3000);
  }
  // preloader option end

  // theme active state
  const [themeActive, setThemeActive] = useState(
    localStorage.getItem("THEME") || "DARK"
  );

  useEffect(() => {
    // theme call
    themeActive === "LITE" ? liteModeTheme() : darkModeTheme();
  }, []);

  useGSAP(() => {
    window.addEventListener("mousemove", (e) => {
      gsap.to("#customCursor", {
        x: e.x - 10,
        y: e.y - 10,
      });
    });
  });

  return (
    !activePreloader && (
      <BrowserRouter>
        {/*  custom cursor */}
        <div id="customCursor"></div>
        <Header themeActive={themeActive} setThemeActive={setThemeActive} />
        <Routes>
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

          <Route path="/project" element={<Project />} />
          <Route path="/project/single-page/:id" element={<SinglePage />} />

          <Route path="/youtube-video" element={<Youtube />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
