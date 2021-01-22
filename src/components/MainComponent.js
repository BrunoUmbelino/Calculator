import React from "react";
import Btns from "./ButtonsComponent";
import { Container, Label, Row } from "reactstrap";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disp: "0",
      prev: "",
      exp: "",
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.backspace = this.backspace.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  clearDisplay() {
    this.setState({ disp: `0`, exp: "" });
  }

  backspace() {
    if (this.state.disp.length <= 1) {
      this.setState({ disp: 0, curr: 0 });
    } else {
      this.setState({
        exp: this.state.disp.slice(0, -1),
      });
    }
  }

  handleNumber(ev) {
    let input = ev.target.innerText;
    const { disp, exp } = this.state;

    if (disp.length > 15) return;

    if (input === "." && disp.includes(".")) return;
    else if (input === "0" && disp[0] === "0") return;
    else if (disp === "0" || /[-+÷x]/g.test(disp)) {
      this.setState({ disp: input, exp: exp + input });
    } else {
      this.setState({
        disp: disp + input,
        exp: exp + input,
      });
    }
  }

  handleOperation(ev) {
    const { exp, disp } = this.state;
    let operation = ev.target.innerText;

    if (disp.length > 15) return;

    operation = operation.replace(/[÷]/, "/");
    operation = operation.replace(/[x]/, "*");

    this.setState({
      exp: exp + operation,
      disp: operation,
    });
  }

  calculate() {
    const endsWithOperator = /[x+‑/]$/;
    const {exp} = this.state
    
    let expression = exp.replace(/([/*-+]+)(-)+/g, `$1`);
    expression = expression.replace(/([/*-+])([/*-+])+/g, `$2`);
    console.log(expression)

    if (!endsWithOperator.test(exp)) {
      let result = eval(expression).toString();
      const formattedRes = result.slice(0, 15);
      this.setState({
        disp: formattedRes,
        exp: formattedRes,
      });
    }
  }

  render() {
    let str = "352+-/+**/*-/25++---10*/1";
    console.log(eval("5+-5"))
    console.log(this.state);
    const LimitError = () => {
      return <div className="error">"number of characters exceeded"</div>;
    };
    return (
      <div className="main">
        <Container className="calculator">
          <div>//</div>
          <Row className="screen">
            <Label className="expression">
              {this.state.disp.length > 15 ? "" : this.state.exp}
            </Label>
            <Label id="display">
              {this.state.disp.length > 15 ? <LimitError /> : this.state.disp}
            </Label>
          </Row>
          <Row>
            <Btns
              clearDisplay={this.clearDisplay}
              handleNumber={this.handleNumber}
              calculate={this.calculate}
              backspace={this.backspace}
              handleOperation={this.handleOperation}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
