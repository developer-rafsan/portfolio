import React, { useMemo, useCallback } from "react";
import styles from "./pagenation.module.css";

export const Pagenation = React.memo(({ limit, total, setPage, page }) => {
  const pageCount = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const handleSetPage = useCallback(
    (newPage) => {
      if (newPage !== page) setPage(newPage);
    },
    [setPage, page]
  );

  const activeStyle = useMemo(
    () => ({
      background: "var(--primaryColor)",
      color: "var(--primaryBackground)",
    }),
    []
  );

  const pageButtons = useMemo(() => {
    if (pageCount <= 1) return null;
    return Array.from({ length: pageCount }, (_, idx) => (
      <button
        style={idx + 1 === page ? activeStyle : undefined}
        key={idx}
        onClick={() => handleSetPage(idx + 1)}
        aria-current={idx + 1 === page ? "page" : undefined}
        tabIndex={0}
      >
        {idx + 1}
      </button>
    ));
  }, [pageCount, page, activeStyle, handleSetPage]);

  return <div className={styles.Pagenation}>{pageButtons}</div>;
});
