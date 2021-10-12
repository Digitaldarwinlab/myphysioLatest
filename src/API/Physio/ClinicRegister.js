import { 
    CLINIC_REGISTER_REQUEST,
    CLINIC_REGISTER_SUCCESS
} from "../../contextStore/actions/ClinicRegister";
//@Register Clinic 
//@param Clinic details
//@return- Message.
export const clinicRegisterApi = (details,dispatch) =>{
    dispatch({type: CLINIC_REGISTER_REQUEST });
    console.log(details,dispatch);
    dispatch({type:CLINIC_REGISTER_SUCCESS});
}