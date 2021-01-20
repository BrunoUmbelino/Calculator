import React from "react";
import Btns from "./ButtonsComponent";
import { Container, Label, Row } from "reactstrap";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImp: 0,
      expression: "",
      operator: "",
      result: "",
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.backspace = this.backspace.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearDisplay() {
    this.setState({ currentImp: 0, expression: "" });
  }

  backspace() {
    if (this.state.currentImp.length <= 1) {
      this.setState({ currentImp: "0" });
    } else {
      this.setState({
        currentImp: this.state.currentImp.slice(0, -1),
      });
    }
  }

  handleInput(ev) {
    let value = ev.target.innerText;
    const currentImp = this.state.currentImp;
    if (value === "." && currentImp.includes(".")) return;
    else if (currentImp === 0) {
      this.setState({ currentImp: value });
    } else {
      this.setState({
        currentImp: this.state.currentImp + value,
        expression: this.state.currentImp + value,
      });
    }
    console.log(this.state.expression);
  }

  handleOperation(ev) {
    if (this.state.currentImp == 0) return;
    let operator = ev.target.innerText;
    this.setState({ operator: operator });

    this.setState({
      expression: this.state.currentImp,
    });
    this.setState({
      currentImp: 0,
    });

    console.log(this.state.expression);
    this.calculate();
  }

  calculate() {
    let calculation;
    let prev = parseFloat(this.state.expression);
    let current = parseFloat(this.state.currentImp);
    console.log(prev, current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.state.operator) {
      case "+":
        calculation = prev + current;
        break;
      case "-":
        calculation = prev - current;
        break;
      case "x":
        calculation = prev * current;
        break;
      case "÷":
        calculation = prev / current;
        break;
    }
    prev = 0;
    current = 0;
    this.setState({ expression: calculation });
    this.setState({ result: calculation.toString() });
  }

  render() {
    return (
      <div className="main">
        <Container className="calculator">
          <div>//</div>
          <Row className="screen">
            <Label id="display">{this.state.expression}</Label>
            <Label className="expression">{this.state.currentImp}</Label>
          </Row>
          <Row>
            {" "}
            <Btns
              clearDisplay={this.clearDisplay}
              handleInput={this.handleInput}
              calculate={this.calculate}
              backspace={this.backspace}
              handleOperation={this.handleOperation}
            />{" "}
          </Row>
        </Container>
      </div>
    );
  }
}
