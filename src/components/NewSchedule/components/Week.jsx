import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GetClinicVisits,
  getEndDate,
  GetVisit,
} from "../../../API/Visit/visitApi";
import { useDispatch } from "react-redux";
import moment from "moment";

export default function Week({ setIsVisible, currentWeek }) {
  let Arr = useSelector((state) => state.weekReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Time = [
    "All Days 07:00 AM",
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

    // console.log("0" + time.join(""))
    return "0" + time.join("");
  }

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

  useEffect(() => {
    const getVisits = async () => {
      const responseData = await GetVisit();
      const showVisits = parseVisits(responseData);
      console.log(showVisits);
      setData(showVisits);
      console.log(showVisits);
    };
    let role = JSON.parse(localStorage.getItem("user"));
    const getClinicVisits = async () => {
      const responseData = await GetClinicVisits(role.clinic_id);
      const showVisits = parseVisits(responseData);
      console.log(showVisits);
      setData(showVisits);
    };
    if (role.role == "admin") {
      console.log("role is ", role.role);
      getVisits();
    } else {
      console.log("role is ", role.role);
      getClinicVisits();
    }

    // let role = JSON.parse(localStorage.getItem("user"))
    // // console.log(role)
    // const getClinicVisits = async () => {
    //   console.log(role)
    //     const responseData = await GetClinicVisits(role.clinic_id);
    //     const showVisits = parseVisits(responseData);
    //     setData(showVisits)
    // }

    // getClinicVisits(role)
  }, []);

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

    dispatch({ type: "DAYS", payload: { days: data.days } });

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
  const removeVisitClick = () => {
    dispatch({ type: "NAME", payload: { name: "" } });

    dispatch({ type: "EPISODE_ID", payload: { episode: "" } });
    dispatch({ type: "VISIT_TYPE", payload: { visitType: "" } });

    dispatch({ type: "VISIT_ID", payload: { id: "" } });

    dispatch({ type: "DURATION", payload: { duration: "" } });

    dispatch({ type: "VISIT_STATUS", payload: { status: "" } });

    dispatch({ type: "LOCATION", payload: { location: "" } });

    dispatch({ type: "NOTES", payload: { notes: "" } });

    dispatch({
      type: "VISIT_NUMBER",
      payload: { visit_number: "" },
    });

    dispatch({ type: "OCCURENCE", payload: { occurence: "" } });

    dispatch({ type: "IS_REPEAT", payload: { isRepeat: "" } });

    dispatch({ type: "CREATED_BY", payload: { created_by: "" } });
  };

  console.log("Weekly", data);

  return (
    <>
      <div className="container" style={{ overflowX: "auto" }}>
        <table className="weekTable">
          <thead>
            <tr>
              <th className="week_headcol"> </th>
              {weeks.map((week, i) => (
                <td key={i} className="week_head">
                  {week} {+Arr[i]}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td className="all_day" style={{ position: "relative" }}>
                All Days
              </td>
              {/* {weeks.map((week, i) => (
                <td
                  key={i}
                  onClick={() => {
                    setIsVisible(true);
                  }}
                  className="all-border"
                  id={week}
                ></td>
              ))}
            </tr> */}

            {Time.map((time, i) => (
              <React.Fragment key={i}>
                <tr className="">
                  <td className="tabel_head" style={{ position: "relative" }}>
                    {time}
                  </td>
                  {weeks.map((week, i) => (
                    <td
                      key={i}
                      onClick={() => {
                        data.forEach((d) => {
                          console.log(d);
                          if (
                            !(
                              new Date(d.startDate).getDate() === +Arr[i] &&
                              new Date(d.startDate).getMonth() ===
                                currentWeek.toDate().getMonth() &&
                              tConvert(d.startTime)[8] === time[6] &&
                              tConvert(d.startTime).includes(
                                time.slice(0, 3)
                              ) &&
                              d.startTime.slice(3, 5) < 15
                            )
                          ) {
                            removeVisitClick();
                          } else {
                            handleVisitClick(d);
                          }
                        });
                        const newDate = currentWeek.toDate().toUTCString();
                        if (time[6] === "P" && time.slice(0, 2) !== "12") {
                          console.log(
                            "From P",
                            Arr[i] +
                              newDate.slice(7, 17) +
                              (+time.slice(0, 2) + 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) + 6) +
                                  ":30:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        } else {
                          console.log(
                            "From A",
                            newDate.slice(7, 17) +
                              (+time.slice(0, 2) - 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) - 6) +
                                  ":30:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        }
                        setIsVisible(true);
                      }}
                      className="week_line"
                      id={time}
                    >
                      {data
                        .filter(
                          (d) =>
                            new Date(d.startDate).getDate() === +Arr[i] &&
                            new Date(d.startDate).getMonth() ===
                              currentWeek.toDate().getMonth() &&
                            tConvert(d.startTime)[8] === time[6] &&
                            tConvert(d.startTime).includes(time.slice(0, 3)) &&
                            d.startTime.slice(3, 5) < 15
                        )
                        .map((d, i) => (
                          <button
                            key={d.id}
                            style={{display:'block',margin:'auto'}}
                            onClick={() => handleVisitClick(d)}
                          >
                            {d.patient || "Is Present"}
                          </button>
                        ))}
                    </td>
                  ))}
                </tr>
                <tr className="">
                  <td className="tabel_head"></td>
                  {weeks.map((week, i) => (
                    <td
                      key={i}
                      id={time}
                      onClick={() => {
                        data.forEach((d) => {
                          console.log(d);
                          if (
                            !(
                              new Date(d.startDate).getDate() === +Arr[i] &&
                              new Date(d.startDate).getMonth() ===
                                currentWeek.toDate().getMonth() &&
                              tConvert(d.startTime)[8] === time[6] &&
                              tConvert(d.startTime).includes(
                                time.slice(0, 3)
                              ) &&
                              d.startTime.slice(3, 5) >= 15 &&
                              d.startTime.slice(3, 5) < 30
                            )
                          ) {
                            removeVisitClick();
                          } else {
                            handleVisitClick(d);
                          }
                        });
                        const newDate = currentWeek.toDate().toUTCString();
                        if (time[6] === "P" && time.slice(0, 2) !== "12") {
                          console.log(
                            "From P",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) + 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) + 6) +
                                  ":45:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        } else {
                          console.log(
                            "From A",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) - 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) - 6) +
                                  ":45:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        }
                        setIsVisible(true);
                      }}
                      className="week_line"
                    >
                      {data
                        .filter(
                          (d) =>
                            new Date(d.startDate).getDate() === +Arr[i] &&
                            new Date(d.startDate).getMonth() ===
                              currentWeek.toDate().getMonth() &&
                            tConvert(d.startTime)[8] === time[6] &&
                            tConvert(d.startTime).includes(time.slice(0, 3)) &&
                            d.startTime.slice(3, 5) >= 15 &&
                            d.startTime.slice(3, 5) < 30
                        )
                        .map((d, i) => (
                          <button
                            key={d.id}
                            style={{display:'block',margin:'auto'}}
                            onClick={() => {
                              handleVisitClick(d);
                            }}
                          >
                            {d.patient || "Is Present"}{" "}
                          </button>
                        ))}
                    </td>
                  ))}
                </tr>
                <tr className="">
                  <td className="tabel_head"></td>
                  {weeks.map((week, i) => (
                    <td
                      key={i}
                      id={time}
                      onClick={() => {
                        data.forEach((d) => {
                          console.log(d);
                          if (
                            !(
                              new Date(d.startDate).getDate() === +Arr[i] &&
                              new Date(d.startDate).getMonth() ===
                                currentWeek.toDate().getMonth() &&
                              tConvert(d.startTime)[8] === time[6] &&
                              tConvert(d.startTime).includes(
                                time.slice(0, 3)
                              ) &&
                              d.startTime.slice(3, 5) >= 30 &&
                              d.startTime.slice(3, 5) < 45
                            )
                          ) {
                            removeVisitClick();
                          } else {
                            handleVisitClick(d);
                          }
                        });

                        const newDate = currentWeek.toDate().toUTCString();
                        if (time[6] === "P" && time.slice(0, 2) !== "12") {
                          console.log(
                            "From P",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) + 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) + 7) +
                                  ":00:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        } else {
                          console.log(
                            "From A",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) - 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) - 5) +
                                  ":00:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        }
                        setIsVisible(true);
                      }}
                      className="week_line"
                    >
                      {data
                        .filter(
                          (d) =>
                            new Date(d.startDate).getDate() === +Arr[i] &&
                            new Date(d.startDate).getMonth() ===
                              currentWeek.toDate().getMonth() &&
                            tConvert(d.startTime)[8] === time[6] &&
                            tConvert(d.startTime).includes(time.slice(0, 3)) &&
                            d.startTime.slice(3, 5) >= 30 &&
                            d.startTime.slice(3, 5) < 45
                        )
                        .map((d, i) => (
                          <button
                            key={d.id}
                            style={{display:'block',margin:'auto'}}
                            onClick={() => {
                              handleVisitClick(d);
                            }}
                          >
                            {d.patient || "Is Present"}{" "}
                          </button>
                        ))}
                    </td>
                  ))}
                </tr>
                <tr className="">
                  <td className="tabel_head"></td>
                  {weeks.map((week, i) => (
                    <td
                      key={i}
                      id={time}
                      onClick={() => {
                        data.forEach((d) => {
                          console.log(d);
                          if (
                            !(
                              new Date(d.startDate).getDate() === +Arr[i] &&
                              new Date(d.startDate).getMonth() ===
                                currentWeek.toDate().getMonth() &&
                              tConvert(d.startTime)[8] === time[6] &&
                              tConvert(d.startTime).includes(
                                time.slice(0, 3)
                              ) &&
                              d.startTime.slice(3, 5) >= 45 &&
                              d.startTime.slice(3, 5) < 60
                            )
                          ) {
                            removeVisitClick();
                          } else {
                            handleVisitClick(d);
                          }
                        });
                        const newDate = currentWeek.toDate().toUTCString();
                        if (time[6] === "P" && time.slice(0, 2) !== "12") {
                          console.log(
                            "From P",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) + 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) + 7) +
                                  ":15:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        } else {
                          console.log(
                            "From A",
                            newDate.slice(0, 17) +
                              (+time.slice(0, 2) - 6) +
                              ":30:00" +
                              newDate.slice(25, 29)
                          );
                          dispatch({
                            type: "VISIT_DATE",
                            payload: {
                              date: moment(
                                +Arr[i] +
                                  newDate.slice(7, 17) +
                                  (+time.slice(0, 2) - 5) +
                                  ":15:00" +
                                  newDate.slice(25, 29)
                              ),
                            },
                          });
                        }
                        setIsVisible(true);
                      }}
                      className="week_line"
                    >
                      {data
                        .filter(
                          (d) =>
                            new Date(d.startDate).getDate() === +Arr[i] &&
                            new Date(d.startDate).getMonth() ===
                              currentWeek.toDate().getMonth() &&
                            tConvert(d.startTime)[8] === time[6] &&
                            tConvert(d.startTime).includes(time.slice(0, 3)) &&
                            d.startTime.slice(3, 5) >= 45 &&
                            d.startTime.slice(3, 5) < 60
                        )
                        .map((d, i) => (
                          <button
                            key={d.id}
                            style={{display:'block',margin:'auto'}}
                            onClick={() => {
                              handleVisitClick(d);
                            }}
                          >
                            {d.patient || "Is Present"}{" "}
                          </button>
                        ))}
                    </td>
                  ))}
                </tr>
                {/* <tr >
                                        <td className='time_subhead' id={`${time[0]}:30`}><p>{time}</p></td>
                                        {
                                            weeks.map((week, i) => (
                                                <td key={i} id={time} onClick={() => {
                                                    console.log('WWWW',week);
                                                    const newDate = new Date().toUTCString()
                                                    if(time[6] === 'P' && time.slice(0,2)!=='12'){
                                                      console.log('From P',newDate.slice(0,17) + (+time.slice(0,2)+ 6)+':30:00' + newDate.slice(25,29))
                                                      dispatch({type:'VISIT_DATE',payload:{date:moment((+Arr[i])+newDate.slice(7,17) + (+time.slice(0,2)+ 7)+':00:00' + newDate.slice(25,29))}})
                                                    } else {
                                                      console.log('From A',newDate.slice(0,17) + (+time.slice(0,2) - 6)+':30:00' + newDate.slice(25,29))
                                                      dispatch({type:'VISIT_DATE',payload:{date:moment((+Arr[i])+newDate.slice(7,17) + (+time.slice(0,2) - 5)+':00:00' + newDate.slice(25,29))}})
                                                    }
                                                    setIsVisible(true)
                                                }}
                                                    className='week_line'>{data.filter(d => new Date(d.startDate).getDate() === +Arr[i]  && tConvert(d.startTime)[8] === time[6] && tConvert(d.startTime).includes(time.slice(0,3)) && d.startTime.slice(3,5) >= 30 && d.startTime.slice(3,5) < 60 ).map((d,i) =>  <button key={d.id} onClick={(() => {handleVisitClick(d)})}>{d.patient || 'Is Present'} </button>)}</td>
                                            ))
                                        }
                                    </tr> */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
