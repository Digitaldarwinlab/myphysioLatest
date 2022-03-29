/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import { encode } from "js-base64";
import { Decode, Encode } from "../../Encode/hashing";
import {
    EPISODE_BOOK_REQUEST,
    EPISODE_BOOK_SUCCESS,
    ASSESSMENT_REQUEST,
    ASSESSMENT_SUCCESS,
} from "./../../contextStore/actions/episode";
//@Add Episode 
//@param Episode details
//@return- Message.
// export const EpisodeApi = async (details, dispatch) => {
//     console.log('inside detail')
//     console.log(details)
//     dispatch({ type: EPISODE_BOOK_REQUEST });
//     let EpisodeDetails = {};
//     EpisodeDetails["treating_doc_details"] = JSON.stringify({ Ref_Dr_Name: details.Ref_Dr_Name, Ref_Dr_ID: details.Ref_Dr_ID })
//     EpisodeDetails["PP_Patient_Details"] = JSON.stringify({ Patient_code: details.patient_code, Patient_name: details.patient_name, Patient_no: details.Patient_no });
//     EpisodeDetails["pp_pm_id"] = details.patient_code;
//     EpisodeDetails["Operative_Types"] = details.Operative_Types;
    
//     EpisodeDetails["primary_complaint"] = details.complaint;
//     EpisodeDetails["start_date"] = details.start_date;
//     EpisodeDetails["end_date"] = details.end_date;
//     EpisodeDetails["Patient_History"] = details.Patient_History;
//     EpisodeDetails["Closure_Notes"] = details.Closure_Notes;
//     EpisodeDetails["file"] = details.file;
//     const headers = {
//         Accept: 'application/json',
//         "Content-type": "application/json"
//     }
//     try {
//         const response = await fetch(process.env.REACT_APP_API + "/add_episode/", {
//             headers: headers,
//             method: "POST",
//             body: JSON.stringify(EpisodeDetails)
//         });
//         const data = await response.json();
     
//         if (response.status !== 200 && response.status !== 201) {
//             return [false, `Error ${response.status}: ` + " " + response.statusText];
//         }
//         if (data && data.message === "episode added") {
//             return [true];
//         } else {
//             return [false, data.message];
//         }
//     } catch (err) {
//         return [false, "Error: 501" + " " + "Internal Server Error."];
//     }
// }

export const EpisodeApi = async (details, dispatch) => {
    // aswin 10/16/2021 //
      let formdata = new FormData();
 
    formdata.append("treating_doc_details",JSON.stringify({ Ref_Dr_Name: details.Ref_Dr_Name, Ref_Dr_ID: details.Ref_Dr_ID }))
    formdata.append("PP_Patient_Details",JSON.stringify({ Patient_code: details.patient_code, Patient_name: details.patient_name, Patient_no: details.Patient_no }))
    formdata.append("pp_pm_id",parseInt(details.patient_code))
    formdata.append("Operative_Types",details.Operative_Types)
    formdata.append("primary_complaint",details.complaint)
    formdata.append("start_date",details.start_date)
    formdata.append("end_date",details.end_date)
    formdata.append("Patient_History",details.Patient_History)
    formdata.append("Closure_Notes",details.Closure_Notes)
 
    for (const file of details.file) { 
        formdata.append('files', file, file.name); 
    }
  
    dispatch({ type: EPISODE_BOOK_REQUEST });
  
    try {
       
        // console.log(formdata)
        const response = await fetch(process.env.REACT_APP_API + "/add_episode/", {
            method: "POST",
            body: formdata
        });
        // console.log(response)
        const data = await response.json();
        // aswin 10/16/2021 //
        if (response.status !== 200 && response.status !== 201) {
            return [false, `Error ${response.status}: ` + " " + response.statusText];
        }
        if (data && data.message === "episode added") {
            return [true];
        } else {
            return [false, data.message];
        }
    } catch (err) {
        return [false, "Error: 501" + " " + "Internal Server Error."];
    }
}



// get episode
export const getEpisode = async (patientID) => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const phyID = JSON.parse(localStorage.getItem("userId"))

        const response = await fetch(process.env.REACT_APP_API + "/get_episode/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: patientID })
        });
        const data = await response.json();

        if (response.status !== 200 && response.status !== 201) {
            return [];
        }
        return data;
    } catch (err) {
        return [];
    }
}


// Update Episode
export const UpdateEpisodeApi = async (details, dispatch) => {
    dispatch({ type: EPISODE_BOOK_REQUEST });
    //let EpisodeDetails = {};
    // EpisodeDetails["treating_doc_details"] = JSON.stringify({ Ref_Dr_Name: details.Ref_Dr_Name, Ref_Dr_ID: details.Ref_Dr_ID })
    // EpisodeDetails["PP_Patient_Details"] = JSON.stringify({ Patient_code: details.patient_code, Patient_name: details.patient_name, Patient_no: details.Patient_no });
    // EpisodeDetails["pp_pm_id"] = details.patient_code;
    // EpisodeDetails["pp_ed_id"] = details.episode_id;
    // EpisodeDetails["primary_complaint"] = details.complaint;
    // EpisodeDetails["start_date"] = details.start_date;
    // EpisodeDetails["end_date"] = details.end_date;
    // EpisodeDetails["Operative_Types"] = details.Operative_Types;
    // EpisodeDetails["Patient_History"] = details.Patient_History;
    // EpisodeDetails["Closure_Notes"] = details.Closure_Notes;
    // EpisodeDetails["file"] = details.file;
    let formdata = new FormData();
 
    formdata.append("treating_doc_details",JSON.stringify({ Ref_Dr_Name: details.Ref_Dr_Name, Ref_Dr_ID: details.Ref_Dr_ID }))
    formdata.append("PP_Patient_Details",JSON.stringify({ Patient_code: details.patient_code, Patient_name: details.patient_name, Patient_no: details.Patient_no }))
    formdata.append("pp_pm_id",parseInt(details.patient_code))
    formdata.append("pp_ed_id",parseInt(details.episode_id))
    formdata.append("Operative_Types",details.Operative_Types)
    formdata.append("primary_complaint",details.complaint)
    formdata.append("start_date",details.start_date)
    formdata.append("end_date",details.end_date)
    formdata.append("Patient_History",details.Patient_History)
    formdata.append("Closure_Notes",details.Closure_Notes)
    for (const file of details.file) {  
        formdata.append('files', file, file.name); 
    }
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try {
        const response = await fetch(process.env.REACT_APP_API + "/update_episode_v1/", {
            method: "POST",
            body: formdata
        });
        const data = await response.json();
        if (response.status !== 200 && response.status !== 201) {
            return [false, `Error ${response.status}: ` + " " + response.statusText];
        }
        if (data && data.message) {
            return [true, data.message];
        }
        return [false, `Error ${response.status}: ` + " " + response.statusText];
    } catch (err) {
        return [false, "Error: 501" + " " + err.message];
    }
}



const MedicationDetailsArray = (medication) => {
    let newArray = medication.map((val) => {
        return {
            "medicine_name": val.medication,
            "instruction": val.instructions,
            "medic_notes": val.medic_notes,
            "no_of_medications":val.no_of_medications,
        }
    });
    return newArray;
}
const labsDetails = (labs) => {
    let newArray = labs.map((val) => {
        return {
            "path_lab_test": val.path,
            "radio_lab_test": val.radiology
        }
    });
    return newArray;
}
//@Add Prescreption
//@param Labs And Medication details
//@return- Message.
export const AddLabsAndMedicationApi = async (details, dispatch) => {
    // console.log('detail inside api')
    // console.log(details)
    dispatch({ type: ASSESSMENT_REQUEST });
    let PrescreptionDetails = {};
    PrescreptionDetails["date"] = details.date;
    PrescreptionDetails["pp_ed_id"] = details.episode.pp_ed_id;
    PrescreptionDetails["notes"] = details.labs_notes;
    PrescreptionDetails["lab_tests"] = labsDetails(details.labsList);
    PrescreptionDetails["medication_detail"] = MedicationDetailsArray(details.medicationList);
    PrescreptionDetails["notes"] = details.labs_notes;
    // console.log('detail insdie api')
    // console.log(details)
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    const encodedData = Encode(PrescreptionDetails)

    try {
        const response = await fetch(process.env.REACT_APP_API + "/add_pres_v1/", {
            headers: headers,
            method: "POST",
            body: JSON.stringify(encodedData)
        });
        const responseData = await response.json();
        const data = Decode(responseData)
        // console.log('api k andrx')
        // console.log(data)
        if (response.status !== 200 && response.status !== 201) {
            return [false, "Error: " + response.status + " " + response.statusText];
        }
        if (data && data.message) {
            return [true];
        }
        throw new Error(data.pp_ed_id[0]);
    } catch (err) {
        // console.log('error in error')
        // console.log(err)
        return [false,  { message:err.message}];
    }
}