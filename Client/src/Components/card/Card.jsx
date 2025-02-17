import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import styles from "./card.module.css";
import { downloadApi } from "../../Services/allAPI";

export const Card = ({ _id, image, thumbnail, title, git, liveview, file }) => {
  // download file
  const downloadFile = async (id) => {
    const response = await downloadApi(id);
    const aTag = document.createElement("a");
    aTag.href = response.config.url;
    aTag.setAttribute("download", "source-code");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <div className={styles.card}>
      <img src={thumbnail ? thumbnail.url : image.url} alt={title} loading="lazy" />
      <div className={styles.content}>
        <h1>{title ? title.substring(0, 50) : ""}</h1>
      </div>
      <div>
        <button>
          <BiAddToQueue />
        </button>
        <div>
          <button
            style={{
              opacity: !file ? 0.2 : "1",
              pointerEvents: !file ? "none" : "visible",
            }}
            onClick={() => downloadFile(_id)}
            title="source code"
          >
            <FaCloudDownloadAlt />
          </button>
          <button>
            <a target="_blank" href={liveview ? liveview : image.url}>
              <GrView />
            </a>
          </button>
          <button
            style={{
              opacity: !git ? 0.2 : "1",
              pointerEvents: !git ? "none" : "visible",
            }}
            title="gitHub"
          >
            <a target="_blank" href={git ? git : ""}>
              <FaGithub />
            </a>
          </button>
        </div>
      </div>
      <div className={styles.offertag}>
        <h5>free source code</h5>
      </div>
    </div>
  );
};
