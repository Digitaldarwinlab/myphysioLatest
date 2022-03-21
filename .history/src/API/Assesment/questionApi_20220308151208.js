export const getQuestions =async (joint) =>{
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    // console.log('joint : ' + joint)
    try{
        const response = await fetch(process.env.REACT_APP_API+"/get_questions/",{
            headers:headers,
            method:"POST",
            body:JSON.stringify({query:joint})
        });
        const data = await response.json();
       // console.log('ins API')
     //   console.log(data)
        if(response.status === 200 || response.status === 201){
                return data;
        }else{
             return [];
        }
    }catch(err){
        // console.log(err,"From Get Questions for Questionnaire");
        return [];
    }
}
export const getTemplateName =async (joint) =>{
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
    try{
        const response = await fetch(process.env.REACT_APP_API+"/get_template_name/",{
            headers:headers,
            method:"GET",
        });
        const data = await response.json();
       // console.log('ins API')
     //   console.log(data)
        if(response.status === 200 || response.status === 201){
                return data;
        }else{
             return [];
        }
    }catch(err){
        // console.log(err,"From Get template for Questionnaire");
        return [];
    }
}