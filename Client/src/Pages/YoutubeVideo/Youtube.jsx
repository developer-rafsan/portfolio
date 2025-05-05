import React, { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./youtube.module.css";
import { FaCirclePlay } from "react-icons/fa6";
import Loading from "../../Components/Loading/Loading";
import { getYoutubeApi } from "../../Services/allAPI";
import { BiX } from "react-icons/bi";
import { Pagenation } from "../../Components/Pagenation/Pagenation";
import { Preloader } from "../../Components/preloader/Preloader";

export default function Youtube() {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [liteBoxActive, setLiteBoxActive] = useState(false);
  const [videoActive, setVideoActive] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const videoPerPage = 8;

  // Fetch YouTube data API
  const fetchYoutubeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getYoutubeApi();
      // Defensive: check for response and items
      const items = response?.data?.items || [];
      // Reverse only if items exist and are array
      setVideoData([...items].reverse());
    } catch (e) {
      setVideoData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYoutubeData();
  }, [fetchYoutubeData]);

  // Memoize current video slice for performance
  const currentVideo = useMemo(() => {
    const indexOfLastVideo = currentPage * videoPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videoPerPage;
    return videoData.slice(indexOfFirstVideo, indexOfLastVideo);
  }, [videoData, currentPage, videoPerPage]);

  // Handlers
  const handlePlay = useCallback((videoId) => {
    setLiteBoxActive(true);
    setVideoActive(videoId);
  }, []);

  const handleClose = useCallback(() => {
    setLiteBoxActive(false);
    setVideoActive(null);
  }, []);

  return (
    <section id={styles.youtube}>
      <Preloader text="youtube" />
      <div id="wrap">
        <h2>
          youtube <br /> video -
        </h2>

        <div className={styles.videoDisplay}>
          {isLoading ? (
            <Loading count={videoPerPage} />
          ) : (
            currentVideo.map((item) => {
              const videoId = item?.snippet?.resourceId?.videoId;
              const thumbnail =
                item?.snippet?.thumbnails?.standard?.url ||
                item?.snippet?.thumbnails?.high?.url ||
                item?.snippet?.thumbnails?.default?.url ||
                "";
              return (
                <div key={videoId} className={styles.item}>
                  <img
                    src={thumbnail}
                    alt={item?.snippet?.title || "video image"}
                    loading="lazy"
                  />
                  <div className={styles.hoverEffect}>
                    <FaCirclePlay
                      tabIndex={0}
                      aria-label="Play video"
                      onClick={() => handlePlay(videoId)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") handlePlay(videoId);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            })
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

      {liteBoxActive && videoActive && (
        <div className={styles.videoPlayer}>
          <iframe
            src={`https://www.youtube.com/embed/${videoActive}?autoplay=1`}
            title="YouTube video player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <button
            onClick={handleClose}
            aria-label="Close video"
            className={styles.closeBtn}
          >
            <BiX />
          </button>
        </div>
      )}
    </section>
  );
}
