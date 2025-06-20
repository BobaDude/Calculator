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