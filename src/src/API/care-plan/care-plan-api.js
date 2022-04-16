// import Exercise from "./../../components/UtilityComponents/dummyData/care-plan-dummy-data/Exercises.json";
import { encode } from 'js-base64';
import { Decode, Encode } from '../../Encode/hashing';
import {
    CARE_PLAN_SUCCESS,
    CARE_PLAN_FAILURE,
    CARE_PLAN_POST_DATA,
    FETCH_DATA,
    FILTER_DATA
} from './../../contextStore/actions/care-plan-action';
//@func care-plan exercise data 
//@output List of Exercise Data
export const GetExerciseList = async (dispatch, pageSize, current) => {
    dispatch({ type: FETCH_DATA });
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const encodedData = Encode({
            "page_no": current,
            "page_size": pageSize
        })
        const response = await fetch(process.env.REACT_APP_API + "/get-exercise_v1/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(encodedData)
        });
        
        const responseData = await response.json();
        const exerciresponseData = Decode(responseData);
      //  console.log(exerciresponseData)
        // console.log(exerciresponseData);
        if (response.status === 200 || response.status === 201)
            return exerciresponseData;
        return { data: [], total_exercise: 0 };

    } catch (err) {
        return { data: [], total_exercise: 0 };
    }
}
//@func care-plan exercise filter api
//@param filter lists Data
//@output filtered Data
export const getFiteredExercistData = async (data, dispatch, pageSize, current) => {
    dispatch({ type: FILTER_DATA });
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json",

    }
    data["page_no"] = current;
    data["page_size"] = pageSize;
    const encodedData = Encode(data);
    try {
        const response = await fetch(process.env.REACT_APP_API + "/exercise-filter_v1/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(encodedData)
        });
        if (response.status !== 200 && response.status !== 201) {
            // console.log(response.statusText)
            return { data: [], total_exercise: 0 };
        }
        const responseData = await response.json();
        const filteredData = Decode(responseData);
        return filteredData;
    } catch (err) {
        // console.log(err);
        return { data: [], total_exercise: 0 };
    }
}


//Allocate Data 
const AllocateExerciseData = (data) => {
    return {
        pp_ed_id: data.pp_ed_id,
        exercise_details: data.exercises,
        timeSlots: data.timeSlots,
        count_time_slots: data.count_time_slots,
        startDate: data.startDate,
        endDate: data.endDate,
        status_flag: data.status_flag?2:1
    };
}
//@func care-plan exercise allocation api
//@param details
//@output message
export const postCarePlanAllocation = async (data, dispatch) => {
    dispatch({ type: CARE_PLAN_POST_DATA });
    let newData = AllocateExerciseData(data);
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const encodedData = Encode(newData)
        const response = await fetch(process.env.REACT_APP_API + "/add-care-plan_v1/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(encodedData)
        });

        const responseData = await response.json();
        const result = Decode(responseData)
        if (response.status !== 200 && response.status !== 201)
            return [false, "Error: " + response.status + " " + response.statusText];
        if (result && result.message) {
            dispatch({ type: CARE_PLAN_SUCCESS });
            return [true];
        } else {
            dispatch({ type: CARE_PLAN_FAILURE });
            return [false, "Error: " + response.status + " " + response.statusText];
        }
    } catch (err) {
        dispatch({ type: CARE_PLAN_FAILURE });
        return [false, "Error 501: Internal Server Error"];
    }
}

export const EditCarePlanAllocation = async (data, dispatch, careplan_code) => {
    dispatch({ type: CARE_PLAN_POST_DATA });
    let newData = AllocateExerciseData(data);
    newData["careplan_code"] = data.editCareplanCode
    newData["startDate"] = data.editEndDate
    newData["endDate"] = data.endDate.length>0?data.endDate:data.editStateDate
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const encodedData = Encode(newData)
        const response = await fetch(process.env.REACT_APP_API + "/update_care_plan_details/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(encodedData)
        });

        const responseData = await response.json();
        const result = Decode(responseData)
        if (response.status !== 200 && response.status !== 201)
            return [false, "Error: " + response.status + " " + response.statusText];
        if (result && result.message) {
            dispatch({ type: CARE_PLAN_SUCCESS });
            return [true];
        } else {
            dispatch({ type: CARE_PLAN_FAILURE });
            return [false, "Error: " + response.status + " " + response.statusText];
        }
    } catch (err) {
        dispatch({ type: CARE_PLAN_FAILURE });
        return [false, "Error 501: Internal Server Error"];
    }
}

//EditCarePlanAllocation