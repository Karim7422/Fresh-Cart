import React from "react";
import styles from "../Spinner/Spinner.module.css";
export default function Spinner({ size = "full" }) {
  return (
    <div
      style={{
        width: size === "full" ? "100vw" : size,
        height: size === "full" ? "100vh" : size,
      }}
      className={styles.spinnerBox}
    >
      <span className={styles.loader}></span>
    </div>
  );
}
