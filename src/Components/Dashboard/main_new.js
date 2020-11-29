import React, { Component, useState } from 'react'
import './main_new.css'
import Location from "@material-ui/icons/PersonPinCircle";
import M from 'materialize-css'
import Navbar from "./navbar"
import axios from 'axios';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import {Modal,Button} from "react-materialize"
function App(props) {


  const [user, setUser] = useState(props);
  const [campaigns, SetCampaigns] = useState([]);
  const [selectedCampaign, SetSelectedCampaign] = useState({});
  const [selectedFile, setSelectedFile] = useState();



  const handleSubmitFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('Error');
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await axios({
        url: '/api/upload',
        method: 'POST',
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        },
      })
      console.log(res)
      setUser({
        ...user,
        profilePic: res.data.profilePic
      })
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(async () => {
    const res = await axios({
      url: "/getdetails",
      method: "GET",
      headers: {
        'authorization': `Bearer ${localStorage.token}`
      }
    })
    console.log(res)
    const user = res.data;
    props.setEmail(user.email);
    props.setName(user.fullName);
    props.setCity(user.city);
    props.setUsername(user.username);
    props.setCategories(user.categories);
    console.log(props)
    setUser(user)
    axios.get("/campaign").then(res => {
      console.log(res.data.campaigns)
      SetCampaigns(res.data.campaigns);
    })
  }, [])
  const handleChange = () => {
    const userId = user._id;
    const email = props.email;
    const fullName = props.fullName;
    const campaignId = selectedCampaign._id;
    const interestedInfluencer = {
      userId, email, fullName, campaignId
    }
    axios.put("/addInfluencer", interestedInfluencer).then(res => {
      console.log(res);
      const updatedCampaigns = campaigns.map(campaign => {
        console.log(campaign)
        if (campaign._id == res.data._id) {
          return res.data
        }
        else
          return campaign
      })
      console.log(updatedCampaigns)
      SetCampaigns(updatedCampaigns);
      M.toast({ html: 'Done here' })
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m12 db_rect">
          </div>
        </div>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m3 center-align profileSide">
            <div className="profilePic">
              <img src={user.profilePic} className="profileImage" />
              <input type='file' className="profileImageChange" id='profileImageChange' onChange={handleSubmitFile} />
              <label for='profileImageChange' className='profileImageChangeLabel'>Change profile image</label>
            </div>
            <h4>{user.fullName}</h4>
            <p>@{user.username}</p>
            <p><Location />{user.city}</p>


            <div className="container-fluid">
              <div className="row">
                {
                  user.categories.map(item => {
                    return (
                      <div className="col s12 m4">
                        <div className="categories">{item}</div>
                      </div>
                    )
                  })

                }
              </div>
            </div>
            

            <Modal
  actions={[
    <Button flat modal="close" node="button" waves="green">Close</Button>
  ]}
  bottomSheet={false}
  fixedFooter={false}
  header="Modal Header"
  id="Modal-0"
  open={false}
  options={{
    dismissible: true,
    endingTop: '10%',
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    opacity: 0.5,
    outDuration: 250,
    preventScrolling: true,
    startingTop: '4%'
  }}
  root={document.body}
  trigger={<Button node="button">Edit Profile</Button>}
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  </p>
</Modal>



          </div>
          <div class="col s12 m9 campaignBox">
            <div className="teal lighten-2 white-text"><marquee>Notification</marquee></div>
            {/* {campaigns.map(campaign => {
              return (<div className="campaign">
                <h3>{campaign.brandName}</h3>
                <h6>Description:</h6>
                <p>{campaign.description}</p>
                <button class="btn waves-effect waves-light right modal-trigger" href="#modal1" value={campaign._id}
                  disabled={campaign.interestedInfluencer.some(influencer => influencer.userId == user._id)}
                  onClick={(e) => { SetSelectedCampaign(campaign) }}>Accept
    <i class="material-icons right">send</i>
                </button>

              </div>)
            })} */}

          </div>
        </div>
      </div>
      {/* <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Levance</h4>
          <p>Are you sure to accept campaign by {selectedCampaign.brandName} ?</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={handleChange}>Agree</a>
          <a href="#!" class="modal-close waves-effect waves-red btn-flat"  >Cancel</a>

        </div>
      </div> */}
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userDetails.authDone,
    email: state.userDetails.email,
    name: state.userDetails.fullName,
    city: state.userDetails.city,
    username: state.userDetails.username,
    categories: state.userDetails.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: data => {
      dispatch({
        type: 'SET_AUTH',
        authDone: data,
      })
    },
    setEmail: data => {
      dispatch({
        type: 'SET_EMAIL',
        email: data,
      })
    },
    setName: data => {
      dispatch({
        type: 'SET_NAME',
        name: data
      })
    },
    setCity: data => {
      dispatch({
        type: 'SET_CITY',
        city: data
      })
    }
    ,
    setUsername: data => {
      dispatch({
        type: 'SET_USERNAME',
        username: data
      })
    }
    ,
    setCategories: data => {
      dispatch({
        type: 'SET_CATEGORIES',
        categories: data
      })
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)