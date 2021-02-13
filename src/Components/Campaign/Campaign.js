import React, { useCallback, useRef, useState } from 'react'
import '../Dashboard/main_new.css'
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
import ReactCrop from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css";
import parser from 'html-react-parser'
import CloseIcon from '@material-ui/icons/Close';
import './Campaign.css'

function App(props) {

  const [user, setUser] = useState(props);
  const [selectedCampaign, SetSelectedCampaign] = useState({
    description: "",
    interestedInfluencer: [],
    brandName: ""
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [updateProfile, setUpdatedProfile] = useState({});
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [inputError, setInputError] = useState(false)
  const [inputCategoriesError, setInputCategoriesError] = useState(false)
  const [loader, setLoader] = useState(false)
  var timeofInsightsUploaded=''
  const [loaderSubmitfiles, setLoaderSubmitfiles] = useState(false)
  const [postInputState, setPostInputState] = useState('')
  const [timeForInsights,settimeForInsights] = useState('')
  const [interestedInfluencer, setinterestedInfluencer] = useState({
    acceptanceByTeam: "",
    caption: "",
    email: "",
    postAfterUploadation: [],
    postForUploadation: [],
    remark: "",
    status: "",
    userId: "",
    _id: ""
  })
  const [caption, setCaption] = useState('');
  const [postsNo, setpostsNo] = useState(0);
  const [postLinkSubmit, setpostLinkSubmit] = useState([]);
  const [timeOver,setTimeOver] = useState(false)
  const [insights,setInsights] = useState([])
  const [loaderSubmitInsights, setLoaderSubmitInsights] = useState(false)
  var recievedPostArray = [];
  const pixelRatio = window.devicePixelRatio || 1;

  const hiddenFileInput = React.useRef(null);

  function getResizedCanvas(canvas, newWidth, newHeight) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );

    return tmpCanvas;
  }

  function generateDownload(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);
        console.log(blob)
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          console.log(reader.result);
          uploadImage(reader.result);
          document.getElementById("CloseCroopedImageButton").click()
        };
        // const anchor = document.createElement("a");
        // anchor.download = "cropPreview.png";
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
  }





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

  const message1 = `Hang on tight!`;
  const message2 = `Your desired campaigns might be here anytime soon!`;

  // const handleSubmitFile = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //     reader.onloadend = ()=>{
  //       setCroppedImage({
  //         ...croppedImage,
  //         src:reader.result
  //       })
  //     }
  //     console.log(croppedImage)
  //   }
  // };




  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const handleSubmitFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      document.getElementById("ModalCroopedImageButton").click();
      console.log(e.target.files[0])
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);



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
    var lastPic = "";
    if (user.profilePic !== "https://res.cloudinary.com/levance/image/upload/v1610275545/Untitled_design_1_e6v0wt.png") {
      const splitter = user.profilePic.split("/");
      lastPic = splitter[splitter.length - 1].split(".")[0]
    }

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


  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);


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
      axios({
        method: "POST",
        headers: {
          'authorization': `Bearer ${localStorage.token}`
        },
        url: `http://localhost:5000/individualCampaign/${props.match.params.campaignID}`
      }
      ).then(res => {
        if (res.data.err)
          return console.log(res.data.err)
        SetSelectedCampaign(res.data.message);

        console.log(res.data.message.interestedInfluencer)
        for (var m = 0; m < res.data.message.interestedInfluencer.length; m++) {
          if (res.data.message.interestedInfluencer[m].userId === user._id) {
            setinterestedInfluencer(res.data.message.interestedInfluencer[m]);
            timeofInsightsUploaded=res.data.message.interestedInfluencer[m].acceptanceByTeam
            console.log(res.data.message.interestedInfluencer[m].acceptanceByTeam)
            console.log(timeofInsightsUploaded)
            TimeForInsights()
            break;
          }
        }
      })
    }
  }, [])
  const updateDetails = async () => {
    updateProfile.categories = updatedCategories.map(category => {
      return category.value;
    })
    if (updateProfile.categories.length > 3) {
      return Swal.fire({
        title: 'Categories Error',
        text: 'Atmost 3 categories allowed',
        icon: 'warning',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Okay',
      })
    }
    else {
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
      if (result.data.error) {
        M.toast({ html: "Error occurred" })
      }
      else {
        M.toast({ html: "Updated Successfully" })
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
  const refreshCampaign = () => {
    axios({
      method: "POST",
      headers: {
        'authorization': `Bearer ${localStorage.token}`
      },
      url: `http://localhost:5000/individualCampaign/${props.match.params.campaignID}`
    }).then(res => {
      if (res.data.err)
        return console.log(res.data.err)
      SetSelectedCampaign(res.data.message);
      for (var m = 0; m < res.data.message.interestedInfluencer.length; m++) {
        if (res.data.message.interestedInfluencer[m].userId === user._id) {
          setinterestedInfluencer(res.data.message.interestedInfluencer[m]);
          timeofInsightsUploaded=res.data.message.interestedInfluencer[m].acceptanceByTeam
          console.log(res.data.message.interestedInfluencer[m].userId)
          TimeForInsights()
          break;
        }
      }
    })
  }
  const handleChange = () => {
    const userId = user._id;
    const email = props.email;
    const fullName = props.fullName;
    const campaignId = selectedCampaign._id;
    const interestedInfluencer = {
      userId, email, fullName, campaignId
    }
    axios.put("http://localhost:5000" + "/addInfluencer", interestedInfluencer).then(res => {

      console.log(res)
      SetSelectedCampaign(res.data)
      M.toast({ html: 'Done' })
      refreshCampaign()
    }).catch(err => {
      console.log(err)
    })
  }

  const handleClick = e => {
    hiddenFileInput.current.click();
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handlePostInputState = async (e) => {
    e.preventDefault();
    console.log(e.target.files.length)
    let abc = e.target.files.length
    let x = [];
    for (var i = 0; i < abc; i++) {
      let file = e.target.files[i];
      let base64 = toBase64(file);
      x.push(base64);
    }

    let y = await Promise.all(x)
    console.log(y)
    const res = [];
    for (let index = 0; index < y.length; index++) {
      res.push({ filestr: y[index] });

    }
    setSelectedFile(res);
    console.log(selectedFile);
      Swal.fire({
      title: 'Uploaded Successfully',
      text: 'Your latest post would be shown here when you press the SUBMIT button after entering the caption.',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Cool',
    })
  }

  const handlePostSubmit = async () => {
    if (selectedFile == [])
      return M.toast({
        html: 'Atleast one post to be attached'
      })
    setLoaderSubmitfiles(true)
    try {
      await axios({
        url: 'http://localhost:5000/api/uploadPosts',
        method: 'POST',
        data: { caption: caption, posts: selectedFile, campaignId: props.match.params.campaignID },
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        },
      }).then(res => {
        if (res.data.error)
          M.toast({
            html: "An error occurred , please try later"
          })
        setLoaderSubmitfiles(false);
        refreshCampaign()
        console.log(res)
      })
    } catch (e) {
      console.log(e);
      setLoaderSubmitfiles(false)
    }
  }
  useEffect(() => {
    var postlink =[] 
         for (let index = 0; index < postsNo; index++) {
           if(index<postLinkSubmit.length)
       postlink.push(postLinkSubmit[index]);
       else
       {
         postlink.push('')
       }
      }
      setpostLinkSubmit(postlink)

  }, [postsNo])

  const postsLinkUpload = () =>{
    console.log(postLinkSubmit)
    if(postLinkSubmit.length==0)
    return M.toast({html:'Fill atleast one link'})
    if(postLinkSubmit.some(ele=>{
      return ele==''
    }))
    return M.toast({html:'Please fill all fields'})
    axios({
      url:'http://localhost:5000/postsLinkUpload',
      method:'POST',
      data:{
        postLinkSubmit:postLinkSubmit,
        campaignId: props.match.params.campaignID
      }
      ,headers:{
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.token}`
      }
    }).then(async result=>{
      console.log(result.data)
      if(result.data.error)
      {
        return M.toast({html:result.data.error});
      setTimeout(() => {
        window.location.href="/"
      }, 2000);
    }
      M.toast({html:result.data.message})
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }

const TimeForInsights=()=>{


      
      var insightsTimer=setInterval(() => {
        var t= new Date(timeofInsightsUploaded)
        t.setHours(t.getHours()+24);
        var curr=new Date()
        var res = (t - curr) / 1000;
        if(res<=0)
        {clearInterval(insightsTimer);
        setTimeOver(true);
        }
        var hours = Math.floor(res / 3600) % 24;
        var minutes = Math.floor(res / 60) % 60;
        var seconds = res % 60;
        
        settimeForInsights(`${hours}hrs:${minutes}min:${Math.floor(seconds)}s`)
      }, 1000);

      }
      const handleInsightsInputState = async (e) => {
        e.preventDefault();
        console.log(e.target.files.length)
        let abc = e.target.files.length
        let x = [];
        for (var i = 0; i < abc; i++) {
          let file = e.target.files[i];
          let base64 = toBase64(file);
          x.push(base64);
        }
    
        let y = await Promise.all(x)
        console.log(y)
        const res = [];
        for (let index = 0; index < y.length; index++) {
          res.push({ filestr: y[index] });
    
        }
    
        setInsights(res);
        console.log(insights);
      }

      const handleInsightSubmit = async () => {
        if (selectedFile == [])
          return M.toast({
            html: 'Atleast one post to be attached'
          })
        try {
          setLoaderSubmitInsights(true)
          await axios({
            url: 'http://localhost:5000/api/uploadInsights',
            method: 'POST',
            data: { insights:insights, campaignId: props.match.params.campaignID },
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${localStorage.token}`
            },
          }).then(res => {
            if (res.data.error)
              M.toast({
                html: "An error occurred , please try later"
              })
            refreshCampaign()
            console.log(res)
            setLoaderSubmitInsights(false)
          })
        } catch (e) {
          console.log(e);
          setLoaderSubmitInsights(false)
        }
      }
  return (
    <>
      <Navbar />
      <Modal
        actions={[<Button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop)
          }
        >
          Submit
  </Button>,
        <Button flat modal="close" node="button" id="CloseCroopedImageButton" waves="green">Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Update profile picture"
        id="ModalCroppedImage"
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
        trigger={<Button node="button" id="ModalCroopedImageButton" style={{ display: "none" }}>MODAL</Button>}
      >
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
              display: "none"
            }}
          />
        </div>

      </Modal>
      <div className="container-fluid">
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m12 db_rect">
          </div>
        </div>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col s12 m3 center-align profileSide hide-on-small-only">
            <div className="profilePic">
              <img src={user.profilePic} className="profileImage" />
              <input type='file' className="profileImageChange" id='profileImageChange' onChange={handleSubmitFile} />
              <label for='profileImageChange' className='profileImageChangeLabel'>Change profile image</label>
            </div>
            {loader && <div class="preloader-wrapper small active" style={{ marginTop: "10px" }}>
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
                <>{loader && <div class="left preloader-wrapper small active" style={{ marginTop: "10px" }}>
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
                <Button onClick={updateDetails} disabled={inputError} style={{ marginRight: "5px" }}>Submit</Button>,
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
              trigger={<Button node="button" style={{ marginBottom: "10px" }}>Edit Profile</Button>}
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
              {(updatedCategories.length > 3 || updatedCategories.length == 0) && <p class="red-text">Select atmost 3 categories</p>}
            </Modal>
          </div>

          <div class="col s12 m9 campaignBox" id="campaignBox">
            {parser(selectedCampaign.description)}
            {
              interestedInfluencer.postForUploadation.length != 0 && <h6>Status: <span style={{ fontWeight: 700 }}>{interestedInfluencer.status}</span></h6>
            }
            {

              interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() != 'pending' && <h6>Remark: <span style={{ fontWeight: 700 }}>{interestedInfluencer.remark}</span></h6>
            }
            {
              interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() == 'accepted' && <div>
                <h4 style={{fontFamily: "Ubuntu"}}>Provide uploaded posts details:</h4>
                {!timeOver&&<><Select
                  options={[
                    { 'value': 1, label: '1' },
                    { 'value': 2, label: '2' },
                    { 'value': 3, label: '3' },
                    { 'value': 4, label: '4' },
                    { 'value': 5, label: '5' },
                    { 'value': 6, label: '6' },
                    { 'value': 7, label: '7' }
                  ]}
                  placeholder='No. of posts uploaded'
                  closeMenuOnSelect={true}
                  className="select"
                  value={postsNo}
                  onChange={(e) => {
                    setpostsNo(e.value)
                  }}
                />
                {postLinkSubmit.map((ele, index) => {
                  return (
                    <>
                      <label for="postLink">Link</label>
                      <input id="postLink" type="text" class="materialize-textarea"  onBlur={(val) => {
                        postLinkSubmit[index]=val.target.value;
                        setpostLinkSubmit(postLinkSubmit)
                      }} />
                    </>
                  )
                })
                }</>}
              
                <div className='center'>
                {!timeOver&&<Button className="waves-effect center" style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", margin:'8px auto', borderRadius: "5px" }} onClick={()=>{
                  postsLinkUpload()
                }}>Submit Links</Button>}
                {
                  interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() == 'accepted' &&interestedInfluencer.acceptanceByTeam!=''&&!timeOver&&
                  <h5>Upload insights after {timeForInsights}</h5>
                }
                {timeOver&&<>
                <input type='file' name='insights' multiple value={postInputState} onChange={handleInsightsInputState} style={{ display: 'none' }} ref={hiddenFileInput} />
                  <Button className="waves-effect center-block" onClick={handleClick} style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} ><i class="material-icons left">upload</i>Upload</Button>
                  <p>(Upload all screenshots in one go)</p>
                  {loaderSubmitInsights &&
                    <div class="preloader-wrapper small active" style={{ margin: '10px auto', display: 'block' }}>
                      <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                          <div class="circle"></div>
                        </div><div class="gap-patch">
                          <div class="circle"></div>
                        </div><div class="circle-clipper right">
                          <div class="circle"></div>
                        </div>
                      </div>
                    </div>}
                  <Button className="waves-effect center-block" onClick={handleInsightSubmit} disabled={insights.length == 0} style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} ><i class="material-icons right">send</i>Submit Insights</Button>
           </> }
                
                </div>
              </div>
            }

            {
              interestedInfluencer.postForUploadation.length != 0 && <h4  style={{fontFamily: "Ubuntu"}}>Posts uploaded</h4>

            }
            {/* {
              interestedInfluencer.postForUploadation.length != 0 && <h3>Posts uploaded</h3>
            } */}
            <div className="col s12 center">

              <div class='postsUploadedPreviewBox'>{
                interestedInfluencer.postForUploadation.map(ele => {
                  if (ele.url.includes('image'))
                    return <img src={ele.url} class='postsUploadedPreview' />
                  if (ele.url.includes('video'))
                    return (<video class='postsUploadedPreview' controls>
                      <source src={ele.url} />
                    </video>)
                })
              }</div>
              {!selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id) ?
                <Button className="modal-trigger waves-effect center-block" style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} href="#Modal-1" >Accept</Button>

                :interestedInfluencer.status.toLowerCase()!='accepted' ?<>
                  <input type='file' name='post' multiple value={postInputState} onChange={handlePostInputState} style={{ display: 'none' }} ref={hiddenFileInput} />

                  <Button className="waves-effect center-block" onClick={handleClick} style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} ><i class="material-icons left">upload</i>Upload</Button>
                  <p>(Upload all posts in one go)</p>
                </>:''
              }
              <br />
              <a href='#modaltermsandconditions' className="modal-trigger">Terms {'&'} Conditions</a>
            </div>
            {selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id)&&interestedInfluencer.status.toLowerCase()!='accepted' ?
              <div className="col s12 center" style={{ margin: 'auto' }}>
                <div class="input-field">
                  <textarea id="last_name" type="text" class="materialize-textarea" value={caption} onChange={(val) => setCaption(val.target.value)} />
                  <label for="last_name">Caption</label>
                  {caption == '' && <p style={{ color: 'red' }} >Caption Can't be blank</p>}
                  {loaderSubmitfiles &&
                    <div class="preloader-wrapper small active" style={{ margin: '10px auto', display: 'block' }}>
                      <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                          <div class="circle"></div>
                        </div><div class="gap-patch">
                          <div class="circle"></div>
                        </div><div class="circle-clipper right">
                          <div class="circle"></div>
                        </div>
                      </div>
                    </div>}
                  <Button className="waves-effect center-block" onClick={handlePostSubmit} disabled={caption == '' || selectedFile.length == 0} style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} ><i class="material-icons right">send</i>Submit</Button>
                </div>
                {/* <div class='col s12 center'>
                  {(() => {
                    switch (status) {
                      case "pending": return (recievedPostArray === [] ? null : <p>Pending</p>);
                      case "accepted": return <div><p>Accepted</p></div>;
                      case "rejected": return <p>Rejected</p>;
                    }
                  })}
                </div> */}
              </div>
              : <></>}
          </div>

        </div>
      </div>

      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green" onClick={handleChange}>Agree</Button>,
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
        <a href='#modaltermsandconditions' className="modal-trigger">Terms {'&'} Conditions</a>

      </Modal>
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Terms & Conditions"
        id="modaltermsandconditions"
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


        <p>{parser(String(selectedCampaign.termsandcondition))}</p>


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