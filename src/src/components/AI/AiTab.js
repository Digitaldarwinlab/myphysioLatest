import { Checkbox, Col, Input, Row, Switch, Button, Radio } from "antd";
import { useState } from "react";
import "./AiTab.css";
import { CameraFilled } from "@ant-design/icons";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

function AiTab({ refSpan, setSelectOrientation, setAngles, joints, labels, ifCheck ,leftJoints ,rightJoints ,switchstate ,handleChange, changeAngles}) {
  const [toggleState, setToggleState] = useState(refSpan);
  const [lateralJoints ,setLateralJoints] = useState(leftJoints)
  console.log("check  ",refSpan)
  const changeSide = (value) =>{
    if(value=='left'){
      setLateralJoints(leftJoints)
      setAngles([0,2,4,6,8,10])
      setSelectOrientation(2)
    }
    if(value=='right'){
      setLateralJoints(rightJoints)
      setAngles([1,3,5,7,9,11])
      setSelectOrientation(3)
    }
    if(switchstate){
      handleChange()
    }
  }
  return (
    <>
      <div className="containerrr">
        <div className="bloc-tabss">
          <span
            aria-disabled
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState == 1 ? "tabss active-tabss" : "tabss"}
            onClick={() => {
              setToggleState(1);
              setAngles([0,1,2,3,4,5,6,7,8,9,10,11])
              setSelectOrientation(3)
              if(switchstate){
                handleChange()
              }
            }}
          >
            <div className="fw-bold ant-tabss-btn">Anterior</div>
          </span>
          <span
            style={{ width: "460px", padding: "0px 0 0 0", height: "35px" }}
            className={toggleState == 2 ? "tabss active-tabss" : "tabss"}
            onClick={() => {
              setToggleState(2);
              setAngles([0,2,4,6,8,10])
              setSelectOrientation(2)
              if(switchstate){
                handleChange()
              }
            }}
          >
            <div className="fw-bold ant-tabss-btn">Lateral</div>
          </span>
        </div>

        <div
          className={
            toggleState == 1 ? "contentt  active-contentt" : "contentt"
          }
        >
          {/* <Radio checked value={"front"}>
            front
          </Radio> */}
          <br />
          <div>
            <Checkbox.Group onChange={changeAngles} defaultValue={()=>ifCheck(joints)} >
              <Row>
                {joints.map((item) => (
                  <Col span={8}>
                    <Checkbox value={item.value}>{labels[item.value]}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <div
          className={
            toggleState == 2 ? "contentt  active-contentt" : "contentt"
          }
        >
          <Radio.Group defaultValue={"left"} onChange={(e)=>changeSide(e.target.value)}>
            <Radio  value={"left"}>left</Radio>
            <Radio value={"right"}>right</Radio>
          </Radio.Group>
          <br />
          <br />
          <div>
          <Checkbox.Group onChange={changeAngles} value={()=>ifCheck(lateralJoints)} >
              <Row>
                {lateralJoints.map((item) => (
                  <Col span={8}>
                    <Checkbox value={item.value}>{labels[item.value]}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default AiTab;
