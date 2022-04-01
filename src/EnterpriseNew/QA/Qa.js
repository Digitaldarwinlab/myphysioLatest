import { useState,useEffect } from "react";
import axios from "axios";
import "./Qa.css";


const Qa = () => {
    const [quiz,setQuiz] = useState([]);
    const id = JSON.parse(localStorage.getItem("userId"));

   
    console.log(quiz);
    useEffect(() => {
       axios.post('https://myphysio.digitaldarwin.in/api/view_answer/',{"pp_eep_id": id}).then(res => {const data = res.data[res.data.length-1];
    let formattedData = [];
    for(const key in data){
        formattedData.push(data[key]);
    }
    formattedData = formattedData.filter(data => typeof(data)!== "number");
    setQuiz(formattedData);
    }).catch(err => console.log(err))
    },[]);
    return <div className="previous-quiz">
         <h2 className="head">Previous Assesment</h2>
        {quiz.map((question,index) => <div key={index} >
           
            <p className="quiz-question"><span>{index +1}) </span>{question.question}</p><p className="quiz-answer">   {question.answer}</p></div>) }
    </div>
}

export default Qa;