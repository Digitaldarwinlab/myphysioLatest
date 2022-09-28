import React, { useState, useEffect, useCallback } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { AiFillMedicineBox } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { DropdownApi } from "../../API/Dropdown/Dropdown";
import {
  Select,
  Row,
  Col,
  Input,
  Form,
  Upload,
  Button,
  Checkbox,
  Modal,
  Space,
  Radio,
  Tabs,
  Badge,
  Switch,
  Spin,
} from "antd";
import {
  ASSESMENT_CLEARSTATE,
  ASSESSMENT_ADD_SUB_INPUT,
  ASSESSMENT_REMOVE_SUB_INPUT,
  ASSESSMENT_SUBJECTIVE,
  STATECHANGE,
} from "../../contextStore/actions/Assesment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormInput from "../UI/antInputs/FormInput";
import FormTextArea from "../UI/antInputs/FormTextArea";
import FormDate from "../UI/antInputs/FormDate";
// import Body from './Body';
import Body from "../Assesment/Body/Body";
{
  /* aswin 10/25/2021 start */
}
import html2canvas from "html2canvas";
import moment from "moment";
import ActiveSearch from "../UtilityComponents/ActiveSearch";
{
  /* aswin 10/25/2021 start */
}
import "../../styles/Layout/Body.css";
import { AssesmentAPI } from "../../API/Assesment/assementApi";
import { getEpisode } from "../../API/Episode/EpisodeApi";
import { RECEIVED_DATA } from "../../contextStore/actions/Assesment";
import JointData from "../UtilityComponents/dummyData/MuscleMap.json";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
// aswin 10/24/2021 start
import { notification, Descriptions, Table } from "antd";
import "./Assesment1.css";
// aswin 10/24/2021 stop
import TrapsLeft from "./../../assets/Crops/08TrapsLeft.webp";
import Trapsright from "./../../assets/Crops/08.-TrapsRight.webp";
import DeltoidsA from "./../../assets/Crops/07.A-Deltoids.webp";
import DeltoidsB from "./../../assets/Crops/07.B-Deltoids.webp";
import Pecs from "./../../assets/Crops/06.-Pecs.webp";
import bicepsA from "./../../assets/Crops/05.A-Biceps.webp";
import bicepsB from "./../../assets/Crops/05.B-Biceps.webp";
import forearmA from "./../../assets/Crops/14.A-Forearms.webp";
import forearmB from "./../../assets/Crops/14.B-Forearms.webp";
import obliques from "./../../assets/Crops/04.-Obliques.webp";
import quadsA from "./../../assets/Crops/01.A-Quads.webp";
import quadsB from "./../../assets/Crops/01.B-Quads.webp";
import calvesA from "./../../assets/Crops/13.A-Calves.webp";
import calvesB from "./../../assets/Crops/13.B-Calves.webp";
import backtrapsA from "./../../assets/Crops/08.B-Traps.webp";
import backtrapsB from "./../../assets/Crops/08.C-Traps.webp";
import backshouldersA from "./../../assets/Crops/07.C-Deltoids.webp";
import backshouldersB from "./../../assets/Crops/07.D-Deltoids.webp";
import tricepsA from "./../../assets/Crops/09.A-Triceps.webp";
import tricepsB from "./../../assets/Crops/09.B-Triceps.webp";
import backLatsA from "./../../assets/Crops/10.A-Lats.webp";
import backLatsB from "./../../assets/Crops/10.B-Lats.webp";
import backlower from "./../../assets/Crops/15.-Lower-Back.webp";
import backforearmsA from "./../../assets/Crops/14.C-Forearms.webp";
import backforearmsB from "./../../assets/Crops/14.D-Forearms.webp";
import backglutes from "./../../assets/Crops/11.-Glutes.webp";
import backhamstringsA from "./../../assets/Crops/12.A-Hamstrings.webp";
import backhamstringsB from "./../../assets/Crops/12.B-Hamstrings.webp";
import backcalvesA from "./../../assets/Crops/13.C-Calves.webp";
import backcalvesB from "./../../assets/Crops/13.D-Calves.webp";
import background from "./../../assets/Crops/00.-Blank-Figures.webp";
import MobBackground from "./../../assets/Crops//mobilebg.webp";
import { useRef } from "react";
import { tableLabelLateral, tableLabels } from "../episode-visit-details/Assessment/AssessmentList";
import Loading from "../UtilityComponents/Loading";
import { SpinnerCircularSplit } from 'spinners-react';

const muscle = [
  "TrapsA",
  "TrapsB",
  "BacktrapsA",
  "BacktrapsB",
  "ShoulderA",
  "ShoulderB",
  "Pecs",
  "BackshouldersA",
  "BackshouldersB",
  "BicepsA",
  "BicepsB",
  "ForearmsA",
  "ForearmsB",
  "BackforearmsA",
  "BackforearmsB",
  "Abdominals",
  "QuadsA",
  "QuadsB",
  "CalvesA",
  "CalvesB",
  "BackcalvesA",
  "BackcalvesB",
  "TricepsA",
  "TricepsB",
  "LatsA",
  "LatsB",
  "LowerBack",
  "Glutes",
  "HamstringsA",
  "HamstringsB",
];

// const override =  React.CSSProperties({
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// })

const marks1 = {
  0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
  1: <MehOutlined style={{ fontSize: 25, color: "limegreen" }} />,
  2: <FrownOutlined style={{ fontSize: 25, color: "orange" }} />,
  3: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
};

const marks = {
  0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
  2: <i class="far fa-smile" style={{ fontSize: 25, color: "lime" }}></i>,
  4: <i class="far fa-meh" style={{ fontSize: 25, color: "limegreen" }}></i>,
  6: (
    <i class="far fa-frown" style={{ fontSize: 25, color: "lightsalmon" }}></i>
  ),
  8: <i class="far fa-frown" style={{ fontSize: 25, color: "orange" }}></i>,
  10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
};

const desc = ["no pain", "mild", "moderate", "severe"];

const { Dragger } = Upload;

var pdfjsLib = window["pdfjs-dist/build/pdf"];
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

const Assesment1 = ({ back, next }) => {
  const [dropdownValue, setDropdownValue] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await DropdownApi("Assesment");
      console.log(data)
      setDropdownValue(data.Assesment)
    }
    getData();
  }, []);
  const assesmentRef = useRef(null);
  const state = useSelector((state) => state);
  const [form] = Form.useForm();
  const myRef = useRef(null);
  const screenShotRef = useRef(null);
  const executeScroll = () => screenShotRef.current.scrollIntoView();
  // console.log(state.episodeReducer.patient_code +'patient_code')
  const [episodedata, SetepisodeData] = useState();
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [latL, setLatL] = useState([]);
  const [latR, setLatR] = useState([]);
  useEffect(async () => {
    //aswin 10/25/2021 start
    // if (props1.history.location.state) {
    //   state.FirstAssesment.Type = props1.history.location.state.type
    // }
    //aswin 10/25/2021 stop
    sessionStorage.removeItem("submit");
    sessionStorage.removeItem("posesubmit");
    sessionStorage.removeItem("specialsubmit");
    const data = await getEpisode(state.episodeReducer.patient_code);
    if (data[0]) {
      state.FirstAssesment.episode_id = data[0].pp_ed_id;
      SetepisodeData({
        episodeId: data[0].pp_ed_id,
        complaintId: data[0].primary_complaint,
        start_date: data[0].start_date,
      });
    } else {
      SetepisodeData({
        episodeId: "No data",
        complaintId: "no data",
        start_date: "no data",
      });
    }
  }, [state.episodeReducer.patient_name]);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (
        location.pathname != "/assesment/Questions" &&
        location.pathname != "/assessment/AI" &&
        location.pathname != "/assesment/PainAssessment" &&
        location.pathname != "/assesment/SpecialTest" &&
        location.pathname != "/assesment/PoseTest" &&
        location.pathname != "/assessment/AROM" &&
        state.FirstAssesment.episode_id != ""
      ) {
        console.log("not cleared");
        //aswin 11/11/2021 start
        if (sessionStorage.getItem("submit")) {
          sessionStorage.removeItem("submit");
          return;
        }
        //aswin 11/11/2021 stop
        if (window.confirm("Assesment data will be lost. Is it okay?")) {
          dispatch({ type: ASSESMENT_CLEARSTATE });
          dispatch({ type: "JOINT_CLEARSTATE" });
          console.log("Assesment data cleared");
          localStorage.setItem("OnAssessmentScreen", false);
          localStorage.removeItem("AI_Data");
          dispatch({
            type: STATECHANGE,
            payload: {
              key: "Anterior_AI_Data",
              value: "",
            },
          });
          dispatch({
            type: STATECHANGE,
            payload: {
              key: "LeftLateral_AI_Data",
              value: "",
            },
          });
          dispatch({
            type: STATECHANGE,
            payload: {
              key: "RightLateral_AI_Data",
              value: "",
            },
          });
          localStorage.removeItem("Posture_Data");
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
  }, [history, state.FirstAssesment.episode_id]);
  const OnAssesmentPage = () => {
    notification.error({
      message: "Please switch off video conf button to move to other pages",
      placement: "bottomLeft",
      duration: 2,
    });
  };
  const setJoints = useCallback(
    (joints) => {
      console.log(joints);
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "allJoint",
          value: joints,
        },
      });
    },
    [dispatch]
  );

  const com = () => {
    return <h1>hello world</h1>;
  };
  useEffect(() => {
    console.log("assesment state is printing");
    console.log(state.FirstAssesment.Type);
  }, []);

  const [tempstate, setTemp] = useState(true);
  useEffect(() => {
    if (state.FirstAssesment.Type == "First") setPhysicalVisibility("block");
    else setPhysicalVisibility("none");
  }, [state.FirstAssesment.Type]);

  {
    /* aswin 10/25/2021 start */
  }
  const [date, setDate] = useState();
  {
    /* aswin 10/25/2021 stop */
  }
  const [visibility, setVisibility] = useState("none");

  const [physicalVisibility, setPhysicalVisibility] = useState("none");
  const [files, setFiles] = useState([]);

  const [fileType, setFileType] = useState(false);
  console.log("files ", files);

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const Questions = () => {
    history.push("/assesment/Questions");
  };
  const handleChange = (key, value, id = 0) => {
    //alert(value+", "+key+" , "+id)
    if (key === "chiefCom" || key === "Medication" || key === "Others") {
      if (value.length > 0) {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: value[0].toUpperCase() + value.slice(1, value.length),
          },
        });
      }
    }
    if (key === "Date") {
      setDate(value.date);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: value.dateString,
        },
      });
    } else if (key === "ScareFile") {
      console.log("files ", value);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value,
        },
      });
      setFiles([...files, value]);
    } else if (key === "TraumaFile") {
      console.log("files ", value);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value,
        },
      });
      setFiles([...files, value]);
    } else if (
      key === "occupation" ||
      key === "duration" ||
      key === "Sports_type"
    ) {
      dispatch({
        type: ASSESSMENT_SUBJECTIVE,
        payload: {
          key,
          value,
          id,
        },
      });
    } else {
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value,
        },
      });
    }
    dispatch({ type: "NOERROR" });
  };

  const handleUploadScars = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer");

    changeThumb(e, thumbnailBox);
  };

  const handleUploadTrauma = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer1");
    console.log(e);
    changeThumb(e, thumbnailBox);
  };

  const changeThumb = (e, thumbnailBox) => {
    if (e != undefined) {
      var filein;
      var file;
      if (e.type == "drop") {
        filein = e.target.value;
      } else {
        filein = e.target.files;
      }

      console.log(filein);
      setVisibility("block");

      for (var i = 0; i < filein.length; i++) {
        if (e.type == "drop") {
          file = filein[i];
        } else {
          file = filein[i];
        }
        if (file.type == "application/pdf") {
          var fileReader = new FileReader();
          fileReader.onload = function () {
            var pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            var loadingTask = pdfjsLib.getDocument({ data: pdfData });
            loadingTask.promise.then(
              function (pdf) {
                console.log("PDF loaded");

                // Fetch the first page
                var pageNumber = 1;
                pdf.getPage(pageNumber).then(function (page) {
                  console.log("Page loaded");

                  var scale = 0.1;
                  var viewport = page.getViewport({ scale: scale });

                  // Prepare canvas using PDF page dimensions
                  var canvas = document.createElement("canvas");
                  canvas.style.padding = "10px";
                  var context = canvas.getContext("2d");
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  // Render PDF page into canvas context
                  var renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                  };
                  var renderTask = page.render(renderContext);
                  thumbnailBox.appendChild(canvas);
                  renderTask.promise.then(function () {
                    console.log("Page rendered");
                  });
                });
              },
              function (reason) {
                // PDF loading error
                console.error(reason);
              }
            );
          };
          fileReader.readAsArrayBuffer(file);
        } else {
          setFileType(true);
        }
      }
    }
  };

  const { Option } = Select;

  const { TextArea } = Input;

  const props = {
    showUploadList: fileType,
  };

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  console.log("state inassesment");
  console.log(state);
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  // gaurav 5/12/21
  const [chief, setChief] = useState();

  const [inputFields, setInputFields] = useState([
    { Occupation: "", Duration: "" },
  ]);

  let plainOptions1 = ["Diabetes", "HYN", "COPD", "Cardiac"];
  const [medic, setMedic] = useState(true);
  const [others, setOthers] = useState(true);
  const [Surgical_History_Notes, SetSurgical_History_Notes] = useState(true);
  const handleAddFields = () => {
    // setInputFields([...inputFields, { Occupation: '', Duration: '' }])
    dispatch({
      type: ASSESSMENT_ADD_SUB_INPUT,
      payload: { type: "subjective" },
    });
  };

  const handleRemoveFields = (index) => {
    // const values = [...inputFields];
    // values.splice(index, 1);
    // setInputFields(values);
    dispatch({
      type: ASSESSMENT_REMOVE_SUB_INPUT,
      payload: { type: "subjective" },
    });
  };

  const [MuscleJoint, setMuscleJoint] = useState({});

  const [BodyParts, setBodyParts] = useState([]);

  const [FullBody, setFullBody] = useState(false);

  const [MaleFemale, setMaleFemale] = useState(false);

  const [QuestionVisibility, setQuestionVisibility] = useState("block");

  const [posture, setPosture] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false)
  const [RomVisibility, setRomVisibility] = useState("none");
  const [RomVisibilityM, setRomVisibilityM] = useState("none");
  const [RomVisibilityL, setRomVisibilityL] = useState("none");
  const [RomVisibilityR, setRomVisibilityR] = useState("none");

  const [angleValues, setAngleValues] = useState({
    leftShoulder: "",
    rightShoulder: "",
    leftElbow: "",
    rightElbow: "",
    leftHipAdductionAdbuction: "",
    rightHipAdductionAdbuction: "",
    leftNeck: "",
    rightNeck: "",
    leftPelvic: "",
    rightPelvic: "",
  });

  const [angleValuesL, setAngleValuesL] = useState({
    leftShoulder: "",
    leftHip: "",
    cervicalForwardFlexion: "",
    leftKnee: "",
    leftWrist: "",
    leftAnkle: "",
  });
  const [angleValuesR, setAngleValuesR] = useState({
    rightShoulder: "",
    rightHip: "",
    cervicalForwardFlexion: "",
    rightKnee: "",
    rightWrist: "",
    rightAnkle: "",
  });

  useEffect(() => {
    form.resetFields();
  }, [history]);
  const assesmentstate = useSelector((state) => state.FirstAssesment);

  // useEffect(()=>{

  // },[assesmentstate])

  const formatter = (value) => {
    return `${desc[value]}`;
  };

  const columns = [
    {
      title: "Angles",
      dataIndex: "angles",
      key: "angles",
    },
    {
      title: "Min",
      dataIndex: "min",
      key: "min",
      render: (number) => Math.round(number),
    },
    {
      title: "Max",
      dataIndex: "max",
      key: "max",
      render: (number) => Math.round(number),
    },
  ];

  //   const tableData = [
  //       {
  //           key: '1',
  //           angles: 'L Shoulder Abd/Add',
  //           min: angleValues.leftShoulder.min,
  //           max: angleValues.leftShoulder.max
  //       },
  //       {
  //           key: '2',
  //           angles: 'R Shoulder Abd/Add',
  //           min: angleValues.rightShoulder.min,
  //           max: angleValues.rightShoulder.max
  //       },
  //       {
  //           key: '3',
  //           angles: 'L Elbow Flex',
  //           min: angleValues.leftElbow.min,
  //           max: angleValues.leftElbow.max
  //       },
  //       {
  //           key: '4',
  //           angles: 'R Elbow Flex',
  //           min: angleValues.rightElbow.min,
  //           max: angleValues.rightElbow.max
  //       },
  //       {
  //           key: '5',
  //           angles: 'L Cervical Side flex',
  //           min: angleValues.leftNeck.min,
  //           max: angleValues.leftNeck.max
  //       },
  //       {
  //           key: '6',
  //           angles: 'R Cervical Side flex',
  //           min: angleValues.rightNeck.min,
  //           max: angleValues.rightNeck.max
  //       }

  //   ]

  //   const tableData1 = [
  //       {
  //           key: '7',
  //           angles: 'L Hip Fwd Flex',
  //           min: angleValues.leftHipAdductionAdbuction.min,
  //           max: angleValues.leftHipAdductionAdbuction.max
  //       }, {
  //           key: '8',
  //           angles: 'R Hip Fwd Flex',
  //           min: angleValues.rightHipAdductionAdbuction.min,
  //           max: angleValues.rightHipAdductionAdbuction.max
  //       }, {
  //           key: '10',
  //           angles: 'L Lateral Side Flex',
  //           min: angleValues.leftPelvic.min,
  //           max: angleValues.leftPelvic.max
  //       }, {
  //           key: '11',
  //           angles: 'R Lateral Side Flex',
  //           min: angleValues.rightPelvic.min,
  //           max: angleValues.rightPelvic.max
  //       }
  //   ]

  //   const tableDataL = [
  //     {
  //       key: '1',
  //       angles: 'L Shoulder Abd/Add',
  //       min: angleValuesL.leftShoulder.min,
  //       max: angleValuesL.leftShoulder.max
  //   },
  //   {
  //     key: '7',
  //     angles: 'L Hip Abd/Add',
  //     min: angleValuesL.leftHip.min,
  //     max: angleValuesL.leftHip.max
  // },
  //  {
  //     key: '9',
  //     angles: 'Cervical Fwd Flex',
  //     min: angleValuesL.cervicalForwardFlexion.min,
  //     max: angleValuesL.cervicalForwardFlexion.max
  // },
  // {
  //   key: '11',
  //   angles: 'L Knee Abd/Add',
  //   min: angleValuesL.leftKnee.min,
  //   max: angleValuesL.leftKnee.max
  // },
  // {
  //   key: '13',
  //   angles: 'L Wrist',
  //   min: angleValuesL.leftWrist.min,
  //   max: angleValuesL.leftWrist.max
  // },
  //  {
  //     key: '15',
  //     angles: 'L Ankle',
  //     min: angleValuesL.leftAnkle.min,
  //     max: angleValuesL.leftAnkle.max
  // },
  // ]
  // const tableDataR = [
  //   {
  //     key: '1',
  //     angles: 'R Shoulder Abd/Add',
  //     min: angleValuesR.rightShoulder.min,
  //     max: angleValuesR.rightShoulder.max
  // },
  // {
  //   key: '7',
  //   angles: 'R Hip Abd/Add',
  //   min: angleValuesR.rightHip.min,
  //   max: angleValuesR.rightHip.max
  // },
  // {
  //   key: '9',
  //   angles: 'Cervical Fwd Flex',
  //   min: angleValuesR.cervicalForwardFlexion.min,
  //   max: angleValuesR.cervicalForwardFlexion.max
  // },
  // {
  // key: '11',
  // angles: 'R Knee Abd/Add',
  // min: angleValuesR.rightKnee.min,
  // max: angleValuesR.rightKnee.max
  // },
  // {
  // key: '13',
  // angles: 'R Wrist',
  // min: angleValuesR.rightWrist.min,
  // max: angleValuesR.rightWrist.max
  // },
  // {
  //   key: '15',
  //   angles: 'R Ankle',
  //   min: angleValuesR.rightAnkle.min,
  //   max: angleValuesR.rightAnkle.max
  // },
  // ]

  const setAnteriorData = (data) => {
    console.log("anterior ", data)
    if (Object.keys(data).length > 0) {
      // let data = state.FirstAssesment.Anterior_AI_Data;
      setRomVisibility("contents");
      let TEMP = {};
      TEMP["AROM"] = data[Object.keys(data)[0]];
      console.log(TEMP);
      let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
        (item, index) => {
          let t = {};
          t["key"] = index;
          t["angles"] = tableLabels[item] ? tableLabels[item] : "Not Available";
          t["min"] = Math.round(data[Object.keys(data)[0]]["angles"][item].min);
          t["max"] = Math.round(data[Object.keys(data)[0]]["angles"][item].max);
          return t;
        }
      );
      setTableData1(tempData.slice(0, 6));
      if (tempData.length > 6) {
        setTableData2(tempData.slice(6, tempData.length));
      }
    }
  };

  const setLeftLateralData = (data) => {
    console.log("left ", data)
    if (Object.keys(data).length > 0) {
      //  let data = state.FirstAssesment.LeftLateral_AI_Data;
      setRomVisibilityM("inline");
      setRomVisibilityL("inline");
      let TEMP = {};
      TEMP["AROM"] = data[Object.keys(data)[0]];
      console.log(TEMP);
      let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
        (item, index) => {
          let t = {};
          t["key"] = index;
          t["angles"] = tableLabelLateral[item] ? tableLabelLateral[item] : "Not Available";
          t["min"] = Math.round(data[Object.keys(data)[0]]["angles"][item].min);
          t["max"] = Math.round(data[Object.keys(data)[0]]["angles"][item].max);
          return t;
        }
      );
      setLatL(tempData);
    }
  };

  const setRightLateralData = (data) => {
    console.log("right ", data)
    if (Object.keys(data).length > 0) {
      setRomVisibilityM("inline");
      setRomVisibilityR("inline");
      // let data = state.FirstAssesment.RightLateral_AI_Data;
      let TEMP = {};
      TEMP["AROM"] = data[Object.keys(data)[0]];
      console.log(TEMP);
      let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
        (item, index) => {
          let t = {};
          t["key"] = index;
          t["angles"] = tableLabelLateral[item] ? tableLabelLateral[item] : "Not Available";
          t["min"] = Math.round(data[Object.keys(data)[0]]["angles"][item].min);
          t["max"] = Math.round(data[Object.keys(data)[0]]["angles"][item].max);
          return t;
        }
      );
      setLatR(tempData);
    }
  };
  function checkDataReceived() {
    var romData = localStorage.getItem("AI_Data");
    var postureData = localStorage.getItem("Posture_Data");
    if (romData != "" && romData != null) {
      console.log("Arom data")
      var romdatajson = JSON.parse(romData);
      console.log(romdatajson.Anterior);
      if (romdatajson.Anterior != undefined && romdatajson.Anterior !== '' && Object.keys(romdatajson.Anterior)[0] != '0') {
        //  state.FirstAssesment.Anterior_AI_Data = romdatajson.Anterior;
        dispatch({
          type: STATECHANGE,
          payload: {
            key: 'Anterior_AI_Data',
            value: romdatajson.Anterior,
          },
        });
        setAnteriorData(romdatajson.Anterior);
      }
      if (romdatajson.leftLateral != undefined && romdatajson.leftLateral !== '' && Object.keys(romdatajson.leftLateral)[0] != '0') {
        console.log()
        // state.FirstAssesment.LeftLateral_AI_Data = romdatajson.leftLateral;
        dispatch({
          type: STATECHANGE,
          payload: {
            key: 'LeftLateral_AI_Data',
            value: romdatajson.leftLateral,
          },
        });
        setLeftLateralData(romdatajson.leftLateral);
      }
      if (romdatajson.rightLateral != undefined && romdatajson.rightLateral !== '' && Object.keys(romdatajson.rightLateral)[0] != '0') {
        // state.FirstAssesment.RightLateral_AI_Data = romdatajson.rightLateral;
        dispatch({
          type: STATECHANGE,
          payload: {
            key: 'RightLateral_AI_Data',
            value: romdatajson.rightLateral,
          },
        });
        setRightLateralData(romdatajson.rightLateral);
      }
      localStorage.removeItem("AI_Data");
    }
    if (postureData != "" && postureData != null) {
      console.log("Posture data")
      var posturedatajson = JSON.parse(postureData);
      console.log(posturedatajson);

      dispatch({
        type: STATECHANGE,
        payload: {
          key: "posture",
          value: posturedatajson,
        },
      });
      setPosture(true);
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "FrontCheck",
          value: JSON.parse(localStorage.getItem("FrontCheck")),
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "SideCheck",
          value: JSON.parse(localStorage.getItem("SideCheck")),
        },
      });
      setPosture(true);
      localStorage.removeItem("Posture_Data");
    } else {
      console.log(postureData, romData);
    }
  }
  //To detect change in localStorage
  // window.addEventListener("storage", checkDataReceived);
  useEffect(() => {
    // checkDataReceived()
    window.addEventListener("storage", checkDataReceived);
    return () => {
      window.removeEventListener("storage", checkDataReceived);
    };
  }, []);
  window.addEventListener('load', () => localStorage.setItem("OnAssessmentScreen", false))
  useEffect(
    () => {
      const question = document.getElementById("question");
      const rom = document.getElementById("rom");
      const rom_manual = document.getElementById("rom_manual");
      const posture_btn = document.getElementById("posture-btn");

      if (state.FirstAssesment.KOOS === "") {
        question.innerHTML = "Scales & Index";
        //  question.innerHTML = " "
        setQuestionVisibility("none");
      } else {
        question.innerHTML = "Scales & Index";
        // question.innerHTML = " "
        question.style.backgroundColor = "honeydew";
        question.style.borderColor = "limegreen";
        setQuestionVisibility("inline");
      }
      // setQuestionVisibility('none')
      if (Object.keys(state.FirstAssesment.posture).length > 0) {
        posture_btn.innerHTML = "Posture Done";
        setPosture(true);
      }
      // Check if AI_Data
      if (
        (state.FirstAssesment.Anterior_AI_Data &&
          Object.keys(state.FirstAssesment.Anterior_AI_Data).length > 0) ||
        Object.keys(state.FirstAssesment.LeftLateral_AI_Data).length > 0 ||
        Object.keys(state.FirstAssesment.RightLateral_AI_Data).length > 0
      ) {
        if (state.FirstAssesment.Arom_M) {
          rom_manual.innerHTML = "AROM calculated";
        } else {
          rom_manual.innerHTML = "AROM (Manual)";
        }
        if (state.FirstAssesment.Arom_Ai) {
          rom.innerHTML = "AROM calculated";
        } else {
          rom.innerHTML = "AROM (using AI)";
        }
        // rom.innerHTML = "AROM Assesment";
        // setRomVisibility('contents')
        if (Object.keys(state.FirstAssesment.Anterior_AI_Data).length > 0) {
          let data = state.FirstAssesment.Anterior_AI_Data;
          setRomVisibility("contents");
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
            (item, index) => {
              let t = {};
              t["key"] = index;
              t["angles"] = tableLabels[item]
                ? tableLabels[item]
                : "Not Available";
              t["min"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].min
              );
              t["max"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].max
              );
              return t;
            }
          );
          setTableData1(tempData.slice(0, 6));
          if (tempData.length > 6) {
            setTableData2(tempData.slice(6, tempData.length));
          }

          //   setAngleValues(preValues => ({
          //     ...preValues,
          //     ['leftShoulder']: Anterior_AI_Data["leftShoulder"],
          //     ['rightShoulder']: Anterior_AI_Data["rightShoulder"],
          //     ['leftElbow']: Anterior_AI_Data["leftElbow"],
          //     ['rightElbow']: Anterior_AI_Data["rightElbow"],
          //     ['leftHipAdductionAdbuction']: Anterior_AI_Data["leftHipAdductionAbduction"],
          //     ['rightHipAdductionAdbuction']: Anterior_AI_Data["rightHiAdductionAbduction"],
          //     ['leftPelvic']: Anterior_AI_Data["leftPelvic"],
          //     ['rightPelvic']: Anterior_AI_Data["rightPelvic"],
          //     ['leftNeck']: Anterior_AI_Data["leftNeck"],
          //     ['rightNeck']: Anterior_AI_Data["rightNeck"],
          // }))
        }
        if (Object.keys(state.FirstAssesment.LeftLateral_AI_Data).length > 0) {
          let data = state.FirstAssesment.LeftLateral_AI_Data;
          setRomVisibilityM("inline");
          setRomVisibilityL("inline");
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
            (item, index) => {
              let t = {};
              t["key"] = index;
              t["angles"] = tableLabelLateral[item]
                ? tableLabelLateral[item]
                : "Not Available";
              t["min"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].min
              );
              t["max"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].max
              );
              return t;
            }
          );
          setLatL(tempData);
          //  setAngleValuesL(state.FirstAssesment.LeftLateral_AI_Data);
          //   setAngleValuesL(preValues => ({
          //     ...preValues,
          //     ['leftShoulder']: LeftLateral_AI_Data["leftShoulder"],
          //     ['leftHip']: LeftLateral_AI_Data["leftHip"],
          //     ['cervicalForwardFlexion']: LeftLateral_AI_Data["cervicalForwardFlexion"],
          //     ['leftKnee']: LeftLateral_AI_Data["leftKnee"],
          //     ['leftWrist']: LeftLateral_AI_Data["leftWrist"],
          //     ['leftAnkle']: LeftLateral_AI_Data["leftAnkle"],
          // }))
        }
        if (Object.keys(state.FirstAssesment.RightLateral_AI_Data).length > 0) {
          setRomVisibilityM("inline");
          setRomVisibilityR("inline");
          let data = state.FirstAssesment.RightLateral_AI_Data;
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          let tempData = Object.keys(data[Object.keys(data)[0]]["angles"]).map(
            (item, index) => {
              let t = {};
              t["key"] = index;
              t["angles"] = tableLabelLateral[item]
                ? tableLabelLateral[item]
                : "Not Available";
              t["min"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].min
              );
              t["max"] = Math.round(
                data[Object.keys(data)[0]]["angles"][item].max
              );
              return t;
            }
          );
          setLatR(tempData);
          // setAngleValuesR(state.FirstAssesment.RightLateral_AI_Data);
          //   setAngleValuesR(preValues => ({
          //     ...preValues,
          //     ['rightShoulder']: RightLateral_AI_Data["rightShoulder"],
          //     ['rightHip']: RightLateral_AI_Data["rightHip"],
          //     ['cervicalForwardFlexion']: RightLateral_AI_Data["cervicalForwardFlexion"],
          //     ['rightKnee']: RightLateral_AI_Data["rightKnee"],
          //     ['rightWrist']: RightLateral_AI_Data["rightWrist"],
          //     ['rightAnkle']: RightLateral_AI_Data["rightAnkle"]
          // }))
        }

        rom.style.backgroundColor = "honeydew";
        rom.style.borderColor = "limegreen";
      }
    },
    angleValues,
    state.FirstAssesment
  );
  // NOTE: Above useEffect does same thing, repeated code
  // useEffect(() => {
  //     function checkUserData() {
  //         var AI = JSON.parse(localStorage.getItem("AI_Data"))
  //         var data = JSON.parse(localStorage.getItem("ExerciseName"))
  //         //  console.log(AI,data)
  //         state.FirstAssesment.Exercise_Name = data
  //         state.FirstAssesment.AI_data = AI
  //         const exercise = state.FirstAssesment.Exercise_Name
  //        const AI_Data = state.FirstAssesment.AI_data[exercise].angles
  //        const Anterior_AI_Data = state.FirstAssesment.Anterior_AI_Data[Object.keys(state.FirstAssesment.Anterior_AI_Data)[0]].angles
  //        const LeftLateral_AI_Data = state.FirstAssesment.LeftLateral_AI_Data[Object.keys(state.FirstAssesment.LeftLateral_AI_Data)[0]].angles
  //        const RightLateral_AI_Data = state.FirstAssesment.RightLateral_AI_Data[Object.keys(state.FirstAssesment.RightLateral_AI_Data)[0]].angles
  //        // const AI_Data = JSON.parse(localStorage.getItem("AI_Data")).Squat.angles

  //         console.log("Ai data in body.js from localstorage: ", AI_Data)

  //         rom.innerHTML = "AROM Assement calculated"
  //         rom.style.backgroundColor = "honeydew"
  //         rom.style.borderColor = "limegreen"
  //         setRomVisibility('block')
  //         setAngleValues(preValues => ({
  //           ...preValues,
  //           ['leftShoulder']: Anterior_AI_Data["Left Shoulder(ver)"],
  //           ['rightShoulder']: Anterior_AI_Data["Right Shoulder(ver)"],
  //           ['leftElbow']: Anterior_AI_Data["Left Elbow"],
  //           ['rightElbow']: Anterior_AI_Data["Right Elbow"],
  //           ['leftHip']: Anterior_AI_Data["Left Hip"],
  //           ['rightHip']: Anterior_AI_Data["Right Hip"],
  //           ['leftKnee']: Anterior_AI_Data["Left Knee"],
  //           ['rightKnee']: Anterior_AI_Data["Right Knee"],
  //           ['leftNeck']: Anterior_AI_Data["Neck Left"],
  //           ['rightNeck']: Anterior_AI_Data["Neck Right"],
  //           ['leftPelvic']: Anterior_AI_Data["Pelvic Left"],
  //           ['rightPelvic']: Anterior_AI_Data["Pelvic Right"]
  //       }))
  //       setAngleValuesL(preValues => ({
  //         ...preValues,
  //         ['leftShoulder']: LeftLateral_AI_Data["Left Shoulder(ver)"],
  //         ['leftElbow']: LeftLateral_AI_Data["Left Elbow"],
  //         ['leftHip']: LeftLateral_AI_Data["Left Hip"],
  //         ['leftKnee']: LeftLateral_AI_Data["Left Knee"],
  //         ['leftNeck']: LeftLateral_AI_Data["Neck Left"],
  //         ['leftPelvic']: LeftLateral_AI_Data["Pelvic Left"],
  //     }))
  //     setAngleValuesR(preValues => ({
  //       ...preValues,
  //       ['rightShoulder']: RightLateral_AI_Data["Right Shoulder(ver)"],
  //       ['rightElbow']: RightLateral_AI_Data["Right Elbow"],
  //       ['rightHip']: RightLateral_AI_Data["Right Hip"],
  //       ['rightKnee']: RightLateral_AI_Data["Right Knee"],
  //       ['rightNeck']: RightLateral_AI_Data["Neck Right"],
  //       ['rightPelvic']: RightLateral_AI_Data["Pelvic Right"]
  //   }))

  //     }

  //     window.addEventListener('storage', checkUserData)

  //     return () => {
  //         window.removeEventListener('storage', checkUserData)
  //     }
  // }, [])

  const handleChange1 = (key, value, id = 0) => {
    dispatch({
      type: STATECHANGE,
      payload: {
        key,
        value,
      },
    });
    dispatch({ type: "NOERROR" });
  };

  const handleClick = async (e, id) => {
    console.log(e, " : ", id);
    const index = BodyParts.indexOf(e);
    //    console.log(BodyParts)
    var ele = document.getElementById(id);

    if (index === -1) {
      const MappedJoint = JointData[e];

      const dummyData = { ...MuscleJoint };

      for (let i = 0; i < MappedJoint.length; i++) {
        if (MappedJoint[i] in dummyData) {
          dummyData[MappedJoint[i]] += 1;
        } else {
          dummyData[MappedJoint[i]] = 1;
        }
      }

      setMuscleJoint(dummyData);

      const Body = [...BodyParts, e];
      setBodyParts(Body);
      ele.style.opacity = "1";
    } else {
      const MappedJoint = JointData[e];
      const dummyData = { ...MuscleJoint };

      for (let i = 0; i < MappedJoint.length; i++) {
        if (MappedJoint[i] in dummyData) {
          dummyData[MappedJoint[i]] -= 1;

          if (dummyData[MappedJoint[i]] === 0) {
            delete dummyData[MappedJoint[i]];
          }
        }
      }
      setMuscleJoint(dummyData);
      const Body = [...BodyParts];
      Body.splice(index, 1);
      setBodyParts(Body);
      ele.style.opacity = "0";
    }
    executeScroll();
    let div = document.getElementById("malefigures");
    let can = await html2canvas(div);
    let url = can.toDataURL();
    //handleChange1('body_image',url)
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "body_image",
        value: url,
      },
    });
    dispatch({ type: "NOERROR" });
  };

  const RomAI = () => {
    console.log(!state.jointReducer.joints);
    // if (!state.jointReducer.joints.length > 0) {
    //   warningJoint();
    //   return false;
    // }
    let temp = [];
    state.jointReducer.joints.map((jo) => {
      temp.push(...jo.joint);
    });
    temp = [...new Set(temp)];
    console.log(temp);
    console.log("values ", MuscleJoint);
    console.log("values ", BodyParts);
    history.push({
      pathname: "/assessment/AI",
      // state: {
      //   Joints: temp,
      //   Muscles: BodyParts,
      //   prevpath: "/assesment",
      // },
    });
    //  console.log(Object.keys(MuscleJoint));
  };

  const Rom = () => {
    history.push("/assessment/AROM");
  };
  const goPain = () => {
    if (state.jointReducer.joints.length === 0) {
      warningJoint();
      return;
    }
    history.push("/assesment/PainAssessment");
  };

  const onClick = async () => {
    if (FullBody === false) {
      var ele = document.getElementsByClassName("FullBody");
      const dummyData = { ...MuscleJoint };
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

      for (var i = 0, len = ele.length | 0; i < len; i = (i + 1) | 0) {
        ele[i].style.opacity = "1";
      }
      setFullBody(true);
    } else {
      // eslint-disable-next-line no-redeclare
      var ele = document.getElementsByClassName("FullBody");
      const dummyData = { ...MuscleJoint };
      const Body = [...BodyParts];
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
        Body.splice(0, muscle.length);
        setBodyParts(Body);
        setMuscleJoint(dummyData);
      }

      for (i = 0, len = ele.length | 0; i < len; i = (i + 1) | 0) {
        ele[i].style.opacity = "0";
      }
      setFullBody(false);
    }
    executeScroll();
    let div = document.getElementById("malefigures");
    let can = await html2canvas(div);
    let url = can.toDataURL();
    //handleChange1('body_image',url)
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "body_image",
        value: url,
      },
    });
    dispatch({ type: "NOERROR" });
  };

  function warning() {
    Modal.warning({
      title: "This is a warning message",
      content: "Fields missing: All Mandatory fields should be filled in",
    });
  }
  function warningJoint() {
    Modal.warning({
      title: "This is a warning message",
      content: "Please Select a joint",
    });
  }
  function warningPatientSelect() {
    Modal.warning({
      title: "This is a warning message",
      content: "Please Select a Patient",
    });
  }
  const [videoBtn ,setVideoBtn] = useState(localStorage.getItem("OnAssessmentScreen")=="true"?true:false)
  const videoConChecked = (checked) => {
    // console.log(typeof localStorage.getItem("OnAssessmentScreen"))
    // console.log(typeof checked)
    if(localStorage.getItem("OnAssessmentScreen")=="true"){
      localStorage.setItem("OnAssessmentScreen", 'false');
      setVideoBtn(false)
    }else{
      localStorage.setItem("OnAssessmentScreen", 'true');
      setVideoBtn(true)
    }
    if (checked) {
      notification.success({
        message: "Please move to the video con screen and start assesment!",
        placement: "bottomLeft",
        duration: 5,
      });
    }
  };

  const checkEpisodeId = async () => {
    if (state.episodeReducer.patient_code) {
      const res = await getEpisode(state.episodeReducer.patient_code);
      if (res.length > 0) {
        if (res[0].end_date.length === 0) {
          return "true";
        }
        notification.warning({
          message: "Patient don't have an open episode",
          placement: "topRight",
          duration: 10,
          key: 1,
          style: {
            marginTop: "10vh",
          },
          btn: (
            <Button
              size="small"
              onClick={() => {
                history.push("/add-episode");
                notification.close(1);
              }}
            >
              Add-episode
            </Button>
          ),
        });
        return false;
      } else {
        notification.warning({
          message: "Patient don't have an open episode",
          placement: "topRight",
          duration: 10,
          key: 1,
          style: {
            marginTop: "10vh",
          },
          btn: (
            <Button
              size="small"
              onClick={() => {
                history.push("/add-episode");
                notification.close(1);
              }}
            >
              Add-episode
            </Button>
          ),
        });
      }
    } else {
      notification.warning({
        message: "Please select a patient",
        placement: "bottomLeft",
        duration: 5,
        style: "margin-top:20px",
      });
      return false;
    }
  };

  // aswin 10/30/2021 stop
  const Finalsubmit = async (url) => {
    const res = await getEpisode(state.episodeReducer.patient_code);
    if (res.length > 0 && res[0].end_date.length === 0) {
      if (window.confirm("Assessment data will be submitted")) {
        const data = await AssesmentAPI(state.FirstAssesment, url, dispatch);
        dispatch({ type: RECEIVED_DATA });
        if (data === true) {
          sessionStorage.setItem("submit", true);
          setTimeout(() => {
            dispatch({ type: ASSESMENT_CLEARSTATE });
            dispatch({ type: "JOINT_CLEARSTATE" });
          }, 1000);
          setSubmitLoading(false)
          notification.success({
            message: "Assessment successfully submitted!",
            placement: "bottomLeft",
            duration: 2,
          });

          history.push("/dashboard");
        } else {
          setSubmitLoading(false)
          notification.error({
            message: "Form was not submitted",
            placement: "bottomLeft",
            duration: 2,
          });
        }
      } else {
        setSubmitLoading(false)
      }
      // aswin 11/13/2021 stop
    } else {
      setSubmitLoading(false)
      return notification.warning({
        message: "Patient don't have an open episode",
        placement: "bottomRight",
        duration: 2,
      });
    }
  };
  const Submit = async () => {
    let video = screenShotRef.current;
    setSubmitLoading(true)
    console.log("divvvv ", video);
    console.log(video.id);
    let url = "";
    executeScroll();
    let div = document.getElementById(video.id);
    console.log("divvvv ", video);
    let can = await html2canvas(video);
    url = can.toDataURL();
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "body_image",
        value: url,
      },
    });
    dispatch({ type: "NOERROR" });
    Finalsubmit(url);
  };
  // const [quest, setQuest] = useState(true)
  // const [pain, setPain] = useState(true)
  // const [special, setSpecial] = useState(true)
  // const [pose, setPose] = useState(true)
  // const [romAss, setRomAss] = useState(true)

  return (
    <div className="px-2 assessment_main_new py-2">
      <Form
        style={{
          background: "#fff",
          marginTop: "0px",
          marginBottom: "25px",
          padding: "0px",
        }}
        {...layout}
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
                  history.push("/dashboard");
                }}
                title="Go Back"
                role="button"
              ></i>
            </h3>
            <h3 style={{ paddingTop: "10px" }}>
              <AiFillMedicineBox />
              <b style={{ paddingLeft: "5px" }}>Assesment/Consultation</b>
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

        <Row
          gutter={[20, 20]}
          style={{ marginBottom: "15px", marginTop: "15px" }}
        >
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
            <b> Episode Type : </b>{" "}
            {episodedata ? episodedata.complaintId : null}
          </Col>
          <Col md={24} lg={12} sm={24} xs={24}>
            <b> Start Date : </b> {episodedata ? episodedata.start_date : null}
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
          <Col
            className="AssesmentConsultationMain_inner"
            style={{ marginLeft: "0px", paddingLeft: "0px" }}
            md={12}
            lg={12}
            sm={24}
            xs={24}
          >
            <Form.Item label="Type" name="Type">
              {/* //  rules={[{ required: true, message: `Please Select Type.` }]} > */}
              <Select
                placeholder="Select Type"
                className="w-100 input-field"
                onChange={(value) => handleChange("Type", value)}
                value={state.FirstAssesment.Type}
                defaultValue={state.FirstAssesment.Type}
              >
                {/* aswin 10/24/2021 start */}
                <Option value="First">
                  {state.FirstAssesment.Type === "First" && "First Assesment"}
                </Option>
                {/* aswin 10/24/2021 start */}
                <Option value="Periodic">Periodic</Option>
                {/* <Option value="Consultation">Consultation</Option> */}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <label class="mr-2">VideoCon </label>
            <Switch
              checkedChildren="On"
              unCheckedChildren="Off"
               checked={videoBtn}
              // ? true
              // : false}
              // value={
              //   localStorage.getItem("OnAssessmentScreen") == "true"
              //     ? true
              //     : false
              // }
              onChange={videoConChecked}
            />
          </Col>
        </Row>
      </Form>

      <Row>
        <Col md={24} lg={24} sm={24} xs={24}>
          <h3 className="p-0">
            <b>Physical Assesment</b>
          </h3>
        </Col>
      </Row>

      {state.FirstAssesment.Type === "First" && (
        <div
          className="border1 mb-3 mt-3"
          style={{ background: "#fff", marginTop: "10px", padding: "20px" }}
        >
          <Row gutter={[20, 20]}>
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4>
                <b>Subjective</b>
              </h4>
            </Col>
          </Row>

          <Col md={24} lg={24} sm={24} xs={24} className="mx-0 p-0">
            {state.FirstAssesment.subjective.map((data, index) => {
              let occupation = `occupation-${index}`,
                Duration = `Duration-${index}`;
              return (
                <div className="container-fuild p-4 my-3 border1">
                  <Row gutter={[20, 20]} className="py-0">
                    <Col
                      md={24}
                      lg={12}
                      sm={24}
                      xs={24}
                      style={{ paddingLeft: "0px" }}
                    >
                      <h4>Occupation</h4>
                      {dropdownValue.Occupation !== undefined &&
                      <select
                        className="form-select w-100"
                        name={"occupation" + index}
                        id={occupation}
                        data-id={index}
                        aria-label="Default select example"
                        value={
                          state.FirstAssesment.subjective[index].occupation
                        }
                        // value={state.FirstAssesment.subjective[index].occupation}
                        onChange={(e) =>
                          handleChange("occupation", e.target.value, index)
                        }
                      >
                        <option selected></option>
                        {dropdownValue.Occupation.map(i=><option value={i}>{i}</option>)}
                        {/* <option value="Desk Job">Desk Job</option>
                        <option value="Standing">Standing</option>
                        <option value="Field Work">Field Work</option>
                        <option value="Home Maker">Home Maker</option>
                        <option value="Retired">Retired</option>
                        <option value="Sports">Sports</option> */}
                      </select>
                      }
                    </Col>
                    {/* <Col md={12} lg={12} sm={12} xs={12}> */}
                    {/* </Col> */}

                    <Col
                      md={24}
                      lg={
                        state.FirstAssesment.subjective[index].occupation ===
                          "Sports"
                          ? 5
                          : 12
                      }
                      sm={24}
                      xs={24}
                    >
                      <h4>Duration</h4>
                      <Radio.Group
                        required
                        options={[
                          "0-8 hours",
                          "0-4 hours",
                          "Above 8 hours",
                          "Flexible",
                        ]}
                        onChange={(e) =>
                          handleChange("duration", e.target.value, index)
                        }
                        value={state.FirstAssesment.subjective[index].duration}
                      ></Radio.Group>
                    </Col>
                    {state.FirstAssesment.subjective[index].occupation ===
                      "Sports" && (
                        <Col md={24} lg={6} sm={24} xs={24}>
                          <h4>Sports Type</h4>
                          <input
                            class="mx-3 p-2"
                            onChange={(e) => {
                              handleChange(
                                "Sports_type",
                                e.target.value.length > 1
                                  ? e.target.value[0].toUpperCase() +
                                  e.target.value.slice(
                                    1,
                                    e.target.value.length
                                  )
                                  : e.target.value.length === 1
                                    ? e.target.value.toUpperCase()
                                    : "",
                                index
                              );
                            }}
                            value={
                              state.FirstAssesment.subjective[index].Sports_type
                            }
                            type="text"
                            name={"sports_type" + index}
                            placeholder="Sports Type"
                          />
                        </Col>
                      )}
                  </Row>
                </div>
              );
            })}
          </Col>

          <div className="row py-0 mx-1">
            <div className="col" style={{ paddingLeft: "0px" }}>
              <button
                type="button"
                onClick={() => handleAddFields()}
                class="btn btn-primary "
              >
                +
              </button>
              <button
                type="button"
                disabled={
                  state.FirstAssesment.subjective.length <= 1 ? true : false
                }
                onClick={() => handleRemoveFields()}
                class="btn btn-primary mx-2"
              >
                -
              </button>
            </div>
          </div>

          <div className="container-fuild">
            <Row gutter={[20, 20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4>
                  <b>Chief Complaint</b>
                </h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24}>
                <input
                  type="text"
                  className="p-2 w-50"
                  placeholder="Chief Complaint"
                  name="chiefCom"
                  value={state.FirstAssesment.chiefCom}
                  onChange={(e) => {
                    handleChange(
                      "chiefCom",
                      e.target.value.length > 1
                        ? e.target.value[0].toUpperCase() +
                        e.target.value.slice(1, e.target.value.length)
                        : e.target.value.length === 1
                          ? e.target.value.toUpperCase()
                          : ""
                    );
                  }}
                />
              </Col>
            </Row>
          </div>

          <Row gutter={[10, 10]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4>
                <b>History Of Present Complaint</b>
              </h4>
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              className="mx-2"
              style={{ paddingLeft: "0px" }}
            >
              <Radio.Group
                options={[
                  "Sudden",
                  "Gradual",
                  "History of Fall",
                  "Tumor",
                  "Pregnency",
                  "Metal implants",
                  "Pacemaker-ICD",
                  "Any other injury",
                ]}
                onChange={(e) => handleChange("History", e.target.value)}
                value={state.FirstAssesment.History}
              ></Radio.Group>
            </Col>
          </Row>

          <div className="container-fuild">
            <Row gutter={[10, 10]} className="pb-1">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4>
                  <b>Past Medical History</b>
                </h4>
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
                <Checkbox
                  name="Medication"
                  //  value={state.FirstAssesment.Medication1}
                  onChange={(e) => {
                    setMedic(!medic);
                    handleChange("medicCheck", medic);
                    handleChange("Medication1", e.target.checked);
                  }}
                  value={"Medication"}
                // options={['Medication']}
                >
                  <input
                    class="mx-3 p-2"
                    type="text"
                    disabled={medic}
                    value={state.FirstAssesment.Medication}
                    onChange={(e) => {
                      handleChange(
                        "Medication",
                        e.target.value.length > 1
                          ? e.target.value[0].toUpperCase() +
                          e.target.value.slice(1, e.target.value.length)
                          : e.target.value.length === 1
                            ? e.target.value.toUpperCase()
                            : ""
                      );
                    }}
                    name="medText"
                    placeholder="Medication"
                  />
                </Checkbox>
                <Checkbox
                  style={{ marginLeft: "0px" }}
                  name="Others"
                  // value={state.FirstAssesment.Others1}
                  onChange={(e) => {
                    setOthers(!others);
                    handleChange("othCheck", others);
                    handleChange("Others1", e.target.checked);
                  }}
                  value={"Others"}
                >
                  <input
                    class="mx-3 p-2"
                    style={{ marginTop: "5px" }}
                    onChange={(e) => {
                      handleChange(
                        "Others",
                        e.target.value.length > 1
                          ? e.target.value[0].toUpperCase() +
                          e.target.value.slice(1, e.target.value.length)
                          : e.target.value.length === 1
                            ? e.target.value.toUpperCase()
                            : ""
                      );
                    }}
                    value={state.FirstAssesment.Others}
                    disabled={others}
                    type="text"
                    name="othText"
                    placeholder="Others"
                  />
                </Checkbox>
                <Checkbox
                  style={{ marginLeft: "0px" }}
                  name="Surgical History Notes"
                  value={state.FirstAssesment.Surgical_History_Notes1}
                  onChange={(e) => {
                    SetSurgical_History_Notes(!Surgical_History_Notes);
                    handleChange(
                      "Surgical_History_Notes_check",
                      Surgical_History_Notes
                    );
                    handleChange("Surgical_History_Notes1", e.target.checked);
                  }}
                  options={["Surgical History Notes"]}
                >
                  <input
                    class="mx-3 p-2"
                    style={{ marginTop: "5px" }}
                    onChange={(e) => {
                      handleChange(
                        "Surgical_History_Notes",
                        e.target.value.length > 1
                          ? e.target.value[0].toUpperCase() +
                          e.target.value.slice(1, e.target.value.length)
                          : e.target.value.length === 1
                            ? e.target.value.toUpperCase()
                            : ""
                      );
                    }}
                    value={state.FirstAssesment.Surgical_History_Notes}
                    disabled={Surgical_History_Notes}
                    type="text"
                    name="Surgical_History_NotesText"
                    placeholder="Surgical History Notes"
                  />
                </Checkbox>
              </Col>
            </Row>
          </div>

          <div className="container-fuild">
            <Row gutter={[10, 10]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4>
                  <b>Built Type</b>
                </h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24} className="mx-2 p-0">
                <Radio.Group
                  options={["Ectomorphic", "Mesomorphic", "Endomorphic"]}
                  onChange={(e) => handleChange("Built", e.target.value)}
                  value={state.FirstAssesment.Built}
                ></Radio.Group>
              </Col>
            </Row>
          </div>
          <div className="container-fuild">
            <Row gutter={[20, 20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4>
                  <b>Any Other Details</b>
                </h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24}>
                <input
                  type="text"
                  className="p-2 w-50"
                  placeholder="Any Other Details"
                  name="any_other_details"
                  value={state.FirstAssesment.any_other_details}
                  onChange={(e) => {
                    handleChange(
                      "any_other_details",
                      e.target.value.length > 1
                        ? e.target.value[0].toUpperCase() +
                        e.target.value.slice(1, e.target.value.length)
                        : e.target.value.length === 1
                          ? e.target.value.toUpperCase()
                          : ""
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
      {/* <Body back={back} next={next}/> */}

      <div
        className="border1 mb-3 mt-0 text-center"
        style={{ background: "#fff", padding: "20px" }}
      >
        <>
          <h1 style={{ margin: 0, padding: 0 }}>
            <b>Chief Complaint Area</b>
          </h1>
          <Body executeScroll={executeScroll} screenShotRef={screenShotRef} />
        </>

        <div
          style={{ display: QuestionVisibility }}
          className=" border mb-3 mt-3"
        >
          <Row className="border1">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4 className="p-2">Questionnaire KOOS score</h4>
            </Col>
          </Row>
          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col md={24} lg={24} sm={24} xs={24}>
              <Descriptions
                title={state.FirstAssesment.Questionnaire.template_name}
                bordered
              >
                {state.FirstAssesment.question_heading.map(
                  (data, index) =>
                    data !== "description" && (
                      <Descriptions.Item label={data}>
                        {Math.round(state.FirstAssesment.KOOS[index])}
                      </Descriptions.Item>
                    )
                )}
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
        {posture && (
          <div className=" 1 mb-3 mt-3">
            <Row className="border1">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4 className="p-2">Posture Analysis</h4>
              </Col>
            </Row>
            <Row gutter={[10, 10]} className="px-4 py-2">
              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="">
                  <Descriptions.Item label="Notes ">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Notes"]}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Row>
              <Col md={24} lg={24} sm={24} xs={24}>
                <h2>Degree of Deviation</h2>
                {(state.FirstAssesment.posture.Posterial_view || state.FirstAssesment.posture.lateral_view) && <h3> <Badge color="#000000" />Standing</h3>}
              </Col>
            </Row>
            {state.FirstAssesment.posture.Posterial_view && Object.keys(state.FirstAssesment.posture["Posterial_view"]).length > 0 && <Row gutter={[10, 10]} className="px-4 py-2">
              <Col span={24}><h5>Anterior</h5></Col>
              <Col md={24} lg={18} sm={24} xs={24}>
                <Descriptions bordered>
                  <Descriptions.Item label="Nasal Bridge">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shoulder levels(Acrimion)">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Umbilicus">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Knees">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[3]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ankle/Foot">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[4]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Line of Gravity">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Posterial_view"].Angles[5]}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col md={24} lg={6} sm={24} xs={24}>
                <img
                  src={
                    state.FirstAssesment.posture["Posterial_view"]
                      .posterial_view_image
                  }
                />
              </Col>

              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="">
                  {Object.keys(state.FirstAssesment.posture["Posterial_view"].checkbox).map((ob) => {
                    if (state.FirstAssesment.posture["Posterial_view"].checkbox[ob] == 1) {
                      return (
                        <Descriptions.Item label="">
                          <Badge color="#000000" />
                          {ob}
                        </Descriptions.Item>
                      )
                    }
                  }
                  )}
                </Descriptions>
              </Col>

            </Row>}
            {state.FirstAssesment.posture.lateral_view && Object.keys(state.FirstAssesment.posture["lateral_view"]).length > 0 && <Row gutter={[10, 10]} className="px-4 py-2">
              <Col span={24}><h5>Lateral</h5></Col>
              <Col md={24} lg={18} sm={24} xs={24}>
                <Descriptions bordered>
                  <Descriptions.Item label="Head deviation">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["lateral_view"].Angles[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shoulder">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["lateral_view"].Angles[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Hip/Pelvic Deviation">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["lateral_view"].Angles[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Knees Deviation">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["lateral_view"].Angles[3]}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col md={24} lg={6} sm={24} xs={24}>
                <img
                  src={
                    state.FirstAssesment.posture["lateral_view"]
                      .posterial_view_image
                  }
                />
              </Col>

              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="">
                  {Object.keys(state.FirstAssesment.posture["lateral_view"].checkbox).map((ob) => {
                    if (state.FirstAssesment.posture["lateral_view"].checkbox[ob] == 1) {
                      return (
                        <Descriptions.Item label="">
                          <Badge color="#000000" />
                          {ob}
                        </Descriptions.Item>
                      )
                    }
                  }
                  )}
                </Descriptions>
              </Col>

            </Row>}
            {(state.FirstAssesment.posture.sitting_Posterial_view || state.FirstAssesment.posture.Sitting_lateral_view) && <Row>
              <Col md={24} lg={24} sm={24} xs={24}>
                <h3>  <Badge color="#000000" />Sitting</h3>
              </Col>
            </Row>}
            {state.FirstAssesment.posture.sitting_Posterial_view && Object.keys(state.FirstAssesment.posture["sitting_Posterial_view"]).length > 0 && <Row gutter={[10, 10]} className="px-4 py-2">
              <Col span={24}><h5>Anterior</h5></Col>
              <Col md={24} lg={18} sm={24} xs={24}>
                <Descriptions bordered>
                  <Descriptions.Item label="Nasal Bridge">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shoulder levels(Acrimion)">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Umbilicus">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Knees">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[3]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ankle/Foot">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[4]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Line of Gravity">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["sitting_Posterial_view"].Angles[5]}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col md={24} lg={6} sm={24} xs={24}>
                <img
                  src={
                    state.FirstAssesment.posture["sitting_Posterial_view"]
                      .posterial_view_image
                  }
                />
              </Col>

              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="">
                  {Object.keys(state.FirstAssesment.posture["sitting_Posterial_view"].checkbox).map((ob) => {
                    if (state.FirstAssesment.posture["sitting_Posterial_view"].checkbox[ob] == 1) {
                      return (
                        <Descriptions.Item label="">
                          <Badge color="#000000" />
                          {ob}
                        </Descriptions.Item>
                      )
                    }
                  }
                  )}
                </Descriptions>
              </Col>

            </Row>}
            {state.FirstAssesment.posture.Sitting_lateral_view && Object.keys(state.FirstAssesment.posture["Sitting_lateral_view"]).length > 0 && <Row gutter={[10, 10]} className="px-4 py-2">
              <Col span={24}><h5>Lateral</h5></Col>
              <Col md={24} lg={18} sm={24} xs={24}>
                <Descriptions bordered>
                  <Descriptions.Item label="Shoulder">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Sitting_lateral_view"].Angles[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Hip">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Sitting_lateral_view"].Angles[1]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ankle">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Sitting_lateral_view"].Angles[2]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Opposite Knee">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Sitting_lateral_view"].Angles[3]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Elbow">
                    {Object.keys(state.FirstAssesment.posture).length > 0 &&
                      state.FirstAssesment.posture["Sitting_lateral_view"].Angles[4]}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col md={24} lg={6} sm={24} xs={24}>
                <img
                  src={
                    state.FirstAssesment.posture["Sitting_lateral_view"]
                      .posterial_view_image
                  }
                />
              </Col>

              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="">
                  {Object.keys(state.FirstAssesment.posture["Sitting_lateral_view"].checkbox).map((ob) => {
                    if (state.FirstAssesment.posture["Sitting_lateral_view"].checkbox[ob] == 1) {
                      return (
                        <Descriptions.Item label="">
                          <Badge color="#000000" />
                          {ob}
                        </Descriptions.Item>
                      )
                    }
                  }
                  )}
                </Descriptions>
              </Col>

            </Row>}
          </div>
        )}
        {state.FirstAssesment.pain_state && (
          <div className="  mb-3 mt-3">
            <Row gutter={[10, 10]}>
              <Col md={24} lg={24} sm={24} xs={24}>
                {/* <Row className="border1">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4 className="p-2">Pain Assessment</h4>
            </Col>
          </Row> */}
                <Descriptions title={<Col className="border1" md={24} lg={24} sm={24} xs={24}>
                  <h4 className="p-2">Pain Assessment</h4>
                </Col>} bordered>
                  <Descriptions.Item label="Nature Of Pain">
                    {state.FirstAssesment.nature_of_pain_here}
                  </Descriptions.Item>
                  <Descriptions.Item label="Swelling">
                    {state.FirstAssesment.pain_swelling}
                  </Descriptions.Item>
                  <Descriptions.Item label="Pain Aggravating">
                    {state.FirstAssesment.pain_aggravating_here.map(
                      (d) => d + " , "
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Pain Relieving">
                    {state.FirstAssesment.pain_relieving_here.map(
                      (d) => d + " , "
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Pain Scale">
                    {state.FirstAssesment.pain_scale}
                  </Descriptions.Item>
                  <Descriptions.Item label="Scars">
                    {state.FirstAssesment.pain_scars}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions title="Sensory Inputs" bordered>
                  <Descriptions.Item label="Superficial">
                    {state.FirstAssesment.superficial}
                  </Descriptions.Item>
                  <Descriptions.Item label="Deep">
                    {state.FirstAssesment.deep}
                  </Descriptions.Item>
                  <Descriptions.Item label="cortial">
                    {state.FirstAssesment.cortial}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
        )}
        {
          <div
            style={{ display: state.FirstAssesment.special_visibility }}
            className=" special_test_new1 border1 mb-3 mt-3"
          >
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
            {state.FirstAssesment.shoulder &&
              Object.keys(state.FirstAssesment.shoulder).length > 0 && (
                <Row gutter={[10, 10]} className="">
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Shoulder </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.shoulder).map(
                          (an) => (
                            <tr>
                              <td>{an[0]}</td>
                              <td>
                                <center>
                                  {an[1] == 1 ? " Positive " : " Negative "}
                                </center>
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                </Row>
              )}

            {state.FirstAssesment.ankle &&
              Object.keys(state.FirstAssesment.ankle).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Ankle </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.ankle).map(
                          (an) => (
                            <tr>
                              <td>{an[0]}</td>
                              <td>
                                <center>
                                  {an[1] == 1 ? " Positive " : " Negative "}
                                </center>
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.elbow &&
              Object.keys(state.FirstAssesment.elbow).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Elbow </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.elbow).map(
                          (an) => (
                            <tr>
                              <td>{an[0]}</td>
                              <td>
                                <center>
                                  {an[1] == 1 ? " Positive " : " Negative "}
                                </center>
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.hip &&
              Object.keys(state.FirstAssesment.hip).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Hip </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.hip).map((an) => (
                          <tr>
                            <td>{an[0]}</td>
                            <td>
                              <center>
                                {an[1] == 1 ? " Positive " : " Negative "}
                              </center>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.knee &&
              Object.keys(state.FirstAssesment.knee).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Knee </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.knee).map((an) => (
                          <tr>
                            <td>{an[0]}</td>
                            <td>
                              <center>
                                {an[1] == 1 ? " Positive " : " Negative "}
                              </center>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.cervical_spine &&
              Object.keys(state.FirstAssesment.cervical_spine).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Cervical Spine </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(
                          state.FirstAssesment.cervical_spine
                        ).map((an) => (
                          <tr>
                            <td>{an[0]}</td>
                            <td>
                              <center>
                                {an[1] == 1 ? " Positive " : " Negative "}
                              </center>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.thoracic_spine &&
              Object.keys(state.FirstAssesment.thoracic_spine).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Thoracic Spine </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(
                          state.FirstAssesment.thoracic_spine
                        ).map((an) => (
                          <tr>
                            <td>{an[0]}</td>
                            <td>
                              <center>
                                {an[1] == 1 ? " Positive " : " Negative "}
                              </center>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.lumbar_spine &&
              Object.keys(state.FirstAssesment.lumbar_spine).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Lumbar Spine </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.lumbar_spine).map(
                          (an) => (
                            <tr>
                              <td>{an[0]}</td>
                              <td>
                                <center>
                                  {an[1] == 1 ? " Positive " : " Negative "}
                                </center>
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.forearm &&
              Object.keys(state.FirstAssesment.forearm).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Forearm_wrist_Hand </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(state.FirstAssesment.forearm).map(
                          (an) => (
                            <tr>
                              <td>{an[0]}</td>
                              <td>
                                <center>
                                  {an[1] == 1 ? " Positive " : " Negative "}
                                </center>
                              </td>
                            </tr>
                          )
                        )}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
            {state.FirstAssesment.special_others &&
              Object.keys(state.FirstAssesment.special_others).length > 0 && (
                <Row gutter={[10, 10]}>
                  <Col lg={12} md={24} sm={24} xs={24}>
                    <>
                      <Descriptions.Item label="" span={3}>
                        <b>Others </b>
                      </Descriptions.Item>
                      <table
                        style={{ width: `${screen.width / 2}px` }}
                        border="1px"
                      >
                        <tr>
                          <td style={{ width: "80%" }}>
                            {" "}
                            <center>Questions</center>
                          </td>
                          <td style={{ width: "20%" }}>
                            <center>Positive/Negative</center>
                          </td>
                        </tr>
                        {Object.entries(
                          state.FirstAssesment.special_others
                        ).map((an) => (
                          <tr>
                            <td>{an[0]}</td>
                            <td>
                              <center>
                                {an[1] == 1 ? " Positive " : " Negative "}
                              </center>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24}></Col>
                </Row>
              )}
          </div>
        }
        <div className=" border mb-3 mt-3">
          <Row style={{ display: RomVisibility }}>
            <Row >
              <Col className="border1" md={24} lg={24} sm={24} xs={24}>
                <h4 className="p-2">Anterior ROM Assesment</h4>
              </Col>
            </Row>
            <Row gutter={[10, 10]} className="px-4 py-2">
              <Col md={12} lg={12} sm={24} xs={24}>
                <Table
                  pagination={false}
                  columns={columns}
                  dataSource={tableData1}
                />
              </Col>
              <Col md={12} lg={12} sm={24} xs={24}>
                <Table
                  pagination={false}
                  columns={columns}
                  dataSource={tableData2}
                />
              </Col>
            </Row>
          </Row>

          <Row style={{ display: RomVisibilityM }}>
            <Col md={24} lg={24} sm={24} xs={24} className="border1">
              <h4 className="p-2">Lateral ROM Assesment</h4>
            </Col>
          </Row>
          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col
              style={{ display: RomVisibilityL }}
              md={12}
              lg={12}
              sm={24}
              xs={24}
            >
              <Row>
                <Col span={24}>
                  <h5 className="p-2">Left side</h5>
                </Col>
                <Col span={24}>
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={latL}
                  />
                </Col>
              </Row>
            </Col>
            {/* <Col style={{ display: RomVisibilityL }} md={12} lg={12} sm={24} xs={24}>
         <h5 className="p-2">Left side</h5><br/>
             <Table pagination={false} columns={columns} dataSource={tableDataL} />
         </Col> */}
            <Col
              style={{ display: RomVisibilityR }}
              md={12}
              lg={12}
              sm={24}
              xs={24}
            >
              <Row>
                <Col span={24}>
                  <h5 className="p-2">Right side</h5>
                </Col>
                <Col span={24}>
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={latR}
                  />
                </Col>
              </Row>
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
        <Col
          style={{ paddingTop: "23px" }}
          md={20}
          lg={20}
          sm={20}
          xs={20}
        ></Col>
      </Row>
      {/* <Row>
      <Col md={1} lg={1} sm={1} xs={1}>
        </Col>
        <Col className="text-center" md={20} lg={20} sm={20} xs={20}>
        {state.FirstAssesment.quest?<Button type="text" disabled={state.FirstAssesment.quest} className="btn-new-check" style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button> :
        <Button type="text" disabled={state.FirstAssesment.quest} style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>
        }
     
                {state.FirstAssesment.pain1?<Button  className="btn-new-check ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={() => history.push('/assesment/PainAssessment')} ant-click-animating-without-extra-node="false">Pain Assessment</Button>:
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
                }
        </Col>
        <Col md={1} lg={1} sm={1} xs={1}>
        </Col>
      </Row> */}
      <Row gutter={[10, 10]}>
        {/* <Space> */}
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <Checkbox
            checked={!state.FirstAssesment.pain1}
            onChange={(e) => handleChange("pain1", !e.target.checked)}
          >
            {state.FirstAssesment.pain1 ? (
              <Button
                className="btn-new-check btn-Assesment"
                style={{
                  backgroundColor: state.FirstAssesment.pain1
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.pain1}
                onClick={() => {
                  // if (localStorage.getItem("OnAssessmentScreen") == "true") {
                    goPain();
                  //   OnAssesmentPage();
                  // } else {
                  //   goPain();
                  // }
                }}
              >
                Pain Assessment
              </Button>
            ) : (
              <Button
                className="btn-Assesment"
                type="text"
                style={{
                  backgroundColor: state.FirstAssesment.pain1
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.pain1}
                onClick={() => {
                  goPain();
                }}
              >
                Pain Assessment
              </Button>
            )}
          </Checkbox>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <Checkbox
            checked={!state.FirstAssesment.pose}
            onChange={(e) => handleChange("pose", !e.target.checked)}
          >
            {state.FirstAssesment.pose ? (
              <Button
                className="btn-new-check btn-Assesment"
                style={{
                  backgroundColor: state.FirstAssesment.pose
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px',
                  borderRadius: '5px !important'
                }}
                id="posture-btn"
                disabled={state.FirstAssesment.pose}
                onClick={() => {
                  history.push("/assesment/PoseTest");
                }}
              >
                Posture Test
              </Button>
            ) : (
              <Button
                className="btn-Assesment"
                type="text"
                style={{
                  backgroundColor: state.FirstAssesment.pose
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                id="posture-btn"
                disabled={state.FirstAssesment.pose}
                onClick={() => {
                  history.push("/assesment/PoseTest");
                }}
              >
                Posture Test
              </Button>
            )}
          </Checkbox>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <Checkbox
            checked={!state.FirstAssesment.romAssAi}
            onChange={(e) => handleChange("romAssAi", !e.target.checked)}
          >
            {state.FirstAssesment.romAssAi ? (
              <Button
                style={{
                  backgroundColor: state.FirstAssesment.romAssAi
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.romAssAi}
                className="btn-new-check btn-Assesment"
                onClick={() => {
                  RomAI();
                }}
                id="rom"
              >
                AROM (using AI)
              </Button>
            ) : (
              <Button
                className="btn-Assesment"
                style={{
                  backgroundColor: state.FirstAssesment.romAssAi
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.romAssAi}
                type="text"
                onClick={() => {
                  RomAI();
                }}
                id="rom"
              >
                AROM (using AI)
              </Button>
            )}
          </Checkbox>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          <Checkbox
            checked={!state.FirstAssesment.quest}
            onChange={(e) => handleChange("quest", !e.target.checked)}
          >
            {state.FirstAssesment.quest ? (
              <Button
                className="btn-new-check btn-Assesment"
                disabled={state.FirstAssesment.quest}
                type="text"
                style={{
                  backgroundColor: state.FirstAssesment.quest
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                onClick={() => {
                  Questions();
                }}
                id="question"
              ></Button>
            ) : (
              <Button
                className="btn-Assesment"
                type="text"
                disabled={state.FirstAssesment.quest}
                style={{
                  backgroundColor: state.FirstAssesment.quest
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                onClick={() => {
                  Questions();
                }}
                id="question"
              ></Button>
            )}
          </Checkbox>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <Checkbox
            checked={!state.FirstAssesment.special}
            onChange={(e) => handleChange("special", !e.target.checked)}
          >
            {state.FirstAssesment.special ? (
              <Button
                className="btn-new-check btn-Assesment"
                style={{
                  backgroundColor: state.FirstAssesment.special
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.special}
                onClick={() => {
                  history.push("/assesment/SpecialTest");
                }}
              >
                Special Test
              </Button>
            ) : (
              <Button
                className="btn-Assesment"
                type="text"
                style={{
                  backgroundColor: state.FirstAssesment.special
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.special}
                onClick={() => {
                  history.push("/assesment/SpecialTest");
                }}
              >
                Special Test
              </Button>
            )}
          </Checkbox>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <Checkbox
            checked={!state.FirstAssesment.romAss}
            onChange={(e) => handleChange("romAss", !e.target.checked)}
          >
            {state.FirstAssesment.romAss ? (
              <Button
                style={{
                  backgroundColor: state.FirstAssesment.romAss
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.romAss}
                className="btn-new-check btn-Assesment"
                onClick={() => {
                  Rom();
                }}
                id="rom_manual"
              >
                AROM (Manual)
              </Button>
            ) : (
              <Button
                className="btn-Assesment"
                style={{
                  backgroundColor: state.FirstAssesment.romAss
                    ? "grey"
                    : "#2d7ecb",
                  width: '138px'
                }}
                disabled={state.FirstAssesment.romAss}
                type="text"
                onClick={() => {
                  Rom();
                }}
                id="rom_manual"
              >
                AROM (Manual)
              </Button>
            )}
          </Checkbox>
        </Col>
        {/* </Space> */}
      </Row>

      {/* <Row justify='space-between'>
        <Col  md={24} lg={24} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.quest} onChange={(e)=>handleChange('quest',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.quest?<Button type="text" disabled={state.FirstAssesment.quest} className="btn-new-check" style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>:
          <Button type="text" disabled={state.FirstAssesment.quest} style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>}
          <Checkbox checked={!state.FirstAssesment.pain1}  onChange={(e)=>handleChange('pain1',!e.target.checked)}></Checkbox>
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
         
        
        </Col>
     </Row> */}
      {/* <Row>
        <Col  md={12} lg={5} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.quest} onChange={(e)=>handleChange('quest',!e.target.checked)}></Checkbox>
        {state.FirstAssesment.quest?<Button type="text" disabled={state.FirstAssesment.quest} className="btn-new-check" style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>:
          <Button type="text" disabled={state.FirstAssesment.quest} style={{backgroundColor:state.FirstAssesment.quest?'grey':'#2d7ecb'}} onClick={Questions} id="question"></Button>}
        </Col>
        <Col  md={12} lg={5} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.pain1}  onChange={(e)=>handleChange('pain1',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.pain1?<Button  className="btn-new-check" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={goPain} ant-click-animating-without-extra-node="false">Pain Assessment</Button>:
                <Button  className="ms-3 ant-btn" style={{backgroundColor:state.FirstAssesment.pain1?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.pain1} onClick={goPain} ant-click-animating-without-extra-node="false">Pain Assessment</Button>
                }
        </Col>
        <Col  md={12} lg={5} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.special} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('special',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.special?<button class="btn-new-check" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>:
                <button class="ant-btn ms-3" style={{backgroundColor:state.FirstAssesment.special?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.special} onClick={() => history.push('/assesment/SpecialTest')} ant-click-animating-without-extra-node="false">Special Test</button>
                }
        </Col>
        <Col  md={12} lg={5} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.pose} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('pose',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.pose?<Button className="btn-new-check" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')}>Posture Test</Button>:
                <Button className="ant-btn" style={{backgroundColor:state.FirstAssesment.pose?'grey':'#2d7ecb'}} id="posture-btn" disabled={state.FirstAssesment.pose} onClick={() => history.push('/assesment/PoseTest')}>Posture Test</Button>
                }
        </Col>
        <Col  md={12} lg={5} sm={24} xs={24}>
        <Checkbox checked={!state.FirstAssesment.romAss} style={{paddingLeft:'10px'}} onChange={(e)=>handleChange('romAss',!e.target.checked)}></Checkbox>
          {state.FirstAssesment.romAss?<Button style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} className=" btn-new-check" onClick={Rom} id="rom">AROM</Button>:
                <Button style={{backgroundColor:state.FirstAssesment.romAss?'grey':'#2d7ecb'}} disabled={state.FirstAssesment.romAss} onClick={Rom} id="rom">AROM</Button>
                }
        </Col>
     </Row> */}
      {submitLoading && <Loading />}

      {/* <ClipLoader color={"#ffffff"} loading={submitLoading}  size={150} /> */}
      <div className="text-center m-3">
        <Button
          htmlType="submit"
          style={{ backgroundColor: "#2d7ecb" }}
          className="ms-3"
          onClick={Submit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Assesment1;
