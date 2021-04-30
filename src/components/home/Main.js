import React from 'react'
import './Main.css'
import { Parallax } from 'react-parallax'

function App() {
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
        </>
    )
}

export default App;