import { Link, useHistory } from "react-router-dom";
import React from "react";
import Switch from "react-switch";
import "./p2.css";
import { useState } from "react";

function App() {
    const [checked, setChecked] = useState(false);

    const handlechange = () => {
        setChecked(!checked)
    }

    const history = useHistory()

    const Next = () => {
        history.push('/createaccount3')
    }
  
  return (
    <div className="App">
      <div className="wrappercreateaccount2">
        <h1>Sign Up</h1>
        <h3>Are you in college ?</h3>   
          <Switch onChange={handlechange} checked={checked} />
            <div style={{marginTop: 5}}>
            <span style={{fontWeight: 'bold'}} >{checked ? 'Yes' : 'No'}</span> 
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