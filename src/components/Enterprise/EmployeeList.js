import { Typography, Row, Col, Input, Pagination, Button, Modal, Form, Space, Table } from "antd"
import { BsFillEyeFill } from "react-icons/bs";
import Loading from '../UtilityComponents/Loading';
import FormPassword from '../UI/antInputs/FormPassword';
import { NavLink } from 'react-router-dom';
import { admin_password_reset_ep } from "../../API/userAuth/userAuth";
import { useState, useEffect } from "react";
import { forgotPassword, getUserData } from "../../API/userAuth/userAuth";
import axios from "axios";
import { EPISODE_STATECHANGE } from './../../contextStore/actions/episode';
import Error from '../UtilityComponents/ErrorHandler';
import Success from "../UtilityComponents/SuccessHandler";
import { BiEdit } from "react-icons/bi";
import { getClinicDetails } from "../../API/Physio/ClinicRegister";
import { MailOutlined } from '@ant-design/icons';
import { AiFillUnlock } from 'react-icons/ai';
import { UpdateStateEmp } from "../../API/Enterprise/Enterprise";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchOrganizations } from "../../API/Enterprise/Enterprise";
import "./EmployeeList.css";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state.basicDetailsInitialState);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [temp_uid, Settemp_uid] = useState(0);
  const [passwordmodal, Setpasswordmodal] = useState(false);
  const [buttondisable, Setbuttondiable] = useState(false);
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [org, setOrg] = useState('');
  const [error1, setError1] = useState("");
  const [success, setSuccess] = useState("");
  const [form] = Form.useForm();
  const [paginationState, setPaginationState] = useState({
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    pageSize: 10
});

  let keyMapping = {
    "pp_em_id": "Employee Id",
    "first_name": "First Name",
    "middle_name": "Middle Name",
    "last_name": "Last Name",
    "dob": "Date of Birth",
    "patient_code": "Employee Code",
    "Address_1": "Address",
    "Address_2": "",
    "Address_3": "",
    "city": "City",
    "state": "State",
    "country": "Country",
    "pin": "Pin Code",
    "gender": "Gender",
    "mobile_no": "Mobile No",
    "whatsapp_no": "Whatsapp No",
    "landline": "Landline No",
    "email": "Email",
    "employee_code":"Employee Code",
    "facebook": "FAcebook",
    "linkedlin": "LinkedIn",
    "emergence_contact": "Emergency Contact No",
    "blood_group": "Blood Group",
    "allergy_detail": "Allergy Details",
    "patient_medical_history": "Medical History",
    "patient_Family_History": "Family History",
    "status_flag": "Status Flag",
    "last_update_date": "Last Update Date",
    "last_update_by": "Last Update By",
    "pp_pm": "PP PM",
    "pp_org": "Organization Code"

  };

  let locale = {
    emptyText: 'No Employee Found Please search for Organization',
  };

  function showmodal(e) {
    console.log(e)
    Settemp_uid(e)
    Setpasswordmodal(true)
    Setbuttondiable(false)
  }

  const show_password_modal = () => {
    return (
      <Modal
        visible={passwordmodal}
        footer={null}
        closable
        onCancel={() => Setpasswordmodal(false)}
        title="Set New Password"
        centered
      >
        {error1 && <Error error={error1} />}
        {success && <Success success={success} />}
        <Button size={'medium'} icon={<MailOutlined style={{ fontSize: '20px' }} />} style={{ marginBottom: '10px', marginTop: '5px', backgroundColor: buttondisable ? 'white' : 'red', borderRadius: '5px' }} disabled={buttondisable} onClick={() => Sendpasswordemail(temp_uid)}></Button>

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

  const handleEdit = (val) => {
    console.log(val)
    UpdateStateEmp(state, val, dispatch);
    history.push("/enterprise/employee/update");
  }

  const handleSubmitForm = async () => {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const is_special = format.test(new_password)
    let userid = localStorage.getItem('userId')
    setLoading(true);
    if (new_password === "" || confirm_password === "") {
      setLoading(false);
      setError1("Please Fill all the fields.");
      console.log("Eror")
      setTimeout(() => {
        setError1("");
      }, 3000);
    } else if (new_password !== confirm_password) {
      setLoading(false);
      setError1("New And Confirm Password Doesn't match.");
      console.log(error1)
      setTimeout(() => {
        setError1("");
      }, 3000);
    }
    else if (new_password.length < 8) {
      setLoading(false);
      setError1("Password Should be atleaset 8 digits long");
      setTimeout(() => {
        setError1("");
      }, 3000);
    }
    else if (is_special == false) {
      setLoading(false);
      setError1("Password Should contain atleast one special character");

      setTimeout(() => {
        setError1("");
      }, 3000);
    }

    else if (new_password[0] != new_password[0].toUpperCase()) {
      setLoading(false);
      setError1("First Letter should be in uppercase")
      setTimeout(() => {
        setError1("");
      }, 3000);
    }
    else {
      let result = await admin_password_reset_ep({ userid, temp_uid, new_password });
      setLoading(false);
      if (result && result[0]) {
        setSuccess("Password Changed Successfully Done.");
        try {
          form.resetFields()
        }
        catch(err) {
          console.log('not resetting')
        }
        setTimeout(() => {
          setSuccess('')

        }, 5000)

      } else {
        // setError("Error");
        // setTimeout(() => {
        //   setError("");
        // }, 3000);
        console.log("err");
      }
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      width: "20%",
      fixed: 'left',

    },
    {
      title: "Employee Code",
      dataIndex: "employee_code",
      width: "20%",

    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
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
      fixed: 'right',
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          {console.log(record)}
          <BsFillEyeFill onClick={() => handleViewDashboard(record)} size={20} />
          <BiEdit onClick={() => handleEdit(record)} size={20} />
          <AiFillUnlock onClick={() => showmodal(record.employee_code.substring(2))} size={20} />
        </Space>
      )
    }
  ];

  const handleViewDashboard = (val) => {
    console.log(val);
    dispatch({
        type: EPISODE_STATECHANGE, payload: {
            key: "employee_code",
            value: val.employee_code
        }
    })
    dispatch({
        type: EPISODE_STATECHANGE, payload: {
            key: "patient_main_code",
            value: val.employee_code
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
    history.push("/enterprise/dashboard");
}


  const onSearch = async (e) => {
    let val = e.target.value;
    setOrg(val);
    if(val.length == 0){
      setOrganizations([]);
      return;
     
    }
    setLoading(true);
    const searchedData = await searchOrganizations(val);
    if (searchedData.message) {
      setLoading(false);
      setOrganizations([]);

    } else {
      setLoading(false);
      setOrganizations(searchedData);

    }
  }

  useEffect(async () => {
    const data = getClinicDetails(10);
    console.log(data);
  }, [])

  // useEffect(() => {
  //   async function getEmployees() {
  //     setLoading(true);
  //     axios.post(process.env.REACT_APP_API + "/empolyee_list/", { id: 1 }).then(res => {
  //       setLoading(false);
  //       const data = res.data;
  //       setEmployees(res.data);

  //       setPaginationState({
  //         ...paginationState,
  //         totalPage: data.length / paginationState.pageSize,
  //         minIndex: 0,
  //         maxIndex: paginationState.pageSize,
  //       })
  //     }).catch(err => console.log(err));
  //   }
  //   getEmployees();

  // }, []);

  const getEmployees = (id) => {
    setOrg('');
    setOrganizations([]);
    setLoading(true);
    axios.post(process.env.REACT_APP_API + "/empolyee_list/", { id: id }).then(res => {
      setLoading(false);
      const data = res.data;
      setEmployees(res.data);
      setPaginationState({
        ...paginationState,
        totalPage: data.length / paginationState.pageSize,
        minIndex: 0,
        maxIndex: paginationState.pageSize,
      })
    }).catch(err => console.log(err));
  }

  const ShowEmployeeInfo = () => {
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

  const handleView = (val) => {
    let tempData = [];
    let keys = Object.keys(val);
    let index = 0;
    keys.forEach(key => {
      if (!(["end_date", "status_flag", "roleId", "isLoading", "success", "pp_pm_id", "pp_pm","last_update_date","last_update_by"].includes(key))) {
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

  return <>
    <div style={{ minHeight: "20px" }}></div>
    <Row justify='space-between'>
      <Col style={{ fontSize: "25px" }} span={16}>
        <i className="fas fa-user-md" /> <b> Employee List</b>
      </Col>


    </Row>
    <div style={{ minHeight: "20px" }}></div>
    <Row justify="space-between">
      <Col md={12} sm={12} xs={12}>
        <input
          //   className="p-2 input-field my-3"

          placeholder="Search Organization"
          onChange={onSearch}
          value={org}
          loading={loading}
          style={{ width: '100%' }}
        />
        <ul className="orgg-listing">
         { organizations.map(org => <li key={org.pp_org_id} onClick={()=>getEmployees(org.pp_org_id)}>{org.org_name}</li>)}
        </ul>
      </Col>

      {getUserData() === "admin" && <Row justify="end">

        <Col md={24} sm={24} xs={24}>

          <NavLink to="/employee-register">
            <i className="fas fa-user-md" /> New Employee
          </NavLink>
        </Col>
      </Row>}

    </Row>
    <div style={{ minHeight: "20px" }}></div>
    <Row>
      <Col md={24} sm={24} xs={24}>
        <Table locale={locale} scroll={{ x: 500 }} pagination={{ pageSize: 8 }} bordered columns={columns} dataSource={employees} />
      </Col>
    </Row>
    {ShowEmployeeInfo()}
    {show_password_modal()}
  </>
}

export default EmployeeList;