import React, { useState, useEffect } from "react";
import { Button, Table, message, Popconfirm } from "antd";
import { ImPlus} from "react-icons/im";
import { DeleteRoutesApi } from "../../../API/Roles Mangement/Role";
import { GetRoutesList } from "../../../API/Roles Mangement/Role";
import { AiFillDelete } from "react-icons/ai";

const AddRoutes = (props) => {
  const [routeColumn, setRouteColumn] = useState([]);
  const [routeVal, setRouteVal] = useState(false);
  const deleteRoute =async(val)=>{
    let data = { 
      Route_name:val
    }
    await DeleteRoutesApi(data)
    setRouteVal(true)

  }
  useEffect(() => {
    const data = async () => {
      const routes = await GetRoutesList();
      let array = [];
      console.log(routes)
      routes.Route_name.forEach((i, index) => {
        array.push({
          key: index,
          routes: i,
          APIConnected: routes.routes[i].Api_path,
          Notes: routes.routes[i].Context_url
            ? routes.routes[i].Context_url
            : "N/A",
          delete: (
            <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={()=>deleteRoute(i)}
            okText="Yes"
            cancelText="No"
          >
          <AiFillDelete
                className="routeIcon"
                size={21}
              />
          </Popconfirm>
              
            
          ),
        });
      });
      setRouteColumn(array);
    };
    data();
  }, [routeVal]);

  const dataSource = [
    {
      key: "1",
      routes: "John",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21} />,
    },
    {
      key: "2",
      routes: "John2",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21} />,
    },
    {
      key: "3",
      routes: "John3",
      APIConnected: "John",
      delete: <AiFillDelete className="routeIcon" size={21} />,
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
      title: "Notes",
      dataIndex: "Notes",
      key: "Notes",
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
        style={{ color: "white", float: "right",marginBottom:'20px' }}
        id="bnid"
      >
        <ImPlus className="me-2" /> Add routes
      </Button>
      <Table
        className="routeTable"
        locale={{
          emptyText: "No Routes Found",
        }}
        bordered
        scroll={{ x: 500 }}
        dataSource={routeColumn}
        columns={columns}
        pagination={{
          pageSize: 10,
          size: "small",
          position: ["none", "bottomCenter"],
        }}
      />
    </div>
  );
};

export default AddRoutes;
