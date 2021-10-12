import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Error from './../../UtilityComponents/ErrorHandler';
import { CLINIC_CLEAR_STATE, CLINIC_STATE_CHANGE } from './../../../contextStore/actions/ClinicRegister';
import { clinicRegisterApi } from './../../../API/Physio/ClinicRegister';
import ClinicValidation from './../../Validation/clinicValidation/clinicValidation';
import Validation from './../../Validation/authValidation/authValidation';
import { VALIDATION } from './../../../contextStore/actions/authAction';
// import apiValidation from './../../../API/apiValidation/apiValidation';
import { Typography, Row,Button,Col, Form } from 'antd';
import FormInput from './../../UI/antInputs/FormInput';
import FormTextArea from './../../UI/antInputs/FormTextArea';
import FormDate from './../../UI/antInputs/FormDate';
import Loading from './../../UtilityComponents/Loading';
import Success from './../../UtilityComponents/SuccessHandler';
import { useHistory } from 'react-router-dom';
import '../../../styles/Layout/Heading.css'
import { ItemDragging } from 'devextreme-react/list';
const { Title } = Typography;
const PhysioClinic = ()=>{
    const formRef = React.createRef();
    const [dateState,setDateState] = useState("");
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type:"NOERROR"});
    },[]);

    const handleChange = (key,value,id=0) =>{
        if(key === "estab_date"){
            setDateState(value.date);
            dispatch({
                type: CLINIC_STATE_CHANGE,
                payload:{
                    key,
                    value:value.dateString
                }
            })
        }else{
            dispatch({
                type: CLINIC_STATE_CHANGE,
                payload:{
                    key,
                    value
                }
            })
            dispatch({type:"NOERROR"});
        }
    }

    const handleBlur = (e) =>{
        const {name,value} = e.target;
        console.log(name)
        let error = {};
        if(name === "zip"){
            error = ClinicValidation.checkPinCodeValidation(value)
        }else if(name === "email"){
            error = Validation.checkEmailValidation(value);
            // let verifyEmail = apiValidation.checkEmailValid({type:"email",value:e.target.value});
            // if(!verifyEmail) dispatch({type:VALIDATION,payload:{error:"Email is already registered."}});
        }
        else if(name==='name')
        {
            error=Validation.checkNameValidation(value)
        }
        else if(name=='address_1' || name=='address_2' || name=='address_3')
        {
            error=Validation.checkAddrValidation(e.target.value)
            
        }
        else if(name=='zip')
        {
            error=Validation.checkPincodeValidation(e.target.value)
        }
        else if(name=='email')
        {
            
            error=Validation.checkEmailValidation(e.target.value)
        }
        else if(name=='website_url')
        {
            
            error=Validation.isValidURL(e.target.value)
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
          
        
    }

    const handleSubmit = (value) =>{
        let error
        if(Validation.checkNameValidation(value.name))
        {
            error=Validation.checkNameValidation(value.name)
            
            
          
        }else if(Validation.checkAddrValidation(value.address_1) || Validation.checkAddrValidation(value.address_2) || Validation.checkAddrValidation(value.address_3))
        {
            error=Validation.checkAddrValidation(value.address_1) || Validation.checkAddrValidation(value.address_2) || Validation.checkAddrValidation(value.address_3)
        }
        else if(Validation.checkPincodeValidation(value.zip))
        {
            error= Validation.checkPincodeValidation(value.zip)
        }

        else if(Validation.checkEmailValidation(value.email))
        {
            error=Validation.checkEmailValidation(value.email)
        }

        else if(Validation.isValidURL(value.url))
        {
            error=Validation.isValidURL(value.url)
        }
    if(error.error)
    {
        dispatch({ type: VALIDATION, payload: { error: error.error } });
        return false
    }

    else if(state.Validation.error)
    {
        alert("please check all the fields")
        return false
    }
      //  const checkError = state.Validation.error;
        if(error.error){
            alert("please check all the fields")
        }
        else {
            clinicRegisterApi(state.clinicReg,dispatch);
        }
    }

    const handleNameAndWebsite = (htmlfor,title,type,place,value) => {
        return (
            <FormInput label={<span style={{fontSize:'18px',fontWeight:'600'}}>{title}</span>}
            className="input-field"
                name={htmlfor}
                placeholder={place}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                required={true}
            />
        )
    }
    const handleReset = () => {
        if(window.confirm("Confirm, Do you want to clear form?")){
            dispatch({type:CLINIC_CLEAR_STATE});
            formRef.current.resetFields();
        }
    }
    return(
        <>  
           <div style={{ minHeight: "20px" }}></div>
                 <h1 className="page-heading" id="page-heading" ><i className="fas fa-clinic-medical" style={{fontSize:'28px'}}></i> <b> Clinic Registeration </b></h1>
                 {state.Validation.error && (<Error error={state.Validation.error} />)}
                {state.clinicReg.isLoading && (<Loading />)} 
                {state.clinicReg.success && (<Success success = {state.clinicReg.success}/>)}
            <Form style={{marginTop:'40px',marginLeft:'1%'}} onFinish={handleSubmit} ref={formRef} layout="vertical">
                <div className="border p-4 mb-4">
                    <Row gutter={[20,20]}>
                        <Col span={24}>
                            {handleNameAndWebsite("name","Name","text","Clinic Name",state.clinicReg.name)}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormTextArea name="address_1" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Address 1'}</span>}
                                value={state.clinicReg.address_1}
                                placeholder="Address 1" 
                                className="input-field"
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormTextArea name="address_2" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Address 2'}</span>}
                            value={state.clinicReg.address_2}
                            placeholder="Address 2" 
                            className="input-field"
                            onChange={handleChange}
                            onBlur = {handleBlur} 
                            required={false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormTextArea name="address_3" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Address 3'}</span>}
                            value={state.clinicReg.address_3}
                            placeholder="Address 3" 
                            className="input-field"
                            onChange={handleChange}
                            onBlur = {handleBlur} 
                            required={false}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[20,20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="zip" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Pin Code'}</span>}
                                value={state.clinicReg.zip}
                                placeholder="Pin Code" 
                                onChange={handleChange}
                                className="input-field"
                                onBlur = {handleBlur} 
                                required={true}
                            /> 
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="city" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'City'}</span>}
                                className="input-field"
                                value={state.clinicReg.city}
                                placeholder="City" 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="state" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'State'}</span>}
                                value={state.clinicReg.state}
                                placeholder="State" 
                                onChange={handleChange}
                                className="input-field"
                                onBlur = {handleBlur} 
                                required="true"
                            /> 
                        </Col>
                    </Row>
                
                    <Row gutter={[20,20]}>
                         <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="country" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Country'}</span>}
                                value={state.clinicReg.country}
                                placeholder="Country" 
                                onChange={handleChange}
                                className="input-field"
                                onBlur = {handleBlur} 
                                required={true}
                            />
                         </Col>
                         <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="mobile_no" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Mobile No'}</span>}
                                value={state.clinicReg.mobile_no}
                                className="input-field"
                                placeholder="Mobile No." 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            />
                         </Col>
                         <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="whatsapp_no" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Whatsapp No.'}</span>}
                                className="input-field"
                                value={state.clinicReg.whatsapp_no}
                                placeholder="Whatsapp No" 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            />
                         </Col>
                    </Row>

                    <Row gutter={[20,20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="landline_no" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Landline No'}</span>}
                                className="input-field"
                                value={state.clinicReg.landline_no}
                                placeholder="Landline No." 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required={false}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormDate name="estab_date" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'Estb Date'}</span>}
                                className="input-field"
                                value={dateState}
                                placeholder="Estb date" 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="email" label={<span style={{fontSize:'18px',fontWeight:'600'}}>{'E-mail'}</span>}
                            className="input-field"
                                value={state.clinicReg.email}
                                placeholder="Email" 
                                onChange={handleChange}
                                onBlur = {handleBlur} 
                                required="true"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                        {handleNameAndWebsite("website_url","Website Url","text","Website Url",state.clinicReg.website_url)}
                        </Col>
                    </Row>
                </div>
              
                <div className="text-end">
                    <Button className=" m-2"  style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}} htmlType="submit">Submit</Button>
                    <Button className="btncolor m-2" onClick={handleReset}>Reset</Button>
                </div>
            </Form>
        </> 
    )
}
export default PhysioClinic;