

export const getOTP =async (uid) =>{
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try{
        const response = await fetch(process.env.REACT_APP_API+"/send_otp/",{
            headers:headers,
            method:"POST",
            body:JSON.stringify(uid)
        });
        const data = await response.json();
      
        if(response.status === 200 || response.status === 201){
                return data;
        }else{
             return [];
        }
    }catch(err){
        console.log(err,"From send OTP section");
        return [];
    }
}


export const verifyOTP =async (otp) =>{
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try{
        const response = await fetch(process.env.REACT_APP_API+"/verify_otp/",{
            headers:headers,
            method:"POST",
            body:JSON.stringify(otp)
        });
        const data = await response.json();
      
        if(response.status === 200 || response.status === 201){
                return data;
        }else{
             return [];
        }
    }catch(err){
        console.log(err,"From verify OTP section");
        return [];
    }
}

