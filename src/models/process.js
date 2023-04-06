export class Process {
  constructor({
    id,
    burstTime,
    arrivalTime,
    waitingTime = 1e9, // some max value
    executedTime = 0,
    completionTime = 0,
    priority,
  }) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.waitingTime = waitingTime;
    this.executedTime = executedTime;
    this.completionTime = completionTime;
    this.priority = priority;
  }
}
