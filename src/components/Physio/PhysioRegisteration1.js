import React, { useState,useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { PHYSIO_STATE_CHANGE } from "./../../contextStore/actions/physioRegAction";
import { VALIDATION } from "../../contextStore/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import Error from "./../UtilityComponents/ErrorHandler.js";
import svg from "./../../assets/step1.png";

import StepBar from './../UtilityComponents/StepBar';
import validation from "./../Validation/authValidation/authValidation";
import { Typography, Select, Row, Button, Col, Form } from 'antd';
import FormInput from './../UI/antInputs/FormInput';
import { getPhysioList } from '../../API/Physio/PhysioRegister';
import { CLEAR_STATE, PHYSIO_REGISTER_FAILURE } from '../../contextStore/actions/physioRegAction';
import '../../styles/Layout/Heading.css'
const { Title } = Typography;


const PhysioRegisteration1 = (props) => {
    const history=useHistory()
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [phsiodata,Setphsiodata]=useState([])
    
    useEffect(() => {
        const data = state.physioRegisterReducer;
        form.setFieldsValue({ first_name: data.first_name });
        form.setFieldsValue({ last_name: data.last_name });
        form.setFieldsValue({ middle_name: data.middle_name });
        form.setFieldsValue({ mobile_no: data.mobile_no });
        form.setFieldsValue({ landline: data.landline });
        form.setFieldsValue({ whatsapp_no: data.whatsapp_no });
        form.setFieldsValue({ Doctor_type: data.Doctor_type });
        form.setFieldsValue({ gender: data.gender });
        dispatch({ type: "NOERROR" });

       
    }, [props.clearState]);

    const handleChange = (key, value, idx = 0) => {
        dispatch({
            type: PHYSIO_STATE_CHANGE,
            payload: {
                key,
                value
            }
        })
        dispatch({ type: "NOERROR" });
       
    }

    
   // console.log('regg',props.phsiodata)

    const handleBlur = (e) => {
        
        const key = e.target.name;
        let error = {};
        if (key === "first_name" || key=='middle_name' || key === "last_name") {
            error = validation.checkNameValidation(e.target.value);
            if (error.error) {
                if (key === "first_name")
                    error.error = "First " + error.error;
                else if(key=='middle_name')
                {
                    error.error = "Middle " + error.error;
                }
                else
                    error.error = "Last " + error.error;
            }
            if (error.error)
                dispatch({ type: VALIDATION, payload: { error: error.error } });
            setTimeout(() => {
                dispatch({ type: VALIDATION, payload: { error: "" } });
            }, 10000);
        }
        else if (key === "mobile_no" || key === "whatsapp_no") {
            error = validation.checkMobNoValidation(e.target.value);
            if (error.error) {
                if (error.error) {
                    if (key === "mobile_no")
                        error.error = "Mobile " + error.error;
                    else
                        error.error = "Whatsapp " + error.error;
                }
                dispatch({ type: VALIDATION, payload: { error: error.error } });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 10000);
            }
        }
    }
    const handleReset = () => {
        if (state.physioRegisterReducer.id) {
            if (window.confirm("Confirm, Do You want to Cancel Update?")) {
                dispatch({ type: CLEAR_STATE });
                form.resetFields()
              //  history.push("/physio/list");
              
            }
        } else {
            if (window.confirm("Confirm, Do You want to Reset all fields?")) {
                dispatch({ type: CLEAR_STATE });
                form.resetFields()
             //   history.push("/dashboard");
            }
        }
    }

    const handleSubmit = (values) => {
        let data = state.physioRegisterReducer;
        if (validation.checkNameValidation(data.first_name).error) {
            dispatch({ type: VALIDATION, payload: { error: "First " + validation.checkNameValidation(data.first_name).error } });
        } else if (validation.checkNameValidation(data.last_name).error) {
            dispatch({ type: VALIDATION, payload: { error: "Last " + validation.checkNameValidation(data.last_name).error } });
        } else if (validation.checkMobNoValidation(data.mobile_no).error) {
            dispatch({ type: VALIDATION, payload: { error: "Mobile " + validation.checkMobNoValidation(data.mobile_no).error } });
        } else if (validation.checkMobNoValidation(data.whatsapp_no).error) {
            dispatch({ type: VALIDATION, payload: { error: "Whatsapp " + validation.checkMobNoValidation(data.whatsapp_no).error } });
        } else {
            const checkError = state.Validation.error;
            if (checkError) {
                alert("please check all the fields")
            }
            else {
                props.next();
            }
        }
        setTimeout(() => {
            dispatch({ type: "NOERROR" });
        }, 10000);
    }
    return (
        <>
            <div style={{ minHeight: "20px" }}></div>
            <Row>
                <Col lg={22} md={22} sm={24} xs={24}>
                    <h3 className="page-heading" id="page-heading" ><i class="fas fa-user-plus" ></i> Physiotherapist </h3>
                </Col>
                <Col  lg={2} md={4} sm={24} xs={24}>
                    <Link to="/physio/list" title="Physio List" className="link text-blue navlink" id="navlink">
                        <i className="fas fa-users"></i>  Physios
                    </Link>
                </Col>
            </Row>
            <StepBar src={svg} style={{marginTop:'10px'}} />
            <Title level={4} className="border mb-0 p-2 my-2" style={{marginBottom:'20px'}}>Basic Information</Title>

            <Form  onFinish={handleSubmit} form={form} name="control-hooks" autoComplete="off" layout="vertical" >
                <div className="border p-0 mb-4" style={{position:'relative',top:"0px",minHeight:'260px',paddingTop:'5px'}}>
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'First Name'}</span>}
                                className="input-field"
                                name="first_name"
                                value={state.physioRegisterReducer.first_name}
                                placeholder="Enter Physio First Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.first_name}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Middle Name'}</span>}
                                className="input-field"
                                name="middle_name"
                                value={state.physioRegisterReducer.middle_name}
                                placeholder="Enter Physio Middle Name"
                                required={false}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                defaultValue={state.physioRegisterReducer.middle_name}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Last Name'}</span>}
                                name="last_name"
                                className="input-field" id="input-field"
                                value={state.physioRegisterReducer.last_name}
                                placeholder="Enter Physio Last Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.last_name}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Mobile No'}</span>}
                                
                                name="mobile_no"
                                className="input-field"
                                value={state.physioRegisterReducer.mobile_no}
                                placeholder="Enter Physio Mobile Number"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.mobile_no}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Landline No'}</span>}
                                name="landline"
                                className="input-field"
                                value={state.physioRegisterReducer.landline}
                                placeholder="Enter Physio Landline Number"
                                required={false}
                                onChange={handleChange}
                                defaultValue={state.physioRegisterReducer.landline === "NULL" ? "" : state.physioRegisterReducer.landline}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Whatsapp No'}</span>}
                                name="whatsapp_no"
                                className="input-field"
                                value={state.physioRegisterReducer.whatsapp_no}
                                placeholder="Enter Physio WhatsApp Number"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.whatsapp_no}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={12} sm={24} xs={24}>
                            <Form.Item
                                label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Doctor Type'}</span>}
                                name="Doctor_type"
                                rules={[{ required: true, message: `Please Mention Doctor Type Field` }]}
                            >
                                <Select
                                    placeholder="Doctor Type"
                                    onChange={(value) => { handleChange("Doctor_type", value) }}
                                    value={state.physioRegisterReducer.Doctor_type}
                                    defaultValue={state.physioRegisterReducer.Doctor_type}
                                >
                                    <Select.Option value="1">Treating Doctor</Select.Option>
                                    <Select.Option value="2">Referring Doctor</Select.Option>
                                    <Select.Option value="3">Both</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={12} sm={24} xs={24}>
                            <Form.Item label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Gender'}</span>} name="gender"
                                rules={[{ required: true, message: `Please Select Gender.` }]}>
                                <Select placeholder="Gender"
                                    className="input-field w-100"
                                    onChange={(value) => handleChange("gender", value)}
                                    value={state.physioRegisterReducer.gender}
                                    defaultValue={state.physioRegisterReducer.gender}
                                    initialValue= "lucy"
                                    
                                >
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
               
                <Row className="text-center" justify="center" style={{marginBottom:'15px'}}>
                    <Col >
                   <Link to='/dashboard'><Button className="me-2"  style={{borderRadius:'10px'}} >Cancel</Button></Link>
                    </Col>
                    <Col >
                    <Button className="me-2  " style={{backgroundColor:'#41A0A2',borderRadius:"10px"}}   onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col >
                    <Button className="me-2 btncolor"  htmlType="submit">Next</Button>
                    </Col>
                </Row>
                
                

            </Form>
        </>
    )
}
export default PhysioRegisteration1;