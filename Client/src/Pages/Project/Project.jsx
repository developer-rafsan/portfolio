import { useEffect, useRef, useState } from "react";
import styles from "./project.module.css";
import { Link } from "react-router-dom";
import { DataNotFound } from "../../Components/DataNotFound/DataNotFound";
import { Loading } from "../../Components/Loading/Loading";
import { getCategoryApi, getProjectApi } from "../../Services/allAPI";
import { Pagenation } from "../../Components/Pagenation/Pagenation";


export const Project = () => {
  const [stor, setStor] = useState();
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("dsc");

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
                {category.category}
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
            stor.data?.map(({ _id, image, thumbnail, title, date }) => (
              <Link
                to={`/project/single-page/${_id}`}
                key={_id}
                className={styles.card}
              >
                <img
                  src={thumbnail ? thumbnail[0].url : image[0].url}
                  alt={title}
                />
                <div className={styles.content}>
                  <h1>{title ? title.substring(0, 40) : ""}</h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 10px",
                    }}
                  >
                    <p>{date}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <Pagenation {...stor} setPage={setPage} page={page} />
      </div>
    </section>
  );
};
