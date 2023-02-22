import React from "react";
import styles from "./processCard.module.css";

export default function ProcessCard({ progress, processID }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_wrapper}>
        <div
          className={styles.progress_indicator}
          style={{ width: `${progress * 100}%` }}
        ></div>
        <div className={styles.card}>
          Process&nbsp;<span>{processID}</span>
          <div className={styles.progress_value}>{progress * 100}%</div>
        </div>
      </div>
      
    </div>
  );
}
