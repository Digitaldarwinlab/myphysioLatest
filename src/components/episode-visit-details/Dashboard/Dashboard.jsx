import React, { useState, useEffect } from "react";
import moment from "moment";
import LineGraph from "./LineGraph";
import { CaretRightFilled, CaretLeftOutlined } from "@ant-design/icons";
import { TbReportMedical } from "react-icons/tb";
import { Button, Modal } from "antd";
import { GetPatientCurrentEpisode } from "../../../PatientAPI/PatientDashboardApi";
import {
  fetchDashboardDetails,
  fetchSummaryDetails,
} from "../../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../../API/Episode/EpisodeApi";
import { DateRangePicker } from "rsuite";
import "./Dash.css";
import ReactPlayer from "react-player";

const Dashboard = (props) => {
  // console.log(props.value);
  const { beforeToday } = DateRangePicker;
  const [value, setValue] = useState();
  const [exerciseValue, setExerciseValue] = useState();
  const [option, setOption] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showValue, setShowValue] = useState();
  const [summaryTimeSlots, setSummaryTimeSlots] = useState();
  const [summaryExerciseComplete, setSummaryExerciseComplete] = useState();
  const [summaryPainMeter, setSummaryPainMeter] = useState();
  const [exercisedates, setExerciseDates] = useState([]);
  const [exerciseAlloted, setExerciseAlloted] = useState();
  const [exercisecompleted, setExercisecompleted] = useState();
  const [setsAlloted, setSetsAlloted] = useState();
  const [setscompleted, setSetscompleted] = useState();
  const [repsAlloted, setRepsAlloted] = useState();
  const [repscompleted, setRepscompleted] = useState();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [week, setWeek] = useState(moment());
  const [startDate, setstartDate] = useState(
    week.startOf("week").format("YYYY/MM/DD")
  );
  const [endDate, setEndDate] = useState(
    week.endOf("week").format("YYYY/MM/DD")
  );
  const start_date = moment(week, "DD/MM/YYYY")
    .startOf("week")
    .format("DD/MM/YYYY");
  const end_date = moment(week, "DD/MM/YYYY")
    .endOf("week")
    .format("DD/MM/YYYY");
  const [weekValue, setweekValue] = useState([
    moment(start_date, "DD/MM/YYYY")._d,
    moment(end_date, "DD/MM/YYYY")._d,
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
      setShowValue(a);
      setExerciseDates(exDate);
    }
    nameChange();
    async function data() {
      const data2 = props.patient
        ? await GetPatientCurrentEpisode()
        : await getEpisode(props.patientId);
      let der = (await props.patient)
        ? data2[1].length > 0 && data2[1][0].pp_ed_id
        : data2[0].pp_ed_id;
      let response = await fetchDashboardDetails(der, startDate, endDate);
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

      var output = main.reduce(function (o, cur) {
        var occurs = o.reduce(function (n, item, i) {
          return item.exercise === cur.exercise ? i : n;
        }, -1);
        if (occurs >= 0) {
          o[occurs].value = o[occurs].value.concat(cur.value);
          o[occurs].date = o[occurs].date.concat(cur.date);
        } else {
          var obj = {
            exercise: cur.exercise,
            value: [cur.value],
            date: [cur.date],
          };
          o = o.concat([obj]);
        }

        return o;
      }, []);
      let combine = await output;
      setExerciseValue(combine);
      let exerciseAllot = [];
      let repsAllot = [];
      let setAllot = [];
      let exerciseComplete = [];
      let repsComplete = [];
      let setComplete = [];
      async function combining() {
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)
            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["exercise_alloted"],
                null,
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let exercise_alloted = await getData(m, exDate, null);
            exerciseAllot.push(...exercise_alloted);
            setExerciseAlloted(exerciseAllot);
          }
        });
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)
            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["reps_alloted"],
                null,
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let reps_alloted = await getData(m, exDate, null);
            repsAllot.push(...reps_alloted);
            setRepsAlloted(repsAllot);
          }
        });
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)
            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["set_alloted"],
                null,
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let set_alloted = await getData(m, exDate, null);
            setAllot.push(...set_alloted);
            setSetsAlloted(setAllot);
          }
        });
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)
            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["reps_completed"]
                  ? e["value"][e["date"].indexOf(val)]["reps_completed"]
                  : e["value"][e["date"].indexOf(val)]["reps_pending"]
                  ? parseInt(
                      e["value"][e["date"].indexOf(val)]["reps_alloted"]
                    ) -
                    parseInt(e["value"][e["date"].indexOf(val)]["reps_pending"])
                  : "0",
                parseInt(e["value"][e["date"].indexOf(val)]["reps_alloted"]) ===
                parseInt(
                  e["value"][e["date"].indexOf(val)]["reps_completed"]
                    ? e["value"][e["date"].indexOf(val)]["reps_completed"]
                    : e["value"][e["date"].indexOf(val)]["reps_pending"]
                )
                  ? "completed"
                  : e["value"][e["date"].indexOf(val)]["exercise_alloted"] ===
                    e["value"][e["date"].indexOf(val)]["exercise_completed"]
                  ? "completed"
                  : "remaining",
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let reps_completed = await getData(m, exDate, null);
            repsComplete.push(...reps_completed);
            setRepscompleted(repsComplete);
          }
        });
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)

            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["set_completed"]
                  ? e["value"][e["date"].indexOf(val)]["set_completed"]
                  : e["value"][e["date"].indexOf(val)]["set_pending"]
                  ? parseInt(
                      e["value"][e["date"].indexOf(val)]["set_alloted"]
                    ) -
                    parseInt(e["value"][e["date"].indexOf(val)]["set_pending"])
                  : "0",

                parseInt(e["value"][e["date"].indexOf(val)]["set_alloted"]) ===
                parseInt(e["value"][e["date"].indexOf(val)]["set_completed"])
                  ? "completed"
                  : e["value"][e["date"].indexOf(val)]["exercise_alloted"] ===
                    e["value"][e["date"].indexOf(val)]["exercise_completed"]
                  ? "completed"
                  : "remaining",
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let set_completed = await getData(m, exDate, null);
            setComplete.push(...set_completed);
            setSetscompleted(setComplete);
          }
        });
        await combine.forEach(async (e) => {
          let m = [];
          let xvr = exDate.filter((x) => !e["date"].includes(x));
          // let b = await diff(exercisedates, a)
          xvr.forEach(async (val) => {
            m.push([val, "-", null, e["exercise"]]);
            // let a = await getData(val, "-", exDate);
            //  console.log(a)
          });
          e["date"].forEach(async (val) => {
            // console.log(e['exercise'],val)

            if (e["date"].indexOf(val) !== -1) {
              m.push([
                val,
                e["value"][e["date"].indexOf(val)]["exercise_completed"]
                  ? e["value"][e["date"].indexOf(val)]["exercise_completed"]
                  : e["value"][e["date"].indexOf(val)]["exercise_pending"]
                  ? parseInt(
                      e["value"][e["date"].indexOf(val)]["exercise_alloted"]
                    ) -
                    parseInt(
                      e["value"][e["date"].indexOf(val)]["exercise_pending"]
                    )
                  : "0",
                parseInt(
                  e["value"][e["date"].indexOf(val)]["exercise_alloted"]
                ) ===
                parseInt(
                  e["value"][e["date"].indexOf(val)]["exercise_completed"]
                )
                  ? "completed"
                  : "remaining",
                e["exercise"],
              ]);
            }
          });

          // console.log(m);
          if (m.length === 7) {
            let exercise_completed = await getData(m, exDate, null);
            exerciseComplete.push(...exercise_completed);
            setExercisecompleted(exerciseComplete);
          }
        });
      }
      // await combine.forEach(async (e) => {
      //   let xvr = exDate.filter((x) => !e["date"].includes(x));
      //   // console.log(b);
      //   xvr.forEach(async (val) => {
      //     await getData(val, "-", exDate);
      //   });
      //   we.forEach(async (val) => {
      //     if (e["date"].indexOf(val) !== -1) {
      //       let reps_alloted = await getData(
      //         val,
      //         e["value"][e["date"].indexOf(val)]["reps_alloted"],
      //         exDate,
      //         null
      //       );
      //       if (reps_alloted !== undefined) {
      //         if (reps_alloted.length === 7) {
      //           setRepsAlloted(reps_alloted);
      //         }
      //       }
      //     }
      //   });
      // });
      // await combine.forEach(async (e) => {
      //   let xvr = exDate.filter((x) => !e["date"].includes(x));
      //   // console.log(b);
      //   xvr.forEach(async (val) => {
      //     await getData(val, "-", exDate);
      //   });
      //   we.forEach(async (val) => {
      //     if (e["date"].indexOf(val) !== -1) {
      //       let set_alloted = await getData(
      //         val,
      //         e["value"][e["date"].indexOf(val)]["set_alloted"],
      //         exDate,
      //         null
      //       );
      //       if (set_alloted !== undefined) {
      //         if (set_alloted.length === 7) {
      //           setSetsAlloted(set_alloted);
      //         }
      //       }
      //     }
      //   });
      // });
      // await combine.forEach(async (e) => {
      //   let xvr = exDate.filter((x) => !e["date"].includes(x));
      //   // console.log(b);
      //   xvr.forEach(async (val) => {
      //     await getData(val, "-", exDate);
      //   });
      //   we.forEach(async (val) => {
      //     if (e["date"].indexOf(val) !== -1) {
      //       let exercise_completed = await getData(
      //         val,
      //         e["value"][e["date"].indexOf(val)]["exercise_completed"]
      //           ? e["value"][e["date"].indexOf(val)]["exercise_completed"]
      //           : e["value"][e["date"].indexOf(val)]["exercise_pending"]
      //           ? parseInt(
      //               e["value"][e["date"].indexOf(val)]["exercise_alloted"]
      //             ) -
      //             parseInt(
      //               e["value"][e["date"].indexOf(val)]["exercise_pending"]
      //             )
      //           : "-",
      //         exDate,
      //         parseInt(
      //           e["value"][e["date"].indexOf(val)]["exercise_alloted"]
      //         ) ===
      //           parseInt(
      //             e["value"][e["date"].indexOf(val)]["exercise_completed"]
      //               ? e["value"][e["date"].indexOf(val)]["exercise_completed"]
      //               : e["value"][e["date"].indexOf(val)]["exercise_pending"]
      //           )
      //           ? "remaining"
      //           : "completed"
      //       );
      //       if (exercise_completed !== undefined) {
      //         if (exercise_completed.length === 7) {
      //           setExercisecompleted(exercise_completed);
      //         }
      //       }
      //     }
      //   });
      // });
      // await combine.forEach(async (e) => {
      //   let xvr = exDate.filter((x) => !e["date"].includes(x));
      //   // console.log(b);
      //   xvr.forEach(async (val) => {
      //     await getData(val, "-", exDate);
      //   });
      //   we.forEach(async (val) => {
      //     if (e["date"].indexOf(val) !== -1) {
      //       let set_completed = await getData(
      //         val,
      //         e["value"][e["date"].indexOf(val)]["set_completed"]
      //           ? e["value"][e["date"].indexOf(val)]["set_completed"]
      //           : e["value"][e["date"].indexOf(val)]["set_pending"]
      //           ? parseInt(e["value"][e["date"].indexOf(val)]["set_alloted"]) -
      //             parseInt(e["value"][e["date"].indexOf(val)]["set_pending"])
      //           : "0",
      //         exDate,
      //         parseInt(e["value"][e["date"].indexOf(val)]["set_alloted"]) ===
      //           parseInt(
      //             e["value"][e["date"].indexOf(val)]["set_completed"]
      //               ? e["value"][e["date"].indexOf(val)]["set_completed"]
      //               : e["value"][e["date"].indexOf(val)]["set_pending"]
      //           )
      //           ? "completed"
      //           : "remaining"
      //       );
      //       if (set_completed !== undefined) {
      //         if (set_completed.length === 7) {
      //           setSetscompleted(set_completed);
      //         }
      //       }
      //     }
      //   });
      // });
      // await combine.forEach(async (e) => {
      //   let xvr = exDate.filter((x) => !e["date"].includes(x));
      //   // console.log(b);
      //   xvr.forEach(async (val) => {
      //     await getData(val, "-", exDate);
      //   });
      //   we.forEach(async (val) => {
      //     if (e["date"].indexOf(val) !== -1) {
      //       let reps_completed = await getData(
      //         val,
      //         e["value"][e["date"].indexOf(val)]["reps_completed"]
      //           ? e["value"][e["date"].indexOf(val)]["reps_completed"]
      //           : e["value"][e["date"].indexOf(val)]["reps_pending"]
      //           ? parseInt(e["value"][e["date"].indexOf(val)]["reps_alloted"]) -
      //             parseInt(e["value"][e["date"].indexOf(val)]["reps_pending"])
      //           : "0",
      //         exDate,
      //         parseInt(e["value"][e["date"].indexOf(val)]["reps_alloted"]) ===
      //           parseInt(
      //             e["value"][e["date"].indexOf(val)]["reps_completed"]
      //               ? e["value"][e["date"].indexOf(val)]["reps_completed"]
      //               : e["value"][e["date"].indexOf(val)]["reps_pending"]
      //           )
      //           ? "completed"
      //           : "remaining"
      //       );
      //       if (reps_completed !== undefined) {
      //         if (reps_completed.length === 7) {
      //           setRepscompleted(reps_completed);
      //         }
      //       }
      //     }
      //   });
      // });
      await combining();
      setValue(combinedItems(main));
    }
    async function summary() {
      const data = props.patient
        ? await GetPatientCurrentEpisode()
        : await getEpisode(props.patientId);
      let der = (await props.patient)
        ? data[1].length > 0 && data[1][0].pp_ed_id
        : data[0].pp_ed_id;
      let response = await fetchSummaryDetails(der, startDate, endDate);
      let objLength = Object.keys(response).length;
      for (let i = 0; i < objLength; i++) {
        const [dateVal, valueVal] = Object.entries(response)[i];
        summaryArray.push([dateVal, valueVal]);
        summaryDates.push(dateVal);
      }

      let time_slots = [];
      let exercise_complete = [];
      let pain_meter = [];
      let pain_option = [];
      await summaryArray.forEach(async (e) => {
        let xvr = exDate.filter((x) => !summaryDates.includes(x));
        xvr.forEach(async (val) => {
          time_slots.push({
            value: "-",
            date: val,
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
                value: e["1"]["time_slots"],
                date: val,
              });
            }
          }
        });
        let val = await uniqBy(time_slots, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        // console.log(val)
        setSummaryTimeSlots(val);
      });
      await summaryArray.forEach(async (e) => {
        let xvr = exDate.filter((x) => !summaryDates.includes(x));
        xvr.forEach(async (val) => {
          exercise_complete.push({
            value: "-",
            date: val,
            className: "",
          });
          // let a = await getData(val, "-", exDate);
          //  console.log(a)
        });
        summaryDates.forEach(async (val) => {
          // console.log(e['exercise'],val)
          if (summaryDates.indexOf(val) !== -1) {
            if (e[0] === val) {
              exercise_complete.push({
                value: e["1"]["exercise_completed"],
                date: val,
                className:
                  e["1"]["exercise_completed"] === e["1"]["time_slots"]
                    ? "completed"
                    : "remaining",
              });
            }
          }
        });
        let val = await uniqBy(exercise_complete, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setSummaryExerciseComplete(val);
      });
      await summaryArray.forEach(async (e) => {
        let m = [];
        let xvr = exDate.filter((x) => !summaryDates.includes(x));
        xvr.forEach(async (val) => {
          pain_meter.push({
            value: "-",
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
                  value: avg.toFixed(),
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
                pain_option.push({
                  x: new Date(val),
                  y: parseInt(avg.toFixed()),
                });
              } else {
                pain_meter.push({
                  value: "-",
                  date: val,
                  className: "",
                });
                pain_option.push({
                  x: new Date(val),
                  y: 1,
                });
              }
            }
          }
        });
        let val = await uniqBy(pain_meter, JSON.stringify);
        val = await val.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        let paingraph = await uniqBy(pain_option, JSON.stringify);
        paingraph = await paingraph.sort(function (a, b) {
          return new Date(a.x) - new Date(b.x);
        });
        console.log(paingraph);
        setOption(paingraph);
        setSummaryPainMeter(val);
      });
    }
    if (props.patientId || props.patient) {
      data();
      summary();
    }
  }, [startDate, endDate]);

  // result = onlyInA.concat(onlyInB);

  // console.log(result);
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
  return (
    <div className="otherDashboard">
      {value !== undefined ? (
        <>
          <Modal
            title="Pain Scale Graph"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            style={{ width: "100%", resize: "none" }}
          >
            <div>
              <LineGraph value={option} />
            </div>
          </Modal>
          <div
            style={{
              width: "100%",
              overflow:'scroll'
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
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
            {value.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "10px",
                  marginRight: "20px",
                }}
              >
                <Button type="primary" onClick={showModal}>
                  PainScale
                  <TbReportMedical />
                </Button>
              </div>
            )}
          </div>
          {value.length > 0 ? (
            <div>
              <table
                className="table table-striped table-hover tableclass"
                id="table"
                style={{overflow:'auto'}}
              >
                <>
                  <thead>
                    <tr>
                      <th
                        style={{ borderRight: "1px solid #2d7ecb" }}
                        scope="col"
                      ></th>
                      <th
                        scope="col"
                        style={{ borderLeft: "1px solid #2d7ecb" }}
                      ></th>
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
                  <thead>
                    <tr>
                      <th
                        style={{ borderRight: "1px solid #2d7ecb" }}
                        scope="col"
                      >
                        Summary
                      </th>
                      <th
                        scope="col"
                        style={{
                          borderBottom: "1px solid #2d7ecb",
                          borderRight: "1px solid #2d7ecb",
                        }}
                      ></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <th
                        style={{
                          borderBottom: "none",
                          borderTop: "none",
                          backgroundColor: "#ECECEC",
                        }}
                      ></th>
                      <td>Time Slots</td>
                      {summaryTimeSlots !== undefined && (
                        <>
                          {summaryTimeSlots.map((i) => (
                            <td>{i["value"]}</td>
                          ))}
                        </>
                      )}
                    </tr>
                    <tr className="text-center">
                      <th
                        style={{
                          borderBottom: "none",
                          borderTop: "none",
                          backgroundColor: "#ECECEC",
                        }}
                      ></th>
                      <td>
                        Pain Scale
                        <br />
                        <span style={{ fontSize: "12px" }}>(Out of 10)</span>
                      </td>
                      {summaryPainMeter !== undefined && (
                        <>
                          {summaryPainMeter.map((i) => (
                            <td>
                              <span className={i["className"]}>
                                {i["value"]}
                              </span>
                            </td>
                          ))}
                        </>
                      )}
                    </tr>
                    <tr className="text-center">
                      <th
                        style={{
                          borderBottom: "none",
                          borderTop: "none",
                          backgroundColor: "#ECECEC",
                        }}
                      ></th>
                      <td>Time Slots Completed</td>
                      {summaryExerciseComplete !== undefined && (
                        <>
                          {summaryExerciseComplete.map((i) => (
                            <td>
                              <span className={i["className"]}>
                                {i["value"]}
                              </span>
                            </td>
                          ))}
                        </>
                      )}
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th
                        style={{ borderRight: "1px solid #2d7ecb" }}
                        scope="col"
                      >
                        Exercises
                      </th>
                      <th
                        scope="col"
                        style={{ borderLeft: "1px solid #2d7ecb" }}
                      ></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
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
                            <th rowSpan="7" style={{ position: "sticky" }}>
                              <div className="logo">
                                <span className="fw-bold">
                                  <span className="number">{index + 1}</span>{" "}
                                  {exercise["exercise"]}
                                </span>
                                {exerciseValue.map((image) =>
                                  image["exercise"] === exercise["exercise"] ? (
                                    <>
                                      {image["value"][0]["image_url"] === "" ? (
                                        <ReactPlayer
                                          controls={true}
                                          className="react-player"
                                          url={image["value"][0].youtube_link}
                                          style={{ margin: "auto" }}
                                          width={280}
                                          height={250}
                                        />
                                      ) : (
                                        <img
                                          src={
                                            process.env.REACT_APP_EXERCISE_URL +
                                            "/" +
                                            image["value"][0]["image_url"]
                                          }
                                          alt=""
                                        />
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )
                                )}
                              </div>
                            </th>
                          </tr>
                          <tr className="text-center">
                            <td className="text-center">Time Slots</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exerciseAlloted !== undefined && (
                                  <>
                                    {exerciseAlloted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
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
                                  <>
                                    {repsAlloted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
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
                            <td>Sets</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {setsAlloted !== undefined && (
                                  <>
                                    {setsAlloted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
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
                            <td>Reps Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {repscompleted !== undefined && (
                                  <>
                                    {repscompleted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["reps_completed"] ? (
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["reps_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["reps_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                            <td>Sets Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {setscompleted !== undefined && (
                                  <>
                                    {setscompleted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["set_completed"] ? (
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {exercise["value"]["set_completed"]}
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
                                    {exercise["value"]["set_completed"] ? (
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"]["set_alloted"]
                                          ) ===
                                          parseInt(
                                            exercise["value"]["set_completed"]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
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
                            <td>Time Slots Completed</td>
                            {Array.isArray(exercise["value"]) ? (
                              <>
                                {exercisecompleted !== undefined && (
                                  <>
                                    {exercisecompleted.map(
                                      (i) =>
                                        i[1] === exercise["exercise"] && i[0]
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {exercise["date"] === exercisedates[0] ? (
                                  <td>
                                    {exercise["value"]["exercise_completed"] ? (
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
                                      <span
                                        className={
                                          parseInt(
                                            exercise["value"][
                                              "exercise_alloted"
                                            ]
                                          ) ===
                                          parseInt(
                                            exercise["value"][
                                              "exercise_completed"
                                            ]
                                          )
                                            ? "completed"
                                            : exercise["value"][
                                                "exercise_alloted"
                                              ] ===
                                              exercise["value"][
                                                "exercise_completed"
                                              ]
                                            ? "completed"
                                            : "remaining"
                                        }
                                      >
                                        {
                                          exercise["value"][
                                            "exercise_completed"
                                          ]
                                        }
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
