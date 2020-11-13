import { Link, useHistory } from "react-router-dom";
import React, {useState} from "react";
import Switch from "react-switch";
import "./p2.css";
import {connect} from 'react-redux';

function App(props) {
    const [checked, setChecked] = useState(false);

    const handlechange = () => {
        setChecked(!checked)
    }

    const history = useHistory()

    const Next = async() => {
       await props.setCollege(checked);
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
        <button className="buttn" onClick={Next} >Next</button>
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

const mapDispatchToProps = dispatch => {
    return {
        setCollege: data => {
            dispatch({
                type: 'SET_COLLEGE',
                college: data
            })
        }
    }
}

export default connect(undefined, mapDispatchToProps)(App);