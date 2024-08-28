import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./errorPage.module.css";

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.ErrorPage}>
      <img src="/assets/404-error.png" alt="404 error" />
      <button onClick={() => navigate("/")}>go back home page</button>
    </section>
  );
};
