import React from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'

function App() {
    return (
        <>
        {/* <img src="/assets/brand.png" /> */}
        <Parallax strength={300}>
      <Background className="custom-bg">
      <img alt="err" src="/assets/brand.png" /> 
      </Background>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div> 
    </Parallax>
    <div className="infl-form-cont">
    <div className="infl-form" >
        <h2>Fill the FormI</h2><br/>
        <div className="infl-form-cmpt" >
            <span>Full Name<sup style={{color: 'red'}} >*</sup></span>
            <input type="text" />
        </div>
        <br/>
        <div className="infl-form-cmpt" >
            <span>Email-Id<sup style={{color: 'red'}} >*</sup></span>
            <input type="email" />
        </div>
        <br/>
        <div className="infl-form-cmpt" >
            <span>Phone<sup style={{color: 'red'}} >*</sup></span><br/>
            <div>
            <input id="countrycode" type="tel" defaultValue="+91" />{'-'}
            <input id="phone" type="tel" />
            </div>
        </div>
        <br/>
    </div>
    <div className="infl-form">
    <h2 id="blank" >&#8203;</h2><br/>
    <div className="infl-form-cmpt" >
            <span>Gender<sup style={{color: 'red'}} >*</sup></span>
            <span>Male</span><input type="radio" id="male" name="gender" value="male"/>
            
            <span>Female</span><input type="radio" id="female" name="gender" value="female"/>
            
            <span>Other</span><input type="radio" id="other" name="gender" value="other"/>
    </div>
    <br/>
    <div className="infl-form-cmpt" >
        <span>Date of Birth<sup style={{color: 'red'}} >*</sup></span>
        <input id="date" type="date" />
    </div>
        <br/>
        <div className="infl-form-cmpt" >
            <span>State<sup style={{color: 'red'}} >*</sup></span>
            <select defaultValue="A" id="budget" >
                <option value="A" >A</option>
                <option value="B" >B</option>
                <option value="c" >c</option>
            </select>
        </div>
        <br/>
        <div className="infl-form-cmpt" >
            <span>City<sup style={{color: 'red'}} >*</sup></span>
            <input type="text" />
        </div>
        <br/>
    </div>
    </div>
    <br/>
    <div className="infl-form-sub"  >
        <button className="infl-form-btn" >Next →</button>
        </div>
        <br/>
        </>
    )
}

export default App;