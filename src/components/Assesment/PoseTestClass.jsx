import { Alert, Button, Col, Input, Modal, Result, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import bodyImage from "../.././assets/lateral.webp";
import side_img from "../.././assets/sideways-vector.webp";
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import Tabs from "./Tabs";
 import './PoseTestClass.css';
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
      orientation: 1
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
  setOrientation = (value) => {
    this.state.orientation = value
  };
  setFrontAngles = (value) => {
    this.state.frontAngles = value
  };
  setSideAngles = (value) => {
    this.state.sideAngles = value
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
    // this.state.url1 = dataURL
    this.setState({ url1: dataURL })
    img.src = dataURL;
    out.appendChild(img);
    console.log(screenshot);
  };
  captureSide = async () => {
    window.scrollTo(0, 0);
    const out = document.getElementById("scr_out2");
    const canvas = await html2canvas(document.getElementById("output"));
    screenshot.push(canvas.toDataURL("image/jpeg", 0.9));
    var extra_canvas = document.createElement("canvas");
    extra_canvas.setAttribute("width", 180);
    extra_canvas.setAttribute("height", 180);
    var ctx = extra_canvas.getContext("2d");
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
    var dataURL = extra_canvas.toDataURL();
    var img = document.createElement("img");
    //this.state.url2 = dataURL
    this.setState({ url2: dataURL })
    img.src = dataURL;
    out.appendChild(img);
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
  releaseCamera = () => {
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
    
    console.log('posture submitting...')
    console.log("posture checkbox1 ", this.props.FirstAssesmentReducer.frontChecks)
    console.log("posture checkbox2 ", this.props.FirstAssesmentReducer.sideChecks)
    sessionStorage.setItem("posesubmit", true);
    let posture = {
      posture_test_date: new Date().toLocaleDateString("en-GB"),
      Posterial_view: {
        posterial_view_image: this.state.url1,
        Angles: this.state.frontAngles,
        checkbox: this.props.FirstAssesmentReducer.frontChecks,
      },
      lateral_view: {
        posterial_view_image: this.state.url2,
        Angles: this.state.sideAngles,
        checkbox: this.props.FirstAssesmentReducer.sideChecks,
      },
      Notes: this.state.notes,
    };
    if (window.confirm("Posture data will be saved")) {
      this.releaseCamera()
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
      //showAngles: false,
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
    if (this.props.carePlanReducer.patient_main_code.length > 0) {
      console.log("props1 ", this.props);
      this.setModelCanvas();
      window.darwin.launchModel();
      window.darwin.stop();
      // window.darwin.restart();
      // window.darwin.launchModel();
      console.log('launch triggered')
      // const unblock =  this.props.history.block((location, action) => {
      //   if (sessionStorage.getItem('posesubmit')) {
      //     sessionStorage.removeItem('posesubmit')
      //     return;
      //   }
      //   if (window.confirm("Posture test data will be lost. Is it okay?")) {
      //    console.log("poseture data cleared")
      //     return true;
      //   } else {
      //     console.log("posture data not cleared");
      //     return false;
      //   }
      // });
      // unblock();
    }
  }
  componentDidUpdate() {
    console.log("props1 component did update");
    // window.darwin.launchModel();
    // const unblock =  this.props.history.block((location, action) => {
    //   if (sessionStorage.getItem('posesubmit')) {
    //     sessionStorage.removeItem('posesubmit')
    //     return;
    //   }
    //   if (window.confirm("Posture test data will be lost. Is it okay?")) {
    //    console.log("poseture data cleared")
    //     return true;
    //   } else {
    //     console.log("posture data not cleared");
    //     return false;
    //   }
    // });
    // unblock();
  }
  render() {
    return (
      <div className="px-2 py-2">
        {this.props.carePlanReducer.patient_main_code.length > 0 ? <>
          <Row className="pose_mobile_view_row_video_screen">
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {" "}
              <h3 className="fw-bold page-heading" id="page-heading">
                <i
                  className="fas fa-arrow-left"
                  style={{ cursor: "pointer" }}
                  title="Go Back"
                  onClick={this.GoBack}
                  role="button"
                ></i>{" "}
                <span className="CarePlanTitle "> Postural Analysis</span>
              </h3>
              <p style={{ paddingTop: "4px" }}>
                {" "}
                <b className="pose_mobile_view_details">Patient Name :</b>{" "}
                {this.props.episodeReducer.patient_name
                  ? this.props.episodeReducer.patient_name
                  : "not selected"}
              </p>
              <p style={{ paddingTop: "4px" }}>
                {" "}
                <b className="pose_mobile_view_details">Patient Code :</b>{" "}
                {this.props.episodeReducer.patient_code
                  ? this.props.episodeReducer.patient_main_code
                  : "not selected"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <Alert message="The angle of deviation is calculated from Left to Right" type="info" showIcon closable />
            </Col>
          </Row>
          <Row className="pose_mobile_view_row_video_screen">
            <Col md={12} lg={12} sm={24} xs={12}>
              <Col
                id="Ai_vid" className="Ad_vid"
                style={{ border: '20px solid black' }}
              >
                <video
                  id="video"
                  className="video"
                  playsInline
                  style={{ display: "none" }}
                ></video>
                <canvas id="output" className="output" style={{ height: '440px', width: '100%' }} />
                <canvas id="jcanvas" />
              </Col>
            </Col>
            <Col className="border px-2 py-2 " md={12} lg={12} sm={24} xs={12}>
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
                setOrientation={this.setOrientation}
              />
            </Col>
          </Row>
          <Row style={{ paddingBottom: "15px" }}>
            <Col md={12} lg={12} sm={24} xs={24} style={{ marginTop: "-48px" }}>
              <Input.TextArea
                className="pose_note_input"
                width="100%"
                placeholder="Notes"
                onChange={(e) => this.state.notes = e.target.value}
              />
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>

            </Col>
          </Row>

          <Row style={{ paddingTop: "15px", paddingBottom: "15px" }}>
            <Col md={24} lg={24} sm={24} xs={24} className="text-center">


              <Button
                onClick={this.GoBack}
                style={{
                  marginRight: "10px",
                  marginTop: "5px",
                  backgroundColor: "#2d7ecb",
                }}
              >
                Back
              </Button>
              <Button
                onClick={this.handleSubmit}
                style={{
                  marginRight: "10px",
                  marginTop: "5px",
                  backgroundColor: "#2d7ecb",
                }}
              >
                Save
              </Button>
            </Col>
          </Row>
        </> : <div>
          <Modal headers={false} footer={false} title="Basic Modal" visible={true}>
            <Result
              status="warning"
              title="You have not selected any patient. Please select"
              extra={
                <Button onClick={() => this.props.history.push("/pateints")} type="primary" key="console">
                  Go To Patient List
                </Button>
              }
            />
          </Modal>
        </div>}
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
  FirstAssesmentReducer: state.FirstAssesment,
  carePlanReducer: state.carePlanRedcucer,
});
export default connect(mapStateToProps, mapDispatchToProps)(PoseTestClass);
