import React from "react";
import GanttTimeline from "./GanttTimeline";
import styles from "./ganttChart.module.css";

export default function GanttChart({ arr, count = 0, minLength = 0 }) {
  let convertedArr = convertToGanttMatrix(arr, count, minLength);
  return (
    <>
      <div className={styles.chart}>
        <div className={styles.left_panel}>
          <p key={1}>
            <strong>Gantt Chart</strong>
          </p>
          {convertedArr.map((arr, index) => (
            <p key={index}>Task {index + 1}</p>
          ))}
        </div>
        <div className={styles.timelines}>
          <GanttTimeline header max={Math.max(arr.length, minLength)} />
          {convertedArr.map((arr, index) => (
            <GanttTimeline key={index} arr={arr} />
          ))}
        </div>
      </div>
    </>
  );
}

const convertToGanttMatrix = (arr, count, minLength) => {
  if (typeof arr === "undefined" || arr === null || arr.length === 0) return [];
  let unique = [...new Set(arr)];
  let converted = [];
  for (let i = 0; i < (count || Math.max(...unique)); i++) {
    converted[i] = [];
    for (let j = 0; j < Math.max(arr.length, minLength); j++) {
      converted[i][j] = 0;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) continue;
    converted[arr[i] - 1][i] = arr[i];
  }
  return converted;
};
