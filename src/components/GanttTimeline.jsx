import React from "react";
import styles from "./ganttTimeline.module.css";

export default function GanttTimeline({ arr, header, max = 10 }) {
  let compressedArr = compressArr(arr);
  if (header) {
    for (let i = 0; i < max; i++) compressedArr.push(0);
  }
  return header ? (
    <div className={styles.timeline}>
      {compressedArr.map((x, index) => (
        <div key={index} className={styles.box + " " + styles.header}>
          {index + 1}
        </div>
      ))}
    </div>
  ) : (
    <div className={styles.timeline}>
      {compressedArr.map((x, index) =>
        x !== 0 ? (
          <div
            key={index}
            className={styles.box}
            style={{
              background: "linear-gradient(90deg, #189a30 20%, #6aab00 100%)",
              width: `${20 * x}px`,
            }}
          ></div>
        ) : (
          <div key={index} className={styles.box}></div>
        )
      )}
    </div>
  );
}

const compressArr = (arr) => {
  if (typeof arr === "undefined" || arr === null) return [];
  if (arr.length === 0) return [];
  let compressedArr = [];
  let cnt = 0,
    prev = arr[0];
  for (let x of arr) {
    if (x === prev) {
      cnt++;
    } else {
      if (prev === 0) {
        for (let i = 0; i < cnt; i++) compressedArr.push(0);
      } else {
        compressedArr.push(cnt);
      }
      prev = x;
      cnt = 1;
    }
  }
  if (prev === 0) {
    for (let i = 0; i < cnt; i++) compressedArr.push(0);
  } else {
    compressedArr.push(cnt);
  }
  return compressedArr;
};
