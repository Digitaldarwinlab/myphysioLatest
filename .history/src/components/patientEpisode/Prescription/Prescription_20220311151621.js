import React, { useEffect, useRef, useState } from "react";
import { Form, Select, Button, Row, Col, Slider, Input } from "antd";
import FormInput from '../../UI/antInputs/FormInput';
import FormDate from '../../UI/antInputs/FormDate';
import FormTextArea from '../../UI/antInputs/FormTextArea';
import EpisodeDetail from './EpisodeDetail';
import { useSelector, useDispatch } from 'react-redux';
import Error from './../../UtilityComponents/ErrorHandler';
import { AddLabsAndMedicationApi, getEpisode } from "../../../API/Episode/EpisodeApi";
import Loading from './../../UtilityComponents/Loading';
import Success from './../../UtilityComponents/SuccessHandler';
import '../../../styles/Layout/Heading.css'
import { Modal, Space } from 'antd';

import {
    ASSESSMENT_FAILURE,
    ASSESSMENT_STATE_CHANGE,
    ASSESSMENT_ADD_INPUT,
    ASSESSMENT_REMOVE_INPUT,
    ASSESSMENT_EPISODE_NAME,
    ASSESSMENT_MEDICATION,
    ASSESSMENT_LABS,
    NO_OF_MEDICATION,
    ASSESSMENT_DATE,
    ASSESSMENT_SUCCESS,
    ASSESSMENT_CLEAR_STATE
} from "../../../contextStore/actions/episode";
import { VALIDATION } from "../../../contextStore/actions/authAction";
import { useHistory } from 'react-router-dom';
import ActiveSearch from './../../UtilityComponents/ActiveSearch';

const Prescription = ({ dashboard = false, eid }) => {
    const state = useSelector(state => state)
    const [episodedata, SetepisodeData] = useState({
        episodeId: '',
        primary_complaint: '',
        start_date: '',
        patientName: '',
        patientCode: ''
    })
    useEffect(async () => {

        const data = await getEpisode(state.episodeReducer.patient_code)
        if (data.length > 0) {
            data.map((item, index) => {
                //  alert(item.end_date + " : " + item.pp_ed_id)
                if (item.end_date == '') {

                    dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "pp_ed_id", value: item.pp_ed_id } })
                    SetepisodeData({
                        episodeId: item.pp_ed_id,
                        primary_complaint: item.primary_complaint,
                        start_date: item.start_date,
                        patientName: state.episodeReducer.patient_name,
                        patientCode: state.episodeReducer.patient_main_code
                    })
                }


            })
            //  alert('epsiode iss' + episodedata.pp_ed_id)



            // console.log('state is')
            // console.log(state.labsAndMedicRedu)
        }



        else {
            SetepisodeData({
                episodeId: 'No data',
                primary_complaint: 'no data',
                start_date: 'no data',
                patientName: state.labsAndMedicRedu.patient_name,
                patientCode: state.labsAndMedicRedu.patient_main_code
            })
        }

    }, [state.episodeReducer.patient_code])
    // console.log(episodedata)
    const [dateState, setDateState] = useState("");

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();

    React.useEffect(() => {
        if (!dashboard) {
            dispatch({ type: ASSESSMENT_CLEAR_STATE })
            form.setFieldsValue({ "patient_name": "" });
            form.setFieldsValue({ "patient_code": "" });
        } else {
            form.setFieldsValue({ "patient_name": state.labsAndMedicRedu.patient_name });
            form.setFieldsValue({ "patient_code": state.labsAndMedicRedu.patient_code });
        }
        // eslint-disable-next-line
    }, [eid]);

    //Location Change
    /*
    React.useEffect(() => {
        const unblock = history.block((location, action) => {
            if (dashboard) {
                return true;
            }
            if (window.confirm("You will lost your Form Data. Do You really want it?")) {
                dispatch({ type: ASSESSMENT_CLEAR_STATE });
                return true;
            } else {
                return false;
            }
        });
        return () => {
            unblock();
        };
    }, [history]);
    */
    // console.log(state);
    if (episodedata.episodeId == '') {
        SetepisodeData({
            episodeId: 'No data',
            primary_complaint: 'no data',
            start_date: 'no data',
            patientName: state.episodeReducer.patient_name,
            patientCode: state.episodeReducer.patient_main_code

        })
    }

    function error(msg) {
        Modal.error({
            title: 'This is an error message',
            content: msg,
        });
    }
    //for making change in input fields as well as global state.
    const handleChange = (key, value, id = 0) => {
        //   console.log('value is :' +  value)

        if (key === "episode") {
            dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "name", value: value } });
        } else if (key === "date") {
            dispatch({ type: ASSESSMENT_DATE, payload: { value: value.dateString } });
            setDateState(value.date);
        } else if (key === "medication" || key === "instructions" || key === "medic_notes") {
            dispatch({ type: ASSESSMENT_MEDICATION, payload: { key, value, id } })

        } else if (key === "radiology" || key === "path") {
            dispatch({ type: ASSESSMENT_LABS, payload: { key, value, id } });
        }
        else if (key === "no_of_medications") {

            // console.log(value + ': value of  number of medication')

            dispatch({ type: NO_OF_MEDICATION, payload: { key, value, id } });
            // console.log(state)
        }
        else {
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key,
                    value
                }
            })
        }
        dispatch({ type: "NOERROR" });
    }

    //for handling form submit
    const handleSubmit = async (e) => {
        if (state.Validation.error) {
            alert("Please fill all fields");
        } else if (!episodedata.episodeId) {
            alert("Either Patient is not Selected or Patient has no Active Episode.")
        } else {
            // console.log('jaane vala data')
            // console.log(state.labsAndMedicRedu)

            let result = await AddLabsAndMedicationApi(state.labsAndMedicRedu, dispatch);

            if (result && result[0]) {
                dispatch({ type: ASSESSMENT_SUCCESS });
                form.resetFields();
                // console.log('filled')
                // console.log(result)
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                    history.push('/dashboard')
                }, 5000);

            }


            else {


                if (result[1].message == 'A valid integer is required.') {
                    error('Patient does not has an  active episode')
                    dispatch({ type: ASSESSMENT_CLEAR_STATE });
                    return 1
                }
                // console.log('notfilled')
                // console.log(result)
                dispatch({ type: ASSESSMENT_FAILURE });
                dispatch({ type: VALIDATION, payload: { value: result[1] } });
                console.log(result)
            }
        }
    }

    //Upper part of medication page.
    const PresecriptionHeader = () => {
        return (
            <Row gutter={[20, 20]}>
                <Col md={24} lg={12} sm={24} xs={24}>
                    <FormDate style={{ width: '50%' }}
                        disabledDate={true}
                        value={dateState}
                        label="date"
                        placeholder="date"
                        name="date"
                        required={true} onChange={handleChange} />
                </Col>
                <Col sm={24} md={24} lg={24} xl={24}>
                    <Row>

                        <Col xs={24} sm={12} md={12} lg={12} xl={16} className="border px-2 py-2">
                            {state.labsAndMedicRedu.episode.start_date && <EpisodeDetail details={episodedata} />}
                            {!state.labsAndMedicRedu.episode.start_date && <EpisodeDetail details={episodedata} />}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    //Headline like Labs and Medication
    const Headline = (value) => {
        return <h4 className="border px-2 py-2 mt-2 mb-2">{value}</h4>
    }
    //Medication Form

    const marks = {
        1: '1-OD',
        2: '2-BD',
        3: '3-TD',
        4: '4QD'
    }



    //Medication form increase handler
    const MedicationIncrease = () => {
        dispatch({ type: ASSESSMENT_ADD_INPUT, payload: { type: "medication" } })
    }
    // Medication form decrease handler
    const MedicationDecrease = () => {
        dispatch({ type: ASSESSMENT_REMOVE_INPUT, payload: { type: "medication" } });
    }
    // labs form increase handler
    const LabsIncrease = () => {
        dispatch({ type: ASSESSMENT_ADD_INPUT, payload: { type: "labs" } })
    }
    // labs form decrease handler
    const LabsDecrease = () => {
        dispatch({ type: ASSESSMENT_REMOVE_INPUT, payload: { type: "labs" } });
    }
    // Add and remove button with type medication and labs
    const ButtonComponent = (props) => {
        return (
            <Row>
                <Button type="primary" className="me-1 btncolor" shape="circle" onClick={props.Increase}>
                    +
                </Button>
                <Button type="primary" disabled={props.length === 1 && true} className="btncolor" shape="circle" onClick={props.Decrease}>
                    -
                </Button>
            </Row>
        )
    }
    //getEpisodeDetails
    const getPrescreptioEpisode = async (pData) => {
        if (pData.length !== 0) {
            form.setFieldsValue({ "patient_name": pData.first_name + " " + pData.last_name });
            form.setFieldsValue({ "patient_code": pData.pp_patm_id });
            let episode = await getEpisode(pData.pp_patm_id);

            if (episode.length !== 0) {


                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "pp_ed_id", value: episode[0].pp_ed_id } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "episode_no", value: episode[0].episode_number } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "start_date", value: episode[0].start_date } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "primary_complaint", value: episode[0].primary_complaint } });
            } else {
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "pp_ed_id", value: "" } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "episode_no", value: "" } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "start_date", value: "" } });
                dispatch({ type: ASSESSMENT_EPISODE_NAME, payload: { key: "primary_complaint", value: "" } });
            }
        } else {
            form.setFieldsValue({ "patient_name": "" });
            form.setFieldsValue({ "patient_code": "" });
        }
    }
    return (
        <div className="px-2 py-4">
            {state.Validation.error && <Error error={state.Validation.error} />}
            {state.labsAndMedicRedu.isLoading && <Loading />}
            {state.labsAndMedicRedu.success && <Success success={state.labsAndMedicRedu.success} />}
            {state.Validation.episode_check === 'failed' && <Error error={state.Validation.msg} />}
            <Row>
                <Col md={12} lg={12} sm={24} xs={24}>
                    <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
                        onClick={() => { history.goBack() }}
                        title="Go Back"
                        role="button"></i>
                    <h3><i className="fas fa-pills"></i> Prescriptions</h3>
                </Col>
                <Col md={12} lg={12} sm={24} xs={24}>
                    <ActiveSearch />
                </Col>
            </Row>
            <Form style={{ marginTop: "50px" }} onFinish={handleSubmit} layout="vertical" form={form} name="control-hooks">

                <PresecriptionHeader />
                {Headline("Medications")}
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <FormInput label="Patient Names" name="patient_name"

                            className="input-field"
                            value={state.episodeReducer.patient_name}
                            defaultValue={state.episodeReducer.patient_name}
                            placeholder={state.episodeReducer.patient_name}
                            disabled={true}
                        />
                    </Col>
                    <Col xs={24} sm={24} lg={12} xl={12}>
                        <FormInput label="Patient Code" name="patient_code"
                            className="input-field"
                            value={state.episodeReducer.patient_main_code}
                            defaultValue={state.episodeReducer.patient_main_code}
                            placeholder={state.episodeReducer.patient_main_code}
                            disabled={true}
                        />
                    </Col>
                </Row>
                {state.labsAndMedicRedu.medicationList.map((value, index) => {
                    return (
                        <Row key={index} className="border PrescriptionsMain px-0 py-4 mt-1 mb-1" gutter={[20, 20]}>
                            <Col xs={24} sm={24} lg={10} xl={10}>
                                <FormInput
                                    className="input-field"
                                    rules={[{ required: true, message: `Please Select Medication.` }]}
                                    label="Medication"
                                    ref={(input) => { input && input.focus() }}
                                    value={state.labsAndMedicRedu.medicationList[index].medication}
                                    name={"medication" + index}
                                    //onChange={(name, value, index) => console.log("")}
                                    onChange={(name, value, index) => handleChange("medication", value, index)}
                                    placeholder="select medication"
                                    index={index}
                                    required={true}

                                >

                                </FormInput>
                            </Col>
                            <Col style={{ position: 'relative', top: '5px' }} xs={24} sm={24} lg={4} xl={4}>
                                <span>Medications Per Days</span>
                                <Slider

                                    min={1}
                                    max={4}
                                    name={"no_of_medications" + index}

                                    marks={marks}
                                    onChange={(e) => handleChange('no_of_medications', e, index)}
                                    value={state.labsAndMedicRedu.medicationList[index].no_of_medications}
                                    className="p-1"
                                    style={{ position: 'relative' }}
                                />
                            </Col>
                            <Col xs={24} sm={24} lg={10} xl={10}>
                                <FormInput
                                    label="Instructions"
                                    className="input-field"
                                    placeholder="Note"
                                    name={"instructions" + index}
                                    value={state.labsAndMedicRedu.medicationList[index].instructions}
                                    // onChange={(name, value, index) => console.log("")}
                                    onChange={(name, value, index) => handleChange("instructions", value, index)}
                                    index={index}
                                    required={true}
                                />
                            </Col>
                            <Col span={24}>
                                <FormTextArea
                                    required={true}
                                    label="Notes"
                                    name={"medic_notes" + index}
                                    value={state.labsAndMedicRedu.medicationList[index].medic_notes}
                                    // onChange={(name, value, index) => console.log("")}
                                    onChange={(name, value, indx) => handleChange("medic_notes", value, index)}
                                    index={index}
                                />
                            </Col>
                        </Row>
                    )
                    // <MedicationComp val={value} index={index} />
                })}

                {
                    state.labsAndMedicRedu.medicationList.length > 0 && (
                        <ButtonComponent
                            Increase={MedicationIncrease}
                            length={state.labsAndMedicRedu.medicationList.length}
                            Decrease={MedicationDecrease} />
                    )}
                {Headline("Labs")}

                {state.labsAndMedicRedu.labsList.map((value, index) => {
                    return (
                        <Row key={index} className="border px-0 py-4 mt-1 mb-1" gutter={[20, 20]}>
                            <Col span={24}>
                                <FormInput
                                    label="Path"
                                    placeholder=""
                                    name={"path" + index}
                                    value={state.labsAndMedicRedu.labsList[index].path}
                                    // onChange={(name, value, index) => console.log("")}
                                    onChange={(name, value, indx) => handleChange("path", value, index)}
                                    required={true}
                                />
                            </Col>
                            <Col span={24}>
                                <FormInput
                                    label="Radiology"
                                    placeholder=""
                                    name={"radiology" + index}
                                    value={state.labsAndMedicRedu.labsList[index].radiology}
                                    // onChange={(name, value, index) => console.log("")}
                                    onChange={(name, value, indx) => handleChange("radiology", value, index)}
                                    index={index}
                                    required={true}
                                />
                            </Col>
                        </Row>
                    )
                    //<Labs key={value.id} index={index} />
                })}
                {
                    state.labsAndMedicRedu.labsList.length > 0 && (
                        <ButtonComponent
                            Increase={LabsIncrease}
                            length={state.labsAndMedicRedu.labsList.length}
                            Decrease={LabsDecrease} />
                    )}
                <Row gutter={[20, 20]} style={{ marginBottom: '15px' }}>
                    <Col md={24} lg={12} sm={24} xs={24} className="mt-4">
                        <FormTextArea label="Notes"
                            required={true}
                            value={state.labsAndMedicRedu.labs_notes}
                            name="labs_notes"
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginBottom: '15px' }}>
                    <Col md={24} lg={24} sm={24} xs={24} className="text-center">
                        <Button type="primary" htmlType="submit" className="text-center btncolor mt-2">Submit</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}
export default Prescription;