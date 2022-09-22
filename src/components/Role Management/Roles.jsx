import React, { useState } from "react";
import AddRoutes from "./AddRoutes/AddRoutes";
import AddRoles from "./AddRoles/AddRoles";
import { AddRoutesApi } from "../../API/Roles Mangement/Role";
import { Tabs, Modal, Button, Row, Input, InputNumber, Alert } from "antd";
const { TabPane } = Tabs;
import "./Roles.css";
const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [apiName, setApiName] = useState("");
  const [totalApi, settotalApi] = useState(0);
  const [contextval, setContextval] = useState("");
  const [alertVal, setalertVal] = useState(false);
  const [alertError, setalertError] = useState("");

  const handleSubmit = async () => {
    if (
      routeName !== "" &&
      apiName !== "" &&
      contextval !== "" &&
      totalApi !== 0
    ) {
      let data = {
        Route_name: routeName,
        Context_url: contextval ? contextval : "",
        Status: 1,
        Api_path: apiName,
        Apis_using: totalApi,
      };
      let a = await AddRoutesApi(data);
      if (a !== []) {
        setalertError("");
        setalertVal(false);
        setIsModalOpen(false);
        window.location.reload();
      } else {
        setalertVal(true);
        setalertError("Route Name already exist");
      }
    } else {
      setalertVal(true);
    }
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
              <Button onClick={handleSubmit} key="submit" type="primary">
                Submit
              </Button>
            </>,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
          style={{ top: 30 }}
        >
          {alertVal && (
            <Alert
              message={
                alertError ? alertError : "Please fill the required fields"
              }
              type="error"
              showIcon
            />
          )}
          <Row>
            <label className="lab">
              Route Name <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              placeholder="Route Name"
              onChange={(e) => {
                setRouteName(e.target.value);
              }}
              value={routeName}
            />
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <label className="lab">
              API Connected <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              placeholder="API Connected"
              onChange={(e) => {
                setApiName(e.target.value);
              }}
              value={apiName}
            />
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <label className="lab">
              Total API Connected<span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ width: "100%" }}>
              <InputNumber
                placeholder="Total Api"
                onChange={(e) => {
                  settotalApi(e);
                }}
                value={totalApi}
              />
            </div>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <label className="lab">Notes</label>
            <Input
              placeholder="Notes"
              onChange={(e) => {
                setContextval(e.target.value);
              }}
              value={contextval}
            />
          </Row>
        </Modal>
        <Tabs className="rolesTab" centered>
          <TabPane tab={<div className="fw-bold ">Routes</div>} key="0">
            <AddRoutes setIsModalOpen={setIsModalOpen} />
          </TabPane>
          <TabPane tab={<div className="fw-bold ">Roles</div>} key="3">
            <AddRoles />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Roles;
