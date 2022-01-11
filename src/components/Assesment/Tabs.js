import { Checkbox, Col, Input, Row, Switch, Button } from "antd";
import { useState } from "react";
import "./Tab.css";
import bodyImage from "../.././assets/lateral.jpg";
import side_img from "../.././assets/sideways-vector.jpg";
import { CameraFilled } from "@ant-design/icons";

function Tabs({
  url1,
  url2,
  setUrl1,
  setUrl2,
  frontAngles,
  sideAngles,
  setFrontAngles,
  setSideAngles,
  screenshot,
  captureFront,
  captureSide,
  onChangeFront,
  onChangeSide,
}) {
  const [toggleState, setToggleState] = useState(1);
  //   const [url1, setUrl1] = useState(bodyImage);
  //   const [url2, setUrl2] = useState(side_img);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <div className="container">
        <div className="bloc-tabs">
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <div className="fw-bold ant-tabs-btn">Anterior</div>
          </span>
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <div className="fw-bold ant-tabs-btn">Lateral</div>
          </span>
        </div>

        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <table style={{ marginLeft: "5px" }}>
            <tr>
              <td width="75%"></td>
              <td>Deviation</td>
            </tr>
            <tr>
              <td>Nasal Bridge</td>
              <td>
                <Col span={12}>
                  <Input value={frontAngles[0]&&frontAngles[0].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Shoulder levels(Acrimion)</td>
              <td>
                <Col span={12}>
                  <Input value={frontAngles[1]&&frontAngles[1].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Umbilicus</td>
              <td>
                <Col span={12}>
                  <Input value={frontAngles[2]&&frontAngles[2].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Knees</td>
              <td>
                <Col span={12}>
                  <Input value={frontAngles[3]&&frontAngles[3].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Ankle/Foot</td>
              <td>
                <Col span={12}>
                  <Input value={frontAngles[4]&&frontAngles[4].toFixed(2)} />
                </Col>
              </td>
            </tr>
          </table>
          <hr style={{ margin: "0" }} />
          <Row>
            <Col md={12} lg={12} sm={24} xs={24}>
              <img width="100%" id="scr_out1" src={url1} alt="" />
            </Col>
            <Col
              md={12}
              lg={12}
              sm={24}
              xs={24}
              style={{ borderLeft: "1px solid" }}
            >
              <div style={{ padding: "4px" }}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(e) => onChangeFront(e)}
                >
                  <Row>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Genu Valgum">Genu Valgum</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Genu Varum">Genu Varum</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Squinting / cross eyed patella">
                        Squinting / cross eyed patella
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Grosshoppers eyed platella">
                        Grosshoppers eyed platella
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
              <Col
                span={24}
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                }}
              >
                <table width="100%">
                  <tr>
                    <th>
                      <Switch
                        checked={checked1}
                        onChange={() => {
                          darwin.postureView("front");
                          setChecked1(!checked1);
                        }}
                        style={{ color: "red", marginTop: 5 }}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={!checked1}
                        onClick={async () => {
                          darwin.postureView("screenshotTaken");
                          captureFront();
                          setChecked1(false);
                          const res = await darwin.showAngles();
                          console.log("show front angles ", res);
                          setFrontAngles([
                            res[0],
                            res[1],
                            res[2],
                            res[3],
                            res[4],
                          ]);
                        }}
                        style={{ border: "none" }}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
            </Col>
          </Row>
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <table style={{ marginLeft: "5px" }}>
            <tr>
              <td width="75%"></td>
              <td>Deviation</td>
            </tr>
            <tr>
              <td>Head deviation</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[0]&&sideAngles[0].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Shoulder shoulder</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[1]&&sideAngles[1].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Hip/Pelvic Deviation</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[2]} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Knees Deviation</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[3]} />
                </Col>
              </td>
            </tr>
          </table>
          <br />
          <br />
          <hr style={{ margin: "0" }} />
          <Row>
            <Col md={12} lg={12} sm={24} xs={24}>
              <img width="100%" id="scr_out2" src={url2} alt="" />
            </Col>
            <Col
              md={12}
              lg={12}
              sm={24}
              xs={24}
              style={{ borderLeft: "1px solid" }}
            >
              <div style={{ padding: "4px" }}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(e) => onChangeSide(e)}
                >
                  <Row>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Flexed Knee">Flexed Knee</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Hyper Extended Knee">
                        Hyper Extended Knee
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Excessive Anterior Pelvic">
                        Excessive Anterior Pelvic
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Forward Head">Forward Head</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Lordosis">Lordosis</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Kyphosis">Kyphosis</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
              <Col
                span={24}
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                }}
              >
                <table width="100%">
                  <tr>
                    <th>
                      <Switch
                        checked={checked2}
                        onChange={() => {
                            darwin.postureView("left")
                          setChecked2(!checked2);
                        }}
                        style={{ color: "red", marginTop: 5 }}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={!checked2}
                        onClick={async () => {
                          darwin.postureView("screenshotTaken");
                          captureSide();
                          setChecked2(false);
                          const res = await darwin.showAngles();
                          console.log("show front angles ", res);
                          setSideAngles([res[0], res[1]]);
                        }}
                        style={{ border: "none" }}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Tabs;