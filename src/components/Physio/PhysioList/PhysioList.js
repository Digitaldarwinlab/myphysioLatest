import { useEffect, useState } from "react";
import {Form, Button, Radio } from 'antd';
import {Typography, Row, Col, Spin, Input, Modal, Pagination, Table } from "antd";
import { searchPhysio, UpdatePhysioState } from "../../../API/Physio/PhysioRegister";
import { NavLink } from 'react-router-dom'
import { HiUserAdd } from "react-icons/hi"
import { BiEdit } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { getPhysioList } from './../../../API/Physio/PhysioRegister';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPassword } from "../../../API/userAuth/userAuth";
import { admin_password_reset } from "../../../API/userAuth/userAuth";
import FormPassword from "../../UI/antInputs/FormPassword";
import Success from "../../UtilityComponents/SuccessHandler";
import Error from "../../UtilityComponents/ErrorHandler";
import Loading from "../../UtilityComponents/Loading";
import {AiFillUnlock} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import {MailOutlined } from '@ant-design/icons'
import {FaUserNurse} from 'react-icons/fa'
import {BsSearch} from 'react-icons/bs'
import '../../../styles/Layout/Heading.css'
//let keyMapping
export let keyMapping = {
    first_name: "First Name",
    last_name: "Last Name",
    middle_name: "Middle Name",
    mobile_no: "Mobile No.",
    whatsapp_no: "Whatsapp No.",
    landline: "Landline",
    Doctor_type: "Doctor Type",
    Address_1: "Address 1",
    Address_2: "Address 2",
    Address_3: "Address 3",
    city: "City",
    state: "State",
    country: "Country",
    email: "Email",
    facebook: "Facebook",
    linkedin: "Linkedin",
    regd_no_1: "Regd No. 1",
    degree: "Degree",
    expertise_1: "Expertise 1",
    expertise_2: "Expertise 2",
    expertise_3: "Expertise 3",
    start_date: "Start Date",
    gender: "Gender"
};
const { Search } = Input;
const PhysioList = () => {
    const { Title } = Typography;
    const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [currentphysio,Setcurrentphysio]=useState([])
    const [physios, setPhysios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [buttondisable,Setbuttondiable]=useState(false)
    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [passwordmodal,Setpasswordmodal]=useState(false)
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [temp_uid,Settemp_uid]=useState(null)
    const [form]=Form.useForm()
    const [paginationState, setPaginationState] = useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 10
    });

    useEffect(() => {
        async function getPhysioData() {
            setLoading(true);
            const data = await getPhysioList();
            setLoading(false);
            setPhysios(data);
            setPaginationState({
                ...paginationState,
                totalPage: data.length / paginationState.pageSize,
                minIndex: 0,
                maxIndex: paginationState.pageSize,
            })
        }
        getPhysioData();
 
    }, []);

    useEffect(()=>{
        console.log(visible+' visible')
    },[visible])
  
    //Search Result
    const onSearch = async (e) => {
        let val=e.target.value
        setLoading(true);
        const searchedData = await searchPhysio(val);
        setPhysios(searchedData);
        setLoading(false);
        setPaginationState({
            ...paginationState,
            totalPage: searchedData.length / paginationState.pageSize,
            minIndex: 0,
            maxIndex: paginationState.pageSize,
        })
    }
    //View
    const handleView = (val) => {
        let tempData = [];
        let keys = Object.keys(val);
        let index = 0;
        keys.forEach(key => {
            if (!(["end_date", "status_flag", "roleId", "isLoading", "success", "pp_pm_id"].includes(key))) {
                if (key === "start_date") {
                    tempData.push({
                        key: index,
                        Field: "Start Date",
                        Value: new Date(val.start_date).toISOString().slice(0, 10)
                    });
                    index += 1;
                } else if (key === "Doctor_type") {
                    tempData.push({
                        key: index,
                        Field: "Doctor Type",
                        Value: val.Doctor_type === 1 ? "Treating Doctor" : val.Doctor_type === 2 ? "Referring Doctor" : "Both (Treating And Referring Doctor)"
                    });
                    index += 1;
                } else if (val[key] !== null && val[key] !== "NULL" && (val[key] !== "")) {
                    tempData.push({
                        key: index,
                        Field: keyMapping[key],
                        Value: val[key]
                    });
                    index += 1;
                }
            }
        });
        setData(tempData);
       console.log(val)
        setVisible(true);
    }
    // Edit
   
   const Sendpasswordemail=async (uid)=>{
    const confirm=window.confirm('Send a Password Reset Link to user?')
    if(confirm)
    {
        Setbuttondiable(true)
          console.log(uid)
        const result = await forgotPassword(uid);
        setLoading(false);
        if (result && result[0]) {
            console.log("An email has been sent on your registered mail-Id for further process.");
            setSuccess('"An email has been sent on the registered mail-Id."')
          
            setTimeout(()=>{
                setSuccess('')
            },3000)
            
        } else {
            setError(result[1]);
        }
    }
        
     
    }
      
    function showmodal(value)
    {   setSuccess("");
        Setbuttondiable(false)
        Setpasswordmodal(true)
        Settemp_uid(value)
       
    }
    const handleSubmitForm = async (tempo) =>{
        let userid=localStorage.getItem('userId')
        var format =  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
       const is_special=format.test(new_password)
        
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
            console.log(result)
            if (result && result[0]) {
                setSuccess("Password Changed Successfully Done.");
                try{
                    form.resetFields()
                }
                catch{
                    console.log('not resetting')
                }
                Settemp_uid(0)
                          
                
                
            } else {
                setError(result[1]);
                console.log(result[1])
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
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
                <Row justify="end">
                    <Col>
                    <Button className="flex-end" size={'medium'}  icon={<MailOutlined  style={{fontSize: '20px'}} />} disabled={buttondisable} style={{marginBottom:'10px',marginTop:'5px',backgroundColor:buttondisable ? 'white' : 'red',borderRadius:'5px'}} onClick={()=>Sendpasswordemail(temp_uid)}></Button>
                    </Col>
                </Row>

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
                        <Button type="primary"  htmlType="submit" className="userAuthbtn">
                            Change Password
                        </Button>
                        </center>
                    </Form.Item>
                </Form>   
    </Modal>
        )
    }
    const handleEdit = (val) => {
        UpdatePhysioState(val, dispatch);
        history.push("/physio/update");
    }
    //PhysioInfo
    const ShowPhysioInfo = () => {
        return (
            <Modal
                visible={visible}
                footer={null}
                closable
                onCancel={() => setVisible(false)}
                title=""
                centered
            >
                <Table pagination={false}
                    scroll={{ y: 400 }}
                    showHeader={false}
                    columns={[{ title: "Field", dataIndex: "Field", render: (text) => <p className="fw-bold">{text}</p> },
                    { title: "Value", dataIndex: "Value" }]} dataSource={data} />
            </Modal>
        )
    }


    //Page change
    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: physios.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }
   
    // 
    //Rendered Part
    return (
        <>
            <div style={{ minHeight: "20px" }}></div>
            <div className="top-bar" id="top-bar">
                <div>
                <h1 className="page-heading" id="page-heading" ><i className="fas fa-user-md" /><b> Physiotherapist</b></h1>
                </div>
                <div>
        
                <NavLink  title="Add Physio" to="/physio/register" className="text-blue navlink" id="navlink">
                <i  className="fas fa-user-md"  />  New Physio 
                </NavLink>
            </div>

            </div>
            
            <BsSearch style={{position:'relative',top:'0px',left:'10px',zIndex:'2'}} />
            <input
                type="search"
                               
                className="px-4 py-2 input-field my-3"
                style={{width:'40%',right:'15px',position:"relative"}}
                placeholder="Seacrh Physio.."
                onChange={onSearch}
                
                loading={loading}
                
            />
            <Row className="bg-search text-center" justify="space-around">
                {["Physio Code", "Given Name", "Mobile No", "Actions"].map((val, key) => {
                    return (
                        <Col lg={key === 4 ? 4 : 5} md={key === 4 ? 4 : 5} sm={key === 4 ? 4 : 5} xs={key === 4 ? 4 : 5} key={key} className="p-2">
                            <h5>{val}</h5>
                        </Col>
                    )
                })}
            </Row>
            {loading &&
                <div className="mt-2 text-center">
                    <Spin tip="Searching Physio..." size="large">
                    </Spin>
                </div>
            }
            {
                !loading && physios.length === 0 &&
                <div className="mt-2 text-center">
                    <p className="p">No Physio Found....</p>
                </div>
            }
            {(physios.length !== 0 && !loading) &&
                physios.map((val, key) => key >= paginationState.minIndex && key < paginationState.maxIndex && (
                    <Row className="PhysiotherapistList  text-center" justify="space-around"  key={val.pp_pm_id}>
                        <Col md={4} lg={4} sm={4} xs={4}>
                            <p>{val.pp_pm_id}</p>
                        </Col>

                        <Col  md={4} lg={4} sm={4} xs={4}>
                            <p >{val.first_name[0].toUpperCase() + val.first_name.slice(1).toLowerCase() +' ' +val.last_name.slice(0).toLowerCase() }</p>
                        </Col>

                        <Col md={4} lg={4} sm={4} xs={4}><p>{val.mobile_no}</p></Col>

                        <Col md={4} lg={4} sm={4} xs={4}>
                            <BsFillEyeFill className=" me-1 action-icon" id="action-icon" title="View" onClick={() => handleView(val)} />
                            <BiEdit className="  me-1 action-icon" id="action-icon" title="Edit" onClick={() => handleEdit(val)} />
                            <AiFillUnlock className=" me-1 action-icon" id="action-icon"  title="Reset Password" onClick={()=>showmodal(val.uid)} />                         
                        </Col>
                    </Row>
                ))
            }
            <Pagination className="text-center"
                pageSize={paginationState.pageSize}
                current={paginationState.current}
                total={physios.length}
                showSizeChanger
                onChange={PaginationChange}
                style={{marginTop:'3%'}}
            />
            {ShowPhysioInfo()}
            {show_password_modal()}
        </>
    )
}
export default PhysioList;