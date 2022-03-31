import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./SideDrawer.css";
import { Drawer, Button, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from "@ant-design/icons";
const { SubMenu } = Menu;
const SideDrawer = ({visState ,setVisState}) => {
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
        closeIcon={<MailOutlined/>}
      >
        <Menu
          style={{ width: "100%" }}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Physio">
            <Menu.Item key="11">Physio Register</Menu.Item>
            <Menu.Item key="12">Clinic Register</Menu.Item>
            <Menu.Item key="13">Physio List</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Patient">
            <Menu.Item key="21">Dashboard</Menu.Item>
            <Menu.Item key="22">New Patient</Menu.Item>
            <Menu.Item key="23">New Patient</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Episode">
            <Menu.Item key="31">Add Episode</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Visit">
            <Menu.Item key="41">New Visit</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<AppstoreOutlined />} title="Assessment">
            <Menu.Item key="51">Add Assessment</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<AppstoreOutlined />} title="Prescription">
            <Menu.Item key="61">Add Prescription</Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<SettingOutlined />} title="Care Plan">
            <Menu.Item key="71">Add Care Plan</Menu.Item>
          </SubMenu>
        </Menu>
      </Drawer>
    </>
  );
};

//ReactDOM.render(<App />, document.getElementById("container"));

export default SideDrawer