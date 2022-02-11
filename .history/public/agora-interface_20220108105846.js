let userVideoStream;
let globalStream;

var aiModelAppear = false;

// create client instances for camera (client) and screen share (screenClient)
var client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'}); 
var screenClient;

// Stream canvas init (offscreen , will be used to multiplex the streams)
let streamCanvas = ""
let streamCanvasType = ""

let cameraElement = document.createElement("video");
cameraElement.style =
  "opacity:0;position:fixed;z-index:-1;left:-100000;top:-100000;";
document.body.appendChild(cameraElement);

const userCameraHeight = 500;
const userCameraWidth = 600;

// video profile settings
var cameraVideoProfile = '480p_4'; // 640 × 480 @ 30fps  & 750kbs
var screenVideoProfile = '480p_2'; // 640 × 480 @ 30fps

// stream references (keep track of active streams) 
var remoteStreams = {}; // remote streams obj struct [id : stream] 

var localStreams = {
  camera: {
    id: "",
    stream: {}
  },
  screen: {
    id: "",
    stream: {}
  }
};

AgoraRTC.Logger.enableLogUpload(); // auto upload logs

var mainStreamId; // reference to main stream
var screenShareActive = false; // flag for screen share 

function ClientAndJoinChannel(agoraAppId, token, channelName, uid,Canvas) {
  // init Agora SDK
  streamCanvas=Canvas;
  streamCanvasType=streamCanvas.getContext("2d");
  client.init(agoraAppId, function () {
    console.log("AgoraRTC client initialized");
    joinChannel(channelName, uid, token); // join channel upon successfull init
  }, function (err) {
    console.log("[ERROR] : AgoraRTC client init failed", err);
  });
}


client.on('stream-published', function (evt) {
  console.log("Publish local stream successfully");
});

// connect remote streams
client.on('stream-added', function (evt) {
  var stream = evt.stream;
  var streamId = String(stream.getId());
  console.log("new stream added: " + streamId);
  // Check if the stream is local
  if (streamId != localStreams.screen.id) {
    console.log('subscribe to remote stream:' + streamId);
    // Subscribe to the stream.
    client.subscribe(stream, function (err) {
      console.log("[ERROR] : subscribe stream failed", err);
    });
  }
});

client.on('stream-subscribed', function (evt) {
  var remoteStream = evt.stream;
  var remoteId = String(remoteStream.getId());
  remoteStreams[remoteId] = remoteStream;
  console.log("Subscribe remote stream successfully: " + remoteId);
  if( $('#full-screen-video').is(':empty') ) { 
    mainStreamId = remoteId;
    remoteStream.play('full-screen-video');
    $('#main-stats-btn').show();
    $('#main-stream-stats-btn').show();
  } else if (remoteId == 49024) {
    // move the current main stream to miniview
    remoteStreams[mainStreamId].stop(); // stop the main video stream playback
    client.setRemoteVideoStreamType(remoteStreams[mainStreamId], 1); // subscribe to the low stream
    addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
    // set the screen-share as the main 
    mainStreamId = remoteId;
    remoteStream.play("full-screen-video");
  } else {
    client.setRemoteVideoStreamType(remoteStream, 1); // subscribe to the low stream
    addRemoteStreamMiniView(remoteStream);
  }
});

// remove the remote-container when a user leaves the channel
client.on("peer-leave", function(evt) {
  var streamId = evt.stream.getId(); // the the stream id
  if(remoteStreams[streamId] != undefined) {
    remoteStreams[streamId].stop(); // stop playing the feed
    delete remoteStreams[streamId]; // remove stream from list
    if (streamId == mainStreamId) {
      var streamIds = Object.keys(remoteStreams);
      var randomId = streamIds[Math.floor(Math.random()*streamIds.length)]; // select from the remaining streams
      remoteStreams[randomId].stop(); // stop the stream's existing playback
      var remoteContainerID = '#' + randomId + '_container';
      $(remoteContainerID).empty().remove(); // remove the stream's miniView container
      remoteStreams[randomId].play('full-screen-video'); // play the random stream as the main stream
      mainStreamId = randomId; // set the new main remote stream
    } else {
      var remoteContainerID = '#' + streamId + '_container';
      $(remoteContainerID).empty().remove(); // 
    }
  }
});

// show mute icon whenever a remote has muted their mic
client.on("mute-audio", function (evt) {
  toggleVisibility('#' + evt.uid + '_mute', true);
});

client.on("unmute-audio", function (evt) {
  toggleVisibility('#' + evt.uid + '_mute', false);
});

// show user icon whenever a remote has disabled their video
client.on("mute-video", function (evt) {
  var remoteId = evt.uid;
  // if the main user stops their video select a random user from the list
  if (remoteId != mainStreamId) {
    // if not the main vidiel then show the user icon
    toggleVisibility('#' + remoteId + '_no-video', true);
  }
});

client.on("unmute-video", function (evt) {
  toggleVisibility('#' + evt.uid + '_no-video', false);
});

// join a channel
function joinChannel(channelName, uid, token) {
  client.join(
    token,
    channelName,
    uid,
    function (uid) {
      console.log("User " + uid + " join channel successfully");
      console.log(aiModelAppear);
      aiModelAppear ? createCameraStream(uid) : customcreateCameraStream(uid);
      localStreams.camera.id = uid; // keep track of the stream uid
    },
    function (err) {
      console.log("[ERROR] : join channel failed", err);
    }
  );
}

const getAllVideoInputs = async () => {
  try{
    const devices = await navigator.mediaDevices.enumerateDevices()
    // Device options will store info about all video devices detected
    const deviceOptions = devices.map( device => {
      if( device.kind === "videoinput" ){
        return {
          deviceID : device.deviceId,
          label : device.label
        }
      }
    })
    
    return deviceOptions
  }catch( err ) {
    console.log("Video devices detection error : ", err)
    return []
  }
  
  // // NOTE : Probably here get all media of user
  // navigator.mediaDevices.enumerateDevices()
  // .then( devices => {
  //   devices.forEach( device => {
  //     if(device.kind === "videoinput"){
  //       const newDevice = {
  //         deviceId : device.deviceId,
  //         label : device.label
  //       }
  //       deviceOptions.push(newDevice)
  //     }
  //   })
  // })
}





// Helper functions to initialize user web streams
function getUserVideo() {

  // deviceOptions will store all detected video inputs and store there deviceID and label 
  const allVideoDevices = await getAllVideoInputs()
  //now need to figure out which one is external camera
  //then ca
  
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
}

async function getVideo() {
  return new Promise((resolve) => {
    cameraElement.onloadedmetadata = () => {
      resolve(cameraElement);
    };
  });
}

async function streamMultiplexer() {
  userVideoStream = await getUserVideo();
  cameraElement.srcObject = userVideoStream;
  console.log(userVideoStream);
  options = {
    video: cameraElement,
    videoWidth: 600,
    videoHeight: 500,
    canvas: document.getElementById("scanvas"),
    supervised: true,
    showAngles: true,
  };
  
  darwin.setExcersiseParams({
    "name": "Squat",
    "primaryKeypoint": 0,
    "angles": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    "dir": 1,
    "minAmp": 30,
    "primaryAngles": [3, 2],
    "ROMs": [[30, 160], [30, 160]],
    "totalReps": 3,
    "totalSets": 2
});
  darwin.initializeModel(options);
  await darwin.launchModel();
  setTimeout(() => {
    darwin.stop();
  }, 1000); 
  // const video = await getVideo();
  // video.play();
  //videoFrameRate = userVideoStream.getVideoTracks()[0].getSettings().frameRate;
  //drawInterval = 1000 / videoFrameRate;
  // document.body.appendChild(streamCanvas);
  // streamCanvas.height = 500;
  // streamCanvas.width = 600;

  // Get video stream from canvas
  mergedStream = streamCanvas.captureStream(60);

  tracks = mergedStream.getVideoTracks();

  // Add tracks to global stream
  globalStream.addTrack(tracks[0]);
}

function customcreateCameraStream(uid) {
  var localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: false,
    screen: false,
  });
  globalStream = localStream;
  localStream.setVideoProfile(cameraVideoProfile);
  localStream.init(
    function () {
      console.log("getUserMedia successfully");
      localStream.play("local-video");
      client.publish(localStream, function (err) {
        console.log("[ERROR] : publish local stream error: " + err);
      });
      console.log(localStream);
      enableUiControls(localStream, aiModelAppear);
      localStreams.camera.stream = localStream;
      // for custom video
      streamMultiplexer();
    },
    function (err) {
      console.log("[ERROR] : getUserMedia failed", err);
    }
  );
}


// video streams for channel
function createCameraStream(uid) {
  var localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: true,
    screen: false,
  });
  globalStream = localStream;
  localStream.setVideoProfile(cameraVideoProfile);
  localStream.init(function() {
    console.log("getUserMedia successfully");
    // TODO: add check for other streams. play local stream full size if alone in channel
    localStream.play("local-video"); // play the given stream within the local-video div

    // publish local stream
    client.publish(localStream, function (err) {
      console.log("[ERROR] : publish local stream error: " + err);
    });    
    enableUiControls(localStream); // move after testing
    localStreams.camera.stream = localStream; // keep track of the camera stream for later

    // for custom video
    // aiModelAppear ? "" : streamMultiplexer();
  }, function (err) {
    console.log("[ERROR] : getUserMedia failed", err);
  });
}

// SCREEN SHARING
function initScreenShare(agoraAppId, channelName, uid) {
  screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  console.log("AgoraRTC screenClient initialized");
  screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  screenClient.init(
    agoraAppId,
    function () {
      console.log("AgoraRTC screenClient initialized");
    },
    function (err) {
      console.log("[ERROR] : AgoraRTC screenClient init failed", err);
    }
  );
  // keep track of the uid of the screen stream.
  localStreams.screen.id = uid;

  // Create the stream for screen sharing.
  var screenStream = AgoraRTC.createStream({
    streamID: uid,
    audio: false, // Set the audio attribute as false to avoid any echo during the call.
    video: false,
    screen: true, // screen stream
    screenAudio: true,
    mediaSource: "screen", // Firefox: 'screen', 'application', 'window' (select one)
  });
  // initialize the stream
  // -- NOTE: this must happen directly from user interaction, if called by a promise or callback it will fail.
  screenStream.init(
    function () {
      console.log("getScreen successful");
      localStreams.screen.stream = screenStream; // keep track of the screen stream
      screenShareActive = true;
      $("#screen-share-btn").prop("disabled", false); // enable button
      screenClient.join(
        token,
        channelName,
        uid,
        function (uid) {
          screenClient.publish(screenStream, function (err) {
            console.log("[ERROR] : publish screen stream error: " + err);
          });
        },
        function (err) {
          console.log("[ERROR] : join channel as screen-share failed", err);
        }
      );
    },
    function (err) {
      console.log("[ERROR] : getScreen failed", err);
      localStreams.screen.id = ""; // reset screen stream id
      localStreams.screen.stream = {}; // reset the screen stream
      screenShareActive = false; // resest screenShare
      toggleScreenShareBtn(); // toggle the button icon back
      $("#screen-share-btn").prop("disabled", false); // enable button
    }
  );
  var token =
    "006f31ea0f88fcf4974a349448e69d35c1dIABIoMFtxkwDVWki55f3W0x1MgsLyFbedV7NXhVc1d5DKwZa8+gAAAAAEACe0CRJDMsTYQEAAQALyxNh";
  screenClient.on("stream-published", function (evt) {
    console.log("Publish screen stream successfully");
    if ($("#full-screen-video").is(":empty")) {
      $("#main-stats-btn").show();
      $("#main-stream-stats-btn").show();
    } else {
      // move the current main stream to miniview
      remoteStreams[mainStreamId].stop(); // stop the main video stream playback
      client.setRemoteVideoStreamType(remoteStreams[mainStreamId], 1); // subscribe to the low stream
      addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
    }
    mainStreamId = localStreams.screen.id;
    localStreams.screen.stream.play("full-screen-video");
  });

  screenClient.on("stopScreenSharing", function (evt) {
    console.log("screen sharing stopped", err);
  });
}

function stopScreenShare() {
  localStreams.screen.stream.disableVideo(); // disable the local video stream (will send a mute signal)
  localStreams.screen.stream.stop(); // stop playing the local stream
  localStreams.camera.stream.enableVideo(); // enable the camera feed
  localStreams.camera.stream.play('local-video'); // play the camera within the full-screen-video div
  $("#video-btn").prop("disabled",false);
  screenClient.leave(function() {
    screenShareActive = false; 
    console.log("screen client leaves channel");
    $("#screen-share-btn").prop("disabled",false); // enable button
    screenClient.unpublish(localStreams.screen.stream); // unpublish the screen client
    localStreams.screen.stream.close(); // close the screen client stream
    localStreams.screen.id = ""; // reset the screen id
    localStreams.screen.stream = {}; // reset the stream obj
  }, function(err) {
    console.log("client leave failed ", err); //error handling
  }); 
}

// REMOTE STREAMS UI
function addRemoteStreamMiniView(remoteStream){
  var streamId = remoteStream.getId();
  // append the remote stream template to #remote-streams
  $('#remote-streams').append(
    $('<div/>', {'id': streamId + '_container',  'class': 'remote-stream-container col'}).append(
      $('<div/>', {'id': streamId + '_mute', 'class': 'mute-overlay'}).append(
          $('<i/>', {'class': 'fas fa-microphone-slash'})
      ),
      $('<div/>', {'id': streamId + '_no-video', 'class': 'no-video-overlay text-center'}).append(
        $('<i/>', {'class': 'fas fa-user'})
      ),
      $('<div/>', {'id': 'agora_remote_' + streamId, 'class': 'remote-video'})
    )
  );
  remoteStream.play('agora_remote_' + streamId); 

  var containerId = '#' + streamId + '_container';
  $(containerId).dblclick(function() {
    // play selected container as full screen - swap out current full screen stream
    remoteStreams[mainStreamId].stop(); // stop the main video stream playback
    addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
    $(containerId).empty().remove(); // remove the stream's miniView container
    remoteStreams[streamId].stop() // stop the container's video stream playback
    remoteStreams[streamId].play('full-screen-video'); // play the remote stream as the full screen video
    mainStreamId = streamId; // set the container stream id as the new main stream id
  });
}

function leaveChannel() {
  
  if(screenShareActive) {
    stopScreenShare();
  }

  client.leave(function() {
    console.log("client leaves channel");
    localStreams.camera.stream.stop() // stop the camera stream playback
    client.unpublish(localStreams.camera.stream); // unpublish the camera stream
    localStreams.camera.stream.close(); // clean up and close the camera stream
    $("#remote-streams").empty() // clean up the remote feeds
    //disable the UI elements
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);
    // hide the mute/no-video overlays
    toggleVisibility("#mute-overlay", false); 
    toggleVisibility("#no-local-video", false);
  }, function(err) {
    console.log("client leave failed ", err); //error handling
  });
}

// use tokens for added security
function generateToken() {
  return null; // TODO: add a token generation
}