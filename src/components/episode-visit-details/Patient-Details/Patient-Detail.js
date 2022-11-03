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
    console.log("Patients details ",viewState)
    //Basic Information 
    const BasicInfo = () => {
        return (
            <>
               <Form layout="vertical">
                    <div className="border mb-4">
                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="First Name"
                                    name="FirstName"
                                    value={viewState.FirstName}
                                    className="input-field  bold w-100 text-capitalize"
                                    placeholder={"First Name"}
                                    disabled={true}
                                    
                                /> 

                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Middle Name"
                                    name="MiddleName"
                                    value={viewState.MiddleName}
                                    className="input-field w-100"
                                    placeholder={"Middle Name"}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Last Name"
                                value={viewState.LastName}
                                    name="LastName"
                                    className="input-field w-100"
                                    placeholder={viewState.LastName?viewState.LastName:"Last Name"}
                                    disabled={true}
                                />
                            </Col>
                        </Row>

                        
                        <Row gutter={[20, 20]} className="pt-4">
                            {viewState.dob && (
                            <Col md={12} lg={8} sm={24} xs={24}>
                                <FormInput label="DOB"
                                    name="DOB"
                                    value={viewState.dob}
                                    className="input-field w-100"
                                    disabled={true}
                                    defaultValue={viewState.dob}
                                />
                            </Col>
                            )}
                            {!viewState.dob && (
                            <Col md={12} lg={8} sm={24} xs={24}>
                                <FormInput label="DOB"
                                    name="DOB"
                                    value={viewState.dob}
                                    className="input-field w-100"
                                    disabled={true}
                                />
                            </Col>
                            )}
                            <Col md={12} lg={3} sm={24} xs={24}>
                                <FormInput label="Age"
                                    name="Age"
                                    value={viewState.age}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={"Age"}
                                />
                            </Col>
                            <Col md={12} lg={5} sm={24} xs={24}>
                                {/* <Form.Item label="Gender" name="Gender"> */}
                                <FormInput label="Gender"
                                    name="Gender"
                                    value={viewState.Gender}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.Gender?viewState.Gender:"Gender"}
                                />
                                    {/* <Select
                                        className="input-field w-100"
                                        disabled={true}
                                        value={viewState.Gender}
                                        placeholder={viewState.Gender?viewState.Gender:"Gender"}
                                    >
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Other">Other</Option>
                                    </Select> */}
                                {/* </Form.Item> */}
                            </Col>
                            <Col md={12} lg={8} sm={24} xs={24}>
                            <FormInput label="Blood Type"
                                    name="Blood Type"
                                    value={viewState.bloodType}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={"Blood Type"}
                                />
                                {/* <Form.Item label="Blood Type" name="bloodType">
                                    <Select
                                     value={viewState.bloodType}
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
                                </Form.Item> */}
                            </Col>
                        </Row>

                      {(getUserData()==="admin" || getUserData()==="HeadPhysio") &&  <Row gutter={[20, 20]} className="pt-4">
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Mobile No"
                                    name="MobileNo"
                                    value={viewState.MobileNo}
                                    className="input-field w-100"
                                    placeholder={viewState.MobileNo?viewState.MobileNo:"Mobile Number"}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Landline No"
                                    name="LandlineNo"
                                    value={viewState.landline}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={viewState.landline ? viewState.landline : "Landline Number"}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="WhatsApp No"
                                    name="WhatsAppNo"
                                    value={viewState.WhatsAppNo}
                                    className="input-field w-100"
                                    placeholder={viewState.WhatsAppNo?viewState.WhatsAppNo:"WhatsApp Number"}
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
                            <FormInput label="Address"
                                    required="true"
                                    value={viewState.Address}
                                    name="Address"
                                    className="input-field w-100"
                                    defaultValue={viewState.Address}
                                    disabled={true}
                                />
                            </Col>
                        </Row>

                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput  label="Country"
                                    value={viewState.Country}
                                    name="Country"
                                    className="input-field w-100"
                                    placeholder="Country"
                                    disabled={true}
                                />
                                {/* <Form.Item
                                    label="Country"
                                    name="Country"
                                    className="input-field w-100"
                                >
                                    <Select
                                     value={viewState.Country}
                                        defaultValue={viewState.Country}
                                        disabled={true}
                                    >
                                        <Select.Option value="India">India</Select.Option>
                                    </Select>
                                </Form.Item> */}
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput  
                                    value={viewState.State}
                                    label="State"
                                    name="State"
                                    className="input-field w-100"
                                    placeholder="State"
                                    disabled={true}
                                />
                                {/* <Form.Item
                                    label="State"
                                    name="State"
                                    className="input-field w-100"
                                    disabled={true}
                                >
                                    <Select
                                     value={viewState.State}
                                        defaultValue={viewState.State}
                                        disabled={true}
                                    >
                                        <Select.Option value="ky">ky</Select.Option>

                                    </Select>
                                </Form.Item> */}
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput  
                                    value={viewState.City}
                                    label="City"
                                    name="City"
                                    disabled={true}
                                    className="input-field w-100"
                                    placeholder="City"
                                />
                                {/* <Form.Item
                                    label="City"
                                    name="City"
                                    disabled={true}
                                >
                                    <Select
                                     value={viewState.City}
                                        defaultValue={viewState.City}
                                        disabled={true}
                                    >
                                        <Select.Option value="ky">ky</Select.Option>
                                    </Select>
                                    </Form.Item> */}
                            </Col>
                        </Row>


                        <Row gutter={[20, 20]}>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Pincode"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={viewState.pincode!==0?viewState.pincode:''}
                                    className="input-field w-100"
                                    disabled={true}
                                />
                            </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Email"
                                    name="Email"
                                    placeholder="Email"
                                    value={viewState.Email}
                                    className="input-field w-100"
                                    defaultValue={viewState.Email}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput 
                                    label="Facebook"
                                    placeholder="Facebook"
                                    name="Facebook"
                                    value={viewState.Facebook}
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
                                    placeholder="LinkedIn"
                                    value={viewState.LinkedIn}
                                    className="input-field w-100"
                                    defaultValue={viewState.LinkedIn}
                                    disabled={true}
                                />
                            </Col>
                            <Col md={24} lg={8} sm={24} xs={24}>
                                <FormInput label="Emergency Contact"
                                    name="EmergencyContact"
                                    placeholder="EmergencyContact"
                                    value={viewState.EmergencyContact!==0?viewState.EmergencyContact:''}
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
                                    value={viewState.LastName}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={"Allergies"}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormTextArea label="Medical History"
                                    name="MedicalHistory"
                                    value={viewState.MedicalHistory}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={"MedicalHistory"}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={24} lg={24} sm={24} xs={24}>
                                <FormTextArea label="Family History"
                                    name="FamilyHistory"
                                    value={viewState.FamilyHistory}
                                    className="input-field w-100"
                                    disabled={true}
                                    placeholder={"FamilyHistory"}
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
