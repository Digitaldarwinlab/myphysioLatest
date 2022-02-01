import { Button, Col, Input, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import bodyImage from "../.././assets/lateral.jpg";
import side_img from "../.././assets/sideways-vector.jpg";
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import Tabs from "./Tabs";
let screenshot = [];
let frontChecks = {};
let sideChecks = {};
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
class PoseTestClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url1: bodyImage,
      url2: side_img,
      frontAngles: [0, 0, 0, 0, 0],
      sideAngles: [0, 0, 0, 0],
      notes: "",
    };
  }
  GoBack = () => {
    darwin.stop();
    const video = document.getElementById("video");

    const mediaStream = video.srcObject;
    try {
      const tracks = mediaStream.getTracks();
      tracks[0].stop();
      tracks.forEach((track) => track.stop());

      console.log("cameraa");
      console.log(tracks);
    } catch (err) {
      console.log(err);
    }
    this.props.history.push("/assessment/1")
  };
  setUrl1 = (value) => {
    console.log("data url is ", value);
    // this.setState({ url1: value });
  };
  setUrl2 = (value) => {
    this.setState({ url2: value });
  };
  setFrontAngles = (value) => {
    this.setState({ frontAngles: value });
  };
  setSideAngles = (value) => {
    this.setState({ sideAngles: value });
  };
  captureFront = async () => {
    window.scrollTo(0, 0);
    const out = document.getElementById("scr_out1");
    const canvas = await html2canvas(document.getElementById("output"));
    //html2canvas(document.getElementById("output")).then(function (canvas) {
    screenshot.push(canvas.toDataURL("image/jpeg", 0.9));
    var extra_canvas = document.createElement("canvas");
    extra_canvas.setAttribute("width", 180);
    extra_canvas.setAttribute("height", 180);
    var ctx = extra_canvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
    var dataURL = extra_canvas.toDataURL();
    var img = document.createElement("img");
    //  document.getElementById("scr_out1").src='../.././assets/logo512.png'
    //setUrl1(dataURL)
    this.setState({ url1: dataURL });
    img.src = dataURL;
    out.appendChild(img);
    // setCheckF(true);
    //});
    //this.props.FirstAssesment("AI_screenshot", screenshot)
    console.log(screenshot);
  };
  captureSide = async () => {
    window.scrollTo(0, 0);
    const out = document.getElementById("scr_out2");
    const canvas = await html2canvas(document.getElementById("output"));
    // html2canvas(document.getElementById("output")).then(function (canvas) {
    screenshot.push(canvas.toDataURL("image/jpeg", 0.9));
    var extra_canvas = document.createElement("canvas");
    extra_canvas.setAttribute("width", 180);
    extra_canvas.setAttribute("height", 180);
    var ctx = extra_canvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
    var dataURL = extra_canvas.toDataURL();
    var img = document.createElement("img");
    //document.getElementById("scr_out2").src=dataURL
    this.setState({ url2: dataURL });
    //   setUrl2(dataURL);
    img.src = dataURL;
    out.appendChild(img);
    // setCheckS(true);
    //});
    //this.props.FirstAssesment("AI_screenshot", screenshot)
    console.log(screenshot);
  };

  onChangeFront = (value) => {
    console.log("front ", value);
    this.props.FirstAssesment("FrontCheck", value);
    front.map((a) => {
      if (value.includes(a)) {
        frontChecks[a] = 1;
      } else {
        frontChecks[a] = 0;
      }
    });
    this.props.FirstAssesment("frontChecks", frontChecks);
  };
  onChangeSide = (value) => {
    console.log("side ", value);
    this.props.FirstAssesment("SideCheck", value);
    side.map((a) => {
      if (value.includes(a)) {
        sideChecks[a] = 1;
      } else {
        sideChecks[a] = 0;
      }
    });
    this.props.FirstAssesment("sideChecks", sideChecks);
  };
  releaseCamera = () =>{
    const video = document.getElementById('video');


    const mediaStream = video.srcObject;
    try {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())

        console.log('camera releasing....')
        console.log(tracks)
    }
    catch (err) {
        console.log('camera not releasing....')
        console.log(err)
    }
  }
  handleSubmit = () => {
    this.releaseCamera()
    console.log('posture submitting...')
    sessionStorage.setItem("posesubmit", true);
    let posture = {
      posture_test_date: new Date().toLocaleDateString("en-GB"),
      Posterial_view: {
        posterial_view_image: this.state.url1,
        Angles: this.state.frontAngles,
        checkBox: this.props.FirstAssesment.frontChecks,
      },
      lateral_view: {
        posterial_view_image: this.state.url2,
        Angles: this.sideAngles,
        checkBox: this.props.FirstAssesment.sideChecks,
      },
      Notes: this.state.notes,
    };
    if (window.confirm("Posture data will be saved")) {
        this.props.FirstAssesment("posture", posture);
        this.props.history.push("/assessment/1")
    }
    console.log("posture ", posture);
  };
  setModelCanvas = () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("output");
    const jcanvas = document.getElementById("jcanvas");
    const myVideo = document.getElementById("Ai_vid");
    let { width, height } = myVideo.getBoundingClientRect();
    // video.width = width;
    const options = {
      video,
      videoWidth: 640,
      videoHeight: 480,
      canvas,
      //  supervised: false,
      showAngles: false,
      drawLine: true,
      ROMPanel: {
        canvas: jcanvas,
        width: 150,
        height: 150,
        radius: 70,
      },
    };
    window.darwin.initializeModel(options);
    // startModel();
  };
  componentDidMount() {
    console.log("props ", this.props);
    this.setModelCanvas();
   
    // window.darwin.stop();
    // window.darwin.restart();
    window.darwin.launchModel();
    const unblock =  this.props.history.block((location, action) => {
      if (sessionStorage.getItem('posesubmit')) {
        sessionStorage.removeItem('posesubmit')
        return;
      }
      if (window.confirm("Posture test data will be lost. Is it okay?")) {
       console.log("poseture data cleared")
        return true;
      } else {
        console.log("posture data not cleared");
        return false;
      }
    });
    unblock();
  }
  componentDidUpdate() {
    window.darwin.launchModel();
    const unblock =  this.props.history.block((location, action) => {
      if (sessionStorage.getItem('posesubmit')) {
        sessionStorage.removeItem('posesubmit')
        return;
      }
      if (window.confirm("Posture test data will be lost. Is it okay?")) {
       console.log("poseture data cleared")
        return true;
      } else {
        console.log("posture data not cleared");
        return false;
      }
    });
    unblock();
  }
  render() {
    return (
      <div className="px-2 py-2">
        <Row>
          <Col
            md={16}
            lg={16}
            sm={16}
            xs={16}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {" "}
            <h3 className="fw-bold">
              <i
                className="fas fa-arrow-left"
                style={{ cursor: "pointer" }}
                title="Go Back"
                onClick={this.GoBack}
                role="button"
              ></i>{" "}
              <span className="CarePlanTitle ml-1"> Postural Analysis</span>
            </h3>
            <p style={{ paddingTop: "4px" }}>
              {" "}
              <b>Patient Name</b> :{" "}
              {this.props.episodeReducer.patient_name
                ? this.props.episodeReducer.patient_name
                : "not selected"}
            </p>
            <p style={{ paddingTop: "4px" }}>
              {" "}
              <b>Patient Code</b> :{" "}
              {this.props.episodeReducer.patient_code
                ? this.props.episodeReducer.patient_main_code
                : "not selected"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12} sm={12} xs={12}>
            <Col id="Ai_vid" className="Ad_vid">
              <video
                className
                id="video"
                className="video"
                playsInline
                style={{ display: "none" }}
              ></video>
              <canvas id="output" className="output" />
              <canvas id="jcanvas" />
            </Col>
          </Col>
          <Col className="border px-2 py-2 " md={8} lg={8} sm={24} xs={8}>
            <Tabs
              url1={this.state.url1}
              url2={this.state.url2}
              frontAngles={this.state.frontAngles}
              sideAngles={this.state.sideAngles}
              setFrontAngles={this.setFrontAngles}
              setSideAngles={this.setSideAngles}
              captureFront={this.captureFront}
              captureSide={this.captureSide}
              onChangeSide={this.onChangeSide}
              onChangeFront={this.onChangeFront}
            />
          </Col>
        </Row>
        <Row style={{ paddingBottom: "15px" }}>
          <Col md={24} lg={12} sm={24} xs={24}>
            <Input.TextArea
              width="100%"
              placeholder="Notes"
                onChange={(e) => this.setState({notes:e.target.value})}
            />
          </Col>
          <Col md={24} lg={12} sm={24} xs={24}>
            <Button
                onClick={this.handleSubmit}
              style={{
                float: "right",
                marginRight: "10px",
                marginTop: "5px",
                backgroundColor: "#2d7ecb",
              }}
            >
              Save
            </Button>

            <Button
              onClick={this.GoBack}
              style={{
                float: "right",
                marginRight: "10px",
                marginTop: "5px",
                backgroundColor: "#2d7ecb",
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  FirstAssesment: (key, value) => {
    dispatch({
      type: STATECHANGE,
      payload: {
        key,
        value,
      },
    });
  },
});
const mapStateToProps = (state) => ({
  episodeReducer: state.episodeReducer,
  FirstAssesment:state.FirstAssesment
});
export default connect(mapStateToProps, mapDispatchToProps)(PoseTestClass);
