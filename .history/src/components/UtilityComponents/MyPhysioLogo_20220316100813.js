import { useEffect } from "react";
import logoImg from "./../../assets/newlogo.png";
import './logo.css'
export default function MyPhysioLogo(props) {
    var style 
    if(props.page=='dashboard')
    {
         style={fontSize:'18px',position:'relative',top:'5px'}
        
    }
    if(props.page=='login')
    {
         style={fontSize:'36px'}
    }
    // useEffect(() => {
    //     var script = document.createElement("script");
    //     script.setAttribute('src',process.env.REACT_APP_EXERCISE_URL+'/images/main.js')
    //     script.setAttribute('crossorigin',true)
    //     document.body.appendChild(script)
    // }, []);
    return (
        <> 
         <div className={`` props.page=='login' ? 'initial-login' : props.page=='dashboard' ? 'initial-dashboard' : null}  >
            <img src={logoImg} alt="logo" className={props.page=='dashboard' ? 'dashboard-logo' : props.page=='login' ? 'login-logo' : null} id={props.page=='dashboard' ? 'dashboard-logo' : props.page=='login' ? 'login-logo' : null}   />
            <div id="PhysioAi" style={style} className={`${props.text} fw-bold text-white`} >PHYSIOAI</div>
            </div> 
        </>
    )
}

