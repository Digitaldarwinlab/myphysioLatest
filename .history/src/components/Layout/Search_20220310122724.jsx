/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import React, { useState, useEffect } from 'react';
import Phead from "../Layout/PatientSearch/PatientHead";
import PatDetails from '../Layout/PatientSearch/PatDetails';
import {Typography, Row, Col, Input, Pagination,Button ,Modal,Form} from "antd"
import "./../../styles/Layout/Search.css"
import { getPatientList, searchPatient } from '../../API/PatientRegistration/Patient';
import { BiEdit } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { BsFillEyeFill } from "react-icons/bs";
import { FaKey} from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UpdateState } from './../../API/PatientRegistration/Patient';
import { EPISODE_STATECHANGE } from './../../contextStore/actions/episode';
import { forgotPassword } from '../../API/userAuth/userAuth';
import { postNewPassword } from '../../API/userAuth/userAuth';
import FormPassword from '../UI/antInputs/FormPassword';
import FormInput from '../UI/antInputs/FormInput';
import Success from '../UtilityComponents/SuccessHandler';
import Error from '../UtilityComponents/ErrorHandler';
import Loading from '../UtilityComponents/Loading';
import { admin_password_reset } from '../../API/userAuth/userAuth';
import {AiFillUnlock} from 'react-icons/ai'
import {MailOutlined } from '@ant-design/icons'
import {BsSearch} from 'react-icons/bs'
import '../../styles/Layout/Heading.css'

import { HiUserAdd } from 'react-icons/hi';
import { Item } from 'rc-menu';
const { Search } = Input;

const SearchPatient = () => {


    const {Title}=Typography
    const [patientData, setPatientData] = useState([]);
    const [searchvalue,Setsearchvalue]=useState('')    
    const state = useSelector(state => state.basicDetailsInitialState);
    const dispatch = useDispatch();
    const history = useHistory();
     const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [otp,setOTP] = useState('');
    const [physios, setPhysios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" } 
    const [passwordmodal,Setpasswordmodal]=useState(false)
    const [authorizeModal,setAuthorizeModal] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [temp_uid,Settemp_uid]=useState(0)
    const [refresh,Setrefresh]=useState(false)
    const [paginationState, setPaginationState] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 10
    });
    const [form] = Form.useForm();
    const [buttondisable,Setbuttondiable]=useState(false)
    useEffect(async () => {
        const data = await getPatientList();
        setPatientData(data);
        //  console.log(patientData)
        setPaginationState({
            ...paginationState,
            totalPage: data.length / paginationState.pageSize,
            minIndex: 0,
            maxIndex: paginationState.pageSize,
        });
    }, [refresh]);
   // console.log(patientData)
    function Pahead(val) {
        return (
            <PatDetails title={val.title} />
        );
    }
    // console.log(patientData)

    const onSearch = async (value) => {
     //  console.log(value.target.value)
     Setsearchvalue(value.target.value)
        setLoading(true);
        const searchedData = await searchPatient(value.target.value);
        setPatientData(searchedData);
        setLoading(false);
        setPaginationState({
            ...paginationState,
            totalPage: searchedData.length / paginationState.pageSize,
            minIndex: 0,
            maxIndex: paginationState.pageSize,
        });
    }
    //Authorize
    const handleAuthorizeClick = (item) => {
        showAuthorizemodal(item.uid)
        console.log('patientData:',item)
    }

    function showAuthorizemodal(e)
    {   // console.log(e)
       Settemp_uid(e)
       setAuthorizeModal(true)
        Setbuttondiable(false)
    }

    const handleAuhtorizationSubmit = async (event) => {
        setLoading(true)
        if (otp.length !== 6) {
            setLoading(false);
            setError("Enter");
            setTimeout(() => {
                setError("");
            }, 3000);
        
    }
    const show_Authorize_Modal=()=>
    {   
        return(
        <Modal
        visible={authorizeModal}
        footer={null}
        closable
        onCancel={() => setAuthorizeModal(false)}
        title="Authorization"
        centered
    >
        {error && <Error error={error} />}
                {success && <Success success={success} />}
          {/* <Button  size={'medium'}  icon={<MailOutlined  style={{fontSize: '20px'}} />} style={{marginBottom:'10px',marginTop:'5px',backgroundColor:buttondisable ? 'white' : 'red',borderRadius:'5px'}} disabled={buttondisable}  onClick={()=>Sendpasswordemail(temp_uid)}></Button> */}

        <Form form={form} autoComplete="off" onFinish={handleAuhtorizationSubmit} layout="vertical">
        {loading && <Loading />}
                
                
                    
                    <FormInput
                        className="formInput"
                        label={"Enter OTP"}
                        placeholder={"Enter OTP"}
                        value={otp}
                        name={"otp"}
                        onChange={(key, value, id) => setOTP(value)}
                        required={true}
                    />
                    
                        <center>
                        <Button type="primary" htmlType="submit" className="userAuthbtn">
                           Verify OTP
                        </Button>
                        </center>
                  
                  
                        <center>
                        <Button type="primary" htmlType="button" className="userAuthbtn" onClick={()=>{}}>
                           Resend OTP
                        </Button>
                        </center>
                   
                </Form>   
    </Modal>
        )
    }

    //View 
    const handleView = (val) => {
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "patient_code",
                value: val.pp_patm_id
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "patient_main_code",
                value: val.patient_code
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "patient_name",
                value: val.first_name + " " + val.last_name
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE, payload: {
                key: "Patient_no",
                value: val.mobile_no
            }
        });
        history.push("/episode");
    }
    //Edit 
    const handleEdit = (val) => {
        // console.log(val)
        UpdateState(state, val, dispatch);
        history.push("/pateints/update");
    }
    const handleSubmitForm = async () =>{
        var format =  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
       const is_special=format.test(new_password)
        let userid=localStorage.getItem('userId')
        setLoading(true);
        if (new_password === "" || confirm_password === "") {
            setLoading(false);
            setError("Please Fill all the fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
        } else if (new_password !== confirm_password) {
            setLoading(false);
            setError("New And Confirm Password Doesn't match.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else if(new_password.length<8)
        {
            setLoading(false);
            setError("Password Should be atleaset 8 digits long");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else if(is_special==false)
        {
            setLoading(false);
            setError("Password Should contain atleast one special character");
                
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        
        else if(new_password[0]!=new_password[0].toUpperCase())
        {  
            setLoading(false);
            setError("First Letter should be in uppercase")
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else {
            let result = await admin_password_reset({userid ,temp_uid, new_password });
            setLoading(false);
            if (result && result[0]) {
                setSuccess("Password Changed Successfully Done.");
               try{
                   form.resetFields()
               }
               catch{
                   // console.log('not resetting')
               }
                setTimeout(()=>{
                    setSuccess('')
                    
                },5000)
                
            } else {
                setError(result[1]);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    }

  
    function showmodal(e)
    {   // console.log(e)
       Settemp_uid(e)
       Setpasswordmodal(true)
        Setbuttondiable(false)
    }



    const show_password_modal=()=>
    {   
        return(
        <Modal
        visible={passwordmodal}
        footer={null}
        closable
        onCancel={() => Setpasswordmodal(false)}
        title="Set New Password"
        centered
    >
        {error && <Error error={error} />}
                {success && <Success success={success} />}
          <Button  size={'medium'}  icon={<MailOutlined  style={{fontSize: '20px'}} />} style={{marginBottom:'10px',marginTop:'5px',backgroundColor:buttondisable ? 'white' : 'red',borderRadius:'5px'}} disabled={buttondisable}  onClick={()=>Sendpasswordemail(temp_uid)}></Button>

        <Form form={form} autoComplete="off" onFinish={handleSubmitForm} layout="vertical">
        {loading && <Loading />}
                
                
                    <FormPassword
                        className="formInput"
                        label={"Password"}
                        placeholder={"Enter New Password"}
                        value={new_password}
                        name={"new_password"}
                        onChange={(key, value, id) => setNewPassword(value)}
                        required={true}
                    />
                    <FormPassword
                        className="formInput"
                        label={"Confirm Password"}
                        placeholder={"Enter Confirm Password"}
                        value={confirm_password}
                        name={"confirm_password"}
                        onChange={(key, value, id) => setConfirmPassword(value)}
                        required={true}
                    />
                    <Form.Item>
                        <center>
                        <Button type="primary" htmlType="submit" className="userAuthbtn">
                            Change Password
                        </Button>
                        </center>
                    </Form.Item>
                </Form>   
    </Modal>
        )
    }
    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: patientData.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }
    const Sendpasswordemail=async (uid)=>
    {   
           const confirm=window.confirm('Send a Password Reset Link to user?')
           if(confirm)
           {
        //    console.log(uid)
            Setbuttondiable(true)
            const result = await forgotPassword(uid);
            setLoading(false);
            if (result && result[0]) {
                // console.log("An email has been sent on your registered mail-Id for further process.");
                setSuccess("An email has been sent on your registered mail-Id for further process.")
                setTimeout(()=>{
                    
                    setSuccess('')
                },3000)
    
    
                
            } else {
                setError(result[1]);
            }
           }
        
        
    }
    return (
        <>
               <div style={{ minHeight: "0px" }}></div>
            <Row justify="space-between" style={{marginBottom:'15px'}}>
                <Col>
                <h3 className="page-heading" id="page-heading"> 
                    <i className="fa fa-users"></i><b> Patients</b>
                </h3>

                </Col> 
                <Col>
                <h4 className="text-end">
                    <NavLink to="pateints/new" className="navlink">
                        New Patient <HiUserAdd size={20} style={{position:'relative',top:'0px'}} />
                    </NavLink>
                </h4>
                </Col>
            </Row>

            <Form className="p-2"  autoComplete="off" layout="vertical" name="control-hooks">
                <div className="PatientsListing">
    
                <input
                        className="p-2 input-field my-3"
                    
                        placeholder="Search Patient.."
                        onChange={onSearch}
                    
                        loading={loading}
                        style={{width:'40%'}}
                    />
                    <Row className="bg-search text-center" justify="space-around">
                        {Phead.map(Pahead)}
                    </Row>

                    {
                        patientData.length === 0
                            ?  
                                <div className="mt-2 text-center">
                                    <p className="p">No Patient Found....</p>
                                </div>
                            : 
                                <div>
                                    {
                                        
                                                                    
                                        patientData.map((item,index) =>{
                                        if(index >= paginationState.minIndex && index < paginationState.maxIndex)
                                            return (
                                                <Row  justify="space-around" className="text-center">
                                                    <Col md={4} lg={4} sm={4} xs={4}><p>{item.patient_code}</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>{item.first_name} {' '} {item.last_name} </p></Col>



                                                        <Col md={4} lg={4} sm={4} xs={4}> <p> <p>{item.dob}</p></p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>{item.mobile_no}</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}>
                                                            <BsFillEyeFill className="iconClass3 me-1" title="View" onClick={() => handleView(item)} />
                                                            <BiEdit className="iconClass3 me-1" title="Edit" onClick={() => handleEdit(item)} />
                                                        {userInfo.role=='admin' ? <AiFillUnlock className="iconClass3 me-1" size={25} onClick={()=>showmodal(item.uid)} />   : null} 
                                                      <FaKey onClick={() => handleAuthorizeClick(item)}/>
                                                        </Col>
                                                </Row>
                                            )

                                        })
                                        
                                    }
                                </div>
                    }
                    { searchvalue=='' && patientData.length !== 0 && <Pagination
                    className="text-center" style={{marginTop:'2%'}}
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={patientData.length}
                    
                        onChange={PaginationChange}
                    />}
                    {show_password_modal()}
                    {show_Authorize_Modal()}
                </div>
            </Form>
        </>
    )
}

export default SearchPatient;
