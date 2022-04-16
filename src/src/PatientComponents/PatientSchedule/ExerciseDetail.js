import { Col, Row } from "antd";
import React, { Component,Profiler } from "react";
import BackButton from "../shared/BackButton";
import { exercise_detail } from "../../PatientAPI/PatientDashboardApi";
import AchievedResult from "../shared/AchievedResult";
import CircularBar from "../shared/CircularProgress";
import { FaMedal, FaStopwatch } from "react-icons/fa";
import "./ExerciseDetail.css";

export default class ExerciseDetailsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exNameList: this.props.location.state.exNameList,
      exercises: [],
    };
  }
//   playVideo = () => {
//     $('#video1').each(function () {
//         $('video').get(0).play();
//     });
//   }
  async componentDidMount() {
    console.log(this.props.location.state.status_flag);
    const res = await exercise_detail(this.props.location.state.exNameList);
    console.log("sdkjhvsdc", res);
    this.setState({ exercises: res });
  }
  
  handleClick = () => {
    this.props.history.push({
      pathname: "/patient/ai",
      state: {
        exercise: this.props.location.state.exercises[0],
        exercises: this.props.location.state.exercises,
      },
    });
  };
  render() {
    return (
      <Profiler
              id="AuthForm"
              onRender={(
                id,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions
              ) => {
                console.log(id);
                console.log(actualDuration);
                console.log(baseDuration);
                console.log(startTime);
                console.log(commitTime);
                console.log(interactions);
              }}
            >
      <div className="exercise-detail" id="exercise-detail">
        <h3 className="fw-bold mt-2 ms-2">
          <BackButton />
        </h3>
        {!this.props.location.state.status_flag&&  <button 
        style={{float:'right'}}
          className="skip-button"
          id="skip-button"
          disabled={this.props.location.state.status_flag}
          onClick={this.handleClick}
        >
          Skip
        </button>}
        {this.state.exercises.length > 0 &&
          this.state.exercises.map((exercise) => (
            <Row className="main-container p-1" id="main-container">
              <Col className="left-box m-1">
                <div className="top-heading" id="top-heading">
                  <h2 className="heading" id="heading">
                    <b>{exercise.title}</b>
                  </h2>

                  <h3 className="subtext" id="subtext">
                    <b style={{ color: "teal" }}>
                      {" "}
                      Find the Fun in Exercise and Track your Progress.......
                    </b>{" "}
                  </h3>
                </div>
                <div className="video">
                  <video controls autoPlay loop id="video1" width="100%">
                    <source
                      src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.video_path}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </Col>
              <Col className="right-box">
                {/* <div className="today-progress" id="total-progress">
                  <h4 className="fw-bold text-center p">
                    Last Week's Practice Result
                  </h4>
                  <div className="border px-1 status-box py-1">
                    <AchievedResult
                      icon={<FaMedal size={25} color="black" />}
                      score="8/10"
                      message="Your Success"
                    />
                    <CircularBar
                      precentage={(5000 / 6000) * 100}
                      score={5000}
                      color="#76c0b1"
                    />
                    <AchievedResult
                      icon={<FaStopwatch size={25} color="black" />}
                      score="30 min"
                      message="Your Practice Time"
                    />
                  </div>
                </div> */}
                <div className="instructions" id="instructions">
                  <center>
                    <h3>
                      <b>Step By Step Instructions</b>
                    </h3>
                  </center>
                  <ol className="instruction-list" id="instruction-list">
                    <li>{exercise.instruction1}</li>
                    <li>{exercise.instruction2}</li>
                  </ol>
                </div>
              </Col>
            </Row>
          ))}
      </div>
      </Profiler>
    );
  }
}
