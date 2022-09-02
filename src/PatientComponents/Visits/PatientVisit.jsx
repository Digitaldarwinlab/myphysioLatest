import moment from "moment";
import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../API/Episode/EpisodeApi";
import { GetPatientCurrentEpisode } from "../../PatientAPI/PatientDashboardApi";
import "./PatientVisits.css";

const PatientVisit = () => {
  const [allvisits, Setvisits] = useState([]);
  const [visitShow, SetvisitShow] = useState('a');
  useEffect(async () => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    const patientVisits = await fetchVisits(userId);
    let res
    if(patientVisits.length > 0 ) res = await GetPatientCurrentEpisode();
    console.log(res[1][0])
    let name =res[1][0]["treating_doctor_detail"][0]["middle_name"] !== ""
    ? res[1][0]["treating_doctor_detail"][0]["first_name"] +
      " " +
      res[1][0]["treating_doctor_detail"][0]["middle_name"] +
      " " +
      res[1][0]["treating_doctor_detail"][0]["last_name"]
    : res[1][0]["treating_doctor_detail"][0]["first_name"] +
      " " +
      res[1][0]["treating_doctor_detail"][0]["last_name"];
      console.log(name)
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
    const othersortVisits = patientVisits.filter((data) => {
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
     Setvisits(visitShow === 'a' ?  sortVisits : othersortVisits);
  }, [visitShow]);
  return (
    <>
      {/* <p
        className="w-100 text-start"
        style={{
          textAlign: "center",
          fontSize: "30px",
          position: "relative",
          left: "10px",
        }}
      >
        <b>Today</b>
      </p> */}
      <Radio.Group defaultValue="a" onChange={(e)=>SetvisitShow(e.target.value)} size="large" buttonStyle="solid">
        <Radio.Button value="a" style={{margin:'10px',borderRadius:'20px'}}>Today</Radio.Button>
        <Radio.Button value="b" style={{margin:'10px',borderRadius:'20px',marginLeft:'-2px'}}>Upcoming</Radio.Button>
      </Radio.Group>
      {allvisits.map((i) => (
        <div className="p-2" id="visitCard">
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
              <b>Visit Timing:</b> {i.appointment_detail.start_time}
            </span>
            <span className="visit-col" style={{ float: "right" }} span={10}>
              {" "}
              <b>Visit Duration:</b> {i.appointment_detail.duration}{" "}
            </span>
          </div>
          <div className="upper-visit-row">
            <span className="visit-col" span={12}>
              <b>Visit Type:</b> {i.visit_type}
            </span>
            <span className="visit-col" style={{ float: "right" }} span={12}>
              <b>Visit Location:</b> {i.location}
            </span>
          </div>
          {i.video_link !== "" && (
            <div className="video-conference-detail">
              <span className="video-col">
                <b> Video Conference Detail:</b>{" "}
                <a href={i.video_link}>{i.video_link}</a>
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientVisit;
