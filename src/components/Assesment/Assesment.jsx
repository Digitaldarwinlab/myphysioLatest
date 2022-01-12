import React,{useState} from "react";
import { Button, Col, Row, Tabs } from "antd";
import ActiveSearch from "../UtilityComponents/ActiveSearch";
import { useHistory } from "react-router-dom";
import { AiFillMedicineBox } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Assesment1 from "./Assesment1";
import Questions from "./Questions";
import PainAssessment from "./PainAssessment";
import SpecialTest from "./SpecialTest";
import PoseTest from "./PoseTest";
import AddQuestions from "./AddQuestions";
import Body from "./Body";

const { TabPane } = Tabs;
const Assesment = () => {
  const history = useHistory();
  const state = useSelector(state => state);
  const [active ,setActive] = useState(1)
  return (
    <>
      <Row>
        <Col md={12} lg={12} sm={24} xs={24}>
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
            <AiFillMedicineBox />
            Assesment/Consultation
          </h3>
        </Col>
        {state.Validation.episode_check === "failed" && (
          <Error error={state.Validation.msg} />
        )}
        <Col md={12} lg={12} sm={24} xs={24}>
          <ActiveSearch />
        </Col>
      </Row>
      <Row>
        <Col md={24} lg={24} sm={24} xs={24}>
          <Tabs defaultActiveKey="1" type="card" size="medium">
            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">General </div>}
              key={1}
            >
             {/* <Assesment1 setActive={setActive} /> */}
             <Assesment1 />
            </TabPane>
            <TabPane
              tab={
                <div className="fw-bold ant-tabs-btn">Add Questionnaire</div>
              }
              key="2"
            >
              <AddQuestions setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Pain Assessment</div>}
              key="3"
            >
              <PainAssessment setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Special Test</div>}
              key="4"
            >
              <SpecialTest setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Posture Analysis</div>}
              key="5"
            >
              <PoseTest setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={
                <div className="fw-bold ant-tabs-btn">Add ROM Assessment</div>
              }
              key="6"
            >
              <Body setActive={setActive}/>
            </TabPane>
            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Finish</div>}
              key="7"
            >
           <Button className="ms-3" >Finish</Button>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Assesment;
