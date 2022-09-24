import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Button, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetPatientCarePlan } from "./../../PatientAPI/PatientShedule";
import moment from "moment";
import { BiCheck } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { Row, Col, Card, Carousel, Empty } from "antd";
import {
  GetPatientCurrentEpisode,
  GetCalanderDataApi,
} from "../../PatientAPI/PatientDashboardApi";
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";
import "../PatientSchedule/Calendar.css";
import "../PatientSchedule/patNew.css";
import ReactPlayer from "react-player";
import "./PatientCareplan.css";
//TimeColors
const activeArr = [
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
const timeColors = [
  "#17BD9C",
  "#00294C",
  "#17BD9C",
  "#00294C",
  "#17BD9C",
  "#00294C",
];
//Selected Time Style
const selectedStyle = {
  backgroundColor: "#00294C !important",
  color: "white",
  cursor: "pointer",
};
//Unselected Style
const UnselectedStyle = {
  backgroundColor: "white",
  color: "black",
  cursor: "pointer",
};
//button Style
const checkBtnStyle = {
  backgroundColor: `'red'!important`,
};
const btnStyle = {
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
};
const { Meta } = Card;
const PatientCareplan = ({ onChangeVideoUrl }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [pres, setPres] = useState([]);
  const state = useSelector((state) => state.patCurrentEpisode);
  const [selectedDate, setSelectedDate] = useState("");
  const [exstatCheck, setExStatCheck] = useState("yes");
  const [startStatus, setstartStatus] = useState(false);
  const [startStatus1, setstartStatus1] = useState(JSON.parse(sessionStorage.getItem('status')));

  const [exercises, setExercises] = useState([]);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false); // button Disability
  //const [activeCalVal, setState] = useState(true);
  const [mappedTimeToExercises, setMappedTimeToExercises] = useState({});
  const [currentEpissode, Setcurrentepisode] = useState(0);
  const [calendarData, SetcalendarData] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toDateString().slice(4, 7)
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().toDateString().slice(-4)
  );
  const [status_flag, setStatusFlag] = useState(false);
  const [customisedDate, SetcustomisedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [sortedVisits, SetsortedVisits] = useState([]);
  const [todaysdate, Settodaysdate] = useState(new Date());
  const [chosenTime, SetchoosenTime] = useState(0);
  const [careplanIdArray, SetcareplanIdArray] = useState([]);
  const [update, setUpdate] = useState(false);
  const [combine, setCombine] = useState(false);
  const [exercise_status, setExerciseStatus] = useState({});
  const [exercise_status1, setExerciseStatus1] = useState([]);
  const checkExerciseStatus = (b, obj) => {
    //   let test = {
    //     "10:00 am": {
    //         "Squat": "planned",
    //         "Push Ups": "planned"
    //     },
    //     "01:00 pm": {
    //         "Squat": "completed",
    //         "Push Ups": "completed"
    //     },
    //     "04:00 pm": {
    //         "Squat": "planned",
    //         "Push Ups": "planned"
    //     }
    // }
    console.log("exercise_status ", obj);
    console.log("exercise_status ", b);
    Object.entries(obj).map((d) => {
      if (d[0] === b) {
        console.log("plz chacek ", d[1]);
        let temp = Object.values(d[1]);
        if (temp.includes("completed")) {
          console.log("status not completed");
          setExStatCheck("yes");
        } else {
          console.log("status completed");
          setExStatCheck("no");
        }
        //  Object.values(d[1]).map(p=>{
        //      if(p==="planned"){
        //          console.log('status not completed')
        //          setExStatCheck('no')
        //      }
        //  })
      }
    });
  };
  const checkExerciseStatus1 = async (b, temp) => {
    if (Array.isArray(b)) {
      b = b[0];
    }

    console.log("making exercise_status ", temp);
    console.log("making exercise_status ", b);
    console.log("making 1");
    let tempStat = true;
    for (let i = 0; i < temp.length; i++) {
      Object.entries(temp[i]).map((d) => {
        if (d[0] === b) {
          console.log("plz chacek ", d[1]);
          let temp1 = Object.values(d[1]);
          if (temp1.includes("completed")) {
            tempStat = false;
            console.log("making 2 true ", i);
          } else {
            console.log("status completed captured");
          }
        }
      });
    }
    console.log("making 3 ");
    //  const checkTemp = () =>{
    //    return new Promise((resolve,reject)=>{
    //     temp.map(d1=>{
    //       Object.entries(d1).map(d=>{
    //         if(d[0]===b[0]){
    //           console.log("plz chacek ",d[1])
    //           let temp = Object.values(d[1])
    //           if(temp.includes('planned')){
    //           resolve(true)
    //           }else{
    //               console.log('status completed captured')
    //           }
    //         }
    //       })
    //     })
    //    })
    //  }
    // const tempStat = await checkTemp()
    console.log("exercise_status ", tempStat);

    if (tempStat) {
      setExStatCheck("no");
      console.log("making 4");
      console.log("status not completed");
    } else {
      setExStatCheck("yes");
      console.log("making 5");
      console.log("status completed");
    }
  };
  //  console.log('date is : ' + todaysdate.getDate())
  function convert(str) {
    console.log(str);
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));

    return [date.getFullYear(), mnth, day].join("-");
  }

  const combineTwoCarePlan = (data) => {
    //  console.log('data iss')
    setStatusFlag(data[0].status_flag == 2 ? false : true);
    setCombine(true);
    let commonTime = {};
    let checkTimeToMapExercise = {};

    //Step - 2 mapping all the timeSlots in first careplan
    for (let k = 0; k < data.length; k++) {
      for (let i = 0; i < data[k].time_slot.length; i++) {
        //   console.log('time slott iss')
        //    console.log(data[k].time_slot[i])
        //  console.log('chektine to map')
        //  console.log(checkTimeToMapExercise)
        //  console.log(data[k].time_slot[i])
        if (data[k].time_slot[i] in checkTimeToMapExercise) {
          console.log("loop 4 s");
          console.log(data[k].pp_cp_id);
          //  console.log('inside if')
          let exercises = data[k].exercise_details;

          let notPresentExercise = [];
          let mappedData = checkTimeToMapExercise[data[k].time_slot[i]];
          //  console.log('checking mappeddata')
          //  console.log(  checkTimeToMapExercise)

          for (let j = 0; j < exercises.length; j++) {
            //  console.log('careplan loop 2 ')
            //    console.log(data[k].pp_cp_id)

            //   console.log('exercise')
            //   console.log(exercises[j])
            if (exercises[j].ex_em_id in mappedData) {
              //pass
            } else {
              notPresentExercise.push(exercises[j]);
              mappedData[exercises[j].ex_em_id] = 1;
            }
          }

          checkTimeToMapExercise[data[k].time_slot[i]] = mappedData;
          commonTime[data[k].time_slot[i]] = [
            ...commonTime[data[k].time_slot[i]],
            ...notPresentExercise,
          ];
          //    console.log('data[k]')
          //  console.log(data[k].time_slot[i][0])
        } else {
          console.log("loop 4 s");
          console.log(
            data[k].pp_cp_id + " : time_slot is : " + data[k].time_slot[i]
          );
          let temparray = careplanIdArray;
          temparray.push({
            time: data[k].time_slot[i],
            careplanId: data[k].pp_cp_id,
          });
          SetcareplanIdArray(temparray);

          commonTime[data[k].time_slot[i]] = data[k].exercise_details;
          //  console.log('else commontime')
          //   console.log(data[k].time_slot[i])
          let exercises = data[k].exercise_details;
          for (let j = 0; j < exercises.length; j++) {
            if (data[k].time_slot[i] in checkTimeToMapExercise) {
              checkTimeToMapExercise[data[k].time_slot[i]][
                exercises[j].ex_em_id
              ] = 1;
            } else {
              checkTimeToMapExercise[data[k].time_slot[i]] = {};
              checkTimeToMapExercise[data[k].time_slot[i]][
                exercises[j].ex_em_id
              ] = 1;
            }
          }
        }
      }
    }
    //  console.log('COmmontTINe')
    let times = Object.keys(commonTime);
    console.log("times ", times);
    //   console.log(commonTime)

    times = times.sort(
      (a, b) => a.charCodeAt(a.length - 2) - b.charCodeAt(b.length - 2)
    );
    setMappedTimeToExercises(commonTime);
    if (times.length > 0) {
      times = times.map((time, index) => {
        return [time];
      });

      setTimes(times);
      // times.forEach(function(name){
      //   if(array.name == name ){
      //     console.log(the result)
      // }
      // })
      setExercises(commonTime[times[selectedTime][0]]);
      //   if (commonTime[times[0][0]].length > 0)
      // onChangeVideoUrl(commonTime[times[0][0]][0].video_url);
    }
    console.log("times ", data);
    let tempStatus = [];
    data.map((d) => {
      tempStatus.push(d.time_slot);
    });
    checkExerciseStatus1(times[0], tempStatus);
    console.log(tempStatus);
    setExerciseStatus1(tempStatus);
    console.log("times ", tempStatus);
    // console.log(commonTime);
  };
  const UpdateCarePlanStateData = (data) => {
    console.log("careplan ", data);
    setStatusFlag(data[0].status_flag == 2 ? false : true);
    setUpdate(true);
    setTimes(data[0].time_slot);
    setExercises(data[0].exercise_details);
    // onChangeVideoUrl(data[0].exercise_details[0].video_url);
    setMappedTimeToExercises({});
    times.map((item) => {
      let temp = careplanIdArray;
      temp.push({ time: item, careplanId: data[0].pp_cp_id });
    });
    checkExerciseStatus(data[0].time_slot[0], data[0].exercise_status);
  };

  console.log("id array iss");
  console.log(careplanIdArray[selectedTime]);
  const [exactTime, setExactTime] = useState();
  useEffect(() => {
    let key = Object.keys(mappedTimeToExercises);
    //console.log(mappedTimeToExercises[key[0]])
    // SetchoosenTime(JSON.stringify(key[selectedTime]));
    console.log("selected time ", selectedTime);
    console.log("selected choosen time1 ", chosenTime);
    console.log("selected ", key);
    setExactTime(chosenTime);
  }, [selectedTime]);
  const checkDisablitiy = (current) => {
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    return current && current < moment(yesterday, "YYYY-MM-DD");
  };

  const onSelectedDay1 = async (val, episodeId) => {
    console.log(episodeId);
    console.log("before converting ", val);
    SetcustomisedDate(convert(val));
    setLoading(true);
    setExercises([]);
    setTimes([]);
    let a = [];
    //    console.log('on selecting : ' + convert(val))
    let result = await GetPatientCarePlan(episodeId, convert(val));
    if (result[1].length > 0) {
      console.log(result[1][0].exercise_status);
      setExerciseStatus(result[1][0].exercise_status);
      result[1][0].time_slot.forEach((i, index) => {
        Object.values(result[1][0].exercise_status[i]).indexOf("completed") <
          0 && a.push([i, index]);
        if (a.length > 0) {
          console.log(a[0][0]);
          setSelectedTime(a[0][1]);
          SetchoosenTime(a[0][0]);
          setstartStatus(true);
          sessionStorage.setItem('status',true)
          if (result[1][0].time_slot[index][0] in mappedTimeToExercises) {
            setExercises(
              mappedTimeToExercises[result[1][0].time_slot[index][0]]
            );
            console.log("time slot ", mappedTimeToExercises);
          }
        } else {
          setstartStatus(false);
          sessionStorage.setItem('status',true)
        }
      });
      console.log("get yes patient careplan ", result[1][0].exercise_status);
    } else {
      console.log("no");
      setExerciseStatus({});
      console.log("get yes no patient careplan ", {});
    }
    setLoading(false);
    if (result[0]) {
      try {
        let data = result[1];
        if (data.length !== 0) {
          if (data.length == 1) {
            console.log("get update ",data);
            UpdateCarePlanStateData(data);
          } else {
            console.log("get combine");
            combineTwoCarePlan(data);
          }
        } else {
          //   onChangeVideoUrl("");
        }
      } catch (err) {
        console.log(err);
      }
    }
    var isDisabled = checkDisablitiy(val);
    setButtonDisabled(isDisabled), setSelectedDate(val);
  };
  //Update Care Plan State

  // console.log(allvisits)

  //UseEffect
  useEffect(() => {
    async function getPlan() {
      setLoading(true);
      const pepisode = await GetPatientCurrentEpisode();
      //    console.log(pepisode[1])
      if (pepisode[1].length > 0) {
        Setcurrentepisode(pepisode[1][0].pp_ed_id);
        //  console.log(currentEpissode)
        dispatch({
          type: "changeEpisodeId",
          payload: {
            value: pepisode[1][0].pp_ed_id,
          },
        });
        // const data = await get_prescription(pepisode[1][0].pp_ed_id);
        // console.log("prescription ", data);
        // dispatch({
        //   type: "PRESCRIPTION_CHANGE",
        //   payload: {
        //     value: data,
        //   },
        // });
        onSelectedDay1(new Date(), pepisode[1][0].pp_ed_id);
        //  console.log('on select k neeche')
      }

      //  console.log("on selecting0 : " + convert(new Date()))

      setLoading(false);
    }
    getPlan();
  }, []);

  useEffect(() => {
    async function getCalanderData() {
      setLoading(true);
      const calData = await GetCalanderDataApi();

      console.log(JSON.stringify(calData));
      SetcalendarData(calData);

      //  console.log("on selecting0 : " + convert(new Date()))

      setLoading(false);
    }
    getCalanderData();
  }, []);

  //  onSelectedDay(new Date())

  // console.log(customisedDate)
  //Selected Date
  console.log(careplanIdArray);

  //  console.log(currentEpissode+'useStateepisode')
  //Get Day
  const day = (d) => {
    switch (d) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const TimeSlots = (times) => {
    return (
      <div className="p-2 text-start mb-4 mt-2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <h3 className=" fw-bold text-center mainDate">
            {selectedDate
              ? day(new Date(selectedDate).getDay())
              : day(new Date().getDay())}
          </h3>
          <h3 className=" fw-bold ms-2 mainDate">
            {selectedDate
              ? moment(customisedDate).format("DD-MMM-YYYY")
              : moment(customisedDate).format("DD-MMM-YYYY")}
          </h3>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ol class="ProgressBar">
            {times.map((time, index) => {
              console.log(time, exercise_status[time]);
              let tempStat =
                Object.values(exercise_status[time]).indexOf("completed") >= 0
                  ? false
                  : true;

              return (
                <li
                  className={
                    tempStat
                      ? "ProgressBar-step is-current"
                      : "ProgressBar-step is-complete"
                  }
                >
                  <span className="ProgressBar-icon">
                    {tempStat ? (
                      <MdPendingActions
                        size={20}
                        style={{ color: "white", marginBottom: "5px" }}
                      />
                    ) : (
                      <BiCheck
                        size={20}
                        style={{ color: "white", marginBottom: "5px" }}
                      />
                    )}
                  </span>

                  <span className="ProgressBar-stepLabel">{time}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  };

  //Cotinue button Click
  const handleClick = (exercise) => {
    console.log("selected choosen time ", chosenTime);
    console.log("selected Exact time ", exactTime);
    console.log("selected careplanidarray ", careplanIdArray[selectedTime]);
    console.log("selected time slots ", times);
    console.log("selected exercises ", exercises);
    const mapExer = (time) => {
      exercises.map((ex) => {
        ex["ChoosenTime"] = time;
        if (ex.name == "YouTube") {
          ex.video_url = ex.youtube_link;
        }
      });
    };
    if (combine) {
      if (chosenTime === undefined) {
        console.log(true);
        // exercise["ChoosenTime"] = careplanIdArray[selectedTime].time
        mapExer(careplanIdArray[selectedTime].time);
      } else {
        // exercise["ChoosenTime"] = exactTime[0]
        console.log(false);
        mapExer(exactTime[0]);
      }
    } else {
      if (exactTime !== 0) {
        exercise["ChoosenTime"] = chosenTime;
      } else {
        mapExer(chosenTime);
      }
    }

    const exArr = [];
    exercises.map((ex) => {
      exArr.push(ex.name);
    });
    console.log(chosenTime);
    exercise["ChoosenTime"] = chosenTime
      ? chosenTime
      : Object.keys(mappedTimeToExercises)[0]
      ? Object.keys(mappedTimeToExercises)[0]
      : times[selectedTime];
    exercise["careplanId"] = exercise.pp_cp_id;
    console.log("final exercises are ", exercises);
    let repArr = []
    exercises.map((exercise) => {
      repArr.push(exercise.Rep)
      console.log("final exercises are ", exercise.Rep);
    });
    console.log("final exercises are ", repArr);
    if (!status_flag) {
      history.push({
        pathname: "/patient/exercises/brief",
        state: {
          exercise: exercises[0],
          exercises,
          exNameList: exArr,
          status_flag,
          repArr,
        },
      });
    } else {
      history.push({
        pathname: "/patient/exercises/manual",
        state: {
          exercise: exercises[0],
          exercises,
          exNameList: exArr,
          status_flag,
          repArr,
        },
      });
    }
  };

  //Exercise Card
  const ExerciseCard = (exercise) => {
    console.log("card showing ", exercise);
    return (
      <Card
        cover={
          exercise.name == "YouTube" ? (
            <ReactPlayer
              controls={true}
              className="react-player "
              url={exercise.youtube_link}
              style={{margin:'auto'}}
              width={250}
              height={300}
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.image_url}`}
              alt={`image_${exercise.ex_em_id}`}
              width={250}
              height={300}
              style={{margin:'auto',width:'100%'}}
            />
          )
        }
      >
        <Meta
          description={
            <p
              style={{
                color: "#000000",
                marginBottom: "50px",
                fontSize: "22px",
                fontWeight: "bolder",
              }}
            >
              {exercise.name ? exercise.name : ""}
            </p>
          }
          //  description={exercise.name ? exercise.name : ""}
        />
      </Card>
      // <div className="main-exercise-card" id="main-exercise-card">
      // <img
      //   src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.image_url}`}
      //   alt={`image_${exercise.ex_em_id}`}
      //   width={120}
      //   height={120}
      //   style={{ borderRadius: 60 }}
      // />
      //   <div className="ms-0 main-exercise-card" id="main-exercise-card">
      //     <h4 className="fw-bol">{exercise.name ? exercise.name : ""}</h4>
      //   </div>
      // </div>
    );
  };

  var date = new Date();

  const checkStatus = () => {
    console.log("status checking...");
    if (combine) {
      if (chosenTime === undefined) {
        console.log(
          "status combine checking 1",
          careplanIdArray[selectedTime].time
        );
        //  mapExer(careplanIdArray[selectedTime].time)
        checkExerciseStatus(
          careplanIdArray[selectedTime].time,
          exercise_status
        );
      } else {
        console.log("status combine checking 2", exactTime[0]);
        //  mapExer(exactTime[0])
        checkExerciseStatus(exactTime[0], exercise_status);
      }
    } else {
      if (exactTime !== 0) {
        console.log("status not combine checking 1", exactTime);
        // mapExer(exactTime)
        checkExerciseStatus(exactTime, exercise_status);
      } else {
        console.log("status not combine checking 2", times[0]);
        // mapExer(times[0])
        checkExerciseStatus(times[0], exercise_status);
      }
    }
  };
  const checkStatus1 = () => {
    console.log("status checking1...");
    console.log("status checking1... ", exercise_status1);
    if (combine) {
      if (chosenTime === undefined) {
        console.log(
          "status combine checking 1",
          careplanIdArray[selectedTime].time
        );
        //  mapExer(careplanIdArray[selectedTime].time)
        checkExerciseStatus1(
          careplanIdArray[selectedTime].time,
          exercise_status1
        );
      } else if (exactTime[0] === undefined) {
        console.log("conflict..", exactTime);
        console.log(
          "conflict.. combine checking 1",
          careplanIdArray[selectedTime].time
        );
      } else {
        console.log("status combine checking 2", exactTime[0]);
        //  mapExer(exactTime[0])
        checkExerciseStatus1(exactTime[0], exercise_status1);
      }
    } else {
      if (exactTime !== 0) {
        console.log("status not combine checking 1", exactTime);
        // mapExer(exactTime)
        // checkExerciseStatus(exactTime,exercise_status)
      } else {
        console.log("status not combine checking 2", times[0]);
        // mapExer(times[0])
        //  checkExerciseStatus(times[0],exercise_status)
      }
    }
  };
  useEffect(() => {
    if (exercises.length > 0 && update) {
      console.log("status checking if");
      checkStatus();
    }
    if (exercises.length > 0 && combine) {
      console.log("status checking else");
      checkStatus1();
    }
  }, [chosenTime]);
  return (
    <>
      {loading && (
        <div style={{ marginLeft: "40%", marginRight: "40%", marginTop: 50 }}>
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      )}

      {exercises.length !== 0 ? (
        <div className="careplanBox">
          {times.length > 0 && TimeSlots(times)}
          {!startStatus  && (
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <ConfettiExplosion
              force={0.6}
              duration={5000}
              particleCount={200}
              floorHeight={1600}
              floorWidth={1600}
            />
            </div>
          )}
          {!startStatus && (
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                width: "100%",
                height: "100%",
              }}
            >
              <div class="checkmark-circle">
                <div class="background"></div>
                <div class="checkmark draw"></div>
              </div>
              <h2>Congratulations!</h2>
              <p>You have completed your careplan for today. Well done!</p>
            </div>
          )}
          <div
            className="border px-2 py-2 me-2 mt-2 exercise-card2"
            id="exercise-card2"
          >
            <Carousel autoplay>
              {exercises.map((ex, index) => {
                return <div>{ExerciseCard(ex)}</div>;
              })}
            </Carousel>
          </div>

          {exercises.length > 0 && (
            <>
              {startStatus && (
                <div className="p-2 ">
                  <Button
                  className="startButton"
                    style={{ float: "right" }}
                    onClick={() => handleClick(exercises)}
                    size={"large"}
                  >
                    Start Now
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        !loading && (
          <div className="">
            <Empty
              description="No Careplan Available"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )
      )}
    </>
  );
};
export default PatientCareplan;
