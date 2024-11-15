import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./errorPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.ErrorPage}>
      <img src="/assets/404-error.png" alt="404 error" />
      <button onClick={() => navigate("/")}>
        <FaArrowLeft />
        go back home page
      </button>
    </section>
  );
};
