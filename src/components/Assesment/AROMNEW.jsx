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
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
const { Option } = Select
const AROMNEW = ({ setIsSideNavbarCollapsed, Setsidebarshow }) => {
    let anteriorAngles = {
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
    let leftAngles = {
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
    let rightAngles = {
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
    const [state, setState] = useState(anteriorAngles)
    const [left, setLeft] = useState(leftAngles)
    const [right, setRight] = useState(rightAngles)
    const [primary, setPrimary] = useState(anteriorAngles)
    const [selectedPrimary, setSelectedPrimary] = useState('not-selected')
    const [selectedAngles, setSelectedAngles] = useState([])
    const [aiStart, setAIStart] = useState(false)
    const [checkModel, setCheckModel] = useState(true)
    const [open, setOpen] = useState(false)
    const [graphs, setGraphs] = useState([])
    const [angles, setAngles] = useState([])
    const history = useHistory()
    const ref = useRef()
    const reduxState = useSelector((state) => state);
    useEffect(() => {
        Setsidebarshow(false)
        // if (checkModel) {
        //     const canvas = document.getElementById("output");
        //     const video = document.getElementById("video");
        //     const options = {
        //         video,
        //         videoWidth: 640,
        //         videoHeight: 480,
        //         canvas,
        //         supervised: true,
        //         showAngles: true,
        //     };
        //     window.darwin.initializeModel(options);
        //     window.darwin.launchModel()
        //     setCheckModel(false)
        // }
        return () => Setsidebarshow(true)
    }, [])
    const [value, setValue] = useState('Anterior');

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        if (e.target.value == "Anterior") {
            setPrimary(anteriorAngles)
            setState(anteriorAngles)
            setSelectedAngles(['Shoulder'])
        } else if (e.target.value == "Left") {
            setPrimary(leftAngles)
            setLeft(leftAngles)
        } else if (e.target.value == 'Right') {
            setPrimary(rightAngles)
            setRight(rightAngles)
        }
        setSelectedPrimary('not-selected')
        setSelectedAngles([])
        setValue(e.target.value);
    };
    const primary_joint = ['leftShoulder', 'rightShoulder', 'leftElbow', 'rightElbow', 'leftHip',
        'rightHip', 'leftKnee', 'rightKnee', 'leftNeck', 'rightNeck', 'leftPelvic', 'rightPelvic',
        'leftWrist', 'rightWrist', 'leftAnkle', 'rightAnkle', 'leftHipAdductionAbduction', 'rightHipAdductionAbduction', 'cervicalForwardFlexion']
    const StartAI = () => {
        console.log(value)
        console.log('start ', selectedAngles)
        if (value == "Anterior") {
            let angles = []
            console.log(value)
            Object.keys(state).map(e => {
                if (state[e].angles[0].enabled == 1) {
                    angles.push(state[e].angles[0].name[1][0])
                }
            })
            console.log(angles)
            window.darwin.restart();
            window.darwin.setExcersiseParams({
                name: "AROM",
                primaryKeypoint: 0,
                angles: angles,
                dir: 1,
                minAmp: 30,
                primaryAngles: anteriorAngles[selectedPrimary].angles[0].name[1],
                ROMs: [
                    [30, 160],
                    [30, 160],
                ],
                totalReps: 3,
                totalSets: 2,
            });
            window.darwin.restart();
            setAIStart(true)
        } else if (value == "Left") {
            let angles = []
            console.log(value)
            Object.keys(left).map(e => {
                if (left[e].angles[0].enabled == 1) {
                    angles.push(left[e].angles[0].name[1][0])
                }
            })
            console.log(angles)
            window.darwin.setExcersiseParams({
                name: "AROM",
                primaryKeypoint: 0,
                angles: angles,
                dir: 1,
                minAmp: 30,
                primaryAngles: leftAngles[selectedPrimary].angles[0].name[1],
                ROMs: [
                    [30, 160],
                    [30, 160],
                ],
                totalReps: 3,
                totalSets: 2,
            });
            window.darwin.restart();
            setAIStart(true)
        } else if (value == 'Right') {
            let angles = []
            console.log(value)
            Object.keys(right).map(e => {
                if (right[e].angles[0].enabled == 1) {
                    angles.push(right[e].angles[0].name[1][0])
                }
            })
            console.log(angles)
            window.darwin.setExcersiseParams({
                name: "AROM",
                primaryKeypoint: 0,
                angles: angles,
                dir: 1,
                minAmp: 30,
                primaryAngles: rightAngles[selectedPrimary].angles[0].name[1],
                ROMs: [
                    [30, 160],
                    [30, 160],
                ],
                totalReps: 3,
                totalSets: 2,
            });
            window.darwin.restart();
            setAIStart(true)
        }
    }
    const stopAi = () => {
        window.darwin.stop();
        setAIStart(false)
    }
    const addValue = useCallback((selectedAngle, angle) => {
        setState(prev => ({
            ...prev,
            [selectedAngle]: {
                angles: [{
                    name: state[selectedAngle].angles[0].name,
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
                    enabled: state[selectedAngle].angles[0].enabled
                }]
            }
        }))
    }, [state]);

    class CANVAS extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                launch: "start",
            };
        }
        componentDidMount() {
            if (this.state.launch === "start") {
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
        AiModel = () => {
            try {
                window.darwin.sendAngleToUICallback((angle) => {
                    console.log("status ", angle);
                    console.log("status ", value);
                    console.log("status ", selectedAngles);
                    if (value == 'Anterior') {
                        for (let i = 0; i < selectedAngles.length; i++) {
                            console.log("status ", selectedAngles[i]);
                            if (selectedAngles[i] == 'Shoulder') {
                                addValue(selectedAngles[i], angle)
                                // setState(prev => ({
                                //     ...prev,
                                //     [selectedAngles[i]]: {
                                //         angles: [{
                                //             name: state[selectedAngles[i]].angles[0].name,
                                //             ranges: {
                                //                 L: {
                                //                     min: Math.round(angle['leftShoulder'].min),
                                //                     max: Math.round(angle['leftShoulder'].max)
                                //                 },
                                //                 R: {
                                //                     min: Math.round(angle['rightShoulder'].min),
                                //                     max: Math.round(angle['rightShoulder'].max)
                                //                 }
                                //             },
                                //             enabled: state[selectedAngles[i]].angles[0].enabled
                                //         }]
                                //     }
                                // }))
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
        render() {
            return this.AiModelProps()
        }
    }
    // const calculation = useMemo(()=>expensiveCalculation(count), [count])
    // const expensiveCalculation = (num) => {
    //     return Object.keys(a.ranges).length > 0 && <span>L : min:{a.ranges.L.min} , max:{a.ranges.L.max} <br /> R : min:{a.ranges.L.min} ,max:{a.ranges.R.max} </span>
    //   };
    return (
        <>{reduxState.carePlanRedcucer.patient_main_code.length > 0 ? <Row justify='space-between' style={{ marginTop: '5px' }} className='main-container-1x'>
            <Col className='arom-joints-list-wrapper-container-1x' xs={24} sm={24} md={4} lg={4}>
                <div className="arom-joints-list-wrapper-1x div-border-1x">
                    <center><b><h3>{value}</h3></b></center>
                    {value == 'Anterior' && Object.keys(state).map(e => <center className={`${e == selectedPrimary && `primary-selected`} anterior`}><p>{e}</p>{state[e].angles.map(a => <><div
                        onClick={() => {
                            if (!(e == selectedPrimary)) {
                                if (selectedPrimary == 'not-selected') {
                                    return notification.warning({
                                        message: "Please select primary joint",
                                        placement: "bottomLeft",
                                        duration: 5,
                                    });
                                }
                                if (a.enabled == 1) {
                                    let temp = state[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 0
                                        }
                                    }
                                    setState(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    setSelectedAngles(selectedAngles.filter(angle => angle != e))
                                    return
                                }
                                if (state[e].angles.length >= 1) {
                                    let temp = anteriorAngles[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 1
                                        }
                                    }
                                    setState(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    setSelectedAngles([...selectedAngles, e])
                                    console.log(temp)
                                } else {
                                    let temp = state
                                    temp[e].angles[0].enabled = 1
                                    setState({})
                                    setTimeout(() => {
                                        setState(temp)
                                    }, 30);
                                    setSelectedAngles([...selectedAngles, e])
                                    console.log(temp)
                                }
                            }
                        }}
                        className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}<br />
                        {Object.keys(a.ranges).length > 0 && <span>L : min:{a.ranges.L.min} , max:{a.ranges.L.max} <br /> R : min:{a.ranges.L.min} ,max:{a.ranges.R.max} </span>}
                    </div></>)}</center>)}
                    {value == 'Left' && Object.keys(left).map(e => <center className={`${e == selectedPrimary && `primary-selected`}`}><p>{e}</p>{left[e].angles.map(a => <>{console.log(a.enabled)}<div
                        onClick={() => {
                            if (!(e == selectedPrimary)) {
                                if (selectedPrimary == 'not-selected') {
                                    return notification.warning({
                                        message: "Please select primary joint",
                                        placement: "bottomLeft",
                                        duration: 5,
                                    });
                                }
                                if (a.enabled == 1) {
                                    let temp = left[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 0
                                        }
                                    }
                                    setLeft(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    return
                                }
                                if (left[e].angles.length >= 1) {
                                    let temp = leftAngles[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 1
                                        }
                                    }
                                    setLeft(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    console.log(temp)
                                } else {
                                    let temp = left
                                    temp[e].angles[0].enabled = 1
                                    setLeft({})
                                    setTimeout(() => {
                                        setLeft(temp)
                                    }, 30);
                                    console.log(temp)
                                }
                            }
                        }}
                        className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}</div></>)}</center>)}
                    {value == 'Right' && Object.keys(right).map(e => <center className={`${e == selectedPrimary && `primary-selected`}`}><p>{e}</p>{right[e].angles.map(a => <>{console.log(a.enabled)}<div
                        onClick={() => {
                            if (!(e == selectedPrimary)) {
                                if (selectedPrimary == 'not-selected') {
                                    return notification.warning({
                                        message: "Please select primary joint",
                                        placement: "bottomLeft",
                                        duration: 5,
                                    });
                                }
                                if (a.enabled == 1) {
                                    let temp = right[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 0
                                        }
                                    }
                                    setRight(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    return
                                }
                                if (right[e].angles.length >= 1) {
                                    let temp = rightAngles[e]['angles']
                                    for (let i = 0; i < temp.length; i++) {
                                        if (temp[i].name[0] == a.name[0]) {
                                            temp[i].enabled = 1
                                        }
                                    }
                                    setRight(prev => ({
                                        ...prev,
                                        [e]: {
                                            'angles': temp
                                        }
                                    }))
                                    console.log(temp)
                                } else {
                                    let temp = right
                                    temp[e].angles[0].enabled = 1
                                    setRight({})
                                    setTimeout(() => {
                                        setRight(temp)
                                    }, 30);
                                    console.log(temp)
                                }
                            }
                        }}
                        className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}</div></>)}</center>)}
                </div>
            </Col>
            <CANVAS />
            <Col className='arom-controls-1x div-border-1x' xs={24} sm={24} md={4} lg={4}>
                <div className='arom-btn-grp-wrapper'>
                    <div className='arom-btn-grp'>
                        {value == 'Anterior' && <Select
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                let temp = { ...primary }
                                temp[e].angles[0].enabled = 1
                                setSelectedPrimary(e)
                                setSelectedAngles([...selectedAngles, e])
                                setTimeout(() => {
                                    setState(temp)
                                }, 10);
                                console.log(temp)
                            }}
                        >
                            {Object.keys(primary).map(e => <Option value={e}>{e}</Option>)}
                        </Select>}
                        {value == 'Left' && <Select
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                let temp = { ...primary }
                                temp[e].angles[0].enabled = 1
                                setSelectedPrimary(e)
                                setTimeout(() => {
                                    setState(temp)
                                }, 10);
                                console.log(temp)
                            }}
                        >
                            {Object.keys(primary).map(e => <Option value={e}>{e}</Option>)}
                        </Select>}
                        {value == 'Right' && <Select
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                let temp = { ...primary }
                                temp[e].angles[0].enabled = 1
                                setSelectedPrimary(e)
                                setSelectedAngles([...selectedAngles, e])
                                setTimeout(() => {
                                    setState(temp)
                                }, 10);
                                console.log(temp)
                            }}
                        >
                            {Object.keys(primary).map(e => <Option value={e}>{e}</Option>)}
                        </Select>}
                        <button onClick={aiStart ? stopAi : StartAI} ><img className='icons-1x' src={aiStart ? close : play} /></button>
                    </div>
                </div>
                <div className='arom-analytics-tab-wrapper-1x '>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={'Anterior'}>Anterior</Radio>
                            <Radio value={'Left'}>Left</Radio>
                            <Radio value={'Right'}>Right</Radio>
                        </Space>
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
        </Row > :
            <Modal headers={false} footer={false} title="Basic Modal" visible={true}>
                <Result
                    status="warning"
                    title="You have not selected any patient. Please select"
                    extra={
                        <Button onClick={() => history.push("/patients")} type="primary" key="console">
                            Go To Patient List
                        </Button>
                    }
                />
            </Modal>
        }</>
    )
}

export default AROMNEW