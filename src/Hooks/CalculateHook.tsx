let equation = "";
let numberArr = new Array<string>();
let operatorArr = new Array<string>();
const operators = ["*", "+", "/", "-"];

const calculateProblemHook = (input: string) => {
  equation = input;
  return resolveEquation();
};

function resolveEquation() {
  let eq = equation;
  eq = eq.replace(" ", "");

  for (let i = 0; i < eq.length; i++) {
    let currentValue = eq.charAt(i);
    //If the current value is an operator
    if (operators.includes(currentValue)) {
      //checks if currentValue is a minus and previous character was an operator, if so, the value is negative
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
        //if multiplication or division is current operator and the top of the stack is addition or subtraction, just add the operator to the stack
        operatorArr.push(currentValue);
      } else {
        //if the current operator is addition or subtraction, we want to solve things in stack that have higher priority until we can't anymore, then add operator. Maintaining PEMDAS priority. This also ascertains we are working left to right.
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
  //Resolve Subequations if there are operators left on the array at the end
  while (operatorArr.length !== 0) {
    let operator = operatorArr.pop();
    if (operator !== undefined) {
      solveSubequation(operator);
    }
  }
  //Final answer will be the only value left in the number array, return it
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

//Will return 1 (higher priority) for multiplication or division operator, else (aka for + or -) will return 0
function priorityOrder(operator: string) {
  if (operator === "*" || operator === "/") {
    return 1;
  } else {
    return 0;
  }
}

function add(x: string, y: string) {
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

function solveSubequation(operator: string) {
  let peekValue = numberArr.length - 1;
  //going through and get right off the top first, and then get the left, then pass into switch
  //not using popped value because that gives possibility of undefined
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
export default calculateProblemHook;
