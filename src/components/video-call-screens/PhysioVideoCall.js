import { Button, Col, Form, Input, Modal, Radio, Row, Space, Tooltip } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import './temp.css'
import Draggable from 'react-draggable';
import AgoraRTM from 'agora-rtm-sdk'
import { BsCameraVideoFill, BsFillCameraVideoOffFill, BsMic, BsMicMuteFill } from 'react-icons/bs';
import { BiPhone, BiPhoneOff } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import { MdSecurityUpdateWarning } from 'react-icons/md';
import { RtmClient } from 'agora-rtm-react';
import bodyImage from "../../assets/lateral.webp";
import side_img from "../../assets/sideways-vector.webp";
import bodySideImage from "../../assets/Front_Sit.webp";
import side_sit_img from "../../assets/Side_Sit.webp";
import AROM from './AROM';
import { GetVideoConfData } from '../../API/VideoConf/videoconf';
import Tabs from '../Assesment/Tabs';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { STATECHANGE } from '../../contextStore/actions/Assesment';
import { useSelector } from 'react-redux';
import Tab1 from '../Assesment/Tab1';
// props.Setsidebarshow(false)
// export const useClient = createClient('616487fe8ede4785aa8f7e322efdbe7d');
// //7aca4bce40d0476fb3aafde5f88e3de9
// export const useChannel = createChannel('abc')

let frontChecks = {};
let sideChecks = {};
let frontSitChecks = {};
let sideSitChecks = {};
let side = [
  "Flexed Knee",
  "Hyper Extended Knee",
  "Excessive Anterior Pelvic",
  "Forward Head",
  "Lordosis",
  "Kyphosis",
];

let front = [
  "Genu Valgum",
  "Genu Varum",
  "Squinting / cross eyed patella",
  "Grosshoppers eyed platella",
];
let sideSit = [
  "Flexed Knee",
  "Hyper Extended Knee",
  "Excessive Anterior Pelvic",
  "Forward Head",
  "Lordosis",
  "Kyphosis",
];

let frontSit = [
  "Genu Valgum",
  "Genu Varum",
  "Squinting / cross eyed patella",
  "Grosshoppers eyed platella",
];

const options = {
  appId: '7aca4bce40d0476fb3aafde5f88e3de9',
  channel: 'test',
  token:
    '00617c1247f37f643beb8977d90572b283eIADpqs/npdMNdy8f//tf2nchNLvy9fAl1d6ErujTdvcxqAx+f9gAAAAAEACpCW2Ywm6iYQEAAQDBbqJh',
};
//0cd715df538845e5906569a182ac0448

let RTMClient = AgoraRTM.createInstance(options.appId)

const PhysioVideoCall = (props) => {
  const [uid1, setUid1] = useState(Math.floor(Math.random() * 1100))
  // const RTMClient = useClient();
  // const testChannel = useChannel(RTMClient)

  // let login = async () => {
  //   await RTMClient.login({ uid: `${uid1}` })
  //   await testChannel.join()
  //   RTMClient.on('ConnectionStateChanged', async (state, reason) => {
  //     console.log('ConnectionStateChanged1', state, reason)
  //   })
  //   testChannel.on('ChannelMessage', (msg, uid) => {
  //     console.log("message received in peer**** ", msg)
  //     // setTexts((previous) => {
  //     //   return [...previous, { msg, uid }]
  //     // })
  //   })
  //   testChannel.on('MemberJoined', (memberId) => {
  //     console.log('New Member: ', memberId)
  //   })
  //   //setLoggedIn(true)
  // }

  // let logout = async () => {
  //   await testChannel.leave()
  //   await rtmClient.logout()
  //   testChannel.removeAllListeners()
  //   rtmClient.removeAllListeners()
  //   setLoggedIn(false)
  // }
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const sendMsg = async (text) => {
    RTMChannel.sendMessage({ text, type: 'text' })
  }
  const [modalVisible, setModalVisible] = useState(true);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [disable, setDisable] = useState(true)
  const [loader, setLoader] = useState(false)
  const [client, setClient] = useState(null);
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(side_img)
  const [url3, setUrl3] = useState(bodySideImage)
  const [url4, setUrl4] = useState(side_sit_img)
  const [frontAngles, setFrontAngles] = useState([0, 0, 0, 0, 0])
  const [sideAngles, setSideAngles] = useState([0, 0, 0, 0])
  const [frontSitAngles, setFrontSitAngles] = useState([0, 0, 0, 0, 0])
  const [sideSitAngles, setSideSitAngles] = useState([0, 0, 0, 0, 0])
  const [freeze, setFreeze] = useState(false)
  const [postureType ,setPostureType] = useState(false)

  const [anterior, setAnterior] = useState({})
  const [lateralLeft, setLateralLeft] = useState({})
  const [lateralRight, setLateralRight] = useState({})
  const [frontPosture, setFrontPosture] = useState([])
  const [sidePosture, setSidePosture] = useState([])
  const [sitFrontPosture, setSitFrontPosture] = useState([])
  const [sitSidePosture, setSitSidePosture] = useState([])

  const [orientation, setOrientation] = useState(1)
  const [RTMChannel, setRTMChannel] = useState('')
  const [view, setView] = useState('AROM')
  const [startAss, setStartAss] = useState(false)
  const [uid, setUid] = useState(Math.floor(Math.random() * 10));
  const [audio, setAudio] = useState(true)
  const [video, setVideo] = useState(true)
  const [joined, setJoined] = useState(false)
  const nodeRef = useRef(null)
  const [screenId, setScreenId] = useState(999);
  const [appId, setAppID] = useState('7aca4bce40d0476fb3aafde5f88e3de9')
  const [channel, setChannel] = useState('demo')
  const [loading, setLoading] = useState(undefined)
  const [drag, setDrag] = useState(false)
  const [token, setToken] = useState('006616487fe8ede4785aa8f7e322efdbe7dIACXlFkKlBl2babpuoJ9mX1iNNW5edDwpoQFUZxwRSG/CaDfQtbSY0iIEAC5hioDqbMLYwEAAQA5cApj')
  const location = useParams()
  // useEffect(()=>{
  //   setDrag()
  // },[])
  useEffect(() => {
    props.Setsidebarshow(false)
    console.log("location ", location)
    const arr = location.channel.split("_")
    setChannel(arr[0])
    setUid(arr[1])
    const connect = async () => {
      await RTMClient.login({ uid: String(arr[1]), token: null })
    }
    connect()
    const _client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(_client);
    console.log('client================', _client);
    if (_client) {
      // listen for user published event, from where you can get an AgoraRTCRemoteUser object.
      _client.on('user-published', async function (user, mediaType) {
        if (user.uid !== screenId) {
          // subscribe to the remote user
          await _client.subscribe(user, mediaType);
          console.log('subscribe successfull! ', user);

          if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            //const remotePlayerContainer = document.getElementById('remote');
            remoteVideoTrack.play('remote');
            // document.getElementById('user_name').innerHTML = user.uid
          }

          if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
          }
        }
      });

      _client.on('user-joined', (user) => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
        console.log(user.uid);
        setDisable(false)
      });

      _client.on('user-unpublished', function (user) {
        console.log(`User unpublished ${user.uid}`);
      });
    }
  }, []);
  const onChangeFront = (value) => {
    console.log("front ", value);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "FrontCheck",
        value: value,
      },
    });
    //this.props.FirstAssesment("FrontCheck", value);
    front.map((a) => {
      if (value.includes(a)) {
        frontChecks[a] = 1;
      } else {
        frontChecks[a] = 0;
      }
    });
    // this.props.FirstAssesment("frontChecks", frontChecks);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "frontChecks",
        value: frontChecks,
      },
    });
  };
  const onChangeSide = (value) => {
    console.log("side ", value);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "SideCheck",
        value: value,
      },
    });
    //this.props.FirstAssesment("SideCheck", value);
    side.map((a) => {
      if (value.includes(a)) {
        sideChecks[a] = 1;
      } else {
        sideChecks[a] = 0;
      }
    });
    // this.props.FirstAssesment("sideChecks", sideChecks);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "sideChecks",
        value: sideChecks,
      },
    });
  };
  const onChangeSitSide = (value) => {
    console.log("side ", value);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "SideSitCheck",
        value: value,
      },
    });
    //this.props.FirstAssesment("SideSitCheck", value);
    sideSit.map((a) => {
      if (value.includes(a)) {
        sideSitChecks[a] = 1;
      } else {
        sideSitChecks[a] = 0;
      }
    });
    console.log("side ", sideSitChecks);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "sideSitChecks",
        value: sideSitChecks,
      },
    });
    // this.props.FirstAssesment("sideSitChecks", sideSitChecks);
  };
  const onChangeSitFront = (value) => {
    console.log("front ", value);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "FrontSitCheck",
        value: value,
      },
    });
    // this.props.FirstAssesment("FrontSitCheck", value);
    frontSit.map((a) => {
      if (value.includes(a)) {
        frontSitChecks[a] = 1;
      } else {
        frontSitChecks[a] = 0;
      }
    });
    console.log("side ", frontSitChecks);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "frontSitChecks",
        value: frontSitChecks,
      },
    });
    //  this.props.FirstAssesment("frontSitChecks", frontSitChecks);
  };
  const startAI = async () => {
    console.log("start")
    let obj = {
      type: 'initiate-arom'
    }
    setLoader(true)
    sendMsg(JSON.stringify(obj))
    setStartAss(true)

  }
  const startPosture = async () => {
    setView('Posture')
    console.log("startPosture")
    let obj = {
      type: 'initiate-posture',
      side: 1
    }
    setLoader(true)
    sendMsg(JSON.stringify(obj))
    setStartAss(true)

  }
  const stopAI = async () => {
    console.log("stop")
    sendMsg("start")
  }
  const joinChannel = async () => {
    const _rtmChannel = RTMClient.createChannel(channel)
    await _rtmChannel.join();
    _rtmChannel.on("ChannelMessage", async (msg, peerId) => {
      console.log("message from peer*** ", msg)
      console.log("message from peer*** ", JSON.parse(msg.text))
      let obj = JSON.parse(msg.text)
      // if (msg.fileName === 'AI_Data.json') {
      //   const blob = await RTMClient.downloadMedia(msg.mediaId)
      //   const reader = new FileReader();
      //   reader.addEventListener('loadend', (e) => {
      //     AI_Data = JSON.parse(e.srcElement.result)
      //     console.log("AI_Data",JSON.stringify(AI_Data))
      //     // if(AI_Data!=""){
      //     //   console.log("AI data from patient side to physio:" , {AI_Data})   
      //     //   localStorage.setItem("AI_Data",JSON.stringify(AI_Data));  
      //     //   alert("Data Successfully Received!")
      //     // }
      //     // else{
      //     // alert("Data Not Received")
      //     // }
      //    });
      //     reader.readAsText(blob)
      // }
      if (obj.type == "get-arom") {
        let res = await GetVideoConfData(obj.data_id)
        console.log("message from peer*** ", obj.type)
        console.log("message from peer*** ", res.message[0])
        if (obj.side == "arom-front") {
          console.log("AROM anterior ", res.message[0].AI_Data)
          setAnterior(res.message[0].AI_Data)
        }
        if (obj.side == "arom-left") {
          console.log("AROM anterior ", res.message[0].AI_Data)
          setLateralLeft(res.message[0].AI_Data)
        }
        if (obj.side == "arom-right") {
          console.log("AROM anterior ", res.message[0].AI_Data)
          setLateralRight(res.message[0].AI_Data)
        }
      }
      if (obj.type == "snapshot") {
        let res = await GetVideoConfData(obj.data_id)
        console.log("message from peer*** ", obj.type)
        console.log("message from peer*** ", res)
        if (obj.side == "anterior") {
          setFrontAngles([res.message[0].AI_Data[0].angle, res.message[0].AI_Data[1].angle, res.message[0].AI_Data[2].angle,
          res.message[0].AI_Data[3].angle, res.message[0].AI_Data[4].angle, res.message[0].AI_Data[5].angle
          ])
          setUrl1(res.message[0].image)
        }
        if (obj.side == "lateral") {
          setSideAngles([res.message[0].AI_Data[0].angle, res.message[0].AI_Data[1].angle, res.message[0].AI_Data[2].angle,
          res.message[0].AI_Data[3].angle
          ])
          setUrl2(res.message[0].image)
        }
        if (obj.side == "anterior-sitting") {
          setFrontSitAngles([res.message[0].AI_Data[0].angle, res.message[0].AI_Data[1].angle, res.message[0].AI_Data[2].angle,
          res.message[0].AI_Data[3].angle, res.message[0].AI_Data[4].angle
          ])
          setUrl3(res.message[0].image)
        }
        if (obj.side == "lateral-sitting") {
          setSideSitAngles([res.message[0].AI_Data[0].angle, res.message[0].AI_Data[1].angle, res.message[0].AI_Data[2].angle,
          res.message[0].AI_Data[3].angle, res.message[0].AI_Data[4].angle
          ])
          setUrl4(res.message[0].image)
        }
        setLoader(false)
      }
      if (obj.type == "stop-loading") {
        setLoader(false)
      }
    })
    setRTMChannel(_rtmChannel)
  }
  const saveVideoConfData = () => {
    if (window.confirm("Saving Assessment")) {
      let posture = {
        posture_test_date: new Date().toLocaleDateString("en-GB"),
       // Notes: this.state.notes,
      };
      if(url1!=bodyImage){
        let post = {
          posterial_view_image: url1,
          Angles: frontAngles,
          checkbox: state.FirstAssesment.frontChecks,
        }
        posture['Posterial_view'] = post
      }
      if(url2!=side_img){
        let post = {
          posterial_view_image: url2,
          Angles: sideAngles,
          checkbox: state.FirstAssesment.sideChecks,
        }
        posture['lateral_view'] = post
      }
      if(url3!=bodySideImage){
        let post = {
          posterial_view_image: url3,
          Angles: frontSitAngles,
          checkbox: state.FirstAssesment.frontSitChecks,
        }
        posture['sitting_Posterial_view'] = post
      }
      if(url4!=side_sit_img){
        let post = {
          posterial_view_image: url4,
          Angles: sideSitAngles,
          checkbox: state.FirstAssesment.sideSitChecks,
        }
        posture['Sitting_lateral_view'] = post
      }
      if(url1==bodyImage&&url2==side_img&&url3==bodySideImage&&url4==side_sit_img){
        posture={}
      }
      console.log("Posture ", posture)
      if(Object.keys(posture).length>0){
        localStorage.setItem("Posture_Data", JSON.stringify(posture));
      }
      let arom = {}
      if(Object.keys(anterior).length>0){
        arom['Anterior'] = anterior
      }else{
        arom['Anterior'] = ''
      }
      if(Object.keys(lateralLeft).length>0){
        arom['leftLateral'] = lateralLeft
      }else{
        arom['leftLateral'] = ''
      }
      if(Object.keys(lateralRight).length>0){
        arom['rightLateral'] = lateralRight
      }else{
        arom['rightLateral'] = ''
      }
      console.log("AROM ", arom)
      localStorage.setItem("AI_Data", JSON.stringify(arom));
    }
  }
  async function handleJoin() {

    joinChannel()
    console.log('channel ', channel)
    console.log('channel ', uid)
    try {
      console.log('client', client);
      setLoading(true)
      const res = await fetch(`${process.env.REACT_APP_EXERCISE_URL}/rtc/${channel}/subscriber/uid/${uid}`);
      const data = await res.json();
      var NewToken = data.rtcToken
      await client.join(
        appId,
        channel,
        NewToken,
        uid
      );

      // create a local audio track
      const _localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(_localAudioTrack);
      // create a local video track
      const _localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalVideoTrack(_localVideoTrack);
      // publish local audio and video tracks to the RTC channel
      await client.publish([_localAudioTrack, _localVideoTrack]);

      //const localPlayerContainer = document.getElementById('local');

      _localVideoTrack.play('local');
      setModalVisible(false)
      setLoading(false)
      setJoined(true)
      // document.getElementById('user_name').innerHTML = uid
      console.log('publish success!!');
      // login()
    } catch (e) {
      console.log('error ============', e);
    }
  }

  async function handleLeave() {
    if (window.confirm("Are you sure you want to leave")) {
      localAudioTrack.close();
      localVideoTrack.close();

      await client.leave();
      setJoined(false)
      window.top.close()
    }
  }

  async function handleShareScreen() {
    const screenClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    const screenId = await screenClient.join(
      options.appId,
      options.channel,
      options.token,
      screenId
    );

    const screenTrack = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
      optimizationMode: 'detail',
    });
    console.log('screenTrack=======================', screenTrack);
    screenClient.publish(screenTrack);
    screenTrack.play('screen');
  }
  const startAudio = async () => {
    const temp = await AgoraRTC.createMicrophoneAudioTrack();
    setLocalAudioTrack(temp)
    client.publish(temp)
    setAudio(true)
  }
  const stopAudio = async () => {
    localAudioTrack.close()
    client.unpublish(localAudioTrack)
    setAudio(false)
  }
  const startVideo = async () => {
    const temp = await AgoraRTC.createCameraVideoTrack()
    setLocalVideoTrack(temp)
    client.publish(temp)
    temp.play("local")
    setVideo(true)
  }
  const stopVideo = async () => {
    localVideoTrack.close()
    client.unpublish(localVideoTrack)
    setVideo(false)
  }
  const captureFront = (side) => {
    let obj = {
      type: 'snapshot',
      side
    }
    sendMsg(JSON.stringify(obj))
    setLoader(true)
    setFreeze(false)
  }
  const videoCallPosture = () => {
    let obj = {
      type: 'posture',
      side: orientation
    }
    sendMsg(JSON.stringify(obj))
    setFreeze(true)
  }
  return (
    <React.Fragment>
      <Modal
        title="Join Channel"
        style={{
          top: 20,
        }}
        visible={modalVisible}
        onOk={() => {
          handleJoin()
          setModalVisible(false)
        }}
        onCancel={() => {
          setModalVisible(false)
          window.top.close()
        }}
        footer={[
          <div class=" d-flex justify-content-center">
            <Button disabled={loading} loading={loading} id="join-channel" size="large" type="text" onClick={handleJoin}>
              Join Channel
            </Button>
          </div>
        ]}
      >
        <label for="form-channel">Channel</label>
        <input type="text"
          id="form-channel"
          class="form-control"
          value={channel}
          disabled
        />
        <label for="form-uid">UID</label>
        <input
          type="number"
          id="form-uid"
          class="form-control"
          value={uid}
          // data-decimals="0"
          disabled
        />
      </Modal>
      <Row gutter={[16, 16]} className="video-call-main-container" style={{ margin: '20px', marginTop: '20px', marginBottom: '40px' }}>
        <Col span={24}>
          {/* <Col xs={24} sm={24} md={16} lg={16} xl={16}> */}
          <Row>
            <Col className='holder' xs={24} sm={24} md={14} lg={16} xl={16} style={{ position: 'relative', display: 'grid' }}>
              {/* <p id='user_name'></p> */}
              <div id="remote" style={{ backgroundColor: 'black' }} className='holder-local holder-local-p' ></div>
              <Draggable disabled={drag} bounds="parent" ref={nodeRef} scale={2}>
                <div ref={nodeRef} id="local" className='holder-remote' ></div>
              </Draggable>
            </Col>
            <Col className='containerr' xs={24} sm={24} md={10} lg={8} xl={8} >
              {startAss ? <Col span={24}>
                <Row justify="space-between">
                  <Col span={12}>
                    <span className="class-btn" >{view}</span>
                  </Col>
                  {/* <Radio.Group
                    defaultValue={"AROM"}
                    onChange={(e) => {
                      setView(e.target.value)
                    }}
                  >
                  <Radio.Button value={"AROM"}>AROM</Radio.Button>
                  <Radio.Button value={"Posture"}>Posture</Radio.Button>
                  </Radio.Group> */}
                  <Col disabled={true} span={12}>

                    <Row justify="end"> <Button className="video-conf-next-btn" disabled={freeze} onClick={() => {
                      setView(view == "AROM" ? "Posture" : "AROM")
                      if (view == "Posture") {
                        console.log('initiate-arom')
                        let obj = {
                          type: 'initiate-arom'
                        }
                        sendMsg(JSON.stringify(obj))
                      } else {
                        console.log('initiate-posture')
                        let obj = {
                          type: 'initiate-posture'
                        }
                        sendMsg(JSON.stringify(obj))
                      }
                      setLoader(true)
                    }}>
                      <AiOutlineDoubleRight size={35} /> <span style={{ margin: '6px' }}>{view == "AROM" ? "Posture" : "AROM"}</span>
                    </Button>
                    </Row>

                  </Col>
                </Row>
                {view == "AROM" ? <AROM setFreeze={setFreeze} sendMsg={sendMsg} /> :
                  <>
                    <Row justify="space-between">
                      <Radio.Group style={{fontWeight:'900'}} onChange={() => {
                        setPostureType(!postureType)
                      }} defaultValue="a" size="large">
                        <Radio style={{ width: '100px' }} value="a">Standing   </Radio>
                        <Radio style={{ width: '100px' }} value="b">Sitting  </Radio>
                      </Radio.Group>
                    </Row>
                    {postureType?
                   <Tab1
                    url1={url3}
                    url2={url4}
                    videoConf={true}
                    sendMsg={sendMsg}
                    videoCallPosture={videoCallPosture}
                    frontAngles={frontSitAngles}
                    sideAngles={sideSitAngles}
                    setFrontAngles={setFrontSitAngles}
                    setSideAngles={setSideSitAngles}
                    captureFront={captureFront}
                    onChangeSide={onChangeSitSide}
                    onChangeFront={onChangeSitFront}
                    setOrientation={setOrientation}
                  />:
                  <Tabs
                  url1={url1}
                  url2={url2}
                  videoConf={true}
                  sendMsg={sendMsg}
                  videoCallPosture={videoCallPosture}
                  frontAngles={frontAngles}
                  sideAngles={sideAngles}
                  setFrontAngles={setFrontAngles}
                  setSideAngles={setSideAngles}
                  captureFront={captureFront}
                  onChangeSide={onChangeSide}
                  onChangeFront={onChangeFront}
                  setOrientation={setOrientation}
                />
                  }
                  </>
                }
              </Col> : <Row justify="center">
                {/* <Col span={24}>
                
                </Col>
                <Col span={24}>
                </Col> */}
                <Space><Tooltip title={disable?"Patient not joined":"AROM"}> <Button disabled={disable} className='start-assessment-btn' onClick={startAI} style={{ borderRadius: '10px' }}>AROM</Button></Tooltip>
                <Tooltip title={disable?"Patient not joined":"Posture"}> <Button disabled={disable} className='start-assessment-btn' onClick={startPosture} style={{ borderRadius: '10px' }}>Posture</Button></Tooltip></Space>
                <br/>
                <Col span={24}>
                <h5>Note: </h5>
                <h5>Please save the informations before leaving the page</h5>
                <h5>You can only start taking Assesments when the patient joins</h5>
                </Col>
                </Row>}
            </Col>
            {loader && <Loader />}
            <Col className="sticky_button_grp footer " span={24} style={{ justifyContent: 'center', display: 'flex' }}>
              <Space size="small">

                <button
                  id="mic-btn"
                  type="button"
                  className={`btn ${!audio ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                  onClick={audio ? stopAudio : startAudio}
                >
                  {audio ? <BsMic /> : <BsMicMuteFill />}
                  {/* <i id="v_mic-icon" class="fas fa-microphone"></i> */}
                </button>


                <button
                  id="video-btn"
                  type="button"
                  className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                  onClick={video ? stopVideo : startVideo}
                >
                  {video ? <BsCameraVideoFill /> : <BsFillCameraVideoOffFill />}
                  {/* <i id="video-icon" class="fas fa-video"></i> */}
                </button>

                <button
                  id="exit-btn"
                  type="button"
                  style={{ backgroundColor: 'red' }}
                  className="btn end-btn-big video_con_bttn btn-block btn-danger btn-lg"
                  onClick={handleLeave}
                >
                  <BiPhoneOff />
                  {/* <i id="exit-icon" class="fas fa-phone-slash"></i> */}
                </button>


                {/* <button
                  id="magic-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                  onClick={stopAI}
                >
                  <i id="magic-icon" class="fa fa-play" aria-hidden="true"></i>
                </button> */}
                <button
                  type="button"
                  onClick={saveVideoConfData}
                  id="video-conf-save-btn"
                  className="btn video-conf-save-btn video_con_bttn btn-block btn-dark btn-lg"
                >
                  save
                </button>

                {/* 
                <button
                  id="exit-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-red btn-lg"
                  onClick={startAI}
                >
                  <i id="exit-icon" class="fas fa-phone-slash"></i>
                </button>


                <button
                  id="magic-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                  onClick={stopAI}
                >
                  <i id="magic-icon" class="fa fa-play" aria-hidden="true"></i>
                </button> */}


                {/* <button
                  id="stop-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                // onClick={AImodelStop}
                >
                  <i class="fa fa-stop" aria-hidden="true"></i>
                </button> */}

              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default PhysioVideoCall