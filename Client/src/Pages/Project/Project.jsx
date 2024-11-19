import { useEffect, useState } from "react";
import styles from "./project.module.css";
import { DataNotFound } from "../../Components/DataNotFound/DataNotFound";
import { Loading } from "../../Components/Loading/Loading";
import {
  downloadApi,
  getCategoryApi,
  getProjectApi,
} from "../../Services/allAPI";
import { Pagenation } from "../../Components/Pagenation/Pagenation";
import { BiAddToQueue } from "react-icons/bi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

export const Project = () => {
  const [stor, setStor] = useState();
  const [isShow, setShow] = useState(null);
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();

  // fatch project data
  const fatchProjectData = async () => {
    setLoading(true);
    const response = await getProjectApi(page, filterCategory, sort, search);
    setStor(response.data);
    setLoading(false);
  };

  // fatch category item
  const fatchCategory = async () => {
    const response = await getCategoryApi();
    setCategory(response.data.data);
  };

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

  useEffect(() => {
    fatchCategory();
    fatchProjectData();
  }, [search, filterCategory, page]);

  const activeStyle = {
    background: "var(--primaryColor)",
    color: "var(--primaryBackground)",
  };

  return (
    <section id={styles.projectSection}>
      <div id="wrap">
        {/* filter ber */}
        <div className={styles.filter}>
          <ul>
            <li
              style={filterCategory === "All" ? activeStyle : {}}
              onClick={() => {
                setFilterCategory("All");
              }}
            >
              all
            </li>
            {category?.map((category) => (
              <li
                style={filterCategory === category.category ? activeStyle : {}}
                onClick={() => {
                  setFilterCategory(category.category);
                }}
                key={category._id}
              >
                {category.category.toUpperCase()}
              </li>
            ))}
          </ul>
          <div className={styles.scarch}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              name="search"
            />
          </div>
        </div>

        <div className={styles.projectDisplay}>
          {loading ? (
            // loader section
            <Loading />
          ) : !stor.data?.length ? (
            <DataNotFound />
          ) : (
            // project section display
            stor.data?.map(
              ({ _id, image, thumbnail, title, git, liveview, file }) => (
                <div key={_id} className={styles.card}>
                  <img
                    src={thumbnail ? thumbnail.url : image.url}
                    alt={title}
                  />
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
                        <a
                          target="_blank"
                          href={liveview ? liveview : image.url}
                        >
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
                </div>
              )
            )
          )}
        </div>
        <Pagenation {...stor} setPage={setPage} page={page} />
      </div>
    </section>
  );
};