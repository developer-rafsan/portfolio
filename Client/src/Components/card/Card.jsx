import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import styles from "./card.module.css";
import { downloadApi } from "../../Services/allAPI";

export default function Card({ _id, image, thumbnail, title, git, liveview, file }) {
  // download file
  const downloadFile = async (id) => {
    console.log("clicked")
    const response = await downloadApi(id);
    const downloadUrl = response.data.downloadUrl;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = ""; // Optional: specify filename if needed

    // Append to body and trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className={styles.card}>
      {/* project thumbnail */}
      <img src={thumbnail ? thumbnail.url : image.url} alt={title} loading="lazy" />
      {/* project title */}
      <div className={styles.content}>
        <h1>{title ? title.substring(0, 50) : ""}</h1>
      </div>
      <div>
        {/* all button group */}
        <button>
          <BiAddToQueue />
        </button>
        <div>
          {/* code download button */}
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
          {/* live utton */}
          <button>
            <a target="_blank" href={liveview ? liveview : image.url}>
              <GrView />
            </a>
          </button>
          {/* github button */}
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

      {/* free code tag */}
      <div className={styles.offertag}>
        <h5>free source code</h5>
      </div>
    </div>
  );
};
