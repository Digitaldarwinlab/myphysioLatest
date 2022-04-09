import {
  Col,
  Collapse,
  Row,
  Form,
  Radio,
  List,
  Skeleton,
  Space,
  Button,
  Tooltip 
} from "antd";
import React, { useEffect, useState } from "react";
import { AiFillMedicineBox } from "react-icons/ai";
import { drp1, drp2, drp3, drp4, drp5, drp6, drp7, drp8, drp9 } from "./Test";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { STATECHANGE } from "../../contextStore/actions/Assesment";
import BackButton from "../../PatientComponents/shared/BackButton";
import './SpecialTest.css'
let shoulder = {};
let elbow = {};
let hip = {};
let ankle = {};
let cervical = {};
let forearm = {};
let thoracic = {};
let lumbar = {};
let knee = {};
const SpecialTest = ({ setActive, back, next }) => {
  const { Panel } = Collapse;
  const history = useHistory();
  const dispatch = useDispatch();
  const [Others, setOthers] = useState([{
    temp:' '
  }])
  const [OthersText, setOthersText] = useState([])
  const [OthersStatus, setOthersStatus] = useState([])
  const handleText = (text,index) =>{
    let temp = OthersText
    temp[index] = text
    setOthersText(temp)
  }
  const handleStatus = (value,index) =>{
    let temp = OthersStatus
    temp[index] = value
    setOthersStatus(temp)
  }
  let handleChange = (name, value, state) => {
    if (name == "shoulder") {
      shoulder[value] = state;
    } else if (name == "elbow") {
      elbow[value] = state;
    } else if (name == "hip") {
      hip[value] = state;
    } else if (name == "ankle") {
      ankle[value] = state;
    } else if (name == "cervical") {
      cervical[value] = state;
    } else if (name == "thoracic") {
      thoracic[value] = state;
    } else if (name == "lumbar") {
      lumbar[value] = state;
    } else if (name == "forearm") {
      forearm[value] = state;
    } else if (name == "knee") {
      knee[value] = state;
    }
  };
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (sessionStorage.getItem("specialsubmit")) {
        sessionStorage.removeItem("specialsubmit");
        return;
      }
      if (window.confirm("Special Test data will be lost. Is it okay?")) {
        dispatch({ type: "SPECIAL_TEST_CLEARSTATE" });
        return true;
      } else {
        console.log("no check...");
        return false;
      }
    });
    return () => {
      unblock();
    };
  }, [history]);
  const handleSubmit = () => {
    console.log("special ",OthersText)
    console.log("special ",OthersStatus)
    let temp = {}
    OthersStatus.map((item,index)=>{
      temp[OthersText[index]] = item
    })
    console.log(shoulder,elbow,hip,knee)
    console.log("special ",temp)
    sessionStorage.setItem("specialsubmit", true);
    //setActive(4)
    if (window.confirm("Special Test data will be saved")) {
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "special_visibility",
          value: "block",
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "shoulder",
          value: shoulder,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "elbow",
          value: elbow,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "hip",
          value: hip,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "knee",
          value: knee,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "forearm",
          value: forearm,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "ankle",
          value: ankle,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "cervical_spine",
          value: cervical,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "thoracic_spine",
          value: thoracic,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "lumbar_spine",
          value: lumbar,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "special_others",
          value: temp,
        },
      });
      history.push("/assessment/1");
    }
  };
  const handleAddFields = () =>{}
  const handleRemoveFields = () =>{}
 
  return (
    <>
      <Form className="p-3">
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
            <h3>
              <b>Special Test Type</b>
            </h3>{" "}
          </Col>
        </Row>
        <div className="mb-3 special-test" style={{ paddingTop: "15px" }}>
          <Collapse
          className="special_test_new"
            accordion
            defaultActiveKey={["1"]}
            // style={{ width: `${screen.width / 2}px` }}
          >
            <Panel header="Shoulder" key="1" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp1.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={(e) => handleChange("shoulder", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => handleChange("shoulder", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Elbow" key="2" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp2.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("elbow", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("elbow", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Forearm,wrist & Hand" key="3" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp3.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("forearm", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("forearm", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Hip" key="4" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp4.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("hip", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("hip", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Knee" key="5" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp5.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("knee", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("knee", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Ankle" key="6" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                 <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp6.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("ankle", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("ankle", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Cervical Spine" key="7" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                 <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp7.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("cervical", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("cervical", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Thoracic Spine" key="8" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                 <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp8.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("thoracic", item, 1)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("thoracic", item, 0)}
                        name={index + item}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Lumbar Spine" key="9" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                 <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp9.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input
                        onChange={() => handleChange("lumbar", item, 1)}
                        name={index + item + 1}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        onChange={() => handleChange("lumbar", item, 0)}
                        name={index + item + 1}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header={<Tooltip title="You can create your own Special test">Others</Tooltip>} key="10" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                <th>Test</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {Others.map((item, index) => (
                  <tr>
                    <td>
                      {" "}
                      <input
                      placeholder="Others.."
                        className='className="p-2 w-100'
                        onChange={(e)=>{
                          handleText(e.target.value,index)
                        }}
                        type="text"
                      />
                    </td>
                    <td>
                      <input
                        name={index+' '}
                        onChange={()=>handleStatus(1,index)}
                        type="radio"
                      />
                    </td>
                    <td>
                      <input
                        name={index+' '}
                        onChange={()=>handleStatus(0,index)}
                        type="radio"
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <div className="row py-0 mx-1">
              <div style={{paddingLeft:'0px',paddingTop:'10px'}}>
              <button  onClick={() => setOthers([...Others ,{temp:' '}])} class="btn btn-primary ">+</button>
              <button  disabled={Others.length>1?false:true} onClick={() => {
                let temp1 = Others.filter((item, index)=>index!==Others.length-1)
                setOthers(temp1)
              }} class="btn btn-primary mx-2">-</button>

            </div>

          </div>
            </Panel>
          </Collapse>
          <div className="text-end" style={{ padding: 10 }}>
            <Space>
              <Button
                size="large"
                className="mb-3 btncolor"
                onClick={() => history.goBack()}
              >
                Back
              </Button>
              <Button
                size="large"
                className="mb-3 btncolor"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Space>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SpecialTest;
