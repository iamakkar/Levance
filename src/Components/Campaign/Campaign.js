import React, { useCallback, useRef, useState } from 'react'
import '../Dashboard/main_new.css'
import Location from "@material-ui/icons/PersonPinCircle";
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import LockIcon from '@material-ui/icons/Lock';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Truck from '@material-ui/icons/LocalShipping'
var html = `<html>
<head>
    <!-- Compiled and minified CSS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'>
    <!-- Compiled and minified JavaScript -->
    <!-- JavaScript Bundle with Popper -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'></script>
    <style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');</style>
    <style>@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap'); </style>
</head>
<body style='font-family:Poppins'>
    <div class='container-fluid'>
        <div class='row'>
            <div class='col s12' style='margin:0;padding: 0;'>
                <div style='width:100%;height:300px;margin-bottom: 25px;'>
                    <img src='https://www.nextbigbrand.in/wp-content/uploads/2019/02/image_banner.png' style='width:100%;height:100%;object-fit:cover' />
                </div>
                <div class='col s12' style='margin:2;padding: 5px;'>
                    <a href="#t&ampc" style="margin-bottom: 4px" class="btn-small blue">Terms & Conditions</a>
                    <a href="#contentguidlines" style="margin-bottom: 4px" class="btn-small" green>Content Guidlines</a>
                </div>
                <div style='padding: 5px;'>
                    <h2 style='margin: 10px auto;font-family: Ubuntu;'>
                        Rethink Autumn With Marks &amp; Spencer
                    </h2>
                    <div style='padding-left: 10px;'>
                        <p>
                            Hi There!
                        </p>
                        <p>
                            It’s that time of the year when a new season has set in and we are happy to announce our association with Marks and Spencer for a brand new campaign! We would love to know how you rethink your style this season and for the same, and an exciting new campaign awaits you!
                        </p>
                        <p>
                            Style the marks and spencer jacket in the coolest way you can and top 3 influencers who will flaunt the marks and spencer jacket in the quirkiest way will get marks and spencer vouchers worth 10k!!
                        </p>
                    </div>
                    <h4 style='font-family: Ubuntu;'>
                        What you'll be getting?
                    </h4>
                    <div style='padding-left: 10px;'>
                        <p>
                            You will get a stunning leather jacket of your preferred size from marks and spencer latest autumn collection and an additional chance to get marks and spencer vouchers worth 10k!!
                        </p>
                    </div>
                    <h4  style='font-family: Ubuntu;'>
                        What do you need to do?
                    </h4>
                    <div style='padding-left: 10px;'>
                        <p>
                            1 Instagram Post (static post):
                        </p>
                        <ul>
                            <li>
                                Reference
                                <a href='https://www.instagram.com/p/CGCwDHMnhcB/'>
                                Image
                                </a>
                                1
                            </li>
                            <li>
                                Reference
                                <a href='https://drive.google.com/file/d/1SCfLkrH4nqUg1kx36mpci4fbT9AnAEtA/view?usp=sharing'>
                                Image
                                </a>
                                2
                            </li>
                            <li>
                                Reference
                                <a href='https://drive.google.com/file/d/1PJNm0DIHF_65eY3XtmfSYu2IV_WZC3eo/view?usp=sharing'>
                                Image
                                </a>
                                3
                            </li>
                        </ul>
                        <p>
                            You need to style the given product in the best possible way and flaunt it in your picture in a way that the mark and spencer product should be clearly visible. You need to submit your post and caption to the levance team before uploading it. After the brand approval, you can upload the post. After 48 hours of uploading the post, you will be required to submit the insights of your post at your levance dashboard or with the levance team.
                        </p>
                    </div>
                    <h4  style='font-family: Ubuntu;'>
                        Please note:
                    </h4>
                    <ol>
                        <li>
                            You need to follow @levance.in and @marksandspencerindia on Instagram</li>
                        <li>
                            Ensure that your profile is public and you have a business account</li>
                        <li>
                                You cannot tag the post as sponsored/paid post </li>
                        <li>
                                You cannot use #ad in the caption </li>
                        <li>
                                You need to tag @Marksandspencerindia @levance.in<br />
                                #RethinkAutumnWithMandS #Autumn #levancexmarksandspencer </li>
                    </ol>
                    <h4 id="contentguidlines" style='font-family: Ubuntu;'>
                        Content Guidlines:
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTEuOTg0IDE2LjgxNWMyLjU5NiAwIDQuNzA2LTIuMTExIDQuNzA2LTQuNzA3IDAtMS40MDktLjYyMy0yLjY3NC0xLjYwNi0zLjUzOC0uMzQ2LS4zMDMtLjczNS0uNTU2LTEuMTU4LS43NDgtLjU5My0uMjctMS4yNDktLjQyMS0xLjk0MS0uNDIxcy0xLjM0OS4xNTEtMS45NDEuNDIxYy0uNDI0LjE5NC0uODE0LjQ0Ny0xLjE1OC43NDktLjk4NS44NjQtMS42MDggMi4xMjktMS42MDggMy41MzggMCAyLjU5NSAyLjExMiA0LjcwNiA0LjcwNiA0LjcwNnptLjAxNi04LjE4NGMxLjkyMSAwIDMuNDc5IDEuNTU3IDMuNDc5IDMuNDc4IDAgMS45MjEtMS41NTggMy40NzktMy40NzkgMy40NzlzLTMuNDc5LTEuNTU3LTMuNDc5LTMuNDc5YzAtMS45MjEgMS41NTgtMy40NzggMy40NzktMy40Nzh6bTUuMjIzLjM2OWg2Ljc3N3YxMC4yNzhjMCAyLjYwOC0yLjExNCA0LjcyMi00LjcyMiA0LjcyMmgtMTQuNDkzYy0yLjYwOCAwLTQuNzg1LTIuMTE0LTQuNzg1LTQuNzIydi0xMC4yNzhoNi43NDdjLS41NDQuOTEzLS44NzIgMS45NjktLjg3MiAzLjEwOSAwIDMuMzc0IDIuNzM1IDYuMTA5IDYuMTA5IDYuMTA5czYuMTA5LTIuNzM1IDYuMTA5LTYuMTA5Yy4wMDEtMS4xNC0uMzI3LTIuMTk2LS44Ny0zLjEwOXptMi4wNTUtOWgtMTIuMjc4djVoLTF2LTVoLTF2NWgtMXYtNC45MjNjLS4zNDYuMDU3LS42ODIuMTQzLTEgLjI3djQuNjUzaC0xdi00LjEwMmMtMS4yMDIuODU3LTIgMi4yNDYtMiAzLjgyNHYzLjI3OGg3LjQ3M2MxLjE2Ny0xLjI4MiAyLjc5OC0yIDQuNTExLTIgMS43MjIgMCAzLjM1MS43MjUgNC41MTEgMmg3LjUwNXYtMy4yNzhjMC0yLjYwOC0yLjExNC00LjcyMi00LjcyMi00LjcyMnptMi43MjIgNS4yNjVjMCAuNDA2LS4zMzMuNzM1LS43NDUuNzM1aC0yLjUxMWMtLjQxMSAwLS43NDQtLjMyOS0uNzQ0LS43MzV2LTIuNTNjMC0uNDA2LjMzMy0uNzM1Ljc0NC0uNzM1aDIuNTExYy40MTIgMCAuNzQ1LjMyOS43NDUuNzM1djIuNTN6Ii8+PC9zdmc+" />
                    </h4>
                    <ol>
                        <li>
                            Guidline 1</li>
                        <li>
                          Guidline 2</li>
                        <li>
                          Guidline 3</li>
                        <li>
                          Guidline 4</li>
                        <li>
                          Guidline 5
                        </li>
                        <li>
                            Guidline 1</li>
                        <li>
                          Guidline 2</li>
                        <li>
                          Guidline 3</li>
                        <li>
                          Guidline 4</li>
                        <li>
                          Guidline 5
                        </li>
                    </ol>
                    <h4 id="t&ampc" >
                        Terms and conditions:
                    </h4>
                    <ol>
                        <li>
                            Guidline 1</li>
                        <li>
                          Guidline 2</li>
                        <li>
                          Guidline 3</li>
                        <li>
                          Guidline 4</li>
                        <li>
                          Guidline 5
                        </li>
                        <li>
                            Guidline 1</li>
                        <li>
                          Guidline 2</li>
                        <li>
                          Guidline 3</li>
                        <li>
                          Guidline 4</li>
                        <li>
                          Guidline 5
                        </li>
                    </ol>
                    <p>
                        Date<strong>:</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`

function App(props) {

  const [user, setUser] = useState(props);
  const [selectedCampaign, SetSelectedCampaign] = useState({
    description: "",
    interestedInfluencer: [],
    rejectedInfluencer:[],
    brandName: "",
    campaignOpen:false
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [updateProfile, setUpdatedProfile] = useState({});
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [inputError, setInputError] = useState(false)
  const [inputCategoriesError, setInputCategoriesError] = useState(false)
  const [loader, setLoader] = useState(false)
  var timeofInsightsUploaded = ''
  const [loaderSubmitfiles, setLoaderSubmitfiles] = useState(false)
  const [postInputState, setPostInputState] = useState('')
  const [timeForInsights, settimeForInsights] = useState('')
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
  const [timeOver, setTimeOver] = useState(false)
  const [insights, setInsights] = useState([])
  const [loaderSubmitInsights, setLoaderSubmitInsights] = useState(false)
  const [rejectReasons,setRejectRReasons] = useState([])
  const [boolOther,setBoolOther] = useState(false)
  const [otherReason,setOtherReason] = useState('')
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
        
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          
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
  const reasons = [
    {value:'a',label:'A'},
    {value:'b',label:'B'},
    {value:'c',label:'C'},
    {value:'d',label:'D'},
    {value:'e',label:'E'},
    {value:'other',label:'other'}
  ]
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
        url: `${BASE_URL}/individualCampaign/${props.match.params.campaignID}`
      }
      ).then(res => {
        if (res.data.err)
          return console.log(res.data.err)
        SetSelectedCampaign(res.data.message);

        for (var m = 0; m < res.data.message.interestedInfluencer.length; m++) {
          if (res.data.message.interestedInfluencer[m].userId === user._id) {
            setinterestedInfluencer(res.data.message.interestedInfluencer[m]);
            timeofInsightsUploaded = res.data.message.interestedInfluencer[m].acceptanceByTeam
            
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
      url: `${BASE_URL}/individualCampaign/${props.match.params.campaignID}`
    }).then(res => {
      if (res.data.err)
        return console.log(res.data.err)
      SetSelectedCampaign(res.data.message);
      for (var m = 0; m < res.data.message.interestedInfluencer.length; m++) {
        if (res.data.message.interestedInfluencer[m].userId === user._id) {
          setinterestedInfluencer(res.data.message.interestedInfluencer[m]);
          timeofInsightsUploaded = res.data.message.interestedInfluencer[m].acceptanceByTeam
          
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
    axios.put(BASE_URL + "/addInfluencer", interestedInfluencer).then(res => {

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
    let abc = e.target.files.length
    let x = [];
    for (var i = 0; i < abc; i++) {
      let file = e.target.files[i];
      let base64 = toBase64(file);
      x.push(base64);
    }

    let y = await Promise.all(x)
    
    const res = [];
    for (let index = 0; index < y.length; index++) {
      res.push({ filestr: y[index] });

    }
    setSelectedFile(res);
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
        url: `${BASE_URL}/api/uploadPosts`,
        method: 'POST',
        data: { caption: caption,
           posts: selectedFile, 
           campaignId: props.match.params.campaignID,
            previousPost:interestedInfluencer.postForUploadation },
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.token}`
        },
      }).then(res => {
        if (res.data.error)
         { M.toast({
            html: "An error occurred , please try later"
          })
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
        setLoaderSubmitfiles(false);
        refreshCampaign()

      })
    } catch (e) {
      console.log(e);
      setLoaderSubmitfiles(false)
    }
  }
  useEffect(() => {
    var postlink = []
    for (let index = 0; index < postsNo; index++) {
      if (index < postLinkSubmit.length)
        postlink.push(postLinkSubmit[index]);
      else {
        postlink.push('')
      }
    }
    setpostLinkSubmit(postlink)

  }, [postsNo])

  const postsLinkUpload = () => {
    
    if (postLinkSubmit.length == 0)
      return M.toast({ html: 'Fill atleast one link' })
    if (postLinkSubmit.some(ele => {
      return ele == ''
    }))
      return M.toast({ html: 'Please fill all fields' })
    axios({
      url: `${BASE_URL}/postsLinkUpload`,
      method: 'POST',
      data: {
        postLinkSubmit: postLinkSubmit,
        campaignId: props.match.params.campaignID
      }
      , headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.token}`
      }
    }).then(async result => {
      if (result.data.error) {
        return M.toast({ html: result.data.error });
        setTimeout(() => {
          window.location.href = "/"
        }, 2000);
      }
      M.toast({ html: result.data.message })
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    })
  }

  const TimeForInsights = () => {



    var insightsTimer = setInterval(() => {
      var t = new Date(timeofInsightsUploaded)
      t.setHours(t.getHours() + 24);
      var curr = new Date()
      var res = (t - curr) / 1000;
      if (res <= 0) {
        clearInterval(insightsTimer);
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
    let abc = e.target.files.length
    let x = [];
    for (var i = 0; i < abc; i++) {
      let file = e.target.files[i];
      let base64 = toBase64(file);
      x.push(base64);
    }

    let y = await Promise.all(x)
    
    const res = [];
    for (let index = 0; index < y.length; index++) {
      res.push({ filestr: y[index] });

    }

    setInsights(res);
  }

  const handleInsightSubmit = async () => {
    if (selectedFile == [])
      return M.toast({
        html: 'Atleast one post to be attached'
      })
    try {
      setLoaderSubmitInsights(true)
      await axios({
        url: `${BASE_URL}/api/uploadInsights`,
        method: 'POST',
        data: { insights: insights, campaignId: props.match.params.campaignID },
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
        setLoaderSubmitInsights(false)
      })
    } catch (e) {
      console.log(e);
      setLoaderSubmitInsights(false)
    }
    Swal.fire({
      title: 'Uploaded Successfully',
      text: 'Your insights have been uploaded successfully. Thank You!',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Cool',
    })
  }

  const handleRejectReasonsSubmit = ()=>{
    if(boolOther&&!otherReason)
    return Swal.fire({
      title: 'Warning',
      text: 'Please give other reason',
      icon: 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Okay',
    })
    if(boolOther)
    rejectReasons.push(otherReason)

    if(!rejectReasons.length)
    return Swal.fire({
      title: 'Warning',
      text: 'Select atleast one reason',
      icon: 'warning',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'Okay',
    })
    const userId = user._id;
    const email = props.email;
    const fullName = props.fullName;
    const campaignId = selectedCampaign._id;
    const rejectededInfluencer = {
      userId, email, fullName, campaignId,
      reason:rejectReasons
    }
    axios({
      method:'PUT',
      url: `${BASE_URL}/rejectInfluencer`,
      data:rejectededInfluencer
    }).then(res => {
      SetSelectedCampaign(res.data)
      M.toast({ html: 'Done' })
      refreshCampaign()
      document.getElementById('rejectedReasonClose').click()
    }).catch(err => {
      console.log(err)
      document.getElementById('rejectedReasonClose').click()
    })
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

          <div class="col s12 m9 campaignBox" id="campaignBox" style={{paddingBottom:'60px'}}>
          {!selectedCampaign.description && <div className='center' style={{ marginTop: "20px" }}><div class="preloader-wrapper small active center">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div></div>}
            {selectedCampaign.description&&<>{selectedCampaign.campaignOpen
            ?
            !selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id)
            ?
            !selectedCampaign.rejectedInfluencer.some(influencer => influencer.userId == user._id)
            ?
            <p style={{fontFamily:'Poppins'}}><LockOpenIcon/> This collaboration is open and accepting participation</p>
            :
            <p style={{fontFamily:'Poppins'}}><ThumbDownIcon/> You have refused this collaboration</p>
            :
            <>
            <p style={{fontFamily:'Poppins'}}><DoneAllIcon/> You have accepted this collaboration</p>
            <p style={{fontFamily:'Poppins'}}><Truck/> The product will be shipped to you within 7-15 days</p>
            </>
            :
            <p style={{fontFamily:'Poppins'}}><LockIcon/> This collaboration has been closed and is not accepting any participation</p>}
           </> }
            {parser(selectedCampaign.description)}
            {/* {parser(html)} */}
            {
              interestedInfluencer.postForUploadation.length != 0 && <h6>Status: <span style={{ fontWeight: 700 }}>{interestedInfluencer.status}</span></h6>
            }
            {
              interestedInfluencer.status == "pending" && interestedInfluencer.postForUploadation.length != 0 ? <h6>Note: Your content is pending for aproval. Please upload the content after the aproval</h6> : <></>
            }
            {

              interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() != 'pending' && <h6>Remark: <span style={{ fontWeight: 700 }}>{interestedInfluencer.remark}</span></h6>
            }
            {
              interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() == 'accepted' && <div>
                <h4 style={{ fontFamily: "Ubuntu" }}>Provide uploaded content details:</h4>
                {!timeOver && <><Select
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
                        <input id="postLink" type="text" class="materialize-textarea" onBlur={(val) => {
                          postLinkSubmit[index] = val.target.value;
                          setpostLinkSubmit(postLinkSubmit)
                        }} />
                      </>
                    )
                  })
                  }</>}

                <div className='center'>
                  {!timeOver && <Button className="waves-effect center" style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", margin: '8px auto', borderRadius: "5px" }} onClick={() => {
                    postsLinkUpload()
                  }}>Submit Links</Button>}
                  {
                    interestedInfluencer.postForUploadation.length != 0 && interestedInfluencer.status.toLowerCase() == 'accepted' && interestedInfluencer.acceptanceByTeam != '' && !timeOver &&
                    <h5>Upload insights after {timeForInsights}</h5>
                  }
                  {timeOver && <>
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
                  </>}

                </div>
              </div>
            }

            {
              interestedInfluencer.postForUploadation.length != 0 && <h4 style={{ fontFamily: "Ubuntu" }}>Posts uploaded</h4>

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
              {selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id) ? interestedInfluencer.status.toLowerCase() != 'accepted' ? <>
                  <input type='file' name='post' multiple value={postInputState} onChange={handlePostInputState} style={{ display: 'none' }} ref={hiddenFileInput} />

                  <Button className="waves-effect center-block" onClick={handleClick} style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} ><i class="material-icons left">upload</i>Upload Content</Button>
                  <p>(Upload all posts in one go)</p>
                </> : '':''
              }
              <br />
              {/* {selectedCampaign.description &&<a href='#modaltermsandconditions' className="modal-trigger">Terms {'&'} Conditions</a>} */}
            </div>
            {selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id) && interestedInfluencer.status.toLowerCase() != 'accepted' ?
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
          {selectedCampaign.campaignOpen&&!selectedCampaign.interestedInfluencer.some(influencer => influencer.userId == user._id)&& !selectedCampaign.rejectedInfluencer.some(influencer => influencer.userId == user._id)?
          <div className='center col s12' style={{position:'fixed',bottom:'0px',zIndex:3,backgroundColor:'white',paddingTop:'10px',boxShadow:'0px -1px 3px grey'}}>
              <>
              <Button className="modal-trigger waves-effect " style={{ backgroundColor: "#4c4b77", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} href="#Modal-1" >
                  Accept
                </Button>  <Button className="modal-trigger waves-effect red" style={{ backgroundColor: "#26a69a", fontFamily: "Poppins", fontWeight: "700", color: "#fff", marginBottom: "8px", borderRadius: "5px" }} href="#modalReject" >
                  Reject
                </Button></>
                </div>:''}
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

<div class="row">
    <div class="col s12">
      <div class="row">
      <div class="row">
        <div class="input-field col s12">
          <input id="address" type="text" class="validate" placeholder="House No./Flat No./Street Name" />
          <label for="address">Shipping Address</label>
        </div>
      </div>
      <div class="input-field col s12 m6">
          <input placeholder="City" id="city" type="text" class="validate"/>
          <label for="city">City</label>
      </div>
      <div class="input-field col s12 m6">
          <input placeholder="State" id="state" type="text" class="validate"/>
          <label for="state">State</label>
      </div>
      <div class="input-field col s12 m6">
          <input placeholder="ZIP Code" id="zip" type="tel" class="validate"/>
          <label for="zip">ZIP Code</label>
      </div>
      </div>
    </div>
</div>
        <p>Before accepting the campaign, do read the terms & conditions and content guidelines carefully.</p>
        <div class='col s12' style={{margin: 2, padding: 5}} >
            <a href="#modaltermsandconditions" style={{marginBottom: 4, marginRight: 5}} className="modal-trigger"><a class="btn-small blue">Terms & Conditions</a></a>
            <a href='#modalcontentguidelines' style={{marginBottom: 4}} className="modal-trigger"><a class="btn-small" green>Content Guidlines</a></a>
        </div>

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

      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Content Guidelines"
        id="modalcontentguidelines"
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

      <Modal
        actions={[
          <Button flat node="button" waves="#4c4b77" onClick={handleRejectReasonsSubmit} style={{fontFamily:'Poppins',color:'white',backgroundColor:'#4c4b77',marginRight:'10px'}}>Submit</Button>,
          <Button flat modal="close" node="button" id="rejectedReasonClose" waves="red" style={{fontFamily:'Poppins',color:'white',backgroundColor:'red'}}>Close</Button>
        ]}
        bottomSheet={false}
        fixedFooter={true}
        header={<p style={{fontFamily:'Ubuntu'}}>Reason for Rejection</p>}
        id="modalReject"
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
        className='modalReject'
        root={document.body}
        style={{height:'500px'}}
      >


        <Select
          options={reasons}
          closeMenuOnSelect={false}
          isMulti
          className="select"
          style={{
            fontFamily:'Poppins',
          }}
          placeholder="Select atleast one reason"
          onChange={(e)=>{
           var boolCheckother=false
            var data = [];
            e.map(ele=>{
              if(ele.value=='other')
              {boolCheckother=true;}
              else
              data.push(ele.value);
            })
            setBoolOther(boolCheckother)
            setRejectRReasons(data)
            
          }}
        />
        {boolOther&&<><textarea id="otherReason" class="materialize-textarea" onChange={(e)=>{setOtherReason(e.target.value)}}></textarea>
          <label for="otherReason">Give other Reason</label></>}
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