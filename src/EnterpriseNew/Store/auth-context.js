import { createContext, useState } from "react";

export const AuthContext = createContext({
    isLoggedIn:false,
    login:(data)=>{},
    logout:() => {}
});

const AuthContextProvider = (props) => {
    const storedData = localStorage.getItem("data");
    const [data,setData] = useState(storedData);
   let isLoggedIn;
   if(data){
       isLoggedIn=true;
   }else{
       isLoggedIn=false;
   }

const logoutHandler =() => {
    setData(null);
    localStorage.clear();
 
}

const loginHandler = (data) => {
    setData(data);
    localStorage.setItem("data", data);
    console.log(data);
}

    const contextValue = {
        isLoggedIn:isLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider;
