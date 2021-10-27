import React, { useState } from 'react'
import { Select, Row, Col, Button, Form, Collapse } from 'antd';
import { AiFillMedicineBox } from 'react-icons/ai';
import Questions from "./Questions";
import { getQuestions } from './../../API/Assesment/questionApi';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch } from "react-redux";

const AddQuestions = () => {

  const { Option } = Select;
  const [showQuestion, setShowQuestion] = useState(false)

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
            <p className="border p-2">Episode No: 12dg <br />
              Start Date:12/12/2021 <br />
              Primary Complaint: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, iure?</p>
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
