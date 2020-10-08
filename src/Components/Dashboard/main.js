import React from "react";
import "./main.css";
import Location from "@material-ui/icons/PersonPinCircle";
import Money from "@material-ui/icons/AccountBalanceWallet";
import HighlightIcon from "@material-ui/icons/Highlight";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

export default function App() {
  return (
    <>
      <div className="containermain">
        <div className="child1">
          <img src={require("./Unknown.png")} alt={"Error-404"} />
          <button>Edit Profile</button>
        </div>
        <div className="child2">
          <h1>Yash Makhija</h1>
          <div className="child2child1">
            <p>@thesubtlepants</p>
            <div className="seperator"></div>
            <i>
              <Location style={{ color: "grey" }} />
            </i>
            <p>Panipat, Haryana</p>
          </div>
          <div className="child2child2">
            <div className="card">
              <h2>Cat. 1</h2>
            </div>
            <div className="card">
              <h2>Cat. 2</h2>
            </div>
            <div className="card">
              <h2>Cat. 3</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="containermainlite">
        <div className="containerdetails">
          <div className="seperatorbig">
            <div className="details">
              <i>
                <Money style={{ color: "grey" }} />
              </i>
              <p className="amt">0</p>
              <p>Earnings</p>
            </div>
          </div>
          <div className="seperatorbig">
            <div className="details">
              <i>
                <HighlightIcon style={{ color: "grey" }} />
              </i>
              <p className="amt">0</p>
              <p>Campaigns</p>
            </div>
          </div>
          <div className="seperatorbig">
            <div className="details">
              <i>
                <AttachMoneyIcon style={{ color: "grey" }} />
              </i>
              <p className="amt">0</p>
              <p>Avg. Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
