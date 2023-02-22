export class Process {
  constructor({ id, burstTime, arrivalTime, executedTime = 0, priority }) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.executedTime = executedTime;
    this.priority = priority;
  }
}
