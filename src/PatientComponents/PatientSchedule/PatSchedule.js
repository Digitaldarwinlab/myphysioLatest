import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import VideoScreen from './../shared/VideScreen';
import BackButton from './../shared/BackButton';
import PatCalendar from './PatCalendar';
import { useSelector } from 'react-redux';

//Fake Instrunctions
let data = [
    { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
    { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
    { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." },
    { text: "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem." }
]
//hostname
let host = window.location.hostname === "localhost";
let url = window.location.origin;
// Main Component
const PatientSchedule = () => {
    const [VideoUrl, setVideoUrl] = useState("");
    //Instructions 
    const Instrunction = (data) => {
        return (
            <ol>
                {
                    data.map((val, index) => {
                        return (
                            <li key={index} className="text-justify p">
                                {
                                    val.text
                                }</li>
                        )
                    })
                }
            </ol>
        )
    }
    

    console.log('hellossssssss')
    console.log(new Date(1632623460000))
    //function for changing videoUrl
    const ChangeVideoUrl = (url1) => {
        setVideoUrl(url1);
    }
    return (
        <>
            <h3 className="fw-bold mt-2 ms-2"><BackButton /></h3>
            <Row className="m-2"  justify="space-around">
             
                <Col span={24} className="text-center" >
                    <center>
                    <PatCalendar  className="w-100" onChangeVideoUrl={ChangeVideoUrl} />
                    </center>
                </Col>
               
            </Row>

            <Row>
                <Col span={12}>

                </Col>
                <Col span={12}>

                </Col>
            </Row>
        </>
    )
};

export default PatientSchedule;