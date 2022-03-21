import React, { useEffect, useState } from 'react';
import { Collapse, Select, Row, Col, Form, Button, Space, notification } from 'antd';
import { QuestionsAnswer } from "./QuestionAnswer"
import { useHistory } from 'react-router-dom';
import { STATECHANGE, STATE_ARRAY_CHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { duration } from 'moment';

const Questions = ({questLabel}) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const { Panel } = Collapse;

    const state = useSelector(state => state);

    const history = useHistory();

    // console.log(state);

    const dispatch = useDispatch();

    const [score, setscore] = useState(0);

    let KOOS = [];

    const handleChange = (key, value, index = 0, ques, ans) => {
      
        if (key === "Symptoms" || key === "pain" || key === "DailyLiving" || key === "Sports" || key === "Life" || key === "Stiffness" || key =="Difficulty" ) {
            dispatch({
                type: STATE_ARRAY_CHANGE,
                payload: {
                    key,
                    value,
                    index,
                    ques,
                    ans
                }
            });
            dispatch({ type: "NOERROR" });
        }
        else {
            dispatch({
                type: STATECHANGE,
                payload: {
                    key,
                    value,

                }
            });
            dispatch({ type: "NOERROR" });
        }
    }

    const back = () => {
        history.goBack();
    }
useEffect(() => {
    // console.log("value in state ",state.FirstAssesment.Questionnaire)
}, []);
    const calcKOOS = (Array) => {
        var avg = 0
        for (var i = 0; i < Array.length; i++) {
            avg += parseInt(Array[i]);
        }
        avg = avg / Array.length

        var koos_score = 100 - (((avg) * 100) / 4)
        KOOS.push(koos_score)
    }

    const HandleSubmit = () => {
        // console.log('calcu ',state.FirstAssesment)
        let temp = []
        Object.keys(state.FirstAssesment.Questionnaire.question).map((data,index)=>{
            state.FirstAssesment.Questionnaire.question[data].questions.map(d=>{
                temp.push(d[0])
            })
        })
        console.log("calculate length1 ",temp.length)
        console.log('calcu ',questLabel)
        let temp1 = 0
        let vare = questLabel.map(lab=>{
            if(Object.keys(state.FirstAssesment[lab].score).length>0){
                console.log('calcu ytemp ',Object.keys(state.FirstAssesment[lab].score))
                temp1 = temp1 + Object.keys(state.FirstAssesment[lab].score).length
            }
        })
        console.log('calcu ',temp1)
        let StifnessArray = state.FirstAssesment.Stiffness.score;
        let SymptomsArray = state.FirstAssesment.Symptoms.score;
        let PainArray = state.FirstAssesment.pain.score;
        let ADLArray = state.FirstAssesment.DailyLiving.score;
        let SportsArray = state.FirstAssesment.Sports.score;
        let QOLArray = state.FirstAssesment.Life.score;
        let DifficultyArray = state.FirstAssesment.Difficulty.score
        if (temp.length!==temp1) {
            notification.error({
                message: 'All Fields must be filled to calculate the KOOS score',
                placement: 'bottomLeft',
                duration: 2
            });
        }
        else {
            // let vare = questLabel.map(lab=>{
            //     if(Object.keys(state.FirstAssesment[lab].score).length>0){
            //         console.log('calcu ytemp ',Object.keys(state.FirstAssesment[lab].score))
            //         calcKOOS(Object.keys(state.FirstAssesment[lab].score))
            //     }
            // })
            if(SymptomsArray)
            calcKOOS(SymptomsArray)
            if(StifnessArray)
            calcKOOS(StifnessArray)
            if(PainArray)
            calcKOOS(PainArray)
            if(ADLArray)
            calcKOOS(ADLArray)
            if(SportsArray)
            calcKOOS(SportsArray)
            if(QOLArray)
            calcKOOS(QOLArray)
            if(DifficultyArray)
            calcKOOS(DifficultyArray)
            dispatch({
                type: STATECHANGE,
                payload: {
                    key: "KOOS",
                    value: KOOS
                }
            });
            notification.success({
                message: 'Form submitted',
                placement: 'bottomLeft',
                duration: 2
            });
            form.resetFields()
            //   history.push('/dashboard')
            history.goBack();

        }
        setscore(score + ksymptom);


    }
    // console.log(`Symptoms score is ${score}`);
    console.log('question state')
    console.log(state)
    let symptomsQuestion = state.FirstAssesment.Questionnaire.question.symptoms
    let painQuestion = state.FirstAssesment.Questionnaire.question.pain
    let dailyLivingQuestion = state.FirstAssesment.Questionnaire.question["Function, daily living"]
    let sportsQuestion = state.FirstAssesment.Questionnaire.question["Function, sports and recreational activities"]
    let lifeQuestion = state.FirstAssesment.Questionnaire.question["Quality of Life"]
    let stiffnessQuestion = state.FirstAssesment.Questionnaire.question.stiffness
    let difficultyQuestion = state.FirstAssesment.Questionnaire.question.difficulty

    return (
        <>
            <h4 className="border ps-4 py-2">KOOS {state.FirstAssesment.Questionnaire.template_name} Assesment</h4>
            {/* <Form> */}
            {/* <Collapse 
            defaultActiveKey={['1']} 
            >
            {Object.keys(state.FirstAssesment.Questionnaire.question).map((data,index)=><>
            {data!=='description'&&
                <Panel header={data} key="1" className="bold">
                <div className="ps-4">
                    <h5>{state.FirstAssesment.Questionnaire.question[data].description&&state.FirstAssesment.Questionnaire.question[data].description}</h5>

                    <Row>
                        <Col md={18} lg={18} sm={24} xs={24}>

                            {state.FirstAssesment.Questionnaire.question[data].questions&&state.FirstAssesment.Questionnaire.question[data].questions.map((ques, key) => {


                                return (
                                    <>
                                        <p className="mt-2">
                                            {ques[0]}
                                        </p>

                                        <Select placeholder="Select" className="w-50 mb-2"
                                            onChange={(value) => handleChange(data, value, key, ques[0], ques[1][value])}
                                           // value={state.FirstAssesment[data].key}

                                        >
                                            <Option value="0">{ques[1][0]}</Option>
                                            <Option value="1">{ques[1][1]}</Option>
                                            <Option value="2">{ques[1][2]}</Option>
                                            <Option value="3">{ques[1][3]}</Option>
                                            <Option value="4">{ques[1][4]}</Option>
                                        </Select>


                                    </>
                                )
                            })}


                        </Col>
                    </Row>
                </div>
            </Panel>}
            </>
            )}
         </Collapse> */}
                <Collapse defaultActiveKey={['1']} >
                {symptomsQuestion&&<Panel header="Symptoms" key="1" className="bold">
                        <div className="ps-4">
                            <h5>{symptomsQuestion&&symptomsQuestion.description}sjhvwdhv</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>

                                    {symptomsQuestion&&symptomsQuestion.questions.map((ques, key) => {


                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>

                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("Symptoms", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.Symptoms[key]}

                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>


                                            </>
                                        )
                                    })}


                                </Col>
                            </Row>
                        </div>
                    </Panel>}

                    {stiffnessQuestion&&<Panel header="Stiffness" key="2">

                        <div className="ps-4">
                            <h5>{stiffnessQuestion&&stiffnessQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {stiffnessQuestion&&stiffnessQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("Stiffness", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.Stiffness[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </Panel>}

                    {painQuestion&&<Panel header="Pain" key="3">

                        <div className="ps-4">
                            <h5>{painQuestion&&painQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {painQuestion&&painQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("pain", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.pain[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                        </div>

                    </Panel>
}
                    {dailyLivingQuestion&&<Panel header="Function, daily living" key="4">
                        <div className="ps-4">
                            <h5>{dailyLivingQuestion&&dailyLivingQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {dailyLivingQuestion&&dailyLivingQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("DailyLiving", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.DailyLiving[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                        </div>

                    </Panel>}

                    {sportsQuestion&&<Panel header="Function, sports and recreational activities " key="5">
                        <div className="ps-4">
                            <h5>{sportsQuestion&&sportsQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {sportsQuestion&&sportsQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("Sports", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.Sports[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </Panel>}

                    {lifeQuestion&&<Panel header="Quality of Life " key="6">
                        <div className="ps-4">
                            <h5>{lifeQuestion&&lifeQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {lifeQuestion&&lifeQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("Life", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.Life[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </Panel>}
                    {difficultyQuestion&&<Panel header="Difficulty" key="6">
                        <div className="ps-4">
                            <h5>{difficultyQuestion&&difficultyQuestion.description}</h5>

                            <Row>
                                <Col md={18} lg={18} sm={24} xs={24}>
                                    {difficultyQuestion&&difficultyQuestion.questions.map((ques, key) => {
                                        return (
                                            <>
                                                <p className="mt-2">
                                                    {ques[0]}
                                                </p>
                                                <Select placeholder="Select" className="w-50 mb-2"
                                                    onChange={(value) => handleChange("Difficulty", value, key, ques[0], ques[1][value])}
                                                    value={state.FirstAssesment.Difficulty[key]}
                                                >
                                                    <Option value="0">{ques[1][0]}</Option>
                                                    <Option value="1">{ques[1][1]}</Option>
                                                    <Option value="2">{ques[1][2]}</Option>
                                                    <Option value="3">{ques[1][3]}</Option>
                                                    <Option value="4">{ques[1][4]}</Option>
                                                </Select>

                                            </>
                                        )
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </Panel>}
                </Collapse>
            {/* </Form> */}
            <div className="text-end" style={{ padding: 10 }}>
                <Space>
                    <Button size="large" className="mb-3 btncolor" onClick={HandleSubmit}>Submit</Button>
                    <Button size="large" className="mb-3 btncolor" onClick={back}>Back</Button>
                </Space>
            </div>
        </>
    )
}

export default Questions