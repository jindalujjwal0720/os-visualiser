import { Process } from "../models/process.js";
import { AlgorithmState } from "../models/algorithm_state.js";
import { PriorityQueue } from "../models/priorityQueue.js";

export const getPriorityP_States = (processes) => {
  // converting to map for easy and fast usage later
  let processMap = {};
  for (let x of processes) processMap[x.id] = x;

  // this will store the states every second
  let states = [];

  let timer = 0;
  let pq = new PriorityQueue();

  // write algorithm here
  while (!areAllExecuted(processMap)) {
    // every time we will be inserting all non executed processes inside the pq
    // with arrival time less than or equal to timer
    for (let process of Object.values(processMap)) {
      if (
        process.burstTime !== process.executedTime &&
        process.arrivalTime <= timer &&
        !pq.contains(process)
      ) {
        pq.enqueue(process, process.priority);
      }
    }
    if (pq.isEmpty()) {
      // No processes to run
      states.push(
        new AlgorithmState({
          time: timer,
          processes: Copy(processMap),
          running: null,
        })
      );
    } else {
      // there are some processes
      // run the highest priority process
      let process = pq.front().element;
      pq.dequeue();
      let bt = process.burstTime,
        at = process.arrivalTime;
      // finishing the task until it's burst time becomes 0
      let execTime = process.executedTime;
      bt--;
      process.executedTime = ++execTime;
      process.completionTime = Math.max(process.completionTime, timer);
      // wt = tat - bt = (ct - at) - bt
      // increasing wt for all other processes
      for (let id of Object.keys(processMap)) {
        if (
          processMap[id].burstTime !== processMap[id].executedTime &&
          process.arrivalTime <= timer
        ) {
          processMap[id].waitingTime =
            timer +
            1 -
            processMap[id].arrivalTime -
            processMap[id].executedTime;
        }
      }
      processMap[process.id] = process;
      states.push(
        new AlgorithmState({
          time: timer,
          processes: Copy(processMap),
          running: process.id,
        })
      );
    }
    timer++;
  }
  states.push(
    new AlgorithmState({
      time: timer,
      processes: Copy(processMap),
      running: null,
    })
  );
  return states;
};

const areAllExecuted = (processMap) => {
  for (let [key, value] of Object.entries(processMap)) {
    if (value.burstTime !== value.executedTime) return false;
  }
  return true;
};

// gets the minimum arrival time from the non executed ones
const getMinArrivalTime = (processMap) => {
  let minAT = 1e9;
  for (let [key, value] of Object.entries(processMap)) {
    if (value.burstTime !== value.executedTime) {
      minAT = Math.min(minAT, value.arrivalTime);
    }
  }
  return minAT;
};

const Copy = (object) => {
  return JSON.parse(JSON.stringify(object));
};
