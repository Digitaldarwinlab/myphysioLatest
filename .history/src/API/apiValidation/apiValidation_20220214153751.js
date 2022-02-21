import axios from "axios";
//@Email validation if already present or not.
//@param {data:{type,value}}
//@return Message
const checkEmailValid = async (data) => {
    const headers = {
        "Access-Control-Allow-Origin": "*"
    }
    try{
        const resposne = await axios.post(process.env.REACT_APP_API+"validate_email/",data,{headers:headers});
        if(!resposne.ok){
            throw new Error(resposne.statusText);
        }
        const data = resposne.json();
        
        if(data.valid){
            return true;
        }else{
            return false;
        }
    }catch(err){
        return false;
    }
}
//@Password validation
//@param {data:{type,value}}
//@return Message
const checkPasswordValid = (data) => {
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
            });
}
//@Mobile Number validation if already present or not
//@param {data:{type,value}}
//@return Message
const checkMobileNumber = (data) => {
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
            });
}
//@Check Doctor Registeration id if already present or not
//@param {data:{type,value}}
//@return Message
const checkDoctorRegisterationId = (data)=>{
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
            });
}
//@Check Clinic name if already present or not
//@param {data:{type,value}}
//@return Message
const checkClinicName = (data)=>{
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
            });
}
//@Check Clinic website if already present or not
//@param {data:{type,value}}
//@return Message
const checkClinicWebsite = (data)=>{
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
               ,
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
            });
}
//@Check Pateint Id if valid or not.
//@param {data:{type,value}}
//@return Message
const checkPateintId = (data) => {
    return fetch(process.env.REACT_APP_API,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(data=>{
                return data.valid;
            })
            .catch(err=>{
                return err;
        });
}

const apiValidation = {
    checkEmailValid,
    checkPasswordValid,
    checkMobileNumber,
    checkDoctorRegisterationId,
    checkClinicName,
    checkClinicWebsite,
    checkPateintId
}
export default apiValidation;