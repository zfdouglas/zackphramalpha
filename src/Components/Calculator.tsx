import React, { FormEvent, useState } from "react";
import calculateProblemHook from "../Hooks/CalculateHook";
import "../App.css";

type CalculatorProps = {
  computedValue: Function;
  solved: Function;
};

export const Calculator = (props: CalculatorProps) => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState(0);

  // Takes submit event from Calculator component, and will return an evaluated solution if the equation retrieved from equation state is valid.Otherwise will alert to the input being invalid.
  const computeProblem = (event: FormEvent) => {
    event.preventDefault();
    if (equation !== "") {
      setResult(0);
      if (equation.length === 1) {
        setResult(parseInt(equation));
      } else if (isEquationValid(equation)) {
        let resultOfComputation = calculateProblemHook(equation);
        if (resultOfComputation !== undefined) {
          if (isNaN(parseFloat(resultOfComputation))) {
            alert(
              "Something has gone wrong in computing this equation. Please check equation input is valid or try another equation."
            );
            clearEquation();
          } else {
            setResult(parseFloat(resultOfComputation));
            props.solved(true);
            props.computedValue(parseFloat(resultOfComputation));
          }
        } else {
          alert(
            "Something has gone wrong in computing this equation. Please check inputs or try another equation."
          );
        }
      } else {
        clearEquation();
        alert(
          "Invalid equation. Please make sure your equation contains only valid characters. For accepted inputs please refer to the documentation tab."
        );
      }
    }
  };

  function isEquationValid(equation: string) {
    //BUG: fix regex considering a value that only has a value to the right of the decimal as invalid
    return /^[-0-9,0-9,.,+,-,(,),*,\/]*$/.test(equation);
  }

  function clearEquation() {
    setEquation("");
    setResult(0);
    props.computedValue(0);
    props.solved(false);
  }
  return (
    <div className="Calculator">
      <form className="Calculator-form" onSubmit={computeProblem}>
        <input
          className="Calculator-Input"
          type="text"
          id="equation"
          placeholder="2 + 2"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
        <input className="Calculator-Submit" type="submit" value="Compute" />
        <button className="Calculator-Submit" onClick={() => clearEquation()}>
          Clear
        </button>
      </form>
    </div>
  );
};
