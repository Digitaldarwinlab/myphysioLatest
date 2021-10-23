import React, { useState,useEffect } from 'react'
import { Select, Row, Col, Button, Form, Collapse } from 'antd';
import { AiFillMedicineBox } from 'react-icons/ai';
import Questions from "./Questions";
import { getQuestions } from './../../API/Assesment/questionApi';
import { STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch,useSelector} from "react-redux";

const AddQuestions = () => {
  const state= useSelector(state=>state)
  const [details, setDetails]= useState({pp_ed_id:'',start_date:'',primary_complaint:''})
  useEffect( async ()=>{
    const p_code = state.episodeReducer.patient_code || state.carePlanRedcucer.pp_patm_id
    if(p_code){
      const body={
        id:p_code
      }
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
      const res = await fetch("https://myphysio.digitaldarwin.in/api/basic_detail/",{
        headers:headers,
        method:"POST",
        body:JSON.stringify(body)
      })
      const responseData = await res.json()
      console.log("user data",responseData)
      setDetails({pp_ed_id:responseData.pp_ed_id,start_date:responseData.start_date,primary_complaint:responseData.primary_complaint})
    
     
    
    }
},[state])

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
            {/* aswin 10/21/2021 start */}
            <p className="border p-2">Episode No: {details.pp_ed_id} <br />
              Start Date:{details.start_date} <br />
              Episode Type: {details.primary_complaint}</p>
              {/* aswin 10/21/2021 stop */}
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
