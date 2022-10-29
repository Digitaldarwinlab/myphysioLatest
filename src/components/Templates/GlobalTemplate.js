import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./GlobalTemplate.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  List,
  message,
  Avatar,
  Skeleton,
  Divider,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Checkbox,
  Space,
  Modal,
  Tooltip,
} from "antd";
import { temp } from "./temp";
import CarePlanCard from "../care-plan/care-plan-card/Card";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { CARE_PLAN_STATE_CHANGE } from "../../contextStore/actions/care-plan-action";
import { getTemplates } from "../../API/Template/template";
const { confirm } = Modal;
const { Text, Link } = Typography;
const GlobalTemplate = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [video, setVideo] = useState('');
  const [video1, setVideo1] = useState('');
  const [tempEx, setTempEx] = useState([]);
  const [loadArr, setLoadArr] = useState([]);
  const [tempName, setTempName] = useState("");
  const [data, setData] = useState([]);
  const reduxState = useSelector((state) => state.carePlanRedcucer);
  function LoadAll() {
    if (reduxState.exercises_cart.length > 0) {
      confirm({
        title: "Load exercises",
        icon: <ExclamationCircleOutlined />,
        content:
          "The exercises in the cart will be replaced with the exercises from the current template. If you want to add and not replace, please use select and load.",
        onOk() {
          console.log("OK");
          loadAll();
        },
        onCancel() {
          console.log("Cancel");
        },
        centered: true,
      });
    } else {
      confirm({
        title: "Load exercises",
        icon: <ExclamationCircleOutlined />,
        content: "All exercises will be loaded to cart",
        onOk() {
          console.log("OK");
          loadAll();
        },
        onCancel() {
          console.log("Cancel");
        },
        centered: true,
      });
    }
  }

  function LoadSelected() {
    let existCheck = [];
    reduxState.exercises_cart.map((item1) => {
      loadArr.map((item2) => {
        if (item1.ex_em_id == item2.ex_em_id) {
          existCheck.push(item1.name);
        }
      });
    });

    if (existCheck.length > 0) {
      let temp = "";
      existCheck.map((item) => {
        temp = temp + item + ",";
      });

      let last = loadArr.filter((item) => {
        if (existCheck.indexOf(item.name) == -1) {
          console.log(item);
          return item;
        }
      });
      confirm({
        title: "Load exercises",
        icon: <ExclamationCircleOutlined />,
        content: `${temp} already exist in cart and will not be duplicated.`,
        onOk() {
          console.log("OK");
          loadSelected([...reduxState.exercises_cart, ...last]);
        },
        onCancel() {
          console.log("Cancel");
        },
        centered: true,
      });
    } else {
      confirm({
        title: "Load selected exercises",
        icon: <ExclamationCircleOutlined />,
        content: "selected exercises will be loaded to cart",
        onOk() {
          console.log("OK");
          loadSelected([...reduxState.exercises_cart, ...loadArr]);
        },
        onCancel() {
          console.log("Cancel");
        },
        centered: true,
      });
    }
  }
  const ModalPopUp = ({ ex }) => {
    const [stateVisible ,setStateVisible] = useState(false)
    return (
      <>
      <Card
        className="px-1 py-1 ant-card-style"
        // hoverable
        title={
          <Row justify="space-between">
            <Col span={20}></Col>
            <Col span={4}>
              <Checkbox
                checked={
                  loadArr
                    .map((item) => item.ex_em_id)
                    .indexOf(ex.ex_em_id) !== -1
                    ? true
                    : false
                }
                onClick={() => UpdateEx(ex)}
              />
            </Col>
          </Row>
        }
        cover={
          ex.name == "YouTube" ? <ReactPlayer
            controls={true}
            className="react-player"
            url={ex.youtube_link}
            width="100%"
            height={180}
          /> :<>
           <img
            onClick={() => {
              setStateVisible(true)
              //console.log(`${process.env.REACT_APP_EXERCISE_URL}/${ex.video_url}`)
            }}
            alt="example"
            className="px-2 py-3 w-100"
            style={{ height: "180px", cursor: "pointer" }}
            src={`${process.env.REACT_APP_EXERCISE_URL}/${ex.image_url}`}
          />
          <Modal
        footer={null}
        visible={stateVisible}
        title="Video"
        // onOk={onOk}
        onCancel={() => setStateVisible(false)}
        centered
      >
        {ex.video_url ? (
          <video controls  id='template_video_modal' autoplay="autoplay" loop width="100%">
            <source
              id="template_video_modal_video_source"
              src={`${process.env.REACT_APP_EXERCISE_URL}/${ex.video_url}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <p>No Video Present...</p>
        )}
      </Modal>
          </>
        }
      >
        {console.log("temp array ", ex)}
        <Row>
          <Col span={24}>
            <Card.Meta title={<p>{ex.name}</p>} />
          </Col>
          <Col span={12}>
            <b>Sets : {ex["Rep"].set} </b>{" "}
          </Col>
          <Col span={12}>
            <b>Reps : {ex["Rep"].rep_count} </b>
          </Col>
        </Row>
      </Card>
      </>
    )
    
  }
  useEffect(async () => {
    const res = await getTemplates();
    console.log("templates ", res);
    let global = [];
    let local = [];

    res.map((item) => {
      if (item.global_temp) {
        global.push(item);
      } else {
        local.push(item);
      }
    });

    let final = [...local, ...global];
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "template_arr",
        value: final,
      },
    });
    //setData(res)
  }, []);

  const dispatch = useDispatch();
  console.log(loadArr);
  const loadSelected = (arr = []) => {
    //  if (window.confirm("exercises will be loaded to cart")) {
    console.log(arr);

    // if(arr.length>0){
    //   let temp = reduxState.exercises_cart.filter(item=>item.name)

    //   console.log(temp)
    // }else{
    //   console.log(loadArr)
    // }
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "exercises_cart",
        value: arr,
      },
    });
    //  }
  };
  const loadAll = () => {
    setLoadArr(tempEx);
    // if (window.confirm("exercises will be loaded to cart")) {
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "exercises_cart",
        value: tempEx,
      },
    });
    //  }
  };
  const UpdateEx = (exercise) => {
    if (
      loadArr.map((item) => item.ex_em_id).indexOf(exercise.ex_em_id) !== -1
    ) {
      let temp = loadArr.filter((item) => item.ex_em_id != exercise.ex_em_id);
      setLoadArr(temp);
    } else {
      setLoadArr([...loadArr, exercise]);
    }
  };
  const handleOk = () => { };
  return (
    <>
      {tempEx.length > 0 ? (
        <>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Row justify="space-between">
                <Col span={8}>
                  <i
                    className="fas fa-arrow-left"
                    style={{ cursor: "pointer" }}
                    title="Go Back"
                    onClick={() => {
                      setTempEx([]);
                      setLoadArr([]);
                    }}
                    role="button"
                  ></i>
                </Col>

                {loadArr.length > 0 ? (
                  <Space size="middle">
                    <Button
                      onClick={() => {
                        setLoadArr([]);
                      }}
                    >
                      De-Select All
                    </Button>
                    <Button onClick={LoadSelected}>Load Selected</Button>
                  </Space>
                ) : (
                  <Space size="middle">
                    <Button
                      onClick={() => {
                        setLoadArr(tempEx);
                      }}
                    >
                      Select All
                    </Button>
                    <Button onClick={LoadAll}>Load</Button>
                  </Space>
                )}
              </Row>
            </Col>
            <Col span={24}>
              <h2>{tempName}</h2>
            </Col>
            <Col span={24}>
              <Row>
                {tempEx.map((ex) => (
                  <>
                    <Col lg={8} md={12} sm={12} xs={24}>
                      <ModalPopUp ex={ex} />
                    </Col>
                  </>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <List
            header={
              <Row justify="space-between">
                <Row justify="start">NAME</Row>
                <Row justify="end">EXERCISES</Row>
              </Row>
            }
            dataSource={reduxState.template_arr}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setTempEx(item.exercise_details);
                  setTempName(item.template_name);
                }}
                key={item.template_name}
              >
                <List.Item.Meta
                  avatar={
                    item.global_temp ? (
                      <Tooltip title="Global Template">
                        <span className="template_badge">
                          <center>
                            <b>G</b>
                          </center>
                        </span>{" "}
                      </Tooltip>
                    ) : (
                      <Tooltip title="Local Template">
                        {" "}
                        <span className="template_badge">
                          <center>
                            <b>L</b>
                          </center>
                        </span>
                      </Tooltip>
                    )
                  }
                  title={<Link>{item.template_name}</Link>}
                />
                <span className="template_badge">
                  <center>
                    <b>{item.exercise_details.length}</b>
                  </center>
                </span>
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
};

export default GlobalTemplate;
