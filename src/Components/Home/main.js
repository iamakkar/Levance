import React from "react";
import "./main.css";
import { useHistory,Link } from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YoutubeIcon from '@material-ui/icons/YouTube';
import M from "materialize-css"

function App() {

  const history = useHistory();
  // document.addEventListener('DOMContentLoaded', function () {
  //   var elems = document.querySelectorAll('.carousel');
  //   M.Carousel.init(elems, {
  //     fullWidth: false,
  //     indicators: true
  //   });

  //   var el = document.querySelector(".carousel");
  //   var l = M.Carousel.getInstance(el);
  //   setInterval(() => {
  //     l.next();
  //   }, 3000);

  // });
  // window.onscroll = function () {
  //   var eventsNo = document.getElementById("eventsNo").getBoundingClientRect();

  //   var studentsNo = document.getElementById("studentsNo").getBoundingClientRect();

  //   var expertsNo = document.getElementById("expertsNo").getBoundingClientRect();
   
  //   if (Math.floor(eventsNo.top - window.scrollY) <= 0 && Math.floor(eventsNo.top - window.scrollY) >= -100) {
  //     var x = 200;
  //     var s = setInterval(() => {
  //       document.getElementById("eventsNo").innerText = "+" + x;
  //       x = x + 1;
  //       if (x > 500)
  //         clearInterval(s);
  //     }, 5);
  //   }
  //   if (Math.floor(studentsNo.top - window.scrollY) <= 0 && Math.floor(studentsNo.top - window.scrollY) >= -100) {
  //     var y = 500;
  //     var p = setInterval(() => {

  //       document.getElementById("studentsNo").innerText = "+" + y;
  //       y = y + 1;
  //       if (y > 900)
  //         clearInterval(p);
  //     }, 1.25);
  //   }
  //   if (Math.floor(expertsNo.top - window.scrollY) <= 0 && Math.floor(expertsNo.top - window.scrollY) >= -100) {
  //     var z = 400;
  //     var t = setInterval(() => {
  //       document.getElementById("expertsNo").innerText = "+" + z;
  //       z = z + 1;
  //       if (z > 750)
  //         clearInterval(t);
  //     }, 2.5);
  //   }
  // }




  return (
    <div class="Home">

      <div class="section1">

        <img src={require("./1img.svg").default} alt={"levance-home-image-1"} />
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
        </p>
        */}
      </div>
      {/* <hr></hr>- */}

      <div class="container-fluid" style={{backgroundColor:"rgb(88, 211, 230)"}}>
        <div className="row section2_upperRow">
          <div className="col s12">
            <h1 className="center-align" data-aos="fade-up">Sign Up</h1>
          </div>
        </div>
        <div class="row section2_middleRow_edit">
          <div class="col s12 m6 center-align" data-aos="fade-in">
            <img src={require("../Home/influencer.png").default} className="influencer_brand_logo" alt={"levance-home-influencer-image"} />
            <button class="btnhome" onClick={() => history.push('/createaccount1')}>I'M AN INFLUENCER</button>
            <br></br>
          </div>
          <div class="col s12 m6 center-align" data-aos="fade-in">
            <img src={require("../Home/brand.png").default} className="influencer_brand_logo" alt={"levance-home-brand-image"} />
            <button class="btnhome" onClick={() => history.push('/brandprocess')} >I'M A BRAND</button>
          </div>
        </div>
      </div>

      <div class="container">
        <div className="row">
          <div className="col s12">
            <h1 className="center-align"  data-aos="fade-up">Why Levance ? </h1>
          </div>
        </div>
        <div class="s3">
          {/* <img src={require("./2img.svg").default} alt={"Error-404"} /> */}
        </div>
        <div class="row">
          <div class="col m3 s12"  data-aos="flip-right">
            <img src={require("./c1.png").default} alt={"levance-home-influencer-connected-image"} className="home_branding_logo" />
            <p className="center-align flow-text">Connect with hundreds of <br></br>bona-fied Influencer accross various platforms</p>
          </div>
          <div class="col m3 s12" data-aos="flip-left">
            <img src={require("./c2.png").default} alt={"levance-home-get-high-earns-image"} className="home_branding_logo" />
            <p className="center-align flow-text">Get high ROI And most scalable campaigns</p>
          </div>
          <div class="col m3 s12" data-aos="flip-right">
            <img src={require("./c3.png").default} alt={"levance-home-data-driven-campaigns"} className="home_branding_logo" />
            <p className="center-align flow-text">Get insightfull, data driven campaigns</p>
          </div>
          <div class="col m3 s12" data-aos="flip-left">
            <img src={require("./c4.png").default} alt={"levance-home-brand-target-image"} className="home_branding_logo" />
            <p className="center-align flow-text">Make your brand name to reach right target audience with us </p>
          </div>
        </div>

      </div>

      {/* <div class="container-fluid  blue lighten-2">
        <div className="row section2_upperRow">
          <div className="col s12">
            <h1 className="center-align" data-aos="fade-up">Daily Engagement</h1>
          </div>
        </div>
        <div className="container">
          <div className="row section2_upperRow">
            <div class="col m4 s12">
              <div class="card-panel valueIncrease light-blue darken-1 z-depth-3" data-aos="flip-up" data-aos-duration="1000">
                <div class="card-content white-text">
                  <span class="card-title">
                    <h1 className="center align" id="eventsNo">+500</h1>

                    <h3 className="center align">
                      <InstagramIcon style={{ fontSize: '5rem' }} />

                    </h3>

                  </span>

                </div>

              </div>
            </div>
            <div class="col m4 s12">
              <div class="card-panel valueIncrease cyan darken-1 z-depth-3" data-aos="flip-up" data-aos-duration="1000">
                <div class="card-content white-text">
                  <span class="card-title">
                    <h1 className="center align" id="studentsNo">+900</h1>

                    <h3 className="center align">
                      <FacebookIcon style={{ fontSize: '5rem' }} />

                    </h3>
                  </span>
                </div>

              </div>
            </div>
            <div class="col m4 s12">
              <div class="card-panel valueIncrease teal accent-3 z-depth-3" data-aos="flip-up" data-aos-duration="1000">
                <div class="card-content white-text">
                  <span class="card-title">
                    <h1 className="center align" id="expertsNo">+750</h1>

                    <h3 className="center align">
                      <YoutubeIcon style={{ fontSize: '5rem' }} />

                    </h3>

                  </span>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
       */}
      
      {/* <div className="container">
      <div className="row section2_upperRow">
          <div className="col s12">
            <h1 className="center-align" data-aos="fade-up">Reviews</h1>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12">
            <div class="carousel carousel-slider center">

              <div class="carousel-item card blue darken-4 reviewCard z-depth-5" href="#one!">
                <div class="card-content white-text">
                  <span class="card-title"><img src={require("../Home/avatar_male.png").default} className="reviewLogo" alt={"Error-404"} /></span>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                

              </div>
              <div class="carousel-item card blue darken-4 reviewCard" href="#two!">
                <div class="card-content white-text">
                  <span class="card-title"><img src={require("../Home/avatar_male.png").default} className="reviewLogo" alt={"Error-404"} /></span>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                

              </div>
              <div class="carousel-item card blue darken-4 reviewCard" href="#three!">
                <div class="card-content white-text">
                  <span class="card-title"><img src={require("../Home/avatar_male.png").default} className="reviewLogo" alt={"Error-404"} /></span>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container-fluid" style={{backgroundColor:"rgb(88, 211, 230)"}}>
        <div className="row">
          <div className="col m6 s12 center-align">
            <ul className="white-text">

              <li><h5><Link to="/signin" className="white-text">Sign In</Link></h5></li>
              
              <li><h5><Link to="/createaccount1" className="white-text">Sign Up</Link></h5></li>
              <li><h5><a href="mailto:levancemarketing@gmail.com" className="white-text">Contact Us</a></h5></li>
            </ul>

          </div>
          <div className="col m6 s12 center-align">
          <a href="/" class="brand-logo-footer"><div class="logo">
        <img src={require("../../logo/Levance4.png").default}  alt={"levance-home-logo"} />
        </div></a>
          </div>
        </div>
        <div className="row" style={{backgroundColor:"#4c4b77",marginBottom:"0"}}>
          <div className="col s12 m12">
          <p className="center-align white-text">&#169; Copyrights retained by Levance</p>
          </div>
        </div>
      </div> */}
    </div>



  );
}

export default App;