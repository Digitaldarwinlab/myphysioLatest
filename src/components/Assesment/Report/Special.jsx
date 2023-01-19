import { Col, Descriptions, Row, Table } from 'antd'
import React from 'react'
import H3 from '../components/H3';

const Special = ({ state }) => {
    // console.log('state is ', Object.entries(state.FirstAssesment.shoulder).map(d => ({ test: d[0], value: d[1] })))
    const columns = [
        {
            title: "Questions",
            dataIndex: "test",
            key: "test",
        },
        {
            title: "Positive/Negative",
            dataIndex: "value",
            key: "value",
        },
    ];
    const SingleTable = ({item})=> {
        return( <Table
            scroll={{ y: 400 }}
            pagination={false}
            columns={columns}
            dataSource={Object.entries(item).map(d => ({ test: d[0], value: d[1] == 1 ? " Positive " : " Negative " }))}
        />)
    }
    return (
        <Row className="h3-p-1x bg-theme-1x div-border-1x special-report">
            {state.FirstAssesment.shoulder &&
                Object.keys(state.FirstAssesment.shoulder).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Shoulder'}/>
                        <SingleTable item={state.FirstAssesment.shoulder} />
                    </Col>
                )}
                  {state.FirstAssesment.ankle &&
                Object.keys(state.FirstAssesment.ankle).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Ankle'}/>
                        <SingleTable item={state.FirstAssesment.ankle} />
                        </Col>
                )}
                 {state.FirstAssesment.elbow &&
                Object.keys(state.FirstAssesment.elbow).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Elbow'}/>
                        <SingleTable item={state.FirstAssesment.elbow} />
                   </Col>
                )}
                 {state.FirstAssesment.hip &&
                Object.keys(state.FirstAssesment.hip).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Hip'}/>
                        <SingleTable item={state.FirstAssesment.hip} />
                   </Col>
                )}
                 {state.FirstAssesment.knee &&
                Object.keys(state.FirstAssesment.knee).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Knee'}/>
                        <SingleTable item={state.FirstAssesment.knee} />
                   </Col>
                )}
                 {state.FirstAssesment.cervical_spine &&
                Object.keys(state.FirstAssesment.cervical_spine).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Cervical Spine'}/>
                        <SingleTable item={state.FirstAssesment.cervical_spine} />
                   </Col>
                )}
                 {state.FirstAssesment.thoracic_spine &&
                Object.keys(state.FirstAssesment.thoracic_spine).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Thoracic Spine'}/>
                        <SingleTable item={state.FirstAssesment.thoracic_spine} />
                   </Col>
                )}
                 {state.FirstAssesment.lumbar_spine &&
                Object.keys(state.FirstAssesment.lumbar_spine).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Lumbar Spine'}/>
                        <SingleTable item={state.FirstAssesment.lumbar_spine} />
                   </Col>
                )}
                 {state.FirstAssesment.forearm &&
                Object.keys(state.FirstAssesment.forearm).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Forearm Wrist Hand'}/>
                        <SingleTable item={state.FirstAssesment.forearm} />
                   </Col>
                )}
                 {state.FirstAssesment.special_others &&
                Object.keys(state.FirstAssesment.special_others).length > 0 && (
                    <Col span={12}>
                        <H3 title={'Others'}/>
                        <SingleTable item={state.FirstAssesment.special_others} />
                   </Col>
                )}
                
        </Row>
    )
}

export default Special