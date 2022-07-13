// UI buttons
function enableUiControls(localStream) {
  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#screen-share-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);
  $("#magic-btn").prop("disabled", false);
  $("#stop-btn").prop("disabled", false);


  $("#mic-btn").click(function () {
    toggleMic(localStream);
  });

  $("#video-btn").click(function () {
    toggleVideo(localStream);
  });

  $("#screen-share-btn").click(function () {
    toggleScreenShareBtn(); // set screen share button icon
    
    $("#screen-share-btn").prop("disabled", true); // disable the button on click
    if (screenShareActive) {
      stopScreenShare();
    } else {
      var agoraAppId = "616487fe8ede4785aa8f7e322efdbe7d"
      var channelName = $("#form-channel").val();
      var uid = $("#form-uid").val();
      console.log("init screen share");
      initScreenShare(agoraAppId, channelName, uid);
      $('#remote-streams').css({'display':'none'})
    }
  });

  // $("#data-btn").click(function () {
  //   var peerID = $("#form-peerId").val();
  //   var data=darwin.getAssesmentData();
  //   console.log(data)
  //   var blob = new Blob([JSON.stringify(data)], {type: "application/json"});
  //   sendFileMessage("AI_Data.json",peerID,blob)
  // });


  // keyboard listeners
  $(document).keypress(function (e) {
    switch (e.key) {
      case "1":
        console.log("squick toggle the mic");
        toggleMic(localStream);
        break;
      case "2":
        console.log("quick toggle the video");
        toggleVideo(localStream);
        break;
      case "3":
        console.log("initializing screen share");
        toggleScreenShareBtn(); // set screen share button icon
        $("#screen-share-btn").prop("disabled", true); // disable the button on click
        if (screenShareActive) {
          stopScreenShare();
        } else {
          initScreenShare();
        }
        break;
      case "4":
        console.log("so sad to see you quit the channel");
        leaveChannel();
        break;
      default: // do nothing
    }

    // (for testing)
    if (e.key === "refresh") {
      window.history.back(); // quick reset
    }
  });
}

function toggleBtn(btn){
  btn.toggleClass('btn-dark').toggleClass('btn-red');
}

function toggleScreenShareBtn() {
  $('#screen-share-btn').toggleClass('btn-danger');
  $('#screen-share-icon').toggleClass('fa-share-square').toggleClass('fa-times-circle');
}

function toggleVisibility(elementID, visible) {
  if (visible) {
    $(elementID).attr("style", "display:block");
  } else {
    $(elementID).attr("style", "display:none");
  }
}

function toggleMic(localStream) {
  //toggleBtn($("#mic-btn")); // toggle button colors
  // toggle the mic icon
  if ($("#mic-btn").hasClass('btn-red')) {
    console.log("mic button clicked if ")
    localStream.unmuteAudio(); // enable the local mic
    $("#mic-btn").toggleClass('btn-red').toggleClass('btn-dark')
    $("#v_mic-icon").toggleClass('fa-microphone-slash').toggleClass('fa-microphone')
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  } else {
    console.log("mic button clicked else ")
    localStream.muteAudio(); // mute the local mic
    $("#mic-btn").toggleClass('btn-dark').toggleClass('btn-red');
    $("#v_mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); 
    toggleVisibility("#mute-overlay", true); // show the muted mic icon
  }
}

function toggleVideo(localStream) {
  toggleBtn($("#video-btn")); // toggle button colors
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
  if ($("#video-icon").hasClass('fa-video')) {
    localStream.unmuteVideo(); // enable the local video
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  } else {
    localStream.muteVideo(); // disable the local video
    toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
  }
}
