import { Col, Collapse, Row, Form, Radio, List, Skeleton } from "antd";
import React, { useEffect } from "react";
import { AiFillMedicineBox } from "react-icons/ai";
import { drp1, drp2, drp3, drp4, drp5, drp6, drp7, drp8, drp9 } from "./Test";
import { useHistory } from "react-router";

const SpecialTest = () => {
  const { Panel } = Collapse;
  const history = useHistory();
  return (
    <>
      <Form>
        <Row>
          <Col md={8} lg={8} sm={24} xs={24}>
            {" "}
            <h2>Special Test Type</h2>{" "}
          </Col>
        </Row>
        <div className="border mb-3" style={{ paddingTop: "40px" }}>
          <Collapse
            defaultActiveKey={["1"]}
            style={{ width: `${screen.width / 2}px` }}
          >
            <Panel header="Shoulder" key="1" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp1.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Elbow" key="2" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp2.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Forearm,wrist & Hand" key="3" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp3.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Hip" key="4" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp4.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Knee" key="5" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp5.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Ankle" key="6" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp6.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Cervical Spine" key="7" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp7.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Thoracic Spine" key="8" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp8.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                    <td>
                      <input name={index + item} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
            <Panel header="Lumbar Spine" key="9" className="bold">
              <table style={{ width: "100%" }}>
                <tr>
                  <th></th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
                {drp9.map((item, index) => (
                  <tr>
                    <td>{item}</td>
                    <td>
                      <input name={index + item + 1} type="radio" />
                    </td>
                    <td>
                      <input name={index + item + 1} type="radio" />
                    </td>
                  </tr>
                ))}
              </table>
            </Panel>
          </Collapse>
          <button
          onClick={()=>history.push('/assessment/1')}
            style={{
              marginLeft: `${screen.width / 2 - 115}px`,
              marginTop: "10px",
            }}
          >
            Back
          </button>
          <button onClick={()=>history.push('/assessment/1')} style={{ marginLeft: "10px" }}>Submit</button>
        </div>
      </Form>
    </>
  );
};

export default SpecialTest;
