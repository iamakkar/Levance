import React from 'react'
import './Main.css'
import { Parallax } from 'react-parallax';
import { SocialIcon } from 'react-social-icons'; 
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
            <button className="home-brand-btn" onClick={() => props.history.push("/brand")} >Register Now →</button>
        </div>
        <div className="home-brand" style={{marginTop: 0, backgroundColor: '#58d3e6'}} >
            <h2 className="home-brand-hd" style={{color: '#3d3d3d'}}>How it Works for Influencers</h2>
            <div className="home-infl-und" ></div>
            <div className="home-brand-pr" style={{backgroundColor: '#58d3e6'}} >
                <CardI num="1" head="Campaign Brief" des="Tell us about your brand objectives, campaign expectations, and desired results. These may include the product, content type, etc." />
                <CardI num="2" head="Creating a Campaign" des="Our team will find the best set of influencers for the campaign and will send a sample list for you to approve. We'll also design the whole campaign." />
                <CardI num="3" head="Results & Chill" des="Our creators build innovative content to showcase your brand on social media. We'll send you complete campaign metrics and analytics." />
            </div>
            <button className="home-brand-btn" onClick={() => props.history.push("/influencer")} >Register Now →</button>
        </div>
        <div className="home-team">
            <div className="home-team-chld" >
                <img src='/assets/me.jpeg' alt='err' />
                <h4>Deepansh Makkar</h4>
                <div>
                    <SocialIcon className="socialicon" network="linkedin" url="https://www.linkedin.com/in/deepansh-makkar-175012197/" />
                    <SocialIcon className="socialicon" network="instagram" url="https://www.instagram.com/iamakkar" />
                    <SocialIcon className="socialicon" network="email" url="mailto:makkardeepansh@gmail.com" />
                </div>
                <p>Pranay previously co-founded LetsIntern.com (leading platform for college students to find internships in India) from 2010 until it's acquisition in 2016. From starting volunteering at the age of 14, to leading global teams at AIESEC through college, Pranay has always been most passionate about solving real world & business problems at scale. He loves talking shop (dhanda), new ideas & technologies, advertising, music, travel & everything cool.</p>
            </div>
        </div>
         </>
    )
}

export default withRouter(App);