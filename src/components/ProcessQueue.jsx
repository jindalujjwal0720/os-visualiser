import React from "react";
import styles from "./processQueue.module.css";

export default function ProcessQueue({ title, children }) {
  return (
    <div className={styles.queue}>
      {title} Queue
      <div className={styles.queue_container}>{children}</div>
    </div>
  );
}
