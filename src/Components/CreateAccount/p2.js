import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Switch from "react-switch";
import "./p2.css";
import { connect } from 'react-redux';
import Navbar from '../Home/navbar';

function App(props) {
    const [checked, setChecked] = useState(false);

    const handlechange = () => {
        setChecked(!checked)
    }

    const history = useHistory()

    const Next = async () => {
        await props.setCollege(checked);
        history.push('/createaccount3')
    }

    return (<>
    
  <Navbar/>
        <div className="appcreateaccount1 container-fluid">
            <div className="row">
                <div className="col s12 m12">
                    <div className="wrappercreateaccount1">
                        <h1>Sign Up</h1>
                        <h4>Are you in college ?</h4>
                        <Switch onChange={handlechange} checked={checked} />
                        <div style={{ marginTop: 5 }}>
                            <span style={{ fontWeight: 'bold' }} >{checked ? 'Yes' : 'No'}</span>
                        </div>
                        <button className="buttn" onClick={Next} >Next</button>
                        <span>or</span>
                        <div className="afteror">
                            <Link to={'/signin'} className="new">Already have an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
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

export default connect(undefined, mapDispatchToProps)(App);