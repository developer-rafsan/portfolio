import React, { useEffect, useState } from "react";
import styles from "./youtube.module.css";
import { FaCirclePlay } from "react-icons/fa6";
import { Loading } from "../../Components/Loading/Loading";
import { getYoutubeApi } from "../../Services/allAPI";
import { BiX } from "react-icons/bi";
import { Pagenation } from "../../Components/Pagenation/Pagenation";
import { Preloader } from "../../Components/preloader/Preloader";

export default function Youtube() {
  const [videoData, setVideoData] = useState([]);
  const [isloading, setloading] = useState(false);
  const [liteBoxActive, setliteBoxActive] = useState(false);
  const [videoActive, setvideoActive] = useState(null);

  // pagenation state
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPerPage, setVideoPerPage] = useState(8);

  // fatch youtube data api
  const fetchYoutubeData = async () => {
    setloading(true);
    const response = await getYoutubeApi();
    setVideoData(response.data.items.reverse());
    setloading(false);
  };

  useEffect(() => {
    fetchYoutubeData();
  }, []);

  // pagenation get current video show
  const indexOfLastVideo = currentPage * videoPerPage;
  const indexOFFastVideo = indexOfLastVideo - videoPerPage;
  const currentVideo = videoData?.slice(indexOFFastVideo, indexOfLastVideo);

  return (
    <section id={styles.youtube}>
      <Preloader text="youtube" />
      <div id="wrap">
        <h2>
          youtube <br /> video -
        </h2>

        <div className={styles.videoDisplay}>
          {isloading ? (
            <Loading count={8} />
          ) : (
            currentVideo?.map((item, index) => (
              <div key={index} className={styles.item}>
                <img
                  src={item?.snippet?.thumbnails?.standard?.url}
                  alt="video image"
                />
                <div className={styles.hoverEffect}>
                  <FaCirclePlay
                    onClick={() => {
                      setliteBoxActive(true);
                      setvideoActive(item.snippet.resourceId.videoId);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.Pagenation}>
          <Pagenation
            limit={videoPerPage}
            total={videoData.length}
            setPage={setCurrentPage}
            page={currentPage}
          />
        </div>
      </div>

      {liteBoxActive && (
        <div className={styles.videoPlayer}>
          <iframe
            src={`https://www.youtube.com/embed/${videoActive}?autoplay=1`}
            title="YouTube video player"
          ></iframe>
          <button onClick={() => setliteBoxActive(false)}>
            <BiX />
          </button>
        </div>
      )}
    </section>
  );
}
