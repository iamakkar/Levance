import React from "react";
import "./main.css";
import {useHistory} from 'react-router-dom'

function App() {
 
  const history = useHistory();

  return (
    <div class="Home">
      <div class="section1">
        
        <img src={require("./1img.svg")} alt={"Error-404"} />
        <div class="content1">
          <p class="p1">
              Intelligent
            </p>
            <p class="p2">
              Influencer Marketing
            </p>
            <p class="p3">
              Solutions
            </p>
        </div>
 
        
        {/* <h1>
          Delivering Intelligent Influencer Marketing Solutions
        </h1> */}
        {/* <p>
          To generate world-class content at scale, speed
          <br></br>
          and a fraction of the cost.  
        </p> */}
        
      </div>
      {/* <hr></hr>- */}
 
      <div class="section2">
        <div class="section2-lite">
        <button class="btnhome" onClick={() => history.push('/createaccount1')} >I'M INFLUENCER</button>
        <br></br>
        <button class="btnhome">I'M BRAND</button>
        </div>
      </div>
      {/* <hr></hr> */}
 
      <div class="section3">
        <h1>Why Levance ? </h1>
        <div class="s3">
          {/* <img src={require("./2img.svg")} alt={"Error-404"} /> */}
        </div>
        <div class="content2">
          <div class="row1">
            <img src={require("./c1.png")} alt={"Error-404"} />
            <p>Connect with hundreds of <br></br>bona-fied Influencer accross various platforms</p>
          </div>
          <div class="row2">
            <img src={require("./c2.png")} alt={"Error-404"} />
            <p>Get high ROI And most scalable campaigns</p>
          </div>
          <div class="row3">
            <img src={require("./c3.png")} alt={"Error-404"} />
            <p>Get inghtfull, data driven campaigns</p>
          </div>
          <div class="row4">
            <img src={require("./c4.png")} alt={"Error-404"} />
            <p>Make your brand name to reach right target audience with us </p>
          </div>
        </div>
        
      </div>
 
    </div>
 
  );
}
 
export default App;