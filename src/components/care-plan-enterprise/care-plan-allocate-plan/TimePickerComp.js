import { useState } from "react";
import { Col, Modal } from "antd";
import { BsClock } from "react-icons/bs";
import TimeKeeper from 'react-timekeeper';

const styleOftime = {
    fontSize: "3vh",
    fontWeight: "normal"
}
const TimePickerComp = (props) => {
    const [showModal, setShowModal] = useState(false);
    const defaultTimeValue = "10:00 am";
    return (
        <>
            {props.showWatch ? (
                <>
                    <Col lg={3} md={6} sm={8} xs={12} className="mb-4" key={props.index}>
                        <h5 className="border text-center">
                            <span className="px-1" style={styleOftime}>{props.state.timeSlots[props.index]}</span>
                            <BsClock title="Click To Change Time" className="pt-1 iconClass3" onClick={() => setShowModal(true)} />
                        </h5>
                    </Col>
                    <Modal
                        bodyStyle={{ backgroundColor: "transparent" }}
                        footer={null}
                        centered
                        onCancel={() => setShowModal(false)}
                        visible={showModal}>
                        <div className="text-center">
                            <TimeKeeper
                                onChange={(time) => props.handleChange("timeSlots", time.formatted12, props.index)}
                                time={(props.state.timeSlots.length > props.index && props.state.timeSlots[props.index]) ? props.state.timeSlots[props.index] : defaultTimeValue}
                                switchToMinuteOnHourSelect
                                onDoneClick={() => setShowModal(false)}
                            />
                        </div>
                    </Modal>
                </>) : (
                <Col lg={3} md={6} sm={8} xs={12} className="mb-4" key={props.index}>
                    <h5 className="border text-center">
                        <span className="px-1" style={styleOftime}>{props.time}</span>
                    </h5>
                </Col>
            )
            }
        </>
    )
}
export default TimePickerComp;