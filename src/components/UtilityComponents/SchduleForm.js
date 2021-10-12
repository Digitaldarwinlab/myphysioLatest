/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import { Form, Select, Button, Row, Col, Collapse,Typography,Modal,Upload} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import FormDate from './../UI/antInputs/FormDate';
import { InboxOutlined } from '@ant-design/icons';
import FormInput from './../UI/antInputs/FormInput';
import FormTextArea from './../UI/antInputs/FormTextArea';
import Loading from './Loading';
import Success from './SuccessHandler';
import ActiveSearch from './ActiveSearch';
import "../../styles/Layout/Episode.css"
import moment from "moment"
import Error from './ErrorHandler';
import { useHistory } from 'react-router-dom';
import {EPISODE_CLEAR_STATE} from '../../contextStore/actions/episode'
import '../../styles/Layout/Heading.css'
const btnStyle = {
    backgroundColor: "#273647",
    color: "white",
    border: "1px solid white",
    borderRadius: "10px", float: "right",
    margin: "2px",
}

const font = {
    fontSize: "17px"
}

const SchduleForm = (props) => {
    const { Dragger } = Upload;
    const state = useSelector(state => state.episodeReducer)
    const [visibility, setVisibility] = useState("none");
    const [physicalVisibility, setPhysicalVisibility] = useState("none");

  console.log('stateees is')
  console.log(state)
    const [fileType, setFileType] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [issubmit,Setissubmit]=useState(false)
    const [isclosuredisabled,Setisclosurediabled]=useState(false)
    const [starteDate,SetstartDate]=useState()
    useEffect(() => {
        const data = state;

        form.setFieldsValue({ Ref_Dr_Name: data.Ref_Dr_Name });
        form.setFieldsValue({ Ref_Dr_ID: data.Ref_Dr_ID });
        form.setFieldsValue({ complaint: data.complaint });
        form.setFieldsValue({ Operative_Types: data.Operative_Types });
        form.setFieldsValue({ file: data.file });
        form.setFieldsValue({ Patient_History: data.Patient_History });
        form.setFieldsValue({ start_date: data.start_date ? moment(data.start_date, "YYYY-MM-DD") : props.startDateState });
        console.log(data)
      SetstartDate(data.start_date)
     
    }, [])
    
    const [form] = Form.useForm();

    const [Colsure, setColsure] = useState(true)

    const closer = () => {
        Setisclosurediabled(true)
        setColsure(false)
        alert("Please fill End date and Closure Notes")
    }   
    const handleChange = (key, value, id = 0) => {
        
      }
    
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleUploadScars = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer");
    
    changeThumb(e, thumbnailBox)
  }

  const handleUploadTrauma = (e) => {
    var thumbnailBox = document.getElementById("pdfViewer1");
   
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
    const showModal = () => {
        
        props.setIsModalVisible(true);
      };
    
      const handleOk = () => {
        props.setIsModalVisible(false);
       
            dispatch({ type: EPISODE_CLEAR_STATE });
         if(props.issuccess){
            history.push("/dashboard");
         }
         else
         {
             console.log('failed')
         }
           
        
      };
      

      const Cancel = () => {
       
            if (window.confirm(" All your Data will be lost?")) {
               // dispatch({ type: CLEAR_STATE });
                   form.resetFields()
                   dispatch({ type: EPISODE_CLEAR_STATE });
              history.push("/dashboard");
        
               
                
            }
        
    }
  const handleCancel = () => {
    props.setIsModalVisible(false);
    dispatch({ type: EPISODE_CLEAR_STATE });
       //     history.push("/episode");
  };
   useEffect(() => {
        const unblock = history.block((location, action) => {
         
              
            form.resetFields()
                    return true;
              
            
            
        });
    
        return () => {
            unblock();
        };
    }, [history,state])

    const { Panel } = Collapse;
    const {Title}=Typography

    const Setupdating1=()=>{
      props.Setupdating()
   
   
       }
    return (
        <>
           <div style={{ minHeight: "20px" }}></div>
        <Row style={{margin:'auto 10px 10px 10px'}} justify="space-between">
            <Col >
            <h1 className="page-heading" id="page-heading"><strong> Add Episode</strong></h1>
            </Col>
            <Col span={8} style={{position:'relative',bottom:'20px'}}>
            <ActiveSearch  />
            {props.state.isLoading && <Loading />}
            </Col>
        </Row>
        

            
            <Form className="p-2" onFinish={props.state.episode_id ? props.onSubmit : props.handleSubmit} autoComplete="off" layout="vertical" form={form} name="control-hooks">
               
               { props.validationState.error && <Error error={props.validationState.error} />}
               {props.state.success && <Success success={props.state.success} />}
                <Modal title="Message" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="m-2">
                
                  {console.log('succes is : ' + props.state.success)}
                    {props.state.success && <Success success={props.state} />}

                </div>
      </Modal>
                <Row className="border ps-2 pe-2 pt-2 mb-2">
                    <Col span={8}>
                        <p className="fw-bold p" style={font}><b>Patient Code: </b> {state.patient_main_code} </p>
                    </Col>
                    <Col span={8}>
                        <p className="fw-bold p" style={font}>
                        <b>Patient Name: </b>{state.patient_name}
                        </p>
                    </Col>
                    <Col span={8}> 
                    <p className="fw-bold p" style={font}>
                    <b>Contact No: </b>{state.Patient_no}
                    </p>
                    </Col>
                </Row>
                <Collapse style={{fontSize:'18px',fontWeight:'bold'}} defaultActiveKey={['1']} >

                    <Panel header="Referring Docter Details" key="1" className="bold">
                        <Row gutter={[10, 10]}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <FormInput 
                                className="input-field"


                                    label={<span style={{fontSize:'16px',fontWeight:'semibold'}}>{'Doctor Name'}</span>}
                                    placeholder="Docter Name"
                                    name="Ref_Dr_Name"
                                    onBlur={props.handleBlur}
                                    disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                                    value={props.state.Ref_Dr_Name}
                                    onChange={props.handleChange}
                                    required={Colsure}
                                    
                                />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <FormInput size="large"
                                 className="input-field"
                                    label={<span style={{fontSize:'16px',fontWeight:'semibold'}}>{'Doctor ID'}</span>}
                                    placeholder="Docter ID"
                                    name="Ref_Dr_ID"
                                    disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                                    value={props.state.Ref_Dr_ID}
                                    onChange={props.handleChange}
                                    required={Colsure}

                                />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <Collapse style={{fontSize:'18px',fontWeight:'bold'}} defaultActiveKey={['1']}>
                <Panel header="Other Details" key="1" className="bold">
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <FormDate
                         className="input-field"
                            value={props.startDateState ? props.startDateState : state.start_date && moment(state.start_date, 'YYYY-MM-DD')}
                            label= {<span style={{fontSize:'16px',fontWeight:'semibold'}} >{'Start Date'}</span>}
                            disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                            defaultValue={state.start_date && moment(state.start_date, 'YYYY-MM-DD')}
                            placeholder="Start Date"
                            name="start_date"
                            required={!Colsure}
                            onChange={props.handleChange}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <FormDate
                        disabledDate={['true',starteDate]}
                         className="input-field"
                            value={props.endDateState ? props.endDateState : state.end_date && moment(state.end_date, 'YYYY-MM-DD')}
                            required={!Colsure}
                            label={<span style={{fontSize:'16px',fontWeight:'semibold'}}>{'End Date'}</span>}
                            placeholder="End Date"
                            defaultValue={state.end_date && moment(state.end_date, 'YYYY-MM-DD')}
                            name="end_date"
                            onChange={props.handleChange}
                            disabled={Colsure}
                        />
                    </Col>
                </Row>
                </Panel>
                </Collapse>
                <Row >
                <Col className="mt-3 mr_15" span={12} >
                    <Form.Item label={<span  style={{fontSize:'16px',fontWeight:'bold'}}>{props.episode ? "Episode Type"  : "Visit Type" }</span> }
                        name={props.episode ? "complaint" : "type"}
                        rules={[{ required: Colsure, message: `Please Select a ${props.episode ? "Primary Complaint" : "Type"}` }]}>
                        <Select
                         className="input-field"
                            name={props.episode ? "complaint" : "type"}
                            placeholder="Type"
                            value={props.episode ? props.state.complaint : props.state.type}
                            defaultValue={state.complaint}
                            disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                            onChange={(value) => { props.handleChange(props.episode ? "complaint" : "type", value) }}

                        >
                            <Select.Option value="Check Up">Check Up</Select.Option>
                            <Select.Option value="Emergency">Emergency</Select.Option>
                            <Select.Option value="Follow Up">Follow Up</Select.Option>
                            <Select.Option value="Routine">Routine</Select.Option>
                            <Select.Option value="Walk In">Walk In</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col className="mt-3" span={12}>
                    <Form.Item label={<span style={{fontSize:'16px',fontWeight:'bold'}}>{'Operative Types'}</span>}
                        name="Operative_Types"
                        rules={[{ required: Colsure, message: `Please Select Operative Types` }]}>
                        <Select
                         className="input-field"
                            name="Operative_Types"
                            placeholder="Operative Types"
                            value={props.state.Operative_Types}
                            defaultValue={state.Operative_Types}
                            disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                            onChange={(value) => { props.handleChange("Operative_Types", value) }}
                        >
                            <Select.Option value="Pre Op">Pre Op</Select.Option>
                            <Select.Option value="Post Op">Post Op</Select.Option>
                            <Select.Option value="Presentive">Presentive</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>

                </Row>
                
                <Row justify="space-between">
                <Col className="mt-3 mr_15" span={12}>
                    <FormTextArea label={<span style={{fontSize:'16px',fontWeight:'bold'}}>{'Patient History'}</span>}
                        required={Colsure}
                        value={props.state.Patient_History}
                        className="input-field"
                        name="Patient_History"
                        onChange={props.handleChange}
                        placeholder="History"
                        disabled={props.opacity1=='0' ? props.isupdating ? false : true : false  || !Colsure}
                    />
                </Col>
                <Col className="mt-3" span={12}>
                    <FormTextArea label={<span style={{fontSize:'16px',fontWeight:'bold'}}> {'Closure Notes'}</span>}
                        value={props.state.Patient_History}
                        name="Closure_Notes"
                        onChange={props.handleChange}
                        className="input-field"
                        placeholder="Notes"
                        disabled={Colsure}
                        required={!Colsure}
                    />
                </Col>
                </Row>
                <Col span={24}>

                <Dragger className="my-3 w-100" {...props} id="myPdf"
                listType="picture-card"
                accept="application/pdf,image/*,application/msword"
                multiple="true"
                customRequest={dummyRequest}
                onBlur={(value) => { props.handleChange("file", value.target.files) }} disabled={!Colsure} 
                onChange={(val) => { handleChange("TraumaFile", val.fileList); handleUploadTrauma(event) }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
 
                </Col>
                

                <Form.Item className="text-end
                
                
                ">
                <Button  className="me-2" style={{borderRadius:'10px',backgroundColor:'#41A0A2',}} onClick={Cancel} >Cancel</Button>
                { console.log('opacity' + props.opacity1)}
                   {
                     props.opacity1=='1' ?  <Button htmlType="submit" style={{opacity: props.opacity1} } className="me-2 btncolor" >Submit</Button> : null
                     
                   } 
                   {
                     props.opacity1=='0' ?  isclosuredisabled ? isclosuredisabled && props.isupdating ? null : <Button htmlType="submit" onSubmit={props.onSubmit} className="SchForm" >Update</Button> : <Button onClick={closer} className="SchForm" disabled={isclosuredisabled} style={{ opacity: props.opacity2 }}>Closure</Button> : null 
                   }
                  
                    {  props.opacity1=='0'  ? props.isupdating===true ?  <Button htmlType="submit" onSubmit={props.onSubmit} className="SchForm" >Update</Button> :<button type="button" className="SchForm" style={{width:'80px',height:'30px',cursor:'pointer'}} onClick={Setupdating1}  >Edit</button>  : null}
                   
                </Form.Item>
            </Form>
        </>
    )
}

export default SchduleForm;
