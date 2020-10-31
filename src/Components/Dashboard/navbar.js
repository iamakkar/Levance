import React from "react";
import "./navbar.css";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'


function App(props) {

const history = useHistory()

async function logout() {
  await localStorage.removeItem('token');
  await props.setAuth(false);
  history.push('/')
}

  return (
    <div className="navbarhome">
        <div className="logo">
        <img src={require("../../logo/Levance.svg")} alt={"Error-404"} />
        </div>
        <div className="items">
          <ul>
            <li className="item"><span>
                
                Profile

                </span>
                </li>
            <li className="item"><span>Campaigns</span></li>
            {/* <li className="item"><span>Contact Us</span></li> */}
          </ul>
          <div className='logout' >
             <div className="button" onClick={logout} > 
             Logout 
              </div>
              
              </div>
        </div>
      </div>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => dispatch({
      type: 'SET_AUTH',
      authDone: data
    })
  }
}

export default connect(undefined, mapDispatchToProps)(App)
