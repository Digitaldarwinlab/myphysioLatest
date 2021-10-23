import React, { useState, useEffect } from "react";
import { RiLayout6Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { Row, Col, Tabs, Input, Drawer, Pagination, Spin } from 'antd';
import CarePlanCard from './care-plan-card/Card';
import Filter from './care-plan-Filters/Filter';
import EpisodeDetail from './../patientEpisode/Prescription/EpisodeDetail';
import Cart from './care-plan-cart/Cart';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import { GetExerciseList, getFiteredExercistData } from './../../API/care-plan/care-plan-api';
import { useSelector, useDispatch } from 'react-redux';
import { CARE_PLAN_STATE_CHANGE, RECEIVED_DATA } from './../../contextStore/actions/care-plan-action';
import TopScroll from "../Scroll/TopScroll";
import CareAllocatePlan from './care-plan-allocate-plan/CareAllocatePlan';
import ActiveSearch from './../UtilityComponents/ActiveSearch';
import { getEpisode } from "../../API/Episode/EpisodeApi";
import { CARE_PLAN_CLEAR_STATE } from './../../contextStore/actions/care-plan-action';
import { Patient_profile } from "../../API/PatientRegistration/Patient";
import Exercise from "../episode-visit-details/ExerciseDetail/Exercise";

const { TabPane } = Tabs;
const { Search } = Input;


//Handle Active Search Bar Result for episode details 
export const getEpisodeDetails = async (pData, dispatch) => {

    if (pData.length !== 0) {

        let episode = await getEpisode(pData.pp_patm_id);
        const profile = await Patient_profile(pData.pp_patm_id)



        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "patient_name",
                value: pData.first_name + " " + pData.last_name
            }
        })
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "patient_main_code",
                value: profile.patient_code
            }
        })
        if (episode.length !== 0) {
            episode.map((item, index) => {
                if (item.end_date == '') {

                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "pp_ed_id",
                            value: item.pp_ed_id
                        }
                    })
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "episode_start_date",
                            value: item.start_date
                        }
                    })
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "complaint",
                            value: item.primary_complaint
                        }
                    })
                }

            })

        } else {
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "pp_ed_id",
                    value: ""
                }
            })
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "episode_start_date",
                    value: ""
                }
            })
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "complaint",
                    value: ""
                }
            })
        }
    }

}
const Careplan = ({ searchBar = true, handleChangeView }) => {
    const reduxState = useSelector(state => state);
 
    const [profiledetail, Setprofiledetail] = useState({

        patientName: '',
        patientCode: '',
        episodeId: '',
        startDate: '',
        PrimaryComplaint: ''
        
    })
   
    useEffect(() => {

        Setprofiledetail({
            patientName: reduxState.carePlanRedcucer.patient_name,
            patientCode: reduxState.carePlanRedcucer.patient_main_code,
            episodeId: reduxState.carePlanRedcucer.pp_ed_id,
            startDate: reduxState.carePlanRedcucer.episode_start_date,
            PrimaryComplaint: reduxState.carePlanRedcucer.complaint
        })

    }, [reduxState])

    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [filterMenu, setFilterMenu] = useState(false);
    const [Exerciselist, setExerciseList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [visible, setVisible] = useState(false);
    const [length, setLength] = useState(0);
    const [allocatePlan, setAllocatePlan] = useState(false);
    //Checked List to Filter
    const [checkedList, setCheckedList] = useState({
        muscels: [],
        joints: [],
        difficulty_level: [],
        movement: []
    });
    //Pagination Data State
    const [Pagination1, setPagination1] = useState({
        pageSize: 100,
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    });
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const history = useHistory();
    //function called on page change or pagesize change
    const PaginationChange = async (page, pageSize = Pagination1.pageSize) => {
        //  console.log(page)
        // console.log(pageSize)
        let result = await GetExerciseList(dispatch, pageSize, page);
        let res = { ...result };
          console.log(res)
          console.log(res.total_exercise)
        if (!result.total_exercise) {
            console.log(result)
            res["total_exercise"] = result["data"].length * Pagination1.totalPage
            // console.log('nhi hai')
        }

        setExerciseList(res.data);
        let cartActualData = res.data.filter((val) => {
            return cartItems.indexOf(val.ex_em_id) !== -1;
        });

        const newData = { ...Pagination1 };
        newData["pageSize"] = pageSize;
        newData["totalPage"] = res.total_exercise / pageSize;
        newData["current"] = page;
        newData["minIndex"] = (page - 1) * (pageSize);
        newData["maxIndex"] = page * (pageSize);
        setPagination1(newData);
        dispatch({ type: RECEIVED_DATA });
        setLength(cartActualData.length)
    }
    useEffect(() => {
        //  console.log('pagesize changing')
        const tempPage = Pagination1
        tempPage['current'] = 1

        setPagination1(tempPage)
    }, [Pagination1.pageSize])

    //Location Change
    useEffect(() => {

        localStorage.setItem("care-plan-cart", JSON.stringify([]));
     //   dispatch({ type: CARE_PLAN_CLEAR_STATE });

        //  console.log('on refreshh')
        // console.log(reduxState)
        const unblock = history.block((location, action) => {
           // dispatch({ type: CARE_PLAN_CLEAR_STATE });
            localStorage.setItem("care-plan-cart", JSON.stringify([]));
            return true;
        });
        return () => {
            unblock();
        };
    }, [history]);
    useEffect(async () => {
        let data = localStorage.getItem("care-plan-cart") ? JSON.parse(localStorage.getItem("care-plan-cart")) : [];
        const prevState = history.location.state;
        if (searchBar) {
         //   dispatch({ type: CARE_PLAN_CLEAR_STATE });
        }
        if (prevState !== undefined) {
            const { Joints, Muscles } = prevState;
            const newData = {
                ...checkedList,
                joints: Joints,
                muscels: Muscles
            }
            setCheckedList(newData)
            const filtered = await getFiteredExercistData(newData, dispatch, Pagination1.pageSize, Pagination1.current);
            setExerciseList(filtered.data);
            let cartActualData = filtered.data.filter((val) => {
                return data.indexOf(val.ex_em_id) !== -1;
            })
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] = filtered.total_exercise / (Pagination1.pageSize);
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = (Pagination1.pageSize);
            setPagination1(newPagData)
            setLength(cartActualData.length);
        } else {
            const exercise = await GetExerciseList(dispatch, Pagination1.pageSize, Pagination1.current);
            setExerciseList(exercise.data);
            let cartActualData = exercise.data.filter((val) => {
                return data.indexOf(val.ex_em_id) !== -1;
            })
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] = exercise.total_exercise / (Pagination1.pageSize);
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = (Pagination1.pageSize);
            setPagination1(newPagData)
            setLength(cartActualData.length);
        }
        setCartItems(data);
        dispatch({ type: RECEIVED_DATA });
        // eslint-disable-next-line
    }, []);


    //upper tab menu
    const operations = (
        <React.Fragment>
            <Row className="me-4">
                <Col className="ant-filter-hidden-icon">
                    <AiOutlineMenuUnfold
                        className="iconClass4 me-1 ms-1"
                        onClick={() => setFilterMenu(true)}
                    />
                </Col>
                <Col className="text-center me-2">
                    <FaHeart className="iconClass3" />
                    <p style={{ fontSize: "10px" }}>Wishlist</p>
                </Col>
                <Col className="text-center cart-plan" onClick={() => { setState(!state) }}>
                    <i className="fas fa-running iconClass3"></i>
                    <p style={{ fontSize: "10px" }}>Plan</p>
                    <span className="cart-plan-item-count" style={{marginRight:'-5px', marginTop:'15px'}}>{length}</span>
                </Col>
            </Row>
        </React.Fragment>
    )
    //filtered Exercise
    const filterExercise = async (checked, type, name) => {
        if (checked) {
            const newData = { ...checkedList };
            let index = newData[type].indexOf(name);
            if (index === -1) {
                newData[type].push(name);
            } else {
                newData[type].splice(index, 1);
            }
            const data = await getFiteredExercistData(newData, dispatch, Pagination1.pageSize, Pagination1.current);
            let cartActualData = data.data.filter((val) => {
                return cartItems.indexOf(val.ex_em_id) !== -1;
            })
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] = data.total_exercise / (Pagination1.pageSize);
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = (Pagination1.pageSize);
            setPagination1(newPagData)
            setExerciseList(data.data);
            setCheckedList(newData);
            setLength(cartActualData.length);
        } else {
            const newData = { ...checkedList };
            let index = newData[type].indexOf(name);
            newData[type].splice(index, 1);
            const data = await getFiteredExercistData(newData, dispatch, Pagination1.pageSize, Pagination1.current);
            let cartActualData = data.data.filter((val) => {
                return cartItems.indexOf(val.ex_em_id) !== -1;
            })
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] = data.total_exercise / (Pagination1.pageSize);
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = (Pagination1.pageSize);
            setExerciseList(data.data);
            setCheckedList(newData);
            setLength(cartActualData.length);
        }
        dispatch({ type: RECEIVED_DATA });
    }
    //Assessment Info

    const AssessmentInfo = () => {
        if (reduxState.carePlanRedcucer !== null && reduxState.carePlanRedcucer.patient_name !=='') {

            return (

                <Row style={{ minHeight: "150px" }} className="m-1 px-1 py-1">
                    <Col span={24} className="text-center">Episode ({reduxState.carePlanRedcucer.patient_name})</Col>
                    <Col span={24} className="text-center mt-2">

                    </Col>

                    <Col span={24} className="border px-2 py-2">

                        <EpisodeDetail
                            details={{
                                patientCode: reduxState.carePlanRedcucer.patient_main_code,
                                patientName: reduxState.carePlanRedcucer.patient_name,
                                episode_no: reduxState.carePlanRedcucer.pp_ed_id,
                                start_date: reduxState.carePlanRedcucer.episode_start_date,
                                primary_complaint: reduxState.carePlanRedcucer.complaint

                            }} />
                    </Col>
                </Row>
            );
        }
        else {
            return (
                <Row style={{ minHeight: "150px" }} className="m-1 px-1 py-1">
                    <Col span={24} className="text-center">Episode ({reduxState.carePlanRedcucer.patient_name})</Col>
                    <Col span={24} className="text-center mt-2">

                    </Col>

                    <Col span={24} className="border px-2 py-2">

                        <EpisodeDetail
                            details={{

                                patientCode: profiledetail.patientName,
                                patientName: profiledetail.patientCode,
                                episode_no: profiledetail.episodeId,
                                start_date: profiledetail.startDate,
                                primary_complaint: profiledetail.PrimaryComplaint
                            }} />
                    </Col>
                </Row>
            )
        }
    }
    //UpdateCart 
    const UpdateCart = (id) => {
        const data = localStorage.getItem("care-plan-cart") ? JSON.parse(localStorage.getItem("care-plan-cart")) : [];
        if (!data) {
            data.push(id);
        } else {
            let index = data.indexOf(id);
            if (index === -1) {
                data.push(id);
            } else {
                data.splice(index, 1);
            }
        }
        localStorage.setItem("care-plan-cart", JSON.stringify(data));
        setCartItems(data);
        console.log('cartttt items adding')
        console.log(data)
        let cartActualData = Exerciselist.filter((val) => {
            return data.indexOf(val.ex_em_id) !== -1;
        });
        setLength(cartActualData.length);
    }
    //HandleSearch 
    const handleSearch = (value) => {
        setSearchVal(value);
    }
    //Exercise Tab 
    const ExerciseTab = () => {
        const filteredData = Exerciselist.filter((val) => {
            if (!searchVal)
                return val;
            if (val.title.toLowerCase().includes(searchVal.toLowerCase()) || val.difficulty_level.toLowerCase().includes(searchVal.toLowerCase())) {
                return val;
            }
        })
        return (


            <Row>
                <Col span={20}>
                    <Search
                        allowClear
                        placeholder="search exercise..."
                        className="input-field w-100 my-3"
                        onChange={(e) => handleSearch(e.target.value)}
                        onSearch={(e) => console.log(e)}
                    />
                </Col>
                <Col span={24}>
                    <hr />
                </Col>
                <Col span={24}>
                    <Row>
                        {(!reduxState.carePlanRedcucer.isLoading) && filteredData.length === 0 && <p>No Data is Found...</p>}
                        {reduxState.carePlanRedcucer.isLoading && <div style={{ margin: "10px auto" }}>
                            <Spin tip="Loading" size="large"></Spin>
                        </div>}
                        {
                            (cartItems.length !== 0) && (filteredData.map((exercise, index) => {

                                return (
                                    <Col key={exercise.ex_em_id} md={12} lg={8} sm={12} xs={24}>
                                        <CarePlanCard
                                            cartState={cartItems ? cartItems.indexOf(exercise.ex_em_id) !== -1 : false}
                                            id={exercise.ex_em_id}
                                            Level={exercise.difficulty_level}
                                            Name={exercise.title}
                                            image={exercise.image_path ? exercise.image_path : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                            video={exercise.video_path ? exercise.video_path : ""}
                                            UpdateCart={UpdateCart}
                                            actions={true}

                                        />
                                    </Col>
                                )


                            }))
                        }
                        {!reduxState.carePlanRedcucer.isLoading && cartItems.length === 0 && ((filteredData.map((exercise, index) => {


                            return (
                                <Col key={exercise.ex_em_id} md={12} lg={8} sm={12} xs={24}>
                                    <CarePlanCard
                                        cartState={cartItems ? cartItems.indexOf(exercise.ex_em_id) !== -1 : false}
                                        id={exercise.ex_em_id}
                                        Level={exercise.difficulty_level}
                                        Name={exercise.title}
                                        image={exercise.image_path ? exercise.image_path : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                        UpdateCart={UpdateCart}
                                        actions={true}
                                        video={exercise.video_path ? exercise.video_path : ""}
                                    />
                                </Col>
                            )

                        })))
                        }
                    </Row>
                    <Pagination
                        pageSize={Pagination1.pageSize}
                        current={Pagination1.current}
                        total={Pagination1.totalPage * Exerciselist.length}
                        pageSizeOptions={["2", "5", "10", "20", "50", "100"]}
                        showSizeChanger
                        onChange={PaginationChange}
                        style={{ bottom: "0px" }}
                    />
                </Col>
            </Row>

        )
    }
    window.addEventListener('scroll', toggleVisible);
    //Change Page to Allocate Plan 
    const ChangePageToAllocatePlan = () => {
        if (!reduxState.carePlanRedcucer.patient_name) {
            setState(false);
            alert("Please Select a Patient.")
        } else if (!reduxState.carePlanRedcucer.pp_ed_id) {
            setState(false);
            alert("Selected Patient doesn't have any active episode.")
        }
        else {
            setAllocatePlan(!allocatePlan);
        }
    }
    const refreshHtml = () => {


    }
    //handleActiveSearch 
    const handleActiveSearchResult = async (pData) => {
        await getEpisodeDetails(pData, dispatch)
    }
    return (

        <React.Fragment>
            {
                refreshHtml()
            }
            {searchBar && <div style={{ minHeight: "20px" }}></div>}
            <h2 className="fw-bold">
                <i className="fas fa-arrow-left"
                    style={{ cursor: "pointer" }}
                    title="Go Back"
                    onClick={() => {
                        if (!allocatePlan) {
                            history.goBack()
                        }
                        else
                            setAllocatePlan(false);
                    }}
                    role="button"></i>
                {" "}<span className="CarePlanTitle ml-1"> Care Plan </span>
            </h2>
            <div className="CarePlan">
                {(!allocatePlan && searchBar) && (
                    <ActiveSearch carePlan={true} handleActiveSearchResult={handleActiveSearchResult} />)}
                {
                    !allocatePlan ? (
                        <Row className="mt-4 border">
                            <Col md={6} lg={5} xl={5} sm={24} xs={24} className="gray-border ant-filter-hidden">
                                {AssessmentInfo()}
                                {
                                    checkedList.length === 0 && <Filter filterExercise={filterExercise} checkedList={checkedList} />
                                }
                                {
                                    checkedList.length !== 0 && <Filter filterExercise={filterExercise} checkedList={checkedList} />
                                }
                            </Col>

                            <Col md={24} lg={24} xl={19} sm={24} xs={24} className="px-2 py-2 gray-border">
                                <Tabs
                                    tabBarExtraContent={operations}
                                    defaultActiveKey="2">
                                    <TabPane
                                        tab={
                                            <span className="iconClass2">
                                                <RiLayout6Fill className="iconClass3" />{" "}
                                                Templates
                                            </span>
                                        }
                                        key="1"
                                    >
                                        Tab 1
                                    </TabPane>
                                    <TabPane
                                        tab={
                                            <span className="iconClass2">
                                                <i className="fas fa-running iconClass3"></i>{" "}
                                                Exercises
                                            </span>
                                        }
                                        key="2"
                                    >
                                        {ExerciseTab()}
                                    </TabPane>
                                </Tabs>
                                <Drawer
                                    title="Plan"
                                    placement="right"
                                    closable={true}
                                    onClose={() => { setState(false) }}
                                    visible={state}
                                    getContainer={false}
                                    style={{ top: "50px" }}
                                    width={300}
                                >
                                    {cartItems.length === 0 && <p>No Plan is Present now...</p>}
                                    {cartItems.length !== 0 && <Cart Exercise={Exerciselist} items={cartItems} UpdateCart={UpdateCart} ChangePageToAllocatePlan={ChangePageToAllocatePlan} />}
                                </Drawer>

                                <Drawer
                                    title="Filters"
                                    placement="left"
                                    closable={true}
                                    onClose={() => { setFilterMenu(false) }}
                                    visible={filterMenu}
                                    getContainer={false}
                                    style={{ top: "60px" }}
                                    width={270}
                                >
                                    {AssessmentInfo()}
                                    {
                                        checkedList.length === 0 && <Filter filterExercise={filterExercise} checkedList={checkedList} />
                                    }
                                    {
                                        checkedList.length !== 0 && <Filter filterExercise={filterExercise} checkedList={checkedList} />
                                    }
                                </Drawer>
                            </Col>
                            <Col md={24} lg={24} xl={19} sm={24} xs={24}><TopScroll /></Col>
                        </Row>
                    ) : (
                        <CareAllocatePlan handleChangeView={handleChangeView} Exercise={Exerciselist} items={cartItems} searchBar={searchBar} />
                    )
                }
            </div>

        </React.Fragment>
    )
}
export default Careplan;