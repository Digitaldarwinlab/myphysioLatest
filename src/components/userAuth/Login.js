import AuthForm from './Form';
import loginImage from "./../../assets/loginImage.JPG";
import MyPhysioLogo from './../UtilityComponents/MyPhysioLogo';
import "../../styles/userAuth/userAuth.css"; 
import { Row,Col} from 'antd';
const Login = (props)=>{
    return (
        <>
        <Row className="cont-fluid">
            <Col xs={24} sm={24} md={12} lg={12} xl={14}>
                <img src={loginImage} alt="login" className="vectorImage"/>
            </Col>
            <Col xs={20} sm={24} md={12} lg={12} xl={10} className="authFormDiv LoginMain">
                <MyPhysioLogo page='login' />
                <h1>Welcome Back!</h1>
                <AuthForm isSignin={true} />
            </Col>
        </Row>
        </>
	)
}
export default Login;