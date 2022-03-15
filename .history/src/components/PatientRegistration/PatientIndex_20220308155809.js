import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { BASIC_CLEARSTATE } from "../../contextStore/actions/authAction";
import Register1 from './Register1';
import Register2 from './Register2';
import Register3 from './Register3';

const PatientIndex = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clearState, setClearState] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log('statee')
    console.log(state.BasicDetails)
    React.useEffect(() => {
        const unblock = history.block((location, action) => {
            if(state.BasicDetails.MiddleName!=='' || state.BasicDetails.FirstName!=='' || state.BasicDetails.LastName!=='' || state.BasicDetails.DOB!=='' || state.BasicDetails.Age!=='' || state.BasicDetails.Gender!=='' || state.BasicDetails.bloodType!=='' || state.BasicDetails.MobileNo!=='' || state.BasicDetails.LandlineNo!=='' || state.BasicDetails.WhatsAppNo!=='' )
            {   console.log(state.BasicDetails)
                if (window.confirm("You will lost your Form Data. Do You really want it?")) {
                    dispatch({ type: BASIC_CLEARSTATE });
                    setClearState(true);
                    return true;
                } else {
                    return false;
                }
            }
            else
            {
                console.log('no alert')
            }
            
        });

        return () => {
            unblock();
        };
    }, [history,state])
    //Change Index to Next 
    const ChangeCurrentIndexToNext = () => {
        setCurrentIndex(currentIndex + 1);
    }
    //Change CurrentIndexToBack 
    const ChangeCurrentIndexToBack = () => {
        setCurrentIndex(currentIndex - 1);
    }

    console.log('heyyy')


    if (currentIndex === 0) {
        return (
            <Register1 clearState={clearState} back={ChangeCurrentIndexToBack} next={ChangeCurrentIndexToNext} />
        )
    } else if (currentIndex === 1) {
        return (
            <Register2 clearState={clearState} back={ChangeCurrentIndexToBack} next={ChangeCurrentIndexToNext} />
        )
    } else {
        return (
            <Register3 clearState={clearState} back={ChangeCurrentIndexToBack} next={ChangeCurrentIndexToNext} />
        )
    }
}
export default PatientIndex;