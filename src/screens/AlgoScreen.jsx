import React, { useEffect, useState } from "react";
import styles from "./algoscreen.module.css";
import { getFCFS_States } from "../compute/FCFS";
import { getPriorityNP_States } from "../compute/PriorityNP";
import { getPriorityP_States } from "../compute/PriorityP";
import { getRoundRobin_States } from "../compute/RoundRobin";
import { getSJFP_States } from "../compute/SJFP";
import { getSJFNP_States } from "../compute/SJFNP";
import { useLocation } from "react-router";
import { Process } from "../models/process";

export const AlgoScreen = () => {
  const location = useLocation();
  const algorithmName = location.state.algorithm;
  const quantum = location.state.quantum;
  const [states, setStates] = useState([]);
  const [stateIndex, setStateIndex] = useState(-1);
  const [processes, setProcesses] = useState([]);
  const [running, setRunning] = useState(null);
  const [avgWaitingTime, setAvgWaitingTime] = useState(null);
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState(null);
  const [rerun, setRerun] = useState(false);

  const toggleRun = () => setRerun((rerun) => !rerun);

  useEffect(() => {
  
    const randomProcesses =JSON.parse(JSON.stringify(location.state.inputProcesses))
    console.log(randomProcesses);
    let statesTemp;
    switch (location.state.algorithm) {
      case "FCFS":
        statesTemp = getFCFS_States(randomProcesses);
        break;
      case "Priority P":
        statesTemp = getPriorityP_States(randomProcesses);
        break;
      case "Priority NP":
        statesTemp = getPriorityNP_States(randomProcesses);
        break;
      case "Round Robin":
        statesTemp = getRoundRobin_States(randomProcesses, quantum);
        break;
      case "SJFP":
        statesTemp = getSJFP_States(randomProcesses);
        break;
      case "SJFNP":
        statesTemp = getSJFNP_States(randomProcesses);
        break;
    }

    setStates(statesTemp);
    setStateIndex(0);
    let timer = 0;
    const statesTimer = setInterval(() => {
      timer++;
      if (timer >= statesTemp.length) {
        clearInterval(statesTimer);
        console.log("Cleared Timer from statesTimer Function in AlgoScreen");
      } else {
        let processesTemp = Object.keys(statesTemp[timer].processes)
          .map((key) => statesTemp[timer].processes[key])
          .sort((a, b) => a.id - b.id);
        setStateIndex(timer);
        setProcesses(processesTemp);
        setRunning(statesTemp[timer].running);

        // calculation of AWT
        let awt = 0;
        processesTemp.forEach((element) => {
          if (element.waitingTime < 1e5) awt += element.waitingTime;
        });
        awt /= processesTemp.length;
        setAvgWaitingTime(awt);

        // calculation of ATT
        let att = 0;
        processesTemp.forEach((element) => {
          if (element.waitingTime < 1e5)
            att += element.waitingTime + element.burstTime;
        });
        att /= processesTemp.length;
        setAvgTurnaroundTime(att);
      }
    }, 1000);

    return () => {
      clearInterval(statesTimer);
      console.log("Cleared Timer from AlgoScreen useEffect Hook");
    };
  }, [rerun]);

  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.leftTopCont}>
            <div className={styles.leftTop}>
              <h2>
                <span className={styles.h2span}>Algorithm: </span>
                {algorithmName} CPU Scheduling
              </h2>
              <h2>
                <span className={styles.h2span}>CPU: </span>
                {typeof running === "undefined" || running == null ? (
                  <style style={{ display: "inline", color: "#f83344" }}>
                    IDLE
                  </style>
                ) : (
                  <style style={{ display: "inline", color: "#24d624" }}>
                    P{running}
                  </style>
                )}
              </h2>
              <h2>
                <span className={styles.h2span}>Timer: </span>
                {stateIndex} s
              </h2>
            </div>
          </div>
          <div className={styles.leftCenter + ` ${styles.blur}`}>
            <h2>
              <span className={styles.h2span}>Average Waiting Time: </span>
              {avgWaitingTime && avgWaitingTime.toPrecision(6)} s
            </h2>
            <h2>
              <span className={styles.h2span}>Average Turn-around Time: </span>
              {avgTurnaroundTime && avgTurnaroundTime.toPrecision(6)} s
            </h2>
          </div>
          <div className={styles.leftBottom}>
            (Something can come here also)
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.table + ` ${styles.blur}`}>
            <div className={styles.column}>
              <h3>PID</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(({ id }, index) => (
                    <div key={index} className={styles.tableCell}>
                      {id}
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.column}>
              <h3>AT</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(({ arrivalTime: at }, index) => (
                    <div key={index} className={styles.tableCell}>
                      {at > 0 ? `${at} s` : at}
                    </div>
                  ))}
              </div>
            </div>
            {algorithmName === "Priority NP" ||
            algorithmName === "Priority P" ? (
              <div className={styles.column}>
                <h3>Priority</h3>
                <div className={styles.columnContent}>
                  {processes &&
                    processes.map(({ priority: p }, index) => (
                      <div key={index} className={styles.tableCell}>
                        {p}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={styles.column}>
              <h3 style={{ margin: "auto" }}>Status Bar</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(
                    ({ executedTime: et, burstTime: bt }, index) => (
                      <div key={index} className={styles.tableCell}>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${(et / bt) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className={styles.column}>
              <h3>Remaining BT</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(
                    ({ burstTime: bt, executedTime: et }, index) => (
                      <div key={index} className={styles.tableCell}>
                        {bt - et <= 0 ? bt - et : `${bt - et} s`}
                      </div>
                    )
                  )}
              </div>
            </div>
            <div className={styles.column}>
              <h3>WT</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(({ waitingTime: wt }, index) => (
                    <div key={index} className={styles.tableCell}>
                      {wt === 0 ? wt : wt > 1e5 || wt < 0 ? `-` : `${wt} s`}
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.column}>
              <h3>CT</h3>
              <div className={styles.columnContent}>
                {processes &&
                  processes.map(
                    (
                      { waitingTime: wt, arrivalTime: at, executedTime: et },
                      index
                    ) => (
                      <div key={index} className={styles.tableCell}>
                        {wt > 1e5 ? `-` : `${at + et + wt} s`}
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <button className={styles.resetButton} onClick={() => toggleRun()}>
            Reset and Restart
          </button>
        </div>
      </div>
    </div>
  );
};
