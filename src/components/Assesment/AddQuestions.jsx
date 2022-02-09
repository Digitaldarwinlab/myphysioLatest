import React, { useState,useEffect } from 'react'
import { Select, Row, Col, Button, Form, Collapse } from 'antd';
import { AiFillMedicineBox } from 'react-icons/ai';
import Questions from "./Questions";
import Questions1 from "./Questions1";
import { getQuestions, getTemplateName } from './../../API/Assesment/questionApi';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
// aswin start 10/30/2021 start
import { useDispatch, useSelector } from "react-redux";
import BackButton from '../../PatientComponents/shared/BackButton';
import { useHistory } from 'react-router-dom';
// aswin start 10/30/2021 stop
const AddQuestions = ({back,next}) => {

  const { Option } = Select;
  const [showQuestion, setShowQuestion] = useState(false)
  const [templateName, setTemplateName] = useState([])
  const [questLabel, setQuestLabel] = useState([])
  // aswin start 10/30/2021 start
  const state = useSelector(state=>state)
  // aswin start 10/30/2021 stop
  const dispatch = useDispatch();
  useEffect(async() => {
  const res = await getTemplateName()
    console.log('template is ',res)
  setTemplateName(res)
  }, []);
  async function handleChange(value) {
    setShowQuestion(false)
    let data = await getQuestions(value);
    console.log('res data ',data)
    let temp = []
    Object.keys(data.question).map((d,index)=>{
      if(d!=='description'){
        temp.push(d)
        dispatch({
          type: STATECHANGE,
          payload: {
            key: d,
            value: {score:[],question:[],answer:[]}
          }
        });
      }
  })
  setQuestLabel(temp)
  console.log('calcu ',temp)
    //QUESTION_CLEARSTATE
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Questionnaire",
        value: data
      }
    });
    setShowQuestion(true)
  }

  return (
    <>
      <Form className="p-3">
        <Row>
        
          <Col md={24} lg={24} sm={24} xs={24} className=""> 
          <BackButton/>
        <h3><b>Scales & Index</b></h3>
          </Col>
        </Row>

        <Row gutter={[20,20]} style={{marginTop:'15px'}}>
           <Col md={24} lg={12} sm={24} xs={24}>
              <p className="border1 p-2">Episode No : {state.carePlanRedcucer.pp_ed_id} <br /><br />
                Start Date : {state.carePlanRedcucer.episode_start_date} <br /><br />
                Episode Type : {state.carePlanRedcucer.complaint}</p>
            </Col>

            <Col md={24} lg={12} sm={24} xs={24}>
              <Form.Item label="Scales & Index" name="Episode" required="true" >
                <Select placeholder="Select"
                  className="" onChange={handleChange} >
                    {templateName.map(data=>
                  <Option value={data}>{data}</Option>
                    )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

        <div className="border mb-3">
          {showQuestion ? <Questions1 questLabel={questLabel}/> : null}


        </div>

      </Form>
    </>
  )
}

export default AddQuestions
