import { Checkbox, Col, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DropdownApi } from '../../API/Dropdown/Dropdown';
import { ASSESSMENT_ADD_SUB_INPUT, ASSESSMENT_REMOVE_SUB_INPUT, ASSESSMENT_SUBJECTIVE, STATECHANGE } from '../../contextStore/actions/Assesment';

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
    return (
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
                                            {dropdownValue.Occupation.map(i => <option value={i}>{i}</option>)}
                                        </select>
                                    }
                                </Col>

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
    )
}

export default Physical