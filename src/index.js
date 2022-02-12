import React from "react";
import ReactDOM from "react-dom";
import Todolist from "./Todolist";
import Prac from "./Prac";
import BlubPage from "./Bulb";
import Board from "./bulletin/board";

ReactDOM.render(
  <React.StrictMode>
    {/* <Todolist /> */}
    {/* <BlubPage /> */}
    <Board />
    {/* <Prac /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
