import { Checkbox, Col, Input, Row, Switch, Button } from "antd";
import { useState } from "react";
import "./Tab.css";
import { CameraFilled } from "@ant-design/icons";

// const darwin = window.darwin;

function Tabs({
  url1,
  url2,
  frontAngles,
  sideAngles,
  setFrontAngles,
  setSideAngles,
  captureFront,
  captureSide,
  onChangeFront,
  onChangeSide,
}) {
  const [toggleState, setToggleState] = useState(1);
  //   const [url1, setUrl1] = useState(bodyImage);
  //   const [url2, setUrl2] = useState(side_img);
  const [anterior, setAnterior] = useState();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
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
            className={toggleState === 2 ? "tabss active-tabss" : "tabss"}
            onClick={() => toggleTab(2)}
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
              <td>Deviation</td>
            </tr>
            <tr>
              <td>Nasal Bridge</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[0]&&frontAngles[0].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Shoulder levels(Acrimion)</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[1]&&frontAngles[1].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Umbilicus</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[2]&&frontAngles[2].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Knees</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[3]&&frontAngles[3].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Ankle/Foot</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[4]&&frontAngles[4].toFixed(2)} />
                </Col>
              </td>
            </tr>
            <tr>
              <td>Line of Gravity</td>
              <td>
                <Col span={20}>
                  <Input className="text-center" value={frontAngles[5]&&frontAngles[5].toFixed(2)} />
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
                  onChange={(e) =>{
                    onChangeFront(e)
                  }
                  } 
                >
                  {/* <Row>
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
                  </Row> */}
                </Checkbox.Group>
              </div>
            </Col>
          </Row>
          <row>
          <Col
                span={24}
                style={{
                  // position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                }}
                >
                <table width="100%">
                  <tr>
                    <th style={{width:'50%'}}>
                      <Switch
                        checked={checked1}
                        onChange={() => {
                          if(!checked1){
                            console.log('forward')
                            darwin.restart()
                            darwin.selectOrientation(1);
                          }else{
                            console.log('backward')
                            darwin.stop()
                          }
                          console.log('check SelectOrientation(front) is calling')
                          setChecked1(!checked1);
                        }}
                        style={{ color: "red", marginTop: 5 }}
                      />
                    </th>
                    {/* <th style={{width:'25%'}}>
                      test
                      <Switch
                      //  checked={checked1}
                        onChange={() => {
                         // darwin.selectOrientation("front");
                         console.log('check test button is calling')
                         if(!checked1){
                          console.log('toggle forward')
                          darwin.restart()
                        }else{
                          console.log('toggle backward')
                          darwin.stop()
                        }
                          setChecked1(!checked1);
                        }}
                        style={{ color: "red", marginTop: 5 }}
                      />
                    </th> */}
                    <th>
                      <Button
                        disabled={!checked1}
                        onClick={async () => {
                          darwin.screenShot();
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
                            res[5]
                          ]);
                          console.log('backward')
                          darwin.stop()
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
          </row>
        </div>
        <div
          className={toggleState === 2 ? "contentt  active-contentt" : "contentt"}
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
              <td>Shoulder</td>
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
              {/* <div style={{ padding: "4px" }}>
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
              </div> */}
            </Col>
          </Row>
          <row>
          <Col
                span={24}
                style={{
                //  position: "absolute",
                  right: "0",
                  bottom: "0",
                  left: "0",
                }}
              >
                <table width="100%">
                  <tr>
                  <th style={{width:'50%'}}>
                      <Switch
                        checked={checked2}
                        onChange={() => {
                          if(!checked2){
                            darwin.restart()
                            darwin.selectOrientation(2)
                            console.log('forward')
                          }else{
                            darwin.stop()
                            console.log('backward')
                          }
                          console.log('check SelectOrientation(left) is calling')
                          setChecked2(!checked2);
                        }}
                        style={{ color: "red", marginTop: 5 ,backgroundColor:'#2d7ecb'}}
                      />
                    </th>
                    {/* <th style={{width:'25%'}}>
                      test
                      <Switch
                      //  checked={checked2}
                        onChange={() => {
                            //darwin.selectOrientation("left")
                            console.log('check test button is calling')
                            if(!checked2){
                              console.log('toggle forward')
                              darwin.restart()
                            }else{
                              console.log('toggle backward')
                              darwin.stop()
                            }
                          setChecked2(!checked2);
                        }}
                        style={{ color: "red", marginTop: 5 ,backgroundColor:'#2d7ecb'}}
                      />
                    </th> */}
                    <th>
                      <Button
                        disabled={!checked2}
                        onClick={async () => {
                          darwin.screenShot();
                          captureSide();
                          setChecked2(false);
                          const res = await darwin.showAngles();
                          console.log("show side angles ", res);
                          setSideAngles([res[0], res[1], res[2], res[3]]);
                          console.log('backward')
                          darwin.stop()
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
          </row>
        </div>
      </div>
    </>
  );
}

export default Tabs;
