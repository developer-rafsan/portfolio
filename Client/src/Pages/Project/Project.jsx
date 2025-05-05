import React, { useEffect, useState, useCallback, useMemo, Suspense } from "react";
import styles from "./project.module.css";
import { DataNotFound } from "../../Components/DataNotFound/DataNotFound";
import { getCategoryApi, getProjectApi } from "../../Services/allAPI";
import { Pagenation } from "../../Components/Pagenation/Pagenation";
const Card = React.lazy(() => import("../../Components/card/Card"));
const Loading = React.lazy(() => import("../../Components/Loading/Loading"));
import { Preloader } from "../../Components/preloader/Preloader";

export default function Project() {
  const [stor, setStor] = useState({ data: [], total: 0, limit: 10 });
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  // Fetch project data (memoized)
  const fetchProjectData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProjectApi(page, filterCategory, sort, search);
      setStor(response?.data || { data: [], total: 0, limit: 10 });
    } catch (e) {
      setStor({ data: [], total: 0, limit: 10 });
    } finally {
      setLoading(false);
    }
  }, [page, filterCategory, sort, search]);

  // Fetch category data (memoized)
  const fetchCategory = useCallback(async () => {
    try {
      const response = await getCategoryApi();
      setCategory(response?.data?.data || []);
    } catch (e) {
      setCategory([]);
    }
  }, []);

  // Debounce search input for optimization
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProjectData();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchProjectData, search]);

  // Fetch category on mount
  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  // Fetch project data on filterCategory or page change
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData, filterCategory, page, sort]);

  // Memoize active style
  const activeStyle = useMemo(
    () => ({
      background: "#FFF",
      color: "#000",
      fontWeight: "800",
    }),
    []
  );

  // Memoize category list for rendering
  const categoryList = useMemo(
    () => [
      { _id: "all", category: "All" },
      ...category.filter((cat) => cat.category !== "All"),
    ],
    [category]
  );

  // Memoize project cards
  const projectCards = useMemo(() => {
    if (!stor.data?.length) return <DataNotFound />;
    return stor.data.map((item, index) => (
      <Suspense key={item._id || index} fallback={null}>
        <Card {...item} />
      </Suspense>
    ));
  }, [stor.data]);

  return (
    <section id={styles.projectSection}>
      <Preloader text="project" />
      <div style={{ position: "relative" }} id="wrap">
        {/* filter bar */}
        <div className={styles.filter}>
          <ul>
            {categoryList.map((cat) => (
              <li
                key={cat._id}
                style={filterCategory === cat.category ? activeStyle : {}}
                onClick={() => {
                  setFilterCategory(cat.category);
                  setPage(1);
                }}
                tabIndex={0}
                aria-label={`Filter by ${cat.category}`}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setFilterCategory(cat.category);
                    setPage(1);
                  }
                }}
              >
                {cat.category.toUpperCase()}
              </li>
            ))}
          </ul>
          <div className={styles.scarch}>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search..."
              name="search"
              aria-label="Search projects"
              autoComplete="off"
            />
          </div>
        </div>

        <div className={styles.projectDisplay}>
          {loading ? (
            <Suspense fallback={null}>
              <Loading count={stor.limit || 10} />
            </Suspense>
          ) : (
            projectCards
          )}
        </div>

        {/* pagination */}
        <div className={styles.Pagenation}>
          <Pagenation {...stor} setPage={setPage} page={page} />
        </div>
      </div>
    </section>
  );
}
