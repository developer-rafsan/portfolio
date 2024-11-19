import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import styles from "./dashbord.module.css";
import { projectDeletetApi, projectGetApi } from "../../Services/apiCall";
import toast, { Toaster } from "react-hot-toast";
import { FaFilter } from "react-icons/fa6";
import { Pagenation } from "../Pagenation/Pagenation";

export const Dashbord = () => {
  const [stor, setStor] = useState();
  const [texting, settesting] = useState();
  const [search, serSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sort, setSort] = useState("ase");

  const fatchProjectData = async () => {
    const response = await projectGetApi(page, filterCategory, sort, search);
    if (response.status === 200) setStor(response.data);
  };

  const deleteHandeler = async (id) => {  
    const response = await projectDeletetApi(id);    
    if (response.status === 200) settesting(response.data);
    return toast.success("project delete success");
  };

  useEffect(() => {
    fatchProjectData();
  }, [texting, search, filterCategory, page]);

  return (
    <section id={styles.dashBord}>
      <div id="wrap" className={styles.content}>
        <h1>Admin Dashbord</h1>
        <div className={styles.filterSection}>
          <div className={styles.filter}>
            <button>
              <FaFilter /> Filter
            </button>
            <input
              onChange={(e) => serSearch(e.target.value)}
              placeholder="Search..."
              type="text"
            />
          </div>
          <Link to="create-project">
            <button className={styles.projectCreate}>create project</button>
          </Link>
        </div>

        {stor?.data.map((item) => (
          <div
            key={item._id}
            style={{
              cursor: "pointer",
              margin: "8px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              boxShadow:
                "1px 1px 5px rgba(0, 0, 0, 0.164), -1px -1px 5px rgba(0, 0, 0, 0.123)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                style={{
                  height: "40px",
                  width: "40px",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "10px",
                }}
                src={item.thumbnail ? item.thumbnail.url : item.image.url}
                alt="thumbnail"
              />
              <div
                style={{
                  fontSize: "1.7rem",
                  textTransform: "capitalize",
                  userSelect: "none",
                }}
              >
                {item.title.substring(0, 50)}
                {item.title.length > "50" && (
                  <span style={{ fontWeight: "bolder" }}>...</span>
                )}
              </div>
            </div>
            <div>
              <button
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  fontWeight: "100",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  margin: "0px",
                  background: "var(--secondaryColor)",
                  color: "var(--primaryBackground)",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => deleteHandeler(item._id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <Pagenation {...stor} setPage={setPage} page={page} />
      </div>

      <Toaster />
    </section>
  );
};
