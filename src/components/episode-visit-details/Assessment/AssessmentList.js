import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import html2pdf from "html2pdf.js"
import {
  Button,
  Row,
  Col,
  Descriptions,
  Empty,
  Table,
  List,
  Item,
  Badge,
  Collapse,
} from "antd";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import { ImPlus } from "react-icons/im";
import Loading from "./../../UtilityComponents/Loading";
import { useHistory } from "react-router-dom";
import "../../../styles/Layout/Episode.css";
import { getAssesment } from "../../../API/Assesment/getAssesment";
import { Pagination } from "antd";
{
  /* aswin start 10/30/2021 start */
}

import { BsFillEyeFill } from "react-icons/bs";
import moment from "moment";

export const tableLabels = {
  leftShoulder: "L Shoulder Abd/Add",
  rightShoulder: "R Shoulder Abd/Add",
  leftElbow: "L Elbow Flex/Ext",
  rightElbow: "R Elbow Flex/Ext",
  leftHipAdductionAbduction: "L Hip Abd/Add",
  rightHipAdductionAbduction: "R Hip Abd/Add",
  leftKnee: "L Knee Flex/Ext",
  rightKnee: "R Knee Flex/Ext",
  leftNeck: "L Cervical Side flex",
  rightNeck: "R Cervical Side Flex",
  leftPelvic: "L Lumbar Side Flex",
  rightPelvic: "R Lumbar Side Flex",
  leftWrist: "L Wrist Flex/Ext",
  rightWrist: "R Wrist Flex/Ext",
  leftAnkle: "L Ankle Dorsi/Planter Flex",
  rightAnkle: "R Ankle Dorsi/Planter Flex",
  leftHip: "L Hip Flex/Ext",
  rightHip: "R Hip Flex/Ext",
  cervicalForwardFlexion: "Cervical Flex/Ext",
};

export const tableLabelLateral = {
  leftShoulder: "L Shoulder Flex/Ext",
  rightShoulder: "R Shoulder Flex/Ext",
  leftElbow: "L Elbow Flex/Ext",
  rightElbow: "R Elbow Flex/Ext",
  leftHipAdductionAbduction: "L Hip Abd/Add",
  rightHipAdductionAbduction: "R Hip Abd/Add",
  leftKnee: "L Knee Flex/Ext",
  rightKnee: "R Knee Flex/Ext",
  leftNeck: "L Cervical Side flex",
  rightNeck: "R Cervical Side Flex",
  leftPelvic: "L Lumbar Side Flex",
  rightPelvic: "R Lumbar Side Flex",
  leftWrist: "L Wrist Flex/Ext",
  rightWrist: "R Wrist Flex/Ext",
  leftAnkle: "L Ankle Dorsi/Planter Flex",
  rightAnkle: "R Ankle Dorsi/Planter Flex",
  leftHip: "L Hip Flex/Ext",
  rightHip: "R Hip Flex/Ext",
  cervicalForwardFlexion: "Cervical Flex/Ext",
};
const { Panel } = Collapse;
const AssessmentList = ({ assesmentClick }) => {
  {
    /* aswin start 10/30/2021 stop */
  }
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.episodeReducer);
  const [loading, setLoading] = useState(false);
  const [QuestionVisibility, setQuestionVisibility] = useState("none");
  const [RomVisibility, setRomVisibility] = useState("none");
  const [AssesmentData, setAssesmentData] = useState([]);
  const [physicalData, setPhysicalData] = useState([]);
  const assessmentRef = useRef(null);
  const [kSymptoms, setKsymptoms] = useState([]);
  const [kStiffness, setKstiffness] = useState([]);
  const [kPain, setKpain] = useState([]);
  const [kDl, setKDl] = useState([]);
  const [kSports, setKsports] = useState([]);
  const [kQOL, setKQOL] = useState([]);
  const [itemArray, SetitemArray] = useState([]);
  const [showAssesment, setShowAssesment] = useState(false);
  const [paginationState, setPaginationState] = React.useState({
    totalPage: 5,
    current: 1,
    minIndex: 0,
    maxIndex: 1,
    pageSize: 1,
  });

  const [angleValues, setAngleValues] = useState({
    LeftShoulder_ver: "",
    RightShoulder_ver: "",
    LeftElbow: "",
    RightElbow: "",
    LeftHip: "",
    RightHip: "",
    LeftKnee: "",
    RightKnee: "",
  });

  const PaginationChange = (page, pageSize = paginationState.pageSize) => {
    setPaginationState({
      ...paginationState,
      pageSize: pageSize,
      total: AssesmentData.length / pageSize,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  /*
    {
        LeftShoulder_ver: '',
        RightShoulder_ver: '',
        LeftElbow: '',
        RightElbow: '',
        LeftHip: '',
        RightHip: '',
        LeftKnee: '',
        RightKnee: '',
    }
    */
  const columns = [
    {
      title: "Angles",
      dataIndex: "angles",
      key: "angles",
    },
    {
      title: "Min",
      dataIndex: "min",
      key: "min",
      render: (number) => Math.round(number),
    },
    {
      title: "Max",
      dataIndex: "max",
      key: "max",
      render: (number) => Math.round(number),
    },
  ];

  //   const dataArray = AssesmentData.map((item) => {
  //     //  const key = Object.keys(item.AI_data)
  //     const AI_data = item.AI_data;
  //     let exercise = item.Exercise_Name[0];
  //     // console.log('exercise name',item)
  //     // console.log(exercise)

  //     if (AI_data !== null) {
  //       // console.log('AI datas is')
  //       // console.log(exercise)
  //       if (
  //         Object.values(AI_data).length > 0 &&
  //         Object.values(AI_data)[0].angles &&
  //         Object.values(AI_data)[0].angles["leftShoulder"].min
  //       ) {
  //         //   console.log(item.AI_data[exercise].angles)

  //         return {
  //           table: [
  //             {
  //               key: "1",
  //               angles: "Left Shoulder",
  //               min: Object.values(AI_data)[0].angles["leftShoulder"].min,
  //               max: Object.values(AI_data)[0].angles["leftShoulder"].max,
  //             },
  //             {
  //               key: "2",
  //               angles: "Right Shoulder",
  //               min: Object.values(AI_data)[0].angles["rightShoulder"].min,
  //               max: Object.values(AI_data)[0].angles["rightShoulder"].max,
  //             },
  //             {
  //               key: "3",
  //               angles: "Left Elbow",
  //               min: Object.values(AI_data)[0].angles["leftElbow"].min,
  //               max: Object.values(AI_data)[0].angles["leftElbow"].max,
  //             },
  //             {
  //               key: "4",
  //               angles: "Right Elbow",
  //               min: Object.values(AI_data)[0].angles["rightElbow"].min,
  //               max: Object.values(AI_data)[0].angles["rightElbow"].max,
  //             },
  //             {
  //               key: "5",
  //               angles: "Left Neck",
  //               min: Object.values(AI_data)[0].angles["leftNeck"].min,
  //               max: Object.values(AI_data)[0].angles["leftNeck"].max,
  //             },
  //             {
  //               key: "6",
  //               angles: "Right Neck",
  //               min: Object.values(AI_data)[0].angles["rightNeck"].min,
  //               max: Object.values(AI_data)[0].angles["rightNeck"].max,
  //             },
  //           ],

  //           table2: [
  //             {
  //               key: "7",
  //               angles: "Left Hip",
  //               min: Object.values(AI_data)[0].angles["leftHipAdductionAbduction"]
  //                 .min,
  //               max: Object.values(AI_data)[0].angles["leftHipAdductionAbduction"]
  //                 .max,
  //             },
  //             {
  //               key: "8",
  //               angles: "Right Hip",
  //               min: Object.values(AI_data)[0].angles["rightHiAdductionAbduction"]
  //                 .min,
  //               max: Object.values(AI_data)[0].angles["rightHiAdductionAbduction"]
  //                 .max,
  //             },
  //             {
  //               key: "11",
  //               angles: "Left Pelvic",
  //               min: Object.values(AI_data)[0].angles["leftPelvic"].min,
  //               max: Object.values(AI_data)[0].angles["leftPelvic"].max,
  //             },
  //             {
  //               key: "12",
  //               angles: "Right Pelvic ",
  //               min: Object.values(AI_data)[0].angles["rightPelvic"].min,
  //               max: Object.values(AI_data)[0].angles["rightPelvic"].max,
  //             },
  //           ],
  //         };
  //       }
  //     } else {
  //       return {
  //         table: [
  //           {
  //             key: "1",
  //             angles: "Left Shoulder",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "2",
  //             angles: "Right Shoulder",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "3",
  //             angles: "Left Elbow",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "4",
  //             angles: "Right Elbow",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "5",
  //             angles: "Left Neck",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "6",
  //             angles: "Right Neck",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //         ],

  //         table2: [
  //           {
  //             key: "7",
  //             angles: "Left Hip",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "8",
  //             angles: "Right Hip",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "9",
  //             angles: "Left Knee",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "10",
  //             angles: "Right Knee",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "11",
  //             angles: "Left Pelvic",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //           {
  //             key: "12",
  //             angles: "Right Pelvic ",
  //             min: "No Data",
  //             max: "No Data",
  //           },
  //         ],
  //       };
  //     }
  //   });
  // console.log('data array',dataArray)

  const tableNOdata1 = [
    {
      key: "1",
      angles: "Left Shoulder",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "2",
      angles: "Right Shoulder",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "3",
      angles: "Left Elbow",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "4",
      angles: "Right Elbow",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "5",
      angles: "Left Neck",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "6",
      angles: "Right Neck",
      min: "No Data",
      max: "No Data",
    },
  ];
  const tableNOdata2 = [
    {
      key: "7",
      angles: "Left Hip",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "8",
      angles: "Right Hip",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "9",
      angles: "Left Knee",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "10",
      angles: "Right Knee",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "11",
      angles: "Left Pelvic",
      min: "No Data",
      max: "No Data",
    },
    {
      key: "12",
      angles: "Right Pelvic",
      min: "No Data",
      max: "No Data",
    },
  ];
  //console.log('pagee is ')

  const onClick = () => {
    if (AssesmentData.length == 0) {
      history.push({
        pathname: "/assessment/1",
        state: {
          //aswin 10/25/2021 start
          type: "",
          //aswin 10/25/2021 stop
        },
      });
    } else {
      history.push({
        pathname: "/assessment/1",
        state: {
          //aswin 10/25/2021 start
          type: "",
          //aswin 10/25/2021 stop
        },
      });
    }
  };

  const make_pdf = () => {
    //   html2canvas(document.getElementById("assesmentPrint")).then(canvas => {
    //     document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.setFontSize(10);
    //     pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    //     pdf.save("Patient-Data.pdf"); 

    // })
    setShowAssesment(true);
    const input = document.getElementById("assesmentPrint");
    //  const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    //  pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
    //    pdf.save("test.pdf");
    //  });
    // html2pdf(input);
    setTimeout(() => setShowAssesment(false), 1000)

  }

  useEffect(async () => {
    setLoading(true);
    const data = await getAssesment(state.patient_code);
    let a = data.reverse();
    setAssesmentData(a);
    console.log("Rom assessment ", a);
    // setTimeout(() => {
    //     setAssesmentData(a)
    // }, 10);
    // console.log("reverse not ",data)
    // console.log("reverse ",a)
    setLoading(false);

    if (data.length != 0) {
      let temp = [];

      let i = 0;
      for (i = 0; i < data.length; i++) {
        temp[i] = data[i].physical_assessement;
      }

      setPhysicalData(temp);
      console.log("Rom assessment ", temp);

      /*


            
          if(data.physical_assessement!=""){
          setPhysicalData(data.physical_assessement)
          }
          if(data.questionnaires.Life[3]!==null){
          setQuestionVisibility('block')
          setKsymptoms(data.questionnaires.Symptoms[3])
          setKstiffness(data.questionnaires.Stiffness[3])
          setKpain(data.questionnaires.pain[3])
          setKDl(data.questionnaires.DailyLiving[3])
          setKsports(data.questionnaires.Sports[3])
          setKQOL(data.questionnaires.Life[3])
          }
          if(data.AI_data!=""){
          setRomVisibility("block")
          const exercise=data.Exercise_Name
          const AI_Data = data.AI_data[exercise].angles
          setAngleValues(preValues => ({
          ...preValues,
          ['LeftShoulder_ver']: AI_Data["Left Shoulder(ver)"],
          ['RightShoulder_ver']: AI_Data["Right Shoulder(ver)"],
          ['LeftElbow']: AI_Data["Left Elbow"],
          ['RightElbow']: AI_Data["Right Elbow"],
          ['LeftHip']: AI_Data["Left Hip"],
          ['RightHip']: AI_Data["Right Hip"],
          ['LeftKnee']: AI_Data["Left Knee"],
          ['RightKnee']: AI_Data["Right Knee"],
      }))
  }

  */
    }

    setPaginationState({
      ...paginationState,
      pageSize: 1,
      total: AssesmentData.length / 1,
      current: 1,
      minIndex: 0,
      maxIndex: 1,
    });
  }, [state.patient_code]);

  //   console.log('assesment datssa iss')
  // console.log(AssesmentData)

  {
    /* aswin start 10/30/2021 stop */
  }
  const updateAssesment = (data) => {
    // console.log(data)
    let assesmentDate = moment(data.assesmentdate);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Type",
        value: data.types,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Scars",
        value: data.physical_assessement.Scars,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "RecentHistory",
        value: data.physical_assessement.RecentHistory,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Trauma",
        value: data.physical_assessement.Trauma,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Test",
        value: data.physical_assessement.Test,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "PainMeter",
        value: data.physical_assessement.PainMeter,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Swelling",
        value: data.physical_assessement.Swelling,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Numbness",
        value: data.Numbmess,
      },
    });
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Date",
        value: {
          date: data.assesmentdate,
          dateString: assesmentDate.format("YYYY-MM-DD"),
        },
      },
    });
    // dispatch({ type: "NOERROR" });
    history.push({
      pathname: "/assessment/1",
      state: { update: true },
    });
  };
  {
    /* aswin start 10/30/2021 stop */
  }
  return (
    <React.Fragment>
      <div className="divvv">
        <Col span={24} className="">
          <Row>
            <Col lg={18} md={18} sm={18} xs={24}>
              <h4 className="fw-bold">
                <u>Assessments</u>
              </h4>
            </Col>
            <Col lg={6} md={6} sm={6} xs={24} className="text-end">
              {/* aswin start 10/30/2021 start */}
              <Button
                className="button1"
                style={{ color: "white" }}
                id="bnid"
                onClick={assesmentClick}
              >
                {/* aswin start 10/30/2021 stop */}
                <ImPlus className="me-2" /> {"  "}Add
              </Button>
            </Col>
          </Row>
          {AssesmentData.length === 0 && <Col span={24} className="px-3"> <p className="fw-bold">No Assesment Present..</p></Col>}
          {AssesmentData.map(
            (data, index) =>
              //aswin 10/30/2021 start
              (AssesmentData.length === 1
                ? index >= paginationState.minIndex ||
                index + 1 == paginationState.minIndex
                : index >= paginationState.minIndex &&
                index < paginationState.maxIndex) &&
              index < paginationState.maxIndex && (
                //  index >= paginationState.minIndex && index < paginationState.maxIndex
                //aswin 10/30/2021 stop
                <div key={index} className="px-1 py-1">
                  <Col span={24} className="px-3">
                    {loading && <Loading />}
                    {/* {AssesmentData === null ||AssesmentData === undefined||AssesmentData.length<0 && <p className="fw-bold">No Assesment Present..</p>} */}
                    {/* {AssesmentData.length === 0 ? (
                      <p className="fw-bold">No Assesment Present..</p>
                    ) : ( */}
                    <>
                      <Collapse defaultActiveKey={["1"]}>
                        {data.body_image && (
                          <Panel header="Areas of Pain/Impairment" key="1">
                            <div className=" border mb-3 mt-3">
                              <h4 className="p-2">Areas of Pain/Impairment </h4>
                              <Row>
                                <img width="100%" src={data.body_image} />
                              </Row>
                            </div>
                          </Panel>
                        )}
                        {(data.physical_assessement.Built.length > 0 ||
                          data.physical_assessement.History.length > 0 ||
                          data.physical_assessement.chiefCom.length > 0 ||
                          data.physical_assessement.past_medical_history
                            .length > 0 ||
                          (data.physical_assessement.Subjective[0].occupation
                            .length > 0 &&
                            data.physical_assessement.Subjective[0].duration
                              .length > 0)) && (
                            <Panel header="Physical Assesment" key="2">
                              <div className=" border mb-3 mt-3">
                                {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Physical Assesment</h4>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                                                    </Col>
                                                </Row> */}
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Descriptions>
                                    <Descriptions.Item label="Assesment Date">
                                      {data.assesmentdate.slice(0, 10)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Built">
                                      {data.physical_assessement.Built}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="History">
                                      {data.physical_assessement.History}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Cheif Complaint">
                                      {" "}
                                      {data.physical_assessement.chiefCom}
                                    </Descriptions.Item>

                                    <Descriptions.Item
                                      label="Past Medical History"
                                      span={3}
                                    >
                                      {" "}
                                      {data.physical_assessement
                                        .past_medical_history &&
                                        data.physical_assessement
                                          .past_medical_history.length > 0 &&
                                        data.physical_assessement.past_medical_history.map(
                                          (p) => `${p + " ,"}`
                                        )}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Any Other details ">
                                      {" "}
                                      {
                                        data.physical_assessement
                                          .any_other_details
                                      }
                                    </Descriptions.Item>
                                    {/* any_other_details */}
                                  </Descriptions>
                                </Row>
                              </div>

                              {/* <div className=" border mb-3 mt-3"> */}
                              {data.physical_assessement.Subjective &&
                                data.physical_assessement.Subjective.length >
                                0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>
                                        <u>Subjective </u>
                                      </b>
                                    </Descriptions.Item>
                                    <Row gutter={[10, 10]} className="px-4 py-2">
                                      <table
                                        style={{ width: "50%" }}
                                      //style={{ width: `${screen.width / 2}px` }}
                                      >
                                        <tr>
                                          <td style={{ width: "33%" }}>
                                            <b>Occupation</b>
                                          </td>
                                          <td style={{ width: "33%" }}>
                                            <b>Duration</b>
                                          </td>
                                          <td style={{ width: "33%" }}>
                                            <b>Sports-type</b>
                                          </td>
                                        </tr>
                                        {data.physical_assessement.Subjective.map(
                                          (data) => (
                                            <tr>
                                              <td>{data.occupation}</td>
                                              <td>{data.duration}</td>
                                              {data.occupation === "Sports" && (
                                                <td>{data.Sports_type}</td>
                                              )}
                                            </tr>
                                          )
                                        )}
                                      </table>
                                    </Row>
                                  </>
                                )}
                            </Panel>
                          )}
                        {/* </div> */}
                        {(data.nature_of_pain.length > 0 ||
                          data.pain_scale > 0 ||
                          data.pain_scars.length > 0 ||
                          (data.pain_aggravating !== undefined &&
                            data.pain_aggravating.length > 0) ||
                          (data.pain_relieving !== undefined &&
                            data.pain_relieving.length > 0) ||
                          data.sensory_input["superficial"].length > 0 ||
                          data.sensory_input["deep"].length > 0 ||
                          data.sensory_input["cortial"].length > 0) && (
                            <Panel header="Pain Assesment" key="3">
                              <div className=" border mb-3 mt-3">
                                {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Pain Assesment</h4>
                                                    </Col>
                                                </Row> */}

                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Descriptions>
                                    <Descriptions.Item label="Nature Of Pain">
                                      {data.nature_of_pain
                                        ? JSON.stringify(data.nature_of_pain).replace('[', '').replace(']', '').replaceAll('"', '')
                                        : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Pain Scale">
                                      {data.pain_scale
                                        ? data.pain_scale
                                        : data.pain_scale === 0
                                          ? 0
                                          : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Scar">
                                      {data.pain_scars
                                        ? data.pain_scars
                                        : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Swelling">
                                      {data.pain_swelling
                                        ? data.pain_swelling
                                        : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Pain Aggravating">
                                      {data.pain_aggravating !== undefined
                                        ? data.pain_aggravating.length > 0 &&
                                        data.pain_aggravating.map(
                                          (d) => d + " "
                                        )
                                        : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                      label="Pain Relieving"
                                      span={3}
                                    >
                                      {" "}
                                      {data.pain_relieving !== undefined
                                        ? data.pain_relieving.length > 0 &&
                                        data.pain_relieving.map((d) => d + " ")
                                        : "not available"}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="" span={3}>
                                      <b>
                                        <u>Sensory Inputs </u>
                                      </b>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Superficial">
                                      {data.sensory_input.superficial}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Deep">
                                      {data.sensory_input.deep}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Cortial">
                                      {data.sensory_input.cortial}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Row>
                              </div>
                            </Panel>
                          )}
                        {(data.shoulder ||
                          data.Ankle ||
                          data.Cervical_Spine ||
                          data.Thoracic_Spine ||
                          data.Lumbar_Spine ||
                          data.Forearm_wrist_Hand ||
                          data.Hip ||
                          data.Knee ||
                          data.Others ||
                          data.Elbow) && (
                            <Panel header="Special Test" key="4">
                              <div className=" border mb-3 mt-3">
                                {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        {data.shoulder||data.Ankle||data.Cervical_Spine||data.Thoracic_Spine||data.Lumbar_Spine||data.Forearm_wrist_Hand||data.Hip||data.Knee||data.Elbow?<h4 className="p-2"><u>Special Test</u></h4>:''}
                                                    </Col>
                                                </Row> */}
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.shoulder && data.shoulder.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Shoulder </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.shoulder.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Ankle && data.Ankle.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Ankle </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.Ankle.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Elbow && data.Elbow.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Elbow </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.Elbow.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Hip && data.Hip.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Hip </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.Hip.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Knee && data.Knee.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Knee </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.Knee.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Others && data.Others.length > 0 && (
                                      <>
                                        <Descriptions.Item label="" span={3}>
                                          <b>Others </b>
                                        </Descriptions.Item>
                                        <table
                                          style={{
                                            width: `${screen.width / 2}px`,
                                          }}
                                          border="1px"
                                        >
                                          <tr>
                                            <td>
                                              {" "}
                                              <center>Questions</center>
                                            </td>
                                            <td style={{ width: "30%" }}>
                                              <center>Positive/Negative</center>
                                            </td>
                                          </tr>
                                          {data.Others.map((an) => (
                                            <tr>
                                              <td>{an[0]}</td>
                                              <td>
                                                <center>
                                                  {an[1] == 1
                                                    ? " Positive "
                                                    : " Negative "}
                                                </center>
                                              </td>
                                            </tr>
                                          ))}
                                        </table>
                                      </>
                                    )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Cervical_Spine &&
                                      data.Cervical_Spine.length > 0 && (
                                        <>
                                          <Descriptions.Item label="" span={3}>
                                            <b>Cervical Spine </b>
                                          </Descriptions.Item>
                                          <table
                                            style={{
                                              width: `${screen.width / 2}px`,
                                            }}
                                            border="1px"
                                          >
                                            <tr>
                                              <td>
                                                {" "}
                                                <center>Questions</center>
                                              </td>
                                              <td style={{ width: "30%" }}>
                                                <center>Positive/Negative</center>
                                              </td>
                                            </tr>
                                            {data.Cervical_Spine.map((an) => (
                                              <tr>
                                                <td>{an[0]}</td>
                                                <td>
                                                  <center>
                                                    {an[1] == 1
                                                      ? " Positive "
                                                      : " Negative "}
                                                  </center>
                                                </td>
                                              </tr>
                                            ))}
                                          </table>
                                        </>
                                      )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Thoracic_Spine &&
                                      data.Thoracic_Spine.length > 0 && (
                                        <>
                                          <Descriptions.Item label="" span={3}>
                                            <b>Thoracic Spine </b>
                                          </Descriptions.Item>
                                          <table
                                            style={{
                                              width: `${screen.width / 2}px`,
                                            }}
                                            border="1px"
                                          >
                                            <tr>
                                              <td>
                                                {" "}
                                                <center>Questions</center>
                                              </td>
                                              <td style={{ width: "30%" }}>
                                                <center>Positive/Negative</center>
                                              </td>
                                            </tr>
                                            {data.Thoracic_Spine.map((an) => (
                                              <tr>
                                                <td>{an[0]}</td>
                                                <td>
                                                  <center>
                                                    {an[1] == 1
                                                      ? " Positive "
                                                      : " Negative "}
                                                  </center>
                                                </td>
                                              </tr>
                                            ))}
                                          </table>
                                        </>
                                      )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Lumbar_Spine &&
                                      data.Lumbar_Spine.length > 0 && (
                                        <>
                                          <Descriptions.Item label="" span={3}>
                                            <b>Lumbar Spine </b>
                                          </Descriptions.Item>
                                          <table
                                            style={{
                                              width: `${screen.width / 2}px`,
                                            }}
                                            border="1px"
                                          >
                                            <tr>
                                              <td>
                                                {" "}
                                                <center>Questions</center>
                                              </td>
                                              <td style={{ width: "30%" }}>
                                                <center>Positive/Negative</center>
                                              </td>
                                            </tr>
                                            {data.Lumbar_Spine.map((an) => (
                                              <tr>
                                                <td>{an[0]}</td>
                                                <td>
                                                  <center>
                                                    {an[1] == 1
                                                      ? " Positive "
                                                      : " Negative "}
                                                  </center>
                                                </td>
                                              </tr>
                                            ))}
                                          </table>
                                        </>
                                      )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                                <Row gutter={[10, 10]} className="px-4 py-2">
                                  <Col lg={12} md={18} sm={12} xs={12}>
                                    {data.Forearm_wrist_Hand &&
                                      data.Forearm_wrist_Hand.length > 0 && (
                                        <>
                                          <Descriptions.Item label="" span={3}>
                                            <b>Forearm_wrist_Hand </b>
                                          </Descriptions.Item>
                                          <table
                                            style={{
                                              width: `${screen.width / 2}px`,
                                            }}
                                            border="1px"
                                          >
                                            <tr>
                                              <td>
                                                {" "}
                                                <center>Questions</center>
                                              </td>
                                              <td style={{ width: "30%" }}>
                                                <center>Positive/Negative</center>
                                              </td>
                                            </tr>
                                            {data.Forearm_wrist_Hand.map((an) => (
                                              <tr>
                                                <td>{an[0]}</td>
                                                <td>
                                                  <center>
                                                    {an[1] == 1
                                                      ? " Positive "
                                                      : " Negative "}
                                                  </center>
                                                </td>
                                              </tr>
                                            ))}
                                          </table>
                                        </>
                                      )}
                                  </Col>
                                  <Col lg={12} md={18} sm={12} xs={12}></Col>
                                </Row>
                              </div>
                            </Panel>
                          )}
                        {Object.keys(data.questionnaires).length > 0 &&
                          data.questionnaires[
                            Object.keys(data.questionnaires)[0]
                          ][0].length > 0 && (
                            <Panel header="Scales & Index" key="5">
                              <div className=" border mb-3 mt-3">
                                <Row className="border">
                                  <Col md={24} lg={24} sm={24} xs={24}>
                                    {/* <h4 className="p-2">Questionnaire </h4> */}
                                    <Descriptions size="small" bordered>
                                      {Object.keys(data.questionnaires).map(
                                        (label) => (
                                          <>
                                            {data.questionnaires[label][0]
                                              .length > 0 && (
                                                <Descriptions.Item
                                                  label={`KOOS ${label}`}
                                                >
                                                  {data.questionnaires[
                                                    label
                                                  ][3] &&
                                                    data.questionnaires[
                                                      label
                                                    ][3].toFixed(0)}
                                                </Descriptions.Item>
                                              )}
                                          </>
                                        )
                                      )}
                                      {/* <Descriptions.Item label="KOOS Stiffness">{data.questionnaires.Stiffness[3] && data.questionnaires.Stiffness[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Pain">{data.questionnaires.pain[3] && data.questionnaires.pain[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Daily Life">{data.questionnaires.DailyLiving[3] && data.questionnaires.DailyLiving[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Sports">{data.questionnaires.Sports[3] && data.questionnaires.Sports[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Quality of Life">{data.questionnaires.Life[3] && data.questionnaires.Life[3].toFixed(0)}</Descriptions.Item> */}
                                    </Descriptions>
                                  </Col>
                                </Row>
                                <Row
                                  gutter={[10, 10]}
                                  className="px-4 py-2"
                                ></Row>
                              </div>
                            </Panel>
                          )}
                        {data.posture &&
                          (data.posture["Posterial_view"] ||
                            data.posture["lateral_view"] || data.posture["sitting_Posterial_view"]
                            || data.posture["Sitting_lateral_view"]
                          ) && (
                            <Panel header="Posture Analysis" key="6">
                              <div className=" border mb-3 mt-3">
                                {/* <Row className="border">
                                               <Col md={24} lg={24} sm={24} xs={24}>
                                               {(data.posture['Posterial_view']||data.posture['lateral_view'])&&<h4 className="p-2">Posture Analysis</h4>}
                                               </Col>
                                             </Row> */}
                                {data.posture["Posterial_view"] && (
                                  <Row gutter={[10, 10]} className="px-4 py-2">
                                    <Col md={24} lg={24} sm={24} xs={24}>
                                      <Descriptions title="">
                                        <Descriptions.Item label="Notes ">
                                          {Object.keys(data.posture).length >
                                            0 && data.posture["Notes"]}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </Col>
                                    <Col md={24} lg={24} sm={24} xs={24}>
                                      <h1>Degree of Deviation</h1>
                                    </Col>
                                    <Col md={24} lg={24} sm={24} xs={24}>
                                      <h2>Standing</h2>
                                    </Col>
                                    {Object.keys(data.posture["Posterial_view"]).length > 0 && <><Col md={24} lg={18} sm={24} xs={24}>
                                      <Descriptions title="Anterior" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} >
                                        {
                                          <Descriptions.Item label="Nasal Bridge">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[0]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Shoulder levels(Acrimion)">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[1]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label=" Umbilicus">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[2]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Knees">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[3]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Ankle/Foot">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[4]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Line of Gravity">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["Posterial_view"] &&
                                              data.posture["Posterial_view"]
                                                .Angles[5]}
                                          </Descriptions.Item>
                                        }
                                      </Descriptions>
                                    </Col>
                                      <Col md={24} lg={6} sm={24} xs={24}>
                                        <img
                                          src={
                                            data.posture["Posterial_view"]
                                              .posterial_view_image
                                          }
                                        />
                                      </Col>
                                      <Descriptions title="">
                                        {
                                          Object.keys(data.posture.Posterial_view.checkbox).map(ob => (
                                            <>
                                              {data.posture.Posterial_view.checkbox[ob] == 1 && (
                                                <Descriptions.Item label="">
                                                  <Badge color="#000000" />
                                                  {ob}
                                                </Descriptions.Item>
                                              )}
                                            </>
                                          ))
                                        }
                                      </Descriptions>
                                    </>}
                                  </Row>
                                )}
                                {data.posture.lateral_view && Object.keys(data.posture["lateral_view"]).length > 0 && (
                                  <Row gutter={[10, 10]} className="px-4 py-2">
                                    <Col md={24} lg={18} sm={24} xs={24}>
                                      <Descriptions title="Lateral" bordered column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
                                        <Descriptions.Item label="Head deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["lateral_view"] &&
                                            data.posture["lateral_view"]
                                              .Angles[0]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Shoulder">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["lateral_view"] &&
                                            data.posture["lateral_view"]
                                              .Angles[1]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Hip/Pelvic Deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["lateral_view"] &&
                                            data.posture["lateral_view"]
                                              .Angles[2]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Knees Deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["lateral_view"] &&
                                            data.posture["lateral_view"]
                                              .Angles[3]}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </Col>
                                    <Col md={24} lg={6} sm={24} xs={24}>
                                      <img
                                        src={
                                          data.posture["lateral_view"]
                                            .posterial_view_image
                                        }
                                      />
                                    </Col>
                                    <Descriptions title="">
                                      {
                                        Object.keys(data.posture.lateral_view.checkbox).map(ob => (
                                          <>
                                            {data.posture.lateral_view.checkbox[ob] == 1 && (
                                              <Descriptions.Item label="">
                                                <Badge color="#000000" />
                                                {ob}
                                              </Descriptions.Item>
                                            )}
                                          </>
                                        ))
                                      }
                                    </Descriptions>
                                  </Row>
                                )}
                                {data.posture["sitting_Posterial_view"] && (
                                  <Row gutter={[10, 10]} className="px-4 py-2">
                                    <Col md={24} lg={24} sm={24} xs={24}>
                                      <Descriptions title="">
                                        <Descriptions.Item label="Notes ">
                                          {Object.keys(data.posture).length >
                                            0 && data.posture["Notes"]}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </Col>
                                    <Col md={24} lg={24} sm={24} xs={24}>
                                      <h2>Sitting</h2>
                                    </Col>
                                    {data.posture.sitting_Posterial_view && Object.keys(data.posture["sitting_Posterial_view"]).length > 0 && <><Col md={24} lg={18} sm={24} xs={24}>
                                      <Descriptions title="Anterior" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} >
                                        {
                                          <Descriptions.Item label="Nasal Bridge">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[0]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Shoulder levels(Acrimion)">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[1]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label=" Umbilicus">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[2]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Knees">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[3]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Ankle/Foot">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[4]}
                                          </Descriptions.Item>
                                        }
                                        {
                                          <Descriptions.Item label="Line of Gravity">
                                            {Object.keys(data.posture).length >
                                              0 &&
                                              data.posture["sitting_Posterial_view"] &&
                                              data.posture["sitting_Posterial_view"]
                                                .Angles[5]}
                                          </Descriptions.Item>
                                        }
                                      </Descriptions>
                                    </Col>
                                      <Col md={24} lg={6} sm={24} xs={24}>
                                        <img
                                          src={
                                            data.posture["sitting_Posterial_view"]
                                              .posterial_view_image
                                          }
                                        />
                                      </Col>
                                      <Descriptions title="">
                                        {/* {data.posture&&data.posture.Posterial_view.checkbox&&data.posture[
                                          "Posterial_view"
                                        ].checkbox.map((ob) => (
                                          <>
                                            {ob[1] == 1 && (
                                              <Descriptions.Item label="">
                                                <Badge color="#000000" />
                                                {ob[0]}
                                              </Descriptions.Item>
                                            )}
                                          </>
                                        ))} */}
                                        {
                                          Object.keys(data.posture.sitting_Posterial_view.checkbox).map(ob => (
                                            <>
                                              {data.posture.sitting_Posterial_view.checkbox[ob] == 1 && (
                                                <Descriptions.Item label="">
                                                  <Badge color="#000000" />
                                                  {ob}
                                                </Descriptions.Item>
                                              )}
                                            </>
                                          ))
                                        }
                                      </Descriptions>
                                    </>}
                                  </Row>
                                )}
                                {data.posture.Sitting_lateral_view && Object.keys(data.posture["Sitting_lateral_view"]).length > 0 && (
                                  <Row gutter={[10, 10]} className="px-4 py-2">
                                    <Col md={24} lg={18} sm={24} xs={24}>
                                      <Descriptions title="Lateral" bordered column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
                                        <Descriptions.Item label="Head deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["Sitting_lateral_view"] &&
                                            data.posture["Sitting_lateral_view"]
                                              .Angles[0]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Shoulder">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["Sitting_lateral_view"] &&
                                            data.posture["Sitting_lateral_view"]
                                              .Angles[1]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Hip/Pelvic Deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["Sitting_lateral_view"] &&
                                            data.posture["Sitting_lateral_view"]
                                              .Angles[2]}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Knees Deviation">
                                          {Object.keys(data.posture).length >
                                            0 &&
                                            data.posture["Sitting_lateral_view"] &&
                                            data.posture["Sitting_lateral_view"]
                                              .Angles[3]}
                                        </Descriptions.Item>
                                      </Descriptions>
                                    </Col>
                                    <Col md={24} lg={6} sm={24} xs={24}>
                                      <img
                                        src={
                                          data.posture["Sitting_lateral_view"]
                                            .posterial_view_image
                                        }
                                      />
                                    </Col>
                                    <Descriptions title="">
                                      {
                                        Object.keys(data.posture.Sitting_lateral_view.checkbox).map(ob => (
                                          <>
                                            {data.posture.Sitting_lateral_view.checkbox[ob] == 1 && (
                                              <Descriptions.Item label="">
                                                <Badge color="#000000" />
                                                {ob}
                                              </Descriptions.Item>
                                            )}
                                          </>
                                        ))
                                      }
                                    </Descriptions>
                                  </Row>
                                )}
                              </div>
                            </Panel>
                          )}
                        {console.log("rom data is ", data)}
                        {(data.AI_data != null ||
                          (data.LeftLateral_AI_Data &&
                            data.LeftLateral_AI_Data != null) ||
                          (data.RightLateral_AI_Data &&
                            data.RightLateral_AI_Data != null)) && (
                            <Panel header="AROM Assessment" key="7">
                              {" "}
                              <div className=" border mb-3 mt-3">
                                <div className=" border mb-3 mt-3">
                                  <Row gutter={[10, 10]}>
                                    {data.AI_data != null && (
                                      <>
                                        <Row className="border">
                                          <Col md={24} lg={24} sm={24} xs={24}>
                                            <h4 className="p-2">
                                              Anterior ROM Assesment
                                            </h4>
                                          </Col>
                                        </Row>
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <Table
                                            scroll={{ y: 300 }}
                                            pagination={false}
                                            columns={columns}
                                            dataSource={
                                              data.AI_data && data.AI_data != null && Object.keys(data.AI_data).length > 0
                                                ? Object.keys(
                                                  data.AI_data[
                                                  Object.keys(data.AI_data)[0]
                                                  ]["angles"]
                                                ).map((item, index) => {
                                                  let t = {};
                                                  t["key"] = index;
                                                  t["angles"] = tableLabels[
                                                    item
                                                  ]
                                                    ? tableLabels[item]
                                                    : "Not Available";
                                                  t["min"] = Math.round(
                                                    data.AI_data[
                                                      Object.keys(
                                                        data.AI_data
                                                      )[0]
                                                    ]["angles"][item].min
                                                  );
                                                  t["max"] = Math.round(
                                                    data.AI_data[
                                                      Object.keys(
                                                        data.AI_data
                                                      )[0]
                                                    ]["angles"][item].max
                                                  );
                                                  return t;
                                                })
                                                : []
                                            }
                                          />
                                        </Col>
                                      </>
                                    )}
                                    {((data.LeftLateral_AI_Data &&
                                      data.LeftLateral_AI_Data != null) ||
                                      (data.RightLateral_AI_Data &&
                                        data.RightLateral_AI_Data != null)) && (
                                        <>
                                          {/* <Row className="border">
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <h4 className="p-2">
                                            Lateral ROM Assesment
                                          </h4>
                                        </Col>
                                      </Row>
                                      <Row className="border">
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <h4 className="p-2">
                                          <h5 className="p-2">Left side</h5>
                                          </h4>
                                        </Col>
                                      </Row> */}
                                          <Col md={24} lg={24} sm={24} xs={24}>
                                            <Row className="border">
                                              <Col md={24} lg={24} sm={24} xs={24}>
                                                <h4 className="p-2">
                                                  Lateral ROM Assesment
                                                </h4>
                                              </Col>
                                            </Row>
                                            <Row gutter={[10, 10]}>
                                              {data.LeftLateral_AI_Data != null && (
                                                <Col
                                                  md={12}
                                                  lg={12}
                                                  sm={24}
                                                  xs={24}
                                                >
                                                  <h5 className="p-2">Left side</h5>
                                                  <Table
                                                    pagination={false}
                                                    columns={columns}
                                                    dataSource={
                                                      data.LeftLateral_AI_Data && Object.keys(data.LeftLateral_AI_Data).length > 0
                                                        ? Object.keys(
                                                          data
                                                            .LeftLateral_AI_Data[
                                                          Object.keys(
                                                            data.LeftLateral_AI_Data
                                                          )[0]
                                                          ]["angles"]
                                                        ).map((item, index) => {
                                                          let t = {};
                                                          t["key"] = index;
                                                          t["angles"] =
                                                            tableLabelLateral[item]
                                                              ? tableLabelLateral[item]
                                                              : "Not Available";
                                                          t["min"] = Math.round(
                                                            data
                                                              .LeftLateral_AI_Data[
                                                              Object.keys(
                                                                data.LeftLateral_AI_Data
                                                              )[0]
                                                            ]["angles"][item].min
                                                          );
                                                          t["max"] = Math.round(
                                                            data
                                                              .LeftLateral_AI_Data[
                                                              Object.keys(
                                                                data.LeftLateral_AI_Data
                                                              )[0]
                                                            ]["angles"][item].max
                                                          );
                                                          return t;
                                                        })
                                                        : []
                                                    }
                                                  />
                                                </Col>
                                              )}

                                              {data.RightLateral_AI_Data !=
                                                null && (
                                                  <Col
                                                    md={12}
                                                    lg={12}
                                                    sm={24}
                                                    xs={24}
                                                  >
                                                    <h5 className="p-2">
                                                      Right side
                                                    </h5>
                                                    <Table
                                                      pagination={false}
                                                      columns={columns}
                                                      dataSource={
                                                        data.RightLateral_AI_Data && Object.keys(data.RightLateral_AI_Data)
                                                          ? Object.keys(
                                                            data
                                                              .RightLateral_AI_Data[
                                                            Object.keys(
                                                              data.RightLateral_AI_Data
                                                            )[0]
                                                            ]["angles"]
                                                          ).map((item, index) => {
                                                            let t = {};
                                                            t["key"] = index;
                                                            t["angles"] =
                                                              tableLabelLateral[item]
                                                                ? tableLabelLateral[item]
                                                                : "Not Available";
                                                            t["min"] = Math.round(
                                                              data
                                                                .RightLateral_AI_Data[
                                                                Object.keys(
                                                                  data.RightLateral_AI_Data
                                                                )[0]
                                                              ]["angles"][item].min
                                                            );
                                                            t["max"] = Math.round(
                                                              data
                                                                .RightLateral_AI_Data[
                                                                Object.keys(
                                                                  data.RightLateral_AI_Data
                                                                )[0]
                                                              ]["angles"][item].max
                                                            );
                                                            return t;
                                                          })
                                                          : []
                                                      }
                                                    />
                                                  </Col>
                                                )}
                                            </Row>
                                          </Col>
                                        </>
                                      )}
                                  </Row>
                                </div>
                              </div>{" "}
                            </Panel>
                          )}
                        {/* {dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data"&&   <Panel header="AROM Assessment" key="7"> <div className=" border mb-3 mt-3" >

                                                <div className=" border mb-3 mt-3">
                                                    <Row gutter={[10, 10]} className="px-4 py-2">
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table ? dataArray[paginationState.current - 1].table : tableNOdata1 : tableNOdata1} /> */}
                        {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data" && dataArray[paginationState.current - 1].table } /> */}
                        {/* </Col>
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table2 ? dataArray[paginationState.current - 1].table2 : tableNOdata2 : tableNOdata2} />' */}
                        {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table2 && dataArray[paginationState.current - 1].table2 } />' */}
                        {/* </Col>
                                                    </Row>

                                                </div>


                                            </div> </Panel> } */}
                      </Collapse>
                      <center>
                        <div className="pag_large">
                          <Pagination
                            pageSize={paginationState.pageSize}
                            current={paginationState.current}
                            total={AssesmentData.length}
                            onChange={PaginationChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </center>
                      <div style={{ display: "none" }} className="pag_mob">
                        <center>
                          <Pagination
                            size="small"
                            pageSize={paginationState.pageSize}
                            current={paginationState.current}
                            total={AssesmentData.length}
                            onChange={PaginationChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </center>
                      </div>
                    </>

                    {<div id="assesmentPrint" className={showAssesment ? "" : "assesmentPrint"} ref={assessmentRef}>

                      {data.body_image && (

                        <div className=" border mb-3 mt-3">
                          <h4 className="p-2">Areas of Pain/Impairment </h4>
                          <Row>
                            <img width="100%" src={data.body_image} />
                          </Row>
                        </div>

                      )}
                      {(data.physical_assessement.Built.length > 0 ||
                        data.physical_assessement.History.length > 0 ||
                        data.physical_assessement.chiefCom.length > 0 ||
                        data.physical_assessement.past_medical_history
                          .length > 0 ||
                        (data.physical_assessement.Subjective[0].occupation
                          .length > 0 &&
                          data.physical_assessement.Subjective[0].duration
                            .length > 0)) && (
                          < >
                            <div className=" border mb-3 mt-3">
                              {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Physical Assesment</h4>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                                                    </Col>
                                                </Row> */}
                              <Row gutter={[10, 10]} className="px-4 py-2">
                                <Descriptions>
                                  <Descriptions.Item label="Assesment Date">
                                    {data.assesmentdate.slice(0, 10)}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Built">
                                    {data.physical_assessement.Built}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="History">
                                    {data.physical_assessement.History}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Cheif Complaint">
                                    {" "}
                                    {data.physical_assessement.chiefCom}
                                  </Descriptions.Item>

                                  <Descriptions.Item
                                    label="Past Medical History"
                                    span={3}
                                  >
                                    {" "}
                                    {data.physical_assessement
                                      .past_medical_history &&
                                      data.physical_assessement
                                        .past_medical_history.length > 0 &&
                                      data.physical_assessement.past_medical_history.map(
                                        (p) => `${p + " ,"}`
                                      )}
                                  </Descriptions.Item>
                                  <Descriptions.Item label="Any Other details ">
                                    {" "}
                                    {
                                      data.physical_assessement
                                        .any_other_details
                                    }
                                  </Descriptions.Item>
                                  {/* any_other_details */}
                                </Descriptions>
                              </Row>
                            </div>

                            {/* <div className=" border mb-3 mt-3"> */}
                            {data.physical_assessement.Subjective &&
                              data.physical_assessement.Subjective.length >
                              0 && (
                                <>
                                  <Descriptions.Item label="" span={3}>
                                    <b>
                                      <u>Subjective </u>
                                    </b>
                                  </Descriptions.Item>
                                  <Row gutter={[10, 10]} className="px-4 py-2">
                                    <table
                                      style={{ width: "50%" }}
                                    //style={{ width: `${screen.width / 2}px` }}
                                    >
                                      <tr>
                                        <td style={{ width: "33%" }}>
                                          <b>Occupation</b>
                                        </td>
                                        <td style={{ width: "33%" }}>
                                          <b>Duration</b>
                                        </td>
                                        <td style={{ width: "33%" }}>
                                          <b>Sports-type</b>
                                        </td>
                                      </tr>
                                      {data.physical_assessement.Subjective.map(
                                        (data) => (
                                          <tr>
                                            <td>{data.occupation}</td>
                                            <td>{data.duration}</td>
                                            {data.occupation === "Sports" && (
                                              <td>{data.Sports_type}</td>
                                            )}
                                          </tr>
                                        )
                                      )}
                                    </table>
                                  </Row>
                                </>
                              )}
                          </>
                        )}
                      {/* </div> */}
                      {(data.nature_of_pain.length > 0 ||
                        data.pain_scale > 0 ||
                        data.pain_scars.length > 0 ||
                        (data.pain_aggravating !== undefined &&
                          data.pain_aggravating.length > 0) ||
                        (data.pain_relieving !== undefined &&
                          data.pain_relieving.length > 0) ||
                        data.sensory_input["superficial"].length > 0 ||
                        data.sensory_input["deep"].length > 0 ||
                        data.sensory_input["cortial"].length > 0) && (

                          <div className=" border mb-3 mt-3">
                            {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Pain Assesment</h4>
                                                    </Col>
                                                </Row> */}

                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Descriptions>
                                <Descriptions.Item label="Nature Of Pain">
                                  {data.nature_of_pain
                                    ? JSON.stringify(data.nature_of_pain).replace('[', '').replace(']', '').replaceAll('"', '')
                                    : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Pain Scale">
                                  {data.pain_scale
                                    ? data.pain_scale
                                    : data.pain_scale === 0
                                      ? 0
                                      : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Scar">
                                  {data.pain_scars
                                    ? data.pain_scars
                                    : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Swelling">
                                  {data.pain_swelling
                                    ? data.pain_swelling
                                    : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Pain Aggravating">
                                  {data.pain_aggravating !== undefined
                                    ? data.pain_aggravating.length > 0 &&
                                    data.pain_aggravating.map(
                                      (d) => d + " "
                                    )
                                    : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item
                                  label="Pain Relieving"
                                  span={3}
                                >
                                  {" "}
                                  {data.pain_relieving !== undefined
                                    ? data.pain_relieving.length > 0 &&
                                    data.pain_relieving.map((d) => d + " ")
                                    : "not available"}
                                </Descriptions.Item>
                                <Descriptions.Item label="" span={3}>
                                  <b>
                                    <u>Sensory Inputs </u>
                                  </b>
                                </Descriptions.Item>
                                <Descriptions.Item label="Superficial">
                                  {data.sensory_input.superficial}
                                </Descriptions.Item>
                                <Descriptions.Item label="Deep">
                                  {data.sensory_input.deep}
                                </Descriptions.Item>
                                <Descriptions.Item label="Cortial">
                                  {data.sensory_input.cortial}
                                </Descriptions.Item>
                              </Descriptions>
                            </Row>
                          </div>

                        )}
                      {(data.shoulder ||
                        data.Ankle ||
                        data.Cervical_Spine ||
                        data.Thoracic_Spine ||
                        data.Lumbar_Spine ||
                        data.Forearm_wrist_Hand ||
                        data.Hip ||
                        data.Knee ||
                        data.Others ||
                        data.Elbow) && (

                          <div className=" border mb-3 mt-3">
                            {/* <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        {data.shoulder||data.Ankle||data.Cervical_Spine||data.Thoracic_Spine||data.Lumbar_Spine||data.Forearm_wrist_Hand||data.Hip||data.Knee||data.Elbow?<h4 className="p-2"><u>Special Test</u></h4>:''}
                                                    </Col>
                                                </Row> */}
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.shoulder && data.shoulder.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Shoulder </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.shoulder.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Ankle && data.Ankle.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Ankle </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.Ankle.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Elbow && data.Elbow.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Elbow </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.Elbow.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Hip && data.Hip.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Hip </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.Hip.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Knee && data.Knee.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Knee </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.Knee.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Others && data.Others.length > 0 && (
                                  <>
                                    <Descriptions.Item label="" span={3}>
                                      <b>Others </b>
                                    </Descriptions.Item>
                                    <table
                                      style={{
                                        width: `${screen.width / 2}px`,
                                      }}
                                      border="1px"
                                    >
                                      <tr>
                                        <td>
                                          {" "}
                                          <center>Questions</center>
                                        </td>
                                        <td style={{ width: "30%" }}>
                                          <center>Positive/Negative</center>
                                        </td>
                                      </tr>
                                      {data.Others.map((an) => (
                                        <tr>
                                          <td>{an[0]}</td>
                                          <td>
                                            <center>
                                              {an[1] == 1
                                                ? " Positive "
                                                : " Negative "}
                                            </center>
                                          </td>
                                        </tr>
                                      ))}
                                    </table>
                                  </>
                                )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Cervical_Spine &&
                                  data.Cervical_Spine.length > 0 && (
                                    <>
                                      <Descriptions.Item label="" span={3}>
                                        <b>Cervical Spine </b>
                                      </Descriptions.Item>
                                      <table
                                        style={{
                                          width: `${screen.width / 2}px`,
                                        }}
                                        border="1px"
                                      >
                                        <tr>
                                          <td>
                                            {" "}
                                            <center>Questions</center>
                                          </td>
                                          <td style={{ width: "30%" }}>
                                            <center>Positive/Negative</center>
                                          </td>
                                        </tr>
                                        {data.Cervical_Spine.map((an) => (
                                          <tr>
                                            <td>{an[0]}</td>
                                            <td>
                                              <center>
                                                {an[1] == 1
                                                  ? " Positive "
                                                  : " Negative "}
                                              </center>
                                            </td>
                                          </tr>
                                        ))}
                                      </table>
                                    </>
                                  )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Thoracic_Spine &&
                                  data.Thoracic_Spine.length > 0 && (
                                    <>
                                      <Descriptions.Item label="" span={3}>
                                        <b>Thoracic Spine </b>
                                      </Descriptions.Item>
                                      <table
                                        style={{
                                          width: `${screen.width / 2}px`,
                                        }}
                                        border="1px"
                                      >
                                        <tr>
                                          <td>
                                            {" "}
                                            <center>Questions</center>
                                          </td>
                                          <td style={{ width: "30%" }}>
                                            <center>Positive/Negative</center>
                                          </td>
                                        </tr>
                                        {data.Thoracic_Spine.map((an) => (
                                          <tr>
                                            <td>{an[0]}</td>
                                            <td>
                                              <center>
                                                {an[1] == 1
                                                  ? " Positive "
                                                  : " Negative "}
                                              </center>
                                            </td>
                                          </tr>
                                        ))}
                                      </table>
                                    </>
                                  )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Lumbar_Spine &&
                                  data.Lumbar_Spine.length > 0 && (
                                    <>
                                      <Descriptions.Item label="" span={3}>
                                        <b>Lumbar Spine </b>
                                      </Descriptions.Item>
                                      <table
                                        style={{
                                          width: `${screen.width / 2}px`,
                                        }}
                                        border="1px"
                                      >
                                        <tr>
                                          <td>
                                            {" "}
                                            <center>Questions</center>
                                          </td>
                                          <td style={{ width: "30%" }}>
                                            <center>Positive/Negative</center>
                                          </td>
                                        </tr>
                                        {data.Lumbar_Spine.map((an) => (
                                          <tr>
                                            <td>{an[0]}</td>
                                            <td>
                                              <center>
                                                {an[1] == 1
                                                  ? " Positive "
                                                  : " Negative "}
                                              </center>
                                            </td>
                                          </tr>
                                        ))}
                                      </table>
                                    </>
                                  )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                            <Row gutter={[10, 10]} className="px-4 py-2">
                              <Col lg={12} md={18} sm={12} xs={12}>
                                {data.Forearm_wrist_Hand &&
                                  data.Forearm_wrist_Hand.length > 0 && (
                                    <>
                                      <Descriptions.Item label="" span={3}>
                                        <b>Forearm_wrist_Hand </b>
                                      </Descriptions.Item>
                                      <table
                                        style={{
                                          width: `${screen.width / 2}px`,
                                        }}
                                        border="1px"
                                      >
                                        <tr>
                                          <td>
                                            {" "}
                                            <center>Questions</center>
                                          </td>
                                          <td style={{ width: "30%" }}>
                                            <center>Positive/Negative</center>
                                          </td>
                                        </tr>
                                        {data.Forearm_wrist_Hand.map((an) => (
                                          <tr>
                                            <td>{an[0]}</td>
                                            <td>
                                              <center>
                                                {an[1] == 1
                                                  ? " Positive "
                                                  : " Negative "}
                                              </center>
                                            </td>
                                          </tr>
                                        ))}
                                      </table>
                                    </>
                                  )}
                              </Col>
                              <Col lg={12} md={18} sm={12} xs={12}></Col>
                            </Row>
                          </div>

                        )}
                      {Object.keys(data.questionnaires).length > 0 &&
                        data.questionnaires[
                          Object.keys(data.questionnaires)[0]
                        ][0].length > 0 && (

                          <div className=" border mb-3 mt-3">
                            <Row className="border">
                              <Col md={24} lg={24} sm={24} xs={24}>
                                {/* <h4 className="p-2">Questionnaire </h4> */}
                                <Descriptions size="small" bordered>
                                  {Object.keys(data.questionnaires).map(
                                    (label) => (
                                      <>
                                        {data.questionnaires[label][0]
                                          .length > 0 && (
                                            <Descriptions.Item
                                              label={`KOOS ${label}`}
                                            >
                                              {data.questionnaires[
                                                label
                                              ][3] &&
                                                data.questionnaires[
                                                  label
                                                ][3].toFixed(0)}
                                            </Descriptions.Item>
                                          )}
                                      </>
                                    )
                                  )}
                                  {/* <Descriptions.Item label="KOOS Stiffness">{data.questionnaires.Stiffness[3] && data.questionnaires.Stiffness[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Pain">{data.questionnaires.pain[3] && data.questionnaires.pain[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Daily Life">{data.questionnaires.DailyLiving[3] && data.questionnaires.DailyLiving[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Sports">{data.questionnaires.Sports[3] && data.questionnaires.Sports[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Quality of Life">{data.questionnaires.Life[3] && data.questionnaires.Life[3].toFixed(0)}</Descriptions.Item> */}
                                </Descriptions>
                              </Col>
                            </Row>
                            <Row
                              gutter={[10, 10]}
                              className="px-4 py-2"
                            ></Row>
                          </div>

                        )}
                      {data.posture &&
                        (data.posture["Posterial_view"] ||
                          data.posture["lateral_view"] || data.posture["sitting_Posterial_view"]
                          || data.posture["Sitting_lateral_view"]
                        ) && (

                          <div className=" border mb-3 mt-3">
                            {/* <Row className="border">
                                               <Col md={24} lg={24} sm={24} xs={24}>
                                               {(data.posture['Posterial_view']||data.posture['lateral_view'])&&<h4 className="p-2">Posture Analysis</h4>}
                                               </Col>
                                             </Row> */}
                            {data.posture["Posterial_view"] && (
                              <Row gutter={[10, 10]} className="px-4 py-2">
                                <Col md={24} lg={24} sm={24} xs={24}>
                                  <Descriptions title="">
                                    <Descriptions.Item label="Notes ">
                                      {Object.keys(data.posture).length >
                                        0 && data.posture["Notes"]}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                                <Col md={24} lg={24} sm={24} xs={24}>
                                  <h1>Degree of Deviation</h1>
                                </Col>
                                {Object.keys(data.posture["Posterial_view"]).length > 0 && <><Col md={24} lg={18} sm={24} xs={24}>
                                  <Descriptions title="Anterior" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} >
                                    {
                                      <Descriptions.Item label="Nasal Bridge">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[0]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Shoulder levels(Acrimion)">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[1]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label=" Umbilicus">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[2]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Knees">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[3]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Ankle/Foot">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[4]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Line of Gravity">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["Posterial_view"] &&
                                          data.posture["Posterial_view"]
                                            .Angles[5]}
                                      </Descriptions.Item>
                                    }
                                  </Descriptions>
                                </Col>
                                  <Col md={24} lg={6} sm={24} xs={24}>
                                    <img
                                      src={
                                        data.posture["Posterial_view"]
                                          .posterial_view_image
                                      }
                                    />
                                  </Col>
                                  <Descriptions title="">
                                    {/* {data.posture&&data.posture.Posterial_view.checkbox&&data.posture[
                                          "Posterial_view"
                                        ].checkbox.map((ob) => (
                                          <>
                                            {ob[1] == 1 && (
                                              <Descriptions.Item label="">
                                                <Badge color="#000000" />
                                                {ob[0]}
                                              </Descriptions.Item>
                                            )}
                                          </>
                                        ))} */}
                                    {
                                      Object.keys(data.posture.Posterial_view.checkbox).map(ob => (
                                        <>
                                          {data.posture.Posterial_view.checkbox[ob] == 1 && (
                                            <Descriptions.Item label="">
                                              <Badge color="#000000" />
                                              {ob}
                                            </Descriptions.Item>
                                          )}
                                        </>
                                      ))
                                    }
                                  </Descriptions>
                                </>}
                              </Row>
                            )}
                            {data.posture.lateral_view && Object.keys(data.posture["lateral_view"]).length > 0 && (
                              <Row gutter={[10, 10]} className="px-4 py-2">
                                <Col md={24} lg={18} sm={24} xs={24}>
                                  <Descriptions title="Lateral" bordered column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
                                    <Descriptions.Item label="Head deviation">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["lateral_view"] &&
                                        data.posture["lateral_view"]
                                          .Angles[0]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Shoulder">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["lateral_view"] &&
                                        data.posture["lateral_view"]
                                          .Angles[1]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Hip/Pelvic Deviation">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["lateral_view"] &&
                                        data.posture["lateral_view"]
                                          .Angles[2]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Knees Deviation">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["lateral_view"] &&
                                        data.posture["lateral_view"]
                                          .Angles[3]}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                                <Col md={24} lg={6} sm={24} xs={24}>
                                  <img
                                    src={
                                      data.posture["lateral_view"]
                                        .posterial_view_image
                                    }
                                  />
                                </Col>
                                <Descriptions title="">
                                  {
                                    Object.keys(data.posture.lateral_view.checkbox).map(ob => (
                                      <>
                                        {data.posture.lateral_view.checkbox[ob] == 1 && (
                                          <Descriptions.Item label="">
                                            <Badge color="#000000" />
                                            {ob}
                                          </Descriptions.Item>
                                        )}
                                      </>
                                    ))
                                  }
                                </Descriptions>
                              </Row>
                            )}
                          </div>

                        )}
                      {data.posture &&
                        (data.posture["sitting_Posterial_view"] ||
                          data.posture["Sitting_lateral_view"]) && (

                          <div className=" border mb-3 mt-3">
                            {/* <Row className="border">
                                               <Col md={24} lg={24} sm={24} xs={24}>
                                               {(data.posture['Posterial_view']||data.posture['lateral_view'])&&<h4 className="p-2">Posture Analysis</h4>}
                                               </Col>
                                             </Row> */}
                            {data.posture["sitting_Posterial_view"] && (
                              <Row gutter={[10, 10]} className="px-4 py-2">
                                <Col md={24} lg={24} sm={24} xs={24}>
                                  <Descriptions title="">
                                    <Descriptions.Item label="Notes ">
                                      {Object.keys(data.posture).length >
                                        0 && data.posture["Notes"]}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                                <Col md={24} lg={24} sm={24} xs={24}>
                                  <h1>Degree of Deviation</h1>
                                </Col>
                                {data.posture.sitting_Posterial_view && Object.keys(data.posture["sitting_Posterial_view"]).length > 0 && <><Col md={24} lg={18} sm={24} xs={24}>
                                  <Descriptions title="Anterior" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} >
                                    {
                                      <Descriptions.Item label="Nasal Bridge">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[0]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Shoulder levels(Acrimion)">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[1]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label=" Umbilicus">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[2]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Knees">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[3]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Ankle/Foot">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[4]}
                                      </Descriptions.Item>
                                    }
                                    {
                                      <Descriptions.Item label="Line of Gravity">
                                        {Object.keys(data.posture).length >
                                          0 &&
                                          data.posture["sitting_Posterial_view"] &&
                                          data.posture["sitting_Posterial_view"]
                                            .Angles[5]}
                                      </Descriptions.Item>
                                    }
                                  </Descriptions>
                                </Col>
                                  <Col md={24} lg={6} sm={24} xs={24}>
                                    <img
                                      src={
                                        data.posture["sitting_Posterial_view"]
                                          .sitting_Posterial_view_image
                                      }
                                    />
                                  </Col>
                                  <Descriptions title="">
                                    {/* {data.posture&&data.posture.sitting_Posterial_view.checkbox&&data.posture[
                                          "sitting_Posterial_view"
                                        ].checkbox.map((ob) => (
                                          <>
                                            {ob[1] == 1 && (
                                              <Descriptions.Item label="">
                                                <Badge color="#000000" />
                                                {ob[0]}
                                              </Descriptions.Item>
                                            )}
                                          </>
                                        ))} */}
                                    {
                                      Object.keys(data.posture.sitting_Posterial_view.checkbox).map(ob => (
                                        <>
                                          {data.posture.sitting_Posterial_view.checkbox[ob] == 1 && (
                                            <Descriptions.Item label="">
                                              <Badge color="#000000" />
                                              {ob}
                                            </Descriptions.Item>
                                          )}
                                        </>
                                      ))
                                    }
                                  </Descriptions>
                                </>}
                              </Row>
                            )}
                            {data.posture.Sitting_lateral_view && Object.keys(data.posture["Sitting_lateral_view"]).length > 0 && (
                              <Row gutter={[10, 10]} className="px-4 py-2">
                                <Col md={24} lg={18} sm={24} xs={24}>
                                  <Descriptions title="Lateral" bordered column={{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
                                    <Descriptions.Item label="Shoulder">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["Sitting_lateral_view"] &&
                                        data.posture["Sitting_lateral_view"]
                                          .Angles[0]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Hip">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["Sitting_lateral_view"] &&
                                        data.posture["Sitting_lateral_view"]
                                          .Angles[1]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ankle">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["Sitting_lateral_view"] &&
                                        data.posture["Sitting_lateral_view"]
                                          .Angles[2]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Opposite Knee">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["Sitting_lateral_view"] &&
                                        data.posture["Sitting_lateral_view"]
                                          .Angles[3]}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Elbow">
                                      {Object.keys(data.posture).length >
                                        0 &&
                                        data.posture["Sitting_lateral_view"] &&
                                        data.posture["Sitting_lateral_view"]
                                          .Angles[4]}
                                    </Descriptions.Item>
                                  </Descriptions>
                                </Col>
                                <Col md={24} lg={6} sm={24} xs={24}>
                                  <img
                                    src={
                                      data.posture["Sitting_lateral_view"]
                                        .posterial_view_image
                                    }
                                  />
                                </Col>
                                <Descriptions title="">
                                  {
                                    Object.keys(data.posture.Sitting_lateral_view.checkbox).map(ob => (
                                      <>
                                        {data.posture.Sitting_lateral_view.checkbox[ob] == 1 && (
                                          <Descriptions.Item label="">
                                            <Badge color="#000000" />
                                            {ob}
                                          </Descriptions.Item>
                                        )}
                                      </>
                                    ))
                                  }
                                </Descriptions>
                              </Row>
                            )}
                          </div>

                        )}
                      {console.log("rom data is ", data)}
                      {(data.AI_data != null ||
                        (data.LeftLateral_AI_Data &&
                          data.LeftLateral_AI_Data != null) ||
                        (data.RightLateral_AI_Data &&
                          data.RightLateral_AI_Data != null)) && (
                          <>
                            {" "}
                            <div className=" border mb-3 mt-3">
                              <div className=" border mb-3 mt-3">
                                <Row gutter={[10, 10]}>
                                  {data.AI_data != null && Object.keys(data.AI_data).length > 0 && (
                                    <>
                                      <Row className="border">
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <h4 className="p-2">
                                            Anterior ROM Assesment
                                          </h4>
                                        </Col>
                                      </Row>
                                      <Col md={24} lg={24} sm={24} xs={24}>
                                        <Table
                                          pagination={false}
                                          columns={columns}
                                          dataSource={
                                            data.AI_data && data.AI_data != null && Object.keys(data.AI_data).length > 0
                                              ? Object.keys(
                                                data.AI_data[
                                                Object.keys(data.AI_data)[0]
                                                ]["angles"]
                                              ).map((item, index) => {
                                                let t = {};
                                                t["key"] = index;
                                                t["angles"] = tableLabels[
                                                  item
                                                ]
                                                  ? tableLabels[item]
                                                  : "Not Available";
                                                t["min"] = Math.round(
                                                  data.AI_data[
                                                    Object.keys(
                                                      data.AI_data
                                                    )[0]
                                                  ]["angles"][item].min
                                                );
                                                t["max"] = Math.round(
                                                  data.AI_data[
                                                    Object.keys(
                                                      data.AI_data
                                                    )[0]
                                                  ]["angles"][item].max
                                                );
                                                return t;
                                              })
                                              : []
                                          }
                                        />
                                      </Col>
                                    </>
                                  )}
                                  {((data.LeftLateral_AI_Data &&
                                    data.LeftLateral_AI_Data != null) ||
                                    (data.RightLateral_AI_Data &&
                                      data.RightLateral_AI_Data != null)) && (
                                      <>
                                        {/* <Row className="border">
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <h4 className="p-2">
                                            Lateral ROM Assesment
                                          </h4>
                                        </Col>
                                      </Row>
                                      <Row className="border">
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <h4 className="p-2">
                                          <h5 className="p-2">Left side</h5>
                                          </h4>
                                        </Col>
                                      </Row> */}
                                        <Col md={24} lg={24} sm={24} xs={24}>
                                          <Row className="border">
                                            <Col md={24} lg={24} sm={24} xs={24}>
                                              <h4 className="p-2">
                                                Lateral ROM Assesment
                                              </h4>
                                            </Col>
                                          </Row>
                                          <Row gutter={[10, 10]}>
                                            {data.LeftLateral_AI_Data != null && (
                                              <Col
                                                md={12}
                                                lg={12}
                                                sm={24}
                                                xs={24}
                                              >
                                                <h5 className="p-2">Left side</h5>
                                                <Table
                                                  pagination={false}
                                                  columns={columns}
                                                  dataSource={
                                                    data.LeftLateral_AI_Data !=
                                                      null && Object.keys(data.LeftLateral_AI_Data).length > 0
                                                      ? Object.keys(
                                                        data
                                                          .LeftLateral_AI_Data[
                                                        Object.keys(
                                                          data.LeftLateral_AI_Data
                                                        )[0]
                                                        ]["angles"]
                                                      ).map((item, index) => {
                                                        let t = {};
                                                        t["key"] = index;
                                                        t["angles"] =
                                                          tableLabelLateral[item]
                                                            ? tableLabelLateral[item]
                                                            : "Not Available";
                                                        t["min"] = Math.round(
                                                          data
                                                            .LeftLateral_AI_Data[
                                                            Object.keys(
                                                              data.LeftLateral_AI_Data
                                                            )[0]
                                                          ]["angles"][item].min
                                                        );
                                                        t["max"] = Math.round(
                                                          data
                                                            .LeftLateral_AI_Data[
                                                            Object.keys(
                                                              data.LeftLateral_AI_Data
                                                            )[0]
                                                          ]["angles"][item].max
                                                        );
                                                        return t;
                                                      })
                                                      : []
                                                  }
                                                />
                                              </Col>
                                            )}

                                            {data.RightLateral_AI_Data !=
                                              null && (
                                                <Col
                                                  md={12}
                                                  lg={12}
                                                  sm={24}
                                                  xs={24}
                                                >
                                                  <h5 className="p-2">
                                                    Right side
                                                  </h5>
                                                  <Table
                                                    pagination={false}
                                                    columns={columns}
                                                    dataSource={
                                                      data.RightLateral_AI_Data !=
                                                        null && Object.keys(data.RightLateral_AI_Data).length > 0
                                                        ? Object.keys(
                                                          data
                                                            .RightLateral_AI_Data[
                                                          Object.keys(
                                                            data.RightLateral_AI_Data
                                                          )[0]
                                                          ]["angles"]
                                                        ).map((item, index) => {
                                                          let t = {};
                                                          t["key"] = index;
                                                          t["angles"] =
                                                            tableLabelLateral[item]
                                                              ? tableLabelLateral[item]
                                                              : "Not Available";
                                                          t["min"] = Math.round(
                                                            data
                                                              .RightLateral_AI_Data[
                                                              Object.keys(
                                                                data.RightLateral_AI_Data
                                                              )[0]
                                                            ]["angles"][item].min
                                                          );
                                                          t["max"] = Math.round(
                                                            data
                                                              .RightLateral_AI_Data[
                                                              Object.keys(
                                                                data.RightLateral_AI_Data
                                                              )[0]
                                                            ]["angles"][item].max
                                                          );
                                                          return t;
                                                        })
                                                        : []
                                                    }
                                                  />
                                                </Col>
                                              )}
                                          </Row>
                                        </Col>
                                      </>
                                    )}
                                </Row>
                              </div>
                            </div>{" "}
                          </>
                        )}
                      {/* {dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data"&&   <Panel header="AROM Assessment" key="7"> <div className=" border mb-3 mt-3" >

                                                <div className=" border mb-3 mt-3">
                                                    <Row gutter={[10, 10]} className="px-4 py-2">
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table ? dataArray[paginationState.current - 1].table : tableNOdata1 : tableNOdata1} /> */}
                      {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data" && dataArray[paginationState.current - 1].table } /> */}
                      {/* </Col>
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table2 ? dataArray[paginationState.current - 1].table2 : tableNOdata2 : tableNOdata2} />' */}
                      {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table2 && dataArray[paginationState.current - 1].table2 } />' */}
                      {/* </Col>
                                                    </Row>

                                                </div>


                                            </div> </Panel> } */}

                      <center>
                        <div className="pag_large">
                          <Pagination
                            pageSize={paginationState.pageSize}
                            current={paginationState.current}
                            total={AssesmentData.length}
                            onChange={PaginationChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </center>
                      <div style={{ display: "none" }} className="pag_mob">
                        <center>
                          <Pagination
                            size="small"
                            pageSize={paginationState.pageSize}
                            current={paginationState.current}
                            total={AssesmentData.length}
                            onChange={PaginationChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </center>
                      </div>
                    </div>}
                  </Col>
                </div>
              )
          )}
        </Col>
      </div>
      {/* <center>
       <button onClick={make_pdf}>Download Pdf</button>
      </center> */}
      {/* <center>
        <ReactToPrint
          trigger={() => <button className='add-button' >Print</button>}
          content={() => assessmentRef.current}
        />
      </center> */}
    </React.Fragment>
  );
};
export default AssessmentList;
