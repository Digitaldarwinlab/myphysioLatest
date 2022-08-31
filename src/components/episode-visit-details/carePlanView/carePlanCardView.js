import React, { useEffect, useState } from "react";
import CarePlanCard from "./../../care-plan/care-plan-card/Card";
import { CarePlanPdf } from "../../../API/episode-visit-details/episode-visit-api";
// import { encode } from "js-base64";
import { Row, Col, Checkbox, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import FormDate from "./../../UI/antInputs/FormDate";
import moment from "moment";
import TimePickerComp from "./../../care-plan/care-plan-allocate-plan/TimePickerComp";

export default function CarePlanCardView({ data, carePlanView, handleChange }) {
  const [value, setValue] = useState(data);
  const [blobValue, setblobValue] = useState('');
  useEffect(() => {
    setValue(data);
    const toDataURL = (url) =>
      fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result.replace('image/webp','image/pn'));
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
        let main = [];
    async function htmlMapping() {
      
      let exerciseData = data.exercise_details;
        await exerciseData.forEach(async (data, index) => {
          let image = await toDataURL(
            process.env.REACT_APP_EXERCISE_URL + "/" + data.image_url
          );
          console.log(process.env.REACT_APP_EXERCISE_URL +  "/" + "usr/share/nginx/html/imgs/t1_png/Squats.png");
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
                  src='${process.env.REACT_APP_EXERCISE_URL +  '/' + 'usr/share/nginx/html/imgs/t1_png/Squats.png'}'
                  alt=""
                  width="200"
                  height="110"
                  style="margin-left: 40px"
                />
              </div></td>
            <td style="border-bottom: 1px solid black;"><ul style="font-size: 15.5px;list-style-type: number;">
            ${inst.join("")}
          </ul></td>
          </tr>`);
        });
    }
    async function htmlmap(){
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
                    src="https://dev.physioai.care/static/media/newlogo1.cae632184035999d8bcf.webp"
                    alt="Logo"
                    width="40"
                    style="margin-top: -8px;"
                    height="40"
                  />
                   <a style="position:absolute;top:15px"> PhysioAI </a>
                </div>
              </div>
              <table style="width: 90%;margin: auto; height: fit-content;margin-top: 30px;">
              ${main.join("")}
              </table>
            </div>
          </body>
        </html>`;
      return html;
    }
    htmlMapping();
    setTimeout(async() => {
       let htmlBody = await htmlmap()
       console.log(htmlBody)
       let pdf =await CarePlanPdf(htmlBody)
       setblobValue(pdf)

    }, 3000);
  }, [value]);
  const pdfDownload =()=>{
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = blobValue;
    a.download = "CarePlan.pdf";
    a.click();
    window.URL.revokeObjectURL(blobValue);
  }

  return (
    <>
      <Row gutter={[10, 10]}>
        <Col lg={12} md={12} sm={12} xs={12}>
          {/* {console.log('start date isss hh')}
                    {console.log(data.end_date)} */}
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
                // handleChange={() => console.log("Hello")}
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
