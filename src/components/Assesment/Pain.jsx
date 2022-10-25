import { Button, Checkbox, Col, Input, Radio, Row, Select, Space, Slider, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { GrAddCircle } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import arrow from "../.././assets/arrow.webp";
import { useHistory } from 'react-router-dom';
import { DropdownApi } from '../../API/Dropdown/Dropdown';
import { ASSESSMENT_ADD_SUB_INPUT, ASSESSMENT_REMOVE_SUB_INPUT, ASSESSMENT_SUBJECTIVE, STATECHANGE } from '../../contextStore/actions/Assesment';
import DetailsTab from './DetailsTab';
import H1 from './components/H1';
import BackSave from './components/BackSave';
const Pain = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    // const[value, setValue]=useState();
    const state = useSelector((state) => state);
    const assesmentstate = useSelector((state) => state.FirstAssesment);

    useEffect(() => { }, [assesmentstate]);
    const dispatch = useDispatch();
    const [test, setTest] = useState({
        Aching: 0,
        Burning: 0,
        Stabbing: 0,
        Needles: 0,
        Numbness: 0,
        Shooting: 0,
        Stiffness: 0,
    });
    const [test1, setTest1] = useState({
        sleep: 0,
        Rest: 0,
        Movement: 0,
        Jerk: 0,
    });
    const handleChange1 = async (key, value, id = 0) => {
        if (key === "nature_of_pain") {
            state.FirstAssesment.nature_of_pain_here = JSON.stringify(value).replace('[', '').replace(']', '').replaceAll('"', '');
            // console.log(JSON.stringify(value).replace('[', '').replace(']', ''))

            value.forEach((e) => {
                delete test[e]
            })
            value.forEach(value => {
                if (value == "Aching") {
                    test["Aching"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Aching: 1 },
                    //   },
                    // });
                } else if (value === "Burning") {
                    test["Burning"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Burning: 1 },
                    //   },
                    // });
                } else if (value === "Stabbing") {
                    test["Stabbing"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Stabbing: 1 },
                    //   },
                    // });
                } else if (value === "Needles") {
                    test["Needles"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Needles: 1 },
                    //   },
                    // });
                } else if (value === "Numbness") {
                    test["Numbness"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Numbness: 1 },
                    //   },
                    // });
                } else if (value === "Shooting") {
                    test["Shooting"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Shooting: 1 },
                    //   },
                    // });
                } else if (value === "Stiffness") {
                    test["Stiffness"] = 1
                    // dispatch({
                    //   type: STATECHANGE,
                    //   payload: {
                    //     key,
                    //     value: { ...test, Stiffness: 1 },
                    //   },
                    // });
                }
            })
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value: test,
                },
            });

        } else if (key === "pain_aggravating") {
            state.FirstAssesment.pain_aggravating_here = value;
            let obj = {
                Sleep: 0,
                Rest: 0,
                Movement: 0,
                Jerk: 0,
            };
            if (value.includes("Sleep")) {
                obj["Sleep"] = 1;
            }
            if (value.includes("Rest")) {
                obj["Rest"] = 1;
            }
            if (value.includes("Movement")) {
                obj["Movement"] = 1;
            }
            if (value.includes("Jerk")) {
                obj["Jerk"] = 1;
            }
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value: obj,
                },
            });
        } else if (key === "pain_relieving") {
            state.FirstAssesment.pain_relieving_here = value;
            let obj = {
                Rest: 0,
                Hot: 0,
                Medication: 0,
                Physiotherapy: 0,
            };
            if (value.includes("Rest")) {
                obj["Rest"] = 1;
            }
            if (value.includes("Hot")) {
                obj["Hot"] = 1;
            }
            if (value.includes("Medication")) {
                obj["Medication"] = 1;
            }
            if (value.includes("Physiotherapy")) {
                obj["Physiotherapy"] = 1;
            }
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value: obj,
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
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    const [value, setValue] = React.useState(1);

    // const onChange = e => {
    //   console.log('radio checked', e.target.value);
    //   setValue(e.target.value);
    // };
    const HandleSubmit = () => {
        console.log("submit");
    };
    const back = () => {
        // history.goBack();
        alert("hello");
    };
    const desc = [1, 2, 3, 4, 5, 6];
    const formatter = (value) => {
        return `${desc[value]}`;
    };
    const marks1 = {
        0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
        2: <i class="far fa-smile" style={{ fontSize: 25, color: "lime" }}></i>,
        4: <i class="far fa-meh" style={{ fontSize: 25, color: "limegreen" }}></i>,
        6: (
            <i
                class="far fa-frown"
                style={{ fontSize: 25, color: "lightsalmon" }}
            ></i>
        ),
        8: <i class="far fa-frown" style={{ fontSize: 25, color: "orange" }}></i>,
        10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
    };
    const plainOptions = ["Rest", "Movement", "Jerk", "Sleep"];
    const plainOptions1 = ["Rest", "Hot", "Medication", "Physiotherapy"];
    const goBack = () => {
        if (window.confirm("pain assessment data will be lost")) {
            dispatch({ type: "PAIN_ASSESMENT_CLEARSTATE" });
            history.push("/assessment/1");
            state.FirstAssesment.pain_state = false;
            return;
        }
        return;
    };
    const saveData = () => {
        // setActive(3)
        console.log("save");
        if (window.confirm("pain assessment data will save")) {
            state.FirstAssesment.pain_state = true;
            history.push("/assessment/1");
        }
    };
    return (
        <Row justify='space-between' className='main-container-1x'>
            <H1 image={arrow} title={'Pain Assessment'} />
            <DetailsTab />
            <Col span={24}>
                <Row justify='center' className='m1-1x'>
                    <Col className='bg-theme-1x m1-1x div-border-1x' sm={22} md={11} lg={12}>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Nature Of Pain</span><br />
                            <Row justify='end' className='m1-1x'>
                                <Checkbox.Group
                                    style={{
                                        paddingLeft: "0px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    options={["Aching", "Burning", "Stabbing", "Needles", "Numbness", "Shooting", "Stiffness"]}
                                    onChange={(e) => handleChange1("nature_of_pain", e)}
                                    name="Nature Of Pain"
                                />
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Pain Scale</span><br />
                            <Row justify='start' className='m1-1x'>
                                <Slider
                                    marks={marks1}
                                    min={0}
                                    max={10}
                                    step={2}
                                    onChange={(value) => handleChange1("pain_scale", value)}
                                    defaultValue={state.FirstAssesment.pain_scale}
                                    value={state.FirstAssesment.pain_scale}
                                    style={{ width: 200 }}
                                />
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Pain Aggravating</span><br />
                            <Row justify='start' className='m1-1x'>
                                <Checkbox.Group
                                    style={{
                                        paddingLeft: "0px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    options={plainOptions}
                                    onChange={(e) => handleChange1("pain_aggravating", e)}
                                    name="Pain Aggravating"
                                />
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Pain Relieving</span><br />
                            <Row justify='start' className='m1-1x'>
                                <Checkbox.Group
                                    style={{
                                        paddingLeft: "0px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    name="Pain Relieving"
                                    onChange={(e) => handleChange1("pain_relieving", e)}
                                    options={plainOptions1}
                                />
                            </Row>
                        </Col>
                    </Col>

                    <Col className='bg-theme-1x m1-1x div-border-1x' sm={22} md={11} lg={11}>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Scars</span><br />
                            <Row justify='start' className='m1-1x'>
                                <Input
                                    placeholder="Scars"
                                    value={state.FirstAssesment.pain_scars}
                                    defaultValue={state.FirstAssesment.pain_scars}
                                    onChange={(e) => handleChange1("pain_scars", e.target.value)}
                                    name="pain_scars"
                                />
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h3-1x m1-1x'>Swelling</span><br />
                            <Row justify='start' className='m1-1x'>
                                <Radio.Group
                                    onChange={(e) => handleChange1("pain_swelling", e.target.value)}
                                    name="pain_swelling"
                                >
                                    <Radio value={"Pitting"}>Pitting</Radio>
                                    <Radio value={"Non-pitting"}>Non-pitting</Radio>
                                    <Radio value={"Absent"}>Absent</Radio>
                                </Radio.Group>
                            </Row>
                        </Col>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h2-1x m1-1x'>Sensory Inputs</span><br />
                            <Row justify='space-between' className='m1-1x'>
                                <span className='h3-1x m1-1x'>Superficial</span><br />
                                <Row justify='space-between' className='m1-1x'>
                                    <Radio.Group
                                        name="Superficial"
                                        onChange={(e) =>
                                            handleChange1("superficial", e.target.value)
                                        }
                                    >
                                        <Radio value={"Intact"}>Intact</Radio>
                                        <Radio value={"Impaired"}>Impaired</Radio>
                                        <Radio value={"Absent"}>Absent</Radio>
                                    </Radio.Group>
                                </Row>

                            </Row>
                            <Row justify='space-between' className='m1-1x'>
                                <span className='h3-1x m1-1x'>Deep</span><br />
                                <Row justify='space-between' className='m1-1x'>
                                    <Radio.Group
                                        onChange={(e) => handleChange1("deep", e.target.value)}
                                        name="Deep"
                                    >
                                        <Radio value={"Intact"}>Intact</Radio>
                                        <Radio value={"Impaired"}>Impaired</Radio>
                                        <Radio value={"Absent"}>Absent</Radio>
                                    </Radio.Group>
                                </Row>

                            </Row>
                            <Row justify='space-between' className='m1-1x'>
                                <span className='h3-1x m1-1x'>Cortial</span><br />
                                <Row justify='space-between' className='m1-1x'>
                                    <Radio.Group
                                        onChange={(e) => handleChange1("cortial", e.target.value)}
                                        name="Cortial"
                                    >
                                        <Radio value={"Intact"}>Intact</Radio>
                                        <Radio value={"Impaired"}>Impaired</Radio>
                                        <Radio value={"Absent"}>Absent</Radio>
                                    </Radio.Group>
                                </Row>

                            </Row>
                        </Col>
                    </Col>
                </Row>
                <BackSave submit={saveData}/>
            </Col>
        </Row>
    )
}

export default Pain