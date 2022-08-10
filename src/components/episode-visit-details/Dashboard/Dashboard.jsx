import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { CaretRightFilled, CaretLeftOutlined } from "@ant-design/icons";
import { fetchDashboardDetails } from "../../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../../API/Episode/EpisodeApi";
import { DateRangePicker } from "rsuite";
import "./Dash.css";
import { DateBox } from "devextreme-react";

const Dashboard = (props) => {
  // console.log(props.value);
  moment.tz.setDefault("Asia/Kolkata");
  const { beforeToday } = DateRangePicker;
  const [value, setValue] = useState();
  const [exerciseValue, setExerciseValue] = useState();
  const [showValue, setShowValue] = useState();
  const [exercisedates, setExerciseDates] = useState();
  const [week, setWeek] = useState(moment());
  const [startDate, setstartDate] = useState(
    week.startOf("week").format("YYYY/MM/DD")
  );
  const [endDate, setEndDate] = useState(
    week.endOf("week").format("YYYY/MM/DD")
  );
  const [weekValue, setweekValue] = useState([
    moment(startDate, "DD/MM/YYYY")._d,
    moment(endDate, "DD/MM/YYYY")._d,
  ]);
  // console.log([startDate, endDate]);
  const changeRight = () => {
    let demo = moment(week, "DD/MM/YYYY").add(1, "week").format("DD-MM-YY");
    let arr = [];
    for (let i = 1; i <= 7; i++) {
      let weekMonth = moment(week).add(i, "day").format("M");
      console.log("weekMonth", weekMonth);
      let weekDay = moment(week).add(i, "day").format("D");
      arr.push(weekDay);
    }
    // console.log(moment(demo));
    setWeek(moment(demo, "DD/MM/YYYY"));
    setstartDate(
      moment(demo, "DD/MM/YYYY").startOf("week").format("YYYY/MM/DD")
    );
    setEndDate(moment(demo, "DD/MM/YYYY").endOf("week").format("YYYY/MM/DD"));
    const start_date = moment(demo, "DD/MM/YYYY")
      .startOf("week")
      .format("DD/MM/YYYY");
    const end_date = moment(demo, "DD/MM/YYYY")
      .endOf("week")
      .format("DD/MM/YYYY");
    setweekValue([
      moment(start_date, "DD/MM/YYYY")._d,
      moment(end_date, "DD/MM/YYYY")._d,
    ]);
  };
  const changeLeft = () => {
    let demo = moment(week, "DD/MM/YYYY")
      .subtract(1, "week")
      .format("DD-MM-YY");
    let arr = [];
    for (let i = 0; i <= 6; i++) {
      let weekDay = moment(week, "DD/MM/YYYY")
        .subtract(1, "week")
        .startOf("week")
        .add(i, "day")
        .format("D");
      arr.push(weekDay);
    }
    // console.log(moment(demo));
    setWeek(moment(demo, "DD/MM/YYYY"));
    setstartDate(
      moment(demo, "DD/MM/YYYY").startOf("week").format("YYYY/MM/DD")
    );
    setEndDate(moment(demo, "DD/MM/YYYY").endOf("week").format("YYYY/MM/DD"));
    const start_date = moment(demo, "DD/MM/YYYY")
      .startOf("week")
      .format("DD/MM/YYYY");
    const end_date = moment(demo, "DD/MM/YYYY")
      .endOf("week")
      .format("DD/MM/YYYY");
    setweekValue([
      moment(start_date, "DD/MM/YYYY")._d,
      moment(end_date, "DD/MM/YYYY")._d,
    ]);
  };
  useEffect(() => {
    async function data() {
      let a = [];
      let date = [];
      let excercise = [];
      let mainValue = [];
      const data2 = await getEpisode(props.patientId);
      let response = await fetchDashboardDetails(
        data2[0].pp_ed_id,
        startDate,
        endDate
      );
      let objLength = Object.keys(response).length;
      for (let i = 0; i < objLength; i++) {
        const [name, array] = Object.entries(response)[i];
        // console.log(name,array)
        date.push(name);
        for (let j = 0; j < Object.keys(array).length; j++) {
          const [arrayName, arrayValue] = Object.entries(array)[j];
          // console.log(arrayName, arrayValue);
          mainValue.push({
            exercise: arrayName,
            value: arrayValue,
            date: name,
          });
          if (Object.values(arrayValue).length === 9) {
            for (let l = 0; l < 9; l++) {
              const [mainName, mainValue] = Object.entries(arrayValue)[l];
              let b = { date: name, ExerciseName: arrayName };
              if (mainName !== "image_url" && mainName !== "") {
                b["Metrix"] = mainName;
                b["value"] = mainValue;
                a.push(b);
              } else if (mainName === "image_url") {
                excercise.push([arrayName, mainValue]);
              }
            }
          } else if (Object.values(arrayValue).length === 5) {
            for (let m = 0; m < 5; m++) {
              const [mainName, mainValue] = Object.entries(arrayValue)[m];
              let b = { date: name, ExerciseName: arrayName };
              if (mainName !== "image_url" && mainName !== "") {
                b["Metrix"] = mainName;
                b["value"] = mainValue;
                a.push(b);
              } else if (mainName === "image_url") {
                excercise.push([arrayName, mainValue]);
              }
            }
          }
        }
      }
      function uniqBy(a, key) {
        var index = [];
        return a.filter(function (item) {
          var k = key(item);
          return index.indexOf(k) >= 0 ? false : index.push(k);
        });
      }
      const combinedItems = (arr = []) => {
        const res = arr.reduce((acc, obj) => {
          let found = false;
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].exercise === obj.exercise) {
              found = true;
              //  console.log(acc[i],obj)
              acc[i]["date"] = [acc[i]["date"], obj["date"]];
              acc[i]["value"] = [acc[i]["value"], obj["value"]];
              acc[i].count++;
            }
          }
          if (!found) {
            obj.count = 1;
            acc.push(obj);
          }
          return acc;
        }, []);
        return res;
      };
      console.log(combinedItems(mainValue));
      setValue(combinedItems(mainValue));
      setExerciseDates(date);
      setExerciseValue(uniqBy(excercise, JSON.stringify));
    }
    if (props.patientId) {
      data();
    }
  }, [startDate, endDate]);
  useEffect(() => {
    function nameChange() {
      let date = moment(startDate).format("DD");
      let month = moment(startDate).format("M");
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
      for (let i = 1; i < 8; i++) {
        a.push(parseInt(date) + i + " " + m[parseInt(month)]);
      }
      setShowValue(a);
    }
    nameChange();
  }, [startDate, endDate]);
  const getData = (e) => {
    let a = 8 - parseInt(e);
    console.log(a);
    let b = [];
    for (let i = 1; i < a; i++) {
      b.push(<td className="text-center">-</td>);
    }
    return b;
  };
  return (
    <div className="otherDashboard">
      {value !== undefined ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div className="cus-cal">
              <span className="icon-btn" onClick={changeLeft}>
                <CaretLeftOutlined />
              </span>
              <DateRangePicker
                oneTap
                showOneCalendar
                style={{ border: "none" }}
                value={weekValue}
                hoverRange="week"
                ranges={[]}
                onChange={(value) => {
                  setweekValue(value);
                  setstartDate(
                    moment(value[0]).startOf("week").format("YYYY/MM/DD")
                  );
                  setEndDate(
                    moment(value[0]).endOf("week").format("YYYY/MM/DD")
                  );
                  setWeek(moment(value[1], "DD/MM/YYYY"));
                }}
              />
              <span className="icon-btn" onClick={changeRight}>
                <CaretRightFilled />
              </span>
            </div>
          </div>
          {value.length > 0 ? (
            <div>
              <table
                className="table table-striped table-hover tableclass"
                id="table"
              >
                <>
                  <thead>
                    <tr>
                      <th scope="col">Excercise</th>
                      <th scope="col"></th>
                      {showValue !== undefined && (
                        <>
                          {showValue.map((date) => (
                            <th scope="col">
                              {moment(date).format("DD MMMM")}
                            </th>
                          ))}
                        </>
                      )}
                    </tr>
                  </thead>
                </>

                {exercisedates !== undefined && (
                  <>
                    {value.map((exercise, index) => (
                      <>
                        <tbody
                          style={{ minWidth: "fit-content", overflow: "auto" }}
                        >
                          <tr>
                            <th rowSpan="9" style={{ position: "sticky" }}>
                              <div className="logo">
                                <span className="fw-bold">
                                  <span className="number">{index + 1}</span>{" "}
                                  {exercise["exercise"]}
                                </span>
                                <img
                                  src={
                                    Array.isArray(exercise["value"])
                                      ? process.env.REACT_APP_EXERCISE_URL +
                                        "/" +
                                        exercise["value"][0][0]["image_url"]
                                      : process.env.REACT_APP_EXERCISE_URL +
                                        "/" +
                                        exercise["value"]["image_url"]
                                  }
                                  alt=""
                                />
                              </div>
                            </th>
                            <td className="text-center">Excercise Alloted</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td className="text-center">
                                            {i["exercise_alloted"]}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td className="text-center">
                                    {exercise["value"]["exercise_alloted"]}
                                  </td>
                                ) : (
                                  <td className="text-center">-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Reps</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>{i["reps_alloted"]}</td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>{exercise["value"]["reps_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Reps Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["reps_completed"] ? (
                                              <span className="completed">
                                                {i["reps_completed"]}
                                              </span>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Sets</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["set_alloted"]
                                              ? i["set_alloted"]
                                              : "-"}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>{exercise["value"]["set_alloted"]}</td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Sets Pending</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["set_pending"] ? (
                                              <span className="pending">
                                                {i["set_pending"]}
                                              </span>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["set_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["set_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Sets Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["set_completed"] ? (
                                              <span className="completed">
                                                {i["set_completed"]}
                                              </span>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["tset_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className="completed">
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Exercise Pending</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["exercise_pending"] ? (
                                              <span className="pending">
                                                {i["exercise_pending"]}
                                              </span>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["exercise_pending"] ? (
                                      <span className="pending">
                                        {exercise["value"]["exercise_pending"]}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                          <tr className="text-center">
                            <td>Exercise Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercise["date"][0].map((dates) => (
                                  <>
                                    {exercise["value"][0].map((i) => (
                                      <>
                                        {dates === exercisedates[0] && (
                                          <td>
                                            {i["exercise_completed"] ? (
                                              <span className="completed">
                                                {i["exercise_completed"]}
                                              </span>
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                        )}
                                      </>
                                    ))}
                                  </>
                                ))}
                                {getData(exercise["date"][0].length)}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className="completed">
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                              </>
                            )}
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </>
                )}
              </table>
            </div>
          ) : (
            <p className="fw-bold text-center">No Data Found..</p>
          )}
        </>
      ) : (
        <p className="fw-bold text-center">No Data Found..</p>
      )}
    </div>
  );
};

export default Dashboard;
