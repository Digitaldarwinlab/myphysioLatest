import { VALIDATION } from "../../contextStore/actions/authAction";
import {
  CLINIC_REGISTER_REQUEST,
  CLINIC_REGISTER_SUCCESS,
  CLINIC_REGISTER_FAILED
} from "../../contextStore/actions/ClinicRegister";
import { Decode, Encode } from "../../Encode/hashing";
//@Register Clinic
//@param Clinic details
//@return- Message.
let labels = {
  name: "Name: ",
  address_1: "Address 1: ",
  address_2: "Address 2: ",
  address_3: "Address 3: ",
  city: "City: ",
  state: "State: ",
  country: "Country: ",
  zip: "Zip: ",
  estab_date: "Estb: ",
  mobile_no: "Mobile: ",
  landline_no: "Lanline: ",
  whatsapp_no: "WhatsApp: ",
  email: "E#mail: "
};
export const clinicRegisterApi = async (details, dispatch) => {
  let body = {
    name: details.name,
    address_1: details.address_1,
    address_2: details.address_2,
    address_3: details.address_3,
    city: details.city,
    state: details.state,
    country: details.country,
    zip: details.zip,
    estab_date: details.estab_date,
    mobile_no: details.mobile_no.replaceAll(/\s/g,''),
    landline_no: details.landline_no,
    whatsapp_no: details.whatsapp_no,
    email: details.email,
  };
  dispatch({ type: CLINIC_REGISTER_REQUEST });
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  const encodedData = Encode(body);
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/add-clinic_v1/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(encodedData),
      }
    );
    const responseData = await response.json();
    const data = Decode(responseData);
    console.log("details ", data)
    if(data.message){
      dispatch({ type: CLINIC_REGISTER_SUCCESS, payload : { msg : 'Clinic Registered SuccessFully.' } });
    return true
    }
    if(Object.keys(data).length>0){
      dispatch({ type: CLINIC_REGISTER_FAILED });
      Object.keys(data).map(item=>{
        dispatch({ type: VALIDATION, payload: {error :labels[item]?labels[item]:item+" "+data[item][0]} });
      })
      return false
    }
//CLINIC_REGISTER_FAILED
  } catch (error) {
    console.log(error)
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
}

};

export const clinicUpdateApi = async (details, dispatch) => {
  let body = {
    id:details.pp_cm_id,
    name: details.name,
    address_1: details.address_1,
    address_2: details.address_2,
    address_3: details.address_3,
    city: details.city,
    state: details.state,
    country: details.country,
    zip: details.zip,
    estab_date: details.estab_date,
    mobile_no: details.mobile_no,
    landline_no: details.landline_no,
    whatsapp_no: details.whatsapp_no,
    email: details.email,
  };
  dispatch({ type: CLINIC_REGISTER_REQUEST });
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  const encodedData = Encode(body);
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/update_clinic_v1/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(encodedData),
      }
    );
    const responseData = await response.json();
    const data = Decode(responseData);
    console.log("clinic data ",data)
  // dispatch({ type: VALIDATION, payload: "etrrrpo tests"});
  
  if(!data.error){
    dispatch({
      type: CLINIC_REGISTER_SUCCESS,
      payload: {
        value: data.message
      },
    });
    return true
  }
    if(Object.keys(data).length>0){
      dispatch({ type: CLINIC_REGISTER_FAILED });
      Object.keys(data).map(item=>{
        dispatch({ type: VALIDATION, payload: {error :item+" "+data[item][0]} });
      })
      return 
    }
     dispatch({ type: CLINIC_REGISTER_SUCCESS, payload : { msg : 'Clinic Updated SuccessFully.' } });
     return true
//CLINIC_REGISTER_FAILED
  } catch (error) {
    console.log(error)
    dispatch({ type: CLINIC_REGISTER_FAILED });
    dispatch({ type: VALIDATION, payload : { error : 'Clinic Update Failed.' } });
    return false
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
}
};


export const getClinics = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/get-clinic",
      {
        method: "GET",
      }
    );
    const data = await response.json();
  //  const data = Decode(responseData);
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
}
}

export const getClinicDetails = async (id) => {
  let body = {
    id
  }
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/get-clinic-physio/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({id}),
      }
    );
    const data = await response.json();
    console.log(data);
    return data[0]
  } catch (error) {
    console.log(error)
    return {}
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
  }
};
