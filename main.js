const calculatorForm = document.getElementById("calculator-form");
const firstNumberInput = document.getElementById("first-number");
const secondNumberInput = document.getElementById("second-number");
const operationInput = document.getElementById("operation");
const resultOutput = document.getElementById("result");
const resetButton = document.getElementById("reset-btn");
const exitButton = document.getElementById("exit-btn");

calculatorForm.addEventListener("submit", calculate);
resetButton.addEventListener("click", resetCalculator);
exitButton.addEventListener("click", exitCalculator);

function calculate(event) {
    event.preventDefault();

    const firstNumberText = firstNumberInput.value.trim();
    const secondNumberText = secondNumberInput.value.trim();
    const operation = operationInput.value;

    if (firstNumberText === "" || secondNumberText === "") {
        showMessage("Both number fields are required.", true);
        return;
    }
    const firstNumber = Number(firstNumberText);
    const secondNumber = Number(secondNumberText);

    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
        showMessage("Enter valid real numbers.", true);
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                showMessage("Division by zero is not allowed.", true);
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            showMessage("Select a valid operation.", true);
            return;
    }

    showMessage(`Result: ${result}`, false);
}

function resetCalculator() {
    calculatorForm.reset();
    showMessage("Enter two numbers and select an operation.", false);
    firstNumberInput.focus();
}

function exitCalculator() {
    const confirmed = confirm("Do you want to end this calculator session?");
    if (!confirmed) return;
    calculatorForm.querySelectorAll("input, select, button").forEach((element) => {
        element.disabled = true;
    });
    showMessage("Calculator session ended. You may now close this tab.", false);
}

function showMessage(message, isError) {
    resultOutput.textContent = message;
    resultOutput.classList.remove("error", "success");
    resultOutput.classList.add(isError ? "error" : "success");
}
