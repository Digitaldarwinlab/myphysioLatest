import "./PostAssesment.css"
import {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Dashboard from "../../components/Dashboard/dashboard";
import {useSelector,useDispatch} from "react-redux";
import {ASSESMENT_CLEARSTATE} from "../../contextStore/actions/Assesment";
import BackButton from "../PatientComponents/shared/BackButton";

const AssesmentCompletion = () => {
    const dispatch = useDispatch();
    const FirstAssesment = useSelector(state => state.FirstAssesment);
    const questionAnswer = useSelector(state => state.questionAnswerReducer)
    const Assesment = {
        subjective:FirstAssesment.subjective,
        sports_type:FirstAssesment.Sports_type,
        build:FirstAssesment.Built,
        history:FirstAssesment.History,
        medication:FirstAssesment.medication,
        others:FirstAssesment.Others,
        past_medical_history:FirstAssesment.past_medical_history,
        any_other_details:FirstAssesment.any_other_details,
        surgical_history_notes:FirstAssesment.Surgical_History_Notes,
    }

   

    const posture = {
        posture : FirstAssesment.posture
    }
    const history = useHistory();

    const [notes,setNotes] = useState('');

    const id = JSON.parse(localStorage.getItem("userId"));

    const nextClickHandler = () => {
        const data = {
            assesment :Assesment,
            quiz:questionAnswer,
            posture: posture,
            notes:notes
        }
        axios.post(process.env.REACT_APP_API+"/add_emp_assessment/",{empolyee_id:id, data}).then(res =>  {
            dispatch({type:ASSESMENT_CLEARSTATE});
            dispatch({ type: "CLEAR" });
    dispatch({type:'JOINT_CLEARSTATE'});
            alert("Your data has been saved.")
            history.push('/patient/enterprise/dashboard')
        }).catch(err => alert(err));
       
    }

    const changeHandler = (event) => {
setNotes(event.target.value)
    }
    return<>
    <h3 className="fw-bold m-2">
              <BackButton />
          </h3><section className="post"> <div className="postcompletion">
        <h3>Thank you. The assessment has been completed. We will provide you with the assessment details and a schedule for functional therapies shortly.
</h3>

<div className="notes">
<label><b>If you want to share something with us.</b></label>
<textarea rows={10} className="notesbox" onChange={changeHandler} value={notes}/>
</div>
<button className="submitt" onClick={nextClickHandler}>Go To Dashboard</button>
    </div>
    </section>
    </>
}

export default AssesmentCompletion;