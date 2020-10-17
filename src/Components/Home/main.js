import React from "react";
import "./main.css";
// import {Link} from 'react-router-dom'



function App() {

  return (
    <div class="Home">
      

      <div class="section1">
        
          <img src={require("./1img.svg")} alt={"Error-404"} />
        
        <h1>
          Enhances 
          <br></br>
          Your lifestyle
        </h1>
        <p>
          To generate world-class content at scale, speed
          <br></br>
          and a fraction of the cost.  
        </p>
        
      </div>
      {/* <hr></hr>- */}

      <div class="section2">
        <div class="section2-lite">
        <button class="btnhome">I'M INFLUENCER</button>
        <br></br>
        <button class="btnhome">I'M BRAND</button>
        </div>
      </div>
      {/* <hr></hr> */}

      <div class="section3">
        <h1>Why Levance ? </h1>
        
        <img src={require("./2img.svg")} alt={"Error-404"} />
        <div class="content">
        <ul>
          
        </ul>

        </div>
        
      </div>

    </div>

  );
}

export default App;


