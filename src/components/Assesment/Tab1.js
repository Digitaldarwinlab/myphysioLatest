import { Checkbox, Col, Input, Row, Switch, Button } from "antd";
import { useState } from "react";
import "./Tab.css";
import bodyImage from "../.././assets/Front_Sit.webp";
import side_img from "../.././assets/Side_Sit.webp";
import { CameraFilled } from "@ant-design/icons";

function Tab1({
  url1,
  url2,
  sendMsg,
  videoCon,
  videoConf,
  frontAngles,
  sideAngles,
  setFrontAngles,
  setSideAngles,
  captureFront,
  captureSide,
  onChangeFront,
  onChangeSide,
  setOrientation,
  videoCallPosture
}) {
  const [toggleState, setToggleState] = useState(1);
  const [anterior, setAnterior] = useState();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
    setOrientation(index)
  };

  return (
    <>
     {toggleState === 1 ? <Row className="pose_mobile_view_row">
          <Col
                span={24}
                style={{
                  // position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  display: 'none'
                  
                }}
                className="pose_mobile_view"
                >
                <table width="100%">
                  <tr>
                    <th style={{width:'50%'}}>
                      <Switch
                        checked={checked1}
                        onChange={() => {
                          if (videoConf) {
                            if(!checked1){
                              videoCallPosture()
                              console.log('forward')
                            }else{
                              //darwin.stop
                              let obj = {
                                type: 'darwin.stop',
                              }
                              sendMsg(JSON.stringify(obj))
                              console.log('backward')
                            }
                          } else {
                            if (!checked1) {
                              console.log('forward')
                              darwin.restart()
                              darwin.selectOrientation(1);
                            } else {
                              console.log('backward')
                              darwin.stop()
                            }
                          }
                          setChecked1(!checked1);
                        }}
                        style={{ color: "red", marginTop: 5, display:videoCon?'none':'block' }}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={videoCon?false:!checked1}
                        onClick={async () => {
                          if (videoConf) {
                            captureFront('anterior-sitting');
                            setChecked1(false);
                          }
                          else {
                            darwin.screenShot();
                            captureFront();
                            setChecked1(false);
                            const res = await darwin.showAngles();
                            console.log("show front angles ", res);
                            setFrontAngles([
                              res[0].angle,
                              res[1].angle,
                              res[2].angle,
                              res[3].angle,
                              res[4].angle,
                              res[5].angle,
                            ]);
                            console.log('backward')
                            darwin.stop()
                          }
                        }}
                        style={{ border: "none" ,backgroundColor:'#2d7ecb'}}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
          </Row>: <Row >
          <Col
                span={24}
                style={{
                //  position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  display: 'none'
                }}
                className="pose_mobile_view"
              >
                <table   width="100%">
                  <tr>
                  <th style={{width:'50%'}}>
                      <Switch
                        checked={checked2}
                        onChange={() => {
                          if (videoConf) {
                            if(!checked2){
                              videoCallPosture()
                              console.log('forward')
                            }else{
                              let obj = {
                                type: 'darwin.stop',
                              }
                              sendMsg(JSON.stringify(obj))
                              console.log('backward')
                            }
                          } else {
                            if (!checked2) {
                              darwin.restart()
                              darwin.selectOrientation(3)
                              console.log('forward')
                            } else {
                              darwin.stop()
                              console.log('backward')
                            }
                          }
                          setChecked2(!checked2);
                        }}
                        style={{ color: "red", marginTop: 5 ,backgroundColor:'#2d7ecb', display:videoCon?'none':'block'}}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={videoCon?false:!checked2}
                        onClick={async () => {
                          if (videoConf) {
                            captureFront('lateral-sitting');
                            setChecked2(false);
                          }
                          else {
                            darwin.screenShot();
                            captureSide();
                            setChecked2(false);
                            const res = await darwin.showAngles();
                            console.log("show side angles ", res);
                            setSideAngles([res[0].angle,res[1].angle, res[2].angle, res[3].angle]);
                            console.log('backward')
                            darwin.stop()
                          }
      
                        }}
                        style={{ border: "none" ,backgroundColor:'#2d7ecb'}}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
          </Row>}
      <div className="containerr">
        <div className="bloc-tabss">
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState === 1 ? "tabss active-tabss" : "tabss"}
            onClick={() => toggleTab(1)}
          >
            <div className="fw-bold ant-tabss-btn">Anterior</div>
          </span>
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState === 3 ? "tabss active-tabss" : "tabss"}
            onClick={() => toggleTab(3)}
          >
            <div className="fw-bold ant-tabss-btn">Lateral</div>
          </span>
        </div>

        <div
          className={toggleState === 1 ? "contentt  active-contentt" : "contentt"}
        >
          <table style={{ marginLeft: "5px" }}>
            <tr>
              <td width="75%"></td>
              <td>Deviation(Degree)</td>
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
            <tr>
              <td>Line of Gravity</td>
              <td>
                  <Col span={12}>
                  <Input value={frontAngles[5]&&frontAngles[5].toFixed(2)} />
                </Col>
              </td>
            </tr>
          </table>
          <hr style={{ margin: "0" }} />
          <Row className="pose_mobile_view_row_video_screen">
            <Col md={12} lg={12} sm={24} xs={24}>
              <img className="pose_mobile_view_row_img" width="100%" id="scr_out_sit1" src={url1} alt="" />
            </Col>
            <Col
              md={12}
              lg={12}
              sm={24}
              xs={24}
              className="pose_check_div"
              style={{ borderLeft: "1px solid" }}
            >
              <div style={{ padding: "4px" }}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(e) =>{
                    onChangeFront(e)
                  }
                  } 
                >
                  <Row>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Head Shift/Tilt">Head Shift/Tilt</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Uneven Shoulder Levels">Uneven Shoulder Levels</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Pelvic Drop / Upshift">
                        Pelvic Drop / Upshift
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Right Leaning">
                      Right Leaning
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Left Leaning">
                      Left Leaning
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </Col>
          </Row>
          <Row>
          <Col
                span={24}
                style={{
                  // position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  display:'block'
                  
                }}
                className="pose_large_view"
                >
                <table width="100%">
                  <tr>
                    <th style={{width:'50%'}}>
                      <Switch
                        checked={checked1}
                        onChange={() => {
                          if (videoConf) {
                            if(!checked1){
                              videoCallPosture()
                              console.log('forward')
                            }else{
                              let obj = {
                                type: 'darwin.stop',
                              }
                              sendMsg(JSON.stringify(obj))
                              console.log('backward')
                            }
                          } else {
                            if (!checked1) {
                              console.log('forward')
                              darwin.restart()
                              darwin.selectOrientation(1);
                            } else {
                              console.log('backward')
                              darwin.stop()
                            }
                          }
                          setChecked1(!checked1);
                        }}
                        style={{ color: "red", marginTop: 5 , display:videoCon?'none':'block'}}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={videoCon?false:!checked1}
                        onClick={async () => {
                          if (videoConf) {
                            captureFront('anterior-sitting');
                            setChecked1(false);
                          }
                          else {
                            darwin.screenShot();
                            captureFront();
                            setChecked1(false);
                            const res = await darwin.showAngles();
                            console.log("show front angles ", res);
                            setFrontAngles([
                              res[0].angle,
                              res[1].angle,
                              res[2].angle,
                              res[3].angle,
                              res[4].angle,
                              res[5].angle
                            ]);
                            console.log('backward')
                            darwin.stop()
                          }
                        }}
                        style={{ border: "none" ,backgroundColor:'#2d7ecb'}}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
          </Row>
        </div>
        <div
          className={toggleState === 3 ? "contentt  active-contentt" : "contentt"}
        >
          <table style={{ marginLeft: "5px" }}>
            <tr>
              <td width="75%"></td>
              <td>Deviation(Degree)</td>
            </tr>
            <tr>
              <td>Shoulder
              </td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[0]} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Hip</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[1]} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Ankle</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[2]} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Opposite Knee</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[3]} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Elbow</td>
              <td>
                <Col span={12}>
                  <Input value={sideAngles[4]} />
                </Col>
              </td>
            </tr>
          </table>
          <br />
          <br />
          <hr style={{ margin: "0" }} />
          <Row className="pose_mobile_view_row_video_screen" >
            <Col md={12} lg={12} sm={24} xs={24}>
              <img className="pose_mobile_view_row_img" width="100%" id="scr_out_sit2" src={url2} alt="" />
            </Col>
            <Col
              md={12}
              lg={12}
              sm={24}
              xs={24}
              className="pose_check_div"
              style={{ borderLeft: "1px solid" }}
            >
              <div style={{ padding: "4px" }}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(e) => onChangeSide(e)}
                >
                  <Row>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Forward Head Posture">Forward Head Posture</Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Forwaer Slouch Posture">
                        Forwaer Slouch Posture
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Kyphotic Spine">
                        Kyphotic Spine
                      </Checkbox>
                    </Col>
                    <Col span={24} style={{ lineHeight: "200%" }}>
                      <Checkbox value="Lordotic Spine / Hollow Back">Lordotic Spine / Hollow Back</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </Col>
          </Row>
          <Row >
          <Col
                span={24}
                style={{
                //  position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                  display:'block'
                }}
                className="pose_large_view"
              >
                <table   width="100%">
                  <tr>
                  <th style={{width:'50%'}}>
                      <Switch
                        checked={checked2}
                        onChange={() => {
                          if (videoConf) {
                            if(!checked2){
                              videoCallPosture()
                              console.log('forward')
                            }else{
                              let obj = {
                                type: 'darwin.stop',
                              }
                              sendMsg(JSON.stringify(obj))
                              console.log('backward')
                            }
                          } else {
                            if (!checked2) {
                              darwin.restart()
                              darwin.selectOrientation(3)
                              console.log('forward')
                            } else {
                              darwin.stop()
                              console.log('backward')
                            }
                          }
                          setChecked2(!checked2);
                        }}
                        style={{ color: "red", marginTop: 5 ,backgroundColor:'#2d7ecb', display:videoCon?'none':'block'}}
                      />
                    </th>
                    <th>
                      <Button
                        disabled={videoCon?false:!checked2}
                        onClick={async () => {
                          if (videoConf) {
                            captureFront('lateral-sitting');
                            setChecked2(false);
                          }
                          else {
                            darwin.screenShot();
                            captureSide();
                            setChecked2(false);
                            const res = await darwin.showAngles();
                            console.log("show side angles ", res);
                            setSideAngles([res[0].angle, res[1].angle, res[2].angle, res[3].angle]);
                            console.log('backward')
                            darwin.stop()
                          }
                        }}
                        style={{ border: "none" ,backgroundColor:'#2d7ecb'}}
                        icon={<CameraFilled />}
                      >
                        Snapshot
                      </Button>
                    </th>
                  </tr>
                </table>
              </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Tab1;
