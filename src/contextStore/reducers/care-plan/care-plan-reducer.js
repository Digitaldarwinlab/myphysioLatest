import {
    FETCH_DATA,
    FILTER_DATA,
    RECEIVED_DATA,
    CARE_PLAN_STATE_CHANGE,
    CARE_PLAN_REP_CHANGE,
    CARE_PLAN_ROM_CHANGE,
    CARE_PLAN_TIME_CHANGE,
    CARE_PLAN_POST_DATA,
    CARE_PLAN_SUCCESS,
    CARE_PLAN_FAILURE,
    CARE_PLAN_CLEAR_STATE,
    CARE_PLAN_ADD_TO_CART
} from './../../actions/care-plan-action';

const initialState = {
    pp_ed_id: "",
    patient_name: "",
    episode_start_date: "",
    patient_code:"",
    angle:"",
    patient_main_code:"",
    complaint: "",
    episode_name: "Neck Pain",
    startDate: "",
    endDate: "",
    exercises: [],
    timeSlots: [],
    isLoading: false,
    count_time_slots: 3,
    success: "",
    episode_number:'',
    exercises_cart:[],
    status_flag:false
}
// const setExerise=(exe)=>{
//     let newList = [...state.exercises_cart]
// }
//Exercise Change 
const ExerciseUpdate = (list, key1, key2, value, index) => {
    let newList = [...list];
    newList[index][key1][key2] = value;
    return newList;
}
//timeSlots 
const getTimeSlots = (list, time, index) => {
    let newList = [...list];
    if (index + 1 > list.length)
        newList.push(time);
    else
        newList[index] = time;
    return newList;
}
export const carePlanRedcucer = (state = initialState, action) => {
    switch (action.type) {
        case CARE_PLAN_STATE_CHANGE:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case CARE_PLAN_REP_CHANGE:
            return {
                ...state,
                exercises: ExerciseUpdate(state.exercises, "Rep", action.payload.key, action.payload.value, action.payload.index)
            }
        case CARE_PLAN_ROM_CHANGE:
            return {
                ...state,
                exercises: ExerciseUpdate(state.exercises, "Rom", action.payload.key, action.payload.value, action.payload.index)
            }
        case CARE_PLAN_TIME_CHANGE:
            return {
                ...state,
                timeSlots: getTimeSlots(state.timeSlots, action.payload.value, action.payload.index)
            }
        case CARE_PLAN_POST_DATA:
            return {
                ...state,
                isLoading: true,
                success: ""
            }
        case CARE_PLAN_SUCCESS:
            return {
                ...initialState,
                exercises: state.exercises,
                isLoading: false,
                success: "Care Plan Added Successfully"
            }
        case CARE_PLAN_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: ""
            }
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true
            }
        case FILTER_DATA:
            return {
                ...state,
                isLoading: true
            }
        case RECEIVED_DATA:
            return {
                ...state,
                isLoading: false
            }
        case CARE_PLAN_CLEAR_STATE:
            return {
                ...initialState
            }
        case CARE_PLAN_ADD_TO_CART:
            return {
                ...state,
                exercises_cart:[...state.exercises_cart,action.payload]
            }
        default:
            return {
                ...state
            }
    }
}