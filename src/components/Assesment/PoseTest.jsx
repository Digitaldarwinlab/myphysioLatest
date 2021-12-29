import React,{useEffect,useState} from "react";
import {
  Select,
  Row,
  Col,
  Switch,
  Input,
  Form,
  Upload,
  Button,
  Modal,
  Space,
} from "antd";
import "./PoseTest.css";
import { Card } from "antd";

import {
  CaretLeftFilled,
  CameraFilled,
  MinusCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SwapOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import bodyImage from '../.././assets/lateral.png'
const { Meta } = Card;
let screenshot = [];
const PoseTest = () => {
  let d = new Date();
  const newDate = d.toDateString();
  const setModelCanvas = () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('output');
    const jcanvas = document.getElementById('jcanvas');
    const options = {
      video,
      videoWidth: 640,
      videoHeight: 480, //window.innerHeight-20,
      canvas,
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
  }
  useEffect(() => {
    setModelCanvas();
    darwin.launchModel();
  }, [])
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [container, setContainer] = useState(null);
  const [checkF, setCheckF] = useState(false)
  const [checkS, setCheckS] = useState(false)
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(bodyImage)
  const [frontAngles, setFrontAngles] = useState([0,0,0,0,0])
  const [sideAngles, setSideAngles] = useState([0,0])
  const  captureFront = () => {
    window.scrollTo(0, 0)
    const out = document.getElementById("scr_out1");
    html2canvas(document.getElementById("output")).then(function (canvas) {
        screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
        var extra_canvas = document.createElement("canvas");
        extra_canvas.setAttribute('width', 272);
        extra_canvas.setAttribute('height', 192);
        var ctx = extra_canvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 272, 192);
        var dataURL = extra_canvas.toDataURL();
        var img = document.createElement('img');
      //  document.getElementById("scr_out1").src='../.././assets/logo512.png'
      setUrl1(dataURL)
        img.src = dataURL
        out.appendChild(img);
        setCheckF(true)
    },
    );
    //this.props.FirstAssesment("AI_screenshot", screenshot)
    console.log(screenshot)
}

const  captureSide = () => {
  window.scrollTo(0, 0)
  const out = document.getElementById("scr_out2");
  html2canvas(document.getElementById("output")).then(function (canvas) {
      screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
      var extra_canvas = document.createElement("canvas");
      extra_canvas.setAttribute('width', 272);
      extra_canvas.setAttribute('height', 192);
      var ctx = extra_canvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 272, 192);
      var dataURL = extra_canvas.toDataURL();
      var img = document.createElement('img');
      //document.getElementById("scr_out2").src=dataURL
      setUrl2(dataURL)
      img.src = dataURL
      out.appendChild(img);
      setCheckS(true)
  },
  );
  //this.props.FirstAssesment("AI_screenshot", screenshot)
  console.log(screenshot)
}

  return (
    <div className="px-2 py-2">
      {/*<Row>
       <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <h2>Pose / Balance check</h2>{" "}
        </Col>
      </Row>
      <Row>
        <Col md={24} lg={24} sm={24} xs={24}>
          <div className="assesment-0">
            <div className="spacing">
            <p className="ps-1 py-2">

<b> Patient Name </b> name <br /> <h3 style={{float:"right"}}><u>{newDate}</u></h3>
<b> Patient Code </b> code <br />
<b> Episode ID: </b> episode id <br />
<b>  Episode Type : </b> episode type <br />
<b>  Start Date : </b> start date

</p>
            </div>
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col md={16} lg={16} sm={24} xs={16}>
        <div className="assesment1">
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
          </div>
        </Col>
        <Col style={{overflowY: 'scroll'}} className="border px-2 py-2 " md={8} lg={8} sm={24} xs={8}>
          <Row className="scrollable-container">
          {/* <div className="scrollable-containe" ref={setContainer}>
          <div className="backgroun"> */}
            <Col md={24} lg={24} sm={24} xs={24}>
              <div className="assesment-1 ">
                <div className="spacing background">
               

                  <Card
                    style={{ marginTop: 5, borderRadius: 10 }}
                    actions={[
                      <Switch checked={checked1} onChange={()=>{
                        darwin.postureView("front")
                        setChecked1(!checked1)
                      }} style={{ color: "red", marginTop: 5 }} />,
                      <Button
                        onClick={async()=>{
                          darwin.postureView("screenshotTaken")
                          captureFront()
                          setChecked1(false)
                          const res = await darwin.showAngles()
                          console.log("show front angles ",res)
                          setFrontAngles([res[0],res[1],res[2],res[3],res[4]])
                        }}
                        style={{ border: "none" }}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>,
                    ]}
                  > 
                  
                 {/* {checkF? <div id='scr_out1'>
                  </div> : */}
                    <img id="scr_out1" src={url1} alt="" /> <br/>
                    {'earAngle : '+frontAngles[0]} {' '}
                    {'shoulderAngle : '+frontAngles[1]} {' '}<br/>
                    {'hipAngle : '+frontAngles[2]}{' '}
                    {'kneeAngle : '+frontAngles[3]}{' '}<br/>
                    {'abovePelvic : '+frontAngles[4]}{' '}
                  </Card>
                </div>
              </div>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24}>
              <div className="assesment-1">
                <div className="spacing">
                  <Card
                    style={{ marginTop: 5, borderRadius: 10 }}
                    actions={[
                       <Switch
                        checked={checked2}
                        onChange={()=>{
                         darwin.postureView("left")
                         setChecked2(!checked2)

                        }} style={{ color: "red", marginTop: 5 }} />,
                      <Button
                        onClick={async()=>{
                          darwin.postureView("screenshotTaken")
                          captureSide()
                          setChecked2(false)
                          const res = await darwin.showAngles()
                          console.log("show side angles ",res)
                          setSideAngles([res[0],res[1]])
                        }}
                        style={{ border: "none" }}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>,
                    ]}
                  >
                   {/* {checkS? <div id='scr_out2'>
                        
                    </div>: */}
                  <img id="scr_out2" src={url2} alt="" /><br/>
                  {'Above hip : '+sideAngles[0]} <br/>
                  {'Below hip : '+sideAngles[1]}
                  </Card>
                </div>
              </div>
            </Col>
            {/* </div>
            </div> */}
          </Row>
          Front angles :
        </Col>
      </Row>
      <Row style={{paddingBottom:"100px"}}>
      <Col md={24} lg={12} sm={24} xs={24}>
      <Form.Item label={'Notes'}  
            name={"Notes"}
        >
        <Input.TextArea 
        />
        </Form.Item>
            </Col>
      </Row>
    </div>
  );
};

export default PoseTest;
