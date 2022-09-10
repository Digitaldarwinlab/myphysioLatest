import React, { useState, useEffect } from "react";
import moment from "moment";
import { Row, Col, Card } from "antd";
import "./PatientPrescription.css";
import { GetPatientCurrentEpisode } from "../../PatientAPI/PatientDashboardApi";
import { get_prescription } from "../../API/Prescription/PresriptionApi";

const PatientPrescription = () => {
  const [allprescriptions, Setprescriptions] = useState([]);
  useEffect(async () => {
    const pepisode = await GetPatientCurrentEpisode();
    let data;
    if (pepisode[1].length > 0) {
      data = await get_prescription(pepisode[1][0].pp_ed_id);
    }
    console.log(data);
    Setprescriptions(data);
  }, []);
  return (
    <>
      {allprescriptions.map((i) => (
        <div className="p-2" id="presCard">
          {i && Object.keys(i).length > 0 && (
            <div className="p-2 " id="prescriptionBox">
              <div className="presription-row">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h5 className="p fw-bold text-center">
                    {moment(i.date).format("DD-MMM-YY dddd")}
                  </h5>
                </div>
                <b>Medication Details </b> <br />
                {i.medication_detail.map((m) => (
                  <>
                    <div className="upper-pres-row">
                      <span className="pres-col" span={10}>
                        {" "}
                        <b>Medicine :</b> {m.medicine_name}{" "}
                      </span>
                      <span
                        className="pres-col"
                        style={{ float: "right" }}
                        span={10}
                      >
                        {" "}
                        <b>No of Medications :</b> {m.no_of_medications}{" "}
                      </span>
                    </div>
                    <div
                      className="upper-pres-row"
                      style={{ marginBottom: "20px" }}
                    >
                      <span className="pres-col" span={10}>
                        {" "}
                        <b>Instructions :</b> {m.instruction}{" "}
                      </span>
                      <span
                        className="pres-col"
                        style={{ float: "right" }}
                        span={10}
                      >
                        {" "}
                        <b>Notes :</b> {m.instruction}{" "}
                      </span>
                    </div>
                  </>
                ))}
                <b>Lab </b> <br />
                {i.lab_tests.map((m) => (
                  <>
                    <div className="upper-prescription-row">
                      <span className="prescription-col" span={10}>
                        {" "}
                        <b>Path :</b> {m.path_lab_test}{" "}
                      </span>
                      <span
                        className="prescription-col"
                        style={{ float: "right" }}
                        span={10}
                      >
                        {" "}
                        <b>Radiology :</b> {m.radio_lab_test}{" "}
                      </span>
                    </div>
                  </>
                ))}

                <div className="upper-prescription-row" style={{marginTop:'15px'}}>
                  <span className="prescription-col" span={10}>
                    {" "}
                    <b>Notes :</b> {i.notes}{" "}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientPrescription;
