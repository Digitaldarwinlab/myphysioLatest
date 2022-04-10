import {
    CLINIC_REGISTER_REQUEST,
    CLINIC_REGISTER_SUCCESS,
  } from "../../contextStore/actions/ClinicRegister";
  //@Register Clinic
  //@param Clinic details
  //@return- Message.
  export const EnterpriseOrganization = async (details, dispatch) => {
    let body = {
      org_name: details.name.length>0?details.name:null,
      org_short_name: details.name.length,
      Address_1: details.address_1.length>0?details.address_1:null,
      Address_2: details.address_2.length>0?details.address_2:null,
      Address_3: details.address_3.length>0?details.address_3:null,
      city: details.city.length>0?details.city:null,
      state: details.state.length>0?details.state:null,
      country: details.country.length>0?details.country:null,
      zip: details.zip.length>0?details.zip:null,
      estab_date: details.estab_date.length>0?details.estab_date:null,
      mobile_no: details.mobile_no.length>0?details.mobile_no:null,
      Landline_no: details.landline_no.length>0?details.landline_no:null,
      whatsapp_no: details.whatsapp_no.length>0?details.whatsapp_no:null,
      contact_email: details.email.length>0?details.email:null,
      status_flag:1
    };
    dispatch({ type: CLINIC_REGISTER_REQUEST });
    const headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/add_organization/",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      const responseData = await response.json();
      const data = Decode(responseData);
      console.log(data)
      

      if(Object.keys(data).length>0){
        Object.keys(data).map(item=>{
           dispatch({ type: VALIDATION, payload: item+" "+data[item][0] });
        })
        dispatch({ type: CLINIC_REGISTER_SUCCESS });
    }
    } catch (error) {
        dispatch({ type: "CLINIC_REGISTER_FAILURE" });
        // dispatch({ type: CLINIC_REGISTER_SUCCESS });
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