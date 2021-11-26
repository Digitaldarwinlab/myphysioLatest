import {
  FETCH_DATA,
  RECEIVED_DATA,
} from "../../contextStore/actions/Assesment";

import { useDispatch, useSelector } from "react-redux";
export const AssesmentAPI = async (details, dispatch) => {
  console.log('inside assesment api')
  console.log(details)
  dispatch({ type: FETCH_DATA });
  let AssesmentDetails = {};
  AssesmentDetails["physical_assessement"] = {
    Scars: details.Scars,
    Swelling: details.Swelling,
    PainMeter: details.PainMeter,
    RecentHistory: details.RecentHistory,
    Trauma: details.Trauma,
    ScareFile: details.ScareFile,
    TraumaFile: details.TraumaFile,
    Test: details.Test
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
  AssesmentDetails["pp_ed_id"] = details.episode_id;
  AssesmentDetails["joint1score"] = details.joint1score;
  AssesmentDetails["joint2score"] = details.joint2score;
  AssesmentDetails["types"] = details.Type;
  AssesmentDetails["AI_data"] = details.AI_data;
  AssesmentDetails["assesmentdate"] = details.Date;
  AssesmentDetails["Exercise_Name"] = details.Exercise_Name;
  AssesmentDetails['Numbmess']=details.Numbness
  
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