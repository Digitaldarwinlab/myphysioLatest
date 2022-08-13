import React, { useState, useEffect } from "react";
import moment from "moment";
import { CaretRightFilled, CaretLeftOutlined } from "@ant-design/icons";
import { fetchDashboardDetails } from "../../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../../API/Episode/EpisodeApi";
import { DateRangePicker } from "rsuite";
import "./Dash.css";
import { DateBox } from "devextreme-react";

const Dashboard = (props) => {
  // console.log(props.value);
  const { beforeToday } = DateRangePicker;
  const [value, setValue] = useState();
  const [exerciseValue, setExerciseValue] = useState();
  const [showValue, setShowValue] = useState();
  const [exercisedates, setExerciseDates] = useState([]);
  const [exerciseAlloted, setExerciseAlloted] = useState();
  const [exercisecompleted, setExercisecompleted] = useState();
  const [setsAlloted, setSetsAlloted] = useState();
  const [setscompleted, setSetscompleted] = useState();
  const [repsAlloted, setRepsAlloted] = useState();
  const [repscompleted, setRepscompleted] = useState();

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
      // console.log("weekMonth", weekMonth);
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
    function nameChange() {
      let date = moment(startDate).subtract(1, "day").format("DD");
      let month = moment(startDate).format("M");
      let month2 = moment(startDate).format("MM");
      let year = moment(startDate).format("YYYY");
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
      for (let i = 1; i < 8; i++) {
        a.push(parseInt(date) + i + " " + m[parseInt(month)]);
        let s = JSON.stringify(parseInt(date) + i);
        if (s.length === 1) {
          b.push(year + "-" + month2 + "-" + 0 + s);
        } else {
          b.push(year + "-" + month2 + "-" + s);
        }
      }
      exDate = b;
      setShowValue(a);
      setExerciseDates(b);
    }
    nameChange();
    async function data() {
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
          main.push({
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
      // console.log(mainValue)
      const combinedItems = (arr = []) => {
        // console.log(arr)
        let date = [];
        let value = [];
        const res = arr.reduce((acc, obj) => {
          // console.log(acc,obj)
          let found = false;
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].exercise === obj.exercise) {
              // console.log(date)
              found = true;
              value.push(obj["value"]);
              date.push(obj["date"]);
              // console.log(acc[i]['date'])
              acc[i]["date"] = [[uniqBy(date, JSON.stringify)]];
                acc[i]["value"] = [[value]];
              acc[i].count++;
            }
          }
          if (!found) {
            obj.count = 1;
            acc.push(obj);
            // console.log(obj['date'])
          }
          return acc;
        }, []);
        return res;
      };

      
      var output = main.reduce(function(o, cur) {
        var occurs = o.reduce(function(n, item, i) {
          return (item.exercise === cur.exercise) ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs].value = o[occurs].value.concat(cur.value);
          o[occurs].date = o[occurs].date.concat(cur.date);
        } else {
      
          var obj = {
            exercise: cur.exercise,
            value: [cur.value],
            date:[cur.date]
          };
          o = o.concat([obj]);
        }
      
        return o;
      }, []);
      
      console.log(output)
      let am = await exDate.filter((x) => !date.includes(x));
      let we = await exDate.filter((x) => !am.includes(x));
      // exercisedates.length > 0 && console.log(exercisedates, date)
      // let am  = await exercisedates.length > 0 && diff(exercisedates, date)
      // let we = await  exercisedates.length > 0 && diff(exercisedates, am)
      // console.log(main)
      let combine = await output;
      console.log(combine)
      await combine.forEach(async (e) => {
        // let a = await diff(exercisedates, date)
        // let b = await diff(exercisedates, a)
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
            let exercise_alloted = await getData(
              val,
              e["value"][0]["exercise_alloted"],
              exDate,
              null
            );
            if (exercise_alloted !== undefined) {
              setExerciseAlloted(exercise_alloted);
            }
          }
        });
      });
      await combine.forEach(async (e) => {
        let a = exercisedates.filter((x) => !date.includes(x));
        let b = exercisedates.filter((x) => !a.includes(x));
        // console.log(b);
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
          let reps_alloted = await getData(
            val,
            e["value"][0]["reps_alloted"],
            exDate,
            null
          );
          if (reps_alloted !== undefined) {
            setRepsAlloted(reps_alloted);
          }
        }
        });
      });
      await combine.forEach(async (e) => {
        let a = exercisedates.filter((x) => !date.includes(x));
        let b = exercisedates.filter((x) => !a.includes(x));
        // console.log(b);
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
          let set_alloted = await getData(
            val,
            e["value"][0]["set_alloted"],
            exDate,
            null
          );
          if (set_alloted !== undefined) {
            setSetsAlloted(set_alloted);
          }
        }
        });
      });
      await combine.forEach(async (e) => {
        let a = exercisedates.filter((x) => !date.includes(x));
        let b = exercisedates.filter((x) => !a.includes(x));
        // console.log(b);
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
          let exercise_completed = await getData(
            val,
            e["value"][0]["exercise_completed"]
              ? e["value"][0]["exercise_completed"]
              : e["value"][0]["exercise_pending"] ? parseInt(e["value"][0]["exercise_alloted"])-parseInt(e["value"][0]["exercise_pending"])  : '-',
            exDate,
            parseInt(e["value"][0]["exercise_alloted"]) ===
            parseInt(e["value"][0]["exercise_completed"] ? e["value"][0]["exercise_completed"] :e["value"][0]["exercise_pending"])
            ? "remaining"
            : "completed"
          );
          if (exercise_completed !== undefined) {
            setExercisecompleted(exercise_completed);
          }
        }
        });
      });
      await combine.forEach(async (e) => {
        let a = exercisedates.filter((x) => !date.includes(x));
        let b = exercisedates.filter((x) => !a.includes(x));
        // console.log(b);
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
          let set_completed = await getData(
            val,
            e["value"][0]["set_completed"]
            ? e["value"][0]["set_completed"]
            : e["value"][0]["set_pending"] ? parseInt(e["value"][0]["set_alloted"])-parseInt(e["value"][0]["set_pending"])  : '0',
          exDate,
          parseInt(e["value"][0]["set_alloted"]) ===
          parseInt(e["value"][0]["set_completed"] ? e["value"][0]["set_completed"] :e["value"][0]["set_pending"])
          ? "completed"
            : "remaining"
          );
          if (set_completed !== undefined) {
            setSetscompleted(set_completed);
          }
        }
        });
      });
      await combine.forEach(async (e) => {
        let a = exercisedates.filter((x) => !date.includes(x));
        let b = exercisedates.filter((x) => !a.includes(x));
        // console.log(b);
        am.forEach(async (val) => {
          await getData(val, "-", exDate);
        });
        we.forEach(async (val) => {
          if(e['date'].indexOf(val) !== -1){
          let reps_completed = await getData(
            val,
            e["value"][0]["reps_completed"]
              ? e["value"][0]["reps_completed"]
              : e["value"][0]["reps_pending"] ? parseInt(e["value"][0]["reps_alloted"])-parseInt(e["value"][0]["reps_pending"])  : '0',
            exDate,
            parseInt(e["value"][0]["reps_alloted"]) ===
            parseInt(e["value"][0]["reps_completed"] ? e["value"][0]["reps_completed"] :e["value"][0]["reps_pending"])
            ? "completed"
            : "remaining"
          );
          if (reps_completed !== undefined) {
            setRepscompleted(reps_completed);
          }
        }
        });
      });

      setValue(combinedItems(main));
      setExerciseValue(date);
    }
    if (props.patientId) {
      data();
    }
  }, [startDate, endDate]);

  // result = onlyInA.concat(onlyInB);

  // console.log(result);
  let a = [];
  let b = [];
  const getData = async (date, value, mainDates, classname) => {
    // console.log(date, value);
    let we = {};
    let c;
    a.push([date, value, classname]);
    let s = await uniqBy(a, JSON.stringify);
    if (s.length === 7) {
      s.forEach((val) => {
        if (val[0] === mainDates[0]) {
          we[1] = [val[1], val[2]];
        } else if (val[0] === mainDates[1]) {
          we[2] = [val[1], val[2]];
        } else if (val[0] === mainDates[2]) {
          we[3] = [val[1], val[2]];
        } else if (val[0] === mainDates[3]) {
          we[4] = [val[1], val[2]];
        } else if (val[0] === mainDates[4]) {
          we[5] = [val[1], val[2]];
        } else if (val[0] === mainDates[5]) {
          we[6] = [val[1], val[2]];
        } else if (val[0] === mainDates[6]) {
          we[7] = [val[1], val[2]];
        }
      });
      for (let i = 1; i < 8; i++) {
        {
          we[i][1] === null || we[i][0] === "-"
            ? b.push(<td>{we[i][0]}</td>)
            : b.push(
                <td>
                  <span className={we[i][1]}>{we[i][0]}</span>
                </td>
              );
        }
      }
    }
    // console.log(b);
    c = b;
    b = [];
    a = [];
    return c;
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
              <span className="icon-btn2" onClick={changeLeft}>
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
              <span className="icon-btn2" onClick={changeRight}>
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
                    {value.map((exercise, index) =>  
                    (
                      <>
                        <tbody
                          style={{ minWidth: "fit-content", overflow: "auto" }}
                        >
                          <tr>
                            <th rowSpan="7" style={{ position: "sticky" }}>
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
                                        exercise['value'][0][0][index]['image_url']
                                      : process.env.REACT_APP_EXERCISE_URL +
                                        "/" +
                                        exercise['value']['image_url']
                                  }
                                  alt=""
                                />
                              </div>
                            </th>
                          </tr>
                          <tr className="text-center">
                            <td className="text-center">Time Slots</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exerciseAlloted !== undefined && (
                                  <>{exerciseAlloted.map((i) => i)}</>
                                )}
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
                                {repsAlloted !== undefined && (
                                  <>{repsAlloted.map((i) => i)}</>
                                )}
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
                                {repscompleted !== undefined && (
                                  <>{repscompleted.map((i) => i)}</>
                                )}
                              </>
                            ) : (
                              <>
                              
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                   {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["reps_alloted"]) ===
                                      parseInt(exercise["date"] ["reps_completed"] ? exercise["date"] ["reps_completed"] :exercise["date"] ["reps_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["reps_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
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
                                {setsAlloted !== undefined && (
                                  <>{setsAlloted.map((i) => i)}</>
                                )}
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
                            <td>Sets Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {setscompleted !== undefined && (
                                  <>{setscompleted.map((i) => i)}</>
                                )}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
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
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["set_alloted"]) ===
                                      parseInt(exercise["date"] ["set_completed"] ? exercise["date"] ["set_completed"] :exercise["date"] ["set_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["set_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
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
                                {exercisecompleted !== undefined && (
                                  <>{exercisecompleted.map((i) => i)}</>
                                )}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[1] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[2] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[3] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[4] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[5] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
                                    )}
                                  </td>
                                ) : (
                                  <td>-</td>
                                )}
                                {exercise["date"] === exercisedates[6] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span className={parseInt(exercise["date"] ["exercise_alloted"]) ===
                                      parseInt(exercise["date"] ["exercise_completed"] ? exercise["date"] ["exercise_completed"] :exercise["date"] ["exercise_pending"])
                                      ? "completed"
                                        : "remaining"
                                      }>
                                        {exercise["value"]["exercise_completed"]}
                                      </span>
                                    ) : (
                                      <span className="remaining"> 0 </span>
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
                    )
                    )}
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
