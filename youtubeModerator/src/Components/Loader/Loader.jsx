import React from "react";

import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
        <div className={styles.loaderSquare}></div>
      </div>
    </div>
  );
};

export default Loader;
