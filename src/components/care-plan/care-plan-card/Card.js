import React, { useEffect, useState } from "react";
import {
  Card,
  InputNumber,
  Input,
  Form,
  Row,
  Col,
  Modal,
  Select,
  Space,
} from "antd";
import { FaHeart } from "react-icons/fa";
import {
  AiOutlinePlus,
  AiOutlineMinusCircle,
  AiTwotoneSwitcher,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  CARE_PLAN_LINK_YOUTUBE_CHANGE,
  CARE_PLAN_ROM_JOINT_CHANGE,
  CARE_PLAN_ROM_JOINT_YOUTUBE_CHANGE,
  CARE_PLAN_STATE_CHANGE,
} from "../../../contextStore/actions/care-plan-action";
import yt from "../../../assets/YouTube.webp";
import ReactPlayer from "react-player";
import { GetJoint } from "../../../API/care-plan/care-plan-api";
const { Option } = Select;
const { Meta } = Card;
const joints = {
  Shoulder: "leftShoulder",
  Elbow: "leftElbow",
  Hip: "leftHip",
  Knee: "leftKnee",
  Cervical: "leftNeck",
  Pelvic: "leftPelvic",
  Wrist: "leftWrist",
  Ankle: "leftAnkle",
};
export default function CarePlanCard({
  id,
  Level,
  Name,
  image,
  UpdateCart,
  cartState,
  actions,
  video,
  handleChange,
  index,
  data,
  Setselectvalue,
  carePlanView = false,
}) {
  // console.log(`${process.env.REACT_APP_EXERCISE_URL}/${image}`)
  const [addInCart, setAddInCart] = useState(cartState);
  const state = useSelector((state) => state.carePlanRedcucer);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [url, setUrl] = useState("");
  console.log("careplanreducer");
  console.log("checkcheck ", data);
  const AddIntoCart = (id) => {
    console.log("cart ", id);
    UpdateCart(id);
    setAddInCart(true);
  };
  const RemoveFromCart = (id) => {
    UpdateCart(id);
    let test = state.exercises_cart.filter((ex) => ex.ex_em_id !== id);
    console.log("test value is ", test);
    setAddInCart(false);
  };
  const onOk = () => {
    setVisible(false);
    setVisible1(false);
  };
  const onCancel = () => {
    setVisible(false);
    setVisible1(false);
  };
  const handleClick = () => {
    setVisible(true);
  };
  const handleClick1 = () => {
    setVisible(true);
  };
  

  const handleChange1 = (key, value, id = 0) => {
    const reg = /^-?\d*(\.\d*)?$/;
    console.log("click ", key, " ", value);
    // if(key=="min"||key=="max"){
    //     if(value>199||value<0){
    //         return
    //     }
    //     if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-' ) {
    //         handleChange(key,value,id);
    //     }
    // }
    // if(key==="rep_count"){
    //     if(value<2){
    //         console.log('inside')
    //         return
    //     }

    // }
    if (key == "set" || key == "rep_count") {
      console.log("repetition ", value > 99);
      if (value > 99 || value < 0) {
        return;
      }
      if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
        console.log("repet inside");
        handleChange(key, value, id);
      }
    }
    if (key == "min" || key == "max") {
      handleChange(key, value, id);
    }
  };

  const changeRom = (index, value) => {
    dispatch({
      type: CARE_PLAN_ROM_JOINT_CHANGE,
      payload: {
        key: "joint",
        index: index,
        value: value,
      },
    });
  };

  return (
    <div className="bg-theme-1x"  style={{padding:'5px', margin:'5px'}}>
      <Card
        // className="px-1 py-1 ant-card-style"
        cover={
          Name === "YouTube" ? (
            <div>
              {(state.exercises_cart[index]&&state.exercises_cart[index].youtube_link.length > 0) ? (
                <ReactPlayer
                  controls={true}
                  className="react-player"
                  url={
                    state.exercises_cart[index]
                      ? state.exercises_cart[index].youtube_link
                      : data && data.youtube_link
                  }
                  width="auto"
                  height="auto"
                />
              ) : (
                <>
                  {data && data.youtube_link ? (
                    <ReactPlayer
                      controls={true}
                      className="react-player"
                      url={
                        state.exercises_cart[index]
                          ? state.exercises_cart[index].youtube_link
                          : data && data.youtube_link
                      }
                      width="auto"
                      height="auto"
                    />
                  ) : state.exercises_cart[index] &&
                    state.exercises_cart[index].youtube_link ? (
                    <ReactPlayer
                      controls={true}
                      className="react-player"
                      url={
                        state.exercises_cart[index]
                          ? state.exercises_cart[index].youtube_link
                          : data && data.youtube_link
                      }
                      width="auto"
                      height="auto"
                    />
                  ) : (
                    <img
                      title="Play The Video"
                      alt="example"
                      className="px-2 py-3 w-100"
                      src={yt}
                      style={{ height: "180px", cursor: "pointer" }}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <img
              title="Play The Video"
              onClick={handleClick}
              alt="example"
              className="px-2 py-3 w-100"
              src={`${process.env.REACT_APP_EXERCISE_URL}/${image}`}
              style={{ height: "180px", cursor: "pointer" }}
            />
          )
        }
        actions={
          actions
            ? [
                <>
                  {!cartState ? (
                    <AiOutlinePlus
                      onClick={() => AddIntoCart(id)}
                      className="iconClass3"
                    />
                  ) : (
                    <AiOutlineMinusCircle
                      onClick={() => RemoveFromCart(id)}
                      className="iconClass3"
                      style={{ color: "#fa5f7f" }}
                    />
                  )}
                </>,
                <AiTwotoneSwitcher className="iconClass3" />,
                <FaHeart className="iconClass3" />,
              ]
            : [
                <>
                  <div className="border m-1">
                    <Row>
                      <h4 className="border">Repitition</h4>
                    </Row>
                    <Row gutter={[10, 10]}>
                      <Col
                        lg={Name === "YouTube" ? 6 : 12}
                        md={12}
                        sm={12}
                        xs={12}
                      >
                        <Form.Item
                          name={"set" + index}
                          label="Set"
                          required={true}
                        >
                          {console.log(
                            "repe ",
                            state.exercises_cart && state.exercises_cart[index]
                          )}
                          <InputNumber
                            disabled={carePlanView}
                            onChange={(e) =>
                              handleChange1("set", e, index)
                            }
                            value={
                              data && data.Rep
                                ? data.Rep.set
                                : state.exercises_cart &&
                                  state.exercises_cart[index]
                                ? state.exercises_cart[index]["Rep"]["set"]
                                : 1
                            }
                            min={1}
                            max={99}
                            defaultValue={
                              data && data.Rep
                                ? data.Rep.set
                                : state.exercises_cart.length > 0 &&
                                  state.exercises_cart[index]
                                ? state.exercises_cart[index]["Rep"]["set"]
                                : 1
                            }
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        lg={Name === "YouTube" ? 6 : 12}
                        md={12}
                        sm={12}
                        xs={12}
                      >
                        <Form.Item
                          name={"rep_count" + index}
                          label="Count"
                          required={true}
                        >
                          <InputNumber
                            disabled={carePlanView}
                            onChange={(e) =>
                              handleChange1("rep_count", e, index)
                            }
                            value={
                              data && data.Rep
                                ? data.Rep.rep_count
                                : state.exercises_cart.length > 0 &&
                                  state.exercises_cart[index]
                                ? state.exercises_cart[index]["Rep"][
                                    "rep_count"
                                  ]
                                : 5
                            }
                            min={1}
                           
                            defaultValue={
                              data && data.Rep
                                ? data.Rep.rep_count
                                : state.exercises_cart &&
                                  state.exercises_cart[index]
                                ? state.exercises_cart[index]["Rep"][
                                    "rep_count"
                                  ]
                                : 5
                            }
                            className="w-100"
                          />
                        </Form.Item>
                      </Col>
                      {Name == "YouTube" && (
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Form.Item
                            name={"joint" + index}
                            label="joint"
                            required={true}
                          >
                            {/* CARE_PLAN_ROM_JOINT_YOUTUBE_CHANGE */}
                            <Select
                              disabled={carePlanView}
                              defaultValue={
                                data
                                  ? data.Rom.joint
                                  : state.exercises_cart[index]["Rom"].joint
                              }
                              value={
                                data && data.Rom
                                  ? data.Rom.joint
                                  : state.exercises_cart[index]["Rom"].joint
                              }
                              onChange={(e) => {
                                dispatch({
                                  type: CARE_PLAN_ROM_JOINT_YOUTUBE_CHANGE,
                                  payload: { index: index, value: e },
                                });
                              }}
                            >
                              {Object.keys(state.romJoints).map((item) => (
                                <Option value={state.romJoints[item].joint}>{item}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </div>
                </>,
              ]
        }
      >
        <Meta
          title={<p style={{ color: "#fa5f7f" }}>{Level}</p>}
          description={
            <Row justify="space-between">
              <Col span={Name == "YouTube" ? 8 : 24}>{Name} </Col>
              {Name == "YouTube" && (
                <Col span={16}>
                  <Input
                    disabled={carePlanView}
                    name="Input_num_url"
                    value={data ? data.youtube_link : state.exercises_cart[index].youtube_link}
                    onChange={(e) => {
                      dispatch({
                        type: CARE_PLAN_LINK_YOUTUBE_CHANGE,
                        payload: {
                          index: index,
                          value: e.target.value,
                        },
                      });
                    }}
                    placeholder="Paste youtube link here..."
                  />
                </Col>
              )}
            </Row>
          }
        />
      </Card>
      <Modal
        footer={null}
        visible={visible}
        title="Video"
        onOk={onOk}
        onCancel={onCancel}
        centered
      >
        {video ? (
          <video controls autoplay="autoplay" loop width="100%">
            <source
              src={`${process.env.REACT_APP_EXERCISE_URL}/${video}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <p>No Video Present...</p>
        )}
      </Modal>
      <Modal
        footer={null}
        visible={visible1}
        title="Video"
        onOk={onOk}
        onCancel={onCancel}
        centered
      >
        <ReactPlayer
          className="react-player"
          url={
            state.exercises_cart[index]
              ? state.exercises_cart[index].youtube_link
              : data && data.youtube_link
          }
          width="475px"
          height="250px"
        />
      </Modal>
    </div>
  );
}
