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
import FormInput from '../UI/antInputs/FormInput';
import BackButton from "../../PatientComponents/shared/BackButton";
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
const PainAssessment = ({setActive ,next}) => {
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
      state.FirstAssesment.nature_of_pain_here=value
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
      state.FirstAssesment.pain_aggravating_here=value
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
      state.FirstAssesment.pain_relieving_here=value
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
  const desc = [1, 2, 3, 4,5,6];
  const formatter = (value) => {
    return `${desc[value]}`;
  };
  const marks1 = {
    0: <i class="far fa-smile" style={{ fontSize: 25 }}></i>,
    2: <i class="far fa-smile" style={{ fontSize: 25, color: 'lime' }}></i>,
    4: <i class="far fa-meh" style={{ fontSize: 25, color: 'limegreen' }}></i>,
    6: <i class="far fa-frown" style={{ fontSize: 25, color: 'lightsalmon' }}></i>,
    8: <i class="far fa-frown" style={{ fontSize: 25, color: 'orange' }}></i>,
    10: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>
  };
  const plainOptions = ["Rest", "Movement", "Jerk", "Sleep"];
  const plainOptions1 = ["Rest", "Hot", "Medication", "Physiotherapy"];
  const goBack =() =>{
    if(window.confirm("pain assessment data will be lost")){
      dispatch({ type: "PAIN_ASSESMENT_CLEARSTATE" });
    history.push('/assessment/1')
    state.FirstAssesment.pain_state=false
    return
    }
    return
  }
  const saveData=()=>{
   // setActive(3)
    console.log("save")
    if(window.confirm("pain assessment data will save")){
      state.FirstAssesment.pain_state=true
      history.push('/assessment/1')
    }
  }
  return (
    <Profiler
              id="AuthForm"
              onRender={(
                id,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions
              ) => {
                console.log(id);
                console.log(actualDuration);
                console.log(baseDuration);
                console.log(startTime);
                console.log(commitTime);
                console.log(interactions);
              }}
            >
    <div className="px-2 py-2">
      <Row>
        <Col md={8} lg={8} sm={24} xs={24}>
          {" "}
          <h3>
            <i
              className="fas fa-arrow-left"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.goBack();
              }}
              title="Go Back"
              role="button"
            ></i>
          </h3>
          <h4><b>Pain Assesment</b></h4>{" "}
        </Col>
        {/* <Col md={24} lg={24} sm={24} xs={24}>
          <DummyBody />
        </Col> */}
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
              ></Form.Item>
              <Radio.Group
                name="Nature Of Pain"
                style={{ paddingLeft: "0px", paddingTop: "15px" }}
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
              ></Form.Item>
              <div style={{ paddingLeft: "0px", paddingTop: "10px", paddingBottom: "10px" }}>
                <Slider marks={marks1} min={0} max={10} step={2}
                  onChange={(value) => handleChange1("pain_scale", value)}
                  defaultValue={state.FirstAssesment.pain_scale}
                  value={state.FirstAssesment.pain_scale}
                  style={{ width: 200 }}
                  />
              </div>
            </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "10px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Pain Aggravating"
                name="Pain Aggravating"
              ></Form.Item>
              <Checkbox.Group
                style={{ paddingLeft: "0px",  paddingTop: "10px", paddingBottom: "10px" }}
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
              style={{ paddingTop: "10px" }}
              className="mt-2 AreasMain"
            >
              <Form.Item
                label="Pain Relieving"
                name="Pain Relieving"
              ></Form.Item>
              <Checkbox.Group
                style={{ paddingLeft: "0px", paddingTop: "10px", paddingBottom: "10px" }}
                name="Pain Relieving"
                onChange={(e) => handleChange1("pain_relieving", e)}
                options={plainOptions1}
              />
            </Col>
            <Col
             md={24} lg={12} sm={24} xs={24}
              style={{ paddingTop: "10px" }}
              className="mt-2 AreasMain"
            >
            <FormInput label="Scars"
                  name="pain_scars"
                  value={state.FirstAssesment.pain_scars}
                  defaultValue={state.FirstAssesment.pain_scars}
                  onChange={handleChange1} 
                  >
                </FormInput>
                </Col>
                <Col
                  md={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{ paddingTop: "10px" }}
                  className="mt-3 AreasMain"
                >
                  <b>Swelling :</b>
                  <Radio.Group
                    onChange={(e) => handleChange1("pain_swelling", e.target.value)}
                    name="pain_swelling"
                    style={{ paddingLeft: "45px" }}
                  >
                    <Radio value={"Pitting"}>Pitting</Radio>
                    <Radio value={"Non-itting"}>Non-pitting</Radio>
                  </Radio.Group>
                </Col>
            <Col
              md={24}
              lg={24}
              sm={24}
              xs={24}
              style={{ paddingTop: "10px" }}
              className="mt-2 AreasMain"
            >
              <Card title="Sensory Input" style={{   }}>
                <Col
                  md={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{}}
                  className="mt-2 px-3 AreasMain"
                >
                  <b>Superficial :</b>
                  <Radio.Group
                    name="Superficial"
                    style={{ paddingLeft: "20px", paddingTop: "10px", paddingBottom: "10px" }}
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
                  style={{ paddingTop: "10px" }}
                  className="mt-2 px-3 AreasMain"
                >
                  <b>Deep :</b>
                  <Radio.Group
                    onChange={(e) => handleChange1("deep", e.target.value)}
                    name="Deep"
                    style={{ paddingLeft: "60px" }}
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
                  className="mt-2 px-3 AreasMain"
                >
                  <b>Cortial :</b>
                  <Radio.Group
                    onChange={(e) => handleChange1("cortial", e.target.value)}
                    name="Cortial"
                    style={{ paddingLeft: "50px" }}
                  >
                    <Radio value={"Intact"}>Intact</Radio>
                    <Radio value={"Impaired"}>Impaired</Radio>
                    <Radio value={"Absent"}>Absent</Radio>
                  </Radio.Group>
                </Col>
              </Card>
            </Col>
            <div className="text-center mb-3 mt-3">
              <button onClick={goBack}>Back</button>
              <button style={{marginLeft:"20px"}} onClick={saveData}>save</button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
    
  );
};
export default PainAssessment;
