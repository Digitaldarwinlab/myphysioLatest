import moment from 'moment-timezone';
import "moment/locale/zh-cn";
import { useEffect, useState } from "react";

import { GetClinicVisits, getEndDate } from "../../../API/Visit/visitApi";
import { useDispatch, useSelector } from "react-redux";

import { DAY_DATE } from "../actions/types";

export default function Day({ setIsVisible, day }) {
  moment.tz.setDefault("Asia/Kolkata")
  const dispatch = useDispatch();
  let dayTag = useSelector((state) => state.Calender.date);
  const [data, setData] = useState([]);

  const time = [
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  // const time = [
  //   "07:00 AM",
  //   "07:30 AM",
  //   "08:00 AM",
  //   "08:30 AM",
  //   "09:00 AM",
  //   "09:30 AM",
  //   "10:00 AM",
  //   "10:30 AM",
  //   "11:00 AM",
  //   "11:30 AM",
  //   "12:00 PM",
  //   "12:30 PM",
  //   "01:00 PM",
  //   "01:30 PM",
  //   "02:00 PM",
  //   "02:30 PM",
  //   "03:00 PM",
  //   "03:30 PM",
  //   "04:00 PM",
  //   "04:30 PM",
  //   "05:00 PM",
  //   "05:30 PM",
  //   "06:00 PM",
  //   "06:30 PM",
  //   "07:00 PM",
  //   "07:30 PM",
  //   "08:00 PM",
  //   "08:30 PM",
  //   "09:00 PM",
  //   "09:30 PM",
  //   "10:00 PM",
  //   "10:30 PM",
  //   "11:00 PM",
  //   "11:30 PM",
  // ];

  const parseVisits = (visits) => {
    console.log(visits);
    let newVisits = [];
    for (let i = 0; i < visits.length; i++) {
      let newData = {};
      newData["episode"] = visits[i].pp_ed_id;
      newData["created_by"] = visits[i].created_by;
      newData["days"] = visits[i].days;
      newData["isRepeat"] = visits[i].isRepeat;
      newData["occurence"] = visits[i].occurence;
      newData["id"] = visits[i].pp_vd_id;
      newData["visit_number"] = visits[i].visit_number;
      newData["complaint"] = visits[i].visit_type;
      newData["notes"] = visits[i].notes;
      newData["status"] = visits[i].status;
      newData["location"] = visits[i].location;
      newData["video_link"] = visits[i].video_link ? visits[i].video_link : "";
      newData["startDate"] = visits[i].appointment_detail.startDate;
      newData["startTime"] = visits[i].appointment_detail.start_time;
      if (!visits[i].appointment_detail.duration) {
        newData["endDate"] = new Date(
          new Date(visits[i].appointment_detail.startDate).getTime() +
            15 * 60 * 1000
        );
      } else {
        newData["endDate"] = new Date(
          new Date(visits[i].appointment_detail.startDate).getTime() +
            getEndDate(visits[i].appointment_detail.duration)
        );
      }
      let starting = new Date(
        visits[i].appointment_detail.startDate
      ).getMinutes();
      let ending = new Date(newData["endDate"]).getMinutes();
      let diff = ending - starting;
      let duration;
      if (diff === 60) {
        duration = "1 hour";
      } else if (diff === 120) {
        duration = "2 hour";
      } else {
        duration = diff.toString() + " minutes";
      }
      newData["duration"] = visits[i].appointment_detail.duration
        ? visits[i].appointment_detail.duration
        : duration;
      newData["allDay"] = visits[i].appointment_detail.allDay
        ? visits[i].appointment_detail.allDay
        : false;
      if (visits[i].patient_datail && visits[i].patient_datail[0]) {
        let { first_name, last_name, pp_patm_id } = visits[i].patient_datail[0];
        newData["patient"] = first_name + " " + last_name + " " + pp_patm_id;
      } else {
        newData["patient"] = visits[i].appointment_detail.patient;
      }
      newVisits.push(newData);
    }
    return newVisits;
  };

  const handleVisitClick = (data) => {
    //         allDay: false
    // complaint: "Check Up"
    // duration: "15 minutes"
    // endDate: Mon May 16 2022 08:45:00 GMT+0530 (India Standard Time) {}
    // episode: 224
    // id: 484
    // location: "Clinic"
    // notes: "NO Notes"
    // patient: "Gaurav Srivastava 242"
    // startDate: "2022-05-16T03:00:00.000Z"
    // startTime: "08:30:00"
    // status: "Pre-Operation"
    // video_link: ""
    // visit_number: 2
    console.log(data);

    dispatch({ type: "NAME", payload: { name: data.patient } });

    dispatch({ type: "EPISODE_ID", payload: { episode: data.episode } });
    dispatch({ type: "VISIT_TYPE", payload: { visitType: data.complaint } });

    dispatch({ type: "VISIT_ID", payload: { id: data.id } });

    dispatch({
      type: "VISIT_DATE",
      payload: { date: moment(new Date(data.startDate)) },
    });

    dispatch({ type: "DURATION", payload: { duration: data.duration } });

    dispatch({ type: "VISIT_STATUS", payload: { status: data.status } });

    dispatch({ type: "LOCATION", payload: { location: data.location } });

    dispatch({ type: "NOTES", payload: { notes: data.notes } });

    dispatch({
      type: "VISIT_NUMBER",
      payload: { visit_number: data.visit_number },
    });

    dispatch({ type: "OCCURENCE", payload: { occurence: data.occurence } });

    dispatch({ type: "IS_REPEAT", payload: { isRepeat: data.isRepeat } });

    dispatch({ type: "CREATED_BY", payload: { created_by: data.created_by } });
  };

  

  useEffect(() => {
    let role = JSON.parse(localStorage.getItem("user"));
    const getClinicVisits = async () => {
      const responseData = await GetClinicVisits(role.clinic_id);
      const showVisits = parseVisits(responseData);
      console.log(showVisits)
      setData(showVisits);
    };

    getClinicVisits(role);
  }, []);

  let m = moment(day, "ddd MMM D YYYY HH:mm a");
  const todayDate = m.toDate().getDate();

  console.log("moment & day", m.toDate().getDate(), day);

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      if (time[1] == "00") return "12:00:00PM";
      if (time[1] > 0 && time[1] < 7) return time[0] + "PM";
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    // console.log(time);
    if (time[0] == 12 || time[0] == 10 || time[0] === 11) return time.join(""); // return adjusted time or original string

    return "0" + time.join("");
  }

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr className="allDay">
            <td className="alldayHead">All Days</td>
            <td className="gap"></td>
          </tr>

          {/* day row */}
          {time.map((t, i) => (
            <>
              <tr key={i} className="tabel_container">
                <td
                  data-content={t[0] > 0 ? t : t.substring(1)}
                  className="tabel-head"
                ></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "PM"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    let hour = e.target.id;
                    console.log(hour);
                    m.set({ h: hour, m: 0 });
                    console.log(m);
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });
                    const newDate = new Date().toUTCString();
                    if (t[6] === "P" && t.slice(0, 2) !== "12") {
                      console.log(
                        "From P",
                        todayDate +
                          newDate.slice(0, 17) +
                          (+t.slice(0, 2) + 7) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(7, 17) +
                              (+t.slice(0, 2) + 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    } else {
                      console.log(
                        "From A",
                        todayDate +
                          newDate.slice(7, 17) +
                          (+t.slice(0, 2) - 5) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(7, 17) +
                              (+t.slice(0, 2) - 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    }

                    console.log(m.format("HH:mm"));
                    console.log(moment(dayTag.date).format("HH:mm"));
                    console.log(t);
                    setIsVisible(true);
                  }}
                  className="tabel-design"
                >
                  {data
                    .filter(
                      (d) =>
                        new Date(d.startDate).getDate() === todayDate &&
                        tConvert(d.startTime)[8] === t[6] &&
                        tConvert(d.startTime).includes(t.slice(0, 3)) &&
                        d.startTime.slice(3, 5) < 15
                    )
                    .map((d, i) => (
                      <button style={{marginRight:'5px',marginTop:'5px'}} onClick={() => handleVisitClick(d)}>
                        {d.patient}
                      </button>
                    ))}
                  {/* {new Date(m._d).getDate() == new Date().getDate() && t.slice(0,5) == '08:00' && <span
                    className='day_data'
                    >
                      {console.log(new Date(m._d).getDate())}
                    {console.log("checking... ",m.format("HH:mm") , " ", moment(dayTag.date).format("HH:mm"))}
                      Select Schdule
                    </span>} */}
                  {/* {m.format("HH:mm") == moment(dayTag.date).format("HH:mm") ? (
                    <span
                    className='day_data'
                    >
                    {console.log("checking... ",m.format("HH:mm") , " ", moment(dayTag.date).format("HH:mm"))}
                      Select Schdule
                    </span>
                  ) : (
                    <span>hello</span>
                  )} */}
                </td>
              </tr>
              <tr>
                <td className="col"></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "Pm"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    // data.forEach((d) => {
                    //   console.log(d)
                    //   if (
                    //     !(
                    //       new Date(d.startDate).getDate() === todayDate &&
                    //     tConvert(d.startTime)[8] === t[6] &&
                    //     tConvert(d.startTime).includes(t.slice(0, 3)) &&
                    //     d.startTime.slice(3, 5) >= 15 &&
                    //     d.startTime.slice(3, 5) < 30
                    //     )
                    //   ) {
                    //     removeVisitClick();
                    //   }
                    //   else{
                    //     handleVisitClick(d)
                    //   }
                    // });
                    let hour = e.target.id;
                    // console.log(hour);
                    var m = moment(day, "ddd MMM D YYYY HH:mm a");

                    m.set({ h: hour, m: 30 });
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });
                    const newDate = new Date().toUTCString();
                    if (t[6] === "P" && t.slice(0, 2) !== "12") {
                      console.log(
                        "From P",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) + 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) + 6) +
                              ":45:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    } else {
                      console.log(
                        "From A",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) - 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) - 6) +
                              ":45:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    }

                    setIsVisible(true);
                  }}
                  className="tabel-design"
                >
                  {" "}
                  {data
                    .filter(
                      (d) =>
                        new Date(d.startDate).getDate() === todayDate &&
                        tConvert(d.startTime)[8] === t[6] &&
                        tConvert(d.startTime).includes(t.slice(0, 3)) &&
                        d.startTime.slice(3, 5) >= 15 &&
                        d.startTime.slice(3, 5) < 30
                    )
                    .map((d, i) => (
                      <button style={{marginRight:'5px',marginTop:'5px'}} key={d.id} onClick={() => handleVisitClick(d)}>
                        {d.patient}
                      </button>
                    ))}
                </td>
              </tr>
              <tr>
                <td className="col"></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "Pm"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    // data.forEach((d) => {
                    //   console.log(d)
                    //   if (
                    //     !(
                    //       new Date(d.startDate).getDate() === todayDate &&
                    //       tConvert(d.startTime)[8] === t[6] &&
                    //       tConvert(d.startTime).includes(t.slice(0, 3)) &&
                    //       d.startTime.slice(3, 5) >= 30 &&
                    //       d.startTime.slice(3, 5) < 45
                    //     )
                    //   ) {
                    //     removeVisitClick();
                    //   }
                    //   else{
                    //     handleVisitClick(d)
                    //   }
                    // });
                    let hour = e.target.id;
                    // console.log(hour);
                    var m = moment(day, "ddd MMM D YYYY HH:mm a");

                    m.set({ h: hour, m: 30 });
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });
                    const newDate = new Date().toUTCString();
                    if (t[6] === "P" && t.slice(0, 2) !== "12") {
                      console.log(
                        "From P",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) + 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) + 7) +
                              ":00:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    } else {
                      console.log(
                        "From A",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) - 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) - 5) +
                              ":00:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    }

                    setIsVisible(true);
                  }}
                  className="tabel-design"
                >
                  {" "}
                  {data
                    .filter(
                      (d) =>
                        new Date(d.startDate).getDate() === todayDate &&
                        tConvert(d.startTime)[8] === t[6] &&
                        tConvert(d.startTime).includes(t.slice(0, 3)) &&
                        d.startTime.slice(3, 5) >= 30 &&
                        d.startTime.slice(3, 5) < 45
                    )
                    .map((d, i) => (
                      <button  style={{marginRight:'5px',marginTop:'5px'}} key={d.id} onClick={() => handleVisitClick(d)}>
                        {d.patient}
                      </button>
                    ))}
                </td>
              </tr>
              <tr>
                <td className="col"></td>
                <td
                  id={
                    t[0] + t[1] == 12
                      ? t[0] + t[1]
                      : t[6] + t[7] == "Pm"
                      ? parseInt(t[0] + t[1]) + 12
                      : t[0] + t[1]
                  }
                  onClick={(e) => {
                    // data.forEach((d) => {
                    //   console.log(d)
                    //   if (
                    //     !(
                    //       new Date(d.startDate).getDate() === todayDate &&
                    //     tConvert(d.startTime)[8] === t[6] &&
                    //     tConvert(d.startTime).includes(t.slice(0, 3)) &&
                    //     d.startTime.slice(3, 5) >= 45 &&
                    //     d.startTime.slice(3, 5) < 60
                    //     )
                    //   ) {
                    //     removeVisitClick();
                    //   }
                    //   else{
                    //     handleVisitClick(d)
                    //   }
                    // });
                    let hour = e.target.id;
                    // console.log(hour);
                    var m = moment(day, "ddd MMM D YYYY HH:mm a");

                    m.set({ h: hour, m: 30 });
                    dispatch({
                      type: DAY_DATE,
                      payload: { dayData: m },
                    });
                    const newDate = new Date().toUTCString();
                    if (t[6] === "P" && t.slice(0, 2) !== "12") {
                      console.log(
                        "From P",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) + 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) + 7) +
                              ":15:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    } else {
                      console.log(
                        "From A",
                        newDate.slice(0, 17) +
                          (+t.slice(0, 2) - 6) +
                          ":30:00" +
                          newDate.slice(25, 29)
                      );
                      dispatch({
                        type: "VISIT_DATE",
                        payload: {
                          date: moment(
                            todayDate +
                              newDate.slice(4, 17) +
                              (+t.slice(0, 2) - 5) +
                              ":15:00" +
                              newDate.slice(25, 29)
                          ),
                        },
                      });
                    }

                    setIsVisible(true);
                  }}
                  className="tabel-design"
                >
                  {" "}
                  {data
                    .filter(
                      (d) =>
                        new Date(d.startDate).getDate() === todayDate &&
                        tConvert(d.startTime)[8] === t[6] &&
                        tConvert(d.startTime).includes(t.slice(0, 3)) &&
                        d.startTime.slice(3, 5) >= 45 &&
                        d.startTime.slice(3, 5) < 60
                    )
                    .map((d, i) => (
                      <button style={{marginRight:'5px',marginTop:'5px'}} key={d.id} onClick={() => handleVisitClick(d)}>
                        {d.patient}
                      </button>
                    ))}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
