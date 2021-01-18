import React from "react";
import Btns from "./ButtonsComponent";
import { Container, Row } from "reactstrap";

export class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="calculator-wrap">
          <div className="calculator">
            <Container>
              <Row>dysplay</Row>
              <Row> <Btns /> </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
