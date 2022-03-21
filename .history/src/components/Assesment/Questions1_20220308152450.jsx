import React, { useEffect, useState } from 'react';
import { Collapse, Select, Row, Col, Form, Button, Space, notification } from 'antd';
import { QuestionsAnswer } from "./QuestionAnswer"
import { useHistory } from 'react-router-dom';
import { STATECHANGE, STATE_ARRAY_CHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { duration } from 'moment';

const Questions1 = ({questLabel}) => {
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
        // console.log("plz check ",key," ",value," ",index," ",ques, " ",ans)
        dispatch({
            type: STATE_ARRAY_CHANGE,
            payload: {
                key,
                value,
                index,
                ques,
                ans:Array.isArray(ans)?ans[0]:ans
            }
        });
        dispatch({ type: "NOERROR" });
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
        console.log('calcu ',state.FirstAssesment)
        let temp = []
        Object.keys(state.FirstAssesment.Questionnaire.question).map((data,index)=>{
            if(data!=="description"){
                state.FirstAssesment.Questionnaire.question[data].questions.map(d=>{
                    temp.push(d[0])
                })
            }
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
        if (temp.length!==temp1) {
            notification.error({
                message: 'All Fields must be filled to calculate the KOOS score',
                placement: 'bottomLeft',
                duration: 2
            });
        }
        else {
            
            let vare = questLabel.map(lab=>{
                if(Object.keys(state.FirstAssesment[lab].score).length>0){
                    console.log('calcu ytemp ',state.FirstAssesment[lab].score)
                    calcKOOS(state.FirstAssesment[lab].score)
                }
            })
            
            dispatch({
                type: STATECHANGE,
                payload: {
                    key: "question_heading",
                    value: questLabel
                }
            });
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
          //  form.resetFields()
            //   history.push('/dashboard')
            history.goBack();

        }
      //  setscore(score + ksymptom);


    }
    // console.log(`Symptoms score is ${score}`);
    console.log('question state')
    console.log(state)

    return (
        <>
            <h4 className="border ps-4 py-2">KOOS {state.FirstAssesment.Questionnaire.template_name} Assesment</h4>
            {/* <Form> */}
            <Collapse 
            defaultActiveKey={['1']} 
            >
            {Object.keys(state.FirstAssesment.Questionnaire.question).map((data,index)=><>
            {data!=='description'&&
                <Panel header={data} key={data+index} className="bold">
                <div className="ps-4">
                    <h5>{state.FirstAssesment.Questionnaire.question[data].description&&state.FirstAssesment.Questionnaire.question[data].description}</h5>

                    <Row>
                        <Col md={18} lg={18} sm={24} xs={24}>

                            {state.FirstAssesment.Questionnaire.question[data].questions&&state.FirstAssesment.Questionnaire.question[data].questions.map((ques, key) => {

                                    console.log('quest value ',ques[1])
                                return (
                                    <>
                                        <p className="mt-2">
                                            {ques[0]}
                                        </p>

                                        <Select placeholder="Select" className="w-50 mb-2"
                                            onChange={(value) => handleChange(data, value, key, ques[0], ques[1][value])}
                                           // value={state.FirstAssesment[data].key}

                                        >
                                            <Option value="0">{Array.isArray(ques[1][0])?ques[1][0][0]:ques[1][0]}</Option>
                                            <Option value="1">{Array.isArray(ques[1][1])?ques[1][1][0]:ques[1][1]}</Option>
                                            <Option value="2">{Array.isArray(ques[1][2])?ques[1][2][0]:ques[1][2]}</Option>
                                            <Option value="3">{Array.isArray(ques[1][3])?ques[1][3][0]:ques[1][3]}</Option>
                                            <Option value="4">{Array.isArray(ques[1][4])?ques[1][4][0]:ques[1][4]}</Option>
                                            
                                            {/* <Option value="1">{ques[1][1][0]}</Option>
                                            <Option value="2">{ques[1][2][0]}</Option>
                                            <Option value="3">{ques[1][3][0]}</Option>
                                            <Option value="4">{ques[1][4][0]}</Option> */}
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
         </Collapse>
            {/* </Form> */}
            <div className="text-end" style={{ padding: 10 }}>
                <Space>
                    <Button size="large" className="mb-3 btncolor" onClick={HandleSubmit}>save</Button>
                    <Button size="large" className="mb-3 btncolor" onClick={back}>Back</Button>
                </Space>
            </div>
        </>
    )
}

export default Questions1