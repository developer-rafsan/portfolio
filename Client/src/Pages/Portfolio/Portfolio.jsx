import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PORTFOLIODATA } from "./PORTFOLIODATA.js";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { IoArrowForward } from "react-icons/io5";

export const Portfolio = () => {
  const [isPlay, setPlay] = useState(false);
  const playVideo = (e) => {
    !isPlay ? e.target.play() : e.target.pause();
    setPlay(!isPlay);
  };
  return (
    <section id={styles.portfolio}>
      <div id="wrap">
        <h2>Featured projects</h2>
        <div className={styles.itemGroup}>
          {PORTFOLIODATA?.map((item) => (
            <div key={item.id}>
              <div className={styles.item}>
                {item.type === "image" && (
                  <img src={item.imaURL} alt="portfolio image" />
                )}

                {item.type === "video" &&
                  (!isPlay ? <FaRegCirclePlay className={styles.playVideoIcons} /> : <FaRegCirclePause className={styles.pauseVideoIcons} />)}
                {item.type === "video" && (
                  <video onClick={(e) => playVideo(e)}>
                    <source src={item.imaURL} type="video/mp4" />
                  </video>
                )}
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
      </div>
    </section>
  );
};
