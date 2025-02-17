import React from "react";
import styles from "./loading.module.css";

export const Loading = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map(() => (
          <div className={styles.cardSkliton}>
            <div className={styles.imageSkliton}></div>
            <div className={styles.contentSkliton}></div>
          </div>
        ))}
    </>
  );
};
