
/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import {
  AiOutlineMinusCircle,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { Row, Col, Button, Space, notification } from "antd";
import { CARE_PLAN_STATE_CHANGE } from "../../../contextStore/actions/care-plan-action";

export default function Cart({
  Exercise,
  items,
  UpdateCart,
  ChangePageToAllocatePlan,
}) {
  const history = useHistory();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("cart check ", Exercise);
    console.log("cart check ", items);
  }, []);
  const AddVideoRom = () => {
    const allExcercise = state.carePlanRedcucer.exercises_cart
      .filter((val) => {
        if (items.indexOf(val.ex_em_id) !== -1) return val;
      })
      .map((val) => {
        return val.title;
      });
    const ExcerJoints = async () => {
      const res = await fetch(process.env.REACT_APP_API + "/exercise-joints/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ exercise: allExcercise }),
      });

      const data = await res.json();

      const Joints = data.map((val, key) => {
        return val.joint_name;
      });
      const input_data = { Joints, allExcercise };
      localStorage.setItem("input_data", JSON.stringify(input_data));
    };
    ExcerJoints();
    notification.success({
      message: "Please move to the video con screen and start assesment!",
      placement: "bottomLeft",
      duration: 5,
    });
  };

  const AddRom = () => {
    const allExcercise = state.carePlanRedcucer.exercises_cart.map((val) => {
      return val.name;
    });
    const ExcerJoints = async () => {
      const res = await fetch(process.env.REACT_APP_API + "/exercise-joints/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ exercise: allExcercise }),
      });

      const data = await res.json();

      const Joints = data.map((val, key) => {
        return val.joint_name;
      });

      // console.log(Joints)
      //aswin 11/27/2021 start
      // console.log("Excercise are ",Exercise)
      // console.log("Excercise are ",Joints)

      // console.log("Excercise are selected ",allExcercise)
      let exercisePrimary = [];
      const newEx = await state.carePlanRedcucer.exercises_cart.map(
        async (ex) => {
          allExcercise.map((element) => {
            if (ex.name === element) {
              let temp = {};
              temp["name"] = ex.name;
              temp["joint"] = Object.keys(ex.angle);
              exercisePrimary.push(temp);
            }
          });
        }
      );
      console.log("sorted array ", {
        pathname: "/assessment/AI",
        state: {
          Excercise: allExcercise,
          Joints: Joints,
          stateName: state.carePlanRedcucer,
          exercisePrimary: exercisePrimary,
        },
      });
      history.push({
        pathname: "/assessment/AI",
        state: {
          Excercise: allExcercise,
          Joints: Joints,
          stateName: state.carePlanRedcucer,
          exercisePrimary: exercisePrimary,
        },
      });
    };
    ExcerJoints();
  };
  //aswin 11/27/2021 start
  const RomAssesment = (excer) => {
    const ExcerJoints = async () => {
      const res = await fetch(
        process.env.REACT_APP_PATIENT_API + "api/exercise-joints/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ exercise: [excer] }),
        }
      );

      const data = await res.json();
      // console.log(data);
      const Joints = data.map((val, key) => {
        return val.joint_name;
      });

      history.push({
        pathname: "/assessment/AI",
        state: {
          Excercise: excer,
          Joints: Joints,
          stateName: state.carePlanRedcucer,
        },
      });
    };
    ExcerJoints();
  };
  const RemoveYouTube = (idx) => {
    let len = state.carePlanRedcucer.exercises_cart.filter(
      (item, index) => index !== idx
    );
    console.log(len);
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "exercises_cart",
        value: len,
      },
    });
  };
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(state.carePlanRedcucer.exercises_cart);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    console.log(tempData);
    dispatch({
      type: CARE_PLAN_STATE_CHANGE,
      payload: {
        key: "exercises_cart",
        value: tempData,
      },
    });
  };

  return (
    <React.Fragment style={{ marginBottom: "10px" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provider) => (
            <div
              style={{ margin: "20px" }}
              gutter={[20, 20]}
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              {state.carePlanRedcucer.exercises_cart.map((item, index) => {
                return (
                  <Draggable
                    key={item.id + item.name}
                    draggableId={item.id + item.name}
                    index={index}
                  >
                    {(provider) => (
                      <div
                        style={{
                          border: "1px solid #e6e6e6",
                          background: "#ebf6ff",
                          margin: "5px",
                        }}
                        {...provider.dragHandleProps}
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                      >
                        <div key={item.ex_em_id}>
                          <Row style={{ marginLeft: "20px" }}>
                            <Col className="">
                              <i className="fas fa-running iconClass3"></i>
                            </Col>
                            <Col
                              lg={6}
                              style={{
                                position: "relative",
                                marginLeft: "10px",
                              }}
                            >
                              {item.name}
                              {item.name == "YouTube" ? (
                                <AiOutlineMinusCircle
                                  onClick={() => {
                                    RemoveYouTube(index);
                                  }}
                                  className="iconClass3"
                                  style={{
                                    marginLeft: "10px",
                                    color: "#fa5f7f",
                                  }}
                                />
                              ) : (
                                <AiOutlineMinusCircle
                                  onClick={() => {
                                    UpdateCart(item.ex_em_id);
                                  }}
                                  className="iconClass3"
                                  style={{
                                    marginLeft: "10px",
                                    color: "#fa5f7f",
                                  }}
                                />
                              )}
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {state.carePlanRedcucer.exercises_cart.length > 0 && (
        <div
          className="all-buttons"
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "50px",
          }}
        >
          {/* <Button className="ant-btn-cart me-1" onClick={AddRom}>
            Start
          </Button> */}
          <Button
            className="ant-btn-cart"
            onClick={() => ChangePageToAllocatePlan()}
          >
            {state.carePlanRedcucer.edit_flag ? "Edit" : "Allocate"} Plan
          </Button>

          <Button
            className="ant-btn-cart me-1"
            style={{ marginLeft: "8px" }}
            onClick={AddVideoRom}
          >
            Start Video Assessment
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}

// /*eslint no-unused-vars:"off" */
// /*eslint array-callback-return:"off" */
// import React from "react";
// import { useSelector } from 'react-redux';

// import { useHistory } from "react-router-dom";
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import { Row, Col, Button, Space ,notification} from "antd";

// export default function Cart({
//   Exercise,
//   items,
//   UpdateCart,
//   ChangePageToAllocatePlan,
// }) {
//   const history = useHistory();
//   const state = useSelector(state => state);

//   const AddVideoRom=()=>{
//     const allExcercise = Exercise.filter((val) => {
//       if (items.indexOf(val.ex_em_id) !== -1) return val;
//     }).map((val) => {
//       return val.title;
//     });
//     const ExcerJoints = async () => {
//       const res = await fetch(process.env.REACT_APP_API + "/exercise-joints/", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({ exercise: allExcercise }),
//       });

//       const data = await res.json();

//       const Joints = data.map((val, key) => {
//         return val.joint_name;
//       });
//       const input_data={Joints,allExcercise}
//       localStorage.setItem("input_data",JSON.stringify(input_data));

//     };
//     ExcerJoints();
//     notification.success({
//       message: 'Please move to the video con screen and start assesment!',
//       placement: 'bottomLeft',
//       duration: 5
//   })
//   }

//   const AddRom = () => {
//     const allExcercise = Exercise.filter((val) => {
//       if (items.indexOf(val.ex_em_id) !== -1) return val;
//     }).map((val) => {
//       return val.title;
//     });
//     const ExcerJoints = async () => {
//       const res = await fetch(process.env.REACT_APP_API + "/exercise-joints/", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({ exercise: allExcercise }),
//       });

//       const data = await res.json();

//       const Joints = data.map((val, key) => {
//         return val.joint_name;
//       });
//       // state: {
//       //   Excercise: allExcercise,
//       //   Joints: Joints,
//       //   stateName :state
//       // };
//       // window.history.pushState(JSON.stringify( {
//       //   Excercise: allExcercise,
//       //   Joints: Joints,
//       //   stateName :state
//       // }), "",getSecuredURL("/assessment/AI"));

//       // history.push({
//       //   pathname: "/assessment/AI",
//       //   state: {
//       //     Excercise: allExcercise,
//       //     Joints: Joints,
//       //     stateName :state
//       //   },
//       // });

//         history.push({
//         pathname: "/assessment/AI",
//         state: {
//           Excercise: allExcercise,
//           Joints: Joints,
//           stateName :state
//         },
//       });
//     };
//     ExcerJoints();
//   };

//   const RomAssesment = (excer) => {
//     const ExcerJoints = async () => {
//       const res = await fetch(
//         process.env.REACT_APP_PATIENT_API + "api/exercise-joints/",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({ exercise: [excer] }),
//         }
//       );

//       const data = await res.json();
//       // console.log(data);
//       const Joints = data.map((val, key) => {
//         return val.joint_name;
//       });

//       history.push({
//         pathname: "/assessment/AI",
//         state: {
//           Excercise: excer,
//           Joints: Joints,
//         },
//       });
//     };
//     ExcerJoints();
//   };
//   return (
//     <React.Fragment>
//       {Exercise.filter((val) => {
//         if (items.indexOf(val.ex_em_id) !== -1) return val;
//       }).map((item, index) => {
//         return (
//           <div key={item.ex_em_id}>
//             <Row>
//               <Col lg={2} className="">
//                 <i className="fas fa-running iconClass3"></i>
//               </Col>
//               <Col lg={6}>{item.title}</Col>

//               <Col lg={4}>
//                 <AiOutlineMinusCircle
//                   onClick={() => {
//                     UpdateCart(item.ex_em_id);
//                   }}
//                   className="iconClass3"
//                   style={{ color: "#fa5f7f" }}
//                 />
//               </Col>
//             </Row>
//             <hr />
//           </div>
//         );
//       })}
//       <div className="all-buttons" style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'50px'}}>
//       <Button className="ant-btn-cart me-1" onClick={AddRom}>
//         Start
//       </Button>
//       <Button
//         className="ant-btn-cart"
//         onClick={() => ChangePageToAllocatePlan()}
//       >
//         Allocate Plan
//       </Button>

//       <Button className="ant-btn-cart me-1"  style={{marginLeft:'4px'}} onClick={AddVideoRom}>
//         Start Video Assessment
//       </Button>
//       </div>
//     </React.Fragment>
//   );
// }
