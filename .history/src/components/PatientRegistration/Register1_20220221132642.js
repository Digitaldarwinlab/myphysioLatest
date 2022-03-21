import React, { useState, useEffect, } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATECHANGE, VALIDATION } from "../../contextStore/actions/authAction";
import validation from "./../Validation/authValidation/authValidation";
import Error from "./../UtilityComponents/ErrorHandler.js";
import StepBar from './../UtilityComponents/StepBar';
import svg from "././../../assets/step1.png";
import "../../styles/Layout/Episode.css";
import FormInput from '../UI/antInputs/FormInput';
import FormDate from "../UI/antInputs/FormDate"
import { Typography, Select, Row, Col, Button, Form } from 'antd';
import moment from "moment";
import '../../styles/Layout/Heading.css'

const { Option } = Select;
const { Title } = Typography;

export const calculate = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
}

const Register1 = (props) => {

    const [startDateState, setStartDateState] = useState("");

    const [NewAge, setNewAge] = useState("");

    const history = useHistory();
    const [form] = Form.useForm();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = state.BasicDetails;

        form.setFieldsValue({ FirstName: data.FirstName });
        form.setFieldsValue({ MiddleName: data.MiddleName });
        form.setFieldsValue({ LastName: data.LastName });
        form.setFieldsValue({ Gender: data.Gender });
        form.setFieldsValue({ bloodType: data.bloodType });
        form.setFieldsValue({ MobileNo: data.MobileNo });
        form.setFieldsValue({ LandlineNo: data.LandlineNo });
        form.setFieldsValue({ WhatsAppNo: data.WhatsAppNo });
        if (data.DOB) {
            form.setFieldsValue({ DOB: moment(data.DOB, "YYYY-MM-DD") })
            form.setFieldsValue({ Age: calculate(new Date(), new Date(moment(data.DOB, "YYYY-MM-DD"))) });
            dispatch({
                type: STATECHANGE,
                payload: {
                    key: "Age",
                    value: calculate(new Date(), new Date(moment(data.DOB, "YYYY-MM-DD")))
                }
            })
        }
    }, [props.clearState]);


    const handleChange = (key, value, id = 0) => {
       
        if (key === "DOB") {
            setStartDateState(value.date);
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value: value.dateString
                }
            });
            const Age = calculate(new Date(), new Date(value.date));
            dispatch({
                type: STATECHANGE,
                payload: {
                    key: "Age",
                    value: Age
                }
            });
            setNewAge(Age);
        }else if(key === "FirstName" || key==="LastName"){
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value:value.length>1?value[0].toUpperCase()+value.slice(1, value.length):value.length===1?value.toUpperCase():''
                }
            });
        }

       
        else{
            console.log(key,value)
            
                dispatch({
                    type: STATECHANGE,
                    payload: {
                        key,
                        value
                    }
                });
        
        }

        dispatch({ type: "NOERROR" });
    }

    const handleBlur = (e) => {
        const key = e.target.name;
        let error = {};
        console.log('printing keyy')
        console.log(key)
        if (key === "FirstName" ||key==='MiddleName' ||  key === "LastName") {
            error = validation.checkNameValidation(e.target.value);
            if (error.error) {
                if (key === "FirstName")
                    error.error = "First " + error.error;
                else if( key=="MiddleName" && e.target.value.length>0)
                {               
                        error.error = "Middle " + error.error;   
                   
                }
                else
                
                    error.error = "Last " + error.error;
            }
        } else if (key === "MobileNo" || key === "WhatsAppNo") {
            error = validation.checkMobNoValidation(e.target.value,key);
            if (error.error) {
                if (key === "MobileNo")
                    error.error = "Mobile " + error.error;
                else
                    error.error = "Whatsapp " + error.error;
            }
        }  else if (key === "LandlineNo") {
             error = validation.checkLandNoValidation(e.target.value)
             if(error.error){
                 error.error = "Landline " + error.error ;
             }
        }
        if (key === "DOB") {
            error = validation.checkNullValidation(e.target.value);
        }
        if (error.error) {
            dispatch({ type: VALIDATION, payload: { error: error.error } });
            setTimeout(() => {
                dispatch({ type: VALIDATION, payload: { error: "" } });
            }, 10000);
        }
    }

    const handleReset = () => {
        if (state.physioRegisterReducer.id) {
            if (window.confirm("Confirm, Do You want to Cancel Update?")) {
               // dispatch({ type: CLEAR_STATE });
               if( JSON.parse(localStorage.getItem("user")).role=='patient')
               {
                history.push("/pateint/profile");
               }    
               else
               {
                history.push("/pateints");
               }
               
                
            }
        } else {
            if (window.confirm("Confirm, Do You want to Reset all fieldsss?")) {
               // dispatch({ type: CLEAR_STATE });
                form.resetFields()
                history.push("/pateints/new");

            }
        }
    }
    

    const onFinish = () => {
        let data = state.BasicDetails;
       // console.log(data)
      //  console.log(validation.checkNameValidation(data.FirstName).error+': error is')
        if (validation.checkNameValidation(data.FirstName).error) {
            dispatch({ type: VALIDATION, payload: { error: "First" + validation.checkNameValidation(data.FirstName).error } });
        }else if(validation.checkNameValidation(data.LastName).error){
            dispatch({ type: VALIDATION, payload: { error: "Last" + validation.checkNameValidation(data.LastName).error } });
        }else if (validation.checkNameValidation(data.MiddleName).error){
            dispatch({ type: VALIDATION, payload: { error: "Middle" + validation.checkNameValidation(data.MiddleName).error } });
        }else{
            props.next()
        }
        // else if (validation.checkNameValidation(data.MiddleName).error) {
        //     dispatch({ type: VALIDATION, payload: { error: "middle " + validation.checkNameValidation(data.MiddleName).error } });
        // }
        // else if (validation.checkNameValidation(data.LastName).error) {
        //     dispatch({ type: VALIDATION, payload: { error: "Last " + validation.checkNameValidation(data.LastName).error } });
        // } else if (validation.checkMobNoValidation(data.MobileNo).error) {
        //     dispatch({ type: VALIDATION, payload: { error: "Mobile " + validation.checkMobNoValidation(data.MobileNo).error } });
        // } else if (validation.checkMobNoValidation(data.WhatsAppNo).error) {
        //     dispatch({ type: VALIDATION, payload: { error: "Whatsapp  " + validation.checkMobNoValidation(data.WhatsAppNo).error } });
        // } else if (validation.checkLandNoValidation(data.LandlineNo).error) {
        //     dispatch({ type: VALIDATION, payload: { error: "LandlineNo " + validation.checkLandNoValidation(data.LandlineNo).error } });
        // }else {
        //     const checkError = state.Validation.error;
        //     if (checkError) {
        //         let userData = localStorage.setItem('UserData', state.BasicDetails);

        //         alert("please check all the fields")
        //     }
        //     else {
        //         props.next();
        //     }
        // }
        
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Profiler
              id="AuthForm"
              onRender={(
                id,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions
              ) => {
                console.log(id);
                console.log(actualDuration);
                console.log(baseDuration);
                console.log(startTime);
                console.log(commitTime);
                console.log(interactions);
              }}
            >
        <>
            <div style={{ minHeight: "20px" }}></div>
            <Row>

                <Col lg={20} md={20} sm={24} xs={24}>
                <h3 className="page-heading" id="page-heading" ><i className="fas fa-user-plus" /><b>{JSON.parse(localStorage.getItem("user")).role=='patient' ? 'Update Profile' : 'Patient' }</b></h3>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="text-right" justify="right">
                    {
                        JSON.parse(localStorage.getItem("user")).role=='patient' ?
                        null
                    :
                    <Link to="/pateints" className="text-blue navlink " id="navlink">
                    <i className="fa fa-users"></i> Patients
                </Link>


                    }
                   
                </Col>
            </Row>
            <StepBar src={svg} />
            <Title level={4} className="border mb-0 p-2">Basic Information</Title>
            
            <Form className="BasicInformation" onFinish={onFinish} style={{marginTop:'2%'}} layout="vertical" onFinishFailed={onFinishFailed} form={form} name="control-hooks">
                <div className="border p-4 mb-4">
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    <Row gutter={[20, 20]}>
                    {/* <Col md={24} lg={8} sm={24} xs={24}><Form.Item label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Patient Role'}</span>} name="Patient Role"
                                rules={[{ required: true, message: `Please Select Patient Role.` }]} >
                                <Select
                                    className="input-field w-100"
                                    placeholder="Select Patient Role"
                                    onChange={(value) => handleChange("is_enterprise", !state.BasicDetails.is_enterprise)}
                                    value={state.BasicDetails.is_enterprise}
                                    defaultValue="simple patient"
                                >
                                    <Option value="simple patient">simple patient</Option>
                                    <Option value="enterprise patient">enterprise patient</Option>
                                   
                                </Select>
                            </Form.Item></Col> */}
                    <Col md={24} lg={8} sm={24} xs={24}></Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                        
                        </Col>
                        </Row>
                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'First Name'}</span>}
                                name="FirstName"
                                className="input-field w-100 text-capitalize"
                              //  value={state.BasicDetails.FirstName}
                                placeholder="Enter Patient First Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.FirstName}
                            />

                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Middle Name'}</span>}
                                name="MiddleName"
                                className="input-field w-100"
                                value={state.BasicDetails.MiddleName}
                                placeholder="Enter Patient Middle Name"
                                required={false}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                defaultValue={state.BasicDetails.MiddleName}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Last Name'}</span>}
                                name="LastName"
                                className="input-field w-100 text-capitalize"
                              //  value={state.BasicDetails.LastName}
                                placeholder="Enter Patient Last Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.LastName}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="pt-4">
                        <Col md={12} lg={8} sm={24} xs={24}>

                            <FormDate label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'DOB'}</span>}
                                name="DOB"
                                reverse="true"
                                className="input-field w-100"
                                value={startDateState}
                                required={true}
                              
                                onChange={handleChange}
                               // onBlur={handleBlur}
                            />
                        </Col>
                        <Col md={12} lg={3} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Age'}</span>}
                                name="Age"
                                className="input-field w-100"
                                value={state.BasicDetails.Age}
                                onChange={handleChange}
                                placeholder={state.BasicDetails.Age}
                                disabled="true"
                            />
                        </Col>
                        <Col md={12} lg={5} sm={24} xs={24}>
                            <Form.Item label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Gender'}</span>} name="Gender"
                                //rules={[{ required: true, message: `Please Select Gender.` }]}
                                >
                                <Select placeholder="Gender"
                                    className="input-field w-100"
                                    onChange={(value) => handleChange("Gender", value)}
                                    value={state.BasicDetails.Gender}
                                    defaultValue={state.BasicDetails.Gender}
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12} lg={8} sm={24} xs={24}>
                            <Form.Item label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Blood Type'}</span>} name="bloodType"
                                //rules={[{ required: true, message: `Please Select Blood Type.` }]} 
                                >
                                <Select
                                    className="input-field w-100"
                                    placeholder="Select Blood Type"
                                    onChange={(value) => handleChange("bloodType", value)}
                                    value={state.BasicDetails.bloodType}
                                    defaultValue={state.BasicDetails.bloodType}
                                >
                                    <Option value="A+">A+</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="B-">B-</Option>
                                    <Option value="AB+">AB+</Option>
                                    <Option value="AB">AB-</Option>
                                    <Option value="O+">O+</Option>
                                    <Option value="O-">O-</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="pt-4">
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Mobile No'}</span>}
                                name="MobileNo"
                                className="input-field w-100"
                                value={state.BasicDetails.MobileNo}
                                placeholder="Enter Patient Mobile Number"
                                required={true}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.MobileNo}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Landline No'}</span>}
                                name="LandlineNo"
                                className="input-field w-100"
                                value={state.BasicDetails.LandlineNo}
                                placeholder="Enter Patient Landline Number"
                                required={false}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.LandlineNo}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'15px',fontWeight:'600'}}>{'Whatsapp No'}</span>}
                                name="WhatsAppNo"
                                className="input-field w-100"
                                value={state.BasicDetails.WhatsAppNo}
                                placeholder="Enter Patient WhatsApp Number"
                                required={false}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.WhatsAppNo}
                            />
                        </Col>
                    </Row>
                </div>

                <Row className="text-center" justify="center">
                    <Col >
                  <Link to='/dashboard'>  <Button className="me-2 " style={{borderRadius:'10px'}} >Cancel</Button></Link>
                    </Col>
                    <Col>
                    <Button className="me-2" style={{backgroundColor:'#41A0A2',borderRadius:"10px"}}  onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col >
                    {/* Dipsikha start 23/10 */}
                    <Button className="button1" id="bnid" style={{color: "white"}}  htmlType="submit">Next</Button>
                    </Col>
                </Row>

            </Form>


        </>
        </Profiler>
    )
}

export default Register1;
