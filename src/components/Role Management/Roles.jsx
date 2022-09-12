import React, { useState } from "react";
import AddRoutes from "./AddRoutes/AddRoutes";
import AddRoles from "./AddRoles/AddRoles";
import { Tabs, Modal, Button, Row, Input } from "antd";
const { TabPane } = Tabs;
import "./Roles.css";
const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeName, setRouteName] = useState();
  const [apiName, setApiName] = useState();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(isModalOpen);
  return (
    <>
      <div className="mainTabs">
        <Modal
        closable={false}
          visible={isModalOpen}
          footer={[
            <>
              <Button onClick={handleOk} key="submit" type="primary">
                Submit
              </Button>
            </>,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
          style={{ top: 30 }}
        >
          <Row>
            <label className="lab">
              Route Name <span style={{color:'red'}}>*</span>
            </label>
            <Input
              placeholder="Route Name"
              onChange={(e)=>{setRouteName(e.target.value)}}
              value={routeName}
            />
          </Row>
          <Row style={{marginTop:'15px'}}>
            <label className="lab">
              API <span style={{color:'red'}}>*</span>
            </label>
            <Input
              placeholder="Route Name"
              onChange={(e)=>{setApiName(e.target.value)}}
              value={apiName}
            />
          </Row>
        </Modal>
        <Tabs className="rolesTab" centered>
          <TabPane tab={<div className="fw-bold ">Routes</div>} key="0">
            <AddRoutes setIsModalOpen={setIsModalOpen} />
          </TabPane>
          <TabPane tab={<div className="fw-bold ">Roles</div>} key="3">
            <AddRoles/>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Roles;
