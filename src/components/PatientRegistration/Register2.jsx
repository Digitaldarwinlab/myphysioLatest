import React, { useEffect, useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { STATECHANGE, VALIDATION } from "../../contextStore/actions/authAction";
import validation from "./../Validation/authValidation/authValidation";
import Error from "./../UtilityComponents/ErrorHandler.js";
import StepBar from './../UtilityComponents/StepBar';
import svg from "././../../assets/step2.png";
import { Typography, Select, Row, Col, Button, Form } from 'antd';
import FormTextArea from '../UI/antInputs/FormTextArea';
import FormInput from '../UI/antInputs/FormInput';
import StateCity from "./../UtilityComponents/dummyData/state_city.json";
import '../../styles/Layout/Heading.css'

const { Title } = Typography;

const Register2 = (props) => {
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const history = useHistory();

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    useEffect(() => {
        const data = state.BasicDetails;
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
        const dataState = Object.keys(StateCity);
        setStateList(dataState);
        if (data.State) {
            if (StateCity[data.State]) {
                setCityList(StateCity[data.State]);
            } else {
                setCityList([]);
            }
        }
    }, [props.clearState])
    const handleChange = (key, value, id = 0) => {
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

    const handleBlur = e => {
        const key = e.target.name;
        let error = {};
        if (key === "Email") {
            error = validation.checkEmailValidation(e.target.value);
        }
        else if (key === "pincode") {
            error = validation.checkPincodeValidation(e.target.value);
            // aswin 10/30/2021 email validation removed
        } else if (key === "EmergencyContact") {
            error = validation.checkMobNoValidation(e.target.value);
            if (error.error)
                error.error = "Emergency " + error.error;
        }
        if (error.error) {
            dispatch({ type: VALIDATION, payload: { error: error.error } });
            dispatch({ type: VALIDATION, payload: { error: error.error } });
            setTimeout(() => {
                dispatch({ type: VALIDATION, payload: { error: "" } });
            }, 10000);
        }
    }
    const handleReset = () => {
        if (state.physioRegisterReducer.id) {
            if (window.confirm("Confirm, Do You want to Cancel Update?")) {
                dispatch({ type: CLEAR_STATE });
                if(JSON.parse(localStorage.getItem("user")).role=='patient')
                {
                    history.push('patient/profile')
                }
                else
                {
                    history.push("/dashboard");
                }
              
            }
        } else {
            if (window.confirm("Confirm, Do You want to Reset all fields?")) {
                dispatch({ type: CLEAR_STATE });
                form.resetFields()
                if(JSON.parse(localStorage.getItem("user")).role=='patient')
                {
                    history.push('patient/profile')
                }
                else
                {
                    history.push("/dashboard");
                }
               
            }
        }
    }
    const Back = () => {
        props.back();
    }

    const onFinish = (e) => {
        
        let data = state.BasicDetails;
        console.log('errror in addrssess')
        console.log(validation.checkAddrValidation(data.Address))
        if (validation.checkEmailValidation(data.Email).error) {
            dispatch({ type: VALIDATION, payload: { error: validation.checkEmailValidation(data.Email).error } });
        } else if (validation.checkPincodeValidation(data.pincode).error) {
            dispatch({ type: VALIDATION, payload: { error: validation.checkPincodeValidation(data.pincode).error } });
        } else if (validation.checkMobNoValidation(data.EmergencyContact).error) {
            dispatch({ type: VALIDATION, payload: { error: "Emergency " + validation.checkMobNoValidation(data.EmergencyContact).error } });
        }
        else if (validation.checkAddrValidation(data.Address).error) {
               
            dispatch({ type: VALIDATION, payload: { error: "" +validation.checkAddrValidation(data.Address).error } });
        }
        
        else {
            const checkError = state.Validation.error;
            if (checkError) {
                alert("please check all the fields")
            }
            else {
                props.next();
            }
        }
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>        
        <div style={{ minHeight: "20px" }}></div>    
           <h1 className="page-heading" id="page-heading" ><i className="fas fa-user-plus" /><b> {JSON.parse(localStorage.getItem("user")).role=='patient' ? 'Update Profile' : 'Patient' }</b></h1>
            <StepBar src={svg} />
            <Title level={3} className="border mb-0 p-2">Contact Information</Title>

            <Form autoComplete="off" style={{marginTop:'2%'}}
                onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" form={form} name="control-hooks">

                <div className="border p-3">
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={24} sm={24} xs={24}>
                            <FormTextArea label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Address'}</span>}
                                required="true"
                                name="Address"
                                className="input-field w-100"
                                value={state.BasicDetails.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.address}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            {/* aswin start 10/30/2021 start */}
                            <Form.Item
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Country'}</span>}
                                name="Country"
                                rules={[{ required: true, message: `Please Select Country.` }]}
                                className="input-field w-100"
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
                                    <Select.Option value="India">India</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <Form.Item
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'State'}</span>}
                                name="State"
                                rules={[{ required: true, message: `Please Select State.` }]}
                                className="input-field w-100"
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select state."
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
                              className="input-field w-100"
                                label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'City'}</span>}
                                name="City"
                                rules={[{ required: true, message: `Please Select City.` }]}
                            >
                                <Select
                                 style={{width:'200px'}}
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
                                required="true"
                                name="pincode"
                                className="input-field w-100"
                                value={state.BasicDetails.pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.pincode}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'E-mail'}</span>}
                                required="true"
                                name="Email"
                                className="input-field w-100"
                                value={state.BasicDetails.Email}
                                onChange={handleChange}
                                onBlur={handleBlur}
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
                                required="true"
                                name="EmergencyContact"
                                className="input-field w-100"
                                value={state.BasicDetails.EmergencyContact}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.EmergencyContact}
                            />
                        </Col>
                    </Row>

                </div>
                <Row justify="end" className="text-end">
                    <Col >    <Button size="large" className="my-3 me-2 " onClick={handleReset} style={{borderRadius:'10px'}} >Cancel</Button></Col>
                    
                    <Col>
                      <Button size="large" className="my-3  me-2" style={{backgroundColor:'#41A0A2',borderRadius:'10px'}} onClick={Back}>Back</Button>
                      </Col>
                    <Col>
                        <Button type="primary" size="large" className="my-3  me-2 btncolor"  htmlType="submit">Next</Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}

export default Register2
