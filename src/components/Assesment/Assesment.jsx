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
  const [active ,setActive] = useState('1')
  const back=(n)=>{
      setActive(n)
  }
  const ChangeTab =(key) =>{
    setActive(key)
  }
  const next =(n)=>{
    setActive(n)
  }
  const Finalsubmit = async () => {
    // aswin 10/24/2021 start
    //  let val=checkEpisodeId();
    //  if(state.episodeReducer.patient_code){
    const res = await getEpisode(state.episodeReducer.patient_code)

    // alert(JSON.stringify(state.episodeReducer))
    // console.log(JSON.stringify(state.episodeReducer))
    // if(state.carePlanRedcucer.pp_ed_id===""){
    //     return notification.warning({
    //         message: "Patient don't have an open episode1",
    //         placement: 'bottomRight',
    //         duration: 2
    //     });
    // }
    // aswin 10/24/2021 stop
    // aswin 11/13/2021 start
    if (res.length > 0 && res[0].end_date.length === 0) {
        if (window.confirm('Assessment data will be submitted')) {
            const data = await AssesmentAPI(state.FirstAssesment, dispatch)
            dispatch({ type: RECEIVED_DATA })
            if (data === true) {
                sessionStorage.setItem('submit', true)
                setTimeout(() => {
                    dispatch({ type: ASSESMENT_CLEARSTATE });
                }, 1000);

                notification.success({
                    message: 'Assessment successfully submitted!',
                    placement: 'bottomLeft',
                    duration: 2
                });

                history.push('/dashboard')
            }


            else {
                notification.error({
                    message: 'Form was not submitted',
                    placement: 'bottomLeft',
                    duration: 2
                });
            }
        }
        // aswin 11/13/2021 stop
    } else {
        return notification.warning({
            message: "Patient don't have an open episode1",
            placement: 'bottomRight',
            duration: 2
        });
    }
}
  return (
    <>
      {/* <Row>
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
      </Row> */}
      <Row>
        <Col md={24} lg={24} sm={24} xs={24}>
          <Tabs activeKey={active} defaultActiveKey="1" type="card" onChange={ChangeTab} size="medium">
            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">General </div>}
              key={1}
            >
             <Assesment1 back={back} next={next} />
            </TabPane>
            <TabPane
              tab={
                <div className="fw-bold ant-tabs-btn">Add Questionnaire</div>
              }
              key="2"
            >
              <AddQuestions back={back} next={next} setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Pain Assessment</div>}
              key="3"
            >
              <PainAssessment back={back} next={next} setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Special Test</div>}
              key="4"
            >
              <SpecialTest back={back} next={next} setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Posture Analysis</div>}
              key="5"
            >
              <PoseTest back={back} next={next} setActive={setActive}/>
            </TabPane>

            <TabPane
              tab={
                <div className="fw-bold ant-tabs-btn">Add ROM Assessment</div>
              }
              key="6"
            >
              <Body back={back} next={next} setActive={setActive}/>
            </TabPane>
            <TabPane
              tab={<div className="fw-bold ant-tabs-btn">Finish</div>}
              key="7"
            >
           <Button className="ms-3" onClick={Finalsubmit} >Finish</Button>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Assesment;
