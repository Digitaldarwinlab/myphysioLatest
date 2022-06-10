import { Form, Input, Select } from "antd";
import React, { useState } from "react";
const FormInput = (props) => {
   const [title, setTitle] = useState("title")

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={[
        { required: props.required, message: `${props.name} must be filled!` },
      ]}
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
          <Select
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
            <Option value="title" disabled style={{ display: "none" }}></Option>
            <Option value="Mr">Mr</Option>
            <Option value="Dr">Dr</Option>
            <Option value="Mrs">Mrs</Option>
            {/* <Option value="Master">Mst</Option> */}
            <Option value="Ms">Ms</Option>
          </Select>
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
