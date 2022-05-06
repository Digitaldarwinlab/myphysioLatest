import {
    CLINIC_REGISTER_REQUEST,
    CLINIC_REGISTER_SUCCESS,
  } from "../../contextStore/actions/ClinicRegister";
  import { Encode,Decode } from "../../Encode/hashing";
  import { STATECHANGE } from "../../contextStore/actions/authAction";
  import { PATIENT_REG_REQUEST,PATIENT_UPD_SUCCESS,PATIENT_REG_SUCCESS } from "../../contextStore/actions/authAction";
  //@Register Clinic
  //@param Clinic details
  //@return- Message.
  export const EnterpriseOrganization = async (details, dispatch) => {
    let body = {
      org_name: details.org_name?details.org_name:"",
      org_short_name: details.org_name?details.org_name:"",
      Address_1: details.Address_1?details.Address_1:"",
      Address_2: details.Address_2?details.Address_2:"",
      Address_3: details.Address_3?details.Address_3:"",
      city: details.city?details.city:"",
      state: details.state?details.state:"",
      country: details.country?details.country:"",
      zip: details.zip?details.zip:"",
      estab_date: details.estab_date?details.estab_date:"",
      mobile_no: details.mobile_no?details.mobile_no:"",
      Landline_no: details.Landline_no?details.Landline_no:"",
      whatsapp_no: details.whatsapp_no?details.whatsapp_no:"",
      contact_email: details.contact_email?details.contact_email:"",
      last_update_date:details.last_update_date?details.last_update_date:"",
      last_update_by:details.last_update_by?details.last_update_by:"",
      status_flag:1
    };
    console.log(body);
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
      const data = await response.json();
      // const data = Decode(responseData);
      console.log(data)
      dispatch({ type: CLINIC_REGISTER_SUCCESS });

    //   if(Object.keys(data).length>0){
    //     // Object.keys(data).map(item=>{
    //     //    dispatch({ type: VALIDATION, payload: item+" "+data[item][0] });
    //     // })
        
    // }
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

  export const searchOrganizations = async (value) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const encodedData = Encode({ query: value });
        const response = await fetch(process.env.REACT_APP_API + "/search_org_v1/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(encodedData)
        });
        const responseData = await response.json();
        const data = Decode(responseData)
        if (response.status !== 200 && response.status !== 201) {
            return [];
        }
        return data;
    } catch (err) {
        // console.log(err);
        return [];
    }
}

export const Employee_Registration = async (user, dispatch) => {
  dispatch({ type: PATIENT_REG_REQUEST });
  let patientDetails = {};
  patientDetails["first_name"] = user.FirstName;
  patientDetails["last_name"] = user.LastName;
  patientDetails["middle_name"] = user.MiddleName;
  patientDetails["mobile_no"] = user.MobileNo;
  patientDetails["whatsapp_no"] = user.WhatsAppNo;
  patientDetails["blood_group"] = user.bloodType;
  patientDetails["dob"] = user.DOB.dateString;
  patientDetails["age"] = user.Age;
  patientDetails["gender"] = user.Gender;
  patientDetails["landline"] = user.LandlineNo;
  patientDetails["Address_1"] = user.Address;
  patientDetails["pin"] = user.pincode;
  patientDetails["city"] = user.City;
  patientDetails["state"] = user.State;
  patientDetails["country"] = user.Country;
  patientDetails["emergence_contact"] = user.EmergencyContact;
  patientDetails["email"] = user.Email;
  patientDetails["facebook"] = user.Facebook;
  patientDetails["linkedin"] = user.LinkedIn;
  patientDetails["pp_org"] = user.Organization;
  patientDetails["pp_pm"] = JSON.parse(localStorage.getItem("userId"));
  //patientDetails["is_enterprise"] = user.is_enterprise;

  if (patientDetails['middle_name'] === "")
      delete patientDetails["middle_name"];

  const headers = {
      Accept: 'application/json',
      "Content-type": "application/json"
  }
  // const encodedData = Encode(patientDetails);
  try {
      const response = await fetch(process.env.REACT_APP_API + "/add-employee/", {
          headers: headers,
          method: "POST",
          body: JSON.stringify(patientDetails)
      });
      const data = await response.json();
      // const data = Decode(responseData);
      if (data && data.role) {
          dispatch({ type: PATIENT_REG_SUCCESS });
          return [true];
      } else {
          if (data) {
              const values = Object.values(data);
              if (values.length === 0)
                  return [false, "Check if any field is not empty"];
              else
                  return [false, "Error: " + response.status + " " + values[0]];
          } else {
              return [false, "Error: " + response.status + " " + response.statusText];
          }
      }
  } catch (err) {
      return [false, "Error: 501" + " " + err.message];
  }
}

export const UpdateOrganization = async (details, dispatch) => {
  let body = {
    id:details.pp_org_id?details.pp_org_id:"",
    org_name: details.org_name?details.org_name:"",
    org_short_name: details.org_name?details.org_name:"",
    Address_1: details.Address_1?details.Address_1:"",
    Address_2: details.Address_2?details.Address_2:"",
    Address_3: details.Address_3?details.Address_3:"",
    city: details.city?details.city:"",
    state: details.state?details.state:"",
    country: details.country?details.country:"",
    zip: details.zip?details.zip:"",
    estab_date: details.estab_date?details.estab_date:"",
    mobile_no: details.mobile_no?details.mobile_no:"",
    Landline_no: details.Landline_no?details.Landline_no:"",
    whatsapp_no: details.whatsapp_no?details.whatsapp_no:"",
    contact_email: details.contact_email?details.contact_email:"",
    last_update_date:details.last_update_date?details.last_update_date:"",
    last_update_by:details.last_update_by?details.last_update_by:"",
    status_flag:1
  };
  dispatch({ type: CLINIC_REGISTER_REQUEST });
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  const encodedData = Encode(body);
  
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/update_org_v1/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(encodedData),
      }
    );
    const responseData = await response.json();
    const data = Decode(responseData);
    console.log(data)
    
    dispatch({ type: "UPDATE_ORGANIZATION_SUCCESS" });
  //   if(Object.keys(data).length>0){
  //     Object.keys(data).map(item=>{
  //        dispatch({ type: VALIDATION, payload: item+" "+data[item][0] });
  //     })
     
  // }
  } catch (error) {
      dispatch({ type: "UPDATE_ORGANIZATION_FAILURE" });
      // dispatch({ type: CLINIC_REGISTER_SUCCESS });
    console.log(error)
 //   return [false, "Error 501: Internal Server Error. Try After Some Time."];
}
  console.log(details, dispatch);
};

export const UpdateStateEmp = (state, val, dispatch) => {
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "FirstName",
          value: val.first_name
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "LandlineNo",
          value: val.landline
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "MiddleName",
          value: val.middle_name
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "LastName",
          value: val.last_name
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "MobileNo",
          value: val.mobile_no
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "WhatsAppNo",
          value: val.whatsapp_no
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "bloodType",
          value: val.blood_group
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Gender",
          value: val.gender ? val.gender : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Address",
          value: val.Address_1
      }
  })

  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Address",
          value: val.Address_1
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Address",
          value: val.Address_1
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "pincode",
          value: val.pin
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "City",
          value: val.city
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "State",
          value: val.state
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "DOB",
          value: val.dob
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Country",
          value: val.country
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "EmergencyContact",
          value: val.emergence_contact
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Email",
          value: val.email
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Facebook",
          value: val.facebook ? val.facebook : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "LinkedIn",
          value: val.linkedin ? val.linkedin : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "Allergies",
          value: val.allergy_detail ? val.allergy_detail : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "MedicalHistory",
          value: val.patient_medical_history ? val.patient_medical_history : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "FamilyHistory",
          value: val.patient_Family_History ? val.patient_Family_History : ""
      }
  })
  dispatch({
      type: STATECHANGE,
      payload: {
          key: "pp_patm_id",
          value: val.pp_patm_id ? val.pp_patm_id : ""
      }
  })
  dispatch({
    type: STATECHANGE,
    payload: {
        key: "pp_em_id",
        value: val.pp_em_id ? val.pp_em_id : ""
    }
})
  dispatch({
    type: STATECHANGE,
    payload: {
        key: "Organization",
        value: val.Organization ? val.Organization : ""
    }
})
}

export const Employee_Update = async (user, dispatch) => {
  dispatch({ type: PATIENT_REG_REQUEST });
  let patientDetails = {};
  patientDetails["first_name"] = user.FirstName ;
  patientDetails["last_name"] = user.LastName;
  patientDetails["middle_name"] = user.MiddleName;
  patientDetails["mobile_no"] = user.MobileNo;
  patientDetails["whatsapp_no"] = user.WhatsAppNo;
  patientDetails["blood_group"] = user.bloodType ? user.bloodType : "" ;
  patientDetails["dob"] = user.DOB;
  patientDetails["age"] = user.Age;
  patientDetails["gender"] = user.Gender;
  patientDetails["landline"] = user.LandlineNo;
  patientDetails["Address_1"] = user.Address;
  patientDetails["pin"] = user.pincode;
  patientDetails["city"] = user.City;
  patientDetails["state"] = user.State;
  patientDetails["country"] = user.Country;
  patientDetails["emergence_contact"] = user.EmergencyContact;
  patientDetails["email"] = user.Email;
  patientDetails["facebook"] = user.Facebook;
  patientDetails["linkedin"] = user.LinkedIn;
  patientDetails["allergy_detail"] = user.Allergies;
  patientDetails["patient_medical_history"] = user.MedicalHistory;
  patientDetails["patient_Family_History"] = user.FamilyHistory;
  patientDetails["id"] = user.pp_em_id;


  if (patientDetails['middle_name'] === "" || !patientDetails['middle_name'])
      delete patientDetails["middle_name"];

  const headers = {
      Accept: 'application/json',
      "Content-type": "application/json"
  }
  const encodedData = Encode(patientDetails)
  // console.log(patientDetails)
  try {
      const response = await fetch(process.env.REACT_APP_API + "/update_emp_v1/", {
          headers: headers,
          method: "POST",
          body: JSON.stringify(encodedData)
      });

      // console.log(response)
      const responseData = await response.json();
      const data = Decode(responseData);
      if (data && data.message) {
          dispatch({ type: PATIENT_UPD_SUCCESS });
          return [true];
      } else {
          if (data) {
              const values = Object.values(data);
              if (values.length === 0)
                  return [false, "Check if any field is not empty"];
              else
                  return [false, "Error: " + response.status + " " + values[0]];
          } else {
              return [false, "Error: " + response.status + " " + response.statusText];
          }
      }
  } catch (err) {
      return [false, "Error: 501" + " " + err.message];
  }
}