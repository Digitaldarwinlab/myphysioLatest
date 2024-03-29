import { useEffect, useState } from "react";
import {Form, Button, Radio } from 'antd';
import {Typography, Row, Col, Spin, Input, Modal, Pagination, Table ,Space} from "antd";
import { searchPhysio, UpdatePhysioState } from "../../../API/Physio/PhysioRegister";
import { NavLink } from 'react-router-dom'
import { HiUserAdd } from "react-icons/hi"
import { BiEdit } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { getPhysioList } from './../../../API/Physio/PhysioRegister';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPassword, getUserData } from "../../../API/userAuth/userAuth";
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
import '../../../styles/Layout/Heading.css';
import {getClinicDetails} from "../../../API/Physio/ClinicRegister"
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
    gender: "Gender",
    clinic: "Clinic",
    uid:'User id',
    clinic_code : 'Clinic Code',
    zip:'Zip',
    estab_date : 'Establishment Date',
    landline_no : 'Landline',
    website_url : 'Website'
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


    useEffect(async() => {
const data = getClinicDetails(10);
console.log(data);
    },[])

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
        // console.log(visible+' visible')
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
        console.log(val)
        let tempData = [];
        let keys = Object.keys(val);
        let index = 0;
        keys.forEach(key => {
            if (!(["end_date", "status_flag", "roleId", "isLoading", "success", "pp_pm_id" ,"full_name"].includes(key))) {
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
                }else if (key ==="isHeadPhysio"){
                    tempData.push({
                        key: index,
                        Field: "Head Physio",
                        Value: val.isHeadPhysio?"Yes":"No"
                    });
                    index += 1;
                }else if (val[key] !== null && val[key] !== "NULL" && (val[key] !== "")) {
                    tempData.push({
                        key: index,
                        Field: keyMapping[key],
                        Value: val[key]
                    });
                    index += 1;
                }
            }
        });
        console.log(tempData)
        setData(tempData);
       // console.log(val)
        setVisible(true);
    }
    // Edit
   
   const Sendpasswordemail=async (uid)=>{
    const confirm=window.confirm('Send a Password Reset Link to user?')
    if(confirm)
    {
        Setbuttondiable(true)
          // console.log(uid)
        const result = await forgotPassword(uid);
        setLoading(false);
        if (result && result[0]) {
            // console.log("An email has been sent on your registered mail-Id for further process.");
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
            // console.log(result)
            if (result && result[0]) {
                setSuccess("Password Changed Successfully Done.");
                setTimeout(() => {
                    Setpasswordmodal(false)
                }, 1500);
                try{
                    form.resetFields()
                }
                catch{
                    // console.log('not resetting')
                }
                Settemp_uid(0)
                          
                
                
            } else {
                setError(result[1]);
                // console.log(result[1])
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
                    <center>
                        <Button type="primary" htmlType="submit" size='large'
                        style={{margin:'10px'}}
                        //className="userAuthFRGTbtn"
                        >
                            Change Password
                        </Button>
                        </center>
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
    let locale = {
        emptyText: 'No Physio Found',
      };
    // 
   // let columns = ["Physio Code", "Given Name", "Mobile No", "Actions"]
    const columns = [
        {
          title: "Name",
          dataIndex: "full_name",
          fixed: 'left',
          width: "20%",
         
        },
        {
          title: "Physio Code",
          dataIndex: "pp_pm_id",
          width: "20%",
         
        },
        {
          title: "Mobile No",
          dataIndex: "mobile_no",
          width: "20%",
         
        },
        {
          title: "Actions",
          dataIndex: "address",
          fixed:'right',
          width: "20%",
          render: (text, record) => (
            <Space size="middle">
               <BsFillEyeFill onClick={() => handleView(record)} size={20} />
              <BiEdit onClick={() => handleEdit(record)} size={20} />
              <AiFillUnlock onClick={()=>showmodal(record.uid)} size={20} />
            </Space>
          )
        }
      ];
    //Rendered Part
    return (
        
        <>
             <div style={{ minHeight: "20px" }}></div>
            <Row justify='space-between'>          
       <Col  style={{fontSize:"25px"}} span={16}>
       <i className="fas fa-user-md" /> <b>  Physiotherapist</b>
                    </Col>
    
                   
            </Row>
            <div style={{ minHeight: "20px" }}></div>
             <Row justify="space-between">
             <Col md={12} sm={12} xs={12}>
        <input
                     //   className="p-2 input-field my-3"
                    
                        placeholder="Search Physio.."
                        onChange={onSearch}
                    
                        loading={loading}
                        style={{width:'100%'}}
                    /> 
                    </Col>
                  
                   {getUserData()==="admin"&& <Row justify="end">

                    <Col md={24} sm={24} xs={24}>

<NavLink to="/physio/register">
         <i  className="fas fa-user-md"  />  New Physio 
         </NavLink>
 </Col>
             </Row>}
                  
                    </Row>
                    <div style={{ minHeight: "20px" }}></div>
                    <Row>
        <Col className="pag_large" md={24} sm={24} xs={24}>
          <Table locale={locale} scroll={{ x: 500 }} pagination={{ pageSize: 8}} bordered columns={columns} dataSource={physios} />
        </Col>
        <Col style={{display:'none'}} className="pag_mob" md={24} sm={24} xs={24}>
          <Table locale={locale} scroll={{ x: 500 }} pagination={{ pageSize: 8,size: "small" }} bordered columns={columns} dataSource={physios} />
        </Col>
      </Row>
            {ShowPhysioInfo()}
            {show_password_modal()}
        </>
    )
}
export default PhysioList;