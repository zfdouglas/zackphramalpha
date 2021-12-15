import React, { useState } from "react";
import logo from "./Assets/logo.svg";
import "./App.css";
import { Calculator } from "./Components/Calculator";

function App() {
  const [result, setResult] = useState(null);
  const [hasSolution, setHasSolution] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-logo">
          <img src={logo} className="App-logo" alt="logo" />
          <div>ZackframAlpha</div>
        </div>
        <Calculator solved={setHasSolution} computedValue={setResult} />
      </header>
      {hasSolution ? (
        <div className="App-results">
          <h2>Solution:</h2>
          {result}
        </div>
      ) : null}
      <footer className="App-footer">
        <a href="https://github.com/zfdouglas/zackphramalpha/blob/main/README.md">
          Click Me for Documentation
        </a>
      </footer>
    </div>
  );
}

export default App;
