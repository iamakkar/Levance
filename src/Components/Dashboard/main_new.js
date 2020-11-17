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
       
            <div className="container-fluid">
                <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col s12 m12 db_rect">
                    </div>
                </div>
                <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col s12 m3 center-align profileSide">
                        <div className="profilePic">
                        <img src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="profileImage" />
                        <input type='file' className="profileImageChange" id='profileImageChange'/>
                        <label for='profileImageChange' className='profileImageChangeLabel'>Change profile image</label>
                        </div>
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