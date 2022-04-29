import { Decode, Encode } from "../../Encode/hashing";
import { getUserData } from "../userAuth/userAuth";

const AllocateExerciseData = (data) => {
  return {
    name: data.template_name,
    exercise_details: data.exercises_cart,
    global_temp: getUserData() == "admin" ? 1 : 0,
    clinic_id: getUserData() == "admin"?9999:localStorage.getItem('clinic_id'),
  };
};

export const AddTemplates = async (data, dispatch, careplan_code) => {
  let newData = AllocateExerciseData(data);
  try {
    const headers = {
      Accept: "application/json",
      "Content-type": "application/json",
    };
    const encodedData = Encode(newData);
    const response = await fetch(process.env.REACT_APP_API + "/add_template/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(encodedData),
    });

    const responseData = await response.json();
    const result = Decode(responseData);
    console.log(result);
  } catch (err) {
    console.log(err);
    // return [false, "Error 501: Internal Server Error"];
  }
};

export const getTemplates =async () =>{
  const headers = {
      Accept: 'application/json',
      "Content-type": "application/json"
  }
  try{
      const response = await fetch(process.env.REACT_APP_API+"/get_exercise_temp/",{
          headers:headers,
          method:"POST",
      });
      const data = await response.json();
      const resdata = Decode(data)
      console.log(resdata)
      if(response.status === 200 || response.status === 201){
              return resdata;
      }else{
           return [];
      }
  }catch(err){
      // console.log(err,"From Get template for Questionnaire");
      return [];
  }
}