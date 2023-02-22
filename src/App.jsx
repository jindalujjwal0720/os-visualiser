import React, { useEffect, useState } from "react";
import CombinedAlgo from "./components/CombinedAlgo";
import FCFS from "./components/FCFS";
import GanttChart from "./components/GanttChart";
import ProcessCard from "./components/ProcessCard";
import { ProcessInput } from "./components/ProcessInput";
import ProcessQueue from "./components/ProcessQueue";

export default function App() {
  return (
    <div>
      {/* <ProcessQueue title="Waiting">
        <ProcessCard progress={0.8} processID={1} />
        <ProcessCard progress={0.3} processID={2} />
      </ProcessQueue> */}
      {/* <button onClick={clickHandler}>Random button</button> */}
      {/* <GanttChart arr={arr.slice(0, count + 1)} count={5} minLength={100} />
      <GanttChart arr={arr.slice(0, count + 1)} />
      <GanttChart arr={arr} /> */}
      {/* <FCFS /> */}
      {/* <ProcessInput /> */}
      <CombinedAlgo />
    </div>
  );
}
