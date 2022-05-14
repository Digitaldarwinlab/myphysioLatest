import { useState, useEffect } from "react";
import axios from "axios";
import "./Qa.css";
import { AiOutlineDown } from "react-icons/ai";
import { Pagination } from "antd";
import BackButton from "../PatientComponents/shared/BackButton";
import { useSelector } from "react-redux";


const Qa = () => {

    const state = useSelector(state => state.episodeReducer);
    const [assesmentIsClicked, setAssesmentIsClicked] = useState(false);
    const [quizIsClicked, setQuizIsClicked] = useState(false);
    const [anteriorIsClicked, setAnteriorIsClicked] = useState(false);
    const [lateralIsClicked, setLateralIsCLicked] = useState(false);
    const [notesIsClicked, setNotesIsClicked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    const [paginationState, setPaginationState] = useState({
        totalPage: 5,
        current: 1,
        minIndex: 0,
        maxIndex: 1,
        pageSize: 6
    });
    const userInfo = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        //    axios.post('https://myphysio.digitaldarwin.in/api/view_answer/',{"pp_eep_id": id}).then(res => {const data = res.data[res.data.length-1];
        // let formattedData = [];
        // for(const key in data){
        //     formattedData.push(data[key]);
        // }

        // formattedData = formattedData.filter(data => typeof(data)!== "number");
        // setQuiz(formattedData);
        // }).catch(err => console.log(err))
        console.log(userInfo.role);
        let id;
        if (userInfo.role === "employee" || userInfo.role === "enterprise_patient") {
            id = JSON.parse(localStorage.getItem("userId"));
        } else {
            id = state.employee_code;
        }

        setLoading(true);
        axios.post(process.env.REACT_APP_API + "/get_emp_assessment/", { id }).then(res => {
            setLoading(false)
            console.log(res.data); setData(res.data.reverse())
            setLoading(false);
            setPaginationState({
                ...paginationState,
                pageSize: 1,
                total: res.data.length / 1,
                current: 1,
                minIndex: 0,
                maxIndex: 1,
            });
        }).catch(err => {
            setLoading(false);
            console.log(err)
        });
    }, [state.employee_code]);

    const PaginationChange = (page, pageSize = paginationState.pageSize) => {
        setPaginationState({
            ...paginationState,
            pageSize: pageSize,
            total: data.length / pageSize,
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize,
        });
    };

    // data.length !== 0 && console.log(data.data.assesment);

    return <>
        {userInfo.role === "employee" || userInfo.role === "enterprise_patient" && <h3 className="fw-bold m-2">
            <BackButton />
        </h3>}
        <div className="previous-quiz">

            <h2 className="head"><b>Previous Assesment</b></h2>

            {data.length !== 0 ? data.map((data, index) => index >= paginationState.minIndex &&
                index < paginationState.maxIndex && <div key={index}>

                    <div className="boxx">
                        <h4><b>Your Assesment Score in {data.score * 10}</b></h4>
                        <p> Your body is at <b> {data.score < 0.3 ? "Low Risk" : data.score < 0.8 ? "Medium Risk" : "High Risk"}</b></p>
                    </div>
                    <ul style={{padding:"0"}}>
                        <li> <div className="boxx2" onClick={() => { setAssesmentIsClicked(!assesmentIsClicked) }}><h3><AiOutlineDown style={{ marginRight: "10px", transform: assesmentIsClicked ? "rotate(0)" : "rotate(270deg)" }} /><b>Physical Assesment</b></h3></div>{assesmentIsClicked && <div className="boxx">
                            <h4><b>Physical Assesment</b></h4>
                            <table style={{ width: "40%", margin: "20px 20px" }}>
                                <thead>
                                    <tr>
                                        <td >Occupation</td>
                                        <td>Duration</td>
                                        <td>Type</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.assesment.subjective.map((occ,index) => <tr key={index}><td>{occ.occupation}</td>
                                        <td>{occ.duration}</td><td>{occ.Sports_type}</td></tr>)}
                                </tbody>
                            </table>
                            {data.length !== 0 && <ul className="grid-col">


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
                        </div>}</li>
                       
                        <li> {data.data.posture.posture.Posterial_view && <>
                            <div className="boxx2" onClick={() => { setAnteriorIsClicked(!anteriorIsClicked) }}><h3><AiOutlineDown style={{ marginRight: "10px", transform: anteriorIsClicked ? "rotate(0)" : "rotate(270deg)"  }} /><b>Posture Analaysis </b></h3></div>
                            {anteriorIsClicked && <><div className="boxx row">
                                <div className="col-md-9">
                                    <h5>Anterior Angles</h5>
                                    {data.length !== 0 && <ul className="grid-col">
                                        <li><b>Nasal Bridge:</b> {data.data.posture.posture.Posterial_view.Angles[0]}</li>
                                        <li><b>Shoulder levels(Acrimion):</b> {data.data.posture.posture.Posterial_view.Angles[1]}</li>
                                        <li><b>Umbilicus:</b> {data.data.posture.posture.Posterial_view.Angles[2]}</li>
                                        <li><b>Knees:</b> {data.data.posture.posture.Posterial_view.Angles[3]}</li>
                                        <li><b>Ankle/Foot:</b> {data.data.posture.posture.Posterial_view.Angles[4]}</li>
                                        <li><b>Line of Gravity:</b> {data.data.posture.posture.Posterial_view.Angles[5]}</li>

                                        {/* {data.data.posture.posture.Posterial_view.Angles.map((angle,index) =>  <li key={index}>{angle}</li> )} */}

                                    </ul>}</div>
                                <div className="immggg col-md-3"> <img src={data.data.posture.posture.Posterial_view.posterial_view_image} /></div>

                            </div></>}
                            {data.data.posture.posture.Posterial_view && <>

                                {anteriorIsClicked && <div className="boxx row">
                                    <div className="col-md-9">
                                        <h5><b>Lateral Angles</b></h5>
                                        {data.length !== 0 && <ul className="grid-col">
                                            <li><b>Head Deviation:</b> {data.data.posture.posture.lateral_view.Angles[0]}</li>
                                            <li><b>Shoulder:</b> {data.data.posture.posture.lateral_view.Angles[1]}</li>
                                            <li><b>Hip/Pelvic Deviation:</b> {data.data.posture.posture.lateral_view.Angles[2]}</li>
                                            <li><b>Knees Deviation:</b> {data.data.posture.posture.lateral_view.Angles[3]}</li>
                                            {/* {data.data.posture.posture.lateral_view.Angles.map((angle,index) =>  <li key={index}>{angle}</li> )} */}

                                        </ul>}</div><div className="immggg col-md-3">
                                        <img src={data.data.posture.posture.lateral_view.posterial_view_image} />
                                    </div>

                                </div>}

                            </>}</>}</li>
                        <li>
                            <div className="boxx2" onClick={() => { setNotesIsClicked(!notesIsClicked) }}><h3><AiOutlineDown style={{ marginRight: "10px", transform: notesIsClicked ? "rotate(0)" : "rotate(270deg)"  }} /><b>Notes</b></h3></div>
                            {notesIsClicked && <div className="boxx">
                                <h4><b>Notes</b></h4>
                                {data.length !== 0 && data.data.notes}


                            </div>}
                        </li>
                    </ul>


                    {/* {data.data.posture.posture.Posterial_view && <> 
                        </>} */}

                    <Pagination
                        pageSize={paginationState.pageSize}
                        current={paginationState.current}
                        total={paginationState.total}
                        onChange={PaginationChange}
                        style={{ marginBottom: "10px" }}
                    /></div>) : <center>{loading ? "Loading..." : "No Data Found!"}</center>}

        </div>
    </>

}

export default Qa;