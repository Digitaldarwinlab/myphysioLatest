import React, { useState } from "react";
import { Button, Table } from "antd";
import { ImPlus } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";

const AddRoutes = (props) => {
  const dataSource = [
    {
      key: "1",
      routes: "John",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21}/>
    },
    {
      key: "2",
      routes: "John2",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21}/>
    },
    {
      key: "3",
      routes: "John3",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21}/>
    },
  ];

  const columns = [
    {
      title: "Routes",
      dataIndex: "routes",
      key: "routes",
    },
    {
      title: "API Connected",
      dataIndex: "APIConnected",
      key: "APIConnected",
    },
    {
      title: "Actions",
      dataIndex: "delete",
      key: "delete",
    },
  ];
  const showModal = () => {
    console.log(true);
    props.setIsModalOpen(true);
  };

  return (
    <div className="rolesBox">
      <Button
        className="button1"
        onClick={showModal}
        style={{ color: "white", float: "right" }}
        id="bnid"
      >
        <ImPlus className="me-2" /> Add routes
      </Button>
      <Table
      className='routeTable'
        locale={{
          emptyText: "No Routes Found",
        }}
        bordered
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
  );
};

export default AddRoutes;
