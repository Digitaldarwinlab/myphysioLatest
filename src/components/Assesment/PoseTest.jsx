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
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from "react-router";
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
import { STATECHANGE } from "../../contextStore/actions/Assesment";
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
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [container, setContainer] = useState(null);
  const [checkF, setCheckF] = useState(false)
  const [checkS, setCheckS] = useState(false)
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(bodyImage)
  const [frontAngles, setFrontAngles] = useState([0,0,0,0,0])
  const [sideAngles, setSideAngles] = useState([0,0])
  const [notes ,setNotes] = useState('')
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
const history = useHistory();
//const [returnState, setReturnState] = useState(false)
let returnState = false
useEffect(() => {
  const unblock = history.block((location, action) => {
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
  return () => {
      unblock();
  };
}, [history]);

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
  const handleSubmit = async ()=>{
  sessionStorage.setItem('posesubmit',true)
    let posture = {
      posture_test_date : new Date().toLocaleDateString('en-GB'),
      Posterial_view : {
        image_path : url1,
        Angles : frontAngles
      },
      lateral_view : {
        image_path : url2,
        Angles : sideAngles
      },
      Notes : notes
    }
    if(window.confirm('Posture data will be saved')){
      dispatch({
        type: STATECHANGE,
        payload: {
          key:'pose',
          value : posture
        }
      });
      history.push('/assessment/1')
    }
  }
  return (
    <div className="px-2 py-2">
      <Row>
      <Col md={16} lg={16} sm={24} xs={16}>
          {" "}
          <h2>Posture / Balance check</h2>{" "}
        </Col>
        {/* <Col  md={8} lg={8} sm={24} xs={8}>
          <p style={{float:'right'}} >Patient Name </p><br/>
          <p style={{float:'right'}} >Patient Code </p>
          </Col> */}
           <Col className="border px-2 py-2 " md={8} lg={8} sm={24} xs={8}>
          <Row>
          <Col md={24} lg={24} sm={24} xs={24}>
          <p> <b>Patient Name</b> : {state.episodeReducer.patient_name?state.episodeReducer.patient_name:'no patient selected'}</p>
          <p> <b>Patient Code</b> : {state.episodeReducer.patient_code?state.episodeReducer.patient_code:'no patient selected'}</p>
          </Col>
          </Row>
          </Col>
      </Row>
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
        <Col className="border px-2 py-2 " md={8} lg={8} sm={24} xs={8}>
          <Row>
          <div className="scrollable-container" ref={setContainer}>
          <div className="background">
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
                        disabled={!checked1}
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
                    {'Ear : '}{frontAngles[0]&&frontAngles[0].toFixed(2)} {' '}
                    {"Shoulder : "}{frontAngles[1]&&frontAngles[1].toFixed(2)} {' '}<br/>
                    {'Hip : '}{frontAngles[2]&&frontAngles[2].toFixed(2)}{' '}
                    {'Knee : '}{frontAngles[3]&&frontAngles[3].toFixed(2)}{' '}<br/>
                    {'Above Pelvic : '}{frontAngles[4]&&frontAngles[4].toFixed(2)}{' '}
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
                        disabled={!checked2}
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
                  {'Above hip : '}{sideAngles[0]&&sideAngles[0].toFixed(2)} <br/>
                  {'Below hip : '}{sideAngles[1]&&sideAngles[1].toFixed(2)}
                  </Card>
                </div>
              </div>
            </Col>
            </div>
            </div>
          </Row>
        </Col>
      </Row>
      <Row style={{paddingBottom:"100px"}}>
      <Col md={24} lg={12} sm={24} xs={24}>
      <Form.Item label={'Notes'}  
            name={"Notes"}
        >
        <Input.TextArea 
        onChange={(e)=>setNotes(e.target.value)}
        />
        </Form.Item>
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <Button onClick={()=>{
               returnState=true
                handleSubmit()
              }} style={{float:'right',marginRight:'10px',marginTop:'5px'}}>Submit</Button>
              </Col>
      </Row>
    </div>
  );
};

export default PoseTest;
