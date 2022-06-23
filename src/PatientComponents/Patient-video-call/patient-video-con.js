import React, { useRef, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Button, Modal, Space } from 'antd';
import "../../styles/Layout/VideoCon.css"
import Draggable from 'react-draggable';
import './patient-video-call.css'
var channel=""
var uid=""
var pid=""

const PatientVideoCallIndex = (props) => {

  const state = useSelector(state => state);
  const [modalVisible, setModalvisible] = useState(false)
  const [videoUrl,setVideoURL]=useState("")
  const nodeRef = useRef(null)

  useEffect(() => {
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);
    setModalvisible(true)
    const arr=props.match.params.channel.split("_")
    channel=arr[0]
    uid=arr[2]
    pid=arr[1]
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext('2d');
    // ctx.beginPath();
    // ctx.rect(10, 10, canvas.clientWidth, canvas.clientHeight);
    // ctx.fillStyle = 'white';
    // ctx.fill();
  }, [])
  
  const doubleClick = () => {
    document.documentElement.requestFullscreen().catch((e) => {
      // console.log(e);
    })
  }

  const handleCancel=()=>{
    window.top.close()
  }

  const joinChannel = async() => {
    let streamCanvas = document.getElementById("scanvas");
    var agoraAppId = "616487fe8ede4785aa8f7e322efdbe7d"
    var channelName = $("#form-channel").val();
    var uid = parseInt($("#form-uid").val());
    // const data = await res.json();
    // var token = data.rtcToken
  //  const res = await fetch(`localhost:3000/rtc/${channelName}/subscriber/uid/${uid}`);
    const res = await fetch(`${process.env.REACT_APP_EXERCISE_URL}/rtc/${channelName}/subscriber/uid/${uid}`);
    const data = await res.json();
    var token = data.rtcToken
    setModalvisible(false)
    ClientAndJoinChannel(
      agoraAppId,
      token,
      channelName,
      uid,
      streamCanvas
    );
    joinRTMChannel(uid);
  }

  const Exit=()=>{
    // console.log("so sad to see you leave the channel");
    leaveChannel();
    // setModalvisible(true)
    handleCancel();
  }

  return (

    <React.Fragment>
       <Row gutter={[16,16]} style={{margin:'20px' , marginTop:'20px', marginBottom:'20px'}}>
       <Col xs={24} sm={24} md={16} lg={16} xl={16}>
       <Row gutter={[16,16]} style={{justifyContent:'center'}}>
       <Col style={{width:'640px',height:'380px' ,paddingLeft:'0px',paddingRight:'0px'}}>
       <div id="local-stream-container" >
              <div id="no-local-video" class="col text-center">
                <i id="user-icon" class="fas fa-user"></i>
              </div>
              <div id="local-video" style={{width: "100%",height: "370px",  position: "absolute", transform:"scaleX(-1)"}} class="col p-0">
              <canvas style={{width: "100%",height:'100%',  position: "absolute"}} class="col p-0" id="scanvas"></canvas>
              <div id="mute-overlay">
                <i id="mic-icon" class="fas fa-microphone-slash"></i>
              </div>
              <div id="remote-streams" class="row"></div>
              </div>
            </div>
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
                class="btn video_con_bttn btn-block btn-dark btn-lg"
                onClick={Exit}
              >
                <i id="exit-icon" class="fas fa-phone-slash"></i>
              </button>
          </Space>
        </Col>
       </Row>
       </Col>
       <Col xs={24} sm={24} md={8} lg={8} xl={8}>
       <Row>
       <Draggable ref={nodeRef} scale={2}> 
       <Col style={{width:'640px',height:'150px'}} span={24}>
       <div  ref={nodeRef} id="full-screen-video" style={{
              position:"absolute",
              height:"100%",
              width:'100%',
              zIndex:1}}
            ></div>
      </Col>
              </Draggable> 
        </Row>
       </Col>
      </Row>
      {/* <div class="container-fluid p-0">
         
          <div id="local-stream-container" class="col-10 mt-3 ml-1">
              
              <div id="no-local-video" class="col text-center">
                <i id="user-icon" class="fas fa-user"></i>
              </div>
              <div id="local-video" style={{width: "77vw",height: "80vh",  position: "absolute", transform:"scaleX(-1)"}} class="col p-0">
              <canvas style={{width: "70vw",height:'70vh',  position: "absolute"}} class="col p-0" id="scanvas"></canvas>
              <div id="mute-overlay">
                <i id="mic-icon" class="fas fa-microphone-slash"></i>
              </div>
              </div>
            </div>
          <div id="lower-video-bar" 
          //style={{position:'absolute'}}
          class="row mb-1">
            <div id="remote-streams-container" class="container col-9 ml-1">
              <div id="remote-streams" class="row">
              </div>
            </div>
            {/* <Draggable ref={nodeRef} scale={2}> 
            <div  ref={nodeRef} id="full-screen-video" style={{
              position:"absolute",
              height:"150px",
              width:'150',
              maxWidth:"150px",
              zIndex:1}}
            class="d-flex flex-row-reverse offset-md-10 col-md-3 mr-4 p-0"></div>

           </Draggable> 
          </div>

       
      </div> */}
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
        defaultValue={channel}/>
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
      {/* <canvas ref={canvasRef} width="1310" height="550"></canvas> */}
    </React.Fragment>
  )
}
export default PatientVideoCallIndex;