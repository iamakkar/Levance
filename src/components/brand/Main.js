import React from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'

function App() {
    return (
        <>
        {/* <img src="/assets/brand.png" /> */}
        <Parallax strength={500}>
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
    <div className="brnd-form-cont" >
    <div className="brnd-form" >
        <h2>Fill the Form</h2><br/>
        <div className="brnd-form-cmpt" >
            <span>Full Name<sup style={{color: 'red'}} >*</sup></span>
            <input type="text" />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Email-Id<sup style={{color: 'red'}} >*</sup></span>
            <input type="email" />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Phone<sup style={{color: 'red'}} >*</sup></span>
            <input type="tel" />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Brand<sup style={{color: 'red'}} >*</sup></span>
            <input type="text" />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Website/Social Meida<sup style={{color: 'red'}} >*</sup></span>
            <input type="url" />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Budget<sup style={{color: 'red'}} >*</sup></span>
            <select defaultValue="A" id="budget" >
                <option value="A" >A</option>
                <option value="B" >B</option>
                <option value="c" >c</option>
            </select>
        </div>
        <br/>  
        <div className="brnd-form-cmpt" >
            <span>Comments</span>
            <textarea />
        </div>
        <br/>
        <div className="brnd-form-sub"  >
        <button className="brnd-form-btn" >Submit</button>
        </div>
        <br/>
    </div>
    <div className="brnd-line" ></div>
    <div className="brnd-qr" >
        <h2>Chat with us</h2><br/>
        <a href="https://wa.me/+917082811778" ><img src="/assets/qrcode.svg" alt="err" /></a>
        <span >scan/tap the code</span>
    </div>
    </div>
    <br/>
        </>
    )
}

export default App;