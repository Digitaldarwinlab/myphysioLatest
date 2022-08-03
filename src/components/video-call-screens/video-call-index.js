import React, { useRef, useEffect, useState } from "react";
import { useSelector ,useDispatch } from 'react-redux';
import { Row, Col, Button, Modal,notification,Radio,Checkbox, Space, Tooltip } from 'antd';
import "../../styles/Layout/VideoCon.css"
import bodyImage from "../.././assets/lateral.webp"
import 'antd/dist/antd.css'
import side_img from '../.././assets/sideways-vector.webp'
import Tabs from "../Assesment/Tabs";
import { check } from "prettier";
import {STATECHANGE} from '../../contextStore/actions/Assesment'
import './video-call-screen.css'
import {BsFillMicFill} from 'react-icons/bs'
var aiModelAppear = false;
var channel=""
var uid=""
var pid=""
var Joints=""
var angle=[]

// const joints = [
//   { value: 0, label: "leftShoulder" },
//   { value: 1, label: "rightShoulder" },
//   { value: 2, label: "leftElbow" },
//   { value: 3, label: "rightElbow" },
//   { value: 4, label: "leftHip" },
//   { value: 5, label: "rightHip" },
//   { value: 6, label: "leftKnee" },
//   { value: 7, label: "rightKnee" },
//   { value: 8, label: "leftNeck" },
//   { value: 9, label: "rightNeck" },
//   { value: 10, label: "rightPelvic" },
//   { value: 11, label: "leftPelvic" },
// ]
const labels = [
  "L Shoulder Abd/Add",
  "R Shoulder Abd/Add",
  "L Elbow Flex",
  "R Elbow Flex",
  "L Hip Fwd Flex",
  "R Hip Fwd Flex",
  "L Knee Abd/Add",
  "R Knee Abd/Add",
  "L Cervical Side flex",
  "R Cervical Side Flex",
  "L Lateral Side Flex",
  "R Lateral Side Flex",
  "L Wrist",
  "R Wrist",
  "L Ankle",
  "R Ankle",
  "L Hip Abd/Add",
  "R Hip Abd/Add",
  "Cervical Fwd Flex",
  "Cervical Fwd Flex",
];
const allNewJoints = [
  { value: 0, label: "leftShoulder" },
  { value: 1, label: "rightShoulder" },
  { value: 2, label: "leftElbow" },
  { value: 3, label: "rightElbow" },
  { value: 4, label: "leftHip" },
  { value: 5, label: "rightHip" },
  { value: 6, label: "leftKnee" },
  { value: 7, label: "rightKnee" },
  { value: 8, label: "leftNeck" },
  { value: 9, label: "rightNeck" },
  { value: 10, label: "leftPelvic" },
  { value: 11, label: "rightPelvic" },
  { value: 12, label: "leftWrist" },
  { value: 13, label: "rightWrist" },
  { value: 14, label: "leftAnkle" },
  { value: 15, label: "rightAnkle" },
  { value: 16, label: "leftHipAdductionAdbuction" },
  { value: 17, label: "rightHipAdductionAdbuction" },
  { value: 18, label: "cervicalForwardFlexion" },
];
const joints = [
  { value: 0, label: "leftShoulder" },
  { value: 1, label: "rightShoulder" },
  { value: 2, label: "leftElbow" },
  { value: 3, label: "rightElbow" },
  { value: 8, label: "leftNeck" },
  { value: 9, label: "rightNeck" },
  { value: 10, label: "leftPelvic" },
  { value: 11, label: "rightPelvic" },
  { value: 16, label: "leftHipAdductionAdbuction" },
  { value: 17, label: "rightHipAdductionAdbuction" },
];

const leftJoints = [
  { value: 0, label: "leftShoulder" },
  { value: 4, label: "leftHip" },
  { value: 6, label: "leftKnee" },
  { value: 12, label: "leftWrist" },
  { value: 14, label: "leftAnkle" },
  { value: 18, label: "cervicalForwardFlexion" },
];

const rightJoints = [
  { value: 1, label: "rightShoulder" },
  { value: 5, label: "rightHip" },
  { value: 7, label: "rightKnee" },
  { value: 13, label: "rightWrist" },
  { value: 15, label: "rightAnkle" },
  { value: 18, label: "cervicalForwardFlexion" },
];

const assessmentType = [
  { label: 'ROM Assessment', value: 'rom' },
  { label: 'Posture Test', value: 'posture' },
];

let side = [
  "Flexed Knee",
  "Hyper Extended Knee",
  "Excessive Anterior Pelvic",
  "Forward Head",
  "Lordosis",
  "Kyphosis",
];

let frontChecks = {};
let sideChecks = {};

let front = [
  "Genu Valgum",
  "Genu Varum",
  "Squinting / cross eyed patella",
  "Grosshoppers eyed platella",
];

let posture={
  Posterial_view:{
    posterial_view_image: "",
    Angles: "",
    checkbox:""
  },
  lateral_view:{
    posterial_view_image: "",
    Angles: "",
    checkbox:""
  }
}

const VideoCallIndex = (props) => {

  const canvasRef = useRef(null);
  const state = useSelector(state => state);
  const [OnAssessmentScreen, setOnAssessmentScreen] = useState(false)
  const [modalVisible, setModalvisible] = useState(false)
  const [romVisible, setRomVisible] = useState('block')
  const [postureVisible, setPostureVisible] = useState('none')
  const [videoUrl,setVideoURL]=useState("")
  const [Mt,setMt]=useState(true)
  const [angleValues,setAngleValues]=useState([0, 1, 2, 3, 8, 9, 10, 11, 16, 17])
  const [exerciseURL,setExerciseURL]=useState("")
  const [toggleState, setToggleState] = useState(1);
  const [selectedOrientation, setSelectedOrientation] = useState(1);
  const [lateralJoints ,setLateralJoints] = useState(leftJoints)
  const [latSide ,setLatSide] = useState('left')
  const [SWITCH, setSWITCH] = useState(false)
  const [selectedAssessmentType,setSelectedAssessmentType]=useState("rom")
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(side_img)
  const [frontAngles, setFrontAngles] = useState([0,0,0,0,0])
  const [sideAngles, setSideAngles] = useState([0, 0, 0, 0]);
  // const [frontChecks, setFrontChecks] = useState({});
  // const [sideChecks, setSideChecks] = useState({});
  const dispatch = useDispatch()
  const [orientation, setOrientation] = useState(1);

  useEffect(() => {
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);
    $("#magic-btn").prop("disabled", true);
    $("#stop-btn").prop("disabled", true);

    setModalvisible(true)
    const arr=props.match.params.channel.split("_")
    channel=arr[0]
    uid=arr[1]
    pid=arr[2]
    props.Setsidebarshow(false)

    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext('2d');
    // ctx.beginPath();
    // ctx.rect(10, 10, canvas.clientWidth, canvas.clientHeight);
    // ctx.fillStyle = 'white';
    // ctx.fill();
  }, [])

  useEffect(() => {
    function checkUserData() {
      // var input_data=localStorage.getItem("input_data")
      var assesmentCheck=localStorage.getItem("OnAssessmentScreen")
      console.log(assesmentCheck)
      if(assesmentCheck!=""){
      // var item = JSON.parse(input_data)
        if (assesmentCheck=="true") {
          // Joints=item.Joints
          // const exerise = document.getElementById("ex")
          // if (item.allExcercise.length > 1) {
          //     exerise.innerHTML += '<option value="Please Select">Select the Excercise</option>'
          //     for (var i=0;i<item.allExcercise.length;i++) {
          //         let lable = item.allExcercise[i]
          //         exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
          //     }
          // }
          // else {
          //     let lable = item.allExcercise[0]
          //     exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
          //     ExDef(lable);
          // }
          // ifCheck()
          // setVideoVisible('block')
          setOnAssessmentScreen(true)
        }
        else{
          setOnAssessmentScreen(false)
        }
      }
    }
  
    window.addEventListener('storage', checkUserData)
  
    return () => {
      window.removeEventListener('storage', checkUserData)
    }
  }, [])

  const doubleClick = () => {
    document.documentElement.requestFullscreen().catch((e) => {
      // console.log(e);
    })
  }

const captureFront=()=>{
  if(typeof Anterior_Data !== "undefined"){
  console.log(Anterior_Data)
  setUrl1(Anterior_Data.image)
  const out = document.getElementById("scr_out1");
  var img = document.createElement('img');
  img.src = Anterior_Data.image
  out.appendChild(img);
  setFrontAngles([
    Anterior_Data.angles[0].angle,
    Anterior_Data.angles[1].angle,
    Anterior_Data.angles[2].angle,
    Anterior_Data.angles[3].angle,
    Anterior_Data.angles[4].angle,
    Anterior_Data.angles[5].angle
  ]);
  aiModelAppear = !aiModelAppear;
 // $("#magic-btn").html("Start")
  $("#magic-icon").toggleClass('fa-pause').toggleClass('fa-play')
  $("#magic-btn").toggleClass('btn-red').toggleClass('btn-dark')
}
else{
  setTimeout(captureFront,250)
}
}
  
const  captureSide = () => {
  if(typeof Lateral_Data !== "undefined"){
  console.log(Lateral_Data)
  setUrl2(Lateral_Data.image)
  const out = document.getElementById("scr_out2");
  var img = document.createElement('img');
  img.src = Lateral_Data.image;
  out.appendChild(img);
  setSideAngles([
    Lateral_Data.angles[0].angle,
    Lateral_Data.angles[1].angle,
    Lateral_Data.angles[2].angle,
    Lateral_Data.angles[3].angle,
  ])
  aiModelAppear = !aiModelAppear;
   // $("#magic-btn").html("Start")
   $("#magic-icon").toggleClass('fa-pause').toggleClass('fa-play')
   $("#magic-btn").toggleClass('btn-red').toggleClass('btn-dark')
}
else{
  setTimeout(captureSide,250)
}
}


// const onChangeFront = (value) =>{
//   setFrontChecks(value)
// }

const onChangeFront = (value) => {
  console.log("front ", value);
  dispatch({
    type: STATECHANGE,
    payload: {
      key:'FrontCheck',
      value:value,
    },
  });
  //this.props.FirstAssesment("FrontCheck", value);
  localStorage.setItem("FrontCheck",value);
  front.map((a) => {
    if (value.includes(a)) {
      frontChecks[a] = 1;
    } else {
      frontChecks[a] = 0;
    }
  });
  //this.props.FirstAssesment("frontChecks", frontChecks);
  dispatch({
    type: STATECHANGE,
    payload: {
      key:'frontChecks',
      value:frontChecks,
    },
  });
};

// const onChangeSide = (value) =>{
//   setSideChecks(value)
// }

const onChangeSide = (value) => {
  console.log("side ", value);
//  this.props.FirstAssesment("SideCheck", value);
dispatch({
  type: STATECHANGE,
  payload: {
    key:'SideCheck',
    value:value,
  },
});
localStorage.setItem("SideCheck",value);
  side.map((a) => {
    if (value.includes(a)) {
      sideChecks[a] = 1;
    } else {
      sideChecks[a] = 0;
    }
  });
  //this.props.FirstAssesment("sideChecks", sideChecks);
  dispatch({
    type: STATECHANGE,
    payload: {
      key:'sideChecks',
      value:sideChecks,
    },
  });
};


  const joinChannel = async() => {
    let streamCanvas = document.getElementById("scanvas");
    var agoraAppId = "616487fe8ede4785aa8f7e322efdbe7d"
    var channelName = $("#form-channel").val();
    var uid = parseInt($("#form-uid").val());
    // console.log(process.env.REACT_APP_EXERCISE_URL)
  //  const res = await fetch(`localhost:3000/rtc/${channelName}/subscriber/uid/${uid}`);
    const res = await fetch(`${process.env.REACT_APP_EXERCISE_URL}/rtc/${channelName}/subscriber/uid/${uid}`);
    const data = await res.json();
    var token = data.rtcToken
    console.log(token)
    setModalvisible(false)
    props.Setsidebarshow(false)
    ClientAndJoinChannel(
      agoraAppId,
      token,
      channelName,
      uid,
      streamCanvas
    );
    joinRTMChannel(uid);
  }
  
const handleCancel = () => {
    window.top.close()
  };

const AImodel = () => {
  console.log(OnAssessmentScreen)
  if(OnAssessmentScreen){
    aiModelAppear = !aiModelAppear;
    var peerID = $("#form-peerId").val();
    console.log("perr id is ",peerID)
    document.getElementById(`video${peerID}`).style.objectFit = "inherit"
    localStorage.setItem("aiModelAppear", JSON.stringify(aiModelAppear));
    if (aiModelAppear) {
      if(selectedAssessmentType=='rom'){
        // try{
        // var ex_data = JSON.parse(localStorage.getItem("input_data"))
        let ex_data={
          Joints:angleValues,
          allExcercise:['AROM'],
          exerciseURL:""
        }

        localStorage.setItem("ExerciseName",JSON.stringify(ex_data.allExcercise))
        // ex_data.exerciseURL = exerciseURL 
        // const PreLable = ex_data.Joints;
        // for (let i = 0; i < joints.length; i++) {
        //   if (PreLable.includes(joints[i].label)) {
        //     angle.push(joints[i].value)
        //   }
        // }
        // for(let i=0;i<angleValues.length;i++){
        //   if(angle.indexOf(angleValues[i])==-1){
        //     angle.push(angleValues[i])
        //   }
        // } 
        // ex_data.Joints=angle
        $("#magic-icon").toggleClass('fa-play').toggleClass('fa-pause');
        $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
        console.log(ex_data)

        var blob_ex = new Blob([JSON.stringify(ex_data)], {type: "application/json"});
        sendFileMessage("Ex_data.json",peerID,blob_ex) //this message should go first
        setTimeout(()=>{
          sendMessage("start", peerID);
        },3000)
      //   }
      //   catch(err){
      //     aiModelAppear=false
      //     notification.error({
      //       message: 'Please select the exercise before starting ROM!',
      //       placement: 'bottomLeft',
      //       duration: 5
      //   })      
      // }
      }

      else if(selectedAssessmentType=='posture'){
        console.log(orientation)
        $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
        $("#magic-icon").toggleClass('fa-play').toggleClass('fa-pause');
        //$("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
        if(orientation==1){
          sendMessage("startPosture1",peerID)
        }
        else{
          sendMessage("startPosture2",peerID)
        }
      }
    }

    else {
      //  $("#magic-btn").html("Start")
        $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
        $("#magic-icon").toggleClass('fa-play').toggleClass('fa-pause');
        if(selectedAssessmentType=='rom'){
          if(selectedOrientation==1){
            sendMessage("getAnterior",peerID);
            }
          else if(selectedOrientation==2){
            sendMessage("getLeftLateral",peerID);
            }
          else if(selectedOrientation==3){
            sendMessage("getRightLateral",peerID);
            }
        }
        sendMessage("stop",peerID);
    }

  }
      
    else{
      // aiModelAppear=false
      notification.error({
              message: 'Please move to the assessment screen before starting!',
              placement: 'bottomLeft',
              duration: 5
          })    
    }

  }

  const AImodelStop=()=>{
    var peerID = $("#form-peerId").val();
    if(selectedAssessmentType=='rom'){
      if(aiModelAppear){
        var magicbtn=document.getElementById("magic-btn")
        magicbtn.click();
      }
    sendMessage("stop", peerID);
    sendMessage("getROMData",peerID);
    
    localStorage.setItem("input_data","");
    localStorage.setItem("ExerciseName","");
    }
    else if(selectedAssessmentType=='posture'){
      if(aiModelAppear){
        $("#magic-icon").toggleClass('fa-play').toggleClass('fa-pause');
        $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
        aiModelAppear = !aiModelAppear;
        }
      posture.Posterial_view.Angles=frontAngles
      posture.Posterial_view.posterial_view_image=url1
      posture.Posterial_view.checkbox=state.FirstAssesment.frontChecks
      posture.lateral_view.Angles=sideAngles
      posture.lateral_view.posterial_view_image=url2
      posture.lateral_view.checkbox=state.FirstAssesment.sideChecks
      console.log(posture)
      localStorage.setItem("Posture_Data",JSON.stringify(posture));  
      alert("Data Successfully Received!")

    }

  }

  const Exit=()=>{
    console.log("so sad to see you leave the channel");
    leaveChannel();
    // setModalvisible(true)
    handleCancel();
    localStorage.setItem("OnAssessmentScreen","false");
  }

//   const ExChanges = (e) => {
//     fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "content-type": "application/json"
//         },
//         body: JSON.stringify({ exercise: e.target.value })

//     }).then(res => {
//         return res.json();
//     }).then(data => {
//         data.map((val) => {
//             setVideoURL(val.video_path)
//             setExerciseURL(val.video_path)
//         })
//     })
// }

// const ExDef = (name) => {
//   fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
//       method: "POST",
//       headers: {
//           Accept: "application/json",
//           "content-type": "application/json"
//       },
//       body: JSON.stringify({ exercise: name })

//   }).then(res => {
//       return res.json();
//   }).then(data => {
//       data.map((val) => {
//         setVideoURL(val.video_path)
//         setExerciseURL(val.video_path)
//       })
//   })
// }

const onChangeAngles = (checkedValues) => {
  var peerID = $("#form-peerId").val();
  setAngleValues(checkedValues)
  var blob_ex = new Blob([JSON.stringify(checkedValues)], {type: "application/json"});
  sendFileMessage("ChangedAngle.json",peerID,blob_ex) //this message should go first
}

const ifCheck = (tempJoints) => {
  var check = [];
  for (let i = 0; i < tempJoints.length; i++) {
          check.push(tempJoints[i].value)
  }
  return check;
}

const setSelectOrientation = (value) => {
  setSelectedOrientation(value)
};

const handleChange = async () => {
  this.setState({ start_stop: !this.state.start_stop });
  if (!this.state.start_stop) {
    window.darwin.restart();
    window.darwin.setExcersiseParams({
      angles: this.state.angles,
    });
    darwin.selectOrientation(this.state.selectedOrientation);
    this.timer();
  } else {
    //    clearInterval(this.interval)

    clearInterval(this.interval);
    console.log("FINALLL!!!!");
    let data = darwin.getAssesmentData();
    console.log("front", data);
    if (this.state.selectedOrientation == 1) {
      if(data!==undefined&&data!==null){
        this.props.FirstAssesment("Anterior_AI_Data", data);
        notification.success({
          message: 'Angles have been calculated',
          placement: 'bottomLeft',
          duration: 2
      })
      }
    }
    if (this.state.selectedOrientation == 2) {
      if(data!==undefined&&data!==null){
        this.props.FirstAssesment("LeftLateral_AI_Data", data);
        notification.success({
          message: 'Angles have been calculated',
          placement: 'bottomLeft',
          duration: 2
      })
      }
    }
    if (this.state.selectedOrientation == 3) {
      if(data!==undefined&&data!==null){
        this.props.FirstAssesment("RightLateral_AI_Data", data);
        notification.success({
          message: 'Angles have been calculated',
          placement: 'bottomLeft',
          duration: 2
      })
      }
    }
    console.log(this.state.data);
    this.array = JSON.stringify(this.state.data);
    console.log("hashedd");
    this.hashed = Buffer.from(this.array).toString("base64");
    console.log(this.hashed);
    // console.log('unhashed')
    //  console.log(atob(this.array))
    //  const response=  await add_angles(this.hashed)
    //  console.log(response)

    window.darwin.stop();
  }
  this.setState({ SWITCH: !this.state.SWITCH });
  this.setState({ BACK: !this.state.BACK });
};

const changeSide = (value) => {
  if(aiModelAppear){
    var magicbtn=document.getElementById("magic-btn")
    magicbtn.click();
  }
  if (value == "left") {
    setLatSide('left')
    setLateralJoints(leftJoints)
    setAngleValues([0, 4, 6, 12, 14, 18]);
    setSelectOrientation(2);
  }
  if (value == "right") {
    setLatSide('right')
    setLateralJoints(rightJoints)
    setAngleValues([1, 5, 7, 13, 15, 18]);
    setSelectOrientation(3);
  }
  if (SWITCH) {
    handleChange();
  }
};

const assesmentChange=(e)=>{
  if(aiModelAppear){
    var magicbtn=document.getElementById("magic-btn")
    magicbtn.click();
  }
  setSelectedAssessmentType(e.target.value)
  if(e.target.value=='rom'){
    setPostureVisible("none")
    setRomVisible("block")
    setMt(true)
  }
  else{
    setMt(false)
    setRomVisible('none')
    setPostureVisible('block')
  }
}

  return (

    <React.Fragment>
      {/* <div class="container-fluid p-0">
        <div id="main-container"> */}

          {/* <div id="buttons-container" class="row fixed-bottom justify-content-center mt-3 mb-1">
            <div class="col-md-2 text-center">
              <button
                id="mic-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
              >
                <i id="mic-icon" class="fas fa-microphone"></i>
              </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="video-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
              >
                <i id="video-icon" class="fas fa-video"></i>
              </button>

            </div>
            <div id="screen-share-btn-container" class="col-md-2 text-center">
            <button 
            type="button" 
            id="screen-share-btn" 
            class="btn video_con_bttn btn-block btn-dark btn-lg"
            >
              <i id="screen-share-icon" class="fas fa-desktop"></i>
            </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="exit-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-red btn-lg"
                onClick={Exit}
              >
                <i id="exit-icon" class="fas fa-phone-slash"></i>
              </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="magic-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
                onClick={AImodel}
              >
                <i id="magic-icon" class="fa fa-play" aria-hidden="true"></i>
              </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="stop-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
                onClick={AImodelStop}
              >
               <i class="fa fa-stop" aria-hidden="true"></i>
              </button>
            </div>
          </div> */}
          <Row gutter={[16,16]} style={{margin:'20px' , marginTop:'20px', marginBottom:'20px'}}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Row gutter={[16,16]} style={{justifyContent:'center'}}>
                <Col id="full-screen-video" style={{width:'640px',height:'380px' ,paddingLeft:'0px',paddingRight:'0px'}}>
                
                </Col>
                <Col className="sticky_button_grp " span={24} style={{justifyContent:'center',display:'flex' }}>
                  <Space size="small">
                    
                    <button
                id="mic-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
              >
                <i id="v_mic-icon" class="fas fa-microphone"></i>
              </button>
                   
                    
                    <button
                id="video-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
              >
                <i id="video-icon" class="fas fa-video"></i>
              </button>
                   
                    
                    <button 
            type="button" 
            id="screen-share-btn" 
            class="btn video_con_bttn btn-block btn-dark btn-lg"
            >
              <i id="screen-share-icon" class="fas fa-desktop"></i>
            </button>
                   
                    
                    <button
                id="exit-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-red btn-lg"
                onClick={Exit}
              >
                <i id="exit-icon" class="fas fa-phone-slash"></i>
              </button>
                   
                    
                    <button
                id="magic-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
                onClick={AImodel}
              >
                <i id="magic-icon" class="fa fa-play" aria-hidden="true"></i>
              </button>
                   
                    
                    <button
                id="stop-btn"
                type="button"
                class="btn video_con_bttn btn-block btn-dark btn-lg"
                onClick={AImodelStop}
              >
               <i class="fa fa-stop" aria-hidden="true"></i>
              </button>
                   
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Row>
                <Col className={Mt?'arom_class':'posture_class'} style={{width:'640px',height:'150px',marginTop:Mt}} span={24}>
                  <div id="remote-streams-container">
                  <div id="remote-streams"></div>
                  </div>
                  <div id="local-stream-container">
                    <div id="mute-overlay">
                        <i id="mic-icon" className="fas fa-microphone-slash"></i>
                    </div>
                    <div id="no-local-video">
                        <i id="user-icon" className="fas fa-user"></i>
                    </div>
                  </div>
                <div id="local-video" class="col p-0"></div>
                </Col>
                <Col className="rom_posture_btn_grp" span={24}>
                <Radio.Group style={{margin:'10px'}} onChange={assesmentChange} defaultValue='rom'>
          <Radio 
         // className="video_conf_text" 
          value={"rom"}>AROM</Radio>
          <Radio 
          //className="video_conf_text" 
          value={"posture"}>Posture</Radio>
        </Radio.Group>
        <div style={{display:postureVisible}}>
          <Tabs url1={url1} url2={url2} videoCon={true} setOrientation={setOrientation}
           frontAngles={frontAngles} sideAngles={sideAngles} setFrontAngles={setFrontAngles} 
           setSideAngles={setSideAngles} captureFront={captureFront}
           captureSide={captureSide} onChangeSide={onChangeSide} onChangeFront={onChangeFront}/>
          </div>
          <Col className="video_call_arom_mobile_view" style={{display:romVisible}}>
                    <>
                      <div className="containerrr">
                        <div className="bloc-tabss">
                          <span
                            aria-disabled
                            style={{
                              width: "460px",
                              padding: "0px 0 0 0",
                              height: "35px",
                            }}
                            className={
                              toggleState == 1
                                ? "tabss active-tabss"
                                : "tabss"
                            }
                            onClick={() => {
                              //setToggleState(1);
                              setToggleState(1);
                              setAngleValues([
                                0, 1, 2, 3, 8, 9, 10, 11, 16, 17,
                              ]);
                              setSelectOrientation(1);
                              if(aiModelAppear){
                                var magicbtn=document.getElementById("magic-btn")
                                magicbtn.click();
                              }
                              if (SWITCH) {
                                handleChange();
                              }
                            }}
                          >
                            <div className="fw-bold ant-tabss-btn">
                              Anterior
                            </div>
                          </span>
                          <span
                            style={{
                              width: "460px",
                              padding: "0px 0 0 0",
                              height: "35px",
                            }}
                            className={
                              toggleState == 2
                                ? "tabss active-tabss"
                                : "tabss"
                            }
                            onClick={() => {
                              //setToggleState(2);
                              setToggleState(2);
                              setAngleValues([0, 4, 6, 12, 14, 18]);
                              setSelectOrientation(2);
                              if(aiModelAppear){
                                var magicbtn=document.getElementById("magic-btn")
                                magicbtn.click();
                              }
                              if (SWITCH) {
                                handleChange();
                              }
                            }}
                          >
                            <div className="fw-bold ant-tabss-btn">Lateral</div>
                          </span>
                        </div>

                        <div
                          className={
                            toggleState == 1
                              ? "contentt  active-contentt"
                              : "contentt"
                          }
                        >
                          <br />
                          <div>
                            <Checkbox.Group
                                onChange={(e) =>{
                                  onChangeAngles(e)
                                }}                              
                                defaultValue={angleValues}
                            >
                              <Row>
                                {joints.map((item) => (
                                  <Col span={10}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>
                        </div>
                        <div
                          className={
                            toggleState == 2
                              ? "contentt  active-contentt"
                              : "contentt"
                          }
                        >
                          <Radio.Group
                            defaultValue={"left"}
                            onChange={(e) => changeSide(e.target.value)}
                          >
                            <Radio value={"left"}>left</Radio>
                            <Radio value={"right"}>right</Radio>
                          </Radio.Group>
                          <br />
                          <br />
                         {latSide=="left"&& <div>
                            <Checkbox.Group
                                onChange={(e) =>{
                                  onChangeAngles(e)
                                }}                              
                                defaultValue={ifCheck(leftJoints)}
                            >
                              <Row>
                                {leftJoints.map((item) => (
                                  <Col span={10}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>}
                          {latSide=="right"&& <div>
                            <Checkbox.Group
                            onChange={(e) =>{
                              onChangeAngles(e)
                            }}  
                            defaultValue={ifCheck(rightJoints)}
                            >
                              <Row>
                                {rightJoints.map((item) => (
                                  <Col span={10}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>}
                        </div>
                      </div>
                    </>
                  </Col>
                </Col>
              </Row>
            </Col>
            {/* <Col className="remote_stream_screen_mobile" style={{border:'5px solid' ,width:'640px',height:'150px'}} span={24}>
                <div id="remote-streams" >
              </div>
                <div id="local-video" class="col p-0"></div>
                </Col> */}
          </Row>
          {/* <div id="full-screen-video" class="col-9 mt-3 ml-1"></div>

          <div id="lower-video-bar" class="row mb-1">
            <div id="remote-streams-container" class="container col-9 ml-1">
              <div id="remote-streams" class="row">
              </div>
            </div>
            <div id="local-stream-container" class="col mt-3 mr-4 p-0">
              <div id="mute-overlay" class="col">
                <i id="mic-icon" class="fas fa-microphone-slash"></i>
              </div>
              <div id="no-local-video" class="col text-center">
                <i id="user-icon" class="fas fa-user"></i>
              </div>
              <div id="local-video" class="col p-0"></div>
            </div>
          </div> */}
          {/* <br></br>
          <div className="rom_posture_btn d-flex flex-row-reverse mt-2">
        <Radio.Group onChange={assesmentChange} defaultValue='rom'>
          <Radio className="video_conf_text" value={"rom"}>AROM</Radio>
          <Radio className="video_conf_text" value={"posture"}>Posture</Radio>
        </Radio.Group>
          </div>
          <br></br>
          <div style={{display:postureVisible}}>
          <div class="d-flex flex-row-reverse col-md-3 offset-md-9 mt-2">
          <Tabs url1={url1} url2={url2} videoCon={true} setOrientation={setOrientation}
           frontAngles={frontAngles} sideAngles={sideAngles} setFrontAngles={setFrontAngles} 
           setSideAngles={setSideAngles} captureFront={captureFront}
           captureSide={captureSide} onChangeSide={onChangeSide} onChangeFront={onChangeFront}/>
          </div>
          </div>
          <div className="video_call_arom_mobile_view" style={{display:romVisible}} > 
          <div class="d-flex flex-row-reverse col-md-3 offset-md-9 mt-2">
          <Col>
                    <>
                      <div className="containerrr">
                        <div className="bloc-tabss">
                          <span
                            aria-disabled
                            style={{
                              width: "460px",
                              padding: "0px 0 0 0",
                              height: "35px",
                            }}
                            className={
                              toggleState == 1
                                ? "tabss active-tabss"
                                : "tabss"
                            }
                            onClick={() => {
                              //setToggleState(1);
                              setToggleState(1);
                              setAngleValues([
                                0, 1, 2, 3, 8, 9, 10, 11, 16, 17,
                              ]);
                              setSelectOrientation(1);
                              if(aiModelAppear){
                                var magicbtn=document.getElementById("magic-btn")
                                magicbtn.click();
                              }
                              if (SWITCH) {
                                handleChange();
                              }
                            }}
                          >
                            <div className="fw-bold ant-tabss-btn">
                              Anterior
                            </div>
                          </span>
                          <span
                            style={{
                              width: "460px",
                              padding: "0px 0 0 0",
                              height: "35px",
                            }}
                            className={
                              toggleState == 2
                                ? "tabss active-tabss"
                                : "tabss"
                            }
                            onClick={() => {
                              //setToggleState(2);
                              setToggleState(2);
                              setAngleValues([0, 4, 6, 12, 14, 18]);
                              setSelectOrientation(2);
                              if(aiModelAppear){
                                var magicbtn=document.getElementById("magic-btn")
                                magicbtn.click();
                              }
                              if (SWITCH) {
                                handleChange();
                              }
                            }}
                          >
                            <div className="fw-bold ant-tabss-btn">Lateral</div>
                          </span>
                        </div>

                        <div
                          className={
                            toggleState == 1
                              ? "contentt  active-contentt"
                              : "contentt"
                          }
                        >
                          <br />
                          <div>
                            <Checkbox.Group
                                onChange={(e) =>{
                                  onChangeAngles(e)
                                }}                              
                                defaultValue={angleValues}
                            >
                              <Row>
                                {joints.map((item) => (
                                  <Col span={12}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>
                        </div>
                        <div
                          className={
                            toggleState == 2
                              ? "contentt  active-contentt"
                              : "contentt"
                          }
                        >
                          <Radio.Group
                            defaultValue={"left"}
                            onChange={(e) => changeSide(e.target.value)}
                          >
                            <Radio value={"left"}>left</Radio>
                            <Radio value={"right"}>right</Radio>
                          </Radio.Group>
                          <br />
                          <br />
                         {latSide=="left"&& <div>
                            <Checkbox.Group
                                onChange={(e) =>{
                                  onChangeAngles(e)
                                }}                              
                                defaultValue={ifCheck(leftJoints)}
                            >
                              <Row>
                                {leftJoints.map((item) => (
                                  <Col span={12}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>}
                          {latSide=="right"&& <div>
                            <Checkbox.Group
                            onChange={(e) =>{
                              onChangeAngles(e)
                            }}  
                            defaultValue={ifCheck(rightJoints)}
                            >
                              <Row>
                                {rightJoints.map((item) => (
                                  <Col span={12}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div>}
                        </div>
                      </div>
                    </>
                  </Col>
                  </div>
          </div> */}
        {/* </div>
      </div> */}
 <canvas hidden id="scanvas" style={{height:'440px'}}></canvas>
      <Modal
        onCancel={handleCancel}
        visible={modalVisible}
        title={<h3 style={{ textAlign: "center", paddingTop: 5 }} class="modal-title w-100 font-weight-bold">Join Channel</h3>}
        footer={[
          <div class=" d-flex justify-content-center">
            <Button id="join-channel" size="large" type="text" onClick={joinChannel}>
              Join Channel
            </Button>
          </div>
        ]}
      >
        <input type="text" 
        id="form-channel"
         class="form-control" 
         defaultValue={channel}
         />
        <label for="form-channel">Channel</label>

        <input
          type="number"
          id="form-uid"
          class="form-control"
          defaultValue={uid}
          data-decimals="0"
          disabled
        />
        <label for="form-uid">UID</label>

        <input
          type="number"
          id="form-peerId"
          class="form-control"
          defaultValue={pid}
          data-decimals="0"
          disabled
        />
        <label for="form-uid">Peer ID</label>
      </Modal>
     
    </React.Fragment>
  )
}
export default VideoCallIndex;