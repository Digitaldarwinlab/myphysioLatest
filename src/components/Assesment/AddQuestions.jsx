import React, { useState } from 'react'
import { Select, Row, Col, Button, Form, Collapse } from 'antd';
import { AiFillMedicineBox } from 'react-icons/ai';
import Questions from "./Questions";
import { getQuestions } from './../../API/Assesment/questionApi';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
// aswin start 10/30/2021 start
import { useDispatch, useSelector } from "react-redux";
import BackButton from '../../PatientComponents/shared/BackButton';
import { useHistory } from 'react-router-dom';
// aswin start 10/30/2021 stop
const AddQuestions = ({back,next}) => {

  const { Option } = Select;
  const [showQuestion, setShowQuestion] = useState(false)
  // aswin start 10/30/2021 start
  const state = useSelector(state=>state)
  // aswin start 10/30/2021 stop
  const dispatch = useDispatch();
  async function handleChange(value) {
    let data = await getQuestions(value);
   // console.log('data question')
   // console.log(data)
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
        <h3>Add Questions</h3>
          </Col>
        </Row>

        <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
           <Col md={24} lg={12} sm={24} xs={24}>
              <p className="border p-2">Episode No : {state.carePlanRedcucer.pp_ed_id} <br /><br />
                Start Date : {state.carePlanRedcucer.episode_start_date} <br /><br />
                Episode Type : {state.carePlanRedcucer.complaint}</p>
            </Col>

            <Col md={24} lg={12} sm={24} xs={24}>
              <Form.Item label="joints" name="Episode" required="true" >
                <Select placeholder="Select"
                  className="" onChange={handleChange} >
                  <Option value="Hip">Hip</Option>
                  <Option value="shoulder">Shoulder</Option>
                  <Option value="elbow">Elbow</Option>
                  <Option value="knee">Knee</Option>
                  <Option value="ankle">Ankle</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

        <div className="border mb-3">
          {showQuestion ? <Questions /> : null}


        </div>

      </Form>
    </>
  )
}

export default AddQuestions
