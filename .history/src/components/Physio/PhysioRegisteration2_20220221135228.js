import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PHYSIO_STATE_CHANGE } from "./../../contextStore/actions/physioRegAction";
import { VALIDATION } from "../../contextStore/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import Error from "./../UtilityComponents/ErrorHandler.js";
import svg from "./../../assets/step2.png";
import StepBar from './../UtilityComponents/StepBar';
import validation from "./../Validation/authValidation/authValidation";
import { Typography, Row, Button, Col, Form, Select } from 'antd';
import FormInput from './../UI/antInputs/FormInput';
import FormTextArea from './../UI/antInputs/FormTextArea';
import StateCity from "./../UtilityComponents/dummyData/state_city.json";
import { getPhysioList } from '../../API/Physio/PhysioRegister';
import { CLEAR_STATE, PHYSIO_REGISTER_FAILURE } from '../../contextStore/actions/physioRegAction';
import '../../styles/Layout/Heading.css'
const { Title } = Typography;
const PhysioRegisteration2 = (props) => {
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const history=useHistory()
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    

    useEffect(() => {
        const data = state.physioRegisterReducer;
        form.setFieldsValue({ Address_1: data.Address_1 })
        form.setFieldsValue({ Address_2: data.Address_2 })
        form.setFieldsValue({ Address_3: data.Address_3 })
        form.setFieldsValue({ city: data.city })
        form.setFieldsValue({ state: data.state })
        form.setFieldsValue({ country: data.country })
        form.setFieldsValue({ email: data.email })
        form.setFieldsValue({ facebook: data.facebook })
        form.setFieldsValue({ linkedin: data.linkedin })
        form.setFieldsValue({ regd_no_1: data.regd_no_1 })
        form.setFieldsValue({ regd_no_2: data.regd_no_2 })
        form.setFieldsValue({ degree: data.degree });
        form.setFieldsValue({ expertise_1: data.expertise_1 });
        form.setFieldsValue({ expertise_2: data.expertise_2 });
        form.setFieldsValue({ expertise_3: data.expertise_3 });
        const keys = Object.keys(StateCity);
        setStateList(keys);
        if (data.state) {
            if (StateCity[data.state]) {
                setCityList(StateCity[data.state])
            } else {
                setCityList([])
            }
        }

        

    }, [props.clearState]);
    const handleChange = (key, value, id = 0) => {
        dispatch({
            type: PHYSIO_STATE_CHANGE,
            payload: {
                key,
                value
            }
        })
        if (key === "state") {
            if (!value)
                setCityList([]);
            else {
                let data = StateCity[value];
                setCityList(data);
            }
        }
        dispatch({ type: "NOERROR" });
    }

    const handleBlur = (e) => {
        const key = e.target.name;
        let error = {};
        console.log(key)
        if (key === "email") {
            error = validation.checkEmailValidation(e.target.value);
            if (error.error) {
                dispatch({ type: VALIDATION, payload: { error: error.error } });
               
            }
        }
        else if(key=='Address_1' || key=='Address_2' || key=='Address_3')
        {
            error=validation.checkAddrValidation(e.target.value)
            if (error.error) {
                dispatch({ type: VALIDATION, payload: { error: error.error } });
                
            }
        }
        else if(key=='regd_no_1' || key=='regd_no_2' || key=='regd_no_3'){
            error = validation.checkLandNoValidation(e.target.value)
            if (error.error) {
                dispatch({ type: VALIDATION, payload: { error: " Regd_no " + error.error } });  
            }
        } 
        else if(key=='expertise_1' || key=='expertise_2' || key=='expertise_3'){
            error = validation.checkNameValidation(e.target.value);
            if (error.error) {
                let newErr = error.error.slice(5)
                dispatch({ type: VALIDATION, payload: { error:  'Expertise '+newErr } });  
            }
        } 

        
    }

    const handleSubmit = (value) => {
        // let data = state.physioRegisterReducer;

        // if (validation.checkEmailValidation(data.email).error) {
        //     dispatch({ type: VALIDATION, payload: { error: validation.checkEmailValidation(data.email).error } });
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     });
        //         setTimeout(() => {
        //         dispatch({ type: VALIDATION, payload: { error: "" } });
        //     }, 10000);
        // }
        // else  if (validation.checkAddrValidation(data.Address_1).error) {
        //     // dispatch({ type: VALIDATION, payload: { error: validation.checkEmailValidation(data.email).error } });
        //     // window.scrollTo({
        //     //     top: 0,
        //     //     behavior: 'smooth'
        //     // });
        //     // setTimeout(() => {
        //     //     dispatch({ type: VALIDATION, payload: { error: "" } });
        //     // }, 10000);

        //        {/* aswin 10/14/2021 start*/}
        //        let err= validation.checkAddrValidation(data.email)
        //        dispatch({ type: VALIDATION, payload: { error: err.error } });
        //        {/* aswin 10/14/2021 end*/}
        //        window.scrollTo({
        //            top: 0,
        //            behavior: 'smooth'
        //        });
        //        {/* aswin 10/14/2021 start*/}
        //        // setTimeout(() => {
        //        //     dispatch({ type: VALIDATION, payload: { error: "" } });
        //        // }, 10000);
        //        {/* aswin 10/14/2021 stop*/}
        // }else if (validation.checkLandNoValidation(data.regd_no_1).error || validation.checkLandNoValidation(data.regd_no_2).error ) {
        //     if(validation.checkLandNoValidation(data.regd_no_1).error){
        //         dispatch({ type: VALIDATION, payload: { error: "Regd_No " + validation.checkLandNoValidation(data.regd_no_1).error } });
        //     }else if(validation.checkLandNoValidation(data.regd_no_2).error){
        //         dispatch({ type: VALIDATION, payload: { error: "Regd_No " + validation.checkLandNoValidation(data.regd_no_2).error } });
        //     }
        // }else if (validation.checkNameValidation(data.expertise_1).error || validation.checkNameValidation(data.expertise_2).error || validation.checkNameValidation(data.expertise_3).error ) {
        //     if(validation.checkNameValidation(data.expertise_1).error){
        //         dispatch({ type: VALIDATION, payload: { error: "Expertise " + validation.checkNameValidation(data.expertise_1).error.slice(5) } });
        //     }else if(validation.checkNameValidation(data.expertise_2).error){
        //         dispatch({ type: VALIDATION, payload: { error: "Expertise " + validation.checkNameValidation(data.expertise_2).error.slice(5) } });
        //     }else if(validation.checkNameValidation(data.expertise_3).error){
        //         dispatch({ type: VALIDATION, payload: { error: "Expertise " + validation.checkNameValidation(data.expertise_3).error.slice(5) } });
        //     }
        // }
        // else {
        //     const checkError = state.Validation.error;
        //     if (checkError) {
        //         alert("please check all the fields")
        //     }
        //     else {
        //         props.next();
        //     }
        // }
        props.next();
    }
    const handleReset = () => {
        // if (state.physioRegisterReducer.id) {
        //     if (window.confirm("Confirm, Do You want to Cancel Update?")) {
        //         dispatch({ type: CLEAR_STATE });
        //        // history.push("/physio/list");
                
        //     }
        // } else {
        //     if (window.confirm("Confirm, Do You want to Reset all fields?")) {
        //         dispatch({ type: CLEAR_STATE });
        //         form.resetFields()
        //         props.back()
                
                
        //     }
        // }


          {/* aswin 10/14/2021 start*/}
    if (state.physioRegisterReducer.id) {
        {/* aswin 10/14/2021 stop*/}
            if (window.confirm("Confirm, Do You want to Cancel Update?")) {
                dispatch({ type: CLEAR_STATE });
               // history.push("/physio/list");
                
            }
       } else {
           {/* aswin 10/14/2021 start*/}
            if (window.confirm("Confirm, Do You want to Reset all fields?")) {
                state.physioRegisterReducer.Address_1=""
                state.physioRegisterReducer.Address_2=""
                state.physioRegisterReducer.Address_3=""
                state.physioRegisterReducer.city=""
                state.physioRegisterReducer.state=""
                state.physioRegisterReducer.email=""
                state.physioRegisterReducer.country=""
                state.physioRegisterReducer.facebook=""
                state.physioRegisterReducer.linkedin=""
                state.physioRegisterReducer.regd_no_1=""
                state.physioRegisterReducer.regd_no_2=""
                state.physioRegisterReducer.degree=""
                state.physioRegisterReducer.expertise_1=""
                state.physioRegisterReducer.expertise_2=""
                state.physioRegisterReducer.expertise_3=""
                form.setFieldsValue({ Address_1: "" })
                form.setFieldsValue({ Address_2: "" })
                form.setFieldsValue({ Address_3: "" })
                form.setFieldsValue({ city: "" })
                form.setFieldsValue({ state: "" })
                form.setFieldsValue({ country: "" })
                form.setFieldsValue({ email: "" })
                form.setFieldsValue({ facebook:"" })
                form.setFieldsValue({ linkedin: "" })
                form.setFieldsValue({ regd_no_1: "" })
                form.setFieldsValue({ regd_no_2: "" })
                form.setFieldsValue({ degree:"" });
                form.setFieldsValue({ expertise_1: "" });
                form.setFieldsValue({ expertise_2: "" });
                form.setFieldsValue({ expertise_3: "" });
            }
       }
       {/* aswin 10/14/2021 stop*/}
    }
    const Back = () => {
        props.back();
    }
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
            <h3 className="page-heading" id="page-heading" ><i class="fas fa-user-plus" ></i> Physiotherapist </h3>
            <StepBar src={svg} />
            <Title level={4} className="border mb-0 p-2 my-2">Other Information</Title>

            <Form onFinish={handleSubmit} form={form} name="control-hooks" layout="vertical" autoComplete="off">
                <div className="border mb-4">
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col span={24}>
                            <FormTextArea name="Address_1" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Address 1'}</span>}
                                value={state.physioRegisterReducer.Address_1}
                                placeholder="Address 1"
                                className="input-field"
                                onChange={handleChange}
                               // onBlur={handleBlur}
                               required={true}
                                defaultValue={state.physioRegisterReducer.Address_1}
                            />
                        </Col>
                        <Col span={24}>
                            <FormTextArea name="Address_2" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Address 2'}</span>}
                                value={state.physioRegisterReducer.Address_2}
                                placeholder="Address 3"
                                className="input-field"
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                              required={false}
                                defaultValue={state.physioRegisterReducer.Address_2}
                            />
                        </Col>
                        <Col span={24}>
                            <FormTextArea name="Address_3" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Address 3'}</span>}
                                value={state.physioRegisterReducer.Address_3}
                                placeholder="Address 3"
                                className="input-field"
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                required={false}
                                defaultValue={state.clinicReg.Address_3}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <Form.Item
                                label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Country'}</span>}
                                name="country"
                                //rules={[{ required: true, message: `Please Select Country.` }]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select country"
                                    value={state.physioRegisterReducer.country}
                                    onChange={(value) => { handleChange("country", value) }}
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
                                label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'State'}</span>}
                                name="state"
                              //  rules={[{ required: true, message: `Please Select State.` }]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select state."
                                    value={state.physioRegisterReducer.state}
                                    onChange={(value) => { handleChange("state", value) }}
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
                                label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'City'}</span>}
                                name="city"
                              //  rules={[{ required: true, message: `Please Select City.` }]}
                            >
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="plaese select City."
                                    value={state.physioRegisterReducer.state}
                                    onChange={(value) => { handleChange("city", value) }}
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
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'E-mail'}</span>}
                                required={true}
                                name="email"
                                className="input-field"
                                placeholder="Physio Email"
                                value={state.physioRegisterReducer.email}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.email}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Facebook'}</span>}
                                required={false}
                                name="facebook"
                                className="input-field"
                                placeholder="Facebook Profile"
                                value={state.physioRegisterReducer.facebook}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                defaultValue={state.physioRegisterReducer.facebook}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Linkedin'}</span>}
                                name="linkedin"
                                className="input-field"
                                placeholder="Linkedin Profile"
                                value={state.physioRegisterReducer.linkedin}
                                onChange={handleChange}
                             //   onBlur={handleBlur}
                                required={false}
                                defaultValue={state.physioRegisterReducer.linkedin}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="regd_no_1" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Regd. No. 1"}</span>}
                                placeholder="Physio Registered Id 1"
                                className="input-field"
                                value={state.physioRegisterReducer.regd_no_1}
                                onChange={handleChange}
                             //   onBlur={handleBlur}
                                required={true}
                                defaultValue={state.physioRegisterReducer.regd_no_1}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="regd_no_2"
                                className="input-field"
                                label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Regd. No. 2"}</span>}  placeholder="Physio Registered Id 2"
                                value={state.physioRegisterReducer.regd_no_2}
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                required={false}
                                defaultValue={state.physioRegisterReducer.regd_no_2}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="degree" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Degree"}</span>} placeholder="Physio Degree"
                                className="input-field"
                                value={state.physioRegisterReducer.degree}
                                onChange={handleChange}
                             //   onBlur={handleBlur}
                                required={true}
                                defaultValue={state.physioRegisterReducer.degree}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]} style={{marginBottom:'15px'}}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="expertise_1" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Expertise 1"}</span>}
                                value={state.physioRegisterReducer.expertise_1}
                                placeholder="Expertise 1"
                                className="input-field"
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                required={true}
                                defaultValue={state.physioRegisterReducer.expertise_1}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="expertise_2" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Expertise 2"}</span>}
                                value={state.physioRegisterReducer.expertise_2}
                                placeholder="Expertise 2"
                                className="input-field"
                                onChange={handleChange}
                             //   onBlur={handleBlur}
                                required={false}
                                defaultValue={state.physioRegisterReducer.expertise_2}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="expertise_3" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{"Expertise 3"}</span>}
                                value={state.physioRegisterReducer.expertise_3}
                                placeholder="Expertise 3"
                                className="input-field"
                                onChange={handleChange}
                              //  onBlur={handleBlur}
                                required={false}
                                defaultValue={state.physioRegisterReducer.expertise_3}
                            />
                        </Col>
                    </Row>
                </div>
             
                   
                    <Row className="text-center" justify="center" style={{marginBottom:'10px'}}>
                    <Col >
                    <Button  size="large" className="me-2 "  style={{borderRadius:"10px"}}  onClick={Back}>Back</Button>
                    </Col>
                    <Col >
                    <Button size="large" className="me-2  " style={{backgroundColor:'#1bbc9b',borderRadius:"10px"}}  onClick={handleReset}>Reset</Button>
                    </Col>
                    <Col >
                    <Button type="primary" size="large" className="me-2 btncolor " htmlType="submit">Next</Button>
                    </Col>
                </Row>
               
            </Form>
        </>
        
    )
}
export default PhysioRegisteration2;
