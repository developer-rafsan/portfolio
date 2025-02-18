import React from "react";
import styles from "./pagenation.module.css";

export const Pagenation = ({ limit, total, setPage, page }) => {
  const pageCount = Math.ceil(total / limit);

  // pagenation active
  const activeStyle = {
    background: "var(--primaryColor)",
    color: "var(--primaryBackground)",
  };
  // pagnation section
  return (
    <div className={styles.Pagenation}>
      {pageCount > 1 &&
        Array(pageCount)
          .fill(null)
          ?.map((item, index) => (
            <button
              style={index + 1 === page ? activeStyle : {}}
              key={index}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
    </div>
  );
};
