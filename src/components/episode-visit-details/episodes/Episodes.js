import React, { useState, useEffect } from "react";
import { Row, Col, Button, Spin , Space } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import AddButton from './../AddButton';
import Loading from './../../UtilityComponents/Loading';
import { EPISODE_STATECHANGE, ASSESSMENT_EPISODE_NAME, ASSESSMENT_STATE_CHANGE } from "../../../contextStore/actions/episode";
import { STATECHANGE } from "../../../contextStore/actions/Assesment";
import { getEpisode } from "./../../../API/Episode/EpisodeApi";
import "../../../styles/Layout/Episode.css";
import SingleEpisode from './single-episode';
import { RiPencilFill } from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

const floatIcon = {
    float: "right"
}



const Episodes = ({ handleClick2 }) => {

    const history = useHistory()

    const [episodeData, setEpisodeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSingleComponent, setShowSingleComponent] = useState(false);
    const [singleComponentId, setSingleComponentId] = useState("");

    const state = useSelector(state => state.episodeReducer);
    const dispatch = useDispatch();

    useEffect(async () => {
        setLoading(true);
        const data = await getEpisode(state.patient_code);
        setEpisodeData(data);

        setLoading(false);
        if (data.length !== 0) {
            GotoPrescreption(data[0].episode_number, data[0].primary_complaint, data[0].start_date, data[0].pp_ed_id, false);
        } else {
            GotoPrescreption("", "", "", "", false);
        }
        dispatch({
            type: ASSESSMENT_STATE_CHANGE,
            payload: {
                key: "patient_name",
                value: state.patient_name
            }
        })
        dispatch({
            type: ASSESSMENT_STATE_CHANGE,
            payload: {
                key: "patient_code",
                value: state.patient_code
            }
        });
        // eslint-disable-next-line
    }, [state.patient_code]);
    // console.log('episode iss')
    // console.log(episodeData)
    const Assesment = (id, complaint, Sdate) => {
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'episode_id',
                value: id
            }
        })
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'Complaint',
                value: complaint
            }
        })
        dispatch({
            type: STATECHANGE,
            payload: {
                key: 'EspiStart',
                value: Sdate
            }
        })
        history.push("/assessment/1")
    }

    const UpdateHandler = async (id) => {
        // setLoading(true);
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'episode_id',
                value: id
            }
        })

        const data = await getEpisode(state.patient_code)
        let newData = data[0]
        newData.treating_doc_details = JSON.parse(newData.treating_doc_details);
        // console.log('new Data')
        // console.log(data)
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'Ref_Dr_Name',
                value: newData.treating_doc_details.Ref_Dr_Name,
            }
        })
        

        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'Ref_Dr_ID',
                value: newData.treating_doc_details.Ref_Dr_ID,
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'complaint',
                value: newData.primary_complaint,
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'Operative_Types',
                value: newData.Operative_Types,
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'Patient_History',
                value: newData.Patient_History,
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'start_date',
                value: newData.start_date,
            }
        })
        dispatch({
            type: EPISODE_STATECHANGE,
            payload: {
                key: 'end_date',
                value: newData.end_date,
            }
        })
  // aswin 10/17/2021 start //
  dispatch({
    type: EPISODE_STATECHANGE,
    payload: {
        key: 'files',
        value: newData.files,
    }
})
// aswin 10/17/2021 stop //

     history.push("/add-episode")
    }

    //ChangeShow
    const handleShowSingleEpisode = () => {
        setShowSingleComponent(false);
    }
    //handleClick
    const handleClick = (id) => {
        setSingleComponentId(id);
        setShowSingleComponent(true);
    }
    //
    const GotoPrescreption = (number, complaint, Sdate, ed_id, redirect = true) => {
        dispatch({
            type: ASSESSMENT_EPISODE_NAME,
            payload: {
                key: "episode_no",
                value: number
            }
        })
        dispatch({
            type: ASSESSMENT_EPISODE_NAME,
            payload: {
                key: "primary_complaint",
                value: complaint
            }
        })
        dispatch({
            type: ASSESSMENT_EPISODE_NAME,
            payload: {
                key: "start_date",
                value: Sdate
            }
        });
        dispatch({
            type: ASSESSMENT_EPISODE_NAME,
            payload: {
                key: "pp_ed_id",
                value: ed_id
            }
        });
        if (redirect)
            history.push("/notes")
    }
    //EpisodeList 
    const EpisodeList = () => {
        return (
            <React.Fragment>
                
                <Col span={24} className="mb-3">
                    <Row justify="space-between">
                        <Col lg={18} md={18} sm={15} xs={15}>
                            <h4 className="fw-bold">All Episodes</h4>
                        </Col>
                        <Col lg={6} md={6} sm={5} xs={5} className="text-end">
                            <AddButton className="addCourse" onClick={handleClick2} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    {loading && <div className="text-center"><Spin tip="Fetching Episodes" size="large"></Spin></div>}
                    {episodeData.length === 0 && !loading && <p className="fw-bold">No Episodes are Added..</p>}
                    {episodeData.length !== 0 && !loading && episodeData.map((episode, index) => {
                        return (
                            <div className="border" key={episode.pp_ed_id}>
                                <span className="border rounded px-2" style={floatIcon}>
                                    
                                    <BsFillEyeFill className="iconClass3" onClick={() => UpdateHandler(episode.pp_ed_id)} />
                                </span>
                                <div className="px-2 py-2">
                                <p className="p" style={{fontSize:'28px'}}><center> <b>Status : </b> {episode.end_date ? 'Closed' : 'Open'}</center> </p>
                                    <p className=" p"> <b>Episode </b> {index + 1} :{episode.pp_ed_id} {episode.PP_Patient_Details.Patient_name}</p>
                                    <p className="p"><b>Episode Type </b> {episode.primary_complaint}</p>
                                  
                                  <p className="p"><b>Refering Doctor Names  :</b> {JSON.parse(episode.treating_doc_details).Ref_Dr_Name}</p>
                                   <p className="p"><b> Start Date </b>: {episode.start_date}</p>
                                    <p className="p"><b> Operative Types:</b> {episode.Operative_Types}</p>
                                    { episode.end_date ? <p><b>End Date : </b>  {episode.end_date} </p> : null}
                                    {/* <div className="text-center me-5">
                                                                  
                                        <Button className="button1" id="bnid" style={{color:"white", marginLeft:"15px"}} onClick={() => Assesment(episode.pp_ed_id, episode.primary_complaint, episode.start_date)}><b>Assesment</b></Button>
                                        <Button className="button1" id="bnid" style={{color:"white", marginLeft:"15px"}} onClick={() => GotoPrescreption(episode.episode_number, episode.primary_complaint, episode.start_date, episode.pp_ed_id,episode.end_)}><b>Prescription</b></Button>
                                    </div> */}
                                    <Space size="middle">
                                      <Row justify="center">
                     <Col span={2}>  <Button className="button1" id='bnid' style={{color:"white", marginLeft:"15px" ,width:'103px'}} onClick={() => Assesment(episode.pp_ed_id, episode.primary_complaint, episode.start_date)}><b>Assesment</b></Button></Col>
                     <Col span={2}>  <Button className="button1" id='bnid' style={{color:"white", marginLeft:"15px" ,width:'103px'}} onClick={() => GotoPrescreption(episode.episode_number, episode.primary_complaint, episode.start_date, episode.pp_ed_id,episode.end_)}><b>Prescription</b></Button></Col>
                </Row>
                </Space>
                                </div>
                            </div>)
                    })}
                </Col>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Row className="px-2 py-2 m-3">
                {!showSingleComponent && EpisodeList()}
            </Row>
            {showSingleComponent && <SingleEpisode id={singleComponentId} handleShowSingleEpisode={handleShowSingleEpisode} />}
        </React.Fragment>
    )
};

export default Episodes;