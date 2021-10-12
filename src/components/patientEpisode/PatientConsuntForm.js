import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from "antd";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import FormInput from './../UI/antInputs/FormInput';
import { PATIENT_CONSENT_FORM_RENDER } from './../../contextStore/actions/episode';

const PatientConsuntForm = () => {
    const [show, setShow] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [otp, setOtp] = useState("");
    const history = useHistory();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state.PateintConsentReducer.show) {
            history.push("/dashboard");
        }
        // eslint-disable-next-line
    }, []);

    const handleHide = () => {
        setShow(false);
        history.push("/dashboard");
    }
    const handleChange = (key, value, idx = "") => {
        setOtp(value);
        dispatch({ type: "NOERROR" });
    }
    const handleSubmit = (values) => {
        console.log(otp);
        dispatch({ type: PATIENT_CONSENT_FORM_RENDER });
        history.push("/add-episode");
    }

    return (
        <React.Fragment>
            <Modal
                title={<><h5 className="text-center">INFORMED CONSENT</h5><br /><h6 className="text-center">(MyAIPhysio)</h6></>}
                footer={null}
                centered
                visible={show}
                onCancel={handleHide}

            >
                <div style={{ height: "380px", overflowY: "auto" }}>
                    <p>Dear Patient,</p>
                    <p>Thank you for choosing MyAIPhysio. Physiotherapy involves physical evaluation and treatment.</p>
                    <p>I, (Patient Name) understand that: </p>
                    <ol>
                        <li>The primary goals of Physiotherapy treatments are to help reduce my pain and improve my mobility, strength, endurance, function and quality of life.</li>
                        <li className="mt-2"><b>Me and my therapist shall be using PhysioAI platform for physiotherapy assessment, evaluation and treatment.</b>This will consist of history taking, movement analysis, various tests, Questioners  and measurements.</li>
                        <li className="mt-2">The exercises may include stretches, general movements, strength and self-treatment at home;</li>
                        <li className="mt-2">The physiotherapist will explain the most recent research and clinical reasoning behind each of the treatment interventions and options I have for alternatives;</li>
                        <li className="mt-2">There are very small possibilities of risks or complications that may result from the above listed treatments. I do not expect the Physiotherapist to anticipate all the possible risks and complications. I wish to rely on the Physiotherapist to exercise proper judgment during the course of treatment to make decisions based upon my best interest.</li>
                        <li className="mt-2"><b>I agree to inform my Physiotherapist of any change in physical parameters like pain, numbness, cuts or increase in heartrate, breathlessness if any while following the treatment plan for the therapist to take appropriate action and advise further action.</b></li>
                        <li className="mt-2">I can ask my physiotherapist questions at any time during treatment.</li>
                        <li className="mt-2">I can stop my assessment or treatment at any time.</li>
                        <li className="mt-2"><b>I may not expect the goals set up in my treatment plan if I do not adhere to the advised plan.</b></li>
                        <li className="mt-2"> I have read, understood, and had the opportunity to discuss the Patient Informed Consent document with my Physiotherapist.</li>
                    </ol>
                    <p>My signature below indicates my understanding of all of the above information.</p>
                    <div>
                        <p><b>Printed Name:</b> ....</p>
                        <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
                    </div>
                    {!showInput && <button className="btn text-white" onClick={() => { setShowInput(true) }}>Get Otp</button>}

                    {showInput &&
                        (
                            <Form onFinish={handleSubmit}>
                                <FormInput
                                    label="otp"
                                    name="otp"
                                    placeholder="Confirm Your Otp"
                                    required={true}
                                    onChange={handleChange}
                                />
                                <Form.Item>
                                    <Button htmlType="submit">Confirm Otp</Button>
                                </Form.Item>
                            </Form>
                        )}
                </div>
            </Modal>
        </React.Fragment>
    )
}
export default PatientConsuntForm;