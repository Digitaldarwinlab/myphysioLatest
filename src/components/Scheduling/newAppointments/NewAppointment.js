import React,{useState} from "react";
import {Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {SCHEDULE_STATECHANGE,APPOINTMENT_BOOK_SUCCESS} from "./../../../contextStore/actions/scheduleAction.js";
import {VALIDATION} from "./../../../contextStore/actions/authAction.js";
import appointmentValid from "./../../Validation/scheduleValidation/scheduleValidation.js";
import Error from "./../../UtilityComponents/ErrorHandler.js";
// import {bookAppointment} from "./../../../API/Schedule/schedule.js";
import SchduleForm from './../../UtilityComponents/SchduleForm';
import { useHistory } from 'react-router-dom';

const NewAppointment = (props) => {
    const [startDateState,setStartDateState] = useState("");
    const [endDateState,setEndDateState] = useState("");
    const state = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleChange = (key,value) => {
        if(key === "start_date" || key === "end_date"){
            if(key === 'start_date')
                setStartDateState(value.date);
            else
                setEndDateState(value.date);
            
            dispatch({
                type:SCHEDULE_STATECHANGE,
                payload:{
                    key,
                    value:value.dateString
                }
            })
        }else{
            dispatch({
                type:SCHEDULE_STATECHANGE,
                payload:{
                    key,
                    value
                }
            })
        }
        dispatch({type:"NOERROR"});
    }

    const handleBlur = (e) => {
        const {name,value} = e.target;
        let error;
        if(name === "start_date"){
            error = appointmentValid.checkStartDate(value);
        }
        else if(name === "end_date"){
            error = appointmentValid.checkEndDate(value);
        }
        else if(name === "type"){
            error = appointmentValid.checkType(value);
        }
        else if(name === "status"){
            error = appointmentValid.checkStatus(value);
        }
        else if(name === "location"){
            error = appointmentValid.checkLocation(value);
        }
        else{
            error = appointmentValid.checkReason(value);
        }
        if(error.error){
            dispatch({type:VALIDATION,payload:{error:error.error}});
        }
    }


    const handleSubmit = (e) => {
        if(state.Validation.error){
            alert("Please Fill all the Fields");
        }else{
            dispatch({type:APPOINTMENT_BOOK_SUCCESS});
            history.push("/appointments");
        }
    }

    return (
        <Modal title="Add Visit" 
            visible={props.modelShow} 
            onCancel={props.handleCancel}  
            footer={null}
            centered>
            {state.Validation.error && <Error error={state.Validation.error} />} 
            <SchduleForm 
                episode={false} 
                handleSubmit={handleSubmit} 
                handleChange={handleChange} 
                handleBlur={handleBlur} 
                state = {state.scheduleReducer}  
                startDateState={startDateState}
                endDateState={endDateState}  
            />  
        </Modal>
    )
}

export default NewAppointment;