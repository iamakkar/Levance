import React from 'react'
import './main_new.css'
import Location from "@material-ui/icons/PersonPinCircle";

function App() {
    return (
        <>
        <div className='db_rect' ></div>
        <div className='db_app'>
            <div className='db_child1' >
                <div className='db_child1_child1'></div>
                <img src={require("./yash.svg")} alt={"Error-404"} />
            </div>
            <div className='db_child2'>
                <div className='db_child2_child1'>
                <h2>Full Name</h2>
                <p>@username</p>
                <p><Location />Address</p>
                <div class='chip' style={{marginTop: 10 ,border: 'aliceblue', borderWidth: 1}} >Category 1</div>
                <div class='chip' style={{marginTop: 10 ,border: 'aliceblue', borderWidth: 1}} >Category 2</div>
                <div class='chip' style={{marginTop: 10 ,border: 'aliceblue', borderWidth: 1}} >Category 3</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default App