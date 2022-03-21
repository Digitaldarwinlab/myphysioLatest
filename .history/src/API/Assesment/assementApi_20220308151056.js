import {
  FETCH_DATA,
  RECEIVED_DATA,
} from "../../contextStore/actions/Assesment";

import { useDispatch, useSelector } from "react-redux";
export const  AssesmentAPI = async (details,url, dispatch) => {
  // console.log('inside assesment api')
  // console.log(details)
  dispatch({ type: FETCH_DATA });
  let AssesmentDetails = {};

  
  const formdata = new FormData
  // formdata.append("physical_assessement",JSON.stringify({
  //   Scars: details.Scars,
    

  //   Swelling: details.Swelling,
  //   PainMeter: details.PainMeter,
  //   RecentHistory: details.RecentHistory,
  //   Trauma: details.Trauma,
  //   ScareFile: details.ScareFile,
  //   TraumaFile: details.TraumaFile,
  //   Test: details.Test,
  //   // gaurav
  //   chiefCom: details.chiefCom,
  //   occupation: details.occupation,
  //   Duration: details.Duration,
  //   Built: details.Built,
  //   History: details.History,
  //   Diabetes: details.Diabetes,
  //   HYN: details.HYN,
  //   COPD: details.COPD,
  //   Cardiac: details.Cardiac,
  //   Medication: details.Medication,
  //   Other: details.Other,




  //   // 
  // }))

  details.medicCheck&&details.past_medical_history.push(details.Medication)
  details.othCheck&&details.past_medical_history.push(details.Others)

  AssesmentDetails["physical_assessement"] = {
   
    Scars: details.Scars,
    past_medical_history: details.past_medical_history,
    
    Subjective:details.subjective,
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
// formdata.append("questionnaires",JSON.stringify({
//   Symptoms: [
//     details.Symptoms.question,
//     details.Symptoms.answer,
//     details.Symptoms.score,
//     details.KOOS[0],
//   ],
//   Stiffness: [
//     details.Stiffness.question,
//     details.Stiffness.answer,
//     details.Stiffness.score,
//     details.KOOS[1],
//   ],
//   pain: [
//     details.pain.question,
//     details.pain.answer,
//     details.pain.score,
//     details.KOOS[2],
//   ],
//   DailyLiving: [
//     details.DailyLiving.question,
//     details.DailyLiving.answer,
//     details.DailyLiving.score,
//     details.KOOS[3],
//   ],
//   Sports: [
//     details.Sports.question,
//     details.Sports.answer,
//     details.Sports.score,
//     details.KOOS[4],
//   ],
//   Life: [
//     details.Life.question,
//     details.Life.answer,
//     details.Life.score,
//     details.KOOS[5],
//   ],
// }))
  // AssesmentDetails["questionnaires"] = {
  //   Symptoms: [
  //     details.Symptoms.question,
  //     details.Symptoms.answer,
  //     details.Symptoms.score,
  //     details.KOOS[0],
  //   ],
  //   Stiffness: [
  //     details.Stiffness.question,
  //     details.Stiffness.answer,
  //     details.Stiffness.score,
  //     details.KOOS[1],
  //   ],
  //   pain: [
  //     details.pain.question,
  //     details.pain.answer,
  //     details.pain.score,
  //     details.KOOS[2],
  //   ],
  //   DailyLiving: [
  //     details.DailyLiving.question,
  //     details.DailyLiving.answer,
  //     details.DailyLiving.score,
  //     details.KOOS[3],
  //   ],
  //   Sports: [
  //     details.Sports.question,
  //     details.Sports.answer,
  //     details.Sports.score,
  //     details.KOOS[4],
  //   ],
  //   Life: [
  //     details.Life.question,
  //     details.Life.answer,
  //     details.Life.score,
  //     details.KOOS[5],
  //   ],
  //   Difficulty:[
  //     details.Difficulty.question,
  //     details.Difficulty.answer,
  //     details.Difficulty.score,
  //     details.KOOS[6],
  //   ]
  // };
  let questionnaires = {}
  details.question_heading.map((data,index)=>{
    let temp = []
    temp[0] = details[data].question
    temp[1] = details[data].answer
    temp[2] = details[data].score
    temp[3] = details.KOOS[index]
    questionnaires[data] = temp 
  })
  AssesmentDetails["questionnaires"] = questionnaires
  let sensory_input = {
    superficial:details.superficial,
    deep:details.deep,
    cortial:details.cortial
  }
  console.log('body ',url)
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
  AssesmentDetails['posture'] = details.posture
  AssesmentDetails['body_image'] = details.body_image.length>0?details.body_image:url
  console.log('checking ',AssesmentDetails)
  // formdata.append('pp_ed_id',details.episode_id===undefined?'':details.episode_id)
  // formdata.append('joint1score',details.joint1score)
  // formdata.append('joint2score',details.joint2score)
  // formdata.append('types',details.type===undefined?'':details.type)
  // formdata.append('AI_data',details.AI_data)
  // formdata.append('Exercise_Name',details.Exercise_Name)
  // formdata.append('Numbmess',details.Numbness)
  // formdata.append('pain_scale',details.pain_scale)
  // formdata.append('nature_of_pain',JSON.stringify(details.nature_of_pain))
  // formdata.append('pain_aggravating',JSON.stringify(details.pain_aggravating))
  // formdata.append('pain_relieving',JSON.stringify(details.pain_relieving))
  // formdata.append('pain_scars',JSON.stringify(details.pain_scars))
  // formdata.append('pain_swelling',details.pain_swelling)
  // formdata.append('sensory_input',JSON.stringify(sensory_input))
  // formdata.append('shoulder',details.shoulder===undefined?'':details.shoulder)
  // formdata.append('Elbow',details.elbow===undefined?'':details.elbow)
  // formdata.append('Hip',details.hip===undefined?'':details.hip)
  // formdata.append('Ankle',details.ankle===undefined?'':details.ankle)
  // formdata.append('Cervical_Spine',details.cervical_spine===undefined?'':details.cervical_spine)
  // formdata.append('Thoracic_Spine',details.thoracic_spine===undefined?'':details.thoracic_spine)
  // formdata.append('Lumbar_Spine',details.lumbar_spine===undefined?'':details.lumbar_spine)
  // formdata.append('Forearm_wrist_Hand',details.forearm===undefined?'':details.forearm)
  // formdata.append('Knee',details.knee===undefined ?'':details.knee)
  // formdate.append('pose',details.poseture===undefined?'':details.poseture)
  // console.log("formdata ",formdata)
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  try {
    const res = await fetch(process.env.REACT_APP_API + "/add_assessment/", {
      headers : headers,
      method: "POST",
      body: JSON.stringify(AssesmentDetails)
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