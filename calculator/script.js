// 1. Basic Math Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Nice try!" : a / b);

// 2. Core Calculator State
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false; // Flag to check if next digit press clears display after evaluation

// 3. Evaluation Function
function operate(op, a, b) {
  const num1 = Number(a);
  const num2 = Number(b);

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

// 4. DOM Elements
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".btn.digit");
const operatorButtons = document.querySelectorAll(".btn.operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

// Helper: Round numbers to prevent display overflow
function roundResult(number) {
  if (typeof number === "string") return number; // Handles error messages
  return Math.round(number * 100000) / 100000;
}

// Helper: Clear state completely
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
  display.textContent = "0";
}

// Helper: Handle evaluation logic
function evaluate() {
  if (operator === "" || shouldResetDisplay) return;
  if (operator === "/" && secondNumber === "0") {
    display.textContent = divide(1, 0);
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = true;
    return;
  }

  const result = roundResult(operate(operator, firstNumber, secondNumber));
  display.textContent = result;
  firstNumber = result.toString();
  secondNumber = "";
  operator = "";
  shouldResetDisplay = true;
}

// 5. Event Listeners

// Digit Buttons
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.textContent;

    if (shouldResetDisplay) {
      display.textContent = "";
      shouldResetDisplay = false;
    }

    if (display.textContent === "0" && digit !== ".") {
      display.textContent = digit;
    } else {
      display.textContent += digit;
    }

    if (operator === "") {
      firstNumber = display.textContent;
    } else {
      secondNumber = display.textContent;
    }
  });
});

// Operator Buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedOperator = button.dataset.op;

    // Handle consecutive operator presses without entering a second number
    if (firstNumber !== "" && operator !== "" && secondNumber === "") {
      operator = selectedOperator;
      return;
    }

    // Handle chaining multiple operations (e.g., 12 + 7 - 1)
    if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
      evaluate();
    }

    operator = selectedOperator;
    shouldResetDisplay = true;
  });
});

// Equals Button
equalsButton.addEventListener("click", () => {
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    evaluate();
  }
});

// Clear Button
clearButton.addEventListener("click", clearCalculator);