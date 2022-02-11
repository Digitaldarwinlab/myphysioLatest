import { useState, useEffect } from "react";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import { Button, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetPatientCarePlan } from "./../../PatientAPI/PatientShedule";
import moment from "moment";
import { Row, Col } from "antd";
import {
  GetPatientCurrentEpisode,
  GetCalanderDataApi,
} from "../../PatientAPI/PatientDashboardApi";
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";
import "./Calendar.css";
import DatePicker from "react-horizontal-datepicker";
import CarePlanView from "../../components/episode-visit-details/carePlanView/carePlanView";
//TimeColors
const activeArr = [
  true,false,false,false,false,
  false,false,false,false,false,
  false]
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
  backgroundColor: "#00294C",
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
const btnStyle = {
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
};

const PatCalendar = ({ onChangeVideoUrl }) => {

  const history = useHistory();
  const state = useSelector((state) => state.patCurrentEpisode);

  const [selectedDate, setSelectedDate] = useState("");
  const [exercises, setExercises] = useState([]);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false); // button Disability
  //const [activeCalVal, setState] = useState(true); 
  const [mappedTimeToExercises, setMappedTimeToExercises] = useState({});
  const [currentEpissode, Setcurrentepisode] = useState(0);
  const [calendarData, SetcalendarData] = useState(0);
  const [allvisits, Setvisits] = useState([]);
  const [choosencareplan, Setchoosencareplan] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toDateString().slice(4,7));
  const [selectedYear, setSelectedYear] = useState(new Date().toDateString().slice(-4))
  const [customisedDate, SetcustomisedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [sortedVisits, SetsortedVisits] = useState([]);
  const [todaysdate, Settodaysdate] = useState(new Date());
  const [chosenTime, SetchoosenTime] = useState(0);
  const [careplanIdArray, SetcareplanIdArray] = useState([]);
 
 

  //  console.log('date is : ' + todaysdate.getDate())
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const combineTwoCarePlan = (data) => {
    //  console.log('data iss')
    //  console.log(data)
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
      setExercises(commonTime[times[selectedTime][0]]);
      if (commonTime[times[0][0]].length > 0)
        onChangeVideoUrl(commonTime[times[0][0]][0].video_url);
    }
    // console.log(commonTime);
  };
  const UpdateCarePlanStateData = (data) => {
    setTimes(data[0].time_slot);
    setExercises(data[0].exercise_details);
    onChangeVideoUrl(data[0].exercise_details[0].video_url);
    setMappedTimeToExercises({});
    times.map((item) => {
      let temp = careplanIdArray;
      temp.push({ time: item, careplanId: data[0].pp_cp_id });
    });
  };

  console.log("id array iss");
  console.log(careplanIdArray[selectedTime]);

  useEffect(() => {
    
    let key = Object.keys(mappedTimeToExercises);
    //console.log(mappedTimeToExercises[key[0]])
    // console.log()
    SetchoosenTime(JSON.stringify(key[selectedTime]));
    //  console.log(selectedTime)
  }, [selectedTime]);

  const checkDisablitiy = (current) => {
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    return current && current < moment(yesterday, "YYYY-MM-DD");
  };

  const onSelectedDay = async (val,idx) => {
 
   activeArr.map((data,index) => {
     if (index===idx) {
      activeArr[index] = true;
     }
     else {
      activeArr[index] = false;
     }
    
   })

   
    SetcustomisedDate(convert(val));

    setLoading(true);
    setExercises([]);
    setTimes([]);
  
    let result = await GetPatientCarePlan(currentEpissode, convert(val));
 
    setLoading(false);
    if (result[0]) {
      try {
        let data = result[1];
        if (data.length !== 0) {
          if (data.length == 1) {
            UpdateCarePlanStateData(data);
          } else {
            combineTwoCarePlan(data);
          }
        } else {
          onChangeVideoUrl("");
        }
      } catch (err) {
        console.log(err);
        onChangeVideoUrl("");
      }
    }
    var isDisabled = checkDisablitiy(val);
   // setButtonDisabled(isDisabled);
    setSelectedDate(val);
  };

  const onSelectedDay1 = async (val, episodeId) => {
    //   console.log(val)

    SetcustomisedDate(convert(val));
    setLoading(true);
    setExercises([]);
    setTimes([]);
    //    console.log('on selecting : ' + convert(val))
    let result = await GetPatientCarePlan(episodeId, convert(val));
    console.log(result[1]);
    setLoading(false);
    if (result[0]) {
      try {
        let data = result[1];
        if (data.length !== 0) {
          if (data.length == 1) {
            UpdateCarePlanStateData(data);
          } else {
            combineTwoCarePlan(data);
          }
        } else {
          onChangeVideoUrl("");
        }
      } catch (err) {
        console.log(err);
        onChangeVideoUrl("");
      }
    }
    var isDisabled = checkDisablitiy(val);
    setButtonDisabled(isDisabled),
    setSelectedDate(val);
  };
  //Update Care Plan State

  useEffect(async () => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const patientVisits = await fetchVisits(userId);

    Setvisits(patientVisits);

    // console.log(allvisits)
  }, []);
  // console.log(allvisits)
  useEffect(() => {
    if (allvisits.length > 0) {
      const sortVisits = allvisits.filter((data) => {
        const datetypof = typeof data.appointment_detail.startDate;
        const date =
          datetypof == "number"
            ? new Date(data.appointment_detail.startDate)
                .toISOString()
                .substring(0, 10)
            : data.appointment_detail.startDate.toString().substring(0, 10);
        //  console.log( 'date is')
        //  console.log(date)
        if (date == customisedDate) {
          return data;
        }
      });
      SetsortedVisits(sortVisits);
    }

    //    console.log('on selectin1 : '+customisedDate)
  }, [customisedDate]);

  useEffect(() => {
    {
      const sortVisits = allvisits.filter((data) => {
        //    console.log(data)
        const datetypof = typeof data.appointment_detail.startDate;
        const date =
          datetypof == "number"
            ? new Date(data.appointment_detail.startDate)
                .toISOString()
                .substring(0, 10)
            : data.appointment_detail.startDate.toString().substring(0, 10);

        if (date == customisedDate) {
          return data;
        }
      });
      SetsortedVisits(sortVisits);
    }
  }, [allvisits]);
  //UseEffect
  //  console.log('sorted')
  // console.log(sortedVisits)
  useEffect(() => {
    async function getPlan() {
      setLoading(true);
      const pepisode = await GetPatientCurrentEpisode();
      //    console.log(pepisode[1])
      if (pepisode[1].length > 0) {
        Setcurrentepisode(pepisode[1][0].pp_ed_id);
        //  console.log(currentEpissode)
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

  //console.log(selectedDate ? new Date(selectedDate).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10) +'Selecteeddd dayyy')
  //  console.log(currentEpissode)
  // console.log('exercises')
  // console.log(exercises)
  //TimeSlot Buttons

  const TimeSlots = (times) => {
    return (
      <div
        className="p-2  border   text-start exercise-card"
        id="exercise-card"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <h3 className="p fw-bold">
            {selectedDate
              ? day(new Date(selectedDate).getDay())
              : day(new Date().getDay())}
          </h3>
          <h3 className="p fw-bold ms-2">
            {selectedDate ? customisedDate : customisedDate}
          </h3>
        </div>
        <div
          className="time-slot-buttons"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {times.map((time, index) => {
            return (
              <Button
                key={index}
                disabled={buttonDisabled}
                style={
                  buttonDisabled
                    ? {
                        ...btnStyle,
                        ...{
                          cursor: buttonDisabled ? "not-allowed" : "pointer",
                          backgroundColor: buttonDisabled ? "gray" : "#00022e",
                        },
                      }
                    : selectedTime === index
                    ? selectedStyle
                    : UnselectedStyle
                }
                onClick={() => {
                  setSelectedTime(index);
                  if (times[index][0] in mappedTimeToExercises) {
                    setExercises(mappedTimeToExercises[times[index][0]]);
                  } else {
                    //pass
                  }
                }}
                className="time-button"
              >
                {time}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  //Cotinue button Click
  const handleClick = (exercise) => {
    console.log()
    exercise["ChoosenTime"] = chosenTime
      ? chosenTime
      : Object.keys(mappedTimeToExercises)[0]
      ? Object.keys(mappedTimeToExercises)[0]
      : times[selectedTime];
    exercise["careplanId"] = careplanIdArray[selectedTime];
    onChangeVideoUrl(exercise.video_url);
    history.push({
      pathname: "/patient/exercises/brief",
      state: {
        exercise,
      },
    });
  };
  //Exercise Card
  const ExerciseCard = (exercise) => {
    return (
      <div className="main-exercise-card" id="main-exercise-card">
        <img
          src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.image_url}`}
          alt={`image_${exercise.ex_em_id}`}
          width={120}
          height={120}
          style={{ borderRadius: 60 }}
        />
        <div className="ms-0 main-exercise-card" id="main-exercise-card">
          <h4 className="fw-bol">{exercise.name ? exercise.name : ""}</h4>
          <Button
            style={{
              ...btnStyle,
              ...{
                cursor:
                  customisedDate !== convert(new Date())
                    ? "not-allowed"
                    : "pointer",
                backgroundColor:
                  customisedDate !== convert(new Date()) ? "gray" : "#00022e",
              },
            }}
            disabled={customisedDate !== convert(new Date()) ? true : false}
           // disabled={}
            onClick={() => handleClick(exercise)}
          >
            Start Now
          </Button>
        </div>
      </div>
    );
  };
  const CalStrip = (data) => {

    let val=data.dayName.substr(0, 3);
    return (
    
        <li >
          <p>{val}</p>
          <p>{data.displayDay}</p>
        </li>
     
    );
  };

  const CalStripActive = (data) => {
 
 let val=data.dayName.substr(0, 3);
    return (
     
        <li class="active">
          <p>{val}</p>
          <p>{data.displayDay}</p>
        </li>
   
    );
  };
  const Prescriptions = () => {
    return (
      <div className="p-2  border visit-card-2" id="visit-card-2">
        <div className="prescription-row">
          <span className="presription-col">
            <b>Prescription Detail : </b> 2 Capsules of Peracetamol and Syrup{" "}
          </span>
        </div>
        <div className="presription-row">
          <div className="prescription-row">
            <span className="presription-col">
              <b>Other Detail</b> Twice a Day after the meal{" "}
            </span>
          </div>
        </div>
      </div>
    );
  };


  

  var date = new Date();

  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const Visits = (data) => {
    var datetypof;
    var date;
    if (data) {
      datetypof = typeof data.appointment_detail.startDate;
      date =
        datetypof == "number"
          ? new Date(data.appointment_detail.startDate)
              .toISOString()
              .substring(0, 10)
          : data.appointment_detail.startDate.toString().substring(0, 10);
      var timeString = data.appointment_detail.start_time;
    }

    try {
      return (
        <div className="p-2  visit-card-1" id="visit-card-1">
          <p
            className="w-100 text-start"
            style={{
              textAlign: "left",
              fontSize: "20px",
              position: "relative",
              left: "10px",
            }}
          >
            <b>Visit Details</b>
          </p>
          <div className="upper-visit-row">
            <span className="visit-col" span={10}>
              {" "}
              <b>Time :</b> {data ? timeString + " " : null}{" "}
            </span>
            <span className="visit-col" span={10}>
              {" "}
              <b>Visit Duration :</b>{" "}
              {data ? data.appointment_detail.duration : "No Visit today"}{" "}
            </span>
          </div>
          <div className="upper-visit-row">
            <span className="visit-col" span={12}>
              <b>Visit Type : </b> {data ? data.visit_type : "No Visit today"}
            </span>
            <span className="visit-col" span={12}>
              {/* aswin 10/24/2021 start */}
              <b>Location : </b> {data ? data.location : "No Location"}
              {/* aswin 10/24/2021 stop */}
            </span>
          </div>

          <div className="video-conference-detail">
            <span className="video-col">
              <b> Video Conference Detail</b> :
              <a
                href={"/patient" + data.video_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.video_link}
              </a>
            </span>
          </div>
        </div>
      );
    } catch (err) {
      return (
        <div className="p-2  visit-card-1" id="visit-card-1">
          <p
            className="w-100 text-start"
            style={{
              textAlign: "left",
              fontSize: "24px",
              position: "relative",
              left: "10px",
            }}
          >
            <b>Visit Details</b>
          </p>
          <div className="upper-visit-row">
            <span className="visit-col" span={10}>
              {" "}
              <b>Today's Visit :</b> {"error in Data"}{" "}
            </span>
            <span className="visit-col" span={10}>
              {" "}
              <b>Visit Timing :</b> {"error in Data"}
            </span>
          </div>
          <div className="upper-visit-row">
            <span className="visit-col" span={12}>
              <b>Visit Type : </b> {"error in Data"}
            </span>
          </div>

          <div className="video-conference-detail">
            <span className="video-col">
              <b> Video Conference Detail</b>
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <center>
        <Row justify="center">
          <div class="calenderView">
            <div class="monthName">
              <h2>{selectedMonth} - {selectedYear}</h2>
            </div>
            <div class="pervsBTN">Prves</div>
            <ul class="daysName">
            {calendarData.length > 0
            ? calendarData.map((data,index) => {
                console.log(data);

             
                
               return (
   
                // Dipsikha 24/10
     <a onClick={() => {onSelectedDay(data.date,index)
     setSelectedMonth(data.displayMonth) 
     setSelectedYear(data.displayYear)}}
    
     >
     {activeArr[index] ? CalStripActive(data) : CalStrip(data)}
     
              </a>       
           )
              })
            : Visits(false)}

              <li></li>
            </ul>
            <div class="nextBTN">next</div>
          </div>

        </Row>
      </center>
      {loading && (
        <div style={{ marginLeft: "40%", marginRight: "40%", marginTop: 50 }}>
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      )}
      <div className="content" id="content">
        <Col className="exercises-cards">
          <Row className="p-2 main-card">
            <ol>
              {sortedVisits.length > 0
                ? sortedVisits.map((data) => {
                    // console.log(data)
                    return Visits(data);
                  })
                : Visits(false)}
            </ol>
          </Row>
          <Row className="p-2 main-card">{Prescriptions()}</Row>
        </Col>
        <Col className="exercises-cards">
          {times.length !== 0 && TimeSlots(times)}
          {exercises.length !== 0
            ? exercises.map((ex, index) => {
                return (
                  <div
                    key={index}
                    className="border px-2 py-2 ms-2 me-2 mt-2 exercise-card2"
                    id="exercise-card2"
                  >
                    {ExerciseCard(ex)}
                  </div>
                );
              })
            : !loading && (
                <p className="text-center p border nothing-present">
                  <b> No Plan For Today</b>{" "}
                </p>
              )}
        </Col>
      </div>
    </>
  );
};
export default PatCalendar;
