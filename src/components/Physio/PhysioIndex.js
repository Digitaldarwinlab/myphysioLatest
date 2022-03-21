import React, { useEffect, useState } from "react";
import PhysioRegisteration1 from "./PhysioRegisteration1";
import PhysioRegisteration3 from "./PhysioRegisteration3";
import PhysioRegisteration2 from "./PhysioRegisteration2";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_STATE } from "../../contextStore/actions/physioRegAction";
import { getPhysioList } from "../../API/Physio/PhysioRegister";
import { VALIDATION } from "../../contextStore/actions/authAction";
import { getClinics } from "../../API/Physio/ClinicRegister";
import { CLINIC_STATE_CHANGE } from "../../contextStore/actions/ClinicRegister";
const PhysioIndex = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [clearState, setClearState] = useState(true);
  const state = useSelector((state) => state);

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unblock = history.block((location, action) => {
      if (
        state.physioRegisterReducer.first_name !== "" ||
        state.physioRegisterReducer.middle_name !== "" ||
        state.physioRegisterReducer.Doctor_type !== "" ||
        state.physioRegisterReducer.last_name !== "" ||
        state.physioRegisterReducer.mobile_no !== "" ||
        state.physioRegisterReducer.landline !== "" ||
        state.physioRegisterReducer.whatsapp_no !== "" ||
        state.physioRegisterReducer.gender !== ""
      ) {
        if (
          window.confirm(
            "You will lost your Form Data. Do You really wantsssss?"
          )
        ) {
          dispatch({ type: CLEAR_STATE });
          setClearState(true);
          dispatch({ type: VALIDATION, payload: { error: "" } });
          return true;
        } else {
          return false;
        }
      } else {
        console.log("nothing " + state.physioRegisterReducer);
      }
    });

    return () => {
      unblock();
    };
  }, [history, state]);

  useEffect(() => {
    const getAllClinics = async () => {
      const res = await getClinics();
      console.log("clinics ", res);
      dispatch({
        type: CLINIC_STATE_CHANGE,
        payload: { key: "clinics", value: res },
      });
    };
    getAllClinics();
  }, []);

  //Change Index to Next
  const ChangeCurrentIndexToNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  //Change CurrentIndexToBack
  const ChangeCurrentIndexToBack = () => {
    setCurrentIndex(currentIndex - 1);
  };
  if (currentIndex === 0) {
    return (
      <PhysioRegisteration1
        clearState={clearState}
        back={ChangeCurrentIndexToBack}
        next={ChangeCurrentIndexToNext}
      />
    );
  } else if (currentIndex === 1) {
    return (
      <PhysioRegisteration2
        clearState={clearState}
        back={ChangeCurrentIndexToBack}
        next={ChangeCurrentIndexToNext}
      />
    );
  } else {
    return (
      <PhysioRegisteration3
        clearState={clearState}
        back={ChangeCurrentIndexToBack}
        next={ChangeCurrentIndexToNext}
      />
    );
  }
};
export default PhysioIndex;
