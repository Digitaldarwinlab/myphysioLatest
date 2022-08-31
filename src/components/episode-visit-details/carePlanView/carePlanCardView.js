import React, { useEffect, useState } from "react";
import CarePlanCard from "./../../care-plan/care-plan-card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getEpisode } from "../../../API/Episode/EpisodeApi";
import { CarePlanPdf } from "../../../API/episode-visit-details/episode-visit-api";
import moment from "moment";
// import { encode } from "js-base64";
import { getClinicDetails } from "../../../API/Physio/ClinicRegister";
import { Patient_profile } from "../../../API/PatientRegistration/Patient";
import { Row, Col, Checkbox, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import FormDate from "./../../UI/antInputs/FormDate";
import TimePickerComp from "./../../care-plan/care-plan-allocate-plan/TimePickerComp";

export default function CarePlanCardView({ data, carePlanView, handleChange }) {
  const state = useSelector((state) => state);

  const [value, setValue] = useState(data);
  const [blobValue, setblobValue] = useState("");
  useEffect(() => {
    setValue(data);
    let main = [];
    let start_date = moment(data.start_date).format("DD-MM-YYYY");
    let end_date = moment(data.end_date).format("DD-MM-YYYY");
    let slots = [];
    let time_slot = data.output_json;
    for (let i = 0; i < Object.keys(time_slot).length; i++) {
      const [arrayName, arrayValue] = Object.entries(time_slot)[i];
      slots.push(arrayName);
    }
    async function htmlMapping() {
      let exerciseData = data.exercise_details;
      await exerciseData.forEach(async (data, index) => {
        console.log(data);
        let inst;
        inst =
          (await data.instruction_array) !== undefined
            ? data.instruction_array.map((instruction) => {
                return `<li> ${instruction}</li>`;
              })
            : [];
        main.push(`<tr >
            <td style="border-bottom: 1px solid black;"><span style="font-weight: bolder; font-size:22px"
              ><div style="padding: 10px 50px;display: flex;flex-direction: column;">
                <span style="font-weight: bolder; font-size:18px"
                  ><span
                    style="
                      padding: 5px 12px;
                      background-color: #2d7ecb;
                      color: white;
                      border-radius: 50%;
                    "
                    >${index + 1}</span
                  >
                  ${data.name}</span
                >
                <img
                  src='${
                    process.env.REACT_APP_EXERCISE_URL +
                    "/" +
                    data.image_url
                      .replaceAll("t1", "t1_png")
                      .replaceAll("webp", "png")
                  }'
                  alt=""
                  width="200"
                  height="110"
                  style="margin-left: 40px"
                />
                <span style="font-weight: 400; font-size:15px;margin-left: 60px;width:140px; padding:5px;border:1px solid black"> 
                <span style="border-right:1px solid black;padding-right:5px;">Sets</span>
                <span >${
                  data.Rep["set"]
                }</span>
              </span>
                <span style="font-weight: 400; font-size:15px;width:140px; padding:5px;border:1px solid black"> 
                <span style="border-right:1px solid black;padding-right:5px;">Reps</span>
                <span >${data.Rep["rep_count"]}</span>
              </span>
              </td>
            <td style="border-bottom: 1px solid black;"><ul style="font-size: 15.5px;list-style-type: number;">
            ${inst.join("")}
          </ul></td>
          </tr>`);
      });
    }
    async function htmlmap() {
      const res = await getEpisode(state.episodeReducer.patient_code);
      console.log(res)
      const patient = await Patient_profile(state.episodeReducer.patient_code);
      const clinic = await getClinicDetails(res[0]['treating_doctor_detail'][0]['clinic']);
      let name =
        res[0]["treating_doctor_detail"][0]["middle_name"] !== ""
          ? res[0]["treating_doctor_detail"][0]["first_name"] +
            " " +
            res[0]["treating_doctor_detail"][0]["middle_name"] +
            " " +
            res[0]["treating_doctor_detail"][0]["last_name"]
          : res[0]["treating_doctor_detail"][0]["first_name"] +
            " " +
            res[0]["treating_doctor_detail"][0]["last_name"];
      console.log(clinic);
      let html = `<!DOCTYPE html>
        <html lang="en" style="margin: 0; padding: 0; box-sizing: border-box">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
          <body style="margin: 0; padding: 0; box-sizing: border-box">
            <div
              style="
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              "
            >
              <div style="width: 100%; height: 50px; background-color: #2d7ecb">
                <div style="display: flex; padding: 15px 8px;color: white; font-size: 18px;">
                  <img
                    src="https://dev.physioai.care/static/media/newlogo1.0afac6259a524a790505.png"
                    alt="Logo"
                    width="40"
                    style="margin-top: -8px;"
                    height="40"
                  />
                   <a style="position:absolute;top:15px"> PhysioAI </a>
                </div>
              </div>
              <div style="width: 100%; height: 30px;margin-top: 10px;display: flex;">
      <div style="display: flex;font-size: 14px;margin-top: 10px;">
      <div style="float:left;"> 
       <span style="margin-top: 16px;">Clinic:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">${clinic.name}</span> 
       </div>
       <div style="float:right;"> 
       <span style="margin-top: 16px;">Treating Doctor:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">Dr. ${
         name
       }</span> 
       </div>
       </div>
    </div>
    <div style="width: 100%; height: 30px;margin-top: 10px;display: flex;">
      <div style="display: flex;font-size: 14px;margin-top: 10px;">
      <div style="float:left;"> 
       <span style="margin-top: 16px;">Patient Name:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">${
         res[0]["PP_Patient_Details_mobile"]["Patient_name"]
       }</span> 
       </div>
       <div style="float:right;"> 
       <span style="margin-top: 16px;">Patient ID:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">${patient.patient_code}</span> 
       </div>
       </div>
    </div>
    <div style="width: 100%; height: 30px;margin-top: 10px;display: flex;">
      <div style="display: flex;font-size: 14px;margin-top: 10px;">
      <div style="float:left;"> 
       <span style="margin-top: 16px;">From:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">${start_date} -- ${end_date} </span> 
       </div>
       <div style="float:right;"> 
       <span style="margin-top: 16px;">Time Slots:</span>&nbsp;<span style="font-weight: bolder;margin-top: 14px;font-size:16px">${JSON.stringify(
         slots
       )
         .replaceAll('"', "")
         .replaceAll("[", "")
         .replaceAll("]", "")}</span> 
       </div>
       </div>
    </div>

    <hr/>
              <table style="width: 100%;margin: auto; height: fit-content;margin-top: 10px;">
              ${main.join("")}
              </table>
            </div>
          </body>
        </html>`;
      return html;
    }
    htmlMapping();
    setTimeout(async () => {
      let htmlBody = await htmlmap();
      let pdf = await CarePlanPdf(htmlBody);
      setblobValue(pdf);
    }, 1000);
  }, [value]);
  const pdfDownload = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = blobValue;
    a.download = "CarePlan.pdf";
    a.click();
    window.URL.revokeObjectURL(blobValue);
  };

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col lg={12} md={12} sm={12} xs={12}>
          <FormDate
            label="Start Date"
            name="Start Data"
            required={true}
            defaultValue={
              data.start_date
                ? moment(data.start_date, "YYYY-MM-DD")
                : moment(data.start_date, "YYYY-MM-DD")
            }
            disabledDate={true}
            disabled={true}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <FormDate
            label="End Date"
            name="End Data"
            required={true}
            defaultValue={moment(data.end_date, "YYYY-MM-DD")}
            disabledDate={true}
            disabled={true}
          />
        </Col>
      </Row>
      <Row gutter={[10, 10]} style={{ marginTop: "10px" }} justify="end">
        <Button
          type="primary"
          icon={
            <DownloadOutlined style={{ position: "relative", top: "-4px" }} />
          }
          size={"large"}
          onClick={pdfDownload}
          disabled={blobValue ? false : true}
        >
          CarePlan
        </Button>
      </Row>
      <Row gutter={[10, 10]}>
        {data.exercise_details.map((exercise, index) => {
          return (
            <Col key={index} md={12} lg={8} sm={12} xs={24}>
              <CarePlanCard
                cartState={false}
                id={exercise.ex_em_id}
                Level={exercise.difficulty_level}
                Name={exercise.name}
                image={
                  exercise.image_url && exercise.image_url !== null
                    ? exercise.image_url
                    : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
                video={
                  exercise.video_url && exercise.video_url !== null
                    ? exercise.video_url
                    : ""
                }
                actions={false}
                handleChange={handleChange}
                index={index}
                carePlanView={carePlanView}
                data={exercise}
              />
            </Col>
          );
        })}
      </Row>
      <Row gutter={[10, 10]}>
        {data.time_slot &&
          data.time_slot.length !== 0 &&
          data.time_slot.map((val, index) => {
            return (
              <TimePickerComp
                time={val[0]}
                showWatch={false}
                key={index}
                index={index}
              />
            );
          })}
      </Row>
      <Row gutter={[10, 10]}>
        {data.time_slots &&
          data.time_slots.length !== 0 &&
          data.time_slots.map((val, index) => {
            return (
              <TimePickerComp
                time={val[0]}
                showWatch={false}
                key={index}
                index={index}
              />
            );
          })}
      </Row>
    </>
  );
}
