/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import Switch from "react-switch";
import { useState, useEffect } from "react";
import CarePlanCard from './../care-plan-card/Card';
import { Row, Col, Form, InputNumber, Button, Checkbox, Space } from 'antd';
import FormDate from './../../UI/antInputs/FormDate';
import { useSelector, useDispatch } from 'react-redux';
import { CARE_PLAN_ROM_CHANGE, CARE_PLAN_REP_CHANGE, CARE_PLAN_STATE_CHANGE, CARE_PLAN_TIME_CHANGE } from "../../../contextStore/actions/care-plan-action";
import { postCarePlanAllocation } from './../../../API/care-plan/care-plan-api';
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import TimePickerComp from './TimePickerComp';
import Loading from './../../UtilityComponents/Loading';
import Success from './../../UtilityComponents/SuccessHandler';
import Error from './../../UtilityComponents/ErrorHandler';
import { VALIDATION } from "../../../contextStore/actions/authAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import { Switch } from "react-router-dom";


const CareAllocatePlan = ({ Exercise, items, searchBar, handleChangeView }) => {
    const [startDate, setStartDate] = useState("");
    const [aiState, setAIState] = useState(false)
    const [endDate, setEndDate] = useState("");
    const [countArray, setCountArray] = useState([]);
    const state = useSelector(state => state.carePlanRedcucer);
    const validationState = useSelector(state => state.Validation);
    const dispatch = useDispatch();
    const [selectvalue, Setselectvalue] = useState([])
    const history = useHistory()
    useEffect(() => {

        let timeSlots = changeTimeSlots(state.count_time_slots);


        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "timeSlots",
                value: timeSlots
            }
        })
        let arr = [];
        for (let i = 0; i < state.count_time_slots; i++) {
            arr.push(i);
        }

        setCountArray(arr);
        //  console.log('slot changing')
        //   console.log(state)
    }, [state.count_time_slots]);

    useEffect(() => {

        if (!searchBar) {
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key: "success",
                    value: ""
                }
            })
        }
        let arr = [];
        for (let i = 0; i < state.count_time_slots; i++) {
            arr.push(i);
        }

        setCountArray(arr);
        let array = Exercise.filter((val) => {
            if (items.indexOf(val.ex_em_id) !== -1)
                return val
        });

        console.log(array)
        array = array.map((val) => {
            console.log('array having items of carts', Object.values(val.angle)[0].min)
            console.log('array having items of carts', Object.values(val.angle)[0].max)
            return {
                ex_em_id: val.ex_em_id,
                name: val.title ? val.title : "Exercise",
                Rep: {
                    set: 1,
                    rep_count: 5,
                    hold_time: 5
                },
                angle: val.angle ? val.angle : [],
                Rom: {
                    joint: val.joint ? val.joint : "nose",
                    min: (val.angle && Object.values(val.angle)[0].min) && Object.values(val.angle)[0].min,
                    max: (val.angle && Object.values(val.angle)[0].max) && Object.values(val.angle)[0].max,
                },
                image_url: val.image_path,
                video_url: val.video_path
            };
        });

        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: "exercises",
                value: array
            }
        })

    }, [])
    const changeTimeSlots = (val) => {
        let timeSlots = [];
        if (val === 1)
            timeSlots = ["10:00 am"];
        else if (val === 2)
            timeSlots = ["10:00 am", "1:00 pm"];
        else if (val === 3)
            timeSlots = ["10:00 am", "01:00 pm", "04:00 pm"]
        else if (val === 4)
            timeSlots = ["10:00 am", "01:00 pm", "04:00 pm", "07:00 pm"];
        else if (val === 5) {
            timeSlots = ["10:00 am", "12:00 pm", "2:00 pm", "04:00 pm", "06:00 pm"];
        } else {
            timeSlots = ["10:00 am", "12:00 pm", "2:00 pm", "04:00 pm", "06:00 pm", "08:00 pm"];
        }
        return timeSlots;
    }



    const handleChange = (key, value, id = 0) => {

        console.log(key + ' : ' + value + ' : ' + id)
        if (key === "startDate") {

            //   console.log('state Date : '+ value.date)
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key,
                    value: value.dateString
                }
            })
        } else if (key === "endDate") {

            //  console.log('end Date : '+ value.dateString)
            //  console.log(value.dateString)
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key,
                    value: value.dateString
                }
            })
        } else if (key === "count_time_slots") {
            console.log('CHANGING SLOTT')
            //   console.log(key + ' : ' + value + ' : ' + id)
            dispatch({
                type: CARE_PLAN_STATE_CHANGE,
                payload: {
                    key,
                    value,
                    index: id
                }
            });
        } else if (key === "set" || key === "rep_count" || key === "hold_time") {
            dispatch({
                type: CARE_PLAN_REP_CHANGE,
                payload: {
                    key,
                    value,
                    index: id
                }
            })
        } else if (key === "min" || key === "max") {

            dispatch({
                type: CARE_PLAN_ROM_CHANGE,
                payload: {
                    key, value, index: id
                }
            })
        }
        else if (key === "joint") {

            console.log('inside joint elsief')
            console.log(state.exercises[id])
            let joint_min = state.exercises[id]['angle'][value]['min']
            let joint_max = state.exercises[id]['angle'][value]['max']
            console.log('joint min' + joint_min)
            console.log('joint max' + joint_max)
            dispatch({
                type: CARE_PLAN_ROM_CHANGE,
                payload: {
                    key: 'min', value: joint_min, index: id
                }
            })
            dispatch({
                type: CARE_PLAN_ROM_CHANGE,
                payload: {
                    key: 'max', value: joint_max, index: id
                }
            })

            // console.log('sleected inside onchange')
            if (selectvalue.length == 0) {
                let temparray = selectvalue
                temparray.push({ id: id, value: value })
                Setselectvalue(temparray)

            }
            else {
                let ispresent = false || selectvalue.map((item) => {
                    if (item.id !== id) {

                        return true
                        /*
                        console.log('already present')
                        let obj={id:id,value:value}
                        let temparray=selectvalue.push(obj)
                        Setselectvalue(temparray)
                        */
                    }

                    else {   /*
                        console.log('not present index')
                        let obj1={id:id,value:value}
                        let temparray1=selectvalue
                        temparray1[id]=obj1
                        Setselectvalue(temparray1)
                        */
                    }
                })
                if (ispresent) {
                    let obj1 = { id: id, value: value }
                    let temparray1 = selectvalue
                    temparray1[id] = obj1
                    Setselectvalue(temparray1)
                }
                else {
                    //     console.log('already present')
                    let obj = { id: id, value: value }
                    let temparray = selectvalue.push(obj)
                    Setselectvalue(temparray)
                }

            }

            //  console.log('final array aayi hui')
            //   console.log(selectvalue)
            /*
            dispatch({
                type: CARE_PLAN_ROM_CHANGE,
                payload: {
                    key, value, index: id
                }
            })

            */
        }
        else if (key === "timeSlots") {

            dispatch({
                type: CARE_PLAN_TIME_CHANGE,
                payload: {
                    key, value: value, index: id
                }
            })
        }
    }

    useEffect(() => {

        //    console.log('joint selected is : ' + selectvalue)
    }, [selectvalue])

    const addjoint = (key, value, id) => {
        dispatch({
            type: CARE_PLAN_ROM_CHANGE,
            payload: {
                key, value, index: id
            }
        })

    }

    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');
        console.log(" hours" + hours);
        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM' || modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        console.log("updated hours" + hours);
        return `${hours}${minutes}`;
    }



    //OnFinish 
    const onFinish = async () => {

        console.log(' joints array', state.exercises)
        for (let i = 0; i < state.exercises.length; i++) {
            if (parseInt(state.exercises[i].Rom['min']) > parseInt(state.exercises[i].Rom['max'])) {
                dispatch({ type: VALIDATION, payload: { error: 'Min angle should not greater than Max angle' } });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 10000);
                return
            }
        }
        console.log(selectvalue)
        console.log('selection ', state.exercises)
        for (let i = 0; i < state.exercises.length; i++) {
            if (state.exercises[i].Rep['set'] == '' || state.exercises[i].Rep['set'] == 0) {
                console.log('Set count should greater than 0')
                dispatch({ type: VALIDATION, payload: { error: 'Repetition Set should greater than 0' } });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 10000);
                return
            }
            if (state.exercises[i].Rep['rep_count'] < 2) {
                console.log('Repetition Count should greater than 2')
                dispatch({ type: VALIDATION, payload: { error: 'Repetition Count should greater than 1 ' } });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 10000);
                return
            }

        }

        if (state.startDate && state.endDate) {
            const starttime = new Date(state.startDate)
            const endtime = new Date(state.endDate)
            if (endtime.getTime() < starttime.getTime()) {
                dispatch({ type: VALIDATION, payload: { error: 'Start Date should be previous than end Date' } });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 3000);
                return false
            }


        }

        var istimeValidated = true;
        var i = 0;
        console.log(state.timeSlots)
        for (i = 0; i < state.timeSlots.length; i++) {
            console.log(state.timeSlots[i])
            if (i != 0) {
                let newTime = convertTime12to24(state.timeSlots[i]);
                console.log('new time : ' + newTime + '  : ' + state.timeSlots[i])
                let preTime = convertTime12to24(state.timeSlots[i - 1]);
                //                console.log('isvalidte : ' + istimeValidated)
                console.log(preTime + '  ;  ' + newTime)
                if (parseInt(newTime) <= parseInt(preTime)) {
                    console.log('inside false')
                    istimeValidated = false;
                }
            }

            [1, 2, 3]
        }
        console.log('inside false' + istimeValidated)
        if (istimeValidated) {
            if (selectvalue.length > 0) {



                //  console.log(state.exercises.length + 'length haiii')
                selectvalue.map((item, index) => {

                    if (item.value > 1) {
                        addjoint('joint', item.value[0], item.id)
                    }
                    else {
                        addjoint('joint', item.value, item.id)
                    }

                })

                var z;
                for (z = 0; z < state.exercises.length; z++) {
                    if (typeof (state.exercises[z]['Rom']['joint']) === 'object') {
                        addjoint('joint', state.exercises[z]['Rom']['joint'][0], z)
                    }
                }



            }

            else if (selectvalue.length == 0) {
                state.exercises.map((item, index) => {
                    //   console.log(item)
                    //   console.log( "valueeee",item.name + ' : ' + JSON.stringify(item['Rom']['joint'][0]))
                    addjoint('joint', item['Rom']['joint'][0], index)

                })



                //  console.log('final state isss')
                //   console.log(state)


            }

            const result = await postCarePlanAllocation(state, dispatch);




            if (result && result[0]) {
                localStorage.setItem("care-plan-cart", JSON.stringify([]));
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    dispatch({
                        type: CARE_PLAN_STATE_CHANGE,
                        payload: {
                            key: "success",
                            value: ""
                        }
                    })
                    if (searchBar) {
                        dispatch({ type: VALIDATION, payload: { error: "" } });
                        //window.location.href = "/dashboard";
                        history.push('/dashboard')
                    } else {
                        handleChangeView();
                    }
                }, 1000);
            } else {
                dispatch({ type: VALIDATION, payload: { error: result[1] } });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 3000);
            }
        }

        else {
            dispatch({ type: VALIDATION, payload: { error: 'Time slots should be in ascending order' } });

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setTimeout(() => {
                dispatch({ type: VALIDATION, payload: { error: "" } });
            }, 10000);

        }
    }
    const changeToggle = () => {
        dispatch({
            type: CARE_PLAN_STATE_CHANGE,
            payload: {
                key: 'status_flag',
                value: !state.status_flag
            }
        })
    }
    const [repcheck, setRepCheck] = useState(false)
    return (
        <Form layout="vertical" onFinish={onFinish} className="px-1 py-1">
            {state.isLoading && <Loading />}
            {state.success && <Success success={state.success} />}
            {validationState.error && <Error error={validationState.error} />}
            <Row >
                {/* <Switch defaultChecked /> */}
                <Space size={"middle"}>
                    <span>AI-Mode {"  "}</span>
                    <Switch
                        // uncheckedIcon={<AiOutlineClose size={20}/>}
                        // checkedIcon={<FaCheck size={20}/>}
                        onColor="#2d7ecb"
                        checked={state.status_flag}
                        onChange={() => changeToggle()} />
                    {state.status_flag ? <span>Activated {"  "}</span> :
                        <span>Not-Activated {"  "}</span>}
                </Space>
            </Row>
            <div style={{ minHeight: "10px" }}></div>
            <Row gutter={[10, 10]}>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <FormDate
                        label="Start Dates"
                        name="startDate"
                        className="input-field"
                        required={true}
                        placeholder="Start Date"
                        value={startDate}
                        onChange={handleChange}
                        disabledDate={true}
                    />
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <FormDate
                        label="End Date"
                        className="input-field"
                        name="endDate"
                        required={true}
                        placeholder="End Date"
                        value={endDate}
                        onChange={handleChange}
                        disabledDate={true}
                    />
                </Col>
                {
                    Exercise.filter((val) => {

                        if (items.indexOf(val.ex_em_id) !== -1)
                            return val
                    }).map((exercise, index) => {
                        return (
                            <Col key={exercise.ex_em_id} md={12} lg={8} sm={12} xs={24}>
                                <CarePlanCard
                                    cartState={items ? items.indexOf(exercise.ex_em_id) !== -1 : false}
                                    id={exercise.ex_em_id}
                                    Level={exercise.difficulty_level}
                                    Name={exercise.title}
                                    image={exercise.image_path ? exercise.image_path : "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
                                    video={exercise.video_path ? exercise.video_path : ""}
                                    actions={false}
                                    handleChange={handleChange}
                                    index={index}
                                    Setselectvalue={Setselectvalue}
                                    repcheck={repcheck}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
            {repcheck ? "value not less than 2" : null}
            <Row gutter={[10, 10]}>
                <Col lg={8} md={8} sm={8} xs={16}>
                    <Form.Item style={{ width: '80%' }} name="count_time_slots" label="Number of Time Slots" required={true}
                        className="m-2">
                        <InputNumber
                            min={1} max={6}
                            defaultValue={state.count_time_slots}
                            onChange={(value) => handleChange("count_time_slots", value)}
                            style={{ width: '100%' }}
                        // className="w-75 m-1"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[10, 10]}>

                {
                    countArray.length !== 0 && (
                        countArray.map((val, index) => {

                            return (
                                <Button style={{ display: "flex", justifyContent: "space-between", marginRight: "10px", marginLeft: "6px" }}>
                                    <TimePickerComp showWatch={true} state={state} handleChange={handleChange} key={index} index={index} />
                                </Button>
                            )
                        })
                    )
                }
            </Row>

            <Button style={{ marginTop: "22px" }} size="large" className="mb-3 btncolor" htmlType="submit">Submit</Button>
        </Form>
    )
}
export default CareAllocatePlan;