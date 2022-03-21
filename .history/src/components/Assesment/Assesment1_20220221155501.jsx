import React, { useState, useEffect,useCallback } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { AiFillMedicineBox } from "react-icons/ai";
import { Select, Row, Col, Input, Form, Upload, Button,Checkbox, Modal, Space,Radio, Tabs, Badge } from 'antd';
import { ASSESMENT_CLEARSTATE, ASSESSMENT_ADD_SUB_INPUT, ASSESSMENT_REMOVE_SUB_INPUT,ASSESSMENT_SUBJECTIVE, STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import FormInput from '../UI/antInputs/FormInput';
import FormTextArea from '../UI/antInputs/FormTextArea';
import FormDate from "../UI/antInputs/FormDate";
// import Body from './Body';
import Body from "../Assesment/Body/Body"
{/* aswin 10/25/2021 start */ }
import html2canvas from 'html2canvas'
import moment from 'moment'
import ActiveSearch from '../UtilityComponents/ActiveSearch';
{/* aswin 10/25/2021 start */ }
import "../../styles/Layout/Body.css"
import { AssesmentAPI } from '../../API/Assesment/assementApi';
import { getEpisode } from '../../API/Episode/EpisodeApi';
import { RECEIVED_DATA } from '../../contextStore/actions/Assesment';
import JointData from "../UtilityComponents/dummyData/MuscleMap.json";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
// aswin 10/24/2021 start
import { notification, Descriptions, Table} from "antd";
import './Assesment1.css'
// aswin 10/24/2021 stop
import TrapsLeft from "./../../assets/Crops/08TrapsLeft.png";
import Trapsright from "./../../assets/Crops/08.-TrapsRight.png";
import DeltoidsA from "./../../assets/Crops/07.A-Deltoids.png";
import DeltoidsB from "./../../assets/Crops/07.B-Deltoids.png";
import Pecs from "./../../assets/Crops/06.-Pecs.png";
import bicepsA from "./../../assets/Crops/05.A-Biceps.png";
import bicepsB from "./../../assets/Crops/05.B-Biceps.png";
import forearmA from "./../../assets/Crops/14.A-Forearms.png";
import forearmB from "./../../assets/Crops/14.B-Forearms.png";
import obliques from "./../../assets/Crops/04.-Obliques.png";
import quadsA from "./../../assets/Crops/01.A-Quads.png";
import quadsB from "./../../assets/Crops/01.B-Quads.png";
import calvesA from "./../../assets/Crops/13.A-Calves.png";
import calvesB from "./../../assets/Crops/13.B-Calves.png";
import backtrapsA from "./../../assets/Crops/08.B-Traps.png";
import backtrapsB from "./../../assets/Crops/08.C-Traps.png";
import backshouldersA from "./../../assets/Crops/07.C-Deltoids.png";
import backshouldersB from "./../../assets/Crops/07.D-Deltoids.png";
import tricepsA from "./../../assets/Crops/09.A-Triceps.png";
import tricepsB from "./../../assets/Crops/09.B-Triceps.png";
import backLatsA from "./../../assets/Crops/10.A-Lats.png";
import backLatsB from "./../../assets/Crops/10.B-Lats.png";
import backlower from "./../../assets/Crops/15.-Lower-Back.png";
import backforearmsA from "./../../assets/Crops/14.C-Forearms.png";
import backforearmsB from "./../../assets/Crops/14.D-Forearms.png";
import backglutes from "./../../assets/Crops/11.-Glutes.png";
import backhamstringsA from "./../../assets/Crops/12.A-Hamstrings.png";
import backhamstringsB from "./../../assets/Crops/12.B-Hamstrings.png";
import backcalvesA from "./../../assets/Crops/13.C-Calves.png";
import backcalvesB from "./../../assets/Crops/13.D-Calves.png";
import background from './../../assets/Crops/00.-Blank-Figures.png';
import MobBackground from "./../../assets/Crops//mobilebg.png";
import { useRef } from 'react';


const muscle = [
    "TrapsA", "TrapsB", "BacktrapsA", "BacktrapsB",
    "ShoulderA", "ShoulderB", "Pecs", "BackshouldersA", "BackshouldersB",
    "BicepsA", "BicepsB", "ForearmsA", "ForearmsB", "BackforearmsA",
    "BackforearmsB", "Abdominals", "QuadsA", "QuadsB", "CalvesA", "CalvesB",
    "BackcalvesA", "BackcalvesB", "TricepsA", "TricepsB", "LatsA", "LatsB",
    "LowerBack", "Glutes", "HamstringsA", "HamstringsB"
]

const marks1 = {
    0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
    1: <MehOutlined style={{ fontSize: 25, color: 'limegreen' }} />,
    2: <FrownOutlined style={{ fontSize: 25, color: 'orange' }} />,
    3: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>
};

const marks = {
    0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
    2: <i class="far fa-smile" style={{ fontSize: 25, color: 'lime' }}></i>,
    4: <i class="far fa-meh" style={{ fontSize: 25, color: 'limegreen' }}></i>,
    6: <i class="far fa-frown" style={{ fontSize: 25, color: 'lightsalmon' }}></i>,
    8: <i class="far fa-frown" style={{ fontSize: 25, color: 'orange' }}></i>,
    10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>
};

const desc = ['no pain', 'mild', 'moderate', 'severe'];


const { Dragger } = Upload;

var pdfjsLib = window['pdfjs-dist/build/pdf'];
const { TabPane } = Tabs;
//pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';


const layout = {
  // labelCol: { span: 8 },
};
/*
darwin.addProgressListener((setCount, repCount) => {
  document.getElementById('sets').textContent = `Sets: ${setCount}`;
  document.getElementById('reps').textContent = `Reps: ${repCount}`;
  console.log(setCount+'setCount')
})

*/



const Assesment1 = ({back ,next}) => {

  const state = useSelector(state => state);
  const [form] = Form.useForm();
  const myRef = useRef(null)
  const screenShotRef = useRef(null)
  const executeScroll = () => screenShotRef.current.scrollIntoView()
  // console.log(state.episodeReducer.patient_code +'patient_code')
  const [episodedata, SetepisodeData] = useState()
  useEffect(async () => {
    //aswin 10/25/2021 start
    // if (props1.history.location.state) {
    //   state.FirstAssesment.Type = props1.history.location.state.type
    // }
    //aswin 10/25/2021 stop
    sessionStorage.removeItem('submit')
    sessionStorage.removeItem('posesubmit')
    sessionStorage.removeItem('specialsubmit')
    const data = await getEpisode(state.episodeReducer.patient_code)
    if (data[0]) {
      state.FirstAssesment.episode_id = data[0].pp_ed_id;
      SetepisodeData({
        episodeId: data[0].pp_ed_id,
        complaintId: data[0].primary_complaint,
        start_date: data[0].start_date
      })
    }
    else {
      SetepisodeData({
        episodeId: 'No data',
        complaintId: 'no data',
        start_date: 'no data'
      })
    }

  }, [])

  

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (
        location.pathname != '/assesment/Questions' &&
        location.pathname != '/care-plan' && location.pathname != '/assesment/PainAssessment' &&
        location.pathname != '/assesment/SpecialTest' && location.pathname != '/assesment/PoseTest' &&
        state.FirstAssesment.episode_id != "") {
        //aswin 11/11/2021 start
        if (sessionStorage.getItem('submit')) {
          sessionStorage.removeItem('submit')
          return;
        }
        //aswin 11/11/2021 stop
        if (window.confirm("Assesment data will be lost. Is it okay?")) {
          dispatch({ type: ASSESMENT_CLEARSTATE });
          dispatch({ type: "JOINT_CLEARSTATE" });
          console.log("Assesment data cleared")
           return true;
         } else {
           console.log("not cleared");
           return false;
         }
        // if (window.confirm("Assesment data will be lost. Is it okay?")) {
        //   dispatch({ type: ASSESMENT_CLEARSTATE });
        // } 
      }
    });

 
  


    const data = state.FirstAssesment;
    form.setFieldsValue({ Ref_Dr_Name: data.Ref_Dr_Name });
    form.setFieldsValue({ Ref_Dr_ID: data.Ref_Dr_ID });
    form.setFieldsValue({ complaint: data.primary_complain });
    form.setFieldsValue({ Operative_Types: data.Operative_Types });
    form.setFieldsValue({ file: data.file });
    form.setFieldsValue({ Patient_History: data.Patient_History });

    return () => {
      unblock();
    };

  }, [history, state.FirstAssesment.episode_id])

  const setJoints =useCallback((joints) => {
    console.log(joints);
    dispatch({
      type: STATECHANGE,
      payload: {
          key:'allJoint',
          value:joints
      }
  });
  },[dispatch])


  const com = () => {
    return (
      <h1>hello world</h1>
    )
  }
  useEffect(() => {

    console.log('assesment state is printing')
    console.log(state.FirstAssesment.Type)

  }, [state.FirstAssesment])



const [tempstate ,setTemp] = useState(true)
  useEffect(() => {
    if (state.FirstAssesment.Type == "First")
      setPhysicalVisibility('block')
    else
      setPhysicalVisibility('none')
  }, [state.FirstAssesment.Type])


  {/* aswin 10/25/2021 start */ }
  const [date, setDate] = useState();
  {/* aswin 10/25/2021 stop */ }
  const [visibility, setVisibility] = useState("none");

  const [physicalVisibility, setPhysicalVisibility] = useState("none");
  const [files, setFiles] = useState([])

  const [fileType, setFileType] = useState(false);
  console.log("files ", files)




  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const Questions = () => {
    history.push("/assesment/Questions");
  }
  const handleChange = (key, value, id = 0) => {
    //alert(value+", "+key+" , "+id)
    if(key === "chiefCom" || key === "Medication" || key === "Others"){
      if(value.length>0){
        dispatch({
          type: STATECHANGE,
          payload: {
              key,
              value:value[0].toUpperCase()+value.slice(1, value.length)
          }
      });
      }
    }
    if (key === "Date") {
      setDate(value.date);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: value.dateString
        }
      });

    } else if (key === "ScareFile") {
      console.log("files ", (value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files, value])
    } else if (key === "TraumaFile") {
      console.log("files ", (value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files, value])
    }else if(key==='occupation' || key==='duration'){
      dispatch({
        type:ASSESSMENT_SUBJECTIVE,
        payload:{
          key,
          value,
          id
        }
      })
    }
    else {
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
    }
    dispatch({ type: "NOERROR" });
  }

  const handleUploadScars = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer");

    changeThumb(e, thumbnailBox)
  }

  const handleUploadTrauma = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer1");
    console.log(e)
    changeThumb(e, thumbnailBox)
  }


  const changeThumb = (e, thumbnailBox) => {

    if (e != undefined) {
      var filein
      var file
      if (e.type == "drop") {
        filein = e.target.value

      }
      else {
        filein = e.target.files
      }

      console.log(filein)
      setVisibility('block')

      for (var i = 0; i < filein.length; i++) {
        if (e.type == "drop") {
          file = filein[i]
        }
        else {
          file = filein[i]
        }
        if (file.type == "application/pdf") {
          var fileReader = new FileReader();
          fileReader.onload = function () {
            var pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            var loadingTask = pdfjsLib.getDocument({ data: pdfData });
            loadingTask.promise.then(function (pdf) {
              console.log('PDF loaded');

              // Fetch the first page
              var pageNumber = 1;
              pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');

                var scale = 0.1;
                var viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                var canvas = document.createElement('canvas');
                canvas.style.padding = "10px"
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                  canvasContext: context,
                  viewport: viewport
                };
                var renderTask = page.render(renderContext);
                thumbnailBox.appendChild(canvas)
                renderTask.promise.then(function () {
                  console.log('Page rendered');
                });
              });
            }, function (reason) {
              // PDF loading error
              console.error(reason);
            });
          };
          fileReader.readAsArrayBuffer(file);
        }
        else {
          setFileType(true)
        }
      }
    }
  }

  const { Option } = Select;

  const { TextArea } = Input;

  const props = {
    showUploadList: fileType
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  console.log('state inassesment')
  console.log(state)
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  // gaurav 5/12/21
  const [chief, setChief] = useState();

  const [inputFields, setInputFields] = useState([
    { Occupation: '', Duration: '' },

  ])

  let plainOptions1 =['Diabetes','HYN','COPD','Cardiac']
  const [medic ,setMedic] = useState(true)
  const [others ,setOthers] = useState(true)
  const handleAddFields = () => {
   // setInputFields([...inputFields, { Occupation: '', Duration: '' }])
   dispatch({ type: ASSESSMENT_ADD_SUB_INPUT, payload: { type: "subjective" } })

  }

  const handleRemoveFields = (index) => {
    // const values = [...inputFields];
    // values.splice(index, 1);
    // setInputFields(values);
    dispatch({ type: ASSESSMENT_REMOVE_SUB_INPUT, payload: { type: "subjective" } });
  }

  const [MuscleJoint, setMuscleJoint] = useState({});

  const [BodyParts, setBodyParts] = useState([]);

  const [FullBody, setFullBody] = useState(false);

  const [MaleFemale, setMaleFemale] = useState(false);

  const [QuestionVisibility, setQuestionVisibility] = useState('block');

  const [posture ,setPosture] = useState(false)

  const [RomVisibility, setRomVisibility] = useState('block');

  const [angleValues, setAngleValues] = useState({
      LeftShoulder_ver: '',
      RightShoulder_ver: '',
      LeftElbow: '',
      RightElbow: '',
      LeftHip: '',
      RightHip: '',
      LeftKnee: '',
      RightKnee: '',
      LeftNeck: '',
      RightNeck: '',
      LeftPelvic: '',
      RightPelvic: '',
  })


  useEffect(() => {
      form.resetFields()

  }, [history])
  const assesmentstate = useSelector(state => state.FirstAssesment)

  // useEffect(()=>{

  // },[assesmentstate])

  const formatter = (value) => {
      return `${desc[value]}`
  }

  const columns = [
      {
          title: "Angles",
          dataIndex: "angles",
          key: "angles"
      },
      {
          title: "Min",
          dataIndex: "min",
          key: "min",
          render: number => Math.round(number)
      },
      {
          title: "Max",
          dataIndex: "max",
          key: "max",
          render: number => Math.round(number)
      },
  ]

  const tableData = [
      {
          key: '1',
          angles: 'Left Shoulder(ver)',
          min: angleValues.LeftShoulder_ver.min,
          max: angleValues.LeftShoulder_ver.max
      },
      {
          key: '2',
          angles: 'Right Shoulder(ver)',
          min: angleValues.RightShoulder_ver.min,
          max: angleValues.RightShoulder_ver.max
      },
      {
          key: '3',
          angles: 'Left Elbow',
          min: angleValues.LeftElbow.min,
          max: angleValues.LeftElbow.max
      },
      {
          key: '4',
          angles: 'Right Elbow',
          min: angleValues.RightElbow.min,
          max: angleValues.RightElbow.max
      },
      {
          key: '5',
          angles: 'Neck Left',
          min: angleValues.LeftNeck.min,
          max: angleValues.LeftNeck.max
      },
      {
          key: '6',
          angles: 'Neck Right',
          min: angleValues.RightNeck.min,
          max: angleValues.RightNeck.max
      }

  ]

  const tableData1 = [
      {
          key: '7',
          angles: 'Left Hip',
          min: angleValues.LeftHip.min,
          max: angleValues.LeftHip.max
      }, {
          key: '8',
          angles: 'Right Hip',
          min: angleValues.RightHip.min,
          max: angleValues.RightHip.max
      }, {
          key: '9',
          angles: 'Left Knee',
          min: angleValues.LeftKnee.min,
          max: angleValues.LeftKnee.max
      }, {
          key: '10',
          angles: 'Right Knee',
          min: angleValues.RightKnee.min,
          max: angleValues.RightKnee.max
      }, {
          key: '11',
          angles: 'Pelvic Left',
          min: angleValues.LeftPelvic.min,
          max: angleValues.LeftPelvic.max
      }, {
          key: '12',
          angles: 'Pelvic Right',
          min: angleValues.RightPelvic.min,
          max: angleValues.RightPelvic.max
      }
  ]
  
  useEffect(() => {
      const question = document.getElementById("question")
      const rom = document.getElementById("rom")
      const posture_btn = document.getElementById('posture-btn')

      if (state.FirstAssesment.KOOS === "") {
          question.innerHTML = "Scales & Index"
       //  question.innerHTML = " "
          setQuestionVisibility('none')

      }
      else {
        question.innerHTML = "Scales & Index filled"
        // question.innerHTML = " "
          question.style.backgroundColor = "honeydew"
          question.style.borderColor = "limegreen"
          setQuestionVisibility('inline')

      }
     // setQuestionVisibility('none')
     if(Object.keys(state.FirstAssesment.posture).length > 0){
      posture_btn.innerHTML = 'Posture Done'
      setPosture(true)
    }
      // Check if AI_Data
      if (state.FirstAssesment.AI_data === "") {
          rom.innerHTML = "AROM Assesment"
          setRomVisibility('none')
      }
      else {
          const exercise = state.FirstAssesment.Exercise_Name
          //instead of fetching from store
          //fetch from loalstorage directly
          const AI_Data = state.FirstAssesment.AI_data[exercise].angles
          //const AI_Data = JSON.parse(localStorage.getItem("AI_Data")).Squat.angles
          console.log("Ai data in body.js from localstorage: ", AI_Data)
          // const AI_Data = state.FirstAssesment.AI_data[exercise].angles
          rom.innerHTML = "ROM Assement calculated"
          rom.style.backgroundColor = "honeydew"
          rom.style.borderColor = "limegreen"
          setRomVisibility('block')
          setAngleValues(preValues => ({
              ...preValues,
              ['LeftShoulder_ver']: AI_Data["Left Shoulder(ver)"],
              ['RightShoulder_ver']: AI_Data["Right Shoulder(ver)"],
              ['LeftElbow']: AI_Data["Left Elbow"],
              ['RightElbow']: AI_Data["Right Elbow"],
              ['LeftHip']: AI_Data["Left Hip"],
              ['RightHip']: AI_Data["Right Hip"],
              ['LeftKnee']: AI_Data["Left Knee"],
              ['RightKnee']: AI_Data["Right Knee"],
              ['LeftNeck']: AI_Data["Neck Left"],
              ['RightNeck']: AI_Data["Neck Right"],
              ['LeftPelvic']: AI_Data["Pelvic Left"],
              ['RightPelvic']: AI_Data["Pelvic Right"]
          }))
      }
  }, angleValues)
  // NOTE: Above useEffect does same thing, repeated code 
  useEffect(() => {
      function checkUserData() {
          var AI = JSON.parse(localStorage.getItem("AI_Data"))
          var data = JSON.parse(localStorage.getItem("ExerciseName"))
          //  console.log(AI,data)
          state.FirstAssesment.Exercise_Name = data
          state.FirstAssesment.AI_data = AI
          const exercise = state.FirstAssesment.Exercise_Name
         const AI_Data = state.FirstAssesment.AI_data[exercise].angles

         // const AI_Data = JSON.parse(localStorage.getItem("AI_Data")).Squat.angles
          
          console.log("Ai data in body.js from localstorage: ", AI_Data)

          rom.innerHTML = "AROM Assement calculated"
          rom.style.backgroundColor = "honeydew"
          rom.style.borderColor = "limegreen"
          setRomVisibility('block')
          setAngleValues(preValues => ({
              ...preValues,
              ['LeftShoulder_ver']: AI_Data["Left Shoulder(ver)"],
              ['RightShoulder_ver']: AI_Data["Right Shoulder(ver)"],
              ['LeftElbow']: AI_Data["Left Elbow"],
              ['RightElbow']: AI_Data["Right Elbow"],
              ['LeftHip']: AI_Data["Left Hip"],
              ['RightHip']: AI_Data["Right Hip"],
              ['LeftKnee']: AI_Data["Left Knee"],
              ['RightKnee']: AI_Data["Right Knee"],
              ['LeftNeck']: AI_Data["Neck Left"],
              ['RightNeck']: AI_Data["Neck Right"],
              ['LeftPelvic']: AI_Data["Pelvic Left"],
              ['RightPelvic']: AI_Data["Pelvic Right"]
          }))

      }

      window.addEventListener('storage', checkUserData)

      return () => {
          window.removeEventListener('storage', checkUserData)
      }
  }, [])


  const handleChange1 = (key, value, id = 0) => {
          dispatch({
              type: STATECHANGE,
              payload: {
                  key,
                  value
              }
          });
          dispatch({ type: "NOERROR" });
  }


  const handleClick = async (e, id) => {
      console.log(e, ' : ', id)
      const index = BodyParts.indexOf(e);
      //    console.log(BodyParts)
      var ele = document.getElementById(id);

      if (index === -1) {
          const MappedJoint = JointData[e];

          const dummyData = { ...MuscleJoint }

          for (let i = 0; i < MappedJoint.length; i++) {

              if (MappedJoint[i] in dummyData) {
                  dummyData[MappedJoint[i]] += 1;
              } else {
                  dummyData[MappedJoint[i]] = 1;
              }
          }

          setMuscleJoint(dummyData);

          const Body = [...BodyParts, e]
          setBodyParts(Body);
          ele.style.opacity = '1';

      } else {
          const MappedJoint = JointData[e];
          const dummyData = { ...MuscleJoint }

          for (let i = 0; i < MappedJoint.length; i++) {

              if (MappedJoint[i] in dummyData) {
                  dummyData[MappedJoint[i]] -= 1;

                  if (dummyData[MappedJoint[i]] === 0) {
                      delete dummyData[MappedJoint[i]];
                  }
              }
          }
          setMuscleJoint(dummyData);
          const Body = [...BodyParts]
          Body.splice(index, 1)
          setBodyParts(Body);
          ele.style.opacity = '0';
      }
      executeScroll()    
    let div = document.getElementById("malefigures");
    let can =  await html2canvas(div)
    let url = can.toDataURL()
    //handleChange1('body_image',url)
    dispatch({
      type: STATECHANGE,
      payload: {
          key:'body_image',
          value:url
      }
  });
  dispatch({ type: "NOERROR" });

  }


  const Rom = () => { 
    console.log(!state.jointReducer.joints)
      if (!state.jointReducer.joints.length>0) {
          warningJoint()
          return false
      }
      let temp = []
      state.jointReducer.joints.map(jo=>{
       temp.push(...jo.joint)
      })
      temp = [...new Set(temp)]
      console.log(temp)
      console.log("values ", MuscleJoint)
      console.log("values ", BodyParts)
      history.push({
          pathname: "/care-plan", state: {
              Joints: temp,
              Muscles: BodyParts,
              prevpath: "/assesment"
          }
      });
    //  console.log(Object.keys(MuscleJoint));
  }

  const goPain = () => {
    if (state.jointReducer.joints.length===0) {
      warningJoint()
      return
    }
    history.push('/assesment/PainAssessment')
  }

  const onClick = async () => {
      if (FullBody === false) {
          var ele = document.getElementsByClassName("FullBody");
          const dummyData = { ...MuscleJoint }
          for (i of muscle) {
              const MappedJoint = JointData[i];
              for (let j = 0; j < MappedJoint.length; j++) {
                  if (MappedJoint[j] in dummyData) {
                      dummyData[MappedJoint[j]] += 1;
                  } else {
                      dummyData[MappedJoint[j]] = 1;
                  }
              }
              setBodyParts(muscle);
              setMuscleJoint(dummyData);

          }

          for (var i = 0, len = ele.length | 0; i < len; i = i + 1 | 0) {
              ele[i].style.opacity = "1";
          }
          setFullBody(true);

      } else {
          // eslint-disable-next-line no-redeclare
          var ele = document.getElementsByClassName("FullBody");
          const dummyData = { ...MuscleJoint }
          const Body = [...BodyParts]
          for (i of muscle) {
              const MappedJoint = JointData[i];
              for (let j = 0; j < MappedJoint.length; j++) {
                  if (MappedJoint[j] in dummyData) {

                      dummyData[MappedJoint[j]] -= 1;

                      if (dummyData[MappedJoint[j]] === 0) {
                          delete dummyData[MappedJoint[j]];
                      }
                  }
              }
              Body.splice(0, muscle.length)
              setBodyParts(Body);
              setMuscleJoint(dummyData);
          }

          for (i = 0, len = ele.length | 0; i < len; i = i + 1 | 0) {
              ele[i].style.opacity = "0";
          }
          setFullBody(false);
      }
      executeScroll()    
    let div = document.getElementById("malefigures");
    let can =  await html2canvas(div)
    let url = can.toDataURL()
    //handleChange1('body_image',url)
    dispatch({
      type: STATECHANGE,
      payload: {
          key:'body_image',
          value:url
      }
  });
  dispatch({ type: "NOERROR" });
  }

  function warning() {
      Modal.warning({
          title: 'This is a warning message',
          content: 'Fields missing: All Mandatory fields should be filled in',
      });
  }
  function warningJoint() {
      Modal.warning({
          title: 'This is a warning message',
          content: 'Please Select a joint',
      });
  }
  function warningPatientSelect() {
      Modal.warning({
          title: 'This is a warning message',
          content: 'Please Select a Patient',
      });
  }

  
  const checkEpisodeId = async () => {
      if (state.episodeReducer.patient_code) {
          const res = await getEpisode(state.episodeReducer.patient_code)
          if (res.length > 0) {
              if (res[0].end_date.length === 0) {
                  return 'true';
              }
              notification.warning({
                  message: "Patient don't have an open episode",
                  placement: 'topRight',
                  duration: 10,
                  key: 1,
                  style: {
                      marginTop: '10vh',
                  },
                  btn: <Button size="small" onClick={() => {
                      history.push('/add-episode')
                      notification.close(1)
                  }}>
                      Add-episode
                  </Button>,
              })
              return false;
          } else {
              notification.warning({
                  message: "Patient don't have an open episode",
                  placement: 'topRight',
                  duration: 10,
                  key: 1,
                  style: {
                      marginTop: '10vh',
                  },
                  btn: <Button size="small" onClick={() => {
                      history.push('/add-episode')
                      notification.close(1)
                  }}>
                      Add-episode
                  </Button>,
              })
          }
      } else {
          notification.warning({
              message: "Please select a patient",
              placement: 'bottomLeft',
              duration: 5,
              style: 'margin-top:20px'
          });
          return false;
      }
  }


  // aswin 10/30/2021 stop
  const Finalsubmit = async (url) => {
      const res = await getEpisode(state.episodeReducer.patient_code)
      if (res.length > 0 && res[0].end_date.length === 0) {
          if (window.confirm('Assessment data will be submitted')) {
              const data = await AssesmentAPI(state.FirstAssesment,url, dispatch)
              dispatch({ type: RECEIVED_DATA })
              if (data === true) {
                  sessionStorage.setItem('submit', true)
                  setTimeout(() => {
                      dispatch({ type: ASSESMENT_CLEARSTATE });
                      dispatch({ type: "JOINT_CLEARSTATE" });
                  }, 1000);

                  notification.success({
                      message: 'Assessment successfully submitted!',
                      placement: 'bottomLeft',
                      duration: 2
                  });

                  history.push('/dashboard')
              }


              else {
                  notification.error({
                      message: 'Form was not submitted',
                      placement: 'bottomLeft',
                      duration: 2
                  });
              }
          }
          // aswin 11/13/2021 stop
      } else {
          return notification.warning({
              message: "Patient don't have an open episode1",
              placement: 'bottomRight',
              duration: 2
          });
      }
  }
  const Submit = async () => {
    let video = screenShotRef.current
    console.log('divvvv ',video)
    console.log(video.id)
    let url = ""
      executeScroll()    
      let div = document.getElementById(video.id);
      console.log('divvvv ',video)
      let can =  await html2canvas(video)
      url = can.toDataURL()
      dispatch({
        type: STATECHANGE,
        payload: {
            key:'body_image',
            value:url
        }
    });
    dispatch({ type: "NOERROR" });
    Finalsubmit(url)

  }
  // const [quest, setQuest] = useState(true)
  // const [pain, setPain] = useState(true)
  // const [special, setSpecial] = useState(true)
  // const [pose, setPose] = useState(true)
  // const [romAss, setRomAss] = useState(true)

  return (
    <Profiler
              id="AuthForm"
              onRender={(
                id,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions
              ) => {
                console.log(id);
                console.log(actualDuration);
                console.log(baseDuration);
                console.log(startTime);
                console.log(commitTime);
                console.log(interactions);
              }}
            >
    <div className="px-2 py-2">

      <Form style={{ background: '#fff', marginTop: '0px', marginBottom: '25px', padding: '0px' }} {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

        form={form}
      // form={form} name="control-hooks"
      >

<Row>
        <Col md={12} lg={12} sm={24} xs={24}>
          <h3>
            <i
              className="fas fa-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push('/dashboard')
              }}
              title="Go Back"
              role="button"
            ></i>
          </h3>
          <h3 style={{paddingTop:'10px'}} >
            <AiFillMedicineBox />
             <b style={{paddingLeft:'5px'}} >Assesment/Consultation</b>
          </h3>
        </Col>
        {state.Validation.episode_check === "failed" && (
          <Error error={state.Validation.msg} />
        )}
        <Col md={12} lg={12} sm={24} xs={24}>
          <ActiveSearch />
        </Col>
      </Row>
      
      {/* <Row>
        <Col md={2} lg={2} sm={2} xs={2}>
        </Col>
        <Col style={{paddingLeft:'50px'}} md={20} lg={20} sm={20} xs={20}>
          <div>
          <Checkbox checked={!state.FirstAssesment.quest} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('quest',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.pain1} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('pain1',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.special} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('special',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.pose} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('pose',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.romAss} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('romAss',!e.target.checked)}></Checkbox>
          </div>
        </Col>
        <Col md={2} lg={2} sm={2} xs={2}>
        </Col>
      </Row> */}
        {/* <Row>
        <Row>
          <Col md={24} lg={24} sm={24} xs={24}>
            <div className="border">
              <p className="ps-1 py-2">

                <b> Patient Name </b> {state.episodeReducer.patient_name} <br />
                <b> Patient Code </b> {state.episodeReducer.patient_main_code} <br />
                <b> Episode ID: </b> {episodedata ? episodedata.episodeId : null} <br />
                <b>  Episode Type : </b> {episodedata ? episodedata.complaintId : null} <br />
                <b>  Start Date : </b> {episodedata ? episodedata.start_date : null}

              </p>
            </div>
          </Col>

        </Row> */}

        <Row gutter={[20,20]} style={{marginBottom:'15px', marginTop:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <b> Patient Name :</b> {state.episodeReducer.patient_name}
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <b> Patient Code :</b> {state.episodeReducer.patient_main_code}
             </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <b> Episode ID : </b> {episodedata ? episodedata.episodeId : null}
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <b>  Episode Type : </b> {episodedata ? episodedata.complaintId : null}
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <b>  Start Date : </b> {episodedata ? episodedata.start_date : null}
            </Col>
        </Row>

        <Row className="AssesmentConsultationMain">
          {/* <Col className="AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}> */}
          {/* <FormDate label="Date"

              name="Date"
              // reverse ="true"
              className="input-field w-100"
              //aswin 10/25/2021 start
              value={moment(state.FirstAssesment.Date.dateString,'YYYY-MM-DD')}
              defaultValue={state.FirstAssesment.Date.dateString && moment(state.FirstAssesment.Date.dateString, "YYYY-MM-DD") }
              //aswin 10/25/2021 stop
              required={true}
              onChange={handleChange}
            /> */}
          {/* </Col> */}
          <Col className="AssesmentConsultationMain_inner" style={{marginLeft:'0px', paddingLeft:'0px'}} md={12} lg={12} sm={24} xs={24}>
            <Form.Item label="Type" name="Type">
            {/* //  rules={[{ required: true, message: `Please Select Type.` }]} > */}
              <Select placeholder="Select Type"
                className="w-100 input-field"
                onChange={(value) => handleChange("Type", value)}
                value={state.FirstAssesment.Type}
                defaultValue={state.FirstAssesment.Type}>
                {/* aswin 10/24/2021 start */}
                <Option value="First">{state.FirstAssesment.Type === "First" && "First Assesment"}</Option>
                {/* aswin 10/24/2021 start */}
                <Option value="Periodic">Periodic</Option>
                {/* <Option value="Consultation">Consultation</Option> */}
              </Select>
            </Form.Item>

          </Col>
        </Row>
      </Form>

      <Row className="">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h3 className="p-0"><b>Physical Assesment</b></h3>
          </Col>
        </Row>

     {state.FirstAssesment.Type==="First"&& <div className="border1 mb-3 mt-3" style={{ background:'#fff', marginTop:'10px', padding:'20px'}}>
        
        
        <Form form={form} >
         
          {/* 
          <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
              <Col md={24} lg={12} sm={24} xs={24}>
                <FormInput label="Scars"
                  name="Scars"
                  value={state.FirstAssesment.Scars}
                  defaultValue={state.FirstAssesment.Scars}
                  onChange={handleChange} required={true}>
                </FormInput>
                <div style={{ display: visibility, padding: 5, width: '100%' }} id="pdfViewer">
                </div>
              </Col>
             
          </Row> */}
        </Form>
        <Form form={form} layout="vertical">

          {/* <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
               <FormTextArea label="Recent History"
                  name="RecentHistory"
                  value={state.FirstAssesment.RecentHistory}
                  defaultValue={state.FirstAssesment.RecentHistory}
                  onChange={handleChange} required={true} />
            </Col>

            <Col  md={24} lg={12} sm={24} xs={24}>
             
              <Dragger {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"

               onInput={handleUploadScars}
               onChange={ async (e)=>{
                let files=[]
                await  e.fileList.forEach((data)=>{files.push(data.originFileObj)})
                console.log(files)
                handleChange('ScareFile',files)
               }}
              >
                Choose Files
              </Dragger>
           

            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
            
              </Col>
          </Row> */}

        </Form>
        {/* gaurav 4/12 */}

        <div className="container-fuild">

          <Row gutter={[20, 20]} className="py-0">
              <Col md={24} lg={24} sm={24} xs={24}>
                  <h4><b>Subjective</b></h4>
              </Col>
            </Row>
          {/* <div className="row">
            <div className="col">
              <h2>Subjective</h2>
            </div>

          </div> */}



           <Col md={24} lg={24} sm={24} xs={24} className="mx-0 p-0">
              {state.FirstAssesment.subjective.map((data, index) => {
            let
              occupation = `occupation-${index}`,
              Duration = `Duration-${index}`;
            return (
               <div className="container-fuild p-4 my-3 border1">
                 <Row gutter={[20, 20]} className="py-0">
                    <Col md={24} lg={12} sm={24} xs={24} style={{paddingLeft:'0px'}}>
                       <h4>Occupation</h4>
                       <select className="form-select w-100"
                        name={"occupation"+index} id={occupation} data-id={index}
                        aria-label="Default select example"
                        value={state.FirstAssesment.subjective[index].occupation}
                        // value={state.FirstAssesment.subjective[index].occupation}
                        onChange={(e) => handleChange("occupation", e.target.value, index)}
                      >
                        <option selected></option>
                        <option value="Desk Job">Desk Job</option>
                        <option value="Standing">Standing</option>
                        <option value="Field Work">Field Work</option>
                      </select>
                    </Col>
                       {/* <Col md={12} lg={12} sm={12} xs={12}> */}
                    {/* </Col> */}
                 
                    <Col md={24} lg={12} sm={24} xs={24}>
                      <h4>Duration</h4>
                      <Radio.Group required options={['0-8 hours','0-4 hours','Above 8 hours','Flexible']} onChange={(e) => handleChange("duration", e.target.value,index)} value={state.FirstAssesment.subjective[index].duration}>
                      </Radio.Group>
                    </Col>
                  </Row>
                </div>
            )
          }
          )
          }
          </Col>
        

          <div className="row py-0 mx-1">
            <div className="col" style={{paddingLeft:'0px'}}>
              <button type="button" disabled={state.FirstAssesment.subjective.length===3?true:false} onClick={() => handleAddFields()} class="btn btn-primary ">+</button>
              <button type="button" disabled={state.FirstAssesment.subjective.length<=1?true:false} onClick={() => handleRemoveFields()} class="btn btn-primary mx-2">-</button>

            </div>

          </div>

        </div>

        <div className="container-fuild">
          <Row gutter={[20, 20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Chief Complaint</b></h4>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24}>
              <input type="text" className="p-2 w-50" placeholder="Cheif Complaint"
                name="chiefCom"
                value={state.FirstAssesment.chiefCom}
                onChange={(e) => {
                    handleChange("chiefCom", e.target.value.length>1?e.target.value[0].toUpperCase()+e.target.value.slice(1, e.target.value.length):e.target.value.length===1?e.target.value.toUpperCase():'')
                }}
              />
            </Col>
          </Row>
        </div>

        <Row gutter={[10, 10]} className="py-3">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h4><b>History Of Presenting Complaint</b></h4>
          </Col>
          <Col md={24} lg={24} sm={24} xs={24} className="mx-2" style={{paddingLeft:'0px'}}>
          <Radio.Group options={['Sudden','Gradual','History of Fail','Any other injury']} onChange={(e) => handleChange("History", e.target.value)} value={state.FirstAssesment.History}>
   
            </Radio.Group>
            {/* <div className="row " name="History" value={state.FirstAssesment.History} onChange={(e) => handleChange("History", e.target.value)}>
              <div className="col  form-check-inline"><input type="radio" value="Sudden" name="History" /> Sudden</div>
              <div className="col  form-check-inline"><input type="radio" value="Gradual" name="History" /> Gradual</div>
              <div className="col  form-check-inline"><input type="radio" value="History of fall" name="History" />History of fall</div>
              <div className="col  form-check-inline"><input type="radio" value="Any other injury" name="History" /> Any other injury</div>
            </div> */}
          </Col>
        </Row>

        <div className="container-fuild">
          <Row gutter={[10, 10]} className="pb-1">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Past Medical History</b></h4>
            </Col>
          </Row>

          <Row gutter={[20, 20]} className="py-0">
            <Col md={24} lg={24} sm={24} xs={24} className="ms-0">
            <Checkbox.Group
                style={{ paddingLeft: "0px" }}
                name="past Medical History"
                value={state.FirstAssesment.past_medical_history}
                onChange={(e) => handleChange("past_medical_history", e)}
                options={plainOptions1}
              />
                <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                name="Medication"
                value={state.FirstAssesment.Medication1}
                onChange={(e) =>{
                   setMedic(!medic)
                   handleChange("medicCheck",medic)
                   handleChange("Medication1",e)
                  }}
                options={['Medication']}
              />
                <input class="mx-3 p-2" type="text" disabled={medic} value={state.FirstAssesment.Medication} onChange={(e) => {
                    handleChange("Medication", e.target.value.length>1?e.target.value[0].toUpperCase()+e.target.value.slice(1, e.target.value.length):e.target.value.length===1?e.target.value.toUpperCase():'')
                }} name='medText' placeholder="Medication" />
                <br/>
                <Checkbox.Group
                style={{ paddingLeft: "0px" }}
                name="Others"
                value={state.FirstAssesment.Others1}
                onChange={(e) => {
                  setOthers(!others)
                  handleChange('othCheck',others)
                  handleChange('Others1',e)
                }}
                options={['Others']}
              />
                <input class="mx-3 p-2" onChange={(e)=>{
                    handleChange('Others',e.target.value.length>1?e.target.value[0].toUpperCase()+e.target.value.slice(1, e.target.value.length):e.target.value.length===1?e.target.value.toUpperCase():'')
                }} value={state.FirstAssesment.Others} disabled={others} type="text" name='othText' placeholder="Others" />
              {/* <div className="row" name="past_medical_history" >
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="Diabetes" onChange={(e) => handleChange("Diabetes", e.target.checked)} value={state.FirstAssesment.Diabetes} />
                  <label class="form-check-label" for="inlineCheckbox1">Diabetes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="HYN" onChange={(e) => handleChange("HYN", e.target.checked)} value={state.FirstAssesment.HYN} />
                  <label class="form-check-label" for="inlineCheckbox2">HYN</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="COPD" onChange={(e) => handleChange("COPD", e.target.checked)} value={state.FirstAssesment.COPD} />
                  <label class="form-check-label" for="inlineCheckbox3">COPD</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="Cardiac" onChange={(e) => handleChange("Cardiac", e.target.checked)} value={state.FirstAssesment.Cardiac} />
                  <label class="form-check-label" for="inlineCheckbox4">Cardiac</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="Medication" onChange={(e) => handleChange("Medication", e.target.checked)} value={state.FirstAssesment.Medication} />
                  <label class="form-check-label" for="inlineCheckbox5">Medication</label>
                  <input class="mx-5 p-2" type="text" name='medText' placeholder="Medication" />
                </div>
              </div>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24} className="p-0" name="past_check">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox6" onChange={(e) => handleChange("Other", e.target.checked)} value={state.FirstAssesment.Other} />
                <label class="form-check-label" for="inlineCheckbox6">Other</label>
                <input class="mx-5 p-2" type="text" name='othText' placeholder="Other" />
              </div> */}
            </Col>
          </Row>
        </div>

        <div className="container-fuild">
          <Row gutter={[10, 10]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Built Type</b></h4>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24} className="mx-2 p-0">
              {/* <div className="row" name="Built" value={state.FirstAssesment.Built} onChange={(e) => handleChange("Built", e.target.value)}
              >
                <div className="col  form-check-inline">
                  <input type="radio" value="ectomorphic"
                    name="Built"
                  /> Ectomorphic</div>
                <div className="col  form-check-inline"><input type="radio" value="mesomorphic"
                  name="Built"
                /> Mesomorphic</div>
                <div className="col  form-check-inline"><input type="radio" value="endomorphic"
                  name="Built"
                />Endomorphic</div>

              </div> */}
              <Radio.Group options={['Ectomorphic','Mesomorphic','Endomorphic']} onChange={(e) => handleChange("Built", e.target.value)} value={state.FirstAssesment.Built}>
   
              </Radio.Group>
            </Col>
          </Row>
        </div>

        {/* <Form form={form} layout="vertical">
        <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Recent History"
                  name="RecentHistory"
                  value={state.FirstAssesment.RecentHistory}
                  defaultValue={state.FirstAssesment.RecentHistory}
                  onChange={handleChange} required={true} />
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Trauma / Hospitalization History "
                  name="Trauma"
                  value={state.FirstAssesment.Trauma}
                  defaultValue={state.FirstAssesment.Trauma}
                  onChange={handleChange} required={true} />
              </Col>
        </Row>

        <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Special Test "
                  name="Test"
                  value={state.FirstAssesment.Test}
                  defaultValue={state.FirstAssesment.Test}
                  onChange={handleChange} required={true} />
            </Col>
          </Row> 
          <Row gutter={[10, 10]} className="px-0 py-4 pb-0" style={{ marginBottom: -0 }}>
          
            <Col md={12} lg={12} sm={24} xs={24}>
              <Dragger {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"
                customRequest={dummyRequest}
               onChange={ async (e)=>{
                let files=[]
                await  e.fileList.forEach((data)=>{files.push(data.originFileObj)})
                console.log(files)
                handleChange('TraumaFile',files)
               }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
              </Col>
        </Row>
        </Form> */}


      </div>

      }
      {/* <Body back={back} next={next}/> */}

      <div className="border1 mb-3 mt-0 text-center" style={{ background: '#fff', padding: '20px' }}>
<>
     {/* <Button style={{backgroundColor:'#2d7ecb'}} className="" onClick={() => { onClick("FullBody") }}>Full Body</Button>
     <Row>
         <Col md={24} lg={24} sm={24} xs={24} className="text-center"> 
             <div id="malefigures" ref={myRef}>
                 <div id="mobile-muscle-map"><img alt="body-img" id="mobilebg" src={MobBackground} alt="male-background" />
                     <img alt="body-img11" alt="body-img" className="FullBody" id="traps-a1" src={TrapsLeft} alt="male-1" onClick={() => { handleClick("TrapsA", "traps-a1") }} />
                     <img alt="body-img22" alt="body-img" className="FullBody" id="traps-b2" src={Trapsright} alt="male-2" onClick={() => { handleClick("TrapsB", "traps-b2") }} />
                     <img alt="body-img33" alt="body-img" className="FullBody" id="shoulders-a1" src={DeltoidsA} alt="male-3" onClick={() => { handleClick("ShoulderA", "shoulders-a1") }} />
                     <img alt="body-img44" alt="body-img" className="FullBody" id="shoulders-b2" src={DeltoidsB} alt="male-4" onClick={() => { handleClick("ShoulderB", "shoulders-b2") }} />
                     <img alt="body-img55" alt="body-img" className="FullBody" id="pecs1" src={Pecs} alt="male-5" onClick={() => { handleClick("Pecs", "pecs1") }} />
                     <img alt="body-img66" alt="body-img" className="FullBody" id="biceps-a1" src={bicepsA} alt="male-6" onClick={() => { handleClick("BicepsA", "biceps-a1") }} />
                     <img alt="body-img77" alt="body-img" className="FullBody" id="biceps-b2" src={bicepsB} alt="male-7" onClick={() => { handleClick("BicepsB", "biceps-b2") }} />
                     <img alt="body-img88" alt="body-img" className="FullBody" id="forearm-a1" src={forearmA} alt="male-8" onClick={() => { handleClick("ForearmsA", "forearm-a1") }} />
                     <img alt="body-img99" alt="body-img" className="FullBody" id="forearm-b2" src={forearmB} alt="male-9" onClick={() => { handleClick("ForearmsB", "forearm-a2") }} />
                     <img alt="body-img98" alt="body-img" className="FullBody" id="obliques1" src={obliques} alt="male-10" onClick={() => { handleClick("Abdominals", "obliques1") }} />
                     <img alt="body-img97" alt="body-img" className="FullBody" id="quads-a1" src={quadsA} alt="male-11" onClick={() => { handleClick("QuadsA", "quads-a1") }} />
                     <img alt="body-img96" alt="body-img" className="FullBody" id="quads-b2" src={quadsB} alt="male-12" onClick={() => { handleClick("QuadsB", "quads-b2") }} />
                     <img alt="body-img95" alt="body-img" className="FullBody" id="calves-a1" src={calvesA} alt="male-13" onClick={() => { handleClick("CalvesA", "calves-a1") }} />
                     <img alt="body-img94" alt="body-img" className="FullBody" id="calves-b2" src={calvesB} alt="male-14" onClick={() => { handleClick("CalvesB", "calves-a2") }} />
                     <img alt="body-img93" alt="body-img" className="FullBody" id="back-traps-a1" src={backtrapsA} alt="male-15" onClick={() => { handleClick("BacktrapsA", "back-traps-a1") }} />
                     <img alt="body-img92" className="FullBody" id="back-traps-b2" src={backtrapsB} alt="male-16" onClick={() => { handleClick("BacktrapsB", "back-traps-a2") }} />
                     <img alt="body-img91" className="FullBody" id="back-shoulders-a1" src={backshouldersA} alt="male-17" onClick={() => { handleClick("BackshouldersA", "back-shoulders-a1") }} />
                     <img alt="body-img89" className="FullBody" id="back-shoulders-b2" src={backshouldersB} alt="male-18" onClick={() => { handleClick("BackshouldersB", "back-shoulders-a2") }} />
                     <img alt="body-img87" className="FullBody" id="triceps-a1" src={tricepsA} alt="male-19" onClick={() => { handleClick("TricepsA", "triceps-a1") }} />
                     <img alt="body-img86" className="FullBody" id="triceps-b2" src={tricepsB} alt="male-20" onClick={() => { handleClick("TricepsB", "triceps-a2") }} />
                     <img alt="body-img85" className="FullBody" id="back-lats-a1" src={backLatsA} alt="male-21" onClick={() => { handleClick("LatsA", "back-lats-a1") }} />
                     <img alt="body-img84" className="FullBody" id="back-lats-b2" src={backLatsB} alt="male-22" onClick={() => { handleClick("LatsB", "back-lats-a2") }} />
                     <img alt="body-img83" className="FullBody" id="back-lower1" src={backlower} alt="male-23" onClick={() => { handleClick("LowerBack", "back-lower1") }} />
                     <img alt="body-img82" className="FullBody" id="back-forearms-a1" src={backforearmsA} alt="male-24" onClick={() => { handleClick("BackforearmsA", "back-forearms-a1") }} />
                     <img alt="body-img81" className="FullBody" id="back-forearms-b2" src={backforearmsB} alt="male-25" onClick={() => { handleClick("BackforearmsB", "back-forearms-a2") }} />
                     <img alt="body-img80" className="FullBody" id="back-glutes1" src={backglutes} alt="male-26" onClick={() => { handleClick("Glutes", "back-glutes1") }} />
                     <img alt="body-img79" className="FullBody" id="back-hamstrings-a1" src={backhamstringsA} alt="male-27" onClick={() => { handleClick("HamstringsA", "back-hamstrings-a1") }} />
                     <img alt="body-img78" className="FullBody" id="back-hamstrings-a2" src={backhamstringsB} alt="male-28" onClick={() => { handleClick("HamstringsB", "back-hamstrings-a2") }} />
                     <img alt="body-img76" className="FullBody" id="back-calves-a1" src={backcalvesA} alt="male-29" onClick={() => { handleClick("BackcalvesA", "back-calves-a1") }} />
                     <img alt="body-img75" className="FullBody" id="back-calves-b2" src={backcalvesB} alt="male-30" onClick={() => { handleClick("BackcalvesB", "back-calves-a2") }} />
                 </div>

                 <div id="muscle-map"><img alt="body-img" id="background" src={background} alt="male-background-1" />
                     <img alt="body-img74" className="FullBody" id="traps-a" src={TrapsLeft} alt="male-31" onClick={() => { handleClick("TrapsA", "traps-a") }} />
                     <img alt="body-img73" className="FullBody" id="traps-b" src={Trapsright} alt="male-32" onClick={() => { handleClick("TrapsB", "traps-b") }} />
                     <img alt="body-img72" className="FullBody" id="shoulders-a" src={DeltoidsA} alt="male-33" onClick={() => { handleClick("ShoulderA", "shoulders-a") }} />
                     <img alt="body-img71" className="FullBody" id="shoulders-b" src={DeltoidsB} alt="male-34" onClick={() => { handleClick("ShoulderB", "shoulders-b") }} />
                     <img alt="body-img70" className="FullBody" id="pecs" src={Pecs} alt="male-35" onClick={() => { handleClick("Pecs", "pecs") }} />
                     <img alt="body-img69" className="FullBody" id="biceps-a" src={bicepsA} alt="male-36" onClick={() => { handleClick("BicepsA", "biceps-a") }} />
                     <img alt="body-img68" className="FullBody" id="biceps-b" src={bicepsB} alt="male-37" onClick={() => { handleClick("BicepsB", "biceps-b") }} />
                     <img alt="body-img67" className="FullBody" id="forearm-a" src={forearmA} alt="male-38" onClick={() => { handleClick("ForearmsA", "forearm-a") }} />
                     <img alt="body-img65" className="FullBody" id="forearm-b" src={forearmB} alt="male-39" onClick={() => { handleClick("ForearmsB", "forearm-b") }} />
                     <img alt="body-img64" className="FullBody" id="obliques" src={obliques} alt="male-40" onClick={() => { handleClick("Abdominals", "obliques") }} />
                     <img alt="body-img63" className="FullBody" id="quads-a" src={quadsA} alt="male-41" onClick={() => { handleClick("QuadsA", "quads-a") }} />
                     <img alt="body-img62" className="FullBody" id="quads-b" src={quadsB} alt="male-42" onClick={() => { handleClick("QuadsB", "quads-b") }} />
                     <img alt="body-img61" className="FullBody" id="calves-a" src={calvesA} alt="male-43" onClick={() => { handleClick("CalvesA", "calves-a") }} />
                     <img alt="body-img59" className="FullBody" id="calves-b" src={calvesB} alt="male-44" onClick={() => { handleClick("CalvesB", "calves-b") }} />
                     <img alt="body-img58" className="FullBody" id="back-traps-a" src={backtrapsA} alt="male-45" onClick={() => { handleClick("BacktrapsA", "back-traps-a") }} />
                     <img alt="body-img57" className="FullBody" id="back-traps-b" src={backtrapsB} alt="male-46" onClick={() => { handleClick("BacktrapsB", "back-traps-b") }} />
                     <img alt="body-img56" className="FullBody" id="back-shoulders-a" src={backshouldersA} alt="male-47" onClick={() => { handleClick("BackshouldersA", "back-shoulders-a") }} />
                     <img alt="body-img54" className="FullBody" id="back-shoulders-b" src={backshouldersB} alt="male-48" onClick={() => { handleClick("BackshouldersB", "back-shoulders-b") }} />
                     <img alt="body-img53" className="FullBody" id="triceps-a" src={tricepsA} alt="male-49" onClick={() => { handleClick("TricepsA", "triceps-a") }} />
                     <img alt="body-img52" className="FullBody" id="triceps-b" src={tricepsB} alt="male-50" onClick={() => { handleClick("TricepsB", "triceps-b") }} />
                     <img alt="body-img51" className="FullBody" id="back-lats-a" src={backLatsA} alt="male-51" onClick={() => { handleClick("LatsA", "back-lats-a") }} />
                     <img alt="body-img101" className="FullBody" id="back-lats-b" src={backLatsB} alt="male-52" onClick={() => { handleClick("LatsB", "back-lats-b") }} />
                     <img alt="body-img102" className="FullBody" id="back-lower" src={backlower} alt="male-53" onClick={() => { handleClick("LowerBack", "back-lower") }} />
                     <img alt="body-img103" className="FullBody" id="back-forearms-a" src={backforearmsA} alt="male-54" onClick={() => { handleClick("BackforearmsA", "back-forearms-a") }} />
                     <img alt="body-img104" className="FullBody" id="back-forearms-b" src={backforearmsB} alt="male-55" onClick={() => { handleClick("BackforearmsB", "back-forearms-b") }} />
                     <img alt="body-img105" className="FullBody" id="back-glutes" src={backglutes} alt="male-56" onClick={() => { handleClick("Glutes", "back-glutes") }} />
                     <img alt="body-img106" className="FullBody" id="back-hamstrings-a" src={backhamstringsA} alt="male-57" onClick={() => { handleClick("HamstringsA", "back-hamstrings-a") }} />
                     <img alt="body-img107" className="FullBody" id="back-hamstrings-b" src={backhamstringsB} alt="male-58" onClick={() => { handleClick("HamstringsB", "back-hamstrings-b") }} />
                     <img alt="body-img108" className="FullBody" id="back-calves-a" src={backcalvesA} alt="male-59" onClick={() => { handleClick("BackcalvesA", "back-calves-a") }} />
                     <img alt="body-img109" className="FullBody" id="back-calves-b" src={backcalvesB} alt="male-60" onClick={() => { handleClick("BackcalvesB", "back-calves-b") }} />
                 </div>
             </div>
         </Col>
     </Row> */}
<Body executeScroll={executeScroll} screenShotRef={screenShotRef} />

 </>


 <div style={{ display: QuestionVisibility }} className=" border mb-3 mt-3">
     <Row className="border1">
         <Col md={24} lg={24} sm={24} xs={24}>
             <h4 className="p-2">Questionnaire KOOS score</h4>
         </Col>
     </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={24} lg={24} sm={24} xs={24}>
             <Descriptions title={state.FirstAssesment.Questionnaire.template_name} bordered>
               {state.FirstAssesment.question_heading.map((data,index)=>(data!=="description"&&<Descriptions.Item label={data}>{Math.round(state.FirstAssesment.KOOS[index])}</Descriptions.Item>))}
                 {/* <Descriptions.Item label="KOOS Symptoms">{Math.round(state.FirstAssesment.KOOS[0])}</Descriptions.Item>
                 <Descriptions.Item label="KOOS Stiffness">{Math.round(state.FirstAssesment.KOOS[1])}</Descriptions.Item>
                 <Descriptions.Item label="KOOS Pain">{Math.round(state.FirstAssesment.KOOS[2])}</Descriptions.Item>
                 <Descriptions.Item label="KOOS Daily Life">{Math.round(state.FirstAssesment.KOOS[3])}</Descriptions.Item>
                 <Descriptions.Item label="KOOS Sports">{Math.round(state.FirstAssesment.KOOS[4])}</Descriptions.Item>
                 <Descriptions.Item label="KOOS Quality of Life">{Math.round(state.FirstAssesment.KOOS[5])}</Descriptions.Item> */}
             </Descriptions>
         </Col>
     </Row>
 </div>
 {posture&&<div className=" 1 mb-3 mt-3">
     <Row className="border1">
         <Col md={24} lg={24} sm={24} xs={24}>
             <h4 className="p-2">Posture Analysis</h4>
         </Col>
     </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
     <Col md={24} lg={24} sm={24} xs={24}>
         <Descriptions title="" >
            <Descriptions.Item label="Notes ">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['Notes'] }</Descriptions.Item>
              </Descriptions>
         </Col>
        </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={24} lg={24} sm={24} xs={24}>
             <Descriptions title="Anterior" bordered>
                 <Descriptions.Item label="Nasal Bridge">{Object.keys(state.FirstAssesment.posture).length > 0 &&state.FirstAssesment.posture['Posterial_view'].Angles[0]}</Descriptions.Item>
                 <Descriptions.Item label="Shoulder levels(Acrimion)">{Object.keys(state.FirstAssesment.posture).length > 0 &&state.FirstAssesment.posture['Posterial_view'].Angles[1]}</Descriptions.Item>
                 <Descriptions.Item label="Umbilicus">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['Posterial_view'].Angles[2]}</Descriptions.Item>
                 <Descriptions.Item label="Knees">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['Posterial_view'].Angles[3]}</Descriptions.Item>
                 <Descriptions.Item label="Ankle/Foot">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['Posterial_view'].Angles[4]}</Descriptions.Item>
             </Descriptions>
         </Col>
         {state.FirstAssesment.FrontCheck.length>0&&<Col md={24} lg={24} sm={24} xs={24}>
         <Descriptions title="">
           {state.FirstAssesment.FrontCheck.map(ob=><Descriptions.Item label=""><Badge color="#000000" />{ob}</Descriptions.Item>)}
             </Descriptions>
         </Col>}
     </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={24} lg={24} sm={24} xs={24}>
             <Descriptions title="Lateral" bordered>
                 <Descriptions.Item label="Head deviation">{Object.keys(state.FirstAssesment.posture).length > 0 &&state.FirstAssesment.posture['lateral_view'].Angles[0]}</Descriptions.Item>
                 <Descriptions.Item label="Shoulder">{Object.keys(state.FirstAssesment.posture).length > 0 &&state.FirstAssesment.posture['lateral_view'].Angles[1]}</Descriptions.Item>
                 <Descriptions.Item label="Hip/Pelvic Deviation">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['lateral_view'].Angles[2]}</Descriptions.Item>
                 <Descriptions.Item label="Knees Deviation">{Object.keys(state.FirstAssesment.posture).length > 0&&state.FirstAssesment.posture['lateral_view'].Angles[3]}</Descriptions.Item>
             </Descriptions>
         </Col>
         {state.FirstAssesment.SideCheck.length>0&&<Col md={24} lg={24} sm={24} xs={24}>
         <Descriptions title="">
           {state.FirstAssesment.SideCheck.map(ob=><Descriptions.Item label=""><Badge color="#000000" />{ob}</Descriptions.Item>)}
             </Descriptions>
         </Col>}
     </Row>
 </div>}
 {state.FirstAssesment.pain_state && <div className=" border1 mb-3 mt-3">
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={24} lg={24} sm={24} xs={24}>
             <Descriptions title="Pain Assessment" bordered>
                 <Descriptions.Item label="Nature Of Pain">{state.FirstAssesment.nature_of_pain_here}</Descriptions.Item>
                 <Descriptions.Item label="Swelling">{state.FirstAssesment.pain_swelling}</Descriptions.Item>
                 <Descriptions.Item label="Pain Aggravating">{state.FirstAssesment.pain_aggravating_here.map(d => d + ",")}</Descriptions.Item>
                 <Descriptions.Item label="Pain Relieving">{state.FirstAssesment.pain_relieving_here.map(d => d + ",")}</Descriptions.Item>
                 <Descriptions.Item label="Pain Scale">{state.FirstAssesment.pain_scale}</Descriptions.Item>
                 <Descriptions.Item label="Scars">{state.FirstAssesment.pain_scars}</Descriptions.Item>
             </Descriptions>
         </Col>
     </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={24} lg={24} sm={24} xs={24}>
             <Descriptions title="Sensory Inputs" bordered>
                 <Descriptions.Item label="Superficial">{state.FirstAssesment.superficial}</Descriptions.Item>
                 <Descriptions.Item label="Deep">{state.FirstAssesment.deep}</Descriptions.Item>
                 <Descriptions.Item label="cortial">{state.FirstAssesment.cortial}</Descriptions.Item>
             </Descriptions>
         </Col>
     </Row>
 </div>}
 {<div  style={{ display: state.FirstAssesment.special_visibility }} className=" border1 mb-3 mt-3" >
        <Row className="border1">
          <Col lg={18} md={18} sm={18} xs={24}>
            {state.FirstAssesment.shoulder ||
            state.FirstAssesment.Ankle ||
            state.FirstAssesment.Cervical_Spine ||
            state.FirstAssesment.Thoracic_Spine ||
            state.FirstAssesment.Lumbar_Spine ||
            state.FirstAssesment.Forearm_wrist_Hand ||
            state.FirstAssesment.Hip ||
            state.FirstAssesment.Knee ||
            state.FirstAssesment.Elbow ? (
              <h4 className="p-2">
                <u>Special Test</u>
              </h4>
            ) : (
              ""
            )}
          </Col>
        </Row>
            {state.FirstAssesment.shoulder&&Object.keys(state.FirstAssesment.shoulder).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
            {/* {data.Ankle&&<><Descriptions.Item label="Ankle"><Descriptions.Item>{data.Ankle&&data.Ankle.map(er=><>{er[0]}{" : "}{er[1]==1?" pass ":" fail "}<br/></>)}</Descriptions.Item></Descriptions.Item></>} */}
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Shoulder </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                    <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.shoulder).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
      
        
          {state.FirstAssesment.ankle&&Object.keys(state.FirstAssesment.ankle).length>0 && (
               <Row gutter={[10, 10]} className="px-4 py-2">
               <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Ankle </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.ankle).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
              </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row> 
            )}
          {state.FirstAssesment.elbow&&Object.keys(state.FirstAssesment.elbow).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Elbow </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.elbow).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.hip&&Object.keys(state.FirstAssesment.hip).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Hip </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.hip).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.knee&&Object.keys(state.FirstAssesment.knee).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Knee </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.knee).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.cervical_spine&&Object.keys(state.FirstAssesment.cervical_spine).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Cervical Spine </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.cervical_spine).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.thoracic_spine&&Object.keys(state.FirstAssesment.thoracic_spine).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Thoracic Spine </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.thoracic_spine).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.lumbar_spine&&Object.keys(state.FirstAssesment.lumbar_spine).length>0&& (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Lumbar Spine </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.lumbar_spine).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
          {state.FirstAssesment.forearm&&Object.keys(state.FirstAssesment.forearm).length>0 && (
        <Row gutter={[10, 10]} className="px-4 py-2">
          <Col lg={12} md={18} sm={12} xs={12}>
              <>
                <Descriptions.Item label="" span={3}>
                  <b>Forearm_wrist_Hand </b>
                </Descriptions.Item>
                <table style={{ width: `${screen.width / 2}px` }} border="1px">
                  <tr>
                  <td style={{ width: "80%" }}>
                      {" "}
                      <center>Questions</center>
                    </td>
                    <td style={{ width: "20%" }}>
                      <center>Pass/Fail</center>
                    </td>
                  </tr>
                  {Object.entries(state.FirstAssesment.forearm).map((an) => (
                    <tr>
                      <td>{an[0]}</td>
                      <td>
                        <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                      </td>
                    </tr>
                  ))}
                </table>
              </>
          </Col>
          <Col lg={12} md={18} sm={12} xs={12}></Col>
        </Row>
            )}
      </div>}
 <div style={{ display: RomVisibility }} className=" border mb-3 mt-3">
     <Row className="border">
         <Col md={24} lg={24} sm={24} xs={24}>
             <h4 className="p-2">ROM Assesment</h4>
         </Col>
     </Row>
     <Row gutter={[10, 10]} className="px-4 py-2">
         <Col md={12} lg={12} sm={24} xs={24}>
             <Table pagination={false} columns={columns} dataSource={tableData} />
         </Col>
         <Col md={12} lg={12} sm={24} xs={24}>
             <Table pagination={false} columns={columns} dataSource={tableData1} />
         </Col>
     </Row>
 </div>

</div>
{/* <Row>
      <Col md={2} lg={2} sm={2} xs={2}>
        </Col>
        <Col style={{paddingLeft:'50px'}} md={21} lg={21} sm={21} xs={21}>
          <div>
          <Checkbox checked={!state.FirstAssesment.quest} style={{paddingLeft:'15px',margin:0}} onChange={(e)=>handleChange('quest',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.pain1} style={{paddingLeft:'112px'}} onChange={(e)=>handleChange('pain1',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.special} style={{paddingLeft:'105px'}} onChange={(e)=>handleChange('special',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.pose} style={{paddingLeft:'90px'}} onChange={(e)=>handleChange('pose',!e.target.checked)}></Checkbox>
          <Checkbox checked={!state.FirstAssesment.romAss} style={{paddingLeft:'100px'}} onChange={(e)=>handleChange('romAss',!e.target.checked)}></Checkbox>
          </div>
        </Col>
        <Col md={1} lg={1} sm={1} xs={1}>
        </Col>
  </Row> */}
      <Row>
  <Col style={{paddingTop:'23px'}} md={20} lg={20} sm={20} xs={20}>
    
    </Col>

  </Row> 
{/* <Row>
      <Col md={1} lg={1} sm={1} xs={1}>
        </Col>
        <Col className="text-center" md={20} lg={20} sm={20} xs={20}>
        {/* {state.FirstAssesment.quest?<Button type="text" disabled={state.FirstAssesment.quest} className="btn-new-check" style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button> :
        <Button type="text" disabled={state.FirstAssesment.quest} style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>
        } */}
        {/* if any problem with color of button refer styles/App.css on line 1073 and 1576 */}
                {/* {state.FirstAssesment.pain1?<Button  className="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={() => history.push('/assesment/PainAssessment')} ant-click-animating-without-extra-node="false">Pain Assessment</Button>:
                <Button  className="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={() => history.push('/assesment/PainAssessment')} ant-click-animating-without-extra-node="false">Pain Assessment</Button>
                }
                {state.FirstAssesment.special?<button class="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>:
                <button class="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>
                }
                {state.FirstAssesment.pose?<button class="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')} ant-click-animating-without-extra-node="false">Pose Test</button>:
                <button class="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')} ant-click-animating-without-extra-node="false">Pose Test</button>
                }
                {state.FirstAssesment.romAss?<Button htmlType="submit" style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} className="ms-3 btn-new-check" onClick={Rom} id="rom">Rom Assessment</Button>:
                <Button htmlType="submit" style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} className="ms-3" onClick={Rom} id="rom">Rom Assessment</Button>
                } */}
                {/* <Button className="ms-3" >save</Button> */}
                {/* <Button htmlType="submit" style={{backgroundColor:'#2d7ecb'}} className="ms-3" onClick={Submit}>Submit</Button>
        </Col>
        <Col md={1} lg={1} sm={1} xs={1}>
        </Col>
      </Row> */}
       <Row>
        <Col className="text-center" style={{paddingBottom:'10px'}} md={24} lg={24} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.quest} style={{paddingRight:'10px'}} onChange={(e)=>handleChange('quest',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.quest?<Button type="text" disabled={state.FirstAssesment.quest} className="btn-new-check" style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>:
          <Button type="text" disabled={state.FirstAssesment.quest} style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>}
          {/* if any problem with color of button refer styles/App.css on line 1073 and 1576 */}
          <Checkbox checked={!state.FirstAssesment.pain1} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('pain1',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.pain1?<button  className="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={goPain} ant-click-animating-without-extra-node="false">Pain Assessment</button>:
                <button  className="ms-3 ant-btn" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={goPain} ant-click-animating-without-extra-node="false">Pain Assessment</button>
                }
         
         <Checkbox checked={!state.FirstAssesment.special} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('special',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.special?<button class="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>:
                <button class="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>
                }
      
      <Checkbox checked={!state.FirstAssesment.pose} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('pose',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.pose?<button class="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')} ant-click-animating-without-extra-node="false">Posture Test</button>:
                <button class="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')} ant-click-animating-without-extra-node="false">Posture Test</button>
                }
         
         <Checkbox checked={!state.FirstAssesment.romAss} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('romAss',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.romAss?<Button htmlType="submit" style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} className="ms-3 btn-new-check" onClick={Rom} id="rom">AROM Assessment</Button>:
                <Button htmlType="submit" style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} className="ms-3" onClick={Rom} id="rom">AROM Assessment</Button>
                }
         
          {/* <Button className="ms-3" >save</Button> */}
        
        </Col>
        <Col md={2} lg={2} sm={2} xs={2}>
        </Col>
     </Row>
<div className="text-center mb-3">
<Button htmlType="submit" style={{backgroundColor:'#2d7ecb'}} className="ms-3" onClick={Submit}>Submit</Button>
</div>
    </div >
    
  )
}

export default Assesment1