import { useEffect, useState } from "react";
import styles from "./project.module.css";
import { DataNotFound } from "../../Components/DataNotFound/DataNotFound";
import { Loading } from "../../Components/Loading/Loading";
import { getCategoryApi, getProjectApi } from "../../Services/allAPI";
import { Pagenation } from "../../Components/Pagenation/Pagenation";
import { Card } from "../../Components/card/Card";
import { Preloader } from "../../Components/preloader/Preloader";

export default function Project() {
  const [stor, setStor] = useState();
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

  useEffect(() => {
    fatchCategory();
    fatchProjectData();
  }, [search, filterCategory, page]);

  const activeStyle = {
    background: "#FFF",
    color: "#000",
    fontWeight: "800",
  };

  return (
    <section id={styles.projectSection}>
      <Preloader text="project" />
      <div style={{ position: "relative" }} id="wrap">
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
            <Loading count={10} />
          ) : !stor.data?.length ? (
            <DataNotFound />
          ) : (
            // project section display
            stor.data?.map((item, index) => <Card key={index} {...item} />)
          )}
        </div>
        <div className={styles.Pagenation}>
          <Pagenation {...stor} setPage={setPage} page={page} />
        </div>
      </div>
    </section>
  );
}
