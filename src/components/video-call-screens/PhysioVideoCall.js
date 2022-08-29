import { Col, Row, Space } from 'antd';
import React, { useEffect, useState ,useRef } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import './temp.css'
import Draggable from 'react-draggable';
// props.Setsidebarshow(false)
const options = {
  appId: '17c1247f37f643beb8977d90572b283e',
  channel: 'test',
  token:
    '00617c1247f37f643beb8977d90572b283eIADpqs/npdMNdy8f//tf2nchNLvy9fAl1d6ErujTdvcxqAx+f9gAAAAAEACpCW2Ywm6iYQEAAQDBbqJh',
};

const PhysioVideoCall = (props) => {
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [client, setClient] = useState(null);
  const [uid, setUid] = useState(Math.floor(Math.random()*10));
  const nodeRef = useRef(null)
  const [screenId, setScreenId] = useState(999);
  const [appId, setAppID] = useState('616487fe8ede4785aa8f7e322efdbe7d')
  const [channel ,setChannel] = useState('demo')
  const [token ,setToken] = useState('006616487fe8ede4785aa8f7e322efdbe7dIACXlFkKlBl2babpuoJ9mX1iNNW5edDwpoQFUZxwRSG/CaDfQtbSY0iIEAC5hioDqbMLYwEAAQA5cApj')
  useEffect(() => {
    props.Setsidebarshow(false)
    const _client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    setClient(_client);
    console.log('client================', _client);
    if (_client) {
      // listen for user published event, from where you can get an AgoraRTCRemoteUser object.
      _client.on('user-published', async function (user, mediaType) {
        if (user.uid !== screenId) {
          // subscribe to the remote user
          await _client.subscribe(user, mediaType);
          console.log('subscribe successfull!');

          if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            //const remotePlayerContainer = document.getElementById('remote');
            remoteVideoTrack.play('remote');
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

  async function handleJoin() {
    try {
      console.log('client', client);
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
      console.log('publish success!!');
    } catch (e) {
      console.log('error ============', e);
    }
  }

  async function handleLeave() {
    localAudioTrack.close();
    localVideoTrack.close();

    await client.leave();
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
  return (
    <React.Fragment>
      <Row gutter={[16, 16]} className="video-call-main-container" style={{ margin: '20px', marginTop: '20px', marginBottom: '20px' }}>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row gutter={[16, 16]} style={{ justifyContent: 'center' }}>
            <Col className='holder' style={{position:'relative',display:'flex'}}>
              <div id="local" className='holder-local' ></div>
              <Draggable ref={nodeRef} scale={2}> 
              <div ref={nodeRef} id="remote" className='holder-remote' ></div>
              </Draggable> 
            </Col>
            <Col className="sticky_button_grp " span={24} style={{ justifyContent: 'center', display: 'flex' }}>
              <Space size="small">

                <button
                  id="mic-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                >
                  <i id="v_mic-icon" class="fas fa-microphone"></i>
                </button>


                <button
                  id="video-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                >
                  <i id="video-icon" class="fas fa-video"></i>
                </button>


                <button
                  type="button"
                  id="screen-share-btn"
                  className="btn video_con_bttn btn-block btn-dark btn-lg"
                >
                  <i id="screen-share-icon" class="fas fa-desktop"></i>
                </button>


                <button
                  id="exit-btn"
                  type="button"
                  className="btn video_con_bttn btn-block btn-red btn-lg"
                  onClick={handleLeave}
                >
                  <i id="exit-icon" class="fas fa-phone-slash"></i>
                </button>


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
                </button>

              </Space>
            </Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default PhysioVideoCall