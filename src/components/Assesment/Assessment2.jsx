import { BackTop, Badge, Button, Col, Descriptions, notification, Row, Switch, Table, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaClipboardList } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5';
import create from "../.././assets/create.webp";
import standingman from "../.././assets/standing-man.webp";
import pain from "../.././assets/pain.webp";
import postureimg from "../.././assets/posture.webp";
import aromai from "../.././assets/aromai.webp";
import arom from "../.././assets/arom.webp";
import scaleindex from "../.././assets/scaleindex.webp";
import specialtest from "../.././assets/specialtest.webp";
import videoconf from "../.././assets/video-conf.webp";
import html2canvas from "html2canvas";
import Loader from "../video-call-screens/Loader";
//video-conf
import './Assesment2.css'
import Body from './Body/Body';
import { useHistory } from 'react-router-dom';
import { getEpisode } from '../../API/Episode/EpisodeApi';
import { useSelector } from 'react-redux';
import { ASSESMENT_CLEARSTATE, RECEIVED_DATA, STATECHANGE } from '../../contextStore/actions/Assesment';
import { useDispatch } from 'react-redux';
import { tableLabelLateral, tableLabels } from '../episode-visit-details/Assessment/AssessmentList';
import { AssesmentAPI } from '../../API/Assesment/assementApi';
import H2 from './components/H2';
import Physical from './Report/Physical';
import Pain from './Report/Pain';
import PostureReport from './Report/Posture';
import AROM from './Report/AROM';
import Scale from './Report/Scale';
import Special from './Report/Special';
const { Text } = Typography
const Assessment2 = () => {
    const screenShotRef = useRef(null);
    const state = useSelector((state) => state);
    const dispatch = useDispatch()
    const [episodedata, SetepisodeData] = useState();
    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [latL, setLatL] = useState([]);
    const [latR, setLatR] = useState([]);
    const executeScroll = () => screenShotRef.current.scrollIntoView();
    const history = useHistory()
    const [posture, setPosture] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false)
    const [QuestionVisibility, setQuestionVisibility] = useState("none");
    const [RomVisibility, setRomVisibility] = useState("none");
    const [RomVisibilityM, setRomVisibilityM] = useState("none");
    const [RomVisibilityL, setRomVisibilityL] = useState("none");
    const [RomVisibilityR, setRomVisibilityR] = useState("none");
    const [videoBtn, setVideoBtn] = useState(localStorage.getItem("OnAssessmentScreen") == "true" ? true : false)
    const videoConChecked = (checked) => {
        // console.log(typeof localStorage.getItem("OnAssessmentScreen"))
        // console.log(typeof checked)
        if (localStorage.getItem("OnAssessmentScreen") == "true") {
            localStorage.setItem("OnAssessmentScreen", 'false');
            setVideoBtn(false)
        } else {
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

    useEffect(() => {
        const unblock = history.block((location, action) => {
            if (
                location.pathname != "/assesment/Questions" &&
                location.pathname != "/assesment/PainAssessment" &&
                location.pathname != "/assesment/SpecialTest" &&
                location.pathname != "/assessment/posture/1" &&
                location.pathname != "/assessment/arom/1" &&
                location.pathname != "/assessment/AROM" &&
                location.pathname != "/assessment/physical" &&
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
        // form.setFieldsValue({ Ref_Dr_Name: data.Ref_Dr_Name });
        // form.setFieldsValue({ Ref_Dr_ID: data.Ref_Dr_ID });
        // form.setFieldsValue({ complaint: data.primary_complain });
        // form.setFieldsValue({ Operative_Types: data.Operative_Types });
        // form.setFieldsValue({ file: data.file });
        // form.setFieldsValue({ Patient_History: data.Patient_History });

        return () => {
            unblock();
        };
    }, [history, state.FirstAssesment.episode_id]);
    const setAnteriorData = (data) => {
        console.log("anterior ", data)
        if (Object.keys(data).length > 0) {
            // let data = state.FirstAssesment.Anterior_AI_Data;
            setRomVisibility("block");
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
            setRomVisibilityM("grid");
            setRomVisibilityL("grid");
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
            setRomVisibilityM("grid");
            setRomVisibilityR("grid");
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
            // const question = document.getElementById("question");
            // const rom = document.getElementById("rom");
            // const rom_manual = document.getElementById("rom_manual");
            // const posture_btn = document.getElementById("posture-btn");

            if (state.FirstAssesment.KOOS === "") {
                setQuestionVisibility("none");
            } else {
                setQuestionVisibility("inline");
            }
            // setQuestionVisibility('none')
            if (Object.keys(state.FirstAssesment.posture).length > 0) {
                // posture_btn.innerHTML = "Posture Done";
                setPosture(true);
            }
            // Check if AI_Data
            if (
                (state.FirstAssesment.Anterior_AI_Data &&
                    Object.keys(state.FirstAssesment.Anterior_AI_Data).length > 0) ||
                Object.keys(state.FirstAssesment.LeftLateral_AI_Data).length > 0 ||
                Object.keys(state.FirstAssesment.RightLateral_AI_Data).length > 0
            ) {
                // if (state.FirstAssesment.Arom_M) {
                //     rom_manual.innerHTML = "AROM calculated";
                // } else {
                //     rom_manual.innerHTML = "AROM (Manual)";
                // }
                // if (state.FirstAssesment.Arom_Ai) {
                //     rom.innerHTML = "AROM calculated";
                // } else {
                //     rom.innerHTML = "AROM (using AI)";
                // }
                // rom.innerHTML = "AROM Assesment";
                setRomVisibility('contents')
                if (Object.keys(state.FirstAssesment.Anterior_AI_Data).length > 0) {
                    let data = state.FirstAssesment.Anterior_AI_Data;
                    setRomVisibility("block");
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

                }
                if (Object.keys(state.FirstAssesment.LeftLateral_AI_Data).length > 0) {
                    let data = state.FirstAssesment.LeftLateral_AI_Data;
                    setRomVisibilityM("grid");
                    setRomVisibilityL("grid");
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
                    setRomVisibilityM("grid");
                    setRomVisibilityR("grid");
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
                }
            }
        },
        state.FirstAssesment
    );
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
    return (
        <>
            <Row justify='space-between' className='main-container-1x assessment-report'>
                <Col sm={10} md={12} lg={10} className='h1-1x'> <FaClipboardList style={{ marginBottom: '10px' }} size={25} /><span >Assesment/Consultation</span></Col>
                <Col sm={6} md={12} lg={12} > <Button style={{ marginLeft: '5px' }} className="create-patient-btn-1x bg-theme-1x btn-1x"><span className="only-icons-sm-1x">Video conference&nbsp;</span><Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={videoBtn}
                    onChange={videoConChecked}
                /></Button>

                    <Button className="create-patient-btn-1x bg-theme-1x btn-1x"><img className='icons-1x' src={create} /><span className="only-icons-sm-1x">Create Patient</span></Button> </Col>
                <Col span={24}>
                    <div className='patient-details-1x h3-font-1x bg-theme-1x div-border-1x'>
                        <span>Patient Name : {state.episodeReducer.patient_name}</span>
                        <span>Patient Episode :  {episodedata ? episodedata.complaintId : null}</span>
                        <span>Patient Code : {state.episodeReducer.patient_main_code}</span>
                    </div>
                </Col>
                <Col span={24} className="assesment-list-wrap-1x div-border-1x bg-theme-1x">
                    <div class="assesment-list-1x h3-font-1x div-border-1x">
                        <div class="assesment-list-item-1x" onClick={() => history.push('/assessment/physical')}> <center> <img className='assesment-list-icons-1x' src={standingman} /><br />Physical</center></div>
                        <div class="assesment-list-item-1x" onClick={() => {
                            history.push("/assesment/PainAssessment");
                        }}> <center> <img className='assesment-list-icons-1x' src={pain} /><br />Pain</center></div>
                        <div class="assesment-list-item-1x" onClick={() => {
                            if (localStorage.getItem("OnAssessmentScreen") == "true") {
                                return notification.warning({
                                    message: "You are on video conference",
                                    placement: "bottomLeft",
                                    duration: 2,
                                });
                            }
                            history.push('/assessment/posture/1')
                        }}> <center> <img className='assesment-list-icons-1x' src={postureimg} /><br />Posture</center></div>
                        <div class="assesment-list-item-1x" onClick={() => {
                            if (localStorage.getItem("OnAssessmentScreen") == "true") {
                                return notification.warning({
                                    message: "You are on video conference",
                                    placement: "bottomLeft",
                                    duration: 2,
                                });
                            }
                            history.push('/assessment/arom/1')
                        }}> <center> <img className='assesment-list-icons-1x' src={aromai} /><br />AROM</center></div>
                        <div class="assesment-list-item-1x" onClick={() => history.push("/assesment/Questions")}> <center> <img className='assesment-list-icons-1x' src={specialtest} /><br />Scale & index</center></div>
                        <div class="assesment-list-item-1x" onClick={() => {
                            history.push("/assesment/SpecialTest");
                        }}> <center> <img className='assesment-list-icons-1x' src={scaleindex} /><br />Special Test</center></div>
                        <div class="assesment-list-item-1x" onClick={() => history.push("/assessment/AROM")}> <center> <img className='assesment-list-icons-1x' src={arom} /><br />Manual AROM</center></div>
                    </div>
                </Col>
                <Col span={24} className="bg-theme-1x mb-3 div-border-1x">
                    <Body executeScroll={executeScroll} screenShotRef={screenShotRef} />
                </Col>
                {state.FirstAssesment.physicalSubmit && <Col span={24} className="mb-3 bg-theme-1x div-border-1x">
                    <H2 title={'Physical Assessment'} />
                    <Physical data={state.FirstAssesment} />
                </Col>}
                {state.FirstAssesment.pain_state && (
                    <Col span={24} className="mb-3 bg-theme-1x div-border-1x">
                        <H2 title={'Pain Assessment'} />
                        <Pain state={state} />
                    </Col>
                )}
                {posture && <Col span={24} className="mb-3 bg-theme-1x div-border-1x">
                    <H2 title={'Posture Analysis(Degree of Deviation)'} />
                    <PostureReport state={state} />
                </Col>}
                {state.FirstAssesment.aromSubmit && <Col span={24} className="mb-3 bg-theme-1x div-border-1x">
                    <H2 title={'AROM'} />
                    <AROM
                        Anterior_AI_Data={state.FirstAssesment.Anterior_AI_Data}
                        LeftLateral_AI_Data={state.FirstAssesment.LeftLateral_AI_Data}
                        RightLateral_AI_Data={state.FirstAssesment.RightLateral_AI_Data}
                        RomVisibility={RomVisibility}
                        tableData1={tableData1}
                        tableData2={tableData2}
                        latL={latL}
                        latR={latR}
                        RomVisibilityL={RomVisibilityL}
                        RomVisibilityR={RomVisibilityR}
                        data={state.FirstAssesment} />
                </Col>}
                <Col style={{ display: QuestionVisibility }} span={24} className="mb-3 bg-theme-1x div-border-1x">
                    <H2 title={'Questionnaire KOOS score'} />
                    <Scale state={state} />
                </Col>
                {state.FirstAssesment.specialSubmit && <Col span={24} className="mb-3 bg-theme-1x div-border-1x">
                    <H2 title={'Special Test'} />
                    <Special state={state} />
                </Col>}
            </Row>
            {submitLoading && <Loader />}
            <Row style={{ margin: '20px' }} justify='center'>
                <Col>
                    <center>
                        <Button
                            htmlType="submit"
                            style={{ backgroundColor: "#2d7ecb" }}
                            className="ms-3"
                            onClick={Submit}
                        >
                            Submit
                        </Button>
                    </center>
                </Col>
            </Row>
        </>
    )
}

export default Assessment2
