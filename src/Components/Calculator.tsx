import React, { FormEvent, useState } from "react";
import "../App.css";

type CalculatorProps = {
  computedValue: Function;
  solved: Function;
};

export const Calculator = (props: CalculatorProps) => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState(0);
  let numberArr = new Array<string>();
  let operatorArr = new Array<string>();
  const operators = ["*", "+", "/", "-"];

  // Takes submit event from Calculator component, and will return an evaluated solution if the equation retrieved from equation state is valid.Otherwise will alert to the input being invalid.
  const computeProblem = (event: FormEvent) => {
    event.preventDefault();
    setResult(0);
    if (equation.length === 1) {
      setResult(parseInt(equation));
    } else if (isEquationValid(equation)) {
      let resultOfComputation = resolveEquation();
      if (resultOfComputation !== undefined) {
        setResult(parseFloat(resultOfComputation));
        props.solved(true);
        props.computedValue(parseFloat(resultOfComputation));
      }
    } else {
      clearEquation();
      alert(
        "Invalid equation. Please make sure your equation contains only valid characters. For accepted inputs please refer to the documentation tab."
      );
    }
  };

  // Breaks out equation into two array stacks one for digit values and the other for operators. Then will evaluate based on priority. Multiplication and division then Addition and Subtraction (resolved left to right). Will return computed answer.
  function resolveEquation() {
    let eq = equation;
    eq = eq.replace(" ", "");

    for (let i = 0; i < eq.length; i++) {
      let currentValue = eq.charAt(i);
      if (operators.includes(currentValue)) {
        if (
          currentValue === "-" &&
          (i === 0 || operators.includes(eq.charAt(i - 1)))
        ) {
          i++;
          let fullNumber = getNumberToAdd(i, eq);
          if (fullNumber.length > 1) {
            i += fullNumber.length - 1;
          }
          fullNumber = "-" + fullNumber;
          numberArr.push(fullNumber);
        } else if (
          operatorArr.length === 0 ||
          priorityOrder(currentValue) >
            priorityOrder(operatorArr[operatorArr.length - 1])
        ) {
          operatorArr.push(currentValue);
        } else {
          while (
            operatorArr.length !== 0 &&
            priorityOrder(currentValue) <=
              priorityOrder(operatorArr[operatorArr.length - 1])
          ) {
            let currentOperator = operatorArr.pop();
            if (currentOperator !== undefined) {
              solveSubequation(currentOperator);
            }
          }
          operatorArr.push(currentValue);
        }
      } else {
        let fullNumber = getNumberToAdd(i, eq);
        if (fullNumber.length > 1) {
          i += fullNumber.length - 1;
        }
        numberArr.push(fullNumber);
      }
      //TODO else if(parentheseHandling){}
    }
    //Resolve Subequations
    while (operatorArr.length !== 0) {
      let operator = operatorArr.pop();
      if (operator !== undefined) {
        solveSubequation(operator);
      }
    }
    if (numberArr[numberArr.length - 1] !== undefined) {
      return numberArr.pop();
    }
  }

  function getNumberToAdd(i: number, eq: string) {
    let currentNumberString = "";
    let iter = i;
    for (iter; iter < eq.length; iter++) {
      if (operators.includes(eq.charAt(iter))) {
        iter -= 1;
        break;
      } else {
        currentNumberString += eq.charAt(iter);
      }
    }
    return currentNumberString;
  }

  //Will return 1 (higher priority) for multiplication or division operator, else will return 0
  function priorityOrder(operator: string) {
    if (operator === "*" || operator === "/") {
      return 1;
    } else {
      return 0;
    }
  }

  function add(x: string, y: string) {
    console.log(x, y);
    return parseFloat(x) + parseFloat(y);
  }

  function substract(x: string, y: string) {
    return parseFloat(x) - parseFloat(y);
  }

  function divide(x: string, y: string) {
    return parseFloat(x) / parseFloat(y);
  }

  function multiply(x: string, y: string) {
    return parseFloat(x) * parseFloat(y);
  }
  function isEquationValid(equation: string) {
    return true;
    // return /^-?[0-9,.,+,-,(,),*,\/]*$/.test(equation);
  }

  function solveSubequation(operator: string) {
    let peekValue = numberArr.length - 1;
    //going through and get right off the top first, and then get the left, then pass into switch
    let leftNumStr = "";
    let rightNumStr = "";
    rightNumStr = numberArr[peekValue];
    numberArr.pop();
    peekValue -= 1;
    leftNumStr = numberArr[peekValue];
    numberArr.pop();
    peekValue -= 1;
    numberArr.push(calculateEquation(leftNumStr, rightNumStr, operator));
  }

  function calculateEquation(
    leftNumStr: string,
    rightNumStr: string,
    currentOperator: string
  ) {
    let value = 0;
    console.log(leftNumStr, rightNumStr, currentOperator);
    switch (currentOperator) {
      case "*":
        value = multiply(leftNumStr, rightNumStr);
        break;
      case "-":
        value = substract(leftNumStr, rightNumStr);
        break;
      case "+":
        value = add(leftNumStr, rightNumStr);
        break;
      case "/":
        value = divide(leftNumStr, rightNumStr);
        break;
    }
    return value.toString();
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
