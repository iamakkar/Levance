import React, {useState} from 'react'
import './Main.css'
import {Parallax, Background} from 'react-parallax'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2'
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const options = [
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Fiitness', label: 'Strawrry' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Food', label: 'Food' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Tech', label: 'Tech' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Organic', label: 'Organic' },
    { value: 'Health', label: 'Health' },
  ]

const animatedComponents = makeAnimated();

function App() {

    const history = useHistory();
    const [base, setBase] = useState(false);
    const [validemail, setValidemail] = useState(true)
    const [validinsta, setValidinsta] = useState(true)
    const [code, setCode] = useState("+91");
    const [detail, setDetail] = useState({
        FullName: "",
        Email: "",
        Phone: "",
        Gender: "",
        DOB: "",
        State: "",
        City: "",
        Category: [],
        Instagram: "",
        Youtube: ""
    })

    const handleNext = () => {
        if(!validemail) return Swal.fire({
            title: 'Invalid Email',
            text: 'Please enter a valid email id',
            icon: 'warning',
            confirmButtonText: 'Okay'
        })
        setBase(true)
    }

    const handleBack = () => {
        setBase(false)
    }

    const handleSubmit = async () => {
        if(detail.FullName === "" || detail.Email === "" || detail.Phone === "" || detail.Gender === "" || detail.DOB === "" || detail.State === "" || detail.State === "--select--" || detail.City === "" || detail.Category.length === 0) {
            return Swal.fire({
                title: 'Empty Fields',
                text: 'Please fill all the fields with red asterisk',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        if(!validemail) return Swal.fire({
            title: 'Invalid Email',
            text: 'Please enter a valid email id',
            icon: 'warning',
            confirmButtonText: 'Okay'
        })
        if(!validinsta) return Swal.fire({
            title: 'Invalid Instagram Username',
            text: 'Please enter a valid instagram username',
            icon: 'warning',
            confirmButtonText: 'Okay'
        })
        if(detail.Instagram === "" && detail.Youtube === "") {
            return Swal.fire({
                title: 'No Social Media',
                text: 'Please provide atleast 1 social media handle',
                icon: 'warning',
                confirmButtonText: 'Okay'
            })
        }
        await setDetail({...detail, Phone: `${code} ${detail.Phone}`})
        console.log(detail)
        axios.post('https://levance.herokuapp.com/registerinfluencer', {...detail, Phone: `${code} ${detail.Phone}`}).then(res => {
            const status = res.status;
            if(status === 200) {
                return Swal.fire({
                    title: 'Done!',
                    text: 'Your information is with us. We wll contact you soon!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
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
        }).then(setDetail({FullName: "",
        Email: "",
        Phone: "",
        Gender: "",
        DOB: "",
        State: "",
        City: "",
        Category: [],
        Instagram: "",
        Youtube: ""})).then(() => history.push('/'))
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidemail(re.test(String(email).toLowerCase()));
    }

    function validateInstagram(insta) {
        const re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        setValidinsta(re.test(String(insta).toLowerCase()));
    }

    const handleEmail = (e) => {
        setDetail({...detail, Email: e.target.value});
        validateEmail(e.target.value)
    }

    const handleInstagram = (e) => {
        setDetail({...detail, Instagram: e.target.value})
        validateInstagram(e.target.value)
    }

    const handleCategory = (e) => {
        let x = [];
        x = e.map(val => val.value)
        if(x.length <= 3 && x.length >= 0) {
            setDetail({...detail, Category: x})
        } else {
            e.pop();
            return Swal.fire({
                title: 'Stop!',
                text: 'You cannot add more than 3 categories',
                icon: 'info',
                confirmButtonText: 'Okay'
            })
        }
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
                <span>Category<sup style={{color: 'red'}} >*</sup></span>
                {/* <select defaultValue="--select--" id="category" value={detail.Category} onChange={(e) => setDetail({...detail, Category: e.target.value})} >
                        <option value="--select--" >--select--</option>
                        <option value="A" >A</option>
                        <option value="B" >B</option>
                        <option value="c" >c</option>
                </select> */}
                <Select className="infl-form-cmpt-cat" isMulti components={animatedComponents} options={options} onChange={(e) => handleCategory(e)} />
                </div>
                <br/>
                <div className="infl-form-cmpt" >
                <span>Instagram Handle</span>
                <input id={!validinsta ? "infl-inpt-err" : "y"} type="text" value={detail.Instagram} onChange={(e) => handleInstagram(e)} />
                </div>
                {!validinsta && <span className="infl-err" >Please enter a valid instagram username</span>}
                <br/>
                <div className="infl-form-cmpt" >
                    <span>Youtube Handle</span>
                    <input id="youtube" type="text" value={detail.Youtube} onChange={(e) => setDetail({...detail, Youtube: e.target.value})} />
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
                    <input type="text" value={detail.FullName} onChange={(e) => setDetail({...detail, FullName: e.target.value})} />
                </div>
                <br/>
                <div className="infl-form-cmpt" >
                    <span>Email-Id<sup style={{color: 'red'}} >*</sup></span>
                    <input type="email" id={!validemail ? "infl-inpt-err" : "x"} value={detail.Email} onChange={(e) => handleEmail(e)} />
                </div>
                {!validemail && <span className="infl-err" >Please enter a valid email id</span>}
                <br/>
                <div className="infl-form-cmpt" >
                    <span>Phone<sup style={{color: 'red'}} >*</sup></span><br/>
                    <div>
                    <input id="countrycode" type="tel" defaultValue="+91" value={code} onChange={(e) => setCode(e.target.value)} />{'-'}
                    <input id="phone" type="tel" value={detail.Phone} onChange={(e) => setDetail({...detail, Phone: e.target.value})} />
                    </div>
                </div>
                <br/>
            </div>
            <div className="infl-form">
            <h2 id="blank" >&#8203;</h2><br/>
            <div className="infl-form-cmpt" >
                    <span>Gender<sup style={{color: 'red'}} >*</sup></span>
                    <span>Male</span><input type="radio" id="male" name="gender" value={"male"} checked={detail.Gender === "male"} onChange={(e) => setDetail({...detail, Gender: e.target.value})} />
                    
                    <span>Female</span><input type="radio" id="female" name="gender" value="female" checked={detail.Gender === "female"} onChange={(e) => setDetail({...detail, Gender: e.target.value})} />
                    
                    <span>Other</span><input type="radio" id="other" name="gender" value="other" checked={detail.Gender === "other"} onChange={(e) => setDetail({...detail, Gender: e.target.value})} />
            </div>
            <br/>
            <div className="infl-form-cmpt" >
                <span>Date of Birth<sup style={{color: 'red'}} >*</sup></span>
                <input id="date" type="date" value={detail.DOB} onChange={(e) => setDetail({...detail, DOB: e.target.value})} />
            </div>
                <br/>
                <div className="infl-form-cmpt" >
                    <span>State<sup style={{color: 'red'}} >*</sup></span>
                    <select defaultValue="--select--" id="state" value={detail.State} onChange={(e) => setDetail({...detail, State: e.target.value})} >
                        <option value="--select--" >--select--</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>
                <br/>
                <div className="infl-form-cmpt" >
                    <span>City<sup style={{color: 'red'}} >*</sup></span>
                    <input type="text" value={detail.City} onChange={(e) => setDetail({...detail, City: e.target.value})} />
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