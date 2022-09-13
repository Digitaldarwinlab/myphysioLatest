import React, { useState, useEffect } from "react";
import { Button, Select, Table, Empty } from "antd";
import { GetRolesList, GetRoutesList } from "../../../API/Roles Mangement/Role";
import { ImPlus } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ROLE } from "../../../contextStore/actions/Roles";

const { Option } = Select;

const AddRoles = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state) => state.RoleReg);
  console.log(roleState);
  const [rolesName, setRolesName] = useState("0");
  const [roles, setRoles] = useState([]);
  const [routesName, setRoutesName] = useState([]);
  const [rolesdata, setRolesdata] = useState([]);
  const [rolesval, setRolesVal] = useState([]);
  useEffect(() => {
    const data = async () => {
      const roles = await GetRolesList();
      setRoles(roles.Roles);
      setRolesdata(roles.data);
    };
    data();
  }, []);
  const getRoles = async (val) => {
    const routes = await GetRoutesList();
    let array = [];
    dispatch({
      type: ADD_ROLE,
      payload: {
        Role_value: val,
        route_access: rolesdata[val],
      },
    });
    routes.Route_name.forEach((i, index) => {
      console.log(i);
      array.push({
        key: index,
        routes: i,
        Actions: rolesdata[val].includes(i) ? (
          <ToggleSwitch
            disabled={true}
            checked={true}
            label={i}
            handlechange={(e) =>
              console.log(
                document.getElementById(i) !== null &&
                  document.getElementById(i).checked
              )
            }
          />
        ) : (
          <ToggleSwitch
            checked={false}
            disabled={true}
            label={i}
            handlechange={(e) =>
              console.log(
                document.getElementById(i) !== null &&
                  document.getElementById(i).checked &&
                  set
              )
            }
          />
        ),
      });
    });
    console.log(array);
    setRoutesName(array);
  };
  useEffect(() => {
    const getrole = async () => {
      let a = await rolesdata[rolesName];
      console.log(a);
    };
    getrole();
  }, [rolesName]);
  const ToggleSwitch = (props) => {
    return (
      <label class="switch">
        <input
          checked={props.checked}
          type="checkbox"
          id={props.label}
          value={"off"}
          disabled={props.disabled}
          onChange={props.handlechange}
        />
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
        <ToggleSwitch
          checked={false}
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
    <>
      <div className="rolesBox">
        <div
          style={{
            float: "left",
            marginBottom: "10px",
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
            value={rolesName}
            onChange={(e) => {
              getRoles(e);
              setRolesName(e);
            }}
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
            {roles.length > 0 &&
              roles.map((role) => <Option value={role}>{role}</Option>)}
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
      </div>
      <div style={{ marginTop: "100px" }}>
        {rolesName !== "0" ? (
          <>
            <Button
              className="button1"
              onClick={() => history.push("/roles/update")}
              style={{ color: "white", float: "right" }}
              id="bnid"
            >
              Update roles
            </Button>
            <Table
              className="routeTable"
              locale={{
                emptyText: "No Routes Found",
              }}
              scroll={{ x: 500 }}
              dataSource={routesName}
              columns={columns}
              pagination={{
                pageSize: 10,
                size: "small",
                position: ["none", "bottomCenter"],
              }}
            />
          </>
        ) : (
          <Empty
            description="No data available"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </>
  );
};

export default AddRoles;
