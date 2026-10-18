import React, { useState, useRef } from "react";

// Simple, reusable input & button components
const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{ display: "block", fontWeight: "bold" }}>
      {label}
      <input style={{ width: "100%", padding: "8px", marginTop: "5px" }} {...props} />
    </label>
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    style={{
      padding: "10px 20px",
      marginRight: "1rem",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
    {...props}
  >
    {children}
  </button>
);

const Calculator = () => {
  // State for inputs & feedback
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const firstInputRef = useRef(null);

  // Core calculation logic
  const calculate = (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    const firstNum = Number(first.trim());
    const secondNum = Number(second.trim());

    if (first === "" || second === "") {
      setError("Both number fields are required.");
      return;
    }
    if (!Number.isFinite(firstNum) || !Number.isFinite(secondNum)) {
      setError("Enter valid real numbers.");
      return;
    }
    if (operation === "/" && secondNum === 0) {
      setError("Division by zero is not allowed.");
      return;
    }

    let value;
    switch (operation) {
      case "+": value = firstNum + secondNum; break;
      case "-": value = firstNum - secondNum; break;
      case "*": value = firstNum * secondNum; break;
      case "/": value = firstNum / secondNum; break;
      default: setError("Select a valid operation."); return;
    }
    setResult(`Result: ${value}`);
  };

  // Reset form & messages
  const handleReset = () => {
    setFirst("");
    setSecond("");
    setOperation("+");
    setResult("");
    setError("");
    if (firstInputRef.current) firstInputRef.current.focus();
  };

  // Graceful exit
  const handleExit = () => {
    if (window.confirm("Do you want to exit the calculator?")) {
      setFirst("");
      setSecond("");
      setOperation("+");
      setResult("Calculator session ended. Close this tab.");
      setError("");
      // Optionally, could disable the form here
      // window.close(); // Not always effective/recommended in SPA
    }
  };

  // Professional UI styling
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        padding: "2rem",
        background: "#fafbfd",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Calculator</h2>
      <form onSubmit={calculate} autoComplete="off">
        <Input
          label="First number"
          type="text"
          value={first}
          onChange={e => setFirst(e.target.value)}
          ref={firstInputRef}
        />
        <Input
          label="Second number"
          type="text"
          value={second}
          onChange={e => setSecond(e.target.value)}
        />
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold" }}>
            Operation
            <select
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              value={operation}
              onChange={e => setOperation(e.target.value)}
            >
              <option value="+">Addition (+)</option>
              <option value="-">Subtraction (-)</option>
              <option value="*">Multiplication (*)</option>
              <option value="/">Division (/)</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <Button type="submit">Calculate</Button>
          <Button type="button" onClick={handleReset} style={{ backgroundColor: "#9e9e9e" }}>
            Reset
          </Button>
          <Button type="button" onClick={handleExit} style={{ backgroundColor: "#c62828" }}>
            Exit
          </Button>
        </div>
      </form>
      {/* Result and error area */}
      {error && (
        <div style={{ color: "#c62828", fontWeight: "bold", marginTop: "1rem" }}>{error}</div>
      )}
      {result && (
        <div style={{ color: "#388e3c", fontWeight: "bold", marginTop: "1rem" }}>{result}</div>
      )}
    </div>
  );
};

export default Calculator;
