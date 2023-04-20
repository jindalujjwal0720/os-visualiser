import { useLocation } from "react-router-dom";
import styles from "./inputscreen.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Process } from "../models/process";



export const InputScreen = () =>{

    const location = useLocation();
    const algorithmName = location.state.algorithm;
    const quantum = location.state.quantum;
    const count = location.state.count;
    const [processes,setProcesses] = useState(generateRandomProcesses(location.state.count));
    const onInputChange = (index,event,flag) =>{
        let process = JSON.parse(JSON.stringify(processes));
        if(flag === 1 ){
          process[index].priority = Number(event.target.value);
        }
        if(flag === 2){
          process[index].arrivalTime = Number(event.target.value);
        }
        if(flag ===3){
          process[index].burstTime = Number(event.target.value);
        }
        setProcesses(process);
        console.log("added");
        console.log(process);
    }
    
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
           <div className={styles.table + ` ${styles.blur}`}>
            <div className={styles.column}>
              <h3>PID</h3>
              <div className={styles.columnContent}>
                {processes.map((input,index) => {
                    return(
                        <div key = {index} className={styles.tableCell}>
                          {input.id}
                          </div>
                      )
                })}
              </div>
            </div>
            {algorithmName === "Priority NP" ||
            algorithmName === "Priority P" ? (
              <div className={styles.column}>
              <h3>Priority</h3>
              <div className={styles.columnContent}>
              {processes.map((input,index) =>{
                    return (
                      <div key = {index} className={styles.tableCell}>
                        <input
                        className={styles.input}
                        placeholder="P"
                        value= {input.priority}
                        onChange={event => onInputChange(index,event,1)}
                      >
                      </input>
                      </div>
                    )
                  })}
              </div>
            </div>
            ) : (
              ""
            )}
            <div className={styles.column}>
              <h3>Arrival Time</h3>
              <div className={styles.columnContent}>
                <div className={styles.columnContent}>
                  {processes.map((input,index) =>{
                    return (
                      <div key = {index} className={styles.tableCell}>
                        <input
                        className={styles.input}
                        placeholder="AT"
                        value= {input.arrivalTime}
                        onChange={event => onInputChange(index,event,2)}
                      >
                      </input>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <h3>Burst Time</h3>
              <div className={styles.columnContent}>
              {processes.map((input,index) =>{
                    return (
                      <div key = {index} className={styles.tableCell}>
                        <input
                        className={styles.input}
                        placeholder="BT"
                        value={input.burstTime}
                        onChange={event => onInputChange(index,event,3)}
                      >
                      </input>
                      </div>
                    )
                  })}
              </div>
            </div>
            </div>
            <Link
          to="/algo"
          style={{ textDecoration: "none" }}
          state={{
            algorithm: algorithmName,
            count: count,
            quantum: quantum,
            inputProcesses: processes
          }}
        >
          <div className={styles.button}>Visualise</div>
        </Link>
           </div>
        </div>

      );
        

};

const generateRandomProcesses = (count) => {
  const processes = [];
  for (let i = 0; i < count; i++) {
    const process = new Process({
      id: i + 1,
      burstTime: Math.floor(Math.random() * 4 + 4), // random between 4 and 8
      arrivalTime: Math.floor(Math.random() * 10), // random between 0 and 10
      executedTime: 0,
      priority: Math.floor(Math.random() * 10), // random between 0 and 10
    });
    processes.push(process);
  }
  return JSON.parse(JSON.stringify(processes));
};

  