import React from "react";
import BackButton from '../PatientComponents/shared/BackButton';
import "./enterprises.css";
import { Col, Row,Button } from 'antd'

import { useHistory } from "react-router-dom";

const EnterprisePatient3 = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));


    const history = useHistory();
  

    return (
        <>
            {/* <h3 className="fw-bold m-2">
                <BackButton />

            </h3> */}
           
           <div className="mt-2 m-4 pb-2">
                <h4 className="fw-bold mt-3 mb-3"> Please perform the following motions </h4>
                <h5 className="fw-bold"> Instructions </h5>
                <p className="mt-3 mb-3">Please ensure your full body is visible in front of the camera </p>
                    
                <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
                    <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>
                        
                </Row>
                
                <Row gutter={[20,20]} style={{marginBottom:'15px'}}>
                    <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        </Col>

                        <Col md={24} lg={3} sm={24} xs={24} className="text-center">
                        <img title="Click to see or" onClick={() => setVisible(true)}
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="logo"  className="doctor-image-1"  width={90} height={85} />
                        <p className="text-center m-2">Suqat</p> 
                        <Button type="primary" size="small">Start Now</Button>
                        </Col>
                        
                </Row>
                </div>


        </>
    )
}
export default EnterprisePatient3;