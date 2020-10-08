import React from "react";
import "./navbar.css";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-name">Levance</div>
        <div className="container">
          <button>Profile</button>
          <button>Campaigns</button>
        </div>
        <div className="logout">
          <button>Logout</button>
        </div>
      </div>
    </>
  );
}

export default App;
