import { Button, Col, Modal, notification, Radio, Result, Row, Select, Space } from 'antd'
import React, { Component, useCallback, useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons'
import { BsFillPlayFill } from 'react-icons/bs'
import play from "../.././assets/play.webp";
import close from "../.././assets/close.webp";
import graph from "../.././assets/graph.webp";
import './AROMNEW.css'
import ReactSpeedometer from "react-d3-speedometer";
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { STATECHANGE } from '../../contextStore/actions/Assesment';
import { CARE_PLAN_STATE_CHANGE } from '../../contextStore/actions/care-plan-action';
import BackSave from './components/BackSave';
const { Option } = Select

const anteriorAngles = {
  Shoulder: {
    angles: [{
      name: ['Abd/Add', [0, 1]],
      ranges: {},
      enabled: 0
    }]
  },
  Elbow: {
    angles: [{
      name: ['Flex/Ext', [2, 3]],
      ranges: {},
      enabled: 0
    }],
  },
  Lumbar: {
    angles: [{
      name: ['Flex/Ext', [10, 11]],
      ranges: {},
      enabled: 0
    }]
  },
  Hip: {
    angles: [
      {
        name: ['Abd/Add', [16, 17]],
        ranges: {},
        enabled: 0
      }
    ],
  },
}
const leftAngles = {
  Shoulder: {
    angles: [{
      name: ['Flex/Ext', [0]],
      ranges: {},
      enabled: 0
    }]
  },

  Cervical: {
    angles: [{
      name: ['Flex/Ext', [18]],
      ranges: {},
      enabled: 0
    }
    ],
  },
  Hip: {
    angles: [{
      name: ['Flex/Ext', [4]],
      ranges: {},
      enabled: 0
    },
    ],
  },
  Knee: {
    angles: [{
      name: ['Flex/Ext', [6]],
      ranges: {},
      enabled: 0
    }],
  },
  Ankle: {
    angles: [{
      name: ['Flex/Ext', [14]],
      ranges: {},
      enabled: 0
    }],
  },
  Wrist: {
    angles: [{
      name: ['Flex/Ext', [12]],
      ranges: {},
      enabled: false
    }],
  }
}
const rightAngles = {
  Shoulder: {
    angles: [{
      name: ['Flex/Ext', [1]],
      ranges: {},
      enabled: 0
    }]
  },
  Cervical: {
    angles: [{
      name: ['Flex/Ext', [18]],
      ranges: {},
      enabled: 0
    }
    ],
  },
  Hip: {
    angles: [{
      name: ['Flex/Ext', [5]],
      ranges: {},
      enabled: 0
    }
    ],
  },
  Knee: {
    angles: [{
      name: ['Flex/Ext', [7]],
      ranges: {},
      enabled: 0
    }],
  },
  Ankle: {
    angles: [{
      name: ['Flex/Ext', [15]],
      ranges: {},
      enabled: 0
    }],
  },
  Wrist: {
    angles: [{
      name: ['Flex/Ext', [13]],
      ranges: {},
      enabled: false
    }],
  }
}

class AromClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launch: "start",
      anterior: anteriorAngles,
      left: leftAngles,
      right: rightAngles,
      primary: anteriorAngles,
      selectedPrimary: 'not-selected',
      selectedAngles: [],
      currentJointsValues: [],
      aiStart: false,
      value: 'Anterior'
    };
  }
  StartAI = () => {
    console.log(this.state.value)
    console.log('start ', this.state.selectedAngles)
    if (this.state.value == "Anterior") {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.anterior).map(e => {
        if (this.state.anterior[e].angles[0].enabled == 1) {
          angles.push(this.state.anterior[e].angles[0].name[1][0])
          angles.push(this.state.anterior[e].angles[0].name[1][1])
        }
      })
      console.log(angles)
      this.setState({ currentJointsValues: angles })
      window.darwin.restart();
      window.darwin.setExcersiseParams({
        name: "AROM",
        primaryKeypoint: 0,
        angles: angles,
        dir: 1,
        minAmp: 30,
        primaryAngles: anteriorAngles[this.state.selectedPrimary].angles[0].name[1],
        ROMs: [
          [30, 160],
          [30, 160],
        ],
        totalReps: 3,
        totalSets: 2,
      });
      window.darwin.restart();
      this.setState({ aiStart: true })
    } else if (this.state.value == "Left") {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.left).map(e => {
        if (this.state.left[e].angles[0].enabled == 1) {
          angles.push(this.state.left[e].angles[0].name[1][0])
        }
      })
      console.log(angles)
      this.setState({ currentJointsValues: angles })
      window.darwin.setExcersiseParams({
        name: "AROM",
        primaryKeypoint: 0,
        angles: angles,
        dir: 1,
        minAmp: 30,
        primaryAngles: [...leftAngles[this.state.selectedPrimary].angles[0].name[1],...leftAngles[this.state.selectedPrimary].angles[0].name[1]],
        ROMs: [
          [30, 160],
          [30, 160],
        ],
        totalReps: 3,
        totalSets: 2,
      });
      window.darwin.restart();
      this.setState({ aiStart: true })
    } else if (this.state.value == 'Right') {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.right).map(e => {
        if (this.state.right[e].angles[0].enabled == 1) {
          angles.push(this.state.right[e].angles[0].name[1][0])
        }
      })
      console.log(angles)
      this.setState({ currentJointsValues: angles })
      window.darwin.setExcersiseParams({
        name: "AROM",
        primaryKeypoint: 0,
        angles: angles,
        dir: 1,
        minAmp: 30,
        primaryAngles: [...rightAngles[this.state.selectedPrimary].angles[0].name[1],...rightAngles[this.state.selectedPrimary].angles[0].name[1]],
        ROMs: [
          [30, 160],
          [30, 160],
        ],
        totalReps: 3,
        totalSets: 2,
      });
      window.darwin.restart();
      this.setState({ aiStart: true })
    }
  }
  stopAi = () => {
    if (this.state.value == "Anterior") {
      let data = darwin.getAssesmentData();
      if (data !== undefined && data !== null) {
        if (data["AROM"]) {
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          this.props.FirstAssesment("Anterior_AI_Data", TEMP);
          this.props.FirstAssesment("aromSubmit", true);
          notification.success({
            message: "Angles have been calculated",
            placement: "bottomLeft",
            duration: 2,
          });
        }
      }
    } else if (this.state.value == "Left") {
      let data = darwin.getAssesmentData();
      if (data !== undefined && data !== null) {
        if (data["AROM"]) {
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          this.props.FirstAssesment("LeftLateral_AI_Data", TEMP);
          this.props.FirstAssesment("aromSubmit", true);
          notification.success({
            message: "Angles have been calculated",
            placement: "bottomLeft",
            duration: 2,
          });
        }
      }

    } else if (this.state.value == 'Right') {
      let data = darwin.getAssesmentData();
      if (data !== undefined && data !== null) {
        if (data["AROM"]) {
          let TEMP = {};
          TEMP["AROM"] = data[Object.keys(data)[0]];
          console.log(TEMP);
          this.props.FirstAssesment("RightLateral_AI_Data", TEMP);
          this.props.FirstAssesment("aromSubmit", true);
          notification.success({
            message: "Angles have been calculated",
            placement: "bottomLeft",
            duration: 2,
          });
        }
      }

    }
    window.darwin.stop();
    this.setState({ aiStart: false })
  }
  componentDidMount() {
    this.props.Setsidebarshow(false)
    if (this.props.carePlanReducer.patient_main_code.length > 0) {
      const canvas = document.getElementById("output");
      const video = document.getElementById("video");
      const options = {
        video,
        videoWidth: 640,
        videoHeight: 480,
        canvas,
        supervised: true,
        showAngles: true,
      };
      window.darwin.initializeModel(options);
      window.darwin.launchModel()
      this.setState({ launch: "stop" });
    }
  }
  componentWillUnmount() {
    this.props.Setsidebarshow(true)
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    if (e.target.value == "Anterior") {
      this.setState({ primary: anteriorAngles })
      this.setState({ anterior: anteriorAngles })
      this.setState({ selectedAngles: ['Shoulder'] })
    } else if (e.target.value == "Left") {
      this.setState({ primary: leftAngles })
      this.setState({ left: leftAngles })
    } else if (e.target.value == 'Right') {
      this.setState({ primary: rightAngles })
      this.setState({ right: rightAngles })
    }
    this.setState({ selectedPrimary: 'not-selected' })
    this.setState({ selectedAngles: [] })
    this.setState({ currentJointsValues: [] })
    this.setState({ value: e.target.value })
  };
  AiModel = () => {
    try {
      window.darwin.sendAngleToUICallback((angle) => {
        console.log("status ", angle);
        console.log("status ", this.state.value);
        console.log("status ", this.state.selectedAngles);
        if (this.state.value == 'Anterior') {
          for (let i = 0; i < this.state.selectedAngles.length; i++) {
            console.log("status ", this.state.selectedAngles[i]);
            if (this.state.selectedAngles[i] == 'Shoulder') {
              this.setState(prev => ({
                anterior: {
                  ...prev.anterior,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.anterior[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftShoulder'].min),
                          max: Math.round(angle['leftShoulder'].max)
                        },
                        R: {
                          min: Math.round(angle['rightShoulder'].min),
                          max: Math.round(angle['rightShoulder'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Elbow') {
              this.setState(prev => ({
                anterior: {
                  ...prev.anterior,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.anterior[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftElbow'].min),
                          max: Math.round(angle['leftElbow'].max)
                        },
                        R: {
                          min: Math.round(angle['rightElbow'].min),
                          max: Math.round(angle['rightElbow'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Lumbar') {
              this.setState(prev => ({
                anterior: {
                  ...prev.anterior,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.anterior[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftPelvic'].min),
                          max: Math.round(angle['leftPelvic'].max)
                        },
                        R: {
                          min: Math.round(angle['rightPelvic'].min),
                          max: Math.round(angle['rightPelvic'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Hip') {
              this.setState(prev => ({
                anterior: {
                  ...prev.anterior,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.anterior[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftHip'].min),
                          max: Math.round(angle['leftHip'].max)
                        },
                        R: {
                          min: Math.round(angle['rightHip'].min),
                          max: Math.round(angle['rightHip'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
          }
        }

        if (this.state.value == 'Left') {
          for (let i = 0; i < this.state.selectedAngles.length; i++) {
            console.log("status ", this.state.selectedAngles[i]);
            if (this.state.selectedAngles[i] == 'Shoulder') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftShoulder'].min),
                          max: Math.round(angle['leftShoulder'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Cervical') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftNeck'].min),
                          max: Math.round(angle['leftNeck'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Hip') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftHip'].min),
                          max: Math.round(angle['leftHip'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Knee') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftKnee'].min),
                          max: Math.round(angle['leftKnee'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Ankle') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftAnkle'].min),
                          max: Math.round(angle['leftAnkle'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Wrist') {
              this.setState(prev => ({
                left: {
                  ...prev.left,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.left[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        L: {
                          min: Math.round(angle['leftWrist'].min),
                          max: Math.round(angle['leftWrist'].max)
                        },
                      },
                    }]
                  }
                }
              }))
            }
          }
        }

        if (this.state.value == 'Right') {
          for (let i = 0; i < this.state.selectedAngles.length; i++) {
            console.log("status ", this.state.selectedAngles[i]);
            if (this.state.selectedAngles[i] == 'Shoulder') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightShoulder'].min),
                          max: Math.round(angle['rightShoulder'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Cervical') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightNeck'].min),
                          max: Math.round(angle['rightNeck'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Hip') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightHip'].min),
                          max: Math.round(angle['rightHip'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Knee') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightKnee'].min),
                          max: Math.round(angle['rightKnee'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Ankle') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightAnkle'].min),
                          max: Math.round(angle['rightAnkle'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
            if (this.state.selectedAngles[i] == 'Wrist') {
              this.setState(prev => ({
                right: {
                  ...prev.right,
                  [this.state.selectedAngles[i]]: {
                    angles: [{
                      ...prev.right[this.state.selectedAngles[i]].angles[0],
                      ranges: {
                        R: {
                          min: Math.round(angle['rightWrist'].min),
                          max: Math.round(angle['rightWrist'].max)
                        }
                      },
                    }]
                  }
                }
              }))
            }
          }
        }
      })
    } catch (err) {
      console.log(err);
      this.AiModel();
    }

    return <Col className='arom-canvas-1x div-border-1x' xs={24} sm={24} md={16} lg={16}>
      <video
        id="video"
        className="video"
        playsInline
        style={{ display: "none" }}
      ></video>
      <canvas
        id="output"
        className="output"
        style={{ width: "100%" }}
      />
    </Col>
  }
  AiModelProps = this.AiModel.bind(this);
  calculteAngles = () => {
    if (this.state.value == "Anterior") {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.anterior).map(e => {
        if (this.state.anterior[e].angles[0].enabled == 1) {
          angles.push(this.state.anterior[e].angles[0].name[1][0])
          angles.push(this.state.anterior[e].angles[0].name[1][1])
        }
      })
      console.log(angles)
      return angles
    } else if (this.state.value == "Left") {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.left).map(e => {
        if (this.state.left[e].angles[0].enabled == 1) {
          angles.push(this.state.left[e].angles[0].name[1][0])
        }
      })
      console.log(angles)
      return angles
    } else if (this.state.value == 'Right') {
      let angles = []
      console.log(this.state.value)
      Object.keys(this.state.right).map(e => {
        if (this.state.right[e].angles[0].enabled == 1) {
          angles.push(this.state.right[e].angles[0].name[1][0])
        }
      })
      console.log(angles)
      return angles
    }
  }
  setAngles = (value) => {
    window.darwin.setExcersiseParams({
      angles: value,
    });
  }
  render() {
    return (
      <>{this.props.carePlanReducer.patient_main_code.length > 0 ? <Row justify='space-between' style={{ marginTop: '5px' }} className='main-container-1x'>
        <Col className='arom-joints-list-wrapper-container-1x' xs={24} sm={24} md={4} lg={4}>
          <div className="arom-joints-list-wrapper-1x div-border-1x">
            <center><b><h3>{this.state.value}</h3></b></center>
            {this.state.value == 'Anterior' && Object.keys(this.state.anterior).map(e => <center className={`${e == this.state.selectedPrimary && `primary-selected`} anterior`}><p>{e}</p>{this.state.anterior[e].angles.map(a => <><div
              onClick={() => {
                if (!(e == this.state.selectedPrimary)) {
                  if (this.state.selectedPrimary == 'not-selected') {
                    return notification.warning({
                      message: "Please select primary joint",
                      placement: "bottomLeft",
                      duration: 5,
                    });
                  }
                  if (a.enabled == 1) {
                    let temp = this.state.anterior[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 0
                        temp[i].ranges = {}
                      }
                    }
                    this.setState(prev => ({
                      anterior: {
                        ...prev.anterior,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    let tempjoint = this.state.currentJointsValues.filter(joint => joint != temp[0].name[1][0])
                    tempjoint.filter(joint => joint != temp[0].name[1][1])
                    this.setState({ currentJointsValues: tempjoint })
                    this.setAngles(tempjoint)
                    this.setState({ selectedAngles: this.state.selectedAngles.filter(angle => angle != e) })
                    return
                  }
                  if (this.state.anterior[e].angles.length >= 1) {
                    let temp = anteriorAngles[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 1
                      }
                    }
                    this.setState(prev => ({
                      anterior: {
                        ...prev.anterior,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  } else {
                    this.setState(prev => ({
                      anterior: {
                        ...prev.anterior,
                        [e]: {
                          'angles': [{
                            ...prev.anterior[e].angles[0],
                            enabled: 1
                          }]
                        }
                      }
                    }))
                    this.setAngles([...this.state.currentJointsValues, ...this.state.anterior[e].angles[0].name[1]])
                    this.setState({ currentJointsValues: [...this.state.currentJointsValues, ...this.state.anterior[e].angles[0].name[1]] })
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  }
                }
              }}
              className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}<br />
              {Object.keys(a.ranges).length > 0 && <span>L : min:{a.ranges.L.min} , max:{a.ranges.L.max} <br /> R : min:{a.ranges.L.min} ,max:{a.ranges.R.max} </span>}
            </div></>)}</center>)}
            {this.state.value == 'Left' && Object.keys(this.state.left).map(e => <center className={`${e == this.state.selectedPrimary && `primary-selected`}`}><p>{e}</p>{this.state.left[e].angles.map(a => <>{console.log(a.enabled)}<div
              onClick={() => {
                if (!(e == this.state.selectedPrimary)) {
                  if (this.state.selectedPrimary == 'not-selected') {
                    return notification.warning({
                      message: "Please select primary joint",
                      placement: "bottomLeft",
                      duration: 5,
                    });
                  }
                  if (a.enabled == 1) {
                    let temp = this.state.left[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 0
                        temp[i].ranges = {}
                      }
                    }
                    this.setState(prev => ({
                      left: {
                        ...prev.left,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    let tempjoint = this.state.currentJointsValues.filter(joint => joint != temp[0].name[1][0])
                    this.setState({ currentJointsValues: tempjoint })
                    this.setAngles(tempjoint)
                    this.setState({ selectedAngles: this.state.selectedAngles.filter(angle => angle != e) })
                    return
                  }
                  if (this.state.left[e].angles.length >= 1) {
                    let temp = leftAngles[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 1
                      }
                    }
                    this.setState(prev => ({
                      left: {
                        ...prev.left,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  } else {
                    this.setState(prev => ({
                      left: {
                        ...prev.left,
                        [e]: {
                          'angles': [{
                            ...prev.left[e].angles[0],
                            enabled: 1
                          }]
                        }
                      }
                    }))
                    this.setAngles([...this.state.currentJointsValues, ...this.state.left[e].angles[0].name[1]])
                    this.setState({ currentJointsValues: [...this.state.currentJointsValues, ...this.state.left[e].angles[0].name[1]] })
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  }
                }
              }}
              className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}<br />
              {Object.keys(a.ranges).length > 0 && <span>L : min:{a.ranges.L.min} , max:{a.ranges.L.max}</span>}
            </div></>)}</center>)}
            {this.state.value == 'Right' && Object.keys(this.state.right).map(e => <center className={`${e == this.state.selectedPrimary && `primary-selected`}`}><p>{e}</p>{this.state.right[e].angles.map(a => <>{console.log(a.enabled)}<div
              onClick={() => {
                if (!(e == this.state.selectedPrimary)) {
                  if (this.state.selectedPrimary == 'not-selected') {
                    return notification.warning({
                      message: "Please select primary joint",
                      placement: "bottomLeft",
                      duration: 5,
                    });
                  }
                  if (a.enabled == 1) {
                    let temp = this.state.right[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 0
                        temp[i].ranges = {}
                      }
                    }
                    this.setState(prev => ({
                      right: {
                        ...prev.right,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    let tempjoint = this.state.currentJointsValues.filter(joint => joint != temp[0].name[1][0])
                    this.setState({ currentJointsValues: tempjoint })
                    this.setAngles(tempjoint)
                    this.setState({ selectedAngles: this.state.selectedAngles.filter(angle => angle != e) })
                    return
                  }
                  if (this.state.right[e].angles.length >= 1) {
                    let temp = rightAngles[e]['angles']
                    for (let i = 0; i < temp.length; i++) {
                      if (temp[i].name[0] == a.name[0]) {
                        temp[i].enabled = 1
                      }
                    }
                    this.setState(prev => ({
                      right: {
                        ...prev.right,
                        [e]: {
                          'angles': temp
                        }
                      }
                    }))
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  } else {
                    this.setState(prev => ({
                      right: {
                        ...prev.right,
                        [e]: {
                          'angles': [{
                            ...prev.right[e].angles[0],
                            enabled: 1
                          }]
                        }
                      }
                    }))
                    this.setAngles([...this.state.currentJointsValues, ...this.state.right[e].angles[0].name[1]])
                    this.setState({ currentJointsValues: [...this.state.currentJointsValues, ...this.state.right[e].angles[0].name[1]] })
                    this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                    console.log(temp)
                  }
                }
              }}
              className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}<br />
              {Object.keys(a.ranges).length > 0 && <span>R : min:{a.ranges.L.min} ,max:{a.ranges.R.max} </span>}
            </div></>)}</center>)}
          </div>
        </Col>
        {this.AiModelProps()}
        <Col className='arom-controls-1x div-border-1x' xs={24} sm={24} md={4} lg={4}>
          <div className='arom-btn-grp-wrapper'>
            <div className='arom-btn-grp'>
              {this.state.value == 'Anterior' && <Select
                style={{
                  width: 100,
                }}
                disabled={this.state.aiStart}
                onChange={(e) => {
                  let temp = { ...anteriorAngles }
                  this.setState({ selectedPrimary: e })
                  this.setState({ currentJointsValues: [] })
                  this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                  console.log(this.state.anterior)
                  this.setState(prev => ({
                    anterior: {
                      ...temp,
                      [e]: {
                        angles: [{
                          ...temp[e].angles[0],
                          enabled: 1
                        }]
                      }
                    }
                  }))
                  // setTimeout(() => {
                  //   setState(temp)
                  // }, 10);
                }}
              >
                {Object.keys(this.state.primary).map(e => <Option value={e}>{e}</Option>)}
              </Select>}
              {this.state.value == 'Left' && <Select
                style={{
                  width: 100,
                }}
                disabled={this.state.aiStart}
                onChange={(e) => {
                  let temp = { ...leftAngles }
                  this.setState({ currentJointsValues: [] })
                  this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                  this.setState({ selectedPrimary: e })
                  this.setState(prev => ({
                    left: {
                      ...temp,
                      [e]: {
                        angles: [{
                          ...temp[e].angles[0],
                          enabled: 1
                        }]
                      }
                    }
                  }))
                }}
              >
                {Object.keys(this.state.primary).map(e => <Option value={e}>{e}</Option>)}
              </Select>}
              {this.state.value == 'Right' && <Select
                style={{
                  width: 100,
                }}
                disabled={this.state.aiStart}
                onChange={(e) => {
                  let temp = { ...rightAngles }
                  this.setState({ selectedPrimary: e })
                  this.setState({ currentJointsValues: [] })
                  this.setState({ selectedAngles: [...this.state.selectedAngles, e] })
                  this.setState(prev => ({
                    right: {
                      ...temp,
                      [e]: {
                        angles: [{
                          ...temp[e].angles[0],
                          enabled: 1
                        }]
                      }
                    }
                  }))
                }}
              >
                {Object.keys(this.state.primary).map(e => <Option value={e}>{e}</Option>)}
              </Select>}
              <button onClick={this.state.aiStart ? this.stopAi : this.StartAI} ><img className='icons-1x' src={this.state.aiStart ? close : play} /></button>
            </div>
          </div>
          <div className='arom-analytics-tab-wrapper-1x '>
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Space direction="vertical">
                <Radio disabled={this.state.aiStart} value={'Anterior'}>Anterior</Radio>
                <Radio disabled={this.state.aiStart} value={'Left'}>Left</Radio>
                <Radio disabled={this.state.aiStart} value={'Right'}>Right</Radio>
              </Space>
              <BackSave submitDisplay={'none'} />
            </Radio.Group>
            {/* {graphs.map(e => <div className='arom-analytics-tab-item-1x'> <ReactSpeedometer
           needleTransitionDuration={1000}
           needleTransition="easeElastic"
           currentValueText={`${e} : 60`}
           value={60}
           width={180}
           maxSegmentLabels={5}
           maxValue={100}
           segments={100}
        /></div>)} */}
          </div>
        </Col >
        {/* <div className="arom-analytics-tab-wrapper-onmobile-1x">
    {joints.map(e => <div className="item">{e.joint}</div>)}
</div>
<div className='arom-btn-grp-wrapper-mobile-1x'>
    <div className='arom-btn-grp-mobile-1x'>
        <button><img className='icons-1x' src={play} /></button><br />
        <button><img className='icons-1x' src={play} /></button><br />
        <button><img className='icons-1x' src={play} /></button><br />
        <button><img className='icons-1x' onClick={() => setOpen(!open)} src={graph} /></button><br />
    </div>
</div> */}

        {/* <Portal>
    <Sheet
        style={{ height: '30vh' }}
        ref={ref}
        open={open}
        onDismiss={() => setOpen(false)}
        onClose={() => {
            console.log('Component unmounted')
        }}
        selectedDetent={detents.large}
        detents={props => [
            detents.large(props),
            detents.fit(props)
        ]}
        useDarkMode={false}
        useModal={false}
        scrollingExpands={true}
    >
        <Content>
            <div className="arom-analytics-tab-wrapper-onmobile-1x">
                {joints.map(e => <div className="item">{e.joint}</div>)}
            </div>
            <div className="arom-analytics-tab-wrapper-motion-onmobile-container-1x arom-analytics-tab-wrapper-motion-onmobile-flex-1x">
                <div className="arom-analytics-tab-wrapper-motion-onmobile-item-1x arom-analytics-tab-wrapper-motion-onmobile-flex-item-1x"></div>
                <div className="arom-analytics-tab-wrapper-motion-onmobile-item-1x arom-analytics-tab-wrapper-motion-onmobile-flex-item-1x"></div>
                <div className="arom-analytics-tab-wrapper-motion-onmobile-item-1x arom-analytics-tab-wrapper-motion-onmobile-flex-item-1x"></div>
                <div className="arom-analytics-tab-wrapper-motion-onmobile-item-1x arom-analytics-tab-wrapper-motion-onmobile-flex-item-1x"></div>
                <div className="arom-analytics-tab-wrapper-motion-onmobile-item-1x arom-analytics-tab-wrapper-motion-onmobile-flex-item-1x"></div>
            </div>
        </Content>
    </Sheet>
</Portal> */}
      </Row > : <Modal headers={false} footer={false} title="Basic Modal" visible={true}>
        <Result
          status="warning"
          title="You have not selected any patient. Please select"
          extra={
            <Button onClick={() => {
              console.log(this.props)
              window.location.href = "/pateints"
            }} type="primary" key="console">
              Go To Patient List
            </Button>
          }
        />
      </Modal>}</>
      // :
      //}

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

export default connect(mapStateToProps, mapDispatchToProps)(AromClass);



