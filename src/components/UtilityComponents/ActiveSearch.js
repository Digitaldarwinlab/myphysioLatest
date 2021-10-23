import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import "../../styles/Layout/ActiveSearch.css"
{/*  aswin 10/22/2021 start */}
import { getPatientList, searchPatient } from '../../API/PatientRegistration/Patient';
{/*  aswin 10/22/2021 stop */}
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
   {/*  aswin 10/22/2021 start */}
   const handleChange = async (text) => {
    const searchData = await searchPatient(text);
    const searchFilterData = searchData.map(val=>val.first_name + " " + val.last_name + " " + val.pp_patm_id + " " + val.mobile_no + " " + val.pin)
    console.log('search found ',searchFilterData)
    setSuggestions(searchFilterData)
    Setinputtextvalue(text)
    // let matches = [];
    // if (text.length >= 2) {
    //     matches = users.filter(user => {
    //         const regex = new RegExp(`${text}`, "gi")
    //         return user.match(regex);
    //     })
    // }
    // setSuggestions(matches);
    // console.log('match found ', matches)
    setText(text);
}
{/*  aswin 10/22/2021 stop */}

    const focus=(e)=>{
        // console.log(e.target.id)
       
    }

    const defocus=(e)=>{
    
    //    document.getElementById(`spanid + ${e.target.id}`).innerHTML= ''
    }
{/*  aswin 10/22/2021 start */}
    const SuggestionHandler = async (text) => {
            sessionStorage.setItem('typeofvalue',typeof(text))
            const body={
              id:parseInt(text)
            }
          const headers = {
              Accept: 'application/json',
              "Content-type": "application/json"
          }
            const res = await fetch("https://myphysio.digitaldarwin.in/api/basic_detail/",{
              headers:headers,
              method:"POST",
              body:JSON.stringify(body)
            })
            const responseData = await res.json()
            console.log("user data",responseData)
            
          
           
        //   Setprofiledetail({
        //   patientName:responseData.first_name + responseData.last_name,
        //   patientCode:responseData.patient_code,
        //   episodeId: responseData.pp_ed_id,
        //   startDate :responseData.start_date,
        //   PrimaryComplaint : responseData.primary_complaint
        //       })
          

        let pdata = PatientData.filter((val, ind) => {
            return (
                val.pp_patm_id.toString() === text
            )
        })
       // console.log(pdata[0])

        Setinputtextvalue('')

        if (props.carePlan) {
            // alert("Inside 1");
            props.handleActiveSearchResult(responseData);
        } else if (props.prescreption && !props.dashboard) {
            // alert("Inside 2");
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_name",
                    value: responseData.first_name + " " + responseData.last_name
                }
            });
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_code",
                    value: responseData.pp_patm_id
                }
            });
            dispatch({
                type: ASSESSMENT_STATE_CHANGE,
                payload: {
                    key: "patient_main_code",
                    value: responseData.patient_code
                }
            });
            props.getPrescreptioEpisode(responseData);
        } else {
            // alert("Inside 3");
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_code",
                    value: responseData.pp_patm_id
                }
            })
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_main_code",
                    value: responseData.patient_code 
                }
            })

            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "patient_name",
                    value: responseData.first_name + " " + responseData.last_name
                }
            })
            dispatch({
                type: EPISODE_STATECHANGE, payload: {
                    key: "Patient_no",
                    value: responseData.mobile_no
                }
            })
            if (props.UpdateHhistory) {
                props.UpdateHhistory(responseData.patient_medical_history);
            }
            if (props.updatePatientState) {
                props.updatePatientState(responseData);
            }
            getEpisodeDetails(responseData, dispatch)
        }
        sessionStorage.setItem('patient_code',responseData.pp_patm_id)
        {/*  aswin 10/22/2021 stop */}
        setSuggestions([]);
    }
    return (
        <div className=" mb-4">
            <BsSearch style={{position:'absolute',top:'13px',left:'5px'}} />
            <input type="text"  value={text} className="w-100 px-4 py-2 input-field "
                placeholder=" Search Patients.."
                onChange={e => handleChange(e.target.value)}
                // aswin 10/22/2021 start
                autoComplete={false}
                // aswin 10/22/2021 stop
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