import React, { useEffect, useState } from "react";
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
  getClinicDetails,
} from "./../../../API/Physio/ClinicRegister";
import ClinicValidation from "./../../Validation/clinicValidation/clinicValidation";
import Validation from "./../../Validation/authValidation/authValidation";
import { VALIDATION } from "./../../../contextStore/actions/authAction";
// import apiValidation from './../../../API/apiValidation/apiValidation';
import { Typography, Row, Button, Col, Form, Select, Input } from "antd";
import FormInput from "./../../UI/antInputs/FormInput";
import FormTextArea from "./../../UI/antInputs/FormTextArea";
import FormDate from "./../../UI/antInputs/FormDate";
import Loading from "./../../UtilityComponents/Loading";
import Success from "./../../UtilityComponents/SuccessHandler";
import { useHistory } from "react-router-dom";
import "../../../styles/Layout/Heading.css";
import { ItemDragging } from "devextreme-react/list";
import { useForm } from "antd/lib/form/Form";
import { useLocation } from "react-router-dom";
const { Title } = Typography;
const ViewClinic = () => {
  // const formRef = React.createRef();
  const [form] = useForm();
  const [dateState, setDateState] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const location = useLocation()
  const [clinicDetails, setClinicDetails] = useState([]);
  let status_flag = state.clinicReg.status_flag
  useEffect(() => {
    console.log("clinic details keys : ",location);
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

  useEffect(async () => {
    let clinic_id = JSON.parse(localStorage.getItem("user")).clinic_id;
    const res = await getClinicDetails(clinic_id);
    console.log("clinic details ",res)
     form.setFieldsValue({country: 'aswin'})
    setClinicDetails('rest')
    if (Object.keys(res).length > 0) {
      Object.keys(res).map((data) => {
        if (res[data] !== null) {
          console.log("clinic details keys : ", data, " value ", res[data]);
        let temp={}
        temp[data] = res[data]
        form.setFieldsValue(temp)
        dispatch({
          type: CLINIC_STATE_CHANGE,
          payload: {
            key:data,
            value: res[data]
          },
        })
        }
      });
    }
  }, []);

  const handleNameAndWebsite = (htmlfor, title, type, place, value) => {
    return (
      <FormInput
        label={
          <span style={{ fontSize: "14px", fontWeight: "600" }}>{title}</span>
        }
        className="clinicInput"
        name={htmlfor}
        value={value}
        disabled={status_flag}
      />
    );
  };
  return (
    <>
      <div style={{ minHeight: "20px" }}></div>
      <h3 className="page-heading" id="page-heading">
        <i className="fas fa-clinic-medical"></i>{" "}
        <b> Clinic {state.clinicReg.name} </b>
      </h3>
      <Form
        form={form}
        style={{ marginTop: "40px", marginLeft: "1%" }}
        name="control-hooks"
        autoComplete="off"
        layout="vertical"
      >
        <div className="border mt-2 mb-4">
          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            <Col md={24} lg={12} sm={24} xs={24}>
              {/* {handleNameAndWebsite("name","Name","text","Clinic Name",state.clinicReg.name)} */}
              <FormInput name="name" label={<span style={{fontSize:'14px',fontWeight:'600'}}>{'Name'}</span>}
                                value={state.clinicReg.name}
                                //defaultValue={state.clinicReg.name}
                                disabled={status_flag}
                            
                                className="clinicInput"
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
                disabled={status_flag}
                className="clinicInput"
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
                disabled={status_flag}
                className="clinicInput"
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
                disabled={status_flag}
                className="clinicInput"
                required={false}
              />
            </Col>
          </Row>

          <Row gutter={[20, 20]} style={{ marginBottom: "15px" }}>
            {/* aswin 11/13/2021 start implimented country,state,city */}
            <Col md={24} lg={8} sm={24} xs={24}>
              {/* <FormInput name="zip" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Pin Code'}</span>}
                                value={state.clinicReg.zip}
                                className="input-field"
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
                  className="clinicInput"
                  disabled={status_flag}
                  optionFilterProp="children"
                  value={state.clinicReg.country}
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
                 className="clinicInput"
                  disabled={status_flag}
                  showSearch
                  optionFilterProp="children"
                  value={state.clinicReg.state}
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
                                className="input-field"
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
                  className="clinicInput"
                  disabled={status_flag}
                  optionFilterProp="children"
                  value={state.clinicReg.city}
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
                disabled={status_flag}
                className="clinicInput"
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
                disabled={status_flag}
                 className="clinicInput"
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
                 className="clinicInput"
                disabled={status_flag}
                value={state.clinicReg.whatsapp_no}
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
                 className="clinicInput"
                disabled={status_flag}
                value={state.clinicReg.landline_no}
                required={false}
              />
            </Col>
            <Col md={24} lg={8} sm={24} xs={24}>
              {/* <FormDate
                name="estab_date"
                label={
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    {"Estb Date"}
                  </span>
                }
                 className="clinicInput"
                disabled={status_flag}
                value={dateState}
                // required="true"
              /> */}
                 <FormInput
                 name="estab_date"
                 label={
                   <span style={{ fontSize: "14px", fontWeight: "600" }}>
                     {"Estb Date"}
                   </span>
                 }
                  className="clinicInput"
                 disabled={status_flag}
                 value={dateState}
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
                 className="clinicInput"
                disabled={status_flag}
                value={state.clinicReg.email}
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
      </Form>
    </>
  );
};
export default ViewClinic;
