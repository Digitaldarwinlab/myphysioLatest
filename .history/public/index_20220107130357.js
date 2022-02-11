// Params for login
let options = {
  uid: "",
  token: "",
};
//AI Data Received
var Ex_Data
var AI_Data
var angles = [];
var exercise = "";
var exerciseURL=""

// Your app ID
const appID = "f31ea0f88fcf4974a349448e69d35c1d";
// Your token
options.token = "";

const clientRTM = AgoraRTM.createInstance(appID);

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
    darwin.setExcersiseParams({
      "name": exercise,
      "primaryKeypoint": 0,
      "angles": angles,
      "minAmp": 30,
      "dir": 1,
      "primaryAngles": [3, 2],
      "ROMs": [[30, 160], [30, 160]],
      "totalReps": 3,
      "totalSets": 2
  });
    darwin.restart();
    $("#video-screen").attr("src",'https://myphysio.digitaldarwin.in/'+exerciseURL)
    $("#video-block").css("display","block")
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

  else if (message.text == "get") {
    var peerID = $("#form-peerId").val();
    var data=darwin.getAssesmentData();
    console.log(data)
    var blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    sendFileMessage("AI_Data.json",peerID,blob)
  }

  else if (message.fileName === 'AI_Data.json') {
    const blob = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      AI_Data = JSON.parse(e.srcElement.result)
      console.log("Ai data from patient:",AI_Data)
      console.log("Stringified patient data:", JSON)
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
    const blob_ex = await clientRTM.downloadMedia(message.mediaId)
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      Ex_Data = JSON.parse(e.srcElement.result)
      exercise=Ex_Data.allExcercise
      exerciseURL=Ex_Data.exerciseURL
      angles=Ex_Data.Joints.sort()
     });
      reader.readAsText(blob_ex)
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
  const res = await fetch(`https://myphysio.digitaldarwin.in/rtm/${uid}`);
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
