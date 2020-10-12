import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./p2.css";

function App() {

    const history = useHistory()

    const Next = () => {
        history.push('/createaccount3')
    }
  
  return (
    <div className="App">
      <div className="wrappercreateaccount2">
        <h1>Sign Up</h1>
        <h3>Are you in college ?</h3>
        <div>
          <button class="college-btn" data-action="yes">Yes</button>
          <button class="college-btn" data-action="no">No</button>
        </div>
        <button className="btn" onClick={Next} >Next</button>
        <span>or</span>
        <div className="afteror">
          <Link to={'/signin'} className="new">
            Already have an account 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;