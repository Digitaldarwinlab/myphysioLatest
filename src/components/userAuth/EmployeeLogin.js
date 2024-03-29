import React, { useState,useEffect } from "react";
import EmployeeAuthForm from './EmployeeForm';
import loginImage from "./../../assets/loginImage.JPG";
import MyPhysioLogo from './../UtilityComponents/MyPhysioLogo';
import "../../styles/userAuth/userAuth.css"; 
import { Row,Col} from 'antd';
import ForgotPassword from './ForgotPassword';
import packageJson from "../../../package.json";
import { getBuildDate } from "../../utils/utils";
import withClearCache from "../../ClearCache";
const ClearCacheComponent = withClearCache(MainApp);
//const [visible, setVisible] = useState(false);
const EmployeeLogin = (props)=>{
    useEffect(() => {
        if (navigator.getUserMedia) {
          navigator.getUserMedia(
            {audio:true,video: true
              // { width: 1280, height: 720 } 
              },
            function (stream) {
            console.log(stream)
            },
            function (err) {
              console.log("The following error occurred: " + err.name);
            }
          );
        } else {
          console.log("getUserMedia not supported");
        }
      }, []);

    return (
        <>
        <Row className="cont-fluid">
            <Col xs={24} sm={24} md={12} lg={12} xl={14}>
                <img src={loginImage} alt="login" className="vectorImage"/>
            </Col>
            <Col xs={20} sm={24} md={12} lg={12} xl={10} className="authFormDiv LoginMain">
                <MyPhysioLogo page='login' />
                {/* <ClearCacheComponent /> */}
                <h1>Employee Login!</h1>
                
                <ForgotPassword />
              
                <EmployeeAuthForm isSignin={true} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14}>
            </Col>
        </Row>
        </>
	)
}
function MainApp(props) {
    return (
      <div >  
          <p>Build date: {getBuildDate(packageJson.buildDate)}</p> 
      </div>
    );
  }
  
export default EmployeeLogin;