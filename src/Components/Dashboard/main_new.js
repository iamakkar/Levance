import React from 'react'
import './main_new.css'
import Location from "@material-ui/icons/PersonPinCircle";
import M from 'materialize-css'

function App() {


    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });


    const handleChange = () => {
        M.toast({ html: 'Done here' })
    }
    return (
        <>
            {/* <div class="main">
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
        </div> */}
            {/* <div className="container profileBox">
                <header className=" imageBackground">

                </header>
                <div className="row">
                    <div className="col s12 m5 center-align">
                        <img src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="profilePic" />
                        <h4>Name</h4>
                        <p>@Username</p>
                        <p><Location />Somewhere in this world</p>
                        <div className="categories">Category 1</div>
                        <div className="categories">Category 2</div>
                        <div className="categories">Category 3</div>
                    </div>
                </div>
            </div>
    */}
            <div className="container-fluid">
                <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col s12 m12 db_rect">
                    </div>
                </div>
                <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col s12 m3 center-align profileSide">
                        <img src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="profilePic" />
                        <h4>Name</h4>
                        <p>@Username</p>
                        <p><Location />Somewhere in this world</p>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col s12 m4">
                                    <div className="categories">Category 1</div>
                                </div>  <div className="col s12 m4">
                                    <div className="categories">Category 2</div>
                                </div>  <div className="col s12 m4">
                                    <div className="categories">Category 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m9 campaignBox">
                        <div className="teal lighten-2 white-text"><marquee>Notification</marquee></div>
                        <div className="campaign">
                            <h3>Brand</h3>
                            <h6>Description:</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a class="btn waves-effect waves-light right modal-trigger" href="#modal1" >Accept
    <i class="material-icons right">send</i>
                            </a>

                        </div>
                        <div className="campaign">
                            <h3>Brand</h3>
                            <h6>Description:</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a class="btn waves-effect waves-light right modal-trigger" href="#modal1"  name="action">Accept
    <i class="material-icons right">send</i>
                            </a>
                        </div>
                        <div className="campaign">
                            <h3>Brand</h3>
                            <h6>Description:</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a class="btn waves-effect waves-light right modal-trigger" href="#modal1"  name="action">Accept
    <i class="material-icons right">send</i>
                            </a>
                        </div>
                        <div className="campaign">
                            <h3>Brand</h3>
                            <h6>Description:</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a class="btn waves-effect waves-light right modal-trigger" href="#modal1"  name="action">Accept
    <i class="material-icons right">send</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Levance</h4>
                    <p>Are you sure ?</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={handleChange}>Agree</a>
                    <a href="#!" class="modal-close waves-effect waves-red btn-flat"  >Cancel</a>

                </div>
            </div>
        </>
    )
}

export default App