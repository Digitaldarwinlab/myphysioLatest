import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { AiFillMedicineBox } from "react-icons/ai";
import { Select, Row, Col, Input, Form, Upload, Button,Modal,Space } from 'antd';
import { ASSESMENT_CLEARSTATE, STATECHANGE } from "../../contextStore/actions/Assesment"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import FormInput from '../UI/antInputs/FormInput';
import FormTextArea from '../UI/antInputs/FormTextArea';
import FormDate from "../UI/antInputs/FormDate";
import Body from './Body';
import { getEpisode } from '../../API/Episode/EpisodeApi';
{/* aswin 10/25/2021 start */}
import moment from 'moment'
{/* aswin 10/25/2021 start */}
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
        location.pathname != '/care-plan' &&
        state.FirstAssesment.episode_id != "") {
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



    useEffect(()=>{

    console.log('assesment state is printing')
console.log(state.FirstAssesment.Type)

  },[state.FirstAssesment])




  useEffect(() => {
    if (state.FirstAssesment.Type == "First")
      setPhysicalVisibility('block')
    else
      setPhysicalVisibility('none')
  }, [state.FirstAssesment.Type])

  
{/* aswin 10/25/2021 start */}
  const [date, setDate] = useState();
{/* aswin 10/25/2021 stop */}
  const [visibility, setVisibility] = useState("none");

  const [physicalVisibility, setPhysicalVisibility] = useState("none");


  const [fileType, setFileType] = useState(false);


 


  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (key, value, id = 0) => {
    if (key === "Date") {
      setDate(value.date);
      dispatch({
        type: STATECHANGE,
        payload: {
          key,
          value: value.dateString
        }
      });
    }

    dispatch({
      type: STATECHANGE,
      payload: {
        key,
        value
      }
    });
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
  return (
    <div className="px-2 py-2">

      <Form {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form} 
        // form={form} name="control-hooks"
      >

        <Row>
          <Col md={12} lg={12} sm={12} xs={12}><h3><AiFillMedicineBox />Assesment/Consultation</h3></Col>

          <Col md={12} lg={12} sm={12} xs={12} >
            <div className="border">
              <p className="ps-1 py-2">
                <b> Patient Name </b> {state.episodeReducer.patient_name} <br/>
                <b> Patient Code </b> {state.episodeReducer.patient_main_code} <br/>
               <b> Episode ID: </b> {episodedata ? episodedata.episodeId : null} <br />
               {/* aswin 10/25/2021 start */}
              <b>  Episode Type : </b> {episodedata ? episodedata.complaintId : null} <br />
              {/* aswin 10/25/2021 stop */}
              <b>  Start Date : </b> {episodedata ? episodedata.start_date : null}
              </p>
            </div>
          </Col>

        </Row>
        {/* <ActiveSearch/>           */}
        <Row className="mt-3 AssesmentConsultationMain">
          <Col className="mt-3 AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}>
            <FormDate label="Date"
              name="Date"
              // reverse ="true"
              className="input-field w-100"
              //aswin 10/25/2021 start
              value={moment(state.FirstAssesment.Date.dateString,'YYYY-MM-DD')}
              defaultValue={state.FirstAssesment.Date.dateString && moment(state.FirstAssesment.Date.dateString, "YYYY-MM-DD") }
              //aswin 10/25/2021 stop
              required={true}
              onChange={handleChange}
            />
          </Col>
          <Col className="mt-3 AssesmentConsultationMain_inner" md={12} lg={12} sm={24} xs={24}>
            <Form.Item label="Type" name="Type" rules={[{ required: true, message: `Please Select Type.` }]} >
              <Select placeholder="Select Type"
                className="w-100 input-field"
                onChange={(value) => handleChange("Type", value)}
                value={state.FirstAssesment.Type}
                defaultValue={state.FirstAssesment.Type}>
                  {/* aswin 10/24/2021 start */}
                <Option value="First">{state.FirstAssesment.Type==="First"&&"First Assesment"}</Option>
                {/* aswin 10/24/2021 start */}
                <Option value="Periodic">Periodic</Option>
                <Option value="Consultation">Consultation</Option>
              </Select>
            </Form.Item>

          </Col>
        </Row>
      </Form>

      <div className="border mb-3 mt-3" style={{ display: physicalVisibility }}>
        <Form form={form} >
          <Row className="border">
            <Col md={24} lg={24} sm={24} xs={24}>
              <h4 className="p-2">Physical Assesment</h4>
            </Col>
          </Row>

          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col md={12} lg={8} sm={24} xs={24}>
              <FormInput label="Scars"
                name="Scars"
                value={state.FirstAssesment.Scars}
                defaultValue={state.FirstAssesment.Scars}
                onChange={handleChange} required={true}>
              </FormInput>
              <div style={{ display: visibility, padding: 5, width: '100%' }} id="pdfViewer">
              </div>
            </Col>
            <Col className="mt-1">
              <input id="myPdf"
                accept="application/pdf,image/*,application/msword"
                type="file" multiple

                onInput={handleUploadScars}
                onChange={(val) => handleChange("ScareFile", val.target.files)} />
            </Col>
          </Row>
        </Form>
        <Form  form={form}  layout="vertical">
          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col md={24} lg={24} sm={24} xs={24} className="mt-2">
              <FormTextArea label="Recent History"
                name="RecentHistory"
                value={state.FirstAssesment.RecentHistory}
                defaultValue={state.FirstAssesment.RecentHistory}
                onChange={handleChange} required={true} />
            </Col>

          </Row>
          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col md={24} lg={24} sm={24} xs={24} className="mt-2">
              <FormTextArea label="Trauma / Hospitalization History "
                name="Trauma"
                value={state.FirstAssesment.Trauma}
                defaultValue={state.FirstAssesment.Trauma}
                onChange={handleChange} required={true} />

            </Col>
          </Row>
          <Row gutter={[10, 10]} className="px-4 py-2">
            <Col md={24} lg={24} sm={24} xs={24} className="mt-2">
              <FormTextArea label="Special Test "
                name="Test"
                value={state.FirstAssesment.Test}
                defaultValue={state.FirstAssesment.Test}
                onChange={handleChange} required={true} />

            </Col>
          </Row>
          <Row gutter={[10, 10]} className="px-4 py-4 pb-5" style={{ marginBottom: 70 }}>
            {/* <Col md={16} lg={16} sm={24} xs={24} className="mt-3">
              <input id="myPdf" accept="application/pdf" type="file" multiple onInput={handleUploadTrauma} onChange={(val) => handleChange("TraumaFile", val.target.files)} />
            </Col> */}
            <Col md={12} lg={12} sm={24} xs={24}>
              <Dragger {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"
                customRequest={dummyRequest}
                onChange={(val) => { handleChange("TraumaFile", val.fileList); handleUploadTrauma(event) }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </Col>
            <Col>
              <div style={{ display: visibility, padding: 5, width: '100%' }} id="pdfViewer1">
              </div>
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
