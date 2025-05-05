import React, { useMemo } from "react";
import styles from "./loading.module.css";

const CardSkeleton = React.memo(() => (
  <div className={styles.cardSkliton}>
    <div className={styles.imageSkliton}></div>
    <div className={styles.contentSkliton}></div>
  </div>
));

export default function Loading({ count }) {
  // Memoize the skeletons for performance
  const skeletons = useMemo(
    () =>
      Array.from({ length: count }, (_, idx) => (
        <CardSkeleton key={idx} />
      )),
    [count]
  );

  return <>{skeletons}</>;
}
