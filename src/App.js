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
    const { output } = this.state;
    return (
      <>
        <h1>Calculator App</h1>
        <div id="calculator-container" className="calcBorder">
          <main id="output" className="number">{Number(output).toLocaleString("en-US")}</main>
          <main>
            <button 
              onClick={() => this.setState({ output: "0", lastEntry: null,
              waitingForEntry: false,
              operator: null })}>
                AC
            </button>
            <button 
              onClick={this.changeSign}>
                +/-
            </button>
            <button 
              onClick={this.getPercent}>
                %
            </button>
            <button
              onClick={() => {
                this.operatorClick("/");
              }}
              className="right">
                ÷
            </button>
          </main>
          <main>
            <button value="7" onClick={() => this.inputNum(7)}>
              7
            </button>
            <button value="8" onClick={() => this.inputNum(8)}>
              8
            </button>
            <button value="9" onClick={() => this.inputNum(9)}>
              9
            </button>
            <button
              onClick={() => {
                this.operatorClick("*");
              }}
              className="right">
                x
            </button>
          </main>
          <main>
            <button value="4" onClick={() => this.inputNum(4)}>
              4
            </button>
            <button value="5" onClick={() => this.inputNum(5)}>
              5
            </button>
            <button value="6" onClick={() => this.inputNum(6)}>
              6
            </button>
            <button
              onClick={() => {
                this.operatorClick("-");
              }}
              className="right">
                -
            </button>
          </main>
          <main>
            <button value="1" onClick={() => this.inputNum(1)}>
              1
            </button>
            <button value="2" onClick={() => this.inputNum(2)}>
              2
            </button>
            <button value="3" onClick={() => this.inputNum(3)}>
              3
            </button>
            <button
              onClick={() => {
                this.operatorClick("+");
              }}
              className="right">
                +
            </button>
          </main>
          <main>
            <button id="zero" value="0" onClick={() => this.inputNum(0)}>
              0
            </button>
            <button onClick={this.inputDot}>
              .
            </button>
            <button
              onClick={() => {
                this.operatorClick("=");
              }}
              className="right">
                =
            </button>
          </main>
        </div>
        <div>
        <footer className="bottom">Copyright &copy; 2021 | GhostPen</footer>
        </div>
      </>
    );
  }
}

export default Calculator;
