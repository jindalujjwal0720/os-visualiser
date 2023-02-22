import React, { useEffect, useState } from "react";
import { Process } from "../models/process";
import GanttChart from "./GanttChart";
import ProcessCard from "./ProcessCard";
import ProcessQueue from "./ProcessQueue";

export default function FCFS() {
  const [gantt, setGantt] = useState([]);
  const [count, setCount] = useState(0); // count is like running time (1s, 2s, 3s, 4s, ...)
  const [queue, setQueue] = useState([]);
  const [executedTime, setExecutedTime] = useState(Array(50).fill(0));

  let processes = [
    new Process({
      id: 1,
      burstTime: 4,
      arrivalTime: 0,
      executedTime: 0,
    }),
    new Process({
      id: 2,
      burstTime: 3,
      arrivalTime: 5,
      executedTime: 0,
    }),
    new Process({
      id: 3,
      burstTime: 5,
      arrivalTime: 2,
      executedTime: 0,
    }),
    new Process({
      id: 4,
      burstTime: 5,
      arrivalTime: 2,
      executedTime: 0,
    }),
  ];

  // useEffect for initial load
  useEffect(() => {
    processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    setQueue([...processes]);
    let temp = [...gantt],
      prevEnd = 0;
    // generating the Gantt Chart for FCFS
    let tempExecuted = executedTime;
    for (let process of processes) {
      for (let i = prevEnd; i < process.arrivalTime; i++) temp.push(0);
      for (let i = 0; i < process.burstTime; i++) temp.push(process.id);
      prevEnd = temp.length;
      tempExecuted[process.id] = process.executedTime;
    }
    setExecutedTime([...tempExecuted]);
    setGantt(temp);
  }, []);

  // useEffect for whenever the gantt array changes
  useEffect(() => {
    for (let i = count; i <= gantt.length; i++) {
      var timer = setTimeout(() => {
        setCount(i);
        let temp = executedTime;
        temp[gantt[i]]++;
        setExecutedTime([...temp]);
      }, (i - count) * 1000);
    }
    clearTimeout(timer);
    console.log(gantt);
  }, [gantt]);

  const addProcess = (e) => {
    e.preventDefault();
    let temp = gantt;
    let len = Math.floor(Math.random() * 3 + 3),
      process = Math.floor(Math.random() + [...new Set(gantt)].length + 1);
    for (let i = 1; i <= len; i++) {
      temp.push(process);
    }
    setQueue([
      ...queue,
      {
        id: process,
        arrivalTime: count,
        burstTime: len,
        executedTime: 0,
      },
    ]);
    setGantt([...temp]);
    // for random error prevention
    let tempExecuted = executedTime;
    tempExecuted[gantt[count]]--;
    setExecutedTime([...tempExecuted]);
  };

  return (
    <div>
      FCFS <button onClick={addProcess}>Random button</button>
      <ProcessQueue title="Completed">
        {queue
          .filter((process) => process.burstTime === executedTime[process.id])
          .map((process, index) => (
            <ProcessCard
              key={index}
              progress={executedTime[process.id] / process.burstTime ?? 0}
              processID={process.id}
            />
          ))}
      </ProcessQueue>
      <ProcessQueue title="Running">
        {queue
          .filter((process) => process.burstTime !== executedTime[process.id])
          .map((process, index) => (
            <ProcessCard
              key={index}
              progress={(
                executedTime[process.id] / process.burstTime ?? 0
              ).toPrecision(2)}
              processID={process.id}
            />
          ))}
      </ProcessQueue>
      <GanttChart arr={gantt.slice(0, count + 1)} />
    </div>
  );
}
