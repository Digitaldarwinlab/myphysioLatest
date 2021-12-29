/*eslint no-unused-vars:"off" */
/*eslint array-callback-return:"off" */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import svg from "./../../assets/step3.png";
import StepBar from './../UtilityComponents/StepBar';
import { physioRegister, physioUpdate } from './../../API/Physio/PhysioRegister';
import { Typography, Row, Modal, Button, Col, Form, Table } from 'antd';
import FormInput from './../UI/antInputs/FormInput';
import Error from './../UtilityComponents/ErrorHandler';
import FormDate from './../UI/antInputs/FormDate';
import Loading from './../UtilityComponents/Loading';
import Success from './../UtilityComponents/SuccessHandler';
import { useHistory } from 'react-router-dom';
import { CLEAR_STATE, PHYSIO_REGISTER_FAILURE } from '../../contextStore/actions/physioRegAction';
import { PHYSIO_STATE_CHANGE } from './../../contextStore/actions/physioRegAction';
import { VALIDATION } from './../../contextStore/actions/authAction';
import moment from "moment";
import { keyMapping } from './PhysioList/PhysioList';

const { Title } = Typography;

const PhysioRegisteration3 = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [tableData, setTableData] = useState([]);
    const history = useHistory();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const showModal = (e) => {
        e.preventDefault();
        let tempData = [];
        let keys = Object.keys(state.physioRegisterReducer);
        let index = 0;
        keys.forEach(key => {
            if (!(["end_date", "status_flag", "roleid", "isLoading", "success", "id"].includes(key))) {
                if (key === "start_date") {
                    tempData.push({
                        key: index,
                        Field: "Start Date",
                        Value: state.physioRegisterReducer.start_date ? new Date(state.physioRegisterReducer.start_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)
                    });
                    index += 1;
                } else if (key === "Doctor_type") {
                    tempData.push({
                        key: index,
                        Field: "Doctor Type",
                        Value: state.physioRegisterReducer.Doctor_type === 1 ? "Treating Doctor" : state.physioRegisterReducer.Doctor_type === 2 ? "Referring Doctor" : "Both (Treating And Referring Doctor)"
                    });
                    index += 1;
                } else if (state.physioRegisterReducer[key] !== null && state.physioRegisterReducer[key] !== "NULL" && (state.physioRegisterReducer[key] !== "")) {
                    tempData.push({
                        key: index,
                        Field: keyMapping[key],
                        Value: state.physioRegisterReducer[key]
                    });
                    index += 1;
                }
            }
        });
        setTableData(tempData);
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const handleChange = (key, value) => {
        if (key === "start_date" || key === "end_date") {
            if (key === "start_date") {
                setStart(value.date);
            } else {
                setEnd(value.date);
            }
            dispatch({
                type: PHYSIO_STATE_CHANGE,
                payload: {
                    key,
                    value: value.dateString
                }
            })
        } else {
            dispatch({
                type: PHYSIO_STATE_CHANGE,
                payload: {
                    key,
                    value
                }
            })
        }
    }

    const handleBlur = (e) => {
        // console.log(e);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalVisible(false);
        // const checkError = state.Validation.error;
        // if (checkError) {
        //     alert("check the fields")
        // } else {
            let result;
            if (!state.physioRegisterReducer.id) {
                result = await physioRegister(state.physioRegisterReducer, dispatch);
            } else {
                result = await physioUpdate(state.physioRegisterReducer, dispatch);
            }
            if (result && result[0]) {
                window.location.href = "/physio/list";
            } else {
                dispatch({ type: PHYSIO_REGISTER_FAILURE });
                dispatch({ type: VALIDATION, payload: { error: result[1] } });
                setTimeout(() => {
                    dispatch({ type: VALIDATION, payload: { error: "" } });
                }, 10000);
            }
      //  }
    }

    const handleReset = () => {
        if (state.physioRegisterReducer.id) {
            if (window.confirm("Confirm, Do You want to Cancel Update?")) {
                dispatch({ type: CLEAR_STATE });
                form.resetFields()
               // history.push("/physio/list");
            }
        } else {
            if (window.confirm("Confirm, Do You want to Reset all fields?")) {
                dispatch({ type: CLEAR_STATE });
                form.resetFields()
             //   history.push("/physio/register");
            }
        }
    }

    const Back = () => {
        props.back();
    }
    return (
        <>
            <div style={{ minHeight: "20px" }}></div>
            <Title level={3} className="">Physiotherapist</Title>
            <StepBar src={svg} />
            <Title level={3} className="border mb-0 p-2">Other Information</Title>
            <Form layout="vertical">
                <div className="border p-4 mb-4">
                    {state.Validation.error && (<Error error={state.Validation.error} />)}
                    {state.physioRegisterReducer.isLoading && <Loading />}
                    {state.physioRegisterReducer.success && <Success success={state.physioRegisterReducer.success} />}
                    <Row gutter={[20, 20]}>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormDate name="start_date"
                                className="input-field w-100"
                                value={start}
                                type="date" label="Start Date" placeholder="Start Date"
                                onChange={handleChange}
                                required={false}
                                disabledDate={true}
                                disabled={false}
                                defaultValue={state.physioRegisterReducer.start_date ? moment(state.physioRegisterReducer.start_date, "YYYY-MM-DD") : moment(new Date(), "YYYY-MM-DD")}
                            />
                        </Col>
                        {/* <Col md={24} lg={8} sm={24} xs={24}>
                            <FormDate name="end_date" type="date" label="End Date"
                                className="input-field w-100"
                                value={end}
                                placeholder="End Date"
                                onChange={handleChange}
                                required={false}
                                disabled={false}
                            />
                        </Col>
                        <Col md={24} lg={8} sm={24} xs={24}>
                            <FormInput name="status_flag" label="Status"
                                className="input-field"
                                value={state.physioRegisterReducer.status_flag}
                                placeholder="Status"
                                onChange={handleChange}
                                required="true"
                                disabled={false}
                                defaultValue={state.physioRegisterReducer.status_flag}
                            />
                        </Col> */}
                    </Row>
                </div>
            </Form>


            <div className="m-3 text-end">
                {/* <Button  className="my-3 me-3" style={{borderRadius:'10px'}} onClick={Back}>Back</Button>
                <Button htmlType="reset" className=" me-2" style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}} onClick={handleReset}>
                    {state.physioRegisterReducer.id ? "Cancel" : "Reset"}
                </Button> */}
                 {/* aswin 10/15/2021 start (button disabled) */}
                <Button  htmlType="reset" className=" me-2" style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}}  onClick={Back}>Back</Button>    
                <Button htmlType="reset" className=" me-2" style={{backgroundColor:"#1BBC9B",borderRadius:'10px'}} disabled onClick={handleReset}>
                    {state.physioRegisterReducer.id ? "Cancel" : "Reset"}
                </Button>
                {/* aswin 10/15/2021 end */}
                <Button onClick={showModal} className=" me-3 btncolor" >
                    {state.physioRegisterReducer.id ? "Update" : "Submit"}
                </Button>
                <Modal title="Confirm All Details?" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
                    <Table
                        pagination={false}
                        scroll={{ y: 400 }}
                        showHeader={false}
                        columns={[{ title: "Field", dataIndex: "Field", render: (text) => <p className="fw-bold">{text}</p> },
                        { title: "Value", dataIndex: "Value" }]} dataSource={tableData}
                    />
                </Modal>
                
            </div>
        </>
    )
}
export default PhysioRegisteration3;