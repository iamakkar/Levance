import React, {useEffect, useState} from "react";
import "./main.css";
import Location from "@material-ui/icons/PersonPinCircle";
import Money from "@material-ui/icons/AccountBalanceWallet";
import HighlightIcon from "@material-ui/icons/Highlight";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {connect} from 'react-redux'
import Axios from 'axios';

function App(props) {

  const [data, setData] = useState({
    city: '',
    fullName: '',
    username: '',
    categories: [],
  });

  useEffect(() => {
    console.log('gayi');
    console.log(props.email)
    Axios.post('http://localhost:5000/getdetails', {emailreq: props.email})
    .then((res) => setData(res.data))
    .catch((e) => console.log(e));
    console.log('gayi fieese');
  }, [ props.email])


  return (
    <>
      <div className="containermain">
        <div className="child1">
          <img src={require("./yash.svg").default} alt={"Error-404"} />
          <button>Edit Profile</button>
        </div>
        <div className="child2">
          <h1>{data.fullName}</h1>
          <div className="child2child1">
            <p>@{data.username}</p>
            <div className="seperator"></div>
            <i>
              <Location style={{ color: "grey" }} />
            </i>
          <p>{data.city}</p>
          </div>
          
          <div className="child2child2">
            <div className="card">
              <span>{data.categories[0]}</span>
            </div>
            <div className="card">
              <span>{data.categories[1]}</span>
            </div>
            <div className="card">
              <span>{data.categories[2]}</span>
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

const mapStateToProps = state => {
  return {
    email: state.userDetails.email
  }
}

export default connect(mapStateToProps, undefined)(App)
