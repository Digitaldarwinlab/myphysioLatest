import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { IconContext } from 'react-icons'
import { FaClipboardList } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5';
import create from "../.././assets/create.webp";
import standingman from "../.././assets/standing-man.webp";
import './Assesment2.css'
const { Text } = Typography
const Assessment2 = () => {
    return (
        <Row justify='space-between' className='main-container-1x'>
            {/* <FaClipboardList size={35} /> */}
            {/* <Col span={24}>
                <Col span={12} className='h1-1x'>Assesment/Consultation</Col>
                <Col span={12} >Assesment/Consultation</Col>
            </Col> */}
            {/* <Col span={24}><IoArrowBack size={35} /> </Col> */}
            <Col sm={10} md={12} lg={10} className='h1-1x'> <IoArrowBack size={35} />Assesment/Consultation</Col>
            <Col sm={6} md={12} lg={12} ><Button className="create-patient-btn-1x bg-theme-1x btn-1x"><img className='icons-1x' src={create} /><span className="only-icons-sm-1x">Create Patient</span></Button></Col>
            <Col span={24}>
                <div className='patient-details-1x bg-theme-1x div-border-1x'>
                    <span>Patient Name : Aswin</span>
                    <span>Patient Episode : Routine</span>
                    <span>Patient Code : Aswkri10276</span>
                </div>
            </Col>
            <Col span={24} className="assesment-list-wrap-1x bg-theme-1x">
                {/* <div className='assesment-list-1x bg-theme-1x div-border-1x'>
                    <Row>
                        <center>
                            <img className='icons-1x' src={standingman} />
                        </center>
                    </Row>
                </div> */}
                <div class="assesment-list-1x h3-font-1x div-border-1x">
                    <div class="assesment-list-item-1x">ONE</div>
                    <div class="assesment-list-item-1x">TWO</div>
                    <div class="assesment-list-item-1x">THREE</div>
                    <div class="assesment-list-item-1x">FOUR</div>
                    <div class="assesment-list-item-1x">FIVE</div>
                    <div class="assesment-list-item-1x">SIX</div>
                    <div class="assesment-list-item-1x">SEVEN</div>
                </div>
            </Col>
        </Row>
    )
}

export default Assessment2