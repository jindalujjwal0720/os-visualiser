import React, { useEffect, useState } from "react";
import { Process } from "../models/process";
import { PriorityQueue } from "../models/priorityQueue.js";
import GanttChart from "./GanttChart";
import ProcessCard from "./ProcessCard";
import ProcessQueue from "./ProcessQueue";

export default function CombinedAlgo() {
  const [gantt, setGantt] = useState([]);
  const [count, setCount] = useState(0); // count is like running time (1s, 2s, 3s, 4s, ...)
  const [processes, setProcesses] = useState([
    new Process({
      id: 1,
      burstTime: 4,
      arrivalTime: 0,
      executedTime: 0,
      priority: 1,
    }),
    new Process({
      id: 2,
      burstTime: 3,
      arrivalTime: 0,
      executedTime: 0,
      priority: 1,
    }),
    new Process({
      id: 3,
      burstTime: 5,
      arrivalTime: 0,
      executedTime: 0,
      priority: 1,
    }),
    new Process({
      id: 4,
      burstTime: 5,
      arrivalTime: 0,
      executedTime: 0,
      priority: 1,
    }),
  ]);
  const timeQuanta = 2;

  const calculateInitialGanttChart = () => {
    let pq = new PriorityQueue();
    let executedTime = {};
    // this priority should be changed to change the algorithm
    let tempGantt = [],
      tempProcesses = [...processes];
    tempProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let c = 0;
    // console.log(pq);
    // console.log(tempProcesses);
    while (tempProcesses.length > 0 && c < 100) {
      //   console.log(executedTime);
      // emqueing all the processes upto this time
      for (let process of tempProcesses) {
        if (
          (process.arrivalTime <= c ||
            executedTime[process.id] < process.burstTime) &&
          !pq.contains(process)
        )
          pq.enqueue(process, process.priority);
      }
      console.log(pq.items.map((item) => item.element.id));
      console.log(c);
      c += 1;
      if (pq.isEmpty()) {
        tempGantt.push(0);
        continue;
      }
      let current = pq.dequeue().element;
      //   console.log(current);
      //   console.log(c);
      let execution;
      if (current.id in executedTime) execution = executedTime[current.id];
      else execution = 0;
      if (current.burstTime - execution <= timeQuanta) {
        executedTime[current.id] = current.burstTime;
        // removing the process from the list of remaining processes
        tempProcesses = tempProcesses.filter(
          (process) => process.id !== current.id
        );
      } else {
        executedTime[current.id] = execution + timeQuanta;
        pq.enqueue(current, current.priority);
      }
      for (
        let i = 0;
        i < Math.min(current.burstTime - execution, timeQuanta);
        i++
      ) {
        tempGantt.push(current.id);
        c += 1;
      }
      c -= 1;
    }
    // console.log(tempGantt);
    console.log(c);
    return tempGantt;
  };

  // called when the component will render for the first time
  useEffect(() => {
    console.log("Render Called");
    let tempGantt = calculateInitialGanttChart();
    setGantt([...tempGantt]);
    setCount(tempGantt.length);
    // console.log(processes);
    return () => console.log("Cleanup Called");
  }, [processes]);

  const addProcess = (e) => {
    e.preventDefault();
    let newProcess = new Process({
      id: processes.length + 1,
      burstTime: Math.floor(Math.random() * 6 + 2),
      arrivalTime: Math.floor(Math.random() * 6 + count),
      executedTime: 0,
      priority: Math.floor(Math.random() * 10),
    });
    console.log(newProcess);
    setProcesses([...processes, newProcess]);
  };

  return (
    <div>
      Combined Algo
      <button onClick={(e) => addProcess(e)}>Random button</button>
      <GanttChart arr={gantt.slice(0, count + 1)} />
    </div>
  );
}
