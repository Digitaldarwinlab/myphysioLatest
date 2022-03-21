import { PHYSIO_REGISTER_REQUEST, PHYSIO_REGISTER_SUCCESS, PHYSIO_STATE_CHANGE, PHYSIO_UPDATE_SUCCESS } from "./../../contextStore/actions/physioRegAction";
import fetch from "isomorphic-fetch";
//@Register Physio 
//@param Physio details
//@return- Message.
export const physioRegister = async (details, dispatch) => {
    const { email } = details;
    const tempData = { ...details };
    delete tempData["email"];
    delete tempData["isLoading"];
    delete tempData["success"];
    delete tempData["id"];

    const physioData = {
        user: {
            email
        },
        profile: {
            ...tempData
        }
    }
    if (physioData["regd_no_2"] === "") {
        delete physioData.profile["regd_no_2"];
    }
    if (physioData.profile["middle_name"] === "") {
        delete physioData.profile["middle_name"];
    }
    if (physioData.profile["landline"] === "")
        delete physioData.profile["landline"];

    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }

    dispatch({ type: PHYSIO_REGISTER_REQUEST });
    try {
        const response = await fetch(process.env.REACT_APP_API + "/register_physio/", {
            credentials: 'same-origin',
            method: "POST",
            headers: headers,
            body: JSON.stringify(physioData)
        });
        const data = await response.json();
        if (data && data.role) {
            dispatch({ type: PHYSIO_REGISTER_SUCCESS });
            return [true];
        } else {
            if (data) {
                const values = Object.values(data);
                if (values.length === 0)
                    return [false, "Check if any field is not empty"];
                else
                    return [false, values[0]];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        }
    } catch (err) {
        return [false, "Error 501: Internal Server Error. Try After Some Time."];
    }
    // console.log(details,dispatch);
    // dispatch({type:PHYSIO_REGISTER_SUCCESS});
}
//@Update Physio 
//@param Physio details
//@return- Message.
export const physioUpdate = async (details, dispatch) => {
    const tempData = { ...details };
    delete tempData["isLoading"];
    delete tempData["success"];
    delete tempData["status_flag"];
    delete tempData["end_date"];
    tempData["start_date"] = new Date(tempData["start_date"]).toISOString();

    if (tempData["regd_no_2"] === "") {
        delete tempData["regd_no_2"];
    }
    if (tempData["middle_name"] === "") {
        delete tempData["middle_name"];
    }
    if (tempData["landline"] === "")
        delete tempData["landline"];

    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }

    dispatch({ type: PHYSIO_REGISTER_REQUEST });
    try {
        const response = await fetch(process.env.REACT_APP_API + "/update_profile/", {
            credentials: 'same-origin',
            method: "PUT",
            headers: headers,
            body: JSON.stringify(tempData)
        });
        const data = await response.json();
        if (data && data.message) {
            dispatch({ type: PHYSIO_UPDATE_SUCCESS });
            return [true];
        } else {
            if (data) {
                const values = Object.values(data);
                if (values.length === 0)
                    return [false, "Check if any field is not empty"];
                else
                    return [false, values[0]];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        }
    } catch (err) {
        return [false, "Error 501: Internal Server Error. Try After Some Time."];
    }
    // console.log(details,dispatch);
    // dispatch({type:PHYSIO_REGISTER_SUCCESS});
}
//search-physio
// Physio Name Value
export const searchPhysio = async (value) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }

        const response = await fetch(process.env.REACT_APP_API + "/physio-filter/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ query: value })
        });
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            return [];
        }
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}
////get-physio
export const getPhysioList = async () => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const id = JSON.parse(localStorage.getItem("userId"))

        const response = await fetch(process.env.REACT_APP_API + "/get_physio/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: id })
        });
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            return [];
        }
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}
//Update State of Patient 
export const UpdatePhysioState = (val, dispatch) => {
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "first_name",
            value: val.first_name
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "middle_name",
            value: val.middle_name !== null ? val.middle_name : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "last_name",
            value: val.last_name
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "mobile_no",
            value: val.mobile_no
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "whatsapp_no",
            value: val.whatsapp_no
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "landline",
            value: val.landline
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "Doctor_type",
            value: val.Doctor_type
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "Address_1",
            value: val.Address_1
        }
    })

    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "Address_2",
            value: val.Address_2
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "Address_3",
            value: val.Address_3
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "email",
            value: val.email
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "city",
            value: val.city
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "state",
            value: val.state
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "country",
            value: val.country
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "facebook",
            value: val.facebook ? val.facebook : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "linkedin",
            value: val.linkedin ? val.linkedin : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "regd_no_1",
            value: val.regd_no_1
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "regd_no_2",
            value: val.regd_no_2 ? val.regd_no_2 : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "degree",
            value: val.degree ? val.degree : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "expertise_1",
            value: val.expertise_1 ? val.expertise_1 : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "expertise_2",
            value: val.expertise_2 ? val.expertise_2 : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "expertise_3",
            value: val.expertise_3 ? val.expertise_3 : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "gender",
            value: val.gender ? val.gender : ""
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "start_date",
            value: new Date(val.start_date).toISOString().slice(0, 10)
        }
    })
    dispatch({
        type: PHYSIO_STATE_CHANGE,
        payload: {
            key: "id",
            value: val.pp_pm_id ? val.pp_pm_id : ""
        }
    })
}