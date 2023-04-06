import { Process } from "../models/process.js";
import { AlgorithmState } from "../models/algorithm_state.js";
import { PriorityQueue } from "../models/priorityQueue.js";

export const getFCFS_States = (processes) => {
  // converting to map for easy and fast usage later
  let processMap = {};
  for (let x of processes) processMap[x.id] = x;

  // this will store the states every second
  let states = [];
  states.push(
    new AlgorithmState({
      time: 0,
      processes: JSON.parse(JSON.stringify(processMap)),
    })
  );

  let timer = 0;
  let pq = new PriorityQueue();
  for (let process of Object.values(processMap))
    pq.enqueue(process, process.arrivalTime);

  while (!pq.isEmpty()) {
    let process = pq.front().element;
    pq.dequeue();
    let bt = process.burstTime,
      at = process.arrivalTime;
    // increasing the timer until arrival time is reached
    while (timer < at) {
      // making a copy of the same state as the arrival time is not reached
      timer++;
      let newMap = JSON.parse(JSON.stringify(processMap));
      states.push(
        new AlgorithmState({ time: timer, processes: newMap, running: null })
      );
    }
    // finishing the task until it's burst time becomes 0
    let wt = timer - at,
      execTime = 0;
    while (bt > 0) {
      bt--;
      process.waitingTime = Math.min(wt, process.waitingTime);
      timer++;
      process.executedTime = ++execTime;
      processMap[process.id] = process;
      let newMap = JSON.parse(JSON.stringify(processMap));
      states.push(
        new AlgorithmState({
          time: timer,
          processes: newMap,
          running: process.id,
        })
      );
    }
  }
  let newMap = JSON.parse(JSON.stringify(processMap));
  states.push(
    new AlgorithmState({ time: timer - 1, processes: newMap, running: null })
  );

  return states;
};
