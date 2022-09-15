import { Button, Card, Checkbox, Col, Row, Select, Switch, Radio, notification } from 'antd';
import React, { Component } from 'react'
import './AROM.css'
import {
    CaretLeftFilled,
    CameraFilled,
    MinusCircleOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    SwapOutlined,
    RollbackOutlined,
} from "@ant-design/icons";
import { GetJoint } from '../../API/care-plan/care-plan-api';
import { connect } from 'react-redux';
import { STATECHANGE } from '../../contextStore/actions/Assesment';
import { CARE_PLAN_STATE_CHANGE } from '../../contextStore/actions/care-plan-action';
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
    { value: 0, label: "L Shoulder Flex/Ext" },
    { value: 4, label: "L Hip Flex/Ext" },
    { value: 6, label: "L Knee Flex/Ext" },
    { value: 12, label: "L Wrist Flex/Ext" },
    { value: 14, label: "L Ankle Dorsi/Planter Flex" },
    { value: 18, label: "Cervical Flex/Ext" },
];

const rightJoints = [
    { value: 1, label: "R Shoulder Flex/Ext" },
    { value: 5, label: "R Hip Flex/Ext" },
    { value: 7, label: "R Knee Flex/Ext" },
    { value: 13, label: "R Wrist Flex/Ext" },
    { value: 15, label: "R Ankle Dorsi/Planter Flex" },
    { value: 18, label: "Cervical Flex/Ext" },
];
const { Option } = Select
class AROM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleState: 1,
            disabledLateralDrop:false,
            disabledButton: true,
            angles: [],
            disabledAnteriorDrop: false,
            SWITCH: false,
            newJoint: joints,
            romJoints: [],
            newJointChecked: [],
            lateralJoints: leftJoints,
            lateralJointsR: rightJoints,
            latSide: "left",
            OrgAntPrimary: [],
            OrgLatLeftPrimary: [],
            OrgLatRightPrimary: [],
            primary_joints: [],
            newJointCheckedLeft: [],
            newJointCheckedRight: [],
            AntPri: [],
            AntPriValue: [],
            LatLeftPri: [],
            LatLeftPriValue: [],
            LatRightPri: [],
            LatRightPriValue: [],
            start_stop: false
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
    setAngles = (value) => {
        this.setState({ angles: value });
    };
    setSelectOrientation = (value) => {
        this.setState({ selectedOrientation: value });
    };
    handleChange = async () => {
        console.log("handle change")
        this.setState({ start_stop: !this.state.start_stop });
        if (this.state.toggleState == 1) {
            if (!this.state.start_stop) {
                this.setState({ disabledAnteriorDrop: true })
                let obj = {
                    type:'anterior',
                    data:{
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
                    }
                }
                console.log(obj)
                this.props.sendMsg(JSON.stringify(obj))
                this.props.setFreeze(true)
                // window.darwin.restart();
                // window.darwin.setExcersiseParams({
                //   name: "AROM",
                //   primaryKeypoint: 0,
                //   angles: [...this.state.newJointChecked, ...this.state.AntPriValue],
                //   dir: 1,
                //   minAmp: 30,
                //   primaryAngles: this.state.OrgAntPrimary,
                //   ROMs: [
                //     [30, 160],
                //     [30, 160],
                //   ],
                //   totalReps: 3,
                //   totalSets: 2,
                // });
            } else {
                let obj = {
                    type:'get-arom',
                    side:'arom-front'
                  }
                  this.props.sendMsg(JSON.stringify(obj))
                  this.props.setFreeze(false)
                // let data
                // console.log("else")
                // //    clearInterval(this.interval)

                // // clearInterval(this.interval);
                // console.log("FINALLL!!!!");
                // try {
                //     //   data = darwin.getAssesmentData();
                //     console.log("AROM DATA", data);
                //     console.log("AROM DATA IS UNDEFINED", data["AROM"]);
                //     if (this.state.selectedOrientation == 1) {
                //         if (data !== undefined && data !== null) {
                //             if (data["AROM"]) {
                //                 let TEMP = {};
                //                 TEMP["AROM"] = data[Object.keys(data)[0]];
                //                 console.log(TEMP);
                //                 this.props.FirstAssesment("Anterior_AI_Data", TEMP);
                                notification.success({
                                    message: "Angles have been calculated",
                                    placement: "bottomLeft",
                                    duration: 2,
                                });
                //             }
                //         }
                //     }
                //     //   window.darwin.stop();
                     this.setState({ disabledAnteriorDrop: false })
                //     console.log("get assessment call")
                // } catch (error) {
                //     console.log("catch ", error)
                //     window.darwin.stop();
                // }
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
                    let obj = {
                        type:'anterior',
                        data:{
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
                        }
                    }
                    console.log(obj)
                    this.props.sendMsg(JSON.stringify(obj))
                    this.props.setFreeze(true)
                    //   window.darwin.setExcersiseParams({
                    //     name: "AROM",
                    //     primaryKeypoint: 0,
                    //     angles: [...this.state.newJointCheckedLeft, Number(...this.state.LatLeftPriValue)],
                    //     dir: 1,
                    //     minAmp: 30,
                    //     primaryAngles: this.state.LatLeftPriValue[0] == '18' ? [18, 18] : this.state.LatLeftPriValue[0] % 2 == 0 ? [this.state.LatLeftPriValue[0], Number(this.state.LatLeftPriValue) + 1] : [Number(this.state.LatLeftPriValue) - 1, this.state.LatLeftPriValue[0]],
                    //     ROMs: [
                    //       [30, 160],
                    //       [30, 160],
                    //     ],
                    //     totalReps: 3,
                    //     totalSets: 2,
                    //   });
                    //   window.darwin.restart();
                } else {
                    let obj = {
                        type:'get-arom',
                        side:'arom-left'
                      }
                      this.props.sendMsg(JSON.stringify(obj))
                      this.props.setFreeze(false)
                    // let data
                    // try {
                    //     // data = darwin.getAssesmentData();
                    //     console.log("AROM DATA", data);
                    //     console.log("AROM DATA IS UNDEFINED", data["AROM"]);
                    //     if (this.state.selectedOrientation == 2) {
                    //         if (data !== undefined && data !== null) {
                    //             if (data["AROM"]) {
                    //                 let TEMP = {};
                    //                 TEMP["AROM"] = data[Object.keys(data)[0]];
                    //                 console.log(TEMP);
                    //                 this.props.FirstAssesment("LeftLateral_AI_Data", TEMP);
                                    notification.success({
                                        message: "Angles have been calculated",
                                        placement: "bottomLeft",
                                        duration: 2,
                                    });
                    //             }
                    //         }
                    //     }
                    //     // window.darwin.stop();
                         this.setState({ disabledLateralDrop: false })
                    //     console.log("get assessment call")
                    // } catch (error) {
                    //     console.log("catch ", error)
                    //     window.darwin.stop();
                    // }
                }
            }
            if (this.state.latSide == "right") {
                if (!this.state.start_stop) {
                    this.setState({ disabledLateralDrop: true })
                    // console.log({
                    //     name: "AROM",
                    //     primaryKeypoint: 0,
                    //     angles: [...this.state.newJointCheckedRight, Number(...this.state.LatRightPriValue)],
                    //     dir: 1,
                    //     minAmp: 30,
                    //     primaryAngles: this.state.LatRightPriValue[0] == '18' ? [18, 18] : this.state.LatRightPriValue[0] % 2 == 0 ? [this.state.LatRightPriValue[0], Number(this.state.LatRightPriValue) + 1] : [Number(this.state.LatRightPriValue) - 1, this.state.LatRightPriValue[0]],
                    //     ROMs: [
                    //         [30, 160],
                    //         [30, 160],
                    //     ],
                    //     totalReps: 3,
                    //     totalSets: 2,
                    // })
                    let obj = {
                        type:'anterior',
                        data:{
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
                        }
                    }
                    console.log(obj)
                    this.props.sendMsg(JSON.stringify(obj))
                    this.props.setFreeze(true)
                    //   window.darwin.setExcersiseParams({
                    //     name: "AROM",
                    //     primaryKeypoint: 0,
                    //     angles: [...this.state.newJointCheckedRight, Number(...this.state.LatRightPriValue)],
                    //     dir: 1,
                    //     minAmp: 30,
                    //     primaryAngles: this.state.LatRightPriValue[0] == '18' ? [18, 18] : this.state.LatRightPriValue[0] % 2 == 0 ? [this.state.LatRightPriValue[0], Number(this.state.LatRightPriValue) + 1] : [Number(this.state.LatRightPriValue) - 1, this.state.LatRightPriValue[0]],
                    //     ROMs: [
                    //       [30, 160],
                    //       [30, 160],
                    //     ],
                    //     totalReps: 3,
                    //     totalSets: 2,
                    //   });
                    //   window.darwin.restart();
                } else {
                    let obj = {
                        type:'get-arom',
                        side:'arom-right'
                      }
                      this.props.sendMsg(JSON.stringify(obj))
                      this.props.setFreeze(false)
                    // let data
                    // try {
                    //     // data = darwin.getAssesmentData();
                    //     console.log("AROM DATA", data);
                    //     console.log("AROM DATA IS UNDEFINED", data["AROM"]);
                    //     console.log("right side ", data)
                    //     if (this.state.selectedOrientation == 3) {
                    //         if (data !== undefined && data !== null) {
                    //             if (data["AROM"]) {
                    //                 let TEMP = {};
                    //                 TEMP["AROM"] = data[Object.keys(data)[0]];
                    //                 console.log(TEMP);
                    //                 this.props.FirstAssesment("RightLateral_AI_Data", TEMP);
                                    notification.success({
                                        message: "Angles have been calculated",
                                        placement: "bottomLeft",
                                        duration: 2,
                                    });
                    //             }
                    //         }
                    //     }
                         this.setState({ disabledLateralDrop: false })
                    //     console.log("get assessment call")
                    // } catch (error) {
                    //     console.log("catch ", error)
                    //     // window.darwin.stop();
                    // }
                }
            }
        }
        this.setState({ SWITCH: !this.state.SWITCH });
        this.setState({ BACK: !this.state.BACK });
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
    setAngles1 = (value) => {
        console.log(value)
        let obj ={
            type:'change-joints',
            data:value
        }
        this.props.sendMsg(JSON.stringify(obj))
        // window.darwin.setExcersiseParams({
        //     angles: value,
        // });
    }
    componentDidMount() {
        this.callJoints()
    }
    render() {
        return (
            <Row>
                <Card
                    style={{ marginTop: 5, borderRadius: 10, width: "100%" }}
                    actions={[
                        <Button
                            className="mx-2 screenshot_btn"
                            style={{ border: "none" }}
                            icon={<CameraFilled />}
                        //onClick={this.capture}
                        >
                            Screenshots
                        </Button>,
                        // <Button
                        //     // disabled={this.state.SWITCH}
                        //     className="mx-2"
                        //     style={{ border: "none" }}
                        //     icon={<CaretLeftFilled />}
                        // // onClick={this.back}
                        // >
                        //     Backs
                        // </Button>,
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
                            />{" "}
                            {this.state.SWITCH ? (
                                <PauseCircleOutlined />
                            ) : (
                                <PlayCircleOutlined />
                            )}
                        </Row>

                        <Row justify="center" span={8}>
                            <Button
                                style={{ border: "none" }}
                                icon={<RollbackOutlined />}
                            // onClick={this.reset}
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
                        <Col>
                            <>
                                <div className="containerrr">
                                    <div className="bloc-tabss">
                                        <span
                                            aria-disabled
                                            style={{
                                                width: "460px",
                                                padding: "0px 0 0 0",
                                                height: "20px",
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
                                                height: "20px",
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
                                                //this.clearState()
                                                this.setSelectOrientation(3);
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
                                        <Col span={24}>
                                            <b style={{ paddingLeft: '5px' }}>Step-1 : </b>
                                            <b>Primary joints : </b>
                                            <Select
                                                style={{ marginTop: 5 }}
                                                disabled={this.state.disabledAnteriorDrop}
                                                placeholder="select"
                                                id="LatL"
                                                onChange={(e) => {
                                                    this.setState({ disabledButton: false })
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
                                                }}
                                            >
                                                {this.state.romJoints.map((jo) => (
                                                    <Option value={jo}>{jo}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Checkbox.Group
                                            options={this.state.AntPri}
                                            className="selectedJointsCheckbox checkbox-group-AROM-video-conf"
                                            value={this.state.AntPriValue}
                                            onChange={(e) => {
                                                if (e.length >= 1) {
                                                    this.setState({ AntPriValue: e })
                                                    if (this.state.SWITCH) {
                                                        this.setAngles1([...e, ...this.state.newJointChecked])
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
                                                className="checkbox-group-AROM-video-conf"
                                            value={this.state.newJointChecked}
                                            onChange={(e) => {
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
                                                style={{ marginTop: 5 }}
                                                 disabled={this.state.disabledLateralDrop}
                                                placeholder="select"
                                                id="LatL"
                                                onChange={(e) => {
                                                    this.setState({ selectState: e })
                                                    this.setState({ selectStateL: e })
                                                    this.setState({ selectStateR: e })
                                                    if (this.state.latSide == "left") {
                                                        this.setState({ disabledButton: false })
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
                                            <Radio value={"left"}>Left</Radio>
                                            <Radio value={"right"}>Right</Radio>
                                        </Radio.Group>
                                        <br />
                                        <br />
                                        {this.state.latSide == "left" &&
                                            <>
                                                <Checkbox.Group
                                                    options={this.state.LatLeftPri}
                                                    className="selectedJointsCheckbox"
                                                    value={this.state.LatLeftPriValue}
                                                // onChange={(e) => {
                                                //     if (e.length >= 1) {
                                                //         this.setState({ LatLeftPriValue: e })
                                                //         if (this.state.SWITCH) {
                                                //             this.setAngles1([...e, ...this.state.newJointCheckedLeft])
                                                //         }
                                                //         console.log("checking ", e)
                                                //     }
                                                // }}
                                                />
                                                <hr />
                                            </>}
                                        {this.state.latSide == "left" && <div>
                                            <b style={{ paddingLeft: '5px' }}>Step-2 : </b>
                                            <b style={{ paddingLeft: '5px' }}>Secondary joints : </b> (optional)
                                            <Checkbox.Group
                                                options={this.state.lateralJoints}
                                                className="checkbox-group-AROM-video-conf"
                                                value={this.state.newJointCheckedLeft}
                                            onChange={(e) => {
                                                console.log(e)
                                                if (this.state.SWITCH) {
                                                    this.setAngles1([...e, ...this.state.LatLeftPriValue])
                                                }
                                                this.setState({ newJointCheckedLeft: e })
                                            }}
                                            />
                                        </div>}
                                        {this.state.latSide == "right" &&
                                            <>
                                                <Checkbox.Group
                                                    options={this.state.LatRightPri}
                                                    className="selectedJointsCheckbox"
                                                    value={this.state.LatRightPriValue}
                                                onChange={(e) => {
                                                    if (e.length >= 1) {
                                                        this.setState({ LatRightPriValue: e })
                                                        if (this.state.SWITCH) {
                                                            this.setAngles1([...e, ...this.state.newJointCheckedRight])
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
                                                className="checkbox-group-AROM-video-conf"
                                                placeholder="Select"
                                                value={this.state.newJointCheckedRight}
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
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(AROM);
