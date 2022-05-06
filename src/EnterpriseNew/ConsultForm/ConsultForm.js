import "./ConsultForm.css";
import React, { useState, useEffect, useCallback } from 'react';

import { Select, Row, Col, Input, Form, Upload, Button, Checkbox, Modal, Space, Radio, Tabs, Badge } from 'antd';
import { ASSESMENT_CLEARSTATE, ASSESSMENT_ADD_SUB_INPUT, ASSESSMENT_REMOVE_SUB_INPUT, ASSESSMENT_SUBJECTIVE, STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Endomorph from "../../styles/Endomorph.png";
import Ectomorph from "../../styles/Ectomorph.png";
import Mesomorph from "../../styles/Mesomorph.png";
import BackButton from "../PatientComponents/shared/BackButton";

// import Body from './Body';

// aswin 10/24/2021 start

// aswin 10/24/2021 stop



const ConsultForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let plainOptions1 = ['Diabetes', 'HYN', 'COPD', 'Cardiac']
  const state = useSelector(state => state);
  const [form] = Form.useForm();
  const [medic, setMedic] = useState(true)
  const [others, setOthers] = useState(true)
  const [Surgical_History_Notes, SetSurgical_History_Notes] = useState(true)
  const handleAddFields = () => {
    // setInputFields([...inputFields, { Occupation: '', Duration: '' }])
    dispatch({ type: "ASSESSMENT_ADD_SUB_INPUT", payload: { type: "subjective" } })

  }

  const handleChange = (key, value, id = 0) => {
    //alert(value+", "+key+" , "+id)
    if (key === "chiefCom" || key === "Medication" || key === "Others") {
      if (value.length > 0) {
        dispatch({
          type: STATECHANGE,
          payload: {
            key,
            value: value[0].toUpperCase() + value.slice(1, value.length)
          }
        });
      }
    }
    if (key === "Date") {
      setDate(value.date);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: value.dateString
        }
      });

    } else if (key === "ScareFile") {
      console.log("files ", (value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files, value])
    } else if (key === "TraumaFile") {
      console.log("files ", (value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files, value])
    } else if (key === 'occupation' || key === 'duration') {
      dispatch({
        type: ASSESSMENT_SUBJECTIVE,
        payload: {
          key,
          value,
          id
        }
      })
    }
    else {
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
    }
    dispatch({ type: "NOERROR" });
  }


  const handleRemoveFields = (index) => {
    // const values = [...inputFields];
    // values.splice(index, 1);
    // setInputFields(values);
    dispatch({ type: "ASSESSMENT_REMOVE_SUB_INPUT", payload: { type: "subjective" } });
  }

  return  <>
  <h3 className="fw-bold m-2">
            <BackButton />
        </h3><div className="consultForm" style={{ padding: "5%" }} >
    <div style={{ border: "1px solid", padding: "5%" }}>
      <div className="container-fuild">

        <Row gutter={[20, 20]} className="py-0">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h2><b>Assesment</b></h2>
          </Col>
        </Row>
        {/* <div className="row">
  <div className="col">
    <h2>Subjective</h2>
  </div>

</div> */}


        <div style={{ border: "0.5px ridge grey", padding: "10px" }}>
          <Col md={24} lg={24} sm={24} xs={24} className="mx-0 p-0">
            <h4 styles={{ marginTop: "10%" }}><b>Subjective</b></h4>
            {state.FirstAssesment.subjective.map((data, index) => {
              let
                occupation = `occupation-${index}`,
                Duration = `Duration-${index}`;
              return (
                <div className="container-fuild p-4 my-3 border1" key={index} style={{ paddingTop: "0 !important" }}>

                  <Row gutter={[20, 20]} className="py-0">
                    <Col md={24} lg={12} sm={24} xs={24} style={{ paddingLeft: '0px' }}>
                      <h4>Occupation</h4>
                      <select className="form-select w-100"
                        name={"occupation" + index} id={occupation} data-id={index}
                        aria-label="Default select example"
                        value={state.FirstAssesment.subjective[index].occupation}
                        // value={state.FirstAssesment.subjective[index].occupation}
                        onChange={(e) => handleChange("occupation", e.target.value, index)}
                      >
                        <option defaultChecked></option>
                        <option value="Desk Job">Desk Job</option>
                        <option value="Standing">Standing</option>
                        <option value="Field Work">Field Work</option>
                        <option value="Home Maker">Home Maker</option>
                        <option value="Retired">Retired</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </Col>
                    {/* <Col md={12} lg={12} sm={12} xs={12}> */}
                    {/* </Col> */}

                    <Col md={24} lg={state.FirstAssesment.subjective[index].occupation === 'Sports' ? 5 : 12} sm={24} xs={24}>
                      <h4>Duration</h4>
                      <Radio.Group required options={['0-8 hours', '0-4 hours', 'Above 8 hours', 'Flexible']} onChange={(e) => handleChange("duration", e.target.value, index)} value={state.FirstAssesment.subjective[index].duration}>
                      </Radio.Group>
                    </Col>
                    {state.FirstAssesment.subjective[index].occupation ===
                      "Sports" && (
                        <Col md={24} lg={6} sm={24} xs={24}>
                          <h4>Sports Type</h4>
                          <input
                            class="mx-3 p-2"
                            onChange={(e) => {
                              handleChange(
                                "Sports_type",
                                e.target.value.length > 1
                                  ? e.target.value[0].toUpperCase() +
                                  e.target.value.slice(
                                    1,
                                    e.target.value.length
                                  )
                                  : e.target.value.length === 1
                                    ? e.target.value.toUpperCase()
                                    : "",
                                index
                              );
                            }}
                            value={
                              state.FirstAssesment.subjective[index].Sports_type
                            }
                            type="text"
                            name={"sports_type" + index}
                            placeholder="Sports Type"
                          />
                        </Col>
                      )}
                  </Row>
                </div>
              )
            }
            )
            }
          </Col>
        </div>


        <div className="row py-0 mx-1">
          <div className="col" style={{ paddingLeft: '0px' }}>
            <button type="button" onClick={() => handleAddFields()} className="btn btn-primary ">+</button>
            <button type="button" disabled={state.FirstAssesment.subjective.length <= 1 ? true : false} onClick={() => handleRemoveFields()} className="btn btn-primary mx-2">-</button>

          </div>

        </div>

      </div>

      <div className="container-fuild">
        {/* <Row gutter={[20, 20]} className="py-3">
  <Col md={24} lg={24} sm={24} xs={24}>
    <h4><b>Chief Complaint</b></h4>
  </Col>
  <Col md={24} lg={24} sm={24} xs={24}>
    <input type="text" className="p-2 w-50" placeholder="Cheif Complaint"
      name="chiefCom"
      value={state.FirstAssesment.chiefCom}
      onChange={(e) => {
          handleChange("chiefCom", e.target.value.length>1?e.target.value[0].toUpperCase()+e.target.value.slice(1, e.target.value.length):e.target.value.length===1?e.target.value.toUpperCase():'')
      }}
    />
  </Col>
</Row> */}
      </div>

      <Row gutter={[10, 10]} className="py-3">
        <Col md={24} lg={24} sm={24} xs={24}>
          <h4><b>History Of Present Complaint</b></h4>
        </Col>
        <Col md={24} lg={24} sm={24} xs={24} className="mx-2" style={{ paddingLeft: '0px' }}>
          <Radio.Group options={['Sudden', 'Gradual', 'History of Fall', 'Tumor', 'Pregnency', 'Metal implants', 'Pacemaker-ICD', 'Any other injury']} onChange={(e) => handleChange("History", e.target.value)} value={state.FirstAssesment.History}>

          </Radio.Group>
          {/* <div className="row " name="History" value={state.FirstAssesment.History} onChange={(e) => handleChange("History", e.target.value)}>
    <div className="col  form-check-inline"><input type="radio" value="Sudden" name="History" /> Sudden</div>
    <div className="col  form-check-inline"><input type="radio" value="Gradual" name="History" /> Gradual</div>
    <div className="col  form-check-inline"><input type="radio" value="History of fall" name="History" />History of fall</div>
    <div className="col  form-check-inline"><input type="radio" value="Any other injury" name="History" /> Any other injury</div>
  </div> */}
        </Col>
      </Row>

      <div className="container-fuild">
        <Row gutter={[10, 10]} className="pb-1">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h4><b>Past Medical History</b></h4>
          </Col>
        </Row>

        <Row gutter={[20, 20]} className="py-0">
          <Col md={24} lg={24} sm={24} xs={24} className="ms-0">
            <Checkbox.Group
              style={{ paddingLeft: "0px" }}
              name="past Medical History"
              value={state.FirstAssesment.past_medical_history}
              onChange={(e) => handleChange("past_medical_history", e)}
              options={plainOptions1}
            />
            <Checkbox.Group
              style={{ paddingLeft: "20px" }}
              name="Medication"
              value={state.FirstAssesment.Medication1}
              onChange={(e) => {
                setMedic(!medic)
                handleChange("medicCheck", medic)
                handleChange("Medication1", e)
              }}
              options={['Medication']}
            />
            <input className="mx-3 p-2" type="text" disabled={medic} value={state.FirstAssesment.Medication} onChange={(e) => {
              handleChange("Medication", e.target.value.length > 1 ? e.target.value[0].toUpperCase() + e.target.value.slice(1, e.target.value.length) : e.target.value.length === 1 ? e.target.value.toUpperCase() : '')
            }} name='medText' placeholder="Medication" />
            <br />
            <Checkbox.Group
              style={{ paddingLeft: "0px" }}
              name="Others"
              value={state.FirstAssesment.Others1}
              onChange={(e) => {
                setOthers(!others)
                handleChange('othCheck', others)
                handleChange('Others1', e)
              }}
              options={['Others']}
            />
            <input className="mx-3 p-2" style={{ marginTop: '5px' }} onChange={(e) => {
              handleChange('Others', e.target.value.length > 1 ? e.target.value[0].toUpperCase() + e.target.value.slice(1, e.target.value.length) : e.target.value.length === 1 ? e.target.value.toUpperCase() : '')
            }} value={state.FirstAssesment.Others} disabled={others} type="text" name='othText' placeholder="Others" />

            <Checkbox.Group
              style={{ paddingLeft: "0px" }}
              name="Surgical History Notes"
              value={state.FirstAssesment.Surgical_History_Notes1}
              onChange={(e) => {
                SetSurgical_History_Notes(!Surgical_History_Notes)
                handleChange('Surgical_History_Notes_check', Surgical_History_Notes)
                handleChange('Surgical_History_Notes1', e)
              }}
              options={['Surgical History Notes']}
            />
            <input className="mx-3 p-2" style={{ marginTop: '5px' }} onChange={(e) => {
              handleChange('Surgical_History_Notes', e.target.value.length > 1 ? e.target.value[0].toUpperCase() + e.target.value.slice(1, e.target.value.length) : e.target.value.length === 1 ? e.target.value.toUpperCase() : '')
            }} value={state.FirstAssesment.Surgical_History_Notes} disabled={Surgical_History_Notes} type="text" name='Surgical_History_NotesText' placeholder="Surgical History Notes" />
            {/* <div className="row" name="past_medical_history" >
      <div classname="form-check form-check-inline">
        <input classname="form-check-input" type="checkbox" id="inlineCheckbox1" name="Diabetes" onChange={(e) => handleChange("Diabetes", e.target.checked)} value={state.FirstAssesment.Diabetes} />
        <label classname="form-check-label" for="inlineCheckbox1">Diabetes</label>
      </div>
      <div classname="form-check form-check-inline">
        <input classname="form-check-input" type="checkbox" id="inlineCheckbox2" name="HYN" onChange={(e) => handleChange("HYN", e.target.checked)} value={state.FirstAssesment.HYN} />
        <label classname="form-check-label" for="inlineCheckbox2">HYN</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" name="COPD" onChange={(e) => handleChange("COPD", e.target.checked)} value={state.FirstAssesment.COPD} />
        <label class="form-check-label" for="inlineCheckbox3">COPD</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" name="Cardiac" onChange={(e) => handleChange("Cardiac", e.target.checked)} value={state.FirstAssesment.Cardiac} />
        <label class="form-check-label" for="inlineCheckbox4">Cardiac</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" name="Medication" onChange={(e) => handleChange("Medication", e.target.checked)} value={state.FirstAssesment.Medication} />
        <label class="form-check-label" for="inlineCheckbox5">Medication</label>
        <input class="mx-5 p-2" type="text" name='medText' placeholder="Medication" />
      </div>
    </div>
  </Col>
  <Col md={24} lg={24} sm={24} xs={24} className="p-0" name="past_check">
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox6" onChange={(e) => handleChange("Other", e.target.checked)} value={state.FirstAssesment.Other} />
      <label class="form-check-label" for="inlineCheckbox6">Other</label>
      <input class="mx-5 p-2" type="text" name='othText' placeholder="Other" />
    </div> */}
          </Col>
        </Row>
      </div>

      <div className="container-fuild">
        <Row gutter={[10, 10]} className="py-3">
          {/* <Col md={24} lg={24} sm={24} xs={24}>
    <h4><b>Built Type</b></h4>
  </Col> */}
          <Col md={24} lg={24} sm={24} xs={24} className="mx-2 p-0">
            {/* <div className="row" name="Built" value={state.FirstAssesment.Built} onChange={(e) => handleChange("Built", e.target.value)}
    >
      <div className="col  form-check-inline">
        <input type="radio" value="ectomorphic"
          name="Built"
        /> Ectomorphic</div>
      <div className="col  form-check-inline"><input type="radio" value="mesomorphic"
        name="Built"
      /> Mesomorphic</div>
      <div className="col  form-check-inline"><input type="radio" value="endomorphic"
        name="Built"
      />Endomorphic</div>

    </div> */}
            {/* <Radio.Group options={['Ectomorphic','Mesomorphic','Endomorphic']} onChange={(e) => handleChange("Built", e.target.value)} value={state.FirstAssesment.Built}>

    </Radio.Group> */}
            <h4><b>Build Type</b></h4>
            <div className="build" style={{ display: "flex" }}>
              <div>
                <input type="radio" name="Built" value="Ectomorphic" onChange={(e) => handleChange("Built", e.target.value)}></input>
                <label > <img className="build-img one" src={Ectomorph} style={{ marginBottom: "12px" }} />Ectomorph</label>
              </div>
              <div >
                <input type="radio" name="Built" value="Mesomorphic" onChange={(e) => handleChange("Built", e.target.value)} ></input>
                <label ><img className="build-img two" src={Mesomorph} />Mesomorph</label>
              </div>
              <div className="">
                <input type="radio" name="Built" value="Endomorphic" onChange={(e) => handleChange("Built", e.target.value)} ></input>
                <label  ><img className="build-img three" src={Endomorph} style={{ marginBottom: "10px" }}/> Endomorph</label>
              </div>
            </div>

          </Col>
        </Row>
      </div>
      <div className="container-fuild">
        <Row gutter={[20, 20]} className="py-3">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h4><b>Any Other Details</b></h4>
          </Col>
          <Col md={24} lg={24} sm={24} xs={24}>
            <input type="text" className="p-2 w-50" placeholder="Any Other Details"
              name="any_other_details"
              value={state.FirstAssesment.any_other_details}
              onChange={(e) => {
                handleChange("any_other_details", e.target.value.length > 1 ? e.target.value[0].toUpperCase() + e.target.value.slice(1, e.target.value.length) : e.target.value.length === 1 ? e.target.value.toUpperCase() : '')
              }}
            />
          </Col>
        </Row>
      </div>
      <button className="fomr-button" onClick={() => history.push('/patient/enterprise/muscle-selection')}>Next</button>
    </div>
    {/* // return <div class="Formdiv">
    // <form>
    //     <label>
    //         Occupation
    //     </label>
    //     <select>
    //     <option selected></option>
    //                     <option value="Desk Job">Desk Job</option>
    //                     <option value="Standing">Standing</option>
    //                     <option value="Field Work">Field Work</option>
    //     </select>
    //     <h3>
    //         Duration
    //     </h3>
       
    //    <input type="radio" name="duaration"></input>
    //    <label>0-4 hours</label>
    //    <input type="radio" name="duaration"></input>
    //    <label>0-8 hours</label>
    //    <input type="radio" name="duaration"></input>
    //    <label>Above  8</label>
    //    <input type="radio" name="duaration"></input>
    //    <label>Flexible</label>
    //     <h3>History Of Presenting Complaint</h3>
    //     <input type="radio" name="history_present"></input>
        
    //     <label>Gradual</label>
    //     <input type="radio" name="history_present"></input>
    //     <label>Sudden</label>
        
    //     <input type="radio" name="history_present"></input>
    //     <label>History of Fall</label>
        
    //     <input type="radio" name="history_present"></input>
    //     <label>Any other injury</label>
    //    <h3>Past Medical History</h3>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>Diabetes</label>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>HYN</label>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>COPD</label>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>Cardiac</label>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>Medication</label>
    //    <input type="checkbox" name="past_medical_history"></input>
    //    <label>Others</label>
    //    <h3>Built Type</h3>
    //    <input type="radio" name="build_type"></input>
    //    <label>Ectomorphic</label>
    //    <input type="radio" name="build_type"></input>
    //    <label>Mesomorphic</label>
    //    <input type="radio" name="build_type"></input>
    //    <label>Endomorphic</label>
       
       
    // </form>

    // </div> */}
  </div>
  </>
}

export default ConsultForm;