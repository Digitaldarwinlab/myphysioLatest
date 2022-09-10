import moment from "moment";
import React, { useState, useEffect } from "react";
import { Radio, Button, Tooltip, Empty } from "antd";
import DoctorImg from './../../assets/doctor.webp'
import { fetchVisits } from "../../API/episode-visit-details/episode-visit-api";
import { getEpisode } from "../../API/Episode/EpisodeApi";
import { GetPatientCurrentEpisode } from "../../PatientAPI/PatientDashboardApi";
import "./PatientVisits.css";

const PatientVisit = () => {
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
  return (
    <>
      <Radio.Group
        defaultValue="a"
        onChange={(e) => SetvisitShow(e.target.value)}
        size="large"
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
          style={{ margin: "10px", borderRadius: "20px", marginLeft: "-2px" }}
        >
          Upcoming
        </Radio.Button>
      </Radio.Group>
      {allvisits.length > 0 ? (
        <>
          {allvisits.map((i) => (
            <>
              {visitShow === "a" ? (
                <div className="p-2" id="visitCard">
                  <img
                    src={DoctorImg}
                    className="visitImage"
                    alt=""
                  />
                  <div className="visitDetails">
                    <p className="w-100 text-start doctorName">
                      <b>Dr. {doctor}</b>
                    </p>
                    <div>
                      <span className="visitCol" span={10}>
                        {" "}
                        <b>Time:</b> {i.appointment_detail.start_time}
                      </span>
                      <span className="visitCol colRight" span={10}>
                        {" "}
                        <b>Duration:</b> {i.appointment_detail.duration}{" "}
                      </span>
                    </div>
                    <div>
                      <span className="visitCol" span={12}>
                        <b>Type:</b> {i.visit_type}
                      </span>
                      <span className="visitCol colRight" span={12}>
                        <b>Location:</b> {i.location}
                      </span>
                    </div>
                    {i.video_link !== "" && (
                      <div
                        className="video-conference-detail"
                        style={{ float: "right" }}
                      >
                        <span className="video-col">
                          {visitShow === "a" ? (
                            <Button
                              className="channelButton"
                              type="primary"
                              href={i.video_link}
                              shape={"round"}
                              target="_blank"
                            >
                              Join Channel
                            </Button>
                          ) : (
                            <Tooltip title="You can only join on the same date">
                              <Button
                                className="channelButton"
                                type="primary"
                                href={i.video_link}
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
                <div className="p-2" id="visitCard">
                  <img
                    src={DoctorImg}
                    className="visitImage"
                    alt=""
                  />
                  <div className="visitDetails">
                    <p className="w-100 text-start doctorName">
                      <b>Dr. {doctor}</b>
                    </p>
                    <div>
                      <span className="visitCol" span={10}>
                        {" "}
                        <b>Date:</b>{" "}
                        {moment(i.appointment_detail.startDate).format(
                          "DD MMM YYYY"
                        )}
                      </span>
                      <span className="visitCol colRight" span={10}>
                        {" "}
                        <b>Time:</b> {i.appointment_detail.start_time}
                      </span>
                    </div>
                    <div>
                      <span className="visitCol " span={10}>
                        {" "}
                        <b>Duration:</b> {i.appointment_detail.duration}{" "}
                      </span>
                      <span className="visitCol colRight" span={12}>
                        <b>Type:</b> {i.visit_type}
                      </span>
                    </div>
                    <div>
                      <span className="visitCol" span={12}>
                        <b>Location:</b> {i.location}
                      </span>
                    </div>
                    {i.video_link !== "" && (
                      <div
                        className="video-conference-detail"
                        style={{ float: "right" }}
                      >
                        <span className="video-col">
                          {visitShow === "a" ? (
                            <Button
                              className="channelButton"
                              type="primary"
                              href={i.video_link}
                              shape={"round"}
                              target="_blank"
                            >
                              Join Channel
                            </Button>
                          ) : (
                            <Tooltip title="You can only join on the same date">
                              <Button
                                className="disablechannelButton"
                                type="primary"
                                href={i.video_link}
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
              )}
            </>
          ))}
        </>
      ) : (
        <Empty
          description="No Visits Available"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
};

export default PatientVisit;
