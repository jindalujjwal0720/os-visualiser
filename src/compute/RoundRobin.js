import { Process } from "../models/process.js";
import { AlgorithmState } from "../models/algorithm_state.js";
import { PriorityQueue } from "../models/priorityQueue.js";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers.js";

export const getRoundRobin_States = (processes, quantum = 3) => {
  let processMap = {};
  for (let x of processes) processMap[x.id] = x;

  let states = [];

  let timer = 0;
  let processcount = 0;

  // creating a priorityqueue to sort the processes on the basis of arrival time
  let pq = new PriorityQueue();
  for (let process of Object.values(processMap)) {
    pq.enqueue(process, process.arrivalTime);
    processcount++;
  }

  // pushing back the sorted queue in a array
  let parray = [];
  let maxBT = 0; // checking the max burst Time to generate a random quantum
  while (!pq.isEmpty()) {
    let process = pq.front().element;
    pq.dequeue();
    parray.push(process);
    maxBT = Math.max(maxBT, process.burstTime);
  }

  let tempcount = JSON.parse(JSON.stringify(processcount));
  let at = parray.at(0).arrivalTime;
  // waiting until the first arrival time appears
  while (timer < at) {
    let newMap = JSON.parse(JSON.stringify(processMap));
    states.push(
      new AlgorithmState({ time: timer, processes: newMap, running: null })
    );
    timer++;
  }

  let index = 0;
  while (tempcount > 0) {
    let process = parray[index];

    // if the process is completed
    if (process.executedTime === process.burstTime) {
      index = (index + 1) % processcount;
      continue;
    }
    let wt = timer - process.arrivalTime - process.executedTime,
      execTime = process.executedTime;

    // if the remaining burst time is less than or equal to quantum the finishing the process
    if (process.burstTime - process.executedTime <= quantum) {
      while (process.executedTime < process.burstTime) {
        process.executedTime = ++execTime;
        process.waitingTime = wt;
        processMap[process.id] = process;
        let newMap = JSON.parse(JSON.stringify(processMap));
        states.push(
          new AlgorithmState({
            time: timer,
            processes: newMap,
            running: process.id,
          })
        );
        timer++;
      }
      tempcount--;
      index = (index + 1) % processcount;
      continue;
    }

    // if the remaining burst time is greater than quantum then running the process within quantum limit
    if (process.burstTime - process.executedTime > quantum) {
      let i = 0;
      while (i < quantum) {
        process.executedTime = ++execTime;
        process.waitingTime = wt;
        processMap[process.id] = process;
        let newMap = JSON.parse(JSON.stringify(processMap));
        states.push(
          new AlgorithmState({
            time: timer,
            processes: newMap,
            running: process.id,
          })
        );
        timer++;
        i++;
      }
      index = (index + 1) % processcount;
      continue;
    }
  }

  return states;
};
