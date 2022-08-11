import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateCity from "../../UtilityComponents/dummyData/state_city.json";
import Error from "./../../UtilityComponents/ErrorHandler";
import {
  CLINIC_CLEAR_STATE,
  CLINIC_REGISTER_SUCCESS,
  CLINIC_STATE_CHANGE,
} from "./../../../contextStore/actions/ClinicRegister";
import {
  clinicRegisterApi,
  clinicUpdateApi,
} from "./../../../API/Physio/ClinicRegister";
import ClinicValidation from "./../../Validation/clinicValidation/clinicValidation";
import Validation from "./../../Validation/authValidation/authValidation";
import { VALIDATION } from "./../../../contextStore/actions/authAction";
// import apiValidation from './../../../API/apiValidation/apiValidation';
import { Typography, Row, Button, Col, Form, Select, Space } from "antd";
import FormInput from "./../../UI/antInputs/FormInput";
import FormTextArea from "./../../UI/antInputs/FormTextArea";
import FormDate from "./../../UI/antInputs/FormDate";
import Loading from "./../../UtilityComponents/Loading";
import Success from "./../../UtilityComponents/SuccessHandler";
import moment from "moment"
import { useHistory } from "react-router-dom";
import "../../../styles/Layout/Heading.css";
import { ItemDragging } from "devextreme-react/list";
import { useForm } from "antd/lib/form/Form";
const { Title } = Typography;
const PhysioClinic = () => {
  // const formRef = React.createRef();
  const [form] = useForm();
  const [dateState, setDateState] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [submitState, setSubmitState] = useState(false)
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "NOERROR" });
    const data = state.clinicReg;
    const keys = Object.keys(StateCity);
    setStateList(keys);
    if (data.state) {
      if (StateCity[data.state]) {
        setCityList(StateCity[data.state]);
      } else {
        setCityList([]);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.removeItem('clinic_submit');
    const unblock = history.block((location, action) => {
      if(localStorage.getItem('clinic_submit')) {
        dispatch({ type: CLINIC_CLEAR_STATE });
        form.setFieldsValue({ name: "" });
        form.setFieldsValue({ address_1: "" });
        form.setFieldsValue({ address_2: "" });
        form.setFieldsValue({ address_3: "" });
        form.setFieldsValue({ city: "" });
        form.setFieldsValue({ state: "" });
        form.setFieldsValue({ country: "" });
        form.setFieldsValue({ zip: "" });
        form.setFieldsValue({ estab_date: "" });
        form.setFieldsValue({ mobile_no: "" });
        form.setFieldsValue({ landline_no: "" });
        form.setFieldsValue({ whatsapp_no: "" });
        form.setFieldsValue({ email: "" });
        form.setFieldsValue({ website_url: "" });
        // setClearState(true);
        dispatch({ type: VALIDATION, payload: { error: "" } });
        return true;
      }
      // if (
      //   state.clinicReg.name !== "" ||
      //   state.clinicReg.address_1 !== "" ||
      //   state.clinicReg.address_2 !== "" ||
      //   state.clinicReg.address_3 !== "" ||
      //   state.clinicReg.city !== "" ||
      //   state.clinicReg.state !== "" ||
      //   state.clinicReg.country !== "" ||
      //   state.clinicReg.zip !== "" ||
      //   state.clinicReg.estab_date !== "" ||
      //   state.clinicReg.mobile_no !== "" ||
      //   state.clinicReg.landline_no !== "" ||
      //   state.clinicReg.whatsapp_no !== "" ||
      //   state.clinicReg.email !== "" ||
      //   state.clinicReg.website_url !== ""
      // ) {
      //   if (
      //     window.confirm("You will lost your Form Data. Do You really wants?")
      //   ) {
      //     dispatch({ type: CLINIC_CLEAR_STATE });
      //     form.setFieldsValue({ name: "" });
      //     form.setFieldsValue({ address_1: "" });
      //     form.setFieldsValue({ address_2: "" });
      //     form.setFieldsValue({ address_3: "" });
      //     form.setFieldsValue({ city: "" });
      //     form.setFieldsValue({ state: "" });
      //     form.setFieldsValue({ country: "" });
      //     form.setFieldsValue({ zip: "" });
      //     form.setFieldsValue({ estab_date: "" });
      //     form.setFieldsValue({ mobile_no: "" });
      //     form.setFieldsValue({ landline_no: "" });
      //     form.setFieldsValue({ whatsapp_no: "" });
      //     form.setFieldsValue({ email: "" });
      //     form.setFieldsValue({ website_url: "" });
      //     // setClearState(true);
      //     dispatch({ type: VALIDATION, payload: { error: "" } });
      //     return true;
      //   } else {
      //     return false;
      //   }
      // } else {
      //   console.log("nothing " +  state.clinicReg.name !== "" ,
      //   state.clinicReg.address_1 !== "" ,
      //   state.clinicReg.address_2 !== "" ,
      //   state.clinicReg.address_3 !== "" ,
      //   state.clinicReg.city !== "" ,
      //   state.clinicReg.state !== "" ,
      //   state.clinicReg.country !== "" ,
      //   state.clinicReg.zip !== "" ,
      //   state.clinicReg.estab_date !== "" ,
      //   state.clinicReg.mobile_no !== "" ,
      //   state.clinicReg.landline_no !== "" ,
      //   state.clinicReg.whatsapp_no !== "" ,
      //   state.clinicReg.email !== "" ,
      //   state.clinicReg.website_url !== "");
      // }
      if (
        window.confirm("You will lost your Form Data. Do You really wants?")
      ) {
        dispatch({ type: CLINIC_CLEAR_STATE });
        form.setFieldsValue({ name: "" });
        form.setFieldsValue({ address_1: "" });
        form.setFieldsValue({ address_2: "" });
        form.setFieldsValue({ address_3: "" });
        form.setFieldsValue({ city: "" });
        form.setFieldsValue({ state: "" });
        form.setFieldsValue({ country: "" });
        form.setFieldsValue({ zip: "" });
        form.setFieldsValue({ estab_date: "" });
        form.setFieldsValue({ mobile_no: "" });
        form.setFieldsValue({ landline_no: "" });
        form.setFieldsValue({ whatsapp_no: "" });
        form.setFieldsValue({ email: "" });
        form.setFieldsValue({ website_url: "" });
        // setClearState(true);
        dispatch({ type: VALIDATION, payload: { error: "" } });
        return true;
      } else {
        return false;
      }
    });

    return () => {
      unblock();
    };
  }, [history]);
  useEffect(() => {
    let res = state.clinicReg;
    if (Object.keys(res).length > 0) {
      Object.keys(res).map((data) => {
        if (res[data] !== null && data !=='estab_date' && data !=='start_date') {
          let temp = {};
          temp[data] = res[data];
          // {name:"value"}
          form.setFieldsValue(temp);
        }
        if(data =='estab_date'){
        //  console.log(res[data])
          let temp = {};
          temp[data] = moment(res[data], "YYYY-MM-DD") 
          form.setFieldsValue(temp);
        }
      });
    }
  }, []);

  const handleChange = (key, value, id = 0) => {
    if (key === "estab_date") {
      setDateState(value.date);
      dispatch({
        type: CLINIC_STATE_CHANGE,
        payload: {
          key,
          value: value.dateString,
        },
      });
    } else if (key === "state") {
      if (!value) {
        setCityList([]);
        dispatch({
          type: CLINIC_STATE_CHANGE,
          payload: {
            key,
            value,
          },
        });
      } else {
        let data = StateCity[value];
        setCityList(data);
        dispatch({
          type: CLINIC_STATE_CHANGE,
          payload: {
            key,
            value,
          },
        });
      }
    } else {
      dispatch({
        type: CLINIC_STATE_CHANGE,
        payload: {
          key,
          value,
        },
      });
      dispatch({ type: "NOERROR" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(name);
    let error = {};
    if (name === "zip") {
      error = ClinicValidation.checkPinCodeValidation(value);
    } else if (name === "email") {
      error = Validation.checkEmailValidation(value);
      // let verifyEmail = apiValidation.checkEmailValid({type:"email",value:e.target.value});
      // if(!verifyEmail) dispatch({type:VALIDATION,payload:{error:"Email is already registered."}});
    }else if(name==="mobile_no"){
      error = Validation.checkMobNoValidation(e.target.value);
    } 
    else if (name === "name") {
      const validName = new RegExp("^[a-zA-Z0-9_]{2,20}$");
      if (value) {
        if (value.length < 4) {
          error["error"] = "Name must contain atleast 4 characters.";
        }
      }
      if (!validName.test(value)) {
        error["error"] =
          "Name must not contain any Special Symbol. (Ex: @,:,;,},{ etc.)";
      }
      // error=Validation.checkNameValidation(value,false)
    } else if (
      name == "address_1" ||
      name == "address_2" ||
      name == "address_3"
    ) {
      error = Validation.checkAddrValidation(e.target.value);
    } else if (name == "zip") {
      error = Validation.checkPincodeValidation(e.target.value);
    } else if (name == "email") {
      error = Validation.checkEmailValidation(e.target.value);
    } else if (name == "website_url") {
      error = Validation.isValidURL(e.target.value);
    }

    // else if(name === "name"){
    //      let verifyName = apiValidation.checkClinicName({type:"clinic_name",value:e.target.value});
    //      if(!verifyName) dispatch({type:VALIDATION,payload:{error:"Clinic Name is already registered."}});
    // }else if(name === "website_url"){
    //      let verifyWebsite = apiValidation.checkClinicWebsite({type:"clinic_website",value:e.target.value});
    //      if(!verifyWebsite) dispatch({type:VALIDATION,payload:{error:"Clinic Website is already registered."}});
    // }
    if (error.error)
      dispatch({ type: VALIDATION, payload: { error: error.error } });
  };
  const handleReset = (check) => {
    if (check) {
      dispatch({ type: CLINIC_CLEAR_STATE });
      form.resetFields();
      return;
    }
    if (window.confirm("Confirm, Do you want to clear form?")) {
      dispatch({ type: CLINIC_CLEAR_STATE });
      form.resetFields();
    }
  };
  const handleSubmit = async (value) => {
    localStorage.setItem('clinic_submit',true)
    setSubmitState(true)
    let error={}
         if(Validation.checkMobNoValidation(state.clinicReg.mobile_no).error){
         // error = Validation.checkMobNoValidation(state.clinicReg.mobile_no);
        }else if(Validation.checkAddrValidation(state.clinicReg.address_1).error || Validation.checkAddrValidation(state.clinicReg.address_2).error || Validation.checkAddrValidation(state.clinicReg.address_3).error)
        {
            error=Validation.checkAddrValidation(state.clinicReg.address_1) || Validation.checkAddrValidation(state.clinicReg.address_2) || Validation.checkAddrValidation(state.clinicReg.address_3)
        }
        else if(Validation.checkPincodeValidation(state.clinicReg.zip).error)
        {
            error= Validation.checkPincodeValidation(state.clinicReg.zip)
        }

        else if(Validation.checkEmailValidation(state.clinicReg.email).error)
        {
            error=Validation.checkEmailValidation(state.clinicReg.email)
        }

        else if(Validation.isValidURL(state.clinicReg.url).error)
        {
            error=Validation.isValidURL(state.clinicReg.url)
        }
    if(error.error)
    {
        dispatch({ type: VALIDATION, payload: { error: error.error } });
        localStorage.removeItem('clinic_submit')
        return false
    }
    console.log("details ",state.clinicReg)
    console.log("details ",error)
    let res = await clinicRegisterApi(state.clinicReg, dispatch);
    if(res){
      form.resetFields();
      history.push('/clinic-list')
    }

    // else if(state.Validation.error)
    // {
    //     alert("please check all the fields")
    //     return false
    // }
    //   //  const checkError = state.Validation.error;
    //     if(error.error){
    //         alert("please check all the fields")
    //     }
    //     else {

    //     }
  };
  const scrollRef = useRef(null)
  const executeScroll = () => scrollRef.current.scrollIntoView()

  const handleUpdate = async () => {
    let res = await clinicUpdateApi(state.clinicReg, dispatch);
    if (res) {
      window.location.href = "/clinic-list";
    }
    executeScroll()
  };

  const handleNameAndWebsite = (htmlfor, title, type, place, value) => {
    return (
      <FormInput
        label={
          <span style={{ fontSize: "14px", fontWeight: "600" }}>{title}</span>
        }
        className="input-field"
        name={htmlfor}
        placeholder={place}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        // required={true}
      />
    );
  };
  return (
    <>
      <div ref={scrollRef} style={{ minHeight: "20px" }}></div>
      <h3 className="page-heading" id="page-heading">
        <i className="fas fa-clinic-medical"></i>{" "}
        <b> Clinic {state.clinicReg.pp_cm_id ? "Update" : "Registration"} </b>
      </h3>
      {state.Validation.error && <Error error={state.Validation.error} />}
      {state.clinicReg.isLoading && <Loading />}
      {state.clinicReg.success && <Success success={state.clinicReg.success} />}
      <Form
        style={{ marginTop: "40px", marginLeft: "1%" }}
        onFinish={state.clinicReg.pp_cm_id ? handleUpdate : handleSubmit}
        form={form}
        name="control-hooks"
        autoComplete="off"
        layout="vertical"
      >
        <div className="border mt-2 mb-4">
          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            <Col md={24} lg={12} sm={24} xs={24}>
              {/* {handleNameAndWebsite("name","Name","text","Clinic Name",state.clinicReg.name)} */}
              <FormInput
                name="name"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Name"}
                  </span>
                }
                value={state.clinicReg.name}
                placeholder="Name"
                onChange={handleChange}
                className="input-field"
               // onBlur = {handleBlur}
                required={true}
              />
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea
                name="address_1"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Address 1"}
                  </span>
                }
                value={state.clinicReg.address_1}
                placeholder="Address 1"
                className="input-field"
                onChange={handleChange}
                onBlur = {handleBlur}
                required={true}
              />
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea
                name="address_2"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Address 2"}
                  </span>
                }
                value={state.clinicReg.address_2}
                placeholder="Address 2"
                className="input-field"
                onChange={handleChange}
               // onBlur = {handleBlur}
                required={false}
              />
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea
                name="address_3"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Address 3"}
                  </span>
                }
                value={state.clinicReg.address_3}
                placeholder="Address 3"
                className="input-field"
                onChange={handleChange}
                //onBlur = {handleBlur}
                required={false}
              />
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            {/* aswin 11/13/2021 start implimented country,state,city */}
            <Col md={24} lg={8} sm={24} xs={24}>
              {/* <FormInput name="zip" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Pin Code'}</span>}
                                value={state.clinicReg.zip}
                                placeholder="Pin Code" 
                                onChange={handleChange}
                                className="input-field"
                                onBlur = {handleBlur} 
                                required={true}
                            />  */}
              <Form.Item
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Country"}
                  </span>
                }
                name="country"
                //  rules={[{ required: true, message: `Please Select Country.` }]}
              >
                <Select
                  //showSearch
                  optionFilterProp="children"
                  placeholder="please select country"
                  value={state.clinicReg.country}
                  onChange={(value) => {
                    handleChange("country", value);
                  }}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="India">India</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              {/* <FormInput name="city" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'City'}</span>}
                                className="input-field"
                                value={state.clinicReg.city}
                                placeholder="City" 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            /> */}
              <Form.Item
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"State"}
                  </span>
                }
                name="state"
                // rules={[{ required: true, message: `Please Select State.` }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="plaese select state."
                  value={state.clinicReg.state}
                  onChange={(value) => {
                    handleChange("state", value);
                  }}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {stateList.map((value, index) => {
                    return (
                      <Select.Option key={index} value={value}>
                        {value}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              {/* <FormInput name="state" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'State'}</span>}
                                value={state.clinicReg.state}
                                placeholder="State" 
                                onChange={handleChange}
                                className="input-field"
                                onBlur = {handleBlur} 
                                required="true"
                            />  */}
              <Form.Item
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"City"}
                  </span>
                }
                name="city"
                //  rules={[{ required: true, message: `Please Select City.` }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="plaese select City."
                  value={state.clinicReg.city}
                  onChange={(value) => {
                    handleChange("city", value);
                  }}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cityList.length !== 0 &&
                    cityList.map((value, index) => {
                      return (
                        <Select.Option key={index} value={value}>
                          {value}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormInput
                name="zip"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Pin Code"}
                  </span>
                }
                value={state.clinicReg.zip}
                placeholder="Pin Code"
                onChange={handleChange}
                className="input-field"
                onBlur = {handleBlur}
                //  required={true}
              />
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormInput
                name="mobile_no"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Mobile No"}
                  </span>
                }
                value={state.clinicReg.mobile_no}
                className="input-field"
                placeholder="Mobile No."
                onChange={handleChange}
                onBlur = {handleBlur}
                required="true"
              />
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormInput
                name="whatsapp_no"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Whatsapp No."}
                  </span>
                }
                className="input-field"
                value={state.clinicReg.whatsapp_no}
                placeholder="Whatsapp No"
                onChange={handleChange}
                //  onBlur = {handleBlur}
                //  required="true"
              />
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormInput
                name="landline_no"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Landline No"}
                  </span>
                }
                className="input-field"
                value={state.clinicReg.landline_no}
                placeholder="Landline No."
                onChange={handleChange}
                // onBlur = {handleBlur}
                required={false}
              />
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormDate
                name="estab_date"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Estb Date"}
                  </span>
                }
                className="input-field"
                //defaultValue={dateState}
                placeholder="Estb date"
                onChange={handleChange}
                //   onBlur = {handleBlur}
                // required="true"
              />
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              <FormInput
                name="email"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"E-mail"}
                  </span>
                }
                className="input-field"
                value={state.clinicReg.email}
                placeholder="Email"
                onChange={handleChange}
                  onBlur = {handleBlur}
                required="true"
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              {handleNameAndWebsite(
                "website_url",
                "Website Url",
                "text",
                "Website Url",
                state.clinicReg.website_url
              )}
            </Col>
          </Row>
        </div>

        {/* <div className="text-center">
                    <Button className=" m-2"  style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}} onClick={handleSubmit}>Submit</Button>
                    <Button className="btncolor m-2" onClick={handleReset}>Reset</Button>
                </div> */}
        <Row justify="center">
          <Space size={"middle"}>
            <Col span={2}>
              {" "}
              <Button
                // className="btncolor m-2"
                style={{ borderRadius: "10px", backgroundColor: "#2d7ecb" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Col>
            <Col span={2}>
              {" "}
              <Button
                htmlType="submit"
                style={{ borderRadius: "10px", backgroundColor: "#2d7ecb" }}
              >
                {state.clinicReg.pp_cm_id ? "Update" : "Submit"}
              </Button>
            </Col>
          </Space>
        </Row>
      </Form>
    </>
  );
};
export default PhysioClinic;
