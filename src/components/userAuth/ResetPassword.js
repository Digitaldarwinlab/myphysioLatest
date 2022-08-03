import { useState, useEffect } from "react";
import signupImage from "./../../assets/signupImage.webp";
import MyPhysioLogo from './../UtilityComponents/MyPhysioLogo';
import { Row, Col } from 'antd';
import { useParams } from "react-router-dom";
import { Form, Button } from "antd";
import "../../styles/userAuth/userAuth.css";
import Loading from './../UtilityComponents/Loading';
import Error from './../UtilityComponents/ErrorHandler';
import Success from './../UtilityComponents/SuccessHandler';
import FormPassword from './../UI/antInputs/FormPassword';
import { postNewPassword } from "../../API/userAuth/userAuth";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
    const [token, setToken] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    let { token: ParamToken } = useParams();
    const history = useHistory()
    //take Token from url
    useEffect(() => {
        if (!ParamToken) {
            setError("Link has been expired, Please Generate Again.");
            window.location.href = '/login';
        }
        setToken(ParamToken);
        //eslint-disable-next-line
    }, []);

    //Submit Form 
    const handleSubmitForm = async () =>{
        console.log("AK");
        var format =  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
       const is_special=format.test(new_password)
       let userid=localStorage.getItem('userId')
       setLoading(true);
        if (new_password === "" || confirm_password === "") {
            setLoading(false);
            setError("Please Fill all the fields.");
            setTimeout(() => {
                setError("");
            }, 3000);
        } else if (new_password !== confirm_password) {
            setLoading(false);
            setError("New And Confirm Password Doesn't match.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else if(new_password.length<8)
        {
            setLoading(false);
            setError("Password Should be atleaset 8 digits long");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else if(is_special==false)
        {
            setLoading(false);
            setError("Password Should contain atleast one special character");
                
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        
        else if(new_password[0]!=new_password[0].toUpperCase())
        {  
            setLoading(false);
            setError("First Letter should be in uppercase")
            setTimeout(() => {
                setError("");
            }, 3000);
        }
        else {
           // let result = await admin_password_reset({userid ,temp_uid, new_password });
           let result = await postNewPassword({ token, new_password });
            setLoading(false);
            if (result && result[0]) {
                setSuccess("Password Changed Successfully Done.");
                history.push('/')
                try{
                    form.resetFields()
                }
                catch{
                    console.log('not resetting')
                }
                 setTimeout(()=>{
                     setSuccess('')
                     
                 },5000)

            } else {
                setError(result[1]);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    }
    

    //Password Reset Form
    const ResetForm = () => {
        return (
            <div>
                {loading && <Loading />}
                {error && <Error error={error} />}
                {success && <Success success={success} />}
                <Form autoComplete="off" onFinish={handleSubmitForm} layout="vertical">
                    <FormPassword
                        className="formInput"
                        label={"Password"}
                        placeholder={"Enter New Password"}
                        value={new_password}
                        name={"new_password"}
                        onChange={(key, value, id) => setNewPassword(value)}
                        required={true}
                    />
                    <FormPassword
                        className="formInput"
                        label={"Confirm Password"}
                        placeholder={"Enter Confirm Password"}
                        value={confirm_password}
                        name={"confirm_password"}
                        onChange={(key, value, id) => setConfirmPassword(value)}
                        required={true}
                    />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="userAuthbtn">
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    };
    //render part
    return (
        <Row className="cont-fluid">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <img src={signupImage} alt="reset_password" className="vectorImage" />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="authFormDiv">
            <MyPhysioLogo page='login' />
                <h1>Change Password</h1>
                {ResetForm()}
            </Col>
        </Row>
    )
}
export default ResetPassword;