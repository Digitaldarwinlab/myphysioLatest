import "./PostAssesment.css"
import {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Dashboard from "../../components/Dashboard/dashboard";

const AssesmentCompletion = () => {
    const history = useHistory();

    const [notes,setNotes] = useState('');

    const id = JSON.parse(localStorage.getItem("userId"));

    const nextClickHandler = () => {
        axios.post(process.env.REACT_APP_API+"/employee_note/",{empolyee_id:id, note:notes}).then(res =>  history.push('/patient/enterprise/dashboard')).catch(err => alert(err));
       
    }

    const changeHandler = (event) => {
setNotes(event.target.value)
    }
    return<section className="post"> <div className="postcompletion">
        <h3>Thank you. The assessment has been completed. We will provide you with the assessment details and a schedule for functional therapies shortly.
</h3>

<div className="notes">
<label><b>If you want to share something with us.</b></label>
<textarea rows={10} className="notesbox" onChange={changeHandler} value={notes}/>
</div>
<button className="submitt" onClick={nextClickHandler}>Go To Dashboard</button>
    </div>
    </section>
}

export default AssesmentCompletion;