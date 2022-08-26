import React, { useState, useEffect } from "react";
import { Spin, Pagination, Row, Col, Button } from "antd";
import Careplan from "../../care-plan/carePlanIndex";
import CarePlanCardView from './carePlanCardView';
import { ImPlus } from 'react-icons/im';
import { BiEdit } from "react-icons/bi";
import '../../../styles/Layout/Episode.css';
import { CarePlan, fetchCarePlan } from "../../../API/episode-visit-details/episode-visit-api";
import { CARE_PLAN_ADD_TO_CART, CARE_PLAN_REP_CHANGE, CARE_PLAN_STATE_CHANGE } from "../../../contextStore/actions/care-plan-action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import cPData from "./../../UtilityComponents/dummyData/care-plan-dummy-data/ViewDummyData.json";
import moment from "moment";
const CarePlanView = (props) => {
    const [carePlanData, setCarePlanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ChangeView, setChangeView] = useState(false);
    const [carePlanViewState ,setCarePlanViewState] = useState(true)
    const dispatch = useDispatch();
    const history = useHistory();
    const [paginationState, setPaginationState] = React.useState({
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 1
    });

    //Take All CarePlan
    useEffect(() => {
        async function getAllCarePlanData() {
            setLoading(true);
           // const data = await fetchCarePlan(props.eid);
            const resdata = await CarePlan(props.eid)
            setLoading(false);
            
            resdata.reverse()
            // console.log("data is coming ",data)

            setCarePlanData(resdata);
            setPaginationState({
                ...paginationState,
                totalPage: resdata.length / paginationState.pageSize,
                minIndex: 0,
                maxIndex: paginationState.pageSize
            });
        }
        getAllCarePlanData();
    }, [props.eid]);
    
    //Page change
    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: carePlanData.length / pageSize,
            current: page,
            minIndex: (page - 1) * (pageSize),
            maxIndex: page * (pageSize)
        })
    }

    //fetchData
    // const fetchData = async () => {
    //     setLoading(true);
    //     const data = await fetchCarePlan(props.eid);
    //     setLoading(false);
    //     setCarePlanData(data);


    //     setPaginationState({
    //         ...paginationState,
    //         totalPage: data.length / paginationState.pageSize,
    //         minIndex: 0,
    //         maxIndex: paginationState.pageSize
    //     });
    // }
    //change View
  
    const handleChange = (key, value, id = 0) => {
        if (key === "set" || key === "rep_count"||key==="hold_time") {
            dispatch({
                type: CARE_PLAN_REP_CHANGE,
                payload: {
                    key,
                    value,
                    index: id
                }
            })
        }
    }

const handleEdit = (data) => {

   // setChangeView(true);
  // setCarePlanViewState(false)
  let temp = []
  console.log(data.exercise_details)
    data.exercise_details.map(item=>{
        temp.push(item.ex_em_id)
        dispatch({type:CARE_PLAN_ADD_TO_CART,payload:item})
    })
    localStorage.setItem("care-plan-cart", JSON.stringify(temp));
    console.log("care-plan-cart ",data)
    let count_time_slots = data.time_slot.map(item=>item[0])
    console.log(count_time_slots)
    //status_flag
    //timeSlots
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"status_flag",
            value: data.status_flag==2?true:false
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"exercises",
            value: data.exercise_details
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"edit_flag",
            value: true
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"editStateDate",
            value: data.start_date
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"editEndDate",
            value: data.end_date
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key:"editCareplanCode",
            value: data.careplan_code
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key: "count_time_slots",
            value: count_time_slots.length
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key: "timeSlots",
            value: count_time_slots
        }
    })
    dispatch({
        type: CARE_PLAN_STATE_CHANGE,
        payload: {
            key: "time_slot_edit",
            value: 1
        }
    })
    //careplan_code
    console.log(carePlanData)
    history.push({pathname: "/care-plan",stateValues:{edit:true}})

}
const handleCancel = () => {
	setCarePlanViewState(true)
}
const handleSubmit = (data) => {
	setCarePlanViewState(true)
    console.log(data)
}
    const handleViewChange = () => {
        setChangeView(false);
        fetchData();
    }
    if (!ChangeView) {
        return (
            <div className="px-2 py-2">
                <Col span={24}>
                    <Row>
                        <Col lg={18} md={18} sm={18} xs={24}>
                            <h4 className="fw-bold">All CarePlan</h4>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                            {/* aswin 11/1/2021 start */}
                            {!ChangeView && <Button className="button1" id="bnid" style={{color:"white"}} onClick={async() => await props.carePlanClick()===true && setChangeView(true)}><ImPlus className="me-2" /> {"  "}Add</Button>}
                            {/* aswin 11/1/2021 stop */}
                            {ChangeView && <Button className="btncolor2" onClick={() => setChangeView(false)}>Cancel</Button>}
                        </Col>
                    </Row>
                </Col>
                {loading && <div className="text-center"><Spin tip="Loading..." size="large"></Spin></div>}
                {carePlanData.length === 0 && !loading && <p className="text-center fw-bold">No Care Plans are Present...</p>}
                {
                    carePlanData.length !== 0 &&
                    carePlanData.map((data, index) =>
                        index >= paginationState.minIndex && index < paginationState.maxIndex
                        && (
                            <div key={index} className="px-1 py-1">
                                {console.log("careplan data ",data)}
                               {(moment(data.end_date)>=new Date().setHours(0,0,0,0) && moment(data.start_date)>=new Date().setHours(0,0,0,0))&& <Row  justify="end">
                                {/* <Col lg={24} md={24} sm={24} xs={24}>
                                    <Button onClick={() => handleEdit(data)} className="button1" style={{color:"white"}}>
                                        
                                        <BiEdit />
                             {"  "}Edit
                                       
                                    </Button>
                                    {"  "}
                        </Col> */}
                                    {/* {!carePlanViewState&&<Button onClick={() => handleCancel()} className="button1" style={{color:"white"}}>Cancel</Button>} */}
                                </Row>}
                                <CarePlanCardView handleChange={handleChange} carePlanView={carePlanViewState} data={data} />
                                {/* <Row  justify="end">
                                <Col lg={24} md={24} sm={24} xs={24}>
                                    {!carePlanViewState&&<Button onClick={() => handleSubmit(data)} className="button1" style={{color:"white"}}>Submit</Button>}
                        </Col>
                                </Row> */}
                            </div>
                        ))
                }
                {/* {carePlanViewState&&<> */}
                <center>
                <div className="pag_large">
                    <Pagination
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={carePlanData.length}
                        onChange={PaginationChange}
                    />
                </div>
                </center>
                <center>
                <div className="pag_mob" style={{display:'none'}}>
                    <div style={{minHeight:'15px'}}></div>
                    <Pagination
                        size={'small'}
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={carePlanData.length}
                        onChange={PaginationChange}
                    />
                    <div style={{minHeight:'15px'}}></div>
                </div>
                </center>
                {/* </>} */}
            </div>
        )
    } else {
        return (
            <>
                <Col span={24}>
                    <Row>
                        <Col lg={18} md={18} sm={18} xs={24}>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={24} className="text-end">
                            {/* aswin 11/1/2021 start */}
                            {!ChangeView && <Button className="btncolor me-2" onClick={async() => await props.carePlanClick()===true && setChangeView(true)}>Add</Button>}
                            {/* aswin 11/1/2021 stop */}
                            {ChangeView && <Button className="btncolor2" onClick={() => {
                                setChangeView(false)
                                localStorage.setItem("care-plan-cart", JSON.stringify([]));
                            }}>Cancel</Button>}
                        </Col>
                    </Row>
                </Col>
                <Careplan searchBar={props.searchBar} handleChangeView={handleViewChange} />
            </>
        )
    }
}

export default CarePlanView;