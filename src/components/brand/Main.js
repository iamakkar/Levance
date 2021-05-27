import React, {useState} from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'

function App() {

    const [detail, setDetail] = useState({
        FullName: "",
        Email: "",
        Brand: "",
        Phone: "",
        Website: "",
        Budget: null,
        Comments: "", 
    })

    const handleSubmit = () => {
        if(detail.Budget === "--select--") detail.Budget = null
        console.log(detail)
    }

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
            <input value={detail.FullName} type="text" onChange={(e) => setDetail({...detail, FullName: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Email-Id<sup style={{color: 'red'}} >*</sup></span>
            <input value={detail.Email} type="email" onChange={(e) => setDetail({...detail, Email: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Phone<sup style={{color: 'red'}} >*</sup></span>
            <input value={detail.Phone} type="tel" onChange={(e) => setDetail({...detail, Phone: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Brand<sup style={{color: 'red'}} >*</sup></span>
            <input value={detail.Brand} type="text" onChange={(e) => setDetail({...detail, Brand: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Website/Social Media<sup style={{color: 'red'}} >*</sup></span>
            <input value={detail.Website} type="url" onChange={(e) => setDetail({...detail, Website: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Budget<sup style={{color: 'red'}} >*</sup></span>
            <select defaultValue="--select--" value={detail.Budget} id="budget" onChange={(e) => setDetail({...detail, Budget: e.target.value})} >
                <option value="--select--" >--select--</option>
                <option value={1} >1</option>
                <option value={2} >2</option>
                <option value={3} >3</option>
            </select>
        </div>
        <br/>  
        <div className="brnd-form-cmpt" >
            <span>Comments</span>
            <textarea value={detail.Comments} onChange={(e) => setDetail({...detail, Comments: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-sub"  >
        <button className="brnd-form-btn" onClick={() => handleSubmit()} >Submit</button>
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