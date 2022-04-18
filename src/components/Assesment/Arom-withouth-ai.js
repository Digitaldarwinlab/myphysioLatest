import React, { useState, useEffect } from "react";
import { Input, Table, Button, Select, Row, Col, Collapse } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { render } from "react-dom";
import "antd/dist/antd.css";
import { STATECHANGE } from "../../contextStore/actions/authAction";
const { Option } = Select;
const { Panel } = Collapse;
const labels = [
  "L Shoulder Abd/Add",
  "R Shoulder Abd/Add",
  "L Elbow Flex",
  "R Elbow Flex",
  "L Cervical Side flex",
  "R Cervical Side Flex",
  "L Lateral Side Flex",
  "R Lateral Side Flex",
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
  "L Cervical Side flex": "leftNeck",
  "R Cervical Side Flex": "rightNeck",
  "L Lateral Side Flex": "leftPelvic",
  "R Lateral Side Flex": "rightPelvic",
  "L Wrist": "leftWrist",
  "R Wrist": "rightWrist",
  "L Ankle": "leftAnkle",
  "R Ankle": "rightAnkle",
  "L Hip Abd/Add": "leftHipAdductionAdbuction",
  "R Hip Abd/Add": "rightHipAdductionAdbuction",
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
  const [tableData1, setTableData1] = useState(dataSource1);
  const [tableData2, setTableData2] = useState(dataSource2);
  const [tableData3, setTableData3] = useState(dataSource3);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state=>state)
  const setTotal = (data, index) => {
    // Set total
    data[index]["totalCount"] = Number(
      data[index]["goals"] + data[index]["assists"]
    );
  };
  const SaveData1 = () => {
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
    if(tableData1.length>0&&tableData1[0].joint!=="select"){
      console.log(tableData1);
      let angles = {};
    tableData1.map((item) => {
      let val = { min: item.min, max: item.max };
      angles[allNewJoints[item.joint]] = val;
    });
    let a = {};
    a["AROM"] = { angles };
    console.log(a);
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "Anterior_AI_Data",
        value: a,
      },
    });
    }
    if(tableData2.length>0&&tableData2[0].joint!=="select"){
      console.log(tableData2);
      let angles = {};
      tableData2.map((item) => {
        let val = { min: item.min, max: item.max };
        angles[allNewJoints[item.joint]] = val;
      });
     let a = {};
      a["AROM"] = { angles };
      dispatch({
        type: STATECHANGE,
        payload: {
          key: "LeftLateral_AI_Data",
          value: a,
        },
      });
    }
    if(tableData3.length>0&&tableData3[0].joint!=="select"){
      console.log(tableData3);
      let angles = {};
    tableData3.map((item) => {
      let val = { min: item.min, max: item.max };
      angles[allNewJoints[item.joint]] = val;
    });
   let a = {};
    a["AROM"] = { angles };
    dispatch({
      type: STATECHANGE,
      payload: {
        key: "RightLateral_AI_Data",
        value: a,
      },
    });
    }
      history.push("/assessment/1")
  };
  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData1];
    for (let index = 0; index < tableData1.length; index++) {
      setTotal(newData, index);
    }
    setTableData1(newData);
  }, []);

  const onInputChange1 = (key, index, e) => {
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

  const onInputChange2 = (key, index, e) => {
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

  const onInputChange3 = (key, index, e) => {
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
          style={{ width: `100%`, margin: 0 }}
          allowClear
          value={text}
          onChange={(e) => onInputChange1("joint", index, e)}
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
        <Input
          //  style={{ width: 120 }}
          value={text}
          onChange={(e) => onInputChange1("min", index, Number(e.target.value))}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <Input
          value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange1("max", index, Number(e.target.value))}
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
          style={{ width: `100%`, margin: 0 }}
          allowClear
          value={text}
          onChange={(e) => onInputChange2("joint", index, e)}
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
        <Input
          //  style={{ width: 120 }}
          value={text}
          onChange={(e) => onInputChange2("min", index, Number(e.target.value))}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <Input
          value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange2("max", index, Number(e.target.value))}
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
          style={{ width: `100%`, margin: 0 }}
          allowClear
          value={text}
          onChange={(e) => onInputChange3("joint", index, e)}
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
        <Input
          //  style={{ width: 120 }}
          value={text}
          onChange={(e) => onInputChange3("min", index, Number(e.target.value))}
        />
      ),
    },
    {
      dataIndex: "max",
      title: "Max",
      render: (text, record, index) => (
        <Input
          value={text}
          // style={{ width: 120 }}
          onChange={(e) => onInputChange3("max", index, Number(e.target.value))}
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
        <Button type="primary" onClick={SaveData1}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AromWithouthAi;
