import {
  FETCH_DATA,
  RECEIVED_DATA,
} from "../../contextStore/actions/Assesment";

import { useDispatch, useSelector } from "react-redux";
export const  AssesmentAPI = async (details, dispatch) => {
  console.log('inside assesment api')
  console.log(details)
  dispatch({ type: FETCH_DATA });
  let AssesmentDetails = {};
//   let arr=[
//   arr.push(detail.Diabetes),
//   arr.push(detail.HYN),
//   arr.push(detail.COPD),
//   arr.push(detail.Cardiac),
//   arr.push(detail.Medication),
//   arr.push(detail.Other),
// ]

let arr={
 arr.push("d")
}
  AssesmentDetails["physical_assessement"] = {
    Scars: details.Scars,
    past_medical: details.arr,
    

    Swelling: details.Swelling,
    PainMeter: details.PainMeter,
    RecentHistory: details.RecentHistory,
    Trauma: details.Trauma,
    ScareFile: details.ScareFile,
    TraumaFile: details.TraumaFile,
    Test: details.Test,
    // gaurav
    chiefCom: details.chiefCom,
    occupation: details.occupation,
    Duration: details.Duration,
    Built: details.Built,
    History: details.History,
    Diabetes: details.Diabetes,
   




    // 
  };
  AssesmentDetails["questionnaires"] = {
    Symptoms: [
      details.Symptoms.question,
      details.Symptoms.answer,
      details.Symptoms.score,
      details.KOOS[0],
    ],
    Stiffness: [
      details.Stiffness.question,
      details.Stiffness.answer,
      details.Stiffness.score,
      details.KOOS[1],
    ],
    pain: [
      details.pain.question,
      details.pain.answer,
      details.pain.score,
      details.KOOS[2],
    ],
    DailyLiving: [
      details.DailyLiving.question,
      details.DailyLiving.answer,
      details.DailyLiving.score,
      details.KOOS[3],
    ],
    Sports: [
      details.Sports.question,
      details.Sports.answer,
      details.Sports.score,
      details.KOOS[4],
    ],
    Life: [
      details.Life.question,
      details.Life.answer,
      details.Life.score,
      details.KOOS[5],
    ],
  };
  let sensory_input = {
    superficial:details.superficial,
    deep:details.deep,
    cortial:details.cortial
  }
  AssesmentDetails["pp_ed_id"] = details.episode_id;
  AssesmentDetails["joint1score"] = details.joint1score;
  AssesmentDetails["joint2score"] = details.joint2score;
  AssesmentDetails["types"] = details.Type;
  AssesmentDetails["AI_data"] = details.AI_data;
  AssesmentDetails["Exercise_Name"] = details.Exercise_Name;
  AssesmentDetails['Numbmess']=details.Numbness
  AssesmentDetails['pain_scale']=details.pain_scale;
  AssesmentDetails['nature_of_pain']=details.nature_of_pain;
  AssesmentDetails['pain_aggravating']=details.pain_aggravating;
  AssesmentDetails['pain_relieving']=details.pain_relieving;
  AssesmentDetails['pain_scars']=details.pain_scars;
  AssesmentDetails['pain_swelling']=details.pain_swelling;
  AssesmentDetails['sensory_input'] = sensory_input;
  AssesmentDetails['shoulder'] = details.shoulder
  AssesmentDetails['Elbow'] = details.elbow;
  AssesmentDetails['Hip'] = details.hip;
  AssesmentDetails['Ankle'] = details.ankle;
  AssesmentDetails['Cervical_Spine'] = details.cervical_spine;
  AssesmentDetails['Thoracic_Spine'] = details.thoracic_spine;
  AssesmentDetails['Lumbar_Spine'] = details.lumbar_spine;
  AssesmentDetails['Forearm_wrist_Hand'] = details.forearm;
  AssesmentDetails['Knee'] = details.knee;
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  try {
    const res = await fetch(process.env.REACT_APP_API + "/add_assessment/", {
      headers: headers,
      method: "POST",
      body: JSON.stringify(AssesmentDetails),
    });
    const data = await res.json();
    if (data) {
      dispatch({ type: RECEIVED_DATA });
      return true;
    }
  } catch (err) {
    return [false, "Error: 501" + " " + err.message];
  }
};




export const  add_angles= async (newdata)=>{


  
  //console.log(state)
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };

  const date=new Date()
  console.log('insed add_angles')
 

  try {
    const res = await fetch(process.env.REACT_APP_API + "/test_assessment/", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({patient_id:'56',date:date,result:newdata}),
    });
    const data = await res.json();
    console.log(data)
    if (data) {
    //  dispatch({ type: RECEIVED_DATA });
      return true;
    }
  } catch (err) {
    console.log(err)
    return [false, "Error: 501" + " " + err.message];
  }
}