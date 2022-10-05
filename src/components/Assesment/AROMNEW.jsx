import { Button, Col, notification, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons'
import { BsFillPlayFill } from 'react-icons/bs'
import play from "../.././assets/play.webp";
import graph from "../.././assets/graph.webp";
import './AROMNEW.css'
import ReactSpeedometer from "react-d3-speedometer";
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'
const { Option } = Select
const AROMNEW = ({ setIsSideNavbarCollapsed, Setsidebarshow }) => {
    let joints = {
        Shoulder: {
            angles: [{
                name: ['Flex/Ext', [0, 1]],
                enabled: 0
            }]
        },
        Elbow: {
            angles: [{
                name: ['Flex/Ext', [2, 3]],
                enabled: 0
            }],
        },
        Cervical: {
            angles: [{
                name: ['Flex/Ext', [18]],
                enabled: 0
            }, {
                name: ['Side flex', [8, 9]],
                enabled: 0
            }],
        },
        Lumbar: {
            angles: [{
                name: ['Flex/Ext', [10, 11]],
                enabled: 0
            }]
        },
        Hip: {
            angles: [{
                name: ['Flex/Ext', [4, 5]],
                enabled: 0
            }, {
                name: ['Abd/Add', [16, 17]],
                enabled: 0
            }],
        },
        Knee: {
            angles: [{
                name: ['Flex/Ext', [6, 7]],
                enabled: 0
            }],
        },
        Ankle: {
            angles: [{
                name: ['Flex/Ext', [14, 15]],
                enabled: 0
            }],
        },
        Wrist: {
            angles: [{
                name: ['Flex/Ext', [12, 13]],
                enabled: false
            }],
        }
    }
    let drp = [
        "Shoulder",
        "Elbow",
        "Cervical",
        "Pelvic",
        "Hip",
    ]
    const [state, setState] = useState(joints)
    const [selectedPrimary, setSelectedPrimary] = useState('not-selected')
    const [open, setOpen] = useState(false)
    const [graphs, setGraphs] = useState([])
    const [angles, setAngles] = useState([])
    const ref = useRef()
    useEffect(() => {
        Setsidebarshow(false)
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
        window.darwin.launchModel();
        window.darwin.stop();
    }, [])
    return (
        <Row justify='space-between' style={{ marginTop: '5px' }} className='main-container-1x'>
            <Col className='arom-joints-list-wrapper-container-1x' xs={24} sm={24} md={4} lg={4}>
                <div className="arom-joints-list-wrapper-1x div-border-1x">

                    {Object.keys(state).map(e => <center className={`${e == selectedPrimary && `primary-selected`}`}><p>{e}</p>{state[e].angles.map(a => <>{console.log(a.enabled)}<div
                        onClick={() => {
                            if (a.enabled == 2) {
                                return
                            }
                            if (selectedPrimary == 'not-selected') {
                                return notification.warning({
                                    message: "Please select primary joint",
                                    placement: "bottomLeft",
                                    duration: 5,
                                });
                            }
                            if (state[e].angles.length >= 1) {
                                let temp = joints[e]['angles']
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
                                //  setState({})
                                // setTimeout(() => {
                                //     setState(temp)
                                // }, 30);
                                console.log(temp)
                            } else {
                                let temp = state
                                temp[e].angles[0].enabled = 1
                                setState({})
                                setTimeout(() => {
                                    setState(temp)
                                }, 30);
                                console.log(temp)
                            }
                        }}
                        className={`${a.enabled == 1 ? `borderRed` : a.enabled == 2 ? 'borderGrey' : ''} arom-joints-list-item-1x`}>{a.name[0]}</div></>)}</center>)}
                </div>
            </Col>
            <Col className='arom-canvas-1x div-border-1x' xs={24} sm={24} md={16} lg={16}>
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
            <Col className='arom-controls-1x div-border-1x' xs={24} sm={24} md={4} lg={4}>
                <div className='arom-btn-grp-wrapper'>
                    <div className='arom-btn-grp'>
                        <Select
                            style={{
                                width: 100,
                            }}
                            onChange={(e) => {
                                let temp = { ...joints }
                                temp[e].angles[0].enabled = 1
                                setSelectedPrimary(e)
                                setTimeout(() => {
                                    setState(temp)
                                }, 10);
                                console.log(temp)
                            }}
                        >
                            {Object.keys(state).map(e => <Option value={e}>{e}</Option>)}
                        </Select>
                        <button><img className='icons-1x' src={play} /></button>
                        {/* <button><img className='icons-1x' src={play} /></button>
                        <button><img className='icons-1x' src={play} /></button>
                        <button><img className='icons-1x' src={graph} /></button> */}
                    </div>
                </div>
                <div className='arom-analytics-tab-wrapper-1x '>
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
        </Row >
    )
}

export default AROMNEW