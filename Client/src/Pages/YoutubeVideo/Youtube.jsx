import React, { useEffect, useRef, useState } from "react";
import styles from "./youtube.module.css";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { Loading } from "../../Components/Loading/Loading";
import { getYoutubeApi } from "../../Services/allAPI";

export const Youtube = () => {
  const [videoData, setVideoData] = useState([]);
  const [videoShow, setvideoShow] = useState(false);
  const [videoActive, setvideoActive] = useState(null);
  const [isloading, setloading] = useState(false);

  // ******************************
  // get youtube data
  // ******************************
  const fetchYoutubeData = async () => {
    setloading(true);
    const response = await getYoutubeApi();
    setVideoData(response.data.items.reverse());
    setloading(false);
  };

  useEffect(() => {
    fetchYoutubeData();
  }, []);

  return (
    <section id={styles.youtube}>
      <h2>youtube video</h2>

      <div id="wrap" className={styles.videoDisplay}>
        {isloading ? (
          <Loading />
        ) : (
          videoData?.map((item, index) => (
            <div key={index} className={styles.item}>
              <img
                src={item.snippet.thumbnails.standard.url}
                alt="video image"
              />
              <div className={styles.hoverEffect}>
                <FaCirclePlay
                  onClick={() => {
                    setvideoShow(true);
                    setvideoActive(item.snippet.resourceId.videoId);
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {videoShow && (
        <div className={styles.videoPlayer}>
          <div className={styles.videoBox}>
            <iframe
              src={`https://www.youtube.com/embed/${videoActive}?autoplay=1`}
              title="YouTube video player"
            ></iframe>
            <button onClick={() => setvideoShow(false)}>
              <IoMdCloseCircle />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
