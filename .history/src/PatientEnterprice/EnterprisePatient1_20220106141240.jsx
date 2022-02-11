import { Col, Row,Button } from 'antd'
import React from 'react'
import { AiFillUnlock } from 'react-icons/ai'
import BackButton from '../PatientComponents/shared/BackButton'
import Phead from '../components/Layout/PatientSearch/PatientHead'
import PatDetails from '../components/Layout/PatientSearch/PatDetails'
import { BsFillEyeFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import {useHistory } from "react-router-dom"

  


const EnterprisePatient1 = () => {
    const history = useHistory()
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" } 
    function Pahead(val) {
        return (
            <PatDetails title={val.title} />
        );
    }
    console.log("Inside Enterprise patient ")
    return (
        <>
        <div>
             {/* <h3 className="fw-bold m-2">
                <BackButton />
                <Row className="bg-search text-center" justify="space-around">
                        {Phead.map(Pahead)}
                </Row>
            </h3> */}

            <Row gutter={[20,20]} className="mt-3" style={{marginBottom:'15px'}}>
                <Col md={6} lg={6} sm={6} xs={6}>
                    Left
                </Col>
                <Col md={18} lg={18} sm={18} xs={18} style={{overflow:'auto'}} className="enterprises-table" >

                    <table>
                        <tr>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </th>
                            <th>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </th>
                        </tr>
                        
                        <tr>
                            <th></th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                    <li>4 Time</li>
                                    <li>5 Time</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                    <li>4 Time</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="table-nav">
                                    <li>1 Time</li>
                                    <li>2 Time</li>
                                    <li>3 Time</li>
                                </ul>
                            </th>
                        </tr>

                        <tr>
                            <td>Neck</td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                             <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Shoulder</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Upper Arm</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>Lower Back</td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                             <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Forearm</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Wrist</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>Hip Buttocks</td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                             <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Wrist</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>Knee</td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                             <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Lower Leg</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Row>
                                    <Col md={12}>Foot</Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={24} className="mb-5">(Right)</Col>
                                            <Col md={24}>(Left)</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                            <td>
                            <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div className="w-100 checkbox-rs">
                                    <input type="checkbox"></input> 
                                    <input type="checkbox"></input>
                                    <input type="checkbox"></input>
                                </div>
                            </td>
                        </tr>
                       
                    </table>
                  
                    </Col>
            </Row>
            
        </div>
        <Row>
        <Col md={6} lg={6} sm={6} xs={6}>
               {" "}
            </Col>
        <Col md={18} lg={18} sm={18} xs={18}>
            <Button onClick={()=>history.push('/patient/enterprise/dashboard/2')} style={{float:"right"}}>Submit</Button>
        </Col>
        </Row>
    </>
    )
}

export default EnterprisePatient1
