export  const get_progress=async (patId)=>{
    // console.log(patId)
    const headers = {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
   
        try {
            const response = await fetch(process.env.REACT_APP_API + "/patient-progress/", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ id: patId })
            });
            const data = await response.json();
            // console.log('data inside api')
            // console.log(data)
            if (response.status !== 200 && response.status !== 201) {
                return [];
            }
            // console.log(data)
            return data;
        } catch (err) {
            // console.log(err)
            return [];
        }
    
    
}