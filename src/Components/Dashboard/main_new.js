import React, { Component, useState } from 'react'
import './main_new.css'
import Location from "@material-ui/icons/PersonPinCircle";
import M from 'materialize-css'
import Navbar from "../Home/navbar"
import axios from 'axios';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import Switch from "react-switch";
import { Modal, Button, TextInput } from "react-materialize"
import Select from "react-select";
import Swal from 'sweetalert2';
import { BASE_URL } from "../../Config/config.json";
import { Link } from 'react-router-dom';

function App(props) {

  const [user, setUser] = useState(props);
  const [campaigns, SetCampaigns] = useState([]);
  const [selectedCampaign, SetSelectedCampaign] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [updateProfile, setUpdatedProfile] = useState({});
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [inputError, setInputError] = useState(false)
  const [inputCategoriesError, setInputCategoriesError] = useState(false)
  const [loader,setLoader] = useState(false)
  const categories = [
    { value: "Beauty", label: "Beauty" },
    { value: "Fashion", label: "Fashion" },
    { value: "Fitness", label: "Fitness" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Food", label: "Food" },
    { value: "Travel", label: "Travel" },
    { value: "Tech", label: "Tech" },
    { value: "Wedding", label: "Wedding" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Decor", label: "Decor" },
    { value: "Parenting", label: "Parenting" },
    { value: "Photography", label: "Photography" },
    { value: "Design", label: "Design" },
    { value: "Luxury", label: "Luxury" },
    { value: "DIY", label: "DIY" },
    { value: "Repost", label: "Repost" },
  ];

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
  const updateChange = (e) => {
    var value = e.target.value
    if (value == "")
      value = null
    setUpdatedProfile({
      ...updateProfile,
      [e.target.name]: value
    })
  }
  const uploadImage = async (base64EncodedImage) => {
    const splitter = user.profilePic.split("/");
    const lastPic = splitter[splitter.length - 1].split(".")[0]
    try {
      setLoader(true)
      const res = await axios({
        url: BASE_URL + '/api/upload',
        method: 'POST',
        data: JSON.stringify({ data: base64EncodedImage, lastPic: lastPic }),
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        },
      })
      setLoader(false)

      if (res.data.error) {
        // M.toast({html:"Relogin"})
        console.error("error occurred");

        return;
      }
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
      url: BASE_URL + "/getdetails",
      method: "GET",
      headers: {
        'authorization': `Bearer ${localStorage.token}`
      }
    })
    if (res.data.error) {
      localStorage.removeItem('token')
      M.toast({ html: "Relogin" })
      setTimeout(() => {
        console.error("error occurred");
        window.location.href = "/";
      }, 1000);

    }
    else {
      const user = res.data;
      props.setEmail(user.email);
      props.setName(user.fullName);
      props.setCity(user.city);
      props.setUsername(user.username);
      props.setCategories(user.categories);
      
      setUser(user)
      setUpdatedProfile(user);
      var x = [];
      user.categories.map(category => {
        var y = { value: category, label: category };
        x.push(y);
      })
      setUpdatedCategories(x);
      axios.get(BASE_URL + "/campaign").then(res => {
        console.log(res)
        SetCampaigns(res.data.campaigns);
      })
    }  }, [])
  const updateDetails = async () => {
    updateProfile.categories = updatedCategories.map(category => {
      return category.value;
    })
    if(updateProfile.categories.length>3)
    {
      return Swal.fire({
        title: 'Categories Error',
        text: 'Atmost 3 categories allowed',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
    else{
      setLoader(true)
    const result = await axios({
      url: BASE_URL + "/updateprofile",
      method: "PUT",
      data: updateProfile
      ,
      headers: {
        'authorization': `Bearer ${localStorage.token}`
      }
    })
    setLoader(false)
    if(result.data.error)
    {
      M.toast({html:"Error occurred"})
    }
    else{
      M.toast({html:"Updated Successfully"})
      document.getElementById("updateModal").click();
    const res = await axios({
      url: BASE_URL + "/getdetails",
      method: "GET",
      headers: {
        'authorization': `Bearer ${localStorage.token}`
      }
    })
    {
      const user = res.data;
      props.setEmail(user.email);
      props.setName(user.fullName);
      props.setCity(user.city);
      props.setUsername(user.username);
      props.setCategories(user.categories);
      
      setUser(user)
      setUpdatedProfile(user);
      var x = [];
      user.categories.map(category => {
        var y = { value: category, label: category };
        x.push(y);
      })
      setUpdatedCategories(x);
    }
  }



    
  }
  }
  useEffect(() => {

    if (updateProfile.fullName == "" || updateProfile.fullName == null)
      setInputError(true);
    else
      setInputError(false)

  })
  const handleChange = () => {
    const userId = user._id;
    const email = props.email;
    const fullName = props.fullName;
    const campaignId = selectedCampaign._id;
    const interestedInfluencer = {
      userId, email, fullName, campaignId
    }
    axios.put(BASE_URL + "/addInfluencer", interestedInfluencer).then(res => {
      
      const updatedCampaigns = campaigns.map(campaign => {
        
        if (campaign._id == res.data._id) {
          return res.data
        }
        else
          return campaign
      })
      
      SetCampaigns(updatedCampaigns);
      M.toast({ html: 'Done' })
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
            {loader&&<div class="preloader-wrapper small active" style={{marginTop:"10px"}}>
              <div class="spinner-layer spinner-yellow-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>}
            <h4>{user.fullName}</h4>
            <p>@{user.username}</p>
            <p><Location />{user.city}</p>


            <div className="container-fluid">
              <div className="row">
                <div className="col s12 m12">
                  {
                  user.categories.map(item => {
                    return (
                      
                        <div className="categories">{item}</div>
                      
                    )
                  })

                }
                </div>
              </div>
            </div>


            <Modal
              actions={[
                <>{loader&&<div class="left preloader-wrapper small active" style={{marginTop:"10px"}}>
                <div class="spinner-layer spinner-yellow-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>}</>,
              <Button onClick={updateDetails} disabled={inputError} style={{marginRight:"5px"}}>Submit</Button>,
              <Button flat modal="close" id="updateModal" node="button" waves="green">Close</Button>
              ]}
              bottomSheet={false}
              fixedFooter={false}
              header="Update Details"
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
              trigger={<Button node="button" style={{marginBottom:"10px"}}>Edit Profile</Button>}
            >
              <TextInput
                id="TextInput-1"
                label="Name"
                value={updateProfile.fullName}
                name="fullName"
                onChange={updateChange}
              />
              <h6>Are you in college ?</h6>
              <Switch onChange={() => setUpdatedProfile({
                ...updateProfile,
                college: !updateProfile.college
              })} checked={updateProfile.college} />
              <div style={{ marginTop: 5 }}>
                <span style={{ fontWeight: 'bold' }} >{updateProfile.college ? 'Yes' : 'No'}</span>
              </div>
              <TextInput
                id="TextInput-2"
                label="Facebook Url"
                value={updateProfile.facebook}
                name="facebook"
                onChange={updateChange}
              />
              <TextInput
                id="TextInput-3"
                label="Instagram Url"
                value={updateProfile.instagram}
                name="instagram"
                onChange={updateChange}
              />
              <TextInput
                id="TextInput-4"
                label="Youtube Url"
                value={updateProfile.youtube}
                name="youtube"
                onChange={updateChange}
              />
              <Select
                options={categories}
                closeMenuOnSelect={false}
                isMulti
                className="select"
                value={updatedCategories}
                onChange={async (e) => {
                  await setUpdatedCategories(e)
                  
                }}
              />
              {(updatedCategories.length > 3||updatedCategories.length==0) && <p class="red-text">Select atmost 3 categories</p>}
            </Modal>



          </div>
          <div class="col s12 m9 campaignBox">
            <div className="teal lighten-2 white-text"><marquee>Notification</marquee></div>
            {/* {campaigns.map(campaign => {
              return (<div className="campaign">
                <h3>{campaign.brandName}</h3>
                <h6>Description:</h6>
                <p>{campaign.description}</p> */}
                {/* <button class="btn waves-effect waves-light right modal-trigger" href="#Modal-1" value={campaign._id}
                  disabled={campaign.interestedInfluencer.some(influencer => influencer.userId == user._id)}
                  onClick={(e) => { SetSelectedCampaign(campaign) }}>Accept
    <i class="material-icons right">send</i>
                </button> */}
              {/* <Link to={"/campaign"} brand={campaign.brandName}  class="btn waves-effect waves-light right modal-trigger" description={campaign.description}>Details</Link> */}
              {/* </div>)
            })} */}
            <h5> Currently we don't have any campaign for your category. We'll inform you as soon as possible via mail.</h5>
          </div>
        </div>
      </div>

      <Modal
  actions={[
    <Button flat modal="close" node="button" waves="green"  onClick={handleChange}>Agree</Button>,
    <Button flat modal="close" node="button" waves="green">Close</Button>
  ]}
  bottomSheet={false}
  fixedFooter={false}
  header="Levance"
  id="Modal-1"
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
  
>

          
          <p>Are you sure to accept campaign by {selectedCampaign.brandName} ?</p>
        
        
</Modal>





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