import { Col, Descriptions, Row } from 'antd'
import React from 'react'

const Physical = ({ data }) => {
    return (
        <Row className="h2-p-1x">
            <Col md={24} lg={24} sm={24} xs={24}>
                <Descriptions bordered>
                    <Descriptions.Item label="Assesment Date">
                        {Date().slice(0, 10)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Built">
                        {data.Built}
                    </Descriptions.Item>
                    <Descriptions.Item label="History">
                        {data.History}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cheif Complaint">
                        {" "}
                        {data.chiefCom}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Past Medical History"
                        span={3}
                    >
                        {" "}
                        {data
                            .past_medical_history &&
                            data
                                .past_medical_history.length > 0 &&
                            data.past_medical_history.map(
                                (p) => `${p + " ,"}`
                            )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Any Other details ">
                        {" "}
                        {
                            data
                                .any_other_details
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    )
}

export default Physical