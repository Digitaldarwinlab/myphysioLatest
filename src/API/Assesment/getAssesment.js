export const getAssesment =async (patient_id) =>{

    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try{
        const response = await fetch(process.env.REACT_APP_API+"/get_patient_assessment/",{
            headers:headers,
            method:"POST",
            body:JSON.stringify({id:patient_id})
        });
        const data = await response.json();
        if(response.status === 200 || response.status === 201){
                return data;
        }else{
             return [];
        }
    }catch(err){
        console.log(err,"From Get Assesment data");
        return [];
    }
}