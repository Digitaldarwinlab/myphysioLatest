import React, { useState, useEffect, useRef } from "react";
import { RiLayout6Fill } from "react-icons/ri";
import { FaFilter, FaHeart } from "react-icons/fa";
import {
    Row,
    Col,
    Tabs,
    Input,
    Drawer,
    Pagination,
    Spin,
    notification,
    Button,
    Badge,
    Card,
    Space,
    Tooltip,
} from "antd";
import CarePlanCard from "./care-plan-card/Card";
import Filter from "./care-plan-Filters/Filter";
import "antd/dist/antd.css";
import arrow from '../../assets/arrow.webp'
import filter from '../../assets/filter.webp'
import template from '../../assets/template.webp'
import exercise from '../../assets/exercise.webp'
import { FaRunning, FaYoutube, FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AiOutlineMenuUnfold, AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import {
    GetAllExerciseList,
    GetExerciseList,
    getFiteredExercistData,
    GetJoint,
} from "../../API/care-plan/care-plan-api";
import { useSelector, useDispatch } from "react-redux";
import {
    CARE_PLAN_ADD_TO_CART,
    CARE_PLAN_EXERCISE_CHANGE,
    CARE_PLAN_STATE_CHANGE,
    RECEIVED_DATA,
} from "../../contextStore/actions/care-plan-action";
import TopScroll from "../Scroll/TopScroll";
import CareAllocatePlan from "./care-plan-allocate-plan/CareAllocatePlan";
import ActiveSearch from "../UtilityComponents/ActiveSearch";
import { getEpisode } from "../../API/Episode/EpisodeApi";
import { CARE_PLAN_CLEAR_STATE } from "../../contextStore/actions/care-plan-action";
import { Patient_profile } from "../../API/PatientRegistration/Patient";
import Exercise from "../episode-visit-details/ExerciseDetail/Exercise";
{
    /*  aswin 10/22/2021 start */
}
import { EPISODE_STATECHANGE } from "../../contextStore/actions/episode";
import Error from "../UtilityComponents/ErrorHandler";
import "./Careplan.css";
import { useLocation } from "react-router-dom";
import GlobalTemplate from "../Templates/GlobalTemplate";
import LocalTemplate from "../Templates/LocalTemplate";
import { getSearchTemplates } from "../../API/Template/template";
import H1 from "../Assesment/components/H1";
import DetailsTab from "../Assesment/DetailsTab";
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Cart from "./care-plan-cart/Cart";
{
    /*  aswin 10/22/2021 stop */
}

const { TabPane } = Tabs;
const { Search } = Input;

//Handle Active Search Bar Result for episode details
export const getEpisodeDetails = async (pData, dispatch) => {
    console.log(pData);
    if (pData.length !== 0) {
        let episode = await getEpisode(pData.pp_patm_id);
        const profile = await Patient_profile(pData.pp_patm_id);
        {
            /* aswin start 10/30/2021 start */
        }
        sessionStorage.setItem("patient_code", pData.pp_patm_id);
        {
            /* aswin start 10/30/2021 stop */
        }
        {
            /*  aswin 10/24/2021 start */
        }
        console.log(profile);
        // dispatch({
        //     type: EPISODE_STATECHANGE,
        //     payload: {
        //         key: "patient_code",
        //         value: profile.pp_patm_id
        //     }
        // });

        {
            /*  aswin 10/24/2021 start */
        }
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "patient_name",
                value: profile.first_name + " " + profile.last_name,
            },
        });
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "patient_main_code",
                value: profile.patient_code,
            },
        });
        {
            /*  aswin 10/24/2021 start */
        }
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "patient_code",
                value: profile.pp_patm_id,
            },
        });
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "pp_ed_id",
                value: "",
            },
        });
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "pp_pm",
                value: profile.pp_pm,
            },
        });
        {
            /*  aswin 10/24/2021 stop */
        }
        if (episode.length !== 0) {
            // if(episode[0].end_date.length>0){
            //     dispatch({ type: "EPISODE_CHECK", payload: "patient don't have an open episode" });
            //     setTimeout(() => {
            //         dispatch({type:"NOERROR"})
            //     }, 10000);
            //     console.log(' ')
            // }
            episode.map((item, index) => {
                if (item.end_date == "") {
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "pp_ed_id",
                            value: item.pp_ed_id,
                        },
                    });
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "episode_start_date",
                            value: item.start_date,
                        },
                    });
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "complaint",
                            value: item.primary_complaint,
                        },
                    });
                    //aswin 11/1/2021 start
                    sessionStorage.setItem("testvalue", item.episode_number);
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "episode_number",
                            value: item.episode_number,
                        },
                    });
                    //aswin 11/1/2021 stop
                }
            });
        } else {
            // dispatch({ type: "EPISODE_CHECK", payload: "patient don't have an episode" });
            // setTimeout(() => {
            //     dispatch({type:"NOERROR"})
            // }, 10000);
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "pp_ed_id",
                    value: "",
                },
            });
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "episode_start_date",
                    value: "",
                },
            });
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "complaint",
                    value: "",
                },
            });
        }
    }
};
const Careplan1 = ({ searchBar = true, handleChangeView }) => {
    const [profiledetail, Setprofiledetail] = useState({
        patientName: "",
        patientCode: "",
        episodeId: "",
        startDate: "",
        PrimaryComplaint: "",
    });
    const reduxState = useSelector((state) => state);
    const [firstTotalEx, setFirstTotalEx] = useState([]);
    const [filterState, setFilterState] = useState([])
    const [filterDatarequired, setFilterDatarequired] = useState();
    const locatoin = useLocation();
    const scrlRef = useRef(null);
    console.log("careplanStarted", reduxState.carePlanRedcucer);

    useEffect(() => {
        {
            /*  aswin 10/22/2021 start */
        }
        if (reduxState.carePlanRedcucer.pp_patm_id === "") {
            sessionStorage.removeItem("patient_code");
        }
    }, []);
    useEffect(async () => {
        if (reduxState.episodeReducer.patient_code) {
            let episode = await getEpisode(reduxState.episodeReducer.patient_code);
            const profile = await Patient_profile(
                reduxState.episodeReducer.patient_code
            );
            console.log("episode data ", episode);
            console.log("profile data ", profile);
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "patient_name",
                    value: profile.first_name + " " + profile.last_name,
                },
            });
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "patient_main_code",
                    value: profile.patient_code,
                },
            });
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "patient_code",
                    value: profile.pp_patm_id,
                },
            });
            if (episode.length !== 0) {
                episode.map((item) => {
                    if (item.end_date === "") {
                        dispatch({
                            type: CARE_PLAN_STATE_CHANGE,
                            payload: {
                                key: "endDate",
                                value: item.end_date,
                            },
                        });
                        //aswin 11/1/2021 start
                        dispatch({
                            type: CARE_PLAN_STATE_CHANGE,
                            payload: {
                                key: "episode_number",
                                value: item.episode_number,
                            },
                        });
                        //aswin 11/1/2021 stop

                        dispatch({
                            type: CARE_PLAN_STATE_CHANGE,
                            payload: {
                                key: "pp_ed_id",
                                value: item.pp_ed_id,
                            },
                        });
                        dispatch({
                            type: CARE_PLAN_STATE_CHANGE,
                            payload: {
                                key: "startDate",
                                value: item.start_date,
                            },
                        });
                        dispatch({
                            type: CARE_PLAN_STATE_CHANGE,
                            payload: {
                                key: "complaint",
                                value: item.primary_complaint,
                            },
                        });
                    }
                });
            }
        }
    }, []);
    useEffect(async () => {
        const p_code =
            reduxState.episodeReducer.patient_code ||
            reduxState.carePlanRedcucer.pp_patm_id;
        if (p_code) {
            const body = {
                id: p_code,
            };
            const headers = {
                Accept: "application/json",
                "Content-type": "application/json",
            };
            const res = await fetch(`${process.env.REACT_APP_API}/basic_detail/`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify(body),
            });
            const responseData = await res.json();
            console.log("user data", responseData);

            Setprofiledetail({
                patientName: responseData.first_name + responseData.last_name,
                patientCode: responseData.patient_code,
                episodeId: responseData.pp_ed_id,
                startDate: responseData.start_date,
                PrimaryComplaint: responseData.primary_complaint,
            });
        }
        {
            /*  aswin 10/22/2021 stop */
        }
        {
            /* aswin start 10/30/2021 start */
        }
    }, [reduxState.carePlanRedcucer.patient_code]);
    {
        /* aswin start 10/30/2021 stop */
    }

    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [filterMenu, setFilterMenu] = useState(false);
    const [Exerciselist, setExerciseList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [visible, setVisible] = useState(false);
    const [length, setLength] = useState(0);
    const [allocatePlan, setAllocatePlan] = useState(false);
    const [fullExer, setFullExer] = useState(new Set());
    const [filterData, setFilterData] = useState({
        checked: false,
        type: "",
        name: "",
    });
    // aswin 11/19/2021 start
    const checkEpisodeId = async () => {
        if (reduxState.carePlanRedcucer.patient_code) {
            const res = await getEpisode(reduxState.carePlanRedcucer.patient_code);
            if (res.length === 0) {
                dispatch({
                    type: "EPISODE_CHECK",
                    payload: "patient don't have an episode",
                });
                setTimeout(() => {
                    dispatch({ type: "NOERROR" });
                }, 5000);
                return;
            }
            if (res[0].end_date.length !== 0) {
                dispatch({
                    type: "EPISODE_CHECK",
                    payload: "patient don't have open an episode",
                });
                setTimeout(() => {
                    dispatch({ type: "NOERROR" });
                }, 5000);
                return;
            }
            return true;
        } else {
            dispatch({ type: "EPISODE_CHECK", payload: "patient select a patient" });
            setTimeout(() => {
                dispatch({ type: "NOERROR" });
            }, 5000);
        }
    };
    useEffect(() => {
        checkEpisodeId();
        dispatch({ type: "NOERROR" });
    }, [
        reduxState.carePlanRedcucer.patient_code,
        reduxState.episodeReducer.patient_main_code,
    ]);
    useEffect(async () => {
        // const callJoints = async () => {
        const romJoint = await GetJoint();
        console.log("joints are ", romJoint)
        let temp = romJoint.reverse();
        let obj = {};
        temp.filter((item) => {
            if (
                item.ex_jm_id !== 1 &&
                item.ex_jm_id !== 2 &&
                item.ex_jm_id !== 3 &&
                item.ex_jm_id !== 4 &&
                item.ex_jm_id !== 5
            ) {
                if (item.JointType == "Neck") {
                    let temp = {
                        joint: item.joint_name,
                        min: item.MinAngle,
                        max: item.MaxAngle,
                    };
                    obj["Cervical"] = temp;
                } else {
                    console.log("joints are ", item)
                    let temp = {
                        joint: item.joint_name,
                        min: item.MinAngle,
                        max: item.MaxAngle,
                    };
                    obj[item.JointType] = temp;
                }
            }
        });
        console.log("joints are ", obj)
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "romJoints",
                value: obj,
            },
        });
        // }
        // callJoints()
    }, []);
    useEffect(() => {
        dispatch({ type: "NOERROR" });
    }, []);
    // aswin 11/19/2021 stop
    //Checked List to Filter
    const [checkedList, setCheckedList] = useState({
        muscels: [],
        joints: [],
        difficulty_level: [],
        movement: [],
        search_query: "",
    });
    //Pagination Data State
    const [Pagination1, setPagination1] = useState({
        pageSize: 20,
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
    });
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const history = useHistory();
    // useEffect(()=>{
    //     let firstResult = await GetExerciseList(dispatch, 100, 1);
    //     setFirstTotalEx
    // },[])
    //function called on page change or pagesize change
    const PaginationChange = async (page, pageSize = Pagination1.pageSize) => {
        console.log(filterData);
        // const newData = { ...checkedList };
        // if(filterData.checked){
        //     let index = newData[filterData.type].indexOf(filterData.name);
        //     if (index === -1) {
        //         newData[filterData.type].push(filterData.name);
        //     } else {
        //         newData[filterData.type].splice(index, 1);
        //     }
        // }
        //let result = await GetExerciseList(dispatch, pageSize, page);
        let result = await getFiteredExercistData(
            checkedList,
            dispatch,
            pageSize,
            page
        );
        let res = { ...result };

        //   console.log(res)
        console.log("nhi hai 0", res);
        console.log("nhi hai1", Pagination1.pageSize); //100 //50
        console.log("nhi hai2", Pagination1.totalPage); //1.03  //2.06
        console.log("nhi hai3", Pagination1.current); //100 //1
        console.log("nhi hai4", Pagination1.minIndex); //1 //0
        console.log("nhi hai5", Pagination1.maxIndex); //0 // 50
        console.log("nhi hai6", page); //2
        console.log("nhi hai7", pageSize); //100
        if (!result.total_exercise) {
            console.log("result is ", result);

            // res["total_exercise"] = result["data"].length * Pagination1.totalPage
            res["total_exercise"] = Pagination1.pageSize * Pagination1.totalPage;
            console.log("nhi hai", res); //3.09
        }

        //   let cartActualDat = fullExer.filter((val) => {
        //       return cartItems.indexOf(val.ex_em_id) !== -1;
        //     });
        //     let cartActualData = res.data.filter((val) => {
        //         return cartItems.indexOf(val.ex_em_id) !== -1;
        //     });
        console.log("page ", pageSize);
        console.log("page min index ", (page - 1) * pageSize);
        console.log("page max index ", page * pageSize);
        const newData = { ...Pagination1 };
        newData["pageSize"] = pageSize;
        newData["totalPage"] = res.total_exercise / pageSize;
        newData["current"] = page;
        newData["minIndex"] = (page - 1) * pageSize;
        newData["maxIndex"] = page * pageSize;
        //   console.log("page ",Pagination1.current)
        //   console.log("page size ",Pagination1.pageSize)
        //   console.log("page res ",res.total_exercise)
        //   console.log("page total exercise length ",result["data"].length )
        //   console.log("page total page ",res.total_exercise / pageSize)
        //   if(Pagination1.pageSize===100){
        //       console.log('page inside')
        //     newData["totalPage"] = 1
        //     // newData["current"] = 2
        //     // newData["minIndex"] = 2
        //     // newData["maxIndex"] = 2
        //   }
        let tempdata = res.data.map((val) => {
            return {
                ex_em_id: val.ex_em_id,
                name: val.title ? val.title : "Exercise",
                instruction_array: val.instruction_array ? val.instruction_array : [],
                Rep: {
                    set: 1,
                    rep_count: 10,
                    hold_time: 10,
                },
                angle: val.angle ? val.angle : [],
                minAmp: val.minAmp,
                Rom: {
                    joint: Object.keys(val.angle)[0],
                    min: Object.values(val.angle)[0]
                        ? Object.values(val.angle)[0].min
                        : " ",
                    max: Object.values(val.angle)[0]
                        ? Object.values(val.angle)[0].max
                        : " ",
                },
                difficulty_level: val.difficulty_level,
                image_url: val.image_path,
                video_url: val.video_path,
            };
        });
        setExerciseList(tempdata);
        console.log("page size ", newData["totalPage"]);
        setPagination1(newData);
        dispatch({ type: RECEIVED_DATA });
        // setLength(cartActualDat.length)
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "isLoading",
                value: false,
            },
        });
    };
    useEffect(() => {
        //  console.log('pagesize changing')
        const tempPage = Pagination1;
        tempPage["current"] = 1;

        setPagination1(tempPage);
    }, [Pagination1.pageSize]);

    //Location Change
    useEffect(() => {
        console.log("locationhistrory ", history);
        if (!reduxState.carePlanRedcucer.edit_flag) {
            localStorage.setItem("care-plan-cart", JSON.stringify([]));
        }
        // if(history.location.stateValues&&history.location.stateValues.edit){
        //     setState(true)
        // }

        // dispatch({ type: CARE_PLAN_CLEAR_STATE });

        //  console.log('on refreshh')bb
        // console.log(reduxState)
        const unblock = history.block((location, action) => {
            dispatch({ type: CARE_PLAN_CLEAR_STATE });
            localStorage.setItem("care-plan-cart", JSON.stringify([]));
            return true;
        });
        return () => {
            unblock();
        };
    }, [history]);
    // useEffect(async() => {
    //     const exercise = await GetExerciseList(dispatch, 350,1);
    //     setFullExer(exercise.data)
    // }, []);
    useEffect(async () => {
        console.log("useEffect if")
        console.log("useEffect if")
        let data = localStorage.getItem("care-plan-cart")
            ? JSON.parse(localStorage.getItem("care-plan-cart"))
            : [];
        console.log("useEffect if")
        const prevState = history.location.state;
        console.log("useEffect if")
        if (prevState !== undefined) {
            console.log("useEffect if")
            const { Joints, Muscles } = prevState;
            const newData = {
                ...checkedList,
                joints: Joints,
                muscels: Muscles,
            };
            setCheckedList(newData);
            const filtered = await getFiteredExercistData(
                newData,
                dispatch,
                Pagination1.pageSize,
                Pagination1.current
            );
            console.log("full if ", filtered);
            let cartActualData = filtered.data.filter((val) => {
                return data.indexOf(val.ex_em_id) !== -1;
            });
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] =
                filtered["total_exercise with applied filter"] / Pagination1.pageSize;
            console.log("page Pagination1.totalPage if ", filtered.total_exercise);
            console.log("page Pagination1.totalPage if ", Pagination1.pageSize);
            console.log(
                "page Pagination1.totalPage if ",
                filtered.total_exercise / Pagination1.pageSize
            );
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = Pagination1.pageSize;
            let tempdata = filtered.data.map((val) => {
                return {
                    ex_em_id: val.ex_em_id,
                    name: val.title ? val.title : "Exercise",
                    instruction_array: val.instruction_array ? val.instruction_array : [],
                    Rep: {
                        set: 1,
                        rep_count: 10,
                        hold_time: 10,
                    },
                    angle: val.angle ? val.angle : [],
                    minAmp: val.minAmp,
                    Rom: {
                        joint: Object.keys(val.angle)[0],
                        min: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].min
                            : " ",
                        max: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].max
                            : " ",
                    },
                    difficulty_level: val.difficulty_level,
                    image_url: val.image_path,
                    video_url: val.video_path,
                };
            });
            setExerciseList(tempdata);
            setPagination1(newPagData);
            setLength(reduxState.carePlanRedcucer.exercises_cart.length);
        } else {
            console.log("useEffect if")
            const exercise = await GetExerciseList(
                dispatch,
                Pagination1.pageSize,
                Pagination1.current
            );
            let cartActualData = exercise.data.filter((val) => {
                return data.indexOf(val.ex_em_id) !== -1;
            });
            console.log("full else ", exercise);
            console.log("full exer ", fullExer);
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] = exercise.total_exercise / Pagination1.pageSize;
            console.log("page Pagination1.totalPage else ", Pagination1.pageSize);
            console.log("page Pagination1.totalPage else ", exercise.total_exercise);
            newPagData["minIndex"] = 0;
            newPagData["maxIndex"] = Pagination1.pageSize;
            let tempdata = exercise.data.map((val) => {
                return {
                    ex_em_id: val.ex_em_id,
                    name: val.title ? val.title : "Exercise",
                    instruction_array: val.instruction_array ? val.instruction_array : [],
                    Rep: {
                        set: 1,
                        rep_count: 10,
                        hold_time: 10,
                    },
                    angle: val.angle ? val.angle : [],
                    minAmp: val.minAmp,
                    Rom: {
                        joint: Object.keys(val.angle)[0],
                        min: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].min
                            : " ",
                        max: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].max
                            : " ",
                    },
                    difficulty_level: val.difficulty_level,
                    image_url: val.image_path,
                    video_url: val.video_path,
                };
            });
            setExerciseList(tempdata);
            setPagination1(newPagData);
            setLength(reduxState.carePlanRedcucer.exercises_cart.length);
        }
        setCartItems(data);
        dispatch({ type: RECEIVED_DATA });
        // eslint-disable-next-line
    }, []);

    console.log(reduxState.episodeReducer);

    const updateExArr = () => {
        let array = fullExer.filter((val) => {
            if (cartItems.indexOf(val.ex_em_id) !== -1) return val;
        });
        array = array.map((val) => {
            // console.log('array having items of carts',Object.values(val.angle)[0].min)
            // console.log('array having items of carts',Object.values(val.angle)[0].max)
            return {
                ex_em_id: val.ex_em_id,
                name: val.title ? val.title : "Exercise",
                Rep: {
                    set: 1,
                    rep_count: 10,
                    hold_time: 10,
                },
                angle: val.angle ? val.angle : [],
                minAmp: val.minAmp,
                Rom: {
                    joint: Object.keys(val.angle)[0],
                    min:
                        val.angle &&
                        Object.values(val.angle)[0].min &&
                        Object.values(val.angle)[0].min,
                    max:
                        val.angle &&
                        Object.values(val.angle)[0].max &&
                        Object.values(val.angle)[0].max,
                },
                image_url: val.image_path,
                video_url: val.video_path,
            };
        });
        console.log(array);
        if (reduxState.carePlanRedcucer.edit_flag) {
            dispatch({
                type: CARE_PLAN_EXERCISE_CHANGE,
                payload: {
                    key: "exercises",
                    value: array,
                },
            });
        } else {
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "exercises",
                    value: array,
                },
            });
        }
    };
    //upper tab menu
    const operations = (
        <React.Fragment>
            <div style={{ display: "none" }} className="careplan_mobile_view_tabs">
                <Button
                    type="text"
                    className="car_btn3"
                    onClick={async () => {
                        (await checkEpisodeId()) == true && setState(!state);
                    }}
                    icon={
                        <IconContext.Provider
                            value={{ color: "black", className: "global-class-name" }}
                        >
                            <div>
                                <FaRunning className="iconClass3" />
                            </div>
                        </IconContext.Provider>
                    }
                >
                    <span className="cart-plan-item-count">
                        {reduxState.carePlanRedcucer.exercises_cart.length}
                    </span>
                </Button>
            </div>
            <Row className="me-4 careplan_large_view">
                <Col
                    className="text-center cart-plan col_careplan2"
                    onClick={async () => {
                        (await checkEpisodeId()) == true && setState(!state);
                    }}
                >
                    <i className="fas fa-running iconClass3 running_icon"></i>
                    <p style={{ fontSize: "10px" }}>Plan</p>
                    <span className="cart-plan-item-count">
                        {reduxState.carePlanRedcucer.exercises_cart.length}
                    </span>
                </Col>
            </Row>
        </React.Fragment>
    );
    //filtered Exercise
    const filterExercise = async (checked, type, name) => {
        if (checked) {
            console.log("filter inside checked");
            const newData = { ...checkedList };
            let index = newData[type].indexOf(name);
            if (index === -1) {
                newData[type].push(name);
            } else {
                newData[type].splice(index, 1);
            }
            console.log('newdata', newData)
            const data = await getFiteredExercistData(
                newData,
                dispatch,
                Pagination1.pageSize,
                1
            );
            // if (!data['total_exercise with applied filter']) {
            //     data['total_exercise with applied filter'] = data.length
            // }

            console.log("filter full exercise ", data);
            // let cartActualData = data.data.filter((val) => {
            //     return cartItems.indexOf(val.ex_em_id) !== -1;
            // })
            // console.log('filter cartActualData ',cartActualData)
            console.log("filter total exercise ", data.data.length);
            console.log("filter pageSize ", Pagination1.pageSize);
            console.log(
                "filter totalPage ",
                data["total_exercise with applied filter"] / Pagination1.pageSize
            );
            console.log("filter maxIndex ", Pagination1.pageSize);
            const newPagData = { ...Pagination1 };
            newPagData["totalPage"] =
                data["total_exercise with applied filter"] / Pagination1.pageSize;
            newPagData["minIndex"] = 1;
            newPagData["current"] = 1;
            newPagData["maxIndex"] = Pagination1.pageSize;
            setPagination1(newPagData);
            let tempdata = data.data.map((val) => {
                return {
                    ex_em_id: val.ex_em_id,
                    name: val.title ? val.title : "Exercise",
                    instruction_array: val.instruction_array ? val.instruction_array : [],
                    Rep: {
                        set: 1,
                        rep_count: 10,
                        hold_time: 10,
                    },
                    angle: val.angle ? val.angle : [],
                    minAmp: val.minAmp,
                    Rom: {
                        joint: Object.keys(val.angle)[0],
                        min: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].min
                            : " ",
                        max: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].max
                            : " ",
                    },
                    difficulty_level: val.difficulty_level,
                    image_url: val.image_path,
                    video_url: val.video_path,
                };
            });
            setExerciseList(tempdata);
            setFilterDatarequired(tempdata)
            setCheckedList(newData);
        } else {
            console.log("filter inside not checked");
            const newData = { ...checkedList };
            let index = newData[type].indexOf(name);
            newData[type].splice(index, 1);
            console.log('newdata', newData)
            const data = await getFiteredExercistData(
                newData,
                dispatch,
                Pagination1.pageSize,
                1
            );
            // let cartActualData = data.data.filter((val) => {
            //     return cartItems.indexOf(val.ex_em_id) !== -1;
            // })
            const newPagData = { ...Pagination1 };
            // console.log('filter cartActualData ',cartActualData)
            // console.log('filter total exercise ',data.data.length)
            // console.log('filter pageSize ',Pagination1.pageSize)
            // console.log('filter totalPage ', data['total_exercise with applied filter'] / (Pagination1.pageSize))
            // console.log('filter maxIndex ',(Pagination1.pageSize))
            console.log(
                "filter total_exercise ",
                data.total_exercise
                    ? data.total_exercise
                    : data["total_exercise with applied filter"]
            );
            console.log("filter pageSize ", Pagination1.pageSize);
            console.log(
                "filter pageSize ",
                (data.total_exercise
                    ? data.total_exercise
                    : data["total_exercise with applied filter"]) / Pagination1.pageSize
            );
            console.log("calliung");
            newPagData["current"] = 1;
            newPagData["totalPage"] =
                (data.total_exercise
                    ? data.total_exercise
                    : data["total_exercise with applied filter"]) / Pagination1.pageSize;
            //newPagData['pageSize']
            //   newPagData["minIndex"] = 0;
            //  newPagData["maxIndex"] = (Pagination1.pageSize);
            setPagination1(newPagData);
            let tempdata = data.data.map((val) => {
                return {
                    ex_em_id: val.ex_em_id,
                    name: val.title ? val.title : "Exercise",
                    instruction_array: val.instruction_array ? val.instruction_array : [],
                    Rep: {
                        set: 1,
                        rep_count: 10,
                        hold_time: 10,
                    },
                    angle: val.angle ? val.angle : [],
                    minAmp: val.minAmp,
                    Rom: {
                        joint: Object.keys(val.angle)[0],
                        min: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].min
                            : " ",
                        max: Object.values(val.angle)[0]
                            ? Object.values(val.angle)[0].max
                            : " ",
                    },
                    difficulty_level: val.difficulty_level,
                    image_url: val.image_path,
                    video_url: val.video_path,
                };
            });
            setExerciseList(tempdata);
            setCheckedList(newData);
            setFilterDatarequired(tempdata)
            //    setLength(cartActualData.length);
        }
        dispatch({ type: RECEIVED_DATA });
    };
    //Assessment Info

    const AssessmentInfo = () => {
        return (
            <Row style={{ minHeight: "150px" }} className="m-1 px-1 py-1">
                {/*  aswin 10/22/2021 start */}
                <Col span={24} className="text-center">
                    Episode ({reduxState.carePlanRedcucer.patient_name})
                </Col>
                <Col span={24} className="text-center mt-2"></Col>

                <Col span={24} className="border px-2 py-2">
                    {/* <EpisodeDetail
                            details={{
    
                                patientCode:profiledetail.patientCode,
                                patientName:profiledetail.patientName,
                                episode_no: profiledetail.episodeId,
                                start_date: profiledetail.startDate,
                                primary_complaint: profiledetail.PrimaryComplaint
                                //  patientCode:profiledetail.patientName,
                                // patientName:profiledetail.patientCode,
                                // episode_no: profiledetail.episodeId,
                                // start_date: profiledetail.startDate,
                                // primary_complaint: profiledetail.PrimaryComplaint
                            }} /> */}
                    <>
                        {/* aswin start 10/30/2021 start */}
                        <p>
                            <strong> Patient Name : </strong>
                            {reduxState.carePlanRedcucer.patient_name}
                        </p>
                        <p>
                            <strong> Patient Code : </strong>
                            {reduxState.carePlanRedcucer.patient_main_code}
                        </p>
                        <p>
                            <strong> Episode No: </strong>
                            {reduxState.carePlanRedcucer.episode_number}
                        </p>
                        <p>
                            {" "}
                            <strong>Start Date : </strong>{" "}
                            {(reduxState.carePlanRedcucer.episode_start_date &&
                                reduxState.carePlanRedcucer.episode_start_date) ||
                                reduxState.carePlanRedcucer.startDate}
                        </p>
                        <p>
                            {" "}
                            <strong>Episode Type: </strong>
                            {reduxState.carePlanRedcucer.complaint}
                        </p>
                        {/* aswin start 10/30/2021 start */}
                    </>
                    {/*  aswin 10/22/2021 stop */}
                </Col>
            </Row>
        );
    };
    //UpdateCart
    const [basket, setBasket] = useState([]);
    const UpdateCart = (id) => {
        console.log("exercise id is ", id);
        console.log("id Exerciselist is ", Exerciselist);
        const check = Exerciselist.filter((it) => it.ex_em_id === id);
        let test = reduxState.carePlanRedcucer.exercises_cart.find(
            (it) => it.ex_em_id == id
        );
        if (test) {
            console.log(test)
            let temp = reduxState.carePlanRedcucer.exercises_cart.filter(
                (it) => it.ex_em_id !== id
            );
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "exercises_cart",
                    value: temp,
                },
            });
        } else {
            dispatch({ type: CARE_PLAN_ADD_TO_CART, payload: check[0] });
        }
        // setBasket([...basket,...check])
        console.log("basket id list ", basket);
        console.log("id with id check rsult", check);
        const isExist = basket.map((it) => it.ex_em_id === id);
        console.log("id check exist", isExist);
        const data = localStorage.getItem("care-plan-cart")
            ? JSON.parse(localStorage.getItem("care-plan-cart"))
            : [];
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
        //  setCartItems(data);
        console.log("cartttt items adding");
        console.log(data);
        console.log("exercise full ", fullExer);
        // let cartActualData = fullExer.filter((val) => {
        //     return data.indexOf(val.ex_em_id) !== -1;
        // });
        // console.log('exercise full ',fullExer)
        // console.log('exercise full ',cartActualData)
        setLength(reduxState.carePlanRedcucer.exercises_cart.length);
    };
    //HandleSearch
    const handleSearch = (value) => {
        setSearchVal(value);
    };
    console.log(filterDatarequired);
    const searchExercise = async (search_query) => {
        const newData = { ...checkedList };
        newData["search_query"] = search_query;
        // const data = await getFiteredExercistData(
        //   newData,
        //   dispatch,
        //   Pagination1.pageSize,
        //   1
        // );
        console.log('newdata', newData)
        const data = await getFiteredExercistData(
            newData,
            dispatch,
            Pagination1.pageSize,
            1
        );
        if (data.total_exercise) {
            data["total_exercise with applied filter"] = data.total_exercise;
        }
        const newPagData = { ...Pagination1 };
        newPagData["current"] = 1;
        newPagData["totalPage"] =
            data["total_exercise with applied filter"] / Pagination1.pageSize;
        setPagination1(newPagData);
        let tempdata = data.data.map((val) => {
            return {
                ex_em_id: val.ex_em_id,
                name: val.title ? val.title : val.name,
                instruction_array: val.instruction_array ? val.instruction_array : [],
                Rep: {
                    set: 1,
                    rep_count: 10,
                    hold_time: 10,
                },
                angle: val.angle ? val.angle : [],
                minAmp: val.minAmp,
                Rom: {
                    joint: Object.keys(val.angle)[0],
                    min: Object.values(val.angle)[0]
                        ? Object.values(val.angle)[0].min
                        : " ",
                    max: Object.values(val.angle)[0]
                        ? Object.values(val.angle)[0].max
                        : " ",
                },
                difficulty_level: val.difficulty_level,
                image_url: val.image_path ? val.image_path : val.image_url,
                video_url: val.video_path ? val.video_path : val.video_url,
            };
        });
        console.log(tempdata)
        setExerciseList(tempdata);
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "isLoading",
                value: false,
            },
        });
    };
    const searchTemplates = async (value) => {
        let res = await getSearchTemplates(value);
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "template_arr",
                value: res,
            },
        });
    };
    const Toggle = () => {
        var acc = document.getElementsByClassName("care-plan-accordion-1x");
        var panel = document.getElementsByClassName("care-plan-panel-1x")[0];
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    };
    //Exercise Tab
    const ExerciseTab = () => {
        const filteredData = Exerciselist.filter((val) => {
            if (!searchVal) return val;
            if (
                val.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                val.difficulty_level.toLowerCase().includes(searchVal.toLowerCase())
            ) {
                return val;
            }
        });
        return (
            <Row justify="space-between" className="careplan-1x">
                <Col span={24}>
                    <div className="care-plan-search-filter-main-1x">
                        <div className="care-plan-search-filter-item-1x">
                            <Search
                                allowClear
                                className="care-plan-search"
                                style={{ width: '100%' }}
                                suffix={<BsSearch />}
                                placeholder="search exercise..."
                                onChange={(e) => {
                                    searchExercise(e.target.value);
                                    setCheckedList({ ...checkedList, search_query: e.target.value });
                                    console.log("search ", e.target.value);
                                }}
                                onSearch={(e) => {
                                    searchExercise(e);
                                    setCheckedList({ ...checkedList, search_query: e });
                                    console.log("search ", e);
                                }
                                }
                            />
                        </div>
                        <div className="care-plan-search-filter-item-1x">
                            <img
                                onClick={() => Toggle()}
                                className="care-plan-accordion-1x"
                                src={filter} style={{ width: '25px', float: 'right', height: '25px', marginRight: '15px' }} />
                        </div>
                    </div>
                </Col>
                <Col className="care-plan-panel-1x" span={24}>
                    <Filter
                        setFilterData={setFilterData}
                        filterExercise={filterExercise}
                        checkedList={checkedList}
                    />
                </Col>
                {/* <Space>
            <Col span={12}>
            <Search
                allowClear
                suffix={<BsSearch />}
                placeholder="search exercise..."
                onChange={(e) => {
                  searchExercise(e.target.value);
                  setCheckedList({ ...checkedList, search_query: e.target.value });
                  console.log("search ", e.target.value);
                }}
                onSearch={(e) =>  {
                  searchExercise(e);
                  setCheckedList({ ...checkedList, search_query: e });
                  console.log("search ", e);
                  }
                }
              />

            </Col>
            <Col span={12}>
               <FaFilter />   
               </Col>
            
            </Space> */}
                {/* <Col md={12} lg={12} sm={16} sx={16}>
            </Col>
            <Col md={4} lg={4} sm={4} sx={4}>
            
            </Col> */}
                <Col span={24}>
                    <Row>
                        {!reduxState.carePlanRedcucer.isLoading &&
                            filteredData.length === 0 && <p>No Data is Found...</p>}
                        {reduxState.carePlanRedcucer.isLoading && (
                            <div style={{ margin: "10px auto" }}>
                                <Spin tip="Loading" size="large"></Spin>
                                {/* reduxState.carePlanRedcucer.exercises_cart */}
                            </div>
                        )}
                        {!reduxState.carePlanRedcucer.isLoading &&
                            filteredData.map((exercise, index) => {
                                return (
                                    <Col key={exercise.ex_em_id} md={12} lg={6} sm={12} xs={24}>
                                        <CarePlanCard
                                            cartState={
                                                reduxState.carePlanRedcucer.exercises_cart
                                                    ? reduxState.carePlanRedcucer.exercises_cart
                                                        .map((item) => item.ex_em_id)
                                                        .indexOf(exercise.ex_em_id) !== -1
                                                    : false
                                            }
                                            id={exercise.ex_em_id}
                                            Level={exercise.difficulty_level}
                                            Name={exercise.name}
                                            image={
                                                exercise.image_url
                                                    ? exercise.image_url
                                                    : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                            }
                                            UpdateCart={UpdateCart}
                                            actions={true}
                                            video={exercise.video_url ? exercise.video_url : ""}
                                        />
                                    </Col>
                                );
                            })}
                    </Row>
                    <div style={{ display: "none" }} className="pag_mob">
                        <div style={{ minHeight: "15px" }}></div>
                        <center>
                            <Pagination
                                size="small"
                                pageSize={Pagination1.pageSize}
                                current={Pagination1.current}
                                // total={Pagination1.totalPage * Exerciselist.length}
                                total={Pagination1.pageSize * Pagination1.totalPage}
                                pageSizeOptions={["2", "5", "10", "20", "50", "100"]}
                                showSizeChanger
                                onChange={PaginationChange}
                                style={{ bottom: "0px" }}
                            />
                        </center>
                        <div style={{ minHeight: "15px" }}></div>
                    </div>
                    <div className="pag_large">
                        <center>
                            <Pagination
                                pageSize={Pagination1.pageSize}
                                current={Pagination1.current}
                                // total={Pagination1.totalPage * Exerciselist.length}
                                total={Pagination1.pageSize * Pagination1.totalPage}
                                pageSizeOptions={["2", "5", "10", "20", "50", "100"]}
                                showSizeChanger
                                onChange={PaginationChange}
                                style={{ bottom: "0px" }}
                            />
                        </center>
                    </div>
                </Col>
            </Row>
        );
    };
    window.addEventListener("scroll", toggleVisible);
    //Change Page to Allocate Plan
    const ChangePageToAllocatePlan = () => {
        if (!reduxState.carePlanRedcucer.patient_name) {
            setState(false);
            alert("Please Select a Patient.");
        } else if (!reduxState.carePlanRedcucer.pp_ed_id) {
            setState(false);
            alert("Selected Patient doesn't have any active episode.");
        } else {
            setAllocatePlan(!allocatePlan);
            // updateExArr()
        }
    };
    const refreshHtml = () => { };
    //handleActiveSearch
    const handleActiveSearchResult = async (pData) => {
        let a = await getEpisodeDetails(pData, dispatch);
        console.log(a)
    };
    const AddYouTube = () => {
        let obj = {
            id: Math.floor(Math.random() * 100) + 1000,
            ex_em_id: 262,
            name: "YouTube",
            Rep: {
                set: 1,
                rep_count: 10,
                hold_time: 10,
            },
            minAmp: 20,
            Rom: {
                joint: "",
                min: 0,
                max: 100,
            },
            youtube_link: "",
            difficulty_level: "Medium",
            image_url: "",
            video_url: "",
        };
        dispatch({ type: CARE_PLAN_ADD_TO_CART, payload: obj });
    };
    return (
        <Row justify='space-between' className='main-container-1x'>
            {!allocatePlan ?
                <>
                    <Col className='h1-1x m1-1x' span={24}>
                        <img onClick={() => {
                            if (!allocatePlan) {
                                history.goBack();
                            } else setAllocatePlan(false);
                        }} src={arrow} style={{ width: '30px' }} />
                        <span className='m1-1x'>Careplan</span>
                    </Col>
                    {reduxState.Validation.episode_check === "failed" && (
                        <Col span={24}>
                            <Error error={reduxState.Validation.msg} />
                        </Col>
                    )}

                    <DetailsTab />
                    <Col className=' m1-1x div-border-1x' span={24}>
                        <Tabs
                            className="careplan_new_tabs"
                            tabBarExtraContent={operations}
                            defaultActiveKey="2"
                        >
                            <TabPane
                                tab={
                                    <span className="iconClass2">
                                        <img className='care-plan-icon-1x' src={exercise} />
                                        <span className="only-icons-sm-1x">Exercises</span>
                                    </span>
                                }
                                key="2"
                            >
                                {ExerciseTab()}
                            </TabPane>
                            <TabPane
                                tab={
                                    <span className="iconClass2">
                                        <img className='care-plan-icon-1x' src={template} />
                                        <span className="only-icons-sm-1x">Templates</span>
                                    </span>
                                }
                                key="1"
                            >
                                <Row>
                                    <Col md={12} lg={12} sm={24} sx={24}>
                                        <Search
                                            allowClear
                                            placeholder="search templates"
                                            onChange={(e) => {
                                                searchTemplates(e.target.value);
                                                console.log("search ", e.target.value);
                                            }}
                                            onSearch={(e) => console.log("search ", e.target.value)}
                                        />
                                    </Col>
                                </Row>
                                <GlobalTemplate />
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Drawer
                        className="careplan_drawer"
                        title={
                            <Row>
                                {" "}
                                <Space size="middle">
                                    {" "}
                                    Plan{" "}
                                    <Tooltip title="Add YouTube Video">
                                        <Button onClick={AddYouTube}>
                                            <Space size="small">
                                                <FaPlus /> YouTube
                                            </Space>
                                        </Button>
                                    </Tooltip>
                                </Space>
                            </Row>
                        }
                        closeIcon={<GrClose />}
                        placement="right"
                        closable={true}
                        onClose={() => {
                            setState(false);
                        }}
                        visible={state}
                        getContainer={false}
                        style={{ top: "50px" }}
                        width={"70%"}
                    >
                        <Cart
                            Exercise={reduxState.carePlanRedcucer.exercises_cart}
                            items={reduxState.carePlanRedcucer.exercises_cart.map(
                                (item) => item.ex_em_id
                            )}
                            fullExer={fullExer}
                            UpdateCart={UpdateCart}
                            ChangePageToAllocatePlan={ChangePageToAllocatePlan}
                        />
                    </Drawer>
                </> : <>   <Col className='h1-1x m1-1x' span={24}>
                    <img onClick={() => {
                        if (!allocatePlan) {
                            history.goBack();
                        } else setAllocatePlan(false);
                    }} src={arrow} style={{ width: '30px' }} />
                    <span className='m1-1x'> Allocate Careplan</span>
                </Col>
                    {reduxState.Validation.episode_check === "failed" && (
                        <Col span={24}>
                            <Error error={reduxState.Validation.msg} />
                        </Col>
                    )}

                    <DetailsTab />
                    <CareAllocatePlan
                        scrlRef={scrlRef}
                        handleChangeView={handleChangeView}
                        Exercise={fullExer}
                        items={cartItems}
                        setAllocatePlan={setAllocatePlan}
                        searchBar={searchBar}
                    />
                    
                     </>}
        </Row>

    )
}

export default Careplan1