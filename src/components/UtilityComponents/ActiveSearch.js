import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "../../styles/Layout/ActiveSearch.css"
import { getPatientList } from '../../API/PatientRegistration/Patient';
import { ASSESSMENT_STATE_CHANGE, EPISODE_STATECHANGE } from "../../contextStore/actions/episode.js"
import { getEpisodeDetails } from './../care-plan/carePlanIndex';
import {BsSearch} from 'react-icons/bs'
import './Activesearch.css'
import {Form} from 'antd' 
const ActiveSearch = (props) => {
    const icon=<BsSearch />
    const [PatientData, setPatientData] = useState([])

    const [users, setusers] = useState([]);

    const [text, setText] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [inputtextvalue,Setinputtextvalue]=useState('')
    const state = useSelector(state => state.episodeReducer);
    const dispatch = useDispatch();
    const [showdetail,Setshowdetail]=useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        const loadUsers = async () => {
            const data = await getPatientList();
            setPatientData(data);
            // pp_patm_id ,first_name last_name, mobile_no
            // console.log(data);
            const Search = data.map((val, ind) => {
                return (
                    val.first_name + " " + val.last_name + " " + val.pp_patm_id + " " + val.mobile_no + " " + val.pin 
                )
            })
            setusers(Search);
        }
        loadUsers();
    }, [])


   
   // console.log(PatientData)
    const handleChange = (text) => {
        Setinputtextvalue(text)
        let matches = [];
        if (text.length >= 2) {
            matches = users.filter(user => {
                const regex = new RegExp(`${text}`, "gi")
                return user.match(regex);
            })
        }
        setSuggestions(matches);
        setText(text);
    }


    const focus=(e)=>{
        // console.log(e.target.id)
       
    }

    const defocus=(e)=>{
    
    //    document.getElementById(`spanid + ${e.target.id}`).innerHTML= ''
    }

    const SuggestionHandler = (text) => {

        let pdata = PatientData.filter((val, ind) => {
            return (
                val.pp_patm_id.toString() === text
            )
        })
        dispatch({type:'NOERROR'})
        Setinputtextvalue('')
        // aswin start 10/30/2021 start 
        sessionStorage.removeItem('patient_code')
        // aswin start 10/30/2021
        if (props.carePlan) {
            // alert("Inside 1");
            props.handleActiveSearchResult(pdata[0]);
        } else if (props.prescreption && !props.dashboard) {
            // alert("Inside 2");
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_name",
                    value: pdata[0].first_name + " " + pdata[0].last_name
                }
            });
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_code",
                    value: pdata[0].pp_patm_id
                }
            });
            sessionStorage.setItem('patient_code',pdata[0].pp_patm_id)
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_main_code",
                    value: pdata[0].patient_code
                }
            });
            props.getPrescreptioEpisode(pdata[0]);
        } else {
            // alert("Inside 3");
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_code",
                    value: pdata[0].pp_patm_id
                }
            })
            // aswin 10/30/2021 start
            sessionStorage.setItem('patient_code',pdata[0].pp_patm_id)
            // aswin 10/30/2021 stop
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_main_code",
                    value: pdata[0].patient_code 
                }
            })

            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_name",
                    value: pdata[0].first_name + " " + pdata[0].last_name
                }
            })
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "Patient_no",
                    value: pdata[0].mobile_no
                }
            })
            if (props.UpdateHhistory) {
                props.UpdateHhistory(pdata[0].patient_medical_history);
            }
            if (props.updatePatientState) {
                props.updatePatientState(pdata[0]);
            }
            getEpisodeDetails(pdata[0], dispatch)
        }
        setSuggestions([]);
    }
    return (
        <div className=" mb-4">
            <BsSearch style={{position:'absolute',top:'13px',left:'5px'}} />
            <input type="text"  value={text} className="w-100 px-4 py-2 input-field "
                placeholder=" Search Patients.."
                onChange={e => handleChange(e.target.value)}
                value={inputtextvalue}
                id="input-search"
            />
            <div className="search-result-box">
         
            {suggestions && suggestions.map((val, i) => {
                let value = val.split(" ")
               
                return (
                    <div className="search-bar">
                        {
                            <div className="search-item" id="search-item">

                                <h5 className="ActiveSearch p-2 input-field mt-2"
                                onMouseOver={focus}
                                onMouseOut={defocus}
                                id={value[3]}
                                    onClick={() => SuggestionHandler(value[2])} >
                                    {value[0] + " " + value[1] + ', M : '+ value[3]}
                               <span id={'spanid'+value[3]}></span></h5>
                            </div>
                        }

                    </div>
                )

            })}
            </div>

        </div>
    );
}

export default ActiveSearch