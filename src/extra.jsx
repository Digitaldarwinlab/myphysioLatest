import React from 'react'

const admin_password_reset_ep=async(detail)=>{
    // console.log(detail)
    const newdata={
        uid:"satmis10000",
        new_password:"Asdf1234#"
    }
    // console.log(newdata)
    const headers = {
        "Accept": 'application/json',
        "Content-type": "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.bdfW8B6lG7RhPmHCtO6rPgf3IYlDwAJc7LUKtfTE2eU"
    }
    
    try {
        const response = await fetch(process.env.REACT_APP_API + "/emp_password_reset/", {
            mode: 'cors',
            method: "POST",
            headers: headers,
            body: JSON.stringify(newdata)
        });
        
        const data = await response.json();
       
        console.log(data)
    } catch (err) {
        return [false, err.message];
    }

}

const extra = () => {
  return (
    <div>
        <button onClick={admin_password_reset_ep}>Click</button>
    </div>
  )
}

export default extra