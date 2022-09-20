import { Button, Col, Drawer, Form, Input, Modal, notification, Radio, Row, Space, Tooltip } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import 'antd/dist/antd.css'
import AgoraRTC from 'agora-rtc-sdk-ng';
import './temp.css'
import Draggable from 'react-draggable';
import AgoraRTM from 'agora-rtm-sdk'
import { BsCameraVideo, BsCameraVideoFill, BsCameraVideoOff, BsFillArrowUpCircleFill, BsFillCameraVideoOffFill, BsFillMicFill, BsMic, BsMicMuteFill } from 'react-icons/bs';
import { BiPhone, BiPhoneOff } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import { MdSecurityUpdateWarning } from 'react-icons/md';
import { RtmClient } from 'agora-rtm-react';
import bodyImage from "../../assets/lateral.webp";
import side_img from "../../assets/sideways-vector.webp";
import bodySideImage from "../../assets/Front_Sit.webp";
import side_sit_img from "../../assets/Side_Sit.webp";
import AROM from './AROM';
import { GetToken, GetVideoConfData } from '../../API/VideoConf/videoconf';
import Tabs from '../Assesment/Tabs';
import { AiOutlineCloseCircle, AiOutlineDoubleRight } from 'react-icons/ai';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { STATECHANGE } from '../../contextStore/actions/Assesment';
import { useSelector } from 'react-redux';
import Tab1 from '../Assesment/Tab1';
import { IoVolumeMute } from 'react-icons/io5';
import { GoMute, GoUnmute } from 'react-icons/go';
import { FaDesktop, FaRegWindowClose, FaUserAlt, FaUserAltSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { IoMdCloseCircle } from 'react-icons/io';
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
  "Forward Head Posture",
  "Forwaer Slouch Posture",
  "Kyphotic Spine",
  "Lordotic Spine / Hollow Back",
];

let frontSit = [
  "Head Shift/Tilt",
  "Uneven Shoulder Levels",
  "Pelvic Drop / Upshift",
  "Right Leaning",
  "Left Leaning"
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [userIconSize, setUserIconSize] = useState(70)
  useEffect(() => {
    if (screen.width < 650) {
      setUserIconSize(15)
    } else {
      setUserIconSize(20)
    }
  }, [screen.width])
  const [modalVideoConfVisible, setModalVisible] = useState(true);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [disable, setDisable] = useState(true)
  const [disabledButtons, setDisabledButtons] = useState(false)
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
  const [postureType, setPostureType] = useState(false)
  const [postureTypeValue, setPostureTypeValue] = useState("standing")
  const [screenClientTrack, setScreenClientTrack] = useState('')
  const [anterior, setAnterior] = useState({})
  const [lateralLeft, setLateralLeft] = useState({})
  const [lateralRight, setLateralRight] = useState({})
  const [frontPosture, setFrontPosture] = useState([])
  const [sidePosture, setSidePosture] = useState([])
  const [sitFrontPosture, setSitFrontPosture] = useState([])
  const [sitSidePosture, setSitSidePosture] = useState([])
  const [physioJoined, setPhysioJoined] = useState(false)
  const [patientJoined, setPatientJoined] = useState(false)
  const [patientAudio, setPatientAudio] = useState(false)
  const [patientVideo, setPatientVideo] = useState(false)
  const [screenshare, setScreenShare] = useState(false)
  const [orientation, setOrientation] = useState(1)
  const [RTMChannel, setRTMChannel] = useState('')
  const [modelInitialized, setModelInitialized] = useState(false)
  const [view, setView] = useState('AROM')
  const [startAss, setStartAss] = useState(false)
  const [uid, setUid] = useState(Math.floor(Math.random() * 10));
  const [audio, setAudio] = useState(true)
  const [video, setVideo] = useState(true)
  const [joined, setJoined] = useState(false)
  const nodeRef = useRef(null)
  const nodeRef1 = useRef(null)
  const [screenId, setScreenId] = useState(Math.floor(Math.random() * 100));
  const [appId, setAppID] = useState('7aca4bce40d0476fb3aafde5f88e3de9')
  const [channel, setChannel] = useState('demo')
  const [loading, setLoading] = useState(undefined)
  const [drag, setDrag] = useState(false)
  const [token, setToken] = useState('006616487fe8ede4785aa8f7e322efdbe7dIACXlFkKlBl2babpuoJ9mX1iNNW5edDwpoQFUZxwRSG/CaDfQtbSY0iIEAC5hioDqbMLYwEAAQA5cApj')
  const location = useParams()
  useEffect(() => {
    localStorage.removeItem('ModelInitialized')
    props.Setsidebarshow(false)
    props.SideNavbarCollpased(true)
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
            document.getElementById('no-user-view').style.display = 'none'
            setPatientVideo(true)
            // document.getElementById('user_name').innerHTML = user.uid
          }

          if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
            setPatientAudio(true)
          }
        }
      });

      _client.on('user-joined', (user) => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu join ', user);
        notification.success({
          message: "Patient joined meeting",
          placement: "bottomLeft",
          duration: 2,
        });
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu join ', localStorage.getItem('ModelInitialized'));
        console.log(user.uid);
        if (localStorage.getItem('ModelInitialized')) {
          notification.open({
            message: 'Initialize AI',
            description:
              'Please initialize AI once again',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }
        setStartAss(false)
        //patient-mic
        document.getElementsByClassName('patient-mic')[0].style.display = 'flex'
        document.getElementById('no-user-view').style.display = 'none'
        //no-user-view
        setDisable(false)
        setPatientJoined(true)
      });
      _client.on('volume-indicator', (evt) => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu volume ', evt);
      })
      _client.on('user-left', (user) => {
        setPatientJoined(false)
        setDisable(true)
        setStartAss(false)
        notification.success({
          message: "Patient left meeting",
          placement: "bottomLeft",
          duration: 2,
        });
        document.getElementsByClassName('patient-mic')[0].style.display = 'none'
        document.getElementById('no-user-view').style.removeProperty('display')
        console.log(user.uid);
      });

      _client.on('user-unpublished', function (user, mediaType) {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu leave');
        console.log(`User unpublished ${user}`);
        if (mediaType === 'video') {
          setPatientVideo(false)
          document.getElementById('no-user-view').style.removeProperty('display')
        }

        if (mediaType === 'audio') {
          console.log('unpublished audio ', user, mediaType)
          setPatientAudio(false)
        }
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
    localStorage.setItem("ModelInitialized", "true")
    // document.getElementById('remote').getElementsByTagName('video')[0].classList.remove('agora_video_player')
    // document.getElementById('remote').getElementsByTagName('video')[0].classList.add('fit-assessment-screen')
    console.log("start")
    let obj = {
      type: 'initiate-arom'
    }
    setLoader(true)
    sendMsg(JSON.stringify(obj))
    setStartAss(true)

  }
  const startPosture = async () => {
    localStorage.setItem("ModelInitialized", "true")
    // document.getElementById('remote').getElementsByTagName('video')[0].classList.remove('agora_video_player')
    // document.getElementById('remote').getElementsByTagName('video')[0].classList.add('fit-assessment-screen')
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
      if (obj.type == "started-screen-share") {
        notification.success({
          message: "Patient started screen sharing",
          placement: "bottomLeft",
          duration: 2,
        });
      }
      if (obj.type == "stopped-screen-share") {
        notification.success({
          message: "Patient stopped screen sharing",
          placement: "bottomLeft",
          duration: 2,
        });
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
      if (url1 != bodyImage) {
        let post = {
          posterial_view_image: url1,
          Angles: frontAngles,
          checkbox: state.FirstAssesment.frontChecks,
        }
        posture['Posterial_view'] = post
      }
      if (url2 != side_img) {
        let post = {
          posterial_view_image: url2,
          Angles: sideAngles,
          checkbox: state.FirstAssesment.sideChecks,
        }
        posture['lateral_view'] = post
      }
      if (url3 != bodySideImage) {
        let post = {
          posterial_view_image: url3,
          Angles: frontSitAngles,
          checkbox: state.FirstAssesment.frontSitChecks,
        }
        posture['sitting_Posterial_view'] = post
      }
      if (url4 != side_sit_img) {
        let post = {
          posterial_view_image: url4,
          Angles: sideSitAngles,
          checkbox: state.FirstAssesment.sideSitChecks,
        }
        posture['Sitting_lateral_view'] = post
      }
      if (url1 == bodyImage && url2 == side_img && url3 == bodySideImage && url4 == side_sit_img) {
        posture = {}
      }
      console.log("Posture ", posture)
      if (Object.keys(posture).length > 0) {
        localStorage.setItem("Posture_Data", JSON.stringify(posture));
      }
      let arom = {}
      if (Object.keys(anterior).length > 0) {
        arom['Anterior'] = anterior
      } else {
        arom['Anterior'] = ''
      }
      if (Object.keys(lateralLeft).length > 0) {
        arom['leftLateral'] = lateralLeft
      } else {
        arom['leftLateral'] = ''
      }
      if (Object.keys(lateralRight).length > 0) {
        arom['rightLateral'] = lateralRight
      } else {
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
      var NewToken = await GetToken(channel, uid)
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
      setPhysioJoined(true)
      document.getElementById('no-physio-icon').style.display = 'none'
      document.getElementsByClassName('physio-mic')[0].style.display = 'flex'
      document.getElementsByClassName('physio-video')[0].style.display = 'flex'
      //physio-video
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
    // var NewToken = await GetToken(channel ,uid)
    // const screenClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    // const screenId = await screenClient.join(
    //   appId,
    //   channel,
    //    null,
    //   uid+"-screen" || null
    // );
    // console.log("screen ++++++++++++ ",screenId)
    const screenTrack = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
      optimizationMode: 'detail',
    });
    console.log('screenTrack=======================', screenTrack);
    client.unpublish(localVideoTrack)
    client.publish(screenTrack);
    setScreenShare(true)
    document.getElementById('remote').style.display = 'none'
    document.getElementById('screen').style.display = 'block'
    screenTrack.play('screen');
    setScreenClientTrack(screenTrack)
    let obj = {
      type: 'started-screen-share',
      screen_:startAss
    }
    notification.success({
      message: "You started screen sharing",
      placement: "bottomLeft",
      duration: 2,
    });
    sendMsg(JSON.stringify(obj))
    screenTrack.on('track-ended', () => {
      console.log("screen sharing stopped")
      screenTrack.close()
      client.unpublish(screenTrack)
      document.getElementById('remote').style.display = 'block'
      document.getElementById('screen').style.display = 'none'
      client.publish(localVideoTrack)
      notification.success({
        message: "You stopped screen sharing",
        placement: "bottomLeft",
        duration: 2,
      });
      setScreenShare(false)
      let obj = {
        type: 'stopped-screen-share',
        screen_:startAss
      }
      sendMsg(JSON.stringify(obj))
      //stopped-screen-share
    })
  }
  const stopScreenShare = async () => {
    //stopped-screen-share
    screenClientTrack.close()
    client.unpublish(screenClientTrack)
    document.getElementById('remote').style.display = 'block'
    document.getElementById('screen').style.display = 'none'
    client.publish(localVideoTrack)
    setScreenShare(false)
    notification.success({
      message: "You stopped screen sharing",
      placement: "bottomLeft",
      duration: 2,
    });
    let obj = {
      type: 'stopped-screen-share',
      screen_:startAss
    }
    sendMsg(JSON.stringify(obj))
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
    document.getElementById('no-physio-icon').style.display = 'none'
    temp.play("local")
    setVideo(true)
  }
  const stopVideo = async () => {
    localVideoTrack.close()
    client.unpublish(localVideoTrack)
    document.getElementById('no-physio-icon').style.removeProperty('display')
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
        visible={modalVideoConfVisible}
        onOk={() => {
          handleJoin()
          setModalVisible(false)
        }}
        closeIcon={<GrClose onClick={() => {
          setModalVisible(false)
          window.top.close()
        }} />}
        onCancel={() => {
          console.log("modal")
        }}
        footer={[
          <Row justify='center'>
            <Button disabled={loading} loading={loading} id="join-channel" size="large" type="text" onClick={handleJoin}>
              Join Channel
            </Button>
          </Row>
        ]}
      >
        <Form layout='vertical'>

          <Form.Item label="Channel">
            <Input value={channel} style={{ color: 'black' }}
              disabled placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="UID">
            <Input id="form-uid"
              value={uid} style={{ color: 'black' }}
              disabled placeholder="input placeholder" />
          </Form.Item>
        </Form>
        {/* <label for="form-channel">Channel</label>
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
        /> */}
      </Modal>
      <Row className="video-call-main-container" style={{ margin: '20px', marginTop: '20px', marginBottom: '20vh' }}>
        <Col span={24}>
          {/* <Col xs={24} sm={24} md={16} lg={16} xl={16}> */}
          <Row>
            <Col className='holder' xs={24} sm={24} md={14} lg={16} xl={16} style={{ position: 'relative', display: 'grid' }}>
              {/* <p id='user_name'></p> */}
              <div id="remote" style={{ backgroundColor: '#2a2c2d' }} className='physio-page holder-local holder-local-p' >
                <div id="no-user-view"><p className='no-user-icon'>{patientJoined ? <FaUserAlt size={70} /> : <FaUserAltSlash size={70} />}</p></div>
                <p className='patient-mic'>{patientAudio ? <GoUnmute size={userIconSize} /> :
                  <GoMute style={{ color: 'red' }} size={userIconSize} />}{"   "}{patientVideo ? <FaVideo size={userIconSize} /> :
                    <FaVideoSlash style={{ color: 'red' }} size={userIconSize} />}</p></div>
              <div id="screen" style={{ backgroundColor: '#2a2c2d', display: 'none' }} className='holder-local holder-local-p' >

              </div>

              <Draggable disabled={drag} bounds="parent" ref={nodeRef} scale={2}>
                <div ref={nodeRef} id="local" className='holder-remote' ><div id="no-physio-icon">
                  <p className='no-physio-icon'>{physioJoined ? <FaUserAlt size={35} />
                    : <FaUserAltSlash size={userIconSize} />}</p></div><p className='physio-mic'>{audio ? <GoUnmute size={userIconSize} /> : <GoMute style={{ color: 'red' }} size={userIconSize} />}</p>
                  <p className='physio-video'>{video ? <FaVideo size={userIconSize} /> : <FaVideoSlash style={{ color: 'red' }} size={userIconSize} />}</p></div>
              </Draggable>
            </Col>
            {/* <Draggable axis="y" handle='button' ref={nodeRef1} scale={2}> */}

            <Col id="assessment-tab" style={{ paddingBottom: '40px' }} className='containerr' xs={24} sm={24} md={10} lg={8} xl={8} >
              {/*  */}
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
                    </Button>{"     "}
                      <Tooltip title={freeze ? "Assessment is running please stop it" : 'Close Assessment'}>
                        <AiOutlineCloseCircle onClick={() => {
                          if (freeze) return
                          let obj = {
                            type: 'stop-assessment'
                          }
                          if (screen.width < 769) {
                            document.getElementById('remote').getElementsByTagName('video')[0].classList.remove('fit-assessment-screen')
                            document.getElementById('remote').getElementsByTagName('video')[0].classList.add('agora_video_player')
                          }
                          sendMsg(JSON.stringify(obj))
                          setStartAss(false)
                          setModelInitialized(false)
                        }} style={{ marginLeft: '25px', color: 'red' }} size={25} />
                      </Tooltip>
                    </Row>

                  </Col>
                </Row>
                {view == "AROM" ? <AROM setFreeze={setFreeze} sendMsg={sendMsg} /> :
                  <>
                    <Row justify="space-between">
                      <Radio.Group style={{ fontWeight: '900' }} onChange={(e) => {
                        setPostureType(!postureType)
                        setPostureTypeValue(e.target.value)
                        setOrientation(1)
                      }} defaultValue={postureTypeValue} size="large">
                        <Radio style={{ width: '100px' }} value="standing">Standing   </Radio>
                        <Radio style={{ width: '100px' }} value="sitting">Sitting  </Radio>
                      </Radio.Group>
                    </Row>
                    {postureType ?
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
                      /> :
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
              <Col span={24}>
                <h4>Assessment Tab</h4>
                </Col>
                <Col span={24}>
                <Space><Tooltip title={disable ? "Patient not joined" : "AROM"}> <Button disabled={disable} className='start-assessment-btn' onClick={() => {
                  if (localStorage.getItem('OnAssessmentScreen') == "false") {
                    return notification.error({
                      message: "Please turn on video conferance on Assesment page",
                      placement: "bottomLeft",
                      duration: 2,
                    });
                  }
                  startAI()
                }} style={{ borderRadius: '10px' }}>AROM</Button></Tooltip>
                  <Tooltip title={disable ? "Patient not joined" : "Posture"}> <Button disabled={disable} className='start-assessment-btn' onClick={() => {
                    if (localStorage.getItem('OnAssessmentScreen') == "false") {
                      return notification.error({
                        message: "Please turn on video conferance on Assesment page",
                        placement: "bottomLeft",
                        duration: 2,
                      });
                    }
                    startPosture()
                  }} style={{ borderRadius: '10px' }}>Posture</Button></Tooltip></Space>

                </Col>
                <Col span={24}>
                  <h5>Note: </h5>
                  <h5>Please save the informations before leaving the page</h5>
                  <h5>You can only start taking Assesments when the patient joins</h5>
                </Col>
              </Row>}
            </Col>
            {/* assessment-tab-mobile */}
            {/* </Draggable> */}
            {loader && <Loader />}
            <Col className="sticky_button_grp footer " span={24} style={{ justifyContent: 'center', display: 'flex' }}>
              <Space size="small">
                <Tooltip title={`Turn ${audio ? `off` : `on`} Microphone`}>
                  <button
                    id="mic-btn"
                    type="button"
                    className={`btn ${!audio ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                    onClick={audio ? stopAudio : startAudio}
                  >
                    {audio ? <BsMic size={18} /> : <BsMicMuteFill size={18} />}
                  </button></Tooltip>

                <Tooltip title={`Turn ${video ? `off` : `on`} Video`}>
                  <button
                    id="video-btn"
                    type="button"
                    className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                    onClick={video ? stopVideo : startVideo}
                  >
                    {video ? <BsCameraVideoFill size={18} /> : <BsFillCameraVideoOffFill size={18} />}
                  </button></Tooltip>

                {freeze ? <Tooltip title={`Assessment is running can't share screen `}> <button
                  id="magic-btn"
                  type="button"
                  disabled={freeze}
                  className={`btn ${screenshare ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                >
                  {screenshare ? <FaRegWindowClose size={18} /> : <FaDesktop size={18} />}
                  {/* <i id="magic-icon" class={`fa fa-${screenshare ? 'window-close' : 'desktop'}`} aria-hidden="true"></i> */}
                </button></Tooltip> : <Tooltip title={`Turn ${screenshare ? `off` : `on`} Screen Share`}><button
                  id="magic-btn"
                  type="button"
                  disabled={freeze}
                  className={`btn ${screenshare ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                  onClick={screenshare ? stopScreenShare : handleShareScreen}
                >
                  {screenshare ? <FaRegWindowClose size={18} /> : <FaDesktop size={18} />}
                  {/* <i id="magic-icon" class={`fa fa-${screenshare ? 'window-close' : 'desktop'}`} aria-hidden="true"></i> */}
                </button></Tooltip>}
                <Tooltip title={`Leave Meeting`}>
                  <button
                    id="exit-btn"
                    type="button"
                    style={{ backgroundColor: 'red' }}
                    className="btn end-btn-big video_con_bttn btn-block btn-danger btn-lg"
                    onClick={handleLeave}
                  >
                    <BiPhoneOff />
                  </button></Tooltip>

                <Tooltip title={`Save Assessment Data`}>
                  <button
                    type="button"
                    onClick={saveVideoConfData}
                    id="video-conf-save-btn"
                    className="btn video-conf-save-btn video_con_bttn btn-block btn-dark btn-lg"
                  >
                    Save
                  </button></Tooltip>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default PhysioVideoCall