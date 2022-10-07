import { Button, Col, Row, Typography } from 'antd'
import React, { useRef } from 'react'
import { IconContext } from 'react-icons'
import { FaClipboardList } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5';
import create from "../.././assets/create.webp";
import standingman from "../.././assets/standing-man.webp";
import pain from "../.././assets/pain.webp";
import posture from "../.././assets/posture.webp";
import aromai from "../.././assets/aromai.webp";
import arom from "../.././assets/arom.webp";
import scaleindex from "../.././assets/scaleindex.webp";
import specialtest from "../.././assets/specialtest.webp";
import './Assesment2.css'
import Body from './Body/Body';
import { useHistory } from 'react-router-dom';
const { Text } = Typography
const Assessment2 = () => {
    const screenShotRef = useRef(null);
    const executeScroll = () => screenShotRef.current.scrollIntoView();
    const history = useHistory()
    return (
        <Row justify='space-between' className='main-container-1x'>
            {/* <FaClipboardList size={35} /> */}
            {/* <Col span={24}>
                <Col span={12} className='h1-1x'>Assesment/Consultation</Col>
                <Col span={12} >Assesment/Consultation</Col>
            </Col> */}
            {/* <Col span={24}><IoArrowBack size={35} /> </Col> */}
            <Col sm={10} md={12} lg={10} className='h1-1x'> <FaClipboardList style={{marginBottom:'10px' }} size={25} /><span >Assesment/Consultation</span></Col>
            <Col sm={6} md={12} lg={12} ><Button className="create-patient-btn-1x bg-theme-1x btn-1x"><img className='icons-1x' src={create} /><span className="only-icons-sm-1x">Create Patient</span></Button></Col>
            <Col span={24}>
                <div className='patient-details-1x h3-font-1x bg-theme-1x div-border-1x'>
                    <span>Patient Name : Aswin</span>
                    <span>Patient Episode : Routine</span>
                    <span>Patient Code : Aswkri10276</span>
                </div>
            </Col>
            <Col span={24} className="assesment-list-wrap-1x div-border-1x bg-theme-1x">
                {/* <div className='assesment-list-1x bg-theme-1x div-border-1x'>
                    <Row>
                        <center>
                            <img className='icons-1x' src={standingman} />
                        </center>
                    </Row>
                </div> */}
                <div class="assesment-list-1x h3-font-1x div-border-1x">
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={standingman} /><br/>Physical</center></div>
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={pain} /><br/>Pain</center></div>
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={posture} /><br/>Posture</center></div>
                    <div class="assesment-list-item-1x" onClick={()=>history.push('/assessment/arom/1')}> <center> <img className='assesment-list-icons-1x' src={aromai} /><br/>AROM</center></div>
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={specialtest} /><br/>Scale & index</center></div>
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={scaleindex} /><br/>Special Test</center></div>
                    <div class="assesment-list-item-1x"> <center> <img className='assesment-list-icons-1x' src={arom} /><br/>Manual AROM</center></div>
                </div>
            </Col>
            <Col span={24} className="bg-theme-1x div-border-1x">
                <Body executeScroll={executeScroll} screenShotRef={screenShotRef} /> 
            </Col>
        </Row>
    )
}

export default Assessment2