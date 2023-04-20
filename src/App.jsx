import React, { useEffect, useState } from "react";
import CombinedAlgo from "./components/CombinedAlgo";
import FCFS from "./components/FCFS";
import GanttChart from "./components/GanttChart";
import ProcessCard from "./components/ProcessCard";
import { ProcessInput } from "./components/ProcessInput";
import ProcessQueue from "./components/ProcessQueue";
import { AlgoScreen } from "./screens/AlgoScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { InputScreen } from "./screens/InputScreen";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/algo" element={<AlgoScreen />}></Route>
          <Route path="/custominput" element={<InputScreen/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
