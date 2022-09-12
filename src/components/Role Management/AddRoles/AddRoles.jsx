import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import { ImPlus } from "react-icons/im";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const AddRoles = () => {
  const ToggleSwitch = (props) => {
    return (
      <label class="switch">
        <input type="checkbox" id={props.label} value={'off'} onChange={props.handlechange} />
        <span class="slider round"></span>
      </label>
    );
  };
  const history = useHistory();
  const dataSource = [
    {
      key: "1",
      routes: "John",
      APIConnected: "John",
      Actions: (
        <ToggleSwitch label='1' handlechange={(e)=>  console.log(document.getElementById('1') !== null && document.getElementById('1').checked )}/>
      ),
    },
    {
      key: "2",
      routes: "John2",
      APIConnected: "John",
      Actions: (
        <ToggleSwitch label='John2' handlechange={(e)=> console.log(document.getElementById('John2'))}/>
      ),
    },
    {
      key: "3",
      routes: "John2",
      Actions: (
        <ToggleSwitch label='3' handlechange={(e)=>console.log('3')}/>
      ),
    },
  ];

  const columns = [
    {
      title: "Route Name",
      dataIndex: "routes",
      key: "routes",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
    },
  ];
  return (
    <div className="rolesBox">
      <div
        style={{
          float: "left",
        }}
      >
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>
          Please select a Role:
        </label>
        <br />
        <Select
          showSearch
          style={{
            width: 200,
          }}
          defaultValue="0"
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="0">Not Identified</Option>
          <Option value="2">Closed</Option>
          <Option value="3">Communicated</Option>
          <Option value="4">Identified</Option>
          <Option value="5">Resolved</Option>
          <Option value="6">Cancelled</Option>
        </Select>
      </div>
      <Button
        className="button1"
        onClick={() => history.push("/roles/add")}
        style={{ color: "white", float: "right" }}
        id="bnid"
      >
        <ImPlus className="me-2" /> Add roles
      </Button>
      <div style={{ marginTop: "20px" }}>
        <Table
          className="routeTable"
          locale={{
            emptyText: "No Routes Found",
          }}
          scroll={{ x: 500 }}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 8,
            size: "small",
            position: ["none", "bottomCenter"],
          }}
        />
      </div>
    </div>
  );
};

export default AddRoles;
