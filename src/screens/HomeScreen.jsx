import React, { useState } from "react";
import styles from "./homescreen.module.css";
import { Link } from "react-router-dom";
import { Process } from "../models/process";


export const HomeScreen = () => {
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [count, setCount] = useState(4);
  const [quantum, setQuantum] = useState(1e9);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1>OS Visualiser</h1>
        <h2>
          <span className={styles.h2span}>Algorithm: </span>
          <select
            className={styles.selectInput}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="FCFS" className={styles.selectInputOption}>
              FCFS
            </option>
            <option value="Priority P" className={styles.selectInputOption}>
              Priority Preemtive
            </option>
            <option value="Priority NP" className={styles.selectInputOption}>
              Priority Non-Preemtive
            </option>
            <option value="Round Robin" className={styles.selectInputOption}>
              Round Robin
            </option>
            <option value="SJFP" className={styles.selectInputOption}>
              Shortest Job First Preemtive
            </option>
            <option value="SJFNP" className={styles.selectInputOption}>
              Shortest Job First Non-Preemtive
            </option>
          </select>
        </h2>
        <h2>
          <label htmlFor="process-count">
            <span className={styles.h2span}>Process Count: </span>
          </label>
          <input
            className={styles.input}
            defaultValue={count}
            placeholder="Count of processes"
            onChange={(e) => setCount(e.target.value)}
            id="process-count"
          ></input>
        </h2>
        {algorithm === "Round Robin" && (
          <h2>
            <label htmlFor="quantum">
              <span className={styles.h2span}>Time Quantum: </span>
            </label>
            <input
              className={styles.input}
              defaultValue={3}
              placeholder="Time quantum"
              onChange={(e) => setQuantum(e.target.value)}
              id="quantum"
            ></input>
          </h2>
        )}



        <Link
          to="custominput"
          style={{textDecoration:"none"}}
          state={{
            algorithm: algorithm,
            count: count,
            quantum: quantum,
          }}
        >
          <div className={styles.button}>Enter Input</div>
        </Link>
        <Link
          to="/algo"
          style={{ textDecoration: "none" }}
          state={{
            algorithm: algorithm,
            count: count,
            quantum: quantum,
            inputProcesses: generateRandomProcesses(count)
          }}
        >
          <div className={styles.button}>Visualise Random</div>
        </Link>
        </div>

    </div>
  );
};

const generateRandomProcesses = (count) => {
  const processes = [];
  for (let i = 0; i < count; i++) {
    const process = new Process({
      id: i + 1,
      burstTime: Math.floor(Math.random() * 4 + 4), // random between 4 and 8
      arrivalTime: Math.floor(Math.random() * 10), // random between 0 and 10
      executedTime: 0,
      priority: Math.floor(Math.random() * 10), // random between 0 and 10
    });
    processes.push(process);
  }
  return JSON.parse(JSON.stringify(processes));
};