import { Button, Checkbox, Col, Input, Radio, Row, Select, Space } from 'antd';
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

const { Option } = Select;
const Physical = () => {
    const state = useSelector((state) => state);
    let plainOptions1 = ["Diabetes", "HYN", "COPD", "Cardiac"];
    const [medic, setMedic] = useState(true);
    const [others, setOthers] = useState(true);
    const [Surgical_History_Notes, SetSurgical_History_Notes] = useState(true);
    const [dropdownValue, setDropdownValue] = useState([]);
    useEffect(() => {
        async function getData() {
            const data = await DropdownApi("Assesment");
            console.log(data)
            setDropdownValue(data.Assesment)
        }
        getData();
    }, []);
    const history = useHistory();
    const dispatch = useDispatch();
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
        if (
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
    return <Row justify='space-between' className='main-container-1x'>
        {/* <Col className='h1-1x m1-1x' span={24}><img onClick={()=>history.goBack()} src={arrow} style={{width:'30px'}}/>Physical Assessment</Col> */}
        <H1 image={arrow} title={'Physical Assessment'} />
        <DetailsTab />
        <Col className='bg-theme-1x m1-1x div-border-1x' sm={22} md={11} lg={11}>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>Subjective</span><br />
                {state.FirstAssesment.subjective.map((data, index) => <>
                    <Row justify='space-between' className='m1-1x'> <span className='h3-1x m1-1x'>Occupation</span>  {dropdownValue.Occupation !== undefined &&
                        <Select
                            style={{ width: '28vw' }}
                            dropdownMatchSelectWidth={true}
                            value={
                                state.FirstAssesment.subjective[index].occupation
                            }
                            onChange={(e) =>
                                handleChange("occupation", e, index)
                            }
                        >
                            {dropdownValue.Occupation.map(i => <Option value={i}>{i}</Option>)}
                        </Select>
                    }</Row>
                    <Row justify='space-between' className='m1-1x'>  <span className='h3-1x m1-1x'>Duration</span><br />
                        <Row justify='space-between' className='m1-1x'>
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
                        </Row>

                    </Row>
                    <hr/>
                    {state.FirstAssesment.subjective.length - 1 == index && <Row justify='end'>
                        <Space><MdDelete disabled={
                            state.FirstAssesment.subjective.length <= 1 ? true : false
                        }
                            onClick={() => handleRemoveFields()} size={25} /> <GrAddCircle onClick={() => handleAddFields()} size={25} /> </Space>
                    </Row>}
                </>)}
            </Col>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>History of present complaint</span><br />
                <Row justify='space-between' className='m1-1x'><Space>
                    <Radio.Group
                        // options={[
                        //     "Sudden",
                        //     "Gradual",
                        //     "History of Fall",
                        //     "Tumor",
                        //     "Pregnency",
                        //     "Metal implants",
                        //     "Pacemaker-ICD",
                        //     "Any other injury",
                        // ]}
                        onChange={(e) => handleChange("History", e.target.value)}
                        value={state.FirstAssesment.History}
                    >
                        {[
                            "Sudden",
                            "Gradual",
                            "History of Fall",
                            "Tumor",
                            "Pregnency",
                            "Metal implants",
                            "Pacemaker-ICD",
                            "Any other injury",
                        ].map(value => <Radio style={{ margin: '5px' }} value={value}>{value}</Radio>)}

                    </Radio.Group>
                </Space>
                </Row>
            </Col>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>Cheif Complaint</span><br />
                <Row justify='space-between' className='m1-1x'>
                    <Input
                        type="text"
                        className='m1-1x'
                        style={{ width: '28vw' }}
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
                </Row>
            </Col>
        </Col>
        <Col className='bg-theme-1x m1-1x div-border-1x' sm={22} md={11} lg={11}>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>Past Medical History</span>
                <Row justify='space-between' className='m1-1x'>
                    <Col className='m1-1x' md={24} lg={24} sm={24} xs={24} >
                        <Checkbox.Group
                            style={{ display: 'flex', justifyContent: 'space-between' }}
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
                    </Col>
                </Row>
            </Col>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>Built Type</span><br />
                <Row justify='space-between' className='m1-1x'>
                    <Radio.Group
                        options={["Ectomorphic", "Mesomorphic", "Endomorphic"]}
                        onChange={(e) => handleChange("Built", e.target.value)}
                        value={state.FirstAssesment.Built}
                    ></Radio.Group>
                </Row>
            </Col>
            <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                <span className='h2-1x m1-1x'>Any Other Details</span><br />
                <Row justify='space-between' className='m1-1x'>
                    <input
                        type="text"
                        className='m1-1x w-100'
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
                </Row>
            </Col>
        </Col>
       <BackSave submit={()=>{
        handleChange("physicalSubmit", true)
        history.goBack()
       }} />
    </Row>
}

export default Physical