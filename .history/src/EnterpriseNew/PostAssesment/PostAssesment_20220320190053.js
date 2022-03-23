import "./PostAssesment.css"
import {useState} from "react";

const AssesmentCompletion = () => {

    const [notes,setNotes] = useState('');

    const changeHandler = (event) => {
setNotes(event.target.value)
    }
    return<section className="post"> <div className="postcompletion">
        <h3>Thank you. The assessment has been completed. We will provide you with the assessment details and a schedule for functional therapies shortly.
</h3>

<div className="notes">
<label>Notes</label>
<textarea onChange={changeHandler} value={notes}/>
</div>
<button onClickCapture={}>Next</button>
    </div>
    </section>
}

export default AssesmentCompletion;