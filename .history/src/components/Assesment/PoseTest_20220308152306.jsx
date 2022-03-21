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
import Tabs from './Tabs';
import {
  CaretLeftFilled,
  CameraFilled,
  MinusCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SwapOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import bodyImage from '../.././assets/lateral.jpg'
import side_img from '../.././assets/sideways-vector.jpg'
import { STATECHANGE } from "../../contextStore/actions/Assesment";
const { Meta } = Card;
const { TabPane } = Tabs;
let screenshot = [];
const PoseTest = ({setActive}) => {
  let d = new Date();
  const newDate = d.toDateString();
  const setModelCanvas = () => {
    const video = document.getElementById('video');
   const canvas = document.getElementById('output');
    const jcanvas = document.getElementById('jcanvas');
    const myVideo = document.getElementById('Ai_vid')
    let { width, height } = myVideo.getBoundingClientRect()
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
                radius: 70
            }
        };
    window.darwin.initializeModel(options);
    // startModel();
  }
  const releaseCamera =() =>{
    const video = document.getElementById('video');


    const mediaStream = video.srcObject;
    try {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach(track => track.stop())

        // // console.log('camera releasing....')
        // // console.log(tracks)
    }
    catch (err) {
        // // console.log('camera not releasing....')
        // // console.log(err)
    }
  }
  useEffect(() => {
    releaseCamera();
    setModelCanvas();
    darwin.launchModel();
    darwin.stop();
    darwin.restart();
  }, [])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [checkF, setCheckF] = useState(false)
  const [checkS, setCheckS] = useState(false)
  const [url1, setUrl1] = useState(bodyImage)
  const [url2, setUrl2] = useState(side_img)
  const [frontAngles, setFrontAngles] = useState([0,0,0,0,0])
  const [sideAngles, setSideAngles] = useState([0, 0, 0, 0]);
  // const [frontChecks, setFrontChecks] = useState([])
  // const [sideChecks, setSideChecks] = useState([])
  const [notes ,setNotes] = useState('')
  const  captureFront = () => {
    window.scrollTo(0, 0)
    const out = document.getElementById("scr_out1");
    html2canvas(document.getElementById("output")).then(function (canvas) {
        screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
        var extra_canvas = document.createElement("canvas");
        extra_canvas.setAttribute('width', 180);
        extra_canvas.setAttribute('height', 180);
        var ctx = extra_canvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
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
    // // console.log(screenshot)
}
const history = useHistory();


useEffect(() => {
  const unblock = history.block((location, action) => {
    if (sessionStorage.getItem('posesubmit')) {
      sessionStorage.removeItem('posesubmit')
      return;
    }
    if (window.confirm("Posture test data will be lost. Is it okay?")) {
     // console.log("poseture data cleared")
      return true;
    } else {
      // console.log("posture data not cleared");
      return false;
    }
  });
  return () => {
      unblock();
  };
}, [history]);

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

const  captureSide = () => {
  window.scrollTo(0, 0)
  const out = document.getElementById("scr_out2");
  html2canvas(document.getElementById("output")).then(function (canvas) {
      screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
      var extra_canvas = document.createElement("canvas");
      extra_canvas.setAttribute('width', 180);
      extra_canvas.setAttribute('height', 180);
      var ctx = extra_canvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 180, 180);
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
  // console.log(screenshot)
}

let frontChecks = {}
let sideChecks = {}
  const onChangeFront = (value) =>{
    // console.log("front ",value)
    dispatch({
      type: STATECHANGE,
      payload: {
        key:'FrontCheck',
        value : value
      }
    })
    front.map(a=>{
      if(value.includes(a)){
        frontChecks[a] = 1
      }else{
        frontChecks[a] = 0
      }
    })
    dispatch({
      type: STATECHANGE,
      payload: {
        key:'frontChecks',
        value : frontChecks
      }
    });
  }
  const onChangeSide = (value) =>{
    // console.log("side ",value)
    dispatch({
      type: STATECHANGE,
      payload: {
        key:'SideCheck',
        value : value
      }
    })
    side.map(a=>{
      if(value.includes(a)){
        sideChecks[a] = 1
      }else{
        sideChecks[a] = 0
      }
    })
    dispatch({
      type: STATECHANGE,
      payload: {
        key:'sideChecks',
        value : sideChecks
      }
    });
  }
  const GoBack =()=>{
    darwin.stop();
    const video = document.getElementById('video');


        const mediaStream = video.srcObject;
        try {
            const tracks = mediaStream.getTracks();
            tracks[0].stop();
            tracks.forEach(track => track.stop())

            // console.log('cameraa')
            // console.log(tracks)
        }
        catch (err) {
            // console.log(err)
        }
    history.goBack();
  }
// console.log("checks ",frontChecks)
// console.log("checks ",sideChecks)
  const handleSubmit = async ()=>{
  //  setActive(5)
  const video = document.getElementById('video');


        const mediaStream = video.srcObject;
        try {
            const tracks = mediaStream.getTracks();
            tracks[0].stop();
            tracks.forEach(track => track.stop())

            // console.log('cameraa')
            // console.log(tracks)
        }
        catch (err) {
            // console.log(err)
        }
  sessionStorage.setItem('posesubmit',true)
    let posture = {
      posture_test_date : new Date().toLocaleDateString('en-GB'),
      Posterial_view : {
        posterial_view_image : url1,
        Angles : frontAngles,
        checkBox :state.FirstAssesment.frontChecks
      },
      lateral_view : {
        posterial_view_image : url2,
        Angles : sideAngles,
        checkBox : state.FirstAssesment.sideChecks
      },
      Notes : notes
    }
    if(window.confirm('Posture data will be saved')){
      dispatch({
        type: STATECHANGE,
        payload: {
          key:'posture',
          value : posture
        }
      });
      history.push('/assessment/1')
    }
    // console.log('posture ',posture)
  }
  return (
    <div className="px-2 py-2">
      <Row>
      <Col md={16} lg={16} sm={16} xs={16} style={{display:'flex',justifyContent:'space-between'}}>
          {" "}
          <h3 className="fw-bold">
                <i className="fas fa-arrow-left"
                    style={{ cursor: "pointer" }}
                    title="Go Back"
                    onClick={GoBack}
                    role="button"></i>
                {" "}
                <span  className="CarePlanTitle ml-1"> Postural Analysis</span>

            </h3>
            {/* <p style={{paddingTop:'4px'}}> <b>Patient Name</b> : {state.episodeReducer.patient_name?state.episodeReducer.patient_name:'not selected'}</p>
            <p style={{paddingTop:'4px'}}> <b>Patient Code</b> : {state.episodeReducer.patient_code?state.episodeReducer.patient_main_code:'not selected'}</p> */}
        </Col>
        {/* <Col  md={8} lg={8} sm={24} xs={8}>
          <p style={{float:'right'}} >Patient Name </p><br/>
          <p style={{float:'right'}} >Patient Code </p>
          </Col> */}
      </Row>
      <Row gutter={[20,20]} style={{marginBottom:'5px', marginTop:'15px'}}>
          <Col md={24} lg={8} sm={24} xs={24}>
            <p style={{paddingTop:'4px'}}> <b>Patient Name</b> : {state.episodeReducer.patient_name?state.episodeReducer.patient_name:'not selected'}</p>
          </Col>
          <Col md={24} lg={8} sm={24} xs={24}>
            <p style={{paddingTop:'4px'}}> <b>Patient Code</b> : {state.episodeReducer.patient_code?state.episodeReducer.patient_main_code:'not selected'}</p>
          </Col>
      </Row>

      <Row>

        <Col md={16} lg={16} sm={24} xs={16}>
          <Col id="Ai_vid" className="Ad_vid">
            <img src="../../assets/webcam.png" />
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

          <Row style={{paddingBottom:"15px"}}>
            <Col md={24} lg={24} sm={24} xs={24} className="text-center mb-3">
                <Switch
                    checked={checked1}
                    onChange={() => {
                      darwin.postureView("front");
                      setChecked1(!checked1);
                    }}
                    style={{ color: "red", marginTop: "5", marginRight:"10px" }}
                  />
                <Button>Snapshot</Button>
            </Col>
          </Row>
          <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
              <Col md={24} lg={24} sm={24} xs={24}>
                <Input.TextArea width="100%" style={{height:'100px !important', width:'95%'}} placeholder="Notes" onChange={(e)=>setNotes(e.target.value)} />
              </Col>
          </Row>

        </Col>
        <Col className="px-2 py-2 " md={8} lg={8} sm={24} xs={8}>
        
           <Tabs url1={url1} url2={url2} setUrl1={setUrl1} setUrl2={setUrl2} 
           frontAngles={frontAngles} sideAngles={sideAngles} setFrontAngles={setFrontAngles} 
           setSideAngles={setSideAngles} screenshot={screenshot} captureFront={captureFront} 
           captureSide={captureSide} onChangeSide={onChangeSide} onChangeFront={onChangeFront}/>
         
        </Col>
      </Row>
      <Row style={{paddingBottom:"15px"}}>
        <Col md={24} lg={24} sm={24} xs={24} className="text-center">
            <Button onClick={()=>{
                handleSubmit()
              }} style={{marginRight:'10px',marginTop:'5px' ,backgroundColor:'#2d7ecb'}}>Save</Button>
              
              <Button onClick={GoBack} style={{marginRight:'10px',marginTop:'5px'}}>Back</Button>
              </Col>
      </Row>
    </div>
  );
};

export default PoseTest;
