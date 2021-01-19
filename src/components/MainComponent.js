import React from "react";
import Btns from "./ButtonsComponent";
import { Container, Row } from "reactstrap";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: "10+10+10" };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearDisplay() {
    this.setState({ result: 0 });
  }

  handleInput(ev) {
    console.log(ev.target.innerText);
    let value = ev.target.innerText;
    this.setState({ result: this.state.result + value });
  }

  calculate() {
    let values = this.state.result;
    let numbers = values.match(/(\d+)/g).map((num) => parseInt(num));
    let arithExp = values.match(/(\W)/g);
    var x = 0;

    if (numbers.length == 1) return;

    for (let i = numbers.length - 1; i >= 0; i--) {
      console.log(i, numbers[i], numbers[i - 1]);

      let number1 = numbers[i];
      let number2 = numbers[i--];

      if (number2 === undefined) {
        number2 = 0;
      }

      switch (arithExp[i]) {
        case "+":
          x = x + (number1 + number2);
          console.log("soma: ", number1, number2);
          console.log("parcial: " + x);
      }
    }
    console.log("result: " + x);
    console.log(numbers, arithExp);
  }

  render() {
    return (
      <div className="main">
        <div className="calculator-wrap">
          <div className="calculator">
            <Container>
              <Row>
                <div>Display:</div>
                <div id="display">{this.state.result}</div>
              </Row>
              <Row>
                {" "}
                <Btns
                  clearDisplay={this.clearDisplay}
                  handleInput={this.handleInput}
                  calculate={this.calculate}
                />{" "}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
