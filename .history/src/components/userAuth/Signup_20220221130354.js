import AuthForm from './Form';
import signupImage from "./../../assets/signupImage.JPG";
import MyPhysioLogo from './../UtilityComponents/MyPhysioLogo';
import "../../styles/userAuth/userAuth.css"; 
import { Row,Col} from 'antd';
import {Pr}

const Signup = ()=>{
    return (
        <Row className="cont-fluid">
             <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <img src={signupImage} alt="signup" className="vectorImage"/>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="authFormDiv">
                <MyPhysioLogo />
                <h1>Change Password</h1>
                <AuthForm isSignin={false} />
            </Col>
        </Row>
	)
}
export default Signup;