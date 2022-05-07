
        // axios.get(process.env.REACT_APP_API+"/org_list/").then(res => setOrganization(res.data)).catch(err => console.log(err));

        import { useEffect, useState } from "react";
        import {Form, Button, Radio } from 'antd';
        import {Typography, Row, Col, Spin, Input, Modal, Pagination, Table ,Space} from "antd";
        // import { searchPhysio, UpdatePhysioState } from "../../API/Physio/PhysioRegister";
        import { NavLink } from 'react-router-dom'
        import { BsFillEyeFill } from "react-icons/bs";
        import { useDispatch } from 'react-redux';
        import { BiEdit } from "react-icons/bi";
        import { useHistory } from 'react-router-dom';
        import { forgotPassword, getUserData } from "../../API/userAuth/userAuth";
        import { admin_password_reset } from "../../API/userAuth/userAuth";
        import FormPassword from "../UI/antInputs/FormPassword";
        import Success from "../UtilityComponents/SuccessHandler";
        import Error from "../UtilityComponents/ErrorHandler";
        import Loading from "../UtilityComponents/Loading";
        import {MailOutlined } from '@ant-design/icons'
        import { searchOrganizations } from "../../API/Enterprise/Enterprise";
        import '../../styles/Layout/Heading.css';
        import {getClinicDetails} from "../../API/Physio/ClinicRegister";
        import axios from "axios";
        import { CLINIC_STATE_CHANGE } from "../../contextStore/actions/ClinicRegister";
import { set } from "js-cookie";
        //let keyMapping
         let keyMapping = {
            pp_org_id:"Organization Code",
            org_name:"Organization Name",
            org_short_name:"Organization Short Name",
            contact_email:"Email",
            mobile_no: "Mobile No.",
            whatsapp_no: "Whatsapp No.",
            Landline_no: "Landline No",
           
            Address_1: "Address 1",
            Address_2: "Address 2",
            Address_3: "Address 3",
            city: "City",
            state: "State",
            country: "Country",
            
            facebook: "Facebook",
            linkedin: "Linkedin",
           
           
            // last_update_date:"Last Update Date",
            // last_update_by:"Last Update by",
            
        };
        // const { Search } = Input;
        const PhysioList = () => {
            const { Title } = Typography;
            const [new_password, setNewPassword] = useState("");
            const [confirm_password, setConfirmPassword] = useState("");
            const [organization, setOrganization] = useState([]);
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
            const [search, SetSearch] = useState('');
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
                async function getOrganization() {
                    setLoading(true);
                   axios.get(process.env.REACT_APP_API+"/org_list/").then(res => {  setLoading(false);
                    setOrganization(res.data);
                    setPaginationState({
                        ...paginationState,
                        totalPage: data.length / paginationState.pageSize,
                        minIndex: 0,
                        maxIndex: paginationState.pageSize,
                    })}).catch(err => console.log(err));

                  
                }
                getOrganization();
         
            }, []);
        
            useEffect(()=>{
                // console.log(visible+' visible')
            },[visible])
          
            //Search Result
            const onSearch =  async (e) => {
                let val=e.target.value
             setLoading(true);
                const searchedData = await searchOrganizations(val);
              if(searchedData.message){
                   setOrganization([]);
                setLoading(false);
                setPaginationState({
                    ...paginationState,
                    totalPage: 0 / paginationState.pageSize,
                    minIndex: 0,
                    maxIndex: paginationState.pageSize,
                })
              } else {
                setOrganization(searchedData);
                setLoading(false);
                setPaginationState({
                    ...paginationState,
                    totalPage: searchedData.length / paginationState.pageSize,
                    minIndex: 0,
                    maxIndex: paginationState.pageSize,
                })
              }
                
            }
            //View
            const handleView = (val) => {
                let tempData = [];
                let keys = Object.keys(val);
                let index = 0;
                keys.forEach(key => {
                    if (!(["end_date", "status_flag", "roleId", "isLoading", "success", "pp_pm_id","last_update_date","last_update_by"].includes(key))) {
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
            const handleEdit = (record) => {
                console.log(record);
                if (Object.keys(record).length > 0) {
                    Object.keys(record).map((data) => {
                      if (record[data] !== null) {
                          console.log(data," ", record[data])
                          dispatch({
                            type: CLINIC_STATE_CHANGE,
                            payload: {
                              key: data,
                              value: record[data],
                            },
                          });
                      }
                    });
                  }
                history.push("/enterprise/organization/update");
            }
            //PhysioInfo
            const ShowOrganizationInfo = () => {
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
                    total: organization.length / pageSize,
                    current: page,
                    minIndex: (page - 1) * (pageSize),
                    maxIndex: page * (pageSize)
                })
            }
            let locale = {
                emptyText: 'No Organization Found',
              };
            // 
           // let columns = ["Physio Code", "Given Name", "Mobile No", "Actions"]
            const columns = [
                {
                  title: "Name",
                  dataIndex: "org_name",
                  fixed: 'left',
                  width: "20%",
                 
                },
                {
                  title: "Mobile No",
                  dataIndex: "mobile_no",
                  width: "20%",
                 
                },
                {
                  title: "Email",
                  dataIndex: "contact_email",
                  width: "20%",
                 
                },
                {
                  title: "Actions",
                  dataIndex: "address",
                  fixed:'right',
                  width: "20%",
                  render: (text, record) => (
                    <Space size="middle">
                        {console.log(record)}
                       <BsFillEyeFill onClick={() => handleView(record)} size={20} />
                      <BiEdit onClick={() => handleEdit(record)} size={20} />
                      {/* <AiFillUnlock onClick={()=>showmodal(record.uid)} size={20} /> */}
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
               <i className="fas fa-arrow-left"
                    style={{ cursor: "pointer",marginRight:"10px" }}
                    title="Go Back"
                    onClick={() => {
                      
                            history.goBack()     
                    }}
                    role="button"></i>
               <i className="fas fa-user-md" /> <b>  Organization List</b>
                            </Col>
            
                           
                    </Row>
                    <div style={{ minHeight: "20px" }}></div>
                     <Row justify="space-between">
                     <Col md={12} sm={12} xs={12}>
                <input
                             //   className="p-2 input-field my-3"
                            
                                placeholder="Search Organization.."
                                onChange={onSearch}
                            
                                loading={loading}
                                style={{width:'100%'}}
                            /> 
                            </Col>
                          
                           {getUserData()==="admin"&& <Row justify="end">
        
                            <Col md={24} sm={24} xs={24}>
        
        <NavLink to="/enterprise-register">
                 <i  className="fas fa-user-md"  />  New Organization
                 </NavLink>
         </Col>
                     </Row>}
                          
                            </Row>
                            <div style={{ minHeight: "20px" }}></div>
                            <Row>
                <Col md={24} sm={24} xs={24}>
                  <Table locale={locale} scroll={{ x: 500 }} pagination={{ pageSize: 8 }} bordered columns={columns} dataSource={organization} />
                </Col>
              </Row>
                    {ShowOrganizationInfo()}
                    {show_password_modal()}
                </>
            )
        }
        export default PhysioList;