import { Col, Descriptions, Row } from 'antd'
import React from 'react'

const Pain = ({state}) => {
    return (
        <Row  className="h2-p-1x bg-theme-1x div-border-1x">
                <Col md={24} lg={24} sm={24} xs={24}>
                    <Descriptions bordered>
                        <Descriptions.Item label={<b>Nature Of Pain</b>}>
                            {state.FirstAssesment.nature_of_pain_here}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Swelling</b>}>
                            {state.FirstAssesment.pain_swelling}
                        </Descriptions.Item>
                        
                        <Descriptions.Item label={<b>Pain Aggravating</b>}>
                            {state.FirstAssesment.pain_aggravating_here.map(
                                (d) => d + " , "
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Pain Relieving</b>}>
                            {state.FirstAssesment.pain_relieving_here.map(
                                (d) => d + " , "
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Pain Scale</b>}>
                            {state.FirstAssesment.pain_scale}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Scars</b>}>
                            {state.FirstAssesment.pain_scars}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col md={24} lg={24} sm={24} xs={24}>
                    <Descriptions title="Sensory Inputs" bordered>
                    <Descriptions.Item label={<b>Superficial</b>}>
                            {state.FirstAssesment.superficial}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Deep</b>}>
                            {state.FirstAssesment.deep}
                        </Descriptions.Item>
                        <Descriptions.Item label={<b>Cortial</b>}>
                            {state.FirstAssesment.cortial}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
        </Row>
    )
}

export default Pain