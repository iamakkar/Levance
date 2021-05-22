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
                <button className="btn1-style" >I'm an Influencer</button>
            </div>
            <div className="home-btn2">
                <button outline className="btn2-style" >I'm a Brand</button>
            </div>
            </div>
        </Parallax>
        <h2 className="home-abtus" >About Levance:</h2>
        <div className="home-abtus-und" ></div>
        <p className="home-abtus-txt1">Levance is one of the most reliable and cost-efficient influencer marketing agency in India.</p>
        <p className="home-abtus-txt2">We at Levance are here to fetch the brands the right set of influencers. With our team of diligent marketers and influencers with high engagement rates, we tend to deliver the best RoI.</p>
        <p className="home-abtus-txt2">Our Motto is:</p>
        <p className="home-abtus-txt3">"Grow Good, Evolve Better"</p>
        <button className="home-abtus-btn" >Contact Us →</button>
        <div className="home-brand" >
            <h2 className="home-brand-hd" >Are You a Brand?</h2>
            <div className="home-brand-und" ></div>
            <div className="home-brand-pr">
                <Card num="1" head="Campaign Brief" des="Tell us about your brand objectives, campaign expectations, and desired results. These may include the product, content type, etc." />
                <Card num="2" head="Creating a Campaign" des="Our team will find the best set of influencers for the campaign and will send a sample list for you to approve. We'll also design the whole campaign." />
                <Card num="3" head="Results & Chill" des="Our creators build innovative content to showcase your brand on social media. We'll send you complete campaign metrics and analytics." />
            </div>
            <button className="home-brand-btn" onClick={() => props.history.push("/brand")} >Know More →</button>
        </div>
        <div className="home-brand" style={{marginTop: 0, backgroundColor: '#58d3e6'}} >
            <h2 className="home-brand-hd" style={{color: '#3d3d3d'}}>Are You an Influencer?</h2>
            <div className="home-infl-und" ></div>
            <div className="home-brand-pr" style={{backgroundColor: '#58d3e6'}} >
                <CardI num="1" head="Campaign Brief" des="Tell us about your brand objectives, campaign expectations, and desired results. These may include the product, content type, etc." />
                <CardI num="2" head="Creating a Campaign" des="Our team will find the best set of influencers for the campaign and will send a sample list for you to approve. We'll also design the whole campaign." />
                <CardI num="3" head="Results & Chill" des="Our creators build innovative content to showcase your brand on social media. We'll send you complete campaign metrics and analytics." />
            </div>
            <button className="home-brand-btn" >Know More →</button>
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