import React, { useState, useEffect } from "react";
import { Button, Input, Table, Alert } from "antd";
import { ImPlus } from "react-icons/im";
import {
  AddRolesApi,
  GetRoutesList,
  GetRolesList,
  UpdateRolesApi,
} from "../../../API/Roles Mangement/Role";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Change } from "devextreme-react/data-grid";

const RolesRegisteration = () => {
  const location = useLocation();
  const [roles, setRoles] = useState([]);
  const roleState = useSelector((state) => state.RoleReg);
  console.log(roleState);
  const [routesName, setRoutesName] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [routesdata, setRoutesdata] = useState([]);
  const [alertVal, setalertVal] = useState("");
  let route = [];
  const history = useHistory();
  function change(i, index) {
    setRoutesdata(routesdata.concat(i));
  }
  const handleSubmit = async () => {
    if (routeName !== "" && routesdata.length > 0) {
      let data = location.pathname === "/roles/update" ?
      {
        Role_value: roleState.data.Role_value,
        route_access: routesdata,
        updated_role_value : routeName
      }
      :
      {
        Role_value: roleState.data.Role_value,
        route_access: routesdata,
      }
      let a =
        location.pathname === "/roles/update"
          ? await UpdateRolesApi(data)
          : await AddRolesApi(data);
          console.log(a)
      if (a.length>0) {
        setalertVal("");
        window.location.href = "/roleManagement";
      } else {
        setalertVal("Error Occured!!");
      }
      //   window.location.href = "/roleManagement";
    } else if (routeName === "") {
      setalertVal("Add a route name");
    } else if (routesdata.length === 0) {
      setalertVal("Atleast add one permission");
    }
  };
  console.log(...routesdata);
  useEffect(() => {
    const data = async () => {
      const routes = await GetRoutesList();
      const roles = await GetRolesList();
      let array = [];
      if (location.pathname === "/roles/update") {
        setRouteName(roleState.data.Role_value);
        setRoutesdata(roleState.data.route_access);
        routes.Route_name.forEach((i, index) => {
          array.push({
            key: index,
            routes: i,
            Actions: roles.data[roleState.data.Role_value].includes(i) ? (
              <ToggleSwitch
                checked={true}
                label={i}
                handlechange={() =>
                  document.getElementById(i).checked
                    ? setRoutesdata((routesdata) => routesdata.concat(i))
                    : setRoutesdata((routesdata) =>
                        routesdata.filter((e) => e !== i)
                      )
                }
              />
            ) : (
              <ToggleSwitch
                label={i}
                handlechange={() =>
                  document.getElementById(i).checked
                    ? setRoutesdata((routesdata) => routesdata.concat(i))
                    : setRoutesdata((routesdata) =>
                        routesdata.filter((e) => e !== i)
                      )
                }
              />
            ),
          });
        });
      } else {
        routes.Route_name.forEach((i, index) => {
          array.push({
            key: index,
            routes: i,
            Actions: (
              <ToggleSwitch
                label={i}
                handlechange={() =>
                  document.getElementById(i).checked
                    ? setRoutesdata((routesdata) => routesdata.concat(i))
                    : setRoutesdata((routesdata) =>
                        routesdata.filter((e) => e !== i)
                      )
                }
              />
            ),
          });
        });
      }
      setRoutesName(array);
    };
    data();
  }, []);
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (routeName !== "") {
        if (
          window.confirm("You will lost your Form Data. Do You really want it?")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("no alert");
      }
    });

    return () => {
      unblock();
    };
  }, [history]);
  const ToggleSwitch = (props) => {
    return (
      <label class="switch">
        <input
          type="checkbox"
          defaultChecked={props.checked}
          id={props.label}
          value={"off"}
          onChange={props.handlechange}
        />
        <span class="slider round"></span>
      </label>
    );
  };
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
      {alertVal && (
        <Alert
          style={{ marginTop: "20px" }}
          message={alertVal}
          type="error"
          showIcon
        />
      )}
      <div style={{ width: "70%", margin: "auto", marginTop: "20px" }}>
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>
          Role Name:
        </label>
        <Input
          placeholder="Role Name"
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
          dataSource={routesName}
          columns={columns}
          pagination={{
            pageSize: 10,
            size: "small",
            position: ["none", "bottomCenter"],
          }}
        />
      </div>
      <Button
        className="button1"
        onClick={handleSubmit}
        style={{
          color: "white",
          float: "right",
          marginTop: "20px",
          marginBottom: "10px",
        }}
        id="bnid"
      >
        {location.pathname === "/roles/update" ? "Update" : "Submit"}
      </Button>
    </div>
  );
};

export default RolesRegisteration;
