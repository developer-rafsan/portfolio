import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { IoArrowForward } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import PORTFOLIODATA from "./PORTFOLIODATA";
import { Preloader } from "../../Components/preloader/Preloader";

export default function Home() {
  const [isPlay, setPlay] = useState(false);

  const playVideo = (e) => {
    !isPlay ? e.target.play() : e.target.pause();
    setPlay(!isPlay);
  };

  return (
    <section id={styles.homePage}>
      {/* preloader section */}
      <Preloader text="home" />
      <div id="wrap" className={styles.homeSection}>
        {/* hero section */}
        <ul>
          <li>wordpress</li>
          <li>mern stack</li>
          <li>Elementor</li>
          <li>Node.js</li>
        </ul>
        <h4>WordPress expart mern stack web application developer</h4>
        <div className={styles.linkGroup}>
          <Link to="/project">Project</Link>
          <span>-</span>
          <Link to="/about">about me</Link>
        </div>

        {/* portfolio section */}
        <div className={styles.Portfolio}>
          <h1>
            my <br /> Portfolio -
          </h1>

          <div className={styles.itemGroup}>
            {PORTFOLIODATA?.map((item) => (
              // portfolio card
              <div key={item.id}>
                <div className={styles.item}>
                  {/* image card */}
                  {item.type === "image" && (
                    <img
                      src={item?.imaURL}
                      alt="portfolio image"
                      loading="lazy"
                    />
                  )}

                  {/* video card */}
                  {item.type === "video" && (
                    <video onClick={(e) => playVideo(e)}>
                      <source src={item?.imaURL} type="video/mp4" />
                    </video>
                  )}

                  {/* video play button */}
                  {item.type === "video" &&
                    (!isPlay ? (
                      <FaRegCirclePlay className={styles.playVideoIcons} />
                    ) : (
                      <FaRegCirclePause className={styles.pauseVideoIcons} />
                    ))}
                </div>
                <div className={styles.portfolioButtom}>
                  <button>
                    <a target="_Blank" href={item.imaURL}>
                      view more <IoArrowForward />
                    </a>
                  </button>
                  <h3>{item.titel}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* find me section */}
          <h1>
            find <br /> me -
          </h1>

          <div className={styles.findSection}>
            <div className={styles.item}>
              <a
                target="_blank"
                href="https://github.com/developer-rafsan"
                className={styles.content}
              >
                <FaGithub />
                <div>
                  <h5>github</h5>
                  <p>/developer-rafsan</p>
                </div>
              </a>
            </div>
            <div className={styles.item}>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/jahid-islam-rafsan/"
                className={styles.content}
              >
                <FaLinkedin />
                <div>
                  <h5>linkedin</h5>
                  <p>/jahid-islam-rafsan</p>
                </div>
              </a>
            </div>
            <div className={styles.item}>
              <a
                href="https://www.youtube.com/@jahidislamrafsan"
                target="_blank"
                className={styles.content}
              >
                <FaYoutube />
                <div>
                  <h5>Youtube</h5>
                  <p>/jahidislamrafsan</p>
                </div>
              </a>
            </div>
            <div className={styles.item}>
              <a
                href="https://www.facebook.com/developer.rafsan.page"
                className={styles.content}
              >
                <FaFacebook />
                <div>
                  <h5>facebook page</h5>
                  <p>/developer.rafsan</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* collaborate section */}
        <div className={styles.collaborate}>
          <p>Need a developer ?</p>
          <a target="_blank" href="https://www.fiverr.com/rafsan954">
            Let's Collaborate <FaArrowRight />
          </a>
        </div>

        {/* footer section */}
        <footer>
          <h1>Say Hello</h1>
          <div className={styles.content}>
            <div>
              <a target="_blank" href="https://wa.me/01966445521">
                +880 1966445521
              </a>
              <a target="_blank" href="mailto:developer.rafsanx@gmail.com">
                developer.rafsan@gmail.com
              </a>
            </div>

            <div>
              <Link to="/about">About</Link>
              <Link to="/project">Gat into Touch</Link>
            </div>
          </div>
          <p>&copy; Jahid Islam Rafsan || 2024</p>
        </footer>
      </div>
    </section>
  );
}
