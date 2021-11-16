import React, { Component } from "react";
import './App.css';

class Calculator extends Component {
  constructor () {
    super();
    this.state = {
      output: "0",
      lastEntry: null,
      waitingForEntry: false,
      operator: null,
    };
  }
  render() {
    return (
      <div>
        <h1>Calculator App</h1>
      </div>
    )
  }
}

export default Calculator;
