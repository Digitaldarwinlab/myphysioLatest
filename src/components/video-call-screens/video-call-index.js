import React, { useRef, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal,notification,Radio,Checkbox } from 'antd';
import "../../styles/Layout/VideoCon.css"
import bodyImage from "../.././assets/lateral.jpg"
import side_img from '../.././assets/sideways-vector.jpg'
import Tabs from "../Assesment/Tabs";
import { check } from "prettier";

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

let posture={
  posterial_view:{
    image: "",
    angles: "",
    checkbox:""
  },
  lateral_view:{
    image: "",
    angles: "",
    checkbox:""
  }
}

const VideoCallIndex = (props) => {

  const canvasRef = useRef(null);
  const state = useSelector(state => state);
  const [modalVisible, setModalvisible] = useState(false)
  const [romVisible, setRomVisible] = useState('block')
  const [postureVisible, setPostureVisible] = useState('none')
  const [videoUrl,setVideoURL]=useState("")
  const [angleValues,setAngleValues]=useState([0, 1, 2, 3, 8, 9, 10, 11, 16, 17])
  const [exerciseURL,setExerciseURL]=useState("")
  const [toggleState, setToggleState] = useState(1);
  const [selectedOrientation, setSelectedOrientation] = useState(1);
  const [lateralJoints ,setLateralJoints] = useState(leftJoints)
  const [latSide ,setLatSide] = useState('left')
  const [angles1 ,setAngles1] = useState([])
  const [SWITCH, setSWITCH] = useState(false)
  const [selectedAssessmentType,setSelectedAssessmentType]=useState("rom")
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(side_img)
  const [frontAngles, setFrontAngles] = useState([0,0,0,0,0])
  const [sideAngles, setSideAngles] = useState([0, 0, 0, 0]);
  const [frontChecks, setFrontChecks] = useState();
  const [sideChecks, setSideChecks] = useState();

  const [orientation, setOrientation] = useState(1);

  useEffect(() => {
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);
    $("#magic-btn").prop("disabled", true);
    $("#stop-btn").prop("disabled", true);

    setModalvisible(true)
    const arr=props.match.params.channel.split("-")
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

  // useEffect(() => {
  //   function checkUserData() {
  //     var input_data=localStorage.getItem("input_data")
  //     if(input_data!=""){
  //     var item = JSON.parse(input_data)
  //       if (item!="") {
  //         Joints=item.Joints
  //         const exerise = document.getElementById("ex")
  //         if (item.allExcercise.length > 1) {
  //             exerise.innerHTML += '<option value="Please Select">Select the Excercise</option>'
  //             for (var i=0;i<item.allExcercise.length;i++) {
  //                 let lable = item.allExcercise[i]
  //                 exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
  //             }
  //         }
  //         else {
  //             let lable = item.allExcercise[0]
  //             exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
  //             ExDef(lable);
  //         }
  //         ifCheck()
  //         setVideoVisible('block')

  //       }
  //     }
  //   }
  
  //   window.addEventListener('storage', checkUserData)
  
  //   return () => {
  //     window.removeEventListener('storage', checkUserData)
  //   }
  // }, [])

  const doubleClick = () => {
    document.documentElement.requestFullscreen().catch((e) => {
      // console.log(e);
    })
  }

const captureFront=()=>{
  console.log(Anterior_Data)
  setUrl1(Anterior_Data.image)
  const out = document.getElementById("scr_out1");
  var img = document.createElement('img');
  img.src = Anterior_Data.image
  out.appendChild(img);
  setFrontAngles([
    Anterior_Data.angles[0],
    Anterior_Data.angles[1],
    Anterior_Data.angles[2],
    Anterior_Data.angles[3],
    Anterior_Data.angles[4],
    Anterior_Data.angles[5]
  ]);
  aiModelAppear = !aiModelAppear;
  $("#magic-btn").html("Start")
  $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
}
  
const  captureSide = () => {
  console.log(Lateral_Data)
  setUrl2(Lateral_Data.image)
  const out = document.getElementById("scr_out2");
  var img = document.createElement('img');
  img.src = Lateral_Data.image;
  out.appendChild(img);
  setSideAngles([
    Lateral_Data.angles[0],
    Lateral_Data.angles[1],
    Lateral_Data.angles[2],
    Lateral_Data.angles[3],
  ])
  aiModelAppear = !aiModelAppear;
  $("#magic-btn").html("Start")
  $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
}


const onChangeFront = (value) =>{
  setFrontChecks(value)
}

const onChangeSide = (value) =>{
  setSideChecks(value)
}

  const joinChannel = async() => {
    let streamCanvas = document.getElementById("scanvas");
    var agoraAppId = "616487fe8ede4785aa8f7e322efdbe7d"
    var channelName = $("#form-channel").val();
    var uid = parseInt($("#form-uid").val());
    // console.log(process.env.REACT_APP_EXERCISE_URL)
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
    aiModelAppear = !aiModelAppear;
    var peerID = $("#form-peerId").val();
    localStorage.setItem("aiModelAppear", JSON.stringify(aiModelAppear));
    if (aiModelAppear) {
      if(selectedAssessmentType=='rom'){
      // try{
      // var ex_data = JSON.parse(localStorage.getItem("input_data"))
      let ex_data={
        Joints:angleValues,
        allExcercise:['EmptyExercise'],
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
      $("#magic-btn").html("Pause")
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
      $("#magic-btn").html("Pause")
      $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
      if(orientation==1){
        sendMessage("startPosture1",peerID)
      }
      else{
        sendMessage("startPosture2",peerID)
      }
    }

    } 
    else {
      $("#magic-btn").html("Start")
      $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
      sendMessage("stop",peerID);
    }
  }

  const AImodelStop=()=>{
    var peerID = $("#form-peerId").val();
    if(selectedAssessmentType=='rom'){
    sendMessage("get",peerID);
    sendMessage("stop", peerID);
    $("#magic-btn").html("Start")
    $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
    aiModelAppear = !aiModelAppear;
    localStorage.setItem("input_data","");
    localStorage.setItem("ExerciseName","");
    }
    else if(selectedAssessmentType=='posture'){
      $("#magic-btn").html("Start")
      $("#magic-btn").toggleClass('btn-dark');
      aiModelAppear = !aiModelAppear;
      posture.posterial_view.angles=frontAngles
      posture.posterial_view.image=url1
      posture.posterial_view.checkbox=frontChecks
      posture.lateral_view.angles=sideAngles
      posture.lateral_view.image=url2
      posture.lateral_view.checkbox=sideChecks
      console.log(posture)
      localStorage.setItem("Posture_Data",JSON.stringify(posture));  
      
    }

  }

  const Exit=()=>{
    console.log("so sad to see you leave the channel");
    leaveChannel();
    setModalvisible(true)
  }

  const ExChanges = (e) => {
    fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({ exercise: e.target.value })

    }).then(res => {
        return res.json();
    }).then(data => {
        data.map((val) => {
            setVideoURL(val.video_path)
            setExerciseURL(val.video_path)
        })
    })
}

const ExDef = (name) => {
  fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "content-type": "application/json"
      },
      body: JSON.stringify({ exercise: name })

  }).then(res => {
      return res.json();
  }).then(data => {
      data.map((val) => {
        setVideoURL(val.video_path)
        setExerciseURL(val.video_path)
      })
  })
}

const onChangeAngles = (checkedValues) => {
  setAngleValues(checkedValues)
}

const ifCheck = () => {
  var check = [];
  for (let i = 0; i < joints.length; i++) {
      if (Joints.includes(joints[i].label)) {
          check.push(joints[i].value)
      }
  }
  return check;
}

const setAngles = (value) => {
  setAngles1(value)
};

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
  if (value == "left") {
    setLatSide('left')
    setLateralJoints(leftJoints)
    setAngles([0, 4, 6, 12, 14, 18]);
    setSelectOrientation(2);
  }
  if (value == "right") {
    setLatSide('right')
    setLateralJoints(rightJoints)
    setAngles([1, 5, 7, 13, 15, 18]);
    setSelectOrientation(3);
  }
  if (SWITCH) {
    handleChange();
  }
};

const assesmentChange=(e)=>{
  setSelectedAssessmentType(e.target.value)
  if(e.target.value=='rom'){
    setPostureVisible("none")
    setRomVisible("block")
  }
  else{
    setRomVisible('none')
    setPostureVisible('block')
  }
}

  return (

    <React.Fragment>

      {/* <Row gutter={[20,20]}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <MyPhysioLogo text="text-white" />
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <p className="p text-white fw-bold">| pqt-qxy-rty |</p>
                    </Col>
                </Row> */}
      <div class="container-fluid p-0">
        <div id="main-container">
          <div id="buttons-container" class="row fixed-bottom justify-content-center mt-3 mb-1">
            <div class="col-md-2 text-center">
              {/* <Button id="mic-btn" className="btn-dark">
                <i id="mic-icon" class="fas fa-microphone"></i>
              </Button> */}
              <button
                id="mic-btn"
                type="button"
                class="btn btn-block btn-dark btn-lg"
              >
                <i id="mic-icon" class="fas fa-microphone"></i>
              </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="video-btn"
                type="button"
                class="btn btn-block btn-dark btn-lg"
              >
                <i id="video-icon" class="fas fa-video"></i>
              </button>

            </div>
            <div id="screen-share-btn-container" class="col-md-2 text-center">
            <button 
            type="button" 
            id="screen-share-btn" 
            class="btn btn-block btn-dark btn-lg"
            >
              <i id="screen-share-icon" class="fas fa-desktop"></i>
            </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="exit-btn"
                type="button"
                class="btn btn-block btn-red btn-lg"
                onClick={Exit}
              >
                <i id="exit-icon" class="fas fa-phone-slash"></i>
              </button>
            </div>
            <div class="col-md-2 text-center">
              <button
                id="magic-btn"
                type="button"
                class="btn btn-block btn-dark btn-lg"
                onClick={AImodel}
              >
                Start
              </button>
              {/* <input type="text" id="peer-message" class="form-control" /> */}
            </div>
            <div class="col-md-2 text-center">
              <button
                id="stop-btn"
                type="button"
                class="btn btn-block btn-dark btn-lg"
                onClick={AImodelStop}
              >
                Stop
              </button>
              {/* <input type="text" id="peer-message" class="form-control" /> */}
            </div>
          </div>
          <div id="full-screen-video" class="col-9 mt-3 ml-1"></div>
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
          </div>
          <br></br>
          <div class="d-flex flex-row-revers mt-2 mr-5">
          <Radio.Group
          options={assessmentType}
          onChange={assesmentChange}
          defaultValue='rom'
          optionType="button"
          buttonStyle="solid"
        />
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
          <div style={{display:romVisible}} > 
          {/* <div class="d-flex flex-row-reverse mt-4">
          <video src={`${process.env.REACT_APP_EXERCISE_URL}/${videoUrl}`} autoPlay controls loop className="videoScreenCon" />
          </div> */}
          {/* <div class="d-flex flex-row-reverse mt-2 mr-3">
          <select name="ex" id="ex" onChange={ExChanges}>
              </select>
          </div> */}
          <div class="d-flex flex-row-reverse col-md-3 offset-md-9 mt-2">
              {/* <Checkbox.Group defaultValue={ifCheck} onChange={angles}>
                  <Row>
                    {joints.map(item => (
                      <Col offset={20}>
                          <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>))}
                    </Row>
              </Checkbox.Group>
          </div> */}
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
                              setAngles([
                                0, 1, 2, 3, 8, 9, 10, 11, 16, 17,
                              ]);
                              setSelectOrientation(1);
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
                              setAngles([0, 4, 6, 12, 14, 18]);
                              setSelectOrientation(2);
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
                          {/* <Radio checked value={"front"}>
            front
          </Radio> */}
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
                          {/* <div>
                            <Checkbox.Group
                              onChange={this.angles}
                              value={() =>
                                this.ifCheck(this.state.lateralJoints)
                              }
                            >
                              <Row>
                                {this.state.lateralJoints.map((item) => (
                                  <Col span={12}>
                                    <Checkbox value={item.value}>
                                      {labels[item.value]}
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                          </div> */}
                         {latSide=="left"&& <div>
                            <Checkbox.Group
                                onChange={(e) =>{
                                  onChangeAngles(e)
                                }}                              
                                // defaultValue={() =>
                            //     this.ifCheck(leftJoints)
                            //   }
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
                            // defaultValue={() =>
                            //     this.ifCheck(rightJoints)
                            //   }
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
          </div>
        </div>
      </div>
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
        />
        <label for="form-uid">UID</label>

        <input
          type="number"
          id="form-peerId"
          class="form-control"
          defaultValue={pid}
          data-decimals="0"
        />
        <label for="form-uid">Peer ID</label>
      </Modal>
      <canvas hidden id="scanvas" style={{height:'440px'}}></canvas>
      {/* <canvas ref={canvasRef} width="1310" height="550"></canvas> */}
    </React.Fragment>
  )
}
export default VideoCallIndex;