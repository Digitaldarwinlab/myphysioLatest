// Params for login
let options = {
  uid: "",
  token: "",
};
//AI Data Received
var Ex_Data
var AI_Data={
  Anterior:"",
  leftLateral:"",
  rightLateral:""
}
var Anterior_Data
var Lateral_Data
var angles = [];
var exercise = "";
var exerciseURL=""
let screenshot = [];


let Posterial_view={
  image:"",
  angles:"",
}

let Lateral_View={
  image:"",
  angles:"",
}



// Your app ID
const appID = "616487fe8ede4785aa8f7e322efdbe7d";
// Your token
options.token = "";

const clientRTM = AgoraRTM.createInstance(appID);


async function capture(){
  window.scrollTo(0, 0)
  const canvas = await html2canvas(document.getElementById("scanvas"))
  screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
  var extra_canvas = document.createElement("canvas");
  extra_canvas.setAttribute('width', 180);
  extra_canvas.setAttribute('height', 180);
  var ctx = extra_canvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
  var dataURL = extra_canvas.toDataURL();
  console.log(screenshot)
  return(dataURL)
}

clientRTM.on("MessageFromPeer", async function (message, peerId) {
  console.log("Message from: " + peerId + " Message: " + message);
  if (message.text == "mute") {
    var localStream = AgoraRTC.createStream({
      streamID: 12345,
      audio: true,
      video: true,
      screen: false,
    });
    toggleBtn($("#mic-btn"));
    $("#mic-icon")
      .toggleClass("fa-microphone")
      .toggleClass("fa-microphone-slash"); // toggle the mic icon
    if ($("#mic-icon").hasClass("fa-microphone")) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
  } else if (message.text == "video") {
    var localStream = AgoraRTC.createStream({
      streamID: 12345,
      audio: true,
      video: true,
      screen: false,
    });
    toggleBtn($("#video-btn")); // toggle button colors
    $("#video-icon").toggleClass("fa-video").toggleClass("fa-video-slash"); // toggle the video icon
    if ($("#video-icon").hasClass("fa-video")) {
      localStream.unmuteVideo(); // enable the local video
      toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
    } else {
      localStream.muteVideo(); // disable the local video
      toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
    }
  } else if (message.text == "start") {
    options = {
      video: cameraElement,
      videoWidth: 600,
      videoHeight: 500,
      canvas: document.getElementById("scanvas"),
      supervised: true,
      showAngles: true,
      drawLine: false,
    };
    darwin.initializeModel(options);
    darwin.setExcersiseParams({
      // "name": exercise,
      "name": exercise,
      "primaryKeypoint": 0,
      // "angles": angles,
      "angles": angles,
      "minAmp": 30,
      "dir": 1,
      "primaryAngles": [3, 2],
      "ROMs": [[30, 160], [30, 160]],
      "totalReps": 3,
      "totalSets": 2
  });
    darwin.restart();
    // $("#video-screen").attr(`src",${process.env.REACT_APP_API}/+exerciseURL`)
    // $("#video-block").css("display","block")
  }

  else if (message.text == "startPosture1") {
    options = {
      video: cameraElement,
      videoWidth: 600,
      videoHeight: 500,
      canvas: document.getElementById("scanvas"),
      supervised: true,
      showAngles: true,
      drawLine: true,
    };
    darwin.initializeModel(options);
    darwin.restart()
    darwin.selectOrientation(1);
  }

  else if (message.text == "startPosture2") {
    options = {
      video: cameraElement,
      videoWidth: 600,
      videoHeight: 500,
      canvas: document.getElementById("scanvas"),
      supervised: true,
      showAngles: true,
      drawLine: true,
    };
    darwin.initializeModel(options);
    darwin.restart()
    darwin.selectOrientation(2);
  }

  else if (message.text == "stopPosture1") {
    var peerID = $("#form-peerId").val();
    darwin.screenShot();
    const imgPosture=await capture()
    Posterial_view.image=imgPosture
    var anglesPosture = await darwin.showAngles()
    Posterial_view.angles=anglesPosture
    darwin.stop()
    console.log(Posterial_view)
    var blob = new Blob([JSON.stringify(Posterial_view)], {type: "application/json"});
    sendFileMessage("Anterior.json",peerID,blob)
  }

  else if (message.text == "stopPosture2") {
    var peerID = $("#form-peerId").val();
    darwin.screenShot();
    const imgPosture=await capture()
    Lateral_View.image=imgPosture
    var anglesPosture = await darwin.showAngles()
    Lateral_View.angles=anglesPosture
    darwin.stop()
    console.log(Lateral_View)
    var blob = new Blob([JSON.stringify(Lateral_View)], {type: "application/json"});
    sendFileMessage("Lateral.json",peerID,blob)
  }
  
  else if (message.text == "stop") {
    darwin.stop();
    $("#video-block").css("display","none")
  }
  
  else if (message.text == "reset") {
    darwin.stop();
    darwin.resetData();
    $("#video-block").css("display","none")
  }

  else if (message.text == "getAnterior") {
    var peerID = $("#form-peerId").val();
    var data=darwin.getAssesmentData();
    AI_Data.Anterior=data
  }

  else if (message.text == "getLeftLateral") {
    var peerID = $("#form-peerId").val();
    var data=darwin.getAssesmentData();
    AI_Data.leftLateral=data
  }

  else if (message.text == "getRightLateral") {
    var peerID = $("#form-peerId").val();
    var data=darwin.getAssesmentData();
    AI_Data.rightLateral=data
  }

  else if (message.text == "getROMData"){
    var peerID = $("#form-peerId").val();
    var blob = new Blob([JSON.stringify(AI_Data)], {type: "application/json"});
    sendFileMessage("AI_Data.json",peerID,blob)
  }

  else if(message.fileName === 'ChangedAngle.json'){
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      var checkedValues = JSON.parse(e.srcElement.result)
      console.log(checkedValues)
      darwin.setExcersiseParams({
        angles: checkedValues,
      });
     });
      reader.readAsText(blob)
  }

  else if(message.fileName === 'Anterior.json'){
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      Anterior_Data = JSON.parse(e.srcElement.result)
     });
      reader.readAsText(blob)
  }

  else if(message.fileName === 'Lateral.json'){
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      Lateral_Data = JSON.parse(e.srcElement.result)
     });
      reader.readAsText(blob)
  }

  else if (message.fileName === 'AI_Data.json') {
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      AI_Data = JSON.parse(e.srcElement.result)
      console.log("Ai data from patient:",AI_Data)
      console.log("Stringified patient data:", JSON.stringify(AI_Data))
      if(AI_Data!=""){
        console.log("AI data from patient side to physio:" , {AI_Data})   
        localStorage.setItem("AI_Data",JSON.stringify(AI_Data));  
        alert("Data Successfully Received!")
      }
      else{
      alert("Data Not Received")
      }
     });
      reader.readAsText(blob)
  }

  else if (message.fileName === 'Ex_data.json') {
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      Ex_Data = JSON.parse(e.srcElement.result)
      exercise=Ex_Data.allExcercise
      exerciseURL=Ex_Data.exerciseURL
      angles=Ex_Data.Joints
     });
      reader.readAsText(blob)
  }

});


// Display connection state changes
clientRTM.on("ConnectionStateChanged", function (state, reason) {
  console.log("State changed To: " + state + " Reason: " + reason);
});

let channel = clientRTM.createChannel("testing");

channel.on("ChannelMessage", function (message, memberId) {
  console.log("Message received from: " + memberId + " Message: " + message);
});
// Display channel member stats
channel.on("MemberJoined", function (memberId) {
  console.log(memberId + " joined the channel");
});
// Display channel member stats
channel.on("MemberLeft", function (memberId) {
  console.log(memberId + " left the channel");
});

async function joinRTMChannel(uid) {
  console.log("sdghaaaaaaaaaaaaaaaaaaaaaa");
  const apiURL = document.querySelector('[property="Ex:url"]').content;
  console.log(apiURL)
  const res = await fetch(`${apiURL}/rtm/${uid}`);
  const data = await res.json();
  options.token = data.rtmToken;
  console.log(options.token);
  options.uid = uid.toString();
  await clientRTM.login(options);
  console.log("affffffhgs");
  console.log("Client LOG IN with this ID");
  await channel.join().then(() => {
    console.log("You have successfully joined channel " + channel.channelId);
  });
}

async function sendMessage(peerMessage, peerId) {
  await clientRTM
    .sendMessageToPeer({ text: peerMessage }, peerId)
    .then((sendResult) => {
      console.log(sendResult);
      if (sendResult.hasPeerReceived) {
        console.log(
          `Message has been received by: ${peerId} and Message is ${peerMessage}`
        );
      } else {
        console.log(`Message not Sent`);
      }
    });  
}

async function sendFileMessage(file_name, peerId, blob) {
  const mediaMessage = await clientRTM.createMediaMessageByUploading(blob, {
    messageType: 'FILE',
    fileName: file_name,
    description: 'send file'
    })
  clientRTM.sendMessageToPeer(mediaMessage, peerId)
}
