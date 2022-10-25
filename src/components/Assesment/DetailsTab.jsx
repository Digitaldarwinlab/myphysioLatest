import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getEpisode } from '../../API/Episode/EpisodeApi';

const DetailsTab = () => {
    const state = useSelector((state) => state);
    const [episodedata, SetepisodeData] = useState();
    useEffect(async () => {
        sessionStorage.removeItem("submit");
        sessionStorage.removeItem("posesubmit");
        sessionStorage.removeItem("specialsubmit");
        const data = await getEpisode(state.episodeReducer.patient_code);
        if (data[0]) {
            state.FirstAssesment.episode_id = data[0].pp_ed_id;
            SetepisodeData({
                episodeId: data[0].pp_ed_id,
                complaintId: data[0].primary_complaint,
                start_date: data[0].start_date,
            });
        } else {
            SetepisodeData({
                episodeId: "No data",
                complaintId: "no data",
                start_date: "no data",
            });
        }
    }, [state.episodeReducer.patient_name]);
  return (
         <Col span={24}>
                    <div className='patient-details-1x h3-font-1x bg-theme-1x div-border-1x'>
                        <span>Patient Name : {state.episodeReducer.patient_name}</span>
                        <span>Patient Episode :  {episodedata ? episodedata.complaintId : null}</span>
                        <span>Patient Code : {state.episodeReducer.patient_main_code}</span>
                    </div>
                </Col>
  )
}

export default DetailsTab