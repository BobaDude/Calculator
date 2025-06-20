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

function updateDisplay(text) {
  display.textContent = text;
}

function inputDigit(digit) {
  if (waitingForSecondNum) {
    updateDisplay(digit);
    waitingForSecondNum = false;
  } else {
    if (display.textContent === "0" && digit !== ".") {
      updateDisplay(digit);
    } else if (digit === "." && display.textContent.includes(".")) {
      
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

function calculate(num1, num2, op) {
  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

function resetCalculator() {
  updateDisplay("0");
  firstNum = null;
  operator = null;
  waitingForSecondNum = false;
}

function handlesEquals() {
  const inputValue = parseFloat(display.textContent);

  if (operator === null || waitingForSecondNum) {return;
  }

  const result = calculate(firstNum, inputValue, operator);
  if (result !== null) {
    updateDisplay(String(Math.round(result * 100000) / 100000)); 
    firstNum = result;
    operator = null;
    waitingForSecondNum = false;
  } else {
    resetCalculator();
  }
}
document.querySelectorAll(".btn.digit").forEach((button) => {
  button.addEventListener("click", (e) => {
    inputDigit(e.target.dataset.digit);
  });
});

document.querySelectorAll(".btn.operator").forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperator(e.target.dataset.operator);
  });
});

document.getElementById("clear").addEventListener("click", resetCalculator);

document.getElementById("equals").addEventListener("click", handlesEquals);