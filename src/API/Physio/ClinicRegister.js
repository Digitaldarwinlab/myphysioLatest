import {
  CLINIC_REGISTER_REQUEST,
  CLINIC_REGISTER_SUCCESS,
} from "../../contextStore/actions/ClinicRegister";
import { Decode, Encode } from "../../Encode/hashing";
//@Register Clinic
//@param Clinic details
//@return- Message.
export const clinicRegisterApi = async (details, dispatch) => {
  let body = {
    name: details.name.length>0?details.name:null,
    address_1: details.address_1.length>0?details.address_1:null,
    address_2: details.address_2.length>0?details.address_2:null,
    address_3: details.address_3.length>0?details.address_3:null,
    city: details.city.length>0?details.city:null,
    state: details.state.length>0?details.state:null,
    country: details.country.length>0?details.country:null,
    zip: details.zip.length>0?details.zip:null,
    estab_date: details.estab_date.length>0?details.estab_date:null,
    mobile_no: details.mobile_no.length>0?details.mobile_no:null,
    landline_no: details.landline_no.length>0?details.landline_no:null,
    whatsapp_no: details.whatsapp_no.length>0?details.whatsapp_no:null,
    email: details.email.length>0?details.email:null,
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
    console.log(data)
    dispatch({ type: CLINIC_REGISTER_SUCCESS });
  } catch (error) {
    console.log(error)
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
}
  console.log(details, dispatch);
};

export const getClinics = async () => {
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/get-clinic_v1/",
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    const data = Decode(responseData);
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
    console.log(data)
    return data[0]
  } catch (error) {
    console.log(error)
    return {}
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
  }
};
