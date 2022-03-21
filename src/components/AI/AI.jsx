import React, { Component } from 'react';
import { Row, Col, Switch, Checkbox, Card, Button, notification, Radio } from "antd"
import { CaretLeftFilled, CameraFilled, MinusCircleOutlined, PlayCircleOutlined, PauseCircleOutlined, SwapOutlined, RollbackOutlined } from '@ant-design/icons';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
import { connect } from "react-redux";
import "../../styles/Layout/AI_Video.css"
import html2canvas from 'html2canvas';
import Loading from '../UtilityComponents/Loading';
import { FirstAssesment } from '../../contextStore/reducers/Assesment/Assesment1';
import {add_angles} from '../../API/Assesment/assementApi'
import Cookies from 'js-cookie';

import './Ai.css'
import AiTab from './AiTab';
// import {Video} from "../../styles/ScreenDesign/ypga.jpg"

const indices1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const labels = ['L Shoulder', 'R Shoulder'
    , 'L Elbow', 'R Elbow',
    'L Hip', 'R Hip',
    'L Knee', 'R Knee',
    'L Neck', 'R Neck',
    'L Pelvic', 'R Pelvic'
];


const joints = [
    { value: 0, label: "leftShoulder" },
    { value: 1, label: "rightShoulder" },
    { value: 2, label: "leftElbow" },
    { value: 3, label: "rightElbow" },
    { value: 4, label: "leftHip" },
    { value: 5, label: "rightHip" },
    { value: 6, label: "leftKnee" },
    { value: 7, label: "rightKnee" },
    { value: 8, label: "leftNeck" },
    { value: 9, label: "rightNeck" },
    { value: 10, label: "leftPelvic" },
    { value: 11, label: "rightPelvic" },
]
const leftJoints = [
  { value: 0, label: "leftShoulder" },
  { value: 2, label: "leftElbow" },
  { value: 4, label: "leftHip" },
  { value: 6, label: "leftKnee" },
  { value: 8, label: "leftNeck" },
  { value: 10, label: "leftPelvic" },
]

const rightJoints = [

  { value: 1, label: "rightShoulder" },
  { value: 3, label: "rightElbow" },
  { value: 5, label: "rightHip" },
  { value: 7, label: "rightKnee" },
  { value: 9, label: "rightNeck" },
  { value: 11, label: "rightPelvic" },
]


let data = "";
let screenshot = [];

console.log('in careplan')
class AI extends Component {

    constructor(props) {
       
        super(props);

        console.log('history in ai')    
        console.log(this.props.history)       
        var preveState = this.props.history.location.state.Excercise?this.props.history.location.state.Excercise:{};
        let preIndices = (Object.keys(preveState))
        console.log('preveState:'+preveState);
        console.log('preIndices:'+preIndices);
        let PreJoints = this.props.history.location.state.Joints;
        console.log("exercises primary",this.props.history.location.state.exercisePrimary)
        console.log('PreJoints:'+PreJoints);
        let PreJointKeys = (Object.keys(PreJoints));
        let PreJointValue = (Object.values(PreJoints));
        console.log('PreJointKeys:'+PreJointKeys);
        console.log('PreJointValue:'+PreJointValue);
        console.log(this.props.history.location)
       
        
        //aswin 11/27/2021 start
        this.state = {
            ExcerciseName: preveState,
            ExcerciseIndices: preIndices,
            PreKey: PreJointKeys,
            preValue: PreJointValue,
            start_stop: false,
            BACK: false,
            SWITCH: false,
            loading: false,
            VideoData: "",
            videoUrl: "",
            visible: "hidden",
            data:[],
            patienId: '56',
            exerciseId: this.props.history.location.exerciseId,
            arrayIndex:0,
            primaryExercise:this.props.history.location.state.exercisePrimary,
            selectedExercise:preveState[0],
            selectedOrientation:1,
            angles:[],
            ref:1,
            toggleState:1,
            lateralJoints:leftJoints
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
        this.innerHTML2 = this.innerHTML2.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this)
        this.restart = this.restart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ExChanges = this.ExChanges.bind(this);
        this.angles = this.angles.bind(this);
        this.back = this.back.bind(this);
        this.start = this.start.bind(this);
        this.capture = this.capture.bind(this);
        this.ExDef = this.ExDef.bind(this);
      //  this.setState({primaryExercise:this.props.history.location.state.exercisePrimary})
    }


    back = () => { 
        const video = document.getElementById('video');


        const mediaStream = video.srcObject;
        try {
            const tracks = mediaStream.getTracks();
            tracks[0].stop();
            tracks.forEach(track => track.stop())

            console.log('cameraa')
            console.log(tracks)
        }
        catch (err) {
            console.log(err)
        }

        this.props.history.push("/assessment/1")
    }
    setSelectOrientation = (value) => {
      this.setState({ selectedOrientation : value })
    }
    setAngles = (value) => {
      this.setState({ angles : value })
    }
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
           
                check.push(tempjoints[i].value)
           
        }
        return check;
    }

    changeSide = (value) => {
        if(value=='left'){
          //setLateralJoints(leftJoints)
          this.setState({lateralJoints: leftJoints })
          this.setAngles([0,2,4,6,8,10])
          this.setSelectOrientation(2)
        }
        if(value=='right'){
          //setLateralJoints(rightJoints)
          this.setState({lateralJoints: rightJoints })
          this.setAngles([1,3,5,7,9,11])
          this.setSelectOrientation(3)
        }
        if(this.state.SWITCH){
          this.handleChange()
        }
      
    }
    
    timer=()=>{
        this.interval= setInterval(() => {
        
               this.newangles= window.darwin.getAllAnglesData()
            //   console.log(this.newangles)
                this.index=Object.keys(this.newangles)
                var today = new Date();
                var newtime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
               if(this.index[0])
               {    //let newindex=this.index[0]
               
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
   
       }
    innerHTML2 = () => {
        const exerise = document.getElementById("ex")
        var i=0
        if (this.state.ExcerciseIndices.length > 0) {
          //  exerise.innerHTML += '<option value="Please Select">Select the Excercise</option>'
            for (i=0;i<this.state.ExcerciseIndices.length;i++) {
                let lable = this.state.ExcerciseName[i]
                console.log('exercise is' +  lable)
                console.log(this.state.ExcerciseName[i])
                exerise.innerHTML += `<option value=${JSON.stringify(lable)}>${lable}</option>`
            }
        }

    }

    stop = async () => {
        window.darwin.stop();
        data = window.darwin.getAssesmentData();
        this.setState({ SWITCH: false })
        this.setState({ BACK: false })
        this.setState({ start_stop: false });
        if (!Object.keys(data).length) {
            notification.error({
                message: 'Angles not calculated',
                placement: 'bottomLeft',
                duration: 2
            });

        }
        else {
            console.log("Ai data ",this.props.history.location.state.Excercise.length)
            console.log("Ai data ",data)
            console.log("Ai data ",data[this.props.history.location.state.Excercise[0]])
            console.log("Ai data ",this.props.history.location.state.Excercise)
            if(this.props.history.location.state.Excercise.length===1){
                console.log("Ai data ",data[this.props.history.location.state.Excercise[0]])
                let name = {}
                name[this.props.history.location.state.Excercise[0]] = data[this.props.history.location.state.Excercise[0]]
                this.props.FirstAssesment("AI_data", name)
                this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
                console.log("Ai data captured if ",name)
                notification.success({
                    message: 'Angles have been calculated',
                    placement: 'bottomLeft',
                    duration: 2
                })
            }else{
                console.log("Ai data captured else ",data)
                this.props.FirstAssesment("AI_data", data)
                this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
                notification.success({
                    message: 'Angles have been calculated',
                    placement: 'bottomLeft',
                    duration: 2
                })
            }
        }
       
      //const response=  await add_angles(this.array)
    //  console.log(response)
       // console.log(angles.index[0])
      //  console.log(state)
    };

    reset = () => {
        console.log("From Reset")
        this.setState({ start_stop: false });
        this.setState({ SWITCH: false })
        window.darwin.stop();
        window.darwin.resetData();
    }

    //to take ScreenShot
    capture = () => {
        window.scrollTo(0, 0)
        this.setState({ visible: "visible" })
        const out = document.getElementById("scr_out");
        html2canvas(document.getElementById("output")).then(function (canvas) {
            screenshot.push(canvas.toDataURL("image/jpeg", 0.9))
            var extra_canvas = document.createElement("canvas");
            extra_canvas.setAttribute('width', 136);
            extra_canvas.setAttribute('height', 96);
            var ctx = extra_canvas.getContext('2d');
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 136, 96);
            var dataURL = extra_canvas.toDataURL();
            var img = document.createElement('img');
            img.src = dataURL
            out.appendChild(img);
        },
        );
        this.props.FirstAssesment("AI_screenshot", screenshot)
        console.log(screenshot)
    }



    ExDef = () => {
        fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ exercise: [this.state.ExcerciseName[0]] })

        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
            this.setState({exerciseId:data[0].ex_em_id})
            data.map((val) => {
                this.setState({ VideoData: val.image_path })
            })
            data.map((val) => {

                this.setState({ videoUrl: val.video_path })
            })
        })
    }

    ExChanges = (e) => {
        //aswin 11/27/2021 start
        this.setState({ selectedExercise : e.target.value })
        console.log("value is ",e.target.value)
        console.log("initial value ",  this.state.PreKey)
        console.log("exercise passed are ",this.state.primaryExercise)
        let priArr = []
        this.state.primaryExercise.map(ex=>{
            if(ex.exercise_shortname==e.target.value){
                priArr = ex.primary_angles?ex.primary_angles:ex.joint
            }
        })
        console.log("primary  ",priArr)
        console.log("angles ",priArr)
        const primaryAnglesValue = []
        joints.map(jo=>{
           priArr.map(pr=>{
               if(pr===jo.label){
                primaryAnglesValue.push(jo.value)
               }
           })
        })
        console.log("primaryAnglesValue ",primaryAnglesValue)
        this.setState({selectedOrientation:1})
        this.setState({angles : [0,1,2,3,4,5,6,7,8,9,10,11]})
        this.setState({toggleState:1})
        this.setState({lateralJoints: leftJoints })
        window.darwin.setExcersiseParams({
            "name": this.state.ExcerciseName,
            "primaryKeypoint": 0,
            "angles": [0,1,2,3,4,5,6,7,8,9,10,11],
            "dir": 1,
            "minAmp": 30,
            "primaryAngles": primaryAnglesValue,
            "ROMs": [[30, 160], [30, 160]],
            "totalReps": 3,
            "totalSets": 2
        });
        //aswin 11/27/2021 start
        fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ exercise: e.target.value })

        }).then(res => {
            return res.json();
        }).then(data => {
            console.log('data ',data)
            data.map((val) => {
                this.setState({ VideoData: val.image_path })
            })
            data.map((val) => {

                this.setState({ videoUrl: val.video_path })
            })
        })
        
        console.log('video state is')
        console.log(this.state)
    }

   
    handleChange =async  () => {
        
        
        this.setState({ start_stop: !this.state.start_stop });
        if (!this.state.start_stop) {
            window.darwin.restart();
            window.darwin.setExcersiseParams({
              angles: this.state.angles,
            });
            darwin.selectOrientation(this.state.selectedOrientation);
            this.timer();
        } else {
        //    clearInterval(this.interval)

           clearInterval(this.interval)
            console.log('FINALLL!!!!')
            let data = darwin.getAssesmentData()
            console.log("front", data);
            if(this.state.selectedOrientation==1){
              this.props.FirstAssesment("Anterior_AI_Data", data)
            //   if(this.props.history.location.state.Excercise.length===1){
            //     console.log("Ai data ",data[Object.keys(data)[0]])
            //     let name = {}
            //     name[Object.keys(data)[0]] = data[Object.keys(data)[0]]
            //     this.props.FirstAssesment("Anterior_AI_Data", name)
            //     this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
            //     console.log("Ai data captured if ",name)
            //     notification.success({
            //         message: 'Angles have been calculated',
            //         placement: 'bottomLeft',
            //         duration: 2
            //     })
            // }else{
            //     console.log("Ai data captured else ",data[Object.keys(data)[0]])
            //     this.props.FirstAssesment("AI_data", data[Object.keys(data)[0]])
            //     this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
            //     notification.success({
            //         message: 'Angles have been calculated',
            //         placement: 'bottomLeft',
            //         duration: 2
            //     })
            //   }
            }
            if(this.state.selectedOrientation==2){
              this.props.FirstAssesment("LeftLateral_AI_Data", data)
            //   if(this.props.history.location.state.Excercise.length===1){
            //     console.log("Ai data ",data[Object.keys(data)[0]])
            //     let name = {}
            //     name[Object.keys(data)[0]] = data[Object.keys(data)[0]]
            //     this.props.FirstAssesment("LeftLateral_AI_Data", name)
            //     this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
            //     console.log("Ai data captured if ",name)
            //     notification.success({
            //         message: 'Angles have been calculated',
            //         placement: 'bottomLeft',
            //         duration: 2
            //     })
            // }else{
            //     console.log("Ai data captured else ",data[Object.keys(data)[0]])
            //     this.props.FirstAssesment("LeftLateral_AI_Data", data[Object.keys(data)[0]])
            //     this.props.FirstAssesment("Exercise_Name", this.props.history.location.state.Excercise)
            //     notification.success({
            //         message: 'Angles have been calculated',
            //         placement: 'bottomLeft',
            //         duration: 2
            //     })
            //   }
            }
            if(this.state.selectedOrientation==3){
              this.props.FirstAssesment("RightLateral_AI_Data", data)
            }
           console.log(this.state.data)
           this.array=JSON.stringify(this.state.data)
           console.log('hashedd')
           this.hashed=Buffer.from(this.array).toString("base64")
           console.log(this.hashed)
          // console.log('unhashed')
         //  console.log(atob(this.array))
         //  const response=  await add_angles(this.hashed)
    //  console.log(response)
           
            window.darwin.stop();
        }
        this.setState({ SWITCH: !this.state.SWITCH })
        this.setState({ BACK: !this.state.BACK })
    }

    restart = () => {
        window.darwin.restart();
        
    };

    angles = (checkedValues) => {
      console.log(checkedValues)
        window.darwin.setExcersiseParams({
            "angles": checkedValues
        })
    }

    start = () => {
        window.darwin.launchModel();
        window.darwin.stop();
    };

    // start();

    componentWillUnmount(){
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
    componentDidMount() {
        this.props.FirstAssesment("AI_data", "")
        this.props.FirstAssesment("Exercise_Name", "")
        const video = document.getElementById('video');
        const canvas = document.getElementById('output');
        const myVideo = document.getElementById('Ai_vid')
        let { width, height } = myVideo.getBoundingClientRect()
        video.width = width;
        const options = {
            video,
            videoWidth: 640,
            videoHeight: 540,
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
        this.innerHTML2();
        window.darwin.initializeModel(options);
        this.start();
        console.log('exerc ',this.state.primaryExercise)
        var priArr = []
        //priArr = this.state.primaryExercise[0].primary_angles
        priArr = this.state.primaryExercise[0].primary_angles?this.state.primaryExercise[0].primary_angles:this.state.primaryExercise[0].joint
        // this.state.primaryExercise.map(ex=>{
        //     if(ex.exercise_shortname==e.target.value){
        //         priArr = ex.joints
        //     }
        // })
        console.log("primary  ",priArr)
        console.log("angles ",priArr)
        const primaryAnglesValue = []
        joints.map(jo=>{
           priArr.map(pr=>{
               if(pr===jo.label){
                primaryAnglesValue.push(jo.value)
               }
           })
        })
        window.darwin.setExcersiseParams({
            "name": this.state.ExcerciseName,
            "primaryKeypoint": 0,
            "angles": [0,1,2,3,4,5,6,7,8,9,10,11],
            "dir": 1,
            "minAmp": 30,
            "primaryAngles": primaryAnglesValue,
            "ROMs": [[30, 160], [30, 160]],
            "totalReps": 3,
            "totalSets": 2
        });
        this.setState({angles : [0,1,2,3,4,5,6,7,8,9,10,11]})
        fetch(`${process.env.REACT_APP_API}/exercise_detail/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ exercise: this.state.ExcerciseName[0] })

        }).then(res => {
            return res.json();
        }).then(data => {
            console.log("data issss ",data)
            data.map((val) => {
                this.setState({ VideoData: val.image_path })
            })
            data.map((val) => {

                this.setState({ videoUrl: val.video_path })
            })
        })

        window.darwin.addProgressListener((setCount, repCount) => {

            console.log(setCount + 'setCount')
        })

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

    }


    render() {


        console.log("Joints ",joints)
        console.log('Joint pre ',this.state.PreKey)

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
            <>
                <div className="body" id="body">
                    <div id="info" style={{ display: 'none' }}>
                        
                    </div>
                    <div id="loading" style={{ display: 'flex' }}>

                    </div>
                    <Row className="main-row"  id="main-row">
                        <Col md={14} lg={14} sm={24} xs={14} id="Ai_vid" className="Ad_vid" >
                            <video  id="video" className="video" playsInline style={{ display: "none" }}>
                            </video>
                            <canvas id="output" className="output" style={{height:'440px'}}/>
                        </Col>
                        <Col md={8} lg={8} sm={24} xs={8} id="Ex_vid" className="Ex_vid">
                            <div className="">
                                <video src={process.env.REACT_APP_EXERCISE_URL+'/'+this.state.videoUrl} controls autoPlay loop id="videoscreen" className="videoScreen" />
                            </div>
                            <Card style={{ marginTop: 5, borderRadius: 10 }} actions={[
                                <Button className="mx-2"
                                    style={{ border: 'none' }}
                                    icon={<CameraFilled />}
                                    onClick={this.capture}>
                                    Screenshots</Button>,
                                <Button className="mx-2"
                                    style={{ border: 'none' }}
                                    icon={<CaretLeftFilled />}
                                    onClick={this.back}
                                    disabled={this.state.BACK}>
                                    Backs</Button>,
                            ]}>
                                <div id='main' >
                                    <div>
                                        <Row justify="space-around" className="text-center">
                                            <Col>
                                                <Switch onChange={this.handleChange} checked={this.state.SWITCH} style={{ color: "red", marginTop: 5 }} />  {this.state.SWITCH ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                                            </Col>
                                            <Col>
                                                <Button className="mx-2"
                                                    disabled={this.state.SWITCH}
                                                    style={{ border: 'none' }}
                                                    icon={<MinusCircleOutlined />}
                                                    onClick={this.stop}>
                                                    Stop</Button>
                                            </Col>
                                            <Col >
                                                <Button className="mx-2"
                                                    style={{ border: 'none' }}
                                                    icon={<RollbackOutlined />}
                                                    onClick={this.reset}>
                                                    Reset</Button>
                                            </Col>
                                            
                                        </Row>
                                        <row>
                                            <Col >
                                                <select className="w-50 mx-2 my-3" style={{ marginTop: 5 }} name="ex" id="ex" defaultValue={this.state.selectedExercise} onChange={this.ExChanges}>
                                                </select>
                                            </Col>
                                        </row>
                                    </div>
                                    <div className="detail" id="detail">
                                    <p style={{marginBottom:'4px'}}> <b>Patient Name :</b>  {this.props.history.location.state.stateName.patient_name} </p>
                                    <p style={{marginBottom:'4px'}}> <b>Excercise Name :</b>  {this.state.selectedExercise}</p>
                                    <p style={{marginBottom:'4px'}}> <b>Joints :</b> </p>
                                    </div>
                                    {/* <div >
                                        <Checkbox.Group 
                                       // defaultValue={joints}
                                        defaultValue={this.ifCheck()} 
                                        onChange={this.angles}>
                                            <Row>
                                                {joints.map(item => (
                                                    <Col span={8}>
                                                        <Checkbox value={item.value}>{labels[item.value]}</Checkbox>
                                                    </Col>))}
                                            </Row>
                                        </Checkbox.Group>
                                    </div> */}
                                     <>
      <div className="containerrr">
        <div className="bloc-tabss">
          <span
            aria-disabled
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={this.state.toggleState == 1 ? "tabss active-tabss" : "tabss"}
            onClick={() => {
              //setToggleState(1);
              this.setState({toggleState:1})
              this.setAngles([0,1,2,3,4,5,6,7,8,9,10,11])
              this.setSelectOrientation(1)
              if(this.state.SWITCH){
                this.handleChange()
              }
            }}
          >
            <div className="fw-bold ant-tabss-btn">Anterior</div>
          </span>
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={this.state.toggleState == 2 ? "tabss active-tabss" : "tabss"}
            onClick={() => {
              //setToggleState(2);
              this.setState({toggleState:2})
              this.setAngles([0,2,4,6,8,10])
              this.setSelectOrientation(2)
              if(this.state.SWITCH){
                this.handleChange()
              }
            }}
          >
            <div className="fw-bold ant-tabss-btn">Lateral</div>
          </span>
        </div>

        <div
          className={
            this.state.toggleState == 1 ? "contentt  active-contentt" : "contentt"
          }
        >
          {/* <Radio checked value={"front"}>
            front
          </Radio> */}
          <br />
          <div>
            <Checkbox.Group onChange={this.angles} defaultValue={()=>this.ifCheck(joints)} >
              <Row>
                {joints.map((item) => (
                  <Col span={8}>
                    <Checkbox value={item.value}>{labels[item.value]}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <div
          className={
            this.state.toggleState == 2 ? "contentt  active-contentt" : "contentt"
          }
        >
          <Radio.Group defaultValue={"left"} onChange={(e)=>this.changeSide(e.target.value)}>
            <Radio  value={"left"}>left</Radio>
            <Radio value={"right"}>right</Radio>
          </Radio.Group>
          <br />
          <br />
          <div>
          <Checkbox.Group onChange={this.angles} value={()=>this.ifCheck(this.state.lateralJoints)} >
              <Row>
                {this.state.lateralJoints.map((item) => (
                  <Col span={8}>
                    <Checkbox value={item.value}>{labels[item.value]}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </>
                                    {/* <AiTab 
                                      refSpan={this.state.ref}
                                      ifCheck={this.ifCheck}
                                      changeAngles={this.angles}
                                      setSelectOrientation={this.setSelectOrientation}
                                      setAngles={this.setAngles}
                                      handleChange={this.handleChange}
                                      switchstate={this.state.SWITCH}  
                                      leftJoints={leftJoints} 
                                      rightJoints={rightJoints} 
                                      joints={joints} 
                                      labels={labels}/> */}
                                    <div id="scr_out">
                                        <h5 style={{ visibility: this.state.visible }}>Preview:</h5>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
            </Profiler>
        )
    }
}

const mapDispatchToProps = dispatch => ({

    FirstAssesment: (key, value) => {
        dispatch({
            type: STATECHANGE,
            payload: {
                key,
                value
            },
        });
    },
});


export default connect(null, mapDispatchToProps)(AI)



