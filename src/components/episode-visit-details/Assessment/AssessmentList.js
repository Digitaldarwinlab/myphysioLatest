import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Descriptions, Empty, Table, List, Item, Badge } from "antd";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import { ImPlus } from "react-icons/im";
import Loading from './../../UtilityComponents/Loading';
import { useHistory } from "react-router-dom";
import "../../../styles/Layout/Episode.css"
import { getAssesment } from "../../../API/Assesment/getAssesment";
import { Pagination } from "antd";
{/* aswin start 10/30/2021 start */ }
import { BsFillEyeFill } from "react-icons/bs";
import moment from 'moment'

const AssessmentList = ({ assesmentClick }) => {
    {/* aswin start 10/30/2021 stop */ }
    const history = useHistory();
    const dispatch = useDispatch();

    const state = useSelector(state => state.episodeReducer);
    const [loading, setLoading] = useState(false);
    const [QuestionVisibility, setQuestionVisibility] = useState('none');
    const [RomVisibility, setRomVisibility] = useState('none');
    const [AssesmentData, setAssesmentData] = useState([]);
    const [physicalData, setPhysicalData] = useState([]);

    const [kSymptoms, setKsymptoms] = useState([]);
    const [kStiffness, setKstiffness] = useState([]);
    const [kPain, setKpain] = useState([]);
    const [kDl, setKDl] = useState([]);
    const [kSports, setKsports] = useState([]);
    const [kQOL, setKQOL] = useState([]);
    const [itemArray, SetitemArray] = useState([])
    const [paginationState, setPaginationState] = React.useState({
        totalPage: 5,
        current: 1,
        minIndex: 0,
        maxIndex: 1,
        pageSize: 1
    });


    const [angleValues, setAngleValues] = useState({
        LeftShoulder_ver: '',
        RightShoulder_ver: '',
        LeftElbow: '',
        RightElbow: '',
        LeftHip: '',
        RightHip: '',
        LeftKnee: '',
        RightKnee: '',
    })

    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: AssesmentData.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }

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
            key: "angles"
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            render: number => Math.round(number)
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            render: number => Math.round(number)
        },
    ]



    const dataArray = AssesmentData.map((item) => {
        const key = Object.keys(item.AI_data)
        const AI_data = item.AI_data
        let exercise = item.Exercise_Name[0]
        console.log('exercise name',item)
        console.log(exercise)


        if (exercise) {

            // console.log('AI datas is')
            // console.log(exercise)
            if (Object.values(AI_data).length>0 && Object.values(AI_data)[0].angles && Object.values(AI_data)[0].angles['Left Shoulder(ver)'].min) {
                //   console.log(item.AI_data[exercise].angles)

                return (
                    {
                        table: [
                            {
                                key: '1',
                                angles: 'Left Shoulder',
                                min: Object.values(AI_data)[0].angles['Left Shoulder(ver)'].min,
                                max: Object.values(AI_data)[0].angles['Left Shoulder(ver)'].max
                            },
                            {
                                key: '2',
                                angles: 'Right Shoulder',
                                min: Object.values(AI_data)[0].angles['Right Shoulder(ver)'].min,
                                max: Object.values(AI_data)[0].angles['Right Shoulder(ver)'].max
                            },
                            {
                                key: '3',
                                angles: 'Left Elbow',
                                min: Object.values(AI_data)[0].angles['Left Elbow'].min,
                                max: Object.values(AI_data)[0].angles['Left Elbow'].max
                            },
                            {
                                key: '4',
                                angles: 'Right Elbow',
                                min: Object.values(AI_data)[0].angles['Right Elbow'].min,
                                max: Object.values(AI_data)[0].angles['Right Elbow'].max
                            },
                            {
                                key: '5',
                                angles: 'Left Neck',
                                min: Object.values(AI_data)[0].angles['Neck Left'].min,
                                max: Object.values(AI_data)[0].angles['Neck Left'].max
                            },
                            {
                                key: '6',
                                angles: 'Right Neck',
                                min: Object.values(AI_data)[0].angles['Neck Right'].min,
                                max: Object.values(AI_data)[0].angles['Neck Right'].max
                            },

                        ],





                        table2: [
                            {
                                key: '7',
                                angles: 'Left Hip',
                                min: Object.values(AI_data)[0].angles['Left Hip'].min,
                                max: Object.values(AI_data)[0].angles['Left Hip'].max
                            },
                            {
                                key: '8',
                                angles: 'Right Hip',
                                min: Object.values(AI_data)[0].angles['Right Hip'].min,
                                max: Object.values(AI_data)[0].angles['Right Hip'].max
                            },
                            {
                                key: '9',
                                angles: 'Left Knee',
                                min: Object.values(AI_data)[0].angles['Left Knee'].min,
                                max: Object.values(AI_data)[0].angles['Left Knee'].max
                            },
                            {
                                key: '10',
                                angles: 'Right Knee',
                                min: Object.values(AI_data)[0].angles['Right Knee'].min,
                                max: Object.values(AI_data)[0].angles['Right Knee'].max
                            },
                            {
                                key: '11',
                                angles: 'Left Pelvic',
                                min: Object.values(AI_data)[0].angles['Pelvic Left'].min,
                                max: Object.values(AI_data)[0].angles['Pelvic Left'].max
                            },
                            {
                                key: '12',
                                angles: 'Right Pelvic ',
                                min: Object.values(AI_data)[0].angles['Pelvic Right'].min,
                                max: Object.values(AI_data)[0].angles['Pelvic Right'].max
                            },
                        ]
                    }
                )


            }




        }


        else {
            return (
                {
                    table: [
                        {
                            key: '1',
                            angles: 'Left Shoulder',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '2',
                            angles: 'Right Shoulder',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '3',
                            angles: 'Left Elbow',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '4',
                            angles: 'Right Elbow',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '5',
                            angles: 'Left Neck',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '6',
                            angles: 'Right Neck',
                            min: 'No Data',
                            max: 'No Data'
                        },

                    ],

                    table2: [
                        {
                            key: '7',
                            angles: 'Left Hip',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '8',
                            angles: 'Right Hip',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '9',
                            angles: 'Left Knee',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '10',
                            angles: 'Right Knee',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '11',
                            angles: 'Left Pelvic',
                            min: 'No Data',
                            max: 'No Data'
                        },
                        {
                            key: '12',
                            angles: 'Right Pelvic ',
                            min: 'No Data',
                            max: 'No Data'
                        },
                    ]
                }
            )


        }




    })
    console.log('data array',dataArray)

    const tableNOdata1 = [
        {
            key: '1',
            angles: 'Left Shoulder',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '2',
            angles: 'Right Shoulder',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '3',
            angles: 'Left Elbow',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '4',
            angles: 'Right Elbow',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '5',
            angles: 'Left Neck',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '6',
            angles: 'Right Neck',
            min: 'No Data',
            max: 'No Data'
        },


    ]
    const tableNOdata2 = [
        {
            key: '7',
            angles: 'Left Hip',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '8',
            angles: 'Right Hip',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '9',
            angles: 'Left Knee',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '10',
            angles: 'Right Knee',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '11',
            angles: 'Left Pelvic',
            min: 'No Data',
            max: 'No Data'
        },
        {
            key: '12',
            angles: 'Right Pelvic',
            min: 'No Data',
            max: 'No Data'
        },
    ]
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
        }
        else {
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
   
    useEffect(async () => {
        setLoading(true);
        const data = await getAssesment(state.patient_code);
        let a = data.reverse()
        setAssesmentData(a)
        // setTimeout(() => {
        //     setAssesmentData(a)
        // }, 10);
        console.log("reverse not ",data)
        console.log("reverse ",a)
        setLoading(false)


        if (data.length != 0) {
            let temp = []

            let i = 0
            for (i = 0; i < data.length; i++) {
                temp[i] = data[i].physical_assessement
            }


            setPhysicalData(temp)


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
            maxIndex: 1
        })

    }, [state.patient_code])

    //   console.log('assesment datssa iss')
    // console.log(AssesmentData)

    {/* aswin start 10/30/2021 stop */ }
    const updateAssesment = (data) => {
        console.log(data)
        let assesmentDate = moment(data.assesmentdate)
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Type',
                value: data.types
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Scars',
                value: data.physical_assessement.Scars
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'RecentHistory',
                value: data.physical_assessement.RecentHistory
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Trauma',
                value: data.physical_assessement.Trauma
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Test',
                value: data.physical_assessement.Test
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'PainMeter',
                value: data.physical_assessement.PainMeter
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Swelling',
                value: data.physical_assessement.Swelling
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Numbness',
                value: data.Numbmess
            }
        });
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Date',
                value: {
                    date: data.assesmentdate,
                    dateString: assesmentDate.format('YYYY-MM-DD')
                }
            }
        });
        // dispatch({ type: "NOERROR" });
        history.push({
            pathname: "/assessment/1",
            state: { update: true }
        });
    }
    {/* aswin start 10/30/2021 stop */ }
    return (
        <React.Fragment>
            <Col span={24} className="px-3 py-3 mb-3">
                <Row>
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <h4 className="fw-bold"><u>Assessments</u></h4>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                        {/* aswin start 10/30/2021 start */}
                        <Button className="button1" style={{ color: "white" }} id="bnid" onClick={assesmentClick}>
                            {/* aswin start 10/30/2021 stop */}
                            <ImPlus className="me-2" /> {"  "}Add
                        </Button>
                    </Col>
                </Row>

                {
                    AssesmentData.map((data, index) =>

                        //aswin 10/30/2021 start
                        (AssesmentData.length === 1 ?
                            index >= paginationState.minIndex || index + 1 == paginationState.minIndex : index >= paginationState.minIndex && index < paginationState.maxIndex) && index < paginationState.maxIndex
                        //  index >= paginationState.minIndex && index < paginationState.maxIndex
                        //aswin 10/30/2021 stop
                        && (
                            <div key={index} className="px-1 py-1">
                                <Col span={24} className="px-3">
                                    {loading && <Loading />}
                                    {/* {AssesmentData === null ||AssesmentData === undefined||AssesmentData.length<0 && <p className="fw-bold">No Assesment Present..</p>} */}
                                    {AssesmentData.length === 0 ? <p className="fw-bold">No Assesment Present..</p> : (
                                        <>
                                            <div className=" border mb-3 mt-3">
                                                <Row className="border">
                                                    {/* aswin start 10/30/2021 start */}
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Physical Assesment</h4>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                                                        <BsFillEyeFill className="iconClass3" onClick={() => updateAssesment(data)} />
                                                    </Col>
                                                    {/* aswin start 10/30/2021 stop */}
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Descriptions>
                                                        <Descriptions.Item label="Assesment Date">{data.assesmentdate.slice(0, 10)}</Descriptions.Item>
                                                        <Descriptions.Item label="Built">{data.physical_assessement.Built}</Descriptions.Item>
                                                        <Descriptions.Item label="History">{data.physical_assessement.History}</Descriptions.Item>
                                                        <Descriptions.Item label="chiefCom"> {data.physical_assessement.chiefCom}</Descriptions.Item>
                                                        <Descriptions.Item label="Past Medical History" span={3}> {data.physical_assessement.past_medical_history&&data.physical_assessement.past_medical_history.length>0&&data.physical_assessement.past_medical_history.map(p=>`${p+" ,"}`)}</Descriptions.Item>
                                                    </Descriptions>
                                                </Row>
                                            </div>
                                            {data.body_image&&<div className=" border mb-3 mt-3">
                                         <h4 className="p-2">Joints Selected  </h4>
                                                <img src ={data.body_image} />
                                            </div>}
                                            {/* <div className=" border mb-3 mt-3"> */}
                                            {data.physical_assessement.Subjective&&data.physical_assessement.Subjective.length>0&&<> 
                                            <Descriptions.Item label="" span={3}><b><u>Subjective </u></b></Descriptions.Item>
                                            <Row gutter={[10, 10]} className="px-4 py-2">
                                                <table style={{ width: `${screen.width / 2}px` }}>
                                                    <tr>
                                                        <td style={{ width: "25%" }}><b>Occupation</b></td>
                                                        <td><b>Duration</b></td>
                                                    </tr>
                                                    {data.physical_assessement.Subjective.map(data=><tr>
                                                        <td>{data.occupation}</td>
                                                        <td>{data.duration}</td>
                                                    </tr>)}
                                                </table>
                                                {/* <List
                                                    grid={{ gutter: 24, column: 2 }}
                                                    dataSource={data.physical_assessement.Subjective}
                                                    renderItem={item => (
                                                    <>
                                                    <List.Item>
                                                     Occupation : {item.occupation}
                                                     </List.Item>
                                                     <List.Item>
                                                     Duration : {item.duration}
                                                 </List.Item>
                                                 </>
                                                 )}
                                                /> */}
                                                 
                                                </Row></>}
                                            {/* </div> */}
                                            <div className=" border mb-3 mt-3">
                                                <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        <h4 className="p-2">Pain Assesment</h4>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Descriptions>
                                                        <Descriptions.Item label="Nature Of Pain">{data.nature_of_pain ? data.nature_of_pain : "not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="Pain Scale">{data.pain_scale ? data.pain_scale : data.pain_scale===0?0:"not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="Scar">{data.pain_scars ? data.pain_scars : "not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="Swelling">{data.pain_swelling ? data.pain_swelling : "not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="Pain Aggravating">{data.pain_aggravating !== undefined ? data.pain_aggravating.length > 0 && data.pain_aggravating.map(d => d + " ") : "not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="Pain Relieving" span={3}> {data.pain_relieving !== undefined ? data.pain_relieving.length > 0 && data.pain_relieving.map(d => d + " ") : "not available"}</Descriptions.Item>
                                                        <Descriptions.Item label="" span={3}><b><u>Sensory Inputs </u></b></Descriptions.Item>
                                                        <Descriptions.Item label="Superficial" >{data.sensory_input.superficial}</Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Deep"
                                                        >
                                                            {data.sensory_input.deep}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item
                                                            label="Cortial"
                                                        >
                                                            {data.sensory_input.cortial}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                </Row>
                                            </div>
                                            <div className=" border mb-3 mt-3">
                                                <Row className="border">
                                                    <Col lg={18} md={18} sm={18} xs={24}>
                                                        {data.shoulder||data.Ankle||data.Cervical_Spine||data.Thoracic_Spine||data.Lumbar_Spine||data.Forearm_wrist_Hand||data.Hip||data.Knee||data.Elbow?<h4 className="p-2"><u>Special Test</u></h4>:''}
                                                    </Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {/* {data.Ankle&&<><Descriptions.Item label="Ankle"><Descriptions.Item>{data.Ankle&&data.Ankle.map(er=><>{er[0]}{" : "}{er[1]==1?" pass ":" fail "}<br/></>)}</Descriptions.Item></Descriptions.Item></>} */}
                                                        {data.shoulder && <>
                                                            <Descriptions.Item label="" span={3}><b>Shoulder </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.shoulder.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {/* {data.Ankle&&<><Descriptions.Item label="Ankle"><Descriptions.Item>{data.Ankle&&data.Ankle.map(er=><>{er[0]}{" : "}{er[1]==1?" pass ":" fail "}<br/></>)}</Descriptions.Item></Descriptions.Item></>} */}
                                                        {data.Ankle && <>
                                                            <Descriptions.Item label="" span={3}><b>Ankle </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Ankle.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Elbow && <>
                                                            <Descriptions.Item label="" span={3}><b>Elbow </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }} ><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Elbow.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Hip && <>
                                                            <Descriptions.Item label="" span={3}><b>Hip </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Hip.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Knee && <>
                                                            <Descriptions.Item label="" span={3}><b>Knee </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Knee.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Cervical_Spine && <>
                                                            <Descriptions.Item label="" span={3}><b>Cervical Spine </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Cervical_Spine.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Thoracic_Spine && <>
                                                            <Descriptions.Item label="" span={3}><b>Thoracic Spine </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Thoracic_Spine.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Lumbar_Spine && <>
                                                            <Descriptions.Item label="" span={3}><b>Lumbar Spine </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Lumbar_Spine.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2">
                                                    <Col lg={12} md={18} sm={12} xs={12}>
                                                        {data.Forearm_wrist_Hand && <>
                                                            <Descriptions.Item label="" span={3}><b>Forearm_wrist_Hand </b></Descriptions.Item>
                                                            <table style={{ width: `${screen.width / 2}px` }} border='1px'>
                                                                <tr>
                                                                    <td> <center>Questions</center></td>
                                                                    <td style={{ width: "30%" }}><center>Pass/Fail</center></td>
                                                                </tr>
                                                                {data.Forearm_wrist_Hand.map(an =>
                                                                    <tr>
                                                                        <td>
                                                                            {an[0]}
                                                                        </td>
                                                                        <td>
                                                                            <center>{an[1] == 1 ? " Pass " : " Fail "}</center>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </>}
                                                    </Col>
                                                    <Col lg={12} md={18} sm={12} xs={12}></Col>
                                                </Row>
                                            </div>
                                            <div className=" border mb-3 mt-3">
                                                <Row className="border">
                                                    <Col md={24} lg={24} sm={24} xs={24}>
                                                        <h4 className="p-2">Questionnaire </h4>
                                                        <Descriptions bordered>
                                                            <Descriptions.Item label="KOOS Symptoms">{data.questionnaires.Symptoms[3] && data.questionnaires.Symptoms[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Stiffness">{data.questionnaires.Stiffness[3] && data.questionnaires.Stiffness[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Pain">{data.questionnaires.pain[3] && data.questionnaires.pain[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Daily Life">{data.questionnaires.DailyLiving[3] && data.questionnaires.DailyLiving[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Sports">{data.questionnaires.Sports[3] && data.questionnaires.Sports[3].toFixed(0)}</Descriptions.Item>
                                                            <Descriptions.Item label="KOOS Quality of Life">{data.questionnaires.Life[3] && data.questionnaires.Life[3].toFixed(0)}</Descriptions.Item>
                                                        </Descriptions>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[10, 10]} className="px-4 py-2"></Row>
                                            </div>
                                            {data.posture&&Object.keys(data.posture).length > 0&&<div className=" border mb-3 mt-3">
                                             <Row className="border">
                                               <Col md={24} lg={24} sm={24} xs={24}>
                                               {(data.posture['Posterial_view']||data.posture['lateral_view'])&&<h4 className="p-2">Posture Analysis</h4>}
                                               </Col>
                                             </Row>
                                             {data.posture['Posterial_view']&&<Row gutter={[10, 10]} className="px-4 py-2">
                                             <Col md={24} lg={24} sm={24} xs={24}>
                                                <Descriptions title="" >
                                                <Descriptions.Item label="Notes ">{Object.keys(data.posture).length > 0&&data.posture['Notes'] }</Descriptions.Item>
                                                    </Descriptions>
                                                </Col>
                                              <Col md={24} lg={24} sm={24} xs={24}>
                                              <Descriptions title="Anterior" bordered>
                                             {<Descriptions.Item label="Nasal Bridge">{Object.keys(data.posture).length > 0 &&data.posture['Posterial_view']&&data.posture['Posterial_view'].Angles[0]}</Descriptions.Item>}
                                              {<Descriptions.Item label="Shoulder levels(Acrimion)">{Object.keys(data.posture).length > 0 &&data.posture['Posterial_view']&&data.posture['Posterial_view'].Angles[1]}</Descriptions.Item>}
                                                 {<Descriptions.Item label=" Umbilicus">{Object.keys(data.posture).length > 0&&data.posture['Posterial_view']&&data.posture['Posterial_view'].Angles[2]}</Descriptions.Item>}
                                                  {<Descriptions.Item label="Knees">{Object.keys(data.posture).length > 0&&data.posture['Posterial_view']&&data.posture['Posterial_view'].Angles[3]}</Descriptions.Item>}
                                                 {<Descriptions.Item label="Ankle/Foot">{Object.keys(data.posture).length > 0&&data.posture['Posterial_view']&&data.posture['Posterial_view'].Angles[4]}</Descriptions.Item>}
                                              </Descriptions>
                                              </Col>
                                              <Descriptions title="">
                                                 {data.posture['Posterial_view'].checkBox.map(ob=>
                                                   <>{ob[1]==1&& <Descriptions.Item label=""><Badge color="#000000"/>{ob[0]}</Descriptions.Item>}</>)}
                                              </Descriptions>
                                                </Row>}
                                             {data.posture['lateral_view']&& <Row gutter={[10, 10]} className="px-4 py-2">
                                                <Col md={24} lg={24} sm={24} xs={24}>
                                              <Descriptions title="Lateral" bordered>
                                              <Descriptions.Item label="Head deviation">{Object.keys(data.posture).length > 0 &&data.posture['lateral_view']&&data.posture['lateral_view'].Angles[0]}</Descriptions.Item>
                                              <Descriptions.Item label="Shoulder">{Object.keys(data.posture).length > 0 &&data.posture['lateral_view']&&data.posture['lateral_view'].Angles[1]}</Descriptions.Item>
                                                <Descriptions.Item label="Hip/Pelvic Deviation">{Object.keys(data.posture).length > 0&&data.posture['lateral_view']&&data.posture['lateral_view'].Angles[2]}</Descriptions.Item>
                                                 <Descriptions.Item label="Knees Deviation">{Object.keys(data.posture).length > 0&&data.posture['lateral_view']&&data.posture['lateral_view'].Angles[3]}</Descriptions.Item>
                                             </Descriptions>
                                          </Col>
                                          <Descriptions title="">
                                                 {data.posture['lateral_view'].checkBox.map(ob=>
                                                   <>{ob[1]==1&& <Descriptions.Item label=""><Badge color="#000000"/>{ob[0]}</Descriptions.Item>}</>)}
                                              </Descriptions>
                                         </Row>}
                                        </div>}
                                            {dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data"&&<div className=" border mb-3 mt-3" >

                                                <div className=" border mb-3 mt-3">
                                                    <Row className="border">
                                                        <Col md={24} lg={24} sm={24} xs={24}>
                                                            <h4 className="p-2">ROM Assesment</h4>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={[10, 10]} className="px-4 py-2">
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table ? dataArray[paginationState.current - 1].table : tableNOdata1 : tableNOdata1} />
                                                            {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table &&dataArray[paginationState.current - 1].table[0].max!=="No Data" && dataArray[paginationState.current - 1].table } /> */}
                                                        </Col>
                                                        <Col md={12} lg={12} sm={24} xs={24}>
                                                            <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] ? dataArray[paginationState.current - 1].table2 ? dataArray[paginationState.current - 1].table2 : tableNOdata2 : tableNOdata2} />'
                                                            {/* <Table pagination={false} columns={columns} dataSource={dataArray[paginationState.current - 1] && dataArray[paginationState.current - 1].table2 && dataArray[paginationState.current - 1].table2 } />' */}
                                                        </Col>
                                                    </Row>

                                                </div>


                                            </div>}
                                            <center>
                                                <Pagination
                                                    pageSize={paginationState.pageSize}
                                                    current={paginationState.current}
                                                    total={AssesmentData.length}
                                                    onChange={PaginationChange}
                                                    style={{ marginBottom: '10px' }}
                                                />
                                            </center>
                                        </>
                                    )}
                                </Col>


                            </div>
                        ))
                }

            </Col>


        </React.Fragment>

    );
};
export default AssessmentList;
