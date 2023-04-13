import { Process } from "../models/process.js";
import { AlgorithmState } from "../models/algorithm_state.js";
import { PriorityQueue } from "../models/priorityQueue.js";

export const getSJFP_States = (processes) => {
  let states = [];
  let processMap = {};
  let processCount = 0;
  for (let x of processes) {
    processMap[x.id] = x;
    processCount++;
  }

  let pq = new PriorityQueue();
  for (let process of processes) {
    pq.enqueue(process, process.arrivalTime);
  }

  // pushing back the sorted queue in a array
  let parray = [];
  while (!pq.isEmpty()) {
    let process = pq.front().element;
    pq.dequeue();
    parray.push(process);
  }

  let timer = 0;
  let tempCount = JSON.parse(JSON.stringify(processCount));
  let firstAT = parray[0].arrivalTime;

  // waiting until the first arrival time appears
  while (timer < firstAT) {
    timer++;
    let newMap = JSON.parse(JSON.stringify(processMap));
    states.push(
      new AlgorithmState({ time: timer, processes: newMap, running: null })
    );
  }

  while (tempCount > 0 && timer < 500) {
    let process = findSmallestBT(timer);
    if (process) {
      let WT = timer - process.arrivalTime - process.executedTime;
      process.executedTime++;
      process.waitingTime = WT;
      let newMap = JSON.parse(JSON.stringify(processMap));
      states.push(
        new AlgorithmState({
          time: timer,
          processes: newMap,
          running: process.id,
        })
      );
      if (process.executedTime === process.burstTime) {
        tempCount--;
      }
    } else {
      let newMap = JSON.parse(JSON.stringify(processMap));
      states.push(
        new AlgorithmState({
          time: timer,
          processes: newMap,
          running: null,
        })
      );
    }
    timer++;
  }

  function findSmallestBT(maxAT) {
    const temp = parray.filter(
      (e) => e.burstTime - e.executedTime > 0 && e.arrivalTime <= maxAT
    );
    let process = null,
      minBT = 1e9;
    for (let x of temp) {
      if (x.burstTime - x.executedTime < minBT) {
        process = x;
        minBT = x.burstTime - x.executedTime;
      }
    }
    return process;
  }
  return states;
};
