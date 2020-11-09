import React from "react";
import "./wrapper.css";
import Nav from "./navbar";
import Main from "./main";

export default function App() {
  return (
    <>
      <div className="main">
        <Nav />
        <Main />
      </div>
    </>
  );
}
