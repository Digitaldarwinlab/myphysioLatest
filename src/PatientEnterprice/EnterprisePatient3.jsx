import React from "react";
import BackButton from '../PatientComponents/shared/BackButton';
import "./enterprises.css";

import { useHistory } from "react-router-dom";

const EnterprisePatient3 = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));


    const history = useHistory();
  

    return (
        <>
            <h3 className="fw-bold m-2">
                <BackButton />

            </h3>
           
        </>
    )
}
export default EnterprisePatient3;