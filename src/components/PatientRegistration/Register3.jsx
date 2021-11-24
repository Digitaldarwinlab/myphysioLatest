import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { STATECHANGE, VALIDATION, BASIC_CLEARSTATE3, PATIENT_REG_FAILURE } from "../../contextStore/actions/authAction";
import { Patient_Register, Patient_Update } from "../../API/PatientRegistration/Patient"
import validation from "./../Validation/authValidation/authValidation";
import Error from "./../UtilityComponents/ErrorHandler.js";
import svg from "././../../assets/step3.png";
import StepBar from './../UtilityComponents/StepBar';
import { Typography, Modal, Row, Col, Table, Button, Form } from 'antd';
import FormTextArea from '../UI/antInputs/FormTextArea';
import FormInput from '../UI/antInputs/FormInput';
import Loading from './../UtilityComponents/Loading';
import Success from './../UtilityComponents/SuccessHandler';
import '../../styles/Layout/Heading.css'
const { Title } = Typography;

//Mappig of Keys
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
    Allergies: "Allergies",
    MedicalHistory: "Allergies",
    FamilyHistory: "Family History"
}
const Register3 = (props) => {

    const history = useHistory();
    const [form] = Form.useForm();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tableData, setTableData] = useState([]);

    // const handleBlur = (e) => {
    //     const key = e.target.name;
    //     console.log(key)
    //     let error = {};
    //     if (key === "Allergies") {
    //         error = validation.checkNullValidation(e.target.value);
    //     }
    //     if (key === "MedicalHistory") {
    //       //  console.log('erroring  medical history')
    //         error = validation.checkNullValidation(e.target.value);

    //     }if (key === "FamilyHistory") {
    //         error = validation.checkNullValidation(e.target.value);
    //     }
    //     if (error.error) {
    //         dispatch({ type: VALIDATION, payload: { error: error.error } });
    //         setTimeout(() => {
    //             dispatch({ type: VALIDATION, payload: { error: "" } });
    //         }, 10000);
    //     }
    // }

    // const showModal = () => {
    //     const checkError = state.Validation.error;
    //     if (checkError) {
    //         alert("please check all the fields")
    //     }
    //     else {
    //         let tempData = [];
    //         let keys = Object.keys(state.BasicDetails);
    //         let index = 0;
    //         keys.forEach(key => {
    //             if (!(["isLoading", "success", "pp_patm_id"].includes(key))) {
    //                 if (state.BasicDetails[key] !== null && state.BasicDetails[key] !== "NULL" && state.BasicDetails[key] !== "null" && (state.BasicDetails[key] !== "")) {
    //                     tempData.push({
    //                         key: index,
    //                         Field: MappingKey[key],
    //                         Value: state.BasicDetails[key]
    //                     });
    //                     index += 1;
    //                 }
    //             }
    //         });
    //         setTableData(tempData);
    //         setIsModalVisible(true);
    //     }

    // };

    // const handleOk = async () => {
    //     setIsModalVisible(false);
    //     let result;
    //     if (state.BasicDetails.pp_patm_id === "") {
    //         result = await Patient_Register(state.BasicDetails, dispatch);
    //     } else {
    //         result = await Patient_Update(state.BasicDetails, dispatch);
    //     }
    //     if (result && result[0]) {
    //         if(JSON.parse(localStorage.getItem("user")).role=='patient')
    //             {
    //                 window.location.href = "/patient/profile";
    //             }
    //             else
    //             {
    //                 window.location.href = "/pateints";
    //             }
    //         window.location.href = "/pateints";
    //     } else {
    //         dispatch({ type: PATIENT_REG_FAILURE });
    //         dispatch({ type: VALIDATION, payload: { error: result[1] } }); 
            
    //     }
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };



    // useEffect(() => {
    //     const data = state.BasicDetails;
    //     form.setFieldsValue({ Allergies: data.Allergies });
    //     form.setFieldsValue({ MedicalHistory: data.MedicalHistory });
    //     form.setFieldsValue({ FamilyHistory: data.FamilyHistory });
    // }, [props.clearState])


    // const Back = () => {
    //     props.back();
    // }

    // const handleChange = (key, value, id = 0) => {

    //     dispatch({
    //         type: STATECHANGE,
    //         payload: {
    //             key,
    //             value
    //         }
    //     });
    //     dispatch({ type: "NOERROR" });
    // }

    // const onFinish = (values) => {
    //     // console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     // console.log('Failed:', errorInfo);
    // };

    // const reset = () => {
    //     if (state.BasicDetails.pp_patm_id) {
    //         if (window.confirm("Confirm, Do You want to Cancel Update?")) {
    //            // dispatch({ type: CLEAR_STATE });
    //            if(JSON.parse(localStorage.getItem("user")).role=='patient')
    //             {
    //                 history.push('patient/profile')
    //             }
    //             else
    //             {
    //                 history.push("/physio/register");
    //             }
    //         }
    //     } else {
    //         if (window.confirm("Confirm, Do You want to Reset all ?")) {
    //            // dispatch({type: BASIC_CLEARSTATE,})
    //            if(JSON.parse(localStorage.getItem("user")).role=='patient')
    //            {
    //                history.push('patient/profile')
    //            }
    //            else
    //            {
    //                history.push("/dashboard");
    //            }
    //         }
    //     }
    // }

    // return (
    //     <>     <div style={{ minHeight: "20px" }}></div>
    //         {state.BasicDetails.isLoading && <Loading />}
    //         <h1 className="page-heading" id="page-heading" ><i className="fas fa-user-plus" /><b> {JSON.parse(localStorage.getItem("user")).role=='patient' ? 'Update Profile' : 'Patient'}</b></h1>
    //         <StepBar src={svg} />
    //         <Title level={3} className="border mb-0 p-2 my-2">History</Title>

    //         <Form onFinish={onFinish} style={{marginTop:'2%'}} layout="vertical" onFinishFailed={onFinishFailed} form={form} name="control-hooks">
    //             <div className="border p-3">

 /* aswin on 10/13/2021 start */
 const [allergyErr, setAllergyErr] = useState(false);
 const [medicalErr, setMedicalErr] = useState(false);
 const [familiyErr, setFamilyErr] = useState(false);
 const checkFirstCharSpecial=(name,value)=>{
     //var specialFormat = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/g;
     var specialFormat = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/g;
     var numFormat = /^[0-9]+/g;
     if(name==="Allergies"){
         if(specialFormat.test(value)||numFormat.test(value)){
             setAllergyErr(true)
         }else{
             setAllergyErr(false)
         }
     }else if(name==="MedicalHistory"){
         if(specialFormat.test(value)||numFormat.test(value)){
             setMedicalErr(true)
         }else{
             setMedicalErr(false)
         }
     }else if(name==="FamilyHistory"){
         if(specialFormat.test(value)||numFormat.test(value)){
             setFamilyErr(true)
         }else{
             setFamilyErr(false)
         }
     }
 }
 const handleBlur = (e) => {
     const key = e.target.name;
     console.log(key)
     let error = {};

     if (key === "Allergies") {
         error = validation.checkNullValidation(e.target.value);
         checkFirstCharSpecial(key,e.target.value)
     }
     if (key === "MedicalHistory") {
       //  console.log('erroring  medical history')
         error = validation.checkNullValidation(e.target.value);
         checkFirstCharSpecial(key,e.target.value)

     }if (key === "FamilyHistory") {
         error = validation.checkNullValidation(e.target.value);
         checkFirstCharSpecial(key,e.target.value)
     }
     if (error.error) {
         dispatch({ type: VALIDATION, payload: { error: error.error } });
         setTimeout(() => {
             dispatch({ type: VALIDATION, payload: { error: "" } });
         }, 10000);
     }
 }

 const showModal = () => {
     const checkError = state.Validation.error;
     if (checkError||allergyErr||medicalErr||familiyErr) {
         alert("please check all the fields")
     }
     else {
         let tempData = [];
         let keys = Object.keys(state.BasicDetails);
         let index = 0;
         keys.forEach(key => {
             if (!(["isLoading", "success", "pp_patm_id"].includes(key))) {
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

 const handleOk = async () => {
     setIsModalVisible(false);
     let result;
     if (state.BasicDetails.pp_patm_id === "") {
         result = await Patient_Register(state.BasicDetails, dispatch);
     } else {
         result = await Patient_Update(state.BasicDetails, dispatch);
     }
     if (result && result[0]) {
         if(JSON.parse(localStorage.getItem("user")).role=='patient')
             {
                 window.location.href = "/patient/profile";
             }
             else
             {
                 window.location.href = "/pateints";
             }
         window.location.href = "/pateints";
     } else {
         dispatch({ type: PATIENT_REG_FAILURE });
         dispatch({ type: VALIDATION, payload: { error: result[1] } });
         
     }
 };

 const handleCancel = () => {
     setIsModalVisible(false);
 };



 useEffect(() => {
     const data = state.BasicDetails;
     form.setFieldsValue({ Allergies: data.Allergies });
     form.setFieldsValue({ MedicalHistory: data.MedicalHistory });
     form.setFieldsValue({ FamilyHistory: data.FamilyHistory });
 }, [props.clearState])


 const Back = () => {
     props.back();
 }

 const handleChange = (key, value, id = 0) => {
     if(key==="Allergies"){
         checkFirstCharSpecial(key,value)
     }else if(key==="MedicalHistory"){
         checkFirstCharSpecial(key,value)
     }else if(key==="FamilyHistory"){
         checkFirstCharSpecial(key,value)
     }
     dispatch({
         type: STATECHANGE,
         payload: {
             key,
             value
         }
     });
     dispatch({ type: "NOERROR" });
 }

 const onFinish = (values) => {
     // console.log('Success:', values);
 };

 const onFinishFailed = (errorInfo) => {
     // console.log('Failed:', errorInfo);
 };

 const reset = () => {
     if (state.BasicDetails.pp_patm_id) {
         if (window.confirm("Confirm, Do You want to Cancel Update?")) {
            // dispatch({ type: CLEAR_STATE });
            if(JSON.parse(localStorage.getItem("user")).role=='patient')
             {
                 history.push('patient/profile')
             }
             else
             {
                 history.push("/physio/register");
             }
         }
     } else {
        if (window.confirm("Confirm, Do You want to Reset all fields?")) {
            dispatch({ type: BASIC_CLEARSTATE3 });
            form.resetFields()
     }
  }
 }
 return (
     <>     <div style={{ minHeight: "20px" }}></div>
         {state.BasicDetails.isLoading && <Loading />}
         <h1 className="page-heading" id="page-heading" ><i className="fas fa-user-plus" /><b> {JSON.parse(localStorage.getItem("user")).role=='patient' ? 'Update Profile' : 'Patient'}</b></h1>
         <StepBar src={svg} />
         <Title level={3} className="border mb-0 p-2 my-2">History</Title>

         <Form onFinish={onFinish} style={{marginTop:'2%'}} layout="vertical" onFinishFailed={onFinishFailed} form={form} name="control-hooks">
             <div className="border p-3">
                 {allergyErr||medicalErr||familiyErr&&(<Error error={'First cannot be special character'}/>)}
     {/* aswin on 10/13/2021 start */}

                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    {state.BasicDetails.success && (<Success success={state.BasicDetails.success} />)}
                    <Row>
                        <Col md={24} lg={24} sm={24} xs={24}>
                            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Allergies'}</span>}
                                name="Allergies"
                                className="input-field w-100"
                                required="true"
                                value={state.BasicDetails.Allergies}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.Allergies}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24} lg={24} sm={24} xs={24}>
                            <FormTextArea label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Medical History'}</span>}
                                name="MedicalHistory"
                                className="input-field w-100"
                                required="true"
                                onBlur={handleBlur}
                                value={state.BasicDetails.MedicalHistory}
                                onChange={handleChange}
                                defaultValue={state.BasicDetails.MedicalHistory}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24} lg={24} sm={24} xs={24}>
                            <FormTextArea label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Family History'}</span>}
                                name="FamilyHistory"
                                required="true"
                                className="input-field w-100"
                                value={state.BasicDetails.FamilyHistory}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                defaultValue={state.BasicDetails.FamilyHistory}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="m-3 text-end">
                    <Button className="my-3  me-3" style={{borderRadius:'10px'}} onClick={Back}>Back</Button>
                    <Button htmlType="reset" className=" my-3 me-3" style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}}  onClick={reset}>
                        {state.BasicDetails.pp_patm_id ? "Cancel" : "Reset"}
                    </Button>
                    <Button htmlType="submit" className="me-3 my-3 btncolor"   onClick={showModal}>
                        {state.BasicDetails.pp_patm_id ? "Update" : "Submit"}
                    </Button>
                    <Modal title="Confirm Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Table
                            pagination={false}
                            scroll={{ y: 400 }}
                            showHeader={false}
                            columns={[{ title: "Field", dataIndex: "Field", render: (text) => <p className="fw-bold">{text}</p> },
                            { title: "Value", dataIndex: "Value" }]} dataSource={tableData}
                        />
                    </Modal>
                    
                </div>
            </Form>
        </>
    )
}

export default Register3


