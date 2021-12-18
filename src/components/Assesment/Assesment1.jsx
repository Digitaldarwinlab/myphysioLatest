import React, { useState, useEffect } from 'react';
import { InboxOutlined, UploadOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { AiFillMedicineBox } from "react-icons/ai";
import { Select, Row, Col, Input, Form, Upload, Button, Modal, Space } from 'antd';
import { ASSESMENT_CLEARSTATE, STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import FormInput from '../UI/antInputs/FormInput';
import FormTextArea from '../UI/antInputs/FormTextArea';
import FormDate from "../UI/antInputs/FormDate";
import Body from './Body';
import { getEpisode } from '../../API/Episode/EpisodeApi';
{/* aswin 10/25/2021 start */ }
import moment from 'moment'
import ActiveSearch from '../UtilityComponents/ActiveSearch';
{/* aswin 10/25/2021 start */ }
const { Dragger } = Upload;

var pdfjsLib = window['pdfjs-dist/build/pdf'];

//pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';


const layout = {
  // labelCol: { span: 8 },
};
/*
darwin.addProgressListener((setCount, repCount) => {
  document.getElementById('sets').textContent = `Sets: ${setCount}`;
  document.getElementById('reps').textContent = `Reps: ${repCount}`;
  console.log(setCount+'setCount')
})

*/



const Assesment1 = (props1) => {

  const state = useSelector(state => state);
  const [form] = Form.useForm();
  // console.log(state.episodeReducer.patient_code +'patient_code')
  const [episodedata, SetepisodeData] = useState()
  useEffect(async () => {
    //aswin 10/25/2021 start
    // if (props1.history.location.state) {
    //   state.FirstAssesment.Type = props1.history.location.state.type
    // }
    //aswin 10/25/2021 stop
    const data = await getEpisode(state.episodeReducer.patient_code)
    if (data[0]) {
      state.FirstAssesment.episode_id = data[0].pp_ed_id;
      SetepisodeData({
        episodeId: data[0].pp_ed_id,
        complaintId: data[0].primary_complaint,
        start_date: data[0].start_date
      })
    }
    else {
      SetepisodeData({
        episodeId: 'No data',
        complaintId: 'no data',
        start_date: 'no data'
      })
    }

  }, [])

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (
        location.pathname != '/assesment/Questions' &&
        location.pathname != '/care-plan' &&location.pathname != '/assesment/PainAssessment'&&
        location.pathname != '/assesment/SpecialTest'&&
        state.FirstAssesment.episode_id != "") {
        //aswin 11/11/2021 start
        if (sessionStorage.getItem('submit')) {
          sessionStorage.removeItem('submit')
          return;
        }
        //aswin 11/11/2021 stop
        if (window.confirm("Assesment data will be lost. Is it okay?")) {
          dispatch({ type: ASSESMENT_CLEARSTATE });
          return true;
        } else {
          return false;
        }
      }
    });





    const data = state.FirstAssesment;
    form.setFieldsValue({ Ref_Dr_Name: data.Ref_Dr_Name });
    form.setFieldsValue({ Ref_Dr_ID: data.Ref_Dr_ID });
    form.setFieldsValue({ complaint: data.primary_complain });
    form.setFieldsValue({ Operative_Types: data.Operative_Types });
    form.setFieldsValue({ file: data.file });
    form.setFieldsValue({ Patient_History: data.Patient_History });

    return () => {

      unblock();
    };

  }, [history, state.FirstAssesment.episode_id])



  useEffect(() => {

    console.log('assesment state is printing')
    console.log(state.FirstAssesment.Type)

  }, [state.FirstAssesment])




  useEffect(() => {
    if (state.FirstAssesment.Type == "First")
      setPhysicalVisibility('block')
    else
      setPhysicalVisibility('none')
  }, [state.FirstAssesment.Type])


  {/* aswin 10/25/2021 start */ }
  const [date, setDate] = useState();
  {/* aswin 10/25/2021 stop */ }
  const [visibility, setVisibility] = useState("none");

  const [physicalVisibility, setPhysicalVisibility] = useState("none");
  const [files ,setFiles] = useState([])

  const [fileType, setFileType] = useState(false);
  console.log("files ",files)




  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (key, value, id = 0) => {
    console.log('files ',value,"",key)
    if (key === "Date") {
      setDate(value.date);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: value.dateString
        }
      });
  
    }else if(key==="ScareFile"){
      console.log("files ",(value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files,value])
    }else if(key==="TraumaFile"){
      console.log("files ",(value))
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value
        }
      });
      setFiles([...files,value])
    }
    else{
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

  const handleUploadScars = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer");

    changeThumb(e, thumbnailBox)
  }

  const handleUploadTrauma = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer1");
    console.log(e)
    changeThumb(e, thumbnailBox)
  }


  const changeThumb = (e, thumbnailBox) => {

    if (e != undefined) {
      var filein
      var file
      if (e.type == "drop") {
        filein = e.target.value

      }
      else {
        filein = e.target.files
      }

      console.log(filein)
      setVisibility('block')

      for (var i = 0; i < filein.length; i++) {
        if (e.type == "drop") {
          file = filein[i]
        }
        else {
          file = filein[i]
        }
        if (file.type == "application/pdf") {
          var fileReader = new FileReader();
          fileReader.onload = function () {
            var pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            var loadingTask = pdfjsLib.getDocument({ data: pdfData });
            loadingTask.promise.then(function (pdf) {
              console.log('PDF loaded');

              // Fetch the first page
              var pageNumber = 1;
              pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');

                var scale = 0.1;
                var viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                var canvas = document.createElement('canvas');
                canvas.style.padding = "10px"
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                  canvasContext: context,
                  viewport: viewport
                };
                var renderTask = page.render(renderContext);
                thumbnailBox.appendChild(canvas)
                renderTask.promise.then(function () {
                  console.log('Page rendered');
                });
              });
            }, function (reason) {
              // PDF loading error
              console.error(reason);
            });
          };
          fileReader.readAsArrayBuffer(file);
        }
        else {
          setFileType(true)
        }
      }
    }
  }

  const { Option } = Select;

  const { TextArea } = Input;

  const props = {
    showUploadList: fileType
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  console.log('state inassesment')
  console.log(state)
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  // gaurav 5/12/21
  const [chief, setChief] = useState();

  const [inputFields, setInputFields] = useState([
    { Occupation: '', Duration: '' },

  ])


  const handleAddFields = () => {
    setInputFields([...inputFields, { Occupation: '', Duration: '' }])

  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }


  return (
    <div className="px-2 py-2">

      <Form  style={{background:'#fff', marginTop:'0px', padding:'20px'}} {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

        form={form}
      // form={form} name="control-hooks"
      >

        <Row>
          
          <Col md={12} lg={12} sm={24} xs={24}>
            <h3>
            <i className="fas fa-arrow-left" style={{ cursor: "pointer" }}
            onClick={() => { history.goBack() }}
            title="Go Back"
            role="button"></i>
            </h3>
            <h3><AiFillMedicineBox />Assesment/Consultation</h3>
          </Col>
          {state.Validation.episode_check==='failed'&&<Error error={state.Validation.msg} />}
           <Col md={12} lg={12} sm={24} xs={24}>
           <ActiveSearch />  
           </Col>    
          {/* <ActiveSearch  /> */}
          </Row>
          <Row>
          <Col md={24} lg={24} sm={24} xs={24}>
            <div className="border">
              <p className="ps-1 py-2">

                <b> Patient Name </b> {state.episodeReducer.patient_name} <br />
                <b> Patient Code </b> {state.episodeReducer.patient_main_code} <br />
                <b> Episode ID: </b> {episodedata ? episodedata.episodeId : null} <br />
                {/* aswin 10/25/2021 start */}
                <b>  Episode Type : </b> {episodedata ? episodedata.complaintId : null} <br />
                {/* aswin 10/25/2021 stop */}
                <b>  Start Date : </b> {episodedata ? episodedata.start_date : null}

              </p>
            </div>
          </Col>

        </Row>    

        <Row className="AssesmentConsultationMain">
          {/* <Col className="AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}> */}
            {/* <FormDate label="Date"

              name="Date"
              // reverse ="true"
              className="input-field w-100"
              //aswin 10/25/2021 start
              value={moment(state.FirstAssesment.Date.dateString,'YYYY-MM-DD')}
              defaultValue={state.FirstAssesment.Date.dateString && moment(state.FirstAssesment.Date.dateString, "YYYY-MM-DD") }
              //aswin 10/25/2021 stop
              required={true}
              onChange={handleChange}
            /> */}
          {/* </Col> */}
          <Col className="AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}>
            <Form.Item label="Type" name="Type" rules={[{ required: true, message: `Please Select Type.` }]} >
              <Select placeholder="Select Type"
                className="w-100 input-field"
                onChange={(value) => handleChange("Type", value)}
                value={state.FirstAssesment.Type}
                defaultValue={state.FirstAssesment.Type}>
                {/* aswin 10/24/2021 start */}
                <Option value="First">{state.FirstAssesment.Type === "First" && "First Assesment"}</Option>
                {/* aswin 10/24/2021 start */}
                <Option value="Periodic">Periodic</Option>
                <Option value="Consultation">Consultation</Option>
              </Select>
            </Form.Item>

          </Col>
        </Row>
      </Form>

      <div className="border mb-3 mt-3" style={{ background:'#fff', marginTop:'10px', padding:'20px'}}>
        <Form form={form} >
          <Row className="border">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4 className="p-2">Physical Assesment</h4>
            </Col>
          </Row>

          <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
              <Col md={24} lg={12} sm={24} xs={24}>
                <FormInput label="Scars"
                  name="Scars"
                  value={state.FirstAssesment.Scars}
                  defaultValue={state.FirstAssesment.Scars}
                  onChange={handleChange} required={true}>
                </FormInput>
                <div style={{ display: visibility, padding: 5, width: '100%' }} id="pdfViewer">
                </div>
              </Col>
              {/* <Col md={24} lg={12} sm={24} xs={24}>
                <input id="myPdf" className="input-file"
                  accept="application/pdf,image/*,application/msword"
                  type="file" multiple

                  onInput={handleUploadScars}
                  onChange={(val) => handleChange("ScareFile", val.target.files)} />
                </Col> */}
          </Row>
        </Form>
        <Form  form={form}  layout="vertical">

          <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
               <FormTextArea label="Recent History"
                  name="RecentHistory"
                  value={state.FirstAssesment.RecentHistory}
                  defaultValue={state.FirstAssesment.RecentHistory}
                  onChange={handleChange} required={true} />
            </Col>

            <Col  md={24} lg={12} sm={24} xs={24}>
              {/* <Upload>
              <Button icons={<UploadOutlined />}
              onChange={(val) => handleChange("ScareFile", val.target.files[0])}
              >Click to Upload</Button>
              </Upload> */}
              <Dragger {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"
               // onChange={(val) => { handleChange("TraumaFile", val.fileList); handleUploadTrauma(event) }}
               onInput={handleUploadScars}
               onChange={ async (e)=>{
                let files=[]
                await  e.fileList.forEach((data)=>{files.push(data.originFileObj)})
                console.log(files)
                handleChange('ScareFile',files)
               }}
              >
                Choose Files
              </Dragger>
              {/* <input id="myPdf"
                accept="application/pdf,image/*,application/msword"
                type="file" multiple

                onInput={handleUploadScars}
                onChange={(val) => handleChange("ScareFile", val.target.files[0])} /> */}

            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
            
              </Col>
          </Row>

        </Form>
        {/* gaurav 4/12 */}
        <div className="container-fuild">
          <div className="row">
            <div className="col">
              <h2>Subjective</h2>
            </div>

          </div>


          {inputFields.map((inputFields, index) => (
            <div key={index}>
      <div className="container border-bottom mb-3">

        <Row gutter={[20,20]}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <h4><b>Occupation</b></h4>
            </Col>
            <Col md={24} lg={12} sm={24} xs={24} className="text-right">
            <select className="form-select w-30"
                    name="occupation"
                    aria-label="Default select example"
                    value={state.FirstAssesment.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}

                  >
                    <option selected>Type</option>
                    <option value="1">Desk Job</option>
                    <option value="2">Standing</option>
                    <option value="3">Field Work</option>
                  </select>
            </Col>
        </Row>
        
        <Row gutter={[20,20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Duration</b></h4>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24} className="mx-3">
              <div className="row" name="Duration" value={state.FirstAssesment.Duration} onChange={(e) => handleChange("Duration", e.target.value)}>
                  <div className="col form-check-inline"><input type="radio" value="0-8 hours" name="Duration" />0-8 hours</div>
                  <div className="col form-check-inline"><input type="radio" value="0-4 hours" name="Duration" />0-4 hours</div>
                  <div className="col form-check-inline"><input type="radio" value="Above 8 Hours" name="Duration" /> Above 8 Hours</div>
                  <div className="col form-check-inline"><input type="radio" value="Flexible" name="Duration" /> Flexible</div>
                </div>
              </Col>
        </Row>
  
      </div>

            </div>
          ))
          }

          <div className="row py-3 mx-1">
            <div className="col">
              <button type="button" onClick={() => handleAddFields()} class="btn btn-primary">+</button>
              <button type="button" onClick={() => handleRemoveFields()} class="btn btn-primary mx-2">-</button>

            </div>

          </div>

        </div>

        <div className="container-fuild">
          <Row gutter={[20,20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4><b>Chief Complaint</b></h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24}>
                <input type="text"  className="p-2" placeholder="Cheif Complaint"
                  name="chiefCom"
                  value={state.FirstAssesment.chiefCom}
                  onChange={(e) => handleChange("chiefCom", e.target.value)}
                />
              </Col>
          </Row>
        </div>

        <Row gutter={[20,20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4><b>History Of Presenting Complaint</b></h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24} className="mx-3">
                <div className="row " name="History" value={state.FirstAssesment.History} onChange={(e) => handleChange("History", e.target.value)}>
                <div className="col  form-check-inline"><input type="radio" value="Sudden" name="History" /> Sudden</div>
                <div className="col  form-check-inline"><input type="radio" value="Gradual" name="History" /> Gradual</div>
                <div className="col  form-check-inline"><input type="radio" value="History of fall" name="History" />History of fall</div>
                <div className="col  form-check-inline"><input type="radio" value="Any other injury" name="History" /> Any other injury</div>
                </div>
              </Col>
          </Row>
        
        <div className="container-fuild">
          <Row gutter={[20,20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24}>
                <h4><b>Past Medical History</b></h4>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24} name="past_check">
                <input type="text"  className="p-2" placeholder="Cheif Complaint"
                  name="chiefCom"
                  value={state.FirstAssesment.chiefCom}
                  onChange={(e) => handleChange("chiefCom", e.target.value)}
                />
              </Col>
          </Row>

          <Row gutter={[20,20]} className="py-3">
              <Col md={24} lg={24} sm={24} xs={24} className="ms-2">
              <div className="row" name="past_check" >
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" name="Diabetes" onChange={(e) => handleChange("Diabetes", e.target.checked)} value={state.FirstAssesment.Diabetes} />
                  <label class="form-check-label" for="inlineCheckbox1">Diabetes</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" name="HYN" onChange={(e) => handleChange("HYN", e.target.checked)} value={state.FirstAssesment.HYN} />
                  <label class="form-check-label" for="inlineCheckbox2">HYN</label>
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
                  <input class="mx-5 p-2" type="text" placeholder="Medication" />
                </div>
                </div>
              </Col>
              <Col md={24} lg={24} sm={24} xs={24} className="p-0" name="past_check">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="inlineCheckbox6" onChange={(e) => handleChange("Other", e.target.checked)} value={state.FirstAssesment.Other} />
                  <label class="form-check-label" for="inlineCheckbox6">Other</label>
                  <input class="mx-5 p-2" type="text" placeholder="Other" />
                </div>
              </Col>
          </Row>
        </div>

        <div className="container border-bottom mb-4 p-0">

          <Row gutter={[20,20]} className="py-3">
                <Col md={24} lg={24} sm={24} xs={24} className="p-0">
                  <h4><b>Built Type</b></h4>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24} className="mx-3 p-0">
                <div className="row" name="Built" value={state.FirstAssesment.Built} onChange={(e) => handleChange("Built", e.target.value)}
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

                  </div>
                </Col>
            </Row>
        </div>

        <Form form={form} layout="vertical">
        <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Recent History"
                  name="RecentHistory"
                  value={state.FirstAssesment.RecentHistory}
                  defaultValue={state.FirstAssesment.RecentHistory}
                  onChange={handleChange} required={true} />
            </Col>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Trauma / Hospitalization History "
                  name="Trauma"
                  value={state.FirstAssesment.Trauma}
                  defaultValue={state.FirstAssesment.Trauma}
                  onChange={handleChange} required={true} />
              </Col>
        </Row>

        <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
            <Col md={24} lg={12} sm={24} xs={24}>
              <FormTextArea label="Special Test "
                  name="Test"
                  value={state.FirstAssesment.Test}
                  defaultValue={state.FirstAssesment.Test}
                  onChange={handleChange} required={true} />
            </Col>
          </Row> 
          <Row gutter={[10, 10]} className="px-0 py-4 pb-0" style={{ marginBottom: -0 }}>
            {/* <Col md={16} lg={16} sm={24} xs={24} className="mt-3">
              <input id="myPdf" accept="application/pdf" type="file" multiple onInput={handleUploadTrauma} onChange={(val) => handleChange("TraumaFile", val.target.files)} />
            </Col> */}
            <Col md={12} lg={12} sm={24} xs={24}>
              <Dragger {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"
                customRequest={dummyRequest}
               // onChange={(val) => { handleChange("TraumaFile", val.fileList); handleUploadTrauma(event) }}
               onChange={ async (e)=>{
                let files=[]
                await  e.fileList.forEach((data)=>{files.push(data.originFileObj)})
                console.log(files)
                handleChange('TraumaFile',files)
               }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
              </Col>
        </Row>
        </Form>

        
      </div>


      {/* </Form> */}
      <Body />
    </div >
  )
}

export default Assesment1
