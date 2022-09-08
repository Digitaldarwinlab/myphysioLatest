import { Button, Col, Modal, Row, Space } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import './temp.css'
import AgoraRTM from 'agora-rtm-sdk'

import { BsCameraVideoFill, BsFillCameraVideoOffFill, BsMic, BsMicMuteFill } from 'react-icons/bs';
import { BiPhoneOff } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import Draggable from 'react-draggable';

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
  const [drag, setDrag] = useState(false)
  const [RTMChannel, setRTMChannel] = useState('')
  const location = useParams()
  useEffect(() => {
    if (window.screen.width < 650) {
      setDrag(true)
    }
  }, [window.screen])
  let login = async () => {
    await rtmClient.login({ uid: `${Math.floor(Math.random() * 10875)}` })
    await testChannel.join()
    rtmClient.on('ConnectionStateChanged', async (state, reason) => {
      console.log('ConnectionStateChanged', state, reason)
    })
    testChannel.on('ChannelMessage', (msg, uid) => {
      console.log("message received in peer**** ", msg)
      if (msg.text == "AI start") {
        let videoElem = document.getElementById('local').querySelector('video')
        console.log("video elem ", videoElem)
        let canvas = document.getElementById('scanvas')
        let { width, height } = videoElem.getBoundingClientRect()
        //document.getElementById('local').appendChild(canvas)
        canvas.style.width = '100%'
        // canvas.style.height = height
        //  canvas.style = videoElem.style
        const options = {
          video: videoElem,
          videoWidth: width,
          // videoHeight: height,
          canvas: canvas,
          supervised: true,
          showAngles: true,
        };
        console.log(options)
        window.darwin.initializeModel(options);
        window.darwin.launchModel();
        window.darwin.stop();
      }
      if (msg.text == "start") {
        window.darwin.restart();
        window.darwin.setExcersiseParams({
          name: "AROM",
          primaryKeypoint: 0,
          angles: [6, 7],
          dir: 1,
          minAmp: 30,
          primaryAngles: [6, 7],
          ROMs: [
            [30, 160],
            [30, 160],
          ],
          totalReps: 3,
          totalSets: 2,
        });
      }

      // setTexts((previous) => {
      //   return [...previous, { msg, uid }]
      // })
    })
    console.log("rtm client msg received")
    testChannel.on('MemberJoined', (memberId) => {
      console.log('New Member: ', memberId)
    })
    // setLoggedIn(true)
  }

  let logout = async () => {
    await testChannel.leave()
    await rtmClient.logout()
    testChannel.removeAllListeners()
    rtmClient.removeAllListeners()
    setLoggedIn(false)
  }

  const sendMsg = async (text) => {
    RTMChannel.sendMessage({ text, type: 'text' })
  }

  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [client, setClient] = useState(null);
  const [uid, setUid] = useState(Math.floor(Math.random() * 10));
  const [audio, setAudio] = useState(true)
  const [video, setVideo] = useState(true)
  const [joined, setJoined] = useState(false)
  const nodeRef = useRef(null)
  const [screenId, setScreenId] = useState(999);
  const [appId, setAppID] = useState('7aca4bce40d0476fb3aafde5f88e3de9')
  const [channel, setChannel] = useState('demo')
  const [token, setToken] = useState('006616487fe8ede4785aa8f7e322efdbe7dIAD8ig3d9ExWFhwv1mySzHryeSXjpNVvv8CO1p8Udp/pQqDfQtaQ1sJlEAAJmBoBQLkLYwEAAQDQdQpj')
  useEffect(async () => {
    props.Setsidebarshow(false)
    // await login()
    console.log("location ", location)
    const arr = location.channel.split("_")
    setChannel(arr[0])
    setUid(arr[2])
    const connect = async () => {
      await RTMClient.login({ uid: String(arr[2]), token: null })
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
      });

      _client.on('user-unpublished', function (user) {
        console.log(`User unpublished ${user.uid}`);
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
    setRTMChannel(_rtmChannel)
    _rtmChannel.on("ChannelMessage", (msg, peerId) => {
      console.log("message from peer*** ", msg)
      if (msg.text == "AI start") {
        let videoElem = document.getElementById('local').querySelector('video')
        console.log("video elem ", videoElem)
        let canvas = document.getElementById('scanvas')
        let { width, height } = videoElem.getBoundingClientRect()
        console.log("width and height ", width," ",height)
        AiCanvas = canvas
        // document.getElementById('local').innerHTML = canvas
        // canvas.style.width = width
        // canvas.style.height = height
        // canvas.style.position = 'absolute'
        // console.log("width and height ", canvas.style.width ," ",canvas.style.height)
        // canvas.style = videoElem.style
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
        // TempStream.addTrack(tracks[0]);

      }
      if (msg.text == "start") {
        window.darwin.restart();
        window.darwin.setExcersiseParams({
          name: "AROM",
          primaryKeypoint: 0,
          angles: [12, 13],
          dir: 1,
          minAmp: 30,
          primaryAngles: [12, 13],
          ROMs: [
            [30, 160],
            [30, 160],
          ],
          totalReps: 3,
          totalSets: 2,
        });
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
        client.publish(r)
        // setLocalVideoTrack()
      }
    })
  }

  async function handleJoin() {
    console.log('channel ', channel)
    console.log('channel ', uid)
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

      // create a local video track
      const _localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalVideoTrack(_localVideoTrack);
      TempStream = _localVideoTrack
      // publish local audio and video tracks to the RTC channel
      await client.publish([_localAudioTrack, _localVideoTrack]);

      //const localPlayerContainer = document.getElementById('local');

      _localVideoTrack.play('local');
      setModalVisible(false)
      setLoading(false)
      setJoined(true)
      document.getElementById('user_name').innerHTML = uid
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
      <Row gutter={[16, 16]} className="video-call-main-container" justifyContent="center" style={{ margin: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Col span={24} >
          {/* <Col xs={24} sm={24} md={16} lg={16} xl={16}> */}
          <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
            <Col className='holder' xs={24} sm={24} md={12} lg={12} xl={12} style={{ position: 'relative', display: 'grid' }}>
              {/* <Draggable ref={nodeRef} scale={2}>  */}
              <div id="remote" className='holder-local'></div>
              {/* <Draggable disabled={drag} bounds="parent" ref={nodeRef} scale={2}>
                <Col id="local" className='holder-remote1' xs={24} sm={24} md={12} lg={12} xl={12}>
            </Col>
              </Draggable> */}
            </Col>
            <Col id="local" className='holder-remote1' xs={24} sm={24} md={12} lg={12} xl={12}>
            </Col>
            <canvas style={{ position: "absolute" }} id="scanvas"></canvas>
            <Col className="sticky_button_grp footer" span={24} style={{ justifyContent: 'center', display: 'flex' }}>
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
                <button
                  id="exit-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-red btn-lg"
                  onClick={startAI}
                >
                  <i id="exit-icon" class="fas fa-phone-slash"></i>
                </button>
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