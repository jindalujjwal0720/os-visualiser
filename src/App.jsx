import React, { useEffect, useState } from "react";
import CombinedAlgo from "./components/CombinedAlgo";
import FCFS from "./components/FCFS";
import GanttChart from "./components/GanttChart";
import ProcessCard from "./components/ProcessCard";
import { ProcessInput } from "./components/ProcessInput";
import ProcessQueue from "./components/ProcessQueue";
import { AlgoScreen } from "./screens/AlgoScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/algo" element={<AlgoScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
