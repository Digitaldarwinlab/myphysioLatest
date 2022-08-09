/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import React, { useState, useEffect } from "react";
import Phead from "../Layout/PatientSearch/PatientHead";
import PatDetails from "../Layout/PatientSearch/PatDetails";
import {
  Typography,
  Row,
  Col,
  Input,
  Pagination,
  Button,
  Modal,
  Form,
  Space,
  Table,
} from "antd";
import "./../../styles/Layout/Search.css";
import {
  getPatientList,
  searchPatient,
} from "../../API/PatientRegistration/Patient";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UpdateState } from "./../../API/PatientRegistration/Patient";
import { EPISODE_STATECHANGE } from "./../../contextStore/actions/episode";
import { forgotPassword, getUserData } from "../../API/userAuth/userAuth";
import { postNewPassword } from "../../API/userAuth/userAuth";
import FormPassword from "../UI/antInputs/FormPassword";
import FormInput from "../UI/antInputs/FormInput";
import Success from "../UtilityComponents/SuccessHandler";
import Error from "../UtilityComponents/ErrorHandler";
import Loading from "../UtilityComponents/Loading";
import { admin_password_reset } from "../../API/userAuth/userAuth";
import { AiFillUnlock } from "react-icons/ai";
import { MailOutlined } from "@ant-design/icons";
import { BsSearch } from "react-icons/bs";
import "../../styles/Layout/Heading.css";
import { getOTP, verifyOTP } from "../../API/Authorization/OTP";
import { Empty } from "antd";
import { HiUserAdd } from "react-icons/hi";
import { Item } from "rc-menu";
const { Search } = Input;

const SearchPatient = () => {
  const { Title } = Typography;
  const [newLoading, setNewLoading] = useState(false);
  const [scroll, setScroll] = useState(0);
  let locale = {
    emptyText: "No Patients Found",
  };
  const [columns, setColumn] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [searchvalue, Setsearchvalue] = useState("");
  const state = useSelector((state) => state.basicDetailsInitialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [physios, setPhysios] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { role: "physio" };
  const [passwordmodal, Setpasswordmodal] = useState(false);
  const [authorizeModal, setAuthorizeModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [temp_uid, Settemp_uid] = useState(0);
  const [refresh, Setrefresh] = useState(false);
  const [paginationState, setPaginationState] = useState({
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
    pageSize: 10,
  });
  const [form] = Form.useForm();
  const [buttondisable, Setbuttondiable] = useState(false);
  useEffect(async () => {
    setNewLoading(true);
    const data = await getPatientList();
    console.log("patient list", data);
    setNewLoading(false);
    setPatientData(data);
    console.log(patientData)
    //  console.log(patientData)
    setPaginationState({
      ...paginationState,
      totalPage: data.length / paginationState.pageSize,
      minIndex: 0,
      maxIndex: paginationState.pageSize,
    });
  }, [refresh]);
  console.log(patientData);
  function Pahead(val) {
    return (
      <>
        {JSON.parse(localStorage.getItem("user")).role == "physio" ? (
          val.title !== "Mobile No" && <PatDetails title={val.title} />
        ) : (
          <PatDetails title={val.title} />
        )}
      </>
    );
  }
  console.log(patientData);

  const onSearch = async (value) => {
    //  console.log(value.target.value)
    setNewLoading(true);
    Setsearchvalue(value.target.value);
    setLoading(true);
    const searchedData = await searchPatient(value.target.value);
    setPatientData(searchedData);
    setNewLoading(false);
    setLoading(false);
    setPaginationState({
      ...paginationState,
      totalPage: searchedData.length / paginationState.pageSize,
      minIndex: 0,
      maxIndex: paginationState.pageSize,
    });
  };
  //Authorize
  const handleAuthorizeClick = async (item) => {
    const message = await getOTP({
      uid: item.uid,
    });
    setMessage(message.message);
    console.log("Message from OTP:", message);
    // console.log(item.uid);
    showAuthorizemodal(item.uid);
    console.log("patientData:", item);
  };

  function showAuthorizemodal(e) {
    console.log(e);
    Settemp_uid(e);
    setAuthorizeModal(true);
    Setbuttondiable(false);
  }

  const handleAuhtorizationSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (otp.length !== 6) {
      setLoading(false);
      setError("Enter Valid OTP");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const message = await verifyOTP({
      uid: temp_uid,
      otp: otp,
    });
    setMessage(message.message);
    if (message.status_code == 5) {
      setTimeout(() => {
        setAuthorizeModal(false);
        window.location.reload(false);
      }, 2000);
    } else {
      setMessage("OTP Verification Failed");
    }
    console.log("Message from verify OTP", message);
    setLoading(false);
    setOTP("");
  };

  const show_Authorize_Modal = () => {
    return (
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

        <form onSubmit={handleAuhtorizationSubmit}>
          {message && <p>{message}</p>}
          <label htmlFor="otp">Enter OTP</label>
          <input
            style={{ width: "100%" }}
            name="otp"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            value={otp}
            required
          ></input>
          {/* <center className="userAuthBtnMain">
                     
                        </center> */}
          <Space size="middle">
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "blue" }}
              className="Autherizebtn"
            >
              Verify OTP
            </Button>{" "}
            {"  "}
            <Button
              type="primary"
              htmlType="button"
              className="Autherizebtn"
              onClick={async () => {
                const message = await getOTP({
                  uid: temp_uid,
                });

                console.log("message from resend otp", message);
                setMessage(message.message);
              }}
            >
              Resend OTP
            </Button>
          </Space>
          {/* <center className="userAuthBtnMain">
                      
                        </center> */}
        </form>
      </Modal>
    );
  };

  //View
  const handleView = (val) => {
    dispatch({
      type: EPISODE_STATECHANGE,
      payload: {
        key: "patient_code",
        value: val.pp_patm_id,
      },
    });
    dispatch({
      type: EPISODE_STATECHANGE,
      payload: {
        key: "patient_main_code",
        value: val.patient_code,
      },
    });
    dispatch({
      type: EPISODE_STATECHANGE,
      payload: {
        key: "patient_name",
        value: val.first_name + " " + val.last_name,
      },
    });
    dispatch({
      type: EPISODE_STATECHANGE,
      payload: {
        key: "Patient_no",
        value: val.mobile_no,
      },
    });
    history.push("/episode");
  };
  //Edit
  const handleEdit = (val) => {
    console.log(val);
    UpdateState(state, val, dispatch);
    history.push("/pateints/update");
  };
  const handleSubmitForm = async () => {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const is_special = format.test(new_password);
    let userid = localStorage.getItem("userId");
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
    } else if (new_password.length < 8) {
      setLoading(false);
      setError("Password Should be atleaset 8 digits long");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (is_special == false) {
      setLoading(false);
      setError("Password Should contain atleast one special character");

      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (new_password[0] != new_password[0].toUpperCase()) {
      setLoading(false);
      setError("First Letter should be in uppercase");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      let result = await admin_password_reset({
        userid,
        temp_uid,
        new_password,
      });
      setLoading(false);
      if (result && result[0]) {
        setSuccess("Password Changed Successfully Done.");
        setTimeout(() => {
          Setpasswordmodal(false);
        }, 2000);
        try {
          form.resetFields();
        } catch {
          console.log("not resetting");
        }
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else {
        setError(result[1]);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  function showmodal(e) {
    console.log(e);
    Settemp_uid(e);
    Setpasswordmodal(true);
    Setbuttondiable(false);
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
        {error && <Error error={error} />}
        {success && <Success success={success} />}
        <Button
          size={"medium"}
          icon={<MailOutlined style={{ fontSize: "20px" }} />}
          style={{
            marginBottom: "10px",
            marginTop: "5px",
            backgroundColor: buttondisable ? "white" : "red",
            borderRadius: "5px",
          }}
          disabled={buttondisable}
          onClick={() => Sendpasswordemail(temp_uid)}
        ></Button>

        <Form
          form={form}
          autoComplete="off"
          onFinish={handleSubmitForm}
          layout="vertical"
        >
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ margin: "10px" }}
              //className="userAuthFRGTbtn"
            >
              Change Password
            </Button>
          </center>
        </Form>
      </Modal>
    );
  };
  const PaginationChange = (page, pageSize = paginationState.pageSize) => {
    setPaginationState({
      ...paginationState,
      pageSize: pageSize,
      total: patientData.length / pageSize,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  const Sendpasswordemail = async (uid) => {
    const confirm = window.confirm("Send a Password Reset Link to user?");
    if (confirm) {
      //    console.log(uid)
      Setbuttondiable(true);
      const result = await forgotPassword(uid);
      setLoading(false);
      if (result && result[0]) {
        console.log(
          "An email has been sent on your registered mail-Id for further process."
        );
        setSuccess(
          "An email has been sent on your registered mail-Id for further process."
        );
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        setError(result[1]);
      }
    }
  };
  useEffect(() => {
    const AdminColumn = [
      {
        title: "Name",
        dataIndex: "full_name",
        width: "20%",
        fixed: "left",
      },
      {
        title: "Patient Code",
        dataIndex: "patient_code",
        width: "25%",
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
        fixed: "right",
        width: "25%",
        render: (text, record) => (
          <Space size="middle">
            <BsFillEyeFill onClick={() => handleView(record)} size={20} />
            <BiEdit onClick={() => handleEdit(record)} size={20} />
            <AiFillUnlock onClick={() => showmodal(record.uid)} size={20} />
            {record.status_flag === 0 && (
              <FaKey onClick={() => handleAuthorizeClick(record)} />
            )}
          </Space>
        ),
      },
    ];
    const PhysioColumn = [
      {
        title: "Name",
        dataIndex: "full_name",
        width: "20%",
        fixed: "left",
      },
      {
        title: "Patient Code",
        dataIndex: "patient_code",
        width: "25%",
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        width: "20%",
      },
      {
        title: "Actions",
        dataIndex: "address",
        fixed: "right",
        width: "17%",
        render: (text, record) => (
          <Space size="middle">
            <BsFillEyeFill onClick={() => handleView(record)} size={20} />
            {record.status_flag === 0 && (
              <FaKey onClick={() => handleAuthorizeClick(record)} size={20} />
            )}
          </Space>
        ),
      },
    ];
    const HeadPhysioColumn = [
        {
          title: "Name",
          dataIndex: "full_name",
          width: "20%",
          fixed: "left",
        },
        {
          title: "Patient Code",
          dataIndex: "patient_code",
          width: "25%",
        },
        {
          title: "Date of Birth",
          dataIndex: "dob",
          width: "20%",
        },
        {
          title: "Actions",
          dataIndex: "address",
          fixed: "right",
          width: "17%",
          render: (text, record) => (
            <Space size="middle">
              <BsFillEyeFill onClick={() => handleView(record)} size={20} />
              <BiEdit onClick={() => handleEdit(record)} size={20} />
              {record.status_flag === 0 && (
                <FaKey onClick={() => handleAuthorizeClick(record)} size={20} />
              )}
            </Space>
          ),
        },
      ];
    console.log(getUserData())
    if (getUserData() === "physio" ) {
      setColumn(PhysioColumn);
    } else if (getUserData() === "HeadPhysio" ){
        setColumn(HeadPhysioColumn);
    }
    else {
      setColumn(AdminColumn);
      setScroll(500);
    }
  }, []);
  return (
    <>
      <div style={{ minHeight: "20px" }}></div>
      <Row justify="space-between">
        <Col style={{ fontSize: "25px" }} span={16}>
          <i className="fa fa-users"></i>
          <b> Patients</b>
        </Col>
      </Row>
      <div style={{ minHeight: "20px" }}></div>
      <Row justify="space-between">
        <Col md={12} sm={12} xs={12}>
          <input
            //   className="p-2 input-field my-3"

            placeholder="Search Patient.."
            gg
            onChange={onSearch}
            loading={loading}
            style={{ width: "100%" }}
          />
        </Col>
        <Row justify="end">
          <Col md={24} sm={24} xs={24}>
            <NavLink to="/pateints/new">
              <i className="fas fa-user-md" /> New Patient
            </NavLink>
          </Col>
        </Row>
      </Row>
      <div style={{ minHeight: "20px" }}></div>

      <Row>
        <Col className="pag_large" md={24} sm={24} xs={24}>
          <Table
            locale={locale}
            loading={newLoading}
            scroll={{ x: scroll }}
            pagination={{ pageSize: 8, position: ["none", "bottomCenter"] }}
            bordered
            columns={columns}
            dataSource={patientData}
          />
          {show_password_modal()}
          {show_Authorize_Modal()}
        </Col>
        <Col
          style={{ display: "none" }}
          className="pag_mob"
          md={24}
          sm={24}
          xs={24}
        >
          <Table
            style={{ width: "100%" }}
            locale={locale}
            loading={newLoading}
            scroll={{ x: scroll }}
            pagination={{
              pageSize: 8,
              size: "small",
              position: ["none", "bottomCenter"],
            }}
            bordered
            columns={columns}
            dataSource={patientData}
          />
        </Col>
        {/* {show_password_modal()} */}
      </Row>
    </>
  );
};

export default SearchPatient;
