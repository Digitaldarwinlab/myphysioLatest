import React, { useState } from 'react'
import { Select, Row, Col, Button, Form, Collapse } from 'antd';
import { AiFillMedicineBox } from 'react-icons/ai';
import Questions from "./Questions";
import { getQuestions } from './../../API/Assesment/questionApi';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
// aswin start 10/30/2021 start
import { useDispatch, useSelector } from "react-redux";
// aswin start 10/30/2021 stop
const AddQuestions = () => {

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
      <Form>
        <Row>
          <Col md={8} lg={8} sm={24} xs={24}> <h2><AiFillMedicineBox />Assesment</h2> </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item label="joints" name="Episode" required="true" >
              <Select placeholder="Select"
                className="w-50" onChange={handleChange} >
                <Option value="Hip">Hip</Option>
                <Option value="shoulder">Shoulder</Option>
                <Option value="elbow">Elbow</Option>
                <Option value="knee">Knee</Option>
                <Option value="ankle">Ankle</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
          {/* aswin start 10/30/2021 start */}
            <p className="border p-2">Episode No : {state.carePlanRedcucer.pp_ed_id} <br />
              Start Date : {state.carePlanRedcucer.episode_start_date} <br />
              Episode Type : {state.carePlanRedcucer.complaint}</p>
              {/* aswin start 10/30/2021 stop */}
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
