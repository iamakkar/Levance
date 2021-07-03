import React from 'react'
import "./Footer.css";
import { SocialIcon } from 'react-social-icons';
import { withRouter } from 'react-router';

function App(props) {
    return (
        <>
            <div className="footer-cont" >
                <div className="footer-des" >
                    <h2>levance.in</h2>
                    <span>"Grow Good, Evolve Better"</span>
                    <div className="footer-ico" >
                        <SocialIcon className="socialicon" network="linkedin" url="https://www.linkedin.com/company/levance" fgColor='#fff' />
                        <SocialIcon className="socialicon" network="instagram" url="https://www.instagram.com/levance.in" fgColor='#fff' />
                        <SocialIcon className="socialicon" network="email" url="mailto:team@levance.in" fgColor='#fff' />
                        <SocialIcon className="socialicon" network="facebook" url="https://www.facebook.com/levance.in" fgColor='#fff' />
                    </div>
                </div>
                <div className="footer-ser" >
                    <h4>Quick Links:</h4>
                    <span onClick={() => props.history.push("/")}>Home</span>
                    <span onClick={() => props.history.push("/brand")}>I am a Brand</span>
                    <span onClick={() => props.history.push("/influencer")}>I am an Influencer</span>
                </div>
                <div className="footer-des" >
                    <h4>About Us:</h4>
                    <div className="footer-abt-chld" >
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z" /></svg>
                            {'\t'}+91-7082811778<br />+91-7404224590</p>
                    </div>
                    <div className="footer-abt-chld" >
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>
                            {'\t'}team@levance.in</p>
                    </div>
                    {/* <div className="footer-abt-chld" >
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>
                            {'\t'}Panipat, Haryana 132103</p>
                    </div> */}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', backgroundColor: 'black' }} >
                <span style={{ color: 'gray', textAlign: 'center' }} >&#169; 2021 Levance.in All Rights Reserved{'\n'}</span>
                <span style={{ color: 'gray', textAlign: 'center' }} >Designed & Developed by <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/deepansh-makkar-175012197/" >iamakkar</a></span>
            </div>
        </>
    )
}

export default withRouter(App);
