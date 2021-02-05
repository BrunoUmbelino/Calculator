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
    this.setState({
      exp: this.state.disp.slice(0, -1),
      disp: this.state.disp.slice(0, -1),
    });
  }

  handleNumber(ev) {
    if (this.state.disp.length > 15) return;

    let input = ev.target.innerText;
    const { disp, exp } = this.state;
    const dispWithOperator = /[+/x]/g.test(disp);

    if (input === "." && disp.includes(".")) return;
    else if (input === "0" && disp === "0") return;
    else if (disp === "0" || dispWithOperator) {
      this.setState({ disp: input, exp: exp + input });
    } else {
      this.setState({
        disp: disp + input,
        exp: exp + input,
      });
    }
  }

  handleOperation(ev) {
    if (this.state.disp.length > 15) return;

    let { exp } = this.state;
    let prevOpe = exp[exp.length - 1];
    let operator = ev.target.innerText;
    operator = operator.replace(/[÷]/, "/");
    operator = operator.replace(/[x]/, "*");

    if (
      (/[+*/]/g.exec(prevOpe) && operator !== `-`) ||
      (prevOpe === `-` && operator === "-")
    ) {
      operator = "";
    } 
    else if (prevOpe === "-" && operator === "+") {
      let expClean = (exp = exp.replace(/[-+/*]/g, ""));
      this.setState({
        exp: expClean + operator,
        disp: operator,
        prev: prevOpe,
      });
    } else {
      this.setState({
        exp: exp + operator,
        disp: operator,
        prev: prevOpe,
      });
    }
  }

  calculate() {
    if (this.state.disp.length > 15) return;

    const { exp } = this.state;
    const startWitchOperator = /^[/*+-]+/.test(exp);
    const endsWithOperator = /[x+‑/]+$/.test(exp);

    if (!endsWithOperator && !startWitchOperator) {
      const result = eval(exp).toString();
      const formattedRes = result.slice(0, 15);

      this.setState({
        disp: formattedRes,
        exp: formattedRes,
      });
    } else {
      alert("Invalid expression");
      this.clearDisplay();
    }
  }

  render() {
    const LimitError = () => {
      return <div className="error">"number of characters exceeded"</div>;
    };
    return (
      <div className="main">
        <div>
          <Container className="calculator">
            <div>
              <span>||</span>
            </div>
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
          <div>
            <span className="by">By Bruno Umbelino</span>
          </div>
        </div>
      </div>
    );
  }
}
