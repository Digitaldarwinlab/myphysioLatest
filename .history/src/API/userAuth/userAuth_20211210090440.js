import {
    SIGNUP_REQUEST,
    LOGIN_REQUEST,
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS
} from "../../contextStore/actions/authAction.js";
import fetch from "isomorphic-fetch";
import Cookies from 'js-cookie';
//@signup 
//@param user Info
//@return- signup success Message.
// async () => async
export const signup = async (user, dispatch) => {
    // console.log(user,dispatch);
    dispatch({ type: SIGNUP_REQUEST });
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    user["id"] = JSON.parse(localStorage.getItem("userId"));
    try {
        const response = await fetch(process.env.REACT_APP_API + "/reset-password/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user)
        });
        
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            if (data && data.detail) {
                return [false, data.detail];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        } else {
            if (data && data.message.includes("incorrect,"))
                return [false, data.message];
            dispatch({ type: SIGNUP_SUCCESS });
            return [true];
        }
    } catch (err) {
        return [false, "Error 403: " + err.message];

    }
}

//@signin
//@param user Info 
//@return- Authentication token
// async () => async 
export const signin = async (user, dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/login/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            if (data && data.detail) {
                return [false, "Invalid Login Credentials!"];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        } else {
            AddCookies("jwt", data.jwt);
            if (data.first_time) {
                localStorage.setItem("userId", JSON.stringify(data.user_id));
                return [false, "Please Change Your Password."];
            }
            AddUserInfo(data.jwt, { role: data.role, info: data.basic_info }, data.user_id);
            dispatch({ type: LOGIN_SUCCESS });
            return [true];
        }
    } catch (err) {
        return [false, err.message + " ,please try after some time."];
    }
    // dispatch({type:LOGIN_SUCCESS});
    // AddUserInfo("12344",{role:1,email:user.email});  //(jwtToken,userInfo)
}
//Forgot Password
//@param username  
export const forgotPassword = async (user) => {
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    console.log(user)
    try {
        const response = await fetch(process.env.REACT_APP_API + "/password_reset/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ uid: user })
        });

        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            if (data && data.detail) {
                return [false, "Email Doesn't Exist."];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        } else if (data && data.message) {
            return [true];
        }
        return [false, "Error " + response.status + response.statusText];
    } catch (err) {
        return [false, err.message];
    }
    // dispatch({type:LOGIN_SUCCESS});
    // AddUserInfo("12344",{role:1,email:user.email});  //(jwtToken,userInfo)
}
// Reset Password Confirm
export const postNewPassword = async (user) => {
   // console.log(user)
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/password_reset_confirm/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user)
        });
        
        const data = await response.json();
        
        
        if (response.status !== 200 && response.status !== 201) {
            if (data && data.detail) {
                return [false, "Error " + response.status + response.statusText];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        } else if (data && data.messge) {
            return [true];
        }
        return [false, "Error " + response.status + response.statusText];
    } catch (err) {
        return [false, err.message];
    }
}

export const admin_password_reset=async(detail)=>{
    console.log(detail)
    const newdata={
        id:detail.userid,
        uid:detail.temp_uid,
        new_password:detail.new_password
    }
    console.log(newdata)
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/password_reset_by_admin/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newdata)
        });
        
        const data = await response.json();
        console.log(data)
        if (response.status !== 200 && response.status !== 201) {
            
            if (data && data.detail) {
                
                return [false, "Error " + response.status + response.statusText];
            } else {
                return [false, "Error " + response.status + response.statusText];
            }
        } else if (data && data.message) {
            console.log('true returning')
            return [true];
        }
        return [false, "Error " + response.status + response.statusText];
    } catch (err) {
        return [false, err.message];
    }

}

export const logout = async () => {
    RemoveCookie("jwt");
    try {
        const data = await fetch(process.env.REACT_APP_API + "/logout/", {
            mehtod: "POST"
        })
        return [true];
    } catch (err) {
        console.log(err);
    }
}
//@param user,token
//Add User Data into localstorage after login.
const AddUserInfo = (token, user, user_id) => {
    localStorage.setItem("jwt", JSON.stringify(token))
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", JSON.stringify(user_id));
}
//get userData
export const getUserData = () => {
    try {
        let data = JSON.parse(localStorage.getItem("user"));
        return data.role;
    } catch (err) {
        console.log(err);
        return "";
    }
}
//Authentication
export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt"))
        return JSON.stringify(localStorage.getItem("jwt"));
    return false;
}
//Add Cookies 
const AddCookies = (key, value) => {
    Cookies.set(key, value, { expires: 1 });
}
//Remove Cookies 
const RemoveCookie = (key) => {
    Cookies.remove(key);
}