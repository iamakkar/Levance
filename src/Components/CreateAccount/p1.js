import React, { useState } from "react";
import "./p1.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import CityIcon from '@material-ui/icons/LocationCity';
import CircleIcon from '@material-ui/icons/CheckCircle';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import Navbar from '../Home/navbar';
import { sha256 } from "js-sha256";
import M from 'materialize-css';
import axios from 'axios'
import { BASE_URL } from "../../Config/config.json"
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const validate = RegExp(/^[.a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);

function App(props) {
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const [valid, setValid] = useState(true);
  const [validphone, setValidphone] = useState(true);
  const [verifyotp, setVerifyotp] = useState(false)
  const [hashotpclient, setHashotpclient] = useState("")
  const [hashotpserver, setHashotpserver] = useState("")
  const [token, setToken] = useState("")
  const [waitotp, setwaitotp] = useState(false)

  const history = useHistory();

  const EmailOtpsent = () => {
    if (!valid) {
      return Swal.fire({
        title: 'Check your e-mail',
        text: 'Please fill a valid email!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
    if (!props.email)
      return Swal.fire({
        title: 'Details Missing',
        text: 'Please fill your email ID',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    setLoader(true)
    try {
      axios({
        url: BASE_URL + "/verifyotp",
        method: "POST",
        data: { "email": props.email }
      }).then(res => {
        setLoader(false)
        if (res.data.error)
          return M.toast({ html: res.data.error })
        setToken(res.data.token)
        setHashotpserver(res.data.hash);
        setwaitotp(true)
        M.toast({ html: "OTP Sent" })
      })
    }
    catch (err) {

      setLoader(false)
    }
  }
  const createhash = (e) => {

    setHashotpclient(sha256(e.target.value))
  }
  const checkHash = () => {
    setLoader2(true)
    if (hashotpserver === hashotpclient) {
      axios({
        url: BASE_URL + "/otpverify",
        method: "POST",
        data: {
          token: token
        }
      }).then(res => {
        setLoader2(false)
        if (res.data.error) {
          M.toast(res.data.error)
        }
        else {
          setVerifyotp(true)
          M.toast({ html: "OTP verified successfully" })
        }
      })
    }
    else {
      M.toast({ html: "Wrong OTP" })
      setLoader2(false)
    }
  }


  const Next = () => {

    if (!valid) {
      return Swal.fire({
        title: 'Check your e-mail',
        text: 'Please fill a valid email!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }

    if (!validphone) {
      return Swal.fire({
        title: 'Check your phone number',
        text: 'Please fill a valid phone number!',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }

    if (props.fullName === '' || props.email === '' || props.phone === '' || props.city === '' || props.gender === '') {
      return Swal.fire({
        title: 'Details Missing',
        text: 'Please fill all the details',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    } else {
      history.push('/createaccount2')
    }
  }

  const emailVerify = (e) => {
    // setValid(validate.test(e.target.value));

    setValid(true)
  }

  const phoneVerify = (e) => {
    setValidphone(false);
    let x = e.target.value
    if (x.length == 10) {
      setValidphone(true);
    }
  }

  return (
    <>
      <Navbar />
      <div className="appcreateaccount1 container-fluid">
        <div className="row" style={{ marginBottom: "0" }}>
          <div className="col m12 s12">
            <div className="wrappercreateaccount1">
              <h1 style={{ marginTop: "10px" }}>Sign Up</h1>

              {!waitotp && <p>Enter Email</p>}
              {!waitotp && <div className={valid || props.email === "" ? "con-inputcreateaccount1" : "invalid"}>
                <input placeholder="Email" type="text" id="otpSentBox"
                  onChange={(val) => props.setEmail(val.target.value.trim().toLowerCase())}
                  onBlur={(val) => { emailVerify(); }}
                  onKeyPress={
                    async (e) => {
                      if (e.key == "Enter") {
                        await document.getElementById("otpSentBox").blur();
                        document.getElementById("otpSentButton").click();
                      }
                    }
                  } />
                <i className="icon">
                  <EmailIcon />
                </i>
                <div className="bg"></div>
              </div>}


              {loader && <div class="preloader-wrapper small active" style={{ marginTop: "10px" }}>
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>}

              {!waitotp && <button className="buttn" onClick={EmailOtpsent} id="otpSentButton">Send OTP</button>}
              {waitotp && !verifyotp && <p>Otp sent to<span style={{ fontWeight: 700, color: "#4c4a79" }}> {props.email}</span></p>}
              {waitotp && !verifyotp && <div className="con-inputcreateaccount1">
                <input placeholder="OTP" type="password" disabled={verifyotp} id="otpEnterBox" onKeyPress={(e) => { if (e.key == "Enter") { document.getElementById("otpVerifyButton").click(); document.getElementById("otpEnterBox").blur() } }} onChange={(e) => { createhash(e) }} />
                <i className="icon">
                  <VpnKeyIcon />
                </i>
                <div className="bg"></div>
              </div>}
              {waitotp && !verifyotp && <p style={{ color: "#3073e6" }} class="resendotp" onClick={EmailOtpsent}>Resend Otp</p>}
              {waitotp && !verifyotp && <p>(If email not found, then check spam or junk emails)</p>}
              {loader2 && <div class="preloader-wrapper small active" style={{ marginTop: "10px" }}>
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>}

              {waitotp && !verifyotp && <button className="buttn" id="otpVerifyButton" onClick={checkHash} >Verify Otp</button>}






              {verifyotp && <><div className="con-inputcreateaccount1">
                <input placeholder="Full Name" type="text" id="fullName" onBlur={(val) => props.setName(val.target.value)} onKeyPress={(e) => { if (e.key == "Enter") document.getElementById("phone").focus() }} />
                <i className="icon">
                  <PersonIcon />
                </i>
                <div className="bg"></div>
              </div>



                <div className={validphone ? "con-inputcreateaccount1" : 'invalid'} >
                  <input placeholder="Phone Number" type="tel" id="phone" onBlur={(val) => props.setPhone(val.target.value)} onChange={phoneVerify} onKeyPress={(e) => { if (e.key == "Enter") document.getElementById("city").focus() }} />
                  <i className="icon">
                    <PhoneIcon />
                  </i>
                  <div className="bg"></div>
                </div>

                <div className="con-inputcreateaccount1">

                  <select name="user[location]" class="city" id="city" required="true" onBlur={(val) => props.setCity(val.target.value)} >

                    <option value="">Select City</option>
                    <optgroup label="--- Top Cities ---">
                      <option value="delhi">Delhi</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="noida">Noida</option>
                      <option value="gurugram">Gurugram</option>
                      <option value="ghaziabad">Ghaziabad</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="pune">Pune</option>
                      <option value="chandigarh">Chandigarh</option>
                      <option value="calcutta">Calcutta</option>
                    </optgroup>
                    <optgroup label="--- All Cities ---">
                      <option value="abbenda">Abbenda</option>
                      <option value="abbotganj">Abbotganj</option>
                      <option value="abhayapuri">Abhayapuri</option>
                      <option value="abhimanpur">Abhimanpur</option>
                      <option value="abohar">Abohar</option>
                      <option value="abrama">Abrama</option>
                      <option value="abu road">Abu road</option>
                      <option value="abusar">Abusar</option>
                      <option value="achampet">Achampet</option>
                      <option value="acharapakkam">Acharapakkam</option>
                      <option value="adabala">Adabala</option>
                      <option value="adaiyur">Adaiyur</option>
                      <option value="adampur">Adampur</option>
                      <option value="adamwal">Adamwal</option>
                      <option value="adanur">Adanur</option>
                      <option value="adasi">Adasi</option>
                      <option value="adaun">Adaun</option>
                      <option value="addanki">Addanki</option>
                      <option value="adgaon">Adgaon</option>
                      <option value="adhartal">Adhartal</option>
                      <option value="adigoppula">Adigoppula</option>
                      <option value="adilabad">Adilabad</option>
                      <option value="adirampattinam">Adirampattinam</option>
                      <option value="adugodi">Adugodi</option>
                      <option value="aduka">Aduka</option>
                      <option value="adur">Adur</option>
                      <option value="adyar">Adyar</option>
                      <option value="afzalgarh">Afzalgarh</option>
                      <option value="agar">Agar</option>
                      <option value="agara">Agara</option>
                      <option value="agaram">Agaram</option>
                      <option value="agartala">Agartala</option>
                      <option value="aghapur">Aghapur</option>
                      <option value="agolai">Agolai</option>
                      <option value="agonda">Agonda</option>
                      <option value="agra">Agra</option>
                      <option value="agri">Agri</option>
                      <option value="agumbe">Agumbe</option>
                      <option value="aharwan">Aharwan</option>
                      <option value="ahda">Ahda</option>
                      <option value="ahesa">Ahesa</option>
                      <option value="ahirka">Ahirka</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="ahmednagar">Ahmednagar</option>
                      <option value="ahraula">Ahraula</option>
                      <option value="ahulana">Ahulana</option>
                      <option value="ahwa">Ahwa</option>
                      <option value="airani">Airani</option>
                      <option value="airoli">Airoli</option>
                      <option value="aizawl">Aizawl</option>
                      <option value="ajari">Ajari</option>
                      <option value="ajitwal">Ajitwal</option>
                      <option value="ajjanahalli">Ajjanahalli</option>
                      <option value="ajmer">Ajmer</option>
                      <option value="ajnala">Ajnala</option>
                      <option value="akathiyur">Akathiyur</option>
                      <option value="akbarpur">Akbarpur</option>
                      <option value="akha">Akha</option>
                      <option value="akhepura">Akhepura</option>
                      <option value="akhera">Akhera</option>
                      <option value="akhop">Akhop</option>
                      <option value="akividu">Akividu</option>
                      <option value="akkammapettai">Akkammapettai</option>
                      <option value="akkayyapalem">Akkayyapalem</option>
                      <option value="akola">Akola</option>
                      <option value="akurdi">Akurdi</option>
                      <option value="alagumalai">Alagumalai</option>
                      <option value="alahdadpur">Alahdadpur</option>
                      <option value="alakode">Alakode</option>
                      <option value="alamgir">Alamgir</option>
                      <option value="alampadi">Alampadi</option>
                      <option value="alamsahi">Alamsahi</option>
                      <option value="alanallur">Alanallur</option>
                      <option value="alangulam">Alangulam</option>
                      <option value="alapadu">Alapadu</option>
                      <option value="alappuzha">Alappuzha</option>
                      <option value="alapur">Alapur</option>
                      <option value="alathur">Alathur</option>
                      <option value="aldhal">Aldhal</option>
                      <option value="aldona">Aldona</option>
                      <option value="alegaon">Alegaon</option>
                      <option value="aliabad">Aliabad</option>
                      <option value="alibag">Alibag</option>
                      <option value="aligarh">Aligarh</option>
                      <option value="alipur">Alipur</option>
                      <option value="allachaur">Allachaur</option>
                      <option value="allahabad">Allahabad</option>
                      <option value="allamadugu">Allamadugu</option>
                      <option value="allowal">Allowal</option>
                      <option value="almora">Almora</option>
                      <option value="alur">Alur</option>
                      <option value="aluru">Aluru</option>
                      <option value="aluva">Aluva</option>
                      <option value="alwar">Alwar</option>
                      <option value="amalapuram">Amalapuram</option>
                      <option value="amalsad">Amalsad</option>
                      <option value="amaram">Amaram</option>
                      <option value="amaravathy">Amaravathy</option>
                      <option value="amaravati">Amaravati</option>
                      <option value="amarnagar">Amarnagar</option>
                      <option value="amarpur">Amarpur</option>
                      <option value="amarwasi">Amarwasi</option>
                      <option value="amb">Amb</option>
                      <option value="ambah">Ambah</option>
                      <option value="ambajipeta">Ambajipeta</option>
                      <option value="ambajogai">Ambajogai</option>
                      <option value="ambala">Ambala</option>
                      <option value="ambarnath">Ambarnath</option>
                      <option value="ambassa">Ambassa</option>
                      <option value="ambattur">Ambattur</option>
                      <option value="ambelim">Ambelim</option>
                      <option value="amber">Amber</option>
                      <option value="amberpet">Amberpet</option>
                      <option value="ambheti">Ambheti</option>
                      <option value="ambikapur">Ambikapur</option>
                      <option value="amblamogaru">Amblamogaru</option>
                      <option value="amboli">Amboli</option>
                      <option value="ambur">Ambur</option>
                      <option value="amethi">Amethi</option>
                      <option value="amgachi">Amgachi</option>
                      <option value="amin">Amin</option>
                      <option value="amingaon">Amingaon</option>
                      <option value="amkui">Amkui</option>
                      <option value="amli">Amli</option>
                      <option value="amloh">Amloh</option>
                      <option value="ammapatti">Ammapatti</option>
                      <option value="amratala">Amratala</option>
                      <option value="amravati">Amravati</option>
                      <option value="amreli">Amreli</option>
                      <option value="amritsar">Amritsar</option>
                      <option value="amroha">Amroha</option>
                      <option value="amroli">Amroli</option>
                      <option value="amtala">Amtala</option>
                      <option value="amtur">Amtur</option>
                      <option value="anaiyampatti">Anaiyampatti</option>
                      <option value="anajpur">Anajpur</option>
                      <option value="anakkara">Anakkara</option>
                      <option value="anand">Anand</option>
                      <option value="anandpur">Anandpur</option>
                      <option value="anantapur">Anantapur</option>
                      <option value="anantapuram">Anantapuram</option>
                      <option value="anantnag">Anantnag</option>
                      <option value="anantpura">Anantpura</option>
                      <option value="anaparthy">Anaparthy</option>
                      <option value="anchal">Anchal</option>
                      <option value="andarsul">Andarsul</option>
                      <option value="andheri">Andheri</option>
                      <option value="andipalayam">Andipalayam</option>
                      <option value="andro">Andro</option>
                      <option value="anekal">Anekal</option>
                      <option value="anekallu">Anekallu</option>
                      <option value="angadipram">Angadipram</option>
                      <option value="angamali">Angamali</option>
                      <option value="angara">Angara</option>
                      <option value="angol">Angol</option>
                      <option value="angul">Angul</option>
                      <option value="anjad">Anjad</option>
                      <option value="anjar">Anjar</option>
                      <option value="anjehalli">Anjehalli</option>
                      <option value="anjuna">Anjuna</option>
                      <option value="ankireddipalli">Ankireddipalli</option>
                      <option value="ankleshwar">Ankleshwar</option>
                      <option value="annamanada">Annamanada</option>
                      <option value="anna nagar">Anna nagar</option>
                      <option value="annavaram">Annavaram</option>
                      <option value="anthiyur">Anthiyur</option>
                      <option value="apparaopalem">Apparaopalem</option>
                      <option value="apra">Apra</option>
                      <option value="apta">Apta</option>
                      <option value="arakkonam">Arakkonam</option>
                      <option value="arambagh">Arambagh</option>
                      <option value="arambakkam">Arambakkam</option>
                      <option value="aranarai">Aranarai</option>
                      <option value="arangaon">Arangaon</option>
                      <option value="aranmula">Aranmula</option>
                      <option value="araria">Araria</option>
                      <option value="arasangudi">Arasangudi</option>
                      <option value="arcot">Arcot</option>
                      <option value="ariyalur">Ariyalur</option>
                      <option value="arjunganj">Arjunganj</option>
                      <option value="arni">Arni</option>
                      <option value="aron">Aron</option>
                      <option value="aroor">Aroor</option>
                      <option value="arpora">Arpora</option>
                      <option value="arrah">Arrah</option>
                      <option value="arumanai">Arumanai</option>
                      <option value="arunachal">Arunachal</option>
                      <option value="aruppukkottai">Aruppukkottai</option>
                      <option value="arvi">Arvi</option>
                      <option value="arwal">Arwal</option>
                      <option value="arwara">Arwara</option>
                      <option value="asalatpur jarai">Asalatpur jarai</option>
                      <option value="asalwas">Asalwas</option>
                      <option value="asansol">Asansol</option>
                      <option value="asegaon">Asegaon</option>
                      <option value="ashok nagar">Ashok nagar</option>
                      <option value="ashta">Ashta</option>
                      <option value="ashtami">Ashtami</option>
                      <option value="ashti">Ashti</option>
                      <option value="asika">Asika</option>
                      <option value="aspur">Aspur</option>
                      <option value="assagao">Assagao</option>
                      <option value="assi">Assi</option>
                      <option value="asundi">Asundi</option>
                      <option value="aswari">Aswari</option>
                      <option value="ateli mandi">Ateli mandi</option>
                      <option value="athalur">Athalur</option>
                      <option value="athani">Athani</option>
                      <option value="atmakur">Atmakur</option>
                      <option value="attabira">Attabira</option>
                      <option value="attimanjeri">Attimanjeri</option>
                      <option value="attingal">Attingal</option>
                      <option value="attur">Attur</option>
                      <option value="auli">Auli</option>
                      <option value="aundh">Aundh</option>
                      <option value="auraiya">Auraiya</option>
                      <option value="aurangabad">Aurangabad</option>
                      <option value="auroville">Auroville</option>
                      <option value="avadi">Avadi</option>
                      <option value="avala">Avala</option>
                      <option value="avanigadda">Avanigadda</option>
                      <option value="avinashi">Avinashi</option>
                      <option value="awajpur">Awajpur</option>
                      <option value="ayodhya">Ayodhya</option>
                      <option value="azamgarh">Azamgarh</option>
                      <option value="azhikkal">Azhikkal</option>
                      <option value="azhiyur">Azhiyur</option>
                      <option value="azimganj">Azimganj</option>
                      <option value="babail">Babail</option>
                      <option value="babarpur">Babarpur</option>
                      <option value="babhulgaon">Babhulgaon</option>
                      <option value="babina">Babina</option>
                      <option value="babnapur">Babnapur</option>
                      <option value="bachra">Bachra</option>
                      <option value="badabar">Badabar</option>
                      <option value="baddi">Baddi</option>
                      <option value="badgam">Badgam</option>
                      <option value="badhawar">Badhawar</option>
                      <option value="badheri ghoghu">Badheri ghoghu</option>
                      <option value="badlapur">Badlapur</option>
                      <option value="badli">Badli</option>
                      <option value="badvel">Badvel</option>
                      <option value="bagalkot">Bagalkot</option>
                      <option value="bagasra">Bagasra</option>
                      <option value="bagdogra">Bagdogra</option>
                      <option value="baghbardia">Baghbardia</option>
                      <option value="baghera">Baghera</option>
                      <option value="bagli">Bagli</option>
                      <option value="bagpat">Bagpat</option>
                      <option value="bagru">Bagru</option>
                      <option value="bagthala">Bagthala</option>
                      <option value="bagula">Bagula</option>
                      <option value="bah">Bah</option>
                      <option value="bahadurgarh">Bahadurgarh</option>
                      <option value="bahal">Bahal</option>
                      <option value="baharampur">Baharampur</option>
                      <option value="baharwal">Baharwal</option>
                      <option value="baheri">Baheri</option>
                      <option value="bahjoi">Bahjoi</option>
                      <option value="bahraich">Bahraich</option>
                      <option value="baidyabati">Baidyabati</option>
                      <option value="baijalpur">Baijalpur</option>
                      <option value="baijnath">Baijnath</option>
                      <option value="bainsi">Bainsi</option>
                      <option value="bairai">Bairai</option>
                      <option value="bairasar bara">Bairasar bara</option>
                      <option value="bajauta">Bajauta</option>
                      <option value="baj baj">Baj baj</option>
                      <option value="bajoli">Bajoli</option>
                      <option value="bakali">Bakali</option>
                      <option value="balaghat">Balaghat</option>
                      <option value="balamau">Balamau</option>
                      <option value="balangir">Balangir</option>
                      <option value="balarampur">Balarampur</option>
                      <option value="balasore">Balasore</option>
                      <option value="balgeri">Balgeri</option>
                      <option value="bali">Bali</option>
                      <option value="balicha">Balicha</option>
                      <option value="ballabgarh">Ballabgarh</option>
                      <option value="ballia">Ballia</option>
                      <option value="ballur">Ballur</option>
                      <option value="ballygunge">Ballygunge</option>
                      <option value="balod">Balod</option>
                      <option value="baloda bazar">Baloda bazar</option>
                      <option value="balotra">Balotra</option>
                      <option value="balu">Balu</option>
                      <option value="balurghat">Balurghat</option>
                      <option value="bamla">Bamla</option>
                      <option value="bamori">Bamori</option>
                      <option value="bamrauli katara">Bamrauli katara</option>
                      <option value="banapur">Banapur</option>
                      <option value="banapura">Banapura</option>
                      <option value="banarhat">Banarhat</option>
                      <option value="banaswadi">Banaswadi</option>
                      <option value="banda">Banda</option>
                      <option value="bandarupalle">Bandarupalle</option>
                      <option value="bandikui">Bandikui</option>
                      <option value="bandra">Bandra</option>
                      <option value="banga">Banga</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="bangaon">Bangaon</option>
                      <option value="bangarpet">Bangarpet</option>
                      <option value="banhatti">Banhatti</option>
                      <option value="bani">Bani</option>
                      <option value="banihal">Banihal</option>
                      <option value="banji">Banji</option>
                      <option value="banka">Banka</option>
                      <option value="bankipore">Bankipore</option>
                      <option value="bankura">Bankura</option>
                      <option value="bansbaria">Bansbaria</option>
                      <option value="bansur">Bansur</option>
                      <option value="banswara">Banswara</option>
                      <option value="bapatla">Bapatla</option>
                      <option value="bar">Bar</option>
                      <option value="barabanki">Barabanki</option>
                      <option value="baragaon">Baragaon</option>
                      <option value="barakpur">Barakpur</option>
                      <option value="baramati">Baramati</option>
                      <option value="baran">Baran</option>
                      <option value="bararta">Bararta</option>
                      <option value="barasat">Barasat</option>
                      <option value="baraut">Baraut</option>
                      <option value="barbahal">Barbahal</option>
                      <option value="barbil">Barbil</option>
                      <option value="barddhaman">Barddhaman</option>
                      <option value="bardez">Bardez</option>
                      <option value="bardoli">Bardoli</option>
                      <option value="bareilly">Bareilly</option>
                      <option value="bareily">Bareily</option>
                      <option value="bargarh">Bargarh</option>
                      <option value="barhana">Barhana</option>
                      <option value="bari">Bari</option>
                      <option value="baripada">Baripada</option>
                      <option value="barjora">Barjora</option>
                      <option value="barkhedi">Barkhedi</option>
                      <option value="barmer">Barmer</option>
                      <option value="barnala">Barnala</option>
                      <option value="baroda">Baroda</option>
                      <option value="barpeta">Barpeta</option>
                      <option value="barsat">Barsat</option>
                      <option value="barsi takli">Barsi takli</option>
                      <option value="barud">Barud</option>
                      <option value="baruipara">Baruipara</option>
                      <option value="baruipur">Baruipur</option>
                      <option value="barwani">Barwani</option>
                      <option value="barwas">Barwas</option>
                      <option value="basanti">Basanti</option>
                      <option value="basavanagudi">Basavanagudi</option>
                      <option value="basi">Basi</option>
                      <option value="basti">Basti</option>
                      <option value="baswapur">Baswapur</option>
                      <option value="batala">Batala</option>
                      <option value="bathinda">Bathinda</option>
                      <option value="bathnaha">Bathnaha</option>
                      <option value="batra">Batra</option>
                      <option value="bawal">Bawal</option>
                      <option value="bayad">Bayad</option>
                      <option value="bayana">Bayana</option>
                      <option value="beas">Beas</option>
                      <option value="beawar">Beawar</option>
                      <option value="beed">Beed</option>
                      <option value="begampur">Begampur</option>
                      <option value="begunia">Begunia</option>
                      <option value="begusarai">Begusarai</option>
                      <option value="behala">Behala</option>
                      <option value="behror">Behror</option>
                      <option value="bela">Bela</option>
                      <option value="belapur">Belapur</option>
                      <option value="belavadi">Belavadi</option>
                      <option value="belda">Belda</option>
                      <option value="beldanga">Beldanga</option>
                      <option value="belgachia">Belgachia</option>
                      <option value="belgaum">Belgaum</option>
                      <option value="belladi">Belladi</option>
                      <option value="bellarpadi">Bellarpadi</option>
                      <option value="bellary">Bellary</option>
                      <option value="belmanna">Belmanna</option>
                      <option value="belonia">Belonia</option>
                      <option value="belur">Belur</option>
                      <option value="bemetara">Bemetara</option>
                      <option value="benaulim">Benaulim</option>
                      <option value="bengaluru">Bengaluru</option>
                      <option value="beraja">Beraja</option>
                      <option value="berasia">Berasia</option>
                      <option value="betim">Betim</option>
                      <option value="bettiah">Bettiah</option>
                      <option value="betul">Betul</option>
                      <option value="beypore">Beypore</option>
                      <option value="bhabhua">Bhabhua</option>
                      <option value="bhadarwah">Bhadarwah</option>
                      <option value="bhadohi">Bhadohi</option>
                      <option value="bhadrakh">Bhadrakh</option>
                      <option value="bhadravaram">Bhadravaram</option>
                      <option value="bhadreswar">Bhadreswar</option>
                      <option value="bhagalpur">Bhagalpur</option>
                      <option value="bhagowal">Bhagowal</option>
                      <option value="bhaisani islampur">Bhaisani islampur</option>
                      <option value="bhakli">Bhakli</option>
                      <option value="bhalki">Bhalki</option>
                      <option value="bhalta">Bhalta</option>
                      <option value="bhandara">Bhandara</option>
                      <option value="bhandup">Bhandup</option>
                      <option value="bhangar">Bhangar</option>
                      <option value="bhanjanagar">Bhanjanagar</option>
                      <option value="bharatgarh">Bharatgarh</option>
                      <option value="bharatpur">Bharatpur</option>
                      <option value="bharu">Bharu</option>
                      <option value="bharuch">Bharuch</option>
                      <option value="bhaskola">Bhaskola</option>
                      <option value="bhatkal">Bhatkal</option>
                      <option value="bhatwara">Bhatwara</option>
                      <option value="bhavani">Bhavani</option>
                      <option value="bhavnagar">Bhavnagar</option>
                      <option value="bhawan">Bhawan</option>
                      <option value="bhawani">Bhawani</option>
                      <option value="bhawanigarh">Bhawanigarh</option>
                      <option value="bhawar">Bhawar</option>
                      <option value="bhayandar">Bhayandar</option>
                      <option value="bhendsar">Bhendsar</option>
                      <option value="bhesan">Bhesan</option>
                      <option value="bheshi">Bheshi</option>
                      <option value="bhikhi">Bhikhi</option>
                      <option value="bhilai">Bhilai</option>
                      <option value="bhiloda">Bhiloda</option>
                      <option value="bhilwara">Bhilwara</option>
                      <option value="bhimavaram">Bhimavaram</option>
                      <option value="bhimtal">Bhimtal</option>
                      <option value="bhinmal">Bhinmal</option>
                      <option value="bhiwadi">Bhiwadi</option>
                      <option value="bhiwandi">Bhiwandi</option>
                      <option value="bhiwani">Bhiwani</option>
                      <option value="bhokardan">Bhokardan</option>
                      <option value="bhopal">Bhopal</option>
                      <option value="bhopura">Bhopura</option>
                      <option value="bhor">Bhor</option>
                      <option value="bhore">Bhore</option>
                      <option value="bhubaneshwar">Bhubaneshwar</option>
                      <option value="bhubaneswar">Bhubaneswar</option>
                      <option value="bhuj">Bhuj</option>
                      <option value="bhurkunda">Bhurkunda</option>
                      <option value="bhusaval">Bhusaval</option>
                      <option value="bidadi">Bidadi</option>
                      <option value="bidanasi">Bidanasi</option>
                      <option value="bidar">Bidar</option>
                      <option value="bidasar">Bidasar</option>
                      <option value="bihar sharif">Bihar sharif</option>
                      <option value="bijapur">Bijapur</option>
                      <option value="bijaura">Bijaura</option>
                      <option value="bijaynagar">Bijaynagar</option>
                      <option value="bijni">Bijni</option>
                      <option value="bikaner">Bikaner</option>
                      <option value="bilagi">Bilagi</option>
                      <option value="bilara">Bilara</option>
                      <option value="bilari">Bilari</option>
                      <option value="bilaspur">Bilaspur</option>
                      <option value="bilga">Bilga</option>
                      <option value="bilimora">Bilimora</option>
                      <option value="bindki">Bindki</option>
                      <option value="binnaguri">Binnaguri</option>
                      <option value="binpur">Binpur</option>
                      <option value="bishalgarh">Bishalgarh</option>
                      <option value="bishnupur">Bishnupur</option>
                      <option value="bisrakh">Bisrakh</option>
                      <option value="bochasan">Bochasan</option>
                      <option value="bodwad">Bodwad</option>
                      <option value="bogolu">Bogolu</option>
                      <option value="boileauganj">Boileauganj</option>
                      <option value="boisar">Boisar</option>
                      <option value="bokadvira">Bokadvira</option>
                      <option value="bokaro steel city">Bokaro steel city</option>
                      <option value="bolpur">Bolpur</option>
                      <option value="bommanahalli">Bommanahalli</option>
                      <option value="bommasamudram">Bommasamudram</option>
                      <option value="bongaigaon">Bongaigaon</option>
                      <option value="bordi">Bordi</option>
                      <option value="borikina">Borikina</option>
                      <option value="borivali west">Borivali west</option>
                      <option value="borsad">Borsad</option>
                      <option value="botad">Botad</option>
                      <option value="brahmapur">Brahmapur</option>
                      <option value="budaun">Budaun</option>
                      <option value="budhlada">Budhlada</option>
                      <option value="budhma">Budhma</option>
                      <option value="buhari">Buhari</option>
                      <option value="bulandshahr">Bulandshahr</option>
                      <option value="buldana">Buldana</option>
                      <option value="bundi">Bundi</option>
                      <option value="burla">Burla</option>
                      <option value="buxar">Buxar</option>
                      <option value="byahatti">Byahatti</option>
                      <option value="calangute">Calangute</option>
                      <option value="candolim">Candolim</option>
                      <option value="caranzalem">Caranzalem</option>
                      <option value="carapur">Carapur</option>
                      <option value="chaibasa">Chaibasa</option>
                      <option value="chakan">Chakan</option>
                      <option value="chakdaha">Chakdaha</option>
                      <option value="chakrata">Chakrata</option>
                      <option value="chalisgaon">Chalisgaon</option>
                      <option value="challakere">Challakere</option>
                      <option value="chamba">Chamba</option>
                      <option value="champa">Champa</option>
                      <option value="champdani">Champdani</option>
                      <option value="chamrail">Chamrail</option>
                      <option value="chamrajnagar">Chamrajnagar</option>
                      <option value="chamrajpet">Chamrajpet</option>
                      <option value="chanchal">Chanchal</option>
                      <option value="chanda">Chanda</option>
                      <option value="chandanagar">Chandanagar</option>
                      <option value="chandannagar">Chandannagar</option>
                      <option value="chandapuram">Chandapuram</option>
                      <option value="chandauli">Chandauli</option>
                      <option value="chandigarh">Chandigarh</option>
                      <option value="chandkheda">Chandkheda</option>
                      <option value="chandpara">Chandpara</option>
                      <option value="chandpur">Chandpur</option>
                      <option value="chandrala">Chandrala</option>
                      <option value="chanduasi">Chanduasi</option>
                      <option value="changanacheri">Changanacheri</option>
                      <option value="channahalli">Channahalli</option>
                      <option value="channapatna">Channapatna</option>
                      <option value="channarayapatna">Channarayapatna</option>
                      <option value="chapra">Chapra</option>
                      <option value="charkhi">Charkhi</option>
                      <option value="charkhi dadri">Charkhi dadri</option>
                      <option value="chatra">Chatra</option>
                      <option value="chatrapur">Chatrapur</option>
                      <option value="chaumuhan">Chaumuhan</option>
                      <option value="chavara">Chavara</option>
                      <option value="cheliya">Cheliya</option>
                      <option value="chembur">Chembur</option>
                      <option value="chengannur">Chengannur</option>
                      <option value="chennai">Chennai</option>
                      <option value="cherrapunji">Cherrapunji</option>
                      <option value="cherthala">Cherthala</option>
                      <option value="cherukunnu">Cherukunnu</option>
                      <option value="chetput">Chetput</option>
                      <option value="chettipatti">Chettipatti</option>
                      <option value="chetwayi">Chetwayi</option>
                      <option value="chevella">Chevella</option>
                      <option value="cheyyar">Cheyyar</option>
                      <option value="chhajarsi">Chhajarsi</option>
                      <option value="chhajli">Chhajli</option>
                      <option value="chhata">Chhata</option>
                      <option value="chhatral">Chhatral</option>
                      <option value="chhindwara">Chhindwara</option>
                      <option value="chhota udepur">Chhota udepur</option>
                      <option value="chicacole">Chicacole</option>
                      <option value="chicalim">Chicalim</option>
                      <option value="chichondi">Chichondi</option>
                      <option value="chidambaram">Chidambaram</option>
                      <option value="chidawa">Chidawa</option>
                      <option value="chika">Chika</option>
                      <option value="chikhli">Chikhli</option>
                      <option value="chikmagalūr">Chikmagalūr</option>
                      <option value="chikodi">Chikodi</option>
                      <option value="chincholi">Chincholi</option>
                      <option value="chinchvad">Chinchvad</option>
                      <option value="chingleput">Chingleput</option>
                      <option value="chinnakandili">Chinnakandili</option>
                      <option value="chinnalapatti">Chinnalapatti</option>
                      <option value="chinnamanur">Chinnamanur</option>
                      <option value="chintamani">Chintamani</option>
                      <option value="chiplun">Chiplun</option>
                      <option value="chirala">Chirala</option>
                      <option value="chitawad">Chitawad</option>
                      <option value="chitradurga">Chitradurga</option>
                      <option value="chittaranjan">Chittaranjan</option>
                      <option value="chittattukara">Chittattukara</option>
                      <option value="chittaurgarh">Chittaurgarh</option>
                      <option value="chittoor">Chittoor</option>
                      <option value="chopda">Chopda</option>
                      <option value="chopta">Chopta</option>
                      <option value="chotala">Chotala</option>
                      <option value="chromepet">Chromepet</option>
                      <option value="chunchura">Chunchura</option>
                      <option value="churachandarpur">Churachandarpur</option>
                      <option value="churu">Churu</option>
                      <option value="closepet">Closepet</option>
                      <option value="coimbatore">Coimbatore</option>
                      <option value="contai">Contai</option>
                      <option value="coonoor">Coonoor</option>
                      <option value="cortalim">Cortalim</option>
                      <option value="cuddalore">Cuddalore</option>
                      <option value="cuncolim">Cuncolim</option>
                      <option value="cuttack">Cuttack</option>
                      <option value="dabhoi">Dabhoi</option>
                      <option value="dabolim">Dabolim</option>
                      <option value="dabra">Dabra</option>
                      <option value="dad">Dad</option>
                      <option value="dadri">Dadri</option>
                      <option value="dahanu">Dahanu</option>
                      <option value="dakha">Dakha</option>
                      <option value="dakor">Dakor</option>
                      <option value="dakshin">Dakshin</option>
                      <option value="dakshineswar">Dakshineswar</option>
                      <option value="dalli rajhara">Dalli rajhara</option>
                      <option value="dammannapet">Dammannapet</option>
                      <option value="damoh">Damoh</option>
                      <option value="danda">Danda</option>
                      <option value="dandeli">Dandeli</option>
                      <option value="dapoli">Dapoli</option>
                      <option value="darbe">Darbe</option>
                      <option value="darbhanga">Darbhanga</option>
                      <option value="dargah">Dargah</option>
                      <option value="darjeeling">Darjeeling</option>
                      <option value="dasarahalli">Dasarahalli</option>
                      <option value="dasghara">Dasghara</option>
                      <option value="dasuya">Dasuya</option>
                      <option value="datawali">Datawali</option>
                      <option value="datia">Datia</option>
                      <option value="daund">Daund</option>
                      <option value="dausa">Dausa</option>
                      <option value="davangere">Davangere</option>
                      <option value="daxini society">Daxini society</option>
                      <option value="dayal bagh">Dayal bagh</option>
                      <option value="deesa">Deesa</option>
                      <option value="dehari">Dehari</option>
                      <option value="dehni">Dehni</option>
                      <option value="dehradun">Dehradun</option>
                      <option value="dehri">Dehri</option>
                      <option value="dehu">Dehu</option>
                      <option value="delhi">Delhi</option>
                      <option value="deoband">Deoband</option>
                      <option value="deoghar">Deoghar</option>
                      <option value="deoli">Deoli</option>
                      <option value="deolia">Deolia</option>
                      <option value="deori">Deori</option>
                      <option value="deoria">Deoria</option>
                      <option value="dera gopipur">Dera gopipur</option>
                      <option value="devakottai">Devakottai</option>
                      <option value="devgarh">Devgarh</option>
                      <option value="devprayag">Devprayag</option>
                      <option value="dewas">Dewas</option>
                      <option value="dhalai">Dhalai</option>
                      <option value="dhaligaon">Dhaligaon</option>
                      <option value="dhamnod">Dhamnod</option>
                      <option value="dhamtari">Dhamtari</option>
                      <option value="dhanaula">Dhanaula</option>
                      <option value="dhanbad">Dhanbad</option>
                      <option value="dhar">Dhar</option>
                      <option value="dharamsala">Dharamsala</option>
                      <option value="dharapuram">Dharapuram</option>
                      <option value="dharavi">Dharavi</option>
                      <option value="dhariwal">Dhariwal</option>
                      <option value="dharmanagar">Dharmanagar</option>
                      <option value="dharmapuri">Dharmapuri</option>
                      <option value="dharmaram">Dharmaram</option>
                      <option value="dharmpur">Dharmpur</option>
                      <option value="dharwad">Dharwad</option>
                      <option value="dhaulpur">Dhaulpur</option>
                      <option value="dhenkanal">Dhenkanal</option>
                      <option value="dholka">Dholka</option>
                      <option value="dhone">Dhone</option>
                      <option value="dhrangadhra">Dhrangadhra</option>
                      <option value="dhrol">Dhrol</option>
                      <option value="dhubri">Dhubri</option>
                      <option value="dhule">Dhule</option>
                      <option value="dhulian">Dhulian</option>
                      <option value="dhuri">Dhuri</option>
                      <option value="diamond harbour">Diamond harbour</option>
                      <option value="dibrugarh">Dibrugarh</option>
                      <option value="dicholi">Dicholi</option>
                      <option value="didwana">Didwana</option>
                      <option value="dig">Dig</option>
                      <option value="digboi">Digboi</option>
                      <option value="digha">Digha</option>
                      <option value="dimapur">Dimapur</option>
                      <option value="dinapore">Dinapore</option>
                      <option value="dindigul">Dindigul</option>
                      <option value="dindori">Dindori</option>
                      <option value="dinhata">Dinhata</option>
                      <option value="diphu">Diphu</option>
                      <option value="dirba">Dirba</option>
                      <option value="dispur">Dispur</option>
                      <option value="doda">Doda</option>
                      <option value="doddipatla">Doddipatla</option>
                      <option value="dohad">Dohad</option>
                      <option value="doiwala">Doiwala</option>
                      <option value="dombivali">Dombivali</option>
                      <option value="dona paula">Dona paula</option>
                      <option value="dondaicha">Dondaicha</option>
                      <option value="dongaon">Dongaon</option>
                      <option value="doraha">Doraha</option>
                      <option value="dubrajpur">Dubrajpur</option>
                      <option value="dulhera">Dulhera</option>
                      <option value="dumjor">Dumjor</option>
                      <option value="dumka">Dumka</option>
                      <option value="dungarpur">Dungarpur</option>
                      <option value="durg">Durg</option>
                      <option value="durgachak">Durgachak</option>
                      <option value="durgapur">Durgapur</option>
                      <option value="duttapukur">Duttapukur</option>
                      <option value="dwarahat">Dwarahat</option>
                      <option value="dwarka">Dwarka</option>
                      <option value="edappal">Edappal</option>
                      <option value="edappalli">Edappalli</option>
                      <option value="edava">Edava</option>
                      <option value="edavanakad">Edavanakad</option>
                      <option value="edavanna">Edavanna</option>
                      <option value="edavilangu">Edavilangu</option>
                      <option value="egra">Egra</option>
                      <option value="ekangar sarai">Ekangar sarai</option>
                      <option value="elayirampannai">Elayirampannai</option>
                      <option value="electronics city">Electronics city</option>
                      <option value="ellore">Ellore</option>
                      <option value="erattupetta">Erattupetta</option>
                      <option value="ernakulam">Ernakulam</option>
                      <option value="erode">Erode</option>
                      <option value="erragadda">Erragadda</option>
                      <option value="erukkancheri">Erukkancheri</option>
                      <option value="etah">Etah</option>
                      <option value="etawah">Etawah</option>
                      <option value="ettumanoor">Ettumanoor</option>
                      <option value="faizpur">Faizpur</option>
                      <option value="falakata">Falakata</option>
                      <option value="falimari">Falimari</option>
                      <option value="farakka">Farakka</option>
                      <option value="faridabad">Faridabad</option>
                      <option value="faridkot">Faridkot</option>
                      <option value="farrukhabad">Farrukhabad</option>
                      <option value="fatehabad">Fatehabad</option>
                      <option value="fatehgarh">Fatehgarh</option>
                      <option value="fatehpur">Fatehpur</option>
                      <option value="fazilka">Fazilka</option>
                      <option value="ferozepore">Ferozepore</option>
                      <option value="firozabad">Firozabad</option>
                      <option value="french rocks">French rocks</option>
                      <option value="fyzabad">Fyzabad</option>
                      <option value="gachhipura">Gachhipura</option>
                      <option value="gadag">Gadag</option>
                      <option value="gadarwara">Gadarwara</option>
                      <option value="gadhinglaj">Gadhinglaj</option>
                      <option value="gagret">Gagret</option>
                      <option value="gaighata">Gaighata</option>
                      <option value="gajulpet">Gajulpet</option>
                      <option value="gajuwaka">Gajuwaka</option>
                      <option value="gajwel">Gajwel</option>
                      <option value="ganapavaram">Ganapavaram</option>
                      <option value="gandarbal">Gandarbal</option>
                      <option value="gandevi">Gandevi</option>
                      <option value="gandhidham">Gandhidham</option>
                      <option value="gandhinagar">Gandhinagar</option>
                      <option value="gandhi nagar">Gandhi nagar</option>
                      <option value="ganesapuram">Ganesapuram</option>
                      <option value="ganeshwadi">Ganeshwadi</option>
                      <option value="gangaikondan">Gangaikondan</option>
                      <option value="ganganagar">Ganganagar</option>
                      <option value="gangapur">Gangapur</option>
                      <option value="gangarampur">Gangarampur</option>
                      <option value="gangawati">Gangawati</option>
                      <option value="gangoh">Gangoh</option>
                      <option value="gangotri">Gangotri</option>
                      <option value="gangtok">Gangtok</option>
                      <option value="gannavaram">Gannavaram</option>
                      <option value="garhi">Garhi</option>
                      <option value="garhshankar">Garhshankar</option>
                      <option value="garli">Garli</option>
                      <option value="garulia">Garulia</option>
                      <option value="gaya">Gaya</option>
                      <option value="ghaghra">Ghaghra</option>
                      <option value="ghansoli">Ghansoli</option>
                      <option value="ghantasala">Ghantasala</option>
                      <option value="gharaunda">Gharaunda</option>
                      <option value="ghatal">Ghatal</option>
                      <option value="ghatkesar">Ghatkesar</option>
                      <option value="ghatkopar">Ghatkopar</option>
                      <option value="ghaziabad">Ghaziabad</option>
                      <option value="ghazipur">Ghazipur</option>
                      <option value="ghusuri">Ghusuri</option>
                      <option value="giddalur">Giddalur</option>
                      <option value="gingee">Gingee</option>
                      <option value="girgaum">Girgaum</option>
                      <option value="giridih">Giridih</option>
                      <option value="gobardanga">Gobardanga</option>
                      <option value="gobichettipalayam">Gobichettipalayam</option>
                      <option value="godda">Godda</option>
                      <option value="godhra">Godhra</option>
                      <option value="gohana">Gohana</option>
                      <option value="goharganj">Goharganj</option>
                      <option value="gohpur">Gohpur</option>
                      <option value="gokak">Gokak</option>
                      <option value="golaghat">Golaghat</option>
                      <option value="gomoh">Gomoh</option>
                      <option value="gonda city">Gonda city</option>
                      <option value="gondal">Gondal</option>
                      <option value="gondia">Gondia</option>
                      <option value="gonikoppal">Gonikoppal</option>
                      <option value="gopalganj">Gopalganj</option>
                      <option value="gorakhpur">Gorakhpur</option>
                      <option value="goraya">Goraya</option>
                      <option value="goregaon">Goregaon</option>
                      <option value="goribidnur">Goribidnur</option>
                      <option value="govindpur">Govindpur</option>
                      <option value="gudivada">Gudivada</option>
                      <option value="gudiyatham">Gudiyatham</option>
                      <option value="gudur">Gudur</option>
                      <option value="guindy">Guindy</option>
                      <option value="gujrat">Gujrat</option>
                      <option value="gulbarga">Gulbarga</option>
                      <option value="guna">Guna</option>
                      <option value="gunadala">Gunadala</option>
                      <option value="gundlupet">Gundlupet</option>
                      <option value="guntakal">Guntakal</option>
                      <option value="guntur">Guntur</option>
                      <option value="gurdaspur">Gurdaspur</option>
                      <option value="gurgaon">Gurgaon</option>
                      <option value="gurramkonda">Gurramkonda</option>
                      <option value="guru har sahai">Guru har sahai</option>
                      <option value="guruvayur">Guruvayur</option>
                      <option value="guwahati">Guwahati</option>
                      <option value="gwalior">Gwalior</option>
                      <option value="habra">Habra</option>
                      <option value="hadapsar">Hadapsar</option>
                      <option value="haddo">Haddo</option>
                      <option value="hadia">Hadia</option>
                      <option value="haflong">Haflong</option>
                      <option value="hagaribommanahalli">Hagaribommanahalli</option>
                      <option value="hailakandi">Hailakandi</option>
                      <option value="hajipur">Hajipur</option>
                      <option value="hakimpet">Hakimpet</option>
                      <option value="haldia">Haldia</option>
                      <option value="halisahar">Halisahar</option>
                      <option value="halol">Halol</option>
                      <option value="halvad">Halvad</option>
                      <option value="hamirpur">Hamirpur</option>
                      <option value="hanamkonda">Hanamkonda</option>
                      <option value="hansi">Hansi</option>
                      <option value="hanumangarh">Hanumangarh</option>
                      <option value="hapur">Hapur</option>
                      <option value="harda">Harda</option>
                      <option value="haridwar">Haridwar</option>
                      <option value="haripad">Haripad</option>
                      <option value="harippad">Harippad</option>
                      <option value="harishpur">Harishpur</option>
                      <option value="hariyana">Hariyana</option>
                      <option value="harur">Harur</option>
                      <option value="hasanpur">Hasanpur</option>
                      <option value="hasimara">Hasimara</option>
                      <option value="hassan">Hassan</option>
                      <option value="hathras">Hathras</option>
                      <option value="hatiara">Hatiara</option>
                      <option value="haveri">Haveri</option>
                      <option value="hazaribagh">Hazaribagh</option>
                      <option value="hehal">Hehal</option>
                      <option value="hilsa">Hilsa</option>
                      <option value="himatnagar">Himatnagar</option>
                      <option value="hindaun">Hindaun</option>
                      <option value="hindmotor">Hindmotor</option>
                      <option value="hindol">Hindol</option>
                      <option value="hindupur">Hindupur</option>
                      <option value="hingoli">Hingoli</option>
                      <option value="hiramandalam">Hiramandalam</option>
                      <option value="hisar">Hisar</option>
                      <option value="hodal">Hodal</option>
                      <option value="hojai">Hojai</option>
                      <option value="honnali">Honnali</option>
                      <option value="honnavara">Honnavara</option>
                      <option value="hoodi">Hoodi</option>
                      <option value="hoshangabad">Hoshangabad</option>
                      <option value="hoshiarpur">Hoshiarpur</option>
                      <option value="hospet">Hospet</option>
                      <option value="hosur">Hosur</option>
                      <option value="howrah">Howrah</option>
                      <option value="hridaypur">Hridaypur</option>
                      <option value="hubli">Hubli</option>
                      <option value="hugli">Hugli</option>
                      <option value="hunsur">Hunsur</option>
                      <option value="huzurabad">Huzurabad</option>
                      <option value="huzurnagar">Huzurnagar</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="ibrahimpatnam">Ibrahimpatnam</option>
                      <option value="ichalkaranji">Ichalkaranji</option>
                      <option value="ichhawar">Ichhawar</option>
                      <option value="idar">Idar</option>
                      <option value="idigarai">Idigarai</option>
                      <option value="idukki">Idukki</option>
                      <option value="igatpuri">Igatpuri</option>
                      <option value="iglas">Iglas</option>
                      <option value="ikauna">Ikauna</option>
                      <option value="imphal">Imphal</option>
                      <option value="indapur">Indapur</option>
                      <option value="indore">Indore</option>
                      <option value="indri">Indri</option>
                      <option value="ingraj bazar">Ingraj bazar</option>
                      <option value="iringavur">Iringavur</option>
                      <option value="irinjalakuda">Irinjalakuda</option>
                      <option value="iritty">Iritty</option>
                      <option value="irla">Irla</option>
                      <option value="itanagar">Itanagar</option>
                      <option value="itarsi">Itarsi</option>
                      <option value="jabalpur">Jabalpur</option>
                      <option value="jadan">Jadan</option>
                      <option value="jadcherla">Jadcherla</option>
                      <option value="jagadhri">Jagadhri</option>
                      <option value="jagatpura">Jagatpura</option>
                      <option value="jagatsinghapur">Jagatsinghapur</option>
                      <option value="jagdalpur">Jagdalpur</option>
                      <option value="jaggampeta">Jaggampeta</option>
                      <option value="jagiroad">Jagiroad</option>
                      <option value="jagraon">Jagraon</option>
                      <option value="jagtial">Jagtial</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="jairampur">Jairampur</option>
                      <option value="jaisalmer">Jaisalmer</option>
                      <option value="jaisingpur">Jaisingpur</option>
                      <option value="jaitaran">Jaitaran</option>
                      <option value="jaito">Jaito</option>
                      <option value="jajpur">Jajpur</option>
                      <option value="jakhal">Jakhal</option>
                      <option value="jalalabad">Jalalabad</option>
                      <option value="jalalpur">Jalalpur</option>
                      <option value="jalandhar">Jalandhar</option>
                      <option value="jalgaon jamod">Jalgaon jamod</option>
                      <option value="jalna">Jalna</option>
                      <option value="jalpaiguri">Jalpaiguri</option>
                      <option value="jamalpur">Jamalpur</option>
                      <option value="jamkhandi">Jamkhandi</option>
                      <option value="jammu">Jammu</option>
                      <option value="jamnagar">Jamnagar</option>
                      <option value="jamner">Jamner</option>
                      <option value="jamrar">Jamrar</option>
                      <option value="jamshedpur">Jamshedpur</option>
                      <option value="jamtara">Jamtara</option>
                      <option value="jamui">Jamui</option>
                      <option value="jandiala guru">Jandiala guru</option>
                      <option value="jangaon">Jangaon</option>
                      <option value="janipur">Janipur</option>
                      <option value="jasdan">Jasdan</option>
                      <option value="jatani">Jatani</option>
                      <option value="jaunpur">Jaunpur</option>
                      <option value="jawali">Jawali</option>
                      <option value="jejuri">Jejuri</option>
                      <option value="jetpur">Jetpur</option>
                      <option value="jhabua">Jhabua</option>
                      <option value="jhajjar">Jhajjar</option>
                      <option value="jhalamand">Jhalamand</option>
                      <option value="jhalawar">Jhalawar</option>
                      <option value="jhalrapatan">Jhalrapatan</option>
                      <option value="jhanjeri">Jhanjeri</option>
                      <option value="jhansi">Jhansi</option>
                      <option value="jhargram">Jhargram</option>
                      <option value="jharsugra">Jharsugra</option>
                      <option value="jhunjhunun">Jhunjhunun</option>
                      <option value="jiaganj">Jiaganj</option>
                      <option value="jigani">Jigani</option>
                      <option value="jind">Jind</option>
                      <option value="jirania">Jirania</option>
                      <option value="jiribam">Jiribam</option>
                      <option value="joda">Joda</option>
                      <option value="jodhpur">Jodhpur</option>
                      <option value="jogeshwari">Jogeshwari</option>
                      <option value="jogindarnagar">Jogindarnagar</option>
                      <option value="jorhat">Jorhat</option>
                      <option value="joshipur">Joshipur</option>
                      <option value="jowai">Jowai</option>
                      <option value="jubilee hills">Jubilee hills</option>
                      <option value="jumri tilaiya">Jumri tilaiya</option>
                      <option value="junagadh">Junagadh</option>
                      <option value="kadakkal">Kadakkal</option>
                      <option value="kadakola">Kadakola</option>
                      <option value="kadapa">Kadapa</option>
                      <option value="kadi">Kadi</option>
                      <option value="kadiri">Kadiri</option>
                      <option value="kadodara">Kadodara</option>
                      <option value="kadur">Kadur</option>
                      <option value="kagal">Kagal</option>
                      <option value="kahilipara">Kahilipara</option>
                      <option value="kailas">Kailas</option>
                      <option value="kailasahar">Kailasahar</option>
                      <option value="kairana">Kairana</option>
                      <option value="kaithal">Kaithal</option>
                      <option value="kakching">Kakching</option>
                      <option value="kakdwip">Kakdwip</option>
                      <option value="kakinada">Kakinada</option>
                      <option value="kakkanad">Kakkanad</option>
                      <option value="kala amb">Kala amb</option>
                      <option value="kaladi">Kaladi</option>
                      <option value="kalamasseri">Kalamasseri</option>
                      <option value="kalamboli">Kalamboli</option>
                      <option value="kalan">Kalan</option>
                      <option value="kalikavu">Kalikavu</option>
                      <option value="kalikiri">Kalikiri</option>
                      <option value="kalimedu">Kalimedu</option>
                      <option value="kalingia">Kalingia</option>
                      <option value="kalka">Kalka</option>
                      <option value="kalladipatta">Kalladipatta</option>
                      <option value="kallam">Kallam</option>
                      <option value="kalna">Kalna</option>
                      <option value="kalol">Kalol</option>
                      <option value="kalpakkam">Kalpakkam</option>
                      <option value="kalpatta">Kalpatta</option>
                      <option value="kalva">Kalva</option>
                      <option value="kalyan">Kalyan</option>
                      <option value="kalyani">Kalyani</option>
                      <option value="kamalpur">Kamalpur</option>
                      <option value="kampur">Kampur</option>
                      <option value="kamrej">Kamrej</option>
                      <option value="kamuthi">Kamuthi</option>
                      <option value="kancharapalem">Kancharapalem</option>
                      <option value="kanchipuram">Kanchipuram</option>
                      <option value="kanchrapara">Kanchrapara</option>
                      <option value="kandi">Kandi</option>
                      <option value="kandivli">Kandivli</option>
                      <option value="kangar">Kangar</option>
                      <option value="kangayam">Kangayam</option>
                      <option value="kangazha">Kangazha</option>
                      <option value="kangra">Kangra</option>
                      <option value="kanhangad">Kanhangad</option>
                      <option value="kanigiri">Kanigiri</option>
                      <option value="kanina khas">Kanina khas</option>
                      <option value="kankanhalli">Kankanhalli</option>
                      <option value="kankauli">Kankauli</option>
                      <option value="kankinara">Kankinara</option>
                      <option value="kankon">Kankon</option>
                      <option value="kannad">Kannad</option>
                      <option value="kannauj">Kannauj</option>
                      <option value="kanniyakumari">Kanniyakumari</option>
                      <option value="kannur">Kannur</option>
                      <option value="kanodar">Kanodar</option>
                      <option value="kanpur">Kanpur</option>
                      <option value="kantabanji">Kantabanji</option>
                      <option value="kanth">Kanth</option>
                      <option value="kapurthala town">Kapurthala town</option>
                      <option value="karad">Karad</option>
                      <option value="karaikudi">Karaikudi</option>
                      <option value="karamadai">Karamadai</option>
                      <option value="karanjia">Karanjia</option>
                      <option value="karauli">Karauli</option>
                      <option value="kargani">Kargani</option>
                      <option value="kargil">Kargil</option>
                      <option value="karimganj">Karimganj</option>
                      <option value="karimnagar">Karimnagar</option>
                      <option value="karjat">Karjat</option>
                      <option value="karkala">Karkala</option>
                      <option value="karnal">Karnal</option>
                      <option value="karsog">Karsog</option>
                      <option value="kartarpur">Kartarpur</option>
                      <option value="karthikappally">Karthikappally</option>
                      <option value="karukkankattupudur">Karukkankattupudur</option>
                      <option value="karunanidhi nagar">Karunanidhi nagar</option>
                      <option value="karur">Karur</option>
                      <option value="karuvatta">Karuvatta</option>
                      <option value="karwar">Karwar</option>
                      <option value="kasan">Kasan</option>
                      <option value="kasaragod">Kasaragod</option>
                      <option value="kasganj">Kasganj</option>
                      <option value="kasrawad">Kasrawad</option>
                      <option value="kathgodam">Kathgodam</option>
                      <option value="kathua">Kathua</option>
                      <option value="katihar">Katihar</option>
                      <option value="katoya">Katoya</option>
                      <option value="katpadi">Katpadi</option>
                      <option value="katra">Katra</option>
                      <option value="kattanam">Kattanam</option>
                      <option value="kaudiar">Kaudiar</option>
                      <option value="kausani">Kausani</option>
                      <option value="kavali">Kavali</option>
                      <option value="kavalkinaru">Kavalkinaru</option>
                      <option value="kayalpattinam">Kayalpattinam</option>
                      <option value="kayamkulam">Kayamkulam</option>
                      <option value="kekri">Kekri</option>
                      <option value="kelambakkam">Kelambakkam</option>
                      <option value="kembhavi">Kembhavi</option>
                      <option value="kenchanahalli">Kenchanahalli</option>
                      <option value="kendraparha">Kendraparha</option>
                      <option value="kendua">Kendua</option>
                      <option value="kengri">Kengri</option>
                      <option value="keolari">Keolari</option>
                      <option value="keonjhargarh">Keonjhargarh</option>
                      <option value="kerabari">Kerabari</option>
                      <option value="keshod">Keshod</option>
                      <option value="khaga">Khaga</option>
                      <option value="khagaria">Khagaria</option>
                      <option value="khallikot">Khallikot</option>
                      <option value="khamaria">Khamaria</option>
                      <option value="khambhaliya">Khambhaliya</option>
                      <option value="khambhat">Khambhat</option>
                      <option value="khamgaon">Khamgaon</option>
                      <option value="khammam">Khammam</option>
                      <option value="khandagiri">Khandagiri</option>
                      <option value="khandwa">Khandwa</option>
                      <option value="khanna">Khanna</option>
                      <option value="khanpur">Khanpur</option>
                      <option value="khara">Khara</option>
                      <option value="kharagpur">Kharagpur</option>
                      <option value="kharar">Kharar</option>
                      <option value="kharghar">Kharghar</option>
                      <option value="khargone">Khargone</option>
                      <option value="khas dhira">Khas dhira</option>
                      <option value="khatauli">Khatauli</option>
                      <option value="khatima">Khatima</option>
                      <option value="khatoli">Khatoli</option>
                      <option value="khed">Khed</option>
                      <option value="kheda">Kheda</option>
                      <option value="kheroli">Kheroli</option>
                      <option value="kherwara">Kherwara</option>
                      <option value="khetri">Khetri</option>
                      <option value="khirpai">Khirpai</option>
                      <option value="khodiyarnagar">Khodiyarnagar</option>
                      <option value="khopoli">Khopoli</option>
                      <option value="khowai">Khowai</option>
                      <option value="khuldabad">Khuldabad</option>
                      <option value="khurda">Khurda</option>
                      <option value="khurja">Khurja</option>
                      <option value="kinwat">Kinwat</option>
                      <option value="kiratpur">Kiratpur</option>
                      <option value="kishangarh">Kishangarh</option>
                      <option value="kishtwar">Kishtwar</option>
                      <option value="kittur">Kittur</option>
                      <option value="koch bihar">Koch bihar</option>
                      <option value="kochi">Kochi</option>
                      <option value="kodaikanal">Kodaikanal</option>
                      <option value="kodigehalli">Kodigehalli</option>
                      <option value="kodoli">Kodoli</option>
                      <option value="kodungallur">Kodungallur</option>
                      <option value="kodur">Kodur</option>
                      <option value="kohima">Kohima</option>
                      <option value="kohir">Kohir</option>
                      <option value="kokapet">Kokapet</option>
                      <option value="kokrajhar">Kokrajhar</option>
                      <option value="kolaghat">Kolaghat</option>
                      <option value="kolar">Kolar</option>
                      <option value="kolenchery">Kolenchery</option>
                      <option value="kolhapur">Kolhapur</option>
                      <option value="kolkata">Kolkata</option>
                      <option value="kollam">Kollam</option>
                      <option value="kon">Kon</option>
                      <option value="konanur">Konanur</option>
                      <option value="kondazhi">Kondazhi</option>
                      <option value="kondotty">Kondotty</option>
                      <option value="konduru">Konduru</option>
                      <option value="konikara">Konikara</option>
                      <option value="konnagar">Konnagar</option>
                      <option value="konnur">Konnur</option>
                      <option value="koolimuttam">Koolimuttam</option>
                      <option value="kopargaon">Kopargaon</option>
                      <option value="koppal">Koppal</option>
                      <option value="korangal">Korangal</option>
                      <option value="koraput">Koraput</option>
                      <option value="korba">Korba</option>
                      <option value="koregaon">Koregaon</option>
                      <option value="kosigi">Kosigi</option>
                      <option value="kosli">Kosli</option>
                      <option value="kota">Kota</option>
                      <option value="kotagiri">Kotagiri</option>
                      <option value="kotdwar">Kotdwar</option>
                      <option value="kothamangalam">Kothamangalam</option>
                      <option value="kothamba">Kothamba</option>
                      <option value="kothanur">Kothanur</option>
                      <option value="kot isa khan">Kot isa khan</option>
                      <option value="kotkapura">Kotkapura</option>
                      <option value="kotli">Kotli</option>
                      <option value="kotputli">Kotputli</option>
                      <option value="kottagudem">Kottagudem</option>
                      <option value="kottakkal">Kottakkal</option>
                      <option value="kottarakara">Kottarakara</option>
                      <option value="kottaram">Kottaram</option>
                      <option value="kottayam">Kottayam</option>
                      <option value="kovalam">Kovalam</option>
                      <option value="kovilpatti">Kovilpatti</option>
                      <option value="kovvur">Kovvur</option>
                      <option value="kovvuru">Kovvuru</option>
                      <option value="koyambedu">Koyambedu</option>
                      <option value="koyyalagudem">Koyyalagudem</option>
                      <option value="kozhikode">Kozhikode</option>
                      <option value="krishnagiri">Krishnagiri</option>
                      <option value="krishnanagar">Krishnanagar</option>
                      <option value="krishnapur">Krishnapur</option>
                      <option value="kuchaman">Kuchaman</option>
                      <option value="kuchipudi">Kuchipudi</option>
                      <option value="kudal">Kudal</option>
                      <option value="kudregundi">Kudregundi</option>
                      <option value="kudupu">Kudupu</option>
                      <option value="kujang">Kujang</option>
                      <option value="kuju">Kuju</option>
                      <option value="kukshi">Kukshi</option>
                      <option value="kulgam">Kulgam</option>
                      <option value="kumarapuram">Kumarapuram</option>
                      <option value="kumarghat">Kumarghat</option>
                      <option value="kumarkera">Kumarkera</option>
                      <option value="kumbakonam">Kumbakonam</option>
                      <option value="kumbh">Kumbh</option>
                      <option value="kumhari">Kumhari</option>
                      <option value="kumily">Kumily</option>
                      <option value="kumta">Kumta</option>
                      <option value="kunigal">Kunigal</option>
                      <option value="kunkavav">Kunkavav</option>
                      <option value="kunnamangalam">Kunnamangalam</option>
                      <option value="kunnamkulam">Kunnamkulam</option>
                      <option value="kunnamthanam">Kunnamthanam</option>
                      <option value="kuppam">Kuppam</option>
                      <option value="kupwāra">Kupwāra</option>
                      <option value="kurali">Kurali</option>
                      <option value="kurnool">Kurnool</option>
                      <option value="kurugodu">Kurugodu</option>
                      <option value="kurukshetra">Kurukshetra</option>
                      <option value="kushalnagar">Kushalnagar</option>
                      <option value="kuttippuram">Kuttippuram</option>
                      <option value="kuvettu">Kuvettu</option>
                      <option value="kuzhithurai">Kuzhithurai</option>
                      <option value="ladnun">Ladnun</option>
                      <option value="lakhimpur">Lakhimpur</option>
                      <option value="lakhnadon">Lakhnadon</option>
                      <option value="lalsot">Lalsot</option>
                      <option value="landsdowne">Landsdowne</option>
                      <option value="latehar">Latehar</option>
                      <option value="latur">Latur</option>
                      <option value="lawan">Lawan</option>
                      <option value="limbdi">Limbdi</option>
                      <option value="limdi">Limdi</option>
                      <option value="lingampet">Lingampet</option>
                      <option value="lohaghat">Lohaghat</option>
                      <option value="loharu">Loharu</option>
                      <option value="lohogaon">Lohogaon</option>
                      <option value="lonand">Lonand</option>
                      <option value="lonavla">Lonavla</option>
                      <option value="longowal">Longowal</option>
                      <option value="loni">Loni</option>
                      <option value="losal">Losal</option>
                      <option value="loutolim">Loutolim</option>
                      <option value="luckeesarai">Luckeesarai</option>
                      <option value="lucknow">Lucknow</option>
                      <option value="ludhaina">Ludhaina</option>
                      <option value="ludhiana">Ludhiana</option>
                      <option value="lumding railway colony">Lumding railway colony</option>
                      <option value="lunavada">Lunavada</option>
                      <option value="lunglei">Lunglei</option>
                      <option value="macherla">Macherla</option>
                      <option value="machhiwara">Machhiwara</option>
                      <option value="machilipatnam">Machilipatnam</option>
                      <option value="madanapalle">Madanapalle</option>
                      <option value="madgaon">Madgaon</option>
                      <option value="madh">Madh</option>
                      <option value="madhapur">Madhapur</option>
                      <option value="madhavaram">Madhavaram</option>
                      <option value="madhoganj">Madhoganj</option>
                      <option value="madhubani">Madhubani</option>
                      <option value="madhurawada">Madhurawada</option>
                      <option value="madikeri">Madikeri</option>
                      <option value="madipakkam">Madipakkam</option>
                      <option value="madurai">Madurai</option>
                      <option value="mahabaleshwar">Mahabaleshwar</option>
                      <option value="mahad">Mahad</option>
                      <option value="mahal">Mahal</option>
                      <option value="mahalingpur">Mahalingpur</option>
                      <option value="maharaganj">Maharaganj</option>
                      <option value="maharanipeta">Maharanipeta</option>
                      <option value="mahbubnagar">Mahbubnagar</option>
                      <option value="mahe">Mahe</option>
                      <option value="mahesana">Mahesana</option>
                      <option value="mahim">Mahim</option>
                      <option value="mahuli">Mahuli</option>
                      <option value="mahuva">Mahuva</option>
                      <option value="mainpuri">Mainpuri</option>
                      <option value="maithon">Maithon</option>
                      <option value="majalgaon">Majalgaon</option>
                      <option value="majuli">Majuli</option>
                      <option value="makrana">Makrana</option>
                      <option value="malabar hill">Malabar hill</option>
                      <option value="malad">Malad</option>
                      <option value="malaipattu">Malaipattu</option>
                      <option value="malakanagiri">Malakanagiri</option>
                      <option value="malappuram">Malappuram</option>
                      <option value="malapuram">Malapuram</option>
                      <option value="malaudh">Malaudh</option>
                      <option value="malavalli">Malavalli</option>
                      <option value="maldah">Maldah</option>
                      <option value="malegaon">Malegaon</option>
                      <option value="malikipuram">Malikipuram</option>
                      <option value="malkajgiri">Malkajgiri</option>
                      <option value="malkapur">Malkapur</option>
                      <option value="malpura">Malpura</option>
                      <option value="malsian">Malsian</option>
                      <option value="malur">Malur</option>
                      <option value="malvalli">Malvalli</option>
                      <option value="malvan">Malvan</option>
                      <option value="mamdot">Mamdot</option>
                      <option value="manamadurai">Manamadurai</option>
                      <option value="manantoddy">Manantoddy</option>
                      <option value="manapakkam">Manapakkam</option>
                      <option value="manchar">Manchar</option>
                      <option value="mancherial">Mancherial</option>
                      <option value="manda">Manda</option>
                      <option value="mandal">Mandal</option>
                      <option value="mandapeta">Mandapeta</option>
                      <option value="mandi">Mandi</option>
                      <option value="mandi dabwali">Mandi dabwali</option>
                      <option value="mandla">Mandla</option>
                      <option value="mandsaur">Mandsaur</option>
                      <option value="mandvi">Mandvi</option>
                      <option value="mandya">Mandya</option>
                      <option value="mangalagiri">Mangalagiri</option>
                      <option value="mangalore">Mangalore</option>
                      <option value="mangan">Mangan</option>
                      <option value="mangaon">Mangaon</option>
                      <option value="mangapet">Mangapet</option>
                      <option value="manimala">Manimala</option>
                      <option value="manipala">Manipala</option>
                      <option value="manipur">Manipur</option>
                      <option value="manjeri">Manjeri</option>
                      <option value="manjhanpur">Manjhanpur</option>
                      <option value="manmad">Manmad</option>
                      <option value="mannarai">Mannarai</option>
                      <option value="mannargudi">Mannargudi</option>
                      <option value="manor">Manor</option>
                      <option value="manpur">Manpur</option>
                      <option value="mansa">Mansa</option>
                      <option value="mansarovar">Mansarovar</option>
                      <option value="manthani">Manthani</option>
                      <option value="manuguru">Manuguru</option>
                      <option value="manvi">Manvi</option>
                      <option value="margao">Margao</option>
                      <option value="margherita">Margherita</option>
                      <option value="markapur">Markapur</option>
                      <option value="markapuram">Markapuram</option>
                      <option value="marthandam">Marthandam</option>
                      <option value="mathikere">Mathikere</option>
                      <option value="mathura">Mathura</option>
                      <option value="matigara">Matigara</option>
                      <option value="matunga">Matunga</option>
                      <option value="mau">Mau</option>
                      <option value="maur">Maur</option>
                      <option value="mavelikara">Mavelikara</option>
                      <option value="mawana">Mawana</option>
                      <option value="mayapur">Mayapur</option>
                      <option value="mayiladuthurai">Mayiladuthurai</option>
                      <option value="mayna">Mayna</option>
                      <option value="medak">Medak</option>
                      <option value="medchal">Medchal</option>
                      <option value="medininagar">Medininagar</option>
                      <option value="medinipur">Medinipur</option>
                      <option value="meerut">Meerut</option>
                      <option value="melaghar">Melaghar</option>
                      <option value="melapalayam">Melapalayam</option>
                      <option value="melattur">Melattur</option>
                      <option value="meluri">Meluri</option>
                      <option value="memari">Memari</option>
                      <option value="mettuppalaiyam">Mettuppalaiyam</option>
                      <option value="mettur">Mettur</option>
                      <option value="mhasla">Mhasla</option>
                      <option value="mhow">Mhow</option>
                      <option value="minjur">Minjur</option>
                      <option value="miraj">Miraj</option>
                      <option value="mira road">Mira road</option>
                      <option value="miryalguda">Miryalguda</option>
                      <option value="mirzapur">Mirzapur</option>
                      <option value="modasa">Modasa</option>
                      <option value="modinagar">Modinagar</option>
                      <option value="moga">Moga</option>
                      <option value="mohali">Mohali</option>
                      <option value="mohan">Mohan</option>
                      <option value="mohanpur">Mohanpur</option>
                      <option value="mohope">Mohope</option>
                      <option value="mohorli">Mohorli</option>
                      <option value="moirang">Moirang</option>
                      <option value="mokhada">Mokhada</option>
                      <option value="mokokchung">Mokokchung</option>
                      <option value="mon">Mon</option>
                      <option value="mongra">Mongra</option>
                      <option value="moradabad">Moradabad</option>
                      <option value="moranha">Moranha</option>
                      <option value="moreh">Moreh</option>
                      <option value="morena">Morena</option>
                      <option value="morigaon">Morigaon</option>
                      <option value="morinda">Morinda</option>
                      <option value="mormugao">Mormugao</option>
                      <option value="morshi">Morshi</option>
                      <option value="morvi">Morvi</option>
                      <option value="mothihari">Mothihari</option>
                      <option value="mount abu">Mount abu</option>
                      <option value="muddebihal">Muddebihal</option>
                      <option value="mudgere">Mudgere</option>
                      <option value="mudhol">Mudhol</option>
                      <option value="mukerian">Mukerian</option>
                      <option value="muktsar">Muktsar</option>
                      <option value="mulbagal">Mulbagal</option>
                      <option value="mullanpur">Mullanpur</option>
                      <option value="mulund east">Mulund east</option>
                      <option value="mulund west">Mulund west</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="mummidivaram">Mummidivaram</option>
                      <option value="mundargi">Mundargi</option>
                      <option value="mundgod">Mundgod</option>
                      <option value="mundra">Mundra</option>
                      <option value="mungeli">Mungeli</option>
                      <option value="munger">Munger</option>
                      <option value="munnar">Munnar</option>
                      <option value="murarai">Murarai</option>
                      <option value="murbad">Murbad</option>
                      <option value="murshidabad">Murshidabad</option>
                      <option value="murud">Murud</option>
                      <option value="murwara">Murwara</option>
                      <option value="mussoorie">Mussoorie</option>
                      <option value="mustafabad">Mustafabad</option>
                      <option value="muvattupuzha">Muvattupuzha</option>
                      <option value="muzaffarnagar">Muzaffarnagar</option>
                      <option value="muzaffarpur">Muzaffarpur</option>
                      <option value="mysore">Mysore</option>
                      <option value="nabadwip">Nabadwip</option>
                      <option value="nabha">Nabha</option>
                      <option value="nadapuram">Nadapuram</option>
                      <option value="nadiad">Nadiad</option>
                      <option value="nagamangala">Nagamangala</option>
                      <option value="nagapattinam">Nagapattinam</option>
                      <option value="nagar">Nagar</option>
                      <option value="nagaram">Nagaram</option>
                      <option value="nagarbhavi">Nagarbhavi</option>
                      <option value="nagarsul">Nagarsul</option>
                      <option value="nagaur">Nagaur</option>
                      <option value="nagda">Nagda</option>
                      <option value="nagercoil">Nagercoil</option>
                      <option value="nagina">Nagina</option>
                      <option value="nagmangala">Nagmangala</option>
                      <option value="nagore">Nagore</option>
                      <option value="nagpur">Nagpur</option>
                      <option value="nagrakata">Nagrakata</option>
                      <option value="nagrota">Nagrota</option>
                      <option value="nahan">Nahan</option>
                      <option value="naharlagun">Naharlagun</option>
                      <option value="naihati">Naihati</option>
                      <option value="nainital">Nainital</option>
                      <option value="nainwa">Nainwa</option>
                      <option value="nakodar">Nakodar</option>
                      <option value="nalagarh">Nalagarh</option>
                      <option value="nalbari">Nalbari</option>
                      <option value="nalgonda">Nalgonda</option>
                      <option value="namakkal">Namakkal</option>
                      <option value="nambol">Nambol</option>
                      <option value="namburu">Namburu</option>
                      <option value="namchi">Namchi</option>
                      <option value="nandambakkam">Nandambakkam</option>
                      <option value="nanded">Nanded</option>
                      <option value="nandigama">Nandigama</option>
                      <option value="nandurbar">Nandurbar</option>
                      <option value="nandyal">Nandyal</option>
                      <option value="nangal township">Nangal township</option>
                      <option value="nanganallur">Nanganallur</option>
                      <option value="nanjangud">Nanjangud</option>
                      <option value="nanminda">Nanminda</option>
                      <option value="narasapuram">Narasapuram</option>
                      <option value="narasaraopet">Narasaraopet</option>
                      <option value="narayangarh">Narayangarh</option>
                      <option value="narayanpet">Narayanpet</option>
                      <option value="nargund">Nargund</option>
                      <option value="narkhed">Narkhed</option>
                      <option value="narnaul">Narnaul</option>
                      <option value="naroli">Naroli</option>
                      <option value="narsapur">Narsapur</option>
                      <option value="narsinghgarh">Narsinghgarh</option>
                      <option value="narve">Narve</option>
                      <option value="narwana">Narwana</option>
                      <option value="nashik">Nashik</option>
                      <option value="nasirabad">Nasirabad</option>
                      <option value="nathdwara">Nathdwara</option>
                      <option value="nauni">Nauni</option>
                      <option value="navalur">Navalur</option>
                      <option value="navsari">Navsari</option>
                      <option value="nawa">Nawa</option>
                      <option value="nawada">Nawada</option>
                      <option value="nawalgarh">Nawalgarh</option>
                      <option value="nayagarh">Nayagarh</option>
                      <option value="nazira">Nazira</option>
                      <option value="nedumkandam">Nedumkandam</option>
                      <option value="needamangalam">Needamangalam</option>
                      <option value="nelamangala">Nelamangala</option>
                      <option value="nellore">Nellore</option>
                      <option value="nepanagar">Nepanagar</option>
                      <option value="neral">Neral</option>
                      <option value="new tehri">New tehri</option>
                      <option value="neyveli">Neyveli</option>
                      <option value="nidadavole">Nidadavole</option>
                      <option value="nilakottai">Nilakottai</option>
                      <option value="nilambur">Nilambur</option>
                      <option value="nilanga">Nilanga</option>
                      <option value="nipani">Nipani</option>
                      <option value="niphad">Niphad</option>
                      <option value="nirmal">Nirmal</option>
                      <option value="nizamabad">Nizamabad</option>
                      <option value="noida">Noida</option>
                      <option value="nokha">Nokha</option>
                      <option value="nongstoin">Nongstoin</option>
                      <option value="nonpoh">Nonpoh</option>
                      <option value="north lakhimpur">North lakhimpur</option>
                      <option value="nowgong">Nowgong</option>
                      <option value="nuh">Nuh</option>
                      <option value="nungambakkam">Nungambakkam</option>
                      <option value="nuzvid">Nuzvid</option>
                      <option value="ochanthuruth">Ochanthuruth</option>
                      <option value="olpad">Olpad</option>
                      <option value="ongole">Ongole</option>
                      <option value="orai">Orai</option>
                      <option value="osmanabad">Osmanabad</option>
                      <option value="ottappalam">Ottappalam</option>
                      <option value="ottupara">Ottupara</option>
                      <option value="pachmarhi">Pachmarhi</option>
                      <option value="pachora">Pachora</option>
                      <option value="padampur">Padampur</option>
                      <option value="paderu">Paderu</option>
                      <option value="padiyal">Padiyal</option>
                      <option value="padra">Padra</option>
                      <option value="paithan">Paithan</option>
                      <option value="pakala">Pakala</option>
                      <option value="pala">Pala</option>
                      <option value="palakkad">Palakkad</option>
                      <option value="palakollu">Palakollu</option>
                      <option value="palamcottah">Palamcottah</option>
                      <option value="palampur">Palampur</option>
                      <option value="palani">Palani</option>
                      <option value="palanpur">Palanpur</option>
                      <option value="palasa">Palasa</option>
                      <option value="palashi">Palashi</option>
                      <option value="palazhi">Palazhi</option>
                      <option value="palghar">Palghar</option>
                      <option value="pali">Pali</option>
                      <option value="palladam">Palladam</option>
                      <option value="pallappatti">Pallappatti</option>
                      <option value="pallavaram">Pallavaram</option>
                      <option value="pallikunnu">Pallikunnu</option>
                      <option value="paloncha">Paloncha</option>
                      <option value="palus">Palus</option>
                      <option value="palwal">Palwal</option>
                      <option value="pammal">Pammal</option>
                      <option value="panagarh">Panagarh</option>
                      <option value="panaji">Panaji</option>
                      <option value="panangattur">Panangattur</option>
                      <option value="panchkula">Panchkula</option>
                      <option value="pandalur">Pandalur</option>
                      <option value="pandatarai">Pandatarai</option>
                      <option value="pandharpur">Pandharpur</option>
                      <option value="pandikkad">Pandikkad</option>
                      <option value="paneli">Paneli</option>
                      <option value="panihati">Panihati</option>
                      <option value="panipat">Panipat</option>
                      <option value="panisagar">Panisagar</option>
                      <option value="panjim">Panjim</option>
                      <option value="panruti">Panruti</option>
                      <option value="panskura">Panskura</option>
                      <option value="pantnagar">Pantnagar</option>
                      <option value="panvel">Panvel</option>
                      <option value="panwar">Panwar</option>
                      <option value="paonta sahib">Paonta sahib</option>
                      <option value="paota">Paota</option>
                      <option value="papanasam">Papanasam</option>
                      <option value="paradip">Paradip</option>
                      <option value="parakkadavu">Parakkadavu</option>
                      <option value="parasia">Parasia</option>
                      <option value="parassala">Parassala</option>
                      <option value="paravur tekkumbhagam">Paravur tekkumbhagam</option>
                      <option value="parbhani">Parbhani</option>
                      <option value="pardi">Pardi</option>
                      <option value="pargaon">Pargaon</option>
                      <option value="parwanoo">Parwanoo</option>
                      <option value="pasighat">Pasighat</option>
                      <option value="patan">Patan</option>
                      <option value="pathanamthitta">Pathanamthitta</option>
                      <option value="pathankot">Pathankot</option>
                      <option value="patiala">Patiala</option>
                      <option value="patna">Patna</option>
                      <option value="patna city">Patna city</option>
                      <option value="patnagarh">Patnagarh</option>
                      <option value="pattambi">Pattambi</option>
                      <option value="pattan">Pattan</option>
                      <option value="patti">Patti</option>
                      <option value="pattikad">Pattikad</option>
                      <option value="pattukkottai">Pattukkottai</option>
                      <option value="payyanur">Payyanur</option>
                      <option value="payyoli">Payyoli</option>
                      <option value="pedana">Pedana</option>
                      <option value="pedapulipaka">Pedapulipaka</option>
                      <option value="peddapuram">Peddapuram</option>
                      <option value="peelamedu">Peelamedu</option>
                      <option value="pehowa">Pehowa</option>
                      <option value="pen">Pen</option>
                      <option value="penugonda">Penugonda</option>
                      <option value="perambalur">Perambalur</option>
                      <option value="perambur">Perambur</option>
                      <option value="peravurani">Peravurani</option>
                      <option value="periyakulam">Periyakulam</option>
                      <option value="pernem">Pernem</option>
                      <option value="perumbavoor">Perumbavoor</option>
                      <option value="perundurai">Perundurai</option>
                      <option value="peruvemba">Peruvemba</option>
                      <option value="petlad">Petlad</option>
                      <option value="petlawad">Petlawad</option>
                      <option value="phagwara">Phagwara</option>
                      <option value="phaltan">Phaltan</option>
                      <option value="phillaur">Phillaur</option>
                      <option value="phulbani">Phulbani</option>
                      <option value="phulera">Phulera</option>
                      <option value="pilani">Pilani</option>
                      <option value="pilerne">Pilerne</option>
                      <option value="pilibangan">Pilibangan</option>
                      <option value="pilibhit">Pilibhit</option>
                      <option value="pilkhuwa">Pilkhuwa</option>
                      <option value="pimpalgaon">Pimpalgaon</option>
                      <option value="pimpri">Pimpri</option>
                      <option value="pipar">Pipar</option>
                      <option value="piriyapatna">Piriyapatna</option>
                      <option value="piro">Piro</option>
                      <option value="pithapuram">Pithapuram</option>
                      <option value="pithora">Pithora</option>
                      <option value="podakkudi">Podakkudi</option>
                      <option value="pokaran">Pokaran</option>
                      <option value="pollachi">Pollachi</option>
                      <option value="polur">Polur</option>
                      <option value="ponda">Ponda</option>
                      <option value="ponnani">Ponnani</option>
                      <option value="ponneri">Ponneri</option>
                      <option value="ponniammanmedu">Ponniammanmedu</option>
                      <option value="ponnur">Ponnur</option>
                      <option value="poranki">Poranki</option>
                      <option value="porbandar">Porbandar</option>
                      <option value="pothencode">Pothencode</option>
                      <option value="powai">Powai</option>
                      <option value="pratapgarh">Pratapgarh</option>
                      <option value="proddatur">Proddatur</option>
                      <option value="pudukad">Pudukad</option>
                      <option value="pudukkad">Pudukkad</option>
                      <option value="pudukkottai">Pudukkottai</option>
                      <option value="pulwama">Pulwama</option>
                      <option value="punalur">Punalur</option>
                      <option value="punasa">Punasa</option>
                      <option value="punch">Punch</option>
                      <option value="pune">Pune</option>
                      <option value="puri">Puri</option>
                      <option value="purnea">Purnea</option>
                      <option value="purnia">Purnia</option>
                      <option value="purul">Purul</option>
                      <option value="puruliya">Puruliya</option>
                      <option value="pusad">Pusad</option>
                      <option value="puthur">Puthur</option>
                      <option value="puttur">Puttur</option>
                      <option value="quepem">Quepem</option>
                      <option value="radhamohanpur">Radhamohanpur</option>
                      <option value="radhanpur">Radhanpur</option>
                      <option value="raebareli">Raebareli</option>
                      <option value="rahata">Rahata</option>
                      <option value="rahon">Rahon</option>
                      <option value="rahuri">Rahuri</option>
                      <option value="raichur">Raichur</option>
                      <option value="raiganj">Raiganj</option>
                      <option value="raigarh">Raigarh</option>
                      <option value="raipur">Raipur</option>
                      <option value="raisen">Raisen</option>
                      <option value="raja annamalaipuram">Raja annamalaipuram</option>
                      <option value="rajahmundry">Rajahmundry</option>
                      <option value="rajaldesar">Rajaldesar</option>
                      <option value="rajam">Rajam</option>
                      <option value="rajapalaiyam">Rajapalaiyam</option>
                      <option value="rajgarh">Rajgarh</option>
                      <option value="rajgurunagar">Rajgurunagar</option>
                      <option value="rajkot">Rajkot</option>
                      <option value="rajpipla">Rajpipla</option>
                      <option value="rajpura">Rajpura</option>
                      <option value="rajsamand">Rajsamand</option>
                      <option value="rajula">Rajula</option>
                      <option value="rajura">Rajura</option>
                      <option value="ramachandrapuram">Ramachandrapuram</option>
                      <option value="ramagundam">Ramagundam</option>
                      <option value="ramanathapuram">Ramanathapuram</option>
                      <option value="ramanattukara">Ramanattukara</option>
                      <option value="ramban">Ramban</option>
                      <option value="ramganj mandi">Ramganj mandi</option>
                      <option value="ramgarh">Ramgarh</option>
                      <option value="ramnagar">Ramnagar</option>
                      <option value="rampur">Rampur</option>
                      <option value="rampura">Rampura</option>
                      <option value="ramtek">Ramtek</option>
                      <option value="ranaghat">Ranaghat</option>
                      <option value="ranbirsinghpura">Ranbirsinghpura</option>
                      <option value="ranchi">Ranchi</option>
                      <option value="rander">Rander</option>
                      <option value="rangat">Rangat</option>
                      <option value="rangia">Rangia</option>
                      <option value="rangpo">Rangpo</option>
                      <option value="ranibennur">Ranibennur</option>
                      <option value="raniganj">Raniganj</option>
                      <option value="ranigaon">Ranigaon</option>
                      <option value="ranip">Ranip</option>
                      <option value="ranipet">Ranipet</option>
                      <option value="ranirbazar">Ranirbazar</option>
                      <option value="rann of kutch">Rann of kutch</option>
                      <option value="rasulabad">Rasulabad</option>
                      <option value="ratia">Ratia</option>
                      <option value="ratlam">Ratlam</option>
                      <option value="ratnagiri">Ratnagiri</option>
                      <option value="raurkela">Raurkela</option>
                      <option value="raver">Raver</option>
                      <option value="rawatbhata">Rawatbhata</option>
                      <option value="rawatpur">Rawatpur</option>
                      <option value="raxaul">Raxaul</option>
                      <option value="rayagada">Rayagada</option>
                      <option value="razampeta">Razampeta</option>
                      <option value="renigunta">Renigunta</option>
                      <option value="renukoot">Renukoot</option>
                      <option value="reodhar">Reodhar</option>
                      <option value="rewa">Rewa</option>
                      <option value="rewari">Rewari</option>
                      <option value="ringas">Ringas</option>
                      <option value="rishikesh">Rishikesh</option>
                      <option value="rishra">Rishra</option>
                      <option value="robertsganj">Robertsganj</option>
                      <option value="rohat">Rohat</option>
                      <option value="rohtak">Rohtak</option>
                      <option value="roorkee">Roorkee</option>
                      <option value="ropar">Ropar</option>
                      <option value="rosera">Rosera</option>
                      <option value="rudrapur">Rudrapur</option>
                      <option value="sabang">Sabang</option>
                      <option value="sabroom">Sabroom</option>
                      <option value="safidon">Safidon</option>
                      <option value="sagar">Sagar</option>
                      <option value="sagwara">Sagwara</option>
                      <option value="saha">Saha</option>
                      <option value="saharanpur">Saharanpur</option>
                      <option value="saharpur">Saharpur</option>
                      <option value="saharsa">Saharsa</option>
                      <option value="sahibabad">Sahibabad</option>
                      <option value="sakti">Sakti</option>
                      <option value="salar">Salar</option>
                      <option value="salem">Salem</option>
                      <option value="saligramam">Saligramam</option>
                      <option value="samalkha">Samalkha</option>
                      <option value="samalkot">Samalkot</option>
                      <option value="samana">Samana</option>
                      <option value="samastipur">Samastipur</option>
                      <option value="samba">Samba</option>
                      <option value="sambalpur">Sambalpur</option>
                      <option value="sambhal">Sambhal</option>
                      <option value="sami">Sami</option>
                      <option value="sampla">Sampla</option>
                      <option value="samrala">Samrala</option>
                      <option value="sanand">Sanand</option>
                      <option value="sanchor">Sanchor</option>
                      <option value="sangamner">Sangamner</option>
                      <option value="sanghol">Sanghol</option>
                      <option value="sangli">Sangli</option>
                      <option value="sangmeshwar">Sangmeshwar</option>
                      <option value="sangrur">Sangrur</option>
                      <option value="sanjarpur">Sanjarpur</option>
                      <option value="sanjauli">Sanjauli</option>
                      <option value="sanjemula">Sanjemula</option>
                      <option value="sankarankovil">Sankarankovil</option>
                      <option value="sankeshwar">Sankeshwar</option>
                      <option value="sanquelim">Sanquelim</option>
                      <option value="santa cruz">Santa cruz</option>
                      <option value="santirbazar">Santirbazar</option>
                      <option value="saoner">Saoner</option>
                      <option value="sapotra">Sapotra</option>
                      <option value="sarahan">Sarahan</option>
                      <option value="saran">Saran</option>
                      <option value="sarangpur">Sarangpur</option>
                      <option value="sardarshahr">Sardarshahr</option>
                      <option value="sardhar">Sardhar</option>
                      <option value="sardulgarh">Sardulgarh</option>
                      <option value="sasaram">Sasaram</option>
                      <option value="sasni">Sasni</option>
                      <option value="satara">Satara</option>
                      <option value="sathyamangalam">Sathyamangalam</option>
                      <option value="satna">Satna</option>
                      <option value="satrampadu">Satrampadu</option>
                      <option value="sattenapalle">Sattenapalle</option>
                      <option value="sattur">Sattur</option>
                      <option value="saugor">Saugor</option>
                      <option value="sausar">Sausar</option>
                      <option value="savarkundla">Savarkundla</option>
                      <option value="sawai madhopur">Sawai madhopur</option>
                      <option value="sawantwadi">Sawantwadi</option>
                      <option value="secunderabad">Secunderabad</option>
                      <option value="sehore">Sehore</option>
                      <option value="selaiyur">Selaiyur</option>
                      <option value="sendhwa">Sendhwa</option>
                      <option value="sendivakkam">Sendivakkam</option>
                      <option value="seohara">Seohara</option>
                      <option value="seoni">Seoni</option>
                      <option value="serampore">Serampore</option>
                      <option value="shadipur julana">Shadipur julana</option>
                      <option value="shadnagar">Shadnagar</option>
                      <option value="shahabad">Shahabad</option>
                      <option value="shahada">Shahada</option>
                      <option value="shahapur">Shahapur</option>
                      <option value="shahdol">Shahdol</option>
                      <option value="shahjanpur">Shahjanpur</option>
                      <option value="shahkot">Shahkot</option>
                      <option value="shahpur">Shahpur</option>
                      <option value="shahpura">Shahpura</option>
                      <option value="shahzadpur">Shahzadpur</option>
                      <option value="shaktinagar">Shaktinagar</option>
                      <option value="shamli">Shamli</option>
                      <option value="shanti niketan">Shanti niketan</option>
                      <option value="shantipur">Shantipur</option>
                      <option value="shikohabad">Shikohabad</option>
                      <option value="shikrapur">Shikrapur</option>
                      <option value="shillong">Shillong</option>
                      <option value="shimla">Shimla</option>
                      <option value="shimoga">Shimoga</option>
                      <option value="shirdi">Shirdi</option>
                      <option value="shirpur">Shirpur</option>
                      <option value="shirwal">Shirwal</option>
                      <option value="shivrajpur">Shivrajpur</option>
                      <option value="shobhapur">Shobhapur</option>
                      <option value="sholinganallur">Sholinganallur</option>
                      <option value="shoranur">Shoranur</option>
                      <option value="shrigonda">Shrigonda</option>
                      <option value="shujalpur">Shujalpur</option>
                      <option value="sibsagar">Sibsagar</option>
                      <option value="siddhapur">Siddhapur</option>
                      <option value="sidhi">Sidhi</option>
                      <option value="sidlaghatta">Sidlaghatta</option>
                      <option value="sihor">Sihor</option>
                      <option value="sikandrabad">Sikandrabad</option>
                      <option value="sikar">Sikar</option>
                      <option value="sikri">Sikri</option>
                      <option value="silchar">Silchar</option>
                      <option value="siliguri">Siliguri</option>
                      <option value="silvassa">Silvassa</option>
                      <option value="simaluguri">Simaluguri</option>
                      <option value="sindri">Sindri</option>
                      <option value="singhana">Singhana</option>
                      <option value="singrauli">Singrauli</option>
                      <option value="singur">Singur</option>
                      <option value="sirhind">Sirhind</option>
                      <option value="siris">Siris</option>
                      <option value="sirkazhi">Sirkazhi</option>
                      <option value="sirohi">Sirohi</option>
                      <option value="sirsa">Sirsa</option>
                      <option value="sirsi">Sirsi</option>
                      <option value="siruguppa">Siruguppa</option>
                      <option value="siruseri">Siruseri</option>
                      <option value="sirvar">Sirvar</option>
                      <option value="sitamarhi">Sitamarhi</option>
                      <option value="sitapur">Sitapur</option>
                      <option value="sitarganj">Sitarganj</option>
                      <option value="siuri">Siuri</option>
                      <option value="sivaganga">Sivaganga</option>
                      <option value="sivakasi">Sivakasi</option>
                      <option value="siwan">Siwan</option>
                      <option value="sohna">Sohna</option>
                      <option value="solan">Solan</option>
                      <option value="solapur">Solapur</option>
                      <option value="somnath">Somnath</option>
                      <option value="sonamukhi">Sonamukhi</option>
                      <option value="sonamura">Sonamura</option>
                      <option value="sonari">Sonari</option>
                      <option value="sonepur">Sonepur</option>
                      <option value="songadh">Songadh</option>
                      <option value="sonipat">Sonipat</option>
                      <option value="sonpur">Sonpur</option>
                      <option value="sopara">Sopara</option>
                      <option value="sopur">Sopur</option>
                      <option value="soreng">Soreng</option>
                      <option value="sosale">Sosale</option>
                      <option value="srikalahasti">Srikalahasti</option>
                      <option value="srikrishnapuram">Srikrishnapuram</option>
                      <option value="srinagar">Srinagar</option>
                      <option value="sriperumbudur">Sriperumbudur</option>
                      <option value="srivilliputhur">Srivilliputhur</option>
                      <option value="subhanpura">Subhanpura</option>
                      <option value="sujangarh">Sujangarh</option>
                      <option value="sullia">Sullia</option>
                      <option value="sultana">Sultana</option>
                      <option value="sultanpur">Sultanpur</option>
                      <option value="sulur">Sulur</option>
                      <option value="sumerpur">Sumerpur</option>
                      <option value="sunam">Sunam</option>
                      <option value="supaul">Supaul</option>
                      <option value="surajgarh">Surajgarh</option>
                      <option value="surandai">Surandai</option>
                      <option value="surat">Surat</option>
                      <option value="suratgarh">Suratgarh</option>
                      <option value="surendranagar">Surendranagar</option>
                      <option value="suriapet">Suriapet</option>
                      <option value="sutia">Sutia</option>
                      <option value="swarupnagar">Swarupnagar</option>
                      <option value="tadepalle">Tadepalle</option>
                      <option value="tadepallegudem">Tadepallegudem</option>
                      <option value="tadikonda">Tadikonda</option>
                      <option value="tadpatri">Tadpatri</option>
                      <option value="taki">Taki</option>
                      <option value="talcher">Talcher</option>
                      <option value="talegaon dabhade">Talegaon dabhade</option>
                      <option value="taleigao">Taleigao</option>
                      <option value="taliparamba">Taliparamba</option>
                      <option value="talod">Talod</option>
                      <option value="talwandi bhai">Talwandi bhai</option>
                      <option value="talwandi sabo">Talwandi sabo</option>
                      <option value="talwara">Talwara</option>
                      <option value="tambaram">Tambaram</option>
                      <option value="tamluk">Tamluk</option>
                      <option value="tamulpur">Tamulpur</option>
                      <option value="tanakpur">Tanakpur</option>
                      <option value="tanda">Tanda</option>
                      <option value="tandur">Tandur</option>
                      <option value="tankaria">Tankaria</option>
                      <option value="tanniyurnagaram">Tanniyurnagaram</option>
                      <option value="tanuku">Tanuku</option>
                      <option value="taoru">Taoru</option>
                      <option value="tarakeswar">Tarakeswar</option>
                      <option value="tarn taran">Tarn taran</option>
                      <option value="tattamangalam">Tattamangalam</option>
                      <option value="tavarikere">Tavarikere</option>
                      <option value="teliamura">Teliamura</option>
                      <option value="tellicherry">Tellicherry</option>
                      <option value="tendukheda">Tendukheda</option>
                      <option value="tezpur">Tezpur</option>
                      <option value="thalayolaparambu">Thalayolaparambu</option>
                      <option value="thaltej">Thaltej</option>
                      <option value="thana">Thana</option>
                      <option value="thane">Thane</option>
                      <option value="thanjavur">Thanjavur</option>
                      <option value="tharad">Tharad</option>
                      <option value="tharangambadi">Tharangambadi</option>
                      <option value="thenali">Thenali</option>
                      <option value="theni">Theni</option>
                      <option value="thenkasi">Thenkasi</option>
                      <option value="thiruvarur">Thiruvarur</option>
                      <option value="thodupuzha">Thodupuzha</option>
                      <option value="thoothukudi">Thoothukudi</option>
                      <option value="thottiyam">Thottiyam</option>
                      <option value="thrissur">Thrissur</option>
                      <option value="thuraiyur">Thuraiyur</option>
                      <option value="tikamgarh">Tikamgarh</option>
                      <option value="tindivanam">Tindivanam</option>
                      <option value="tinsukia">Tinsukia</option>
                      <option value="tiptur">Tiptur</option>
                      <option value="tira sujanpur">Tira sujanpur</option>
                      <option value="tiruchchendur">Tiruchchendur</option>
                      <option value="tiruchengode">Tiruchengode</option>
                      <option value="tiruchi">Tiruchi</option>
                      <option value="tiruchirappalli">Tiruchirappalli</option>
                      <option value="tirunelveli">Tirunelveli</option>
                      <option value="tirupati">Tirupati</option>
                      <option value="tirupattur">Tirupattur</option>
                      <option value="tiruppur">Tiruppur</option>
                      <option value="tirur">Tirur</option>
                      <option value="tiruvalla">Tiruvalla</option>
                      <option value="tiruvallur">Tiruvallur</option>
                      <option value="tiruvannamalai">Tiruvannamalai</option>
                      <option value="tiruvatra">Tiruvatra</option>
                      <option value="tista bazar">Tista bazar</option>
                      <option value="titlagarh">Titlagarh</option>
                      <option value="tivim">Tivim</option>
                      <option value="tohana">Tohana</option>
                      <option value="tonk">Tonk</option>
                      <option value="torangallu">Torangallu</option>
                      <option value="trivandram">Trivandram</option>
                      <option value="tuli">Tuli</option>
                      <option value="tumkūr">Tumkūr</option>
                      <option value="tumsar">Tumsar</option>
                      <option value="tundla">Tundla</option>
                      <option value="tuni">Tuni</option>
                      <option value="tura">Tura</option>
                      <option value="turavur">Turavur</option>
                      <option value="turuvekere">Turuvekere</option>
                      <option value="udaipur">Udaipur</option>
                      <option value="udalguri">Udalguri</option>
                      <option value="udgir">Udgir</option>
                      <option value="udhampur">Udhampur</option>
                      <option value="udupi">Udupi</option>
                      <option value="uguem">Uguem</option>
                      <option value="ujjain">Ujjain</option>
                      <option value="ukhrul">Ukhrul</option>
                      <option value="ulavapad">Ulavapad</option>
                      <option value="ulhasnagar">Ulhasnagar</option>
                      <option value="ullal">Ullal</option>
                      <option value="uluberiya">Uluberiya</option>
                      <option value="ulundurpet">Ulundurpet</option>
                      <option value="umaria">Umaria</option>
                      <option value="umarkhed">Umarkhed</option>
                      <option value="una">Una</option>
                      <option value="undi">Undi</option>
                      <option value="unjha">Unjha</option>
                      <option value="unnao">Unnao</option>
                      <option value="upleta">Upleta</option>
                      <option value="uppal">Uppal</option>
                      <option value="uran">Uran</option>
                      <option value="uslapur">Uslapur</option>
                      <option value="uttarkashi">Uttarkashi</option>
                      <option value="uttarpara">Uttarpara</option>
                      <option value="vadagam">Vadagam</option>
                      <option value="vadakarai">Vadakarai</option>
                      <option value="vadapalani">Vadapalani</option>
                      <option value="vadasinor">Vadasinor</option>
                      <option value="vaddem">Vaddem</option>
                      <option value="vadgam">Vadgam</option>
                      <option value="vadigenhalli">Vadigenhalli</option>
                      <option value="vadodara">Vadodara</option>
                      <option value="vaduj">Vaduj</option>
                      <option value="vaikam">Vaikam</option>
                      <option value="vallabh vidyanagar">Vallabh vidyanagar</option>
                      <option value="valsad">Valsad</option>
                      <option value="vandavasi">Vandavasi</option>
                      <option value="vandiperiyar">Vandiperiyar</option>
                      <option value="vaniyambadi">Vaniyambadi</option>
                      <option value="vapi">Vapi</option>
                      <option value="varanasi">Varanasi</option>
                      <option value="varkala">Varkala</option>
                      <option value="vasai">Vasai</option>
                      <option value="vasco da gama">Vasco da gama</option>
                      <option value="vashi">Vashi</option>
                      <option value="velacheri">Velacheri</option>
                      <option value="velappaya">Velappaya</option>
                      <option value="vellore">Vellore</option>
                      <option value="vemagiri">Vemagiri</option>
                      <option value="veraval">Veraval</option>
                      <option value="verna">Verna</option>
                      <option value="vesava">Vesava</option>
                      <option value="vidisha">Vidisha</option>
                      <option value="vidyanagar">Vidyanagar</option>
                      <option value="vijayawada">Vijayawada</option>
                      <option value="vijaywada">Vijaywada</option>
                      <option value="vikasnagar">Vikasnagar</option>
                      <option value="vikhroli">Vikhroli</option>
                      <option value="villupuram">Villupuram</option>
                      <option value="vinjamur">Vinjamur</option>
                      <option value="vinukonda">Vinukonda</option>
                      <option value="viramgam">Viramgam</option>
                      <option value="virar">Virar</option>
                      <option value="virudunagar">Virudunagar</option>
                      <option value="visakhapatnam">Visakhapatnam</option>
                      <option value="visavadar">Visavadar</option>
                      <option value="visnagar">Visnagar</option>
                      <option value="vissannapeta">Vissannapeta</option>
                      <option value="vivek vihar">Vivek vihar</option>
                      <option value="vizianagaram">Vizianagaram</option>
                      <option value="vriddhachalam">Vriddhachalam</option>
                      <option value="vrindavan">Vrindavan</option>
                      <option value="vuyyuru">Vuyyuru</option>
                      <option value="vyara">Vyara</option>
                      <option value="wada">Wada</option>
                      <option value="wadgaon">Wadgaon</option>
                      <option value="wadi">Wadi</option>
                      <option value="waidhan">Waidhan</option>
                      <option value="wandur">Wandur</option>
                      <option value="wanparti">Wanparti</option>
                      <option value="warangal">Warangal</option>
                      <option value="wardha">Wardha</option>
                      <option value="warud">Warud</option>
                      <option value="washim">Washim</option>
                      <option value="wellington">Wellington</option>
                      <option value="west mambalam">West mambalam</option>
                      <option value="whitefield">Whitefield</option>
                      <option value="yadgir">Yadgir</option>
                      <option value="yadwad">Yadwad</option>
                      <option value="yamunanagar">Yamunanagar</option>
                      <option value="yanam">Yanam</option>
                      <option value="yavatmal">Yavatmal</option>
                      <option value="yelahanka">Yelahanka</option>
                      <option value="yellapur">Yellapur</option>
                      <option value="yeola">Yeola</option>
                      <option value="yerwada">Yerwada</option>
                      <option value="zira">Zira</option>
                    </optgroup>
                  </select>
                  <i className="icon">
                    <CityIcon />
                  </i>
                  <div className="bg"></div>
                </div>
                <div className="con-input">

                  <RadioGroup aria-label="gender" name="gender1" row onChange={val => props.setGender(val.target.value)}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />

                  </RadioGroup>
                </div>

                <button className="buttn" onClick={Next} >Next</button>
                <span>or</span>
                <div className="afteror">
                  <Link to={'/signin'} className="new" >Already have an account</Link>
                </div></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    name: state.userDetails.fullName,
    email: state.userDetails.email,
    phone: state.userDetails.phone,
    city: state.userDetails.city,
    gender: state.userDetails.gender,
  }
}


const mapDispatchToProps = dispatch => {
  return {

    setName: data => {
      dispatch({
        type: 'SET_NAME',
        name: data
      })
    },
    setEmail: data => {
      dispatch({
        type: 'SET_EMAIL',
        email: data
      })
    },
    setPhone: data => {
      dispatch({
        type: "SET_PHONE",
        phone: data
      })
    },
    setCity: data => {
      dispatch({
        type: 'SET_CITY',
        city: data
      })
    },
    setGender: data => {
      dispatch({
        type: 'SET_GENDER',
        gender: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);