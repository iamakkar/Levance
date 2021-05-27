import React, {useState} from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'

function App() {
    const [base, setBase] = useState(false);
    const [detail, setDetail] = useState({
        FullName: "",
        Email: "",
        Phone: "",
        Gender: "",
        DOB: "",
        State: "",
        City: "",
        Niche: "",
        Instagram: "",
        Youtube: ""
    })

    const handleNext = () => {
        setBase(true)
    }

    const handleBack = () => {
        setBase(false)
    }

    const handleSubmit = () => {
        console.log("l")
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const FullName = (e) => {
        setDetail({...detail, FullName: e.target.value})
        console.log(detail)
    } 



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
    {base ? <>
        <div className="infl-form-cont" id="social">
            <div className="infl-form" id="social" >
                <h2>Let's Connect Socially</h2><br/>
                <div className="infl-form-cmpt" >
                <span>Niche<sup style={{color: 'red'}} >*</sup></span>
                <input id="niche" type="text" value={detail.Niche} />
                </div>
                <br/>
                <div className="infl-form-cmpt" >
                <span>Instagram Handle</span>
                <input id="instagram" type="text" />
                </div>
                <br/>
                <div className="infl-form-cmpt" >
                    <span>Youtube Handle</span>
                    <input id="youtube" type="text" />
                </div>
                <br/>
                <div className="infl-form-sub"  >
                <button style={{marginRight: 5}} className="infl-form-btn" onClick={() => handleBack()} >← Back</button>
                <button className="brnd-form-btn" onClick={() => handleSubmit()} >Submit</button>
                </div>
                <br/>
            </div>
            </div><br/>
            </> : 
            <>
            <div className="infl-form-cont">
            <div className="infl-form" >
                <h2>Fill the FormI</h2><br/>
                <div className="infl-form-cmpt" >
                    <span>Full Name<sup style={{color: 'red'}} >*</sup></span>
                    <input value={detail.FullName} type="text" onChange={(e) => FullName(e)} />
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
                <button className="infl-form-btn" onClick={() => handleNext()} >Next →</button>
            </div>
            <br/>
            </>
            }
    
        </>
    )
}

export default App;