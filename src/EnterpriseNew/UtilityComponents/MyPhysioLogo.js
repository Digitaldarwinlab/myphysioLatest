import logoImg from "../assets/newlogo1.webp";
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

    return (
        <> 
         <div className={ props.page=='login' ? 'initial-login' : props.page=='dashboard' ? 'initial-dashboard' : null}  >
            <img  src={logoImg} alt="logo" className={props.page=='dashboard' ? 'dashboard-logo' : props.page=='login' ? 'login-logo' : null} width={250} height={250}  id={props.page=='dashboard' ? 'dashboard-logo' : props.page=='login' ? 'login-logo' : null}   />
            <div id="PhysioAi" style={style} className={`${props.text} fw-bold text-white`} >PHYSIOAI</div>
            </div> 
        </>
    )
}

