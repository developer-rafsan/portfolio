import React from "react";
import styles from "./loading.module.css";

export default function Loading({ count }) {
  return (
    <>
    {/* loading section */}
      {Array(count)
        .fill(null)
        .map(() => (
          <div className={styles.cardSkliton}>
            <div className={styles.imageSkliton}></div>
            <div className={styles.contentSkliton}></div>
          </div>
        ))}
    </>
  );
};
