import { React, useEffect, useState } from "react";
import BackButton from "./../shared/BackButton";
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";
import { GetPatientCurrentEpisode } from "../../PatientAPI/PatientDashboardApi";
import DoctorImg from './../../assets/doctor.webp'
import PatientImg from './../../assets/patient.webp'
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  Radio,
  Tooltip,
  Empty,
  Spin,
  Card,
  Carousel,
} from "antd";
import { GetPatientCarePlan } from "../../PatientAPI/PatientShedule";
import ConfettiExplosion from "react-confetti-explosion";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "./../shared/LinearProgress";
import { GetCalanderDataApi } from "../../PatientAPI/PatientDashboardApi";
import { BiCheck } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import CircularBar from "./../shared/CircularProgress";
import BottomCard from "./../shared/BottomCard";
import moment from "moment";
import "./Profile.css";
import ReactPlayer from "react-player";
import {
  fetchDashboardDetails,
  fetchSummaryDetails,
} from "../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../API/Episode/EpisodeApi";
import FormInput from "../../components/UI/antInputs/FormInput";
import FormDate from "../../components/UI/antInputs/FormDate";
import validation from "../../components/Validation/authValidation/authValidation";
import { Link, useHistory } from "react-router-dom";
import { UpdateState } from "../../API/PatientRegistration/Patient";
import { Patient_profile } from "../../API/PatientRegistration/Patient";
import {
  STATECHANGE,
  VALIDATION,
  BASIC_CLEARSTATE,
  PATIENT_REG_FAILURE,
} from "../../contextStore/actions/authAction";
import { Patient_Update } from "../../API/PatientRegistration/Patient";

let about =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi";
//Style

const styles = {
  notesView: {
    backgroundColor: "#fbfbfb",
    padding: 12,
    height: "auto",
    boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.2)",
  },
};
const { Meta } = Card;
const PatientProfile = () => {
  const history = useHistory();
  const state = useSelector((state) => state.basicDetailsInitialState);
  const newstate = useSelector((state) => state);
  const dispatch = useDispatch();
  const [reportValue, setReportValue] = useState("a");
  const [timeSlotsDaily, settimeSlotsDaily] = useState();
  const [painMeterDaily, setpainMeterDaily] = useState();
  const [timeSlotsWeekly, settimeSlotWeekly] = useState();
  const [painMeterWeekly, setpainMeterWeekly] = useState();
  const [week, setWeek] = useState(moment());
  const [startDate, setstartDate] = useState(
    week.startOf("week").format("YYYY/MM/DD")
  );
  const [endDate, setEndDate] = useState(
    week.endOf("week").format("YYYY/MM/DD")
  );
  function uniqBy(a, key) {
    var index = [];
    return a.filter(function (item) {
      var k = key(item);
      return index.indexOf(k) >= 0 ? false : index.push(k);
    });
  }
  useEffect(() => {
    let a = [];
    let date = [];
    let excercise = [];
    let main = [];
    let exDate;
    let summaryArray = [];
    let summaryDates = [];
    function nameChange() {
      let date = moment(startDate).subtract(1, "day").format("DD");
      let date2 = moment(startDate).format("YYYY-MM-DD");
      let edate = moment(endDate).format("YYYY-MM-DD");
      function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());

        const dates = [];

        while (date <= endDate) {
          dates.push(moment(new Date(date)).format("YYYY-MM-DD"));
          date.setDate(date.getDate() + 1);
        }

        return dates;
      }

      let mainDates = getDatesInRange(new Date(date2), new Date(edate));
      let month = moment(startDate).format("M");
      let month2 = moment(startDate).format("MM");
      let year = moment(startDate).format("YYYY");
      let d = [];
      let m = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      };
      let a = [];
      let b = [];
      mainDates.forEach((val) => {
        let s = moment(val).format("DD");
        let mon = moment(val).format("M");
        mon = m[parseInt(mon)];
        a.push(s + " " + mon);
      });
      for (let i = 1; i < 8; i++) {
        // a.push(parseInt(date) + i + " " + m[parseInt(month)]);
        let s = JSON.stringify(parseInt(date) + i);
        if (s.length === 1) {
          b.push(year + "-" + month2 + "-" + 0 + s);
        } else {
          b.push(year + "-" + month2 + "-" + s);
        }
      }
      exDate = getDatesInRange(new Date(date2), new Date(edate));
    }
    nameChange();
    async function summary() {
      const data = await GetPatientCurrentEpisode();
      let der = data[1].length > 0 && data[1][0].pp_ed_id;
      let response = await fetchSummaryDetails(der, startDate, endDate);
      let objLength = Object.keys(response).length;
      for (let i = 0; i < objLength; i++) {
        const [dateVal, valueVal] = Object.entries(response)[i];
        summaryArray.push([dateVal, valueVal]);
        summaryDates.push(dateVal);
      }
      console.log(summaryArray);
      let time_slots_daily = [];
      let time_slots = [];
      let exercise_complete = [];
      let pain_meter = [];
      let pain_meter_daily = [];
      let pain_option = [];
      await summaryArray.forEach(async (e) => {
        // console.log(e['exercise'],val)
        let a = moment().format("YYYY-MM-DD");
        console.log(a);
        if (e[0] === a) {
          // console.log(e)
          time_slots_daily.push({
            time_slot: e["1"]["time_slots"],
            exercise_complete: e["1"]["exercise_completed"],
            className:
              e["1"]["exercise_completed"] === e["1"]["time_slots"]
                ? "green"
                : "#F6BE00",
            date: e[0],
          });
        }

        let val = await uniqBy(time_slots_daily, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        settimeSlotsDaily(val);
      });
      await summaryArray.forEach(async (e) => {
        let a = moment().format("YYYY-MM-DD");
        console.log(a);
        if (e[0] === a) {
          // console.log(e)
          const sum = e["1"]["pain_meter"].reduce(
            (a, b) => parseInt(a) + parseInt(b),
            0
          );
          // console.log(sum)
          const avg = sum / e["1"]["pain_meter"].length || 0;
          pain_meter_daily.push({
            painScale: parseInt(avg.toFixed()),
            total: 10,
            className:
              parseInt(avg.toFixed()) < 4
                ? "green"
                : parseInt(avg.toFixed()) > 4 ||
                  parseInt(avg.toFixed()) < 7 ||
                  parseInt(avg.toFixed()) === 4
                ? "#F6BE00"
                : "red",
          });
        }

        let val = await uniqBy(pain_meter_daily, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setpainMeterDaily(val);
      });
      await summaryArray.forEach(async (e) => {
        let xvr = exDate.filter((x) => !summaryDates.includes(x));
        xvr.forEach(async (val) => {
          time_slots.push({
            time_slots: 0,
            exercise_complete: 0,
            date: val
          });
          // let a = await getData(val, "-", exDate);
          //  console.log(a)
        });
        summaryDates.forEach(async (val) => {
          // console.log(e['exercise'],val)
          if (summaryDates.indexOf(val) !== -1) {
            if (e[0] === val) {
              // console.log(e)
              time_slots.push({
                time_slots: e["1"]["time_slots"],
                exercise_complete: e["1"]["exercise_completed"],
                date: val,
              });
            }
          }
        });
        console.log(time_slots)
        let val = await uniqBy(time_slots, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        
        let time = val.map((str) => str.time_slots);
        let complete = val.map((str) => str.exercise_complete);
        console.log(time,complete)
        const timeSlotsum = time.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const exercisecompletesum = complete.reduce(
          (a, b) => parseInt(a) + parseInt(b),
          0
        );
        let value = {
          time_slot: timeSlotsum,
          exercise_complete: exercisecompletesum,
          className: timeSlotsum === exercisecompletesum ? "green" : "#F6BE00",
        };
        console.log(value)
        settimeSlotWeekly(value);
      });
      await summaryArray.forEach(async (e) => {
        let m = [];
        let xvr = exDate.filter((x) => !summaryDates.includes(x));
        xvr.forEach(async (val) => {
          pain_meter.push({
            value: 0,
            date: val,
            className: "",
          });
          pain_option.push({
            x: new Date(val),
            y: 1,
          });
        });
        summaryDates.forEach(async (val) => {
          // console.log(e['exercise'],val)
          if (summaryDates.indexOf(val) !== -1) {
            if (e[0] === val) {
              if (e["1"]["pain_meter"].length > 0) {
                const sum = e["1"]["pain_meter"].reduce(
                  (a, b) => parseInt(a) + parseInt(b),
                  0
                );
                // console.log(sum)
                const avg = sum / e["1"]["pain_meter"].length || 0;
                // console.log(avg)
                pain_meter.push({
                  value: parseInt(avg.toFixed()),
                  date: val,
                  className:
                    parseInt(avg.toFixed()) < 4
                      ? "completed"
                      : parseInt(avg.toFixed()) > 4 ||
                        parseInt(avg.toFixed()) < 7 ||
                        parseInt(avg.toFixed()) === 4
                      ? "remaining"
                      : "pending",
                });
              } else {
                pain_meter.push({
                  value: 0,
                  date: val,
                  className: "",
                });
              }
            }
          }
        });
        let val = await uniqBy(pain_meter, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        console.log(val);
        let time = val.map((str) => str.value);
        const painScalesum = time.reduce(
          (a, b) => parseInt(a) + parseInt(b),
          0
        );
        let val2 = await val.filter(function (a) {
          return a['value'] !== 0 ;
        });
        console.log(val2);
        let valLength =  val2.length === 0 ? 1 :  val2.length
        let value = {
          painScale: parseInt((painScalesum / valLength).toFixed()),
          total: 10,
          className:
            painScalesum < 4
              ? "green"
              : painScalesum > 4 || painScalesum < 7 || painScalesum === 4
              ? "#F6BE00"
              : "red",
        };
        setpainMeterWeekly(value);
      });
    }
    summary();
  }, [startDate, endDate]);
  let b = [];
  let a = [];
  const getData = async (arr, mainDates, classname) => {
    let we = {};
    // console.log(arr)
    let c;
    // a.push([date, value, classname]);
    arr.forEach((val) => {
      // console.log(val)
      if (val[0] === mainDates[0]) {
        we[1] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[1]) {
        we[2] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[2]) {
        we[3] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[3]) {
        we[4] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[4]) {
        we[5] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[5]) {
        we[6] = [val[1], val[2], val[3]];
      } else if (val[0] === mainDates[6]) {
        we[7] = [val[1], val[2], val[3]];
      }
    });

    for (let i = 1; i < 8; i++) {
      {
        we[i][1] === null || we[i][0] === "-"
          ? b.push([<td>{we[i][0]}</td>, we[i][2]])
          : b.push([
              <td>
                <span className={we[i][1]}>{we[i][0]}</span>
              </td>,
              we[i][2],
            ]);
      }
    }

    // console.log(b);
    c = b;
    b = [];
    a = [];
    // console.log(c)
    return c;
  };
  const handleChange = (key, value, id = 0) => {
    dispatch({
      type: STATECHANGE,
      payload: {
        key,
        value,
      },
    });
    if (key === "State") {
      if (!value) setCityList([]);
      else setCityList(StateCity[value]);
    }
    dispatch({ type: "NOERROR" });
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    let error = {};
    if (key === "Email") {
      error = validation.checkEmailValidation(e.target.value);
    } else if (key === "pincode") {
      error = validation.checkPincodeValidation(e.target.value);
    } else if (key === "Address") {
      error = validation.checkAddrValidation(e.target.value);
    } else if (key === "EmergencyContact") {
      error = validation.checkMobNoValidation(e.target.value);
      if (error.error) error.error = "Emergency " + error.error;
    } else if (key === "MobileNo" || key === "WhatsAppNo") {
      error = validation.checkMobNoValidation(e.target.value);
      if (error.error) {
        if (key === "MobileNo") error.error = "Mobile " + error.error;
        else error.error = "Whatsapp " + error.error;
      }
    }
    if (error.error) {
      dispatch({ type: VALIDATION, payload: { error: error.error } });
      setTimeout(() => {
        dispatch({ type: VALIDATION, payload: { error: "" } });
      }, 3000);
    }
  };

  const handleOk = async () => {
    let result;
    let a = newstate.BasicDetails
    a.DOB = a.DOB === null ?  '' : a.DOB
    console.log(a)
    result = await Patient_Update(a, dispatch);
    if (result && result[0]) {
      if (JSON.parse(localStorage.getItem("user")).role == "patient") {
        window.location.href = "/patient/dashboard";
      } else {
        window.location.href = "/patients";
      }
    } else {
      dispatch({ type: PATIENT_REG_FAILURE });
      dispatch({ type: VALIDATION, payload: { error: result[1] } });
      setTimeout(() => {
        dispatch({ type: VALIDATION, payload: { error: "" } });
      }, 3000);
    }
  };
  const [form] = Form.useForm();
  const [cityList, setCityList] = useState([]);
  const [patientData, SetpatientData] = useState({});
  const [isupdating, Setisupdating] = useState(false);
  const [allvisits, Setvisits] = useState([]);
  const [visitShow, SetvisitShow] = useState("a");
  const [doctor, SetDoctor] = useState("");
  useEffect(async () => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const patientVisits = await fetchVisits(userId);
    let res;
    if (patientVisits.length > 0) res = await GetPatientCurrentEpisode();
    console.log(res[1][0]);
    let name =
      res[1][0]["treating_doctor_detail"][0]["first_name"] !== undefined ||
      res[1][0]["treating_doctor_detail"][0]["last_name"] !== undefined
        ? res[1][0]["treating_doctor_detail"][0]["first_name"] +
          " " +
          res[1][0]["treating_doctor_detail"][0]["last_name"]
        : "N/A";
    console.log(name);
    SetDoctor(name);
    const sortVisits = patientVisits.filter((data) => {
      //    console.log(data)
      const datetypof = typeof data.appointment_detail.startDate;
      const date =
        datetypof == "number"
          ? new Date(data.appointment_detail.startDate)
              .toISOString()
              .substring(0, 10)
          : data.appointment_detail.startDate.toString().substring(0, 10);

      if (date == moment(new Date()).format("YYYY-MM-DD")) {
        return data;
      }
    });
    let othersortVisits = patientVisits.filter((data) => {
      //    console.log(data)
      const datetypof = typeof data.appointment_detail.startDate;
      const date =
        datetypof == "number"
          ? new Date(data.appointment_detail.startDate)
              .toISOString()
              .substring(0, 10)
          : data.appointment_detail.startDate.toString().substring(0, 10);
      if (new Date(date) > new Date(moment(new Date()).format("YYYY-MM-DD"))) {
        return data;
      }
    });
    othersortVisits = othersortVisits.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(a.appointment_detail.startDate) -
        new Date(b.appointment_detail.startDate)
      );
    });
    Setvisits(visitShow === "a" ? sortVisits : othersortVisits);
  }, [visitShow]);
  useEffect(async () => {
    const henry = await Patient_profile(
      JSON.parse(localStorage.getItem("userId"))
    );
    console.log(henry);
    SetpatientData(henry);
  }, []);

  //ProfilePhoto
  const ProfilePhoto = () => {
    let userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).info
      : { first_name: "Anonymous" };
    let patientName = userInfo.first_name;
    patientName += userInfo.middle_name ? " " + userInfo.middle_name : "";
    patientName += userInfo.last_name ? " " + userInfo.last_name : "";
    return (
      <>
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt="Profile Image"
          width="70%"
          height="auto"
          style={{ borderRadius: 10 }}
        />
        <h4 className="">{patientName}</h4>
      </>
    );
  };

  const edit = () => {
    Setisupdating(true);
    UpdateState(state, patientData, dispatch);
    // history.push('/patient/update');
  };

  const handleReset = () => {
    if (state.physioRegisterReducer.id) {
      if (window.confirm("Confirm, Do You want to Cancel Update?")) {
        dispatch({ type: CLEAR_STATE });
        //  history.push("/physio/list");
      }
    } else {
      if (window.confirm("Confirm, Do You want to Reset all fields?")) {
        dispatch({ type: CLEAR_STATE });
        form.resetFields();
        //  history.push("/physio/register");
      }
    }
  };
  //Current Therapy
  const CurrentTherapy = (therapy, progress) => {
    return (
      <>
        <h4 className="fw-bold">Current Therapy</h4>
        <div
          style={styles.notesView}
          className="border current-therapy"
          id="current-therapy"
        >
          <h5 className="fw-bold">{therapy}</h5>
          <p className="text-justify">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.
          </p>
          <LinearProgress progress={progress} />
          <p className="p fw-bold">{progress}%</p>
        </div>
      </>
    );
  };
  //Track Progress
  const TrackProgress = (score, total, color, text) => {
    console.log(score, total);
    return (
      <div className="text-center">
        <CircularBar
          color={color}
          precentage={(score / total) * 100}
          score={score}
          total={total}
          width="48%"
        />
        <h4 className="fw-bold">{text}</h4>
      </div>
    );
  };

  const [pres, setPres] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [exstatCheck, setExStatCheck] = useState("yes");
  const [startStatus, setstartStatus] = useState(false);
  const [startStatus1, setstartStatus1] = useState(
    JSON.parse(sessionStorage.getItem("status"))
  );

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
          sessionStorage.setItem("status", true);
          if (result[1][0].time_slot[index][0] in mappedTimeToExercises) {
            setExercises(
              mappedTimeToExercises[result[1][0].time_slot[index][0]]
            );
            console.log("time slot ", mappedTimeToExercises);
          }
        } else {
          setstartStatus(false);
          sessionStorage.setItem("status", true);
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
            console.log("get update");
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
    let repArr = exercises.map((exercise) => exercise.Rep);
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
              className="react-player"
              url={exercise.youtube_link}
              style={{ margin: "auto" }}
              width={250}
              height={300}
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_EXERCISE_URL}/${exercise.image_url}`}
              alt={`image_${exercise.ex_em_id}`}
              width={250}
              height={300}
              style={{ margin: "auto", width: "100%" }}
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
                textAlign: "center",
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
      <Row className="m-2 main-container" id="main-container">
        <Col className="lefting-box" id="left-box">
          <Row className="text-center left-row">
            <Col className="report">
              <div className="reportBox">
                <h4 className="fw-bold reportHeading">Progress Report</h4>
                <Radio.Group
                  defaultValue="a"
                  onChange={(e) => setReportValue(e.target.value)}
                  size="large"
                  className="reportRadio"
                  buttonStyle="solid"
                >
                  <Radio.Button
                    value="a"
                    style={{ margin: "10px", borderRadius: "20px" }}
                  >
                    Today
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    style={{
                      margin: "10px",
                      borderRadius: "20px",
                      marginLeft: "-2px",
                    }}
                  >
                    Weekly
                  </Radio.Button>
                </Radio.Group>
              </div>
              {reportValue === "a" ? (
                <div
                  className="TrackProgress"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {timeSlotsDaily !== undefined && (
                    <>
                      {timeSlotsDaily.length > 0 &&
                        TrackProgress(
                          timeSlotsDaily[0]["exercise_complete"],
                          timeSlotsDaily[0]["time_slot"],
                          timeSlotsDaily[0]["className"],
                          "Time Slots"
                        )}
                    </>
                  )}
                  {painMeterDaily !== undefined && (
                    <>
                      {painMeterDaily.length > 0 &&
                        TrackProgress(
                          painMeterDaily[0]["painScale"],
                          painMeterDaily[0]["total"],
                          painMeterDaily[0]["className"],
                          "Pain Scale"
                        )}
                    </>
                  )}
                </div>
              ) : (
                <div
                  className="TrackProgress"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {timeSlotsWeekly !== undefined && (
                    <>
                      {TrackProgress(
                        timeSlotsWeekly["exercise_complete"],
                        timeSlotsWeekly["time_slot"],
                        timeSlotsWeekly["className"],
                        "Time Slots"
                      )}
                    </>
                  )}
                  {painMeterWeekly !== undefined && (
                    <>
                      {TrackProgress(
                        painMeterWeekly["painScale"],
                        painMeterWeekly["total"],
                        painMeterWeekly["className"],
                        "Pain Scale"
                      )}
                    </>
                  )}
                  {/* {painMeterDaily !== undefined && (
                  <>
                    {painMeterDaily.length > 0 &&
                      TrackProgress(
                        painMeterDaily[0]["painScale"],
                        painMeterDaily[0]["total"],
                        painMeterDaily[0]["className"],
                        "Pain Scale"
                      )}
                  </>
                )} */}
                </div>
              )}
            </Col>
            <Col className="dashboardvisit">
              <div className="dashboardvisitBox">
                <h4 className="fw-bold reportHeading">Your Visits</h4>
                <Link to="/patient/visits" style={{ color: "black" }}>
                  <Button className="dashboardvisitButton">View All</Button>
                </Link>
              </div>

              {allvisits.length > 0 ? (
                <div id="dashboardvisitCard">
                  <img
                    src={DoctorImg}
                    className="dashboardvisitImage"
                    alt=""
                  />
                  <div className="dashboardvisitDetails">
                    <p className="w-100 text-start doctorName">
                      <b>Dr. {doctor}</b>
                    </p>
                    <div>
                      <span className="dashboardvisitCol" span={10}>
                        {" "}
                        <b>Time:</b>{" "}
                        {allvisits[0].appointment_detail.start_time}
                      </span>
                      <span
                        className="dashboardvisitCol dashboardcolRight"
                        span={10}
                      >
                        {" "}
                        <b>Duration:</b>{" "}
                        {allvisits[0].appointment_detail.duration}{" "}
                      </span>
                    </div>
                    <div>
                      <span className="dashboardvisitCol" span={12}>
                        <b>Type:</b> {allvisits[0].visit_type}
                      </span>
                      <span
                        className="dashboardvisitCol dashboardcolRight"
                        span={12}
                      >
                        <b>Location:</b> {allvisits[0].location}
                      </span>
                    </div>
                    {allvisits[0].video_link !== "" && (
                      <div
                        className="video-conference-detail"
                        style={{ float: "right" }}
                      >
                        <span className="video-col">
                          {visitShow === "a" ? (
                            <Button
                              className="dashboardchannelButton"
                              type="primary"
                              href={"/patient" +allvisits[0].video_link}
                              shape={"round"}
                              target="_blank"
                            >
                              Join Channel
                            </Button>
                          ) : (
                            <Tooltip title="You can only join on the same date">
                              <Button
                                className="dashboardchannelButton"
                                type="primary"
                                href={"/patient" +allvisits[0].video_link}
                                shape={"round"}
                                target="_blank"
                                disabled
                              >
                                Join Channel
                              </Button>
                            </Tooltip>
                          )}
                          {/* <b> Video Conference Detail:</b>{" "}
                  <a href={i.video_link}>{i.video_link}</a> */}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Empty
                  description="No Visits Available"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col className="righting-box" id="right-box">
          <Row className="right-row" id="right-row">
            <Col>
              <div className="careplanDashboard" id="careplanDashboard">
                {loading && (
                  <div
                    style={{
                      marginLeft: "40%",
                      marginRight: "40%",
                      marginTop: 50,
                    }}
                  >
                    <Spin tip="Loading..." size="large"></Spin>
                  </div>
                )}
                <div className="dashboardvisitBox">
                  <h4 className="fw-bold reportHeading">Your Careplan</h4>
                  {exercises.length !== 0  &&
                  <Link to="/patient/careplan" style={{ color: "black" }}>
                    <Button className="dashboardcareplanButton">Start</Button>
                  </Link>
                  }
                </div>
                {exercises.length !== 0 ? (
                  <div className="dashboardcareplanBox">
                    <div
                      className="border px-2 py-2 me-2 mt-2 dashboardexercise-card2"
                      id="exercise-card2"
                    >
                      <Carousel autoplay>
                        {exercises.map((ex, index) => {
                          return <div>{ExerciseCard(ex)}</div>;
                        })}
                      </Carousel>
                    </div>

                    {/* {exercises.length > 0 && (
                    <>
                      {startStatus && (
                        <div className="p-2 start_now_div_large">
                          <Button
                            style={{ float: "right" }}
                            onClick={() => handleClick(exercises)}
                            size={"large"}
                          >
                            Start Now
                          </Button>
                        </div>
                      )}
                    </>
                  )} */}
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
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="main-container" id="main-container">
        <div className="outer-box border">
          <div class="card shadow-sm">
            <div class="card-header bg-transparent text-center">
              <img
                class="profile_img"
                src={PatientImg}
                alt=""
              />
              <h3>{patientData.first_name && patientData.last_name ?  patientData.first_name + ' ' + patientData.last_name : 'N/A'}</h3>
            </div>
          </div>
          <div className="cardRight">
            <Row gutter={[10, 10]} className="pt-4  detail-row">
              <Col   flex="1 0 25%" className="columnDash" >
                <b>Dob : </b> {patientData.dob ?  patientData.dob : 'N/A'}
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>Gender : </b> {patientData.gender?  patientData.gender : 'N/A'}
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>Blood Group : </b> {patientData.blood_group?  patientData.blood_group : 'N/A'}
              </Col>
            </Row>
            <Row gutter={[10, 10]} className="pt-4  detail-row">
              <Col  flex="1 0 25%" className="columnDash">
                <b>Mobile No : </b>{" "}
                <span className="edit-value" id="mobile">
                  {" "}
                  {isupdating ? (
                    <FormInput
                      name="MobileNo"
                      className="input-field"
                      value={newstate.BasicDetails.MobileNo}
                      placeholder="Enter Patient Mobile Number"
                      required={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={newstate.BasicDetails.MobileNo}
                    />
                  ) : (
                    patientData.mobile_no?  patientData.mobile_no : 'N/A'
                  )}
                </span>
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>Landline : </b>{" "}
                <span className="edit-value" id="landline">
                  {" "}
                  {isupdating ? (
                    <FormInput
                      name="LandlineNo"
                      className="input-field "
                      value={newstate.BasicDetails.LandlineNo}
                      placeholder="Enter Patient Landline Number"
                      required={true}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={newstate.BasicDetails.LandlineNo}
                    />
                  ) : (
                    patientData.landline?  patientData.landline : 'N/A'
                  )}{" "}
                </span>
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>whatsapp number:</b>{" "}
                <span className="edit-value" id="whatsapp">
                  {" "}
                  {isupdating ? (
                    <FormInput
                      name="WhatsAppNo"
                      className="input-field"
                      value={newstate.BasicDetails.WhatsAppNo}
                      placeholder="Enter Patient WhatsApp Number"
                      required={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={newstate.BasicDetails.WhatsAppNo}
                    />
                  ) : (
                    patientData.whatsapp_no?  patientData.whatsapp_no : 'N/A'
                  )}{" "}
                </span>
              </Col>
            </Row>
            <Row gutter={[10, 10]} className="pt-4  detail-row">
              <Col  flex="1 0 25%" className="columnDash">
                <b>E-mail : </b>{" "}
                <span className="edit-value">
                  {" "}
                  {isupdating ? (
                    <FormInput
                      required="true"
                      name="Email"
                      className="input-field"
                      value={newstate.BasicDetails.Email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={newstate.BasicDetails.Email}
                    />
                  ) : (
                    patientData.email?  patientData.email : 'N/A'
                  )}
                </span>
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>Pincode : </b>{" "}
                {isupdating ? (
                  <FormInput
                    required="true"
                    name="pincode"
                    className="input-field w-100"
                    value={newstate.BasicDetails.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={newstate.BasicDetails.pincode}
                  />
                ) : (
                  patientData.pin?  patientData.pin : 'N/A'
                )}
              </Col>
              <Col  flex="1 0 25%" className="columnDash">
                <b>Emergency Contact: </b>
                <span className="edit-value" id="emergency">
                  {" "}
                  {isupdating ? (
                    <FormInput
                      required="true"
                      name="EmergencyContact"
                      className="input-field"
                      style={{ width: "10px" }}
                      value={newstate.BasicDetails.EmergencyContact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={newstate.BasicDetails.EmergencyContact}
                    />
                  ) : (
                    patientData.emergence_contact?  patientData.emergence_contact : 'N/A'
                  )}
                </span>
              </Col>
            </Row>
            <div className="buttons">
            {isupdating ? (
              <Button
                className="text-end"
                id="cancel"
                onClick={() => Setisupdating(false)}
              >
                {" "}
                Cancel
              </Button>
            ) : null}
            {isupdating ? (
              <Button className="text-end btncolor edit-btn" onClick={handleOk}>
                {" "}
                Update
              </Button>
            ) : (
              <Button className="btncolor edit-btn" onClick={edit}>
                {" "}
                Edit
              </Button>
            )}
          </div>
          </div>
          
        </div>
      </Row>
    </>
  );
};
export default PatientProfile;
