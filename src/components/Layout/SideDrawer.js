import React, { useState,useCallback,useEffect } from "react";
import { FaColumns ,FaUserMd  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GoCalendar } from "react-icons/go";
//import { MdOutlineAccountCircle } from "react-icons/md";
import ReactDOM from "react-dom";
import { IoMdVideocam ,IoMdPerson } from "react-icons/io";
import { FaCalendarPlus, FaPills, FaMicroscope } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import { AiFillCalendar, AiOutlineLogout, AiFillMedicineBox ,AiTwotoneSetting } from "react-icons/ai";
import "antd/dist/antd.css";
import "./SideDrawer.css";
import { FaLanguage} from "react-icons/fa";
import { Drawer, Button, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import SideNavBar from "./SideNavBar";
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const SideDrawer = ({ visState, setVisState }) => {
  const [devices, setDevices] = useState([]);
  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
  useEffect(() => {
    const fetch = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("available devices ", devices);
      handleDevices(devices);
    };

    fetch();
  }, [handleDevices]);
  const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" }
  const history = useHistory();
  // const [visible, setVisible] = useState(visState);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisState(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer
        style={{ margin: 0 }}
        closable={false}
        width={"70%"}
        title={`Physio AI`}
        placement="left"
        onClose={onClose}
        visible={visState}
        closeIcon={<MailOutlined />}
      >
      {(userInfo.role === "admin" || userInfo.role == "HeadPhysio" || userInfo.role == "physio" ) &&  <Menu
          style={{ width: "100%" }}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {(userInfo.role === "admin" ||userInfo.role == "HeadPhysio") && <SubMenu key="sub1"  icon={<i className="fas fa-user-md iconClass1"></i>} title="Physio">
           {userInfo.role === "admin"&& <Menu.Item
             icon={<i className="fas fa-user-md" style={{position:'relative',top:"1px",fontSize:'18px'}}/>}
              onClick={() => {
                history.push("/physio/register");
                setVisState(false);
              }}
              key="11"
            >
              Physio Register
            </Menu.Item>}
            { userInfo.role == "admin" && <Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                    onClick={() => {
                      history.push("/physio/clinic/register");
                      setVisState(false);
                    }}
                >
                    Clinic Register
                </Menu.Item>}
                {userInfo.role == "HeadPhysio"&&<Menu.Item key="link4"
                    icon={<i className="fas fa-clinic-medical" size={18} style={{position:'relative',top:"1px",fontSize:'18px'}} />}
                    className="text-decoration-none"
                    onClick={() => {
                      history.push("/physio/clinic/view");
                      setVisState(false);
                    }}
                >
                   View Clinic
                </Menu.Item>}
            <Menu.Item
            icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
              onClick={() => {
                history.push("/physio/list");
                setVisState(false);
              }}
              key="13"
            >
              Physio List
            </Menu.Item>
          </SubMenu>}
          <SubMenu key="sub2"  icon={<i className="fas fa-user iconClass1"></i>} title="Patient">
            <Menu.Item
             icon={<FaColumns size={18} style={{position:'relative',top:"1px"}} className="iconClass1" />}
              onClick={() => {
                history.push("/dashboard");
                setVisState(false);
              }}
              key="21"
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
             icon={<HiUserAdd size={22} style={{position:'relative',top:"1px"}} className="iconClass1" />}
              onClick={() => {
                history.push("/pateints/new");
                setVisState(false);
              }}
              key="22"
            >
              New Patient
            </Menu.Item>
            <Menu.Item
             icon={<i className="fas fa-clipboard-list" style={{position:'relative',top:"1px",fontSize:'18px'}}  />}
              onClick={() => {
                history.push("/pateints");
                setVisState(false);
              }}
              key="23"
            >
              Patient List
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<FaPills className="iconClass1" />} title="Episode">
            <Menu.Item
             icon={<ImPlus className="iconClass1" />}
              onClick={() => {
                history.push("/add-episode");
                setVisState(false);
              }}
              key="31"
            >
              Add Episode
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4"    icon={<AiFillCalendar className="iconClass1" />} title="Visit">
            <Menu.Item
            icon={<FaCalendarPlus className="iconClass1" />}
              onClick={() => {
                history.push("/appointments/new");
                setVisState(false);
              }}
              key="41"
            >
              New Visit
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5"  icon={<AiFillMedicineBox className="iconClass1" />} title="Assessment">
            <Menu.Item
             icon={<ImPlus className="iconClass1" />}
              onClick={() => {
                history.push("/assessment/1");
                setVisState(false);
              }}
              key="51"
            >
              Add Assessment
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6"   icon={<i className="fas fa-notes-medical iconClass1"></i>} title="Prescription">
            <Menu.Item
             icon={<ImPlus className="iconClass1" />}
              onClick={() => {
                history.push("/notes");
                setVisState(false);
              }}
              key="61"
            >
              Add Prescription
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<FaMicroscope className="iconClass1" />} title="Care Plan">
            <Menu.Item
              icon={<ImPlus className="iconClass1" />}
              onClick={() => {
                history.push("/care-plan");
                setVisState(false);
              }}
              key="71"
            >
              Add Care Plan
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" icon={<SettingOutlined className="iconClass2" />} title="Settings" >
          <SubMenu key="sub9" icon={<IoMdVideocam className="iconClass2" />} title="camera">
            {devices.map((item, index) => (
              <Menu.Item onClick={() => darwin.cameraIdFunc(item.deviceId)}>
                {item.label}
              </Menu.Item>
            ))}
          </SubMenu>
          </SubMenu>
          <Menu.Item
              icon={<AiOutlineLogout className="iconClass2" />}
              onClick={() => {
                history.push("/logout");
                setVisState(false);
              }}
              key="81"
            >
              Logout
            </Menu.Item>
        </Menu>}
        { userInfo.role == "patient" &&<Menu>
        <Menu.Item
              icon={<GoCalendar  className="iconClass2"  />}
              onClick={() => {
                history.push("/patient/schedule");
                setVisState(false);
              }}
              key="81"
            >
              Schedule
            </Menu.Item>
            <SubMenu icon={  <FaLanguage  className="iconClass2" />} mode="inline" title="Language">
          <Menu.Item onClick={() => darwin.selectLang("en-US")} key="0">
            English
          </Menu.Item>
          <Menu.Item onClick={() => darwin.selectLang("hi-IN")} key="1">
            Hindi
          </Menu.Item>
          <Menu.Item onClick={() => darwin.selectLang("ar-SA")} key="3">
            Arabic
          </Menu.Item>
        </SubMenu>
            <Menu.Item
              icon={<IoMdPerson className="iconClass2" />}
              onClick={() => {
                history.push("/patient/profile");
                setVisState(false);
              }}
              key="81"
            >
             Account
            </Menu.Item>
        <Menu.Item
              icon={<AiOutlineLogout className="iconClass2" />}
              onClick={() => {
                history.push("/logout");
                setVisState(false);
              }}
              key="81"
            >
              Logout
            </Menu.Item>
          </Menu>} 
      </Drawer>
    </>
  );
};

//ReactDOM.render(<App />, document.getElementById("container"));

export default SideDrawer;
