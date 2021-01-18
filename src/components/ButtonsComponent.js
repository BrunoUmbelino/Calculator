import React from "react";
import { Button } from "reactstrap";

const values = [
  "AC",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const Btns = () => {
  const Btns = values.map((item) => {
    return <Button className={item}>{item}</Button>;
  });
  return <div className="btns">{Btns}</div>;
};

export default Btns;
