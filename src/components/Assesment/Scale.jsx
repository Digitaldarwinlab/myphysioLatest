import { Col, notification, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import H1 from './components/H1'
import DetailsTab from './DetailsTab'
import arrow from "../.././assets/arrow.webp";
import { DropdownApi } from '../../API/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Questions1 from "./Questions1";
import { getQuestions, getTemplateName } from '../../API/Assesment/questionApi';
import { STATECHANGE } from '../../contextStore/actions/Assesment';
import BackSave from './components/BackSave';
const Scale = () => {
    const [dropdownValue, setDropdownValue] = useState([]);
    const history = useHistory();
    useEffect(() => {
        async function getData() {
            const data = await DropdownApi("Assesment");
            const data2 = await DropdownApi("Dashboard");
            console.log(data2);
            setDropdownValue(data.Assesment);
        }
        getData();
    }, []);
    const { Option } = Select;
    const [showQuestion, setShowQuestion] = useState(false);
    const [templateName, setTemplateName] = useState([]);
    const [questLabel, setQuestLabel] = useState([]);
    // aswin start 10/30/2021 start
    const state = useSelector((state) => state);
    // aswin start 10/30/2021 stop
    const dispatch = useDispatch();
    useEffect(async () => {
        const res = await getTemplateName();
        setTemplateName(res);
    }, []);
    async function handleChange(value) {
        setShowQuestion(false);
        let data = await getQuestions(value);
        console.log("res data ", data);
        let temp = [];
        Object.keys(data.question).map((d, index) => {
            if (d !== "description") {
                temp.push(d);
                dispatch({
                    type: STATECHANGE,
                    payload: {
                        key: d,
                        value: { score: [], question: [], answer: [] },
                    },
                });
            }
        });
        setQuestLabel(temp);
        // console.log('calcu ',temp)
        //QUESTION_CLEARSTATE
        dispatch({
            type: STATECHANGE,
            payload: {
                key: "Questionnaire",
                value: data,
            },
        });
        setShowQuestion(true);
    }
    let KOOS = [];
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
        console.log('calcu ', state.FirstAssesment)
        let temp = []
        Object.keys(state.FirstAssesment.Questionnaire.question).map((data, index) => {
            if (data !== "description") {
                state.FirstAssesment.Questionnaire.question[data].questions.map(d => {
                    temp.push(d[0])
                })
            }
        })
        console.log("calculate length1 ", temp.length)
        console.log('calcu ', questLabel)
        let temp1 = 0
        let vare = questLabel.map(lab => {
            if (Object.keys(state.FirstAssesment[lab].score).length > 0) {
                console.log('calcu ytemp ', Object.keys(state.FirstAssesment[lab].score))
                temp1 = temp1 + Object.keys(state.FirstAssesment[lab].score).length
            }
        })
        console.log('calcu ', temp1)
        if (temp.length !== temp1) {
            notification.error({
                message: 'All Fields must be filled to calculate the KOOS score',
                placement: 'bottomLeft',
                duration: 2
            });
        }
        else {

            let vare = questLabel.map(lab => {
                if (Object.keys(state.FirstAssesment[lab].score).length > 0) {
                    console.log('calcu ytemp ', state.FirstAssesment[lab].score)
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
    return (
        <Row justify='space-between' className='main-container-1x'>
            <H1 image={arrow} title={'Scales & Index'} />
            <DetailsTab />
            <Col className='bg-theme-1x m1-1x div-border-1x' span={24}>
                <Row>
                    <Col sm={24} md={12} lg={12}>
                        <Col style={{ backgroundColor: 'white', margin: '10px', padding: '10px' }} span={24}>
                            <span className='h2-1x m1-1x'>Scale & Index</span>{dropdownValue.ScalesandIndex !== undefined && (
                                <Select
                                    placeholder="Select" className="" onChange={handleChange}
                                >
                                    {dropdownValue.ScalesandIndex.map(
                                        (item) => (
                                            <Option key={item} value={item}>
                                                {item}
                                            </Option>
                                        )
                                    )}
                                </Select>
                            )}
                        </Col>
                    </Col>
                </Row>
            </Col>
            <Col className='bg-theme-1x m1-1x div-border-1x' span={24}>
                {showQuestion ? <Questions1 questLabel={questLabel} /> : null}
            </Col>
            <BackSave submit={HandleSubmit} />
        </Row>
    )
}

export default Scale