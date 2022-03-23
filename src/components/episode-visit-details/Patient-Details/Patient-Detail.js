import React from 'react'
import { Row, Col, Form, Select, Collapse } from 'antd';
import FormInput from './../../UI/antInputs/FormInput';
import FormDate from './../../UI/antInputs/FormDate';
import { calculate } from './../../PatientRegistration/Register1';
import moment from "moment";
import FormTextArea from './../../UI/antInputs/FormTextArea';
import { getUserData } from '../../../API/userAuth/userAuth';

const { Option } = Select;
const { Panel } = Collapse;

export default function Patient({ viewState }) {
    let age = calculate(new Date(viewState.dob), new Date());
    //Basic Information 
    const BasicInfo = () => {
        return (
            <>
               <Form layout="vertical">
                    <div className="border p-4 mb-4">
                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="First Name"
                                    name="FirstName"
                                    className="input-field  bold w-100 text-capitalize"
                                    placeholder={viewState.FirstName?viewState.FirstName:"Yours First Name"}
                                    disabled={true}
                                    
                                /> 

                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Middle Names"
                                    name="MiddleName"
                                    className="input-field w-100"
                                    placeholder={viewState.MiddleName ? viewState.MiddleName : "Your Middle Name"}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Last Name"
                                    name="LastName"
                                    className="input-field w-100"
                                    placeholder={viewState.LastName?viewState.LastName:"Your Last Name"}
                                    disabled={true}
                                />
                            </Col>
                        </Row>

                        
                        <Row gutter={[20, 20]} className="pt-4">
                            {viewState.dob && (
                            <Col md={12} lg={8} sm={24} xs={24}>
                                <FormDate label="DOB"
                                    name="DOB"
                                    className="input-field w-100"
                                    disabled={true}
                                    defaultValue={moment(viewState.dob,"YYYY-MM-DD")}
                                />
                            </Col>
                            )}
                            {!viewState.dob && (
                            <Col md={12} lg={8} sm={24} xs={24}>
                                <FormDate label="DOB"
                                    name="DOB"
                                    className="input-field w-100"
                                    disabled={true}
                                />
                            </Col>
                            )}
                            <Col md={12} lg={3} sm={24} xs={24}>
                                <FormInput label="Age"
                                    name="Age"
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={age?age:"Age"}
                                />
                            </Col>
                            <Col md={12} lg={5} sm={24} xs={24}>
                                <Form.Item label="Gender" name="Gender">
                                    <Select
                                        className="input-field w-100"
                                        disabled={true}
                                        placeholder={viewState.Gender?viewState.Gender:"Gender"}
                                    >
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col md={12} lg={8} sm={24} xs={24}>
                                <Form.Item label="Blood Type" name="bloodType">
                                    <Select
                                        className="input-field w-100"
                                        disabled={true}
                                        placeholder={viewState.bloodType?viewState.bloodType:"Blood Type"}
                                    >
                                        <Option value="A+">A+</Option>
                                        <Option value="A-">A-</Option>
                                        <Option value="B+">B+</Option>
                                        <Option value="B-">B-</Option>
                                        <Option value="AB+">AB+</Option>
                                        <Option value="AB">AB-</Option>
                                        <Option value="O+">O+</Option>
                                        <Option value="O-">O-</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                      {(getUserData()==="admin" || getUserData()==="HeadPhysio") &&  <Row gutter={[20, 20]} className="pt-4">
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Mobile No"
                                    name="MobileNo"
                                    className="input-field w-100"
                                    placeholder={viewState.MobileNo?viewState.MobileNo:"Your Mobile Number"}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Landline No"
                                    name="LandlineNo"
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.landline ? viewState.landline : "Your Landline Number"}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="WhatsApp No"
                                    name="WhatsAppNo"
                                    className="input-field w-100"
                                    placeholder={viewState.WhatsAppNo?viewState.WhatsAppNo:"Your WhatsApp Number"}
                                    disabled={true}
                                />
                            </Col>
                        </Row>}
                    </div>
                </Form>
            </>
        )
    }

    //Contact Info
    const ContactInfo = () => {
        return (
            <>
                <Form layout="vertical">
                    <div className="border p-3">
                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormTextArea label="Address"
                                    required="true"
                                    name="Address"
                                    className="input-field w-100"
                                    defaultValue={viewState.Address}
                                    disabled={true}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <Form.Item
                                    label="Country"
                                    name="Country"
                                    className="input-field w-100"
                                >
                                    <Select
                                        defaultValue={viewState.Country}
                                        disabled={true}
                                    >
                                        <Select.Option value="India">India</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <Form.Item
                                    label="State"
                                    name="State"
                                    className="input-field w-100"
                                    disabled={true}
                                >
                                    <Select
                                        defaultValue={viewState.State}
                                        disabled={true}
                                    >
                                        <Select.Option value="ky">ky</Select.Option>

                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <Form.Item
                                    label="City"
                                    name="City"
                                    disabled={true}
                                >
                                    <Select
                                        defaultValue={viewState.City}
                                        disabled={true}
                                    >
                                        <Select.Option value="ky">ky</Select.Option>
                                    </Select>
                                    </Form.Item>
                            </Col>
                        </Row>


                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Pincode"
                                    name="pincode"
                                    className="input-field w-100"
                                    defaultValue={viewState.pincode}
                                    disabled={true}
                                />
                            </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Email"
                                    name="Email"
                                    className="input-field w-100"
                                    defaultValue={viewState.Email}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Facebook"
                                    name="Facebook"
                                    className="input-field w-100"
                                    defaultValue={viewState.Facebook}
                                    disabled={true}
                                />
                            </Col>
                           
                        </Row>
                       <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="LinkedIn"
                                    name="LinkedIn"
                                    className="input-field w-100"
                                    defaultValue={viewState.LinkedIn}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Emergency Contact"
                                    name="EmergencyContact"
                                    className="input-field w-100"
                                    defaultValue={viewState.EmergencyContact}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </div>
                </Form>
            </>
        )
    }
    //History
    const History = () => {
        return (
            <>
                <Form layout="vertical">
                    <div className="border p-3">

                        <Row>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormInput label="Allergies"
                                    name="Allergies"
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.Allergies?viewState.Allergies:"Allergies"}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormTextArea label="Medical History"
                                    name="MedicalHistory"
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.MedicalHistory?viewState.MedicalHistory:"MedicalHistory"}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormTextArea label="Family History"
                                    name="FamilyHistory"
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.FamilyHistory?viewState.FamilyHistory:"FamilyHistory"}
                                />
                            </Col>
                        </Row>
                    </div>
                </Form>
            </>
        )
    }
    return (
        <div className="px-2 py-2 m-3">
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Basic Information" key="1">
                    {BasicInfo()}   
                </Panel>
               {(getUserData()==="admin" || getUserData()==="HeadPhysio") && <Panel header="Contact Information" key="2">
              {ContactInfo()}
                </Panel>}
                <Panel header="History" key="3">
                    {History()}
                </Panel>
            </Collapse>
            
        </div>
    )
}
