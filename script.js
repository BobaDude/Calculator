function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    alert("Cannot divide by zero");
    return null;
  }
  return a / b;
}
let firstNum = null;
let operator = null;
let waitingForSecondNum = false;

const display = document.getElementById("display");

function inputDigit(digit) {
  if (waitingForSecondNum) {
    updateDisplay(digit);
    waitingForSecondNum = false;
  } else {
    if (display.textContent === "0" && digit !== ".") {
      updateDisplay(digit);
    } else if (digit === "." && display.textContent.includes(".")) {
      // Prevent multiple decimals
      return;
    } else {
      updateDisplay(display.textContent + digit);
    }
  }
}
function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.textContent);

  if (operator && waitingForSecondNum) { operator = nextOperator;
    return;
  }

  if (firstNum === null) {
    firstNum = inputValue;
  } else if (operator) {
    const result = calculate(firstNum, inputValue, operator);
    if (result !== null) {
      updateDisplay(String(result));
      firstNum = result;
    } else {
      updateDisplay("0");
      firstNum = null;
      operator = null;
      waitingForSecondNum = false;
      return;
    }
  }
  operator = nextOperator;
  waitingForSecondNum = true;
}
