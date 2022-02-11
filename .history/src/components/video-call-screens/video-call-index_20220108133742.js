import React, { useRef, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal,notification,Checkbox } from 'antd';
import "../../styles/Layout/VideoCon.css"

var aiModelAppear = false;
var channel=""
var uid=""
var pid=""
var Joints=""
var angle=[]
const joints = [
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
  { value: 10, label: "rightPelvic" },
  { value: 11, label: "leftPelvic" },
]

const VideoCallIndex = (props) => {

  const canvasRef = useRef(null);
  const state = useSelector(state => state);
  const [modalVisible, setModalvisible] = useState(false)
  const [videoVisible, setVideoVisible] = useState('none')
  const [videoUrl,setVideoURL]=useState("")
  const [angleValues,setAngleValues]=useState("")
  const [exerciseURL,setExerciseURL]=useState("")






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

  useEffect(() => {
    function checkUserData() {
      var item = JSON.parse(localStorage.getItem("input_data"))

      if (item!="") {
        Joints=item.Joints
        const exerise = document.getElementById("ex")
        if (item.allExcercise.length > 1) {
            exerise.innerHTML += '<option value="Please Select">Select the Excercise</option>'
            for (var i=0;i<item.allExcercise.length;i++) {
                let lable = item.allExcercise[i]
                exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
            }
        }
        else {
            let lable = item.allExcercise[0]
            exerise.innerHTML += ` <option value=${lable}>${lable}</option>`
            ExDef(lable);
        }
        ifCheck()
        setVideoVisible('block')

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

  const joinChannel = async() => {
    let streamCanvas = document.getElementById("scanvas");
    var agoraAppId = "f31ea0f88fcf4974a349448e69d35c1d"
    var channelName = $("#form-channel").val();
    var uid = parseInt($("#form-uid").val());
    // const res = await fetch(process.env.REACT_APP_EXERCISE_URL+`/rtc/${channelName}/subscriber/uid/${uid}`);
    // const data = await res.json();
    // var token = data.rtcToken
    var token = "006f31ea0f88fcf4974a349448e69d35c1dIABLcHR8rpyshfmZ6Ju5eOzgKPUv3haXEo58kBUVl5dsxaPI/sGR8bcOEACCDcMFo5XaYQEAAQAzUtlh"
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
    joinRTMChannel(uid); //Geting here in this invokation
  }
  
const handleCancel = () => {
    window.top.close()
  };
  const AImodel = () => {
    aiModelAppear = !aiModelAppear;
    var peerID = $("#form-peerId").val();
    localStorage.setItem("aiModelAppear", JSON.stringify(aiModelAppear));
    if (aiModelAppear) {
      try{
      var ex_data = JSON.parse(localStorage.getItem("input_data"))
      localStorage.setItem("ExerciseName",JSON.stringify(ex_data.allExcercise))
      ex_data.exerciseURL = exerciseURL 
      const PreLable = ex_data.Joints;
      for (let i = 0; i < joints.length; i++) {
        if (PreLable.includes(joints[i].label)) {
          angle.push(joints[i].value)
        }
      }
      for(let i=0;i<angleValues.length;i++){
        if(angle.indexOf(angleValues[i])==-1){
          angle.push(angleValues[i])
        }
      } 
      ex_data.Joints=angle
      $("#magic-btn").html("Pause")
      $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');

      var blob_ex = new Blob([JSON.stringify(ex_data)], {type: "application/json"});

      sendFileMessage("Ex_data.json",peerID,blob_ex) //this message should go first

      setTimeout(()=>{
        sendMessage("start", peerID);
      },3000)
      }
      catch(err){
        aiModelAppear=false
        notification.error({
          message: 'Please select the exercise before starting ROM!',
          placement: 'bottomLeft',
          duration: 5
      })      
    }

    } else {
      $("#magic-btn").html("Start")
      $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
      sendMessage("stop",peerID);
    }
    console.log(aiModelAppear);
  }

  const AImodelStop=()=>{
    var peerID = $("#form-peerId").val();
    setVideoVisible('none')
    sendMessage("get",peerID);
    sendMessage("stop", peerID);
    $("#magic-btn").html("Start")
    $("#magic-btn").toggleClass('btn-dark').toggleClass('btn-red');
    $("#magic-btn").prop("disabled", true);
    localStorage.setItem("input_data","");

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

const angles = (checkedValues) => {
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
          <div id="full-screen-video" class="col-10 mt-3 ml-1"></div>
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
          <div style={{display:videoVisible}} > 
          <div class="d-flex flex-row-reverse mt-4">
          <video src={'https://myphysio.digitaldarwin.in/'+videoUrl} autoPlay controls loop className="videoScreenCon" />
          </div>
          <div class="d-flex flex-row-reverse mt-2 mr-3">
          <select name="ex" id="ex" onChange={ExChanges}>
              </select>
          </div>
          <div class="d-flex flex-row-reverse mt-2">
              <Checkbox.Group defaultValue={ifCheck} onChange={angles}>
                  <Row>
                    {joints.map(item => (
                      <Col offset={20}>
                          <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>))}
                    </Row>
              </Checkbox.Group>
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
      <canvas hidden id="scanvas"></canvas>
      {/* <canvas ref={canvasRef} width="1310" height="550"></canvas> */}
    </React.Fragment>
  )
}
export default VideoCallIndex;