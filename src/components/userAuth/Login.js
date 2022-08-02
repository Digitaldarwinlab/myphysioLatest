import React, { useState, useEffect } from "react";
import AuthForm from "./Form";
import loginImage from "./../../assets/loginImage.webp";
import MyPhysioLogo from "./../UtilityComponents/MyPhysioLogo";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "../../styles/userAuth/userAuth.css";
import { Row, Col } from "antd";
import ForgotPassword from "./ForgotPassword";
import packageJson from "../../../package.json";
import { getBuildDate } from "../../utils/utils";
import withClearCache from "../../ClearCache";
import { Link } from "react-router-dom";
const ClearCacheComponent = withClearCache(MainApp);
//const [visible, setVisible] = useState(false);
const Login = (props) => {
  
  useEffect(() => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true,
          video: true,
          // { width: 1280, height: 720 }
        },
        function (mediaStream) {
          console.log(mediaStream);
          console.log(mediaStream);
          const tracks = mediaStream.getTracks();
          tracks[0].stop();
          tracks.forEach((track) => track.stop());
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
          <LazyLoadImage width={1000} height={1000} src={loginImage} alt="login" className="vectorImage" />
        </Col>
        <Col
          xs={20}
          sm={24}
          md={12}
          lg={12}
          xl={10}
          className="authFormDiv LoginMain"
        >
          <MyPhysioLogo page="login" />
          {/* <ClearCacheComponent /> */}
          <h1>Welcome Back!</h1>
          <div className="employey">
            {" "}
            <Link to="/employee">Employee Login</Link>
          </div>
          <ForgotPassword />

          <AuthForm isSignin={true} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14}></Col>
      </Row>
    </>
  );
};
function MainApp(props) {
  return (
    <div>
      <p>Build date: {getBuildDate(packageJson.buildDate)}</p>
    </div>
  );
}

export default Login;
