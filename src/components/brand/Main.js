import React, {useState} from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import ReactLoading from 'react-loading';

function App() {

    const history = useHistory();

    const [loading, setisLoading] = useState(false);
    const [detail, setDetail] = useState({
        FullName: "",
        Email: "",
        Brand: "",
        Phone: "",
        Website: "",
        Budget: null,
        Reference: "",
        Comments: "",
    })

    const handleSubmit = () => {
        if(detail.Budget === "--select--") detail.Budget = null
        if(detail.FullName === "" || detail.Email === "" || detail.Brand === "" || detail.Phone === "" || detail.Website === "") {
            return Swal.fire({
                title: 'Empty Fields',
                text: 'Please fill all the fields with red asterisk',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if(detail.Phone.length > 0 && detail.Phone.length < 10) {
            return Swal.fire({
                title: 'Invalid Phone Number',
                text: 'Phone number should be of 10 digits',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        setisLoading(true);
        axios.post('https://levance.herokuapp.com/registerbrand', detail)
        .then(res => {
            setisLoading(false);
            const status = res.status;
            console.log(res)
            if(status === 200) {
                return Swal.fire({
                    title: 'Done!',
                    text: 'We will contact you ASAP',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                })
            }
            else {
                return Swal.fire({
                    title: 'Oops!',
                    text: `${res.error}`,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }
        }).then(() => history.push('/'))
    }

    return (
        <>
        {window.innerWidth < 768 ? <img alt="err" src="/assets/brand.png" className="main-img" /> : 
            <Parallax strength={300}>
            <Background className="custom-bg">
            <img alt="err" src={window.innerWidth > 768 ? "/assets/brand.png" : "/assets/brandc.png"} /> 
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
        }
    {loading ? <>
        <div className="brnd-load" >
        <ReactLoading type={"bars"} color={"#4c4b77"} height={window.innerWidth > 768 ? '25%' : '50%'} width={window.innerWidth > 768 ? '25%' : '50%'} />
        <h4>Collecting all your details...</h4>
        </div>
    </> : <>
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
            <span>Budget</span>
            {/* <select defaultValue="--select--" value={detail.Budget} id="budget" onChange={(e) => setDetail({...detail, Budget: e.target.value})} >
                <option value="--select--" >--select--</option>
                <option value={1} >1</option>
                <option value={2} >2</option>
                <option value={3} >3</option>
            </select> */}
            <input value={detail.Budget} type="text" onChange={(e) => setDetail({...detail, Budget: e.target.value})} />
        </div>
        <br/>
        <div className="brnd-form-cmpt" >
            <span>Reference</span>
            <input value={detail.Reference} type="url" onChange={(e) => setDetail({...detail, Reference: e.target.value})} />
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
        <h2>Chat with us on  WhatsApp</h2><br/>
        <a href="https://wa.me/+917082811778" ><img src="/assets/qrcode.svg" alt="err" /></a>
        <span >scan/tap the code</span>
    </div>
    </div>
    <br/>
    </>}
    </>
    )
}

export default App;