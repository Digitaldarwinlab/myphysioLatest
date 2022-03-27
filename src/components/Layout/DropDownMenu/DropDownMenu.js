import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Items, PhysioItems } from "./Items";
import { Menu } from "antd";
import { GoCalendar } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
const { SubMenu } = Menu;
const DropDownMenu = ({ getCurrentPath }) => {
  const userInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { role: "physio" };

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

  //admin Panel
  const AdminMenu = () => {
    return (
      <>
        {Items.map((item, index) => {
          return (
            <>
              {item.name !== "Settings" ? (
                <Menu.Item
                  key={index}
                  className={item.isHidden ? "hiddenDropDown" : ""}
                  onClick={() => {
                    getCurrentPath(item.currentPath);
                  }}
                  icon={item.Icon}
                  style={{ borderTop: "solid 1px black", marginTop: "0px" }}
                >
                  <Link
                    to={item.path}
                    className="text-secondary text-decoration-none"
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              ) : (
                <SubMenu
                  className="text-secondary text-decoration-none"
                  style={{ borderTop: "solid 1px black" }}
                  icon={item.Icon}
                  title={item.name}
                  mode="inline"
                >
                  {item.options.map((opt, index) => (
                    <>
                      {opt.name === "Camera" && (
                        <SubMenu
                          className="text-secondary text-decoration-none"
                          icon={opt.Icon}
                          title={opt.name}
                        >
                          {devices.map((item, index) => (
                            <Menu.Item
                              onClick={() => darwin.cameraIdFunc(item.deviceId)}
                            >
                              {item.label}
                            </Menu.Item>
                          ))}
                        </SubMenu>
                      )}
                    </>
                  ))}
                  {/* {item.name == "Camera" && (
                    <SubMenu icon={item.Icon} key="sub3" title="Camera">
                      <Menu.Item key="7">Option 7</Menu.Item>
                    </SubMenu> */}
                </SubMenu>
              )}
            </>
          );
        })}
      </>
    );
  };

  //Physio Menu
  const PhysioMenu = () => {
    return (
      <>
        {PhysioItems.map((item, index) => {
          return (
            <>
              {item.name !== "Settings" ? (
                <Menu.Item
                  key={index}
                  className={item.isHidden ? "hiddenDropDown" : ""}
                  onClick={() => {
                    getCurrentPath(item.currentPath);
                  }}
                  icon={item.Icon}
                  style={{ borderTop: "solid 1px black", marginTop: "0px" }}
                >
                  <Link
                    to={item.path}
                    className="text-secondary text-decoration-none"
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
              ) : (
                <SubMenu
                  className="text-secondary text-decoration-none"
                  style={{ borderTop: "solid 1px black" }}
                  icon={item.Icon}
                  title={item.name}
                  mode="inline"
                >
                  {item.options.map((opt, index) => (
                    <>
                      {opt.name === "Camera" && (
                        <SubMenu
                          className="text-secondary text-decoration-none"
                          icon={opt.Icon}
                          title={opt.name}
                        >
                          {devices.map((item, index) => (
                            <Menu.Item
                              onClick={() => darwin.cameraIdFunc(item.deviceId)}
                            >
                              {item.label}
                            </Menu.Item>
                          ))}
                        </SubMenu>
                      )}
                    </>
                  ))}
                  {/* {item.name == "Camera" && (
                    <SubMenu icon={item.Icon} key="sub3" title="Camera">
                      <Menu.Item key="7">Option 7</Menu.Item>
                    </SubMenu> */}
                </SubMenu>
              )}
            </>
          );
        })}
      </>
    );
  };
  //Patient Menu
  const PatientMenu = () => {
    return (
      <>
        <Menu.Item
          className="hiddenDropDown"
          onClick={() => {
            getCurrentPath("");
          }}
          icon={<GoCalendar className="iconClass2" />}
          style={{}}
        >
          <Link
            to="/patient/schedule"
            className="text-secondary text-decoration-none"
          >
            Schedule
          </Link>
        </Menu.Item>
        <Menu.Item
          className="hiddenDropDown"
          onClick={() => {
            getCurrentPath("");
          }}
          icon={<CgProfile className="iconClass2" />}
          style={{}}
        >
          <Link
            to="/patient/profile"
            className="text-secondary text-decoration-none"
          >
            Account
          </Link>
        </Menu.Item>
        <Menu.Item
          className="hiddenDropDown"
          onClick={() => {
            getCurrentPath("");
          }}
          icon=""
          style={{}}
        >
          <Link to="/logout" className="text-secondary text-decoration-none">
            Logout
          </Link>
        </Menu.Item>
      </>
    );
  };
  return (
    <Menu className="dropDownMenu">
      {userInfo.role === "admin" && AdminMenu()}
      {userInfo.role === "physio" && PhysioMenu()}
      {userInfo.role !== "admin" && userInfo.role !== "physio" && PatientMenu()}
    </Menu>
  );
};
export default DropDownMenu;
