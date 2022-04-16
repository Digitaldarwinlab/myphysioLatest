import { useState, useEffect } from "react";
import axios from "axios";
import "./Qa.css";


const Qa = () => {
    const [quiz, setQuiz] = useState([]);
    const id = JSON.parse(localStorage.getItem("userId"));
    const [data, setData] = useState([]);

    console.log(quiz);
    useEffect(() => {
        //    axios.post('https://myphysio.digitaldarwin.in/api/view_answer/',{"pp_eep_id": id}).then(res => {const data = res.data[res.data.length-1];
        // let formattedData = [];
        // for(const key in data){
        //     formattedData.push(data[key]);
        // }

        // formattedData = formattedData.filter(data => typeof(data)!== "number");
        // setQuiz(formattedData);
        // }).catch(err => console.log(err))
        axios.post(process.env.REACT_APP_API + "/get_emp_assessment/", { id }).then(res => { console.log(res.data); setData(res.data[res.data.length - 1]) });
    }, []);

    data.length !== 0 && console.log(data.data.assesment);

    return <div className="previous-quiz">
        <h2 className="head"><b>Previous Assesment</b></h2>

        {data.length !== 0 ? <>
            <div className="boxx">
                <h4><b>Your Assesment Score in {data.score * 10}</b></h4>
                <p> Your body is at <b> {data.score < 0.3 ? "Low Risk" : data.score < 0.8 ? "Medium Risk" : "High Risk"}</b></p>
            </div>
            <div className="boxx">
                <h4><b>Physical Assesment</b></h4>
                {data.length !== 0 && <ul className="grid-col">
                {data.data.assesment.subjective.map(occ=><><li><b>Occupation:</b> {occ.occupation}</li>
                <li><b>Duration:</b> {occ.duration}</li></>) }
                    {/* {data.data.assesment.subjective[0].occupation && <li><b>Occupation:</b> {data.data.assesment.subjective[0].occupation}</li>}
                    {data.data.assesment.subjective[0].duration && <li><b>Duration:</b> {data.data.assesment.subjective[0].duration}</li>} */}
                    {data.data.assesment.build && <li><b>Built Type:</b> {data.data.assesment.build}</li>}
                    {data.data.assesment.history && <li><b>History of Present Complaint:</b> {data.data.assesment.history}</li>}
                    {data.data.assesment.others && <li><b>Others:</b> {data.data.assesment.others}</li>}
                    {data.data.assesment.past_medical_history && <li><b>Past Medical History:</b> {data.data.assesment.past_medical_history.map((data, index) => "  " + (index + 1) + ") " + data)}</li>}
                    {/* <li><b>Past Medical History:</b> {data.data.assesment.past_medical_history[0]}</li>
            <li><b>Past Medical History:</b> {data.data.assesment.past_medical_history[1]}</li> */}
                    {data.data.assesment.surgical_history_notes && <li><b>Surgical History Notes:</b> {data.data.assesment.surgical_history_notes}</li>}
                    {data.data.assesment.any_other_details && <li><b>Any Other Details:</b> {data.data.assesment.any_other_details}</li>}
                    {/* <h5>Subjective</h5>
          {data.data.assesment.subjective.map((job,index) => <li>
              <p><b>Occupation</b>: {job.occupation}</p>
              <p><b>Duration</b>: {job.duration}</p>
          </li>)} */}
                </ul>}
            </div>
            <div className="boxx">

                <h4><b>Quiz</b></h4>
                {data.length !== 0 && data.data.quiz.questionAnswers.map((question, index) => <div key={index} >

                    <p className="quiz-question"><span>{index + 1}) </span>{question.question}</p><p className="quiz-answer">   {question.answer}</p></div>)}
            </div>
           { data.data.posture.posture && <> <div className="boxx">
                <h4><b>Posture Analaysis</b></h4>
                <h5>Anterior Angles</h5>
                {data.length !== 0 && <ul className="grid-col">
                    <li><b>Nasal Bridge:</b> {data.data.posture.posture.Posterial_view.Angles[0]}</li>
                    <li><b>Shoulder levels(Acrimion):</b> {data.data.posture.posture.Posterial_view.Angles[1]}</li>
                    <li><b>Umbilicus:</b> {data.data.posture.posture.Posterial_view.Angles[2]}</li>
                    <li><b>Knees:</b> {data.data.posture.posture.Posterial_view.Angles[3]}</li>
                    <li><b>Ankle/Foot:</b> {data.data.posture.posture.Posterial_view.Angles[4]}</li>
                    <li><b>Line of Gravity:</b> {data.data.posture.posture.Posterial_view.Angles[5]}</li>

                    {/* {data.data.posture.posture.Posterial_view.Angles.map((angle,index) =>  <li key={index}>{angle}</li> )} */}

                </ul>}
            </div>
            <div className="boxx">
                <h5><b>Lateral Angles</b></h5>
                {data.length !== 0 && <ul className="grid-col">
                    <li><b>Head Deviation:</b> {data.data.posture.posture.lateral_view.Angles[0]}</li>
                    <li><b>Shoulder:</b> {data.data.posture.posture.lateral_view.Angles[1]}</li>
                    <li><b>Hip/Pelvic Deviation:</b> {data.data.posture.posture.lateral_view.Angles[2]}</li>
                    <li><b>Knees Deviation:</b> {data.data.posture.posture.lateral_view.Angles[3]}</li>
                    {/* {data.data.posture.posture.lateral_view.Angles.map((angle,index) =>  <li key={index}>{angle}</li> )} */}

                </ul>}
            </div> </>}
            <div className="boxx">
                <h4><b>Notes</b></h4>
                {data.length !== 0 && data.data.notes}
                {/* {quiz.map((question,index) => <div key={index} >
           
            <p className="quiz-question"><span>{index +1}) </span>{question.question}</p><p className="quiz-answer">   {question.answer}</p></div>) } */}
            </div></> : <center>Loading...</center>}
    </div>

}

export default Qa;