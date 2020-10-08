import React from "react";
import "./App.css";
import Nav from "./Components/Dashboard/navbar";
import Main from "./Components/Dashboard/main";

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
