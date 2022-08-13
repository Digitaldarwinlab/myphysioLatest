import React, { useState, useEffect, Profiler } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  BASIC_CLEARSTATE, BASIC_CLEARSTATE2,STATECHANGE, VALIDATION } from "../../contextStore/actions/authAction";
import validation from "./../Validation/authValidation/authValidation";
import StateCity from "./../UtilityComponents/dummyData/state_city.json";
import Error from "./../UtilityComponents/ErrorHandler.js";
import StepBar from './../UtilityComponents/StepBar';
import svg from "././../../assets/step1.webp";
import "../../styles/Layout/Episode.css";
import FormInput from '../UI/antInputs/FormInput';
import FormDate from "../UI/antInputs/FormDate"
import { Typography, Select, Row, Col, Button, Form,Modal,Table } from 'antd';
import FormTextArea from '../UI/antInputs/FormTextArea';
import moment from "moment";
import '../../styles/Layout/Heading.css';
import {Employee_Registration} from "../../API/Enterprise/Enterprise";
import { Employee_Update } from '../../API/Enterprise/Enterprise';
import axios from "axios";
import { PATIENT_REG_FAILURE } from '../../contextStore/actions/authAction';
import { country } from '../Physio/ClinicRegister/Country';

const { Option } = Select;
const { Title } = Typography;

export const calculate = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
}

const MappingKey = {
    FirstName: "First Name",
    MiddleName: "Middle Name",
    LastName: "Last Name",
    MobileNo: "Mobile No",
    WhatsAppNo: "Whatsapp No",
    bloodType: "Blood Type",
    DOB: "DOB",
    Age: "Age",
    Gender: "Gender",
    LandlineNo: "Landline No",
    Address: "Address",
    pincode: "Pin Code",
    City: "City",
    State: "State",
    Country: "Country",
    EmergencyContact: "Emergency No",
    Email: "Email",
    Facebook: "Facebook",
    LinkedIn: "LinkedIn",
    Organization:"OrganizationId",
    Allergies: "Allergies",
    MedicalHistory: "Allergies",
    FamilyHistory: "Family History",
}

const EmployeeRegister = (props) => {

    const [startDateState, setStartDateState] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [NewAge, setNewAge] = useState("");
    const [clearState, setClearState] = useState(false);
    const [organization,setOrganization] = useState([]);
    const [tableData, setTableData] = useState([]);
    const history = useHistory();
    const [form] = Form.useForm();
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const unblock = history.block((location, action) => {
            if(state.BasicDetails.MiddleName!=='' || state.BasicDetails.FirstName!=='' || state.BasicDetails.LastName!=='' || state.BasicDetails.DOB!=='' || state.BasicDetails.Age!=='' || state.BasicDetails.Gender!=='' || state.BasicDetails.bloodType!=='' || state.BasicDetails.MobileNo!=='' || state.BasicDetails.LandlineNo!=='' || state.BasicDetails.WhatsAppNo!=='' )
            {   console.log(state.BasicDetails)
                if (window.confirm("You will lost your Form Data. Do You really want it?")) {
                    dispatch({ type: BASIC_CLEARSTATE });
                    setClearState(true);
                    return true;
                } else {
                    return false;
                }
            }
            else
            {
                console.log('no alert')
            }
            
        });

        return () => {
            unblock();
        };
    }, [history,state])


    useEffect(() => {
        async function getOrganization() {
           
           axios.get(process.env.REACT_APP_API+"/org_list/").then(res => { 
            setOrganization(res.data);
           }).catch(err => console.log(err));

          
        }
        getOrganization();
    },[])

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
        form.setFieldsValue({ Address: data.Address });
        form.setFieldsValue({ pincode: data.pincode });
        form.setFieldsValue({ City: data.City });
        form.setFieldsValue({ State: data.State });
        form.setFieldsValue({ Country: data.Country });
        form.setFieldsValue({ EmergencyContact: data.EmergencyContact });
        form.setFieldsValue({ State: data.State });
        form.setFieldsValue({ Email: data.Email });
        form.setFieldsValue({ Facebook: data.Facebook });
        form.setFieldsValue({ LinkedIn: data.LinkedIn });
        form.setFieldsValue({ Organization: data.Organization });
        const dataState = Object.keys(StateCity);
        setStateList(dataState);
        if (data.State) {
            if (StateCity[data.State]) {
                setCityList(StateCity[data.State]);
            } else {
                setCityList([]);
            }
        }
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
    }, [clearState]);


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
        } else if (key === "FirstName" || key === "LastName") {
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value: value.length > 1 ? value[0].toUpperCase() + value.slice(1, value.length) : value.length === 1 ? value.toUpperCase() : ''
                }
            });
        }


        else {
            console.log(key, value)

            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value
                }
            });

        }

        dispatch({
            type: STATECHANGE,
            payload: {
                key,
                value
            }
        });
        if (key === "State") {
            if (!value)
                setCityList([]);
            else
                setCityList(StateCity[value]);
        }

        dispatch({ type: "NOERROR" });
    }

    const showModal = () => {
        const checkError = state.Validation.error;
        if (checkError) {
            alert("please check all the fields")
        }
        else {
            let tempData = [];
            let keys = Object.keys(state.BasicDetails);
            let index = 0;
            keys.forEach(key => {
                if (!(["isLoading", "success", "pp_em_id"].includes(key))) {
                    if (state.BasicDetails[key] !== null && state.BasicDetails[key] !== "NULL" && state.BasicDetails[key] !== "null" && (state.BasicDetails[key] !== "")) {
                        tempData.push({
                            key: index,
                            Field: MappingKey[key],
                            Value: state.BasicDetails[key]
                        });
                        index += 1;
                    }
                }
            });
            setTableData(tempData);
            setIsModalVisible(true);
        }
   
    };

    const handleBlur = (e) => {
        const key = e.target.name;
        let error = {};
        console.log('printing keyy')
        console.log(key)
        if (key === "FirstName" || key === 'MiddleName' || key === "LastName") {
            error = validation.checkNameValidation(e.target.value);
            if (error.error) {
                if (key === "FirstName")
                    error.error = "First " + error.error;
                else if (key == "MiddleName" && e.target.value.length > 0) {
                    error.error = "Middle " + error.error;

                }
                else

                    error.error = "Last " + error.error;
            }
        } else if (key === "MobileNo" || key === "WhatsAppNo") {
            error = validation.checkMobNoValidation(e.target.value, key);
            if (error.error) {
                if (key === "MobileNo")
                    error.error = "Mobile " + error.error;
                else
                    error.error = "Whatsapp " + error.error;
            }
        } else if (key === "LandlineNo") {
            error = validation.checkLandNoValidation(e.target.value)
            if (error.error) {
                error.error = "Landline " + error.error;
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
                if (JSON.parse(localStorage.getItem("user")).role == 'patient') {
                    history.push("/pateint/profile");
                }
                else {
                    
                    history.push("/enterprise/employee-list");
                }


            }
        } else {
            if (window.confirm("Confirm, Do You want to Reset all fieldsss?")) {
                dispatch({ type: BASIC_CLEARSTATE });
                dispatch({ type: BASIC_CLEARSTATE2 });
                form.resetFields();
                form.resetFields()
                history.push("/enterprise/employee-register");

            }
        }
    }


    const onFinish = () => {
        let data = state.BasicDetails;
        
        // console.log(data)
        //  console.log(validation.checkNameValidation(data.FirstName).error+': error is')
        
        if (validation.checkNameValidation(data.FirstName).error) {
            dispatch({ type: VALIDATION, payload: { error: "First" + validation.checkNameValidation(data.FirstName).error } });
        } else if (validation.checkNameValidation(data.LastName).error) {
            dispatch({ type: VALIDATION, payload: { error: "Last" + validation.checkNameValidation(data.LastName).error } });
        } else if (validation.checkNameValidation(data.MiddleName).error) {
            dispatch({ type: VALIDATION, payload: { error: "Middle" + validation.checkNameValidation(data.MiddleName).error } });
        } else if (validation.checkMobNoValidation(data.MobileNo).error) {
            dispatch({ type: VALIDATION, payload: { error: "Mobile " + validation.checkMobNoValidation(data.MobileNo).error } });
        } else if (data.WhatsAppNo && validation.checkMobNoValidation(data.WhatsAppNo).error) {
            dispatch({ type: VALIDATION, payload: { error: "Whatsapp  " + validation.checkMobNoValidation(data.WhatsAppNo).error } });
        } else if (validation.checkLandNoValidation(data.LandlineNo).error) {
            dispatch({ type: VALIDATION, payload: { error: "LandlineNo " + validation.checkLandNoValidation(data.LandlineNo).error } });
        }else {
            const checkError = state.Validation.error;
            if (checkError) {
                let userData = localStorage.setItem('UserData', state.BasicDetails);

                alert("please check all the fields")
            }
           
        }
        showModal();

    };

    const handleOk = async () => {
        setIsModalVisible(false);
        let result;
        if (state.BasicDetails.pp_em_id) {
            result = await Employee_Update(state.BasicDetails, dispatch);
        } else {
           
            result = await Employee_Registration(state.BasicDetails, dispatch);
        }
        if (result && result[0]) {
            if(JSON.parse(localStorage.getItem("user")).role=='patient')
                {
                    window.location.href = "/patient/profile";
                }
                else
                {
                    window.location.href = "/enterpise/employee-list";
                }
            window.location.href = "/enterprise/employee-list";
            console.log("Success!!!");
        } else {
            dispatch({ type: PATIENT_REG_FAILURE });
            dispatch({ type: VALIDATION, payload: { error: result[1] } });
            
        }
    };
   
    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <>
            <div style={{ minHeight: "20px" }}></div>
            <Row>

                <Col lg={20} md={20} sm={24} xs={24}>
                    <h3 className="page-heading" id="page-heading" > <i className="fas fa-arrow-left"
                    style={{ cursor: "pointer",marginRight:"10px" }}
                    title="Go Back"
                    onClick={() => {
                      
                            history.goBack()     
                    }}
                    role="button"></i><i className="fas fa-user-plus" /><b>{JSON.parse(localStorage.getItem("user")).role == 'patient' ? 'Update Profile' : 'Employeee'}</b></h3>
                </Col>
                <Col lg={4} md={4} sm={24} xs={24} className="text-right" justify="right">
                    {
                        JSON.parse(localStorage.getItem("user")).role == 'patient' ?
                            null
                            :
                            <Link to="/employee-list" className="text-blue navlink " id="navlink">
                                <i className="fa fa-users"></i> Employees
                            </Link>


                    }

                </Col>
            </Row>
            {/* <StepBar src={svg} /> */}
            <Title level={4} className="border mb-0 p-2">Basic Information</Title>

            <Form className="BasicInformation" onFinish={onFinish} style={{ marginTop: '2%' }} layout="vertical" onFinishFailed={onFinishFailed} form={form} name="control-hooks">
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'First Name'}</span>}
                                name="FirstName"
                                className="input-field w-100 text-capitalize"
                                //  value={state.BasicDetails.FirstName}
                                placeholder="Enter Patient First Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.FirstName}
                                disabled={state.BasicDetails.pp_em_id ? true :false}
                            />
                            
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Middle Name'}</span>}
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Last Name'}</span>}
                                name="LastName"
                                className="input-field w-100 text-capitalize"
                                //  value={state.BasicDetails.LastName}
                                placeholder="Enter Patient Last Name"
                                required={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.LastName}
                                disabled={state.BasicDetails.pp_em_id ? true :false}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]} className="pt-4">
                        <Col md={12} lg={8} sm={24} xs={24}>

                            <FormDate label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'DOB'}</span>}
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Age'}</span>}
                                name="Age"
                                className="input-field w-100"
                                value={state.BasicDetails.Age}
                                onChange={handleChange}
                                placeholder={state.BasicDetails.Age}
                                disabled="true"
                            />
                        </Col>
                        <Col md={12} lg={5} sm={24} xs={24}>
                            <Form.Item label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Gender'}</span>} name="Gender"
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
                            <Form.Item label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Blood Type'}</span>} name="bloodType"
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Mobile No'}</span>}
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Landline No'}</span>}
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
                            <FormInput label={<span style={{ fontSize: '15px', fontWeight: '600' }}>{'Whatsapp No'}</span>}
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

                {/* <Row className="text-center" justify="center">
                    <Col >
                        <Link to='/dashboard'>  <Button className="me-2 " style={{ borderRadius: '10px' }} >Cancel</Button></Link>
                    </Col>
                    <Col>
                        <Button className="me-2" style={{ backgroundColor: '#41A0A2', borderRadius: "10px" }} onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col >
                        <Button className="button1" id="bnid" style={{ color: "white" }} htmlType="submit">Next</Button>
                    </Col>
                </Row> */}
                   {/* <Row justify="center">
                     <Col span={2}> <Link to='/dashboard'>  <Button 
                    //  className="me-2 " 
                    //  style={{ borderRadius: '10px' }} 
                     >Cancel</Button></Link></Col>
                     <Col span={2}>  <Button 
                     //className="me-2" style={{ backgroundColor: '#41A0A2', borderRadius: "10px" }} 
                     onClick={handleReset}>Reset</Button></Col>
                     <Col span={2}> <Button 
                     //className="button1" id="bnid" style={{ color: "white" }} 
                     htmlType="submit">Next</Button></Col>
                </Row> */}
                <Title level={3} className="border mb-0 p-2">Contact Information</Title>
                 <div className="border p-3">
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={24} sm={24} xs={24}>
                            <FormTextArea label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Address'}</span>}
                                required={true}
                                name="Address"
                                className="input-field w-100"
                                value={state.BasicDetails.Address}
                                onChange={handleChange}
                             //   onBlur={handleBlur}
                                defaultValue={state.BasicDetails.Address}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            {/* aswin start 10/30/2021 start */}
                            <Form.Item
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Country'}</span>}
                                name="Country"
                              //  rules={[{ required: true, message: `Please Select Country.` }]}
                             //   className="input-field w-100"
                            >
                                {/* aswin start 10/30/2021 stop */}
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select country"
                                    value={state.BasicDetails.Country}
                                    onChange={(value) => { handleChange("Country", value) }}
                                    allowClear
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                   {country.map(item=><Select.Option value={item}>{item}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <Form.Item
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'State'}</span>}
                                name="State"
                               // rules={[{ required: true, message: `Please Select State.` }]}
                               // className="input-field w-100"
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="please select state."
                                    value={state.BasicDetails.State}
                                    onChange={(value) => { handleChange("State", value) }}
                                    allowClear
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        stateList.map((value, index) => {
                                            return (
                                                <Select.Option key={index} value={value}>{value}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <Form.Item
                            //  className="input-field w-100"
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'City'}</span>}
                                name="City"
                              //  rules={[{ required: true, message: `Please Select City.` }]}
                            >
                                <Select
                                // style={{width:'200px'}}
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select City."
                                    value={state.BasicDetails.City}
                                    onChange={(value) => { handleChange("City", value) }}
                                    allowClear
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {cityList.length !== 0 && (
                                        cityList.map((value, index) => {
                                            return (
                                                <Select.Option key={index} value={value}>{value}</Select.Option>
                                            )
                                        })
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Pincode'}</span>}
                                required={false}
                                name="pincode"
                                className="input-field w-100"
                                value={state.BasicDetails.pincode}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.pincode}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'E-mail'}</span>}
                                required={true}
                                name="Email"
                                className="input-field w-100"
                                value={state.BasicDetails.Email}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.Email}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Facebook'}</span>}
                                name="Facebook"
                                className="input-field w-100"
                                value={state.BasicDetails.Facebook}
                                onChange={handleChange}
                                defaultValue={state.BasicDetails.Facebook}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Linkedin'}</span>}
                                name="LinkedIn"
                                className="input-field w-100"
                                value={state.BasicDetails.LinkedIn}
                                onChange={handleChange}
                                defaultValue={state.BasicDetails.LinkedIn}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Emergency Contact'}</span>}
                                 required={false}
                                name="EmergencyContact"
                                className="input-field w-100"
                                value={state.BasicDetails.EmergencyContact}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.BasicDetails.EmergencyContact}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            {/* aswin start 10/30/2021 start */}
                            <Form.Item
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Organization'}</span>}
                                name="Orgnization"
                               rules={[{ required: true, message: `Please Select Organization.` }]}
                             //   className="input-field w-100"
                            >
                                {/* aswin start 10/30/2021 stop */}
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="please select Organization"
                                    value={state.BasicDetails.Organization}
                                    defaultValue={state.BasicDetails.Organization}
                                    onChange={(value) => { handleChange("Organization", value) }}
                                    allowClear
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                  {organization.map(org =>  <Select.Option key={org.pp_org_id} value={org.pp_org_id}>{ org.org_name}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                </div>
                {/* <Row justify="end" className="text-end">
                    <Col >    <Button size="large" className="my-3 me-2 " onClick={handleReset} style={{borderRadius:'10px'}} >Reset</Button></Col>
                    
                    <Col>
                      <Button size="large" className="my-3  me-2" style={{backgroundColor:'#41A0A2',borderRadius:'10px'}} onClick={Back}>Back</Button>
                      </Col>
                    <Col>
                        <Button type="primary" size="large" className="my-3  me-2 btncolor"  htmlType="submit">Next</Button>
                    </Col>
                </Row> */}
                      <Row justify="center">
                     <Col span={2}>  <Button  
                    className="me-3 my-2 " 
                     onClick={handleReset} style={{borderRadius:'10px'}} >Reset</Button></Col>
                     {/* <Col span={2}>  <Button  
                   //  className="my-3  me-2" 
                     style={{backgroundColor:'#41A0A2',borderRadius:'10px'}} onClick={Back}>Back</Button></Col>
            <Col span={2}> <Button type="primary"  
                    // className="my-3  me-2 btncolor"  
                     htmlType="submit">Next</Button></Col> */}
                       <Col span={2}><Button htmlType="submit" className="me-3 my-2 btncolor" >
                        {state.BasicDetails.pp_em_id ? "Update" : "Submit"}
                    </Button></Col>
                </Row>
                <Modal title="Confirm Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Table
                            pagination={false}
                            scroll={{ y: 400 }}
                            showHeader={false}
                            columns={[{ title: "Field", dataIndex: "Field", render: (text) => <p className="fw-bold">{text}</p> },
                            { title: "Value", dataIndex: "Value" }]} dataSource={tableData}
                        />
                    </Modal>
            </Form>
            <>        
        <div style={{ minHeight: "20px" }}></div>    
           {/* <h1 className="page-heading" id="page-heading" ><i className="fas fa-user-plus" /><b> {JSON.parse(localStorage.getItem("user")).role=='patient' ? 'Update Profile' : 'Patient' }</b></h1> */}
            {/* <StepBar src={svg} /> */}
            
{/* 
            <Form autoComplete="off" style={{marginTop:'2%'}}
                onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" form={form} name="control-hooks">

               

            </Form> */}
        </>


        </>

    )
}

export default EmployeeRegister;
