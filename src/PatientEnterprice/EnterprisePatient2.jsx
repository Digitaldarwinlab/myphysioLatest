 //import React, { useEffect, useState } from "react";
// import BackButton from '../PatientComponents/shared/BackButton';
// import { useHistory } from "react-router-dom";

import { Col, Row,Button } from 'antd'
import React from 'react'
import { AiFillUnlock } from 'react-icons/ai'
import BackButton from '../PatientComponents/shared/BackButton'
import Phead from '../components/Layout/PatientSearch/PatientHead'
import PatDetails from '../components/Layout/PatientSearch/PatDetails'
import { BsFillEyeFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import {useHistory } from "react-router-dom"
import "./enterprises.css";



//Style

const EnterprisePatient2 = () => {
  
    const history = useHistory()
    return (
        <>
            {/* <h3 className="fw-bold m-2">
                <BackButton />

            </h3> */}

            <Row style={{marginTop:'15px'}} className="p-3 pt-0 pb-0">
                <Col md={24} lg={24} sm={24} xs={24}>
                    <h3 className="fw-bold mb-2">Follow up assessment </h3>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24} className="enterprises-table2">
                   <p>Based on scores from previous screen, the questions on this screen come from backend and are only published on this page</p>
                </Col>
            </Row>
            
            <Row className="p-3 pb-0">
                <Col md={24} lg={24} sm={24} xs={24}>
                    <h4 className="fw-bold m-1"> Head </h4>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24} className="enterprises-table2">
                    <table>
                            <tr>
                                <th> Title </th>
                                <th> Yes </th>
                                <th> No </th>
                                <th> N/A </th>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>

                    </table>
                </Col>
            </Row>

            <Row style={{marginTop:'15px'}} className="p-3 pb-0">
                <Col md={24} lg={24} sm={24} xs={24}>
                    <h4 className="fw-bold m-1"> Neck </h4>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24} className="enterprises-table2">
                    <table>
                            <tr>
                                <th> Title </th>
                                <th> Yes </th>
                                <th> No </th>
                                <th> N/A </th>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>

                    </table>
                </Col>
            </Row>

            <Row style={{marginTop:'15px'}} className="p-3 pb-0">
                <Col md={24} lg={24} sm={24} xs={24}>
                    <h4 className="fw-bold m-1"> Shoulders </h4>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24} className="enterprises-table2">
                    <table>
                            <tr>
                                <th> Title </th>
                                <th> Yes </th>
                                <th> No </th>
                                <th> N/A </th>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>
                            <tr>
                                <td>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                                <td><input type="checkbox"></input> </td>
                            </tr>

                    </table>
                </Col>
            </Row>
            <Row style={{marginTop:'15px'}} className="p-3 pb-0">
            <Col md={24} lg={24} sm={24} xs={24}>
                <Button size={'large'} onClick={()=>history.push('/patient/enterprise/dashboard/3')} style={{float:'right'}}>Submit</Button>
            </Col>
            </Row>

        </>
    )
}
export default EnterprisePatient2;