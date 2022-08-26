import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PatientAI from './PatientAI'

export default function PatientAiMain() {
    const history = useHistory()
    const state = useSelector(state=>state.patCurrentEpisode)
    useEffect(() => {
        const unblock = history.block((location, action) => {
            if(state.pp_ed_id != 0){
                if (localStorage.getItem("painmeter_submit")) {
                    return true;
                  }
                if (window.confirm( "This will take you back to the schedule page. Are you sure you want to abandon and go back?")) {
                    console.log("exercise data cleared");
                   // window.location.href = location.pathname
                    history.location.reload()
                    return true;
                } else {
                    console.log("not cleared", location);
                    return false;
                }
            }
            //}
        });
        return () => {
            unblock();
        };
    }, [history]);
    return (
        <PatientAI history={history} />
    )
}