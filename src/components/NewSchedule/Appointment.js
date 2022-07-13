import { useState } from "react";
// import components
import Model from "./components/model";
import TabelTab from "./components/TabelTab";
//import ant design
import 'antd/dist/antd.css';
import './Appointment.css';

import Error from './../UtilityComponents/ErrorHandler';
import Success from './../UtilityComponents/SuccessHandler';
import BackButton from "../../PatientComponents/shared/BackButton";



function Appointment() {
  const [isVisible, setIsVisible] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  return (
    <>
    {/* header */}
      <div className="header">
      
        <h2 >  <BackButton />  Visits</h2>
        {error && <Error error={error} />}
    {success && <Success success={success} />}
        <div className="end" >
          <Model setError={setError} setSuccess={setSuccess} isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </div>
      {/* body */}
      <TabelTab setIsVisible={setIsVisible} />
    </>
  );
}

export default Appointment;
