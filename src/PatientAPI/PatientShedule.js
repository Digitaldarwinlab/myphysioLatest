import fetch from "isomorphic-fetch";
import { Decode, Encode } from "../Encode/hashing";
//@get Care plan Data
//@Input - Episode Id, date

import { GetPatientCurrentEpisode } from "./PatientDashboardApi";
export const GetPatientCarePlan = async (episodeId, date) => {
  //headers
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  let bdy = Encode({ id: episodeId, date })
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/get-care-plan_v1/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bdy),
      }
    );
    //  console.log(response)
    const responseData = await response.json();
    const data = Decode(responseData);
    console.log("get careplan ", data);
    //  console.log(data, "Information")
    if (response.status !== 200 && response.status !== 201) {
      return [false, "Error " + response.status + response.statusText];
    } else {
      return [true, data];
    }
  } catch (err) {
    return [false, "Error 403: " + err.message];
  }
};

export const updatePainMeter = async (id, pain,time) => {
  let body = {
    id: id,
    pain_meter: pain,
    time_slot:time
  };
  console.log("pain meter ", body);
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  try {
    await fetch(process.env.REACT_APP_API + "/update_pain_meter/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitManuelAi = async (id, time, exercises) => {
  let body = {
    id: id,
    time_slot: time,
    exercise: exercises,
  };
  console.log("pain meter ", body);
  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  const encodedData = Encode(body);
  try {
    await fetch(process.env.REACT_APP_API + "/update-care-plan-status/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(encodedData),
    });
  } catch (error) {
    console.log(error);
  }
};

export const update_careplan = async (
  object,
  exercise,
  is_ai,
  pain,
  exerciseTime,
  careplanId
) => {
  console.log(exercise);
  console.log("careplanId ::::::::::::", careplanId);
  var newcareplanId = careplanId;
  console.log("careplanId");

  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  let userId = JSON.parse(localStorage.getItem("userId"));
  const date = new Date();
  console.log("date is");
  const epi = await GetPatientCurrentEpisode();

  const json_data = {
    id: careplanId,
    is_ai:is_ai,
    date: date.toISOString().split("T")[0],
    exerciseId: exercise[0],
    pain: pain,
    output_json: {},
  };
  console.log("episode is");

  if (typeof exerciseTime == "string") {
    json_data.output_json[exerciseTime] = object;
  } else {
    json_data.output_json[JSON.parse(exerciseTime)] = object;
  }

  console.log("careplan data inside api");
  console.log("request in api", JSON.stringify(json_data));
  console.log(json_data);
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/update_care_plan/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(json_data),
      }
    );

    const data = await response.json();

    console.log(data);
    console.log(data, "Information");
    if (response.status !== 200 && response.status !== 201) {
      return [false, "Error " + response.status + response.statusText];
    } else {
      return [true, data];
    }
  } catch (err) {
    return [false, "Error 403: " + err.message];
  }
};

export const update_careplan_Nno_AI = async (
  object,exerciseTime,id
) => {
console.log(exerciseTime)
  const json_data = {
    id: id,
    output_json: {},
  };

  if (typeof exerciseTime == "string") {
    json_data.output_json[exerciseTime] = object;
  } else {
    json_data.output_json[JSON.parse(exerciseTime)] = object;
  }

const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
};
  try {
    const response = await fetch(
      process.env.REACT_APP_API + "/update-care-plan-status/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(json_data),
      }
    );

    const data = await response.json();
    console.log('tempdata ',tempData)
    console.log(data);
    console.log(data, "Information");
    if (response.status !== 200 && response.status !== 201) {
      return [false, "Error " + response.status + response.statusText];
    } else {
      return [true, data];
    }
  } catch (err) {
    return [false, "Error 403: " + err.message];
  }
};