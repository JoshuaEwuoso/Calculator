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

  inputNum = (num) => {
    const { output, waitingForEntry } = this.state;
    let number = String(num);
    if (waitingForEntry) {
      this.setState(() => {
        return {
          output: number,
          waitingForEntry: false,
        };
      });
    } else {
      this.setState({
        output: output === "0" ? number : output + number,
      });
    }
  };

  inputDot = () => {
    const { output, waitingForEntry } = this.state;
    if (waitingForEntry) {
      this.setState({
          output: ".",
          waitingForEntry: false,
      });
    } else if (!output.includes(".")) {
      this.setState((prevState) => {
        return {
          output: prevState.output + ".",
          waitingForEntry: false,
        };
      });
    }
  };

  changeSign = () => {
    const { output } = this.state;
    this.setState({
      output: output * -1,
    });
  };

  getPercent = () => {
    const { output } = this.state;
    this.setState({
      output: output / 100,
    });
  };


  operatorClick = (operatorClicked) => {
    const { output, operator, lastEntry } = this.state;

    const nextValue = parseFloat(output);

    const operations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "=": (prevValue, nextValue) => nextValue,
    };
    if (lastEntry == null) {
      this.setState({
        lastEntry: nextValue,
      });
    } else if (operator) {
      const currentValue = lastEntry || 0;
      const computedValue = operations[operator](currentValue, nextValue);
      this.setState(() => {
        return {
          lastEntry: computedValue,
          output: computedValue,
        };
      });
    }
    this.setState(() => {
      return {
        waitingForEntry: true,
        operator: operatorClicked,
      };
    });
  };

  render() {
    return (
      <div>
        <h1>Calculator App</h1>
      </div>
    )
  }
}

export default Calculator;
