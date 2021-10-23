import fetch from "isomorphic-fetch";
//@get Care plan Data
//@Input - Episode Id, date

import { GetPatientCurrentEpisode } from "./PatientDashboardApi";
export const GetPatientCarePlan = async (episodeId, date) => {
    //headers
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
  
    try {
        const response = await fetch(process.env.REACT_APP_API + "/get-care-plan/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: episodeId, date })
        });
      //  console.log(response)
        const data = await response.json();
        console.log(data)
      //  console.log(data, "Information")
        if (response.status !== 200 && response.status !== 201) {
            return [false, "Error " + response.status + response.statusText];
        } else {
            return [true, data];
        }
    } catch (err) {
        return [false, "Error 403: " + err.message];
    }
}

export const  update_careplan=async (object,exercise,pain,exerciseTime,careplanId)=>{
    console.log(exercise)
    var newcareplanId=careplanId
    console.log('careplanId')

const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }
    let userId = JSON.parse(localStorage.getItem("userId"));
    const date=new Date()
    console.log('date is')
    const epi=await GetPatientCurrentEpisode()


      
     
    const json_data={
     
        id:careplanId.careplanId,
        date: date.toISOString().split('T')[0],
        exerciseId:exercise[0],
        pain:pain,
        output_json:{ }
        }
        console.log('episode is')
        
        if(typeof(exerciseTime)=='string')
        {
            json_data.output_json[exerciseTime]=object
        }  
        else
        {
            json_data.output_json[JSON.parse(exerciseTime)]=object
        }
        
        console.log('careplan data inside api')

        console.log(json_data)
    try {
        const response = await fetch(process.env.REACT_APP_API + "/update_care_plan/", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(json_data)
        });
        console.log('response in api')
        
        const data = await response.json();
 
        console.log(data)
      //  console.log(data, "Information")
        if (response.status !== 200 && response.status !== 201) {
            return [false, "Error " + response.status + response.statusText];
        } else {
            return [true, data];
        }
    } catch (err) {

        return [false, "Error 403: " + err.message];
    }


}