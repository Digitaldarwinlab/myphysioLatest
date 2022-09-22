import { Button, Col, Form, Input, Modal, notification, Row, Space, Tooltip } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import './temp.css'
import AgoraRTM from 'agora-rtm-sdk'

import { BsCameraVideoFill, BsFillCameraVideoOffFill, BsMic, BsMicMuteFill } from 'react-icons/bs';
import { BiPhoneOff } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { AddVideoConfData } from '../../API/VideoConf/videoconf';
import { FaDesktop, FaRegWindowClose, FaUserAlt, FaUserAltSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { GoMute, GoUnmute } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';

const options = {
  appId: '7aca4bce40d0476fb3aafde5f88e3de9',
  channel: 'test',
  token:
    '00617c1247f37f643beb8977d90572b283eIADpqs/npdMNdy8f//tf2nchNLvy9fAl1d6ErujTdvcxqAx+f9gAAAAAEACpCW2Ywm6iYQEAAQDBbqJh',
};
// const useClient = createClient('7aca4bce40d0476fb3aafde5f88e3de9');
// const useChannel = createChannel("abc")
let RTMClient = AgoraRTM.createInstance(options.appId)

const PatientVideoCall = (props) => {
  // const rtmClient = useClient();
  // const testChannel = useChannel(rtmClient)
  let AiCanvas = ''
  let TempStream = {}
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(undefined)
  const [drag, setDrag] = useState(true)
  const [RTMChannel, setRTMChannel] = useState('')
  const location = useParams()
  // useEffect(() => {
  //   if (window.screen.width < 770) {
  //     setDrag(true)
  //   }
  // }, [window.screen])

  const sendMsg = async (text) => {
    console.log('text ', text)
    RTMChannel.sendMessage({ text, type: 'text' })
  }
  async function sendFileMessage1(file_name, peerId, blob) {
    const mediaMessage = await RTMChannel.createMediaMessageByUploading(blob, {
      messageType: 'FILE',
      fileName: file_name,
      description: 'send file'
    })
    RTMChannel.sendMessageToPeer(mediaMessage, peerId)
  }
  const [loadState, setLoadState] = useState(false)
  const [screenshare, setScreenShare] = useState(false)
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [startCount, setStartCount] = useState(1)
  const [client, setClient] = useState(null);
  const [screenClientTrack, setScreenClientTrack] = useState('')
  const [peerId, setPeerId] = useState('')
  const [uid, setUid] = useState(Math.floor(Math.random() * 10));
  const [audio, setAudio] = useState(true)
  const [video, setVideo] = useState(true)
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false)
  const [NoUserIcon, setNoUserIcon] = useState(70)
  const [physioJoined, setPhysioJoined] = useState(false)
  const [patientJoined, setPatientJoined] = useState(false)
  const [patientAudio, setPatientAudio] = useState(false)
  const [patientVideo, setPatientVideo] = useState(false)
  const [physioAudio, setPhysioAudio] = useState(false)
  const [physioVideo, setPhysioVideo] = useState(false)
  const nodeRef = useRef(null)
  const [screenId, setScreenId] = useState(Math.floor(Math.random() * 100));
  const [changeView, setChangeView] = useState('')
  const [cvsslg, setCVSSLG] = useState(12)
  const [changeViewOnscreenShare, setChangeViewOnscreenShare] = useState('')
  const [appId, setAppID] = useState('7aca4bce40d0476fb3aafde5f88e3de9')
  const [channel, setChannel] = useState('demo')
  const [token, setToken] = useState('006616487fe8ede4785aa8f7e322efdbe7dIAD8ig3d9ExWFhwv1mySzHryeSXjpNVvv8CO1p8Udp/pQqDfQtaQ1sJlEAAJmBoBQLkLYwEAAQDQdQpj')
  const connect = async (ar) => {
    await RTMClient.login({ uid: String(ar), token: null })
  }
  async function capture() {
    window.scrollTo(0, 0)
    const canvas = await html2canvas(document.getElementById("scanvas"))
    var extra_canvas = document.createElement("canvas");
    extra_canvas.setAttribute('width', 180);
    extra_canvas.setAttribute('height', 180);
    var ctx = extra_canvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
    var dataURL = extra_canvas.toDataURL();
    return (dataURL)
  }
  useEffect(() => {
    if (screen.width < 770) {
      setNoUserIcon(35)
    } else {
      setNoUserIcon(70)
    }
  }, [screen.width])

  useEffect(async () => {
    props.Setsidebarshow(false)
    props.SideNavbarCollpased(true)
    // await login()
    console.log("location ", location)
    const arr = location.channel.split("_")
    setChannel(arr[0])
    setUid(arr[2])
    setPeerId(String(arr[1]))
    connect(arr[2])
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
            setPhysioVideo(true)
            document.getElementById('no-physio-view').style.display = 'none'
            // document.getElementById('user_name').innerHTML = user.uid
          }

          if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
            setPhysioAudio(true)
          }
        }
      });

      _client.on('user-joined', (user) => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu join');
        notification.success({
          message: "Physio joined meeting",
          placement: "bottomLeft",
          duration: 2,
        });
        console.log(user.uid);
        document.getElementById('physio-mic-video').style.display = 'flex'
        //patient-mic
        //document.getElementsByClassName('patient-mic')[0].style.display = 'flex'
        document.getElementById('no-physio-view').style.display = 'none'
        setPhysioJoined(true)
      });
      _client.on('user-left', (user) => {
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu leave');
        console.log(user.uid);
        notification.success({
          message: "Physio left meeting",
          placement: "bottomLeft",
          duration: 2,
        });
        //no-physio-icon
        setPhysioJoined(false)
        document.getElementById('physio-mic-video').style.display = 'none'
      });
      _client.on('user-unpublished', function (user, mediaType) {
        console.log(`mediaType ${user}`);
        if (mediaType === 'video') {
          setPhysioVideo(false)
          document.getElementById('remote').style.background = 'black'
          document.getElementById('no-physio-view').style.display = 'block'
        }

        if (mediaType === 'audio') {
          console.log('unpublished audio ', user, mediaType)
          setPhysioAudio(false)
        }
      });
    }
  }, []);

  const startAI = async () => {
    console.log("start")
    // login()
    sendMsg("AI start")

  }

  const joinChannel = async () => {
    const _rtmChannel = RTMClient.createChannel(channel)
    await _rtmChannel.join();
    _rtmChannel.on("ChannelMessage", async (msg, peerId) => {
      let obj = JSON.parse(msg.text)
      console.log("message from peer*** ", msg)
      if (obj.type == "initiate-arom") {
        try {
          setDrag(false)
          setCVSSLG(24)
          let videoElem = document.getElementById('local').querySelector('video')
          console.log('initiate posture ', document.getElementsByClassName('holder-local')[0])
          document.getElementsByClassName('holder-local')[0].classList.add('remote-on-screenshare')
          document.getElementById('local').classList.add('display-none-sm')
          console.log("video elem ", videoElem)
          let canvas = document.getElementById('scanvas')
          let { width, height } = videoElem.getBoundingClientRect()
          console.log("width and height ", width, " ", height)
          AiCanvas = canvas
          const options = {
            video: videoElem,
            // videoWidth: width,
            // videoHeight: height,
            canvas: canvas,
            supervised: true,
            showAngles: true,
            drawLine: false,
          };
          console.log(options)
          window.darwin.initializeModel(options);
          window.darwin.launchModel();
          window.darwin.stop();
          setIsAssessmentStarted(true)
          // TempStream.addTrack(tracks[0]);
          //change_view
          setChangeView('change_view')
          document.getElementById('local').style.display = 'none'
          document.getElementsByClassName('holder')[0].style.zIndex = 10
          document.getElementsByClassName('holder')[0].style.position = 'static'
          //document.getElementById('scanvas').style.removeProperty('display')
          document.getElementById('scanvas').style.display = 'block'
          setTimeout(() => {
            let obj1 = {
              type: "stop-loading"
            }
            //sendMsg(JSON.stringify(obj))
            _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
          }, 1000)
        } catch (error) {
          console.log(error)
          setTimeout(() => {
            let obj1 = {
              type: "stop-loading"
            }
            //sendMsg(JSON.stringify(obj))
            _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
          }, 1000)
        }

      }
      if (obj.type == "initiate-posture") {
        try {
          setDrag(false)
          setCVSSLG(24)
          let videoElem = document.getElementById('local').querySelector('video')
          document.getElementsByClassName('holder-local')[0].classList.add('remote-on-screenshare')
          document.getElementById('local').classList.add('display-none-sm')
          console.log("video elem ", videoElem)
          let canvas = document.getElementById('scanvas')
          let { width, height } = videoElem.getBoundingClientRect()
          console.log("width and height ", width, " ", height)
          AiCanvas = canvas
          const options = {
            video: videoElem,
            // videoWidth: width,
            // videoHeight: height,
            canvas: canvas,
            supervised: true,
            showAngles: true,
            drawLine: true,
          };
          console.log(options)
          window.darwin.initializeModel(options);
          window.darwin.launchModel();
          window.darwin.stop();
          setIsAssessmentStarted(true)
          // TempStream.addTrack(tracks[0]);
          //change_view
          setChangeView('change_view')
          document.getElementById('local').style.display = 'none'
          document.getElementsByClassName('holder')[0].style.zIndex = 10
          document.getElementsByClassName('holder')[0].style.position = 'static'
          document.getElementById('scanvas').style.display = 'block'
          //document.getElementById('scanvas').style.removeProperty('display')
          setTimeout(() => {
            let obj1 = {
              type: "stop-loading"
            }
            //sendMsg(JSON.stringify(obj))
            _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
          }, 1000)
        } catch (error) {
          setTimeout(() => {
            let obj1 = {
              type: "stop-loading"
            }
            //sendMsg(JSON.stringify(obj))
            _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
          }, 1000)
        }
      }
      // if(obj.type == "anterior"){
      //   window.darwin.restart();
      //   window.darwin.setExcersiseParams(obj.data);
      // }
      if (obj.type == 'change-joints') {
        console.log("message from peer*** ", obj.data)
        window.darwin.setExcersiseParams({
          angles: obj.data,
        });
      }
      if (obj.type == 'get-arom') {
        // connect(uid)
        let data = window.darwin.getAssesmentData()
        console.log('stop call data ', data)
        const res = await AddVideoConfData(data)
        let obj1 = {
          type: "get-arom",
          data_id: res.image_id,
          side: obj.side
        }
        //sendMsg(JSON.stringify(obj))
        _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        // startAI()
        window.darwin.stop()
      }
      if (obj.type == "anterior") {
        console.log('cccccccc ', localStorage.getItem('startCount'))
        window.darwin.restart();
        if (localStorage.getItem('startCount') == 1) {
          let obj1 = {
            type: "start-loading",
            count: 9000
          }
          _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        } else {
          let obj1 = {
            type: "start-loading",
            count: 2000
          }
          _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        }
        window.darwin.setExcersiseParams(obj.data);
        // console.log("stream check ", videoElem)
        let streamC
        streamC = AiCanvas.captureStream(15);
        //videoElem
        console.log("stream check ", streamC)
        let tracks = streamC.getVideoTracks()[0];
        console.log("stream check ", tracks)
        // localVideoTrack.close()
        let r = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: streamC.getVideoTracks()[0],
        });
        client.unpublish(localVideoTrack)
        console.log("stream check ", r)
        //client.publish(r)
        if (localStorage.getItem('audio')=="true") {
          const _localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          setLocalAudioTrack(_localAudioTrack);
          await client.publish([_localAudioTrack, r]);
        }else{
          await client.publish(r);
        }
        if (localStorage.getItem('startCount')) {
          localStorage.setItem('startCount', 1 + Number(localStorage.getItem('startCount')))
        } else {
          localStorage.setItem('startCount', 1)
        }
        // setTimeout(() => {
        //   let obj1 = {
        //     type: "stop-loading"
        //   }
        //   //sendMsg(JSON.stringify(obj))
        //   _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        // }, 2000)
        // setLocalVideoTrack()
      }
      if (obj.type == "posture") {
        window.darwin.restart();
        if (localStorage.getItem('startCount') == 1) {
          let obj1 = {
            type: "start-loading",
            count: 6000
          }
          _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        } else {
          let obj1 = {
            type: "start-loading",
            count: 2000
          }
          _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        }
        window.darwin.selectOrientation(obj.side);
        // console.log("stream check ", videoElem)
        let streamC
        streamC = AiCanvas.captureStream(15);
        //videoElem
        console.log("stream check ", streamC)
        let tracks = streamC.getVideoTracks()[0];
        console.log("stream check ", tracks)
        // localVideoTrack.close()
        let r = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: streamC.getVideoTracks()[0],
        });
        client.unpublish(localVideoTrack)
        console.log("stream check ", r)
        //client.publish(r)
        if (localStorage.getItem('audio')=="true") {
          const _localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          setLocalAudioTrack(_localAudioTrack);
          await client.publish([_localAudioTrack, r]);
        }else{
          await client.publish(r);
        }
        if (localStorage.getItem('startCount')) {
          localStorage.setItem('startCount', 1 + Number(localStorage.getItem('startCount')))
        } else {
          localStorage.setItem('startCount', 1)
        }
        // setLocalVideoTrack()
      }
      if (obj.type == "snapshot") {
        darwin.screenShot();
        let image = await capture()
        const data = await window.darwin.showAngles();
        const res = await AddVideoConfData(data, image)
        const obj1 = {
          type: "snapshot",
          data_id: res.image_id,
          side: obj.side
        }
        console.log("Video conferance ", obj1)
        //sendMsg(JSON.stringify(obj))
        _rtmChannel.sendMessage({ text: JSON.stringify(obj1), type: 'TEXT' })
        // startAI()
        window.darwin.stop()
      }
      if (obj.type == "started-screen-share") {
        setChangeViewOnscreenShare('change_view')
        if (obj.screen_) {
          setChangeView('')
          console.log("started-screen-share ai is on")
          document.getElementById('scanvas').style.display = 'none'
        }
        // console.log('display property ',document.getElementById('scanvas').style)
        //physio-mic-video
        //document.getElementById('physio-mic-video').style.display = 'none'
        document.getElementById('remote').classList.add('rotate-screen-180')
        document.getElementById('local').classList.add('remote-width')
        notification.success({
          message: "Physio started screen sharing",
          placement: "bottomLeft",
          duration: 2,
        });
        //remote-width{
        setCVSSLG(24)
      }
      if (obj.type == "stopped-screen-share") {
        setChangeViewOnscreenShare('')
        if (obj.screen_) {
          setChangeView('change_view')
          document.getElementById('scanvas').style.display = 'flex'
        }
        // document.getElementById('scanvas').style.display='flex'
        //physio-mic-video
        document.getElementById('physio-mic-video').style.display = 'block'
        document.getElementById('remote').classList.remove('rotate-screen-180')
        document.getElementById('local').classList.remove('remote-width')
        notification.success({
          message: "Physio stopped screen sharing",
          placement: "bottomLeft",
          duration: 2,
        });
        setCVSSLG(12)
      }
      if (obj.type == 'darwin.stop') {
        window.darwin.stop()
      }
      if (obj.type == 'stop-assessment') {
        setChangeView('')
        window.darwin.stop()
        setCVSSLG(12)
        setIsAssessmentStarted(false)
        setDrag(true)
        document.getElementById('local').classList.remove('display-none-sm')
        // if(screen.width<769){
        // }
        document.getElementById('local').style.display = 'block'
        document.getElementById('local').getElementsByTagName('video')[0].style.display = "block"
        document.getElementById('scanvas').style.display = 'none'
      }
    })
    setRTMChannel(_rtmChannel)
  }

  async function handleJoin() {
    console.log('channel ', channel)
    console.log('channel ', uid)
    localStorage.setItem('startCount', 1)
    joinChannel()
    try {
      console.log('client', client);
      setLoading(true)
      const res = await fetch(`${process.env.REACT_APP_EXERCISE_URL}/rtc/${channel}/subscriber/uid/${uid}`);
      const data = await res.json();
      var NewToken = data.rtcToken
      // join rtc channel
      await client.join(
        appId,
        channel,
        NewToken,
        uid
      );

      // create a local audio track
      const _localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setLocalAudioTrack(_localAudioTrack);
      localStorage.setItem('audio',true)
      // create a local video track
      const _localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalVideoTrack(_localVideoTrack);
      TempStream = _localVideoTrack
      // publish local audio and video tracks to the RTC channel
      await client.publish([_localAudioTrack, _localVideoTrack]);

      //const localPlayerContainer = document.getElementById('local');

      _localVideoTrack.play('local');
      console.log('user joined ', _localVideoTrack)
      console.log('user joined ', _localVideoTrack._ID)
      document.getElementById("agora-video-player-" + _localVideoTrack._ID).style.borderRadius = '15px'
      setModalVisible(false)
      setLoading(false)
      document.getElementById('no-user-view').style.display = 'none'
      document.getElementsByClassName('patient-mic-video')[0].style.display = 'flex'
      setPatientJoined(true)
      // document.getElementById('user_name').innerHTML = uid
      console.log('publish success!!');
    } catch (e) {
      console.log('error ============', e);
    }
  }

  async function handleLeave() {
    if (window.confirm("Are you sure you want to leave")) {
      localAudioTrack.close();
      localVideoTrack.close();

      await client.leave();
      setPatientJoined(false)
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
    //document.getElementById('local').classList.add('display-none')
    document.getElementById('screen').style.display = 'block'
    screenTrack.play('screen');
    setScreenClientTrack(screenTrack)
    let obj = {
      type: 'started-screen-share',
    }
    setChangeViewOnscreenShare('change_view')
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
      // document.getElementById('local').classList.remove('display-none')
      document.getElementById('screen').style.display = 'none'
      client.publish(localVideoTrack)
      setScreenShare(false)
      setChangeViewOnscreenShare('')
      let obj = {
        type: 'stopped-screen-share',
      }
      notification.success({
        message: "You stopped screen sharing",
        placement: "bottomLeft",
        duration: 2,
      });
      sendMsg(JSON.stringify(obj))
      setCVSSLG(12)
    })
    setCVSSLG(24)
  }
  const stopScreenShare = async () => {
    //stopped-screen-share
    setCVSSLG(12)
    screenClientTrack.close()
    setChangeViewOnscreenShare('change_view')
    client.unpublish(screenClientTrack)
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
    }
    sendMsg(JSON.stringify(obj))
  }
  const startAudio = async () => {
    localStorage.setItem('audio',true)
    const temp = await AgoraRTC.createMicrophoneAudioTrack();
    setLocalAudioTrack(temp)
    client.publish(temp)
    setAudio(true)
  }
  const stopAudio = async () => {
    localStorage.setItem('audio',false)
    localAudioTrack.close()
    client.unpublish(localAudioTrack)
    setAudio(false)
  }
  const startVideo = async () => {
    const temp = await AgoraRTC.createCameraVideoTrack()
    setLocalVideoTrack(temp)
    document.getElementById('no-user-view').style.display = 'none'
    client.publish(temp)
    temp.play("local")
    setVideo(true)
  }
  const stopVideo = async () => {
    localVideoTrack.close()
    document.getElementById('no-user-view').style.removeProperty('display')
    client.unpublish(localVideoTrack)
    setVideo(false)
  }

  return (
    // <React.Fragment>
    //   <Row gutter={[16, 16]} className="patient-video-call-main" style={{ margin: '20px'}}>
    //      <Col className='holder' span={12} >
    //      <div id="local" className='holder-local' ></div>
    //      </Col>
    //      <Col className='holder' span={12} >
    //      <div id='remote' className='holder-remote1'></div>
    //      </Col>
    //      <Col className="sticky_button_grp " span={24} style={{justifyContent:'center',display:'flex' }}>
    //     <Space size="small">
    //           <button
    //             id="mic-btn"
    //             type="button"
    //             class="btn video_con_bttn btn-block btn-dark btn-lg"
    //           >
    //             <i id="v_mic-icon" class="fas fa-microphone"></i>
    //           </button>
    //           <button
    //             id="video-btn"
    //             type="button"
    //             onClick={handleJoin}
    //             class="btn video_con_bttn btn-block btn-dark btn-lg"
    //           >
    //             <i id="video-icon" class="fas fa-video"></i>
    //           </button>
    //           {/* <button 
    //         type="button" 
    //         id="screen-share-btn" 
    //         class="btn video_con_bttn btn-block btn-dark btn-lg"
    //         >
    //           <i id="screen-share-icon" class="fas fa-desktop"></i>
    //         </button> */}
    //         <button
    //             id="exit-btn"
    //             type="button"
    //             class="btn video_con_bttn btn-block btn-dark btn-lg"
    //              onClick={handleLeave}
    //           >
    //             <i id="exit-icon" class="fas fa-phone-slash"></i>
    //           </button>
    //       </Space>
    //     </Col>
    //   </Row>
    // </React.Fragment>
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
          disabled
        /> */}
      </Modal>
      <Row gutter={[16, 16]} className="video-call-main-container" justifyContent="center" style={{ margin: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Col span={24} >
          {/* <Col xs={24} sm={24} md={16} lg={16} xl={16}> */}
          <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
            <Col id="local" style={{ backgroundColor: 'black', borderRadius: '15px' }} className={`holder-remote1 ${changeViewOnscreenShare}`} xs={24} sm={24} md={12} lg={12} xl={12}>
              <div id="no-user-view"><p className='no-patient-icon'>{patientJoined ? <FaUserAlt size={NoUserIcon} /> : <FaUserAltSlash size={NoUserIcon} />}</p></div>
              <p className='patient-mic-video'>{audio ? <GoUnmute size={20} /> :
                <GoMute style={{ color: 'red' }} size={20} />}{"   "}{video ? <FaVideo size={20} /> :
                  <FaVideoSlash style={{ color: 'red' }} size={20} />}</p>
            </Col>
            <Col className='holder' xs={24} sm={24} md={cvsslg} lg={cvsslg} xl={cvsslg} style={{ position: 'relative', display: 'grid' }}>
              {/* <Draggable ref={nodeRef} scale={2}>  */}
              <Draggable disabled={drag} ref={nodeRef} scale={2}>
                <div id="remote" className={`holder-local patient ${changeView}`}><div id="no-physio-view">
                  <p className='no-physio-icon'>{physioJoined ? <FaUserAlt size={NoUserIcon} /> : <FaUserAltSlash size={NoUserIcon} />}</p></div>
                  <p id='physio-mic-video'>{physioAudio ? <GoUnmute size={20} /> :
                    <GoMute style={{ color: 'red' }} size={20} />}{"   "}{physioVideo ? <FaVideo size={20} /> :
                      <FaVideoSlash style={{ color: 'red' }} size={20} />}</p></div>
              </Draggable>
              <div id="screen" style={{ backgroundColor: 'black', display: 'none' }} className='holder-local holder-local-p' ></div>
            </Col>
            <canvas style={{ position: "absolute", height: "100%" }} id="scanvas"></canvas>
            {/* <div style={{height:'480px'}}>
            </div> */}
            <Col className="sticky_button_grp footer" span={24} style={{ justifyContent: 'center', display: 'flex' }}>
              <Space size="small">
                <Tooltip title={`Turn ${audio ? `off` : `on`} Microphone`}>
                  <button
                    id="mic-btn"
                    type="button"
                    className={`btn ${!audio ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                    onClick={audio ? stopAudio : startAudio}
                  >
                    {audio ? <BsMic /> : <BsMicMuteFill />}
                    {/* <i id="v_mic-icon" class="fas fa-microphone"></i> */}
                  </button>
                </Tooltip>
                {/* { isAssessmentStarted?<Tooltip title={`Assessment is running can't perform action `}>
               <button
                  disabled={isAssessmentStarted}
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                >
                  {video?<i id="video-icon" class="fas fa-video"></i>:<i id="video-icon" class="fas fa-video-slash"></i>}
                </button>
                </Tooltip>:<Tooltip title={`Turn ${video ? `off` : `on`} Video`}>
                <button
                  id="video-btn"
                  type="button"
                  className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                  onClick={video ? stopVideo : startVideo}
                >
                  {video?<i id="video-icon" class="fas fa-video"></i>:<i id="video-icon" class="fas fa-video-slash"></i>}
                </button>
                </Tooltip>} */}
                {isAssessmentStarted ? <button
                  id="magic-btn"
                  type="button"
                  disabled={isAssessmentStarted}
                  className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                >
                  <i id="video-icon" class={`fas fa-${video ? `video` : `video-slash`}`}></i>
                </button> :
                  <Tooltip title={isAssessmentStarted ? `Assessment is running can't perform action ` : `Turn ${video ? `off` : `on`} Video`}>
                    <button
                      id="magic-btn"
                      type="button"
                      onClick={video ? stopVideo : startVideo}
                      disabled={isAssessmentStarted}
                      className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                    >
                      {video ? <BsCameraVideoFill size={18} /> : <BsFillCameraVideoOffFill size={18} />}
                      {/* <i id="video-icon" class={`fas fa-${video ? `video` : `video-slash`}`}></i> */}
                    </button>
                    {/* <button
                  id="video-btn"
                  type="button"
                  disabled={isAssessmentStarted}
                  className={`btn ${!video ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                  onClick={video ? stopVideo : startVideo}
                >
                  <i id="video-icon" class={`fas fa-${video?`video`:`video-slash`}`}></i>
                </button> */}
                  </Tooltip>}
                {isAssessmentStarted ? <Tooltip title={`Assessment is running can't share screen `}> <button
                  id="magic-btn"
                  type="button"
                  disabled={isAssessmentStarted}
                  className={`btn ${screenshare ? `end-btn-big` : ``} video_con_bttn btn-block btn-dark btn-lg`}
                >
                  {screenshare ? <FaRegWindowClose size={18} /> : <FaDesktop size={18} />}
                  {/* <i id="magic-icon" class={`fa fa-${screenshare ? 'window-close' : 'desktop'}`} aria-hidden="true"></i> */}
                </button></Tooltip> : <Tooltip title={`Turn ${screenshare ? `off` : `on`} Screen Share`}><button
                  id="magic-btn"
                  type="button"
                  disabled={isAssessmentStarted}
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
                    {/* <i id="exit-icon" class="fas fa-phone-slash"></i> */}
                  </button>
                </Tooltip>
                {/* <button
                  id="exit-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-red btn-lg"
                  onClick={startAI}
                >
                  <i id="exit-icon" class="fas fa-phone-slash"></i>
                </button> */}
                {/*


                <button
                  id="magic-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                 onClick={handleJoin}
                >join
                  <i id="magic-icon" class="fa fa-play" aria-hidden="true"></i>
                </button>


                <button
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

export default PatientVideoCall