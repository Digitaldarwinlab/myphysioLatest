export const GetRoutesList = async () => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const response = await fetch(process.env.REACT_APP_API + "/get_routes", {
            method: "GET",
            headers: headers,
        });
        
        const responseData = await response.json();
      //  console.log(exerciresponseData)
        // console.log(exerciresponseData);
        return responseData;

    } catch (err) {
        return [];
    }
}
export const GetRolesList = async () => {
    try {
        const headers = {
            Accept: 'application/json',
            "Content-type": "application/json"
        }
        const response = await fetch(process.env.REACT_APP_API + "/get-role-permission", {
            method: "GET",
            headers: headers,
        });
        
        const responseData = await response.json();
      //  console.log(exerciresponseData)
        // console.log(exerciresponseData);
        return responseData;

    } catch (err) {
        return [];
    }
}
export const AddRoutesApi = async (data) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
  
      const response = await fetch(process.env.REACT_APP_API + "/add-route", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log('inside patient visit api')
      // console.log(patId)
      // console.log(await response.blob())
      const responseData = await response.json()
      if (response.status === 200 || response.status === 201)
      return  [responseData];
    } catch (err) {
      // console.log(err, "Error in Fetching Patient Visits");
      return [];
    }
  };
  export const DeleteRoutesApi = async (data) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
  
      const response = await fetch(process.env.REACT_APP_API + "/delete-route", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log('inside patient visit api')
      // console.log(patId)
      // console.log(await response.blob())
      const responseData = await response.json()
      return  responseData;
    } catch (err) {
      // console.log(err, "Error in Fetching Patient Visits");
      return [];
    }
  };

  export const AddRolesApi = async (data) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
  
      const response = await fetch(process.env.REACT_APP_API + "/add-role-permission/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log('inside patient visit api')
      // console.log(patId)
      // console.log(await response.blob())
      const responseData = await response.json()
      if (response.status === 200 || response.status === 201)
      return  [responseData];
    } catch (err) {
      // console.log(err, "Error in Fetching Patient Visits");
      return [];
    }
  };
  export const UpdateRolesApi = async (data) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
  
      const response = await fetch(process.env.REACT_APP_API + "/update-role-permission/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      // console.log('inside patient visit api')
      // console.log(patId)
      // console.log(await response.blob())
      const responseData = await response.json()
      return  [responseData];
    } catch (err) {
      // console.log(err, "Error in Fetching Patient Visits");
      return [];
    }
  };