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
import { useHistory } from "react-router";
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
  const history = useHistory();
  const [form] = Form.useForm();
  // const[value, setValue]=useState();
  const state = useSelector((state) => state);
  const assesmentstate = useSelector((state) => state.FirstAssesment);

  useEffect(() => {}, [assesmentstate]);
  const dispatch = useDispatch();
  const [test, setTest] = useState({
    Aching: 0,
    Burning: 0,
    Stabbing: 0,
    Needles: 0,
    Numbness: 0,
    Shooting: 0,
    Stiffness: 0,
  });
  const [test1, setTest1] = useState({
    sleep: 0,
    Rest: 0,
    Movement: 0,
    Jerk: 0,
  });
  const handleChange1 = async (key, value, id = 0) => {
    if (key === "nature_of_pain") {
      if (value == "Aching") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Aching: 1 },
          },
        });
      } else if (value === "Burning") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Burning: 1 },
          },
        });
      } else if (value === "Stabbing") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Stabbing: 1 },
          },
        });
      } else if (value === "Needles") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Needles: 1 },
          },
        });
      } else if (value === "Numbness") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Numbness: 1 },
          },
        });
      } else if (value === "Shooting") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Shooting: 1 },
          },
        });
      } else if (value === "Stiffness") {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: { ...test, Stiffness: 1 },
          },
        });
      }
    } else if (key === "pain_aggravating") {
      let obj = {
        Sleep: 0,
        Rest: 0,
        Movement: 0,
        Jerk: 0,
      };
      if (value.includes("Sleep")) {
        obj["Sleep"] = 1;
      }
      if (value.includes("Rest")) {
        obj["Rest"] = 1;
      }
      if (value.includes("Movement")) {
        obj["Movement"] = 1;
      }
      if (value.includes("Jerk")) {
        obj["Jerk"] = 1;
      }
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: obj,
        },
      });
    } else if (key === "pain_relieving") {
      let obj = {
        Rest: 0,
        Hot: 0,
        Medication: 0,
        Physiotherapy: 0,
      };
      if (value.includes("Rest")) {
        obj["Rest"] = 1;
      }
      if (value.includes("Hot")) {
        obj["Hot"] = 1;
      }
      if (value.includes("Medication")) {
        obj["Medication"] = 1;
      }
      if (value.includes("Physiotherapy")) {
        obj["Physiotherapy"] = 1;
      }
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: obj,
        },
      });
    } else {
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value,
        },
      });
    }
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
  const desc = [1, 2, 3, 4];
  const formatter = (value) => {
    return `${desc[value]}`;
  };
  const marks1 = {
    0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
    1: <MehOutlined style={{ fontSize: 25, color: "limegreen" }} />,
    2: <FrownOutlined style={{ fontSize: 25, color: "orange" }} />,
    3: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
  };
  const plainOptions = ["Rest", "Movement", "Jerk", "Sleep"];
  const plainOptions1 = ["Rest", "Hot", "Medication", "Physiotherapy"];
  const goBack =() =>{
    history.push('/assessment/1')
  }
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
                onChange={(e) =>
                  handleChange1("nature_of_pain", e.target.value)
                }
              >
                <Radio value={"Aching"}>Aching</Radio>
                <Radio value={"Burning"}>Burning</Radio>
                <Radio value={"Stabbing"}>Stabbing</Radio>
                <Radio value={"Needles"}>Needles</Radio>
                <Radio value={"Numbness"}>Numbness</Radio>
                <Radio value={"Shooting"}>Shooting</Radio>
                <Radio value={"Stiffness"}>Stiffness</Radio>
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
                  onChange={(value) => handleChange1("pain_scale", desc[value])}
                  defaultValue={desc.indexOf(state.FirstAssesment.pain_scale)}
                  value={desc.indexOf(state.FirstAssesment.pain_scale)}
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
                onChange={(e) => handleChange1("pain_aggravating", e)}
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
                onChange={(e) => handleChange1("pain_relieving", e)}
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
                    onChange={(e) =>
                      handleChange1("superficial", e.target.value)
                    }
                  >
                    <Radio value={"Intact"}>Intact</Radio>
                    <Radio value={"Impaired"}>Impaired</Radio>
                    <Radio value={"Absent"}>Absent</Radio>
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
                    onChange={(e) => handleChange1("deep", e.target.value)}
                    name="Deep"
                    style={{ paddingLeft: "53px" }}
                  >
                    <Radio value={"Intact"}>Intact</Radio>
                    <Radio value={"Impaired"}>Impaired</Radio>
                    <Radio value={"Absent"}>Absent</Radio>
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
                    onChange={(e) => handleChange1("cortial", e.target.value)}
                    name="Cortial"
                    style={{ paddingLeft: "45px" }}
                  >
                    <Radio value={"Intact"}>Intact</Radio>
                    <Radio value={"Impaired"}>Impaired</Radio>
                    <Radio value={"Absent"}>Absent</Radio>
                  </Radio.Group>
                </Col>
              </Card>
            </Col>
            <div className="text-center mb-3">
              <button onClick={goBack}>Submit</button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default PainAssessment;