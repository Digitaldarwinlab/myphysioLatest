import { Descriptions, Row } from 'antd'
import React from 'react'

const Scale = ({state}) => {
    return (
        <Row className="h2-p-1x bg-theme-1x div-border-1x">
            <Descriptions
                title={state.FirstAssesment.Questionnaire.template_name}
                bordered
            >
                {state.FirstAssesment.question_heading.map(
                    (data, index) =>
                        data !== "description" && (
                            <Descriptions.Item label={data}>
                                {Math.round(state.FirstAssesment.KOOS[index])}
                            </Descriptions.Item>
                        )
                )}
            </Descriptions>
        </Row>
    )
}

export default Scale