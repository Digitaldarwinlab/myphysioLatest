import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { DropdownApi } from "../../../API/Dropdown/Dropdown";

const FormInput = (props) => {
  const [dropdownValue, setDropdownValue] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await DropdownApi("Registration");
      console.log(data);
      setDropdownValue(data.Registration);
    }
    getData();
  }, []);
  const [title, setTitle] = useState("");
  let rules = []
  if (props.space_validation) {
    rules.push({ required: props.required, message: `${props.name} must be filled!` })
    rules.push({
      validator: (_, value) =>
        !value.includes(" ")
          ? Promise.resolve()
          : Promise.reject(new Error("No spaces allowed"))
    })
  }else{
    rules.push({ required: props.required, message: `${props.name} must be filled!` }) 
  }

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={rules}
      normalize={(value, prevVal, prevVals) => value.trim()}
    >
      <div style={{ display: "flex" }}>
        {props.title === true && (
          <Input
            style={{
              width: 55,
            }}
            value="Dr"
            name="Dr"
            disabled
            placeholder="Dr"
          />
        )}
        {props.patientTitle === true && (
          <>
            {dropdownValue["Title"] !== undefined && (
              <Select
                placeholder="Select"
                value={props.titleValue ? props.titleValue : title}
                name={props.titleName}
                onChange={(e) => {
                  props.onChange(props.titleName, e, props.titleIndex);
                  setTitle(e);
                }}
                style={{
                  width: 85,
                }}
              >
                <Option
                  disabled
                  style={{ display: "none" }}
                ></Option>
                {dropdownValue["Title"].map((item, index) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </>

          // <Select
          //   value={props.titleValue ? props.titleValue : title}
          //   name={props.titleName}
          //   onChange={(e) => {
          //     props.onChange(props.titleName, e, props.titleIndex);
          //     setTitle(e);
          //   }}
          //   style={{
          //     width: 85,
          //   }}
          // >
          //   <Option value="title" disabled style={{ display: "none" }}></Option>
          //   <Option value="Mr">Mr</Option>
          //   <Option value="Dr">Dr</Option>
          //   <Option value="Mrs">Mrs</Option>
          //   {/* <Option value="Master">Mst</Option> */}
          //   <Option value="Ms">Ms</Option>
          // </Select>
        )}

        <Input
          value={props.value}
          name={props.name}
          onChange={(e) => {
            props.onChange(props.name, e.target.value, props.index);
          }}
          placeholder={props.placeholder}
          onBlur={props.onBlur}
          className={props.className}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
        />
      </div>
    </Form.Item>
  );
};
export default FormInput;
