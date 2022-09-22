import {
  Col,
  Row,
  Descriptions,
  Space,
  Checkbox,
  Divider,
  Slider,
  Modal,
  Button,
  Tooltip,
  Radio
} from "antd";
import React, { useEffect, useState } from "react";
import PainMeter from "../PainMeter/PainMeter";
import BackButton from "../shared/BackButton";
import { exercise_detail } from "../../PatientAPI/PatientDashboardApi";
import AchievedResult from "../shared/AchievedResult";
import CircularBar from "../shared/CircularProgress";
import { FaMedal, FaStopwatch } from "react-icons/fa";
import "./ExerciseDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { PATIENT_STATECHANGE } from "../../contextStore/actions/ParientAction";
import ReactPlayer from "react-player";
import {
  submitManuelAi,
  updatePainMeter,
  update_careplan,
  update_careplan_Nno_AI,
} from "../../PatientAPI/PatientShedule";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const ExerDetail = () => {
  const [exercises, setExercises] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pain, setPain] = useState(1);
  const [comp, setComp] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const history = useHistory();
  const marks1 = {
    0: <SmileOutlined id="smile" style={{ fontSize: 25 }} />,
    1: <i class="far fa-smile" style={{ fontSize: 25, color: "lime" }}></i>,
    2: <MehOutlined style={{ fontSize: 25, color: "limegreen" }} />,
    3: (
      <i
        class="far fa-frown"
        style={{ fontSize: 25, color: "lightsalmon" }}
      ></i>
    ),
    4: <FrownOutlined style={{ fontSize: 25, color: "orange" }} />,
    5: <i class="far fa-tired" style={{ fontSize: 25, color: "red" }}></i>,
  };
  useEffect(() => {
    const unblock = history.block((location, action) => {
      //  if (comp.length>0) {
      if (window.confirm("Exercise status will not get updated. Is it okay?")) {
        console.log("exercise data cleared");
        return true;
      } else {
        console.log("not cleared", location);
        return false;
      }
      //}
    });
    return () => {
      unblock();
    };
  }, [history]);
  useEffect(async () => {
    console.log(location.state.status_flag);
    const res = await exercise_detail(location.state.exNameList);
    console.log("exercises ", location.state.exercises);
    let yt_temp = [];
    let tempExercise = location.state.exercises
    res.map((ex) => {
      for(let i =0;i<tempExercise.length;i++){
        if(ex.ex_em_id==tempExercise[i].ex_em_id){
          tempExercise[i]['title'] = tempExercise[i].name 
          tempExercise[i]['instruction_array'] = ex.instruction_array
          tempExercise[i]['video_path'] = tempExercise[i].video_url
          tempExercise[i]['Rep'] = ex.Rep
        }
        if(tempExercise[i].ex_em_id==262){
          tempExercise[i]['title'] = tempExercise[i].name 
          tempExercise[i]['video_path'] = tempExercise[i].video_url
          tempExercise[i]['Rep'] = ex.Rep
        }
      }
    });
    tempExercise.map((ex,idx)=>{
      ex['Rep'] = location.state.repArr[idx]
    })
    console.log("exercises ", tempExercise);
    setExercises(tempExercise)
    // console.log("exercises ", re

    // location.state.exercises.map((ex) => {
    //   let te = [...yt_temp, ...res].find((e) => {
    //     if (e.title == ex.name) {
    //       console.log("exercise array1 ", ex);
    //       let temp_E = e;
    //       temp_E["Rep"] = ex.Rep;
    //       return temp_E;
    //     }
    //   });
    //   // console.log("exercise array1 ", te)
    //   temp.push(te);
    // });
    // console.log("  ", temp);
    // setExercises([...res, ...yt_temp]);
  }, []);
  console.log(location.state.exercises[0])
  const finish = async () => {
    let tempId = [];
    comp.map((item) => {
      tempId.push(location.state.exercises[item].ex_em_id);
    });
    let tempName = [];
    comp.map((item) => {
      tempName.push({
        name: location.state.exercises[item].name,
        Rep: location.state.exercises[item].Rep,
      });
    });
    console.log("exercises ",comp);
    console.log("exercises ",tempName);
    console.log("exercises ",tempId);
    // console.log(location.state.exercises);
    // console.log(location.state.exercises[0].ChoosenTime);
    // console.log(location.state.exercises[0].pp_cp_id);
    // console.log(pain);
    // console.log(temp);
    // console.log({
    //   id: location.state.exercises[0].pp_cp_id,
    //   time_slot: location.state.exercises[0].ChoosenTime,
    //   exercise: temp,
    // });
    
    let ChoosenTime = location.state.exercises[0].ChoosenTime;
    const date = new Date();
    let pp_cp_id = location.state.exercises[0].pp_cp_id;
    // let data = {
    //   id: pp_cp_id,
    //   is_ai: 0,
    //   date: date.toISOString().split("T")[0],
    //   exerciseId: tempId[0],
    //   pain: pain,
    //   output_json: {},
    // };
    let ch = {};
    tempName.map((item) => {
      ch[item.name] = {
        set: item.Rep.set,
        rep: item.Rep.rep_count,
      };
    });
    console.log(ch);
    //ch['output_json']=ch
    // if (typeof ChoosenTime == "string") {
    //   json_data.output_json[ChoosenTime] = object;
    // } else {
    //   json_data.output_json[JSON.parse(ChoosenTime)] = object;
    // }
    // let tempData = {}
    // // tempData["output_json"] = JSON.parse(ChoosenTime)
    // tempData.output_json[ChoosenTime] = ch
    //  tempData[ChoosenTime] = "output_json"
    //   tempData['output_json']=ch
    //   tempData['id']= location.state.exercises[0].pp_cp_id
    await update_careplan_Nno_AI(
      ch,
      ChoosenTime,
      location.state.exercises[0].pp_cp_id
    );
    console.log(ChoosenTime)
    // temp.map( async (id) => {
    //   let res =  await update_careplan({},[id],2,ChoosenTime,pp_cp_id)
    // });
    // await submitManuelAi(location.state.exercises[0].pp_cp_id,location.state.exercises[0].ChoosenTime,temp)
    console.log("pain ", location.state.exercises[0].pp_cp_id, pain);
    await updatePainMeter(location.state.exercises[0].pp_cp_id, pain,ChoosenTime);
    window.location.href = "/patient/careplan";
  };

  const upDel = (index) => {
    if (comp.indexOf(index) !== -1) {
      setComp(comp.filter((item) => item !== index));
    } else {
      setComp([...comp, index]);
    }
    console.log(comp);
  };
  const handleClick = () => {
    history.push({
      pathname: "/patient/ai",
      state: {
        exercise: location.state.exercises[0],
        exercises: location.state.exercises,
      },
    });
  };
  console.log("final ", exercises);
  return (
    <div className="exercise-detail" id="exercise-detail">
      <h3 className="fw-bold mt-2 ms-2">
        <BackButton />
      </h3>
      {exercises.length > 0 &&
        exercises.map((exercise, index) => (
          <>
            <Row className="main-container p-1" id="main-container">
              <Col className="left-box m-1">
                <div className="top-heading" id="top-heading">
                  <h2
                    style={{ fontSize: "20px" }}
                    className="heading"
                    id="heading"
                  >
                    <b>{exercise.title}</b>
                  </h2>

                  {index == 0 && (
                    <h3
                      style={{ fontSize: "20px" }}
                      className="subtext"
                      id="subtext"
                    >
                      <b style={{ color: "teal" }}>
                        {" "}
                        Find the Fun in Exercise and Track your Progress.......
                      </b>{" "}
                    </h3>
                  )}
                </div>
                <div className="video">
                  {exercise.title == "YouTube" ? (
                    <ReactPlayer
                      playing={true}
                      loop={true}
                      controls={true}
                      className="react-player"
                      url={exercise.video_path}
                      width="100%"
                      //  height="auto"
                    />
                  ) : (
                    <video controls autoPlay loop id="video1" width="100%">
                      <source
                        src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.video_path}`}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </div>
              </Col>
              <Col className="right-box">
                <div className="instructions" id="instructions">
                  {location.state.status_flag && (
                    <Row justify="end">
                      <Tooltip title="Mark after completion of each exercise">
                        <Space size={"large"}>
                          <span style={{ fontSize: "17px" }}>
                            Completed {" : "}
                          </span>
                          <Checkbox
                            style={{ paddingLeft: "5px" }}
                            className="AI_selection_checkbox"
                            // checked={state.status_flag}
                            onChange={() => upDel(index)}
                          >
                            {" "}
                            {/* {state.status_flag ? (
                              <span>Active {"  "}</span>
                            ) : (
                              <span>Inactive {"  "}</span>
                            )} */}
                          </Checkbox>
                        </Space>
                      </Tooltip>
                    </Row>
                  )}
                  <p></p>
                  <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label={<h5>Sets</h5>}>
                      <h5>{location.state.repArr[index].set}</h5>
                    </Descriptions.Item>
                    <Descriptions.Item label={<h5>Reps</h5>}>
                      <h5>{location.state.repArr[index].rep_count}</h5>
                    </Descriptions.Item>
                  </Descriptions>
                  <p></p>
                  <Descriptions
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    title={
                      <h3 style={{ fontSize: "20px" }}>
                        Step By Step Instructions
                      </h3>
                    }
                  >
                    {exercise.instruction_array !== undefined && (
                      <>
                        {exercise.instruction_array.map((i, index) => (
                          <Descriptions.Item label={index + 1}>
                            <h5 style={{ fontSize: "16px" }}>{i}</h5>
                          </Descriptions.Item>
                        ))}
                      </>
                    )}
                  </Descriptions>
                  {/* <p>Set : {location.state.repArr[index].set}</p>
                      {"       "}
                      <p>
                        Reps :{" "}
                        {location.state.repArr[index].rep_count}{" "}
                      </p> */}

                  {/* <center>
                        <h3>
                          <b>Step By Step Instructions</b>
                        </h3>
                      </center>
                      <ol className="instruction-list" id="instruction-list">
                        <li>{exercise.instruction1}</li>
                        <li>{exercise.instruction2}</li>
                      </ol> */}
                </div>
              </Col>
              <Divider />
            </Row>
          </>
        ))}
      <Row justify="end" style={{ margin: "15px" }}>
        <button
          style={{ float: "right" }}
          className="skip-button"
          //  id="skip-button"
          // disabled={this.props.location.state.status_flag}
          onClick={() => {
            setVisible(true);
          }}
        >
          Submit
        </button>
      </Row>
      <Modal visible={visible} footer={null} closable={false} keyboard={false}>
        <h3 className="fw-bold text-center">Congratulation</h3>
        <p className="p text-center mt-2">
          You have successfully completed the session.
        </p>
        <h6 className="p text-center mt-2 mb-1">
          What is your Pain Level after doing the exercises?
        </h6>
        <div
          className="painmeter"
          style={{ width: "100%",height:'fit-content', marginLeft: "auto", marginRight: "auto",marginBottom:'20px' }}
        >
          {/* <Slider
            marks={marks1}
            min={0}
            max={5}
            step={2}
            onChange={(value) => setPain(value)}
            defaultValue={0}
            style={{ width: "100%" }}
          /> */}
          <PainMeter setPain={setPain} />
        </div>
        <div className="text-end">
          <Button className="okay" onClick={finish}>
            Okay
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ExerDetail;
