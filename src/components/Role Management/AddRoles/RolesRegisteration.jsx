import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import { ImPlus } from "react-icons/im";
import { useHistory } from "react-router-dom";

const RolesRegisteration = () => {
  const history = useHistory();
  const dataSource = [
    {
      key: "1",
      routes: "John",
      APIConnected: "John",
      Actions: (
        <ToggleSwitch
          label="1"
          handlechange={(e) =>
            console.log(
              document.getElementById("1") !== null &&
                document.getElementById("1").checked
            )
          }
        />
      ),
    },
    {
      key: "2",
      routes: "John2",
      APIConnected: "John",
      Actions: (
        <ToggleSwitch
          label="John2"
          handlechange={(e) => console.log(document.getElementById("John2"))}
        />
      ),
    },
    {
      key: "3",
      routes: "John2",
      Actions: (
        <ToggleSwitch label="3" handlechange={(e) => console.log("3")} />
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
      <div>
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>
          Please select a Role:
        </label>
        <br />
        <Input
          placeholder="Route Name"
          onChange={(e) => {
            setRouteName(e.target.value);
          }}
          value={routeName}
        />
      </div>
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

export default RolesRegisteration;
