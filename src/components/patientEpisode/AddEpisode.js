import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EPISODE_STATECHANGE, EPISODE_BOOK_SUCCESS, EPISODE_BOOK_FAILURE, EPISODE_CLEAR_STATE } from "./../../contextStore/actions/episode";
import { VALIDATION } from "./../../contextStore/actions/authAction.js";
import appointmentValid from "./../Validation/scheduleValidation/scheduleValidation.js";
import { UpdateEpisodeApi } from "./../../API/Episode/EpisodeApi";
import SchduleForm from './../UtilityComponents/SchduleForm';
import { useHistory } from 'react-router-dom';
import { EpisodeApi } from './../../API/Episode/EpisodeApi';
import { message } from 'antd'

const AddEpisode = () => {
    const [show, setShow] = useState(true);
    const [startDateState, setStartDateState] = useState("");
    const [endDateState, setEndDateState] = useState("");
    const history = useHistory();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [issuccess,Setisuccess]=useState(false)
    const [issubmit,Setissubmit]=useState(false)  
    const newstate= useSelector(state => state.episodeReducer)
    const [isModalVisible,setIsModalVisible]=useState(false)
    const [isupdating,Setisupdatingform]=useState(false)
    useEffect(() => {
        // if(state.PateintConsentReducer.show){
        //     history.push("/patient/consent-form");
        // }
        dispatch({ type: "NOERROR" });
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        const unblock = history.block((location, action) => {
         
              
                    dispatch({ type: EPISODE_CLEAR_STATE });    
                   
                  
                 
                    dispatch({ type: VALIDATION, payload: { error: false } });
                //    setClearState(true);
                    return true;
              
            
            
        });
    
        return () => {
            unblock();
        };
    }, [history,state])
    const handleChange = (key, value) => {
        if (key === "start_date" || key === "end_date") {
            if (key === 'start_date')
                setStartDateState(value.date);
            else
                setEndDateState(value.date);

            dispatch({
                type: EPISODE_STATECHANGE,
                payload: {
                    key,
                    value: value.dateString
                }
            })
        
        console.log("episode ",key , " ", value)
        } else {
            dispatch({
                type: EPISODE_STATECHANGE,
                payload: {
                    key,
                    value
                }
            })
        }
        dispatch({ type: "NOERROR" });
    }
    const info = () => {
        message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
      };

    const handleBlur = (e) => {
        console.log(state)
        const { name, value } = e.target;
        let error;
     //   console.log(name)
        
        if (name === "start_date") {
            error = appointmentValid.checkStartDate(value);
        }
       else if(name==='Ref_Dr_Name')
        {
         error=appointmentValid.checkdoctor(value)   
      //   console.log('Checking docotr')
             console.log(error)
        }
        else if (name === "end_date") {
            error = appointmentValid.checkEndDate(value);
        }
        else if (name === "complaint") {
            error = appointmentValid.checkType(value);
        }
        else if (name === "status") {
            error = appointmentValid.checkStatus(value);
        }
        else if (name === "location") {
            error = appointmentValid.checkLocation(value);
        }
        else {
            error = appointmentValid.checkReason(value);
        }
        console.log(error)

        if (error.error) {
            console.log('there is error')
            dispatch({ type: VALIDATION, payload: { error: error.error } });
        }

        //setIsModalVisible(true)
    }

    const handleSubmit = async (values) => {
      //  console.log(state.episodeReducer)
      Setissubmit(true)

      if(newstate.patient_name=='')
      {
        dispatch({ type: VALIDATION, payload: { error: 'Please select a patient' } });
        return 1
      }
        if (state.Validation.error) {
            alert("Please Fill Fields.")
        Setisuccess(false)
        } else {
            let result = await EpisodeApi(state.episodeReducer, dispatch);
            console.log(result)
            if (result && result[0]) {
                Setisuccess(false)
               
               // info()
               history.push({pathname:'/dashboard',state:{tab:2}})
            //    dispatch({ type: EPISODE_STATECHANGE, payload: { key: "success", value: "Episode Added." } });
                  
             //   setIsModalVisible(true)
                
         
                    dispatch({ type: EPISODE_CLEAR_STATE });
                
            } else {
                // if(result[1] === ""
                console.log('result aya')
                console.log(result)
                dispatch({ type: EPISODE_BOOK_FAILURE });
                dispatch({ type: VALIDATION, payload: { error: result[1] } });
            
                    Setisuccess(false)
                    dispatch({ type: "NOERROR" });
                    if (result[1] === "episode for this patient already exist") {
                        dispatch({ type: VALIDATION, payload: { error: result[1] } });
                      
                     //   dispatch({ type: EPISODE_CLEAR_STATE });
                        
                    }
                    else{
                        dispatch({ type: VALIDATION, payload: { error: result[1] } });
                     
                    }
               
            }

       

         
     
        }

       
    }

    const onSubmit = async () => {
        
        if (state.Validation.error) {
            alert("Please Fill Fields.")
        } else {
            let result = await UpdateEpisodeApi(state.episodeReducer, dispatch);
            if (result && result[0]) {
                Setisuccess(true)
               // setIsModalVisible(true)
               //  alert('resultt is')
               console.log(result)
               dispatch({ type: EPISODE_CLEAR_STATE });
             
               history.push({pathname:'/dashboard',state:{tab:2}})
               // dispatch({ type: EPISODE_STATECHANGE, payload: { key: "success", value: result[1] } });

                
            } else {
                Setisuccess(false)
               
                dispatch({ type: VALIDATION, payload: { error: result[1] } });
               
                setTimeout(() => {
                    dispatch({ type: EPISODE_BOOK_FAILURE });
                }, 3000);
            }
            // history.push("/episode")
        }

    }


    const Setupdating=()=>{
        //  alert('yess')
          Setisupdatingform(true)
      }

         const handleHide = () => {
        setShow(false);
        history.push({pathname:"/dashboard",state:{tab:2}});
    }



    return (
        
            <SchduleForm 
            issuccess={issuccess}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                handleSubmit={handleSubmit}
                disabled={state.episodeReducer.episode_id !== ""}
                opacity1={state.episodeReducer.episode_id !== "" ? 0 : 1}
                opacity2={state.episodeReducer.episode_id === "" ? 0 : 1}
                opacity3={state.episodeReducer.episode_id === "" ? 0 : 1}
                handleChange={handleChange}
                handleBlur={handleBlur}
                episode={true}
                state={state.episodeReducer}
                validationState={state.Validation}
                episodeReducer={state.episodeReducer}
                issubmit={issubmit}
                Setissubmit={Setissubmit}
                startDateState={startDateState}
                endDateState={endDateState}
                onSubmit={onSubmit}
                isupdating={isupdating}
                Setupdating={Setupdating}
            />

       
    )
}
export default AddEpisode;