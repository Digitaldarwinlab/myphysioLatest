import {
    APPOINTMENT_BOOK_REQUEST,
    APPOINTMENT_BOOK_SUCCESS,
} from "../../contextStore/actions/scheduleAction.js";
//@bookAppointment 
//@param appointment details
//@return- Message.
export const bookAppointment = (details,dispatch) =>{
    dispatch({type:APPOINTMENT_BOOK_REQUEST});
    console.log(details,dispatch);
    dispatch({type:APPOINTMENT_BOOK_SUCCESS});
}
