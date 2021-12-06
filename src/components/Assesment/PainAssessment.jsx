import React, { useState, useEffect } from "react";
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Slider, Form, Checkbox, Radio, Card } from "antd";
//import "../../styles/Assessment/PainAssessment.css";
import { AiFillMedicineBox } from "react-icons/ai";
import Body from "./Body";
import DummyBody from "./DummyBody";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Label } from "devextreme-react/chart";
const marks = {
  0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
  2: <i class="far fa-smile" style={{ fontSize: 25, color: "lime" }}></i>,
  4: <i class="far fa-meh" style={{ fontSize: 25, color: "limegreen" }}></i>,
  6: (
    <i class="far fa-frown" style={{ fontSize: 25, color: "lightsalmon" }}></i>
  ),
  8: <i class="far fa-frown" style={{ fontSize: 25, color: "orange" }}></i>,
  10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
};
const PainAssessment = () => {
  const [form] = Form.useForm();
  // const[value, setValue]=useState();
  const state = useSelector((state) => state);
  const assesmentstate = useSelector((state) => state.FirstAssesment);

  useEffect(() => {}, [assesmentstate]);
  const dispatch = useDispatch();
  const handleChange1 = (key, value, id = 0) => {
    dispatch({
      type: STATECHANGE,
      payload: {
        key,
        value,
      },
    });
    dispatch({ type: "NOERROR" });
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = React.useState(1);

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };
  const HandleSubmit = () => {
    console.log("submit");
  };
  const back = () => {
    // history.goBack();
    alert("hello");
  };
  const desc = ["no pain", "mild", "moderate", "severe"];
  const formatter = (value) => {
    return `${desc[value]}`;
  };
  const marks1 = {
    0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
    1: <MehOutlined style={{ fontSize: 25, color: "limegreen" }} />,
    2: <FrownOutlined style={{ fontSize: 25, color: "orange" }} />,
    3: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
  };
  const plainOptions = ["Rest", "Movement", "Jerk","Sleep"];
  const plainOptions1 = ["Rest", "Hot", "Medication", "Physiotherapy"];

  return (
    <div className="px-2 py-2">
      <Row>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <h2>Pain Assesment</h2>{" "}
        </Col>
        <Col md={24} lg={24} sm={24} xs={24}>
          <DummyBody />
        </Col>
        <Col md={24} lg={24} sm={24} xs={24}>
          <Form>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "20px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Nature Of Pain"
                name="Nature Of Pain"
                rules={[{ required: true, message: `Please Select` }]}
              ></Form.Item>
              <Radio.Group
                name="Nature Of Pain"
                style={{ paddingLeft: "20px" }}
              >
                <Radio value={1}>aching</Radio>
                <Radio value={2}>Burning</Radio>
                <Radio value={3}>Stabbing</Radio>
                <Radio value={4}>& Needles</Radio>
                <Radio value={5}>NumbNess</Radio>
                <Radio value={6}>Shooting</Radio>
                <Radio value={7}>Stiffness</Radio>
              </Radio.Group>
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "20px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Pain Scale"
                name="Pain Scale"
                rules={[{ required: true, message: `Please Select` }]}
              ></Form.Item>
              <div style={{ paddingLeft: "25px" }}>
                <Slider
                  name="Pain Scale"
                  marks={marks1}
                  min={0}
                  max={3}
                  step={1}
                  tipFormatter={formatter}
                  // onChange={(value) => handleChange1("Swelling", desc[value])}
                  // defaultValue={desc.indexOf(state.FirstAssesment.Swelling)}
                  // value={desc.indexOf(state.FirstAssesment.Swelling)}
                  style={{ width: 200 }}
                />
              </div>
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "20px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Pain Aggravating"
                name="Pain Aggravating"
                rules={[{ required: true, message: `Please Select` }]}
              ></Form.Item>
              <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                options={plainOptions}
                name="Pain Aggravating"
              />
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "20px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Pain Relieving"
                name="Pain Relieving"
                rules={[{ required: true, message: `Please Select` }]}
              ></Form.Item>
              <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                name="Pain Relieving"
                options={plainOptions1}
              />
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "20px" }}
              className="mt-2 AreasMain"
            >
              <Card title="Sensory Input" style={{ width: 500 }}>
                <Col
                  md={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{ paddingTop: "20px" }}
                  className="mt-2 AreasMain"
                >
                 Superficial : 
                    <Radio.Group
                      name="Superficial"
                      style={{ paddingLeft: "20px" }}
                    >
                      <Radio value={1}>Intact</Radio>
                      <Radio value={2}>Impaired</Radio>
                      <Radio value={3}>Absent</Radio>
                    </Radio.Group>
                </Col>
                <Col
                  md={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{ paddingTop: "20px" }}
                  className="mt-2 AreasMain"
                >
                Deep :
                  <Radio.Group
                      name="Deep"
                      style={{ paddingLeft: "53px" }}
                    >
                      <Radio value={1}>Intact</Radio>
                      <Radio value={2}>Impaired</Radio>
                      <Radio value={3}>Absent</Radio>
                    </Radio.Group>
                </Col>
                <Col
                  md={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{ paddingTop: "20px" }}
                  className="mt-2 AreasMain"
                >
                  Cortial :
                  <Radio.Group
                      name="Cortial"
                      style={{ paddingLeft: "45px" }}
                    >
                      <Radio value={1}>Intact</Radio>
                      <Radio value={2}>Impaired</Radio>
                      <Radio value={3}>Absent</Radio>
                    </Radio.Group>
                </Col>
              </Card>
            </Col>
            <div className="text-center mb-3">
              <button>Submit</button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default PainAssessment;
