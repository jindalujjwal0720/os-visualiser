import React, { useState } from "react";
import styles from "./processInput.module.css";
import { MdDeleteOutline as RemoveIcon } from "react-icons/md";

export const ProcessInput = ({ processes, setProcesses }) => {
  const [values, setValues] = useState(processes || [{}]);

  const handleChange = (e, index, key) => {
    let temp = values;
    temp[index][key] = e.target.value;
    setValues([...temp]);
    console.log(e.target.value);
  };

  const submitProcesses = (e) => {
    e.preventDefault();
    console.log("Submitted Processes");
    console.log(values);
  };

  const addProcess = (e) => {
    setValues([...values, {}]);
    console.log("Add Process");
    console.log(values);
  };

  const removeProcess = (e, index) => {
    let temp = values.filter((_, i) => i !== index);
    setValues([...temp]);
    console.log(`${index} removed`);
  };

  return (
    <div>
      <h3>Processes</h3>
      <form onSubmit={submitProcesses} className={styles.inputForm}>
        {values.map((process, index) => (
          <div key={index} className={styles.inputRow}>
            <input
              key="id"
              onChange={(e) => handleChange(e, index, "id")}
              value={process.id}
              className={styles.input}
              placeholder="ID"
              style={{ width: "30px" }}
            ></input>
            <input
              key="at"
              onChange={(e) => handleChange(e, index, "arrivalTime")}
              value={process.arrivalTime}
              className={styles.input}
              placeholder="Arrival"
              style={{ width: "50px" }}
            ></input>
            <input
              key="bt"
              onChange={(e) => handleChange(e, index, "burstTime")}
              value={process.burstTime}
              className={styles.input}
              placeholder="Burst"
              style={{ width: "50px" }}
            ></input>
            <input
              key="bt"
              onChange={(e) => handleChange(e, index, "priority")}
              value={process.burstTime}
              className={styles.input}
              placeholder="Priority"
              style={{ width: "50px" }}
            ></input>
            {values.length > 1 && (
              <RemoveIcon
                className={styles.removeProcess}
                onClick={(e) => removeProcess(e, index)}
              />
            )}
          </div>
        ))}
        <input
          key="bt"
          className={styles.input}
          placeholder="Time Quanta"
          style={{ width: "80px" }}
        ></input>
        <button type="button" onClick={addProcess} className={styles.addMore}>
          Add More
        </button>
      </form>
    </div>
  );
};
