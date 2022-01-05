import React, { useState } from "react";
import AuthForm from './Form';
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
const Login = (props)=>{
    return (
        <>
        <Row className="cont-fluid">
            <Col xs={24} sm={24} md={12} lg={12} xl={14}>
                <img src={loginImage} alt="login" className="vectorImage"/>
            </Col>
            <Col xs={20} sm={24} md={12} lg={12} xl={10} className="authFormDiv LoginMain">
                <MyPhysioLogo page='login' />
                {/* <ClearCacheComponent /> */}
                <h1>Welcome Back1!</h1>
                
                <ForgotPassword />
              
                <AuthForm isSignin={true} />
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
  
export default Login;