import {React,useEffect,useState} from 'react'
import {Row,Col}  from 'antd'
import BackButton from '../shared/BackButton'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router'

import VideoScreen from '../shared/VideScreen'
import AchievedResult from '../shared/AchievedResult'
import CircularBar from '../shared/CircularProgress'
import { FaMedal, FaStopwatch } from "react-icons/fa";
import {exercise_detail} from '../../PatientAPI/PatientDashboardApi'
import {Button} from 'antd';
import './ExerciseDetail.css'
const ExerciseDetail=(props)=>{

   
    
  //  console.log(datais)
    /*
    console.log(datais[key])
    let no_of_set=Object.keys(datais[key])
    console.log(no_of_set)
    console.log(datais[key][no_of_set.length-1])
   let inner_keys=Object.keys(datais[key][no_of_set.length-1])
    console.log('inner keys')
    console.log(inner_keys)
    console.log(datais[key][no_of_set.length-1][inner_keys[1]])
    */
    const history=useHistory()
    const host = window.location.hostname === "localhost";
    const location=useLocation()


    const [exercise,Setexercise]=useState(location.state.exercise)
    const [exercises,Setexercises]=useState(location.state.exercises?location.state.exercises:[])
    
    console.log('location se aya')
    console.log(exercise)
    const [video_url,Setvideourl]=useState(location.state.exercise.video_url)
    const [instructions,Setinstructions]=useState([])
    const handleClick=()=>{
        history.push({
            pathname: '/patient/ai', state: {
                exercise,
                exercises 
            }
    })
}
    let data = [
        { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
        { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
        { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
        { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." }
    ]
    const getData= async ()=>{
                exercises.map(async(exercise,index)=>{
                    const instruction = await exercise_detail(exercise.name)
                    console.log("data inside ",instruction[1][0])
                    //Setinstructions([...instructions,instruction[1][0]])
                    localStorage.setItem(`details${index}`,JSON.stringify(instruction[1][0]))
                })
    }
    
    const [video_path, setVideoPath] = useState('')
    useEffect(async()=>{
        getData()
        //exercises.map(async(exercise)=>{
            // const instruction = await exercise_detail(exercise.name)
            // setVideoPath(instruction[1][0].video_path)
            console.log("url ",`${process.env.REACT_APP_EXERCISE_URL}/${video_path}`)
            for (let i=0;i<exercises.length;i++){
                let res = JSON.stringify(localStorage.getItem(`details${i}`))
               // Setinstructions([...instructions,res])
            }
            return ()=>{
                for (let i=0;i<exercises.length;i++){
                    localStorage.removeItem(`details${i}`)
                }
    }
       // })
    },[])
    console.log("instructions ",instructions)
    console.log("url ",`${process.env.REACT_APP_EXERCISE_URL}/${video_path}`)
    return(
        <div className="exercise-detail" id="exercise-detail">
         <h3 className="fw-bold mt-2 ms-2"><BackButton /></h3>

    {instructions.length>0&&instructions.map((exercise,index)=>{
        <Row className="main-container p-1" id="main-container">
        <Col className="left-box m-1">
            <div className="top-heading" id="top-heading">
                <h2 className="heading" id="heading"><b>{exercise.name} - {exercise.Rom.joint}</b></h2>
                {/* <h2 className="heading" id="heading"><b>Push ups - "left hip</b></h2> */}
                <h3 className="subtext" id="subtext"><b style={{ color: "teal"}}> Find the Fun in Exercise and Track your Progress.......</b> </h3>
            </div>
            <video src={`${process.env.REACT_APP_EXERCISE_URL}/${video_path}`}></video>
            <div className="video">
            {/* <VideoScreen video={`${process.env.REACT_APP_EXERCISE_URL}/${video_path}`} /> */}
            {/* <VideoScreen video={`${process.env.REACT_APP_EXERCISE_URL}/images/v1/276485069.mp4`} /> */}
            </div>
        
        </Col>
        <Col className="right-box">
                            <div className="today-progress" id="total-progress">
                            <h4 className="fw-bold text-center p">Last Week's Practice Result</h4>
                            <div className="border px-1 status-box py-1">

                                <AchievedResult
                                    icon={<FaMedal size={25} color="black" />}
                                    score="8/10" message="Your Success" />
                                <CircularBar precentage={5000 / 6000 * 100} score={5000} color='#76c0b1' />
                                <AchievedResult
                                    icon={<FaStopwatch size={25} color="black" />}
                                    score="30 min" message="Your Practice Time" />
                            </div>

                            </div>
                            <button className="skip-button" id="skip-button" onClick={handleClick}>Skip</button>
                            <div className="instructions" id="instructions">
                                <center><h3><b>Step By Step Instructions</b></h3></center>
                                <ol className="instruction-list" id="instruction-list">
                                    <li>{exercise.instruction1}</li>
                                    <li>{exercise.instruction2}</li>
                                </ol>
                                
                            </div>
                        </Col>
        
    </Row>
      })} 
    <button className="skip-button" id="skip-button" onClick={handleClick}>Skip</button>
        </div>
    )
}


export default ExerciseDetail;