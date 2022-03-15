import React, { useState, useEffect } from "react";
import { Spin, Pagination, Row, Col, Button } from "antd";
import Careplan from "../../care-plan/carePlanIndex";
import CarePlanCardView from './carePlanCardView';
import { ImPlus } from 'react-icons/im';
import '../../../styles/Layout/Episode.css';
import { fetchCarePlan } from "../../../API/episode-visit-details/episode-visit-api";
// import cPData from "./../../UtilityComponents/dummyData/care-plan-dummy-data/ViewDummyData.json";

const CarePlanView = (props) => {
    const [carePlanData, setCarePlanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ChangeView, setChangeView] = useState(false);

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
            const data = await fetchCarePlan(props.eid);
            setLoading(false);
            
            // console.log('data is coming')
            console.log(data)

            setCarePlanData(data);
            setPaginationState({
                ...paginationState,
                totalPage: data.length / paginationState.pageSize,
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
    const fetchData = async () => {
        setLoading(true);
        const data = await fetchCarePlan(props.eid);
        setLoading(false);
        setCarePlanData(data);


        setPaginationState({
            ...paginationState,
            totalPage: data.length / paginationState.pageSize,
            minIndex: 0,
            maxIndex: paginationState.pageSize
        });
    }
    //change View


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
                                
                                <CarePlanCardView data={data} />
                            </div>
                        ))
                }
                <div>
                    <Pagination
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={carePlanData.length}
                        onChange={PaginationChange}
                    />
                </div>
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