import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneSetting } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import "./../../styles/Layout/Navbar.css";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import { Dropdown, Menu, Row, Col ,Space } from "antd";
import MyPhysioLogo from "./../UtilityComponents/MyPhysioLogo";
import { GoCalendar } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa"; 
import { IoMdVideocam } from "react-icons/io";
import SideDrawer from "./SideDrawer";
import { FaLanguage} from "react-icons/fa";
import { GetJoint } from "../../API/care-plan/care-plan-api";
import { CARE_PLAN_STATE_CHANGE } from "../../contextStore/actions/care-plan-action";
import { useDispatch } from "react-redux";
const { SubMenu } = Menu;
const Navigationbar = (props) => {
  //	console.log(props)
  const [showMenu, setShowMenu] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const dispatch = useDispatch()
  const [devices, setDevices] = useState([]);
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { role: "physio", info: { first_name: "User" } };

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
  useEffect(async () => {
    const romJoint = await GetJoint();
    let temp = romJoint.reverse();
    let obj = {};
    temp.filter((item) => {
      if (
        item.ex_jm_id !== 1 &&
        item.ex_jm_id !== 2 &&
        item.ex_jm_id !== 3 &&
        item.ex_jm_id !== 4 &&
        item.ex_jm_id !== 5
      ) {
        if (item.JointType == "Neck") {
          let temp = {
            joint: item.joint_name,
            min: item.MinAngle,
            max: item.MaxAngle,
          };
          obj["Cervical"] = temp;
        } else {
          let temp = {
            joint: item.joint_name,
            min: item.MinAngle,
            max: item.MaxAngle,
          };
          obj[item.JointType] = temp;
        }
      }
    });
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "romJoints",
        value: obj,
      },
    });
  }, []);
  const handleCameraClick = (id,label) => {
    // console.log("Label",label)
    let flag = 0;
    if(label.toLowerCase().includes("back")){
      flag = 1;
    }
    console.log(flag);
    darwin.cameraIdFunc(id,flag)
  }

  const LogoutMenu = () => {
    return (
      <Menu className="dropDownMenu UserDropDown">
        {userInfo.role === "admin" && (
          <Menu.Item key="1" style={{ borderTop: "0px solid black" }}>
            <Link
              to="#Myprofile"
              className="text-secondary text-decoration-none"
            >
              My Profile
            </Link>
          </Menu.Item>
        )}
        {userInfo.role !== "admin" && userInfo.role !== "physio" && userInfo.role !== "HeadPhysio"  && (
          <Menu.Item key="2" style={{ borderTop: "0px solid black" }}>
            <Link
              to="/patient/profile"
              className="text-secondary text-decoration-none"
            >
              My Profile
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="2" style={{}}>
          <Link to="/logout" className="text-secondary text-decoration-none">
            LogOut
          </Link>
        </Menu.Item>
      </Menu>
    );
  };
  const [visState, setVisState] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top navigationBar" >
        <Dropdown
          overlay={<SideDrawer visState={visState} setVisState={setVisState} />}
          className="navbar-toggler"
          type="button"
          id="navbar-toggler"
          trigger={["click"]}
        >
          <a
            className="ant-dropdown-link text-white border"
            onClick={(e) => {
              setShowToggleMenu(!showToggleMenu);
              e.preventDefault();
              setVisState(true);
            }}
          >
            <AiOutlineMenu
              style={{ fontSize: "20px" }}
              className="navbar-toggler-icon"
            />
          </a>
        </Dropdown>

        {/* <Dropdown
          overlay={
            <DropDownMenu
              classname="navbar-toggler"
              id="navbar-toggler"
              getCurrentPath={props.getCurrentPath}
            />
          }
          className="navbar-toggler"
          type="button"
          id="navbar-toggler"
          trigger={["click"]}
        >
          <a
            className="ant-dropdown-link text-white border"
            onClick={(e) => {
              setShowToggleMenu(!showToggleMenu);
              e.preventDefault();
            }}
          >
            <AiOutlineMenu
              style={{ fontSize: "20px" }}
              className="navbar-toggler-icon"
            />
          </a>
        </Dropdown> */}

        {userInfo.role === "admin" || userInfo.role === "physio" || userInfo.role === "HeadPhysio" || userInfo.role === "patient" ? (
          <Menu
            className={`d-md-inline  hamburgerMenu ham_one `}
            id="hamburgerMenu"
          >
            {/* aswin 10/27/2021 start */}
            <Menu.Item
              key="1"
              className="ant-menu-item-selected"
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => {
                props.SideNavbarCollpased();
              }}
            >
              {/* aswin 10/27/2021 stop */}
              {props.isSideNavbarCollpased ? (
                <GiHamburgerMenu
                  className="ham_one"
                  style={{ marginTop: "5px" }}
                  size={25}
                />
              ) : (
                <GiHamburgerMenu
                  className="ham_one"
                  style={{ marginTop: "5px" }}
                  size={25}
                />
              )}
            </Menu.Item>
          </Menu>
        ) : null}

        <Link
          
          to={
            userInfo.role === "physio" || userInfo.role === "admin" || userInfo.role === "HeadPhysio"
              ? "/dashboard"
              : userInfo.role === "enterprise_patient" ||  userInfo.role === "employee" ? "/patient/enterprise/dashboard" : "/patient/dashboard"
          }
          className="navbar-brand text-white text-decoration-none"
        >
          <MyPhysioLogo page="dashboard" />
        </Link>

        <div className="d-inline-flex p-2 text-white navigationMenu topScheduleIcon">
          {userInfo.role !== "admin" &&
          userInfo.role !== "physio" &&
          userInfo.role !== "HeadPhysio" ? (
            <Space>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item onClick={()=>darwin.selectLang("en-US")} key="0">English</Menu.Item>
                    <Menu.Item onClick={()=>darwin.selectLang("hi-IN")} key="1">Hindi</Menu.Item>
                    <Menu.Item onClick={()=>darwin.selectLang("ar-SA")} key="3">Arabic</Menu.Item>
                  </Menu>
                )}
                trigger={["click"]}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaLanguage size={30} />
                </a>
              </Dropdown>
              {"  "}
              <Link to={userInfo.role==='enterprise_patient' || userInfo.role==='employee'? "/patient/enterprise/schedule" :"/patient/schedule"}>
                <h4 className="text-white me-3 ">
                  <GoCalendar /> Schedule
                </h4>
              </Link>
            </Space>
          ) : (
            <Dropdown
              overlay={
                <Menu
                  className="dropDownMenu"
                  style={{ borderTop: "solid 1px black" }}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                >
                  <SubMenu key="sub2" title="  Camera" icon={<IoMdVideocam />}>
                    {devices.map((item) => (
                      <Menu.Item
                        onClick={() => handleCameraClick(item.deviceId,item.label)}
                        key="7"
                      >
                        {item.label}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                </Menu>
              }
              trigger={["click"]}
            >
              <a
                className="ant-dropdown-link text-white"
                onClick={(e) => {
                  setShowMenu(!showMenu);
                  e.preventDefault();
                }}
              >
                <AiTwotoneSetting />
              </a>
            </Dropdown>
          )}
          <div>
            <Dropdown overlay={LogoutMenu()} type="button" trigger={["hover"]}>
              <a
                style={{ position: "relative", bottom: "0px" }}
                className="ant-dropdown-link text-white"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <CgProfile
                  style={{
                    margin: "auto 10px 0px",
                    fontSize: "26px",
                    marginTop: "0px",
                  }}
                />{" "}
                Hello {userInfo.info.first_name.slice(0,1).toUpperCase() + userInfo.info.first_name.slice(1,userInfo.info.first_name.length).toLowerCase()}
              </a>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navigationbar;
