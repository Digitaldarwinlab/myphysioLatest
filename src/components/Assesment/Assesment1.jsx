import React, { useState, useEffect } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { AiFillMedicineBox } from "react-icons/ai";
import { Select, Row, Col, Input, Form, Upload, Button,Checkbox, Modal, Space,Radio, Tabs } from 'antd';
import { ASSESMENT_CLEARSTATE, ASSESSMENT_ADD_SUB_INPUT, ASSESSMENT_REMOVE_SUB_INPUT,ASSESSMENT_SUBJECTIVE, STATECHANGE } from "../../contextStore/actions/Assesment"
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
const { TabPane } = Tabs;
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
        location.pathname != '/care-plan' && location.pathname != '/assesment/PainAssessment' &&
        location.pathname != '/assesment/SpecialTest' && location.pathname != '/assesment/PoseTest' &&
        state.FirstAssesment.episode_id != "") {
        //aswin 11/11/2021 start
        if (sessionStorage.getItem('submit')) {
          sessionStorage.removeItem('submit')
          return;
        }
        //aswin 11/11/2021 stop
        if (window.confirm("Assesment data will be lost. Is it okay?")) {
          dispatch({ type: ASSESMENT_CLEARSTATE });
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
  const [files, setFiles] = useState([])

  const [fileType, setFileType] = useState(false);
  console.log("files ", files)




  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (key, value, id = 0) => {
    //alert(value+", "+key+" , "+id)
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
    }else if(key==='occupation' || key==='duration'){
      dispatch({
        type:ASSESSMENT_SUBJECTIVE,
        payload:{
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

  let plainOptions1 =['Diabetes','HYN','COPD','Cardiac']
  const [medic ,setMedic] = useState(true)
  const [others ,setOthers] = useState(true)
  const handleAddFields = () => {
   // setInputFields([...inputFields, { Occupation: '', Duration: '' }])
   dispatch({ type: ASSESSMENT_ADD_SUB_INPUT, payload: { type: "subjective" } })

  }

  const handleRemoveFields = (index) => {
    // const values = [...inputFields];
    // values.splice(index, 1);
    // setInputFields(values);
    dispatch({ type: ASSESSMENT_REMOVE_SUB_INPUT, payload: { type: "subjective" } });
  }


  return (
    <div className="px-2 py-2">

      <Form style={{ background: '#fff', marginTop: '0px', padding: '20px' }} {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

        form={form}
      >

        <Row>
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
          <Col className="AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}>
            <Form.Item label="Type" name="Type">
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

     {state.FirstAssesment.Type==="First"&& <div className="border mb-3 mt-3" style={{ background:'#fff', marginTop:'10px', padding:'20px'}}>
        <Form form={form} >
          <Row className="border">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4 className="p-2">Physical Assesment</h4>
            </Col>
          </Row>
        </Form>
        <Form form={form} layout="vertical">

        </Form>
        {/* gaurav 4/12 */}

        <div className="container-fuild">
        <Row gutter={[20, 20]} className="py-3">
        <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Subjective</b></h4>
            </Col>
          </Row>
           <Col md={24} lg={24} sm={24} xs={24} className="mx-3 p-0">
          {state.FirstAssesment.subjective.map((data, index) => {
            let
              occupation = `occupation-${index}`,
              Duration = `Duration-${index}`;
            return (
               <div className="container-fuild">
                 <Row gutter={[20, 20]} className="py-3">
                  <Col md={12} lg={12} sm={12} xs={12}>
                       <h4>Occupation</h4>{"  "}
                       <select className="form-select"
                        name={"occupation"+index} id={occupation} data-id={index}
                        aria-label="Default select example"
                        value={state.FirstAssesment.subjective[index].occupation}
                        // value={state.FirstAssesment.subjective[index].occupation}
                        onChange={(e) => handleChange("occupation", e.target.value, index)}
                      >
                        <option selected></option>
                        <option value="Desk Job">Desk Job</option>
                        <option value="Standing">Standing</option>
                        <option value="Field Work">Field Work</option>
                      </select>
                       </Col>
                       {/* <Col md={12} lg={12} sm={12} xs={12}> */}
                    {/* </Col> */}
                 </Row>
                 <Row gutter={[20, 20]} className="py-3">
                 <Col md={24} lg={24} sm={24} xs={24}>
                    <h4>Duration</h4>
                    </Col>
                    <Radio.Group options={['0-8 hours','0-4 hours','Above 8 hours','Flexible']} onChange={(e) => handleChange("duration", e.target.value,index)} value={state.FirstAssesment.subjective[index].duration}>
                    </Radio.Group>
                    </Row>
                </div>
            )
          }
          )
          }
          </Col>
        

          <div className="row py-3 mx-1">
            <div className="col">
              <button type="button" onClick={() => handleAddFields()} class="btn btn-primary">+</button>
              <button type="button" disabled={state.FirstAssesment.subjective.length<=1?true:false} onClick={() => handleRemoveFields()} class="btn btn-primary mx-2">-</button>

            </div>

          </div>

        </div>

        <div className="container-fuild">
          <Row gutter={[20, 20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Chief Complaint</b></h4>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24}>
              <input type="text" className="p-2" placeholder="Cheif Complaint"
                name="chiefCom"
                value={state.FirstAssesment.chiefCom}
                onChange={(e) => handleChange("chiefCom", e.target.value)}
              />
            </Col>
          </Row>
        </div>

        <Row gutter={[20, 20]} className="py-3">
          <Col md={24} lg={24} sm={24} xs={24}>
            <h4><b>History Of Presenting Complaint</b></h4>
          </Col>
          <Col md={24} lg={24} sm={24} xs={24} className="mx-3">
          <Radio.Group options={['Sudden','Gradual','History of Fail','Any other injury']} onChange={(e) => handleChange("History", e.target.value)} value={state.FirstAssesment.History}>
   
            </Radio.Group>
          </Col>
        </Row>

        <div className="container-fuild">
          <Row gutter={[20, 20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Past Medical History</b></h4>
            </Col>
          </Row>

          <Row gutter={[20, 20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24} className="ms-2">
            <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                name="past Medical History"
                value={state.FirstAssesment.past_medical_history}
                onChange={(e) => handleChange("past_medical_history", e)}
                options={plainOptions1}
              />
                <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                name="Medication"
                value={state.FirstAssesment.Medication1}
                onChange={(e) =>{
                   setMedic(!medic)
                   handleChange("medicCheck",medic)
                   handleChange("Medication1",e)
                  }}
                options={['Medication']}
              />
                <input class="mx-5 p-2" type="text" disabled={medic} value={state.FirstAssesment.Medication} onChange={(e) => handleChange("Medication", e.target.value)} name='medText' placeholder="Medication" />
                <br/>
                <Checkbox.Group
                style={{ paddingLeft: "20px" }}
                name="Others"
                value={state.FirstAssesment.Others1}
                onChange={(e) => {
                  setOthers(!others)
                  handleChange('othCheck',others)
                  handleChange('Others1',e)
                }}
                options={['Others']}
              />
                <input class="mx-5 p-2" onChange={(e)=>handleChange('Others',e.target.value)} value={state.FirstAssesment.Others} disabled={others} type="text" name='othText' placeholder="Others" />
            </Col>
          </Row>
        </div>

        <div className="container-fuild">

          <Row gutter={[20, 20]} className="py-3">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4><b>Built Type</b></h4>
            </Col>
            <Col md={24} lg={24} sm={24} xs={24} className="mx-3 p-0">
              <Radio.Group options={['ectomorphic','mesomorphic','endomorphic']} onChange={(e) => handleChange("Built", e.target.value)} value={state.FirstAssesment.Built}>
   
              </Radio.Group>
            </Col>
          </Row>
        </div>


      </div>

      }
      <Body setActive={props1.setActive}/>
    </div >
  )
}

export default Assesment1
