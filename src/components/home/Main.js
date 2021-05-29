import React from 'react'
import './Main.css'
import { Parallax } from 'react-parallax';
import {withRouter} from 'react-router-dom'

function App(props) {
    const Card = ({num, des, head}) => {
        return(
            <div className="home-brand-pr-crd">
                <div><span>{num}</span></div>
                <h3>{head}</h3>
                <p>{des}</p>
            </div>
        )
    }

    const CardI = ({num, des, head}) => {
        return(
            <div className="home-brand-pr-crd">
                <div><span style={{color: '#3d3d3d'}} >{num}</span></div>
                <h3 style={{color: '#3d3d3d'}} >{head}</h3>
                <p style={{color: '#3d3d3d'}} >{des}</p>
            </div>
        )
    }

    return(
        <>
        <Parallax bgImage={"/assets/home.jpg"} strength={500} className="bg-image" >
            <div className="bg-image-div">
            <div className="home-btn1">
                <button className="btn1-style" onClick={() => props.history.push("/influencer")} >I'm an Influencer</button>
            </div>
            <div className="home-btn2">
                <button outline className="btn2-style" onClick={() => props.history.push("/brand")} >I'm a Brand</button>
            </div>
            </div>
        </Parallax>
        <h2 className="home-abtus" >About Levance:</h2>
        <div className="home-abtus-und" ></div>
        <p className="home-abtus-txt1">Levance is a peculiar influencer marketing platform that works with nano and micro influencers.</p>
        <p className="home-abtus-txt2">We provide the most reliable and cost-effective influencer marketing services. We help brands gaining a lot more eyeballs on their products by connecting them with the best set of social media influencers, and eventually, attaining high customer attention. With our team of diligent marketers and influencers with high engagement rates, we tend to deliver the best ROI.</p>
        <p className="home-abtus-txt3">"Grow Good, Evolve Better"</p><br/>
        {/* <button className="home-abtus-btn" >Contact Us →</button> */}
        <div className="home-brand" >
            <h2 className="home-brand-hd" >How it Works for Brands</h2> 
            <div className="home-brand-und" ></div>
            <div className="home-brand-pr">
                <Card num="1" head="Campaign Brief" des="Tell us about your campaign objectives, expectations, and your product. These may also include the influencer's niche, content type etc. Receive a custom sample list of influencers for your product, approve the list and proceed further." />
                <Card num="2" head="Creating a Campaign" des="Our team will design the most suitable and cost-effective campaign with the best set of influencers for your product/service. We will train the influencers according to your requirements and regular follow-ups will be done throughout the campaign." />
                <Card num="3" head="Results & Chill" des="Sit back and enjoy the ever-engaging content made by our creators to showcase your brand on social media. Once all the content goes live, we'll send you complete campaign metrics and analytics along with all content links." />
            </div>
            <button className="home-brand-btn" onClick={() => props.history.push("/brand")} >Get a Quote →</button>
        </div>
        <div className="home-brand" style={{marginTop: 0, backgroundColor: '#58d3e6'}} >
            <h2 className="home-brand-hd" style={{color: '#3d3d3d'}}>How it Works for Influencers</h2>
            <div className="home-infl-und" ></div>
            <div className="home-brand-pr" style={{backgroundColor: '#58d3e6'}} >
                <CardI num="1" head="Join the Community" des={`Click the "Register Now" button below to get yourself registered with us in less than 2 minutes. Fill in your basic details, your social media handles and choose the categories that suit best your content.`} />
                <CardI num="2" head="Participate in Campaigns" des="Follow us on Instagram, where we post details about all the ongoing campaigns, participate in the one's you like. Else, our campaign managers are always there to reach out to you with all the suitable campaigns." />
                <CardI num="3" head="Create for Credit" des="Blow the trumpet with your jaw-dropping content and make your audience believe in the brand you are promoting. Finally, get paid on successfully campaign completion and wait for the next one!" />
            </div>
            <button className="home-brand-btn" onClick={() => props.history.push("/influencer")} >Register Now →</button>
        </div>
        <div className="home-why-top" >
            <h1 className="home-why-head">Why Levance?</h1>
            <div className="home-infl-und" ></div>
        <div className="home-why">
            <div className="home-why-chld">
                <img src="/assets/c1.png" alt="err" />
                <p>Connect with hundreds of bona-fied influencers accross various platforms</p>
            </div>
            <div className="home-why-chld">
                <img src="/assets/c2.png" alt="err" />
                <p>Get high ROI And most scalable campaigns</p>
            </div>
            <div className="home-why-chld">
                <img src="/assets/c3.png" alt="err" />
                <p>Get insightfull, data driven campaigns</p>
            </div>
            <div className="home-why-chld">
                <img src="/assets/c4.png" alt="err" />
                <p>Make your brand name to reach right target audience with us</p>
            </div>
        </div>
        </div>
         </>
    )
}

export default withRouter(App);