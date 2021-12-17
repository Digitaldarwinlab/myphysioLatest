import { Col, Row } from 'antd'
import React from 'react'
import { AiFillUnlock } from 'react-icons/ai'
import BackButton from '../PatientComponents/shared/BackButton'
import Phead from '../components/Layout/PatientSearch/PatientHead'
import PatDetails from '../components/Layout/PatientSearch/PatDetails'
import { BsFillEyeFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
const EnterprisePatient1 = () => {
    const userInfo = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : { role: "physio" } 
    function Pahead(val) {
        return (
            <PatDetails title={val.title} />
        );
    }
    return (
        <div>
             <h3 className="fw-bold m-2">
                <BackButton />
                <Row className="bg-search text-center" justify="space-around">
                        {Phead.map(Pahead)}
                    </Row>
                <Row  justify="space-around" className="text-center">
                                                    <Col md={4} lg={4} sm={4} xs={4}><p>yash103</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>Yashi Srivastav </p></Col>



                                                        <Col md={4} lg={4} sm={4} xs={4}> <p> <p>16/08/2001</p></p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>9988774455</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}>
                                                            <BsFillEyeFill className="iconClass3 me-1" title="View" />
                                                            <BiEdit className="iconClass3 me-1" title="Edit"  />
                                                        {userInfo.role=='admin' ? <AiFillUnlock className="iconClass3 me-1" size={25}  />   : null}    
                                                        </Col>
                                                </Row>
                                                <Row  justify="space-around" className="text-center">
                                                    <Col md={4} lg={4} sm={4} xs={4}><p>yash103</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>Yashi Srivastav </p></Col>



                                                        <Col md={4} lg={4} sm={4} xs={4}> <p> <p>16/08/2001</p></p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>9988774455</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}>
                                                            <BsFillEyeFill className="iconClass3 me-1" title="View" />
                                                            <BiEdit className="iconClass3 me-1" title="Edit"  />
                                                        {userInfo.role=='admin' ? <AiFillUnlock className="iconClass3 me-1" size={25}  />   : null}    
                                                        </Col>
                                                </Row>
                                                <Row  justify="space-around" className="text-center">
                                                    <Col md={4} lg={4} sm={4} xs={4}><p>yash103</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>Yashi Srivastav </p></Col>



                                                        <Col md={4} lg={4} sm={4} xs={4}> <p> <p>16/08/2001</p></p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>9988774455</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}>
                                                            <BsFillEyeFill className="iconClass3 me-1" title="View" />
                                                            <BiEdit className="iconClass3 me-1" title="Edit"  />
                                                        {userInfo.role=='admin' ? <AiFillUnlock className="iconClass3 me-1" size={25}  />   : null}    
                                                        </Col>
                                                </Row>
                                                <Row  justify="space-around" className="text-center">
                                                    <Col md={4} lg={4} sm={4} xs={4}><p>yash103</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>Yashi Srivastav </p></Col>



                                                        <Col md={4} lg={4} sm={4} xs={4}> <p> <p>16/08/2001</p></p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}><p>9988774455</p></Col>

                                                        <Col md={4} lg={4} sm={4} xs={4}>
                                                            <BsFillEyeFill className="iconClass3 me-1" title="View" />
                                                            <BiEdit className="iconClass3 me-1" title="Edit"  />
                                                        {userInfo.role=='admin' ? <AiFillUnlock className="iconClass3 me-1" size={25}  />   : null}    
                                                        </Col>
                                                </Row>
            </h3>
        </div>
    )
}

export default EnterprisePatient1
