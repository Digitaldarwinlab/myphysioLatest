import React, { useState, useEffect, useRef } from "react";
import { InputNumber,  notification, Table, Button, Select, Row, Col, Collapse, Form } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
//import { useForm } from "antd/lib/form/Form";
import { render } from "react-dom";
import "antd/dist/antd.css";
import { STATECHANGE, VALIDATION } from "../../contextStore/actions/authAction";
import Error from "../UtilityComponents/ErrorHandler";
const { Option } = Select;
const { Panel } = Collapse;
let MinMax = {
  "select":{
    min:0,
    max:60
} ,
  "L Cervical Flex/Ext":{
      min:0,
      max:60
  } ,
  "R Cervical Flex/Ext":{
      min:0,
      max:60
  } ,
  "L Lumbar Side Flex":{
      min:0,
      max:30
  } ,
  "R Lumbar Side Flex":{
      min:0,
      max:30
  } ,
  "L Hip Abd/Add":{
      min:0,
      max:45
  } ,
  "R Hip Abd/Add":{
      min:0,
      max:45
  } ,
  "L Shoulder Abd/Add":{
      min:0,
      max:180
  } ,
  "R Shoulder Abd/Add":{
      min:0,
      max:180
  } ,
  "L Elbow Flex/Ext":{
      min:0,
      max:150
  } ,
  "R Elbow Flex/Ext":{
      min:0,
      max:150
  } ,
  "L Hip Flex/Ext":{
      min:0,
      max:180
  } ,
  "R Hip Flex/Ext":{
      min:0,
      max:180
  } ,
  "L Knee Flex/Ext":{
      min:0,
      max:120
  } ,
  "R Knee Flex/Ext":{
      min:0,
      max:120
  } ,
  "L Wrist Flex/Ext":{
      min:0,
      max:90
  } ,
  "R  Flex/Ext":{
      min:0,
      max:90
  } ,
  "L Ankle Dorsi/Planter Flex":{
      min:0,
      max:45
  } ,
  "R Ankle Dorsi/Planter Flex":{
      min:0,
      max:45
  } ,
  "Cervical Flex/Ext":{
      min:0,
      max:45
  } ,
}
const labels = [
  "L Shoulder Abd/Add",
  "R Shoulder Abd/Add",
  "L Elbow Flex",
  "R Elbow Flex",
  "L Cervical Side Flex",
  "R Cervical Side Flex",
  "L Lumbar Side Flex",
  "R Lumbar Side Flex",
  "L Hip Abd/Add",
  "R Hip Abd/Add",
];
const labelsL = [
  "L Shoulder Abd/Add",
  "L Hip Fwd Flex",
  "L Knee Flex/Ext",
  "L Wrist",
  "L Ankle",
  "Cervical Fwd Flex"
];
const labelsR = [
  "R Shoulder Abd/Add",
  "R Hip Fwd Flex",
  "R Knee Flex/Ext",
  "R Wrist",
  "R Ankle",
  "Cervical Fwd Flex",
];
const allNewJoints = {
  "L Shoulder Abd/Add": "leftShoulder",
  "R Shoulder Abd/Add": "rightShoulder",
  "L Elbow Flex": "leftElbow",
  "R Elbow Flex": "rightElbow",
  "L Hip Fwd Flex": "leftHip",
  "R Hip Fwd Flex": "rightHip",
  "L Knee Flex/Ext": "leftKnee",
  "R Knee Flex/Ext": "rightKnee",
  "L Cervical Side Flex": "leftNeck",
  "R Cervical Side Flex": "rightNeck",
  "L Lumbar Side Flex": "leftPelvic",
  "R Lumbar Side Flex": "rightPelvic",
  "L Wrist": "leftWrist",
  "R Wrist": "rightWrist",
  "L Ankle": "leftAnkle",
  "R Ankle": "rightAnkle",
  "L Hip Abd/Add": "leftHipAdductionAbduction",
  "R Hip Abd/Add": "rightHipAdductionAbduction",
  "Cervical Fwd Flex": "cervicalForwardFlexion",
};
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const dataSource1 = [
  {
    id: Math.floor(Math.random() * 1000),
    joint: "select",
    min: 0,
    max: 0,
  },
];

const dataSource2 = [
  {
    id: Math.floor(Math.random() * 1000),
    joint: "select",
    min: 0,
    max: 0,
  },
];

const dataSource3 = [
  {
    id: Math.floor(Math.random() * 1000),
    joint: "select",
    min: 0,
    max: 0,
  },
];

const AromWithouthAi = () => {
  const [tableData1, setTableData1] = useState([
    {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    },
  ]);
  const [tableData2, setTableData2] = useState([
    {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    },
  ]);
  const [tableData3, setTableData3] = useState([
    {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    },
  ]);
  const [checkState1 ,setCheckState1] = useState(true)
  const [checkState2 ,setCheckState2] = useState(true)
  const [checkState3 ,setCheckState3] = useState(true)
  const [visible ,setVisible] = useState(false)
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  let ref1 = useRef(null)
  let ref2 = useRef(null)
  let ref3 = useRef(null)
  const state = useSelector(state=>state)
  const validationState = useSelector(state => state.Validation);
  const setTotal = (data, index) => {
    // Set total
    data[index]["totalCount"] = Number(
      data[index]["goals"] + data[index]["assists"]
    );
  };
  useEffect(() => {
    form.resetFields();
    setTableData1([])
    setTableData2([])
    setTableData3([])
  }, []);
  const finalSubmit = () => {
    console.log("checkstate ",checkState1 , checkState2, checkState3)
    
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "Arom_M",
          value: true,
        },
      });
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "Arom_Ai",
          value: false,
        },
      });
      setTableData1([])
      setTableData2([])
      setTableData3([])
       history.push("/assessment/1")
    
  }

  useEffect(() => {
    const unblock = history.block((location, action) => {
        console.log("cleared", location);
        setTableData1([])
        setTableData2([])
        setTableData3([])
        return true;
      //}
    });
    return () => {
      unblock();
    };
  }, [history]);

  const SaveData1 = () => {
  //  dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:false } });
  //  setCheckState(false)
    if(tableData1.length>0&&tableData1[0].joint!=="select"){
      console.log(tableData1);
      let angles = {};
    tableData1.map((item) => {
      if(item.joint!=="select"){
       if(item.min>item.max){
      //   console.log("checkstate ",item.min>item.max," check")
      //   //checkState
      //   dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:true } });
      //   setCheckState(true)
      //   //item.id+item.joint+item.min+item.max+"min"
      dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
         document.getElementById(item.id+item.joint+item.min+item.max+"min").focus()
      
      //   // notification.warning({
      //   //   message: `${item.joint} Min should not greater than Max`,
      //   //   placement: "bottomLeft",
      //   //   duration: 2,
      //   // });
      //  // return 
      //   //alert("Min should not greater than Max")
       }
      let val = { min: item.min, max: item.max };
      angles[allNewJoints[item.joint]] = val;
      }
    });
      // if(checkState){
      //   setCheckState(false)
      //   return alert("Min should not greater than Max")
      // }
    let a = {};
    a["AROM"] = { angles };
    console.log(a);
    if(checkState1){
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "Anterior_AI_Data",
          value: a,
        },
      });
    }
    // if(!checkState){
    
    // }
    }
    if(tableData2.length>0&&tableData2[0].joint!=="select"){
      console.log(tableData2);
      let angles = {};
      tableData2.map((item) => {
        if(item.joint!=="select"){
         if(item.min>item.max){
        //   dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:true } });
        //   setCheckState(true)
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
           document.getElementById(item.id+item.joint+item.min+item.max+"min").focus()
        //   // notification.warning({
        //   //   message: `${item.joint} Min should not greater than Max`,
        //   //   placement: "bottomLeft",
        //   //   duration: 2,
        //   // });
        //  // return 
        //   //alert("Min should not greater than Max")
         }
        let val = { min: item.min, max: item.max };
        angles[allNewJoints[item.joint]] = val;
        }
      });
      // if(checkState){
      //   setCheckState(false)
      //   return alert("Min should not greater than Max")
      // }
     let a = {};
      a["AROM"] = { angles };
      if(checkState2){
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "LeftLateral_AI_Data",
          value: a,
        },
      });
    }
      // if(!checkState){
      
      // }
    }
    if(tableData3.length>0&&tableData3[0].joint!=="select"){
      console.log(tableData3);
      let angles = {};
    tableData3.map((item) => {
      if(item.joint!=="select"){
       if(item.min>item.max){
      //   console.log("checkstate ",item.min>item.max," check")
      //   dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:true } });
      //   setCheckState(true)
      dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
           document.getElementById(item.id+item.joint+item.min+item.max+"min").focus()
      //   // notification.warning({
      //   //   message: `${item.joint} Min should not greater than Max`,
      //   //   placement: "bottomLeft",
      //   //   duration: 2,
      //   // });
      // //  return 
      //   //alert("Min should not greater than Max")
       }
      let val = { min: item.min, max: item.max };
      angles[allNewJoints[item.joint]] = val;
      }
    });
    // if(checkState){
    //   setCheckState(false)
    //   return alert("Min should not greater than Max")
    // }
   
   let a = {};
    a["AROM"] = { angles };
    if(checkState3){
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "RightLateral_AI_Data",
        value: a,
      },
    });
    } 
  }
    // if(!checkState){
     
    // }
    if(checkState1&&checkState2&&checkState3){
      finalSubmit()
    }
  //   setTimeout(() => {
      
      
   
  // }, 1000);
  };
  useEffect(() => {
    // Set totals on initial render
    setVisible(true)
    const newData = [...tableData1];
    for (let index = 0; index < tableData1.length; index++) {
      setTotal(newData, index);
    }
    setTableData1(newData);
  }, []);

  const onInputChange1 = (key, index, e,record) => {
    if(key=='min'){
      if(e>record.max){
        console.log("checkstate find ",)
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
        setCheckState1(false)
      }else{
        dispatch({ type: VALIDATION, payload: { error: '' } });
        setCheckState1(true)
      }
    }
    if(key=='max'){
      if(e<record.min){
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
        setCheckState1(false)
      }else{
        dispatch({ type: VALIDATION, payload: { error: '' } });
        setCheckState1(true)
      }
    }
   // dispatch({ type: VALIDATION, payload: { error: "" } });
    const newData = [...tableData1];
    newData[index][key] = e;
    setTotal(newData, index);
    setTableData1(newData);
  };

  const onConfirm1 = () => {
    let temp = {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    };
    setTableData1([...tableData1, temp]);
  };
  const deleteRow1 = (id) => {
    setTableData1(tableData1.filter((item) => item.id !== id));
  };
  const SaveData2 = () => {
    console.log(tableData2);
    let tempdata = [];
    tableData2.map((data) => {
      let temp = {};
      temp[allNewJoints[data.joint]] = { min: data.min, max: data.max };
      tempdata.push(temp);
    });
    console.log(tempdata);
  };
  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData2];
    for (let index = 0; index < tableData2.length; index++) {
      setTotal(newData, index);
    }
    setTableData2(newData);
  }, []);

  const onInputChange2 = (key, index, e, record) => {
    if(key=='min'){
      if(e>record.max){
        console.log("checkstate find ",)
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
        setCheckState2(false)
      }else{
        dispatch({ type: VALIDATION, payload: { error: '' } });
        setCheckState2(true)
      }
    }
    if(key=='max'){
      if(e<record.min){
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
        setCheckState2(false)
      }else{
        dispatch({ type: VALIDATION, payload: { error: '' } });
        setCheckState2(true)
      }
    }
    //dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:false } });
  //  dispatch({ type: VALIDATION, payload: { error: "" } });
    const newData = [...tableData2];
    newData[index][key] = e;
    setTotal(newData, index);
    setTableData2(newData);
  };

  const onConfirm2 = () => {
    let temp = {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    };
    setTableData2([...tableData2, temp]);
  };
  const deleteRow2 = (id) => {
    setTableData2(tableData2.filter((item) => item.id !== id));
  };
  const SaveData3 = () => {
    console.log(tableData3);
    let tempdata = [];
    tableData3.map((data) => {
      let temp = {};
      temp[allNewJoints[data.joint]] = { min: data.min, max: data.max };
      tempdata.push(temp);
    });
    console.log(tempdata3);
  };
  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData3];
    for (let index = 0; index < tableData3.length; index++) {
      setTotal(newData, index);
    }
    setTableData3(newData);
  }, []);

  const onInputChange3 = (key, index, e ,record) => {
    if(key=='min'){
      if(e>record.max){
        console.log("checkstate find ",)
        setCheckState3(false)
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
      }else{
        setCheckState3(true)
        dispatch({ type: VALIDATION, payload: { error: '' } });
      }
    }
    if(key=='max'){
      if(e<record.min){
        setCheckState3(false)
        dispatch({ type: VALIDATION, payload: { error: 'Min value should not greater than Max value' } });
      }else{
        setCheckState3(true)
        dispatch({ type: VALIDATION, payload: { error: '' } });
      }
    }
   // dispatch({ type: STATECHANGE, payload: { key: 'checkState',value:false } });
   // dispatch({ type: VALIDATION, payload: { error: "" } });
    const newData = [...tableData3];
    newData[index][key] = e;
    setTotal(newData, index);
    setTableData3(newData);
  };

  const onConfirm3 = () => {
    let temp = {
      id: Math.floor(Math.random() * 1000),
      joint: "select",
      min: 0,
      max: 0,
    };
    setTableData3([...tableData3, temp]);
  };
  const deleteRow3 = (id) => {
    setTableData3(tableData3.filter((item) => item.id !== id));
  };
  const columns1 = [
    {
      dataIndex: "joint",
      title: "Joint",
      render: (text, record, index) => (
        <Select
        name={"form_select1"+record.id}
        ref={ref => {
          ref1 = ref;
        }}
          style={{ width: `100%`, margin: 0 }}
          //value={text}
          onChange={(e) =>{
            onInputChange1("joint", index, e)
            console.log(record)
           // document.getElementById(record.id).value=MinMax[record.joint].max
            document.getElementById(record.id).focus()
          }}
        >
          {labels.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      dataIndex: "min",
      title: "Min",
      render: (text, record, index) => (
        <InputNumber
        id={record.id+record.joint+record.min+record.max+"min"}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
          //  style={{ width: 120 }}
       //   value={text}
          onChange={(e) => onInputChange1("min", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <InputNumber
        id={record.id}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
        //  value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange1("max", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "Actions",
      title: "actions",
      render: (text, record, index) => (
        <>
          <Button onClick={() => deleteRow1(record.id)} type="link">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </>
      ),
    },
  ];
  const columns2 = [
    {
      dataIndex: "joint",
      title: "Joint",
      render: (text, record, index) => (
        <Select
        name={"form_select1"+record.id}
        ref={ref => {
          ref2 = ref;
        }}
          style={{ width: `100%`, margin: 0 }}
         // value={text}
          onChange={(e) => {
            onInputChange2("joint", index, e)
            console.log(record)
            document.getElementById(record.id).focus()
          }}
        >
          {labelsL.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      dataIndex: "min",
      title: "Min",
      render: (text, record, index) => (
        <InputNumber
        id={record.id+record.joint+record.min+record.max+"min"}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
          //  style={{ width: 120 }}
         // value={text}
          onChange={(e) => onInputChange2("min", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <InputNumber
        id={record.id}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
        //  value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange2("max", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "Actions",
      title: "actions",
      render: (text, record, index) => (
        <>
          <Button onClick={() => deleteRow2(record.id)} type="link">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </>
      ),
    },
  ];
  const columns3 = [
    {
      dataIndex: "joint",
      title: "Joint",
      render: (text, record, index) => (
        <Select
        name={"form_select1"+record.id}
        ref={ref => {
          ref3 = ref;
        }}
          style={{ width: `100%`, margin: 0 }}
        //  value={text}
          onChange={(e) => {
            onInputChange3("joint", index, e)
            console.log(record)
            document.getElementById(record.id).focus()
          }}
        >
          {labelsR.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      dataIndex: "min",
      title: "Min",
      render: (text, record, index) => (
        <InputNumber
        id={record.id+record.joint+record.min+record.max+"min"}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
          //  style={{ width: 120 }}
        //  value={text}
          onChange={(e) => onInputChange3("min", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <InputNumber
        id={record.id}
        min={MinMax[record.joint].min} max={MinMax[record.joint].max}
       //   value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange3("max", index, Number(e),record)}
        />
      ),
    },
    {
      dataIndex: "Actions",
      title: "actions",
      render: (text, record, index) => (
        <>
          <Button onClick={() => deleteRow3(record.id)} type="link">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="px-2 py-2">
      {visible&&<Form onFinish={SaveData1}  form={form}>
      <Row>
        <Col
          md={24}
          lg={24}
          sm={24}
          xs={24}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {" "}
          <h3 className="fw-bold">
            <i
              className="fas fa-arrow-left"
              style={{ cursor: "pointer" }}
              title="Go Back"
              onClick={() => {
                history.goBack();
              }}g
              role="button"
            ></i>{" "}
            <span className="CarePlanTitle ml-1"> AROM Assesment</span>
          </h3>
          <p style={{ paddingTop: "4px" }}>
            {" "}
            <b className="pose_mobile_view_details">Patient Name :</b> {state.episodeReducer.patient_name}
          </p>
          <p style={{ paddingTop: "4px" }}>
            {" "}
            <b className="pose_mobile_view_details">Patient Code :</b>{" "}
            {state.episodeReducer.patient_main_code}
          </p>
        </Col>
      </Row>
      {validationState.error && <Error error={validationState.error} />}

      <Row justify="center">
        <Col md={24} lg={24} sm={24} xs={24}>
          <Collapse
            defaultActiveKey={["1"]}
            //onChange={callback}
          >
            <Panel header="Anterior" key="1">
              <div>
                <Table
                  rowKey="id"
                  columns={columns1}
                  dataSource={tableData1}
                  pagination={false}
                />
                <Row style={{ margin: "14px 14px 0 0" }} justify="end">
                  <Button type="link" onClick={onConfirm1}>
                    +
                  </Button>
                </Row>
              </div>
            </Panel>
            <Panel header="Lateral-L" key="2">
              <div>
                <Table
                  rowKey="id"
                  columns={columns2}
                  dataSource={tableData2}
                  pagination={false}
                />
                <Row style={{ margin: "14px 14px 0 0" }} justify="end">
                  <Button type="link" onClick={onConfirm2}>
                    +
                  </Button>
                </Row>
              </div>
            </Panel>
            <Panel header="Lateral-R" key="3">
              <div>
                <Table
                  rowKey="id"
                  columns={columns3}
                  dataSource={tableData3}
                  pagination={false}
                />
                <Row style={{ margin: "14px 14px 0 0" }} justify="end">
                  <Button type="link" onClick={onConfirm3}>
                    +
                  </Button>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <div className="action-btn">
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </div>
      </Form>}
    </div>
  );
};

export default AromWithouthAi;
