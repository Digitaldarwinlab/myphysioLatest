import { Col, Row, Descriptions, Space, Checkbox, Divider } from "antd";
import React, { useEffect, useState } from "react";
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

const ExerciseDetailsClass = () => {
  const [exercises, setExercises] = useState([]);
  const [comp, setComp] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const history = useHistory();
  useEffect(async () => {
    console.log(location.state);
    const res = await exercise_detail(location.state.exNameList);
    //  console.log("exercises ", this.props.location.state.repArr);
    let yt_temp = [];
    location.state.exercises.map((ex) => {
      if (ex.name == "YouTube") {
        let a = {
          title: ex.name,
          video_path: ex.youtube_link,
        };
        yt_temp.push(a);
      }
    });
    setExercises([...res, ...yt_temp]);
    // location.state.exercises.map((item) => {
    //   if (item.name == "YouTube") {
    //     setExercises([...exercises, item]);
    //   }
    // });
  }, []);

  // componentWillUnmount(){
  //   const unblock = () => {
  //     if(window.confirm("alert ")){
  //       return true;
  //     }
  //   }
  //   return () => {
  //     unblock();
  //   };
  // }
  // handleSubmit = () => {

  // }
  const upDel = (index) => {
    let comp1 = state.patCurrentEpisode.comp;
    if (comp1.indexOf(index) !== -1) {
      let check = comp.filter((item) => item !== index);
      dispatch({
        type: PATIENT_STATECHANGE,
        payload: {
          key: "comp",
          value: check,
        },
      });
    } else {
      let temp = [...state.patCurrentEpisode.comp, index];
      dispatch({
        type: PATIENT_STATECHANGE,
        payload: {
          key: "comp",
          value: temp,
        },
      });
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

  return (
    <div className="exercise-detail" id="exercise-detail">
      <h3 className="fw-bold mt-2 ms-2">
        <BackButton />
      </h3>
      <button
        style={{ float: "right" }}
        className="skip-button"
        id="skip-button"
        // disabled={location.state.status_flag}
        onClick={handleClick}
      >
        Skip
      </button>
      {exercises.length > 0 &&
        exercises.map((exercise, index) => (
          <>
            {/* {exercise.title != "YouTube" ? ( */}
              <Row className="main-container p-1" id="main-container">
                <Col className="left-box m-1">
                  <div className="top-heading" id="top-heading">
                    <h2 className="heading" id="heading">
                      <b>{exercise.title}</b>
                    </h2>

                    {index == 0 && (
                      <h3 className="subtext" id="subtext">
                        <b style={{ color: "teal" }}>
                          {" "}
                          Find the Fun in Exercise and Track your
                          Progress.......
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
                      title={<h3>Step By Step Instructions</h3>}
                    >
                      <Descriptions.Item label="1">
                        <h5>{exercise.instruction1}</h5>
                      </Descriptions.Item>
                      <Descriptions.Item label="2">
                        <h5>{exercise.instruction2}</h5>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
                <Divider />
              </Row>
            ) 
            {/* : (
              <Row className="main-container p-1" id="main-container">
                <Col className="left-box m-1">
                  <div className="top-heading" id="top-heading">
                    <h2 className="heading" id="heading">
                      <b>{exercise.title}</b>
                    </h2>

                    {index == 0 && (
                      <h3 className="subtext" id="subtext">
                        <b style={{ color: "teal" }}>
                          {" "}
                          Find the Fun in Exercise and Track your
                          Progress.......
                        </b>{" "}
                      </h3>
                    )}
                  </div>
                  <div className="video">
                    <ReactPlayer
                      className="react-player"
                      url={exercise.youtube_link}
                      width="475px"
                      height="250px"
                    />
                  </div>
                </Col>
                <Col className="right-box">
                  <div className="instructions" id="instructions">
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
                      title={<h3>Step By Step Instructions</h3>}
                    >
                      <Descriptions.Item label="1">
                        <h5>{exercise.instruction1}</h5>
                      </Descriptions.Item>
                      <Descriptions.Item label="2">
                        <h5>{exercise.instruction2}</h5>
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Col>
                <Divider />
              </Row>
            )} */}
          </>
        ))}
    </div>
  );
};

export default ExerciseDetailsClass;
