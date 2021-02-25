import React from 'react';
import {useHistory} from 'react-router-dom';
import './Process.css';

export default function App() {
    const history = useHistory();
    return (
        <>
        <div className='bp-container' >
            <div className='bp-title'>
                <h1>How does it Work?</h1>
            </div>
            <div className='bp-content'>
                <div className='bp-wood' style={{backgroundColor: '#e76f51'}} >
                    <h3 className='bp-phase'>1. Planning</h3>
                </div>
                <div className='bp-content1' >
                    <img src={require("./plan.svg").default} alt={"levance-home-influencer-connected-image"} />
                    <ol className='bp-list1' >
                        <li>Let us know about your requirements</li>
                        <li>Get a list of sample influencers</li>
                        <li>Transact 50% of the amount if you like it</li>
                    </ol>
                </div>
                <div className='bp-wood' style={{backgroundColor: '#264653'}} >
                    <h3 className='bp-phase' style={{color: 'aliceblue'}} >2. Curating</h3>
                </div>
                <div className='bp-content2' >
                    <ol className='bp-list2' >
                        <li>Get the full list of influencers</li>
                        <li>Eliminate the influencers you don't like, if any</li>
                        <li>Approve the final list to proceed further</li>
                    </ol>
                    <img src={require("./prepare.svg").default} alt={"levance-home-influencer-connected-image"} />
                </div>
                <div className='bp-wood' style={{backgroundColor: '#f4a261'}} >
                    <h3 className='bp-phase'>3. Executing</h3>
                </div>
                <div className='bp-content1' >
                    <img src={require("./attack.svg").default} alt={"levance-home-influencer-connected-image"} />
                    <ol className='bp-list1' >
                        <li>Brief us about the whole campaign</li>
                        <li>We'll guide the influencers accordingly</li>
                        <li>We'll ship the products to them</li>
                    </ol>
                </div>
                <div className='bp-wood' style={{backgroundColor: '#2a9d8f'}} >
                    <h3 className='bp-phase' style={{color: 'aliceblue'}}>4. Dissecting</h3>
                </div>
                <div className='bp-content2' >
                    <ol className='bp-list2' >
                        <li>Cheers! Campaign Completed!</li>
                        <li>Transact the remaining amount</li>
                        <li>Get a detailed analytical report along with post links</li>
                    </ol>
                    <img src={require("./win.svg").default} alt={"levance-home-influencer-connected-image"} />
                </div>
                <div className='bp-wood-btn' >
                    <button class="waves-effect waves-light btn-large" onClick={() => history.push('/brandregister')} style={{borderRadius: 5, backgroundColor: '#4c4b77'}}>Register Now!</button>
                </div>
            </div>
        </div>
        </>
    );
}