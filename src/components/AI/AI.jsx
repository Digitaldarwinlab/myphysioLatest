import React, { Component } from "react";
import {
  Row,
  Col,
  Switch,
  Checkbox,
  Card,
  Button,
  notification,
  Avatar,
  Radio,
  Select,
  Modal,
  Result,
} from "antd";
import {
  CaretLeftFilled,
  CameraFilled,
  MinusCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SwapOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import { connect } from "react-redux";
import "../../styles/Layout/AI_Video.css";
import html2canvas from "html2canvas";
import Loading from "../UtilityComponents/Loading";
import { FirstAssesment } from "../../contextStore/reducers/Assesment/Assesment1";
import { add_angles } from "../../API/Assesment/assementApi";
import Cookies from "js-cookie";

import "./Ai.css";
import "./AiNew.css";
import AiTab from "./AiTab";
import { tableLabels } from "../episode-visit-details/Assessment/AssessmentList";
import { GetJoint } from "../../API/care-plan/care-plan-api";
import { CARE_PLAN_STATE_CHANGE } from "../../contextStore/actions/care-plan-action";
import { getUserData } from "../../API/userAuth/userAuth";
// import {Video} from "../../styles/ScreenDesign/ypga.jpg"
const { Meta } = Card;
const indices1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const { Option } = Select;
const labels = [
  "L Shoulder Abd/Add",
  "R Shoulder Abd/Add",
  "L Elbow Flex/Ext",
  "R Elbow Flex/Ext",
  "L Hip Flex/Ext",
  "R Hip Flex/Ext",
  "L Knee Flex/Ext",
  "R Knee Flex/Ext",
  "L Cervical Side flex", 
  "R Cervical Side Flex", 
  "L Lumbar Side Flex",
  "R Lumbar Side Flex",
  "L Wrist Flex/Ext",
  "R Wrist Flex/Ext",
  "L Ankle Dorsi/Planter Flex",
  "R Ankle Dorsi/Planter Flex",
  "L Hip Abd/Add",
  "R Hip Abd/Add",
  "Cervical Flex/Ext",
  "Cervical Flex/Ext",
];
const primary_joint = {
  leftShoulder: [0, 1],
  rightShoulder: [0, 1],
  leftElbow: [2, 3],
  rightElbow: [2, 3],
  leftHip: [4, 5],
  rightHip: [4, 5],
  leftKnee: [6, 7],
  rightKnee: [6, 7],
  leftNeck: [8, 9],
  rightNeck: [8, 9],
  leftPelvic: [10, 11],
  rightPelvic: [10, 11],
  leftWrist: [12, 13],
  rightWrist: [12, 13],
  leftAnkle: [14, 15],
  rightAnkle: [14, 15],
  leftHipAdductionAdbuction: [16, 17],
  rightHipAdductionAdbuction: [16, 17],
  cervicalForwardFlexion: [18, 18],
};
// let JointNew = {
//   leftShoulder:["leftShoulder","rightShoulder"],
//   leftElbow:["leftElbow","rightElbow"],
//   leftHip:["leftHip","rightHip","leftHipAdductionAbduction","rightHipAdductionAbduction"],
//   leftKnee:["leftKnee","rightKnee"],
//   leftNeck:["leftNeck","rightNeck","cervicalForwardFlexion"],
//   leftPelvic:["leftPelvic","rightPelvic"],
//   leftWrist:["leftWrist","rightWrist"],
//   leftAnkle:["leftAnkle","rightAnkle"],
// }

let JointNew = {
  leftShoulder: [0, 1],
  leftElbow: [2, 3],
  leftHip: [4, 5, 16, 17],
  leftKnee: [6, 7],
  leftNeck: [8, 9],
  leftPelvic: [10, 11],
  leftWrist: [12, 13],
  leftAnkle: [14, 15],
}

let JointNew1 = {
  leftShoulder: [0, 1],
  leftElbow: [2, 3],
  leftHip: [4, 5, 16, 17],
  leftKnee: [6, 7],
  leftNeck: [8, 9],
  leftPelvic: [10, 11],
  leftWrist: [12, 13],
  leftAnkle: [14, 15],

}

let JointNew2 = {
  leftShoulder: [0, 1],
  leftElbow: [2, 3],
  leftHip: [4, 5, 16, 17],
  leftKnee: [6, 7],
  leftNeck: [8, 9],
  leftPelvic: [10, 11],
  leftWrist: [12, 13],
  leftAnkle: [14, 15],
  cervicalForwardFlexion: [18, 18]
}

let JointNew3 = {
  leftShoulder: [0, 1],
  leftElbow: [2, 3],
  leftHip: [4, 5, 16, 17],
  leftKnee: [6, 7],
  leftNeck: [8, 9],
  leftPelvic: [10, 11],
  leftWrist: [12, 13],
  leftAnkle: [14, 15],
}

const allNewJoints = [
  { value: 0, label: "L Shoulder Abd/Add" },
  { value: 1, label: "R Shoulder Abd/Add" },
  { value: 2, label: "L Elbow Flex/Ext" },
  { value: 3, label: "R Elbow Flex/Ext" },
  { value: 4, label: "L Hip Flex/Ext" },
  { value: 5, label: "R Hip Flex/Ext" },
  { value: 6, label: "L Knee Flex/Ext" },
  { value: 7, label: "R Knee Flex/Ext" },
  { value: 8, label: "L Cervical Side flex" },
  { value: 9, label: "R Cervical Side flex" },
  { value: 10, label: "L Lumbar Side Flex" },
  { value: 11, label: "R Lumbar Side Flex" },
  { value: 12, label: "L Wrist Flex/Ext" },
  { value: 13, label: "R Wrist Flex/Ext" },
  { value: 14, label: "L Ankle Dorsi/Planter Flex" },
  { value: 15, label: "R Ankle Dorsi/Planter Flex" },
  { value: 16, label: "L Hip Abd/Add" },
  { value: 17, label: "R Hip Abd/Add" },
  { value: 18, label: "Cervical Flex/Ext" },
];
const joints = [
  { value: 0, label: "L Shoulder Abd/Add" },
  { value: 1, label: "R Shoulder Abd/Add" },
  { value: 2, label: "L Elbow Flex/Ext" },
  { value: 3, label: "R Elbow Flex/Ext" },
  { value: 8, label: "L Cervical Side flex" },
  { value: 9, label: "R Cervical Side flex" },
  { value: 10, label: "L Lumbar Side Flex" },
  { value: 11, label: "R Lumbar Side Flex" },
  { value: 16, label: "L Hip Abd/Add" },
  { value: 17, label: "R Hip Abd/Add" },
];
const leftJoints = [
  { value: 0, label: "L Shoulder Abd/Add" },
  { value: 4, label: "L Hip Flex/Ext" },
  { value: 6, label: "L Knee Flex/Ext" },
  { value: 12, label: "L Wrist Flex/Ext" },
  { value: 14, label: "L Ankle Dorsi/Planter Flex" },
  { value: 18, label: "Cervical Flex/Ext" },
];

const rightJoints = [
  { value: 1, label: "R Shoulder Abd/Add" },
  { value: 5, label: "R Hip Flex/Ext" },
  { value: 7, label: "R Knee Flex/Ext" },
  { value: 13, label: "R Wrist Flex/Ext" },
  { value: 15, label: "R Ankle Dorsi/Planter Flex" },
  { value: 18, label: "Cervical Flex/Ext" },
];

let data = "";
let screenshot = [];

console.log("in careplan");
class AI extends Component {
  constructor(props) {
    super(props);

    console.log("history in ai");
    console.log(this.props.history);
    // var preveState = this.props.history.location.state.Excercise
    //   ? this.props.history.location.state.Excercise
    //   : {};
    // let preIndices = Object.keys(preveState);
    // console.log("preveState:" + preveState);
    // console.log("preIndices:" + preIndices);
    // let PreJoints = this.props.history.location.state.Joints;
    // console.log("PreJoints:" + PreJoints);
    // let PreJointKeys = Object.keys(PreJoints);
    // let PreJointValue = Object.values(PreJoints);
    // console.log("PreJointKeys:" + PreJointKeys);
    // console.log("PreJointValue:" + PreJointValue);
    // console.log(this.props.history.location);

    //aswin 11/27/2021 start
    this.state = {
      // ExcerciseName: preveState,
      // ExcerciseIndices: preIndices,
      // PreKey: PreJointKeys,
      // preValue: PreJointValue,
      AI: false,
      start_stop: false,
      BACK: false,
      SWITCH: false,
      loading: false,
      VideoData: "",
      videoUrl: "",
      visible: "hidden",
      data: [],
      patienId: "56",
      exerciseId: this.props.history.location.exerciseId,
      arrayIndex: 0,
      //primaryExercise: this.props.history.location.state.exercisePrimary,
      // selectedExercise: preveState[0],
      selectedOrientation: 1,
      angles: [],
      ref: 1,
      disabledButton: true,
      disabledAnteriorDrop: false,
      disabledLateralDrop: false,
      newJoint: joints,
      newJointChecked: [],
      selectState: null,
      selectStateL: null,
      selectStateR: null,
      toggleState: 1,
      lateralJoints: leftJoints,
      lateralJointsR: rightJoints,
      latSide: "left",
      OrgAntPrimary: [],
      OrgLatLeftPrimary: [],
      OrgLatRightPrimary: [],
      romJoints: [],
      primary_joints: [],
      newJointCheckedLeft: [],
      newJointCheckedRight: [],
      AntPri: [],
      AntPriValue: [],
      LatLeftPri: [],
      LatLeftPriValue: [],
      LatRightPri: [],
      LatRightPriValue: []
    };

    // window.darwin.setExcersiseParams({
    //     "name": preveState,
    //     "primaryKeypoint": 0,
    //     "angles": this.state.PreKey,
    //     "dir": 1,
    //     "minAmp": 30,
    //     "primaryAngles": [3, 2],
    //     "ROMs": [[30, 160], [30, 160]],
    //     "totalReps": 3,
    //     "totalSets": 2
    // });
    //aswin 11/27/2021 start
    // this.innerHTML2 = this.innerHTML2.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.restart = this.restart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ExChanges = this.ExChanges.bind(this);
    this.angles = this.angles.bind(this);
    this.back = this.back.bind(this);
    this.start = this.start.bind(this);
    this.capture = this.capture.bind(this);
    this.ExDef = this.ExDef.bind(this);
  }

  back = () => {
    this.props.FirstAssesment("Arom_M", false);
    this.props.FirstAssesment("Arom_Ai", true);
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

    this.props.history.push("/assessment/1");
  };
  setSelectOrientation = (value) => {
    this.setState({ selectedOrientation: value });
  };
  setAngles1 = (value) => {
    window.darwin.setExcersiseParams({
      angles: value,
    });
  }
  setAngles = (value) => {
    this.setState({ angles: value });
  };
  // innerHTML1 = () => {
  //     const anglesEle = document.getElementById('angles1');

  //     for (const i of indices1) {
  //         const PreLable = this.state.preValue;
  //         let label1 = labels[i];
  //         let newLable = PreLable.includes(label1);
  //         if (newLable === true) {
  //             anglesEle.innerHTML +=
  //                 `<input type="checkbox" name=${label1} value=${i} checked>
  //                                     <label for=${label1}>${label1}</label><br>`
  //         }
  //         if (newLable === false) {
  //             anglesEle.innerHTML +=
  //                 `<input type="checkbox" name=${label1} value=${i}>
  //                                     <label for=${label1}>${label1}</label><br>`
  //         }
  //     }
  // };

  ifCheck = (tempjoints) => {
    var check = [];
    const PreLable = this.state.preValue;
    for (let i = 0; i < tempjoints.length; i++) {
      check.push(tempjoints[i].value);
    }
    return check;
  };

  changeSide = (value) => {
    if (value == "left") {
      //setLateralJoints(leftJoints)
      this.setState({ latSide: "left" });
      this.setAngles([0, 4, 6, 12, 14, 18]);
      this.setSelectOrientation(2);
      if (this.state.selectState) {
        this.configSideL(this.state.selectStateL)
      }
      // else{
      //   this.setState({ lateralJoints: this.state.LatLeftPri });
      // }
    }
    if (value == "right") {
      //setLateralJoints(rightJoints)
      this.setState({ latSide: "right" });
      //this.setState({ lateralJoints: this.state.LatRightPri });
      this.setAngles([1, 5, 7, 13, 15, 18]);
      this.setSelectOrientation(3);
      if (this.state.selectState) {
        this.configSideR(this.state.selectStateR)
      }
      // else{
      //   this.setState({ lateralJointsR: this.state.LatLeftPri });
      // }
    }
    if (this.state.SWITCH) {
      this.handleChange();
    }
  };

  configSideL = (e) => {
    this.setState({ disabledButton: false })
    // this.setState({ newJointCheckedLeft: JointNew[this.props.carePlanReducer.romJoints[e].joint] })
    // this.setState({ selectState: this.props.carePlanReducer.romJoints[e].joint })
    // this.setState({ primary_joints: primary_joint[this.props.carePlanReducer.romJoints[e].joint] })
    let tempIn = {}
    let tempOut = {}
    for (let i = 0; i < JointNew2[this.props.carePlanReducer.romJoints[e].joint].length; i++) {
      for (let j = 0; j < leftJoints.length; j++) {
        if (JointNew2[this.props.carePlanReducer.romJoints[e].joint].includes(leftJoints[j].value)) {
          tempOut[leftJoints[j].value] = leftJoints[j]
        } else {
          tempIn[leftJoints[j].value] = leftJoints[j]
        }
      }
    }
    //this.setState({ newJointChecked: [...this.state.newJointChecked, ...JointNew[this.props.carePlanReducer.romJoints[e].joint]] })
    // console.log("checking 1 ", tempIn)
    console.log("checking 1 ", e)
    console.log("checking 2 ", Object.keys(tempOut))
    let selected = []
    for (let k = 0; k < Object.keys(tempOut).length; k++) {
      selected.push(Number(Object.keys(tempOut)[k]))
    }
    this.setState({ LatLeftPri: Object.values(tempOut) })
    this.setState({ LatLeftPriValue: selected })
    this.setState({ lateralJoints: Object.values(tempIn) })
  }

  configSideR = (e) => {
    this.setState({ disabledButton: false })
    // this.setState({ newJointCheckedRight: JointNew[this.props.carePlanReducer.romJoints[e].joint] })
    // this.setState({ selectState: this.props.carePlanReducer.romJoints[e].joint })
    // this.setState({ primary_joints: primary_joint[this.props.carePlanReducer.romJoints[e].joint] })
    let tempIn = {}
    let tempOut = {}
    for (let i = 0; i < JointNew2[this.props.carePlanReducer.romJoints[e].joint].length; i++) {
      for (let j = 0; j < rightJoints.length; j++) {
        if (JointNew2[this.props.carePlanReducer.romJoints[e].joint].includes(rightJoints[j].value)) {
          tempOut[rightJoints[j].value] = rightJoints[j]
        } else {
          tempIn[rightJoints[j].value] = rightJoints[j]
        }
      }
    }
    //this.setState({ newJointChecked: [...this.state.newJointChecked, ...JointNew[this.props.carePlanReducer.romJoints[e].joint]] })
    // console.log("checking 1 ", tempIn)
    console.log("checking 1 ", e)
    console.log("checking 2 ", Object.keys(tempOut))
    let selected = []
    for (let k = 0; k < Object.keys(tempOut).length; k++) {
      selected.push(Number(Object.keys(tempOut)[k]))
    }
    this.setState({ LatRightPri: Object.values(tempOut) })
    this.setState({ LatRightPriValue: selected })
    this.setState({ lateralJointsR: Object.values(tempIn) })
  }

  timer = () => {
    this.interval = setInterval(() => {
      this.newangles = window.darwin.getAllAnglesData();
      //   console.log(this.newangles)
      this.index = Object.keys(this.newangles);
      var today = new Date();
      var newtime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      if (this.index[0]) {
        //let newindex=this.index[0]
        //  console.log(this.newangles)
        //  let temparray=this.state.data
        //    console.log(this.newangles)
        // let lastObject=this.state.data[this.state.data.length-1]
        // let key=Object.keys(this.state.data)
        //      let LeftElbow=this.state.data[this.state.data.length-1].Squat.angles['Left Elbow'].angle
        //    let RightElbow=this.state.data[this.state.data.length-1].Squat.angles['Right Elbow'].angle
        /*
               console.log('this . new angles')
                console.log(this.newangles)
                console.log('new inside')
                let key =Object.keys(this.newangles)
                console.log(this.newangles[key])
                
                   let newLeftElbow=this.newangles[key].angles['Left Elbow'].angle
                   let newRightElbow=this.newangles[key].angles['Right Elbow'].angle
                   let newLeftHip=this.newangles[key].angles['Right Hip'].angle
                   let newRightHip=this.newangles[key].angles['Left Hip'].angle
                   let newLeftShoulder=this.newangles[key].angles['Left Shoulder(ver)'].angle
                   let newRightShoulder=this.newangles[key].angles['Right Shoulder(ver)'].angle
                   let newPelvicLEft=this.newangles[key].angles['Pelvic Left'].angle
                   let newPelvicRight=this.newangles[key].angles['Pelvic Right'].angle
                   let newRightKnee=this.newangles[key].angles['Right Knee'].angle
                   let newLeftKnee=this.newangles[key].angles['Left Knee'].angle
                   let newNeckLeft=this.newangles[key].angles['Neck Left'].angle
                   let newNeckright=this.newangles[key].angles['Neck Right'].angle

                   const object={
                       time:newtime
                    ,data:{
                       LeftElbow:newLeftElbow,
                       RightElbow:newRightElbow,
                       LeftKnee:newLeftKnee,
                       RightKnee:newRightKnee,
                       LeftHip:newLeftHip,
                       RightHip:newRightHip,
                       LEftShoulder:newLeftShoulder,
                       rightShoulder:newRightShoulder,
                       LeftPelvic:newPelvicLEft,
                       rightPElvic:newPelvicRight,
                       NEckLEft:newNeckLeft,
                       NeckRight:newNeckright
                   }}

                   if(this.state.data.length==0)
               {
                this.setState({data:[...this.state.data,object]})
                console.log(this.state.data)
               }
               else
               {
                   let LastLeftElbow=this.state.data[this.state.data.length-1].data['Left Elbow']
                   let newLeftElbows=this.newangles.Squat.angles['Left Elbow'].angle
                   if(LastLeftElbow!==newLeftElbows)
                   {
                    this.setState({data:[...this.state.data,object]})
                    console.log('different value')
                   }
                   else
                   {
                       console.log('samee')
                   }

               }
                //   console.log('object isss:')
                 //  console.log(object)
                  
                   
               //     console.log(LeftElbow + ' : ' + newLeftElbow + ' : ' + RightElbow + ' : ' +newRightElbow)
                 //   console.log('[LEft:]' , LeftElbow!==newLeftElbow)
                   
                   
                
                //   let rightElbow=this.state.data.key['right Elbow'].angle
                //   let new_angle_leftElbow=this.newangles.Squat.angles['Left Elbow'] 
                //   let New_angle_rightElbow=this.newangles.Squat.angles['right Elbow'] 
                  // console.log(keys)
               // console.log(LeftElbow)
               // console.log(typeof(LeftElbow))
                //  
            //    this.setState({data:temparray})
            //    this.setState({arrayIndex:this.state.arrayIndex+1})
              
                 */
      }
    }, 1000);
  };
  // innerHTML2 = () => {
  //   const exerise = document.getElementById("ex");
  //   var i = 0;
  //   if (this.state.ExcerciseIndices.length > 0) {
  //     //  exerise.innerHTML += '<option value="Please Select">Select the Excercise</option>'
  //     for (i = 0; i < this.state.ExcerciseIndices.length; i++) {
  //       let lable = this.state.ExcerciseName[i];
  //       console.log("exercise is" + lable);
  //       console.log(this.state.ExcerciseName[i]);
  //       exerise.innerHTML += `<option value=${JSON.stringify(
  //         lable
  //       )}>${lable}</option>`;
  //     }
  //   }
  // };

  stop = async () => {
    window.darwin.stop();
    data = window.darwin.getAssesmentData();
    this.setState({ SWITCH: false });
    this.setState({ BACK: false });
    this.setState({ start_stop: false });
    if (!Object.keys(data).length) {
      notification.error({
        message: "Angles not calculated",
        placement: "bottomLeft",
        duration: 2,
      });
    } else {
      console.log(
        "Ai data ",
        this.props.history.location.state.Excercise.length
      );
      console.log("Ai data ", data);
      console.log(
        "Ai data ",
        data[this.props.history.location.state.Excercise[0]]
      );
      console.log("Ai data ", this.props.history.location.state.Excercise);
      if (this.props.history.location.state.Excercise.length === 1) {
        console.log(
          "Ai data ",
          data[this.props.history.location.state.Excercise[0]]
        );
        let name = {};
        name[this.props.history.location.state.Excercise[0]] =
          data[this.props.history.location.state.Excercise[0]];
        this.props.FirstAssesment("AI_data", name);
        this.props.FirstAssesment(
          "Exercise_Name",
          this.props.history.location.state.Excercise
        );
        console.log("Ai data captured if ", name);
        notification.success({
          message: "Angles have been calculated",
          placement: "bottomLeft",
          duration: 2,
        });
      } else {
        console.log("Ai data captured else ", data);
        this.props.FirstAssesment("AI_data", data);
        this.props.FirstAssesment(
          "Exercise_Name",
          this.props.history.location.state.Excercise
        );
        notification.success({
          message: "Angles have been calculated",
          placement: "bottomLeft",
          duration: 2,
        });
      }
    }

    //const response=  await add_angles(this.array)
    //  console.log(response)
    // console.log(angles.index[0])
    //  console.log(state)
  };

  reset = () => {
    console.log("From Reset");
    this.setState({ start_stop: false });
    this.setState({ SWITCH: false });
    window.darwin.stop();
    window.darwin.resetData();
  };

  //to take ScreenShot
  capture = () => {
    window.scrollTo(0, 0);
    this.setState({ visible: "visible" });
    const out = document.getElementById("scr_out");
    html2canvas(document.getElementById("output")).then(function (canvas) {
      screenshot.push(canvas.toDataURL("image/jpeg", 0.9));
      var extra_canvas = document.createElement("canvas");
      extra_canvas.setAttribute("width", 136);
      extra_canvas.setAttribute("height", 96);
      var ctx = extra_canvas.getContext("2d");
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 136, 96);
      var dataURL = extra_canvas.toDataURL();
      var img = document.createElement("img");
      img.src = dataURL;
      out.appendChild(img);
    });
    this.props.FirstAssesment("AI_screenshot", screenshot);
    console.log(screenshot);
  };

  ExDef = () => {
    fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ exercise: [this.state.ExcerciseName[0]] }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ exerciseId: data[0].ex_em_id });
        data.map((val) => {
          this.setState({ VideoData: val.image_path });
        });
        data.map((val) => {
          this.setState({ videoUrl: val.video_path });
        });
      });
  };

  ExChanges = (e) => {
    //aswin 11/27/2021 start
    this.setState({ selectedExercise: e });
    console.log("value is ", e);
    console.log("initial value ", this.state.PreKey);
    console.log("exercise passed are ", this.state.primaryExercise);
    let priArr = [];
    this.state.primaryExercise.map((ex) => {
      if (ex.name == e) {
        priArr = ex.primary_angles ? ex.primary_angles : ex.joint;
      }
    });
    console.log("primary  ", priArr);
    console.log("angles ", priArr);
    const primaryAnglesValue = [];
    allNewJoints.map((jo) => {
      priArr.map((pr) => {
        if (pr === jo.label) {
          primaryAnglesValue.push(jo.value);
        }
      });
    });
    console.log("primaryAnglesValue ", primaryAnglesValue);
    this.setState({ selectedOrientation: 1 });
    this.setState({ angles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
    this.setState({ toggleState: 1 });
    this.setState({ lateralJoints: leftJoints });
    window.darwin.setExcersiseParams({
      name: this.state.ExcerciseName,
      primaryKeypoint: 0,
      angles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      dir: 1,
      minAmp: 30,
      primaryAngles: primaryAnglesValue,
      ROMs: [
        [30, 160],
        [30, 160],
      ],
      totalReps: 3,
      totalSets: 2,
    });
    //aswin 11/27/2021 start
    fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ exercise: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data ", data);
        data.map((val) => {
          this.setState({ VideoData: val.image_path });
        });
        data.map((val) => {
          this.setState({ videoUrl: val.video_path });
        });
      });

    console.log("video state is");
    console.log(this.state);
  };

  handleChange = async () => {
    console.log("handle change")
    this.setState({ start_stop: !this.state.start_stop });
    if (this.state.toggleState == 1) {
      if (!this.state.start_stop) {
        this.setState({ disabledAnteriorDrop: true })
        console.log({
          name: "AROM",
          primaryKeypoint: 0,
          angles: [...this.state.newJointChecked, ...this.state.AntPriValue],
          dir: 1,
          minAmp: 30,
          primaryAngles: this.state.OrgAntPrimary,
          ROMs: [
            [30, 160],
            [30, 160],
          ],
          totalReps: 3,
          totalSets: 2,
        })
        window.darwin.restart();
        window.darwin.setExcersiseParams({
          name: "AROM",
          primaryKeypoint: 0,
          angles: [...this.state.newJointChecked, ...this.state.AntPriValue],
          dir: 1,
          minAmp: 30,
          primaryAngles: this.state.OrgAntPrimary,
          ROMs: [
            [30, 160],
            [30, 160],
          ],
          totalReps: 3,
          totalSets: 2,
        });
        //   window.darwin.setExcersiseParams({
        //     angles: this.state.newJointChecked,
        //   });
        //   darwin.selectOrientation(this.state.selectedOrientation);
        //  this.timer();
      } else {
        let data
        console.log("else")
        //    clearInterval(this.interval)

        // clearInterval(this.interval);
        console.log("FINALLL!!!!");
        try {
          data = darwin.getAssesmentData();
          console.log("AROM DATA", data);
          console.log("AROM DATA IS UNDEFINED", data["AROM"]);
          if (this.state.selectedOrientation == 1) {
            if (data !== undefined && data !== null) {
              if (data["AROM"]) {
                let TEMP = {};
                TEMP["AROM"] = data[Object.keys(data)[0]];
                console.log(TEMP);
                this.props.FirstAssesment("Anterior_AI_Data", TEMP);

                notification.success({
                  message: "Angles have been calculated",
                  placement: "bottomLeft",
                  duration: 2,
                });
              }
            }
          }
          window.darwin.stop();
          this.setState({ disabledAnteriorDrop: false })
          console.log("get assessment call")
        } catch (error) {
          console.log("catch ", error)
          window.darwin.stop();
        }
      }
    }
    if (this.state.toggleState == 2) {
      if (this.state.latSide == "left") {
        if (!this.state.start_stop) {
          this.setState({ disabledLateralDrop: true })
          console.log({
            name: "AROM",
            primaryKeypoint: 0,
            angles: [...this.state.newJointCheckedLeft, Number(...this.state.LatLeftPriValue)],
            dir: 1,
            minAmp: 30,
            primaryAngles: this.state.LatLeftPriValue[0] == '18' ? [18, 18] : this.state.LatLeftPriValue[0] % 2 == 0 ? [this.state.LatLeftPriValue[0], Number(this.state.LatLeftPriValue) + 1] : [Number(this.state.LatLeftPriValue) - 1, this.state.LatLeftPriValue[0]],
            ROMs: [
              [30, 160],
              [30, 160],
            ],
            totalReps: 3,
            totalSets: 2,
          })

          window.darwin.setExcersiseParams({
            name: "AROM",
            primaryKeypoint: 0,
            angles: [...this.state.newJointCheckedLeft, Number(...this.state.LatLeftPriValue)],
            dir: 1,
            minAmp: 30,
            primaryAngles: this.state.LatLeftPriValue[0] == '18' ? [18, 18] : this.state.LatLeftPriValue[0] % 2 == 0 ? [this.state.LatLeftPriValue[0], Number(this.state.LatLeftPriValue) + 1] : [Number(this.state.LatLeftPriValue) - 1, this.state.LatLeftPriValue[0]],
            ROMs: [
              [30, 160],
              [30, 160],
            ],
            totalReps: 3,
            totalSets: 2,
          });
          window.darwin.restart();
        } else {
          let data
          try {
            data = darwin.getAssesmentData();
            console.log("AROM DATA", data);
            console.log("AROM DATA IS UNDEFINED", data["AROM"]);
            if (this.state.selectedOrientation == 2) {
              if (data !== undefined && data !== null) {
                if (data["AROM"]) {
                  let TEMP = {};
                  TEMP["AROM"] = data[Object.keys(data)[0]];
                  console.log(TEMP);
                  this.props.FirstAssesment("LeftLateral_AI_Data", TEMP);
                  notification.success({
                    message: "Angles have been calculated",
                    placement: "bottomLeft",
                    duration: 2,
                  });
                }
              }
            }
            window.darwin.stop();
            this.setState({ disabledLateralDrop: false })
            console.log("get assessment call")
          } catch (error) {
            console.log("catch ", error)
            window.darwin.stop();
          }
        }
      }
      if (this.state.latSide == "right") {
        if (!this.state.start_stop) {
          this.setState({ disabledLateralDrop: true })
          console.log({
            name: "AROM",
            primaryKeypoint: 0,
            angles: [...this.state.newJointCheckedRight, Number(...this.state.LatRightPriValue)],
            dir: 1,
            minAmp: 30,
            primaryAngles: this.state.LatRightPriValue[0] == '18' ? [18, 18] : this.state.LatRightPriValue[0] % 2 == 0 ? [this.state.LatRightPriValue[0], Number(this.state.LatRightPriValue) + 1] : [Number(this.state.LatRightPriValue) - 1, this.state.LatRightPriValue[0]],
            ROMs: [
              [30, 160],
              [30, 160],
            ],
            totalReps: 3,
            totalSets: 2,
          })

          window.darwin.setExcersiseParams({
            name: "AROM",
            primaryKeypoint: 0,
            angles: [...this.state.newJointCheckedRight, Number(...this.state.LatRightPriValue)],
            dir: 1,
            minAmp: 30,
            primaryAngles: this.state.LatRightPriValue[0] == '18' ? [18, 18] : this.state.LatRightPriValue[0] % 2 == 0 ? [this.state.LatRightPriValue[0], Number(this.state.LatRightPriValue) + 1] : [Number(this.state.LatRightPriValue) - 1, this.state.LatRightPriValue[0]],
            ROMs: [
              [30, 160],
              [30, 160],
            ],
            totalReps: 3,
            totalSets: 2,
          });
          window.darwin.restart();
        } else {
          let data
          try {
            data = darwin.getAssesmentData();
            console.log("AROM DATA", data);
            console.log("AROM DATA IS UNDEFINED", data["AROM"]);
            console.log("right side ", data)
            if (this.state.selectedOrientation == 3) {
              if (data !== undefined && data !== null) {
                if (data["AROM"]) {
                  let TEMP = {};
                  TEMP["AROM"] = data[Object.keys(data)[0]];
                  console.log(TEMP);
                  this.props.FirstAssesment("RightLateral_AI_Data", TEMP);
                  notification.success({
                    message: "Angles have been calculated",
                    placement: "bottomLeft",
                    duration: 2,
                  });
                }
              }
            }
            this.setState({ disabledLateralDrop: false })
            console.log("get assessment call")
          } catch (error) {
            console.log("catch ", error)
            window.darwin.stop();
          }
        }
      }
    }
    this.setState({ SWITCH: !this.state.SWITCH });
    this.setState({ BACK: !this.state.BACK });
  };

  restart = () => {
    window.darwin.restart();
  };

  angles = (checkedValues) => {
    console.log(checkedValues);
    this.setState({ angles: checkedValues })
    window.darwin.setExcersiseParams({
      angles: checkedValues,
    });
  };

  start = () => {
    window.darwin.launchModel();
    window.darwin.stop();
  };
  setrLabels = () => { };
  // start();

  componentWillUnmount() {
    if (this.props.carePlanReducer.patient_main_code.length != 0) {
      const video = document.getElementById("video");
      const mediaStream = video.srcObject;
      try {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach((track) => track.stop());

        console.log("camera releasing....");
        console.log(tracks);
      } catch (err) {
        console.log(mediaStream)
        console.log("camera not releasing....");
        console.log(err);
      }
    }
  }
  callJoints = async () => {
    const romJoint = await GetJoint();
    console.log("joints are ", romJoint)
    let temp = romJoint.reverse();
    let obj = {};
    temp.filter((item) => {
      if (
        item.ex_jm_id !== 1 &&
        item.ex_jm_id !== 2 &&
        item.ex_jm_id !== 3 &&
        item.ex_jm_id !== 4 &&
        item.ex_jm_id !== 5
      ) {
        if (item.JointType == "Neck") {
          let temp = {
            joint: item.joint_name,
            min: item.MinAngle,
            max: item.MaxAngle,
          };
          obj["Cervical"] = temp;
        } else {
          console.log("joints are ", item)
          let temp = {
            joint: item.joint_name,
            min: item.MinAngle,
            max: item.MaxAngle,
          };
          obj[item.JointType] = temp;
        }
      }
    });
    let temp1 = [
      "Pelvic",
      "Cervical",
      "Hip",
      "Elbow",
      "Shoulder"
    ]

    let temp2 = [
      "Ankle",
      "Knee",
      "Wrist",
    ]
    console.log("joints are ", obj)
    this.setState({ romJoints: temp1 })
    this.props.Careplan("romJoints", obj);
  }
  componentDidMount() {
    //pp_ed_id
    if (this.props.carePlanReducer.patient_main_code.length > 0) {
      this.setState({ AI: false })
      this.callJoints()
      this.props.FirstAssesment("AI_data", "");
      this.props.FirstAssesment("Exercise_Name", "");
      const video = document.getElementById("video");
      const canvas = document.getElementById("output");
      const myVideo = document.getElementById("New_Ai_vid");
      let { width, height } = myVideo.getBoundingClientRect();
      this.setState({ latSide: "left" });
      //  video.width = width;
      //  video.height = height;
      const options = {
        video,
        videoWidth: 640,
        videoHeight: 480,
        canvas,
        supervised: true,
        showAngles: true,
      };
      // const options = {
      //     video,
      //     videoWidth: 550,
      //     videoHeight: 420,//window.innerHeight-20,
      //     canvas,
      //     // loadingEleId: 'loading',
      //     // mainEleId: 'main',
      //     supervised: true,
      //     showAngles: true,
      // };
      // this.innerHTML2();
      console.log(options)
      window.darwin.initializeModel(options);
      this.start();
      console.log("exerc ", this.state.primaryExercise);
      var priArr = [];
      // priArr = this.state.primaryExercise[0].primary_angles
      //   ? this.state.primaryExercise[0].primary_angles
      //   : this.state.primaryExercise[0].joint;
      // console.log("primary  ", priArr);
      // console.log("angles ", priArr);
      // const primaryAnglesValue = [];
      // allNewJoints.map((jo) => {
      //   priArr.map((pr) => {
      //     if (pr === jo.label) {
      //       primaryAnglesValue.push(jo.value);
      //     }
      //   });
      // });

      // window.darwin.setExcersiseParams({
      //   name: this.state.ExcerciseName,
      //   primaryKeypoint: 0,
      //   angles: [0, 1, 2, 3, 8, 9, 10, 11, 16, 17],
      //   dir: 1,
      //   minAmp: 30,
      //   primaryAngles: primaryAnglesValue,
      //   ROMs: [
      //     [30, 160],
      //     [30, 160],
      //   ],
      //   totalReps: 3,
      //   totalSets: 2,
      // });
      // this.setState({ angles: [0, 1, 2, 3, 8, 9, 10, 11, 16, 17] });
      // fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify({ exercise: this.state.ExcerciseName[0] }),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     console.log("data issss ", data);
      //     data.map((val) => {
      //       this.setState({ VideoData: val.image_path });
      //     });
      //     data.map((val) => {
      //       this.setState({ videoUrl: val.video_path });
      //     });
      //   });
      window.darwin.addProgressListener((setCount, repCount) => {
        console.log(setCount + "setCount");
      });
      /*
          window.addEventListener('blur', function(){
  
              const video = document.getElementById('video');
              if(video)
              {
                  const mediaStream = video.srcObject;
                  try{
                      const tracks = mediaStream.getTracks();
                     
  
                  // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
                       tracks[0].stop();
  
                  // Or stop all like so:
                  tracks.forEach(track => track.stop())
                  }
                  catch(err){
                      console.log(err)
                  }
                 
              }
           }, false);
  
          */
      /*
      window.addEventListener('focus', function(){
          const video = document.getElementById('video');
          const canvas = document.getElementById('output');
          
              try{
                  var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
                      var constraints = {
                      audio: false,
                      video: {
                      facingMode: facingMode
                      }
                      };
  
                     
                      navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                      video.srcObject = stream;
                        this.innerHTML2();
                      });
                   }
  
                   catch(err)
                   {
                       console.log(err)
                   }
         
      
          
       }, false);
  
       */
    } else {
      this.setState({ AI: false })
    }
  }
  componentDidUpdate = () => {
    console.log("romjoints ", Object.keys(this.props.carePlanReducer.romJoints))
  }
  clearState = () => {
    // this.setState({AntPri:[]})
    // this.setState({AntPriValue:[]})
    // this.setState({newJoint:joints})
    // this.setState({newJointChecked:[]})
    //newJointChecked
  }
  render() {
    window.addEventListener("beforeunload", () => { // the method that will be used for both add and remove event
      e.preventDefault();
      e.returnValue = '';
    });
    // onUnload = e => { // the method that will be used for both add and remove event
    //   e.preventDefault();
    //   e.returnValue = '';
    // }
    console.log("Joints ", joints);
    console.log("Joint pre ", this.state.PreKey);
    //window.onload(()=>console.log("user reloading"))
    return (
      <>
        {this.props.carePlanReducer.patient_main_code.length > 0 ?
          <Row
            //align="top"
            gutter={[16, 16]}
            className="arom_container checkbox-group-AROM"
          >
            <Col
              id="New_Ai_vid"
              className="arom_vid"
              md={14}
              lg={14}
              sm={24}
              xs={24}
            >
              <video
                id="video"
                className="video"
                playsInline
                style={{ display: "none" }}
              ></video>
              <canvas
                id="output"
                className="output"
                style={{ height: "450px" }}
              />
            </Col>
            <Card
              className="arom_button_grp2"
              style={{ display: "none" }}
              actions={[
                <Row className="arom_switch" justify="center" span={6}>
                  <Switch
                    disabled={this.state.disabledButton}
                    onChange={this.handleChange}
                    checked={this.state.SWITCH}
                  //  style={{ color: "red", marginTop: 5 }}
                  />{" "}
                  {this.state.SWITCH ? (
                    <PauseCircleOutlined className="arom_play_btn" />
                  ) : (
                    <PlayCircleOutlined className="arom_play_btn" />
                  )}
                </Row>,
                // <Row justify="start" span={6}>
                //   <Button
                //     // className="mx-2"
                //     disabled={this.state.SWITCH}
                //     style={{ border: "none" }}
                //     icon={<MinusCircleOutlined />}
                //     onClick={this.stop}
                //   >
                //     Stop
                //   </Button>
                // </Row>,

                <Row justify="start" span={6}>
                  <Button
                    style={{ border: "none" }}
                    icon={<CameraFilled />}
                    onClick={this.capture}
                  >
                    Snap
                  </Button>
                </Row>,
                <Row justify="start" span={6}>
                  <Button
                    //  className="mx-2"
                    style={{ border: "none" }}
                    icon={<RollbackOutlined />}
                    onClick={this.reset}
                  >
                    Reset
                  </Button>
                </Row>,
              ]}
            ></Card>
            <Col md={10} lg={10} sm={24} xs={24}>
              {/* <Row className="arom_details_tab">
              <Col span={12}>
                Patient :{" "}
                <b>
                 {getUserData.info.first_name.slice(0,1).toUpperCase() + userInfo.info.first_name.slice(1,userInfo.info.first_name.length).toLowerCase()}
                </b>
              </Col>
            </Row> */}

              {/* <Row className="arom_video_screen">
            <video
              src={
                process.env.REACT_APP_EXERCISE_URL + "/" + this.state.videoUrl
              }
              controls
              autoPlay
              loop
              id="videoscreen"
              className="videoScreen"
            />
          </Row> */}
              <Row>
                <Card
                  style={{ marginTop: 5, borderRadius: 10, width: "100%" }}
                  actions={[
                    <Button
                      className="mx-2 screenshot_btn"
                      style={{ border: "none" }}
                      icon={<CameraFilled />}
                      onClick={this.capture}
                    >
                      Screenshots
                    </Button>,
                    <Button
                      disabled={this.state.SWITCH}
                      className="mx-2"
                      style={{ border: "none" }}
                      icon={<CaretLeftFilled />}
                      onClick={this.back}
                    // disabled={this.state.BACK}
                    >
                      Backs
                    </Button>,
                  ]}
                >
                  <Row
                    className="arom_button_grp"
                    gutter={[10, 10]}
                    justify="space-around"
                  >
                    <Row justify="center" span={8}>
                      <Switch
                        disabled={this.state.disabledButton}
                        onChange={this.handleChange}
                        checked={this.state.SWITCH}
                      //  style={{ color: "red", marginTop: 5 }}
                      />{" "}
                      {this.state.SWITCH ? (
                        <PauseCircleOutlined />
                      ) : (
                        <PlayCircleOutlined />
                      )}
                    </Row>
                    {/* <Row justify="center" span={8}>
                  <Button
                    // className="mx-2"
                    disabled={this.state.SWITCH}
                    style={{ border: "none" }}
                    icon={<MinusCircleOutlined />}
                    onClick={this.stop}
                  >
                    Stop
                  </Button>
                </Row> */}

                    <Row justify="center" span={8}>
                      <Button
                        //  className="mx-2"
                        style={{ border: "none" }}
                        icon={<RollbackOutlined />}
                        onClick={this.reset}
                      >
                        Reset
                      </Button>
                    </Row>
                  </Row>
                  <Row
                    className="arom_containerrr"
                    style={{ marginTop: "5px" }}
                    gutter={[10, 10]}
                    justify="start"
                  >
                    {/* <Col span={12}>
                    <select
                      className="w-50 mx-2 my-3"
                      style={{ marginTop: 5 }}
                      name="ex"
                      id="ex"
                      defaultValue={this.state.selectedExercise}
                      onChange={(e) => this.ExChanges(e.target.value)}
                    >
                    </select>
                  </Col> */}
                    <Col>
                      <>
                        <div className="containerrr">
                          <div className="bloc-tabss">
                            <span
                              aria-disabled
                              style={{
                                width: "460px",
                                padding: "0px 0 0 0",
                                height: "35px",
                              }}
                              className={
                                this.state.toggleState == 1
                                  ? "tabss active-tabss"
                                  : "tabss"
                              }
                              onClick={() => {
                                //setToggleState(1);
                                this.setState({ toggleState: 1 });
                                this.setAngles([
                                  0, 1, 2, 3, 8, 9, 10, 11, 16, 17,
                                ]);
                                this.setState({
                                  romJoints: [
                                    "Pelvic",
                                    "Cervical",
                                    "Hip",
                                    "Elbow",
                                    "Shoulder"
                                  ]
                                })
                                let temp = this.props.carePlanReducer.romJoints
                                temp["Cervical"] = {
                                  "joint": "leftNeck",
                                  "min": 30,
                                  "max": 120
                                }
                                this.props.Careplan("romJoints", temp);
                                if (this.state.AntPriValue.length == 0) {
                                  this.setState({ disabledButton: true })
                                } else {
                                  this.setState({ disabledButton: false })
                                }
                                this.setSelectOrientation(1);
                                if (this.state.SWITCH) {
                                  this.handleChange();
                                }
                              }}
                            >
                              <div className="fw-bold ant-tabss-btn">
                                Anterior
                              </div>
                            </span>
                            <span
                              style={{
                                width: "460px",
                                padding: "0px 0 0 0",
                                height: "35px",
                              }}
                              className={
                                this.state.toggleState == 2
                                  ? "tabss active-tabss"
                                  : "tabss"
                              }
                              onClick={() => {
                                //setToggleState(2);
                                this.setState({ toggleState: 2 });
                                this.setAngles([0, 4, 6, 12, 14, 18]);
                                console.log("test ",)
                                this.setState({
                                  romJoints: [
                                    "Ankle",
                                    "Knee",
                                    "Wrist",
                                    "Shoulder",
                                    "Cervical",
                                    "Hip"
                                  ]
                                })
                                console.log("side ", this.props.carePlanReducer.romJoints)
                                let temp = this.props.carePlanReducer.romJoints
                                temp["Cervical"] = {
                                  joint: 'cervicalForwardFlexion',
                                  min: 30,
                                  max: 40
                                }
                                this.props.Careplan("romJoints", temp);
                                // let cervicalSide = {
                                //   joint:'cervicalForwardFlexion',
                                //   min:30,
                                //   max:40
                                // }
                                if (this.state.LatLeftPri.length == 0 && this.state.LatRightPri.length == 0) {
                                  this.setState({ disabledButton: true })
                                } else {
                                  this.setState({ disabledButton: false })
                                }
                                this.setSelectOrientation(2);
                                //this.clearState()
                                if (this.state.SWITCH) {
                                  this.handleChange();
                                }
                              }}
                            >
                              <div className="fw-bold ant-tabss-btn">Lateral</div>
                            </span>
                          </div>

                          <div
                            className={
                              this.state.toggleState == 1
                                ? "contentt  active-contentt"
                                : "contentt"
                            }
                          >
                            {/* <Radio checked value={"front"}>
          front
        </Radio> */}
                            <Col span={24}>
                              <b style={{ paddingLeft: '5px' }}>Step-1 : </b>
                              <b>Primary joints : </b>
                              <Select
                                className="w-50 mx-2 my-3"
                                style={{ marginTop: 5 }}
                                // name="ex"
                                // id="ex"
                                disabled={this.state.disabledAnteriorDrop}
                                placeholder="select"
                                id="LatL"
                                //value={this.state.selectState}
                                onChange={(e) => {
                                  this.setState({ disabledButton: false })
                                  // this.setState({ newJointChecked: JointNew[this.props.carePlanReducer.romJoints[e].joint] })
                                  // this.setState({ selectState: this.props.carePlanReducer.romJoints[e].joint })
                                  // this.setState({ primary_joints: primary_joint[this.props.carePlanReducer.romJoints[e].joint] })
                                  let tempIn = {}
                                  let tempOut = {}
                                  for (let i = 0; i < JointNew1[this.props.carePlanReducer.romJoints[e].joint].length; i++) {
                                    for (let j = 0; j < joints.length; j++) {
                                      if (JointNew1[this.props.carePlanReducer.romJoints[e].joint].includes(joints[j].value)) {
                                        tempOut[joints[j].value] = joints[j]
                                      } else {
                                        tempIn[joints[j].value] = joints[j]
                                      }
                                    }
                                  }
                                  //this.setState({ newJointChecked: [...this.state.newJointChecked, ...JointNew[this.props.carePlanReducer.romJoints[e].joint]] })
                                  // console.log("checking 1 ", tempIn)
                                  console.log("checking 1 ", Object.values(tempOut))
                                  console.log("checking 2 ", Object.keys(tempOut))
                                  let selected = []
                                  for (let k = 0; k < Object.keys(tempOut).length; k++) {
                                    selected.push(Number(Object.keys(tempOut)[k]))
                                  }
                                  console.log("checking 3 ", selected)
                                  this.setState({ OrgAntPrimary: selected })
                                  this.setState({ AntPri: Object.values(tempOut) })
                                  this.setState({ AntPriValue: selected })
                                  this.setState({ newJoint: Object.values(tempIn) })
                                  // tempIn = []
                                  // tempOut = []
                                }}
                              >
                                {this.state.romJoints.map((jo) => (
                                  <Option value={jo}>{jo}</Option>
                                ))}
                              </Select>
                            </Col>
                            <Checkbox.Group
                              options={this.state.AntPri}
                              // disabled
                              className="selectedJointsCheckbox checkbox-group-AROM"
                              value={this.state.AntPriValue}
                              onChange={(e) => {
                                // let temp = []
                                // for(let i=0;i<e.length;i++){
                                //   console.log("checkbox ",e[i])
                                //   if(!this.state.newJointChecked.includes(e[i])){
                                //     temp.push(e[i])
                                //   }
                                // }
                                //this.setState({ newJointChecked: e })
                                if (e.length >= 1) {
                                  this.setState({ AntPriValue: e })
                                  if (this.state.SWITCH) {
                                    this.setAngles1([...e, ...this.state.newJointChecked])
                                    //[...this.state.newJointChecked
                                  }
                                  console.log("checking ", e)
                                }
                              }}
                            />
                            <hr />
                            <div>
                              <b style={{ paddingLeft: '5px' }}>Step-2 : </b>
                              <b style={{ paddingLeft: '5px' }}>Secondary joints : </b> (optional)
                              <Checkbox.Group
                                options={this.state.newJoint}
                                // disabled
                                className="checkbox-group-AROM"
                                value={this.state.newJointChecked}
                                onChange={(e) => {
                                  // let temp = []
                                  // for(let i=0;i<e.length;i++){
                                  //   console.log("checkbox ",e[i])
                                  //   if(!this.state.newJointChecked.includes(e[i])){
                                  //     temp.push(e[i])
                                  //   }
                                  // }
                                  if (this.state.SWITCH) {
                                    this.setAngles1([...e, ...this.state.AntPriValue])
                                  }
                                  this.setState({ newJointChecked: e })
                                  console.log(e)
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className={
                              this.state.toggleState == 2
                                ? "contentt  active-contentt"
                                : "contentt"
                            }
                          >
                            <Col span={24}>
                              <b style={{ paddingLeft: '5px' }}>Step-1 : </b>
                              <b>Primary joints : </b>
                              <Select
                                className="w-50 mx-2 my-3"
                                style={{ marginTop: 5 }}
                                // name="ex"
                                // id="ex"
                                disabled={this.state.disabledLateralDrop}
                                placeholder="select"
                                id="LatL"
                                //value={this.state.selectState}
                                onChange={(e) => {
                                  this.setState({ selectState: e })
                                  this.setState({ selectStateL: e })
                                  this.setState({ selectStateR: e })
                                  if (this.state.latSide == "left") {
                                    this.setState({ disabledButton: false })
                                    // this.setState({ newJointCheckedLeft: JointNew[this.props.carePlanReducer.romJoints[e].joint] })
                                    // this.setState({ selectState: this.props.carePlanReducer.romJoints[e].joint })
                                    // this.setState({ primary_joints: primary_joint[this.props.carePlanReducer.romJoints[e].joint] })
                                    let tempIn = {}
                                    let tempOut = {}
                                    for (let i = 0; i < JointNew2[this.props.carePlanReducer.romJoints[e].joint].length; i++) {
                                      for (let j = 0; j < leftJoints.length; j++) {
                                        if (JointNew2[this.props.carePlanReducer.romJoints[e].joint].includes(leftJoints[j].value)) {
                                          tempOut[leftJoints[j].value] = leftJoints[j]
                                        } else {
                                          tempIn[leftJoints[j].value] = leftJoints[j]
                                        }
                                      }
                                    }
                                    //this.setState({ newJointChecked: [...this.state.newJointChecked, ...JointNew[this.props.carePlanReducer.romJoints[e].joint]] })
                                    // console.log("checking 1 ", tempIn)
                                    console.log("checking 1 ", e)
                                    console.log("checking 2 ", Object.keys(tempOut))
                                    let selected = []
                                    for (let k = 0; k < Object.keys(tempOut).length; k++) {
                                      selected.push(Number(Object.keys(tempOut)[k]))
                                    }
                                    this.setState({ OrgLatLeftPrimary: selected })
                                    this.setState({ LatLeftPri: Object.values(tempOut) })
                                    this.setState({ LatLeftPriValue: selected })
                                    this.setState({ lateralJoints: Object.values(tempIn) })
                                  }
                                  if (this.state.latSide == "right") {
                                    this.setState({ disabledButton: false })
                                    // this.setState({ newJointCheckedRight: JointNew[this.props.carePlanReducer.romJoints[e].joint] })
                                    // this.setState({ selectState: this.props.carePlanReducer.romJoints[e].joint })
                                    // this.setState({ primary_joints: primary_joint[this.props.carePlanReducer.romJoints[e].joint] })
                                    let tempIn = {}
                                    let tempOut = {}
                                    for (let i = 0; i < JointNew2[this.props.carePlanReducer.romJoints[e].joint].length; i++) {
                                      for (let j = 0; j < rightJoints.length; j++) {
                                        if (JointNew2[this.props.carePlanReducer.romJoints[e].joint].includes(rightJoints[j].value)) {
                                          tempOut[rightJoints[j].value] = rightJoints[j]
                                        } else {
                                          tempIn[rightJoints[j].value] = rightJoints[j]
                                        }
                                      }
                                    }
                                    //this.setState({ newJointChecked: [...this.state.newJointChecked, ...JointNew[this.props.carePlanReducer.romJoints[e].joint]] })
                                    // console.log("checking 1 ", tempIn)
                                    console.log("checking 1 ", e)
                                    console.log("checking 2 ", Object.keys(tempOut))
                                    let selected = []
                                    for (let k = 0; k < Object.keys(tempOut).length; k++) {
                                      selected.push(Number(Object.keys(tempOut)[k]))
                                    }
                                    this.setState({ OrgLatRightPrimary: selected })
                                    this.setState({ OrgLatRightPrimary: selected })
                                    this.setState({ LatRightPri: Object.values(tempOut) })
                                    this.setState({ LatRightPriValue: selected })
                                    this.setState({ lateralJointsR: Object.values(tempIn) })
                                  }
                                  // tempIn = []
                                  // tempOut = []
                                }}
                              >
                                {this.state.romJoints.map((jo) => (
                                  <Option value={jo}>{jo}</Option>
                                ))}
                              </Select>
                            </Col>
                            <Radio.Group
                              defaultValue={"left"}
                              onChange={(e) => {
                                this.changeSide(e.target.value)
                              }}
                            >
                              <Radio value={"left"}>left</Radio>
                              <Radio value={"right"}>right</Radio>
                            </Radio.Group>
                            <br />
                            <br />
                            {this.state.latSide == "left" &&
                              <>
                                <Checkbox.Group
                                  options={this.state.LatLeftPri}
                                  // disabled
                                  className="selectedJointsCheckbox checkbox-group-AROM"
                                  value={this.state.LatLeftPriValue}
                                  onChange={(e) => {
                                    if (e.length >= 1) {
                                      this.setState({ LatLeftPriValue: e })
                                      if (this.state.SWITCH) {
                                        this.setAngles1([...e, ...this.state.newJointCheckedLeft])
                                        //[...this.state.newJointChecked
                                      }
                                      console.log("checking ", e)
                                    }
                                  }}
                                />
                                <hr />
                              </>}
                            {this.state.latSide == "left" && <div>
                              <b style={{ paddingLeft: '5px' }}>Step-2 : </b>
                              <b style={{ paddingLeft: '5px' }}>Secondary joints : </b> (optional)
                              <Checkbox.Group
                                options={this.state.lateralJoints}
                                // disabled
                                className="checkbox-group-AROM"
                                value={this.state.newJointCheckedLeft}
                                //defaultValue={['Apple']}
                                onChange={(e) => {
                                  console.log(e)
                                  if (this.state.SWITCH) {
                                    this.setAngles1([...e, ...this.state.LatLeftPriValue])
                                    //[...e,...this.state.newJointChecked]
                                  }
                                  this.setState({ newJointCheckedLeft: e })
                                }}
                              />
                            </div>}
                            {this.state.latSide == "right" &&
                              <>
                                <Checkbox.Group
                                  options={this.state.LatRightPri}
                                  // disabled
                                  className="selectedJointsCheckbox checkbox-group-AROM"
                                  value={this.state.LatRightPriValue}
                                  onChange={(e) => {
                                    if (e.length >= 1) {
                                      this.setState({ LatRightPriValue: e })
                                      if (this.state.SWITCH) {
                                        this.setAngles1([...e, ...this.state.newJointCheckedRight])
                                        //[...this.state.newJointChecked
                                      }
                                      console.log("checking ", e)
                                    }
                                  }}
                                />
                                <hr />
                              </>}
                            {this.state.latSide == "right" && <div>
                              <b style={{ paddingLeft: '5px' }}>Step-2 : </b>
                              <b style={{ paddingLeft: '5px' }}>Secondary joints : </b> (optional)
                              <Checkbox.Group
                                options={this.state.lateralJointsR}
                                // disabled
                                className="checkbox-group-AROM"
                                placeholder="Select"
                                value={this.state.newJointCheckedRight}
                                //defaultValue={['Apple']}
                                onChange={(e) => {
                                  console.log(e)
                                  if (this.state.SWITCH) {
                                    this.setAngles1([...e, ...this.state.LatRightPriValue])
                                  }
                                  this.setState({ newJointCheckedRight: e })
                                }}
                              />
                            </div>}
                          </div>
                        </div>
                      </>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </Col>
          </Row>
          : <div>
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
      </>
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
  Careplan: (key, value) => {
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: key,
        value: value,
      },
    });
  },
});

const mapStateToProps = (state) => ({
  carePlanReducer: state.carePlanRedcucer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AI);
