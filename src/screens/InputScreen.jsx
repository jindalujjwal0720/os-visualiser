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
    const [processes,setProcesses] = useState(generateProcessesWithId(location.state.count));
    const onInputChange = (index,event,flag) =>{
        let process = JSON.parse(JSON.stringify(processes));
        if(flag === 1 ){
          if(isNaN(event.target.value)){
            let p = JSON.parseFloat(JSON.stringify(event.target.valueAsnumber));
            process[index].priority.valueAsnumber = p;
          }
          else{
            process[index].priority = event.target.value;
          }
          
        }
        if(flag === 2){
          if(isNaN(event.target.value)){
            let p = JSON.parse(JSON.stringify(event.target.valueAsnumber));
            let x =parseFloat(p);
            console.log(x);
            console.log(p+"\n hello")
            process[index].arrivalTime.valueAsnumber = x;
          }
          else{
            process[index].arrivalTime = event.target.value;
          }
        }
        if(flag ===3){
          if(isNaN(event.target.value)){
            let p = JSON.parse(JSON.stringify(event.target.valueAsnumber));
            let x =parseFloat(p);
            console.log(x);
            console.log(p+"\n hello")
            process[index].burstTime.valueAsnumber = x;
          }
          else{
            process[index].burstTime = event.target.value;
          }
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
                        value= {String(input.priority)}
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
                        value= {String(input.arrivalTime)}
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
                        value={String(input.burstTime)}
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
          to="/custominput"
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

const generateProcessesWithId = (count) => {
    const processes = [];
    for (let i = 0; i < count; i++) {
      const process = new Process({
        id: i + 1,
        burstTime: 0,
        arrivalTime: 0,
        executedTime: 0,
        priority: 0
      });
      processes.push(process);
    }
    return JSON.parse(JSON.stringify(processes));
  };

  